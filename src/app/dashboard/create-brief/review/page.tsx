"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateBrief } from "../CreateBriefContext";
import { StepTracker } from "../page";

const ROWS: [string, (ctx: ReturnType<typeof useCreateBrief>) => string, string][] = [
  ["Newsletter", (c) => c.article?.title || "", "/dashboard/create-brief"],
  ["Style", (c) => c.style, "/dashboard/create-brief/preferences"],
  ["Script", (c) => (c.reviewedScript ? "Reviewed & edited" : "Generated automatically"), "/dashboard/create-brief/preferences"],
  ["Voice", (c) => c.voice?.voiceName || "", "/dashboard/create-brief/voice"],
  ["Pronunciations", (c) => (c.pronunciations.length ? `${c.pronunciations.length} word(s)` : "None"), "/dashboard/create-brief/pronunciation"],
];

export default function ReviewAndGeneratePage() {
  const router = useRouter();
  const ctx = useCreateBrief();
  const { article, voice } = ctx;

  useEffect(() => {
    if (!article || !voice) router.replace("/dashboard/create-brief");
  }, [article, voice, router]);

  if (!article || !voice) return null;

  return (
    <main style={{ maxWidth: 620, margin: "0 auto", padding: "48px 40px 64px" }}>
      <StepTracker current={3} />
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, letterSpacing: "-.025em", margin: "0 0 12px" }}>
        Review &amp; generate.
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 28px" }}>Double-check your choices before we create the briefing.</p>

      <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", marginBottom: 28, overflow: "hidden" }}>
        {ROWS.map(([label, getValue, href]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "16px 20px", borderBottom: "1px solid var(--border2)" }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 3 }}>{label}</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{getValue(ctx)}</div>
            </div>
            <button onClick={() => router.push(href)} style={{ fontSize: 13.5, color: "var(--accent2)", background: "none", border: "none", cursor: "pointer" }}>
              Change
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>What will be created</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {["🎧 Audio briefing (MP3)", "📝 Full script", "💡 Key insights", "📣 Promotional copy", "🌐 Shareable public page", "▣ QR code"].map((a) => (
            <div key={a} style={{ border: "1px solid var(--border2)", borderRadius: 10, padding: "10px 13px", fontSize: 13.5, color: "var(--text2)", background: "var(--bg2)" }}>
              {a}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push("/dashboard/create-brief/generating")}
        style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 16.5, fontWeight: 500, padding: 16, borderRadius: 12, cursor: "pointer" }}
      >
        Generate My Brief →
      </button>
    </main>
  );
}
