"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface RegionPricing {
  symbol: string;
  oneTime: number;
  monthly: number;
  annual: number;
}

const DECIDE_LIST = [
  "How the briefing is written",
  "What style it follows",
  "Which voice represents your publication",
  "Whether you want to review the script",
  "How names and important words are pronounced",
];

const UNLOCK_LIST = [
  "Choose your briefing style",
  "Choose your voice",
  "Optional script review",
  "Edit before audio generation",
  "Add custom pronunciation preferences",
  "Receive the complete included assets",
  "Access your customer workspace",
];

const AFTER_STEPS: [string, string, string, string[] | null][] = [
  ["01", "Choose your preferences", "Select how you want your briefing to sound.", ["Briefing style", "Voice", "Optional script review"]],
  ["02", "Add special preferences", "If necessary, add pronunciation guidance for brand names, names and industry terms. Preferences can be saved for future briefings.", null],
  ["03", "Generate", "Cirro Brief creates your complete audio briefing and included assets. Your workspace keeps everything organised.", null],
];

const MATRIX: [string, boolean][] = [
  ["AI-generated brief", true],
  ["Audio preview", true],
  ["Choose script style", false],
  ["Choose voice", false],
  ["Script review option", false],
  ["Edit script", false],
  ["Custom pronunciation", false],
  ["Saved preferences", false],
  ["Customer workspace", false],
  ["Additional assets", false],
];

const FAQ_DATA = [
  ["Is this the same as the demo?", "No. The demo is a simplified automatic preview. The complete version gives you additional choices and control over the briefing and audio generation."],
  ["Do I need a subscription?", "No. You can purchase a one-time complete briefing. Monthly and annual plans are available if you plan to create regularly."],
  ["Can I review the script?", "Yes. During setup, you can choose whether you want to review the briefing before audio generation."],
  ["Can I use the same voice again?", "Your preferred voice and other settings can be saved according to your plan."],
  ["How quickly will my briefing be ready?", "Standard automated briefings are designed for fast delivery once all preferences are provided."],
];

function fmt(symbol: string, n: number) {
  return `${symbol}${n.toLocaleString()}`;
}

export function PostDemoOfferClient() {
  const params = useSearchParams();
  const name = params.get("name") || "your newsletter";
  const url = params.get("url") || "";
  const [pricing, setPricing] = useState<RegionPricing | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/pricing").then((r) => r.json()).then(setPricing);
  }, []);

  const discounted = pricing ? Math.round(pricing.oneTime / 2) : null;

  return (
    <>
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "76px 40px 60px", display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 64, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 14px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent2)", display: "inline-block" }} />
            Your demo is complete
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 52, lineHeight: 1.06, letterSpacing: "-.03em", margin: "0 0 20px" }}>
            You just heard what {name} can sound like.
          </h1>
          <p style={{ fontSize: 17.5, color: "var(--text2)", margin: "0 0 8px", maxWidth: "32em" }}>That was a quick automated preview based on your newsletter.</p>
          <p style={{ fontSize: 17.5, color: "var(--text2)", margin: 0, maxWidth: "32em" }}>
            With the full Cirro Brief experience, you get more control over how {name} is transformed, written, and
            voiced.
          </p>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 18, padding: "24px 26px", boxShadow: "var(--shadow)" }}>
          <div style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 14 }}>📰 Your newsletter</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 21, letterSpacing: "-.015em", marginBottom: 4 }}>{name}</div>
          {url && <div style={{ fontSize: 14.5, color: "var(--text3)", marginBottom: 16, wordBreak: "break-all" }}>{url}</div>}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 13px", background: "var(--tint)" }}>
            <span>✓</span>Demo generated successfully
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 32, lineHeight: 1.1, letterSpacing: "-.025em", margin: "0 0 14px" }}>
              The demo showed you the starting point.
            </h2>
            <p style={{ fontSize: 17, color: "var(--text2)", margin: "0 0 8px" }}>Now imagine creating every briefing around your publication.</p>
            <p style={{ fontSize: 15, color: "var(--text3)", margin: 0 }}>The demo was generated automatically.</p>
          </div>
          <div>
            <div style={{ fontSize: 15.5, color: "var(--text2)", marginBottom: 14 }}>With the complete version, you can decide:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {DECIDE_LIST.map((d) => (
                <div key={d} style={{ display: "flex", gap: 11, fontSize: 16, color: "var(--text)" }}>
                  <span style={{ color: "var(--accent2)" }}>✓</span>
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 56px" }}>
        <div style={{ textAlign: "center", maxWidth: "40em", margin: "0 auto 40px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 38, lineHeight: 1.1, letterSpacing: "-.025em", margin: "0 0 14px" }}>
            Try your first complete Cirro Brief for 50% less.
          </h2>
          <p style={{ fontSize: 17, color: "var(--text2)", margin: 0 }}>Create a complete briefing for {name} and experience the full workflow.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", border: "1px solid var(--accent2)", borderRadius: 20, overflow: "hidden", boxShadow: "var(--shadow)", maxWidth: 920, margin: "0 auto" }}>
          <div style={{ background: "var(--card)", padding: "32px 36px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 15.5, fontWeight: 500, color: "var(--text2)", marginBottom: 6 }}>What you&apos;ll unlock:</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              {UNLOCK_LIST.map((u) => (
                <div key={u} style={{ display: "flex", gap: 9, fontSize: 15, color: "var(--text)" }}>
                  <span style={{ color: "var(--accent2)", flex: "none" }}>✓</span>
                  {u}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "var(--tint)", borderLeft: "1px solid var(--border)", padding: "32px 34px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, minWidth: 250 }}>
            <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent2)" }}>First complete brief</div>
            {pricing && discounted !== null ? (
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 19, color: "var(--text3)", textDecoration: "line-through" }}>{fmt(pricing.symbol, pricing.oneTime)}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 44, letterSpacing: "-.03em" }}>{fmt(pricing.symbol, discounted)}</span>
              </div>
            ) : (
              <span style={{ color: "var(--text3)", fontSize: 14 }}>Loading...</span>
            )}
            <div style={{ fontSize: 13.5, color: "var(--text3)", textAlign: "center" }}>
              One newsletter edition
              <br />
              Full Cirro Brief experience
            </div>
            <Link
              href={`/contact?intent=purchase&plan=one&discount=50&nl=${encodeURIComponent(name)}`}
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 15.5, fontWeight: 500, padding: "14px 22px", borderRadius: 12, marginTop: 6, width: "100%", justifyContent: "center" }}
            >
              Create My Full Brief <span style={{ opacity: 0.75 }}>→</span>
            </Link>
            <div style={{ fontSize: 12, color: "var(--text3)" }}>One-time purchase. No subscription required.</div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 40px 72px" }}>
        <div style={{ maxWidth: "40em", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 32, lineHeight: 1.1, letterSpacing: "-.025em", margin: 0 }}>Your complete briefing, your way.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {AFTER_STEPS.map(([n, title, body, tags]) => (
            <div key={n} style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "26px 24px", display: "flex", flexDirection: "column", gap: 10, minHeight: 190 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12.5, color: "var(--accent2)" }}>{n}</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, letterSpacing: "-.015em" }}>{title}</span>
              <span style={{ fontSize: 14.8, color: "var(--text2)" }}>{body}</span>
              {tags && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
                  {tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 12, color: "var(--accent2)", background: "var(--tint)", border: "1px solid var(--border2)", borderRadius: 999, padding: "5px 11px" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 40px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 34, lineHeight: 1.1, letterSpacing: "-.025em", margin: "0 0 8px" }}>Demo vs. Complete Experience</h2>
          <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 26px" }}>The demo lets you hear the idea. The complete version lets you shape the result.</p>
          <div style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--card)", overflow: "hidden", boxShadow: "var(--shadow)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", borderBottom: "1px solid var(--border)" }}>
              <div style={{ padding: "15px 24px" }} />
              <div style={{ padding: "15px 24px", textAlign: "center", fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", borderLeft: "1px solid var(--border2)" }}>Demo</div>
              <div style={{ padding: "15px 24px", textAlign: "center", fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent2)", background: "var(--tint)", borderLeft: "1px solid var(--border2)" }}>Complete Brief</div>
            </div>
            {MATRIX.map(([label, demo]) => (
              <div key={label} style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", borderBottom: "1px solid var(--border2)" }}>
                <div style={{ padding: "13px 24px", fontSize: 15, color: "var(--text)" }}>{label}</div>
                <div style={{ padding: "13px 24px", textAlign: "center", borderLeft: "1px solid var(--border2)", color: demo ? "var(--accent2)" : "var(--text3)" }}>{demo ? "✓" : "—"}</div>
                <div style={{ padding: "13px 24px", textAlign: "center", borderLeft: "1px solid var(--border2)", background: "var(--tint)", color: "var(--accent2)" }}>✓</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 64px" }}>
        <div style={{ textAlign: "center", maxWidth: "36em", margin: "0 auto 40px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 34, lineHeight: 1.1, letterSpacing: "-.025em", margin: "0 0 10px" }}>Planning to create audio regularly?</h2>
          <p style={{ fontSize: 17, color: "var(--text2)", margin: 0 }}>Get more value with a recurring plan.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 820, margin: "0 auto" }}>
          {[
            { name: "Monthly", note: "For publishers who want to create audio editions regularly.", save: "Save 20%", best: false },
            { name: "Annual", note: "For publications planning to make audio part of their regular experience.", save: "Save 40%", best: true },
          ].map((p) => (
            <div
              key={p.name}
              style={{
                position: "relative",
                border: `2px solid ${p.best ? "var(--accent2)" : "var(--border)"}`,
                borderRadius: 18,
                background: "var(--card)",
                padding: "30px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {p.best && (
                <span style={{ position: "absolute", top: -12, left: 28, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", background: "var(--accent)", color: "#fff", borderRadius: 999, padding: "5px 12px" }}>
                  Best value
                </span>
              )}
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent2)" }}>{p.name}</span>
              <span style={{ fontSize: 15.5, color: "var(--text2)" }}>{p.note}</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 26, letterSpacing: "-.02em", color: "var(--text)" }}>{p.save}</span>
              <Link
                href="/pricing"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: p.best ? "var(--btn)" : "transparent",
                  color: p.best ? "var(--btn-text)" : "var(--text)",
                  border: `1px solid ${p.best ? "var(--accent2)" : "var(--border)"}`,
                  fontSize: 15,
                  fontWeight: 500,
                  padding: "13px 18px",
                  borderRadius: 11,
                  marginTop: "auto",
                }}
              >
                View {p.name} Plans
              </Link>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 14, color: "var(--text3)", margin: "26px 0 0" }}>
          Already know you want to create regularly? Choose a recurring plan and set up your publication from the
          start.
        </p>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 40px 88px", display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: 64, alignItems: "start" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 32, lineHeight: 1.1, letterSpacing: "-.025em", margin: 0 }}>Before you create your complete brief.</h2>
        </div>
        <div style={{ borderTop: "1px solid var(--border2)" }}>
          {FAQ_DATA.map(([q, a], i) => (
            <div key={q} style={{ borderBottom: "1px solid var(--border2)" }}>
              <button
                onClick={() => setOpenFaq((cur) => (cur === i ? null : i))}
                style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "20px 2px", textAlign: "left", color: "var(--text)", fontSize: 17, fontWeight: 500 }}
              >
                {q}
                <span style={{ color: "var(--accent2)", fontSize: 16, flex: "none" }}>{openFaq === i ? "–" : "+"}</span>
              </button>
              {openFaq === i && <div style={{ padding: "0 2px 22px", fontSize: 16, color: "var(--text2)", maxWidth: "40em" }}>{a}</div>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 40px 96px" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--tint)", padding: "60px 56px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 40, lineHeight: 1.08, letterSpacing: "-.03em", margin: 0, maxWidth: "24em" }}>
            Your newsletter already has something to say.
          </h2>
          <p style={{ fontSize: 17, color: "var(--text2)", margin: 0, maxWidth: "30em" }}>Now give your audience another way to experience it.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
            <Link href={`/contact?intent=purchase&plan=one&discount=50&nl=${encodeURIComponent(name)}`} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}>
              Create My Complete Brief <span style={{ opacity: 0.75 }}>→</span>
            </Link>
            <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", background: "transparent", border: "1px solid var(--border)", color: "var(--text)", fontSize: 16, padding: "15px 26px", borderRadius: 12 }}>
              View All Plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
