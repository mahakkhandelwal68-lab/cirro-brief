import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { FlowHeroGraphic } from "@/components/FlowHeroGraphic";
import { StyleVoiceCard, GeneratingCard } from "@/components/FlowVisuals";
import {
  LinkIcon, SlidersIcon, BookmarkIcon, WaveformIcon, EyeIcon, ShareUpIcon,
  HeadphonesIcon, DocumentIcon, CheckCircleIcon,
  GlobeIcon, WhatsAppIcon, DotsIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Flow",
  description:
    "See how your newsletter becomes an audio experience and a set of ready-to-use publishing assets, step by step.",
};

function StepNumber({ n, isLast }: { n: string; isLast?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
      <span
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "2px solid var(--accent2)",
          color: "var(--text)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 15,
          flex: "none",
          background: "var(--card)",
        }}
      >
        {n}
      </span>
      {!isLast && <span style={{ width: 2, flex: 1, background: "var(--border)", marginTop: 6 }} />}
    </div>
  );
}

function Step({
  n,
  isLast,
  title,
  highlight,
  body,
  children,
}: {
  n: string;
  isLast?: boolean;
  title: string;
  highlight?: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 24, paddingBottom: isLast ? 0 : 40 }}>
      <StepNumber n={n} isLast={isLast} />
      <Reveal style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", paddingTop: 2 }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 24, letterSpacing: "-.02em", margin: "0 0 8px" }}>{title}</h3>
          {highlight && <div style={{ color: "var(--accent2)", fontWeight: 500, fontSize: 14.5, marginBottom: 8 }}>{highlight}</div>}
          <p style={{ fontSize: 15, color: "var(--text2)", margin: 0 }}>{body}</p>
        </div>
        <div>{children}</div>
      </Reveal>
    </div>
  );
}

const FLOW_STEPS: [string, React.ReactNode][] = [
  ["01", <LinkIcon key="1" size={18} />],
  ["02", <SlidersIcon key="2" size={18} />],
  ["03", <BookmarkIcon key="3" size={18} />],
  ["04", <WaveformIcon key="4" size={18} />],
  ["05", <EyeIcon key="5" size={18} />],
  ["06", <ShareUpIcon key="6" size={18} />],
];
const FLOW_LABELS = ["Add newsletter", "Choose preferences", "Add pronunciations", "Generate", "Review", "Publish & share"];

const BRIEF_INCLUDES: [React.ReactNode, string, string][] = [
  [<HeadphonesIcon key="a" size={18} />, "Audio Brief", "Listen anytime"],
  [<DocumentIcon key="b" size={18} />, "Ready-to-share assets", "Use across channels"],
  [<BookmarkIcon key="c" size={18} />, "Saved pronunciations", "Consistent every time"],
  [<EyeIcon key="d" size={18} />, "Preview editions", "Review before you publish"],
];

const SHARE_OPTIONS: [React.ReactNode, string][] = [
  [<HeadphonesIcon key="a" size={18} />, "Audio player"],
  [<DocumentIcon key="b" size={18} />, "Email"],
  [<LinkIcon key="c" size={18} />, "Share link"],
  [<GlobeIcon key="d" size={18} />, "Website"],
  [<WhatsAppIcon key="e" size={18} />, "WhatsApp"],
  [<DotsIcon key="f" size={18} />, "More"],
];

export default function FlowPage() {
  return (
    <>
      <Header ctaLabel="Try Your Newsletter" />

      <section style={{ background: "var(--band)", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 72px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <Reveal>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 44, lineHeight: 1.12, letterSpacing: "-.03em", margin: "0 0 18px" }}>
              From newsletter <br />to a <span style={{ color: "var(--accent2)" }}>complete Brief.</span>
            </h1>
            <p style={{ fontSize: 16.5, opacity: 0.85, margin: "0 0 28px", maxWidth: "30em" }}>
              See how your newsletter becomes an audio experience and a set of ready-to-use publishing assets.
            </p>
            <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}>
              Try Your Newsletter <span style={{ opacity: 0.75 }}>→</span>
            </Link>
            <p style={{ fontSize: 13, opacity: 0.6, margin: "14px 0 0" }}>No signup required · Free demo</p>
          </Reveal>
          <Reveal delay={150}>
            <FlowHeroGraphic />
          </Reveal>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "88px 40px" }}>
        <Step n="01" title="Start with an edition you've already published." highlight="And we'll take it from there." body="Paste the link to a newsletter edition you've already sent or published. Cirro Brief uses it as the starting point for your audio Brief.">
          <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px", boxShadow: "var(--shadow)" }}>
            <label style={{ display: "block", fontSize: 12.5, fontWeight: 500, color: "var(--text2)", marginBottom: 9 }}>Paste your newsletter link</label>
            <div style={{ display: "flex", alignItems: "center", gap: 9, border: "1px solid var(--border)", borderRadius: 11, padding: "12px 14px", marginBottom: 14 }}>
              <LinkIcon size={15} />
              <span style={{ color: "var(--text3)", fontSize: 14.5 }}>https://yournewsletter.com/edition/128</span>
            </div>
            <div className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--btn)", color: "var(--btn-text)", fontSize: 14.5, fontWeight: 500, padding: "11px 18px", borderRadius: 10 }}>
              Continue <span style={{ opacity: 0.75 }}>→</span>
            </div>
          </div>
        </Step>

        <Step n="02" title="Make it sound right for your publication." body="Before generating your Brief, choose the voice and style that best fit your publication. Your preferences help keep each edition consistent.">
          <StyleVoiceCard />
        </Step>

        <Step n="03" title="Some words deserve special attention." body="Add names, brands, technical terms, or abbreviations that need to be pronounced correctly.">
          <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "20px 22px", boxShadow: "var(--shadow)" }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text2)", marginBottom: 12 }}>Pronunciation preferences</div>
            {[["NVIDIA", "en-VID-ee-uh"], ["Kubernetes", "koo-ber-NET-eez"], ["SaaS", "sass"]].map(([word, say]) => (
              <div key={word} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border2)" }}>
                <span style={{ fontWeight: 500, fontSize: 14.5 }}>{word}</span>
                <span style={{ color: "var(--text3)", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 13, flex: 1, textAlign: "center" }}>{say}</span>
                <span style={{ fontSize: 13, color: "var(--accent2)", display: "flex", alignItems: "center", gap: 4 }}>▶ Listen</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, color: "var(--accent2)", marginTop: 12 }}>
              + Add a pronunciation
            </div>
          </div>
        </Step>

        <Step n="04" title="Generate your complete Brief." body="Once your preferences are ready, we'll turn your newsletter into more than an audio file.">
          <GeneratingCard />
        </Step>

        <Step n="05" title="Everything is ready in one place." body="Your workspace keeps every edition and its assets organised, so they're ready whenever you need them.">
          <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "20px 22px", boxShadow: "var(--shadow)" }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text2)", marginBottom: 14 }}>Your Brief includes</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {BRIEF_INCLUDES.map(([icon, label, note]) => (
                <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span className="icon-glow" style={{ color: "var(--accent2)", flex: "none" }}>
                    <CheckCircleIcon size={16} />
                  </span>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{label}</div>
                    <div style={{ fontSize: 12, color: "var(--text3)" }}>{note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Step>

        <Step
          n="06"
          isLast
          title="One edition. More ways to share it."
          body="Your newsletter doesn't have to stay in one format. Use your original edition, the audio Brief, and the accompanying assets wherever they make sense for your audience."
        >
          <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "20px 22px", boxShadow: "var(--shadow)" }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text2)", marginBottom: 14 }}>Share in the way that works for you</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {SHARE_OPTIONS.map(([icon, label]) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <span className="icon-badge icon-glow" style={{ background: "var(--tint)", color: "var(--accent2)" }}>{icon}</span>
                  <span style={{ fontSize: 11.5, color: "var(--text2)", textAlign: "center" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Step>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 64px" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--tint)", padding: "40px 44px", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, letterSpacing: "-.02em", margin: "0 0 8px" }}>
              From link to <span style={{ color: "var(--accent2)" }}>finished experience.</span>
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--text2)", margin: 0 }}>A simple flow from your published newsletter to a complete Brief.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {FLOW_STEPS.map(([n, icon], i) => (
              <div key={n} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <span className="icon-badge icon-glow" style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--card)", border: "1px solid var(--border)", color: "var(--accent2)" }}>
                    {icon}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--text2)", textAlign: "center", whiteSpace: "nowrap" }}>
                    {n} {FLOW_LABELS[i]}
                  </span>
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <span style={{ flex: 1, height: 1, background: "var(--border)", margin: "0 4px 22px" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 96px" }}>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 20,
            background: "var(--band)",
            color: "#fff",
            padding: "48px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1, minWidth: 280 }}>
            <span className="icon-badge icon-glow" style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(255,255,255,.12)", color: "#fff" }}>
              <WaveformIcon size={24} />
            </span>
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 26, lineHeight: 1.2, letterSpacing: "-.02em", margin: "0 0 6px" }}>
                Ready to hear what your newsletter <span style={{ color: "var(--accent2)" }}>could become?</span>
              </h2>
              <p style={{ fontSize: 14.5, opacity: 0.85, margin: 0 }}>Turn one edition into an audio experience and ready-to-use assets.</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 15.5, fontWeight: 500, padding: "13px 22px", borderRadius: 12 }}>
              Try Your Newsletter <span style={{ opacity: 0.75 }}>→</span>
            </Link>
            <span style={{ fontSize: 12.5, opacity: 0.65 }}>No signup required for the demo.</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
