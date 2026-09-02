import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border2)", background: "var(--bg)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "56px 40px 40px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 48,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                border: "1px solid var(--border2)",
              }}
            >
              <Image src="/brand/icon.png" alt="Cirro" width={26} height={26} style={{ objectFit: "contain" }} />
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>Cirro Brief</span>
          </div>
          <span style={{ fontSize: 14, color: "var(--text3)" }}>A product by Cirro.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 14.5 }}>
          <span style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 4 }}>
            Product
          </span>
          <Link href="/">Home</Link>
          <Link href="/try-demo">Try Demo</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/flow">Flow</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 14.5 }}>
          <span style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 4 }}>
            Company
          </span>
          <Link href="/about">About</Link>
          <Link href="/contact">Support</Link>
          <Link href="/login">Log in</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 14.5 }}>
          <span style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 4 }}>
            Legal
          </span>
          <Link href="/privacy" className="link-underline">Privacy Policy</Link>
          <Link href="/terms" className="link-underline">Terms of Service</Link>
          <Link href="/refunds" className="link-underline">Refund Policy</Link>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px 40px 40px",
          borderTop: "1px solid var(--border2)",
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          fontSize: 12.5,
          color: "var(--text3)",
        }}
      >
        <span>&copy; 2026 Cirro Brief</span>
        <span>Billing by LumeLush Studio</span>
      </div>
    </footer>
  );
}
