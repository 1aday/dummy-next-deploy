import type { GlossaryCategory } from "./types";

export const glossaryCategoryMeta: Record<
  GlossaryCategory,
  { name: string; description: string }
> = {
  "ai-fundamentals": {
    name: "AI Fundamentals",
    description:
      "Core concepts in artificial intelligence and machine learning — from transformer architectures and embeddings to prompt engineering and RAG pipelines.",
  },
  growth: {
    name: "Growth Metrics & Strategy",
    description:
      "Key metrics and frameworks for measuring and driving product growth — churn, activation, viral loops, NRR, and product-led growth strategies.",
  },
  engineering: {
    name: "AI Engineering",
    description:
      "The tools and practices for building, deploying, and operating AI systems in production — MLOps, model serving, feature flags, and experimentation.",
  },
  data: {
    name: "Data & Pipelines",
    description:
      "Data foundations for AI systems — pipelines, warehouses, feature stores, statistical methods, and the infrastructure that powers AI features.",
  },
  "ai-agents": {
    name: "AI Agents",
    description:
      "Autonomous AI systems that reason, plan, and use tools — agentic workflows, multi-agent systems, MCP, and human-in-the-loop patterns.",
  },
  seo: {
    name: "SEO & Search",
    description:
      "Search engine optimization fundamentals — Core Web Vitals, technical SEO, content strategy, structured data, and programmatic SEO at scale.",
  },
  marketing: {
    name: "Marketing & CRO",
    description:
      "Marketing strategy and conversion optimization — funnels, attribution, lead scoring, ABM, and demand generation frameworks.",
  },
  adtech: {
    name: "AdTech & Programmatic",
    description:
      "Advertising technology infrastructure — programmatic buying, DSPs, SSPs, measurement, attribution, and privacy-first targeting.",
  },
  personalization: {
    name: "Personalization & Recommendations",
    description:
      "Recommendation engines, collaborative filtering, user segmentation, dynamic pricing, and ML-driven personalization at scale.",
  },
  analytics: {
    name: "Analytics & Measurement",
    description:
      "Event tracking, funnel analysis, cohort analysis, experimentation frameworks, and building a culture of data-driven decisions.",
  },
  product: {
    name: "Product Management",
    description:
      "Product strategy and execution — discovery, prioritization frameworks, agile methods, OKRs, and building products users love.",
  },
  infrastructure: {
    name: "Infrastructure & DevOps",
    description:
      "Cloud infrastructure, CDNs, serverless, containers, caching, databases, and the operational foundations for scalable systems.",
  },
  experimentation: {
    name: "Experimentation & Causal Inference",
    description:
      "Statistical methods and frameworks for running rigorous experiments — A/B testing, multivariate testing, causal inference, bandit algorithms, and growth experimentation at scale.",
  },
  testing: {
    name: "Product & Ad Testing",
    description:
      "Testing methodologies across product, UX, engineering, and advertising — from usability testing and QA to creative testing, brand lift studies, and conversion optimization.",
  },
};

export const categoryColors: Record<GlossaryCategory, string> = {
  "ai-fundamentals": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  growth: "bg-green-500/10 text-green-500 border-green-500/20",
  engineering: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  data: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "ai-agents": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  seo: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  marketing: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  adtech: "bg-red-500/10 text-red-500 border-red-500/20",
  personalization: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  analytics: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  product: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  infrastructure: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  experimentation: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  testing: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

export const categoryLabels: Record<GlossaryCategory, string> = Object.fromEntries(
  Object.entries(glossaryCategoryMeta).map(([key, val]) => [key, val.name])
) as Record<GlossaryCategory, string>;
