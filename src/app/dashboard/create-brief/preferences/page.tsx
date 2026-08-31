"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateBrief } from "../CreateBriefContext";
import { StepTracker } from "../page";

const STYLES: [string, string][] = [
  ["Clear & Professional", "Structured and easy to follow."],
  ["Conversational", "Natural and relaxed."],
  ["Analytical", "Context and insights."],
  ["Energetic", "Lively and engaging."],
];

export default function BriefPreferencesPage() {
  const router = useRouter();
  const { article, style, setStyle, wantsReview, setWantsReview, specialInstructions, setSpecialInstructions } = useCreateBrief();

  useEffect(() => {
    if (!article) router.replace("/dashboard/create-brief");
  }, [article, router]);

  if (!article) return null;

  return (
    <main style={{ maxWidth: 620, margin: "0 auto", padding: "48px 40px 64px" }}>
      <StepTracker current={1} />
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, letterSpacing: "-.025em", margin: "0 0 28px" }}>
        How should this briefing feel?
      </h1>

      <div style={{ marginBottom: 28 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 10 }}>Briefing style</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {STYLES.map(([name, note]) => {
            const on = style === name;
            return (
              <button
                key={name}
                onClick={() => setStyle(name)}
                style={{ textAlign: "left", cursor: "pointer", border: `1px solid ${on ? "var(--accent2)" : "var(--border)"}`, background: on ? "var(--tint)" : "var(--card)", borderRadius: 12, padding: "15px 16px", display: "flex", flexDirection: "column", gap: 3 }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 500, fontSize: 15, color: "var(--text)" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: on ? "var(--accent)" : "var(--border)" }} />
                  {name}
                </span>
                <span style={{ fontSize: 13.5, color: "var(--text2)", paddingLeft: 14 }}>{note}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 10 }}>
          Would you like to review the script before audio is generated?
        </label>
        <div style={{ display: "flex", gap: 10 }}>
          {[["No, generate automatically", false], ["Yes, let me review it first", true]].map(([label, val]) => {
            const on = wantsReview === val;
            return (
              <button
                key={label as string}
                onClick={() => setWantsReview(val as boolean)}
                style={{ flex: 1, cursor: "pointer", textAlign: "left", border: `1px solid ${on ? "var(--accent2)" : "var(--border)"}`, background: on ? "var(--tint)" : "var(--card)", borderRadius: 12, padding: "14px 16px", fontSize: 14.5, color: "var(--text)" }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 10 }}>
          Special instructions <span style={{ color: "var(--text3)", fontWeight: 400 }}>(optional)</span>
        </label>
        <textarea
          rows={3}
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="e.g. Mention our upcoming event at the end, skip the sponsor section..."
          style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", fontSize: 14.5, background: "var(--bg)", color: "var(--text)", resize: "vertical" }}
        />
      </div>

      <button
        onClick={() => router.push(wantsReview ? "/dashboard/create-brief/script-review" : "/dashboard/create-brief/voice")}
        style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 16, fontWeight: 500, padding: 15, borderRadius: 12, cursor: "pointer" }}
      >
        Continue →
      </button>
    </main>
  );
}
