import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const PLAN_LABELS: Record<string, string> = {
  "one-time": "One-Time",
  monthly: "Monthly",
  annual: "Annual",
  custom: "Custom",
};

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user!.id).maybeSingle();
  const planKey = profile?.plan || "one-time";

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: "24px 40px 64px" }}>
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, letterSpacing: "-.02em", margin: "0 0 24px" }}>Plan &amp; Billing</h1>

      <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "24px 26px", marginBottom: 20 }}>
        <div style={{ fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 10 }}>Current Plan</div>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20 }}>{PLAN_LABELS[planKey] || planKey}</div>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "24px 26px" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Want to change your plan?</div>
        <p style={{ fontSize: 14.5, color: "var(--text2)", margin: "0 0 16px" }}>
          Billing management is handled by our team for now — reach out and we&apos;ll take care of upgrades,
          downgrades, or cancellations.
        </p>
        <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--btn)", color: "var(--btn-text)", fontSize: 14.5, fontWeight: 500, padding: "12px 20px", borderRadius: 10 }}>
          Contact Us <span style={{ opacity: 0.75 }}>→</span>
        </Link>
      </div>
    </main>
  );
}
