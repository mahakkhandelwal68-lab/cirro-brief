import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { LockIcon } from "./icons";

export function Header({ ctaLabel = "Try Your Newsletter", ctaHref = "/try-demo" }: { ctaLabel?: string; ctaHref?: string }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 32,
        padding: "16px 40px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border2)",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            border: "1px solid var(--border2)",
          }}
        >
          <Image src="/brand/icon.png" alt="Cirro" width={30} height={30} style={{ objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16.5, letterSpacing: "-.01em", color: "var(--text)" }}>
            Cirro Brief
          </span>
          <span style={{ fontSize: 11.5, color: "var(--text3)" }}>
            Turn newsletters into audio experiences
          </span>
        </div>
      </Link>
      <nav style={{ display: "flex", alignItems: "center", gap: 30, fontSize: 14.5, color: "var(--text2)" }}>
        <Link href="/how-it-works" className="link-underline" style={{ color: "inherit" }}>How It Works</Link>
        <Link href="/pricing" className="link-underline" style={{ color: "inherit" }}>Pricing</Link>
        <Link href="/about" className="link-underline" style={{ color: "inherit" }}>About</Link>
        <Link href="/contact" className="link-underline" style={{ color: "inherit" }}>Support</Link>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <ThemeToggle />
        <Link href="/login" className="link-underline" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14.5, color: "var(--text2)" }}>
          <LockIcon size={14} /> Access Workspace
        </Link>
        <Link
          href={ctaHref}
          className="btn-pop"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "var(--btn)",
            color: "var(--btn-text)",
            fontSize: 14.5,
            fontWeight: 500,
            padding: "10px 18px",
            borderRadius: 10,
          }}
        >
          {ctaLabel} <span style={{ opacity: 0.75 }}>→</span>
        </Link>
      </div>
    </header>
  );
}
