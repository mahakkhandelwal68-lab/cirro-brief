import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostDemoOfferClient } from "@/components/PostDemoOfferClient";

export const metadata: Metadata = {
  title: "Your First Complete Brief",
  description: "Get your first full-length Cirro Brief audio briefing at a discount, or explore the Monthly and Annual plans.",
};

export default function PostDemoOfferPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ padding: "80px 40px", textAlign: "center", color: "var(--text3)" }}>Loading...</div>}>
        <PostDemoOfferClient />
      </Suspense>
      <Footer />
    </>
  );
}
