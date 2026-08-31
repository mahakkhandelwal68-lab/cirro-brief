import { NextRequest, NextResponse } from "next/server";
import { detectRegion } from "@/lib/geo";
import { calculateCustomPlan } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { newslettersPerMonth, billing, country } = (await req.json()) as {
    newslettersPerMonth?: number;
    billing?: "monthly" | "annual";
    country?: string;
  };

  if (!newslettersPerMonth || newslettersPerMonth < 1 || (billing !== "monthly" && billing !== "annual")) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const region = await detectRegion(country);
  const result = calculateCustomPlan({ newslettersPerMonth, billing, region });
  return NextResponse.json(result);
}
