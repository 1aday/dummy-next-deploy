export interface IndustryToolRec {
  category: string;
  categorySlug: string;
  industry: string;
  industrySlug: string;
  tools: string[];
  relatedPosts: string[];
  decisionFramework: string;
  recommendations: { tool: string; toolName: string; toolSlug: string; reason: string; bestFor: string; rating: string }[];
}

export function getAllIndustryToolRecs(): IndustryToolRec[] {
  return [];
}

export function getIndustryToolRec(
  category: string,
  industry: string
): IndustryToolRec | undefined {
  return getAllIndustryToolRecs().find(
    (r) => r.category === category && r.industry === industry
  );
}
