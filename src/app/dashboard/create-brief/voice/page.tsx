"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateBrief } from "../CreateBriefContext";
import { StepTracker } from "../page";

interface Voice {
  voiceId: string;
  name: string;
  accent: string | null;
  gender: string | null;
  description: string | null;
  previewUrl: string | null;
}

export default function VoiceSelectionPage() {
  const router = useRouter();
  const { article, voice, setVoice } = useCreateBrief();
  const [voices, setVoices] = useState<Voice[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioEl = useMemo(() => (typeof Audio !== "undefined" ? new Audio() : null), []);

  useEffect(() => {
    if (!article) {
      router.replace("/dashboard/create-brief");
      return;
    }
    fetch("/api/voices")
      .then((r) => r.json())
      .then((data) => (data.error ? setError(data.error) : setVoices(data.voices)))
      .catch(() => setError("Could not load voices."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  const filtered = (voices || []).filter((v) => v.name.toLowerCase().includes(search.toLowerCase()));

  function togglePreview(v: Voice) {
    if (!audioEl || !v.previewUrl) return;
    if (playingId === v.voiceId) {
      audioEl.pause();
      setPlayingId(null);
    } else {
      audioEl.src = v.previewUrl;
      audioEl.play();
      setPlayingId(v.voiceId);
    }
  }

  if (!article) return null;

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 40px 100px" }}>
      <StepTracker current={2} />
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, letterSpacing: "-.025em", margin: "0 0 12px" }}>
        Choose a voice.
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 24px" }}>Find a voice that fits your publication.</p>

      {error && <div style={{ color: "#c0392b", fontSize: 14 }}>{error}</div>}

      <div style={{ display: "flex", alignItems: "center", gap: 9, border: "1px solid var(--border)", borderRadius: 10, padding: "10px 13px", marginBottom: 16, background: "var(--bg)" }}>
        <span style={{ opacity: 0.6 }}>⌕</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search voices"
          style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14.5, color: "var(--text)" }}
        />
      </div>

      {!voices && !error && <div style={{ color: "var(--text3)", fontSize: 15 }}>Loading voices...</div>}

      <div style={{ border: "1px solid var(--border2)", borderRadius: 12, overflow: "hidden", marginBottom: 100 }}>
        {filtered.map((v) => {
          const on = voice?.voiceId === v.voiceId;
          return (
            <button
              key={v.voiceId}
              onClick={() => setVoice({ voiceId: v.voiceId, voiceName: v.name })}
              style={{ width: "100%", textAlign: "left", cursor: "pointer", border: "none", borderBottom: "1px solid var(--border2)", background: on ? "var(--tint)" : "transparent", padding: "13px 16px", display: "flex", alignItems: "center", gap: 13 }}
            >
              <span
                onClick={(e) => { e.stopPropagation(); togglePreview(v); }}
                style={{ width: 30, height: 30, flex: "none", borderRadius: "50%", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "var(--accent)" }}
              >
                {playingId === v.voiceId ? "❚❚" : "▶"}
              </span>
              <span style={{ flex: 1 }}>
                <span style={{ display: "block", fontWeight: 500, fontSize: 15, color: "var(--text)" }}>{v.name}</span>
                <span style={{ fontSize: 12.5, color: "var(--text3)" }}>{[v.gender, v.accent].filter(Boolean).join(" · ") || v.description || "Voice"}</span>
              </span>
              {on && <span style={{ fontSize: 12, color: "var(--accent2)" }}>Selected ✓</span>}
            </button>
          );
        })}
      </div>

      {voice && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "var(--card)", borderTop: "1px solid var(--border)", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, boxShadow: "var(--shadow)" }}>
          <span style={{ fontSize: 14.5 }}>
            Selected: <strong>{voice.voiceName}</strong>
          </span>
          <button
            onClick={() => router.push("/dashboard/create-brief/pronunciation")}
            style={{ background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 15, fontWeight: 500, padding: "12px 22px", borderRadius: 11, cursor: "pointer" }}
          >
            Continue →
          </button>
        </div>
      )}
    </main>
  );
}
