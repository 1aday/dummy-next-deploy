export interface FaqItem {
  question: string;
  answer: string;
}

const faqData: Record<string, FaqItem[]> = {
  "ai-product-growth-2026": [
    { question: "What is AI-powered product growth?", answer: "AI-powered product growth uses machine learning models to optimize every stage of the user funnel—from acquisition through retention and monetization. Instead of static rules, AI systems learn from user behavior to personalize experiences, predict churn, and automate growth loops at scale." },
    { question: "How does AI improve user retention?", answer: "AI improves retention through predictive churn models that identify at-risk users weeks before they leave, personalized re-engagement campaigns tailored to individual behavior patterns, and dynamic feature discovery that surfaces relevant features users haven't tried yet." },
    { question: "What are AI growth loops?", answer: "AI growth loops are self-reinforcing cycles where each user's actions generate data that improves the product for future users. Examples include recommendation engines that get smarter with more usage, AI-generated content from user activity that attracts organic traffic, and personalization that improves as the user base grows." },
  ],
  "rag-pipeline-mistakes": [
    { question: "What is RAG in AI?", answer: "RAG (Retrieval-Augmented Generation) is a pattern that enhances LLM responses by retrieving relevant documents from a knowledge base and including them in the prompt context. This grounds the model's responses in factual data rather than relying solely on training data." },
    { question: "What are the most common RAG pipeline mistakes?", answer: "The most common mistakes include poor chunking strategies that break context, using the wrong embedding model for your domain, neglecting hybrid search (combining vector and keyword search), skipping re-ranking after initial retrieval, and not implementing evaluation pipelines to measure retrieval quality." },
    { question: "How do you improve RAG accuracy?", answer: "Improve RAG accuracy by implementing hybrid search combining vector similarity with BM25 keyword matching, adding a cross-encoder re-ranking step, using query transformation to reformulate user queries, applying metadata filtering before vector search, and continuously evaluating retrieval quality with automated testing." },
  ],
  "predictive-churn-models": [
    { question: "How do you predict customer churn with AI?", answer: "Predict churn by training ML models (typically gradient-boosted trees like XGBoost) on behavioral features: login frequency trends, feature adoption breadth, support ticket sentiment, time between key actions, and comparison to cohort behavior patterns. Models can achieve 80%+ accuracy at predicting 30-day churn." },
    { question: "What features are most predictive of churn?", answer: "The most predictive features include declining login frequency (trajectory matters more than count), decreasing feature usage breadth, increasing time gaps between key actions, negative support ticket sentiment, and divergence from healthy cohort behavior patterns." },
    { question: "When should you intervene to prevent churn?", answer: "Intervene based on risk level: low-risk users get automated nudges like feature tips, medium-risk users receive personalized email sequences and in-app messages, and high-risk users get direct human outreach from customer success managers. The key is acting weeks before the user considers leaving." },
  ],
  "prompt-engineering-best-practices-2026": [
    { question: "What is prompt engineering?", answer: "Prompt engineering is the practice of designing and optimizing inputs to large language models to get reliable, high-quality outputs. It includes crafting system prompts, using few-shot examples, structuring output formats, and implementing chain-of-thought reasoning to improve model performance." },
    { question: "What are the best practices for prompt engineering in 2026?", answer: "Key practices include using detailed system prompts as behavioral operating systems, providing 3-5 few-shot examples of ideal input/output pairs, requesting structured output (JSON/XML) for reliable parsing, employing chain-of-thought prompting for complex reasoning, and iterating through 10-20 prompt versions with 50+ test cases before shipping." },
    { question: "How does prompt engineering compare to fine-tuning?", answer: "Start with prompt engineering—it handles 90% of use cases without the cost and complexity of fine-tuning. Fine-tuning is only justified when you need consistent style that prompting can't achieve, lower latency from a smaller model, domain-specific knowledge, or significantly lower per-inference costs at scale." },
  ],
  "embedding-recommendations": [
    { question: "How do embeddings power recommendation systems?", answer: "Embeddings map users and items into the same vector space where proximity indicates relevance. By averaging embeddings of items a user has engaged with (weighted by recency and interaction strength), you create a user profile that can be matched against all item embeddings to surface relevant recommendations." },
    { question: "What is the cold-start problem in recommendations?", answer: "The cold-start problem occurs when new users or items lack interaction data for collaborative filtering. Embedding-based recommendations solve this by using content embeddings—new items immediately have embeddings based on their text, images, or metadata, enabling recommendations without any interaction history." },
    { question: "How do you build real-time recommendation updates?", answer: "Update user embeddings after each interaction by recomputing the weighted average of their engaged item embeddings. This lets recommendations adapt within a single session. Combine content-based embeddings with collaborative filtering signals for a hybrid approach that captures both semantic similarity and behavioral patterns." },
  ],
};

export function getFaqsForSlug(slug: string): FaqItem[] | null {
  return faqData[slug] || null;
}
