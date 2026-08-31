import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function MyBriefsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: briefs } = await supabase
    .from("briefs")
    .select("id, title, publication, status, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 40px 64px" }}>
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, letterSpacing: "-.02em", margin: "0 0 24px" }}>My Briefs</h1>

      {briefs && briefs.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {briefs.map((b) => (
            <Link
              key={b.id}
              href={`/dashboard/briefs/${b.id}`}
              style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--card)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, color: "var(--text)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 13, minWidth: 0 }}>
                <span style={{ fontSize: 18 }}>🎧</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 500, fontSize: 15 }}>{b.title}</div>
                  <div style={{ fontSize: 12.8, color: "var(--text3)" }}>
                    {b.publication ? `${b.publication} · ` : ""}
                    {new Date(b.created_at).toLocaleDateString()} · <span style={{ color: "var(--accent2)" }}>{b.status === "complete" ? "Ready" : b.status}</span>
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 13.5, color: "var(--accent2)", flex: "none" }}>View →</span>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ border: "1px dashed var(--border)", borderRadius: 16, background: "var(--card)", padding: "36px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>No Briefs yet</div>
          <Link href="/dashboard/create-brief" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--btn)", color: "var(--btn-text)", fontSize: 14.5, fontWeight: 500, padding: "12px 20px", borderRadius: 10 }}>
            Create Your First Brief <span style={{ opacity: 0.75 }}>→</span>
          </Link>
        </div>
      )}
    </main>
  );
}
