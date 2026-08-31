"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateBrief } from "../CreateBriefContext";

const STAGES = [
  "Preparing your newsletter",
  "Writing your script",
  "Applying pronunciations",
  "Generating audio",
  "Preparing your assets",
  "Finishing up",
];

export default function GeneratingPage() {
  const router = useRouter();
  const ctx = useCreateBrief();
  const { url, article, style, specialInstructions, reviewedScript, voice, pronunciations } = ctx;
  const [stageIndex, setStageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!article || !voice) {
      router.replace("/dashboard/create-brief");
      return;
    }
    if (startedRef.current) return;
    startedRef.current = true;

    const stageTimer = setInterval(() => setStageIndex((i) => Math.min(i + 1, STAGES.length - 2)), 2200);

    fetch("/api/briefs/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        title: article.title,
        publication: article.publication,
        excerpt: article.excerpt,
        textContent: article.textContent,
        style,
        specialInstructions,
        script: reviewedScript || undefined,
        voiceId: voice.voiceId,
        voiceName: voice.voiceName,
        pronunciations,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        clearInterval(stageTimer);
        if (data.error) {
          setError(data.error);
          return;
        }
        setStageIndex(STAGES.length - 1);
        setTimeout(() => router.push(`/dashboard/briefs/${data.brief.id}`), 700);
      })
      .catch(() => {
        clearInterval(stageTimer);
        setError("Something went wrong while generating your brief. Please try again.");
      });

    return () => clearInterval(stageTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, voice]);

  if (!article || !voice) return null;

  return (
    <main style={{ maxWidth: 500, margin: "0 auto", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ position: "relative", width: 72, height: 72, margin: "0 auto 28px" }}>
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid var(--border2)" }} />
        {!error && (
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid transparent", borderTopColor: "var(--accent)", animation: "cbSpin 1.1s linear infinite" }} />
        )}
      </div>

      {error ? (
        <>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, margin: "0 0 10px", color: "#c0392b" }}>Generation failed</h1>
          <p style={{ fontSize: 15, color: "var(--text2)", margin: "0 0 20px" }}>{error}</p>
          <button
            onClick={() => router.push("/dashboard/create-brief/review")}
            style={{ background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 15, fontWeight: 500, padding: "12px 22px", borderRadius: 11, cursor: "pointer" }}
          >
            Back to Review
          </button>
        </>
      ) : (
        <>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 30, letterSpacing: "-.02em", margin: "0 0 8px" }}>Creating your Brief</h1>
          <p style={{ fontSize: 15, color: "var(--text2)", margin: "0 0 32px" }}>
            {stageIndex + 1} of {STAGES.length} steps complete
          </p>
          <div style={{ width: "100%", height: 4, borderRadius: 2, background: "var(--border2)", marginBottom: 28 }}>
            <div style={{ width: `${((stageIndex + 1) / STAGES.length) * 100}%`, height: "100%", background: "var(--accent)", borderRadius: 2, transition: "width .4s ease" }} />
          </div>
          <div style={{ textAlign: "left", border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "8px 0" }}>
            {STAGES.map((label, i) => {
              const done = i < stageIndex;
              const active = i === stageIndex;
              return (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", fontSize: 14.5, color: done || active ? "var(--text)" : "var(--text3)" }}>
                  <span
                    style={{
                      flex: "none",
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: `1.5px solid ${done || active ? "var(--accent)" : "var(--border)"}`,
                      background: done ? "var(--accent)" : active ? "var(--accent2)" : "transparent",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 8,
                      animation: active ? "cbPulse 1.4s ease-in-out infinite" : "none",
                    }}
                  >
                    {done ? "✓" : ""}
                  </span>
                  {label}
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 13, color: "var(--text3)", margin: "20px 0 0" }}>Please keep this tab open while we prepare your briefing.</p>
        </>
      )}
    </main>
  );
}
