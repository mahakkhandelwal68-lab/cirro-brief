import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

const NEXT_STEPS = [
  ["1", "Check your email", "We'll send a secure link to the email associated with your purchase."],
  ["2", "Access your workspace", "Use that link anytime you want to return to Cirro Brief."],
  ["3", "Create your first Brief", "Add your newsletter and choose how you'd like your Brief to be created."],
];

function OrderSummary({ searchParams }: { searchParams: { plan?: string; allowance?: string; amount?: string } }) {
  const rows: [string, string][] = [
    ["Plan", searchParams.plan || "Monthly"],
    ["Briefs included", searchParams.allowance || "4 / month"],
    ["Amount paid", searchParams.amount || ""],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px", marginBottom: 24, boxShadow: "var(--shadow)" }}>
      <div style={{ fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 14 }}>Order summary</div>
      {rows.map(([label, value]) => (
        <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border2)", fontSize: 15 }}>
          <span style={{ color: "var(--text2)" }}>{label}</span>
          <span style={{ fontWeight: 500 }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

export default async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ plan?: string; allowance?: string; amount?: string }> }) {
  const sp = await searchParams;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, padding: "20px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid var(--border2)" }}>
            <Image src="/brand/icon.png" alt="Cirro" width={28} height={28} style={{ objectFit: "contain" }} />
          </div>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>Cirro Brief</span>
        </div>
      </header>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 40px 60px" }}>
        <div style={{ maxWidth: 560, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 22px" }}>✓</div>
            <div style={{ fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 10 }}>Payment Successful</div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, lineHeight: 1.15, letterSpacing: "-.02em", margin: "0 0 12px" }}>
              Your Cirro Brief plan is ready.
            </h1>
            <p style={{ fontSize: 16, color: "var(--text2)", margin: 0 }}>
              Thank you for your purchase. Your payment has been confirmed. We&apos;ll now set up access to your
              Cirro Brief workspace.
            </p>
          </div>

          <Suspense fallback={null}>
            <OrderSummary searchParams={sp} />
          </Suspense>

          <div style={{ border: "1px solid var(--border2)", borderRadius: 16, background: "var(--tint)", padding: "22px 24px", marginBottom: 28 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>What&apos;s next?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {NEXT_STEPS.map(([n, title, body]) => (
                <div key={n} style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
                  <span style={{ flex: "none", width: 26, height: 26, borderRadius: "50%", background: "var(--card)", border: "1px solid var(--border)", color: "var(--accent2)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {n}
                  </span>
                  <span>
                    <span style={{ display: "block", fontWeight: 500, fontSize: 15, color: "var(--text)" }}>{title}</span>
                    <span style={{ display: "block", fontSize: 13.8, color: "var(--text2)" }}>{body}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link href="/verify-email" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, background: "var(--btn)", color: "var(--btn-text)", fontSize: 16, fontWeight: 500, padding: "16px 24px", borderRadius: 12 }}>
            Continue to My Workspace <span style={{ opacity: 0.75 }}>→</span>
          </Link>
          <p style={{ textAlign: "center", fontSize: 13, color: "var(--text3)", margin: "16px 0 0" }}>
            Your workspace access is securely linked to your purchase email.
          </p>
        </div>
      </main>
    </div>
  );
}
