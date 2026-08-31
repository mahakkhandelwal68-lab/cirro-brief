import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ profile: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await req.json();
  const { publication_name, publication_url, industry, default_style, onboarded, saved_voice_id } = body;

  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        ...(publication_name !== undefined && { publication_name }),
        ...(publication_url !== undefined && { publication_url }),
        ...(industry !== undefined && { industry }),
        ...(default_style !== undefined && { default_style }),
        ...(onboarded !== undefined && { onboarded }),
        ...(saved_voice_id !== undefined && { saved_voice_id }),
      },
      { onConflict: "id" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ profile: data });
}
