"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(params.get("next") || "/dashboard");
    router.refresh();
  }

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: "96px 40px" }}>
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 34, letterSpacing: "-.03em", margin: "0 0 28px", textAlign: "center" }}>
        Access your workspace
      </h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", fontSize: 15, background: "var(--bg)", color: "var(--text)" }}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", fontSize: 15, background: "var(--bg)", color: "var(--text)" }}
        />
        {error && <span style={{ color: "#c0392b", fontSize: 13.5 }}>{error}</span>}
        <button
          type="submit"
          disabled={loading}
          style={{ background: "var(--btn)", color: "var(--btn-text)", border: "none", borderRadius: 10, padding: "13px", fontSize: 15.5, fontWeight: 500, cursor: "pointer" }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p style={{ textAlign: "center", fontSize: 14, color: "var(--text2)", marginTop: 20 }}>
        Don&apos;t have a workspace yet? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
      <Footer />
    </>
  );
}
