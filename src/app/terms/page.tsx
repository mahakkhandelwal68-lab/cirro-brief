import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Terms of Service" };

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, margin: "0 0 10px" }}>{title}</h2>
      <div style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.7 }}>{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "72px 40px 96px" }}>
        <div style={{ fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 16 }}>Legal</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 40, letterSpacing: "-.03em", margin: "0 0 8px" }}>Terms of Service</h1>
        <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 40px" }}>Last updated: August 31, 2026</p>

        <LegalSection title="Using the demo">
          <p>
            The free demo is provided to give you a preview of Cirro Brief. It is limited in length, rate-limited
            per email, IP address, and publication domain, and protected against automated abuse. We reserve the
            right to suspend access to the demo for any account or address showing abusive usage patterns.
          </p>
        </LegalSection>

        <LegalSection title="Paid plans">
          <p>
            One-Time, Monthly, Annual, and Custom plans grant access to the full Cirro Brief workspace, subject to
            the briefing allowances and features described on our Pricing page at the time of purchase. Plan
            details, including pricing, may vary by region.
          </p>
        </LegalSection>

        <LegalSection title="Content responsibility">
          <p>
            You are responsible for ensuring you have the right to submit the newsletter or blog content you provide
            to Cirro Brief for processing. We do not claim ownership over your original content; you retain rights
            to your newsletter and the briefings generated from it.
          </p>
        </LegalSection>

        <LegalSection title="Acceptable use">
          <p>
            You agree not to use Cirro Brief to process content you do not have rights to, to circumvent demo usage
            limits, or to abuse the service in a way that degrades it for other users.
          </p>
        </LegalSection>

        <LegalSection title="Changes to these terms">
          <p>We may update these terms from time to time. Continued use of Cirro Brief after changes constitutes acceptance of the updated terms.</p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>Questions about these terms? Reach out via our Contact &amp; Support page.</p>
        </LegalSection>
      </div>
      <Footer />
    </>
  );
}
