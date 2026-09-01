import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Try the Demo",
  description:
    "Paste a link to one of your newsletter editions and hear it turned into a short audio briefing. No signup required.",
};

export default function TryDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
