import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import {
  CarIcon,
  WalkIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  NewspaperIcon,
  TrendingUpIcon,
  BriefcaseIcon,
  SlidersIcon,
  BookmarkIcon,
  EyeIcon,
  GridIcon,
} from "@/components/icons";
import {
  AboutHeroGraphic,
  AudioBriefVisual,
  BriefSummaryVisual,
  ShareAssetsVisual,
  BlogEmbedVisual,
  QrShareVisual,
  BrandVoicePanel,
  PronunciationsPanel,
  PreviewEditionsPanel,
  DeliveryDashboardPanel,
} from "@/components/AboutVisuals";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cirro Brief turns every newsletter edition into a complete Brief: audio, summaries and everything organised for the way people consume content today.",
};

const REAL_MOMENTS: [React.ReactNode, string, string][] = [
  [<CarIcon key="a" size={22} />, "On a commute", "No time to sit and read"],
  [<WalkIcon key="b" size={22} />, "On a walk", "Listening is more convenient"],
  [<CalendarIcon key="c" size={22} />, "Between meetings", "Need information without distraction"],
  [<ClockIcon key="d" size={22} />, "Multitasking", "Want to learn without stopping what you do"],
];

const ASSET_CARDS: [string, string, React.ReactNode, string][] = [
  ["AUDIO BRIEF (MP3)", "var(--accent2)", <AudioBriefVisual key="a" />, "A complete audio experience built around your edition."],
  ["BRIEF SUMMARY", "var(--purple)", <BriefSummaryVisual key="b" />, "Key ideas from your edition in a quick, easy-to-revisit format."],
  ["READY-TO-SHARE ASSETS", "var(--orange)", <ShareAssetsVisual key="c" />, "Shareable posts, visuals and copy, ready to publish."],
  ["BLOG AUDIO EMBED", "var(--blue)", <BlogEmbedVisual key="d" />, "Embed audio in your blog so readers can listen without leaving your site."],
  ["QR CODE TO SHARE", "var(--accent2)", <QrShareVisual key="e" />, "A printable QR code that links directly to your audio Brief."],
];

const TOOL_PANELS: [React.ReactNode, string, string, string, React.ReactNode][] = [
  [<SlidersIcon key="a" size={18} />, "var(--accent2)", "Brand Voice", "Keep the voice aligned with your publication.", <BrandVoicePanel key="a2" />],
  [<BookmarkIcon key="b" size={18} />, "var(--purple)", "Saved Pronunciations", "Names, brands and terms remembered for you.", <PronunciationsPanel key="b2" />],
  [<EyeIcon key="c" size={18} />, "var(--orange)", "Preview Editions", "Review your Brief before it's published.", <PreviewEditionsPanel key="c2" />],
  [<GridIcon key="d" size={18} />, "var(--blue)", "Delivery Dashboard", "Everything from your editions in one place.", <DeliveryDashboardPanel key="d2" />],
];

const WHO_FOR: [React.ReactNode, string, string, string][] = [
  [<UserIcon key="a" size={22} />, "var(--accent2)", "Independent publishers", "Give subscribers another way to experience each edition."],
  [<NewspaperIcon key="b" size={22} />, "var(--purple)", "Media and publication teams", "Extend the reach of existing stories without creating from scratch."],
  [<TrendingUpIcon key="c" size={22} />, "var(--blue)", "Analysts and subject experts", "Make detailed ideas easier to consume when time is limited."],
  [<BriefcaseIcon key="d" size={22} />, "var(--orange)", "Businesses with regular content", "Add another format to updates, reports and insights you already share."],
];

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "72px 40px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 14px", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent2)", display: "inline-block" }} />
              About Cirro Brief
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 42, lineHeight: 1.15, letterSpacing: "-.02em", margin: "0 0 18px" }}>
              You create the ideas.
              <br />
              <span style={{ color: "var(--accent2)" }}>We help more people experience them.</span>
            </h1>
            <p style={{ fontSize: 16.5, color: "var(--text2)", margin: "0 0 28px", maxWidth: 440 }}>
              Cirro Brief turns every newsletter edition into a complete Brief: audio, summaries and everything
              organised for the way people consume content today.
            </p>
            <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--btn)", color: "var(--btn-text)", fontSize: 15, fontWeight: 500, padding: "13px 22px", borderRadius: 11, marginBottom: 12 }}>
              Try Your Newsletter <span style={{ opacity: 0.75 }}>→</span>
            </Link>
            <div style={{ fontSize: 13, color: "var(--text3)" }}>Start with one edition. No commitment required.</div>
          </Reveal>
          <Reveal delay={120}>
            <AboutHeroGraphic />
          </Reveal>
        </div>
      </section>

      {/* The problem */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "40px 40px" }}>
        <Reveal>
          <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--card)", boxShadow: "var(--shadow)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            <div style={{ padding: "40px 44px", borderRight: "1px solid var(--border2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <span className="icon-badge icon-glow" style={{ width: 44, height: 44, borderRadius: 12, background: "var(--tint)", color: "var(--accent2)" }}>
                  <ClockIcon size={22} />
                </span>
                <span style={{ fontSize: 11.5, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent2)", fontWeight: 600 }}>The Problem</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, lineHeight: 1.25, letterSpacing: "-.01em", margin: "0 0 16px" }}>
                Good content is often missed for a simple reason: timing.
              </h2>
              <p style={{ fontSize: 15, color: "var(--text2)", margin: "0 0 14px" }}>
                Your audience may want to read your newsletter. But wanting to read and having the right moment to
                read aren&apos;t always the same.
              </p>
              <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", margin: 0 }}>
                The problem isn&apos;t always interest.
                <br />
                Sometimes, the format simply doesn&apos;t fit the moment.
              </p>
            </div>
            <div style={{ padding: "40px 44px" }}>
              <div style={{ fontSize: 11.5, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text3)", fontWeight: 600, marginBottom: 22 }}>
                Real moments. Real distractions.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {REAL_MOMENTS.map(([icon, title, body]) => (
                  <div key={title} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8 }}>
                    <span className="icon-badge icon-glow" style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--tint)", color: "var(--accent2)" }}>
                      {icon}
                    </span>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14.5 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "var(--text3)" }}>{body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* One edition, more ways to experience it */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 40px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 32, lineHeight: 1.2, letterSpacing: "-.02em", margin: "0 0 10px" }}>
                One edition, More ways to <span style={{ color: "var(--accent2)" }}>experience</span> it.
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--text2)", margin: 0 }}>
                Your newsletter already contains something worth sharing.
                <br />
                Cirro Brief helps one edition become more useful to more people.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
            {ASSET_CARDS.map(([label, color, visual, caption], i) => (
              <Reveal key={label} delay={i * 70}>
                <div className="hover-pop" style={{ border: "1px solid var(--border)", borderTop: `2px solid ${color}`, borderRadius: 14, background: "var(--card)", padding: "18px 16px", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 10, letterSpacing: ".1em", fontWeight: 700, color, marginBottom: 14 }}>{label}</div>
                  <div style={{ flex: 1, marginBottom: 14 }}>{visual}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{caption}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Powerful tools */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.6fr", gap: 40, alignItems: "start" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, lineHeight: 1.2, letterSpacing: "-.02em", margin: "0 0 14px" }}>
              Powerful tools.
              <br />
              Always <span style={{ color: "var(--accent2)" }}>in your control.</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text2)", margin: 0 }}>
              We give you the tools to shape the experience, maintain quality and stay in control of your content.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {TOOL_PANELS.map(([icon, color, title, desc, panel], i) => (
              <Reveal key={title} delay={i * 70}>
                <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span className="icon-badge" style={{ width: 32, height: 32, borderRadius: 9, background: "var(--tint)", color }}>{icon}</span>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15.5 }}>{title}</div>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--text3)", marginBottom: 16 }}>{desc}</div>
                  {panel}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "72px 40px" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, lineHeight: 1.2, letterSpacing: "-.02em", margin: "0 0 40px", textAlign: "center" }}>
              For anyone already creating something worth <span style={{ color: "var(--accent2)" }}>experiencing</span>.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {WHO_FOR.map(([icon, color, title, body], i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="hover-pop" style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "24px 20px", height: "100%" }}>
                  <span className="icon-badge icon-glow" style={{ width: 40, height: 40, borderRadius: 11, background: "var(--tint)", color, marginBottom: 14 }}>{icon}</span>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15.5, marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "var(--text2)" }}>{body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial closing statement */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 40px" }}>
        <Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              alignItems: "center",
              border: "1px solid var(--border2)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                minHeight: 200,
                background: "var(--tint)",
                backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="icon-badge icon-glow" style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--card)", border: "1px solid var(--border)", color: "var(--accent2)" }}>
                <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.6A4.5 4.5 0 0 1 17 17H7z" />
                </svg>
              </span>
            </div>
            <div style={{ padding: "44px 48px" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, lineHeight: 1.3, letterSpacing: "-.01em", margin: "0 0 14px" }}>
                We&apos;re making it easier for <span style={{ color: "var(--accent2)" }}>good written content to travel further.</span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--text2)", margin: 0 }}>
                We don&apos;t believe every good idea needs to be turned into more content.
                <br />
                <span style={{ color: "var(--accent2)", fontWeight: 500 }}>Sometimes, it simply needs another way to be experienced.</span>
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section style={{ background: "var(--tint)", borderTop: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "56px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span className="icon-badge icon-glow" style={{ width: 46, height: 46, borderRadius: 13, background: "var(--card)", border: "1px solid var(--border)", color: "var(--accent2)" }}>
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12v0M7 8v8M11 4v16M15 8v8M19 12v0" />
                </svg>
              </span>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 21, marginBottom: 4 }}>
                  You&apos;ve already created the content.
                  <br />
                  <span style={{ color: "var(--accent2)" }}>Now see what else it can become.</span>
                </div>
                <div style={{ fontSize: 13.5, color: "var(--text3)" }}>Start with one edition. No commitment required.</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--btn)", color: "var(--btn-text)", fontSize: 15, fontWeight: 500, padding: "14px 24px", borderRadius: 11, whiteSpace: "nowrap" }}>
              Try Your Newsletter <span style={{ opacity: 0.75 }}>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
