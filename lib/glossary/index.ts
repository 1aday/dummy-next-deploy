export type { GlossaryTerm, GlossaryCategory } from "./types";
export { glossaryCategoryMeta, categoryColors, categoryLabels } from "./categories";

import type { GlossaryTerm, GlossaryCategory } from "./types";
import { glossaryCategoryMeta } from "./categories";

import { aiFundamentalsTerms } from "./terms/ai-fundamentals";
import { growthTerms } from "./terms/growth";
import { engineeringTerms } from "./terms/engineering";
import { dataTerms } from "./terms/data";
import { aiAgentsTerms } from "./terms/ai-agents";
import { seoTerms } from "./terms/seo";
import { marketingTerms } from "./terms/marketing";
import { adtechTerms } from "./terms/adtech";
import { personalizationTerms } from "./terms/personalization";
import { analyticsTerms } from "./terms/analytics";
import { productTerms } from "./terms/product";
import { infrastructureTerms } from "./terms/infrastructure";
import { experimentationTerms } from "./terms/experimentation";
import { testingTerms } from "./terms/testing";

const allTerms: GlossaryTerm[] = [
  ...aiFundamentalsTerms,
  ...growthTerms,
  ...engineeringTerms,
  ...dataTerms,
  ...aiAgentsTerms,
  ...seoTerms,
  ...marketingTerms,
  ...adtechTerms,
  ...personalizationTerms,
  ...analyticsTerms,
  ...productTerms,
  ...infrastructureTerms,
  ...experimentationTerms,
  ...testingTerms,
];

export function getAllTerms(): GlossaryTerm[] {
  return [...allTerms].sort((a, b) => a.term.localeCompare(b.term));
}

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return allTerms.find((t) => t.slug === slug);
}

export function getGlossaryCategories(): GlossaryCategory[] {
  return Object.keys(glossaryCategoryMeta) as GlossaryCategory[];
}

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return allTerms
    .filter((t) => t.category === category)
    .sort((a, b) => a.term.localeCompare(b.term));
}

export function getRelatedTerms(
  term: GlossaryTerm,
  limit = 6
): GlossaryTerm[] {
  // First, include explicitly listed related terms
  const explicit = term.relatedTerms
    .map((slug) => allTerms.find((t) => t.slug === slug))
    .filter(Boolean) as GlossaryTerm[];

  if (explicit.length >= limit) return explicit.slice(0, limit);

  // Fill remaining slots with same-category terms
  const explicitSlugs = new Set([term.slug, ...term.relatedTerms]);
  const sameCategory = allTerms
    .filter((t) => t.category === term.category && !explicitSlugs.has(t.slug))
    .slice(0, limit - explicit.length);

  return [...explicit, ...sameCategory].slice(0, limit);
}
