"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MountainImage } from "./SampleContent";
import { CloudMascot } from "./CloudMascot";
import { TESTIMONIALS } from "@/lib/testimonials";
import {
  CheckCircleIcon,
  HeadphonesIcon,
  DocumentIcon,
  ShareUpIcon,
  CodeIcon,
  GridIcon,
  SlidersIcon,
  BookmarkIcon,
  ChevronDownIcon,
  LightningIcon,
  CalendarIcon,
  CrownIcon,
} from "./icons";

interface RegionPricing {
  symbol: string;
  oneTime: number;
  monthly: number;
  annual: number;
}

const DISCOUNT_PERCENT = 60;

const PREVIEW_INCLUDES = ["Audio preview (1-2 minutes)", "Generated from your newsletter", "One voice", "Quick listening experience"];

const COMPLETE_INCLUDES = [
  "Full 2-3 minute Brief",
  "Choose from multiple briefing styles",
  "Multiple voice options (or your brand voice)",
  "Script review and editing",
  "Saved pronunciation preferences",
  "Brief summary",
  "Ready-to-share assets (social posts, images, quotes)",
  "Blog audio embed",
  "QR code for easy sharing",
  "Personal workspace",
];

const USES: [React.ReactNode, string][] = [
  [<HeadphonesIcon key="a" size={18} />, "Audio Brief"],
  [<DocumentIcon key="b" size={18} />, "Brief Summary"],
  [<ShareUpIcon key="c" size={18} />, "Ready-to-share assets"],
  [<CodeIcon key="d" size={18} />, "Blog audio embed"],
  [<GridIcon key="e" size={18} />, "QR code"],
  [<SlidersIcon key="f" size={18} />, "Brand voice"],
  [<BookmarkIcon key="g" size={18} />, "Saved pronunciations"],
  [<GridIcon key="h" size={18} />, "Your workspace"],
];

const FAQ_DATA = [
  ["Is this really a one-time purchase?", "Yes. Your first complete Brief is a single one-time purchase at the discounted price. There's no subscription unless you choose a Monthly or Annual plan."],
  ["What do I get with the discount?", "The full Cirro Brief experience for the newsletter you just previewed: your choice of style and voice, script review, saved pronunciations, and the complete set of ready-to-share assets."],
  ["Can I use my own voice or brand voice?", "Yes. During setup you can choose from the voice library or use a saved brand voice, according to your plan."],
  ["How is this different from the free preview?", "The preview is a short, automatic, single-voice version. The complete Brief gives you control over style, voice, script, and pronunciation, plus the full set of publishing assets and a personal workspace."],
  ["How quickly will my Brief be ready?", "Once your preferences are set, generation is designed to be fast. You can track progress from your workspace."],
];

function fmt(symbol: string, n: number) {
  return `${symbol}${Math.round(n).toLocaleString()}`;
}

function IncludesBox({ title, badge, badgeColor, items, muted }: { title: string; badge: string; badgeColor: string; items: string[]; muted?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ border: `1px solid ${muted ? "var(--border)" : "var(--accent2)"}`, borderRadius: 18, background: muted ? "var(--card)" : "var(--tint)", overflow: "hidden" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="pdo-accordion-btn"
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "22px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18 }}>{title}</span>
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: badgeColor, background: "var(--card)", border: `1px solid var(--border)`, borderRadius: 999, padding: "4px 10px" }}>
            {badge}
          </span>
        </span>
        <span className="pdo-accordion-chevron" style={{ color: "var(--text3)", flex: "none", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s ease" }}>
          <ChevronDownIcon size={18} />
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: 11 }}>
          {items.map((it) => (
            <div key={it} style={{ display: "flex", gap: 10, fontSize: 15, color: "var(--text)" }}>
              <span style={{ color: "var(--accent2)", flex: "none", marginTop: 1 }}>
                <CheckCircleIcon size={16} />
              </span>
              {it}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PostDemoOfferClient() {
  const params = useSearchParams();
  const name = params.get("name") || "your newsletter";
  const [pricing, setPricing] = useState<RegionPricing | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/pricing").then((r) => r.json()).then(setPricing);
  }, []);

  const discounted = useMemo(() => (pricing ? Math.round((pricing.oneTime * (100 - DISCOUNT_PERCENT)) / 100) : null), [pricing]);
  const monthlyEquivalent = pricing ? Math.round(pricing.annual / 12) : null;

  const plans = pricing
    ? [
        { key: "one", icon: <LightningIcon size={20} />, name: "One-Time", note: "For occasional publishing.", price: fmt(pricing.symbol, pricing.oneTime), per: "/ edition", cta: "Create One Brief", href: "/pricing" },
        { key: "monthly", icon: <CalendarIcon size={20} />, name: "Monthly", note: "For regular publishing.", price: fmt(pricing.symbol, pricing.monthly), per: "/ month", cta: "Start Monthly", href: "/pricing" },
        { key: "annual", icon: <CrownIcon size={20} />, name: "Annual", note: "For frequent publishing at the best value.", price: fmt(pricing.symbol, pricing.annual), per: "/ year", sub: monthlyEquivalent ? `${fmt(pricing.symbol, monthlyEquivalent)}/month when billed annually` : undefined, cta: "Choose Annual", href: "/pricing", best: true },
      ]
    : [];

  const purchaseHref = `/contact?intent=purchase&plan=one&discount=${DISCOUNT_PERCENT}&nl=${encodeURIComponent(name)}`;

  return (
    <>
      {/* Hero */}
      <section className="pdo-section pdo-hero-grid">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 14px", marginBottom: 22 }}>
            <CheckCircleIcon size={13} />
            Your Brief is ready
          </div>
          <h1 className="pdo-h1" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-.03em", margin: "0 0 16px" }}>
            {name}
          </h1>
          <p style={{ fontSize: 17, color: "var(--text2)", margin: "0 0 22px", maxWidth: "30em" }}>
            We&apos;ve turned your newsletter into a concise, engaging audio experience.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 }}>
            {["Generated from your newsletter", "About a minute to preview", "Same story, a new way to experience it"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--text)" }}>
                <span className="icon-badge" style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--tint)", color: "var(--accent2)" }}>
                  <CheckCircleIcon size={13} />
                </span>
                {t}
              </div>
            ))}
          </div>
          <Link href={purchaseHref} className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 15.5, fontWeight: 500, padding: "14px 24px", borderRadius: 12 }}>
            Try Another Newsletter <span style={{ opacity: 0.75 }}>→</span>
          </Link>
        </div>

        <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--card)", boxShadow: "var(--shadow), var(--glow-teal)", padding: "22px 24px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span className="icon-badge" style={{ width: 26, height: 26, borderRadius: 8, background: "var(--tint)", color: "var(--accent2)" }}>
              <HeadphonesIcon size={14} />
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>Cirro Brief</span>
            <span style={{ fontSize: 11.5, color: "var(--text3)", marginLeft: "auto" }}>Generated from your newsletter</span>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="pdo-card-title" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, lineHeight: 1.2 }}>{name}</div>
            </div>
            <div style={{ width: "34%", maxWidth: 150, minWidth: 90, flex: "none" }}>
              <MountainImage crop="4/3" radius={12} sizes="150px" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
            {["Concise", "Natural voice", "Key insights"].map((c) => (
              <span key={c} style={{ fontSize: 11, color: "var(--accent2)", background: "var(--tint)", borderRadius: 999, padding: "4px 10px" }}>{c}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 44, height: 44, flex: "none", borderRadius: "50%", background: "var(--btn)", color: "var(--btn-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, boxShadow: "0 0 0 6px color-mix(in srgb, var(--accent2) 16%, transparent)" }}>▶</span>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 2, height: 30, minWidth: 0 }}>
              {Array.from({ length: 40 }, (_, i) => 18 + Math.round(70 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.21)))).map((h, i) => (
                <span key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 1, background: "var(--accent2)", opacity: i < 9 ? 1 : 0.5 }} />
              ))}
            </div>
            <span style={{ fontSize: 11.5, color: "var(--text3)", flex: "none" }}>0:00 / 1:32</span>
          </div>
        </div>
      </section>

      {/* Preview vs complete */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div className="pdo-section">
          <div style={{ maxWidth: "38em", margin: "0 auto 32px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(26px, 4.4vw, 34px)", lineHeight: 1.15, letterSpacing: "-.02em", margin: "0 0 10px" }}>
              You just heard the audio version of your newsletter.
            </h2>
            <p style={{ fontSize: 16, color: "var(--text2)", margin: 0 }}>
              The free preview lets you hear the core experience. The complete Brief gives you more control over the
              audio, publishing assets, and your own workspace.
            </p>
          </div>
          <div className="pdo-compare-grid">
            <IncludesBox title="What you just tried" badge="Free preview" badgeColor="var(--text3)" items={PREVIEW_INCLUDES} muted />
            <IncludesBox title="What you get with a complete Brief" badge="Much more" badgeColor="var(--accent2)" items={COMPLETE_INCLUDES} />
          </div>
        </div>
      </section>

      {/* Limited time offer */}
      <section className="pdo-section">
        <div className="pdo-offer-band">
          <div>
            <div style={{ display: "inline-flex", fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#06120f", background: "#f0ab63", borderRadius: 999, padding: "5px 12px", marginBottom: 16 }}>
              Limited time offer
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(24px, 4vw, 32px)", lineHeight: 1.15, letterSpacing: "-.02em", margin: "0 0 12px" }}>
              Get your first complete Brief for {DISCOUNT_PERCENT}% off.
            </h2>
            <p style={{ fontSize: 15.5, opacity: 0.85, margin: 0, maxWidth: "30em" }}>
              You just tried Cirro Brief with your own newsletter. Unlock the full experience for a one-time special
              price.
            </p>
          </div>
          <div className="pdo-offer-price">
            {pricing && discounted !== null ? (
              <>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 18, opacity: 0.6, textDecoration: "line-through" }}>{fmt(pricing.symbol, pricing.oneTime)}</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 40, letterSpacing: "-.02em" }}>{fmt(pricing.symbol, discounted)}</span>
                </div>
                <div style={{ fontSize: 12.5, opacity: 0.75, marginBottom: 16 }}>Your first complete Brief</div>
              </>
            ) : (
              <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 16 }}>Loading...</div>
            )}
            <Link
              href={purchaseHref}
              className="btn-pop"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, background: "#fff", color: "var(--band)", fontSize: 15, fontWeight: 500, padding: "13px 22px", borderRadius: 11, width: "100%" }}
            >
              Get My Complete Brief <span style={{ opacity: 0.75 }}>→</span>
            </Link>
            <div style={{ fontSize: 11.5, opacity: 0.65, marginTop: 10 }}>
              One-time purchase · No subscription · Includes the complete Brief experience
            </div>
          </div>
        </div>
      </section>

      {/* Uses grid */}
      <section className="pdo-section">
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(24px, 4vw, 30px)", letterSpacing: "-.02em", margin: "0 0 6px" }}>One Brief. More ways to use it.</h2>
        <p style={{ fontSize: 15, color: "var(--text2)", margin: "0 0 28px" }}>Turn your newsletter into a complete content package, ready to share.</p>
        <div className="pdo-uses-grid">
          {USES.map(([icon, label]) => (
            <div key={label} className="hover-pop" style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="icon-badge icon-glow" style={{ width: 36, height: 36, borderRadius: 10, background: "var(--tint)", color: "var(--accent2)" }}>{icon}</span>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Other plans */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div className="pdo-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(24px, 4vw, 30px)", letterSpacing: "-.02em", margin: "0 0 6px" }}>Publishing regularly?</h2>
              <p style={{ fontSize: 15, color: "var(--text2)", margin: 0 }}>If you publish more than once, choose a plan that works for you.</p>
            </div>
            <Link href="/pricing" style={{ fontSize: 14, color: "var(--accent2)", flex: "none" }}>See full pricing →</Link>
          </div>
          <div className="pdo-plans-grid">
            {plans.map((p) => (
              <div key={p.key} style={{ position: "relative", border: `1px solid ${p.best ? "var(--accent2)" : "var(--border)"}`, borderRadius: 16, background: "var(--card)", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 8 }}>
                {p.best && (
                  <span style={{ position: "absolute", top: -11, left: 20, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--orange)", color: "#3a2a17", borderRadius: 999, padding: "4px 10px", fontWeight: 700 }}>
                    Best value
                  </span>
                )}
                <span className="icon-badge" style={{ width: 34, height: 34, borderRadius: 10, background: "var(--tint)", color: "var(--accent2)" }}>{p.icon}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15 }}>{p.name}</span>
                <span style={{ fontSize: 13, color: "var(--text2)" }}>{p.note}</span>
                <div style={{ margin: "4px 0" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 24 }}>{p.price}</span>
                  <span style={{ fontSize: 13, color: "var(--text3)" }}> {p.per}</span>
                  {p.sub && <div style={{ fontSize: 11.5, color: "var(--text3)", marginTop: 2 }}>{p.sub}</div>}
                </div>
                <Link href={p.href} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, border: "1px solid var(--border)", color: "var(--text)", fontSize: 13.5, fontWeight: 500, padding: "10px 14px", borderRadius: 10, marginTop: "auto" }}>
                  {p.cta} →
                </Link>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--text3)", margin: "18px 0 0" }}>
            Your {DISCOUNT_PERCENT}% offer applies only to your first complete one-time Brief. You can choose any plan later.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      {TESTIMONIALS.length > 0 && (
        <section className="pdo-section">
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <CloudMascot variant="emotional" size={48} radius={14} />
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(24px, 4vw, 30px)", letterSpacing: "-.02em", margin: 0 }}>
              Loved by newsletter <span style={{ color: "var(--accent2)" }}>creators.</span>
            </h2>
          </div>
          <div className="pdo-testimonial-row">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} style={{ flex: "none", width: "min(320px, 84vw)", scrollSnapAlign: "start", margin: 0, border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "20px 20px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
                <blockquote style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "var(--text)" }}>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--tint)", color: "var(--accent2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12, flex: "none" }}>
                    {t.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </span>
                  <span>
                    <span style={{ display: "block", fontSize: 13.5, fontWeight: 600 }}>{t.name}</span>
                    <span style={{ display: "block", fontSize: 12, color: "var(--text3)" }}>{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="pdo-section" style={{ maxWidth: 800 }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(24px, 4vw, 30px)", letterSpacing: "-.02em", margin: "0 0 22px" }}>Frequently asked questions.</h2>
        <div style={{ borderTop: "1px solid var(--border2)" }}>
          {FAQ_DATA.map(([q, a], i) => (
            <div key={q} style={{ borderBottom: "1px solid var(--border2)" }}>
              <button
                onClick={() => setOpenFaq((cur) => (cur === i ? null : i))}
                style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "18px 2px", textAlign: "left", color: "var(--text)", fontSize: 15.5, fontWeight: 500 }}
              >
                {q}
                <span style={{ color: "var(--accent2)", fontSize: 16, flex: "none" }}>{openFaq === i ? "×" : "+"}</span>
              </button>
              {openFaq === i && <div style={{ padding: "0 2px 20px", fontSize: 14.5, color: "var(--text2)", maxWidth: "40em" }}>{a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="pdo-section">
        <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--band)", color: "#fff", padding: "clamp(32px, 5vw, 48px)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <CloudMascot variant="primary" size={72} radius={18} glow style={{ border: "1px solid rgba(255,255,255,.22)" }} />
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(24px, 5vw, 36px)", lineHeight: 1.12, letterSpacing: "-.03em", margin: 0, maxWidth: "24em" }}>
            Your newsletter already has the content. Now give people another way to experience it.
          </h2>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
            <Link href={purchaseHref} className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: "var(--band)", fontSize: 15.5, fontWeight: 500, padding: "14px 24px", borderRadius: 12 }}>
              {pricing && discounted !== null ? `Get My Complete Brief — ${fmt(pricing.symbol, discounted)}` : "Get My Complete Brief"} <span style={{ opacity: 0.75 }}>→</span>
            </Link>
          </div>
          <div style={{ display: "flex", gap: "10px 22px", flexWrap: "wrap", justifyContent: "center", fontSize: 13, opacity: 0.85 }}>
            {["Fast and easy", "No credit card needed for demo", "Loved by creators"].map((t) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#7fd3ad", display: "flex" }}><CheckCircleIcon size={14} /></span>
                {t}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 12, opacity: 0.65 }}>{DISCOUNT_PERCENT}% off your first one-time Brief.</div>
        </div>
      </section>
    </>
  );
}
