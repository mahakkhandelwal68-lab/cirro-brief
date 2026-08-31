"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

const INDUSTRIES = ["Technology", "Business", "Marketing", "Finance", "AI", "Health", "Other"];
const STYLES: [string, string][] = [
  ["Clear & Professional", "Balanced and easy to follow."],
  ["Conversational", "Natural and approachable."],
  ["Energetic", "More engaging and expressive."],
  ["Analytical", "Focused and insight-driven."],
];

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div style={{ height: 4, borderRadius: 2, background: "var(--border2)", marginBottom: 26 }}>
      <div style={{ width: `${pct}%`, height: "100%", background: "var(--accent)", borderRadius: 2 }} />
    </div>
  );
}

export default function WorkspaceSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [style, setStyle] = useState("Conversational");
  const [pronWord, setPronWord] = useState("");
  const [pronSay, setPronSay] = useState("");
  const [savedPron, setSavedPron] = useState<{ word: string; say: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function saveProfile(fields: Record<string, unknown>): Promise<boolean> {
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Could not save your progress. Please try again.");
        return false;
      }
      return true;
    } catch {
      setError("Network error. Please try again.");
      return false;
    }
  }

  async function addPronunciation() {
    if (!pronWord.trim() || !pronSay.trim()) return;
    await fetch("/api/pronunciations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: pronWord, pronunciation: pronSay }),
    });
    setSavedPron((p) => [...p, { word: pronWord, say: pronSay }]);
    setPronWord("");
    setPronSay("");
  }

  async function finish() {
    setSaving(true);
    const ok = await saveProfile({ onboarded: true });
    setSaving(false);
    if (ok) router.push("/dashboard");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid var(--border2)" }}>
            <Image src="/brand/icon.png" alt="Cirro" width={28} height={28} style={{ objectFit: "contain" }} />
          </div>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>Cirro Brief</span>
        </div>
        <ThemeToggle />
      </header>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 40px 60px" }}>
        <div style={{ maxWidth: 520, width: "100%" }}>
          {step === 0 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 14 }}>Set Up Your Workspace</div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, lineHeight: 1.2, letterSpacing: "-.02em", margin: "0 0 14px" }}>
                Let&apos;s set up your Cirro Brief.
              </h1>
              <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 6px" }}>We&apos;ll save a few details to make creating future Briefs easier.</p>
              <p style={{ fontSize: 13.5, color: "var(--text3)", margin: "0 0 30px" }}>Takes about 2 minutes.</p>
              <button
                onClick={() => setStep(1)}
                style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12, cursor: "pointer" }}
              >
                Get Started <span style={{ opacity: 0.75 }}>→</span>
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>Step 1 of 3</div>
              <ProgressBar pct={33} />
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, letterSpacing: "-.02em", margin: "0 0 22px" }}>Tell us about your publication.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 26 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 7 }}>Publication name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your newsletter or publication name"
                    style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, padding: "13px 14px", fontSize: 15, background: "var(--bg)", color: "var(--text)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 7 }}>Website or newsletter link</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://"
                    style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, padding: "13px 14px", fontSize: 15, background: "var(--bg)", color: "var(--text)" }}
                  />
                  <div style={{ fontSize: 12.5, color: "var(--text3)", marginTop: 6 }}>This helps us understand the content you&apos;re creating Briefs from.</div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 7 }}>Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, padding: "13px 14px", fontSize: 15, background: "var(--bg)", color: "var(--text)" }}
                  >
                    {INDUSTRIES.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={async () => {
                  const ok = await saveProfile({ publication_name: name, publication_url: url, industry });
                  if (ok) setStep(2);
                }}
                style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 16, fontWeight: 500, padding: 15, borderRadius: 12, cursor: "pointer" }}
              >
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>Step 2 of 3</div>
              <ProgressBar pct={66} />
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, letterSpacing: "-.02em", margin: "0 0 6px" }}>How would you like your Briefs to feel?</h2>
              <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 22px" }}>You can change these preferences for any individual Brief later.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 }}>
                {STYLES.map(([s, desc]) => {
                  const on = style === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      style={{ textAlign: "left", cursor: "pointer", border: `1px solid ${on ? "var(--accent2)" : "var(--border)"}`, background: on ? "var(--tint)" : "var(--card)", borderRadius: 12, padding: "15px 16px", display: "flex", flexDirection: "column", gap: 3 }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500, fontSize: 15.5, color: "var(--text)" }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: on ? "var(--accent)" : "var(--border)" }} />
                        {s}
                      </span>
                      <span style={{ fontSize: 13.5, color: "var(--text2)", paddingLeft: 15 }}>{desc}</span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={async () => {
                  const ok = await saveProfile({ default_style: style });
                  if (ok) setStep(3);
                }}
                style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 16, fontWeight: 500, padding: 15, borderRadius: 12, cursor: "pointer" }}
              >
                Continue →
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>Step 3 of 3</div>
              <ProgressBar pct={100} />
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, letterSpacing: "-.02em", margin: "0 0 6px" }}>Any words we should pronounce carefully?</h2>
              <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 22px" }}>Add brand names, people, industry terms, or other words that may need special pronunciation.</p>
              <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "6px 0", marginBottom: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: "12px 18px", borderBottom: "1px solid var(--border2)", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text3)" }}>
                  <span>Word</span>
                  <span>How it should sound</span>
                </div>
                {savedPron.map((p) => (
                  <div key={p.word} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: "12px 18px", fontSize: 15 }}>
                    <span style={{ fontWeight: 500 }}>{p.word}</span>
                    <span style={{ color: "var(--accent2)", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 13.5 }}>{p.say}</span>
                  </div>
                ))}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, padding: "10px 18px" }}>
                  <input value={pronWord} onChange={(e) => setPronWord(e.target.value)} placeholder="Word" style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", fontSize: 14, background: "var(--bg)", color: "var(--text)" }} />
                  <input value={pronSay} onChange={(e) => setPronSay(e.target.value)} placeholder="Pronounced as" style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", fontSize: 14, background: "var(--bg)", color: "var(--text)" }} />
                  <button onClick={addPronunciation} style={{ border: "1px solid var(--border)", background: "transparent", color: "var(--accent2)", borderRadius: 8, padding: "8px 12px", fontSize: 13, cursor: "pointer" }}>
                    Add
                  </button>
                </div>
              </div>
              <button
                onClick={finish}
                disabled={saving}
                style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 16, fontWeight: 500, padding: 15, borderRadius: 12, cursor: "pointer", marginBottom: 12 }}
              >
                {saving ? "Finishing..." : "Finish Setup →"}
              </button>
              <button onClick={finish} disabled={saving} style={{ width: "100%", background: "transparent", border: "none", color: "var(--text2)", fontSize: 14.5, padding: 6, cursor: "pointer" }}>
                Skip for now
              </button>
            </div>
          )}

          {error && (
            <div style={{ marginTop: 16, padding: "12px 14px", borderRadius: 10, border: "1px solid #c0392b", color: "#c0392b", fontSize: 13.5, textAlign: "center" }}>
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
