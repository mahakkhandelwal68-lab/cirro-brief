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

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "72px 40px 96px" }}>
        <div style={{ fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 16 }}>Legal</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 40, letterSpacing: "-.03em", margin: "0 0 8px" }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 40px" }}>Last updated: August 31, 2026</p>

        <LegalSection title="What we collect">
          <p>
            When you use the Cirro Brief demo, we collect the email address and phone number you provide, and the
            URL of the newsletter or blog you submit. When you create a paid workspace account, we also collect your
            publication details, briefing preferences, and the content you submit for processing.
          </p>
        </LegalSection>

        <LegalSection title="How we use it">
          <p>
            We use your email and phone number to follow up about your interest in Cirro Brief, to prevent abuse of
            the free demo, and to communicate about your account if you become a customer. We use submitted
            newsletter content only to generate the audio briefing you requested — we do not use it to train models
            or share it with third parties beyond the AI and text-to-speech providers necessary to generate your
            briefing.
          </p>
        </LegalSection>

        <LegalSection title="Third-party processors">
          <p>
            We use Google Gemini to summarize and script your content, and ElevenLabs to generate audio. Your
            account data is stored with Supabase. These providers process data on our behalf and are bound by their
            own data-handling terms.
          </p>
        </LegalSection>

        <LegalSection title="Data retention">
          <p>
            Demo submissions and lead information are retained for up to a year to support our sales process.
            Account holders' briefings and preferences are retained for as long as the account is active, and can be
            deleted on request.
          </p>
        </LegalSection>

        <LegalSection title="Your rights">
          <p>
            You can request access to, correction of, or deletion of your personal data at any time by contacting
            us through the Support page.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>Questions about this policy? Reach out via our Contact &amp; Support page.</p>
        </LegalSection>
      </div>
      <Footer />
    </>
  );
}
