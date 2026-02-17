export interface Guide {
  slug: string;
  title: string;
  description: string;
  icon: string;
  tagline: string;
  relatedTags: string[];
  sections: {
    title: string;
    content: string;
    linkedPosts: string[];
  }[];
}

export const guides: Guide[] = [
  {
    slug: "ai-product-growth",
    title: "The Complete Guide to AI-Powered Product Growth",
    description: "From growth loops to viral mechanics, learn how AI transforms every stage of the product growth funnel. A comprehensive guide covering acquisition, activation, retention, and monetization strategies powered by machine learning.",
    icon: "rocket",
    tagline: "Master every stage of the AI-powered growth funnel",
    relatedTags: ["Product Growth", "AI", "Growth Strategy", "Growth Loops"],
    sections: [
      {
        title: "Why AI Changes Everything About Growth",
        content: `Traditional growth strategies rely on static rules: if user does X, show them Y. AI-powered growth is fundamentally different. Instead of rules, you build systems that learn, adapt, and improve automatically.

The shift is massive. Companies using AI-driven growth loops see 2-5x improvement in key metrics within 6 months. Not because AI is magic, but because it enables personalization at a scale that's impossible manually.

Consider this: a typical SaaS product has 50-100 meaningful user actions. A growth team might create rules for 10-15 of these. An ML model can optimize responses to all of them simultaneously, learning patterns humans would never spot.

The best part? AI growth compounds. Each user interaction trains your models, making them better for the next user. This creates a data flywheel that becomes your strongest moat.`,
        linkedPosts: ["ai-product-growth-2026", "llm-growth-loops"],
      },
      {
        title: "Growth Loops: The Engine of AI-Native Products",
        content: `Growth loops replace the traditional funnel model. Instead of a linear path (acquire → activate → retain), loops create self-reinforcing cycles where each user's actions generate value that attracts more users.

**AI-Enhanced Viral Loops**: Use LLMs to generate shareable content from user activity. When a user completes an analysis, auto-generate a summary they can share. Each share brings new users who create more shareable content.

**Data Network Effects**: Each user's data improves the product for everyone. Recommendation engines get smarter, predictions get more accurate, and personalization gets more relevant.

**Content Loops**: AI generates SEO-optimized content from user-generated data, attracting organic traffic that feeds back into the product.

The key insight: AI doesn't just optimize existing loops—it enables entirely new loop types that weren't possible before.`,
        linkedPosts: ["llm-growth-loops", "viral-loops-with-ai"],
      },
      {
        title: "Acquisition: AI-Driven User Acquisition",
        content: `AI transforms acquisition from a spend-more-to-get-more game into a compound-interest machine.

**Predictive Lead Scoring**: Instead of treating all leads equally, ML models score leads in real-time based on behavioral signals. This lets you focus ad spend on high-probability converters, typically reducing CAC by 30-50%.

**AI-Powered SEO**: Use LLMs to generate programmatic SEO pages, optimize existing content, and identify content gaps. Companies doing this see 3-5x organic traffic growth within 12 months.

**Conversational Acquisition**: Deploy AI chatbots that qualify leads, answer technical questions, and guide prospects through the decision process—all without human intervention.

The compound effect is key: better targeting → lower CAC → more budget for experiments → faster learning → even better targeting.`,
        linkedPosts: ["ai-seo-content-generation", "predictive-lead-scoring", "conversational-onboarding"],
      },
      {
        title: "Activation & Onboarding: Personalized First Experiences",
        content: `The first 5 minutes determine whether a user becomes a customer or a churn statistic. AI makes those minutes count.

**Adaptive Onboarding Flows**: Instead of one-size-fits-all onboarding, use ML to detect user intent from their first actions and customize the flow. Technical users skip tutorials. Business users get guided setup.

**Conversational Onboarding**: LLM-powered assistants that understand user goals and guide them to their "aha moment" faster. This alone can lift activation rates by 20-40%.

**Predictive Activation**: Models that predict churn risk during onboarding, triggering proactive interventions before users drop off.

The compound effect here is powerful: better activation → more engaged users → more behavioral data → better activation models.`,
        linkedPosts: ["conversational-onboarding"],
      },
      {
        title: "Retention & Engagement: Keeping Users Coming Back",
        content: `Retention is where AI delivers its biggest ROI. A 5% improvement in retention can increase lifetime value by 25-95%.

**Churn Prediction**: ML models that identify at-risk users weeks before they leave, giving you time to intervene. The best models achieve 80%+ accuracy at predicting 30-day churn.

**Personalized Re-engagement**: Instead of blast emails, AI crafts personalized messages based on each user's behavior patterns, optimal send times, and content preferences.

**Dynamic Feature Discovery**: AI surfaces relevant features users haven't tried yet, based on what similar users found valuable. This is how products like Spotify keep users engaged for years.

**AI-Powered Customer Success**: Automate health scoring, identify expansion opportunities, and trigger personalized outreach at exactly the right moment.`,
        linkedPosts: ["predictive-churn-models", "ai-personalization-scale", "personalization-engines"],
      },
      {
        title: "Monetization: AI-Optimized Revenue",
        content: `AI doesn't just help you get and keep users—it helps you maximize the revenue from each one.

**Dynamic Pricing**: ML models that optimize pricing based on user behavior, market conditions, willingness to pay, and competitive positioning. Companies implementing this see 10-25% revenue lifts.

**Personalized Upsells**: Instead of showing the same upgrade prompt to everyone, AI identifies the right upsell, at the right time, with the right message for each user.

**Usage-Based Optimization**: For usage-based pricing models, AI predicts usage patterns and recommends plan adjustments that increase both customer value and revenue.

**Conversion Optimization**: AI-powered A/B testing that goes beyond simple button colors to optimize entire user journeys, pricing pages, and upgrade flows simultaneously.`,
        linkedPosts: ["dynamic-pricing-ml", "conversion-optimization-ai", "ai-ab-testing"],
      },
    ],
  },
  {
    slug: "llms-for-product-teams",
    title: "LLMs for Product Teams: A Practical Guide",
    description: "Everything product teams need to know about building with Large Language Models. From prompt engineering to fine-tuning decisions, cost optimization, and production deployment patterns.",
    icon: "brain",
    tagline: "Ship AI features your users actually want",
    relatedTags: ["LLMs", "Prompt Engineering", "AI Engineering", "Engineering"],
    sections: [
      {
        title: "The LLM Landscape for Product Builders",
        content: `The LLM space moves fast, but the fundamentals for product teams are stable. You need to understand three things: what LLMs can do well, where they fail, and how to build reliable products on top of them.

**What LLMs excel at**: Content generation, classification, extraction, summarization, translation, code generation, and conversational interfaces. If the task involves natural language, an LLM can probably help.

**Where they struggle**: Precise calculations, real-time data, consistent formatting (without guardrails), factual accuracy on niche topics, and tasks requiring visual understanding (though multimodal models are closing this gap).

**The product builder's framework**: Start with the user problem, not the technology. Ask "What would this experience look like if it were magical?" then work backward to figure out which LLM capabilities get you closest.

The biggest mistake product teams make: building "AI features" instead of building features that happen to use AI. Users don't care about your model—they care about their outcomes.`,
        linkedPosts: ["prompt-engineering-best-practices-2026", "fine-tuning-vs-prompting", "llm-context-windows"],
      },
      {
        title: "Prompt Engineering: The 80/20 of LLM Products",
        content: `Before you think about fine-tuning, RAG, or agents, master prompt engineering. It's the highest-leverage skill for product teams building with LLMs.

**System prompts** set the behavior. Think of them as the "operating system" for your LLM feature. A well-crafted system prompt can eliminate 80% of edge cases.

**Few-shot examples** are your secret weapon. Instead of describing what you want, show it. Include 3-5 examples of ideal input/output pairs in your prompt.

**Structured output** prevents downstream failures. Use JSON schemas, XML tags, or explicit formatting instructions to ensure consistent output your code can parse.

**Chain-of-thought prompting** improves reasoning quality. For complex tasks, asking the model to "think step by step" dramatically reduces errors.

**The iteration loop**: Write prompt → test with 50+ real examples → identify failure modes → add guardrails → repeat. Most teams iterate 10-20 times before shipping.`,
        linkedPosts: ["prompt-engineering-best-practices-2026"],
      },
      {
        title: "Fine-Tuning vs. Prompting: Making the Right Call",
        content: `The fine-tuning vs. prompting decision is the most important technical choice you'll make. Get it wrong and you waste months and thousands of dollars.

**Start with prompting**. Always. Fine-tuning is a premature optimization 90% of the time. Modern models (GPT-4, Claude, Gemini) are powerful enough that well-engineered prompts handle most use cases.

**Consider fine-tuning when**:
- You need consistent style/tone that prompting can't achieve
- Latency requirements demand a smaller, specialized model
- You have domain-specific knowledge the base model lacks
- Cost per inference needs to be significantly lower
- You need behavior that's hard to describe but easy to demonstrate

**The data requirement**: Fine-tuning requires 500-5,000 high-quality examples minimum. If you don't have this data, you're not ready for fine-tuning.

**The hybrid approach**: Many teams fine-tune a smaller model for high-volume, well-defined tasks while using a larger model with careful prompting for complex, varied tasks.`,
        linkedPosts: ["fine-tuning-vs-prompting", "llm-cost-optimization-guide"],
      },
      {
        title: "Cost Optimization Without Sacrificing Quality",
        content: `LLM costs can spiral quickly. A single feature processing 10K requests/day at $0.03 per request costs $9K/month. Here's how to bring that down to $500.

**Model routing**: Not every request needs GPT-4. Build a classifier that routes simple requests to cheaper models (GPT-4o-mini, Haiku) and only escalates to premium models for complex cases. This alone can cut costs by 60-80%.

**Caching**: Many LLM requests are similar or identical. Implement semantic caching that returns cached results for queries within a similarity threshold. Typical cache hit rates: 30-50%.

**Prompt optimization**: Shorter prompts cost less. Eliminate redundancy, compress examples, and use the minimum context needed. A 40% prompt reduction = 40% cost reduction.

**Batch processing**: For non-real-time tasks, batch requests to use cheaper batch APIs (often 50% off real-time pricing).

**Output limiting**: Set maximum token limits appropriate for each use case. A classification task doesn't need 4,000 tokens of output.`,
        linkedPosts: ["llm-cost-optimization-guide", "llm-context-windows"],
      },
      {
        title: "Production Deployment Patterns",
        content: `Getting an LLM to work in a notebook is easy. Making it reliable in production is where most teams struggle.

**Guardrails**: Always validate LLM outputs before showing them to users. Check for PII, harmful content, format compliance, and factual claims against your data.

**Fallbacks**: Have a graceful degradation path when the LLM fails, times out, or returns garbage. This might be a cached response, a simpler model, or a human handoff.

**Observability**: Log every request and response. Track latency, cost, error rates, and user satisfaction. Without this, you're flying blind.

**A/B testing**: Test prompt changes like you test code changes. Use feature flags to gradually roll out new prompts and measure impact on user outcomes.

**Rate limiting**: Protect your budget and your upstream API quotas. Implement per-user and per-feature rate limits with clear error messages.

These patterns aren't optional—they're the difference between a demo and a product.`,
        linkedPosts: ["ai-ab-testing", "prompt-engineering-best-practices-2026"],
      },
    ],
  },
  {
    slug: "rag-systems",
    title: "RAG Systems: Building Context-Aware AI",
    description: "A comprehensive guide to Retrieval-Augmented Generation. Learn how to build RAG pipelines that actually work, from embedding selection to vector databases, chunking strategies, and production deployment.",
    icon: "database",
    tagline: "Ground your AI in real data, not hallucinations",
    relatedTags: ["RAG", "Embeddings", "Vector Databases", "AI"],
    sections: [
      {
        title: "Why RAG Beats Fine-Tuning for Most Use Cases",
        content: `RAG (Retrieval-Augmented Generation) is the most important pattern in production AI. It solves the fundamental problem with LLMs: they don't know your data.

Instead of baking knowledge into model weights (fine-tuning), RAG retrieves relevant information at query time and includes it in the prompt. This gives you:

**Up-to-date information**: Your RAG pipeline always uses the latest data. No retraining needed.

**Source attribution**: Every answer can cite its sources, building user trust and enabling verification.

**Cost efficiency**: Updating a vector database is orders of magnitude cheaper than fine-tuning a model.

**Reduced hallucinations**: When the model has the right context, it's far less likely to make things up.

**The 90/10 rule**: RAG handles 90% of "teach the AI about my data" use cases. Fine-tuning handles the remaining 10% (style, format, specialized reasoning).

Most teams that jump to fine-tuning should have built a RAG system first. It's simpler, cheaper, and more flexible.`,
        linkedPosts: ["rag-pipeline-mistakes", "fine-tuning-vs-prompting"],
      },
      {
        title: "Choosing the Right Embedding Model",
        content: `Your embedding model determines how well your RAG system understands user queries and matches them to relevant documents. Choose wrong and your entire pipeline underperforms.

**Key evaluation criteria**:
- **Dimension size**: Higher dimensions capture more nuance but cost more to store and search (256 to 3,072 dimensions common)
- **Benchmark performance**: MTEB scores give a standardized comparison, but always test on YOUR data
- **Multilingual support**: Critical if your users or data span multiple languages
- **Speed**: Embedding latency directly impacts query response time
- **Cost**: API embedding costs vary 10x between providers

**Current top picks (2026)**:
- OpenAI text-embedding-3-large (best general-purpose)
- Cohere embed-v4 (best for multilingual)
- BGE-M3 (best open-source)
- Voyage-3 (best for code)

**The most common mistake**: Using the same embedding model for all content types. Code, technical docs, and conversational text have very different semantic structures.

Always benchmark on your actual data. A model that tops MTEB might perform poorly on your specific domain.`,
        linkedPosts: ["embedding-models-2026", "embedding-models-benchmark-2026"],
      },
      {
        title: "Vector Databases: Picking Your Foundation",
        content: `Your vector database is the backbone of your RAG system. The right choice depends on your scale, budget, and operational complexity tolerance.

**Managed services** (lowest ops burden):
- **Pinecone**: Best developer experience, scales effortlessly, but expensive at scale
- **Weaviate Cloud**: Good hybrid search (vector + keyword), generous free tier
- **Qdrant Cloud**: Excellent performance/price ratio, great filtering

**Self-hosted** (more control, more ops):
- **Qdrant**: Rust-based, excellent performance, reasonable memory usage
- **Milvus**: Battle-tested at scale, complex to operate
- **Chroma**: Perfect for prototyping, not production-grade yet

**The database-integrated option**: pgvector with PostgreSQL. If you're already on Postgres, this eliminates an entire service from your architecture. Good enough for up to ~10M vectors.

**Decision framework**:
- < 100K vectors: pgvector or Chroma (keep it simple)
- 100K-10M vectors: Qdrant or Pinecone (managed simplicity)
- > 10M vectors: Milvus or Qdrant (tuning matters)

Don't over-engineer. Start with the simplest option that meets your needs and migrate when you have real scaling problems.`,
        linkedPosts: ["vector-databases-comparison-2026"],
      },
      {
        title: "Chunking: The Most Underrated RAG Decision",
        content: `Chunking strategy has more impact on RAG quality than your choice of embedding model or vector database. Most teams get this wrong.

**The problem**: Documents need to be split into chunks small enough for precise retrieval but large enough to retain context. Too small and you lose meaning. Too large and you dilute relevance.

**Common strategies**:
- **Fixed-size chunks** (500-1000 tokens): Simple, predictable, but breaks mid-sentence/thought
- **Semantic chunking**: Split at natural boundaries (paragraphs, sections). Better quality, more complex
- **Recursive chunking**: Start with large chunks, recursively split if they're too big. Good balance
- **Document-aware chunking**: Use document structure (headers, code blocks) to define boundaries

**Advanced techniques**:
- **Overlapping chunks**: 10-20% overlap ensures no context is lost at boundaries
- **Parent-child chunking**: Store small chunks for retrieval, return the parent chunk for context
- **Summary chunks**: Create a summary chunk for each document, useful for high-level queries

**The testing framework**: Create 50+ test queries with known correct answers. Measure retrieval accuracy with different chunking strategies. The winner isn't always the most sophisticated approach.`,
        linkedPosts: ["rag-pipeline-mistakes"],
      },
      {
        title: "Production RAG: Beyond the Happy Path",
        content: `Demo RAG systems work 70% of the time. Production RAG needs to work 95%+. Here's what fills that gap.

**Hybrid search**: Combine vector similarity with keyword matching (BM25). Vector search handles semantic understanding; keyword search catches exact terms the embeddings might miss. Use reciprocal rank fusion to combine results.

**Re-ranking**: After initial retrieval, use a cross-encoder model to re-rank results for relevance. This consistently improves answer quality by 10-20%.

**Query transformation**: Don't search with the user's raw query. Use an LLM to reformulate it, generate multiple search queries, or decompose complex questions into sub-queries.

**Metadata filtering**: Pre-filter by date, source, category, or access level before vector search. This prevents irrelevant results from wasting context window space.

**Evaluation pipeline**: Continuously measure retrieval accuracy, answer quality, and hallucination rate. Use automated evaluation (LLM-as-judge) supplemented with human review.

**Feedback loops**: Let users flag bad answers. Route these to your evaluation pipeline. Use them to improve chunking, retrieval, and prompt engineering.`,
        linkedPosts: ["rag-pipeline-mistakes", "embedding-models-benchmark-2026", "vector-databases-comparison-2026"],
      },
    ],
  },
  {
    slug: "ai-personalization",
    title: "AI-Driven Personalization & Recommendations",
    description: "Build recommendation systems and personalization engines that actually move metrics. From collaborative filtering to embedding-based recommendations, real-time personalization, and measuring impact.",
    icon: "target",
    tagline: "Deliver the right experience to every user, automatically",
    relatedTags: ["Personalization", "Machine Learning", "Recommendation Systems", "AI"],
    sections: [
      {
        title: "Personalization That Actually Moves Metrics",
        content: `Most personalization is theater. "Recommended for you" sections that show the same items to everyone. "Personalized" emails with just a first name swap. Users see through this instantly.

Real personalization changes the product experience based on deep understanding of each user. When done right, the numbers are compelling:

- **Netflix**: 80% of content watched comes from recommendations
- **Amazon**: 35% of revenue from personalized recommendations
- **Spotify**: Discover Weekly drives 40% of new artist discovery

The key insight: personalization isn't a feature—it's a strategy. It touches every surface of your product, from onboarding to pricing.

**The maturity model**:
1. **Rules-based**: If industry = fintech, show fintech content (where most companies are)
2. **Segment-based**: Group users by behavior clusters, personalize per segment
3. **Individual-level**: ML models predict preferences for each user
4. **Real-time adaptive**: Models update in real-time based on current session behavior

Most companies should aim for Level 2-3. Level 4 requires significant data infrastructure investment.`,
        linkedPosts: ["ai-personalization-scale", "personalization-engines"],
      },
      {
        title: "Embedding-Based Recommendations",
        content: `Embeddings have revolutionized recommendation systems. Instead of manually defining item features, embeddings learn a dense representation that captures semantic similarity.

**How it works**: Map both users and items into the same vector space. Users close to items in this space are likely to engage with them. Simple, powerful, and scales beautifully.

**Building user embeddings**: Average the embeddings of items a user has engaged with, weighted by recency and interaction strength. A user who deeply engaged with 3 articles gives you a much better signal than one who skimmed 20.

**Content-based embeddings**: Embed item content (text, images) using pre-trained models. This solves the cold-start problem—new items immediately have embeddings based on their content.

**Hybrid approach**: Combine content-based embeddings with collaborative filtering signals. This captures both "this item is semantically similar" and "users who liked this also liked that."

**Real-time updates**: Update user embeddings after each interaction. This lets recommendations adapt within a single session, dramatically improving engagement.`,
        linkedPosts: ["embedding-recommendations", "embedding-models-2026"],
      },
      {
        title: "Personalized Onboarding & Activation",
        content: `The highest-ROI personalization happens in the first 5 minutes. A user who has a personalized onboarding experience is 2-3x more likely to activate.

**Intent detection**: Use the signup source, referral context, and first actions to classify user intent. A user from a "best CRM tools" article has different needs than one from a "API documentation" page.

**Adaptive flows**: Build 3-5 onboarding variants and use ML to route users to the best one. Measure by activation rate, not completion rate—a shorter flow that activates users beats a comprehensive flow that doesn't.

**Conversational onboarding**: LLM-powered assistants that ask the right questions to understand user goals, then customize the product experience accordingly. This is the future of onboarding.

**Progressive profiling**: Don't ask for everything upfront. Collect preferences through behavior observation and occasional lightweight surveys. Each data point improves personalization.

**The aha moment**: Every product has a moment where users "get it." Personalization should optimize the path to this moment. Use survival analysis to identify the actions most correlated with long-term retention.`,
        linkedPosts: ["conversational-onboarding", "ai-personalization-scale"],
      },
      {
        title: "Churn Prediction & Proactive Retention",
        content: `By the time a user cancels, it's too late. AI-powered retention detects risk weeks or months before churn happens.

**Feature engineering for churn**:
- Login frequency trends (not just count, but trajectory)
- Feature adoption breadth and depth
- Support ticket sentiment and frequency
- Time between key actions (increasing gaps = risk)
- Comparison to cohort behavior patterns

**Model architecture**: Start with gradient-boosted trees (XGBoost/LightGBM). They're interpretable, fast to train, and surprisingly competitive with deep learning for tabular data. Move to more complex models only when you've exhausted feature engineering.

**The intervention framework**:
- **Low risk**: Automated nudges (feature tips, content recommendations)
- **Medium risk**: Personalized outreach (email sequences, in-app messages)
- **High risk**: Human touch (CSM outreach, executive sponsor engagement)

**Measuring success**: Don't just measure churn rate. Measure retained revenue from users who were predicted to churn but didn't. This directly quantifies the model's business impact.

**The feedback loop**: Every churned user improves your model. Every saved user validates your intervention strategy. This loop compounds over time.`,
        linkedPosts: ["predictive-churn-models", "ai-personalization-scale"],
      },
      {
        title: "Pricing & Monetization Personalization",
        content: `Personalized pricing is the most controversial and most profitable form of personalization.

**Dynamic pricing**: ML models that adjust pricing based on demand, user behavior, competitive landscape, and willingness-to-pay signals. E-commerce companies see 10-25% revenue increases.

**Personalized plan recommendations**: Instead of showing all plans equally, highlight the plan most likely to convert each user based on their usage patterns and similar user behavior.

**Feature gating optimization**: Use ML to determine which features should be free (driving adoption) and which should be paid (driving revenue). This is more nuanced than most companies realize.

**Trial-to-paid optimization**: Predict which trial features each user should experience to maximize conversion probability. Different users need to see different value before they'll pay.

**Usage-based pricing intelligence**: For consumption-based models, predict usage patterns and proactively suggest plan adjustments. Users appreciate being told "you'd save 20% on the annual plan" more than being surprised by overage charges.

The key ethical principle: personalized pricing should help users find the best value, not extract maximum willingness to pay. The former builds trust; the latter destroys it.`,
        linkedPosts: ["dynamic-pricing-ml", "conversion-optimization-ai"],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuides(): Guide[] {
  return guides;
}
