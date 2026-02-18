export interface IndustryStackRec {
  categorySlug: string;
  relevance: "high" | "medium" | "low";
  commentary: string;
  recommendedTools: string[];
}

const stacks: Record<string, IndustryStackRec[]> = {
  // ── saas ───────────────────────────────────────────────────────────────────
  saas: [
    {
      categorySlug: "vector-databases",
      relevance: "medium",
      commentary:
        "Vector databases power semantic search in help centers, knowledge bases, and in-app search experiences. They become essential once you ship AI-powered feature recommendations or contextual onboarding. Pinecone and pgvector are the most common choices for SaaS teams already running Postgres.",
      recommendedTools: ["Pinecone", "pgvector"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "medium",
      commentary:
        "Embeddings underpin documentation search, support ticket routing, and content similarity features in SaaS products. OpenAI text-embedding-3 offers the best out-of-the-box accuracy for English-heavy SaaS content. Voyage-3 is worth evaluating if you need a specialized model for code or technical text.",
      recommendedTools: ["OpenAI text-embedding-3", "Voyage-3"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "LLMs are now table stakes for SaaS: onboarding assistants, in-app chatbots, content generation, and AI-driven workflows are shipped by most modern SaaS companies. OpenAI GPT-4 leads on capability and ecosystem; Anthropic Claude is the top alternative for longer context and safer outputs. Most teams end up running both.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "Product analytics is the backbone of SaaS growth. You need deep funnel analysis and retention cohorts to understand where users drop off and which features drive activation. Mixpanel and Amplitude are the strongest choices for SaaS-specific metrics like activation rate and feature adoption.",
      recommendedTools: ["Mixpanel", "Amplitude", "PostHog"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "high",
      commentary:
        "Experimentation is how SaaS companies de-risk feature launches, validate AI UX patterns, and optimize pricing pages. Statsig is preferred by growth-stage SaaS for its warehouse-native approach, while LaunchDarkly excels at feature flags tied to deployment pipelines.",
      recommendedTools: ["Statsig", "LaunchDarkly"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "high",
      commentary:
        "Personalization drives adaptive onboarding, intelligent upsell prompts, and role-based feature surfacing that reduces time-to-value. Dynamic Yield handles behavioral personalization at scale, while Algolia powers the AI search layer that makes large SaaS products feel discoverable.",
      recommendedTools: ["Dynamic Yield", "Algolia"],
    },
  ],

  // ── fintech ────────────────────────────────────────────────────────────────
  fintech: [
    {
      categorySlug: "vector-databases",
      relevance: "medium",
      commentary:
        "Vector databases support fraud pattern similarity search, regulatory document retrieval, and RAG over compliance libraries. The use cases are real but narrower than in content-heavy verticals. Qdrant is popular for on-premise fintech deployments where data residency matters; Pinecone covers cloud-native teams.",
      recommendedTools: ["Qdrant", "Pinecone"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "medium",
      commentary:
        "Embeddings power compliance document understanding, fraud pattern clustering, and semantic search over financial filings and disclosures. BGE-M3 is a strong open-source option for teams that cannot send data to external APIs, while OpenAI text-embedding-3 is the standard for cloud-native fintechs.",
      recommendedTools: ["OpenAI text-embedding-3", "BGE-M3"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "Conversational banking assistants, automated compliance monitoring, personalized financial insights, and document analysis are all LLM-driven use cases transforming fintech. Anthropic Claude is favored for its strong instruction-following and safety properties in regulated environments. Mistral offers a self-hostable option for firms with strict data governance requirements.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)", "Mistral"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "Behavioral analytics in fintech drives risk scoring, engagement models, and early churn detection for high-value customers. Amplitude's cohort analysis and predictive capabilities are particularly valuable for subscription and lending products. Mixpanel excels for transaction-level event analysis in payment and wallet apps.",
      recommendedTools: ["Amplitude", "Mixpanel"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "medium",
      commentary:
        "Experimentation is valuable for optimizing onboarding, pricing display, and product communication in fintech, but regulatory constraints limit what can be freely tested. LaunchDarkly's feature flagging with percentage rollouts is safer than traditional split tests in compliance-sensitive environments.",
      recommendedTools: ["Statsig", "LaunchDarkly"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "high",
      commentary:
        "Personalized financial insights, spending summaries, and targeted product offers based on transaction patterns drive meaningful lift in fintech engagement and cross-sell revenue. Dynamic Yield handles behavioral targeting at the product layer, while Recombee is strong for recommendation-driven offer placement.",
      recommendedTools: ["Dynamic Yield", "Recombee"],
    },
  ],

  // ── e-commerce ─────────────────────────────────────────────────────────────
  "e-commerce": [
    {
      categorySlug: "vector-databases",
      relevance: "high",
      commentary:
        "Vector databases are the core infrastructure for modern e-commerce discovery: product similarity search, visual search, and semantic recommendation engines all depend on them. Pinecone and Qdrant are the top choices for high-throughput product catalog search, while Weaviate adds multimodal support useful for image-based discovery.",
      recommendedTools: ["Pinecone", "Qdrant", "Weaviate"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "high",
      commentary:
        "Product embeddings are what separate modern discovery from basic keyword search. High-quality embeddings let shoppers find relevant products even when they use natural language or vague queries. OpenAI text-embedding-3 and Cohere embed-v4 both excel on product title and description data and are the default choices for most e-commerce teams.",
      recommendedTools: ["OpenAI text-embedding-3", "Cohere embed-v4"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "AI shopping assistants, product description generation at scale, review summarization, and dynamic marketing copy are all high-ROI LLM applications in e-commerce. GPT-4 and Claude handle the widest range of content generation tasks and are the standard pair for e-commerce LLM infrastructure.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "Conversion funnels, cart abandonment rates, category affinity, and customer lifetime value are the metrics that govern e-commerce strategy. Heap's autocapture approach is valuable for fast-moving teams, Mixpanel for deep cohort analysis, and Amplitude for cross-device purchase journey analytics.",
      recommendedTools: ["Mixpanel", "Amplitude", "Heap"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "high",
      commentary:
        "E-commerce lives and dies by experimentation: product page layouts, checkout flows, pricing display, and recommendation algorithm variants all require rigorous A/B testing. Optimizely is the enterprise standard for large catalogs; Statsig and GrowthBook are strong choices for growth-stage teams with engineering resources.",
      recommendedTools: ["Statsig", "Optimizely", "GrowthBook"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "high",
      commentary:
        "Personalization is the highest-leverage category for e-commerce: personalized product feeds, dynamic merchandising, and individualized promotions directly lift average order value and repeat purchase rates. Dynamic Yield is the benchmark for behavioral merchandising, Algolia for AI-powered search, and Bloomreach for unified personalization across large catalogs.",
      recommendedTools: ["Dynamic Yield", "Algolia", "Bloomreach"],
    },
  ],

  // ── healthtech ─────────────────────────────────────────────────────────────
  healthtech: [
    {
      categorySlug: "vector-databases",
      relevance: "high",
      commentary:
        "Clinical knowledge retrieval, patient record search, and medical literature RAG systems all require vector databases. HIPAA compliance narrows the field significantly — Pinecone offers BAAs and enterprise security controls, while pgvector running inside an existing HIPAA-compliant Postgres instance is the most common choice for early-stage healthtech teams.",
      recommendedTools: ["Pinecone", "pgvector"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "high",
      commentary:
        "Medical concept understanding and clinical document similarity require embeddings trained on or fine-tuned with healthcare data. OpenAI text-embedding-3 performs well on general clinical text when fine-tuning is not an option. BGE-M3 is a strong open-source alternative for teams that need on-premise deployment to satisfy HIPAA data handling requirements.",
      recommendedTools: ["OpenAI text-embedding-3", "BGE-M3"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "Clinical documentation automation, patient communication, care navigation, and AI-assisted clinical decision support are among the highest-value LLM applications in healthcare. All three major providers — OpenAI, Anthropic, and Google — now offer HIPAA BAAs, making it possible to build compliant production systems. Evaluate each on latency, context window, and safety properties for your specific clinical workflow.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)", "Google (Gemini)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "medium",
      commentary:
        "Provider adoption tracking, patient engagement metrics, and clinical workflow efficiency measurement all benefit from product analytics. Healthtech products tend to be less experimentation-heavy than consumer products, but cohort retention and feature adoption data remain critical for growth. PostHog is a strong choice for self-hosted deployments that simplify HIPAA compliance.",
      recommendedTools: ["Mixpanel", "PostHog"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "low",
      commentary:
        "Standard A/B testing has limited applicability in clinical settings due to patient safety considerations and regulatory constraints around clinical trials. LaunchDarkly's feature flagging with controlled rollouts is the safer mechanism for validating new product functionality in non-clinical product surfaces.",
      recommendedTools: ["LaunchDarkly"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "medium",
      commentary:
        "Personalized patient education content, care plan recommendations, and engagement messaging are viable use cases, but patient consent frameworks and HIPAA constraints significantly limit the data that can flow into personalization engines. Recombee can be configured for compliant recommendation workflows on anonymized or consented data sets.",
      recommendedTools: ["Recombee"],
    },
  ],

  // ── edtech ─────────────────────────────────────────────────────────────────
  edtech: [
    {
      categorySlug: "vector-databases",
      relevance: "high",
      commentary:
        "Adaptive learning depends on fast retrieval of relevant educational content, similar problems, and prerequisite concepts. Vector databases enable the knowledge graph search that powers truly personalized curricula. Chroma and pgvector are common choices for edtech teams building on top of existing data infrastructure, while Pinecone scales reliably for large content libraries.",
      recommendedTools: ["Pinecone", "Chroma", "pgvector"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "high",
      commentary:
        "Modeling learning content similarity and student knowledge state requires high-quality semantic representations of both content and learner activity. OpenAI text-embedding-3 handles diverse educational content well across subjects. Cohere embed-v4 is worth evaluating for multilingual edtech products serving non-English speaking markets.",
      recommendedTools: ["OpenAI text-embedding-3", "Cohere embed-v4"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "AI tutors, Socratic questioning bots, automated content generation, and personalized explanation engines are among the most transformative LLM use cases in education. GPT-4 and Claude both excel at multi-turn educational dialogue and step-by-step explanation — running both in parallel for different subjects or age groups is a common architecture.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "Learning outcome tracking, engagement prediction, and dropout early warning systems all require granular event-level analytics tied to learner progress metrics. Mixpanel and Amplitude both support the custom event schemas needed to model learning completion, time-on-task, and mastery milestones effectively.",
      recommendedTools: ["Mixpanel", "Amplitude"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "medium",
      commentary:
        "Optimizing lesson sequencing, content format, and onboarding flows benefits from experimentation, but measuring meaningful learning outcomes requires longer observation windows than typical A/B tests allow. GrowthBook's open-source flexibility and Statsig's metric flexibility are both well-suited for education's non-standard success metrics.",
      recommendedTools: ["Statsig", "GrowthBook"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "high",
      commentary:
        "Adaptive learning is fundamentally a personalization problem: matching the right content to the right learner at the right time based on mastery state and learning style. Recombee handles item-to-user recommendation well for content libraries; Dynamic Yield supports more complex behavioral personalization for consumer-facing edtech products.",
      recommendedTools: ["Recombee", "Dynamic Yield"],
    },
  ],

  // ── marketplace ────────────────────────────────────────────────────────────
  marketplace: [
    {
      categorySlug: "vector-databases",
      relevance: "high",
      commentary:
        "Two-sided marketplaces depend on matching quality above all else, and vector databases enable semantic compatibility search that goes far beyond filter-based matching. Pinecone handles scale reliably for large listing inventories; Weaviate's hybrid search combines dense vectors with BM25 for marketplaces where keyword precision still matters.",
      recommendedTools: ["Pinecone", "Qdrant", "Weaviate"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "high",
      commentary:
        "Embedding quality directly determines match quality in a marketplace, making this one of the highest-leverage technical decisions. OpenAI text-embedding-3 and Cohere embed-v4 both perform well on listing and profile text. Voyage-3 is worth evaluating for specialized vertical marketplaces where domain-specific semantic understanding matters.",
      recommendedTools: ["OpenAI text-embedding-3", "Cohere embed-v4", "Voyage-3"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "Content moderation at scale, listing quality enhancement, conversational search for complex needs, and AI-assisted onboarding for suppliers are all high-value LLM use cases in marketplaces. GPT-4 and Claude are the standard choices, often used together — Claude for policy-sensitive moderation tasks, GPT-4 for content generation.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "Marketplace health depends on tracking liquidity metrics, match quality, and supply-demand balance across categories and geographies — none of which are standard in out-of-the-box analytics tools. Mixpanel and Amplitude both support the custom event schemas and bidirectional funnel analysis that multi-sided markets require.",
      recommendedTools: ["Mixpanel", "Amplitude"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "high",
      commentary:
        "Marketplaces run experiments on both sides simultaneously, making interference effects and network externalities a constant statistical challenge. Statsig handles marketplace-specific experiment designs well; GrowthBook offers the flexibility to implement custom experiment designs; Optimizely provides enterprise tooling for larger two-sided platforms.",
      recommendedTools: ["Statsig", "GrowthBook", "Optimizely"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "high",
      commentary:
        "Personalized discovery feeds, ranked listing recommendations, and dynamic content for both buyers and sellers are core to marketplace retention. Algolia is the standard for AI-powered listing search and faceted discovery; Bloomreach handles personalization across large, diverse inventory; Recombee powers collaborative filtering for cross-category recommendations.",
      recommendedTools: ["Algolia", "Bloomreach", "Recombee"],
    },
  ],

  // ── devtools ───────────────────────────────────────────────────────────────
  devtools: [
    {
      categorySlug: "vector-databases",
      relevance: "high",
      commentary:
        "Semantic code search, documentation retrieval, and building AI coding assistants all require vector databases that can handle code and technical text at scale. Qdrant and Chroma are popular among devtools teams for their developer-friendly APIs and ease of local development. Pinecone provides the managed scalability needed once a product ships to production.",
      recommendedTools: ["Pinecone", "Qdrant", "Chroma"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "high",
      commentary:
        "Code understanding requires embeddings that capture function semantics, not just surface-level token similarity. Voyage-3 has strong code embedding performance and is a top choice for developer tools. BGE-M3 and OpenAI text-embedding-3 are solid alternatives for products that mix code with natural language documentation.",
      recommendedTools: ["Voyage-3", "OpenAI text-embedding-3", "BGE-M3"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "AI coding assistants, intelligent documentation generation, automated code review, and conversational debugging are all LLM-powered features that developers now expect. GPT-4 and Claude are the leading general-purpose choices; Meta Llama is essential for devtools teams building self-hosted or on-premise solutions where code privacy is a requirement.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)", "Meta (Llama)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "Developer activation, API usage trajectories, and feature adoption patterns are the key metrics for devtools growth — and they require analytics that can handle high-volume, event-dense data from technical users. PostHog is the community favorite for its developer-first philosophy and self-hosting option; Mixpanel handles more complex multi-step funnel analysis.",
      recommendedTools: ["PostHog", "Mixpanel"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "medium",
      commentary:
        "Developers evaluate tools over days or weeks, making traditional short-run A/B tests hard to interpret. Feature flags for gradual rollouts are more practical than split tests for most devtools experiments. LaunchDarkly is the standard for engineering-led rollouts; Statsig works well when product and engineering want shared experimentation infrastructure.",
      recommendedTools: ["LaunchDarkly", "Statsig"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "medium",
      commentary:
        "Devtools personalization is more narrowly applicable than in consumer products, but targeted upgrade prompts, personalized documentation surfacing, and intelligent feature recommendations based on usage patterns do move conversion metrics. Algolia powers smart documentation search that surfaces the most relevant results per developer context.",
      recommendedTools: ["Algolia"],
    },
  ],

  // ── media ──────────────────────────────────────────────────────────────────
  media: [
    {
      categorySlug: "vector-databases",
      relevance: "high",
      commentary:
        "Content recommendation engines, article similarity search, and semantic topic clustering all require vector databases to function at media scale. Weaviate's native support for text and image vectors makes it well-suited for multimedia publishers. Pinecone and Qdrant are strong choices for text-heavy news and editorial platforms.",
      recommendedTools: ["Pinecone", "Weaviate", "Qdrant"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "high",
      commentary:
        "The quality of article embeddings directly determines how well a media product can surface relevant content and keep readers engaged across sessions. OpenAI text-embedding-3 performs well on editorial content across topics. Cohere embed-v4 is worth evaluating for multilingual publishers and for its strong performance on long-form article text.",
      recommendedTools: ["OpenAI text-embedding-3", "Cohere embed-v4"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "AI-assisted article drafting, headline optimization, SEO meta generation, content summarization, and newsletter personalization are all production use cases at modern media companies. GPT-4 leads on creative writing quality; Claude is preferred for factual accuracy and reduced hallucination rates in news contexts.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "Reader engagement depth, subscription conversion, and paywall optimization all require event-level analytics with strong retention and funnel modeling. Amplitude is particularly strong for subscription lifecycle analysis; Mixpanel handles content-level engagement metrics; Heap's autocapture reduces implementation overhead for fast-moving editorial teams.",
      recommendedTools: ["Amplitude", "Mixpanel", "Heap"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "high",
      commentary:
        "Paywall placement, subscription pricing display, headline variants, and newsletter subject lines all benefit enormously from rigorous A/B testing in media products. Optimizely is the enterprise standard for large publishers with dedicated CRO teams; Statsig is favored by digital-native media companies with engineering-driven growth practices.",
      recommendedTools: ["Optimizely", "Statsig"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "high",
      commentary:
        "Personalized content feeds are the primary driver of reader retention in modern media — readers who see relevant content read more and subscribe at higher rates. Dynamic Yield handles behavioral targeting and paywall personalization at scale; Algolia powers AI search across content archives; Recombee enables collaborative filtering for content discovery.",
      recommendedTools: ["Dynamic Yield", "Algolia", "Recombee"],
    },
  ],

  // ── gaming ─────────────────────────────────────────────────────────────────
  gaming: [
    {
      categorySlug: "vector-databases",
      relevance: "low",
      commentary:
        "Vector databases have limited direct application in core gaming operations. The primary use cases are game recommendation engines and community knowledge base search — valuable but not central to the product. Chroma is a lightweight option for gaming teams exploring RAG over game wikis or support documentation.",
      recommendedTools: ["Chroma"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "medium",
      commentary:
        "Player behavior modeling, community content moderation, and game recommendation systems all benefit from embeddings. The use is more focused than in content-heavy verticals, typically applied to player activity sequences and community-generated text. OpenAI text-embedding-3 is the practical default for most gaming teams.",
      recommendedTools: ["OpenAI text-embedding-3"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "Dynamic NPC dialogue, procedural quest narrative generation, automated community moderation, and AI-powered player support are transforming game development. Meta Llama is popular for on-device or self-hosted inference in games where latency is critical; Mistral offers a cost-efficient option for high-volume generation; GPT-4 handles the most complex narrative generation tasks.",
      recommendedTools: ["OpenAI (GPT-4)", "Meta (Llama)", "Mistral"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "Player retention, monetization funnel analysis, and live ops decision-making all depend on granular behavioral analytics. Gaming produces extremely high event volumes that require analytics platforms built for scale. Mixpanel and Amplitude both handle game-specific metrics like session depth, level progression, and in-app purchase sequences.",
      recommendedTools: ["Mixpanel", "Amplitude"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "high",
      commentary:
        "Live ops for games is fundamentally an experimentation discipline: offer timing, pricing, difficulty curves, and game mechanic variants all get A/B tested continuously. Statsig handles the high experiment velocity and complex targeting that live service games require; LaunchDarkly is strong for feature flagging tied to game build deployments; GrowthBook provides flexible custom metric support.",
      recommendedTools: ["Statsig", "LaunchDarkly", "GrowthBook"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "high",
      commentary:
        "Personalized in-game offers, dynamic difficulty adjustment, and individualized content recommendations significantly increase player lifetime value in free-to-play and live service games. Dynamic Yield handles offer personalization based on player behavior signals; Recombee powers item recommendation for virtual goods and content libraries.",
      recommendedTools: ["Dynamic Yield", "Recombee"],
    },
  ],

  // ── real-estate ────────────────────────────────────────────────────────────
  "real-estate": [
    {
      categorySlug: "vector-databases",
      relevance: "high",
      commentary:
        "Modern property search has moved far beyond filter-based search: buyers expect to describe what they want in natural language and receive semantically matched listings. Vector databases enable this by indexing listing descriptions, neighborhood attributes, and lifestyle signals alongside traditional structured data. Pinecone and pgvector are the most practical choices for most real estate platforms.",
      recommendedTools: ["Pinecone", "pgvector"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "high",
      commentary:
        "Mapping buyer preferences expressed in natural language to listing descriptions and neighborhood attributes requires high-quality text embeddings. OpenAI text-embedding-3 handles the diverse vocabulary of real estate listings effectively. Cohere embed-v4 is a strong alternative for teams building multilingual real estate platforms in international markets.",
      recommendedTools: ["OpenAI text-embedding-3", "Cohere embed-v4"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "Automated property description generation, AI-powered market analysis reports, conversational search assistants, and lead qualification chatbots are all production use cases driving ROI in real estate platforms. GPT-4 produces the most polished property copy; Claude is preferred for its strong factual accuracy in market analysis and data synthesis tasks.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "Buyer intent scoring, lead-to-listing affinity analysis, and market trend monitoring all require robust event analytics tied to property interaction data. Mixpanel handles the complex multi-session buyer journey well; PostHog is a strong self-hosted option for teams that want to keep sensitive buyer behavior data on their own infrastructure.",
      recommendedTools: ["Mixpanel", "PostHog"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "medium",
      commentary:
        "Real estate sales cycles are long, which limits the velocity of traditional A/B tests. However, listing page layout, search UX, and lead capture form optimization are all tractable with standard experimentation. Statsig and GrowthBook are both flexible enough to handle the non-standard success metrics that real estate transactions require.",
      recommendedTools: ["Statsig", "GrowthBook"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "high",
      commentary:
        "Personalized property recommendation feeds, smart saved search alerts, and match scoring that surfaces listings based on implicit preferences rather than explicit filters are the highest-leverage personalization features in real estate. Algolia powers AI-enhanced search and faceted discovery; Recombee handles collaborative filtering for buyers with overlapping preference profiles.",
      recommendedTools: ["Algolia", "Recombee"],
    },
  ],

  // ── logistics ──────────────────────────────────────────────────────────────
  logistics: [
    {
      categorySlug: "vector-databases",
      relevance: "low",
      commentary:
        "Vector databases have limited direct application in core logistics operations, which are dominated by structured data and optimization algorithms rather than semantic search. The most viable use case is compliance and regulatory document retrieval. pgvector inside an existing Postgres stack is the pragmatic choice if this need arises.",
      recommendedTools: ["pgvector"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "medium",
      commentary:
        "Document understanding for shipping records, customs declarations, and supply chain communications is the primary embedding use case in logistics. Extracting structured data from unstructured freight documents reduces manual data entry and errors. BGE-M3 handles multilingual logistics documents well; OpenAI text-embedding-3 is the standard for English-heavy workflows.",
      recommendedTools: ["OpenAI text-embedding-3", "BGE-M3"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "Document AI for freight and customs, automated exception reporting, carrier communication automation, and conversational interfaces for supply chain visibility dashboards are all high-value LLM applications in logistics. GPT-4 handles the complex multi-document reasoning needed for customs compliance; Claude excels at structured data extraction from messy logistics documents.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "Delivery performance tracking, route efficiency analysis, fleet utilization measurement, and demand forecasting accuracy are all analytics-driven decisions in modern logistics. Amplitude provides strong operational KPI dashboards; Mixpanel handles customer-facing portal analytics and shipper engagement metrics effectively.",
      recommendedTools: ["Amplitude", "Mixpanel"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "low",
      commentary:
        "Core logistics operations — routing, scheduling, load optimization — are not amenable to standard A/B testing, which is designed for user-facing product decisions. LaunchDarkly's feature flagging is useful for controlled rollouts of new customer portal features and shipper-facing interfaces where UX experimentation is appropriate.",
      recommendedTools: ["LaunchDarkly"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "low",
      commentary:
        "Personalization has minimal application in B2B logistics operations. The most viable use case is personalizing the shipper or customer portal experience — delivery preference management and proactive notification customization. Algolia can power smart search over order history and shipment data in customer-facing portals.",
      recommendedTools: ["Algolia"],
    },
  ],

  // ── hr-tech ────────────────────────────────────────────────────────────────
  "hr-tech": [
    {
      categorySlug: "vector-databases",
      relevance: "high",
      commentary:
        "Semantic resume-to-job matching, skills-based search across candidate pools, and intelligent internal mobility recommendations all require vector databases. The ability to go beyond keyword matching to understand true skills compatibility is the core AI differentiator in HR tech. pgvector, Qdrant, and Pinecone are all strong choices depending on scale and deployment preferences.",
      recommendedTools: ["Pinecone", "Qdrant", "pgvector"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "high",
      commentary:
        "Resume and job description embedding quality determines matching accuracy more than any other technical factor in AI-driven recruiting platforms. OpenAI text-embedding-3 handles the diverse vocabulary of skills and job roles well. Cohere embed-v4 and Voyage-3 are strong alternatives for teams building specialized models for specific industries or seniority levels.",
      recommendedTools: ["OpenAI text-embedding-3", "Cohere embed-v4", "Voyage-3"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "Automated resume screening summaries, job description generation from role templates, employee communication analysis, and HR assistant chatbots are all high-ROI LLM use cases in HR tech. GPT-4 produces the best job description copy quality; Claude is preferred for interview question generation and performance review summarization where factual precision matters.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "Hiring funnel efficiency, candidate drop-off analysis, time-to-fill tracking, and attrition risk modeling are all critical metrics for HR tech platforms. Mixpanel and Amplitude both support the complex event schemas needed to model multi-stage recruiting workflows and employee engagement over time.",
      recommendedTools: ["Mixpanel", "Amplitude"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "medium",
      commentary:
        "Job posting format optimization, application flow conversion, and candidate experience improvements are all amenable to A/B testing in HR platforms. Sample sizes can be a constraint for niche job categories, and test duration needs to account for hiring cycle length. Statsig and GrowthBook both provide the metric flexibility needed for non-standard HR conversion goals.",
      recommendedTools: ["Statsig", "GrowthBook"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "medium",
      commentary:
        "Personalized job recommendations, adaptive learning path suggestions for skill development, and internal mobility matching based on career trajectory all benefit from personalization infrastructure. Recombee handles job-to-candidate recommendation well using collaborative filtering; Algolia powers the smart search experience across job boards with large, faceted inventory.",
      recommendedTools: ["Recombee", "Algolia"],
    },
  ],

  // ── cybersecurity ──────────────────────────────────────────────────────────
  cybersecurity: [
    {
      categorySlug: "vector-databases",
      relevance: "high",
      commentary:
        "Threat intelligence retrieval, vulnerability pattern matching, and security knowledge base search are all vector database use cases that directly improve analyst productivity. Qdrant is popular in security tooling for its on-premise deployment support and filtering capabilities that are essential for SIEM-adjacent workflows; Pinecone handles cloud-native security analytics at scale.",
      recommendedTools: ["Qdrant", "Pinecone"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "high",
      commentary:
        "Log anomaly detection, threat pattern clustering, and security documentation search across heterogeneous data sources all require high-quality embeddings that generalize across technical language. BGE-M3 and Voyage-3 are strong choices for security-specific text; OpenAI text-embedding-3 is the reliable default for teams without specialized embedding fine-tuning.",
      recommendedTools: ["OpenAI text-embedding-3", "BGE-M3", "Voyage-3"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "Security copilot assistants, automated threat analysis narrative generation, natural language query interfaces for SIEM data, and AI-powered incident response playbooks are all production LLM use cases in modern security products. Claude's strong instruction-following and reduced hallucination rate make it preferred for security contexts; Meta Llama is the standard for air-gapped or on-premise security deployments.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)", "Meta (Llama)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "SOC efficiency metrics — MTTR, alert volume, false positive rates, analyst workload distribution — require behavioral analytics across both product users and security event data. PostHog is favored by security-conscious teams for self-hosting; Amplitude provides strong operational dashboard capabilities for product-led security platforms.",
      recommendedTools: ["PostHog", "Amplitude"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "low",
      commentary:
        "Core detection and response capabilities are not amenable to A/B testing in the traditional sense. Experimentation is appropriate for optimizing the security product's UX, onboarding flows, and dashboard layouts. LaunchDarkly's feature flag system is well-suited for controlled feature rollouts in security products where stability is non-negotiable.",
      recommendedTools: ["LaunchDarkly"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "low",
      commentary:
        "Personalization has minimal application in core security detection and response workflows. The most viable use case is personalizing analyst dashboards and alert prioritization based on role and team context. Dynamic Yield can be applied to the product marketing and portal experience for security platforms with large self-serve customer bases.",
      recommendedTools: ["Dynamic Yield"],
    },
  ],

  // ── insurtech ──────────────────────────────────────────────────────────────
  insurtech: [
    {
      categorySlug: "vector-databases",
      relevance: "medium",
      commentary:
        "Policy document search, claims similarity matching for fraud detection, and regulatory library retrieval are all practical vector database use cases in insurance. Data residency requirements common in insurance often favor self-hosted or private-cloud deployments. pgvector inside a compliant Postgres environment is the lowest-friction starting point.",
      recommendedTools: ["Pinecone", "pgvector"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "high",
      commentary:
        "Claims document understanding, policy language comparison across products, and fraud pattern detection across unstructured insurance data are all embedding-driven capabilities that deliver measurable accuracy improvements over rules-based systems. OpenAI text-embedding-3 handles the dense, formal language of insurance documents well; Cohere embed-v4 is a strong alternative with enterprise data privacy controls.",
      recommendedTools: ["OpenAI text-embedding-3", "Cohere embed-v4"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "Automated underwriting narrative generation, conversational claims filing assistants, plain-language policy explanation chatbots, and regulatory compliance document generation are all high-value LLM use cases in insurance. Google Gemini's multimodal capabilities are particularly relevant for claims that involve photo or document evidence; Claude leads on factual precision for policy analysis tasks.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)", "Google (Gemini)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "high",
      commentary:
        "Claims processing cycle time, underwriting model accuracy, customer satisfaction by product line, and fraud detection model performance all require ongoing analytics measurement. Amplitude provides strong cohort analysis for policyholder lifecycle management; Mixpanel handles the event-level funnel analysis for digital application and renewal workflows.",
      recommendedTools: ["Amplitude", "Mixpanel"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "medium",
      commentary:
        "Insurance pricing display, application form optimization, and renewal communication strategy are all viable experimentation targets within regulatory boundaries. Actuarial and compliance review is required before deploying pricing experiments, which adds cycle time. Statsig and Optimizely both support the guardrail metrics needed to detect regulatory risk in insurance experiments.",
      recommendedTools: ["Statsig", "Optimizely"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "medium",
      commentary:
        "Personalized coverage recommendations based on life stage and risk profile, risk-tiered pricing displays, and targeted cross-sell offers for existing policyholders all drive incremental premium revenue. Dynamic Yield handles behavioral targeting across the policyholder portal; Recombee is well-suited for product recommendation in multi-line insurance platforms.",
      recommendedTools: ["Dynamic Yield", "Recombee"],
    },
  ],

  // ── legal-tech ─────────────────────────────────────────────────────────────
  "legal-tech": [
    {
      categorySlug: "vector-databases",
      relevance: "high",
      commentary:
        "Case law retrieval, contract clause search, and regulatory research are the foundational RAG use cases that define the value proposition of most legal AI products. Precise semantic search over large legal corpora is the core technical challenge. Pinecone, Qdrant, and pgvector are all viable depending on scale and whether on-premise deployment is required by the firm.",
      recommendedTools: ["Pinecone", "Qdrant", "pgvector"],
    },
    {
      categorySlug: "embedding-models",
      relevance: "high",
      commentary:
        "Legal language is highly domain-specific, making embedding model selection particularly important for retrieval accuracy in legal tech. Voyage-3 has strong legal and technical text performance; BGE-M3 is the leading open-source option for firms that cannot send client data to external APIs; OpenAI text-embedding-3 is the practical default for cloud-native legal platforms.",
      recommendedTools: ["OpenAI text-embedding-3", "Voyage-3", "BGE-M3"],
    },
    {
      categorySlug: "llm-providers",
      relevance: "high",
      commentary:
        "Contract analysis, legal research automation, document drafting, due diligence review, and case outcome pattern analysis are all core LLM use cases in legal tech. Anthropic Claude leads for legal applications due to its long context window, strong instruction-following, and reduced hallucination rate — critical properties when legal accuracy is non-negotiable. GPT-4 is a strong alternative for document generation and summarization.",
      recommendedTools: ["OpenAI (GPT-4)", "Anthropic (Claude)"],
    },
    {
      categorySlug: "analytics-platforms",
      relevance: "medium",
      commentary:
        "Document processing volumes, feature adoption by practice area, and time-saved metrics are the key analytics for legal tech products. Legal workflows tend to be less metric-dense than consumer products, but activation and retention tracking remain important for SaaS legal tools. PostHog is preferred by security-conscious legal tech teams for self-hosting; Mixpanel handles more complex funnel analysis.",
      recommendedTools: ["PostHog", "Mixpanel"],
    },
    {
      categorySlug: "ab-testing-tools",
      relevance: "low",
      commentary:
        "Core legal workflow functionality — document analysis accuracy, research quality — is evaluated qualitatively by legal professionals rather than through A/B tests. Experimentation is appropriate for optimizing onboarding flows, pricing pages, and UI layouts in legal tech products. LaunchDarkly's feature flags support controlled rollouts without exposing attorneys to unstable functionality.",
      recommendedTools: ["LaunchDarkly"],
    },
    {
      categorySlug: "personalization-platforms",
      relevance: "low",
      commentary:
        "Personalization has limited direct application in legal workflows where consistency and audit trails are paramount. The most viable use cases are personalized legal research recommendations by practice area and intelligent document template suggestions based on matter type. Algolia powers smart search across document libraries and template repositories in legal platforms.",
      recommendedTools: ["Algolia"],
    },
  ],
};

export function getStackForIndustry(industrySlug: string): IndustryStackRec[] {
  return stacks[industrySlug] ?? [];
}

export function getIndustriesForCategory(
  categorySlug: string
): Array<{ industrySlug: string } & IndustryStackRec> {
  return Object.entries(stacks).flatMap(([industrySlug, recs]) =>
    recs
      .filter((r) => r.categorySlug === categorySlug)
      .map((r) => ({ industrySlug, ...r }))
  );
}
