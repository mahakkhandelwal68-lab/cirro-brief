import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Cirro Brief collects, uses, stores, and protects information when you visit our website, use our services, purchase a plan, access your workspace, or contact us.",
};

const SUPPORT_EMAIL = "support@cirro.example.com";
const BUSINESS_ADDRESS = "LumeLush Studio, Bengaluru, India";

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, margin: "0 0 10px" }}>{title}</h2>
      <div style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
    </section>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "72px 40px 96px" }}>
        <div style={{ fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 16 }}>Legal</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 40, letterSpacing: "-.03em", margin: "0 0 8px" }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 24px" }}>Last updated: September 3, 2026</p>
        <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.7, margin: "0 0 40px" }}>
          Cirro Brief (&ldquo;Cirro Brief&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) provides tools and services that help
          transform newsletter editions and written content into audio experiences and related publishing assets.
          This Privacy Policy explains how we collect, use, store, and protect information when you visit our
          website, use our services, purchase a plan, access your workspace, or contact us. By using Cirro Brief,
          you agree to the practices described in this Privacy Policy.
        </p>

        <LegalSection title="1. Information we collect">
          <p><strong style={{ color: "var(--text)" }}>Information you provide directly.</strong> You may provide us with:</p>
          <List
            items={[
              "Your name, email address, and phone number",
              "Company or publication name",
              "Billing information",
              "Information submitted through contact or support forms",
              "Information submitted when requesting a custom plan",
              "Newsletter links and content",
              "Text, names, terminology, pronunciation preferences, and other information required to create your audio Brief",
              "Messages sent to our support team",
            ]}
          />
          <p><strong style={{ color: "var(--text)" }}>Account and workspace information.</strong> When you purchase a Cirro Brief service or plan, we may create or provide access to a workspace associated with your purchase. We may store information relating to:</p>
          <List
            items={[
              "Your account email address",
              "Purchased services or plans",
              "Editions submitted to Cirro Brief",
              "Audio Briefs created",
              "Saved pronunciation preferences",
              "Generated summaries and publishing assets",
              "Workspace activity necessary to provide the service",
            ]}
          />
          <p><strong style={{ color: "var(--text)" }}>Automatically collected information.</strong> When you use our website or workspace, certain technical information may be collected automatically, including:</p>
          <List
            items={[
              "IP address, browser type, device information, and operating system",
              "Pages or features accessed",
              "Approximate location derived from your IP address",
              "Date and time of visits",
              "Technical logs and error information",
            ]}
          />
          <p>We may use cookies or similar technologies where necessary to operate and improve our services.</p>
        </LegalSection>

        <LegalSection title="2. How we use your information">
          <p>We use information we collect to:</p>
          <List
            items={[
              "Provide Cirro Brief services and create and deliver audio experiences and related assets",
              "Create and manage your workspace",
              "Process purchases and payments",
              "Communicate with you about your purchase or account, and provide customer support",
              "Respond to custom plan or consultant requests",
              "Send access information and service-related emails",
              "Improve our website and services",
              "Maintain security and prevent misuse",
              "Meet legal or regulatory obligations",
            ]}
          />
          <p>Where permitted, we may also send you product updates, tips, or promotional communications. You can unsubscribe from promotional emails where an unsubscribe option is provided.</p>
        </LegalSection>

        <LegalSection title="3. Your content">
          <p>You retain ownership of the original content you submit to Cirro Brief, subject to any rights you grant to us that are necessary to provide the service. By submitting content to Cirro Brief, you confirm that you have the necessary rights and permissions to use that content.</p>
          <p>You grant Cirro Brief a limited right to process, store, reproduce, and transform your submitted content solely as necessary to create your requested audio experience, generate summaries or other requested assets, provide workspace functionality, and maintain and improve the technical operation of the service. We do not claim ownership of your original newsletter or written content.</p>
        </LegalSection>

        <LegalSection title="4. Audio and generated assets">
          <p>Cirro Brief may generate materials based on the content and preferences you provide, including audio Briefs, audio files, brief summaries, ready-to-share assets, blog audio embeds, QR codes and sharing materials, and other publishing or distribution assets.</p>
          <p>You are responsible for reviewing generated materials before publishing or distributing them. Cirro Brief is not responsible for errors resulting from inaccurate, incomplete, or incorrectly submitted source content or preferences.</p>
        </LegalSection>

        <LegalSection title="5. How we share information">
          <p>We do not sell your personal information. We may share information with trusted third-party service providers where necessary to operate our business and provide our services, including providers involved in website hosting, cloud storage, payment processing, email delivery, authentication, analytics, audio processing, and customer support. These providers may process information only as necessary to provide their services to us or as otherwise permitted by applicable law.</p>
          <p>We may also disclose information where required to comply with applicable law, respond to lawful requests, protect our rights or property, protect the security of Cirro Brief and its users, or prevent fraud or misuse.</p>
        </LegalSection>

        <LegalSection title="6. Payments">
          <p>Payments may be processed through third-party payment providers. Cirro Brief does not intentionally store complete payment card details unless such storage is handled securely by an authorized payment provider. The privacy practices of payment providers are governed by their respective privacy policies.</p>
        </LegalSection>

        <LegalSection title="7. Data retention">
          <p>We retain personal and workspace information for as long as reasonably necessary to provide the services you have purchased, maintain your account or workspace, resolve disputes, meet legal, accounting, or regulatory requirements, and enforce our agreements.</p>
          <p>After your plan ends or is cancelled, you can continue to access and download your editions and generated assets for 30 days. We may delete or anonymize information after this period, or otherwise when it is no longer reasonably necessary.</p>
        </LegalSection>

        <LegalSection title="8. Data security">
          <p>We take reasonable technical and organisational measures to protect information against unauthorized access, loss, misuse, or alteration. However, no online service can guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials and notifying us promptly if you believe your account has been accessed without authorization.</p>
        </LegalSection>

        <LegalSection title="9. Cookies">
          <p>Cirro Brief may use cookies and similar technologies to keep the website functioning properly, maintain sessions, remember preferences, understand website usage, and improve our services. You may be able to control or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website or workspace.</p>
        </LegalSection>

        <LegalSection title="10. Your choices">
          <p>Depending on applicable law, you may have the right to request access to certain personal information we hold about you, correction of inaccurate information, deletion of certain personal information, or withdrawal of consent where processing is based on consent.</p>
          <p>To make a request, contact us at <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "var(--accent2)" }}>{SUPPORT_EMAIL}</a>. We may need to verify your identity before processing certain requests.</p>
        </LegalSection>

        <LegalSection title="11. Third-party links">
          <p>Our website or generated assets may contain links to third-party websites or platforms. Cirro Brief is not responsible for the privacy practices, content, or security of third-party services. We encourage you to review their privacy policies before providing them with personal information.</p>
        </LegalSection>

        <LegalSection title="12. Children's privacy">
          <p>Cirro Brief is not intended for individuals who are not legally able to enter into a binding agreement under applicable law. We do not knowingly collect personal information from children without appropriate authorization.</p>
        </LegalSection>

        <LegalSection title="13. International users">
          <p>If you access Cirro Brief from outside the country in which our business or service providers operate, your information may be processed or stored in other locations. By using our services, you understand that your information may be transferred and processed in locations where applicable laws may differ from those in your country.</p>
        </LegalSection>

        <LegalSection title="14. Changes to this Privacy Policy">
          <p>We may update this Privacy Policy from time to time. When we make changes, we will update the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of Cirro Brief after changes take effect may be subject to the updated Privacy Policy.</p>
        </LegalSection>

        <LegalSection title="15. Contact us">
          <p>For questions about this Privacy Policy, contact:</p>
          <p style={{ margin: 0 }}>
            Cirro Brief
            <br />
            Email: <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "var(--accent2)" }}>{SUPPORT_EMAIL}</a>
            <br />
            Business Address: {BUSINESS_ADDRESS}
          </p>
        </LegalSection>
      </div>
      <Footer />
    </>
  );
}
