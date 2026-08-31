import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateFullBriefScript } from "@/lib/gemini";
import { textToSpeech } from "@/lib/elevenlabs";

export const dynamic = "force-dynamic";

interface GenerateBody {
  url: string;
  title: string;
  publication?: string;
  excerpt?: string;
  textContent?: string;
  style: string;
  specialInstructions?: string;
  script?: string; // pre-approved script from the review step, if the customer opted in
  voiceId: string;
  voiceName: string;
  pronunciations?: { word: string; pronunciation: string }[];
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = (await req.json()) as GenerateBody;
  const { url, title, publication, excerpt, textContent, style, specialInstructions, script, voiceId, voiceName, pronunciations } = body;

  if (!url || !title || !style || !voiceId) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!script && !textContent) {
    return NextResponse.json({ error: "Missing article content to generate a script from." }, { status: 400 });
  }

  try {
    // Business rule: validate everything above first, then generate, and
    // only persist the brief record (i.e. "spend" it) once generation has
    // actually succeeded - never create a record for a failed attempt.
    const finalScript = script || (await generateFullBriefScript({ title, textContent: textContent!, style, specialInstructions, pronunciations }));
    const audioBuffer = await textToSpeech(finalScript, voiceId);

    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.mp3`;
    const { error: uploadError } = await supabase.storage.from("briefs-audio").upload(fileName, audioBuffer, {
      contentType: "audio/mpeg",
      upsert: false,
    });
    if (uploadError) throw new Error(`Audio upload failed: ${uploadError.message}`);

    const { data: publicUrlData } = supabase.storage.from("briefs-audio").getPublicUrl(fileName);

    const { data: brief, error: insertError } = await supabase
      .from("briefs")
      .insert({
        user_id: user.id,
        newsletter_url: url,
        title,
        publication: publication || null,
        excerpt: excerpt || null,
        style,
        voice_id: voiceId,
        voice_name: voiceName,
        script: finalScript,
        status: "complete",
        audio_url: publicUrlData.publicUrl,
      })
      .select()
      .single();

    if (insertError) throw new Error(insertError.message);

    return NextResponse.json({ brief });
  } catch (err) {
    console.error("Brief generation failed:", err);
    const message = err instanceof Error ? err.message : "Generation failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
