import { NextResponse } from "next/server";
import { listVoices } from "@/lib/elevenlabs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const voices = await listVoices();
    return NextResponse.json({
      voices: voices.map((v) => ({
        voiceId: v.voice_id,
        name: v.name,
        accent: v.labels?.accent || null,
        gender: v.labels?.gender || null,
        description: v.labels?.description || v.labels?.use_case || null,
        previewUrl: v.preview_url || null,
      })),
    });
  } catch (err) {
    console.error("Failed to fetch voices:", err);
    return NextResponse.json({ error: "Could not load voices." }, { status: 500 });
  }
}
