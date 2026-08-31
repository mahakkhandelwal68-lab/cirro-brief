import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/briefs/[id]">) {
  const { id } = await ctx.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { data, error } = await supabase.from("briefs").select("*").eq("id", id).eq("user_id", user.id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Brief not found." }, { status: 404 });

  return NextResponse.json({ brief: data });
}

export async function PATCH(req: NextRequest, ctx: RouteContext<"/api/briefs/[id]">) {
  const { id } = await ctx.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { visibility, category } = (await req.json()) as { visibility?: "private" | "public"; category?: string };

  const update: Record<string, unknown> = {};
  if (visibility) {
    update.visibility = visibility;
    if (visibility === "public") {
      update.category = category || "General";
      update.public_slug = `${id.slice(0, 8)}-${Math.random().toString(36).slice(2, 8)}`;
    } else {
      update.public_slug = null;
      update.category = null;
    }
  }

  const { data, error } = await supabase.from("briefs").update(update).eq("id", id).eq("user_id", user.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ brief: data });
}
