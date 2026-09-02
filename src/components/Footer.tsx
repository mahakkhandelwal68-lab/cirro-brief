import Link from "next/link";
import { WhatsAppIcon, MailIcon, InstagramIcon } from "./icons";

const linkStyle: React.CSSProperties = {
  color: "var(--text)",
  borderBottom: "1px dotted var(--border)",
  paddingBottom: 2,
  width: "fit-content",
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "var(--accent2)",
  fontWeight: 600,
  marginBottom: 4,
};

function SocialButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover-pop icon-badge"
      style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid var(--border)", color: "var(--accent2)" }}
    >
      {children}
    </a>
  );
}

export function Footer() {
  const whatsapp = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_NUMBER;
  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const instagram = process.env.NEXT_PUBLIC_SUPPORT_INSTAGRAM_HANDLE;

  return (
    <footer style={{ background: "var(--bg)", padding: "32px 40px 24px" }}>
      <div
        style={{
          maxWidth: 1660,
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          border: "1px solid var(--border2)",
          borderRadius: 32,
          background: "var(--bg2)",
        }}
      >
        <svg
          viewBox="0 0 340 240"
          style={{ position: "absolute", right: -30, bottom: -40, width: 380, height: "auto", opacity: 0.5, pointerEvents: "none" }}
        >
          <defs>
            <radialGradient id="footer-cloud-glow" cx="70%" cy="80%" r="60%">
              <stop offset="0%" stopColor="var(--accent2)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--accent2)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="340" height="240" fill="url(#footer-cloud-glow)" />
          <path
            d="M150,150c-22,0-40-16-40-38s18-38,40-38c6-24,28-42,54-42s50,20,54,44c20,2,36,18,36,38c0,22-18,40-40,40z"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            transform="translate(30,20) scale(1.05)"
          />
        </svg>

        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "64px 48px 56px",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr 1fr",
            gap: 48,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.6A4.5 4.5 0 0 1 17 17H7z" />
              </svg>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20 }}>Cirro Brief</span>
            </div>
            <span style={{ fontSize: 15.5, color: "var(--text2)", maxWidth: 220 }}>Turn newsletters into audio experiences.</span>
            <div style={{ display: "flex", gap: 10 }}>
              <SocialButton href={`https://wa.me/${whatsapp}`}>
                <WhatsAppIcon size={18} />
              </SocialButton>
              <SocialButton href={`mailto:${email}`}>
                <MailIcon size={18} />
              </SocialButton>
              <SocialButton href={`https://instagram.com/${instagram}`}>
                <InstagramIcon size={18} />
              </SocialButton>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 15.5 }}>
            <span style={labelStyle}>Product</span>
            <Link href="/" style={linkStyle}>Home</Link>
            <Link href="/flow" style={linkStyle}>Flow</Link>
            <Link href="/pricing" style={linkStyle}>Pricing</Link>
            <Link href="/try-demo" style={linkStyle}>Try Demo</Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 15.5 }}>
            <span style={labelStyle}>Company</span>
            <Link href="/about" style={linkStyle}>About</Link>
            <Link href="/contact" style={linkStyle}>Support</Link>
            <Link href="/login" style={linkStyle}>Access Workspace</Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 15.5 }}>
            <span style={labelStyle}>Legal</span>
            <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>
            <Link href="/terms" style={linkStyle}>Terms of Service</Link>
            <Link href="/refunds" style={linkStyle}>Refund Policy</Link>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1660,
          margin: "0 auto",
          padding: "18px 8px 0",
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
