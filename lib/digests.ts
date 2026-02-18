export interface Digest {
  slug: string;
  title: string;
  date: string;
  number: number;
  intro: string;
  items: {
    title: string;
    description: string;
    postSlug?: string;
    url?: string;
  }[];
}

export const digests: Digest[] = [
  {
    slug: "digest-001",
    title: "AI Growth Stack Weekly #1",
    date: "2026-01-06",
    number: 1,
    intro:
      "Welcome to the first AI Growth Stack Weekly. This week we're covering the foundations: RAG pipelines that actually work, how growth loops compound with AI, and the embedding models worth your attention in 2026.",
    items: [
      {
        title: "The 7 RAG Pipeline Mistakes Everyone Makes",
        description:
          "Most RAG implementations fail not because of the LLM, but because of bad chunking, wrong embedding models, or missing re-ranking. We break down the seven most common mistakes and how to fix each one.",
        postSlug: "rag-pipeline-mistakes",
      },
      {
        title: "Building Growth Loops with LLMs",
        description:
          "AI-powered growth loops create self-reinforcing cycles where each user's activity generates inputs that attract more users. Learn the three loop archetypes that work best for AI-native products.",
        postSlug: "llm-growth-loops",
      },
      {
        title: "Embedding Models Benchmark 2026",
        description:
          "We benchmarked OpenAI, Cohere, Voyage, and BGE models on real-world retrieval tasks. The results surprised us — the most expensive model isn't always the best for your use case.",
        postSlug: "embedding-models-benchmark-2026",
      },
      {
        title: "Understanding Embedding Models in 2026",
        description:
          "A comprehensive overview of the embedding landscape, from choosing the right model dimensions to evaluating multilingual performance and cost trade-offs.",
        postSlug: "embedding-models-2026",
      },
      {
        title: "Hacker News: RAG is Eating the World",
        description:
          "A great discussion thread on the current state of RAG adoption in production, with insights from engineers at Notion, Linear, and Vercel on what's actually working.",
        url: "https://news.ycombinator.com",
      },
    ],
  },
  {
    slug: "digest-002",
    title: "AI Growth Stack Weekly #2",
    date: "2026-01-13",
    number: 2,
    intro:
      "This week's focus: retention and personalization. We dive into churn prediction models that actually prevent cancellations, AI personalization at scale, and the latest thinking on A/B testing with ML.",
    items: [
      {
        title: "Predictive Churn Models That Work",
        description:
          "Building a churn model that's 80% accurate is easy. Building one that actually prevents churn is hard. We cover the feature engineering, intervention framework, and feedback loops that make the difference.",
        postSlug: "predictive-churn-models",
      },
      {
        title: "AI Personalization at Scale",
        description:
          "From segment-level rules to individual-level ML: the personalization maturity model and how to move up it without rebuilding your entire stack.",
        postSlug: "ai-personalization-scale",
      },
      {
        title: "AI-Powered A/B Testing: Beyond the Basics",
        description:
          "Multi-armed bandits, contextual bandits, and Bayesian methods are changing how growth teams experiment. Learn when each approach makes sense and how to implement them.",
        postSlug: "ai-ab-testing",
      },
      {
        title: "Personalization Engines for Growth",
        description:
          "A deep dive into recommendation system architectures — collaborative filtering, content-based, and the hybrid approaches that work best in practice.",
        postSlug: "personalization-engines",
      },
      {
        title: "Research: The Impact of Real-Time Personalization on NRR",
        description:
          "New research showing that companies with real-time personalization maintain 15-25% higher net revenue retention than those using batch personalization approaches.",
        url: "https://arxiv.org",
      },
    ],
  },
  {
    slug: "digest-003",
    title: "AI Growth Stack Weekly #3",
    date: "2026-01-20",
    number: 3,
    intro:
      "This week we're going deep on the AI engineering side: prompt engineering patterns that ship reliable features, the fine-tuning decision framework, and how to cut LLM costs by 80% without sacrificing quality.",
    items: [
      {
        title: "Prompt Engineering Best Practices for 2026",
        description:
          "System prompts, few-shot examples, chain-of-thought, and structured output — the patterns that turn unreliable LLM experiments into production-ready features.",
        postSlug: "prompt-engineering-best-practices-2026",
      },
      {
        title: "Fine-Tuning vs Prompting: Making the Right Call",
        description:
          "90% of teams that jump to fine-tuning should have stuck with prompt engineering. Here's the decision framework, data requirements, and hybrid approaches that work.",
        postSlug: "fine-tuning-vs-prompting",
      },
      {
        title: "The LLM Cost Optimization Guide",
        description:
          "Model routing, semantic caching, prompt compression, and batch processing — a practical playbook for cutting LLM costs from $9K/month to $500 without losing quality.",
        postSlug: "llm-cost-optimization-guide",
      },
      {
        title: "Conversion Optimization with AI",
        description:
          "How AI transforms conversion optimization from incremental button-color tests to systematic journey optimization across your entire funnel.",
        postSlug: "conversion-optimization-ai",
      },
      {
        title: "OpenAI Batch API: 50% Cost Reduction",
        description:
          "OpenAI's batch API offers 50% off for non-real-time workloads. We explore which growth use cases should migrate to batch processing for massive cost savings.",
        url: "https://platform.openai.com/docs/guides/batch",
      },
    ],
  },
];

export function getAllDigests(): Digest[] {
  return digests.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

export function getDigestBySlug(slug: string): Digest | undefined {
  return digests.find((d) => d.slug === slug);
}
