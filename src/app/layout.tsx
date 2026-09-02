import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConsultantWidget } from "@/components/ConsultantWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = "https://cirrobrief.lumelush.cloud";
const SITE_NAME = "Cirro Brief";
const DESCRIPTION =
  "Cirro Brief turns a newsletter or blog edition into a spoken-word audio briefing, plus a package of ready-to-use content assets — full script, key insights, promotional copy, a shareable public page, and a QR code. Try a free demo on your own newsletter.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Turn your newsletter into audio`,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "newsletter to audio",
    "audio briefing generator",
    "text to speech newsletter",
    "podcast from newsletter",
    "newsletter automation",
    "AI audio briefing",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: "Cirro" }],
  category: "Productivity",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Turn your newsletter into audio`,
    description: DESCRIPTION,
    images: [{ url: "/brand/logo-lockup-white.png", width: 1920, height: 1920, alt: "Cirro Brief" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Turn your newsletter into audio`,
    description: DESCRIPTION,
    images: ["/brand/logo-lockup-white.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description: DESCRIPTION,
  brand: { "@type": "Brand", name: "Cirro" },
  offers: [
    { "@type": "Offer", name: "One-Time", category: "One-time purchase, single audio briefing" },
    { "@type": "Offer", name: "Monthly", category: "Subscription, 4 briefings per month" },
    { "@type": "Offer", name: "Annual", category: "Subscription, 48 briefings per year" },
    { "@type": "Offer", name: "Custom", category: "Custom volume, priced on request" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-cirro="dark" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
        <ThemeProvider>
          {children}
          <ConsultantWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
