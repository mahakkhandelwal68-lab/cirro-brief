"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateBrief } from "../CreateBriefContext";
import { StepTracker } from "../page";

interface Variant {
  style: string;
  script: string;
}

export default function ScriptReviewPage() {
  const router = useRouter();
  const { article, specialInstructions, setReviewedScript } = useCreateBrief();
  const [variants, setVariants] = useState<Variant[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chosenIndex, setChosenIndex] = useState<number | null>(null);
  const [editableScript, setEditableScript] = useState("");

  useEffect(() => {
    if (!article) {
      router.replace("/dashboard/create-brief");
      return;
    }
    fetch("/api/briefs/script-variants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: article.title, textContent: article.textContent, specialInstructions }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setVariants(data.variants);
      })
      .catch(() => setError("Could not generate script variants. Please try again."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  function pickVariant(i: number) {
    setChosenIndex(i);
    setEditableScript(variants![i].script);
  }

  function handleContinue() {
    setReviewedScript(editableScript);
    router.push("/dashboard/create-brief/voice");
  }

  if (!article) return null;

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 40px 64px" }}>
      <StepTracker current={1} />
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, letterSpacing: "-.025em", margin: "0 0 12px" }}>
        Review your script.
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 28px" }}>Pick a version, then edit anything you want before we generate the audio.</p>

      {error && <div style={{ color: "#c0392b", fontSize: 14 }}>{error}</div>}

      {!variants && !error && (
        <div style={{ color: "var(--text3)", fontSize: 15 }}>Writing three script versions...</div>
      )}

      {variants && chosenIndex === null && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {variants.map((v, i) => (
            <button
              key={v.style}
              onClick={() => pickVariant(i)}
              style={{ textAlign: "left", cursor: "pointer", border: "1px solid var(--border)", background: "var(--card)", borderRadius: 14, padding: "18px 20px" }}
            >
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, marginBottom: 6, color: "var(--accent2)" }}>{v.style}</div>
              <div style={{ fontSize: 14, color: "var(--text2)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {v.script}
              </div>
              <div style={{ fontSize: 13.5, color: "var(--accent2)", marginTop: 10, fontWeight: 500 }}>Choose this version →</div>
            </button>
          ))}
        </div>
      )}

      {chosenIndex !== null && (
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 8 }}>Edit your script</label>
          <textarea
            rows={14}
            value={editableScript}
            onChange={(e) => setEditableScript(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 18px", fontSize: 15, lineHeight: 1.6, background: "var(--bg)", color: "var(--text)", resize: "vertical", marginBottom: 16 }}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleContinue} style={{ flex: 1, background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 15.5, fontWeight: 500, padding: 14, borderRadius: 11, cursor: "pointer" }}>
              Looks Good, Continue →
            </button>
            <button onClick={() => setChosenIndex(null)} style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text)", fontSize: 15, padding: "0 20px", borderRadius: 11, cursor: "pointer" }}>
              Back
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
