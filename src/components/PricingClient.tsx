"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { CustomPlanFlow } from "./pricing/CustomPlanFlow";
import {
  LightningIcon, CalendarIcon, CrownIcon, ChatIcon, CheckCircleIcon,
  HeadphonesIcon, DocumentIcon, BookmarkIcon, EyeIcon,
} from "./icons";

interface RegionPricing {
  region: string;
  currency: string;
  symbol: string;
  oneTime: number;
  monthly: number;
  annual: number;
}

function fmt(symbol: string, n: number) {
  return `${symbol}${n.toLocaleString()}`;
}

const VALUE_ITEMS: [React.ReactNode, string][] = [
  [<HeadphonesIcon key="a" size={16} />, "Audio Brief"],
  [<DocumentIcon key="b" size={16} />, "Ready-to-share assets"],
  [<BookmarkIcon key="c" size={16} />, "Saved preferences"],
  [<EyeIcon key="d" size={16} />, "Preview & delivery"],
];

const DECISION_GUIDE: [string, string][] = [
  ["One edition", "One-Time"],
  ["Regular publishing", "Monthly"],
  ["Best long-term value", "Annual"],
  ["Specific requirements", "Custom"],
];

const FAQ_DATA = [
  ["What exactly is included in a Brief?", "Every Brief includes the audio briefing, the full script, key insights, and ready-to-share promotional copy."],
  ["Can I use my own voice preferences?", "Yes. Monthly and Annual plans let you save a custom voice and reuse it automatically for every future edition."],
  ["Can I change or cancel my plan?", "Yes. Reach out to our team any time to move between plans or cancel as your publishing needs change."],
  ["How does Custom pricing work?", "Tell us how many editions you publish and what you need — we'll give you an instant estimate, and our team confirms a final price before sending a payment link."],
  ["Can I speak with someone before choosing?", "Of course. Use Check Custom Plan for an estimate, or reach out on the Contact page to talk it through first."],
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 14px", marginBottom: 24 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent2)", display: "inline-block" }} />
      {children}
    </div>
  );
}

export function PricingClient() {
  const [pricing, setPricing] = useState<RegionPricing | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [freqHint, setFreqHint] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/pricing").then((r) => r.json()).then(setPricing);
  }, []);

  if (!pricing) {
    return <div style={{ padding: "80px 40px", textAlign: "center", color: "var(--text3)" }}>Loading pricing...</div>;
  }

  const monthlyEquivalent = Math.round(pricing.annual / 12);
  const recommendFor = (freq: number) => (freq <= 1 ? "One-Time" : freq <= 3 ? "Monthly" : freq <= 7 ? "Annual" : "Custom");

  const plans = [
    { key: "one", icon: <LightningIcon size={22} />, color: "var(--accent2)", name: "One-Time", desc: "For a single edition.", price: fmt(pricing.symbol, pricing.oneTime), per: "/ edition", cta: "Create One Brief", featured: false },
    { key: "monthly", icon: <CalendarIcon size={22} />, color: "var(--accent2)", name: "Monthly", desc: "For regular publishing.", price: fmt(pricing.symbol, pricing.monthly), per: "/ month", note: "Best for consistent publishing.", cta: "Start Monthly", featured: false },
    { key: "annual", icon: <CrownIcon size={22} />, color: "var(--orange)", name: "Annual", desc: "For regular publishing at the best value.", price: fmt(pricing.symbol, pricing.annual), per: "/ year", note: `${fmt(pricing.symbol, monthlyEquivalent)}/month when billed annually`, cta: "Choose Annual", featured: true, badge: "Best Value" },
  ];

  return (
    <>
      {/* 01 — Hero */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "76px 40px 56px", textAlign: "center" }}>
        <Reveal>
          <Eyebrow>Pricing</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 46, lineHeight: 1.1, letterSpacing: "-.03em", margin: "0 auto 16px", maxWidth: "26em" }}>
            Choose how you want to bring your newsletter to life.
          </h1>
          <p style={{ fontSize: 17, color: "var(--text2)", margin: "0 auto 8px", maxWidth: "32em" }}>
            Start with a single edition or choose an ongoing plan for every issue you publish.
          </p>
          <p style={{ fontSize: 13, color: "var(--text3)", margin: "0 0 28px" }}>Pricing shown in {pricing.currency} based on your location.</p>
          <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}>
            Try Your Newsletter — It&apos;s Free <span style={{ opacity: 0.75 }}>→</span>
          </Link>
        </Reveal>
      </section>

      {/* 02 — Compact value strip */}
      <section style={{ maxWidth: 900, margin: "0 auto 56px", padding: "0 40px" }}>
        <Reveal>
          <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--tint)", padding: "24px 28px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, marginBottom: 12 }}>
              More than an <span style={{ color: "var(--accent2)" }}>audio version.</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 12 }}>
              {VALUE_ITEMS.map(([icon, label]) => (
                <span key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, color: "var(--text2)" }}>
                  <span style={{ color: "var(--accent2)" }}>{icon}</span>
                  {label}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 13.5, color: "var(--text3)", margin: 0 }}>
              Every edition is delivered as a complete Brief, ready to listen to, review and share.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 03 — Pricing (main section) */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 34, letterSpacing: "-.025em", margin: "0 0 10px" }}>Choose the way you publish.</h2>
            <p style={{ fontSize: 15.5, color: "var(--text2)", margin: 0 }}>Start with one edition or choose an ongoing plan for your publication.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, alignItems: "stretch" }}>
            {plans.map((p, i) => (
              <Reveal key={p.key} delay={i * 80}>
                <div
                  className="hover-pop"
                  style={
                    p.featured
                      ? { position: "relative", background: "var(--band)", color: "#fff", borderRadius: 18, padding: "28px 22px", display: "flex", flexDirection: "column", gap: 10, minHeight: 260, transform: "scale(1.03)", boxShadow: "var(--glow-teal)" }
                      : { position: "relative", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "26px 22px", display: "flex", flexDirection: "column", gap: 10, minHeight: 240 }
                  }
                >
                  {p.badge && (
                    <span style={{ position: "absolute", top: -11, right: 18, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--orange)", color: "#fff", borderRadius: 999, padding: "4px 10px" }}>
                      {p.badge}
                    </span>
                  )}
                  <span className="icon-badge icon-glow" style={{ background: p.featured ? "rgba(255,255,255,.15)" : `color-mix(in srgb, ${p.color} 14%, var(--card))`, color: p.featured ? "#fff" : p.color }}>{p.icon}</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19 }}>{p.name}</span>
                  <span style={{ fontSize: 14, color: p.featured ? "rgba(255,255,255,.85)" : "var(--text2)", flex: 1 }}>{p.desc}</span>
                  <div>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 26 }}>{p.price}</span>
                    <span style={{ fontSize: 13, color: p.featured ? "rgba(255,255,255,.7)" : "var(--text3)" }}> {p.per}</span>
                  </div>
                  {p.note && <div style={{ fontSize: 12.5, color: "var(--accent2)", fontWeight: 500 }}>{p.note}</div>}
                  <Link
                    href={`/contact?intent=purchase&plan=${p.key}`}
                    className="btn-pop"
                    style={
                      p.featured
                        ? { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, fontSize: 14.5, fontWeight: 500, color: "var(--band)", background: "#fff", border: "none", borderRadius: 10, padding: "12px 15px", marginTop: 6 }
                        : { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, fontSize: 14.5, fontWeight: 500, color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 15px", marginTop: 6 }
                    }
                  >
                    {p.cta} →
                  </Link>
                </div>
              </Reveal>
            ))}

            <Reveal delay={240}>
              <div style={{ position: "relative", background: "var(--card)", border: "1px dashed var(--border)", borderRadius: 16, padding: "26px 22px", display: "flex", flexDirection: "column", gap: 10, minHeight: 240 }}>
                <span className="icon-badge icon-glow" style={{ background: "var(--purple-tint)", color: "var(--purple)" }}><ChatIcon size={22} /></span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19 }}>Custom</span>
                <span style={{ fontSize: 14, color: "var(--text2)" }}>Built around your publishing needs.</span>
                <span style={{ fontSize: 12.5, color: "var(--text3)", flex: 1 }}>For higher volume or specific requirements.</span>
                <CustomPlanFlow />
              </div>
            </Reveal>
          </div>

          {/* 04 — Frequency selector (compact, directly under cards) */}
          <div style={{ maxWidth: 480, margin: "40px auto 0", textAlign: "center" }}>
            <div style={{ fontSize: 13.5, color: "var(--text2)", marginBottom: 12 }}>How often do you publish?</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
              {[1, 2, 4, 8].map((f) => (
                <button
                  key={f}
                  onClick={() => setFreqHint(f)}
                  className="btn-pop"
                  style={{ cursor: "pointer", fontSize: 13.5, padding: "9px 16px", borderRadius: 999, border: `1px solid ${freqHint === f ? "var(--accent2)" : "var(--border)"}`, background: freqHint === f ? "var(--tint)" : "var(--card)", color: freqHint === f ? "var(--accent2)" : "var(--text)" }}
                >
                  {f === 8 ? "8+" : f}
                </button>
              ))}
            </div>
            {freqHint && (
              <div style={{ fontSize: 14, color: "var(--text2)" }}>
                We&apos;d recommend <strong style={{ color: "var(--accent2)" }}>{recommendFor(freqHint)}</strong>.
              </div>
            )}
          </div>

          {/* Compact decision guide line */}
          <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", marginTop: 32, fontSize: 13, color: "var(--text3)" }}>
            {DECISION_GUIDE.map(([q, a]) => (
              <span key={q}>
                {q} → <strong style={{ color: "var(--accent2)" }}>{a}</strong>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Compare what's included */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 40px" }}>
        <div style={{ textAlign: "center", maxWidth: "34em", margin: "0 auto 32px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, letterSpacing: "-.025em", margin: 0 }}>Compare what&apos;s included.</h2>
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--card)", overflow: "hidden", boxShadow: "var(--shadow)", overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", minWidth: 600 }}>
            <div style={{ padding: "14px 20px" }} />
            {["One-Time", "Monthly", "Annual", "Custom"].map((h) => (
              <div key={h} style={{ padding: "14px 10px", textAlign: "center", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: h === "Annual" ? "#fff" : "var(--text3)", background: h === "Annual" ? "var(--band)" : "transparent" }}>
                {h}
              </div>
            ))}
          </div>
          {(
            [
              ["Newsletter briefings", "1", "4 / month", "48 / year", "Based on plan"],
              ["Newsletter adapted for listening", 1, 1, 1, 1],
              ["Audio briefing", 1, 1, 1, 1],
              ["Choose briefing style", 1, 1, 1, 1],
              ["Choose script type and tone", 1, 1, 1, 1],
              ["Optional script review", 1, 1, 1, 1],
              ["Edit before audio generation", 1, 1, 1, 1],
              ["180+ voice library", 1, 1, 1, 1],
              ["Custom voice creation", 0, 1, 1, 1],
              ["Custom pronunciation guidance", 1, 1, 1, 1],
              ["Save publication preferences", 0, 1, 1, 1],
              ["Save pronunciation preferences", 0, 1, 1, 1],
              ["Personal workspace", 1, 1, 1, 1],
              ["Audio library", 1, 1, 1, 1],
              ["Included publishing assets", 1, 1, 1, 1],
              ["Custom requirement", 0, 0, 0, 1],
              ["Price", fmt(pricing.symbol, pricing.oneTime), `${fmt(pricing.symbol, pricing.monthly)}/mo`, `${fmt(pricing.symbol, pricing.annual)}/yr`, "Custom"],
            ] as [string, number | string, number | string, number | string, number | string][]
          ).map(([label, one, month, annual, custom], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", borderTop: "1px solid var(--border2)", minWidth: 600 }}>
              <div style={{ padding: "12px 20px", fontSize: 13.8 }}>{label}</div>
              {[one, month, annual, custom].map((v, ci) => (
                <div key={ci} style={{ padding: "12px 10px", textAlign: "center", background: ci === 2 ? "var(--tint)" : "transparent", fontSize: 13.8, fontWeight: typeof v === "string" ? 600 : 400 }}>
                  {v === 1 ? (
                    <span className="icon-glow" style={{ color: "var(--accent2)", display: "inline-flex" }}><CheckCircleIcon size={16} /></span>
                  ) : v === 0 ? (
                    <span style={{ color: "var(--text3)" }}>—</span>
                  ) : (
                    <span>{v}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 06 — FAQ */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 40px", display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: 56, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, letterSpacing: "-.025em", margin: 0 }}>Before you choose.</h2>
          </div>
          <div style={{ borderTop: "1px solid var(--border2)" }}>
            {FAQ_DATA.map(([q, a], i) => (
              <div key={q} style={{ borderBottom: "1px solid var(--border2)" }}>
                <button
                  onClick={() => setOpenFaq((cur) => (cur === i ? null : i))}
                  style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "18px 2px", textAlign: "left", color: "var(--text)", fontSize: 15.5, fontWeight: 500 }}
                >
                  {q}
                  <span style={{ color: "var(--accent2)", fontSize: 16, flex: "none" }}>{openFaq === i ? "–" : "+"}</span>
                </button>
                {openFaq === i && <div style={{ padding: "0 2px 20px", fontSize: 14.5, color: "var(--text2)", maxWidth: "40em" }}>{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 40px 96px" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--band)", color: "#fff", padding: "56px 56px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 36, lineHeight: 1.1, letterSpacing: "-.03em", margin: 0, maxWidth: "22em" }}>
            Your next edition could be ready to hear.
          </h2>
          <p style={{ fontSize: 16.5, opacity: 0.85, margin: 0, maxWidth: "28em" }}>
            Turn one newsletter edition into a complete Brief with audio and ready-to-use publishing assets.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
            <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: "var(--band)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}>
              Try Your Newsletter — It&apos;s Free <span style={{ opacity: 0.75 }}>→</span>
            </Link>
            <Link href="/contact" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", background: "transparent", border: "1px solid rgba(255,255,255,.3)", color: "#fff", fontSize: 16, padding: "15px 26px", borderRadius: 12 }}>
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
