import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactChannels } from "@/components/ContactChannels";
import { SupportForm } from "@/components/SupportForm";

export const metadata: Metadata = {
  title: "Contact & Support",
  description: "Questions before purchasing, need help with an existing Brief, or want a custom plan? Reach the Cirro Brief team by WhatsApp, email, or message.",
};

const HELP_TOPICS = [
  ["💬", "I have a question before purchasing", "Want to understand Cirro Brief, plans, features, or whether it fits your publication?", "Talk to us"],
  ["🎧", "I need help with an existing Brief", "Need assistance with a briefing, audio, assets, or your workspace?", "Get support"],
  ["⚙️", "I need help with my account", "Having trouble accessing your workspace or managing your plan?", "Get account help"],
  ["✦", "I have a custom requirement", "Need a different volume, publishing setup, or something specific?", "Discuss your requirements"],
];

const QUICK_LINKS: [string, string, string][] = [
  ["How does Cirro Brief work?", "See the Flow", "/flow"],
  ["What is included with each plan?", "View Pricing", "/pricing"],
  ["Can I try Cirro Brief first?", "Try the Demo", "/try-demo"],
  ["Do you offer custom plans?", "Explore Custom Plans", "/pricing"],
];

export default function ContactPage() {
  return (
    <>
      <Header />

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "88px 40px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 999, padding: "7px 14px", marginBottom: 26 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent2)", display: "inline-block" }} />
          Contact &amp; Support
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 46, lineHeight: 1.12, letterSpacing: "-.025em", margin: "0 0 18px" }}>
          Need help with Cirro Brief?
        </h1>
        <p style={{ fontSize: 17.5, color: "var(--text2)", margin: "0 auto 30px", maxWidth: "32em" }}>
          Whether you have a question before getting started or need help with an existing briefing, we&apos;re here
          to help.
        </p>
        <a href="#form" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}>
          Talk to Support <span style={{ opacity: 0.75 }}>→</span>
        </a>
      </section>

      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 40px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, letterSpacing: "-.02em", margin: "0 0 30px", textAlign: "center" }}>
            How can we help?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {HELP_TOPICS.map(([icon, title, body, cta]) => (
              <div key={title} className="hover-pop" style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "24px 22px", display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>{title}</span>
                <span style={{ fontSize: 13.8, color: "var(--text2)", flex: 1 }}>{body}</span>
                <a href="#form" style={{ fontSize: 14, fontWeight: 500, color: "var(--accent2)" }}>{cta} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 64px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, letterSpacing: "-.02em", margin: "0 0 30px", textAlign: "center" }}>
          Choose the easiest way to reach us.
        </h2>
        <Suspense fallback={<div style={{ color: "var(--text3)" }}>Loading...</div>}>
          <ContactChannels />
        </Suspense>
      </section>

      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 40px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, letterSpacing: "-.02em", margin: "0 0 26px", textAlign: "center" }}>
            You may find your answer here.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--border2)" }}>
            {QUICK_LINKS.map(([q, cta, href]) => (
              <Link key={q} href={href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 4px", borderBottom: "1px solid var(--border2)", color: "var(--text)" }}>
                <span style={{ fontSize: 16 }}>{q}</span>
                <span style={{ fontSize: 14.5, color: "var(--accent2)", flex: "none" }}>{cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="form" style={{ maxWidth: 800, margin: "0 auto", padding: "80px 40px 64px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, letterSpacing: "-.02em", margin: "0 0 26px", textAlign: "center" }}>
          What can we help you with?
        </h2>
        <SupportForm />
      </section>

      <section id="workspace" style={{ background: "var(--band)", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 24, letterSpacing: "-.015em", marginBottom: 8 }}>
              Already using Cirro Brief?
            </div>
            <div style={{ fontSize: 15.5, opacity: 0.85 }}>Use the email connected to your purchase to securely access your workspace.</div>
          </div>
          <Link href="/login" style={{ flex: "none", display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: "var(--accent)", fontSize: 15.5, fontWeight: 500, padding: "14px 24px", borderRadius: 11 }}>
            Access Workspace <span style={{ opacity: 0.7 }}>→</span>
          </Link>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 40px 96px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, lineHeight: 1.15, letterSpacing: "-.025em", margin: "0 0 14px" }}>
          Still not sure where to start?
        </h2>
        <p style={{ fontSize: 16.5, color: "var(--text2)", margin: "0 auto 28px", maxWidth: "30em" }}>
          Try Cirro Brief with one of your newsletter editions and experience the process for yourself.
        </p>
        <Link href="/try-demo" className="btn-pop" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "15px 26px", borderRadius: 12 }}>
          Try the Demo <span style={{ opacity: 0.75 }}>→</span>
        </Link>
      </section>

      <Footer />
    </>
  );
}
