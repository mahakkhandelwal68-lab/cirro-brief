import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeInteractive } from "@/components/HomeInteractive";
import { Reveal } from "@/components/Reveal";

const MOMENTS = [
  ["Commuting", "Hands and eyes busy."],
  ["Walking", "Outside, offline."],
  ["Working", "Second screen, no time."],
  ["Exercising", "Headphones already in."],
  ["Chores", "Everyday tasks."],
  ["Travelling", "Long, quiet hours."],
];

const STEPS = [
  ["01", "Your content", "Submit your newsletter content or link."],
  ["02", "Your style", "Choose how you want the briefing to feel."],
  ["03", "Your voice", "Select a voice that fits your publication."],
  ["04", "Your audio", "Receive a ready-to-use briefing and publishing assets."],
];

const ASSETS = ["Audio briefing (MP3)", "Previous editions", "Publishing assets", "Brand voice", "Saved pronunciations", "Delivery dashboard"];

const FULL_FEATURES = [
  "Briefing style selection",
  "Brand voice selection",
  "Optional script review",
  "Saved pronunciation preferences",
  "Complete delivery dashboard",
  "Additional publishing assets",
];

const PLANS = [
  { name: "One-Time", note: "For trying the complete experience with a single edition.", value: "Try once", primary: true },
  { name: "Monthly", note: "For publishers creating audio regularly.", value: "Best for regular publishing" },
  { name: "Annual", note: "For regular publishing with the best value.", value: "Best value" },
  { name: "Custom", note: "Need something built around your publication?", value: "Tailored to your needs" },
];

export default function HomePage() {
  return (
    <>
      <Header />

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "88px 40px 72px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 72,
          alignItems: "center",
        }}
      >
        <Reveal>
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
              marginBottom: 26,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent2)", display: "inline-block" }} />
            Turn your newsletter into audio
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 60, lineHeight: 1.04, letterSpacing: "-.03em", margin: "0 0 22px" }}>
            Your newsletter,
            <br />
            ready to listen.
          </h1>
          <p style={{ fontSize: 18.5, lineHeight: 1.6, color: "var(--text2)", margin: "0 0 34px", maxWidth: "30em" }}>
            Turn every edition into a concise, engaging audio briefing—created in your preferred style and voice,
            ready for your audience to listen.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Link
              href="/try-demo"
              className="btn-pop"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}
            >
              Try Your Newsletter <span style={{ opacity: 0.75 }}>→</span>
            </Link>
          </div>
          <p style={{ fontSize: 13.5, color: "var(--text3)", margin: "20px 0 0" }}>No signup required to try the demo.</p>
        </Reveal>

        <Reveal delay={150} style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "stretch" }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "24px 26px", boxShadow: "var(--shadow)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)" }}>Your newsletter · Edition 128</span>
              <span style={{ fontSize: 11, color: "var(--text3)" }}>1,840 words</span>
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, letterSpacing: "-.01em", marginBottom: 14 }}>
              What the new funding round means for indie media
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {[100, 94, 88, 60].map((w) => (
                <div key={w} style={{ height: 8, borderRadius: 4, background: "var(--border2)", width: `${w}%` }} />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <span style={{ height: 1, flex: 1, background: "var(--border2)" }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "6px 14px", background: "var(--tint)" }}>
              Cirro Brief ↓
            </span>
            <span style={{ height: 1, flex: 1, background: "var(--border2)" }} />
          </div>
          <div className="float-slow">
            <HomeInteractive />
          </div>
        </Reveal>
      </section>

      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 18 }}>The problem</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 38, lineHeight: 1.1, letterSpacing: "-.025em", margin: "0 0 18px" }}>
              Your readers don&apos;t always have time to read.
            </h2>
            <p style={{ fontSize: 17, color: "var(--text2)", margin: 0, maxWidth: "32em" }}>
              Your newsletter may contain valuable ideas, updates, analysis and stories. But not every subscriber
              experiences it the same way. Some prefer to read. Others would rather listen.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
            {MOMENTS.map(([title, note], i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="hover-pop" style={{ background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 12, padding: "18px 18px", fontSize: 15, color: "var(--text2)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15.5, color: "var(--text)", marginBottom: 4 }}>{title}</div>
                  {note}
                </div>
              </Reveal>
            ))}
            <div style={{ gridColumn: "span 2", fontSize: 14.5, color: "var(--text3)", padding: "4px 2px" }}>
              Cirro Brief gives your newsletter another way to be experienced.
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 40px 72px" }}>
        <div style={{ maxWidth: "44em", marginBottom: 44 }}>
          <div style={{ fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 16 }}>What Cirro Brief does</div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 42, lineHeight: 1.08, letterSpacing: "-.025em", margin: "0 0 16px" }}>
            From newsletter to audio briefing.
          </h2>
          <p style={{ fontSize: 17.5, color: "var(--text2)", margin: 0 }}>
            Submit your newsletter, choose how you want it to sound, and Cirro Brief turns it into an audio
            experience designed around your publication.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {STEPS.map(([n, title, body], i) => (
            <Reveal key={n} delay={i * 80}>
              <div className="hover-pop" style={{ border: "1px solid var(--border)", borderRadius: 16, padding: "26px 24px 28px", background: "var(--card)", display: "flex", flexDirection: "column", gap: 10, minHeight: 190 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12.5, color: "var(--accent2)", letterSpacing: ".04em" }}>{n}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, letterSpacing: "-.015em" }}>{title}</span>
                <span style={{ fontSize: 14.8, color: "var(--text2)" }}>{body}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--band)", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", opacity: 0.6, marginBottom: 16 }}>More than an audio file</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 38, lineHeight: 1.08, letterSpacing: "-.025em", margin: "0 0 16px" }}>
              Your briefing is prepared for use.
            </h2>
            <p style={{ fontSize: 17.5, opacity: 0.94, margin: 0, maxWidth: "32em" }}>
              Depending on your plan, a completed briefing arrives with assets that help you publish and share
              it—and your dashboard keeps every edition together.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {ASSETS.map((label, i) => (
              <Reveal key={label} delay={i * 60}>
                <div className="hover-pop" style={{ border: "1px solid rgba(255,255,255,.34)", borderRadius: 12, padding: "16px 17px", fontSize: 15, background: "rgba(255,255,255,.09)" }}>
                  {label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 40px 72px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 16 }}>Try it before you commit</div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 38, lineHeight: 1.08, letterSpacing: "-.025em", margin: "0 0 16px" }}>
            See what your newsletter sounds like.
          </h2>
          <p style={{ fontSize: 17.5, color: "var(--text2)", margin: "0 0 30px", maxWidth: "32em" }}>
            The demo lets you experience the basic transformation from newsletter to audio, using one of your own
            editions.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Link
              href="/try-demo"
              className="btn-pop"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}
            >
              Try Your Newsletter <span style={{ opacity: 0.75 }}>→</span>
            </Link>
            <span style={{ fontSize: 13.5, color: "var(--text3)" }}>No signup required.</span>
          </div>
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--tint)", padding: "26px 28px" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>The full experience includes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {FULL_FEATURES.map((f) => (
              <div key={f} style={{ display: "flex", gap: 11, fontSize: 15.5, color: "var(--text2)" }}>
                <span style={{ color: "var(--accent2)" }}>✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 38, lineHeight: 1.08, letterSpacing: "-.025em", margin: "0 0 34px" }}>
            Choose how you want to use Cirro Brief.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div
                  className="hover-pop"
                  style={{
                    background: "var(--card)",
                    border: `1px solid ${p.primary ? "var(--accent2)" : "var(--border)"}`,
                    borderRadius: 16,
                    padding: "26px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    minHeight: 230,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, letterSpacing: "-.015em" }}>{p.name}</span>
                  <span style={{ fontSize: 14.8, color: "var(--text2)", flex: 1 }}>{p.note}</span>
                  <span style={{ fontSize: 13, color: "var(--accent2)" }}>{p.value}</span>
                  <Link
                    href="/pricing"
                    className="btn-pop"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      fontSize: 14.5,
                      fontWeight: 500,
                      color: p.primary ? "var(--btn-text)" : "var(--text)",
                      background: p.primary ? "var(--btn)" : "transparent",
                      border: `1px solid ${p.primary ? "var(--accent2)" : "var(--border)"}`,
                      borderRadius: 10,
                      padding: "11px 15px",
                      justifyContent: "center",
                    }}
                  >
                    View Pricing <span style={{ opacity: 0.7 }}>→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 40px 96px" }}>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 20,
            background: "var(--tint)",
            padding: "64px 56px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 44, lineHeight: 1.06, letterSpacing: "-.03em", margin: 0, maxWidth: "22em" }}>
            Give your newsletter another way to be experienced.
          </h2>
          <p style={{ fontSize: 17.5, color: "var(--text2)", margin: 0, maxWidth: "34em" }}>
            Turn your written edition into an audio briefing your audience can listen to.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
            <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}>
              Try Your Newsletter <span style={{ opacity: 0.75 }}>→</span>
            </Link>
            <Link href="/pricing" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", background: "transparent", border: "1px solid var(--border)", color: "var(--text)", fontSize: 16, padding: "15px 26px", borderRadius: 12 }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
