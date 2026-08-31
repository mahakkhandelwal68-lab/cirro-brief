import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogoutButton } from "@/components/LogoutButton";

const NAV_ITEMS = [
  { icon: "⌂", label: "Home", href: "/dashboard" },
  { icon: "＋", label: "Create Brief", href: "/dashboard/create-brief" },
  { icon: "🎧", label: "My Briefs", href: "/dashboard/briefs" },
  { icon: "💳", label: "Plan & Billing", href: "/dashboard/billing" },
  { icon: "⚙", label: "Settings", href: "/dashboard/settings" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("onboarded").eq("id", user.id).maybeSingle();
  if (!profile?.onboarded) redirect("/workspace-setup");

  return (
    <div style={{ background: "var(--bg2)", minHeight: "100vh", display: "flex" }}>
      <aside style={{ width: 220, flex: "none", background: "var(--bg)", borderRight: "1px solid var(--border2)", display: "flex", flexDirection: "column", padding: "22px 16px", minHeight: "100vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 8px", marginBottom: 32 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid var(--border2)" }}>
            <Image src="/brand/icon.png" alt="Cirro" width={24} height={24} style={{ objectFit: "contain" }} />
          </div>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15 }}>Cirro Brief</span>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
          {NAV_ITEMS.map((n) => (
            <Link key={n.href} href={n.href} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 9, fontSize: 14.5, color: "var(--text2)" }}>
              <span style={{ width: 16, textAlign: "center" }}>{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 9, fontSize: 14.5, color: "var(--text2)" }}>
          <span style={{ width: 16, textAlign: "center" }}>?</span>
          Help &amp; Support
        </Link>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, padding: "20px 40px 0" }}>
          <ThemeToggle />
          <LogoutButton />
        </header>
        {children}
      </div>
    </div>
  );
}
