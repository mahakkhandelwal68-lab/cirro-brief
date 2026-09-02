"use client";

import { useSearchParams } from "next/navigation";
import { WhatsAppIcon, MailIcon, InstagramIcon } from "./icons";

export function ContactChannels() {
  const params = useSearchParams();
  const intent = params.get("intent");
  const plan = params.get("plan");
  const n = params.get("n");
  const billing = params.get("billing");

  const message =
    intent === "purchase"
      ? plan === "custom"
        ? `Hi! I'd like to request the Custom plan (${n} newsletters/month, ${billing} billing) for Cirro Brief. Please confirm the price and send a payment link.`
        : plan
        ? `Hi! I'd like to purchase the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan for Cirro Brief.`
        : "Hi! I'd like to purchase a Cirro Brief plan."
      : "Hi! I have a question about Cirro Brief.";

  const whatsapp = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_NUMBER;
  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const instagram = process.env.NEXT_PUBLIC_SUPPORT_INSTAGRAM_HANDLE;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
      <div className="hover-pop" style={{ border: "2px solid var(--accent2)", borderRadius: 18, background: "var(--tint)", padding: "28px 26px", display: "flex", flexDirection: "column", gap: 10 }}>
        <span className="icon-badge icon-glow" style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--card)", color: "var(--accent2)" }}>
          <WhatsAppIcon size={21} />
        </span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18 }}>WhatsApp</span>
        <span style={{ fontSize: 14.5, color: "var(--text2)", flex: 1 }}>For quick questions and support.</span>
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: "var(--btn)", color: "var(--btn-text)", fontSize: 14.5, fontWeight: 500, padding: "12px 16px", borderRadius: 10 }}
        >
          Chat with us on WhatsApp →
        </a>
      </div>

      <div className="hover-pop" style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--card)", padding: "28px 26px", display: "flex", flexDirection: "column", gap: 10 }}>
        <span className="icon-badge icon-glow" style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--tint-lavender)", color: "var(--purple)" }}>
          <MailIcon size={21} />
        </span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18 }}>Email</span>
        <span style={{ fontSize: 14.5, color: "var(--text2)" }}>
          For account questions, detailed requests, or anything that needs more context.
        </span>
        <span style={{ fontSize: 14.5, fontWeight: 500, color: "var(--text)", flex: 1 }}>{email}</span>
        <a
          href={`mailto:${email}?subject=${encodeURIComponent(intent === "purchase" ? "Cirro Brief - Purchase Request" : "Cirro Brief - Support")}&body=${encodeURIComponent(message)}`}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: "transparent", border: "1px solid var(--border)", color: "var(--text)", fontSize: 14.5, fontWeight: 500, padding: "12px 16px", borderRadius: 10 }}
        >
          Send us an email →
        </a>
      </div>

      <div className="hover-pop" style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--card)", padding: "28px 26px", display: "flex", flexDirection: "column", gap: 10 }}>
        <span className="icon-badge icon-glow" style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--orange-tint)", color: "var(--orange)" }}>
          <InstagramIcon size={21} />
        </span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18 }}>Instagram</span>
        <span style={{ fontSize: 14.5, color: "var(--text2)", flex: 1 }}>Prefer messaging there? Reach out to us directly.</span>
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: "transparent", border: "1px solid var(--border)", color: "var(--text)", fontSize: 14.5, fontWeight: 500, padding: "12px 16px", borderRadius: 10 }}
        >
          @{instagram} →
        </a>
      </div>
    </div>
  );
}
