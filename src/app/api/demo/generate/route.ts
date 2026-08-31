import { NextRequest, NextResponse } from "next/server";
import { redis, rateLimitKeyForUrl, incrWithTTL } from "@/lib/redis";
import { scrapeArticle, isValidBusinessEmail } from "@/lib/scrape";
import { summarizeForDemo } from "@/lib/gemini";
import { textToSpeech } from "@/lib/elevenlabs";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const dynamic = "force-dynamic";

const DAY = 60 * 60 * 24;
const GLOBAL_DAILY_CAP = Number(process.env.DEMO_GLOBAL_DAILY_CAP || 200);
const PER_EMAIL_LIFETIME_CAP = 2;
const PER_IP_DAILY_CAP = 5;
const PER_DOMAIN_DAILY_CAP = 10;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, email, turnstileToken } = body as { url?: string; email?: string; turnstileToken?: string };

    if (!url || !email) {
      return NextResponse.json({ error: "URL and email are required." }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: "Please enter a valid URL." }, { status: 400 });
    }

    if (!isValidBusinessEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid, non-disposable email address." },
        { status: 400 }
      );
    }

    // 1. Bot protection
    const verified = await verifyTurnstileToken(turnstileToken || "", req.headers.get("x-forwarded-for") || undefined);
    if (!verified) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 403 });
    }

    // 2. Global daily cost ceiling
    const globalCount = await incrWithTTL(`global:demo-count:${todayKey()}`, DAY);
    if (globalCount > GLOBAL_DAILY_CAP) {
      return NextResponse.json(
        { error: "We're experiencing high demand right now. Please try again tomorrow." },
        { status: 429 }
      );
    }

    // 3. Per-email lifetime cap
    const emailKey = `email:${email.toLowerCase()}`;
    const emailCount = await redis.incr(emailKey);
    if (emailCount > PER_EMAIL_LIFETIME_CAP) {
      return NextResponse.json(
        { error: "This email has already used its free demo generations." },
        { status: 429 }
      );
    }

    // 4. Per-IP daily cap
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ipCount = await incrWithTTL(`ip:${ip}:${todayKey()}`, DAY);
    if (ipCount > PER_IP_DAILY_CAP) {
      return NextResponse.json({ error: "Too many demo requests from this network today." }, { status: 429 });
    }

    // 5. Per-domain/identity daily cap
    const domainKey = rateLimitKeyForUrl(url);
    const domainCount = await incrWithTTL(`${domainKey}:${todayKey()}`, DAY);
    if (domainCount > PER_DOMAIN_DAILY_CAP) {
      return NextResponse.json(
        { error: "This publication has reached today's demo limit. Please try again tomorrow." },
        { status: 429 }
      );
    }

    // 6. Duplicate-URL cache - saves Gemini + ElevenLabs cost on repeat links
    const cacheKey = `demo-cache:${parsedUrl.toString()}`;
    const cached = await redis.get<{ audioBase64: string; title: string; script: string }>(cacheKey);

    let title: string;
    let script: string;
    let audioBase64: string;

    if (cached) {
      ({ title, script, audioBase64 } = cached);
    } else {
      const article = await scrapeArticle(url);
      title = article.title;
      script = await summarizeForDemo(article.title, article.textContent);
      const audioBuffer = await textToSpeech(script);
      audioBase64 = audioBuffer.toString("base64");

      await redis.set(cacheKey, { title, script, audioBase64 }, { ex: DAY * 30 });
    }

    // 7. Store lead record
    const leadId = `lead:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
    await redis.set(
      leadId,
      { email, url, title, createdAt: new Date().toISOString(), phone: null },
      { ex: DAY * 365 }
    );

    return NextResponse.json({
      leadId,
      title,
      audioBase64,
      mimeType: "audio/mpeg",
    });
  } catch (err) {
    console.error("Demo generation failed:", err);
    const message = err instanceof Error ? err.message : "Something went wrong. Please try a different URL.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
