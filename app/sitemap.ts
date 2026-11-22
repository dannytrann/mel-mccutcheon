import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/uploads/hero-mel-singing.jpg`],
    },
    {
      url: `${SITE_URL}/blackbird`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${SITE_URL}/blackbird/40knots-sunset.jpg`],
    },
  ];
}
