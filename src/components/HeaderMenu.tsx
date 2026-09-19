"use client";

import { useState } from "react";
import Link from "next/link";

export function HeaderMenu({ ctaLabel, ctaHref }: { ctaLabel: string; ctaHref: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="hdr-burger btn-pop"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontSize: 18, cursor: "pointer" }}
      >
        {open ? "✕" : "☰"}
      </button>
      <nav className={`hdr-panel${open ? " is-open" : ""}`} onClick={close}>
        <Link href="/flow">Flow</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Support</Link>
        <Link href="/login">Access Workspace</Link>
        <Link
          href={ctaHref}
          style={{ marginTop: 12, textAlign: "center", background: "var(--btn)", color: "var(--btn-text)", borderRadius: 10, fontWeight: 500, borderBottom: "none" }}
        >
          {ctaLabel} →
        </Link>
      </nav>
    </>
  );
}
