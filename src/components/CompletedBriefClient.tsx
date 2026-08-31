"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";

interface Brief {
  id: string;
  title: string;
  publication: string | null;
  excerpt: string | null;
  script: string | null;
  audio_url: string | null;
  voice_name: string | null;
  style: string | null;
  visibility: "private" | "public";
  category: string | null;
  public_slug: string | null;
  created_at: string;
}

const CATEGORIES = ["Technology", "Business", "Marketing", "Finance", "AI", "Health", "General"];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      style={{ fontSize: 12.5, color: "var(--accent2)", background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}

export function CompletedBriefClient({ id }: { id: string }) {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [visLoading, setVisLoading] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    fetch(`/api/briefs/${id}`)
      .then((r) => r.json())
      .then((data) => (data.error ? setError(data.error) : setBrief(data.brief)));
  }, [id]);

  useEffect(() => {
    if (brief?.visibility === "public" && brief.public_slug) {
      const publicUrl = `${window.location.origin}/b/${brief.public_slug}`;
      QRCode.toDataURL(publicUrl, { margin: 1, width: 240, color: { dark: "#195650", light: "#00000000" } }).then(setQrDataUrl);
    } else {
      setQrDataUrl(null);
    }
  }, [brief?.visibility, brief?.public_slug]);

  async function toggleVisibility(nextPublic: boolean) {
    setVisLoading(true);
    const res = await fetch(`/api/briefs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visibility: nextPublic ? "public" : "private", category: nextPublic ? category : undefined }),
    });
    const data = await res.json();
    if (data.brief) setBrief(data.brief);
    setVisLoading(false);
  }

  if (error) return <div style={{ padding: "80px 40px", textAlign: "center", color: "#c0392b" }}>{error}</div>;
  if (!brief) return <div style={{ padding: "80px 40px", textAlign: "center", color: "var(--text3)" }}>Loading...</div>;

  const publicUrl = brief.public_slug ? `${typeof window !== "undefined" ? window.location.origin : ""}/b/${brief.public_slug}` : null;
  const keyInsight = brief.script ? brief.script.split(". ").slice(0, 2).join(". ") + "." : "";
  const promoCopy = `🎧 New audio briefing: "${brief.title}" — listen now.`;

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "40px 40px 80px" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 6 }}>
          {brief.publication || "Your Brief"} · {new Date(brief.created_at).toLocaleDateString()}
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, letterSpacing: "-.03em", margin: 0 }}>{brief.title}</h1>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--card)", padding: "24px 26px", boxShadow: "var(--shadow)", marginBottom: 20 }}>
        {brief.audio_url ? (
          <audio controls src={brief.audio_url} style={{ width: "100%" }} />
        ) : (
          <div style={{ color: "var(--text3)" }}>Audio not available.</div>
        )}
        <div style={{ display: "flex", gap: 14, marginTop: 14, fontSize: 13.5, color: "var(--text2)" }}>
          <span>{brief.voice_name}</span>
          <span>·</span>
          <span>{brief.style}</span>
          {brief.audio_url && (
            <a href={brief.audio_url} download style={{ marginLeft: "auto", color: "var(--accent2)" }}>
              Download MP3 →
            </a>
          )}
        </div>
      </div>

      {keyInsight && (
        <div style={{ border: "1px solid var(--border2)", borderRadius: 14, background: "var(--tint)", padding: "18px 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 8 }}>Key Insight</div>
          <div style={{ fontSize: 15, color: "var(--text)" }}>{keyInsight}</div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "16px 18px" }}>
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>📝 Full Script</div>
          <CopyButton text={brief.script || ""} />
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "16px 18px" }}>
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>💡 Key Insights</div>
          <CopyButton text={keyInsight} />
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "16px 18px" }}>
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>📣 Promo Copy</div>
          <CopyButton text={promoCopy} />
        </div>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px", marginBottom: 28 }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, marginBottom: 14 }}>Sharing</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <button
            onClick={() => toggleVisibility(false)}
            disabled={visLoading}
            style={{ flex: 1, cursor: "pointer", border: `1px solid ${brief.visibility === "private" ? "var(--accent2)" : "var(--border)"}`, background: brief.visibility === "private" ? "var(--tint)" : "transparent", borderRadius: 10, padding: "10px 14px", fontSize: 14 }}
          >
            Private
          </button>
          <button
            onClick={() => toggleVisibility(true)}
            disabled={visLoading}
            style={{ flex: 1, cursor: "pointer", border: `1px solid ${brief.visibility === "public" ? "var(--accent2)" : "var(--border)"}`, background: brief.visibility === "public" ? "var(--tint)" : "transparent", borderRadius: 10, padding: "10px 14px", fontSize: 14 }}
          >
            Public
          </button>
        </div>
        {brief.visibility === "public" && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 12.5, color: "var(--text2)", marginBottom: 6 }}>Category</label>
              <select
                value={brief.category || category}
                onChange={(e) => { setCategory(e.target.value); toggleVisibility(true); }}
                style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", fontSize: 14, background: "var(--bg)", color: "var(--text)" }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            {publicUrl && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <input readOnly value={publicUrl} style={{ flex: 1, border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", fontSize: 13, background: "var(--bg)", color: "var(--text2)" }} />
                <CopyButton text={publicUrl} />
              </div>
            )}
            {qrDataUrl && (
              <div style={{ textAlign: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt="QR code linking to this brief" width={140} height={140} />
                <div>
                  <a href={qrDataUrl} download={`${brief.public_slug}-qr.png`} style={{ fontSize: 13, color: "var(--accent2)" }}>
                    Download QR (PNG) →
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/dashboard/create-brief" style={{ flex: 1, textAlign: "center", background: "var(--btn)", color: "var(--btn-text)", fontSize: 15, fontWeight: 500, padding: "13px", borderRadius: 11 }}>
          Create Another Brief
        </Link>
        <Link href="/dashboard/briefs" style={{ flex: 1, textAlign: "center", background: "transparent", border: "1px solid var(--border)", color: "var(--text)", fontSize: 15, padding: "13px", borderRadius: 11 }}>
          Back to My Briefs
        </Link>
      </div>
    </main>
  );
}
