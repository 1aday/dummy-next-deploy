export type GlossaryCategory =
  | "ai-fundamentals"
  | "growth"
  | "engineering"
  | "data"
  | "ai-agents"
  | "seo"
  | "marketing"
  | "adtech"
  | "personalization"
  | "analytics"
  | "product"
  | "infrastructure"
  | "experimentation"
  | "testing";

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  explanation: string;
  category: GlossaryCategory;
  relatedTerms: string[];
  relatedPosts: string[];
}
