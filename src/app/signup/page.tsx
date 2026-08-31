"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
  }

  return (
    <>
      <Header />
      <div style={{ maxWidth: 420, margin: "0 auto", padding: "96px 40px" }}>
        {done ? (
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 30, margin: "0 0 12px" }}>Check your email</h1>
            <p style={{ color: "var(--text2)", fontSize: 15 }}>
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your workspace.
            </p>
          </div>
        ) : (
          <>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 34, letterSpacing: "-.03em", margin: "0 0 28px", textAlign: "center" }}>
              Create your workspace
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
                minLength={8}
                placeholder="Password (min 8 characters)"
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
                {loading ? "Creating..." : "Create Workspace"}
              </button>
            </form>
            <p style={{ textAlign: "center", fontSize: 14, color: "var(--text2)", marginTop: 20 }}>
              Already have a workspace? <Link href="/login">Sign in</Link>
            </p>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
