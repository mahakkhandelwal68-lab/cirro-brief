"use client";

import { useMemo, useState } from "react";

export function HomeInteractive() {
  const [playing, setPlaying] = useState(false);
  const bars = useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => ({
        h: 26 + Math.round(60 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23))) + "%",
        d: (-(i % 11) * 0.11).toFixed(2) + "s",
      })),
    []
  );

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "24px 26px", boxShadow: "var(--shadow)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <button
          onClick={() => setPlaying((p) => !p)}
          style={{ width: 46, height: 46, flex: "none", border: "none", borderRadius: 14, background: "var(--btn)", color: "var(--btn-text)", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15.5 }}>Audio briefing · Edition 128</div>
          <div style={{ fontSize: 12.5, color: "var(--text3)" }}>Emma · Warm · British — Conversational</div>
        </div>
        <span style={{ fontSize: 12.5, color: "var(--text3)" }}>04:21</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 44, marginBottom: 14 }}>
        {bars.map((bar, i) => (
          <span
            key={i}
            style={{
              flex: 1,
              borderRadius: 2,
              background: "var(--accent2)",
              height: bar.h,
              transformOrigin: "center bottom",
              animation: "cbWave 1.1s ease-in-out infinite",
              animationDelay: bar.d,
              animationPlayState: playing ? "running" : "paused",
              opacity: 0.85,
            }}
          />
        ))}
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "var(--border2)", position: "relative" }}>
        <div style={{ position: "absolute", inset: "0 auto 0 0", width: "38%", background: "var(--accent)", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: "38%", top: -3, width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", marginTop: 8 }}>
        <span>01:39</span>
        <span>+ 4 publishing assets</span>
      </div>
    </div>
  );
}
