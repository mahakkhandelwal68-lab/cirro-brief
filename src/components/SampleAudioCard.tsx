"use client";

import { useMemo, useState } from "react";
import { MountainImage, SAMPLE } from "./SampleContent";
import { HeadphonesIcon, CheckCircleIcon } from "./icons";

/* The generated Cirro Brief for the sample newsletter. The waveform is drawn
   in CSS (never an image) and animates while "playing". */
export function AudioBriefCard({ style }: { style?: React.CSSProperties }) {
  const [playing, setPlaying] = useState(false);
  const bars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        h: 20 + Math.round(70 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.21))),
        d: (-(i % 9) * 0.13).toFixed(2) + "s",
      })),
    []
  );

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--card)", boxShadow: "var(--shadow), var(--glow-teal)", padding: "18px 20px 16px", ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 600 }}>
          <span className="icon-badge" style={{ width: 26, height: 26, borderRadius: 8, background: "var(--tint)", color: "var(--accent2)" }}>
            <HeadphonesIcon size={14} />
          </span>
          Cirro Brief
        </span>
        <span style={{ fontSize: 11.5, color: "var(--accent2)", background: "var(--tint)", border: "1px solid var(--border)", borderRadius: 999, padding: "4px 11px" }}>
          Audio Brief · Edition 128
        </span>
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(17px, 2.4vw, 21px)", lineHeight: 1.2, marginBottom: 10 }}>{SAMPLE.briefTitle}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Concise", "Natural voice", "Key insights"].map((c) => (
              <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--accent2)", background: "var(--tint)", borderRadius: 999, padding: "3px 9px" }}>
                <CheckCircleIcon size={11} /> {c}
              </span>
            ))}
          </div>
        </div>
        <div style={{ width: "30%", maxWidth: 130, minWidth: 80, flex: "none" }}>
          <MountainImage crop="4/3" radius={12} sizes="130px" />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause sample" : "Play sample"}
          className="btn-pop"
          style={{ width: 44, height: 44, flex: "none", border: "none", borderRadius: "50%", background: "var(--btn)", color: "var(--btn-text)", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 6px color-mix(in srgb, var(--accent2) 18%, transparent)" }}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 2, height: 34, minWidth: 0 }}>
          {bars.map((b, i) => (
            <span
              key={i}
              style={{
                flex: 1,
                height: `${b.h}%`,
                borderRadius: 1,
                background: "var(--accent2)",
                opacity: i < 10 ? 1 : 0.5,
                animation: "cbWave 1.2s ease-in-out infinite",
                animationDelay: b.d,
                animationPlayState: playing ? "running" : "paused",
                transformOrigin: "center",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 12, color: "var(--text3)", flex: "none" }}>01:32</span>
      </div>
    </div>
  );
}
