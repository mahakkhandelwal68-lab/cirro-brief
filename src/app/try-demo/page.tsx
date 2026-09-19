"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TryDemoLanding } from "@/components/TryDemoLanding";
import { MountainImage } from "@/components/SampleContent";

type Step = "input" | "generating" | "result";

const GEN_STEPS = ["Newsletter received", "Creating your brief", "Preparing your audio", "Almost ready"];

function useWaveformBars(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        h: 24 + Math.round(62 * Math.abs(Math.sin(i * 0.66) * Math.cos(i * 0.21))) + "%",
        d: (-(i % 11) * 0.11).toFixed(2) + "s",
      })),
    [count]
  );
}

export default function TryDemoPage() {
  const [step, setStep] = useState<Step>("input");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [genStepIndex, setGenStepIndex] = useState(0);

  const [result, setResult] = useState<{ leadId: string; title: string; audioUrl: string } | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [unlocking, setUnlocking] = useState(false);

  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const bars = useWaveformBars(52);

  async function handleGenerate() {
    setError(null);
    if (!url.trim() || !email.trim()) {
      setError("Please enter both a newsletter URL and your email.");
      return;
    }
    if (!turnstileToken) {
      setError("Please complete the verification check.");
      return;
    }

    setStep("generating");
    let stepTimer = setInterval(() => setGenStepIndex((i) => Math.min(i + 1, GEN_STEPS.length - 1)), 1400);

    try {
      const res = await fetch("/api/demo/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, email, turnstileToken }),
      });
      const data = await res.json();

      if (!res.ok) {
        clearInterval(stepTimer);
        setError(data.error || "Something went wrong. Please try again.");
        setStep("input");
        return;
      }

      const audioUrl = `data:${data.mimeType};base64,${data.audioBase64}`;
      clearInterval(stepTimer);
      setResult({ leadId: data.leadId, title: data.title, audioUrl });
      setStep("result");
    } catch {
      clearInterval(stepTimer);
      setError("Network error. Please check your connection and try again.");
      setStep("input");
    }
  }

  async function handleUnlock() {
    setPhoneError(null);
    if (!result) return;
    setUnlocking(true);
    try {
      const res = await fetch("/api/demo/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: result.leadId, phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPhoneError(data.error || "Please enter a valid phone number.");
        setUnlocking(false);
        return;
      }
      setUnlocked(true);
    } catch {
      setPhoneError("Network error. Please try again.");
    } finally {
      setUnlocking(false);
    }
  }

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying((p) => !p);
  }

  return (
    <>
      <Header ctaLabel="View Pricing" ctaHref="/pricing" />

      {step === "input" && (
        <TryDemoLanding
          url={url}
          setUrl={setUrl}
          email={email}
          setEmail={setEmail}
          onVerify={setTurnstileToken}
          error={error}
          onGenerate={handleGenerate}
        />
      )}

      {step === "generating" && (
        <section style={{ width: "100%", maxWidth: 760, margin: "0 auto", padding: "72px 20px 96px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ position: "relative", width: 82, height: 82, marginBottom: 32 }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid var(--border2)" }} />
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid transparent",
                borderTopColor: "var(--accent)",
                animation: "cbSpin 1.1s linear infinite",
              }}
            />
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(30px, 6.5vw, 44px)", letterSpacing: "-.03em", margin: "0 0 14px" }}>
            Creating your audio brief
          </h1>
          <p style={{ fontSize: 18, color: "var(--text2)", margin: "0 0 44px", maxWidth: "28em" }}>
            We&apos;re turning your newsletter into a concise briefing and preparing the audio.
          </p>
          <div style={{ width: "100%", maxWidth: 460, border: "1px solid var(--border)", borderRadius: 18, background: "var(--card)", boxShadow: "var(--shadow)", padding: "10px 0", textAlign: "left" }}>
            {GEN_STEPS.map((label, i) => {
              const done = i < genStepIndex;
              const active = i === genStepIndex;
              return (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 24px", fontSize: 15.5, color: done || active ? "var(--text)" : "var(--text3)" }}>
                  <span
                    style={{
                      flex: "none",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: `1.5px solid ${done || active ? "var(--accent)" : "var(--border)"}`,
                      background: done ? "var(--accent)" : active ? "var(--accent2)" : "transparent",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 9,
                      animation: active ? "cbPulse 1.4s ease-in-out infinite" : "none",
                    }}
                  >
                    {done ? "✓" : ""}
                  </span>
                  {label}
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 13.5, color: "var(--text3)", margin: "20px 0 0" }}>
            This usually takes under a minute.
          </p>
        </section>
      )}

      {step === "result" && result && (
        <>
          <section
            className="td-result-grid"
            style={{
              width: "100%",
              maxWidth: 1200,
              margin: "0 auto",
              padding: "56px 20px 40px",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 11.5,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "var(--accent2)",
                  border: "1px solid var(--border)",
                  borderRadius: 999,
                  padding: "7px 14px",
                  marginBottom: 24,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent2)", display: "inline-block" }} />
                Your Cirro Brief is ready
              </div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(32px, 7vw, 52px)", letterSpacing: "-.03em", margin: "0 0 18px" }}>
                Here&apos;s your newsletter, ready to listen.
              </h1>
              <p style={{ fontSize: 18, color: "var(--text2)", margin: 0, maxWidth: "30em" }}>
                We created a concise audio briefing based on the newsletter you submitted.
              </p>
            </div>

            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 18, padding: "28px 30px", boxShadow: "var(--shadow)", position: "relative" }}>
              <audio ref={audioRef} src={result.audioUrl} onEnded={() => setPlaying(false)} style={{ display: "none" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 22, filter: unlocked ? "none" : "blur(4px)", pointerEvents: unlocked ? "auto" : "none" }}>
                <button
                  onClick={togglePlay}
                  style={{ width: 52, height: 52, flex: "none", border: "none", borderRadius: 15, background: "var(--btn)", color: "var(--btn-text)", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {playing ? "❚❚" : "▶"}
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {result.title}
                  </div>
                  <div style={{ fontSize: 12.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text3)" }}>Cirro Brief</div>
                </div>
                <div style={{ width: 84, flex: "none" }}>
                  <MountainImage crop="4/3" radius={10} sizes="84px" />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 52, marginBottom: 16, filter: unlocked ? "none" : "blur(4px)" }}>
                {bars.map((bar, i) => (
                  <span
                    key={i}
                    style={{
                      flex: 1,
                      borderRadius: 2,
                      background: "var(--accent2)",
                      height: bar.h,
                      transformOrigin: "center bottom",
                      animation: "cbWave 1.1s ease-in-out infinite",
                      animationDelay: bar.d,
                      animationPlayState: playing ? "running" : "paused",
                      opacity: 0.85,
                    }}
                  />
                ))}
              </div>

              {!unlocked && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    background: "color-mix(in srgb, var(--card) 88%, transparent)",
                    borderRadius: 18,
                    padding: "24px 28px",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>
                    Enter your phone number to listen
                  </span>
                  <span style={{ fontSize: 13.5, color: "var(--text2)", maxWidth: "26em" }}>
                    We&apos;ll use this to follow up about your custom briefing setup.
                  </span>
                  <div style={{ display: "flex", gap: 8, width: "100%", maxWidth: 320 }}>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 555 123 4567"
                      style={{ flex: 1, border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px", fontSize: 14, background: "var(--bg)", color: "var(--text)" }}
                    />
                  </div>
                  {phoneError && <span style={{ color: "#c0392b", fontSize: 13 }}>{phoneError}</span>}
                  <button
                    onClick={handleUnlock}
                    disabled={unlocking}
                    style={{
                      background: "var(--btn)",
                      color: "var(--btn-text)",
                      border: "none",
                      borderRadius: 10,
                      padding: "10px 20px",
                      fontSize: 14.5,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {unlocking ? "Unlocking..." : "Unlock My Briefing"}
                  </button>
                </div>
              )}
            </div>
          </section>

          <section style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "48px 20px 72px" }}>
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 20,
                background: "var(--tint)",
                padding: "44px clamp(20px, 5vw, 56px)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(28px, 6vw, 42px)", letterSpacing: "-.03em", margin: 0, maxWidth: "24em" }}>
                Want to create the complete version?
              </h2>
              <p style={{ fontSize: 17.5, color: "var(--text2)", margin: 0, maxWidth: "36em" }}>
                You just heard what {result.title} can sound like as an audio briefing. Now explore the complete
                Cirro Brief experience built around your publication.
              </p>
              <Link
                href={`/post-demo-offer?name=${encodeURIComponent(result.title)}&url=${encodeURIComponent(url)}`}
                className="btn-pop"
                style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16.5, fontWeight: 500, padding: "16px 28px", borderRadius: 12, marginTop: 8 }}
              >
                Continue with {result.title} <span style={{ opacity: 0.75 }}>→</span>
              </Link>
            </div>
          </section>
        </>
      )}

      <Footer />
    </>
  );
}
