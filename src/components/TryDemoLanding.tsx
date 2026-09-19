"use client";

import { useMemo, useRef } from "react";
import { Turnstile } from "./Turnstile";
import { Reveal } from "./Reveal";
import {
  LightningIcon,
  SparkleIcon,
  LockIcon,
  LinkIcon,
  HeadphonesIcon,
  CheckCircleIcon,
  MailIcon,
} from "./icons";

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

function HeroVisual() {
  const bars = useMemo(
    () => Array.from({ length: 44 }, (_, i) => 20 + Math.round(70 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)))),
    []
  );

  return (
    <div aria-hidden="true" style={{ position: "relative", width: "100%", maxWidth: 540, height: 470, margin: "0 auto" }}>
      <div style={{ position: "absolute", top: 0, left: 24, fontFamily: NOTE_FONT, fontStyle: "italic", fontSize: 19, color: "var(--accent2)" }}>
        From this...
      </div>
      <div style={{ position: "absolute", top: 4, left: 200, fontFamily: NOTE_FONT, fontStyle: "italic", fontSize: 21, color: "var(--accent2)" }}>
        To this.
      </div>
      <div style={{ position: "absolute", top: 0, right: 0, textAlign: "right", fontFamily: NOTE_FONT, fontStyle: "italic", fontSize: 14, color: "var(--accent2)", lineHeight: 1.35 }}>
        Same content.
        <br />
        A whole new way
        <br />
        to experience it.
      </div>

      <div
        style={{
          position: "absolute",
          top: 46,
          left: 8,
          width: 190,
          transform: "rotate(-4deg)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          background: "var(--card)",
          boxShadow: "var(--shadow)",
          padding: "14px 14px 18px",
        }}
      >
        <div style={{ fontSize: 9.5, color: "var(--text3)", marginBottom: 6 }}>The Daily Insight</div>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, lineHeight: 1.2, marginBottom: 10 }}>
          The future of work in a changing world
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
            {[100, 90, 96, 70, 84, 60].map((w, i) => (
              <div key={i} style={{ height: 4, width: `${w}%`, borderRadius: 2, background: "var(--border)" }} />
            ))}
          </div>
          <div style={{ width: 62, height: 48, borderRadius: 6, background: "var(--tint)", color: "var(--accent2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18l6-8 4 5 3-3 5 6z" />
              <circle cx="16.5" cy="7" r="1.6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="float-slow" style={{ position: "absolute", top: 34, right: 40, width: 150, height: 130 }}>
        <svg viewBox="0 0 150 130" width={150} height={130}>
          <path d="M30 100a26 26 0 0 1 2-51 34 34 0 0 1 64-6 28 28 0 0 1 22 57z" fill="var(--card)" stroke="var(--border)" strokeWidth={2} />
          <path d="M38 62a36 36 0 0 1 74 0" fill="none" stroke="var(--accent2)" strokeWidth={7} strokeLinecap="round" />
          <rect x="28" y="58" width="14" height="30" rx="6" fill="var(--accent2)" />
          <rect x="108" y="58" width="14" height="30" rx="6" fill="var(--accent2)" />
          <circle cx="62" cy="76" r="4.5" fill="var(--text)" />
          <circle cx="90" cy="76" r="4.5" fill="var(--text)" />
          <path d="M67 88q8 8 16 0" fill="none" stroke="var(--text)" strokeWidth={3} strokeLinecap="round" />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: 60,
          right: 0,
          bottom: 20,
          border: "1px solid var(--border)",
          borderRadius: 18,
          background: "var(--card)",
          boxShadow: "var(--shadow), var(--glow-teal)",
          padding: "20px 22px",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span className="icon-badge" style={{ width: 26, height: 26, borderRadius: 8, background: "var(--tint)", color: "var(--accent2)" }}>
                <HeadphonesIcon size={14} />
              </span>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>The Daily Insight</div>
                <div style={{ fontSize: 10.5, color: "var(--text3)" }}>Edition 128 · Nov 12, 2024</div>
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, lineHeight: 1.2 }}>
              The future of work in a changing world
            </div>
          </div>
          <div style={{ width: 92, height: 72, borderRadius: 10, background: "var(--tint)", color: "var(--accent2)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18l6-8 4 5 3-3 5 6z" />
              <circle cx="16.5" cy="7" r="1.6" />
            </svg>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <span style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--btn)", color: "var(--btn-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flex: "none" }}>
            ▶
          </span>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 2, height: 28 }}>
            {bars.map((h, i) => (
              <span key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 1, background: "var(--accent2)", opacity: i < 6 ? 1 : 0.55 }} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "var(--text3)", margin: "0 0 12px 52px" }}>
          <span>00:00</span>
          <span>01:32</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Concise", "Natural voice", "Real insights"].map((c) => (
            <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--accent2)", background: "var(--tint)", borderRadius: 999, padding: "5px 11px" }}>
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
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 40px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 14px", marginBottom: 24 }}>
              <HeadphonesIcon size={13} />
              Listen to any newsletter
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 54, lineHeight: 1.05, letterSpacing: "-.03em", margin: "0 0 18px" }}>
              Your newsletter
              <br />
              deserves to be <span style={{ color: "var(--accent2)" }}>heard.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--text2)", margin: "0 0 28px", maxWidth: "28em" }}>
              Paste a link to your newsletter and get a personalised audio brief in under a minute. No signup. No
              credit card.
            </p>

            <div style={{ display: "flex", gap: 26, flexWrap: "wrap", marginBottom: 30 }}>
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

            <div ref={formRef} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 18, padding: "24px 26px 22px", boxShadow: "var(--shadow)" }}>
              <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, marginBottom: 9 }}>Paste your newsletter link</label>
              <div style={{ ...fieldStyle, marginBottom: 14 }}>
                <span style={{ color: "var(--text3)", display: "flex" }}><LinkIcon size={17} /></span>
                <input
                  ref={urlInputRef}
                  type="url"
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

              <div style={{ marginBottom: 16 }}>
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

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginTop: 16, fontSize: 13, color: "var(--text3)" }}>
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

      <section id="how-it-works" style={{ background: "var(--tint)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 40px", display: "grid", gridTemplateColumns: "0.8fr 2fr", gap: 40, alignItems: "center" }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 14, alignItems: "center" }}>
            {STEPS.flatMap(([icon, title, body], i) => {
              const card = (
                <Reveal key={title} delay={i * 90}>
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
                    <div style={{ fontSize: 12.5, color: "var(--text3)" }}>{body}</div>
                  </div>
                </Reveal>
              );
              return i < STEPS.length - 1
                ? [card, <span key={`a${i}`} style={{ color: "var(--accent2)", fontSize: 20 }}>→</span>]
                : [card];
            })}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 40px 80px" }}>
        <Reveal>
          <div style={{ position: "relative", overflow: "hidden", border: "1px solid var(--border)", borderRadius: 24, background: "var(--band)", color: "#fff", padding: "48px 48px 40px" }}>
            <div style={{ position: "absolute", right: 48, top: 40, textAlign: "left", fontFamily: NOTE_FONT, fontStyle: "italic", fontSize: 17, lineHeight: 1.35, color: "rgba(255,255,255,.75)", maxWidth: 200 }}>
              Good ideas travel further when people can listen.
            </div>
            <div style={{ fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", opacity: 0.7, marginBottom: 12 }}>Hear the difference</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 44, lineHeight: 1.1, letterSpacing: "-.03em", margin: "0 0 12px" }}>
              Try your newsletter now.
            </h2>
            <p style={{ fontSize: 17, opacity: 0.85, margin: "0 0 26px", maxWidth: "30em" }}>
              Turn your latest edition into an audio experience, free, fast and easy.
            </p>
            <div style={{ display: "flex", gap: 0, maxWidth: 640, background: "var(--card)", borderRadius: 14, overflow: "hidden", color: "var(--text)", marginBottom: 20 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", minWidth: 0 }}>
                <span style={{ color: "var(--text3)", display: "flex" }}><LinkIcon size={17} /></span>
                <input
                  type="url"
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
            <div style={{ display: "flex", gap: 22, flexWrap: "wrap", fontSize: 13.5 }}>
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
