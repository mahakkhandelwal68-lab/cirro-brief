"use client";

import { useMemo, useRef } from "react";
import { Turnstile } from "./Turnstile";
import { Reveal } from "./Reveal";
import { TESTIMONIALS } from "@/lib/testimonials";
import {
  LightningIcon,
  SparkleIcon,
  LockIcon,
  LinkIcon,
  HeadphonesIcon,
  CheckCircleIcon,
  MailIcon,
} from "./icons";

const BRAND_PATHS: Record<string, string> = {
  Substack: "M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z",
  Kit: "m3.5 11.633-2.434 2.408V8.687a.53.53 0 0 0-.533-.527.53.53 0 0 0-.533.527v6.624a.528.528 0 0 0 .532.526.533.533 0 0 0 .377-.153l2.974-2.939 2.974 2.94a.535.535 0 0 0 .754 0 .522.522 0 0 0 0-.746l-2.974-2.938L7.61 9.06a.522.522 0 0 0 0-.745.538.538 0 0 0-.753 0l-3.344 3.307c-.003 0-.005.003-.007.005l-.007.006v-.001zm8.826 4.206a.53.53 0 0 1-.533-.526V8.688a.53.53 0 0 1 .533-.528.53.53 0 0 1 .533.528v6.624a.53.53 0 0 1-.533.526v.001zm7.257-6.624v6.098c0 .29.238.526.532.526a.53.53 0 0 0 .533-.526V9.215h2.818A.53.53 0 0 0 24 8.688a.53.53 0 0 0-.533-.527h-6.702a.53.53 0 0 0-.533.527.53.53 0 0 0 .533.527h2.819-.001z",
  Medium: "M4.21 0A4.201 4.201 0 0 0 0 4.21v15.58A4.201 4.201 0 0 0 4.21 24h15.58A4.201 4.201 0 0 0 24 19.79v-1.093c-.137.013-.278.02-.422.02-2.577 0-4.027-2.146-4.09-4.832a7.592 7.592 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.885 3.885 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023c.101 0 .202.004.303.01V4.211A4.201 4.201 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004zm19.25 3.668c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.378 1.378 0 0 0-.342-.047Zm-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z",
  Ghost: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.256 2.313c2.47.005 5.116 2.008 5.898 2.962l.244.3c1.64 1.994 3.569 4.34 3.569 6.966 0 3.719-2.98 5.808-6.158 7.508-1.433.766-2.98 1.508-4.748 1.508-4.543 0-8.366-3.569-8.366-8.112 0-.706.17-1.425.342-2.15.122-.515.244-1.033.307-1.549.548-4.539 2.967-6.795 8.422-7.408a4.29 4.29 0 01.49-.026Z",
};

// Brand colours are each platform's own; Medium, Ghost and Kit are black by brand.
const BRAND_STRIP: { name: string; glyph: string | null; color: string }[] = [
  { name: "Substack", glyph: "Substack", color: "#FF6719" },
  { name: "beehiiv", glyph: null, color: "#111111" },
  { name: "Kit", glyph: "Kit", color: "#111111" },
  { name: "Medium", glyph: "Medium", color: "#111111" },
  { name: "Ghost", glyph: "Ghost", color: "#15171A" },
];

const NOTE_FONT = 'Georgia, "Times New Roman", serif';

const FEATURES: [React.ReactNode, string, string][] = [
  [<LightningIcon key="a" size={20} />, "Fast", "Less than a minute"],
  [<SparkleIcon key="b" size={20} />, "Personalised", "From your actual content"],
  [<LockIcon key="c" size={20} />, "100% free", "No signup required"],
];

const STEPS: [React.ReactNode, string, string][] = [
  [<LinkIcon key="a" size={22} />, "Paste your link", "Add the link to any published newsletter edition."],
  [<SparkleIcon key="b" size={22} />, "We create your brief", "Our AI finds the key ideas and turns them into audio (usually under a minute)."],
  [<HeadphonesIcon key="c" size={22} />, "You listen", "Get a natural-sounding audio brief, ready to play."],
];

function ImageGlyph({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18l6-8 4 5 3-3 5 6z" />
      <circle cx="16.5" cy="7" r="1.6" />
    </svg>
  );
}

function HeroVisual() {
  const bars = useMemo(
    () => Array.from({ length: 40 }, (_, i) => 22 + Math.round(68 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)))),
    []
  );

  return (
    <div aria-hidden="true" className="td-visual">
      <div style={{ fontFamily: NOTE_FONT, fontStyle: "italic", fontSize: 18, color: "var(--accent2)", marginBottom: 8, paddingLeft: 6 }}>From this...</div>

      <div className="td-doc" style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", boxShadow: "var(--shadow)", padding: "16px 16px 18px" }}>
        <div style={{ fontSize: 10.5, color: "var(--text3)", marginBottom: 6 }}>The Daily Insight</div>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, lineHeight: 1.2, marginBottom: 12 }}>
          The future of work in a changing world
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            {[100, 92, 97, 74, 86, 62].map((w, i) => (
              <div key={i} style={{ height: 5, width: `${w}%`, borderRadius: 3, background: "var(--border)" }} />
            ))}
          </div>
          <div style={{ width: 70, height: 54, borderRadius: 8, background: "var(--tint)", color: "var(--accent2)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <ImageGlyph size={28} />
          </div>
        </div>
      </div>

      <div className="float-slow td-mascot">
        <svg viewBox="0 0 150 130" width="100%" style={{ display: "block" }}>
          <path d="M30 100a26 26 0 0 1 2-51 34 34 0 0 1 64-6 28 28 0 0 1 22 57z" fill="var(--card)" stroke="var(--border)" strokeWidth={2} />
          <path d="M38 62a36 36 0 0 1 74 0" fill="none" stroke="var(--accent2)" strokeWidth={7} strokeLinecap="round" />
          <rect x="28" y="58" width="14" height="30" rx="6" fill="var(--accent2)" />
          <rect x="108" y="58" width="14" height="30" rx="6" fill="var(--accent2)" />
          <circle cx="62" cy="76" r="4.5" fill="var(--text)" />
          <circle cx="90" cy="76" r="4.5" fill="var(--text)" />
          <path d="M67 88q8 8 16 0" fill="none" stroke="var(--text)" strokeWidth={3} strokeLinecap="round" />
        </svg>
      </div>

      <div className="td-link">
        <svg width="26" height="54" viewBox="0 0 26 54" fill="none" style={{ flex: "none" }}>
          <path d="M13 2v40" stroke="var(--accent2)" strokeWidth="1.8" strokeDasharray="4 5" strokeLinecap="round" />
          <path d="M6 38l7 10 7-10" stroke="var(--accent2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="icon-badge icon-glow" style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--tint)", color: "var(--accent2)" }}>
          <SparkleIcon size={18} />
        </span>
        <span style={{ fontFamily: NOTE_FONT, fontStyle: "italic", fontSize: 20, color: "var(--accent2)" }}>To this.</span>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--card)", boxShadow: "var(--shadow), var(--glow-teal)", padding: "20px 22px 18px" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span className="icon-badge" style={{ width: 28, height: 28, borderRadius: 8, background: "var(--tint)", color: "var(--accent2)" }}>
                <HeadphonesIcon size={15} />
              </span>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>The Daily Insight</div>
                <div style={{ fontSize: 10.5, color: "var(--text3)" }}>Edition 128 · Nov 12, 2024</div>
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, lineHeight: 1.2 }}>The future of work in a changing world</div>
          </div>
          <div style={{ width: 84, height: 66, borderRadius: 10, background: "var(--tint)", color: "var(--accent2)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <ImageGlyph size={32} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <span style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--btn)", color: "var(--btn-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flex: "none", boxShadow: "0 0 0 6px color-mix(in srgb, var(--accent2) 18%, transparent)" }}>▶</span>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 2, height: 32 }}>
            {bars.map((h, i) => (
              <span key={i} className="td-bar" style={{ flex: 1, height: `${h}%`, borderRadius: 1, background: "var(--accent2)", opacity: i < 8 ? 1 : 0.5, animationDelay: `${(i % 9) * 0.12}s` }} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "var(--text3)", margin: "0 0 14px 54px" }}>
          <span>00:00</span>
          <span>01:32</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Concise", "Natural voice", "Real insights"].map((c) => (
            <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "var(--accent2)", background: "var(--tint)", borderRadius: 999, padding: "5px 11px" }}>
              <CheckCircleIcon size={12} /> {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface Props {
  url: string;
  setUrl: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  onVerify: (token: string) => void;
  error: string | null;
  onGenerate: () => void;
}

export function TryDemoLanding({ url, setUrl, email, setEmail, onVerify, error, onGenerate }: Props) {
  const formRef = useRef<HTMLDivElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  function focusForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => urlInputRef.current?.focus(), 400);
  }

  const fieldStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: "13px 16px",
    background: "var(--bg)",
  };
  const inputStyle: React.CSSProperties = { flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 16, color: "var(--text)", minWidth: 0 };

  return (
    <>
      <section className="td-section">
        <div aria-hidden="true" style={{ position: "absolute", right: 0, top: 20, width: "min(620px, 100%)", height: 520, background: "radial-gradient(closest-side, color-mix(in srgb, var(--accent2) 16%, transparent), transparent)", pointerEvents: "none" }} />
        <div className="td-hero-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 14px", marginBottom: 24 }}>
              <HeadphonesIcon size={13} />
              Listen to any newsletter
            </div>
            <h1 className="td-h1" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.03em", margin: "0 0 18px" }}>
              Your newsletter deserves to be <span style={{ color: "var(--accent2)" }}>heard.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--text2)", margin: "0 0 28px", maxWidth: "28em" }}>
              Paste a link to your newsletter and get a personalised audio brief in under a minute. No signup. No
              credit card.
            </p>

            <div className="td-features">
              {FEATURES.map(([icon, title, sub]) => (
                <div key={title} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="icon-badge icon-glow" style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--tint)", color: "var(--accent2)" }}>
                    {icon}
                  </span>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14 }}>{title}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text3)" }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div ref={formRef} className="td-form" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 18, boxShadow: "var(--shadow)" }}>
              <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, marginBottom: 9 }}>Paste your newsletter link</label>
              <div style={{ ...fieldStyle, marginBottom: 14 }}>
                <span style={{ color: "var(--text3)", display: "flex" }}><LinkIcon size={17} /></span>
                <input
                  ref={urlInputRef}
                  type="url"
                  inputMode="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yournewsletter.com/edition/128"
                  style={inputStyle}
                />
              </div>
              <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, marginBottom: 9 }}>Your email</label>
              <div style={{ ...fieldStyle, marginBottom: 16 }}>
                <span style={{ color: "var(--text3)", display: "flex" }}><MailIcon size={17} /></span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourpublication.com"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: 16, maxWidth: "100%", overflow: "hidden" }}>
                <Turnstile onVerify={onVerify} />
              </div>

              {error && <div style={{ color: "#e06565", fontSize: 14, marginBottom: 14 }}>{error}</div>}

              <button
                onClick={onGenerate}
                className="btn-pop"
                style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16.5, fontWeight: 500, padding: "15px 26px", border: "none", borderRadius: 12, cursor: "pointer" }}
              >
                Generate My Audio Brief <span style={{ opacity: 0.75 }}>→</span>
              </button>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 16, fontSize: 13, color: "var(--text3)" }}>
                <a href="#how-it-works" style={{ color: "var(--accent2)", flex: "none" }}>See how it works →</a>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "var(--accent2)", display: "flex" }}><LockIcon size={14} /></span>
                  Your link is safe with us.
                </span>
              </div>
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "8px 20px 48px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 20 }}>
          Works with newsletters from
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {BRAND_STRIP.map(({ name, glyph, color }) => (
            <span
              key={name}
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color, border: "1px solid rgba(0,0,0,.08)", borderRadius: 12, padding: "10px 18px", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, boxShadow: "0 4px 14px rgba(0,0,0,.12)" }}
            >
              {glyph && (
                <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={BRAND_PATHS[glyph]} />
                </svg>
              )}
              {name}
            </span>
          ))}
          <span style={{ fontSize: 14, color: "var(--text3)", padding: "0 6px" }}>and many more</span>
        </div>
      </section>

      <section id="how-it-works" style={{ width: "100%", background: "var(--tint)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div className="td-how-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 40px" }}>
          <Reveal>
            <div style={{ display: "inline-flex", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "6px 13px", marginBottom: 16 }}>
              How it works
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 32, lineHeight: 1.15, letterSpacing: "-.02em", margin: 0 }}>
              Your audio brief
              <br />
              in <span style={{ color: "var(--accent2)" }}>3 simple steps.</span>
            </h2>
          </Reveal>
          <div className="td-steps">
            {STEPS.flatMap(([icon, title, body], i) => {
              const card = (
                <Reveal key={title} delay={i * 90} style={{ height: "100%" }}>
                  <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "18px 18px 20px", height: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <span style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--tint)", color: "var(--accent2)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {i + 1}
                      </span>
                      <span className="icon-badge icon-glow" style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--tint)", color: "var(--accent2)" }}>
                        {icon}
                      </span>
                    </div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15.5, marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 13, color: "var(--text3)" }}>{body}</div>
                  </div>
                </Reveal>
              );
              return i < STEPS.length - 1
                ? [card, <span key={`a${i}`} className="td-steps-arrow" style={{ color: "var(--accent2)", fontSize: 20, alignSelf: "center" }}>→</span>]
                : [card];
            })}
          </div>
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "64px 20px 8px" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 28 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 5vw, 36px)", letterSpacing: "-.02em", margin: 0 }}>
                Loved by newsletter <span style={{ color: "var(--accent2)" }}>creators.</span>
              </h2>
              <p style={{ fontSize: 13.5, color: "var(--text3)", margin: 0, maxWidth: 300 }}>
                Newsletters, blogs, and publications use Cirro Brief to reach more people, in more places.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80} style={{ height: "100%" }}>
                <figure className="hover-pop" style={{ margin: 0, height: "100%", border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 22px 20px", display: "flex", flexDirection: "column", gap: 18 }}>
                  <span style={{ fontFamily: NOTE_FONT, fontSize: 38, lineHeight: 0.6, color: "var(--accent2)" }}>&ldquo;</span>
                  <blockquote style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--text)", flex: 1 }}>{t.quote}</blockquote>
                  <figcaption style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--tint)", color: "var(--accent2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, flex: "none" }}>
                      {t.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </span>
                    <span>
                      <span style={{ display: "block", fontSize: 14, fontWeight: 600 }}>{t.name}</span>
                      <span style={{ display: "block", fontSize: 12.5, color: "var(--text3)" }}>{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "64px 20px 80px" }}>
        <Reveal>
          <div className="td-band" style={{ position: "relative", overflow: "hidden", border: "1px solid var(--border)", borderRadius: 24, background: "var(--band)", color: "#fff" }}>
            <div aria-hidden="true" className="td-band-note" style={{ display: "flex", alignItems: "center", gap: 14, color: "rgba(255,255,255,.8)" }}>
              <span style={{ fontFamily: NOTE_FONT, fontStyle: "italic", fontSize: 17, lineHeight: 1.35, maxWidth: 170 }}>Good ideas travel further when people can listen.</span>
              <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M7 17a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.6A4.5 4.5 0 0 1 17 17H7z" /></svg>
            </div>
            <div style={{ fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", opacity: 0.7, marginBottom: 12 }}>Hear the difference</div>
            <h2 className="td-band-title" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(30px, 6vw, 44px)", lineHeight: 1.1, letterSpacing: "-.03em", margin: "0 0 12px" }}>
              Try your newsletter now.
            </h2>
            <p style={{ fontSize: 17, opacity: 0.85, margin: "0 0 26px", maxWidth: "30em" }}>
              Turn your latest edition into an audio experience, free, fast and easy.
            </p>
            <div className="td-band-input" style={{ background: "var(--card)", borderRadius: 14, overflow: "hidden", color: "var(--text)", marginBottom: 20 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", minWidth: 0 }}>
                <span style={{ color: "var(--text3)", display: "flex" }}><LinkIcon size={17} /></span>
                <input
                  type="url"
                  inputMode="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yournewsletter.com/edition/128"
                  style={{ ...inputStyle, padding: "16px 0" }}
                />
              </div>
              <button
                onClick={focusForm}
                className="btn-pop"
                style={{ background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 15.5, fontWeight: 500, padding: "0 26px", cursor: "pointer", whiteSpace: "nowrap" }}
              >
                Generate My Audio Brief →
              </button>
            </div>
            <div style={{ display: "flex", gap: "10px 22px", flexWrap: "wrap", fontSize: 13.5 }}>
              {["No signup required", "No credit card", "Works with any public newsletter"].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                  <span style={{ color: "#7fd3ad", display: "flex" }}><CheckCircleIcon size={16} /></span>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
