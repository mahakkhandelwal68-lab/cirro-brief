import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { scrapeArticle } from "@/lib/scrape";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { url } = (await req.json()) as { url?: string };
  if (!url) return NextResponse.json({ error: "URL is required." }, { status: 400 });

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "Please enter a valid URL." }, { status: 400 });
  }

  try {
    const article = await scrapeArticle(url);
    return NextResponse.json({
      title: article.title,
      publication: article.siteName || new URL(url).hostname.replace(/^www\./, ""),
      excerpt: article.textContent.slice(0, 280) + (article.textContent.length > 280 ? "..." : ""),
      textContent: article.textContent,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not read this newsletter.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
