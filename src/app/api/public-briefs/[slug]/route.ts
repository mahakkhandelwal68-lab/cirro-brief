import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/public-briefs/[slug]">) {
  const { slug } = await ctx.params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("briefs")
    .select("id, title, publication, excerpt, audio_url, category, created_at")
    .eq("public_slug", slug)
    .eq("visibility", "public")
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found." }, { status: 404 });

  return NextResponse.json({ brief: data });
}
