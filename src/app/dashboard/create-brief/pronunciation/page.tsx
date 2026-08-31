"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateBrief, type PronunciationEntry } from "../CreateBriefContext";
import { StepTracker } from "../page";

interface SavedPron extends PronunciationEntry {
  id: string;
}

export default function PronunciationSetupPage() {
  const router = useRouter();
  const { article, voice, pronunciations, setPronunciations } = useCreateBrief();
  const [saved, setSaved] = useState<SavedPron[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [word, setWord] = useState("");
  const [say, setSay] = useState("");
  const [alsoSave, setAlsoSave] = useState(true);

  useEffect(() => {
    if (!article || !voice) {
      router.replace("/dashboard/create-brief");
      return;
    }
    fetch("/api/pronunciations")
      .then((r) => r.json())
      .then((data) => {
        const list: SavedPron[] = data.pronunciations || [];
        setSaved(list);
        setSelected(new Set(list.map((p) => p.word)));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, voice]);

  function toggle(w: string) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(w)) next.delete(w);
      else next.add(w);
      return next;
    });
  }

  async function addNew() {
    if (!word.trim() || !say.trim()) return;
    if (alsoSave) {
      const res = await fetch("/api/pronunciations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, pronunciation: say }),
      });
      const data = await res.json();
      if (data.pronunciation) {
        setSaved((s) => [...s, data.pronunciation]);
        setSelected((s) => new Set(s).add(word));
      }
    } else {
      setSaved((s) => [...s, { id: `local-${Date.now()}`, word, pronunciation: say }]);
      setSelected((s) => new Set(s).add(word));
    }
    setWord("");
    setSay("");
  }

  function handleContinue() {
    const chosen: PronunciationEntry[] = saved.filter((p) => selected.has(p.word)).map((p) => ({ word: p.word, pronunciation: p.pronunciation }));
    setPronunciations(chosen);
    router.push("/dashboard/create-brief/review");
  }

  if (!article || !voice) return null;

  return (
    <main style={{ maxWidth: 620, margin: "0 auto", padding: "48px 40px 64px" }}>
      <StepTracker current={2} />
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, letterSpacing: "-.025em", margin: "0 0 12px" }}>
        Any words to pronounce carefully?
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 24px" }}>
        Add brand names, people, or industry terms. This step is optional.
      </p>

      {saved.length > 0 && (
        <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", marginBottom: 16, overflow: "hidden" }}>
          {saved.map((p) => (
            <label key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--border2)", cursor: "pointer" }}>
              <input type="checkbox" checked={selected.has(p.word)} onChange={() => toggle(p.word)} />
              <span style={{ fontWeight: 500, fontSize: 14.5, flex: 1 }}>{p.word}</span>
              <span style={{ color: "var(--accent2)", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 13.5 }}>{p.pronunciation}</span>
            </label>
          ))}
        </div>
      )}

      <div style={{ border: "1px dashed var(--border)", borderRadius: 12, padding: 14, marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
          <input value={word} onChange={(e) => setWord(e.target.value)} placeholder="Word" style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "9px 11px", fontSize: 14, background: "var(--bg)", color: "var(--text)" }} />
          <input value={say} onChange={(e) => setSay(e.target.value)} placeholder="Pronounced as (e.g. Ma-hek)" style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "9px 11px", fontSize: 14, background: "var(--bg)", color: "var(--text)" }} />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text2)", marginBottom: 10 }}>
          <input type="checkbox" checked={alsoSave} onChange={(e) => setAlsoSave(e.target.checked)} />
          Save for future Briefs
        </label>
        <button onClick={addNew} style={{ border: "1px solid var(--border)", background: "transparent", color: "var(--accent2)", borderRadius: 8, padding: "9px 14px", fontSize: 13.5, cursor: "pointer" }}>
          + Add word
        </button>
      </div>

      <button
        onClick={handleContinue}
        style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 16, fontWeight: 500, padding: 15, borderRadius: 12, cursor: "pointer", marginBottom: 10 }}
      >
        Continue →
      </button>
      <button onClick={handleContinue} style={{ width: "100%", background: "transparent", border: "none", color: "var(--text2)", fontSize: 14.5, padding: 6, cursor: "pointer" }}>
        Skip for now
      </button>
    </main>
  );
}
