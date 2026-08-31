"use client";

import { useState } from "react";

const REASONS = ["Before purchasing", "Existing briefing", "Account or workspace", "Billing", "Custom plan", "Something else"];

export function SupportForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState(REASONS[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSend() {
    setError(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, reason, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSending(false);
        return;
      }
      setSent(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div style={{ border: "1px solid var(--accent2)", borderRadius: 18, background: "var(--tint)", padding: "40px 34px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 26 }}>✓</span>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19 }}>We&apos;ve received your message.</div>
        <div style={{ fontSize: 15, color: "var(--text2)" }}>Thanks for reaching out. We&apos;ll get back to you as soon as possible.</div>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--card)", padding: "32px 34px", boxShadow: "var(--shadow)", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 7 }}>Your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", fontSize: 15, background: "var(--bg)", color: "var(--text)" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 7 }}>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", fontSize: 15, background: "var(--bg)", color: "var(--text)" }}
          />
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 8 }}>I&apos;m contacting you about</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {REASONS.map((r) => {
            const on = reason === r;
            return (
              <button
                key={r}
                onClick={() => setReason(r)}
                style={{
                  cursor: "pointer",
                  fontSize: 13.5,
                  padding: "9px 14px",
                  borderRadius: 999,
                  border: `1px solid ${on ? "var(--accent)" : "var(--border)"}`,
                  background: on ? "var(--accent)" : "transparent",
                  color: on ? "#fff" : "var(--text2)",
                }}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 7 }}>Your message</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", fontSize: 15, background: "var(--bg)", color: "var(--text)", resize: "vertical" }}
        />
      </div>
      {error && <div style={{ color: "#c0392b", fontSize: 13.5 }}>{error}</div>}
      <button
        onClick={handleSend}
        disabled={sending}
        style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 15.5, fontWeight: 500, padding: "14px 22px", border: "none", borderRadius: 11, cursor: "pointer" }}
      >
        {sending ? "Sending..." : "Send Message"} <span style={{ opacity: 0.75 }}>→</span>
      </button>
    </div>
  );
}
