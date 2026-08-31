"use client";

import { useEffect, useState } from "react";

interface Profile {
  publication_name: string | null;
  publication_url: string | null;
  industry: string | null;
  default_style: string | null;
}

interface Pronunciation {
  id: string;
  word: string;
  pronunciation: string;
}

const INDUSTRIES = ["Technology", "Business", "Marketing", "Finance", "AI", "Health", "Other"];
const STYLES = ["Clear & Professional", "Conversational", "Energetic", "Analytical"];

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile>({ publication_name: "", publication_url: "", industry: INDUSTRIES[0], default_style: STYLES[1] });
  const [pronunciations, setPronunciations] = useState<Pronunciation[]>([]);
  const [pronWord, setPronWord] = useState("");
  const [pronSay, setPronSay] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/profile").then((r) => r.json()).then((d) => d.profile && setProfile(d.profile));
    fetch("/api/pronunciations").then((r) => r.json()).then((d) => setPronunciations(d.pronunciations || []));
  }, []);

  async function saveProfile() {
    await fetch("/api/profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profile) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function addPronunciation() {
    if (!pronWord.trim() || !pronSay.trim()) return;
    const res = await fetch("/api/pronunciations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: pronWord, pronunciation: pronSay }),
    });
    const data = await res.json();
    if (data.pronunciation) setPronunciations((p) => [data.pronunciation, ...p]);
    setPronWord("");
    setPronSay("");
  }

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: "24px 40px 64px" }}>
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, letterSpacing: "-.02em", margin: "0 0 24px" }}>Settings</h1>

      <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "24px 26px", marginBottom: 20, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17 }}>Publication Profile</div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 7 }}>Publication name</label>
          <input
            value={profile.publication_name || ""}
            onChange={(e) => setProfile({ ...profile, publication_name: e.target.value })}
            style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px", fontSize: 14.5, background: "var(--bg)", color: "var(--text)" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 7 }}>Website or newsletter link</label>
          <input
            value={profile.publication_url || ""}
            onChange={(e) => setProfile({ ...profile, publication_url: e.target.value })}
            style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px", fontSize: 14.5, background: "var(--bg)", color: "var(--text)" }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 7 }}>Industry</label>
            <select
              value={profile.industry || INDUSTRIES[0]}
              onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
              style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px", fontSize: 14.5, background: "var(--bg)", color: "var(--text)" }}
            >
              {INDUSTRIES.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 7 }}>Default briefing style</label>
            <select
              value={profile.default_style || STYLES[1]}
              onChange={(e) => setProfile({ ...profile, default_style: e.target.value })}
              style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px", fontSize: 14.5, background: "var(--bg)", color: "var(--text)" }}
            >
              {STYLES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={saveProfile}
          style={{ alignSelf: "flex-start", background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 14.5, fontWeight: 500, padding: "10px 18px", borderRadius: 10, cursor: "pointer" }}
        >
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "24px 26px" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, marginBottom: 14 }}>Saved Pronunciations</div>
        {pronunciations.map((p) => (
          <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border2)", fontSize: 14.5 }}>
            <span style={{ fontWeight: 500 }}>{p.word}</span>
            <span style={{ color: "var(--accent2)", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 13.5 }}>{p.pronunciation}</span>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginTop: 14 }}>
          <input value={pronWord} onChange={(e) => setPronWord(e.target.value)} placeholder="Word" style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", fontSize: 14, background: "var(--bg)", color: "var(--text)" }} />
          <input value={pronSay} onChange={(e) => setPronSay(e.target.value)} placeholder="Pronounced as" style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", fontSize: 14, background: "var(--bg)", color: "var(--text)" }} />
          <button onClick={addPronunciation} style={{ border: "1px solid var(--border)", background: "transparent", color: "var(--accent2)", borderRadius: 8, padding: "8px 12px", fontSize: 13, cursor: "pointer" }}>
            Add
          </button>
        </div>
      </div>
    </main>
  );
}
