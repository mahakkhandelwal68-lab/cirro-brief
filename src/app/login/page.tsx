"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { MailIcon, LockIcon, EyeIcon, SparkleIcon } from "@/components/icons";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const fieldWrapStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: "0 14px",
    background: "var(--bg)",
  };
  const fieldInputStyle: React.CSSProperties = {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "var(--text)",
    fontSize: 15,
    padding: "12px 0",
  };
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 7, display: "block" };

  return (
    <div style={{ position: "relative", maxWidth: 940, margin: "0 auto", padding: "56px 40px 88px", overflow: "hidden" }}>
      <svg
        viewBox="0 0 200 200"
        style={{ position: "absolute", top: 20, left: 0, width: 200, height: 200, opacity: 0.4, pointerEvents: "none" }}
      >
        {Array.from({ length: 8 }, (_, r) =>
          Array.from({ length: 8 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={10 + c * 18} cy={10 + r * 18} r={1.4} fill="var(--border)" />
          ))
        )}
      </svg>
      <svg
        viewBox="0 0 320 260"
        style={{ position: "absolute", right: -20, bottom: 0, width: 320, height: 260, opacity: 0.55, pointerEvents: "none" }}
      >
        <defs>
          <radialGradient id="login-cloud-glow" cx="60%" cy="70%" r="55%">
            <stop offset="0%" stopColor="var(--accent2)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--accent2)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="260" fill="url(#login-cloud-glow)" />
        <path
          d="M110,150c-20,0-36-15-36-34s16-34,36-34c5-22,25-38,48-38s45,18,48,40c18,2,32,16,32,34c0,20-16,36-36,36z"
          fill="none"
          stroke="var(--accent2)"
          strokeWidth="1.6"
          strokeDasharray="5 6"
          transform="translate(60,10)"
        />
        {[[40, 40], [280, 60], [260, 190], [30, 180]].map(([x, y], i) => (
          <path
            key={i}
            d="M0,-6 L1.6,-1.6 L6,0 L1.6,1.6 L0,6 L-1.6,1.6 L-6,0 L-1.6,-1.6 Z"
            fill="var(--accent2)"
            opacity={0.6}
            transform={`translate(${x},${y}) scale(${0.7 + (i % 2) * 0.4})`}
          />
        ))}
      </svg>

      <div
        style={{
          position: "relative",
          maxWidth: 460,
          margin: "0 auto",
          border: "1px solid var(--border)",
          borderRadius: 22,
          background: "var(--card)",
          boxShadow: "var(--shadow)",
          padding: "40px 40px 34px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <span
            className="icon-badge icon-glow"
            style={{ width: 60, height: 60, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--tint)", color: "var(--accent2)" }}
          >
            <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.6A4.5 4.5 0 0 1 17 17H7z" />
            </svg>
          </span>
        </div>

        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 30, letterSpacing: "-.02em", margin: "0 0 10px", textAlign: "center" }}>
          Access your <span style={{ color: "var(--accent2)" }}>workspace</span>
        </h1>
        <p style={{ fontSize: 15, color: "var(--text2)", margin: "0 0 26px", textAlign: "center" }}>
          Sign in to manage your editions, audio and assets.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Email address</label>
            <div style={fieldWrapStyle}>
              <span style={{ color: "var(--accent2)", flex: "none" }}>
                <MailIcon size={17} />
              </span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={fieldInputStyle}
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
              <Link href="/contact" style={{ fontSize: 13, color: "var(--accent2)" }}>Forgot password?</Link>
            </div>
            <div style={fieldWrapStyle}>
              <span style={{ color: "var(--accent2)", flex: "none" }}>
                <LockIcon size={17} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={fieldInputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{ background: "none", border: "none", color: "var(--text3)", cursor: "pointer", display: "flex", flex: "none", padding: 0 }}
              >
                <EyeIcon size={17} />
              </button>
            </div>
          </div>

          {error && <span style={{ color: "#e06565", fontSize: 13.5 }}>{error}</span>}

          <button
            type="submit"
            disabled={loading}
            className="btn-pop"
            style={{ background: "var(--btn)", color: "var(--btn-text)", border: "none", borderRadius: 10, padding: "13px", fontSize: 15.5, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            {loading ? "Signing in..." : "Sign in"} <span style={{ opacity: 0.75 }}>→</span>
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border2)" }} />
          <span style={{ fontSize: 12.5, color: "var(--text3)" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "var(--border2)" }} />
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 18px" }}>
          <span className="icon-badge" style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--tint)", color: "var(--accent2)", flex: "none" }}>
            <SparkleIcon size={16} />
          </span>
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14.5, marginBottom: 2 }}>Don&apos;t have a workspace yet?</div>
            <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8 }}>
              Start with your first edition. Your workspace is created once you&apos;re ready to get started.
            </div>
            <Link href="/try-demo" style={{ fontSize: 13.5, fontWeight: 500, color: "var(--accent2)" }}>
              Try Your Newsletter →
            </Link>
          </div>
        </div>
      </div>

      <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--text3)", marginTop: 26 }}>
        Need help accessing your workspace? <Link href="/contact" style={{ color: "var(--accent2)" }}>Contact support →</Link>
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
