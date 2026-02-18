export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  explanation: string;
  category: "ai-fundamentals" | "growth" | "engineering" | "data";
  relatedTerms: string[];
  relatedPosts: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  // --- ai-fundamentals ---
  {
    slug: "rag",
    term: "RAG (Retrieval-Augmented Generation)",
    definition:
      "A technique that grounds LLM responses in external data by retrieving relevant documents at query time and injecting them into the prompt context.",
    explanation: `RAG solves the core problem with Large Language Models: they don't know about your private data, and their training data has a cutoff date. Instead of retraining the model (expensive) or hoping it knows the answer (unreliable), RAG retrieves the relevant information on the fly.

The typical RAG pipeline has three stages. First, your documents are chunked and converted into vector embeddings, then stored in a vector database. Second, when a user asks a question, their query is also embedded and used to find the most semantically similar document chunks. Third, those retrieved chunks are injected into the LLM prompt as context, grounding the response in your actual data.

Production RAG systems add layers of sophistication: hybrid search combining vector similarity with keyword matching, re-ranking retrieved results with cross-encoder models, query transformation to handle ambiguous questions, and metadata filtering to scope results. The quality of your chunking strategy and embedding model often matters more than which LLM you use.`,
    category: "ai-fundamentals",
    relatedTerms: ["embeddings", "vector-database", "llm"],
    relatedPosts: ["rag-pipeline-mistakes", "vector-databases-comparison-2026"],
  },
  {
    slug: "embeddings",
    term: "Embeddings",
    definition:
      "Dense vector representations of text, images, or other data that capture semantic meaning in a high-dimensional space, enabling similarity search and clustering.",
    explanation: `Embeddings convert human-readable content into arrays of numbers (vectors) that machines can compare mathematically. Two pieces of text about similar topics will have vectors that are close together in this space, even if they use completely different words.

Modern embedding models like OpenAI's text-embedding-3 or Cohere's embed-v4 produce vectors with 256 to 3,072 dimensions. More dimensions capture more nuance but cost more to store and search. The choice of embedding model dramatically impacts downstream quality — a model trained on academic papers will embed technical content differently than one trained on conversational text.

Embeddings power many AI growth features: semantic search (find documents by meaning, not keywords), recommendation systems (suggest content similar to what a user liked), clustering (group users by behavioral patterns), and anomaly detection (spot unusual patterns). They're the foundation of RAG pipelines, where document embeddings enable fast retrieval of relevant context for LLM prompts.`,
    category: "ai-fundamentals",
    relatedTerms: ["vector-database", "cosine-similarity", "rag"],
    relatedPosts: [
      "embedding-models-2026",
      "embedding-models-benchmark-2026",
      "embedding-recommendations",
    ],
  },
  {
    slug: "vector-database",
    term: "Vector Database",
    definition:
      "A specialized database optimized for storing, indexing, and querying high-dimensional vector embeddings with sub-millisecond similarity search.",
    explanation: `Vector databases solve a specific problem: given a query vector, find the most similar vectors among millions or billions of stored embeddings. Traditional databases use exact matching or B-tree indexes; vector databases use approximate nearest neighbor (ANN) algorithms like HNSW or IVF that trade a small amount of accuracy for massive speed gains.

The major players include Pinecone (fully managed, great DX), Qdrant (excellent performance/price), Weaviate (strong hybrid search), and pgvector (PostgreSQL extension for teams who want simplicity). Each makes different trade-offs in terms of cost, operational complexity, and performance at scale.

For growth teams, vector databases are the backbone of RAG systems, recommendation engines, and semantic search. They enable features like "find similar items," "search by meaning," and "retrieve relevant context for AI responses." The right choice depends on your scale: pgvector handles under 1M vectors elegantly, while Pinecone or Qdrant are better suited for tens of millions.`,
    category: "ai-fundamentals",
    relatedTerms: ["embeddings", "cosine-similarity", "rag"],
    relatedPosts: [
      "vector-databases-comparison-2026",
      "rag-pipeline-mistakes",
    ],
  },
  {
    slug: "llm",
    term: "LLM (Large Language Model)",
    definition:
      "A neural network trained on massive text corpora that can generate, understand, and transform natural language for tasks like summarization, classification, and conversation.",
    explanation: `Large Language Models like GPT-4, Claude, and Gemini are transformer-based neural networks with billions of parameters, trained on trillions of tokens of text data. They learn statistical patterns in language that enable remarkably flexible text generation and understanding.

For product teams, LLMs unlock features that were previously impossible or required months of custom ML work: conversational interfaces, content generation, text classification, sentiment analysis, summarization, and translation. The key shift is from building task-specific models to prompting general-purpose models — dramatically reducing time to ship AI features.

The practical challenge is making LLMs reliable in production. They hallucinate, they're expensive at scale, and their behavior is hard to predict. Successful product teams invest heavily in prompt engineering, output validation, caching, model routing (using cheaper models for simpler tasks), and evaluation pipelines. The goal isn't perfection — it's building systems where LLM failures are gracefully handled and continuously improved.`,
    category: "ai-fundamentals",
    relatedTerms: ["transformer", "fine-tuning", "prompt-engineering"],
    relatedPosts: [
      "llm-context-windows",
      "llm-cost-optimization-guide",
      "prompt-engineering-best-practices-2026",
    ],
  },
  {
    slug: "fine-tuning",
    term: "Fine-Tuning",
    definition:
      "The process of further training a pre-trained LLM on a domain-specific dataset to specialize its behavior, style, or knowledge for a particular task.",
    explanation: `Fine-tuning takes a general-purpose model and makes it an expert at your specific task. You provide hundreds to thousands of example input/output pairs, and the model's weights adjust to reproduce those patterns. The result is a model that handles your use case with more consistent style, better accuracy, and often lower latency than a larger prompted model.

The decision to fine-tune versus prompt-engineer is one of the most important technical choices in AI product development. Fine-tuning requires significant upfront investment: curating a high-quality dataset (500-5,000+ examples), running training jobs ($500-$5,000+), and building evaluation pipelines. The payoff is a smaller, cheaper, faster model that nails your specific task.

Most teams should start with prompt engineering on a large model and only fine-tune when they hit clear limitations: inconsistent output format, inability to match a specific tone, cost too high for their volume, or latency requirements that demand a smaller model. The hybrid approach — a fine-tuned small model for high-volume tasks plus a prompted large model for edge cases — is increasingly common in production.`,
    category: "ai-fundamentals",
    relatedTerms: ["llm", "prompt-engineering", "transformer"],
    relatedPosts: ["fine-tuning-vs-prompting", "llm-cost-optimization-guide"],
  },
  {
    slug: "prompt-engineering",
    term: "Prompt Engineering",
    definition:
      "The practice of designing and iterating on LLM input instructions to reliably produce desired outputs for a specific task.",
    explanation: `Prompt engineering is the highest-leverage skill for teams building with LLMs. A well-crafted prompt can eliminate 80% of edge cases, enforce consistent output formats, and dramatically improve response quality — all without any model training.

The core techniques include system prompts (setting overall behavior), few-shot examples (showing the model what you want), chain-of-thought reasoning (asking the model to think step by step), and structured output instructions (specifying JSON schemas or XML tags for parseable responses). Advanced techniques add guardrails, self-consistency checks, and multi-step reasoning chains.

Effective prompt engineering is iterative. Start with a basic prompt, test against 50+ real-world examples, identify failure modes, add specific instructions to handle them, and repeat. Most production prompts go through 10-20 iterations. The key insight: prompts are code. They should be version-controlled, tested against regression suites, and A/B tested just like any other code change that affects user experience.`,
    category: "ai-fundamentals",
    relatedTerms: ["llm", "fine-tuning", "tokenization"],
    relatedPosts: ["prompt-engineering-best-practices-2026", "fine-tuning-vs-prompting"],
  },
  {
    slug: "transformer",
    term: "Transformer",
    definition:
      "The neural network architecture behind modern LLMs, using self-attention mechanisms to process and generate sequences of tokens in parallel.",
    explanation: `The Transformer architecture, introduced in the 2017 paper "Attention Is All You Need," revolutionized natural language processing and now underpins virtually every major AI model. Its key innovation is the self-attention mechanism, which allows the model to weigh the importance of different parts of the input when processing each token.

Unlike previous architectures (RNNs, LSTMs) that processed tokens sequentially, Transformers process the entire input in parallel. This makes them dramatically faster to train on modern GPUs and enables them to capture long-range dependencies in text. The architecture consists of encoder and decoder blocks, each containing multi-head attention layers and feed-forward networks.

For product teams, understanding Transformers helps with practical decisions: why context windows have limits (quadratic attention cost), why longer prompts cost more (more tokens to process), why models sometimes "forget" instructions in long conversations (attention dilution), and why fine-tuning works (adjusting attention patterns for your domain). You don't need to implement Transformers from scratch, but understanding the architecture helps you build better products on top of them.`,
    category: "ai-fundamentals",
    relatedTerms: ["attention-mechanism", "llm", "tokenization"],
    relatedPosts: [
      "transformers-architecture-deep-dive",
      "llm-context-windows",
    ],
  },
  {
    slug: "attention-mechanism",
    term: "Attention Mechanism",
    definition:
      "A neural network component that dynamically weights the relevance of different parts of the input sequence when producing each output token.",
    explanation: `The attention mechanism is the core innovation that makes Transformers — and by extension, modern LLMs — work so well. At its simplest, attention answers the question: "When generating this word, how much should I focus on each word in the input?"

In self-attention, each token in the input attends to every other token, creating a matrix of relevance scores. These scores are computed using three learned projections of each token: Query (what am I looking for?), Key (what do I contain?), and Value (what information do I provide?). The dot product of Query and Key determines attention weights, which are used to create a weighted sum of Values.

Multi-head attention runs this process in parallel across multiple "heads," each learning to focus on different types of relationships — syntactic, semantic, positional, and more. This is why LLMs can simultaneously track subject-verb agreement, topical relevance, and logical flow. The computational cost of attention scales quadratically with sequence length, which is the fundamental reason context windows have practical limits and why techniques like sparse attention and sliding window attention are active research areas.`,
    category: "ai-fundamentals",
    relatedTerms: ["transformer", "llm", "tokenization"],
    relatedPosts: ["transformers-architecture-deep-dive", "llm-context-windows"],
  },
  {
    slug: "tokenization",
    term: "Tokenization",
    definition:
      "The process of splitting text into smaller units (tokens) that an LLM can process, typically subword pieces averaging about 4 characters per token.",
    explanation: `Tokenization is the first step in any LLM pipeline: converting human-readable text into a sequence of integer IDs that the model can process. Modern tokenizers (like BPE — Byte Pair Encoding) split text into subword pieces, balancing vocabulary size with coverage. Common words like "the" get their own token, while rare words are split into pieces: "tokenization" might become "token" + "ization."

Understanding tokenization matters for practical reasons. LLM pricing is per token, not per word — and a token is roughly 3/4 of a word in English. Context window limits are in tokens, so a 128K token window holds roughly 96K words. Non-English languages and code often tokenize less efficiently (more tokens per word), meaning they cost more and fill context windows faster.

For prompt engineering, token awareness helps you optimize costs: shorter prompts with the same meaning save money at scale. For RAG systems, chunk sizes should account for token limits, not just character or word counts. And for evaluation, token-level analysis helps you understand why a model produced unexpected output — sometimes it's the tokenizer splitting a word in an unexpected way.`,
    category: "ai-fundamentals",
    relatedTerms: ["llm", "transformer", "attention-mechanism"],
    relatedPosts: ["llm-context-windows", "llm-cost-optimization-guide"],
  },
  {
    slug: "hallucination",
    term: "Hallucination",
    definition:
      "When an LLM generates plausible-sounding but factually incorrect or fabricated information that has no basis in its training data or provided context.",
    explanation: `Hallucination is the most dangerous failure mode of LLMs in production. The model doesn't "know" it's making something up — it's generating the most probable next token given its context, and sometimes the most probable sequence is factually wrong. This is especially problematic because hallucinated content often sounds confident and well-written.

Common hallucination triggers include questions about specific facts (dates, numbers, names), topics with limited training data, requests that push beyond the model's knowledge, and prompts that implicitly encourage the model to guess rather than admit uncertainty. In growth applications, hallucinations can erode user trust in seconds — imagine a support bot confidently giving wrong pricing information.

Mitigation strategies include RAG (grounding responses in real data), explicit instructions to say "I don't know," output validation against known facts, temperature reduction for factual tasks, and citation requirements that force the model to reference its sources. The most robust approach is defense in depth: multiple layers of validation between the LLM's output and what the user sees.`,
    category: "ai-fundamentals",
    relatedTerms: ["llm", "rag", "prompt-engineering"],
    relatedPosts: ["rag-pipeline-mistakes", "prompt-engineering-best-practices-2026"],
  },

  // --- growth ---
  {
    slug: "growth-loop",
    term: "Growth Loop",
    definition:
      "A self-reinforcing cycle where each cohort of users generates inputs (data, content, referrals) that attract the next cohort, creating compounding growth.",
    explanation: `Growth loops replace the traditional marketing funnel with a circular model. Instead of a linear path (acquire -> activate -> retain -> monetize), loops create systems where output becomes input: users generate content that attracts new users who generate more content. The most powerful loops compound — each cycle is more efficient than the last.

AI amplifies growth loops in three ways. First, data network effects: each user's behavior trains models that make the product better for everyone, creating a defensible moat. Second, AI-generated content loops: user activity generates SEO-optimized content that drives organic traffic. Third, AI-enhanced viral loops: LLMs create personalized shareable artifacts from user activity, each one a potential acquisition touchpoint.

The key to designing effective growth loops is identifying your product's natural compounding mechanism. For B2B SaaS, it might be templates or workflows that users share. For consumer products, it might be AI-generated summaries or insights that users post on social media. The best loops feel like product features, not growth hacks — users participate because the loop creates genuine value for them.`,
    category: "growth",
    relatedTerms: ["viral-coefficient", "activation-rate", "product-led-growth"],
    relatedPosts: ["llm-growth-loops", "viral-loops-with-ai", "ai-product-growth-2026"],
  },
  {
    slug: "churn",
    term: "Churn",
    definition:
      "The rate at which customers stop using or paying for a product over a given period, typically measured as monthly or annual churn percentage.",
    explanation: `Churn is the silent killer of growth. A product with 5% monthly churn loses nearly half its customers every year. Even small churn improvements have outsized impact: reducing monthly churn from 5% to 4% increases customer lifetime by 25%, directly boosting LTV and the amount you can spend on acquisition.

AI transforms churn management from reactive (responding after cancellation) to predictive (intervening weeks before it happens). ML models analyze behavioral signals — login frequency trends, feature usage depth, support ticket sentiment, and comparison to cohort patterns — to identify at-risk accounts with 80%+ accuracy at 30-day horizons.

The most effective churn prevention combines prediction with personalized intervention. Low-risk users get automated nudges (feature tips, content recommendations). Medium-risk users receive targeted outreach (personalized emails, in-app messages). High-risk users get human touch (CSM calls, executive sponsor engagement). This tiered approach maximizes retention impact while keeping intervention costs proportional to account value.`,
    category: "growth",
    relatedTerms: ["net-revenue-retention", "activation-rate", "growth-loop"],
    relatedPosts: ["predictive-churn-models", "ai-personalization-scale"],
  },
  {
    slug: "activation-rate",
    term: "Activation Rate",
    definition:
      "The percentage of new signups who complete a key action (the 'aha moment') that correlates with long-term retention and product value realization.",
    explanation: `Activation rate measures how effectively your onboarding converts signups into engaged users. It's the most important early-lifecycle metric because it directly predicts retention: users who activate are typically 3-5x more likely to retain at 90 days than those who don't.

The first step is identifying your activation event — the action most strongly correlated with long-term retention. For Slack, it was sending 2,000 messages. For Dropbox, it was putting a file in the Dropbox folder. Survival analysis on your user data reveals which early actions predict retention in your product.

AI improves activation rates through personalized onboarding: routing users to different flows based on their intent (detected from signup source, first actions, and similar user patterns), using LLM-powered assistants to guide users to their aha moment conversationally, and predicting activation risk in real-time to trigger proactive interventions. Teams implementing AI-driven onboarding typically see 20-40% activation lifts.`,
    category: "growth",
    relatedTerms: ["churn", "product-led-growth", "growth-loop"],
    relatedPosts: ["conversational-onboarding", "ai-product-growth-2026"],
  },
  {
    slug: "product-led-growth",
    term: "Product-Led Growth (PLG)",
    definition:
      "A go-to-market strategy where the product itself drives acquisition, activation, and expansion through self-serve experiences rather than sales-led motions.",
    explanation: `Product-led growth flips the traditional sales model: instead of convincing people to buy before they use, you let users experience value first and convert when they're ready. Companies like Slack, Figma, and Notion exemplify PLG — their products spread through organizations organically, with purchasing following usage.

AI supercharges PLG by automating the moments that traditionally required human sales or success teams. Intelligent onboarding adapts to each user's role and goals. In-product AI assistants answer questions and guide feature discovery. Predictive models identify expansion-ready accounts and trigger upsell prompts at the optimal moment. Usage-based recommendations help users find features they'd benefit from but haven't discovered.

The PLG + AI combination is particularly powerful because of the data flywheel: more self-serve users generate more behavioral data, which trains better AI models, which improve the self-serve experience, which attracts more users. This compounds in a way that sales-led motions can't match, creating an increasingly defensible advantage over time.`,
    category: "growth",
    relatedTerms: ["activation-rate", "growth-loop", "viral-coefficient"],
    relatedPosts: ["product-led-growth-ai", "ai-product-growth-2026"],
  },
  {
    slug: "viral-coefficient",
    term: "Viral Coefficient (K-Factor)",
    definition:
      "The average number of new users each existing user brings to the product, where a K-factor above 1.0 indicates self-sustaining viral growth.",
    explanation: `The viral coefficient measures organic amplification: if each user invites 3 friends and 40% convert, your K-factor is 1.2 — each user generates more than one new user, creating exponential growth. Even a K-factor of 0.5 is valuable, as it means half your growth comes free through word of mouth.

AI increases viral coefficients in several ways. LLMs can generate personalized, shareable artifacts from user activity — analysis summaries, reports, or insights that users naturally want to share. AI-optimized referral programs use ML to identify the right incentive, channel, and timing for each user. And contextual sharing prompts triggered at moments of peak engagement (detected by behavioral models) convert sharing intent into action far more effectively than static prompts.

The compounding math is powerful: if AI lifts your K-factor from 0.3 to 0.6, and each viral cycle takes 14 days, you'll have 2.5x more organic users after 6 months. The key is building viral mechanics that feel like genuine value — shared content that helps the recipient, not just marketing that benefits the sender.`,
    category: "growth",
    relatedTerms: ["growth-loop", "product-led-growth", "activation-rate"],
    relatedPosts: ["viral-loops-with-ai", "llm-growth-loops"],
  },
  {
    slug: "net-revenue-retention",
    term: "Net Revenue Retention (NRR)",
    definition:
      "The percentage of recurring revenue retained from existing customers over a period, including expansion, contraction, and churn — where 100%+ indicates growth without new customers.",
    explanation: `Net Revenue Retention is the single best indicator of product-market fit for subscription businesses. An NRR above 120% means your existing customer base grows 20% annually even without acquiring a single new customer. Best-in-class SaaS companies maintain 130-150% NRR.

NRR = (Starting MRR + Expansion - Contraction - Churn) / Starting MRR. Each component is an optimization target. AI reduces churn through predictive models and proactive retention. AI increases expansion through personalized upsell recommendations timed to maximum receptivity. AI reduces contraction by surfacing unused features that justify the current plan tier.

The most impactful AI lever for NRR is usually expansion revenue. ML models that identify expansion signals — increasing team size, approaching usage limits, exploring premium features — and trigger the right offer at the right time can lift expansion revenue by 20-40%. Combined with churn prediction reducing losses, this creates a compounding NRR improvement that dramatically increases company valuation.`,
    category: "growth",
    relatedTerms: ["churn", "product-led-growth", "activation-rate"],
    relatedPosts: ["predictive-churn-models", "dynamic-pricing-ml"],
  },

  // --- engineering ---
  {
    slug: "a-b-testing",
    term: "A/B Testing",
    definition:
      "A controlled experiment comparing two or more variants to determine which performs better on a defined metric, using statistical methods to ensure reliable results.",
    explanation: `A/B testing is the gold standard for measuring the causal impact of product changes. By randomly splitting users into groups that see different variants, you isolate the effect of your change from all other variables — something observational analysis can't do.

The fundamentals: define your primary metric, calculate required sample size (based on desired minimum detectable effect and statistical power), randomly assign users, run the test until you reach significance, and make a decision. Common pitfalls include peeking at results early (inflates false positive rate), testing too many metrics (multiple comparison problem), and stopping at the first significant result (regression to the mean).

AI enhances A/B testing in several ways: multi-armed bandits that dynamically allocate traffic to winning variants, reducing opportunity cost; Bayesian methods that provide continuous confidence estimates instead of binary significant/not-significant decisions; and contextual bandits that personalize which variant each user sees based on their characteristics. The ideal experimentation platform combines traditional statistical rigor for high-stakes tests with AI-powered methods for rapid optimization.`,
    category: "engineering",
    relatedTerms: ["feature-flag", "mlops", "a-b-testing"],
    relatedPosts: ["ai-ab-testing", "conversion-optimization-ai"],
  },
  {
    slug: "feature-flag",
    term: "Feature Flag",
    definition:
      "A software mechanism that enables or disables features at runtime without deploying new code, used for gradual rollouts, A/B testing, and targeting specific user segments.",
    explanation: `Feature flags decouple deployment from release. Code ships to production but features activate only for specified users — 1% for testing, 10% for beta, specific segments for targeting, or everyone for launch. This pattern reduces deployment risk and enables experimentation at any scale.

For AI-powered growth, feature flags are essential infrastructure. They enable A/B testing AI features against non-AI baselines, gradual rollout of new models (catch quality regressions before they affect all users), user-segment targeting for personalized experiences, and instant rollback when an AI feature misbehaves in production.

Modern feature flag platforms (LaunchDarkly, Statsig, GrowthBook) integrate with analytics and experimentation, making it trivial to measure the impact of every feature on business metrics. For AI products specifically, feature flags enable model-level routing: serve model A to segment X and model B to segment Y, measuring which performs better. This turns model selection from a one-time decision into a continuous optimization process.`,
    category: "engineering",
    relatedTerms: ["a-b-testing", "mlops", "model-serving"],
    relatedPosts: ["ai-ab-testing", "conversion-optimization-ai"],
  },
  {
    slug: "mlops",
    term: "MLOps",
    definition:
      "The set of practices combining machine learning, DevOps, and data engineering to reliably deploy, monitor, and maintain ML models in production.",
    explanation: `MLOps bridges the gap between training a model in a notebook and running it reliably in production. It covers the full lifecycle: data versioning, experiment tracking, model training pipelines, evaluation, deployment, monitoring, and retraining triggers.

The MLOps maturity spectrum ranges from Level 0 (manual everything — Jupyter notebook to production) to Level 3 (fully automated CI/CD for ML — automatic retraining triggered by data drift detection). Most growth teams should aim for Level 1-2: automated training pipelines, version-controlled experiments, automated evaluation against test sets, and basic model monitoring.

Key MLOps tools include experiment trackers (Weights & Biases, MLflow), feature stores (Feast, Tecton), model registries (MLflow, Vertex AI), serving platforms (BentoML, Seldon), and monitoring solutions (Evidently, Arize). For teams using primarily LLMs and APIs, "LLMOps" is an emerging subset focused on prompt management, cost tracking, evaluation pipelines, and guardrails — with tools like LangSmith and Helicone filling this niche.`,
    category: "engineering",
    relatedTerms: ["model-serving", "feature-flag", "a-b-testing"],
    relatedPosts: ["llm-cost-optimization-guide", "ai-ab-testing"],
  },
  {
    slug: "model-serving",
    term: "Model Serving",
    definition:
      "The infrastructure and systems that host trained ML models and handle inference requests in production, optimizing for latency, throughput, and cost.",
    explanation: `Model serving is the bridge between a trained model and user-facing features. It handles receiving requests, running inference, returning results, and managing the operational concerns of production systems: scaling, load balancing, batching, caching, and failover.

For teams using LLM APIs (OpenAI, Anthropic), model serving is largely handled by the provider. Your engineering focus shifts to API management: request routing between models based on task complexity, response caching for common queries, rate limit management, and fallback chains when primary models are unavailable. A typical production setup routes 70-80% of requests to cheaper models, escalating only complex cases to premium models.

For teams running self-hosted models (fine-tuned models, embedding models, custom classifiers), serving infrastructure matters more. Solutions like vLLM, TGI, and BentoML handle GPU utilization, request batching, and scaling. The key optimization is batching: processing multiple requests together on the GPU dramatically improves throughput and reduces per-request cost, at the expense of slightly higher latency for individual requests.`,
    category: "engineering",
    relatedTerms: ["mlops", "batch-inference", "real-time-inference"],
    relatedPosts: ["llm-cost-optimization-guide", "fine-tuning-vs-prompting"],
  },
  {
    slug: "semantic-search",
    term: "Semantic Search",
    definition:
      "Search that understands the meaning and intent behind a query rather than just matching keywords, typically powered by embedding-based similarity comparison.",
    explanation: `Semantic search transforms the search experience from "find pages containing these words" to "find content about this concept." A search for "how to keep users from leaving" returns results about churn prevention, retention strategies, and engagement optimization — even if none of those pages contain the exact words "keep users from leaving."

The technical approach: content is converted to embeddings (dense vectors capturing semantic meaning) and stored in a vector database. Search queries are also embedded, and the most similar content vectors are retrieved. This handles synonyms, paraphrasing, and conceptual similarity naturally, because similar meanings produce similar embeddings.

Production semantic search typically combines vector similarity with traditional keyword matching (hybrid search) for the best results. Vector search handles conceptual queries; keyword search catches specific terms, names, and codes that embeddings might not distinguish. Reciprocal rank fusion merges results from both systems. Adding re-ranking with a cross-encoder model on top further improves relevance, typically by 10-20% in precision metrics.`,
    category: "engineering",
    relatedTerms: ["embeddings", "vector-database", "cosine-similarity"],
    relatedPosts: [
      "embedding-models-2026",
      "vector-databases-comparison-2026",
      "rag-pipeline-mistakes",
    ],
  },

  // --- data ---
  {
    slug: "cosine-similarity",
    term: "Cosine Similarity",
    definition:
      "A measure of similarity between two vectors based on the cosine of the angle between them, ranging from -1 (opposite) to 1 (identical), commonly used to compare embeddings.",
    explanation: `Cosine similarity is the standard metric for comparing embeddings. It measures how similar two vectors' directions are, regardless of their magnitudes. Two document embeddings with a cosine similarity of 0.95 are about the same topic; at 0.5, they share some themes; at 0.1, they're largely unrelated.

The formula is straightforward: cos(A, B) = (A dot B) / (|A| * |B|). The dot product measures directional alignment; dividing by magnitudes normalizes for vector length. This normalization is important because it means cosine similarity measures semantic similarity regardless of document length — a 100-word summary and a 10,000-word article on the same topic will have high cosine similarity.

In practice, cosine similarity powers the retrieval step of RAG pipelines, recommendation similarity scores, duplicate detection, and clustering quality metrics. Most vector databases use cosine similarity (or its cousin, dot product on normalized vectors) as the default distance metric. When tuning thresholds — e.g., "show related articles with similarity above X" — typical production values range from 0.7 (loose, more results) to 0.9 (strict, fewer but more relevant results).`,
    category: "data",
    relatedTerms: ["embeddings", "vector-database", "semantic-search"],
    relatedPosts: ["embedding-models-benchmark-2026", "embedding-models-2026"],
  },
  {
    slug: "dimensionality-reduction",
    term: "Dimensionality Reduction",
    definition:
      "Techniques that reduce the number of dimensions in high-dimensional data while preserving meaningful structure, used for visualization, compression, and noise removal.",
    explanation: `Embeddings live in high-dimensional spaces — 768, 1536, or even 3072 dimensions. Dimensionality reduction compresses these into lower-dimensional representations (2D for visualization, 256D for efficiency) while preserving the relative distances between points as much as possible.

Common techniques include PCA (Principal Component Analysis) for linear reduction, t-SNE for 2D/3D visualization of clusters, and UMAP for preserving both local and global structure. Matryoshka embeddings (supported by models like OpenAI's text-embedding-3) offer a different approach: the model is trained so that the first N dimensions are a valid lower-dimensional embedding, letting you truncate without a separate reduction step.

For growth teams, dimensionality reduction has practical applications: visualizing user segments to understand behavioral clusters, compressing embeddings to reduce vector database storage costs and improve search speed, and removing noise dimensions that hurt downstream model performance. The trade-off is always information loss — the question is whether the speed and cost savings justify the small accuracy reduction.`,
    category: "data",
    relatedTerms: ["embeddings", "cosine-similarity", "vector-database"],
    relatedPosts: ["embedding-models-2026", "embedding-models-benchmark-2026"],
  },
  {
    slug: "batch-inference",
    term: "Batch Inference",
    definition:
      "Processing multiple ML predictions as a group at scheduled intervals rather than one-at-a-time on demand, optimizing for throughput and cost over latency.",
    explanation: `Batch inference processes predictions in bulk — running your model on thousands or millions of inputs at once, typically on a schedule (hourly, nightly). This contrasts with real-time inference, where predictions are generated on-demand for each request.

Batch inference is dramatically cheaper than real-time for several reasons: GPU utilization is higher when processing full batches, API providers offer 50% discounts for batch endpoints, and you can use spot/preemptible instances since timing isn't critical. A nightly batch job processing 100K recommendations might cost $50, while the same predictions served real-time could cost $500+.

Common growth use cases for batch inference: precomputing content recommendations for all users, generating personalized email content for campaigns, scoring all accounts for churn risk, embedding new content for search indexes, and generating SEO meta descriptions for product pages. The pattern is simple: if the prediction can be slightly stale (hours, not seconds), batch it. Reserve real-time inference for interactive features where freshness matters.`,
    category: "data",
    relatedTerms: ["real-time-inference", "model-serving", "mlops"],
    relatedPosts: ["llm-cost-optimization-guide", "ai-personalization-scale"],
  },
  {
    slug: "real-time-inference",
    term: "Real-Time Inference",
    definition:
      "Generating ML predictions on-demand as requests arrive, typically with latency requirements under 200ms for user-facing features.",
    explanation: `Real-time inference serves predictions the moment they're needed — a user asks a question and gets an AI response in seconds, a visitor lands on a page and sees personalized recommendations immediately, a support ticket is auto-classified as it's submitted.

The engineering challenges are significant: maintaining low, consistent latency under variable load; scaling GPU/API capacity to match traffic patterns; handling failures gracefully when models time out or return errors; and managing costs that scale linearly with request volume.

Optimization strategies include model routing (using smaller, faster models for simpler requests), response caching (semantic caching can achieve 30-50% hit rates), request batching (grouping concurrent requests for better GPU utilization), and precomputation (combining batch-computed features with real-time model calls). The most cost-effective architectures use a hybrid approach: batch inference for predictable, cacheable predictions and real-time inference only for truly dynamic, session-specific responses.`,
    category: "data",
    relatedTerms: ["batch-inference", "model-serving", "mlops"],
    relatedPosts: ["llm-cost-optimization-guide", "personalization-engines"],
  },
];

export function getAllTerms(): GlossaryTerm[] {
  return glossaryTerms.sort((a, b) => a.term.localeCompare(b.term));
}

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function getTermsByCategory(
  category: GlossaryTerm["category"]
): GlossaryTerm[] {
  return glossaryTerms
    .filter((t) => t.category === category)
    .sort((a, b) => a.term.localeCompare(b.term));
}
