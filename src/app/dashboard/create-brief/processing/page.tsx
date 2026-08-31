"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateBrief } from "../CreateBriefContext";

export default function NewsletterProcessingPage() {
  const router = useRouter();
  const { url, article, setArticle } = useCreateBrief();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      router.replace("/dashboard/create-brief");
      return;
    }
    let cancelled = false;
    const start = Date.now();

    fetch("/api/briefs/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, 1400 - elapsed); // brief minimum loading state, matches design intent
        setTimeout(() => {
          if (cancelled) return;
          if (data.error) {
            setError(data.error);
          } else {
            setArticle(data);
          }
          setLoading(false);
        }, remaining);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not read this newsletter. Please try a different link.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "96px 40px", textAlign: "center" }}>
      {loading && (
        <>
          <div style={{ position: "relative", width: 60, height: 60, margin: "0 auto 28px" }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid var(--border2)" }} />
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid transparent", borderTopColor: "var(--accent)", animation: "cbSpin 1.1s linear infinite" }} />
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, margin: "0 0 8px" }}>Reading your newsletter...</h1>
          <p style={{ fontSize: 15, color: "var(--text2)", margin: 0 }}>This usually takes a few seconds.</p>
        </>
      )}

      {!loading && error && (
        <>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, margin: "0 0 8px", color: "#c0392b" }}>Couldn&apos;t read that link</h1>
          <p style={{ fontSize: 15, color: "var(--text2)", margin: "0 0 20px" }}>{error}</p>
          <button
            onClick={() => router.push("/dashboard/create-brief")}
            style={{ background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 15, fontWeight: 500, padding: "12px 22px", borderRadius: 11, cursor: "pointer" }}
          >
            Use a Different Link
          </button>
        </>
      )}

      {!loading && !error && article && (
        <div style={{ textAlign: "left" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 24, margin: "0 0 4px" }}>Is this the right edition?</h1>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px", boxShadow: "var(--shadow)", marginBottom: 20 }}>
            <div style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 8 }}>{article.publication}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, marginBottom: 8 }}>{article.title}</div>
            <div style={{ fontSize: 14.5, color: "var(--text2)" }}>{article.excerpt}</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => router.push("/dashboard/create-brief/preferences")}
              style={{ flex: 1, background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 15, fontWeight: 500, padding: "13px", borderRadius: 11, cursor: "pointer" }}
            >
              Yes, Continue →
            </button>
            <button
              onClick={() => router.push("/dashboard/create-brief")}
              style={{ flex: 1, background: "transparent", border: "1px solid var(--border)", color: "var(--text)", fontSize: 15, padding: "13px", borderRadius: 11, cursor: "pointer" }}
            >
              Use a Different Link
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
