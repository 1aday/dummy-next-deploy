export interface Comparison {
  slug: string;
  title: string;
  description: string;
  itemA: { name: string; pros: string[]; cons: string[]; bestFor: string };
  itemB: { name: string; pros: string[]; cons: string[]; bestFor: string };
  verdict: string;
  criteria: { name: string; itemA: string; itemB: string }[];
  relatedPosts: string[];
}

export const comparisons: Comparison[] = [
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs Fine-Tuning: Which Approach Should You Choose?",
    description:
      "A detailed comparison of Retrieval-Augmented Generation and fine-tuning for building AI-powered products. Understand the trade-offs in cost, accuracy, freshness, and operational complexity.",
    itemA: {
      name: "RAG (Retrieval-Augmented Generation)",
      pros: [
        "Data stays up-to-date without retraining the model",
        "Full source attribution and traceability for every answer",
        "Lower upfront cost — no GPU training runs required",
        "Easy to add, remove, or correct knowledge on the fly",
      ],
      cons: [
        "Latency overhead from retrieval step (50-200 ms typical)",
        "Quality depends heavily on chunking and embedding strategy",
        "Requires a vector database as additional infrastructure",
      ],
      bestFor:
        "Products that need current, verifiable answers grounded in your own data — support bots, documentation search, internal knowledge bases.",
    },
    itemB: {
      name: "Fine-Tuning",
      pros: [
        "Consistent style, tone, and domain-specific reasoning",
        "Lower inference latency — no retrieval step needed",
        "Can learn patterns that are hard to express in prompts",
        "Smaller model can match larger model quality on narrow tasks",
      ],
      cons: [
        "Expensive to train and iterate ($500-$5,000+ per run)",
        "Knowledge becomes stale — requires periodic retraining",
        "Needs 500-5,000 high-quality training examples minimum",
        "Risk of catastrophic forgetting on general capabilities",
      ],
      bestFor:
        "Narrow, well-defined tasks requiring consistent output format — classification, extraction, code generation in a specific framework.",
    },
    verdict:
      "For most product teams, RAG is the right starting point. It offers faster iteration, lower cost, and built-in source attribution that users trust. Fine-tuning shines when you need a smaller, cheaper model for a well-defined task, or when style and tone consistency is critical. The best production systems often combine both: a fine-tuned model for core reasoning with RAG for grounding answers in current data.",
    criteria: [
      {
        name: "Setup Cost",
        itemA: "Low — vector DB + embedding pipeline",
        itemB: "High — curated dataset + GPU training",
      },
      {
        name: "Data Freshness",
        itemA: "Real-time — update docs anytime",
        itemB: "Stale — requires retraining cycle",
      },
      {
        name: "Inference Latency",
        itemA: "Higher (retrieval adds 50-200 ms)",
        itemB: "Lower (single model call)",
      },
      {
        name: "Accuracy on Domain Tasks",
        itemA: "Good with quality retrieval",
        itemB: "Excellent with sufficient data",
      },
      {
        name: "Operational Complexity",
        itemA: "Medium — vector DB maintenance",
        itemB: "High — training pipeline + evaluation",
      },
    ],
    relatedPosts: [
      "rag-pipeline-mistakes",
      "fine-tuning-vs-prompting",
      "llm-cost-optimization-guide",
    ],
  },
  {
    slug: "pinecone-vs-pgvector",
    title: "Pinecone vs pgvector: Vector Database Showdown",
    description:
      "Comparing the leading managed vector database with PostgreSQL's native vector extension. Which is right for your RAG pipeline at different scales and budgets?",
    itemA: {
      name: "Pinecone",
      pros: [
        "Zero operational overhead — fully managed service",
        "Scales seamlessly from thousands to billions of vectors",
        "Purpose-built indexing for fast similarity search",
        "Rich filtering and metadata support out of the box",
      ],
      cons: [
        "Vendor lock-in with proprietary API",
        "Costs escalate quickly at high vector counts ($70+/mo)",
        "Another service to manage in your infrastructure stack",
        "Data residency options more limited than self-hosted",
      ],
      bestFor:
        "Teams that want to move fast without managing infrastructure, especially at 1M+ vector scale where performance tuning matters.",
    },
    itemB: {
      name: "pgvector",
      pros: [
        "Uses your existing PostgreSQL — no new infrastructure",
        "ACID transactions across vector and relational data",
        "No additional cost if you already run Postgres",
        "Full control over data residency and backups",
      ],
      cons: [
        "Performance degrades beyond 5-10M vectors without careful tuning",
        "Indexing (IVFFlat/HNSW) requires manual configuration",
        "Missing advanced features like hybrid search out of the box",
        "Competes for resources with your transactional workload",
      ],
      bestFor:
        "Early-stage products with under 1M vectors, teams already on PostgreSQL who want to minimize infrastructure, and projects requiring ACID guarantees across vector and relational data.",
    },
    verdict:
      "Start with pgvector if you already have PostgreSQL and fewer than 1M vectors. It eliminates operational overhead and keeps your stack simple. Move to Pinecone (or Qdrant) when you hit performance ceilings, need advanced filtering at scale, or want to decouple vector workloads from your transactional database. Many successful teams start with pgvector and migrate later — the embedding interface is largely the same.",
    criteria: [
      {
        name: "Setup Complexity",
        itemA: "Minutes — API key and SDK",
        itemB: "Easy if on Postgres, extension install",
      },
      {
        name: "Cost at 100K Vectors",
        itemA: "$70/mo (Starter plan)",
        itemB: "Free (part of existing Postgres)",
      },
      {
        name: "Cost at 10M Vectors",
        itemA: "$250-500/mo (Standard plan)",
        itemB: "Postgres compute costs + tuning time",
      },
      {
        name: "Query Latency (p99)",
        itemA: "<50 ms at any scale",
        itemB: "<20 ms at small scale, degrades at 5M+",
      },
      {
        name: "Hybrid Search",
        itemA: "Built-in keyword + vector search",
        itemB: "Requires manual BM25 integration",
      },
    ],
    relatedPosts: [
      "vector-databases-comparison-2026",
      "rag-pipeline-mistakes",
      "embedding-models-2026",
    ],
  },
  {
    slug: "gpt4-vs-claude-for-growth",
    title: "GPT-4 vs Claude for Growth Engineering",
    description:
      "Comparing OpenAI's GPT-4 and Anthropic's Claude for growth-focused AI features — from personalization and content generation to analytics and user engagement.",
    itemA: {
      name: "GPT-4 (OpenAI)",
      pros: [
        "Largest ecosystem of tools, SDKs, and community resources",
        "Strong function calling and structured output support",
        "Excellent code generation and data analysis capabilities",
        "Widest model selection from GPT-4o-mini to GPT-4 Turbo",
      ],
      cons: [
        "Rate limits can be restrictive for high-volume growth features",
        "Content filtering can be overly aggressive for some use cases",
        "Higher cost per token compared to Claude for long-context tasks",
      ],
      bestFor:
        "Teams building multi-modal growth features, needing strong function calling for tool-use agents, or requiring the broadest ecosystem compatibility.",
    },
    itemB: {
      name: "Claude (Anthropic)",
      pros: [
        "200K token context window handles massive documents natively",
        "More nuanced, less formulaic writing style for content generation",
        "Strong instruction following with fewer guardrail false positives",
        "Competitive pricing especially for long-context workloads",
      ],
      cons: [
        "Smaller ecosystem and fewer third-party integrations",
        "Less mature function calling compared to GPT-4",
        "Fewer model size options for cost optimization",
      ],
      bestFor:
        "Growth teams focused on content personalization, long-form generation, user communication, and tasks requiring nuanced understanding of context.",
    },
    verdict:
      "Both models are excellent for growth engineering. GPT-4 edges ahead for structured, tool-heavy workflows — think personalization APIs, analytics pipelines, and multi-step agents. Claude excels at content-heavy growth features — email personalization, onboarding conversations, and any task where natural language quality directly impacts conversion. Many growth teams use both: GPT-4 for backend pipelines and Claude for user-facing content. The cost difference is often negligible compared to the engineering time saved by picking the right tool for each job.",
    criteria: [
      {
        name: "Content Generation Quality",
        itemA: "Very good, can feel formulaic",
        itemB: "Excellent, more natural and varied",
      },
      {
        name: "Function Calling / Tool Use",
        itemA: "Best-in-class, reliable JSON",
        itemB: "Good, improving rapidly",
      },
      {
        name: "Context Window",
        itemA: "128K tokens",
        itemB: "200K tokens",
      },
      {
        name: "Cost per 1M Tokens (Input)",
        itemA: "$2.50 (GPT-4o)",
        itemB: "$3.00 (Claude 3.5 Sonnet)",
      },
      {
        name: "Personalization Tasks",
        itemA: "Strong with structured prompts",
        itemB: "Strong with nuanced instructions",
      },
    ],
    relatedPosts: [
      "prompt-engineering-best-practices-2026",
      "llm-cost-optimization-guide",
      "ai-personalization-scale",
    ],
  },
  {
    slug: "rules-vs-ai-personalization",
    title: "Rules-Based vs AI Personalization: When to Upgrade",
    description:
      "Should you stick with if-then rules or invest in ML-powered personalization? A practical comparison covering complexity, cost, effectiveness, and the right migration timing.",
    itemA: {
      name: "Rules-Based Personalization",
      pros: [
        "Easy to understand, debug, and explain to stakeholders",
        "No data science team required — product managers can own it",
        "Deterministic outcomes make testing straightforward",
        "Works well with small user bases (under 10K MAU)",
      ],
      cons: [
        "Doesn't scale — 50 rules becomes a maintenance nightmare",
        "Misses subtle behavioral patterns humans can't spot",
        "Static segments ignore individual user nuance",
        "Manual updates can't keep pace with changing user behavior",
      ],
      bestFor:
        "Early-stage products with fewer than 10K MAU, teams without data science resources, and simple personalization needs (industry, role, plan tier).",
    },
    itemB: {
      name: "AI-Powered Personalization",
      pros: [
        "Discovers patterns across thousands of behavioral signals",
        "Scales to millions of users without linear complexity growth",
        "Adapts automatically as user behavior evolves",
        "Individual-level personalization, not just segment-level",
      ],
      cons: [
        "Requires meaningful training data (usually 10K+ users)",
        "Black-box decisions harder to explain to stakeholders",
        "Higher upfront engineering investment (3-6 month build)",
        "Cold-start problem for new users with no behavioral history",
      ],
      bestFor:
        "Products with 10K+ MAU generating rich behavioral data, teams with data science capability, and use cases where personalization directly drives revenue.",
    },
    verdict:
      "Start with rules. Seriously. Rules-based personalization at 80% effectiveness ships in a week. AI personalization at 95% effectiveness takes months. The right migration point is when you notice: (1) your rule set exceeds 30-40 rules and becomes fragile, (2) you have enough data (10K+ users) to train meaningful models, and (3) the incremental lift from better personalization justifies the engineering investment. Most companies migrate too early. Ship rules first, measure the baseline, then upgrade to AI when the data supports it.",
    criteria: [
      {
        name: "Time to First Value",
        itemA: "Days to weeks",
        itemB: "Months (data collection + model training)",
      },
      {
        name: "Effectiveness",
        itemA: "Good (70-80% of potential)",
        itemB: "Excellent (90-95% of potential)",
      },
      {
        name: "Maintenance Cost",
        itemA: "Low initially, grows linearly with rules",
        itemB: "High initially, scales sub-linearly",
      },
      {
        name: "Data Requirements",
        itemA: "Minimal — segment definitions only",
        itemB: "Significant — 10K+ users with behavioral data",
      },
      {
        name: "Explainability",
        itemA: "Fully transparent and auditable",
        itemB: "Requires additional tooling (SHAP, LIME)",
      },
    ],
    relatedPosts: [
      "ai-personalization-scale",
      "personalization-engines",
      "conversational-onboarding",
    ],
  },
  {
    slug: "traditional-vs-ai-ab-testing",
    title: "Traditional vs AI-Powered A/B Testing",
    description:
      "How does AI change A/B testing? Compare classical frequentist testing with multi-armed bandits and Bayesian approaches for faster, smarter experimentation.",
    itemA: {
      name: "Traditional A/B Testing",
      pros: [
        "Well-understood statistical framework with decades of validation",
        "Clear, binary outcomes — winner or no winner",
        "Easy to explain results to non-technical stakeholders",
        "No risk of premature optimization on noisy signals",
      ],
      cons: [
        "Requires large sample sizes (often 2-4 weeks per test)",
        "Opportunity cost from showing losing variants to 50% of users",
        "Can only test a few variables at a time",
        "Fixed allocation can't adapt to emerging winning variants",
      ],
      bestFor:
        "High-stakes decisions like pricing changes, major feature launches, and any test where false positives are expensive.",
    },
    itemB: {
      name: "AI-Powered A/B Testing",
      pros: [
        "Multi-armed bandits automatically shift traffic to winners",
        "Contextual bandits personalize variants per user segment",
        "Bayesian methods quantify confidence continuously",
        "Can test dozens of variants simultaneously",
      ],
      cons: [
        "More complex to implement and interpret correctly",
        "Risk of exploitation bias — converging too early on local optima",
        "Requires engineering investment in real-time allocation systems",
        "Harder to calculate exact statistical significance",
      ],
      bestFor:
        "High-volume, lower-stakes optimizations like email subject lines, content recommendations, UI micro-copy, and any scenario where you test frequently.",
    },
    verdict:
      "Use traditional A/B testing for important, irreversible decisions where statistical rigor matters most. Use AI-powered testing for continuous optimization on high-traffic surfaces. The ideal setup combines both: Bayesian methods for rapid screening of many variants, followed by traditional tests to validate winners. Most growth teams should start with standard A/B testing (tools like LaunchDarkly or GrowthBook make it trivial) and layer in bandits for their highest-traffic optimization surfaces.",
    criteria: [
      {
        name: "Time to Conclusion",
        itemA: "2-4 weeks typical",
        itemB: "Days, with continuous improvement",
      },
      {
        name: "Traffic Requirements",
        itemA: "High (statistical power needs)",
        itemB: "Lower (adaptive allocation)",
      },
      {
        name: "Number of Variants",
        itemA: "2-4 practical maximum",
        itemB: "Dozens with bandit algorithms",
      },
      {
        name: "Statistical Rigor",
        itemA: "Gold standard (frequentist guarantees)",
        itemB: "Good (Bayesian credible intervals)",
      },
      {
        name: "Implementation Complexity",
        itemA: "Low — many off-the-shelf tools",
        itemB: "Medium — needs real-time allocation engine",
      },
    ],
    relatedPosts: [
      "ai-ab-testing",
      "conversion-optimization-ai",
      "ai-personalization-scale",
    ],
  },
];

export function getAllComparisons(): Comparison[] {
  return comparisons;
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}
