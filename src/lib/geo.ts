import { headers } from "next/headers";
import { regionFromCountryCode, type Region } from "./pricing";

// Vercel populates x-vercel-ip-country automatically at the edge/CDN layer.
// Falls back to "OTHER" (USD) when running locally or the header is absent.
// `debugCountry` lets local dev simulate a region (e.g. ?country=IN) since
// there's no real IP geolocation without Vercel's edge in front of the app.
export async function detectRegion(debugCountry?: string | null): Promise<Region> {
  const h = await headers();
  const countryCode =
    h.get("x-vercel-ip-country") || (process.env.NODE_ENV !== "production" ? debugCountry : null);
  return regionFromCountryCode(countryCode);
}
