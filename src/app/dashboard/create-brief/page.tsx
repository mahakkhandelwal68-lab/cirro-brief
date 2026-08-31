"use client";

import { useRouter } from "next/navigation";
import { useCreateBrief } from "./CreateBriefContext";

const STEPS = ["Content", "Preferences", "Voice", "Generate"];

export function StepTracker({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 32 }}>
      {STEPS.map((s, i) => (
        <span key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: i === current ? "var(--accent2)" : "var(--text3)", fontWeight: i === current ? 500 : 400 }}>{s}</span>
          {i < STEPS.length - 1 && <span style={{ color: "var(--text3)" }}>→</span>}
        </span>
      ))}
    </div>
  );
}

export default function CreateBriefStep1() {
  const router = useRouter();
  const { url, setUrl } = useCreateBrief();

  function handleContinue() {
    if (!url.trim()) return;
    router.push("/dashboard/create-brief/processing");
  }

  return (
    <main style={{ maxWidth: 620, margin: "0 auto", padding: "48px 40px 64px" }}>
      <StepTracker current={0} />
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, letterSpacing: "-.025em", margin: "0 0 12px" }}>
        What newsletter are we turning into audio?
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 28px" }}>Paste the link to a published edition.</p>

      <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px", boxShadow: "var(--shadow)", marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 9 }}>Newsletter link</label>
        <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--border)", borderRadius: 11, padding: "13px 15px", background: "var(--bg)" }}>
          <span style={{ color: "var(--text3)", fontSize: 14 }}>⛓</span>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yournewsletter.com/..."
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 15.5, color: "var(--text)" }}
          />
        </div>
      </div>

      <button
        onClick={handleContinue}
        style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 16, fontWeight: 500, padding: 15, borderRadius: 12, cursor: "pointer", marginBottom: 20 }}
      >
        Continue →
      </button>

      <p style={{ fontSize: 13, color: "var(--text3)", margin: 0 }}>
        We only read the content of the page you submit - nothing else is accessed from your account.
      </p>
    </main>
  );
}
