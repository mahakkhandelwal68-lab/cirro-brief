"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface RegionPricing {
  region: string;
  currency: string;
  symbol: string;
  oneTime: number;
  monthly: number;
  annual: number;
}

interface CustomResult {
  currency: string;
  symbol: string;
  discountPercent: number;
  price: number;
  billing: "monthly" | "annual";
}

function fmt(symbol: string, n: number) {
  return `${symbol}${n.toLocaleString()}`;
}

const SHAPE_CARDS = [
  ["✦", "Choose how it's written", "Direct, Conversational, Analytical, Engaging, and more."],
  ["🎙", "Choose the voice", "180+ voices, or a custom voice on eligible plans."],
  ["✏️", "Review before you generate", "See the script first, or let Cirro Brief continue automatically."],
  ["🔤", "Handle pronunciations", "Add guidance for names, brands and industry terms."],
];

const AFTER_STEPS = [
  ["01", "Choose your plan", "Select the option that fits how often you want to create."],
  ["02", "Complete your purchase", "Securely complete payment."],
  ["03", "Your workspace is ready", "Access created using your purchase email."],
  ["04", "Set up your briefing", "Add your newsletter and your preferences."],
  ["05", "Generate and share", "Create your audio and access your assets."],
];

const FAQ_DATA = [
  ["Can I start with just one newsletter?", "Yes. The One-Time option lets you create one complete newsletter audio briefing."],
  ["What is included in the Monthly plan?", "The Monthly plan includes 4 newsletter briefings every month, along with all standard Cirro Brief features and custom voice creation."],
  ["What is included in the Annual plan?", "The Annual plan includes 48 newsletter briefings per year, along with custom voice creation and the full recurring-plan experience."],
  ["Can I choose my own voice?", "Yes. You can choose from 180+ available voices. Monthly and Annual plans also include the custom voice creation option."],
  ["Can I review the script before the audio is generated?", "Yes. You can choose to review the script before generating the audio."],
  ["What if certain names need to be pronounced correctly?", "You can add pronunciation guidance for brand names, people, industry terms, and other important words."],
  ["What if I need a different number of briefings?", "Use the Custom plan calculator below and tell us how many editions you need."],
];

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 32, lineHeight: 1.1, letterSpacing: "-.025em", margin: "0 0 10px" }}>
      {children}
    </h2>
  );
}

export function PricingClient() {
  const searchParams = useSearchParams();
  const debugCountry = searchParams.get("country");
  const [pricing, setPricing] = useState<RegionPricing | null>(null);
  const [newsletters, setNewsletters] = useState(3);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [customResult, setCustomResult] = useState<CustomResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const qs = debugCountry ? `?country=${debugCountry}` : "";
    fetch(`/api/pricing${qs}`).then((r) => r.json()).then(setPricing);
  }, [debugCountry]);

  useEffect(() => {
    fetch("/api/pricing/custom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newslettersPerMonth: newsletters, billing, country: debugCountry }),
    })
      .then((r) => r.json())
      .then(setCustomResult);
  }, [newsletters, billing, debugCountry]);

  if (!pricing) {
    return <div style={{ padding: "80px 40px", textAlign: "center", color: "var(--text3)" }}>Loading pricing...</div>;
  }

  const perBriefingMonthly = Math.round(pricing.monthly / 4);
  const perBriefingAnnual = Math.round(pricing.annual / 48);
  const annualSavings = pricing.monthly * 12 - pricing.annual;

  const plans = [
    {
      key: "one",
      eyebrow: "One-Time · For a single edition",
      title: "One Brief",
      desc: "Create one complete audio briefing.",
      price: fmt(pricing.symbol, pricing.oneTime),
      per: "per newsletter",
      volume: null as string | null,
      includesLabel: null as string | null,
      includes: [
        "1 complete audio briefing",
        "Newsletter adapted for listening",
        "Choose your briefing style",
        "Optional script review",
        "Edit before audio generation",
        "Choose from 180+ voices",
        "Custom pronunciation guidance",
        "Access to your workspace",
      ],
      cta: "Create One Brief",
      footnote: "No subscription required.",
      badge: null as string | null,
      primary: false,
      style: "normal" as const,
    },
    {
      key: "monthly",
      eyebrow: "Monthly",
      title: "Create Every Month",
      desc: "Make audio part of your monthly rhythm.",
      price: fmt(pricing.symbol, pricing.monthly),
      per: "per month",
      volume: `4 briefings every month · ${fmt(pricing.symbol, perBriefingMonthly)} each`,
      includesLabel: "Everything in One-Time, plus:",
      includes: [
        "4 complete briefings monthly",
        "Custom voice creation",
        "Save publication preferences",
        "Save pronunciation preferences",
        "Ready workflow for future editions",
        "Organised audio library",
      ],
      cta: "Start Monthly",
      footnote: null,
      badge: "Most Popular",
      primary: true,
      style: "normal" as const,
    },
    {
      key: "annual",
      eyebrow: "Annual",
      title: "Build Audio Into Your Publication",
      desc: "Make listening part of your publication.",
      price: fmt(pricing.symbol, pricing.annual),
      per: "per year",
      volume: `48 briefings per year · ${fmt(pricing.symbol, perBriefingAnnual)} each — save ${fmt(pricing.symbol, annualSavings)}`,
      includesLabel: "Everything in Monthly, plus:",
      includes: [
        "48 complete briefings yearly",
        "Custom voice creation",
        "Consistent preferences all year",
        "A growing audio library",
        "The lowest cost per briefing",
      ],
      cta: "Start Annual",
      footnote: null,
      badge: "🏆 Best Value",
      primary: true,
      style: "annual" as const,
    },
  ];

  const compareData: [string, string | number, string | number, string | number, string][] = [
    ["Newsletter briefings", "1", "4 / month", "48 / year", "Based on plan"],
    ["Newsletter adapted for listening", 1, 1, 1, "1"],
    ["Audio briefing", 1, 1, 1, "1"],
    ["Choose briefing style", 1, 1, 1, "1"],
    ["Choose script type and tone", 1, 1, 1, "1"],
    ["Optional script review", 1, 1, 1, "1"],
    ["Edit before audio generation", 1, 1, 1, "1"],
    ["180+ voice library", 1, 1, 1, "1"],
    ["Custom voice creation", 0, 1, 1, "Available"],
    ["Custom pronunciation guidance", 1, 1, 1, "1"],
    ["Save publication preferences", 0, 1, 1, "1"],
    ["Save pronunciation preferences", 0, 1, 1, "1"],
    ["Personal workspace", 1, 1, 1, "1"],
    ["Audio library", 1, 1, 1, "1"],
    ["Included publishing assets", 1, 1, 1, "Based on plan"],
    ["Price", fmt(pricing.symbol, pricing.oneTime), `${fmt(pricing.symbol, pricing.monthly)}/mo`, `${fmt(pricing.symbol, pricing.annual)}/yr`, "Custom"],
  ];
  const cell = (v: string | number) => (v === 1 ? "✓" : v === 0 ? "—" : v);
  const cellColor = (v: string | number) => (v === 1 ? "var(--accent2)" : v === 0 ? "var(--text3)" : "var(--text)");

  const decisionHelper = [
    ["I want to create one edition.", `One-Time — ${fmt(pricing.symbol, pricing.oneTime)}`, "Best for a single complete briefing without a subscription."],
    ["I publish regularly.", `Monthly — ${fmt(pricing.symbol, pricing.monthly)}/mo`, "Best for up to four newsletter audio briefings every month."],
    ["I publish consistently all year.", `Annual — ${fmt(pricing.symbol, pricing.annual)}/yr`, "Best value for building audio into your regular publishing."],
    ["My needs are different.", "Custom", "Tell us how many newsletters you need and get an instant price."],
  ];

  return (
    <>
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "76px 40px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 14px", marginBottom: 26 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent2)", display: "inline-block" }} />
          Pricing
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 48, lineHeight: 1.1, letterSpacing: "-.03em", margin: "0 auto 18px", maxWidth: "30em" }}>
          Turn every edition into an experience your audience can listen to.
        </h1>
        <p style={{ fontSize: 17.5, color: "var(--text2)", margin: "0 auto 10px", maxWidth: "34em" }}>
          Your newsletter already contains ideas worth sharing. Cirro Brief helps you transform your written edition
          into a polished audio briefing—giving your audience another way to experience your content.
        </p>
        <p style={{ fontSize: 15.5, color: "var(--text2)", margin: "0 0 6px" }}>Choose a plan based on how often you publish.</p>
        <p style={{ fontSize: 13, color: "var(--text3)", margin: "0 0 28px" }}>Pricing shown in {pricing.currency} based on your location.</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}>
            Try Your Newsletter First <span style={{ opacity: 0.75 }}>→</span>
          </Link>
        </div>
        <p style={{ fontSize: 13, color: "var(--text3)", margin: "14px 0 0" }}>No signup required to try the demo.</p>
      </section>

      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 40px", textAlign: "center" }}>
          <H2>One newsletter. A completely new way to experience it.</H2>
          <p style={{ fontSize: 16.5, color: "var(--text2)", margin: "0 auto", maxWidth: "38em" }}>
            Your audience isn&apos;t always in a position to sit down and read. With Cirro Brief, they can listen to
            your content while commuting, walking, exercising, or moving through their day.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 64px" }}>
        <div style={{ textAlign: "center", maxWidth: "36em", margin: "0 auto 40px" }}>
          <H2>Make the briefing feel like your publication.</H2>
          <p style={{ fontSize: 16, color: "var(--text2)", margin: 0 }}>Cirro Brief gives you control over more than just the final audio.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {SHAPE_CARDS.map(([icon, title, body]) => (
            <div key={title} className="hover-pop" style={{ border: "1px solid var(--border2)", borderRadius: 16, background: "var(--card)", padding: "22px 22px", display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 19 }}>{icon}</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16.5 }}>{title}</span>
              <span style={{ fontSize: 14.2, color: "var(--text2)" }}>{body}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 40px 24px", textAlign: "center" }}>
          <H2>Choose how you want to create.</H2>
          <p style={{ fontSize: 16.5, color: "var(--text2)", margin: "0 auto", maxWidth: "34em" }}>
            Whether you&apos;re creating one edition or making audio part of your regular publishing process, there&apos;s
            a plan built around your schedule.
          </p>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 40px 56px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, alignItems: "stretch" }}>
            {plans.map((p) => {
              const isAnnual = p.style === "annual";
              const bd = isAnnual ? "var(--accent)" : p.primary ? "var(--accent2)" : "var(--border)";
              return (
                <div
                  key={p.key}
                  className="hover-pop"
                  style={{
                    position: "relative",
                    border: `${p.primary ? 2 : 1}px solid ${bd}`,
                    borderRadius: 20,
                    background: isAnnual ? "var(--tint)" : "var(--card)",
                    padding: "28px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    boxShadow: p.primary ? "var(--shadow)" : "none",
                  }}
                >
                  {p.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: -13,
                        left: 24,
                        fontSize: 10.5,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        background: isAnnual ? "var(--accent)" : "var(--accent2)",
                        color: "#fff",
                        borderRadius: 999,
                        padding: "5px 12px",
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                  <div>
                    <span style={{ fontSize: 10.5, letterSpacing: ".13em", textTransform: "uppercase", color: "var(--text3)" }}>{p.eyebrow}</span>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, letterSpacing: "-.015em", marginTop: 6 }}>{p.title}</div>
                    <div style={{ fontSize: 13.8, color: "var(--text2)", marginTop: 4 }}>{p.desc}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 30, letterSpacing: "-.02em" }}>{p.price}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text3)" }}>{p.per}</div>
                  </div>
                  {p.volume && <div style={{ fontSize: 13.2, color: "var(--accent2)", fontWeight: 500 }}>{p.volume}</div>}
                  <div style={{ height: 1, background: "var(--border2)" }} />
                  {p.includesLabel && <div style={{ fontSize: 12, color: "var(--text3)" }}>{p.includesLabel}</div>}
                  <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
                    {p.includes.map((i) => (
                      <div key={i} style={{ display: "flex", gap: 8, fontSize: 13.6, color: "var(--text)" }}>
                        <span style={{ color: "var(--accent2)", flex: "none" }}>✓</span>
                        {i}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/contact?intent=purchase&plan=${p.key}`}
                    className="btn-pop"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      background: p.primary ? "var(--btn)" : "transparent",
                      color: p.primary ? "var(--btn-text)" : "var(--text)",
                      border: `1px solid ${bd}`,
                      fontSize: 14.8,
                      fontWeight: 500,
                      padding: "13px 16px",
                      borderRadius: 11,
                    }}
                  >
                    {p.cta} <span style={{ opacity: 0.75 }}>→</span>
                  </Link>
                  {p.footnote && <div style={{ fontSize: 12, color: "var(--text3)", textAlign: "center" }}>{p.footnote}</div>}
                </div>
              );
            })}
          </div>

          {/* Custom plan calculator - replaces the design's static "Custom" card with an instant calculator */}
          <div style={{ border: "1px dashed var(--border)", borderRadius: 20, background: "var(--bg2)", padding: "28px 30px", marginTop: 16 }}>
            <span style={{ fontSize: 10.5, letterSpacing: ".13em", textTransform: "uppercase", color: "var(--text3)" }}>Custom · Built around your needs</span>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, letterSpacing: "-.015em", margin: "6px 0 4px" }}>Your Own Plan</div>
            <p style={{ fontSize: 13.8, color: "var(--text2)", margin: "0 0 20px" }}>
              More than a few editions a month, or a different publishing rhythm? Tell us how many newsletters you
              need and get an instant price — no consultation required.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 8 }}>Newsletters needed per month</label>
                <input
                  type="number"
                  min={1}
                  value={newsletters}
                  onChange={(e) => setNewsletters(Math.max(1, Number(e.target.value) || 1))}
                  style={{ width: "100%", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", fontSize: 16, background: "var(--bg)", color: "var(--text)", marginBottom: 18 }}
                />
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2)", marginBottom: 8 }}>Billing</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {(["monthly", "annual"] as const).map((b) => (
                    <button
                      key={b}
                      onClick={() => setBilling(b)}
                      style={{
                        flex: 1,
                        cursor: "pointer",
                        fontSize: 14.5,
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: `1px solid ${billing === b ? "var(--accent2)" : "var(--border)"}`,
                        background: billing === b ? "var(--accent)" : "transparent",
                        color: billing === b ? "#fff" : "var(--text)",
                      }}
                    >
                      {b === "monthly" ? "Monthly" : "Annual"}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "22px 24px" }}>
                {customResult ? (
                  <>
                    <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 6 }}>Your estimated price ({customResult.discountPercent}% off)</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 30, marginBottom: 16 }}>
                      {fmt(customResult.symbol, customResult.price)}
                      <span style={{ fontSize: 14, color: "var(--text3)", fontWeight: 400 }}> /{customResult.billing === "monthly" ? "month" : "year"}</span>
                    </div>
                    <Link
                      href={`/contact?intent=purchase&plan=custom&n=${newsletters}&billing=${billing}`}
                      className="btn-pop"
                      style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--btn)", color: "var(--btn-text)", fontSize: 14.5, fontWeight: 500, padding: "12px 18px", borderRadius: 10 }}
                    >
                      Build a Custom Plan <span style={{ opacity: 0.7 }}>→</span>
                    </Link>
                  </>
                ) : (
                  <span style={{ color: "var(--text3)", fontSize: 14 }}>Calculating...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 64px" }}>
        <div style={{ textAlign: "center", maxWidth: "34em", margin: "0 auto 36px" }}>
          <H2>Compare everything included.</H2>
          <p style={{ fontSize: 15.5, color: "var(--text2)", margin: 0 }}>A clear view of what comes with each option.</p>
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", overflow: "hidden", boxShadow: "var(--shadow)", overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", borderBottom: "1px solid var(--border)", minWidth: 700 }}>
            <div style={{ padding: "13px 20px" }} />
            {[
              ["One-Time", "var(--text3)", "transparent"],
              ["Monthly", "var(--accent2)", "var(--tint)"],
              ["Annual", "var(--text3)", "transparent"],
              ["Custom", "var(--text3)", "transparent"],
            ].map(([label, color, bg]) => (
              <div key={label} style={{ padding: "13px 14px", textAlign: "center", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color, background: bg, borderLeft: "1px solid var(--border2)" }}>
                {label}
              </div>
            ))}
          </div>
          {compareData.map(([label, one, month, annual, custom], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", borderBottom: "1px solid var(--border2)", minWidth: 700 }}>
              <div style={{ padding: "11px 20px", fontSize: 13.8, color: "var(--text)" }}>{label}</div>
              <div style={{ padding: "11px 14px", textAlign: "center", borderLeft: "1px solid var(--border2)", fontSize: 13.6, color: cellColor(one) }}>{cell(one)}</div>
              <div style={{ padding: "11px 14px", textAlign: "center", borderLeft: "1px solid var(--border2)", background: "var(--tint)", fontSize: 13.6, color: cellColor(month) }}>{cell(month)}</div>
              <div style={{ padding: "11px 14px", textAlign: "center", borderLeft: "1px solid var(--border2)", fontSize: 13.6, color: cellColor(annual) }}>{cell(annual)}</div>
              <div style={{ padding: "11px 14px", textAlign: "center", borderLeft: "1px solid var(--border2)", fontSize: 13.6, color: "var(--text2)" }}>{custom}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "var(--text3)", margin: "16px 0 0", textAlign: "center" }}>
          Custom plans are designed around your publishing volume and specific requirements.
        </p>
      </section>

      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 40px" }}>
          <div style={{ textAlign: "center", maxWidth: "32em", margin: "0 auto 36px" }}>
            <H2>Find a voice that fits. Or create one that&apos;s yours.</H2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--card)", padding: "30px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text3)" }}>One-Time</span>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 26, letterSpacing: "-.02em" }}>180+ voices to explore</div>
              <p style={{ fontSize: 15, color: "var(--text2)", margin: 0 }}>
                Choose from a wide range of voices and find the one that fits the tone of your newsletter.
              </p>
            </div>
            <div style={{ border: "2px solid var(--accent2)", borderRadius: 18, background: "var(--tint)", padding: "30px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--accent2)" }}>Monthly &amp; Annual</span>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 26, letterSpacing: "-.02em" }}>Create your own custom voice</div>
              <p style={{ fontSize: 15, color: "var(--text2)", margin: 0 }}>
                Take your publication a step further. A consistent voice can help make each audio edition feel
                recognisably yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 64px" }}>
        <H2>
          <span style={{ display: "block", textAlign: "center" }}>From newsletter to listening experience.</span>
        </H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginTop: 30 }}>
          {AFTER_STEPS.map(([n, title, body]) => (
            <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10 }}>
              <span style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--accent)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {n}
              </span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15.5 }}>{title}</span>
              <span style={{ fontSize: 13.2, color: "var(--text2)" }}>{body}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 40px" }}>
          <H2>
            <span style={{ display: "block", textAlign: "center" }}>Which plan should I choose?</span>
          </H2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 20 }}>
            {decisionHelper.map(([q, a, detail]) => (
              <div key={q} className="hover-pop" style={{ border: "1px solid var(--border2)", borderRadius: 16, background: "var(--card)", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 13.5, color: "var(--text2)" }}>{q}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "var(--text)" }}>{a}</span>
                <span style={{ fontSize: 12.8, color: "var(--text3)", flex: 1 }}>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 56px", display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: 64, alignItems: "start" }}>
        <div>
          <H2>Questions before you choose.</H2>
        </div>
        <div style={{ borderTop: "1px solid var(--border2)" }}>
          {FAQ_DATA.map(([q, a], i) => (
            <div key={q} style={{ borderBottom: "1px solid var(--border2)" }}>
              <button
                onClick={() => setOpenFaq((cur) => (cur === i ? null : i))}
                style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "20px 2px", textAlign: "left", color: "var(--text)", fontSize: 16.5, fontWeight: 500 }}
              >
                {q}
                <span style={{ color: "var(--accent2)", fontSize: 16, flex: "none" }}>{openFaq === i ? "–" : "+"}</span>
              </button>
              {openFaq === i && <div style={{ padding: "0 2px 22px", fontSize: 15.5, color: "var(--text2)", maxWidth: "40em" }}>{a}</div>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 96px" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--tint)", padding: "56px 56px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 36, lineHeight: 1.1, letterSpacing: "-.03em", margin: 0, maxWidth: "22em" }}>
            Your newsletter already has a voice.
          </h2>
          <p style={{ fontSize: 16.5, color: "var(--text2)", margin: 0, maxWidth: "28em" }}>
            Give your audience a way to hear it. Choose the plan that fits the way you publish.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
            <Link href="/contact?intent=purchase" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}>
              Choose Your Plan <span style={{ opacity: 0.75 }}>→</span>
            </Link>
            <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", background: "transparent", border: "1px solid var(--border)", color: "var(--text)", fontSize: 16, padding: "15px 26px", borderRadius: 12 }}>
              Try Your Newsletter First
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
