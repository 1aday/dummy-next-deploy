import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/posts";

const BASE_URL = "https://dummy-next-deploy.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${BASE_URL}/blog/tags/${tagToSlug(tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const guidesSlugs = [
    "ai-product-growth",
    "llms-for-product-teams",
    "rag-systems",
    "ai-personalization",
  ];

  const guideEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...guidesSlugs.map((slug) => ({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  const industries = [
    "saas", "fintech", "e-commerce", "healthtech", "edtech", "marketplace",
    "devtools", "media", "gaming", "real-estate", "logistics", "hr-tech",
    "cybersecurity", "insurtech", "legal-tech",
  ];

  const industryEntries: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${BASE_URL}/ai-growth-for/${industry}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...guideEntries,
    ...blogEntries,
    ...tagEntries,
    ...industryEntries,
  ];
}
