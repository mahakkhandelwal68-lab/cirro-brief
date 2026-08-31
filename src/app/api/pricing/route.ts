import { NextRequest, NextResponse } from "next/server";
import { detectRegion } from "@/lib/geo";
import { getRegionPricing } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const debugCountry = req.nextUrl.searchParams.get("country");
  const region = await detectRegion(debugCountry);
  const pricing = getRegionPricing(region);
  return NextResponse.json(pricing);
}
