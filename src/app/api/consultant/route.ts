import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { detectRegion } from "@/lib/geo";
import { buildConsultantSystemPrompt } from "@/lib/consultant";
import { incrWithTTL } from "@/lib/redis";

export const dynamic = "force-dynamic";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const DAY = 60 * 60 * 24;
const PER_IP_DAILY_CAP = 60; // generous but bounded, since this hits Gemini per message

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, country } = (await req.json()) as { messages?: ChatMessage[]; country?: string };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }
    if (messages.length > 20) {
      return NextResponse.json({ error: "Conversation too long - please refresh the chat." }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const count = await incrWithTTL(`consultant:${ip}:${new Date().toISOString().slice(0, 10)}`, DAY);
    if (count > PER_IP_DAILY_CAP) {
      return NextResponse.json({ error: "You've reached today's chat limit. Please try again tomorrow, or contact us directly." }, { status: 429 });
    }

    const region = await detectRegion(country);
    const systemPrompt = buildConsultantSystemPrompt(region);

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash", systemInstruction: systemPrompt });

    const history = messages.slice(0, -1).map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.text);
    const reply = result.response.text().trim();

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Consultant chat failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
