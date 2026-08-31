"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export function VerifyEmailClient() {
  const params = useSearchParams();
  const email = params.get("email") || "you@yournewsletter.com";
  const [resent, setResent] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  function handleResend() {
    setResent(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setResent(false), 3000);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid var(--border2)" }}>
            <Image src="/brand/icon.png" alt="Cirro" width={28} height={28} style={{ objectFit: "contain" }} />
          </div>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>Cirro Brief</span>
        </div>
        <ThemeToggle />
      </header>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 40px 60px" }}>
        <div style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 14 }}>Welcome to Cirro Brief</div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 28, lineHeight: 1.2, letterSpacing: "-.02em", margin: "0 0 28px" }}>
            Check your email to access your workspace.
          </h1>

          <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--card)", padding: "30px 28px", boxShadow: "var(--shadow)", marginBottom: 22 }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>📧</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{email}</div>
            <p style={{ fontSize: 14.5, color: "var(--text2)", margin: 0 }}>
              We&apos;ve sent a secure access link to this address. Open the email and click the link to securely
              access your Cirro Brief workspace.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 }}>
            {!resent ? (
              <button
                onClick={handleResend}
                style={{ width: "100%", background: "var(--btn)", color: "var(--btn-text)", border: "none", fontSize: 15, fontWeight: 500, padding: 14, borderRadius: 11, cursor: "pointer" }}
              >
                Resend access link
              </button>
            ) : (
              <div style={{ width: "100%", background: "var(--tint)", color: "var(--accent2)", border: "1px solid var(--accent2)", fontSize: 15, fontWeight: 500, padding: 14, borderRadius: 11 }}>
                ✓ Link resent
              </div>
            )}
            <a href="/signup" style={{ fontSize: 14, color: "var(--text2)" }}>Use a different email</a>
          </div>

          <p style={{ fontSize: 12.5, color: "var(--text3)", margin: "0 0 4px" }}>Didn&apos;t receive the email? Check your spam or promotions folder.</p>
          <div style={{ height: 1, background: "var(--border2)", margin: "22px 0" }} />
          <p style={{ fontSize: 12.5, color: "var(--text3)", margin: 0 }}>
            Your workspace is securely linked to the email associated with your purchase.
          </p>
        </div>
      </main>
    </div>
  );
}
