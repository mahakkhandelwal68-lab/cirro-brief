import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ContactChannels } from "@/components/ContactChannels";
import { SupportForm } from "@/components/SupportForm";
import { SupportHeroGraphic, FaqAccordion } from "@/components/SupportVisuals";
import { WhatsAppIcon, BookmarkIcon, SlidersIcon, ChatIcon, HeadsetIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Support",
  description: "Questions before purchasing, need help with an existing Brief, or want a custom plan? Reach the Cirro Brief team by WhatsApp, email, or message.",
};

const FAQS = [
  {
    icon: <WhatsAppIcon size={16} />,
    color: "var(--accent2)",
    q: "What is included in a Brief?",
    a: "Every Brief includes a complete audio briefing, a written summary, ready-to-share promotional assets, a blog audio embed, and a QR code linking to your audio edition.",
  },
  {
    icon: <BookmarkIcon size={16} />,
    color: "var(--purple)",
    q: "Can I try Cirro Brief first?",
    a: "Yes. You can try Cirro Brief with one of your own newsletter editions before subscribing — no signup or payment required.",
  },
  {
    icon: <SlidersIcon size={16} />,
    color: "var(--orange)",
    q: "How does the Custom plan work?",
    a: "The Custom plan is built around your publishing frequency and requirements. Request a conversation and our team will confirm a price and send a secure purchase link.",
  },
  {
    icon: <ChatIcon size={16} />,
    color: "var(--blue)",
    q: "How long does it take to receive a Brief?",
    a: "Most Briefs are ready shortly after your newsletter edition is processed. Eligible plans let you preview and review the script before it's finalised.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "72px 40px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "center" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 14px", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent2)", display: "inline-block" }} />
              Support
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 42, lineHeight: 1.15, letterSpacing: "-.02em", margin: "0 0 18px" }}>
              Need help with <span style={{ color: "var(--accent2)" }}>Cirro Brief?</span>
            </h1>
            <p style={{ fontSize: 16.5, color: "var(--text2)", margin: 0, maxWidth: 440 }}>
              Whether you have a quick question, need help with an existing Brief, or want to discuss something more
              specific, we&apos;re here to help.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <SupportHeroGraphic />
          </Reveal>
        </div>
      </section>

      {/* Channels */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "40px 40px 80px" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, letterSpacing: "-.01em", margin: "0 0 30px", textAlign: "center" }}>
            Choose the easiest way to reach us.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <Suspense fallback={<div style={{ color: "var(--text3)" }}>Loading...</div>}>
            <ContactChannels />
          </Suspense>
        </Reveal>
      </section>

      {/* Discuss in detail */}
      <section id="top-form" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "72px 40px" }}>
          <Reveal>
            <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--card)", boxShadow: "var(--shadow)", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 0, overflow: "hidden" }}>
              <div style={{ padding: "44px 40px", borderRight: "1px solid var(--border2)", display: "flex", flexDirection: "column" }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, lineHeight: 1.25, letterSpacing: "-.01em", margin: "0 0 14px" }}>
                  Need to <span style={{ color: "var(--accent2)" }}>discuss something</span> in detail?
                </h2>
                <p style={{ fontSize: 15, color: "var(--text2)", margin: "0 0 24px" }}>
                  Whether you need help choosing a plan, have questions about a Custom Brief, need help with your
                  existing setup, or want to discuss a specific requirement, you can request a conversation with our
                  consultant.
                </p>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "var(--tint)", border: "1px solid var(--border2)", borderRadius: 12, padding: "16px 18px" }}>
                  <span style={{ color: "var(--accent2)", flex: "none" }}>
                    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v.01M12 11v5" />
                    </svg>
                  </span>
                  <div style={{ fontSize: 13.5, color: "var(--text2)" }}>
                    We&apos;ll review your request and send a meeting booking link to your email within 24 hours.
                  </div>
                </div>
              </div>
              <div style={{ padding: "44px 40px" }}>
                <SupportForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "80px 40px" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, letterSpacing: "-.02em", margin: "0 0 30px", textAlign: "center" }}>
            Common questions
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <FaqAccordion items={FAQS} />
        </Reveal>
      </section>

      {/* Still need help */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "0 40px 96px" }}>
        <Reveal>
          <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--tint)", padding: "36px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span className="icon-badge icon-glow" style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--card)", border: "1px solid var(--border)", color: "var(--accent2)" }}>
                <HeadsetIcon size={24} />
              </span>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Still need help?</div>
                <div style={{ fontSize: 14.5, color: "var(--text2)" }}>Our team is here to make sure you get the most out of Cirro Brief.</div>
              </div>
            </div>
            <Link href="#top-form" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--btn)", color: "var(--btn-text)", fontSize: 15, fontWeight: 500, padding: "13px 22px", borderRadius: 11, whiteSpace: "nowrap" }}>
              Request a conversation <span style={{ opacity: 0.75 }}>→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
