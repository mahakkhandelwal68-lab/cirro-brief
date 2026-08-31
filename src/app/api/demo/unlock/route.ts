import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { isValidPhone } from "@/lib/scrape";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { leadId, phone } = (await req.json()) as { leadId?: string; phone?: string };

    if (!leadId || !phone) {
      return NextResponse.json({ error: "Lead ID and phone number are required." }, { status: 400 });
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number with country code." },
        { status: 400 }
      );
    }

    const lead = await redis.get<Record<string, unknown>>(leadId);
    if (!lead) {
      return NextResponse.json({ error: "Session expired. Please generate your briefing again." }, { status: 404 });
    }

    await redis.set(leadId, { ...lead, phone }, { ex: 60 * 60 * 24 * 365 });

    return NextResponse.json({ unlocked: true });
  } catch (err) {
    console.error("Unlock failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
