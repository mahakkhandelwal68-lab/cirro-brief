import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeInteractive } from "@/components/HomeInteractive";
import { PricingTeaser } from "@/components/PricingTeaser";
import { Reveal } from "@/components/Reveal";
import {
  CarIcon, WalkIcon, LaptopIcon, DumbbellIcon, SparkleIcon, PlaneIcon,
  DocumentIcon, PencilIcon, MicIcon, WaveformIcon,
  HeadphonesIcon, MegaphoneIcon, StarIcon, BookmarkIcon, EyeIcon, GridIcon,
  CheckCircleIcon, ClockIcon, ArrowDownIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Your newsletter, ready to listen — Cirro Brief",
  description:
    "Turn every newsletter edition into a concise audio briefing—created in your preferred style and voice, plus ready-to-use publishing assets. Try the free demo on your own newsletter.",
};

const MOMENTS: [React.ReactNode, string, string][] = [
  [<CarIcon key="c" />, "Commuting", "Hands-free updates"],
  [<WalkIcon key="w" />, "Walking", "On the move"],
  [<LaptopIcon key="l" />, "Working", "Focus time"],
  [<DumbbellIcon key="d" />, "Exercising", "Headphones on"],
  [<SparkleIcon key="s" />, "Chores", "Everyday tasks"],
  [<PlaneIcon key="p" />, "Travelling", "Long hours"],
];

const STEPS: [string, React.ReactNode, string, string, string][] = [
  ["01", <DocumentIcon key="1" />, "var(--purple)", "Your content", "Submit your newsletter content or link."],
  ["02", <PencilIcon key="2" />, "var(--accent2)", "Your style", "Choose how you want the briefing to feel."],
  ["03", <MicIcon key="3" />, "var(--orange)", "Your voice", "Select a voice that fits your publication."],
  ["04", <WaveformIcon key="4" />, "var(--purple)", "Your audio + assets", "Receive your audio briefing and publishing assets."],
];

const ASSETS: [React.ReactNode, string, string][] = [
  [<HeadphonesIcon key="a" />, "Audio Briefing (MP3)", "High-quality audio, ready to listen."],
  [<MegaphoneIcon key="b" />, "Publishing Assets", "Promotional copy, social posts & more."],
  [<StarIcon key="c" />, "Brand Voice", "Consistent with your tone and identity."],
  [<BookmarkIcon key="d" />, "Saved Pronunciations", "Your terms, names and pronunciations saved."],
  [<EyeIcon key="e" />, "Preview Editions", "Review before publishing."],
  [<GridIcon key="f" />, "Delivery Dashboard", "Everything organized in one place."],
];

export default function HomePage() {
  return (
    <>
      <Header ctaLabel="Try Your Newsletter" />

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
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--purple)",
              background: "var(--purple-tint)",
              borderRadius: 999,
              padding: "7px 14px",
              marginBottom: 26,
            }}
          >
            ✦ AI-Powered Audio Briefings
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 54, lineHeight: 1.08, letterSpacing: "-.03em", margin: "0 0 22px" }}>
            Turn your newsletter into an <span className="gradient-text">audio experience.</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--text2)", margin: "0 0 34px", maxWidth: "30em" }}>
            Transform every edition into a concise audio briefing in your style and voice — with publishing assets
            that help you share, grow and engage your audience.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Link
              href="/try-demo"
              className="btn-pop"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}
            >
              Try Your Newsletter — It&apos;s Free <span style={{ opacity: 0.75 }}>→</span>
            </Link>
          </div>
          <div style={{ display: "flex", gap: 22, marginTop: 20, fontSize: 13.5, color: "var(--text3)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircleIcon size={15} /> No signup required
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <ClockIcon size={15} /> See your demo in seconds
            </span>
          </div>
        </Reveal>

        <Reveal delay={150} style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "stretch" }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "24px 26px", boxShadow: "var(--shadow)", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent2)" }}>Your newsletter · Edition 128</span>
                <span style={{ fontSize: 11, color: "var(--text3)" }}>1,042 words</span>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, letterSpacing: "-.01em", marginBottom: 14 }}>
                What the new funding round means for indie media
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {[100, 94, 88].map((w) => (
                  <div key={w} style={{ height: 8, borderRadius: 4, background: "var(--border2)", width: `${w}%` }} />
                ))}
              </div>
            </div>
            <div className="float-slow icon-badge" style={{ width: 60, height: 60, borderRadius: 14, background: "var(--tint)", color: "var(--accent2)" }}>
              <DocumentIcon size={26} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", color: "var(--text3)" }}>
            <ArrowDownIcon size={22} />
          </div>
          <HomeInteractive />
        </Reveal>
      </section>

      <section style={{ background: "var(--tint)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 18 }}>The problem</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 36, lineHeight: 1.1, letterSpacing: "-.025em", margin: "0 0 18px" }}>
              Your readers don&apos;t always have <span style={{ color: "var(--accent2)" }}>time to read.</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--text2)", margin: 0, maxWidth: "32em" }}>
              Your newsletter may contain valuable ideas, updates, analysis and stories. But not every subscriber
              experiences it the same way. Cirro Brief gives them another way to stay informed.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {MOMENTS.map(([icon, title, note], i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="hover-pop" style={{ background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 12, padding: "18px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div className="icon-badge" style={{ width: 34, height: 34, borderRadius: 10, background: "var(--tint)", color: "var(--accent2)" }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14.5, color: "var(--text)" }}>{title}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text2)" }}>{note}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 40px 72px" }}>
        <div style={{ textAlign: "center", maxWidth: "40em", margin: "0 auto 44px" }}>
          <div style={{ fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 16 }}>From newsletter to ready-to-share brief</div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 38, lineHeight: 1.08, letterSpacing: "-.025em", margin: 0 }}>4 simple steps.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {STEPS.map(([n, icon, color, title, body], i) => (
            <Reveal key={n} delay={i * 80}>
              <div className="hover-pop" style={{ border: "1px solid var(--border)", borderRadius: 16, padding: "26px 22px", background: "var(--card)", display: "flex", flexDirection: "column", gap: 12, minHeight: 190 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12.5, color, letterSpacing: ".04em" }}>{n}</span>
                  <div className="icon-badge" style={{ background: "var(--tint)", color }}>{icon}</div>
                </div>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, letterSpacing: "-.015em" }}>{title}</span>
                <span style={{ fontSize: 14.5, color: "var(--text2)" }}>{body}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--band)", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
          <div style={{ maxWidth: "36em", marginBottom: 40 }}>
            <div style={{ fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", opacity: 0.6, marginBottom: 16 }}>More than an audio file</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 36, lineHeight: 1.1, letterSpacing: "-.025em", margin: "0 0 16px" }}>
              A complete Brief, <span style={{ color: "var(--accent2)" }}>ready to use.</span>
            </h2>
            <p style={{ fontSize: 16, opacity: 0.9, margin: 0 }}>
              Every edition comes with audio, insights, and publishing assets — so you can publish, share and grow
              your audience effortlessly.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {ASSETS.map(([icon, label, note], i) => (
              <Reveal key={label} delay={i * 60}>
                <div className="hover-pop" style={{ border: "1px solid rgba(255,255,255,.18)", borderRadius: 14, padding: "20px 18px", background: "rgba(255,255,255,.06)", display: "flex", gap: 13, alignItems: "flex-start" }}>
                  <div className="icon-badge" style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 13, opacity: 0.75 }}>{note}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 40px 72px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 16 }}>Try it before you commit</div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 36, lineHeight: 1.08, letterSpacing: "-.025em", margin: "0 0 16px" }}>
            See your newsletter <span className="gradient-text">come to life.</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--text2)", margin: "0 0 30px", maxWidth: "32em" }}>
            Paste a newsletter link and experience how Cirro Brief transforms your written edition into an audio
            briefing.
          </p>
          <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}>
            Try Your Newsletter — It&apos;s Free <span style={{ opacity: 0.75 }}>→</span>
          </Link>
          <p style={{ fontSize: 13, color: "var(--text3)", margin: "14px 0 0" }}>No signup required · Free demo</p>
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--tint)", padding: "26px 28px" }}>
          <label style={{ display: "block", fontSize: 12.5, fontWeight: 500, color: "var(--text2)", marginBottom: 9 }}>Paste your newsletter link here</label>
          <div style={{ display: "flex", alignItems: "center", gap: 9, border: "1px solid var(--border)", borderRadius: 11, padding: "13px 15px", background: "var(--card)", color: "var(--text3)", fontSize: 15, marginBottom: 14 }}>
            https://yournewsletter.com/edition/128
          </div>
          <div className="btn-pop" style={{ width: "100%", textAlign: "center", background: "var(--btn)", color: "var(--btn-text)", fontSize: 15, fontWeight: 500, padding: "13px", borderRadius: 11 }}>
            ✦ Generate Demo
          </div>
        </div>
      </section>

      <PricingTeaser />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 40px 96px" }}>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 20,
            background: "var(--band)",
            color: "#fff",
            padding: "56px 56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24, flex: 1, minWidth: 280 }}>
            <div className="icon-badge" style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,.12)", color: "#fff" }}>
              <HeadphonesIcon size={26} />
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 30, lineHeight: 1.15, letterSpacing: "-.025em", margin: "0 0 8px" }}>
                Give every newsletter another way to be <span style={{ color: "var(--accent2)" }}>experienced.</span>
              </h2>
              <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>Audio that engages. Assets that grow. Effortless for you.</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: "var(--accent)", fontSize: 15.5, fontWeight: 500, padding: "14px 24px", borderRadius: 12 }}>
              Try Your Newsletter — It&apos;s Free <span style={{ opacity: 0.75 }}>→</span>
            </Link>
            <Link href="/pricing" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", background: "transparent", border: "1px solid rgba(255,255,255,.3)", color: "#fff", fontSize: 15.5, padding: "14px 24px", borderRadius: 12 }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
