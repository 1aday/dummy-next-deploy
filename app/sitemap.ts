import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/posts";
import { getAllComparisons } from "@/lib/comparisons";
import { getAllTerms, getGlossaryCategories } from "@/lib/glossary";
import { getAllToolCategories, getAllTools } from "@/lib/tools";
import { getAllDigests } from "@/lib/digests";
import { getAllUseCases } from "@/lib/use-cases";
import { getAllIndustries } from "@/lib/industries";
import { getAllToolComparisons } from "@/lib/tool-comparisons";
import { getAllIndustryToolRecs } from "@/lib/industry-tools";
import { getAllConceptIndustryPages } from "@/lib/concept-industry";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

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

  // Comparison pages
  const comparisons = getAllComparisons();
  const comparisonEntries: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${BASE_URL}/compare/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Glossary pages
  const glossaryTerms = getAllTerms();
  const glossaryEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/glossary`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...glossaryTerms.map((term) => ({
      url: `${BASE_URL}/glossary/${term.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  // Tool pages
  const toolCategories = getAllToolCategories();
  const toolEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...toolCategories.map((cat) => ({
      url: `${BASE_URL}/tools/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // Digest pages
  const digests = getAllDigests();
  const digestEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/digest`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...digests.map((d) => ({
      url: `${BASE_URL}/digest/${d.slug}`,
      lastModified: new Date(d.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  // Use-case pages
  const useCases = getAllUseCases();
  const useCaseEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/use-cases`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...useCases.map((uc) => ({
      url: `${BASE_URL}/use-cases/${uc.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // Industry stack pages
  const allIndustries = getAllIndustries();
  const industryStackEntries: MetadataRoute.Sitemap = allIndustries.map((ind) => ({
    url: `${BASE_URL}/ai-growth-for/${ind.slug}/stack`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Glossary category pages
  const glossaryCategories = getGlossaryCategories();
  const glossaryCategoryEntries: MetadataRoute.Sitemap = glossaryCategories.map((cat) => ({
    url: `${BASE_URL}/glossary/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Tool vs Tool comparison pages
  const toolComparisons = getAllToolComparisons();
  const toolComparisonEntries: MetadataRoute.Sitemap = toolComparisons.map((c) => ({
    url: `${BASE_URL}/compare/tools/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Individual tool profile pages
  const allTools = getAllTools();
  const toolProfileEntries: MetadataRoute.Sitemap = allTools.map(({ tool, category }) => ({
    url: `${BASE_URL}/tools/${category.slug}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Best tools for industry pages
  const industryToolRecs = getAllIndustryToolRecs();
  const industryToolEntries: MetadataRoute.Sitemap = industryToolRecs.map((r) => ({
    url: `${BASE_URL}/tools/${r.categorySlug}/for/${r.industrySlug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  // Concept × Industry learn pages
  const conceptIndustryPages = getAllConceptIndustryPages();
  const learnEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/learn`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...conceptIndustryPages.map((p) => ({
      url: `${BASE_URL}/learn/${p.conceptSlug}/for/${p.industrySlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];

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
      url: `${BASE_URL}/start-here`,
      lastModified: new Date(),
      changeFrequency: "monthly",
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
    ...industryStackEntries,
    ...useCaseEntries,
    ...comparisonEntries,
    ...glossaryEntries,
    ...glossaryCategoryEntries,
    ...toolEntries,
    ...toolProfileEntries,
    ...toolComparisonEntries,
    ...industryToolEntries,
    ...learnEntries,
    ...digestEntries,
  ];
}
