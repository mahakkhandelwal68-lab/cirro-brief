export type Region = "IN" | "EU_UK" | "AE" | "OTHER";

export interface RegionPricing {
  region: Region;
  currency: string;
  symbol: string;
  oneTime: number;
  monthly: number;
  annual: number;
}

const BASE: Record<Region, { currency: string; symbol: string; oneTime: number }> = {
  IN: { currency: "INR", symbol: "₹", oneTime: 1500 },
  EU_UK: { currency: "EUR", symbol: "€", oneTime: 45 },
  AE: { currency: "AED", symbol: "AED ", oneTime: 150 },
  OTHER: { currency: "USD", symbol: "$", oneTime: 50 },
};

// Confirmed formula (matches real US figures: $50 -> $160/mo -> $1,440/yr):
// baseMonthly = oneTime * 4, monthly = baseMonthly * 0.80 (20% off)
// baseAnnual  = baseMonthly * 12, annual = baseAnnual * 0.60 (40% off)
export function getRegionPricing(region: Region): RegionPricing {
  const base = BASE[region];
  const baseMonthly = base.oneTime * 4;
  const monthly = Math.round(baseMonthly * 0.8);
  const baseAnnual = baseMonthly * 12;
  const annual = Math.round(baseAnnual * 0.6);
  return { region, currency: base.currency, symbol: base.symbol, oneTime: base.oneTime, monthly, annual };
}

// Country -> region mapping for the fixed price list.
const EU_UK_COUNTRIES = new Set([
  "GB", "IE", "FR", "DE", "ES", "IT", "PT", "NL", "BE", "LU", "AT", "CH",
  "SE", "NO", "DK", "FI", "PL", "CZ", "SK", "HU", "RO", "BG", "GR", "HR",
  "SI", "EE", "LV", "LT", "CY", "MT", "IS",
]);

export function regionFromCountryCode(countryCode: string | null | undefined): Region {
  const cc = (countryCode || "").toUpperCase();
  if (cc === "IN") return "IN";
  if (cc === "AE") return "AE";
  if (EU_UK_COUNTRIES.has(cc)) return "EU_UK";
  return "OTHER";
}

export interface CustomPlanInput {
  newslettersPerMonth: number;
  billing: "monthly" | "annual";
  region: Region;
}

export interface CustomPlanResult {
  currency: string;
  symbol: string;
  basePerNewsletter: number;
  discountPercent: number;
  price: number;
  billing: "monthly" | "annual";
}

export function calculateCustomPlan({ newslettersPerMonth, billing, region }: CustomPlanInput): CustomPlanResult {
  const n = Math.max(1, Math.floor(newslettersPerMonth));
  const base = BASE[region];

  let discountPercent: number;
  let price: number;

  if (billing === "monthly") {
    discountPercent = n <= 3 ? 15 : n <= 8 ? 20 : 30;
    price = Math.round(n * base.oneTime * (1 - discountPercent / 100));
  } else {
    discountPercent = n >= 9 ? 50 : 40;
    price = Math.round(n * base.oneTime * 12 * (1 - discountPercent / 100));
  }

  return { currency: base.currency, symbol: base.symbol, basePerNewsletter: base.oneTime, discountPercent, price, billing };
}
