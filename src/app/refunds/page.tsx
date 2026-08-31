import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, margin: "0 0 10px" }}>{title}</h2>
      <div style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.7 }}>{children}</div>
    </section>
  );
}

export default function RefundsPage() {
  return (
    <>
      <Header />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "72px 40px 96px" }}>
        <div style={{ fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 16 }}>Legal</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 40, letterSpacing: "-.03em", margin: "0 0 8px" }}>Refund Policy</h1>
        <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 40px" }}>Last updated: August 31, 2026</p>

        <LegalSection title="One-Time briefs">
          <p>
            Because a One-Time brief consumes real processing costs the moment it&apos;s generated, refunds are not
            available once a briefing has been successfully created. If generation fails on our end, you will not be
            charged for that attempt.
          </p>
        </LegalSection>

        <LegalSection title="Monthly &amp; Annual plans">
          <p>
            You may cancel a Monthly or Annual plan at any time; cancellation takes effect at the end of the current
            billing period, and unused briefings do not roll over. Refunds for partially used billing periods are
            considered on a case-by-case basis — contact our team to discuss.
          </p>
        </LegalSection>

        <LegalSection title="Custom plans">
          <p>Refund terms for Custom plans are agreed individually as part of your custom arrangement.</p>
        </LegalSection>

        <LegalSection title="How to request a refund">
          <p>Reach out via our Contact &amp; Support page with your purchase email and details, and our team will review your request.</p>
        </LegalSection>
      </div>
      <Footer />
    </>
  );
}
