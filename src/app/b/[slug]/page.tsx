import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function PublicBriefPage({ params }: PageProps<"/b/[slug]">) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: brief } = await supabase
    .from("briefs")
    .select("title, publication, excerpt, audio_url, category, created_at")
    .eq("public_slug", slug)
    .eq("visibility", "public")
    .maybeSingle();

  if (!brief) notFound();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "24px 40px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, width: "fit-content" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid var(--border2)" }}>
            <Image src="/brand/icon.png" alt="Cirro" width={26} height={26} style={{ objectFit: "contain" }} />
          </div>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "var(--text)" }}>Cirro Brief</span>
        </Link>
      </header>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 40px 60px" }}>
        <div style={{ maxWidth: 640, width: "100%" }}>
          <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 8 }}>
            {brief.publication} {brief.category ? `· ${brief.category}` : ""}
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 34, letterSpacing: "-.03em", margin: "0 0 20px" }}>{brief.title}</h1>

          <div style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--card)", padding: "24px 26px", boxShadow: "var(--shadow)", marginBottom: 20 }}>
            {brief.audio_url ? <audio controls src={brief.audio_url} style={{ width: "100%" }} /> : <div style={{ color: "var(--text3)" }}>Audio unavailable.</div>}
          </div>

          {brief.excerpt && <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.6 }}>{brief.excerpt}</p>}

          <p style={{ fontSize: 13, color: "var(--text3)", marginTop: 32 }}>
            Created with{" "}
            <Link href="/" style={{ color: "var(--accent2)" }}>
              Cirro Brief
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
