import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const PLAN_LABELS: Record<string, string> = {
  "one-time": "One-Time Plan",
  monthly: "Monthly Plan",
  annual: "Annual Plan",
  custom: "Custom Plan",
};

export default async function DashboardHomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle();
  const { data: briefs } = await supabase
    .from("briefs")
    .select("id, title, status, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const hasBriefs = (briefs?.length || 0) > 0;
  const planKey = profile?.plan || "one-time";
  const planName = PLAN_LABELS[planKey] || planKey;
  const briefsCreated = briefs?.length || 0;

  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 40px 64px" }}>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, letterSpacing: "-.02em", margin: "0 0 4px" }}>
          Welcome, {profile?.publication_name || user?.email}
        </h1>
        <p style={{ fontSize: 15, color: "var(--text2)", margin: 0 }}>Your Cirro Brief workspace is ready.</p>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--band)", color: "#fff", padding: "34px 36px", marginBottom: 22, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 21, letterSpacing: "-.015em", marginBottom: 6 }}>
            {hasBriefs ? "Ready to create your next Brief?" : "Ready to create your first Brief?"}
          </div>
          <div style={{ fontSize: 14.5, opacity: 0.85, maxWidth: "32em" }}>Turn your latest newsletter into an audio experience and a complete set of assets.</div>
        </div>
        <Link href="/dashboard/create-brief" style={{ flex: "none", display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: "var(--accent)", fontSize: 15, fontWeight: 500, padding: "13px 22px", borderRadius: 11 }}>
          Create a Brief <span style={{ opacity: 0.7 }}>→</span>
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px" }}>
          <div style={{ fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 10 }}>Your Plan</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{planName}</div>
          <div style={{ fontSize: 14.5, color: "var(--text2)", marginBottom: 14 }}>
            {briefsCreated} brief{briefsCreated === 1 ? "" : "s"} created so far
          </div>
          <Link href="/dashboard/billing" style={{ fontSize: 14, fontWeight: 500, color: "var(--accent2)" }}>
            Manage Plan →
          </Link>
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "22px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 17 }}>🎧</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19 }}>{briefsCreated}</span>
            <span style={{ fontSize: 12, color: "var(--text3)" }}>Briefs created</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 17 }}>✨</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19 }}>{profile?.default_style || "—"}</span>
            <span style={{ fontSize: 12, color: "var(--text3)" }}>Default style</span>
          </div>
        </div>
      </div>

      <div>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, marginBottom: 14 }}>Recent Briefs</div>
        {hasBriefs ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {briefs!.map((b) => (
              <div key={b.id} style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 13, minWidth: 0 }}>
                  <span style={{ fontSize: 18 }}>🎧</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.title}</div>
                    <div style={{ fontSize: 12.8, color: "var(--text3)" }}>
                      Created: {new Date(b.created_at).toLocaleDateString()} · <span style={{ color: "var(--accent2)" }}>{b.status === "complete" ? "Ready" : b.status}</span>
                    </div>
                  </div>
                </div>
                <Link href={`/dashboard/briefs/${b.id}`} style={{ fontSize: 13.5, color: "var(--accent2)", flex: "none" }}>
                  View →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ border: "1px dashed var(--border)", borderRadius: 16, background: "var(--card)", padding: "36px 24px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>No Briefs yet</div>
            <div style={{ fontSize: 14.5, color: "var(--text2)", marginBottom: 16 }}>You haven&apos;t created a Brief yet.</div>
            <Link href="/dashboard/create-brief" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--btn)", color: "var(--btn-text)", fontSize: 14.5, fontWeight: 500, padding: "12px 20px", borderRadius: 10 }}>
              Create Your First Brief <span style={{ opacity: 0.75 }}>→</span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
