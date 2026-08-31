import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateScriptVariants } from "@/lib/gemini";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { title, textContent, specialInstructions } = (await req.json()) as {
    title?: string;
    textContent?: string;
    specialInstructions?: string;
  };

  if (!title || !textContent) {
    return NextResponse.json({ error: "Missing article content." }, { status: 400 });
  }

  try {
    const variants = await generateScriptVariants({ title, textContent, style: "Conversational", specialInstructions });
    return NextResponse.json({ variants });
  } catch (err) {
    console.error("Script variant generation failed:", err);
    return NextResponse.json({ error: "Could not generate script variants. Please try again." }, { status: 500 });
  }
}
