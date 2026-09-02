"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusIcon, MinusIcon } from "../icons";

type Step = "closed" | "requirements" | "estimate" | "request" | "confirmed";

interface CustomResult {
  currency: string;
  symbol: string;
  discountPercent: number;
  price: number;
  billing: "monthly" | "annual";
}

const NEEDS = ["Audio Brief", "Ready-to-share Assets", "Custom Voice", "Additional Requirements"];

export function CustomPlanFlow() {
  const [step, setStep] = useState<Step>("closed");
  const [n, setN] = useState(4);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [needs, setNeeds] = useState<Set<string>>(new Set(["Audio Brief", "Ready-to-share Assets"]));
  const [result, setResult] = useState<CustomResult | null>(null);
  const [loadingEstimate, setLoadingEstimate] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [publication, setPublication] = useState("");
  const [requirements, setRequirements] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  function toggleNeed(need: string) {
    setNeeds((s) => {
      const next = new Set(s);
      if (next.has(need)) next.delete(need);
      else next.add(need);
      return next;
    });
  }

  async function getEstimate() {
    setLoadingEstimate(true);
    setError(null);
    try {
      const res = await fetch("/api/pricing/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newslettersPerMonth: n, billing }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not calculate an estimate.");
        return;
      }
      setResult(data);
      setStep("estimate");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoadingEstimate(false);
    }
  }

  async function sendRequest() {
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/custom-plan-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          publication,
          requirements: `${requirements}${requirements ? " | " : ""}Needs: ${Array.from(needs).join(", ")}`,
          newslettersPerMonth: n,
          billing,
          estimatedPrice: result?.price,
          currency: result?.currency,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStep("confirmed");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (step === "closed") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
        <button
          onClick={() => setStep("requirements")}
          className="btn-pop"
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 14, fontWeight: 500, color: "var(--btn-text)", background: "var(--btn)", border: "none", borderRadius: 10, padding: "12px 16px", width: "100%" }}
        >
          Check Custom Pricing →
        </button>
        <Link href="/contact" style={{ fontSize: 13, color: "var(--text3)", alignSelf: "center" }}>
          Talk to us first
        </Link>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--bg2)", padding: "18px 20px", marginTop: 4 }}>
      {step === "requirements" && (
        <>
          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 12 }}>How many editions do you publish?</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <button onClick={() => setN((v) => Math.max(1, v - 1))} className="btn-pop" style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", cursor: "pointer" }}>
              <MinusIcon size={14} />
            </button>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, minWidth: 24, textAlign: "center" }}>{n}</span>
            <button onClick={() => setN((v) => v + 1)} className="btn-pop" style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", cursor: "pointer" }}>
              <PlusIcon size={14} />
            </button>
            <span style={{ fontSize: 13, color: "var(--text3)" }}>editions / month</span>
          </div>

          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 10 }}>Billing</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="btn-pop"
                style={{ flex: 1, cursor: "pointer", fontSize: 13.5, padding: "9px 12px", borderRadius: 9, border: `1px solid ${billing === b ? "var(--accent2)" : "var(--border)"}`, background: billing === b ? "var(--tint)" : "var(--card)", color: billing === b ? "var(--accent2)" : "var(--text)" }}
              >
                {b === "monthly" ? "Monthly" : "Annual"}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 10 }}>What do you need?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
            {NEEDS.map((need) => (
              <label key={need} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, color: "var(--text2)", cursor: "pointer" }}>
                <input type="checkbox" checked={needs.has(need)} onChange={() => toggleNeed(need)} />
                {need}
              </label>
            ))}
          </div>

          {error && <div style={{ color: "#e06565", fontSize: 13, marginBottom: 10 }}>{error}</div>}

          <button
            onClick={getEstimate}
            disabled={loadingEstimate}
            className="btn-pop"
            style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", borderRadius: 10, padding: "12px", fontSize: 14.5, fontWeight: 500, cursor: "pointer" }}
          >
            {loadingEstimate ? "Calculating..." : "See Estimated Price →"}
          </button>
        </>
      )}

      {step === "estimate" && result && (
        <>
          <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 6 }}>Your estimated Custom plan</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 28, marginBottom: 6 }}>
            Starting from {result.symbol}
            {result.price.toLocaleString()} <span style={{ fontSize: 14, color: "var(--text3)", fontWeight: 400 }}>/{result.billing === "monthly" ? "month" : "year"}</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--text3)", margin: "0 0 18px" }}>
            Your final plan is based on your publishing frequency and requirements.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button onClick={() => setStep("request")} className="btn-pop" style={{ background: "var(--btn)", color: "var(--btn-text)", border: "none", borderRadius: 10, padding: "12px", fontSize: 14.5, fontWeight: 500, cursor: "pointer" }}>
              Request This Plan →
            </button>
            <Link href="/contact" style={{ textAlign: "center", fontSize: 13.5, color: "var(--accent2)" }}>
              Talk to a Consultant →
            </Link>
          </div>
        </>
      )}

      {step === "request" && (
        <>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Request your Custom plan</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={{ border: "1px solid var(--border)", borderRadius: 9, padding: "10px 12px", fontSize: 14, background: "var(--card)", color: "var(--text)" }} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" type="email" style={{ border: "1px solid var(--border)", borderRadius: 9, padding: "10px 12px", fontSize: 14, background: "var(--card)", color: "var(--text)" }} />
            <input value={publication} onChange={(e) => setPublication(e.target.value)} placeholder="Newsletter / publication name (optional)" style={{ border: "1px solid var(--border)", borderRadius: 9, padding: "10px 12px", fontSize: 14, background: "var(--card)", color: "var(--text)" }} />
            <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="Any additional requirements (optional)" rows={3} style={{ border: "1px solid var(--border)", borderRadius: 9, padding: "10px 12px", fontSize: 14, background: "var(--card)", color: "var(--text)", resize: "vertical" }} />
          </div>
          {error && <div style={{ color: "#e06565", fontSize: 13, marginBottom: 10 }}>{error}</div>}
          <button onClick={sendRequest} disabled={sending} className="btn-pop" style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", borderRadius: 10, padding: "12px", fontSize: 14.5, fontWeight: 500, cursor: "pointer" }}>
            {sending ? "Sending..." : "Send My Plan Options →"}
          </button>
        </>
      )}

      {step === "confirmed" && (
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <div style={{ fontSize: 26, marginBottom: 8 }}>✓</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>We&apos;ll prepare your Custom plan.</div>
          <p style={{ fontSize: 13.5, color: "var(--text2)", margin: "0 0 18px" }}>
            You&apos;ll receive your purchase link and plan details by email. Prefer to discuss it first? You can
            also book a time with us.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link href="/contact" className="btn-pop" style={{ background: "var(--btn)", color: "var(--btn-text)", border: "none", borderRadius: 10, padding: "12px", fontSize: 14.5, fontWeight: 500 }}>
              Book a Meeting →
            </Link>
            <button onClick={() => setStep("closed")} style={{ background: "transparent", border: "none", color: "var(--text3)", fontSize: 13.5, cursor: "pointer" }}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
