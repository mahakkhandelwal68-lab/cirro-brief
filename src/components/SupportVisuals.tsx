"use client";

import { useState } from "react";
import { ChatIcon, MailIcon, InstagramIcon, ChevronDownIcon } from "./icons";

export function SupportHeroGraphic() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 340, height: 260, margin: "0 auto" }}>
      <svg viewBox="0 0 340 260" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
        <path d="M100,80 A100,100 0 0,1 240,80" stroke="var(--border)" strokeWidth={1.4} strokeDasharray="4 6" fill="none" />
        <path d="M60,190 A150,150 0 0,1 280,190" stroke="var(--border)" strokeWidth={1.4} strokeDasharray="4 6" fill="none" />
      </svg>

      {["+", "+", "+", "+"].map((s, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            fontSize: 16,
            color: "var(--border)",
            top: [10, 40, 210, 170][i],
            left: [150, 300, 20, 300][i],
          }}
        >
          {s}
        </span>
      ))}

      <div
        className="float-slow icon-badge icon-glow"
        style={{ position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)", width: 58, height: 58, borderRadius: "50%", background: "var(--tint)", color: "var(--accent2)" }}
      >
        <ChatIcon size={24} />
      </div>
      <div
        className="float-slow icon-badge icon-glow"
        style={{ position: "absolute", top: 100, left: 30, width: 58, height: 58, borderRadius: "50%", background: "var(--tint-lavender)", color: "var(--purple)", animationDelay: ".3s" }}
      >
        <MailIcon size={24} />
      </div>
      <div
        className="float-slow icon-badge icon-glow"
        style={{ position: "absolute", top: 100, right: 30, width: 58, height: 58, borderRadius: "50%", background: "var(--orange-tint)", color: "var(--orange)", animationDelay: ".6s" }}
      >
        <InstagramIcon size={24} />
      </div>

      <div
        style={{
          position: "absolute",
          top: 92,
          left: "50%",
          transform: "translateX(-50%)",
          width: 76,
          height: 76,
          borderRadius: "50%",
          background: "var(--card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow), var(--glow-teal)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent2)",
        }}
      >
        <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.6A4.5 4.5 0 0 1 17 17H7z" />
        </svg>
      </div>
    </div>
  );
}

type FaqItem = { icon: React.ReactNode; color: string; q: string; a: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.q} style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", overflow: "hidden" }}>
            <button
              onClick={() => setOpen(expanded ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "18px 20px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                color: "var(--text)",
              }}
            >
              <span className="icon-badge" style={{ width: 30, height: 30, borderRadius: 9, background: "var(--tint)", color: item.color, flex: "none" }}>
                {item.icon}
              </span>
              <span style={{ flex: 1, fontSize: 15.5, fontWeight: 500 }}>{item.q}</span>
              <span style={{ color: "var(--text3)", flex: "none", transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}>
                <ChevronDownIcon size={18} />
              </span>
            </button>
            {expanded && (
              <div style={{ padding: "0 20px 20px 64px", fontSize: 14.5, color: "var(--text2)" }}>{item.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
