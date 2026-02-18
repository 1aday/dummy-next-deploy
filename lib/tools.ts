export interface Tool {
  name: string;
  description: string;
  pricing: string;
  bestFor: string;
  url: string;
}

export interface ToolCategory {
  slug: string;
  title: string;
  description: string;
  tools: Tool[];
  relatedPosts: string[];
}

export const toolCategories: ToolCategory[] = [
  {
    slug: "vector-databases",
    title: "Vector Databases",
    description:
      "Purpose-built databases for storing and querying high-dimensional vector embeddings. Essential infrastructure for RAG pipelines, semantic search, and recommendation systems.",
    tools: [
      {
        name: "Pinecone",
        description:
          "Fully managed vector database with zero operational overhead, excellent developer experience, and seamless scaling from prototype to billions of vectors.",
        pricing: "Free tier (100K vectors), then $70/mo Starter",
        bestFor: "Teams wanting managed simplicity at any scale",
        url: "https://www.pinecone.io",
      },
      {
        name: "Qdrant",
        description:
          "High-performance vector search engine written in Rust. Offers both cloud-managed and self-hosted options with excellent filtering and payload support.",
        pricing: "Free tier (1GB), then $25/mo cloud; open-source self-hosted",
        bestFor: "Performance-sensitive workloads with complex filtering needs",
        url: "https://qdrant.tech",
      },
      {
        name: "Weaviate",
        description:
          "Open-source vector database with built-in hybrid search combining vector and keyword matching. Strong module ecosystem for vectorization and ML integration.",
        pricing: "Free sandbox, then $25/mo Serverless; open-source self-hosted",
        bestFor: "Hybrid search use cases and teams wanting built-in vectorization",
        url: "https://weaviate.io",
      },
      {
        name: "pgvector",
        description:
          "PostgreSQL extension adding vector similarity search to your existing Postgres database. Supports IVFFlat and HNSW indexes with zero additional infrastructure.",
        pricing: "Free (open-source PostgreSQL extension)",
        bestFor: "Teams already on PostgreSQL with under 5M vectors",
        url: "https://github.com/pgvector/pgvector",
      },
      {
        name: "Chroma",
        description:
          "Developer-friendly, open-source embedding database designed for rapid prototyping. Simple Python API with in-memory and persistent storage modes.",
        pricing: "Free (open-source)",
        bestFor: "Prototyping, local development, and small-scale projects",
        url: "https://www.trychroma.com",
      },
    ],
    relatedPosts: [
      "vector-databases-comparison-2026",
      "rag-pipeline-mistakes",
      "embedding-models-2026",
    ],
  },
  {
    slug: "embedding-models",
    title: "Embedding Models",
    description:
      "Models that convert text, images, and other data into dense vector representations for similarity search, clustering, and retrieval. The quality of your embeddings determines the quality of your RAG and recommendation systems.",
    tools: [
      {
        name: "OpenAI text-embedding-3",
        description:
          "OpenAI's latest embedding models with flexible dimensionality (256-3072). Available in large and small variants, balancing quality and cost for different use cases.",
        pricing: "$0.02-0.13 per 1M tokens",
        bestFor: "Best general-purpose embeddings with flexible dimension tuning",
        url: "https://platform.openai.com/docs/guides/embeddings",
      },
      {
        name: "Cohere embed-v4",
        description:
          "State-of-the-art multilingual embedding model supporting 100+ languages with leading performance on cross-lingual retrieval benchmarks.",
        pricing: "Free trial, then $0.10 per 1M tokens",
        bestFor: "Multilingual applications and cross-language search",
        url: "https://cohere.com/embed",
      },
      {
        name: "BGE-M3",
        description:
          "Open-source embedding model from BAAI supporting multi-lingual, multi-granularity, and multi-function capabilities. Self-hostable with strong benchmark scores.",
        pricing: "Free (open-source, self-hosted compute costs)",
        bestFor: "Teams wanting full control and no API dependency",
        url: "https://huggingface.co/BAAI/bge-m3",
      },
      {
        name: "Voyage-3",
        description:
          "Specialized embedding model with state-of-the-art performance on code retrieval benchmarks. Optimized for technical documentation and code search.",
        pricing: "Free tier, then $0.06 per 1M tokens",
        bestFor: "Code search, technical documentation, and developer tools",
        url: "https://www.voyageai.com",
      },
    ],
    relatedPosts: [
      "embedding-models-2026",
      "embedding-models-benchmark-2026",
      "rag-pipeline-mistakes",
    ],
  },
  {
    slug: "llm-providers",
    title: "LLM Providers",
    description:
      "The major providers of Large Language Models for building AI-powered product features. Each offers different strengths in reasoning, cost, speed, and specialized capabilities.",
    tools: [
      {
        name: "OpenAI (GPT-4)",
        description:
          "The most widely adopted LLM platform with models ranging from GPT-4o-mini (fast, cheap) to GPT-4 Turbo (most capable). Strongest ecosystem of tools and integrations.",
        pricing: "GPT-4o-mini $0.15/1M in, GPT-4o $2.50/1M in",
        bestFor: "Broadest capabilities, best tool/function calling, largest ecosystem",
        url: "https://platform.openai.com",
      },
      {
        name: "Anthropic (Claude)",
        description:
          "Claude models with 200K token context windows, strong instruction following, and nuanced writing quality. Excels at long-document analysis and content generation.",
        pricing: "Haiku $0.25/1M in, Sonnet $3/1M in, Opus $15/1M in",
        bestFor: "Long-context tasks, content generation, and nuanced conversations",
        url: "https://www.anthropic.com",
      },
      {
        name: "Google (Gemini)",
        description:
          "Gemini models with native multimodal capabilities (text, image, video, audio). Deep integration with Google Cloud services and competitive pricing.",
        pricing: "Flash $0.075/1M in, Pro $1.25/1M in",
        bestFor: "Multimodal applications and Google Cloud-integrated workflows",
        url: "https://ai.google.dev",
      },
      {
        name: "Mistral",
        description:
          "European AI lab offering efficient models with strong performance-to-cost ratios. Open-weight models available for self-hosting alongside managed API access.",
        pricing: "Small $0.10/1M in, Medium $0.40/1M in, Large $2/1M in",
        bestFor: "Cost-efficient inference and self-hosting with open weights",
        url: "https://mistral.ai",
      },
      {
        name: "Meta (Llama)",
        description:
          "Open-source Llama models that can be self-hosted for full control over data and costs. Community fine-tunes available for specialized tasks.",
        pricing: "Free (open-source, self-hosted compute costs)",
        bestFor: "Full data control, custom fine-tuning, and eliminating API costs",
        url: "https://llama.meta.com",
      },
    ],
    relatedPosts: [
      "llm-cost-optimization-guide",
      "prompt-engineering-best-practices-2026",
      "fine-tuning-vs-prompting",
    ],
  },
  {
    slug: "analytics-platforms",
    title: "Analytics Platforms",
    description:
      "Product analytics tools for tracking user behavior, measuring growth metrics, and understanding feature adoption. The data foundation for AI-powered growth decisions.",
    tools: [
      {
        name: "Mixpanel",
        description:
          "Event-based analytics with powerful funnel analysis, retention cohorts, and user segmentation. Strong self-serve query interface for product teams.",
        pricing: "Free up to 20M events/mo, then $28/mo Growth",
        bestFor: "Product-led growth teams needing deep funnel and retention analysis",
        url: "https://mixpanel.com",
      },
      {
        name: "Amplitude",
        description:
          "Enterprise product analytics with behavioral cohorts, journey mapping, and built-in experimentation. Strong data governance and warehouse-native architecture.",
        pricing: "Free up to 50K MTU, then custom pricing",
        bestFor: "Enterprise teams needing behavioral analytics at scale",
        url: "https://amplitude.com",
      },
      {
        name: "PostHog",
        description:
          "Open-source product analytics with built-in feature flags, session recording, A/B testing, and surveys. Self-hostable for full data control.",
        pricing: "Free up to 1M events/mo, then $0.00031/event",
        bestFor: "Engineering-led teams wanting an all-in-one open-source stack",
        url: "https://posthog.com",
      },
      {
        name: "Heap",
        description:
          "Auto-capture analytics that retroactively tracks every user interaction without manual instrumentation. Ideal for teams that want analysis without upfront event planning.",
        pricing: "Free tier available, then custom pricing",
        bestFor: "Teams that want complete data capture without manual event tracking",
        url: "https://www.heap.io",
      },
    ],
    relatedPosts: [
      "ai-ab-testing",
      "predictive-churn-models",
      "conversion-optimization-ai",
    ],
  },
  {
    slug: "ab-testing-tools",
    title: "A/B Testing Tools",
    description:
      "Platforms for running controlled experiments to measure the impact of product changes. From simple feature flags to AI-powered multi-armed bandits for continuous optimization.",
    tools: [
      {
        name: "LaunchDarkly",
        description:
          "Enterprise feature management platform with sophisticated targeting, progressive rollouts, and experimentation. The most mature feature flag platform available.",
        pricing: "Free up to 1K MAU, then $10/seat/mo Pro",
        bestFor: "Enterprise teams needing robust feature management and targeting",
        url: "https://launchdarkly.com",
      },
      {
        name: "Statsig",
        description:
          "Feature flags and experimentation platform with built-in statistical rigor, auto-analysis, and warehouse-native metrics. Strong focus on measurement.",
        pricing: "Free up to 1M events, then $150/mo Pro",
        bestFor: "Data-driven teams wanting automated experiment analysis",
        url: "https://statsig.com",
      },
      {
        name: "Optimizely",
        description:
          "Full-stack experimentation platform for web, mobile, and server-side testing. AI-powered traffic allocation and multi-armed bandit support.",
        pricing: "Custom pricing (enterprise-focused)",
        bestFor: "Enterprise teams running experiments across web and product surfaces",
        url: "https://www.optimizely.com",
      },
      {
        name: "GrowthBook",
        description:
          "Open-source feature flagging and experimentation platform with Bayesian statistics, warehouse-native metrics, and a self-hostable architecture.",
        pricing: "Free (open-source), Cloud from $75/mo",
        bestFor: "Teams wanting open-source experimentation with Bayesian analysis",
        url: "https://www.growthbook.io",
      },
    ],
    relatedPosts: [
      "ai-ab-testing",
      "conversion-optimization-ai",
      "ai-product-growth-2026",
    ],
  },
  {
    slug: "personalization-platforms",
    title: "Personalization Platforms",
    description:
      "AI-powered platforms for delivering personalized content, product recommendations, and user experiences at scale. From rules-based segmentation to real-time ML-driven personalization.",
    tools: [
      {
        name: "Dynamic Yield",
        description:
          "Enterprise personalization platform with AI-powered product recommendations, content personalization, and triggered messaging across web, mobile, and email.",
        pricing: "Custom pricing (enterprise-focused)",
        bestFor: "E-commerce and media companies needing omnichannel personalization",
        url: "https://www.dynamicyield.com",
      },
      {
        name: "Algolia",
        description:
          "AI-powered search and discovery platform with personalized ranking, recommendations, and merchandising. Sub-50ms search latency at any scale.",
        pricing: "Free up to 10K requests/mo, then $1/1K requests",
        bestFor: "Fast, personalized search experiences for e-commerce and content sites",
        url: "https://www.algolia.com",
      },
      {
        name: "Bloomreach",
        description:
          "Commerce experience platform combining search, merchandising, content, and marketing automation with AI-driven personalization across the entire customer journey.",
        pricing: "Custom pricing (commerce-focused)",
        bestFor: "Commerce companies wanting unified search, merch, and personalization",
        url: "https://www.bloomreach.com",
      },
      {
        name: "Recombee",
        description:
          "AI recommendation engine with real-time learning, content-based and collaborative filtering, and easy API integration. Updates recommendations as users interact.",
        pricing: "Free up to 100K API calls/mo, then $99/mo",
        bestFor: "Adding recommendation features quickly with minimal ML expertise",
        url: "https://www.recombee.com",
      },
    ],
    relatedPosts: [
      "ai-personalization-scale",
      "personalization-engines",
      "embedding-recommendations",
    ],
  },
];

export function getAllToolCategories(): ToolCategory[] {
  return toolCategories;
}

export function getToolCategoryBySlug(slug: string): ToolCategory | undefined {
  return toolCategories.find((c) => c.slug === slug);
}
