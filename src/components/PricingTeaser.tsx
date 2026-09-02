"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LightningIcon, CalendarIcon, CrownIcon, ChatIcon } from "./icons";
import { Reveal } from "./Reveal";

interface RegionPricing {
  symbol: string;
  oneTime: number;
  monthly: number;
  annual: number;
}

function fmt(symbol: string, n: number) {
  return `${symbol}${n.toLocaleString()}`;
}

export function PricingTeaser() {
  const [pricing, setPricing] = useState<RegionPricing | null>(null);

  useEffect(() => {
    fetch("/api/pricing").then((r) => r.json()).then(setPricing);
  }, []);

  const plans = [
    { key: "one", icon: <LightningIcon />, name: "One-Time", note: "Perfect for trying out the full experience.", value: pricing ? `From ${fmt(pricing.symbol, pricing.oneTime)}` : "—", iconColor: "var(--accent2)", iconBg: "var(--tint)", cta: "View Pricing" },
    { key: "monthly", icon: <CalendarIcon />, name: "Monthly", note: "For publishers creating audio briefs regularly.", value: pricing ? `From ${fmt(pricing.symbol, pricing.monthly)}/month` : "—", iconColor: "var(--accent2)", iconBg: "var(--tint)", cta: "View Pricing" },
    { key: "annual", icon: <CrownIcon />, name: "Annual", note: "For regular publishing with the best value — the lowest cost per Brief.", value: pricing ? `From ${fmt(pricing.symbol, pricing.annual)}/year` : "—", cta: "View Pricing", badge: "Best Value", featured: true },
    { key: "custom", icon: <ChatIcon />, name: "Custom", note: "Need something built around your publication?", value: "Let's talk →", iconColor: "var(--purple)", iconBg: "var(--purple-tint)", cta: "Contact Us" },
  ];

  return (
    <section style={{ background: "var(--tint-warm)", borderTop: "1px solid var(--border2)", borderBottom: "1px solid var(--border2)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 14 }}>Plans for every publisher</div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 38, letterSpacing: "-.025em", margin: 0 }}>Choose the plan that fits you.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, alignItems: "stretch" }}>
          {plans.map((p, i) => (
            <Reveal key={p.key} delay={i * 80}>
              <div
                className="hover-pop"
                style={
                  p.featured
                    ? { position: "relative", background: "var(--band)", color: "#fff", borderRadius: 18, padding: "30px 24px", display: "flex", flexDirection: "column", gap: 10, minHeight: 230, transform: "scale(1.04)", boxShadow: "var(--glow-teal)" }
                    : { position: "relative", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "26px 22px", display: "flex", flexDirection: "column", gap: 10, minHeight: 210 }
                }
              >
                {p.badge && (
                  <span style={{ position: "absolute", top: -11, right: 18, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--orange)", color: "#fff", borderRadius: 999, padding: "4px 10px" }}>
                    {p.badge}
                  </span>
                )}
                <div className="icon-badge" style={{ background: p.featured ? "rgba(255,255,255,.15)" : p.iconBg, color: p.featured ? "#fff" : p.iconColor }}>{p.icon}</div>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18 }}>{p.name}</span>
                <span style={{ fontSize: 14, color: p.featured ? "rgba(255,255,255,.85)" : "var(--text2)", flex: 1 }}>{p.note}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: p.featured ? "#fff" : "var(--text)" }}>{p.value}</span>
                <Link
                  href={p.key === "custom" ? "/contact" : "/pricing"}
                  className="btn-pop"
                  style={
                    p.featured
                      ? { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 14, fontWeight: 500, color: "var(--band)", background: "#fff", border: "none", borderRadius: 10, padding: "10px 14px" }
                      : { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 14, fontWeight: 500, color: "var(--accent2)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px" }
                  }
                >
                  {p.cta} →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
