import type { MetadataRoute } from "next";

const BASE = "https://cirrobrief.lumelush.cloud";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/pricing", "/how-it-works", "/about", "/contact", "/try-demo", "/privacy", "/terms", "/refunds"];
  return pages.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
