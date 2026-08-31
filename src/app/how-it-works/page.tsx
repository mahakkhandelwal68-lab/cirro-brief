import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const STYLES = ["Direct", "Conversational", "Analytical", "Engaging"];
const REVIEW_POINTS = ["View the script before audio generation", "Choose from available script variations", "Make edits where needed", "Continue when you're ready"];
const PRONUNCIATIONS = [
  ["Mahak", "Ma-hek"],
  ["LumeLush", "Loom-lush"],
  ["Cirro", "Seer-oh"],
];
const BRIEF_OUTPUTS: [string, string, string][] = [
  ["🎧", "Audio Briefing", "a listenable version built around your newsletter"],
  ["📝", "Brief Content", "the adapted script and content created for the briefing"],
  ["✨", "Ready-to-use assets", "content designed to help you share and use your briefing more easily"],
];
const GEN_STEPS: [string, "done" | "active" | "idle"][] = [
  ["Newsletter processed", "done"],
  ["Brief prepared", "done"],
  ["Voice selected", "done"],
  ["Generating audio", "active"],
  ["Preparing your assets", "idle"],
];
const WORKSPACE_ITEMS = ["🎧 Audio briefing", "📝 Brief / script", "✨ Ready-to-use content assets", "Publication preferences", "Voice preferences", "Pronunciation preferences", "Previous editions"];
const SITUATIONS = ["Audio file (MP3)", "Written script / brief text", "Social post / caption", "Show notes / episode description", "Timestamped transcript", "Embeddable audio player", "Cover art / thumbnail", "Email-ready summary blurb"];
const FLOW = ["Add newsletter", "Choose preferences", "Optional review", "Pronunciation", "Generate", "Access your brief"];

function StepLabel({ n }: { n: string }) {
  return <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12.5, color: "var(--accent2)" }}>{n}</span>;
}

export default function HowItWorksPage() {
  return (
    <>
      <Header />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "76px 40px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 14px", marginBottom: 26 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent2)", display: "inline-block" }} />
          How it works
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 48, lineHeight: 1.1, letterSpacing: "-.03em", margin: "0 auto 18px", maxWidth: "30em" }}>
          Turn one newsletter into a complete audio and content experience.
        </h1>
        <p style={{ fontSize: 17.5, color: "var(--text2)", margin: "0 auto 30px", maxWidth: "36em" }}>
          Cirro Brief transforms your newsletter into an audio briefing and a set of ready-to-use assets—helping you
          share the same edition in more ways.
        </p>
        <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}>
          Try It With Your Newsletter <span style={{ opacity: 0.75 }}>→</span>
        </Link>
      </section>

      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, letterSpacing: "-.02em", margin: "0 0 30px" }}>
            Your newsletter. Your preferences. Your audio.
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flexWrap: "wrap", marginBottom: 24 }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "18px 26px", fontSize: 14, fontWeight: 500 }}>📰 Your newsletter</div>
            <span style={{ color: "var(--accent2)", fontSize: 20 }}>→</span>
            <div style={{ border: "1px solid var(--accent2)", borderRadius: 14, background: "var(--tint)", padding: "18px 26px", fontSize: 14, fontWeight: 500, color: "var(--accent2)" }}>Cirro Brief</div>
            <span style={{ color: "var(--accent2)", fontSize: 20 }}>→</span>
            <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "18px 26px", fontSize: 14, fontWeight: 500 }}>🎧 Your audio experience</div>
          </div>
          <p style={{ fontSize: 15.5, color: "var(--text2)", margin: "0 auto", maxWidth: "34em" }}>
            The process starts with content you&apos;ve already created. Cirro Brief helps transform it for
            listening, while giving you control over the parts that matter to you.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <StepLabel n="01" />
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, letterSpacing: "-.02em", margin: "8px 0 12px" }}>
            Start with an edition you&apos;ve already published.
          </h3>
          <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 8px" }}>Add the link to your newsletter.</p>
          <p style={{ fontSize: 16, color: "var(--text2)", margin: 0 }}>Cirro Brief uses your submitted content to begin creating your audio briefing.</p>
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px", boxShadow: "var(--shadow)" }}>
          <label style={{ display: "block", fontSize: 12.5, fontWeight: 500, color: "var(--text2)", marginBottom: 9 }}>Paste your newsletter link</label>
          <div style={{ display: "flex", alignItems: "center", gap: 9, border: "1px solid var(--border)", borderRadius: 11, padding: "13px 15px", background: "var(--bg)", color: "var(--text3)", fontSize: 15 }}>
            ⛓ https://yournewsletter.com/...
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px", boxShadow: "var(--shadow)", display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text2)", marginBottom: 8 }}>Briefing style</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {STYLES.map((s, i) => (
                <span
                  key={s}
                  style={{
                    fontSize: 12.8,
                    padding: "7px 13px",
                    borderRadius: 999,
                    border: `1px solid ${i === 1 ? "var(--accent2)" : "var(--border)"}`,
                    background: i === 1 ? "var(--accent)" : "transparent",
                    color: i === 1 ? "#fff" : "var(--text2)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div style={{ height: 1, background: "var(--border2)" }} />
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text2)", marginBottom: 8 }}>Voice</div>
            <div style={{ display: "flex", alignItems: "center", gap: 11, border: "1px solid var(--border2)", borderRadius: 10, padding: "10px 13px" }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "var(--accent)" }}>▶</span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Emma <span style={{ color: "var(--text3)", fontWeight: 400 }}>· Warm · British</span></span>
            </div>
          </div>
        </div>
        <div>
          <StepLabel n="02" />
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, letterSpacing: "-.02em", margin: "8px 0 12px" }}>
            Make it sound right for your publication.
          </h3>
          <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 12px" }}>
            Before your complete briefing is created, choose your briefing style and a voice that fits—or a custom
            voice on eligible plans.
          </p>
          <p style={{ fontSize: 14.5, color: "var(--text3)", margin: 0 }}>
            You don&apos;t have to start from scratch every time. With recurring plans, your preferences can be kept
            ready for future editions.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <StepLabel n="03" />
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, letterSpacing: "-.02em", margin: "8px 0 12px" }}>
            Want to see the script first? You can.
          </h3>
          <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 14px" }}>
            Some editions may need more attention. Others may be ready to move forward automatically—Cirro Brief
            gives you the choice.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
            {REVIEW_POINTS.map((r) => (
              <div key={r} style={{ display: "flex", gap: 9, fontSize: 15, color: "var(--text)" }}>
                <span style={{ color: "var(--accent2)" }}>✓</span>
                {r}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14.5, color: "var(--text3)", margin: 0 }}>Prefer a faster workflow? Skip the review and continue directly to audio generation.</p>
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "26px 24px", boxShadow: "var(--shadow)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text2)" }}>Your brief</span>
          <span style={{ color: "var(--text3)" }}>↓</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%" }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, background: "var(--tint)", padding: "16px 14px", textAlign: "center", fontSize: 13.5, fontWeight: 500, color: "var(--accent2)" }}>Review &amp; Edit</div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg2)", padding: "16px 14px", textAlign: "center", fontSize: 13.5, fontWeight: 500, color: "var(--text)" }}>Continue</div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px", boxShadow: "var(--shadow)" }}>
          <div style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 12 }}>Pronunciation</div>
          {PRONUNCIATIONS.map(([word, say]) => (
            <div key={word} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border2)", fontSize: 15 }}>
              <span style={{ fontWeight: 500 }}>{word}</span>
              <span style={{ color: "var(--accent2)", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 13.5 }}>{say}</span>
            </div>
          ))}
        </div>
        <div>
          <StepLabel n="04" />
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, letterSpacing: "-.02em", margin: "8px 0 12px" }}>
            Some words deserve special attention.
          </h3>
          <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 12px" }}>
            Add pronunciation guidance for brand names, people&apos;s names, industry terminology, or other special
            words or phrases.
          </p>
          <p style={{ fontSize: 14.5, color: "var(--text3)", margin: 0 }}>For recurring customers, these preferences can be saved for future use.</p>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 40px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <StepLabel n="05" />
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, letterSpacing: "-.02em", margin: "8px 0 12px" }}>
            Generate your complete Brief.
          </h3>
          <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 12px" }}>
            Once your preferences are ready, Cirro Brief transforms your newsletter into more than a single audio
            file—your complete Brief includes:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 12 }}>
            {BRIEF_OUTPUTS.map(([icon, title, body]) => (
              <div key={title} style={{ display: "flex", gap: 10, fontSize: 15, color: "var(--text)" }}>
                <span style={{ flex: "none" }}>{icon}</span>
                <span>
                  <b style={{ fontWeight: 600 }}>{title}</b> — {body}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14.5, color: "var(--text3)", margin: 0 }}>
            Your experience is designed to feel simple from your side—even when multiple steps are happening behind
            the scenes.
          </p>
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px", boxShadow: "var(--shadow)" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Creating your brief</div>
          {GEN_STEPS.map(([label, kind]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", fontSize: 14.5, color: kind === "idle" ? "var(--text3)" : "var(--text)" }}>
              <span
                style={{
                  flex: "none",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: `1.5px solid ${kind === "idle" ? "var(--border)" : "var(--accent)"}`,
                  background: kind === "done" ? "var(--accent)" : kind === "active" ? "var(--accent2)" : "transparent",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                  animation: kind === "active" ? "cbPulse 1.4s ease-in-out infinite" : "none",
                }}
              >
                {kind === "done" ? "✓" : ""}
              </span>
              {label}
            </div>
          ))}
          <div style={{ height: 1, background: "var(--border2)", margin: "12px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text3)" }}>
            <span>Your newsletter</span>
            <span>↓</span>
            <span style={{ color: "var(--accent2)", fontWeight: 500 }}>Cirro Brief</span>
            <span>↓</span>
            <div style={{ display: "flex", gap: 16 }}>
              <span>🎧 Audio</span>
              <span>📝 Script</span>
              <span>✨ Assets</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <StepLabel n="06" />
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, letterSpacing: "-.02em", margin: "8px 0 12px" }}>
              Everything is ready in one place.
            </h3>
            <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 14px" }}>
              Your workspace isn&apos;t simply an audio library—it&apos;s your library of complete Cirro Brief
              editions. For every completed edition, you can access:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {WORKSPACE_ITEMS.map((w) => (
                <div key={w} style={{ display: "flex", gap: 9, fontSize: 15, color: "var(--text)" }}>
                  <span style={{ color: "var(--accent2)" }}>✓</span>
                  {w}
                </div>
              ))}
            </div>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px", boxShadow: "var(--shadow)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Welcome back — your recent briefs</div>
            {["Weekly Edition #42", "Market Update"].map((name) => (
              <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border2)" }}>
                <span style={{ fontSize: 14.5, fontWeight: 500 }}>📰 {name}</span>
                <span style={{ fontSize: 12, color: "var(--accent2)" }}>🎧 📝 ✨ Ready</span>
              </div>
            ))}
            <div style={{ marginTop: 14, textAlign: "center", border: "1px solid var(--border)", borderRadius: 10, padding: 11, fontSize: 13.5, fontWeight: 500, color: "var(--accent2)" }}>+ Create New Brief</div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 56px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 32, lineHeight: 1.1, letterSpacing: "-.025em", margin: "0 auto 14px", maxWidth: "26em" }}>
          One edition. More ways to share it.
        </h2>
        <p style={{ fontSize: 16.5, color: "var(--text2)", margin: "0 auto 32px", maxWidth: "34em" }}>
          Your newsletter starts as written content. Cirro Brief helps you turn that edition into multiple assets
          your audience can use—engaging with your content whenever reading isn&apos;t convenient.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
          <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "16px 22px", fontSize: 14, fontWeight: 500 }}>📰 The original newsletter</div>
          <span style={{ color: "var(--accent2)" }}>↓</span>
          <div style={{ border: "1px solid var(--accent2)", borderRadius: 14, background: "var(--tint)", padding: "16px 22px", fontSize: 14, fontWeight: 500, color: "var(--accent2)" }}>🎧 An audio briefing</div>
          <span style={{ color: "var(--accent2)" }}>↓</span>
          <div style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "16px 22px", fontSize: 14, fontWeight: 500 }}>✨ Ready-to-use assets</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, maxWidth: 960, margin: "0 auto" }}>
          {SITUATIONS.map((s) => (
            <div key={s} style={{ border: "1px solid var(--border2)", borderRadius: 14, background: "var(--tint)", padding: "16px 14px", fontSize: 13.5, color: "var(--text2)" }}>
              {s}
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--band)", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 40px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 32, lineHeight: 1.1, letterSpacing: "-.025em", margin: "0 0 8px", textAlign: "center" }}>
            From one link to a finished experience.
          </h2>
          <p style={{ fontSize: 15.5, opacity: 0.85, margin: "0 0 40px", textAlign: "center" }}>You decide how much control you want for each edition.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 0 }}>
            {FLOW.map((label, i) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10, padding: "0 8px" }}>
                <span style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.34)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 13.5, fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 40px 96px" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--tint)", padding: "56px 56px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 36, lineHeight: 1.1, letterSpacing: "-.03em", margin: 0, maxWidth: "24em" }}>
            Ready to hear what your newsletter could sound like?
          </h2>
          <p style={{ fontSize: 16.5, color: "var(--text2)", margin: 0, maxWidth: "28em" }}>Try Cirro Brief with one of your own newsletter editions.</p>
          <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12, marginTop: 4 }}>
            Try the Demo <span style={{ opacity: 0.75 }}>→</span>
          </Link>
          <p style={{ fontSize: 13, color: "var(--text3)", margin: 0 }}>No signup required to try it.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
