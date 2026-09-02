import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { isValidBusinessEmail } from "@/lib/scrape";
import { sendTeamNotification } from "@/lib/notify";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, reason, message } = (await req.json()) as {
      name?: string;
      email?: string;
      reason?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Please fill in your name, email, and message." }, { status: 400 });
    }
    if (!isValidBusinessEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const ticketId = `ticket:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
    await redis.set(
      ticketId,
      { name, email, reason: reason || "Something else", message, createdAt: new Date().toISOString() },
      { ex: 60 * 60 * 24 * 365 }
    );

    await sendTeamNotification(`New contact form message from ${name}`, [
      `Name: ${name}`,
      `Email: ${email}`,
      `Reason: ${reason || "Something else"}`,
      `Message: ${message}`,
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form submission failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
