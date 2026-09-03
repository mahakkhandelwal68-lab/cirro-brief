import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The Terms of Service governing your access to and use of the Cirro Brief website, workspace, products, and services.",
};

const SUPPORT_EMAIL = "support@cirro.example.com";
const BUSINESS_ADDRESS = "LumeLush Studio, Bengaluru, India";
const JURISDICTION = "Bengaluru, India";

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

export default function TermsPage() {
  return (
    <>
      <Header />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "72px 40px 96px" }}>
        <div style={{ fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 16 }}>Legal</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 40, letterSpacing: "-.03em", margin: "0 0 8px" }}>Terms of Service</h1>
        <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 24px" }}>Last updated: September 3, 2026</p>
        <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.7, margin: "0 0 40px" }}>
          Welcome to Cirro Brief. These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Cirro
          Brief website, workspace, products, and services. By accessing or using Cirro Brief, you agree to these
          Terms. If you do not agree with these Terms, please do not use our services.
        </p>

        <LegalSection title="1. About Cirro Brief">
          <p>Cirro Brief helps publishers, creators, businesses, and teams transform newsletter editions and written content into audio experiences and related publishing assets. Depending on the service or plan purchased, Cirro Brief may provide:</p>
          <List
            items={[
              "Audio Briefs and audio files",
              "Brief summaries",
              "Ready-to-share assets",
              "Saved pronunciation preferences",
              "Blog audio embeds",
              "QR codes for sharing",
              "Workspace access",
              "Other services described in the applicable plan or custom agreement",
            ]}
          />
          <p>The specific services available to you depend on the plan, purchase, or agreement you enter into with us.</p>
        </LegalSection>

        <LegalSection title="2. Eligibility">
          <p>You may use Cirro Brief only if you are legally able to enter into a binding agreement under applicable law. If you use Cirro Brief on behalf of a company, publication, organisation, or other entity, you confirm that you have authority to accept these Terms on its behalf.</p>
        </LegalSection>

        <LegalSection title="3. Purchasing Cirro Brief">
          <p>Cirro Brief may offer different ways to purchase services, including individual editions, monthly plans, annual plans, and custom plans. Prices, included services, usage limits, and availability may vary depending on the selected plan.</p>
          <p>The applicable price and service details presented to you at the time of purchase form part of your agreement with Cirro Brief. We may update future pricing or plans at any time. Changes will not normally alter services that have already been purchased unless otherwise stated.</p>
        </LegalSection>

        <LegalSection title="4. Workspace access">
          <p>Cirro Brief does not currently provide an open public account registration system. A workspace is generally provided in connection with an eligible purchase or service arrangement. Your workspace allows you to access relevant services and materials associated with your Cirro Brief account.</p>
          <p>You are responsible for keeping your login credentials secure, providing accurate account information, and ensuring that people accessing your workspace are authorised to do so. You must not share account access in a manner that violates your purchased plan or applicable agreement.</p>
          <p>We may suspend access where we reasonably believe an account has been compromised, misused, or used in violation of these Terms.</p>
        </LegalSection>

        <LegalSection title="5. Your content">
          <p>You may submit newsletter editions, links, written material, names, pronunciation preferences, and other content to Cirro Brief. You retain ownership of your original content. You are responsible for ensuring that you own the content or have permission to use it, that it does not violate applicable law or infringe another person&apos;s intellectual property rights, and that you have the necessary permissions to create and distribute any requested audio or publishing assets.</p>
          <p>You must not submit content that is unlawful, fraudulent, harmful, or infringes the rights of others.</p>
        </LegalSection>

        <LegalSection title="6. Permission to process your content">
          <p>In order to provide the service, you grant Cirro Brief a limited, non-exclusive right to process your submitted content. This includes the right to access and store submitted content where necessary, convert written content into audio, generate requested assets, process pronunciation preferences, create summaries and related materials, and deliver the resulting services to you. This permission exists only to the extent reasonably necessary to operate and provide Cirro Brief.</p>
        </LegalSection>

        <LegalSection title="7. Your responsibility to review content">
          <p>Cirro Brief may use automated systems and other technology to process content. Generated materials may occasionally contain errors. Before publishing, distributing, or relying on an Audio Brief or generated asset, you are responsible for reviewing it — particularly for names, brand names, technical terminology, financial information, dates, numbers, medical information, legal information, or other sensitive or high-impact content.</p>
          <p>Saved pronunciation preferences can help improve future editions, but you remain responsible for reviewing final output.</p>
        </LegalSection>

        <LegalSection title="8. Acceptable use">
          <p>You agree not to:</p>
          <List
            items={[
              "Use Cirro Brief for unlawful purposes",
              "Attempt to gain unauthorized access to our systems",
              "Interfere with the operation or security of the service",
              "Upload malicious code or harmful material",
              "Reverse engineer the service where prohibited by law",
              "Use the service to infringe intellectual property rights",
              "Resell or redistribute the service without permission",
              "Misrepresent generated content as independently verified information when it has not been verified",
              "Use another person's account without authorization",
            ]}
          />
          <p>We may suspend or terminate access where we reasonably believe these Terms have been violated.</p>
        </LegalSection>

        <LegalSection title="9. Generated assets and sharing">
          <p>Depending on your plan, Cirro Brief may provide assets intended to help you share your content, such as audio players, downloadable audio, blog embed tools, QR codes, social sharing assets, and brief summaries. You are responsible for how you publish, distribute, or promote these assets, and for ensuring that your use of third-party platforms complies with their terms and policies.</p>
        </LegalSection>

        <LegalSection title="10. Custom plans">
          <p>Some customers may request a custom plan, which may be discussed with a Cirro Brief consultant or team member before purchase. The scope, price, deliverables, timelines, and applicable usage terms for a custom plan may be provided separately.</p>
          <p>Where there is a written custom agreement or approved quotation, that agreement may supplement these Terms. If there is a direct conflict between these Terms and a specific written agreement for a custom service, the specific written agreement will apply to the extent of that conflict.</p>
        </LegalSection>

        <LegalSection title="11. Payments">
          <p>You agree to pay all applicable fees associated with your selected service or plan. Unless otherwise stated, prices are displayed in the applicable currency, payment may be required before service delivery, additional taxes may apply where legally required, and payment processing may be handled by a third-party provider. For subscription plans, you may be charged according to the billing cycle presented at the time of purchase.</p>
        </LegalSection>

        <LegalSection title="12. Subscription renewals">
          <p>If Cirro Brief offers automatically renewing subscription plans, the renewal terms and billing frequency will be presented before purchase. You are responsible for managing or cancelling your subscription according to the cancellation options provided.</p>
          <p>Cancellation generally stops future renewals. It does not automatically entitle you to a refund for services already provided or for the current paid period, except where required by applicable law or expressly stated in our Refund Policy.</p>
        </LegalSection>

        <LegalSection title="13. Service availability">
          <p>We aim to keep Cirro Brief available and functioning reliably. However, we do not guarantee uninterrupted or error-free service. The service may occasionally be unavailable because of maintenance, updates, technical issues, third-party service failures, or events outside our reasonable control. We may modify, update, or improve the service from time to time.</p>
        </LegalSection>

        <LegalSection title="14. Intellectual property">
          <p>The Cirro Brief website, branding, software, interface, design, and underlying service are owned by or licensed to Cirro Brief. Except for rights expressly granted to you, you may not copy, reproduce, sell, distribute, or exploit our intellectual property without permission. Your original submitted content remains yours, subject to the permissions necessary for us to provide the service.</p>
        </LegalSection>

        <LegalSection title="15. Third-party services">
          <p>Cirro Brief may integrate with or rely on third-party services. We are not responsible for third-party platform availability, changes to third-party services, third-party policies, or content hosted by third parties. Your use of third-party services may be governed by their own terms.</p>
        </LegalSection>

        <LegalSection title="16. Suspension or termination">
          <p>We may suspend or terminate access to Cirro Brief where reasonably necessary, including if you violate these Terms, payment is not received, your account is involved in suspected fraud or misuse, or continued access could create security or legal risks. Where reasonably possible, we may provide notice before suspension.</p>
          <p>Termination does not remove obligations that arose before termination, including payment obligations.</p>
        </LegalSection>

        <LegalSection title="17. Disclaimer">
          <p>Cirro Brief provides tools and services designed to help transform written content into audio experiences and related assets. The service does not guarantee audience growth, increased revenue, increased engagement, accuracy of all generated output, uninterrupted availability, or specific business results. Any examples, demonstrations, or illustrations on our website are provided for explanatory purposes.</p>
        </LegalSection>

        <LegalSection title="18. Limitation of liability">
          <p>To the maximum extent permitted by applicable law, Cirro Brief will not be liable for indirect, incidental, special, consequential, or business losses arising from your use of the service, including lost profits, lost revenue, loss of business opportunity, loss resulting from reliance on generated content, or loss caused by third-party platforms or services.</p>
          <p>Where liability cannot legally be excluded, our liability will be limited to the amount paid by you to Cirro Brief for the specific service giving rise to the claim during the applicable period permitted by law. Nothing in these Terms excludes rights that cannot legally be excluded.</p>
        </LegalSection>

        <LegalSection title="19. Changes to the service or Terms">
          <p>We may update these Terms from time to time. If changes are material, we may provide notice through the website, workspace, or email where appropriate. Continued use of Cirro Brief after updated Terms take effect means you accept the updated Terms.</p>
        </LegalSection>

        <LegalSection title="20. Governing law">
          <p>These Terms shall be governed by the laws applicable to the legal entity operating Cirro Brief. Unless otherwise required by applicable law, disputes shall be subject to the jurisdiction of the courts located in {JURISDICTION}.</p>
        </LegalSection>

        <LegalSection title="21. Contact">
          <p>For questions regarding these Terms, contact:</p>
          <p style={{ margin: 0 }}>
            Cirro Brief
            <br />
            Email: <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "var(--accent2)" }}>{SUPPORT_EMAIL}</a>
            <br />
            Address: {BUSINESS_ADDRESS}
          </p>
        </LegalSection>
      </div>
      <Footer />
    </>
  );
}
