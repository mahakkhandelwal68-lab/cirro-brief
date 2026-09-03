import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "How refunds are handled for Cirro Brief's One-Time, Monthly, Annual, and Custom plans.",
};

const SUPPORT_EMAIL = "support@cirro.example.com";

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

export default function RefundsPage() {
  return (
    <>
      <Header />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "72px 40px 96px" }}>
        <div style={{ fontSize: 11.5, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 16 }}>Legal</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 40, letterSpacing: "-.03em", margin: "0 0 8px" }}>Refund Policy</h1>
        <p style={{ fontSize: 14, color: "var(--text3)", margin: "0 0 24px" }}>Last updated: September 3, 2026</p>
        <p style={{ fontSize: 15.5, color: "var(--text2)", lineHeight: 1.7, margin: "0 0 40px" }}>
          At Cirro Brief, we provide digital services and create audio experiences and related assets based on
          customer content and selected preferences. Because many of our services involve immediate processing,
          digital delivery, or work that is specific to a customer&apos;s edition, refunds are handled according to
          the policy below.
        </p>

        <LegalSection title="1. Please review your plan before purchasing">
          <p>Before completing a purchase, we encourage you to review the plan or service selected, what is included, the price, billing frequency where applicable, any applicable usage limits, and the information you submit for your edition.</p>
          <p>If you are unsure which option is right for you, you may contact Cirro Brief before purchasing. For custom requirements, you may request a discussion with a consultant before proceeding.</p>
        </LegalSection>

        <LegalSection title="2. One-time edition purchases">
          <p>For one-time or individual edition purchases, refunds may not be available once processing has started, or the Audio Brief or requested digital assets have been generated or delivered. This is because the service may involve immediate digital processing and work specific to your submitted edition.</p>
          <p>If you experience a genuine technical issue that prevents us from delivering the purchased service, please contact us so we can investigate and attempt to resolve the issue.</p>
        </LegalSection>

        <LegalSection title="3. Monthly and Annual plans">
          <p>For Monthly and Annual plans:</p>
          <List
            items={[
              "You may cancel future renewals according to the cancellation options available to you.",
              "Cancellation will normally prevent future billing.",
              "Cancellation does not automatically provide a refund for the current billing period.",
              "Services already made available during a paid billing period, including Annual plans, are not refundable once access to that period has started.",
            ]}
          />
          <p>Where a refund is legally required, we will process it in accordance with applicable law.</p>
        </LegalSection>

        <LegalSection title="4. Custom plans">
          <p>Custom plans may involve services tailored specifically to your requirements. Once work has started on a custom service, a full refund may not be available. The applicable payment structure for a custom plan may be discussed and agreed upon before work begins. Where a custom agreement provides specific refund or cancellation terms, those terms will apply.</p>
        </LegalSection>

        <LegalSection title="5. Technical problems">
          <p>If you are unable to access a purchased service because of a technical issue, please contact us first. We will make reasonable efforts to identify the issue, restore access or service delivery, correct a genuine technical problem where possible, and provide an appropriate alternative where reasonable.</p>
          <p>A technical issue does not automatically result in a refund if the issue can reasonably be resolved and the purchased service can still be provided.</p>
        </LegalSection>

        <LegalSection title="6. Incorrect or incomplete customer information">
          <p>Customers are responsible for providing accurate information and content, including newsletter links, written content, names, pronunciation preferences, email addresses, and publishing details. We may not be able to provide a refund where an issue results from incorrect, incomplete, or unauthorized information submitted by the customer.</p>
          <p>However, where reasonably possible, we may allow the customer to correct the information and regenerate or update the relevant output according to the terms of their plan.</p>
        </LegalSection>

        <LegalSection title="7. Generated content issues">
          <p>Audio generation and automated processing may occasionally produce errors. If you identify an issue with your Audio Brief or another generated asset, please contact us with relevant details. Depending on the issue and your plan, we may correct the issue, regenerate the output, allow you to update relevant preferences, or provide another reasonable solution.</p>
          <p>A refund will generally be considered only where we are unable to reasonably provide the purchased service.</p>
        </LegalSection>

        <LegalSection title="8. Duplicate payments">
          <p>If you believe you were charged more than once for the same purchase, contact us as soon as possible. After verifying the duplicate charge, we will take appropriate steps to correct it, including issuing a refund where applicable.</p>
        </LegalSection>

        <LegalSection title="9. Unauthorized transactions">
          <p>If you believe a payment was made without your authorization, contact your payment provider and notify us promptly. We may request information necessary to investigate the transaction.</p>
        </LegalSection>

        <LegalSection title="10. How to request a refund">
          <p>To request a refund or report a payment issue, contact <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "var(--accent2)" }}>{SUPPORT_EMAIL}</a> and include:</p>
          <List
            items={[
              "Your name",
              "The email address used for the purchase",
              "Order or payment reference, if available",
              "The service or plan purchased",
              "A clear explanation of the issue",
            ]}
          />
          <p>We may request additional information to verify the purchase.</p>
        </LegalSection>

        <LegalSection title="11. Refund processing">
          <p>If a refund is approved, it will normally be issued through the original payment method where possible. Processing times may vary depending on the payment provider or bank, and we will notify you when the refund has been initiated.</p>
          <p>Any payment processing fees that are non-refundable to us may be handled in accordance with applicable law and the terms presented at the time of purchase.</p>
        </LegalSection>

        <LegalSection title="12. Access after your plan ends">
          <p>After your plan ends or is cancelled, you can continue to access and download your editions and generated assets for 30 days. Access to these materials may be removed after this period.</p>
        </LegalSection>

        <LegalSection title="13. Changes to this Refund Policy">
          <p>We may update this Refund Policy from time to time. The version published on our website at the time of your purchase will generally apply to that purchase unless a change is required by law or expressly agreed otherwise.</p>
        </LegalSection>
      </div>
      <Footer />
    </>
  );
}
