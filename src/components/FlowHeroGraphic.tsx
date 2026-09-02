"use client";

import { useMemo, useState } from "react";
import { HeadphonesIcon, DocumentIcon, ShareUpIcon, ForwardIcon, DotsIcon, MegaphoneIcon } from "./icons";

const NODES = [
  { icon: <HeadphonesIcon size={18} />, top: 4, left: 40, color: "var(--accent2)" },
  { icon: <DocumentIcon size={18} />, top: 90, left: -14, color: "var(--accent2)" },
  { icon: <ShareUpIcon size={18} />, top: 4, left: 400, color: "var(--orange)" },
  { icon: <ForwardIcon size={18} />, top: 88, left: 430, color: "var(--purple)" },
  { icon: <DotsIcon size={18} />, top: 180, left: 400, color: "var(--accent2)" },
];

const MINI_CARDS: [React.ReactNode, string, string][] = [
  [<HeadphonesIcon key="a" size={17} />, "Audio Brief", "MP3"],
  [<DocumentIcon key="b" size={17} />, "Publishing Assets", "Ready to share"],
  [<DocumentIcon key="c" size={17} />, "Brief Summary", "Key takeaways"],
  [<MegaphoneIcon key="d" size={17} />, "Share Everywhere", "Multiple formats"],
];

export function FlowHeroGraphic() {
  const [playing, setPlaying] = useState(false);
  const bars = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => 20 + Math.round(60 * Math.abs(Math.sin(i * 0.75) * Math.cos(i * 0.2)))),
    []
  );

  return (
    <div>
      <div style={{ position: "relative", width: "100%", maxWidth: 440, height: 220, margin: "0 auto 16px" }}>
        <svg viewBox="0 0 440 220" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
          {NODES.map((n, i) => (
            <line key={i} x1={n.left + 18} y1={n.top + 18} x2={220} y2={100} stroke="var(--border)" strokeWidth={1} strokeDasharray="4 5" />
          ))}
        </svg>

        {NODES.map((n, i) => (
          <div
            key={i}
            className="float-slow icon-badge icon-glow"
            style={{
              position: "absolute",
              top: n.top,
              left: n.left,
              width: 36,
              height: 36,
              borderRadius: 11,
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: n.color,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {n.icon}
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            top: 40,
            left: 60,
            width: 320,
            borderRadius: 16,
            background: "var(--card)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            padding: "18px 20px",
            boxShadow: "var(--shadow), var(--glow-purple)",
          }}
        >
          <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>Edition 128</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15.5, marginBottom: 14 }}>
            The future of work in a changing world
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="btn-pop"
              style={{ width: 34, height: 34, flex: "none", border: "none", borderRadius: "50%", background: "var(--btn)", color: "var(--btn-text)", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 2, height: 22 }}>
              {bars.map((h, i) => (
                <span key={i} style={{ flex: 1, borderRadius: 1, background: "var(--accent2)", height: `${h}%`, opacity: 0.85 }} />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", marginTop: 8 }}>
            <span>00:00</span>
            <span>12:45</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {MINI_CARDS.map(([icon, title, note]) => (
          <div key={title} style={{ border: "1px solid var(--border)", borderRadius: 12, background: "var(--card)", color: "var(--text)", padding: "12px 10px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ color: "var(--accent2)" }}>{icon}</span>
            <span style={{ fontSize: 12, fontWeight: 600 }}>{title}</span>
            <span style={{ fontSize: 10.5, color: "var(--text3)" }}>{note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
