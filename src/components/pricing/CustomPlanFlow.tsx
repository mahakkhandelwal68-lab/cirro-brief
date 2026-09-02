"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { PlusIcon, MinusIcon, DocumentIcon, CheckCircleIcon, MegaphoneIcon } from "../icons";

type Step = "closed" | "requirements" | "estimate" | "request" | "confirmed";

interface CustomResult {
  currency: string;
  symbol: string;
  discountPercent: number;
  price: number;
  billing: "monthly" | "annual";
}

function Modal({ step, onClose, children }: { step: number; onClose: () => void; children: React.ReactNode }) {
  // Rendered via a portal into document.body: a position:fixed element is
  // otherwise contained by the nearest ancestor with a CSS transform (even
  // translateY(0) counts), so nesting this inside e.g. the scroll-reveal
  // wrapper would trap it inside that card's box instead of the viewport.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "75vw",
          maxWidth: 560,
          minWidth: 320,
          maxHeight: "85vh",
          overflowY: "auto",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: "32px 34px",
          boxShadow: "0 30px 80px rgba(0,0,0,.4)",
        }}
      >
        <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 6 }}>
          Step {step} of 4
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="btn-pop"
          style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", cursor: "pointer", fontSize: 15 }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export function CustomPlanFlow() {
  const [step, setStep] = useState<Step>("closed");
  const [n, setN] = useState(4);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [result, setResult] = useState<CustomResult | null>(null);
  const [loadingEstimate, setLoadingEstimate] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [publication, setPublication] = useState("");
  const [requirements, setRequirements] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

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
      setError("Please enter your name and work email.");
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
          requirements,
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

  function reset() {
    setStep("closed");
  }

  const inputStyle: React.CSSProperties = { width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 9, padding: "11px 13px", fontSize: 14, background: "var(--bg)", color: "var(--text)" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 };

  if (step === "closed") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
        <button
          onClick={() => setStep("requirements")}
          className="btn-pop"
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 14, fontWeight: 500, color: "var(--btn-text)", background: "var(--btn)", border: "none", borderRadius: 10, padding: "12px 16px", width: "100%" }}
        >
          Check Custom Plan →
        </button>
        <Link href="/contact" style={{ fontSize: 13, color: "var(--text3)", alignSelf: "center" }}>
          Talk to us first
        </Link>
      </div>
    );
  }

  return (
    <Modal step={step === "requirements" ? 1 : step === "estimate" ? 2 : step === "request" ? 3 : 4} onClose={reset}>
      {step === "requirements" && (
        <>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 21, letterSpacing: "-.01em", margin: "0 0 8px" }}>Check your Custom plan</div>
          <p style={{ fontSize: 14, color: "var(--text2)", margin: "0 0 24px" }}>
            Tell us about your publishing needs and we&apos;ll show you an estimated plan.
          </p>

          <div style={labelStyle}>How many editions do you publish?</div>
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 10 }}>Per month</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <button onClick={() => setN((v) => Math.max(1, v - 1))} className="btn-pop" style={{ width: 34, height: 34, borderRadius: 9, border: "none", background: "var(--tint)", color: "var(--accent2)", cursor: "pointer" }}>
              <MinusIcon size={14} />
            </button>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, minWidth: 20, textAlign: "center" }}>{n}</span>
            <button onClick={() => setN((v) => v + 1)} className="btn-pop" style={{ width: 34, height: 34, borderRadius: 9, border: "none", background: "var(--tint)", color: "var(--accent2)", cursor: "pointer" }}>
              <PlusIcon size={14} />
            </button>
          </div>

          <div style={labelStyle}>Billing</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="btn-pop"
                style={{
                  flex: 1,
                  cursor: "pointer",
                  fontSize: 13.5,
                  padding: "9px 12px",
                  borderRadius: 9,
                  border: `1px solid ${billing === b ? "var(--accent2)" : "var(--border)"}`,
                  background: billing === b ? "var(--tint)" : "var(--card)",
                  color: billing === b ? "var(--accent2)" : "var(--text)",
                }}
              >
                {b === "monthly" ? "Monthly" : "Annual"}
              </button>
            ))}
          </div>

          {error && <div style={{ color: "#e06565", fontSize: 13, marginBottom: 12 }}>{error}</div>}

          <button
            onClick={getEstimate}
            disabled={loadingEstimate}
            className="btn-pop"
            style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", borderRadius: 10, padding: "13px", fontSize: 14.5, fontWeight: 500, cursor: "pointer", marginBottom: 14 }}
          >
            {loadingEstimate ? "Calculating..." : "See estimated price →"}
          </button>
          <Link href="/contact" style={{ display: "block", textAlign: "center", fontSize: 13.5, color: "var(--accent2)" }}>
            Talk to a consultant instead
          </Link>
        </>
      )}

      {step === "estimate" && result && (
        <div style={{ textAlign: "center" }}>
          <div className="icon-badge icon-glow" style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--tint)", color: "var(--accent2)", margin: "0 auto 18px" }}>
            <DocumentIcon size={24} />
          </div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, marginBottom: 18 }}>Your estimated Custom plan</div>
          <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 4 }}>Starting from</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, marginBottom: 4 }}>
            {result.symbol}
            {result.price.toLocaleString()} / {result.billing === "monthly" ? "month" : "year"}
          </div>
          <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 22 }}>For {n} edition{n === 1 ? "" : "s"} per month</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left", marginBottom: 24 }}>
            {["Includes everything you selected", "Tailored to your publishing frequency", "Final price may vary based on requirements"].map((line) => (
              <div key={line} style={{ display: "flex", gap: 9, fontSize: 14, color: "var(--text2)" }}>
                <span className="icon-glow" style={{ color: "var(--accent2)", flex: "none" }}><CheckCircleIcon size={16} /></span>
                {line}
              </div>
            ))}
          </div>

          <button onClick={() => setStep("request")} className="btn-pop" style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", borderRadius: 10, padding: "13px", fontSize: 14.5, fontWeight: 500, cursor: "pointer", marginBottom: 10 }}>
            Request this plan →
          </button>
          <Link href="/contact" style={{ display: "block", textAlign: "center", border: "1px solid var(--border)", borderRadius: 10, padding: "12px", fontSize: 14.5, color: "var(--text)", marginBottom: 14 }}>
            Talk to a consultant
          </Link>
          <div style={{ fontSize: 12, color: "var(--text3)" }}>No commitment. Cancel anytime.</div>
        </div>
      )}

      {step === "request" && (
        <>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 21, letterSpacing: "-.01em", margin: "0 0 8px" }}>Request your Custom plan</div>
          <p style={{ fontSize: 14, color: "var(--text2)", margin: "0 0 22px" }}>
            We&apos;ll prepare your plan and send your purchase link to your email.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 8 }}>
            <div>
              <div style={labelStyle}>Full name</div>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" style={inputStyle} />
            </div>
            <div>
              <div style={labelStyle}>Work email</div>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@yournewsletter.com" style={inputStyle} />
            </div>
            <div>
              <div style={labelStyle}>Publication / Newsletter name <span style={{ fontWeight: 400, color: "var(--text3)" }}>(optional)</span></div>
              <input value={publication} onChange={(e) => setPublication(e.target.value)} placeholder="Your newsletter" style={inputStyle} />
            </div>
            <div>
              <div style={labelStyle}>Anything else we should know? <span style={{ fontWeight: 400, color: "var(--text3)" }}>(optional)</span></div>
              <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="Tell us about your requirements" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
          </div>
          {error && <div style={{ color: "#e06565", fontSize: 13, margin: "10px 0" }}>{error}</div>}
          <button onClick={sendRequest} disabled={sending} className="btn-pop" style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", borderRadius: 10, padding: "13px", fontSize: 14.5, fontWeight: 500, cursor: "pointer", marginTop: 18, marginBottom: 10 }}>
            {sending ? "Sending..." : "Send my plan →"}
          </button>
          <div style={{ fontSize: 12, color: "var(--text3)", textAlign: "center" }}>We respect your privacy. No spam, ever.</div>
        </>
      )}

      {step === "confirmed" && (
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <div style={{ position: "relative", width: 64, height: 64, margin: "0 auto 18px" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--tint)" }} />
            <div className="icon-glow" style={{ position: "absolute", inset: 10, borderRadius: "50%", background: "var(--accent2)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✓</div>
          </div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>We&apos;ve got it!</div>
          <p style={{ fontSize: 14, color: "var(--text2)", margin: "0 0 22px" }}>
            We&apos;ll prepare your Custom plan and send it to your email shortly.
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", textAlign: "left", background: "var(--tint)", border: "1px solid var(--border2)", borderRadius: 12, padding: "16px 18px", marginBottom: 22 }}>
            <span style={{ color: "var(--accent2)", flex: "none" }}><MegaphoneIcon size={18} /></span>
            <div style={{ fontSize: 13.5, color: "var(--text2)" }}>
              <strong style={{ color: "var(--text)" }}>You&apos;ll receive:</strong> your plan details, price, and a secure link to complete your purchase.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <Link href="/contact" className="btn-pop" style={{ flex: 1, background: "var(--btn)", color: "var(--btn-text)", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 500 }}>
              Book a meeting
            </Link>
            <button onClick={reset} style={{ flex: 1, background: "transparent", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 10, padding: "12px", fontSize: 14, cursor: "pointer" }}>
              Close
            </button>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--text3)" }}>
            Need help now? <Link href="/contact" style={{ color: "var(--accent2)" }}>Contact support</Link>
          </div>
        </div>
      )}
    </Modal>
  );
}
