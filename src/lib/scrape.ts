import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

const MAX_CHARS = 12000; // caps token cost sent to Gemini

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com", "10minutemail.com", "guerrillamail.com", "tempmail.com",
  "temp-mail.org", "yopmail.com", "throwawaymail.com", "getnada.com",
  "trashmail.com", "fakeinbox.com", "dispostable.com", "sharklasers.com",
  "maildrop.cc", "mintemail.com", "mohmal.com", "moakt.com",
]);

export function isValidBusinessEmail(email: string): boolean {
  const match = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/.exec(email.trim());
  if (!match) return false;
  const domain = match[1].toLowerCase();
  return !DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

export function isValidPhone(phone: string): boolean {
  // Strict-ish: optional leading +, country code, 8-15 digits total.
  const cleaned = phone.replace(/[\s()-]/g, "");
  return /^\+?[1-9]\d{7,14}$/.test(cleaned);
}

export interface ScrapedArticle {
  title: string;
  byline: string | null;
  siteName: string | null;
  textContent: string;
}

export async function scrapeArticle(url: string): Promise<ScrapedArticle> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; CirroBriefBot/1.0)" },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Failed to fetch URL (status ${res.status})`);

  const html = await res.text();
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article || !article.textContent?.trim()) {
    throw new Error("Could not extract article content from this URL");
  }

  return {
    title: article.title || "Untitled",
    byline: article.byline || null,
    siteName: article.siteName || null,
    textContent: article.textContent.trim().slice(0, MAX_CHARS),
  };
}
