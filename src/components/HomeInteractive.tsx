"use client";

import { useMemo, useState } from "react";

export function HomeInteractive() {
  const [playing, setPlaying] = useState(false);
  const bars = useMemo(
    () =>
      Array.from({ length: 52 }, (_, i) => ({
        h: 22 + Math.round(64 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23))) + "%",
        d: (-(i % 11) * 0.11).toFixed(2) + "s",
      })),
    []
  );

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 18, padding: "22px 24px", boxShadow: "var(--shadow)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="btn-pop"
          style={{ width: 48, height: 48, flex: "none", border: "none", borderRadius: "50%", background: "var(--btn)", color: "var(--btn-text)", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--glow-teal)" }}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15.5 }}>Audio Briefing • Edition 128</div>
          <div style={{ fontSize: 12.5, color: "var(--text3)" }}>Demo preview</div>
        </div>
        <span style={{ fontSize: 12.5, color: "var(--text3)" }}>08:42</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 44, marginBottom: 14 }}>
        {bars.map((bar, i) => (
          <span
            key={i}
            style={{
              flex: 1,
              borderRadius: 2,
              background: `linear-gradient(180deg, var(--purple), var(--accent2))`,
              height: bar.h,
              transformOrigin: "center bottom",
              animation: "cbWave 1.1s ease-in-out infinite",
              animationDelay: bar.d,
              animationPlayState: playing ? "running" : "paused",
              opacity: 0.9,
            }}
          />
        ))}
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "var(--border2)", position: "relative" }}>
        <div style={{ position: "absolute", inset: "0 auto 0 0", width: "18%", background: "var(--accent)", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: "18%", top: -3, width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", marginTop: 8 }}>
        <span>00:00</span>
        <span>08:42</span>
      </div>
    </div>
  );
}
