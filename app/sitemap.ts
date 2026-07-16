import { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tooliqo.com";

  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticUrls = ["", "/about", "/contact", "/privacy-policy", "/terms-conditions", "/disclaimer"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1.0 : 0.5,
  }));

  return [...staticUrls, ...toolUrls];
}
