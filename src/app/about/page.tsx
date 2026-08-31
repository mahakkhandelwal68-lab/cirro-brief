import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const WHAT_WE_DO = [
  ["🎧", "Listen", "An audio briefing designed around your newsletter."],
  ["📝", "Revisit", "A final briefing script and key insights from the edition."],
  ["📣", "Share", "Ready-to-use promotional copy to introduce the briefing."],
  ["🌐", "Publish", "A dedicated shareable page for the briefing."],
  ["▣", "Connect", "A QR code linking physical material to your digital briefing."],
];

const AUDIENCES = [
  ["Independent newsletter publishers", "Give subscribers another way to experience each edition."],
  ["Media and publication teams", "Create an additional listening experience without building a separate audio production process from scratch."],
  ["Industry experts and analysts", "Help audiences consume detailed insights when reading isn't convenient."],
  ["Businesses with regular publications", "Turn newsletters, reports, and recurring written updates into additional formats."],
];

const SHAPE_LIST = ["How the briefing is written", "The style and tone", "The voice", "Important pronunciations", "Whether you want to review the script first"];

const CONTROL_LIST: [string, string][] = [
  ["Want to review the script?", "You can."],
  ["Want to choose the voice?", "You can."],
  ["Have important names or terminology?", "Add pronunciation guidance."],
  ["Want your preferences ready for future editions?", "Eligible plans make it easier."],
];

function Section({ children, alt, band, width = 800 }: { children: React.ReactNode; alt?: boolean; band?: boolean; width?: number }) {
  return (
    <section style={{ background: band ? "var(--band)" : alt ? "var(--bg2)" : undefined, color: band ? "#fff" : undefined, borderTop: alt ? "1px solid var(--border2)" : undefined, borderBottom: alt ? "1px solid var(--border2)" : undefined }}>
      <div style={{ maxWidth: width, margin: "0 auto", padding: "72px 40px" }}>{children}</div>
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, lineHeight: 1.15, letterSpacing: "-.02em", margin: "0 0 18px" }}>{children}</h2>;
}

export default function AboutPage() {
  return (
    <>
      <Header />

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "88px 40px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 14px", marginBottom: 28 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent2)", display: "inline-block" }} />
          About Cirro Brief
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 44, lineHeight: 1.15, letterSpacing: "-.025em", margin: "0 0 22px" }}>
          Good ideas shouldn&apos;t depend on finding time to read.
        </h1>
        <p style={{ fontSize: 18, color: "var(--text2)", margin: "0 0 8px" }}>
          Cirro Brief helps newsletter publishers give their audience another way to experience the content they
          already create.
        </p>
        <p style={{ fontSize: 18, color: "var(--text2)", margin: 0 }}>
          We transform newsletter editions into engaging audio briefings and a complete set of ready-to-use
          assets—making it easier to listen, share, and discover each edition.
        </p>
      </section>

      <Section alt>
        <H2>Newsletters are valuable. Time is limited.</H2>
        <p style={{ fontSize: 16.5, color: "var(--text2)", margin: "0 0 16px" }}>
          Great newsletters often require significant research, thinking, and writing. But even loyal readers
          don&apos;t always have the time to sit down and read every edition.
        </p>
        <p style={{ fontSize: 16.5, color: "var(--text2)", margin: "0 0 16px" }}>They might be commuting, walking, working, travelling, or moving between meetings.</p>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18, color: "var(--text)", margin: 0 }}>
          That doesn&apos;t mean they&apos;re not interested. Sometimes, reading simply isn&apos;t convenient at that
          moment.
        </p>
      </Section>

      <Section>
        <H2>Your content should be easier to experience in different ways.</H2>
        <p style={{ fontSize: 16.5, color: "var(--text2)", margin: "0 0 16px" }}>
          A newsletter doesn&apos;t have to exist in only one format. The ideas you&apos;ve already researched and
          written can become an experience your audience can:
        </p>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, letterSpacing: "-.01em", margin: "0 0 20px", color: "var(--accent)" }}>
          Read. Listen to. Share. Revisit.
        </p>
        <p style={{ fontSize: 16.5, color: "var(--text2)", margin: 0 }}>
          Cirro Brief helps make that possible without asking publishers to build an entirely new content production
          workflow.
        </p>
      </Section>

      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 40px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, lineHeight: 1.15, letterSpacing: "-.02em", margin: "0 0 8px", textAlign: "center" }}>
            One edition in. More ways to use it.
          </h2>
          <p style={{ fontSize: 15.5, color: "var(--text2)", margin: "0 0 36px", textAlign: "center" }}>
            You start with the newsletter you&apos;ve already created. Cirro Brief helps turn it into a complete
            package.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }}>
            {WHAT_WE_DO.map(([icon, title, body]) => (
              <div key={title} className="hover-pop" style={{ border: "1px solid var(--border2)", borderRadius: 14, background: "var(--card)", padding: "20px 18px", display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15.5 }}>{title}</span>
                <span style={{ fontSize: 13.5, color: "var(--text2)" }}>{body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px 64px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, lineHeight: 1.15, letterSpacing: "-.02em", margin: "0 0 6px", textAlign: "center" }}>
          Built for people who already have something worth saying.
        </h2>
        <p style={{ fontSize: 15.5, color: "var(--text2)", margin: "0 0 36px", textAlign: "center" }}>
          Cirro Brief is designed for publishers and teams creating written content on a regular basis.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {AUDIENCES.map(([title, body]) => (
            <div key={title} className="hover-pop" style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "24px 26px" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17.5, marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 15, color: "var(--text2)" }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      <Section alt>
        <H2>Your newsletter deserves more than being read aloud.</H2>
        <p style={{ fontSize: 16.5, color: "var(--text2)", margin: "0 0 14px" }}>Cirro Brief is designed around the complete experience. You can shape:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
          {SHAPE_LIST.map((s) => (
            <div key={s} style={{ display: "flex", gap: 9, fontSize: 16, color: "var(--text)" }}>
              <span style={{ color: "var(--accent2)" }}>✓</span>
              {s}
            </div>
          ))}
        </div>
        <p style={{ fontSize: 16.5, color: "var(--text2)", margin: 0 }}>
          And your finished edition includes more than the audio itself. One newsletter becomes a complete Cirro
          Brief package.
        </p>
      </Section>

      <Section>
        <H2>You stay in control.</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {CONTROL_LIST.map(([q, a]) => (
            <div key={q} style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "baseline", borderBottom: "1px solid var(--border2)", paddingBottom: 14 }}>
              <span style={{ fontSize: 16.5, color: "var(--text2)" }}>{q}</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16.5, color: "var(--accent2)", flex: "none" }}>{a}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section alt>
        <H2>Your content. Your choice.</H2>
        <p style={{ fontSize: 16.5, color: "var(--text2)", margin: "0 0 16px" }}>
          Not every newsletter edition needs to be public. You can decide how you want your completed briefing to be
          used.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, margin: "22px 0" }}>
          <div style={{ border: "1px solid var(--border2)", borderRadius: 14, background: "var(--card)", padding: "20px 22px" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Keep it private</div>
            <div style={{ fontSize: 14.5, color: "var(--text2)" }}>Use the assets and share the briefing yourself, for your own audience.</div>
          </div>
          <div style={{ border: "1px solid var(--accent2)", borderRadius: 14, background: "var(--tint)", padding: "20px 22px" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, marginBottom: 6, color: "var(--accent2)" }}>Make it discoverable</div>
            <div style={{ fontSize: 14.5, color: "var(--text2)" }}>Choose to make eligible public briefings discoverable through Cirro Brief by topic or industry.</div>
          </div>
        </div>
        <p style={{ fontSize: 16.5, color: "var(--text)", fontWeight: 500, margin: 0 }}>You decide what becomes public.</p>
      </Section>

      <Section band>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 32, lineHeight: 1.2, letterSpacing: "-.02em", margin: "0 0 18px" }}>
            We&apos;re making it easier for good written content to travel further.
          </h2>
          <p style={{ fontSize: 17, opacity: 0.9, margin: "0 0 14px" }}>Cirro Brief starts with newsletters. But the idea is simple:</p>
          <p style={{ fontSize: 18, margin: 0 }}>
            When valuable content already exists, creating another way to experience it shouldn&apos;t require
            starting from zero. We&apos;re building a simpler way to transform existing written content into useful,
            ready-to-use experiences.
          </p>
        </div>
      </Section>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 40px 96px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 34, lineHeight: 1.15, letterSpacing: "-.025em", margin: "0 0 8px" }}>
          You&apos;ve already created the content.
        </h2>
        <p style={{ fontSize: 18, color: "var(--text2)", margin: "0 0 30px" }}>Now give people another way to experience it.</p>
        <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}>
          Try the Demo <span style={{ opacity: 0.75 }}>→</span>
        </Link>
        <p style={{ fontSize: 13, color: "var(--text3)", margin: "14px 0 0" }}>No signup required.</p>
      </section>

      <Footer />
    </>
  );
}
