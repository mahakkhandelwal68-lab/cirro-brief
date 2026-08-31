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

export const metadata: Metadata = {
  title: "Cirro Brief — Turn your newsletter into audio",
  description:
    "Cirro Brief turns a newsletter edition into a concise audio briefing plus ready-to-use publishing assets.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-cirro="light" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap"
          rel="stylesheet"
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
