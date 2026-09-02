import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { isValidBusinessEmail } from "@/lib/scrape";
import { sendTeamNotification } from "@/lib/notify";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, publication, requirements, newslettersPerMonth, billing, estimatedPrice, currency } =
      (await req.json()) as {
        name?: string;
        email?: string;
        publication?: string;
        requirements?: string;
        newslettersPerMonth?: number;
        billing?: string;
        estimatedPrice?: number;
        currency?: string;
      };

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }
    if (!isValidBusinessEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const requestId = `custom-plan-request:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
    await redis.set(
      requestId,
      {
        name,
        email,
        publication: publication || null,
        requirements: requirements || null,
        newslettersPerMonth: newslettersPerMonth || null,
        billing: billing || null,
        estimatedPrice: estimatedPrice ?? null,
        currency: currency || null,
        createdAt: new Date().toISOString(),
      },
      { ex: 60 * 60 * 24 * 365 }
    );

    // Internal notification only - no automatic customer-facing
    // confirmation/purchase-link email yet (that's a separate feature).
    await sendTeamNotification(`New Custom plan request from ${name}`, [
      `Name: ${name}`,
      `Email: ${email}`,
      `Publication: ${publication || "-"}`,
      `Newsletters/month: ${newslettersPerMonth ?? "-"}`,
      `Billing: ${billing || "-"}`,
      `Estimated price: ${estimatedPrice != null ? `${currency || ""} ${estimatedPrice}` : "-"}`,
      `Requirements: ${requirements || "-"}`,
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Custom plan request failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
