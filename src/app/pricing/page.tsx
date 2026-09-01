import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingClient } from "@/components/PricingClient";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One-Time, Monthly, Annual, or Custom — choose the Cirro Brief plan that fits how often you publish. Regional pricing shown automatically.",
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ padding: "80px 40px", textAlign: "center", color: "var(--text3)" }}>Loading...</div>}>
        <PricingClient />
      </Suspense>
      <Footer />
    </>
  );
}
