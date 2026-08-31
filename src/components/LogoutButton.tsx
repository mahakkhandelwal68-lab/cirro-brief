"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      style={{ border: "1px solid var(--border)", background: "transparent", color: "var(--text2)", borderRadius: 10, padding: "8px 14px", fontSize: 14, cursor: "pointer" }}
    >
      Log out
    </button>
  );
}
