"use client";

import { useEffect, useState } from "react";
import { ChatIcon as SpeechIcon, ChevronDownIcon } from "./icons";

const STYLES = ["Conversational", "Analytical", "Engaging"];

export function StyleVoiceCard() {
  const [style, setStyle] = useState(STYLES[0]);

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px", boxShadow: "var(--shadow)", display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text2)", marginBottom: 10 }}>Briefing style</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {STYLES.map((s) => {
            const on = style === s;
            return (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className="btn-pop"
                style={{
                  cursor: "pointer",
                  fontSize: 13.5,
                  padding: "9px 15px",
                  borderRadius: 999,
                  border: `1px solid ${on ? "var(--accent2)" : "var(--border)"}`,
                  background: on ? "var(--tint)" : "transparent",
                  color: on ? "var(--accent2)" : "var(--text2)",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text2)", marginBottom: 10 }}>Voice</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid var(--border)", borderRadius: 11, padding: "10px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--tint)", color: "var(--accent2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>M</span>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Maya · Warm, clear</span>
          </div>
          <ChevronDownIcon size={16} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 13, color: "var(--accent2)" }}>
          <SpeechIcon size={14} /> Preview voice
        </div>
      </div>
    </div>
  );
}

const GEN_STAGES = ["Newsletter processed", "Brief prepared", "Generating audio", "Preparing assets"];

export function GeneratingCard() {
  const [stage, setStage] = useState(2);

  useEffect(() => {
    const t = setInterval(() => setStage((s) => (s + 1) % (GEN_STAGES.length + 1)), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "24px 26px", boxShadow: "var(--shadow)" }}>
      <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text2)", marginBottom: 20 }}>Creating your Brief</div>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {GEN_STAGES.map((label, i) => {
          const done = i < stage;
          const active = i === stage;
          return (
            <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative" }}>
              {i > 0 && (
                <div style={{ position: "absolute", top: 14, right: "50%", width: "100%", height: 1, background: i <= stage ? "var(--accent2)" : "var(--border2)" }} />
              )}
              <span
                className={active ? "icon-glow" : undefined}
                style={{
                  position: "relative",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: `1.5px solid ${done || active ? "var(--accent2)" : "var(--border)"}`,
                  background: done ? "var(--accent2)" : active ? "var(--accent2)" : "var(--bg)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  animation: active ? "cbPulse 1.4s ease-in-out infinite" : "none",
                }}
              >
                {done ? "✓" : ""}
              </span>
              <span style={{ fontSize: 11.5, textAlign: "center", color: done || active ? "var(--text)" : "var(--text3)" }}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
