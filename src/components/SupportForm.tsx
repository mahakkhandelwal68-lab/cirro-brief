"use client";

import { useState } from "react";

const REASONS = ["Choosing a plan", "Existing Brief", "Account or Workspace", "Billing", "Custom requirement", "Something else"];
const COUNTRY_CODES = ["+91", "+1", "+44", "+971"];

export function SupportForm() {
  const [reason, setReason] = useState(REASONS[4]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const inputStyle: React.CSSProperties = { width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", fontSize: 15, background: "var(--bg)", color: "var(--text)" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 8 };

  async function handleSend() {
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, reason, message, phone: phone ? `${countryCode} ${phone}` : "" }),
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
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19 }}>We&apos;ve received your request.</div>
        <div style={{ fontSize: 15, color: "var(--text2)" }}>We&apos;ll review it and send a meeting booking link to your email within 24 hours.</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text3)", marginBottom: 12 }}>1. What is this regarding?</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {REASONS.map((r) => {
            const on = reason === r;
            return (
              <button
                key={r}
                onClick={() => setReason(r)}
                className="btn-pop"
                style={{
                  cursor: "pointer",
                  fontSize: 13.5,
                  padding: "9px 14px",
                  borderRadius: 999,
                  border: `1px solid ${on ? "var(--accent2)" : "var(--border)"}`,
                  background: on ? "var(--accent2)" : "transparent",
                  color: on ? "var(--btn-text)" : "var(--text2)",
                }}
              >
                {r}
              </button>
            );
          })}
        </div>
        <label style={labelStyle}>Tell us a little about what you need <span style={{ fontWeight: 400, color: "var(--text3)" }}>(optional)</span></label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Briefly describe your requirement..."
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text3)", marginBottom: 12 }}>2. Your contact details</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div>
            <label style={labelStyle}>Your name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>
              Email address <span style={{ color: "var(--accent2)" }}>*</span>
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" style={inputStyle} />
          </div>
        </div>
        <label style={labelStyle}>Phone / WhatsApp number <span style={{ fontWeight: 400, color: "var(--text3)" }}>(optional)</span></label>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            style={{ ...inputStyle, width: 90, flex: "none", cursor: "pointer" }}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your number" style={inputStyle} />
        </div>
      </div>

      {error && <div style={{ color: "#e06565", fontSize: 13.5 }}>{error}</div>}

      <button
        onClick={handleSend}
        disabled={sending}
        className="btn-pop"
        style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 15, fontWeight: 500, padding: "13px 22px", border: "none", borderRadius: 11, cursor: "pointer" }}
      >
        {sending ? "Sending..." : "Request a conversation"} <span style={{ opacity: 0.75 }}>→</span>
      </button>
    </div>
  );
}
