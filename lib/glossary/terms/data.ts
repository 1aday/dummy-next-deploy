import type { GlossaryTerm } from "../types";

export const dataTerms: GlossaryTerm[] = [
  // --- Existing terms (preserved from lib/glossary.ts) ---
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

  // --- New terms ---
  {
    slug: "data-pipeline",
    term: "Data Pipeline",
    definition:
      "An automated sequence of data processing steps that moves data from source systems through transformations to destination systems, enabling reliable and repeatable data flows across an organization.",
    explanation: `Data pipelines orchestrate the movement and transformation of data from where it is generated to where it is needed. A pipeline might ingest raw clickstream events from a web application, clean and validate the data, join it with user profile information, compute aggregate metrics, and load the results into a data warehouse for analysis.

Pipelines are built with orchestration tools like Apache Airflow, Dagster, Prefect, or cloud-native services like AWS Step Functions. These tools manage scheduling, dependency resolution, retries, monitoring, and alerting. Each pipeline step is typically idempotent, so failed runs can be safely retried without producing duplicate data.

For AI teams, data pipelines feed the features and training data that models depend on. A well-designed pipeline ensures that feature computation is consistent between training and serving, that data quality issues are caught before they corrupt model inputs, and that new data flows are easy to add as models evolve. Pipeline reliability directly determines model reliability, making it foundational infrastructure for any AI-powered product.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "etl",
    term: "ETL (Extract, Transform, Load)",
    definition:
      "A data integration pattern that extracts data from source systems, transforms it into a structured format suitable for analysis, and loads it into a target data warehouse or database.",
    explanation: `ETL is the traditional approach to data integration. The extract phase pulls data from operational databases, APIs, files, and other sources. The transform phase cleans, validates, deduplicates, and reshapes the data into a schema optimized for analytics. The load phase writes the transformed data into the destination system, typically a data warehouse.

Transformations happen before loading, meaning the data warehouse receives clean, structured data ready for querying. This approach works well when transformation logic is well-understood, compute resources at the transformation layer are cheaper than at the warehouse, and analysts need consistently structured data.

ETL tools like Informatica, Talend, and Apache NiFi have been the backbone of enterprise data integration for decades. For AI teams, ETL pipelines prepare training datasets by extracting raw data, applying feature engineering transformations, handling missing values, encoding categorical variables, and loading the results into feature stores or training data repositories. The key challenge is maintaining transformation logic as data sources and model requirements evolve.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "elt",
    term: "ELT (Extract, Load, Transform)",
    definition:
      "A modern data integration pattern that loads raw data directly into a target system first and then transforms it in place, leveraging the processing power of cloud data warehouses.",
    explanation: `ELT reverses the traditional ETL order. Raw data is extracted from sources and loaded directly into a cloud data warehouse (Snowflake, BigQuery, Redshift) without transformation. Transformations then happen inside the warehouse using SQL, leveraging the warehouse's massive parallel processing capabilities.

This approach became practical with the rise of cloud data warehouses that offer virtually unlimited compute for transformation. Tools like Fivetran and Airbyte handle the extract-load phase, syncing data from hundreds of sources into the warehouse. dbt (data build tool) then handles the transform phase, applying SQL transformations with version control, testing, and documentation.

For AI teams, ELT offers flexibility. Raw data is preserved in the warehouse, so new features can be computed from historical data without re-extracting from sources. Data scientists can experiment with different transformations using SQL before productionizing them as dbt models. The approach also supports schema evolution more gracefully, since raw data is always available for reprocessing when requirements change.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-warehouse",
    term: "Data Warehouse",
    definition:
      "A centralized analytical database optimized for complex queries across large volumes of structured historical data, designed for reporting, business intelligence, and data-driven decision making.",
    explanation: `Data warehouses collect data from multiple operational systems into a single analytical repository. Unlike transactional databases optimized for fast writes and point lookups, warehouses are optimized for complex analytical queries that scan millions of rows: aggregations, joins across large tables, time-series analysis, and multi-dimensional reporting.

Modern cloud data warehouses like Snowflake, Google BigQuery, and Amazon Redshift separate storage from compute, allowing each to scale independently. You can store petabytes of data cheaply and spin up massive compute clusters only when running heavy queries. This architecture makes data warehouses cost-effective for both storage and analytics at any scale.

For AI teams, the data warehouse often serves as the source of truth for feature engineering and model training data. Historical user behavior, transaction records, and product data flow into the warehouse, where feature engineering queries transform raw data into model inputs. Many teams use the warehouse as the computation layer for batch feature pipelines, with results exported to feature stores for real-time model serving.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-lake",
    term: "Data Lake",
    definition:
      "A centralized storage repository that holds vast amounts of raw data in its native format, including structured, semi-structured, and unstructured data, until it is needed for analysis.",
    explanation: `Data lakes store everything in its original form: JSON logs, CSV files, images, video, Parquet files, and database exports all coexist in a single storage layer, typically cloud object storage like S3 or GCS. The schema-on-read approach means data is structured only when queried, not when stored, providing maximum flexibility for future use cases.

The advantage is that data lakes preserve raw data without upfront schema decisions. You do not need to know how the data will be used when you ingest it. This is valuable when data usage evolves rapidly, which is common in AI development where new model features might require reprocessing historical data in novel ways.

The challenge is that data lakes can become "data swamps" without proper governance: undocumented datasets, unknown data quality, duplicate files, and no discoverability. Successful data lakes require metadata catalogs, access controls, data quality monitoring, and lifecycle management. For AI teams, the data lake is often the raw data source that feeds both the data warehouse and direct model training pipelines.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-lakehouse",
    term: "Data Lakehouse",
    definition:
      "A hybrid data architecture that combines the low-cost scalable storage of data lakes with the structured querying and ACID transaction capabilities of data warehouses in a single platform.",
    explanation: `The data lakehouse architecture emerged to resolve the tension between data lakes and data warehouses. It adds a metadata and transaction layer on top of data lake storage, enabling warehouse-like features: ACID transactions, schema enforcement, time travel (querying historical versions), and performant SQL analytics directly on lake data.

Technologies like Delta Lake, Apache Iceberg, and Apache Hudi provide this transactional layer. They store data in open formats (Parquet) on object storage while maintaining metadata that enables efficient queries, schema evolution, and data versioning. Platforms like Databricks and Dremio build full analytics experiences on top of these table formats.

For AI teams, the lakehouse is particularly appealing because it supports both analytics workloads (SQL queries for feature engineering and reporting) and ML workloads (direct data access for model training) on the same data without duplication. Data versioning enables reproducible training datasets, and the open format ensures compatibility with any processing framework, from Spark to PyTorch DataLoaders.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-mesh",
    term: "Data Mesh",
    definition:
      "A decentralized data architecture paradigm where domain teams own and operate their data as products, with federated governance and self-serve infrastructure replacing centralized data teams.",
    explanation: `Data mesh, introduced by Zhamak Dehghani, applies domain-driven design principles to data architecture. Instead of a central data team owning all data pipelines and the data warehouse, each domain team (payments, user engagement, content) owns their data end-to-end and publishes it as a product that other teams can discover and consume.

The four principles are domain ownership (teams own their data), data as a product (data is treated with the same rigor as customer-facing products), self-serve infrastructure (platform teams provide tools that domain teams use independently), and federated computational governance (global standards with local autonomy).

For AI teams in large organizations, data mesh addresses the bottleneck of centralized data teams. Instead of waiting weeks for a central team to build a pipeline for a new feature, the domain team that generates the data provides it as a well-documented, quality-assured data product. AI teams consume these data products as model inputs, with clear contracts around freshness, quality, and schema stability.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-catalog",
    term: "Data Catalog",
    definition:
      "A centralized inventory of all data assets in an organization, providing searchable metadata, documentation, lineage, and quality information to help teams discover and understand available data.",
    explanation: `Data catalogs solve the "where is the data and what does it mean" problem. As organizations accumulate hundreds of tables, datasets, and pipelines, finding and understanding the right data becomes a major productivity challenge. A data catalog indexes all data assets with descriptions, ownership, quality scores, usage statistics, and lineage information.

Tools like Atlan, DataHub, Amundsen, and cloud-native catalogs (AWS Glue Catalog, Google Data Catalog) provide searchable interfaces where analysts and engineers can discover datasets, understand their schemas, trace lineage from source to destination, and assess data quality before building on top of them.

For AI teams, a data catalog accelerates feature engineering by making it easy to discover relevant datasets for model training. Instead of asking around or browsing database schemas, a data scientist can search the catalog for "user engagement metrics" and find documented, quality-assessed tables with clear ownership. This reduces the time from idea to model prototype and improves feature quality by surfacing the best available data.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "feature-store",
    term: "Feature Store",
    definition:
      "A centralized repository for storing, managing, and serving machine learning features, ensuring consistency between the features used during model training and those served during real-time inference.",
    explanation: `Feature stores solve the training-serving skew problem. When a model is trained on features computed in a batch pipeline using Python and Spark, but served features computed in a real-time API using different code, subtle differences in computation logic can degrade model performance. A feature store provides a single source of truth for feature definitions and values, used by both training and serving paths.

Key capabilities include feature registration (defining features with metadata and transformation logic), offline storage (historical feature values for training), online storage (low-latency feature access for real-time serving), point-in-time correctness (ensuring training data reflects only information available at prediction time), and feature monitoring (tracking drift and quality).

Tools like Feast (open source), Tecton, and Hopsworks provide these capabilities. For growth teams building multiple ML models (churn prediction, recommendations, lead scoring), a feature store enables feature reuse across models, reduces duplicate computation, and ensures that all models see consistent, high-quality features.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "feature-engineering",
    term: "Feature Engineering",
    definition:
      "The process of creating, selecting, and transforming raw data into meaningful input variables (features) that improve machine learning model performance and predictive accuracy.",
    explanation: `Feature engineering is often the most impactful lever for improving model quality. Raw data rarely maps directly to what models need. A timestamp becomes features like "day of week," "hour of day," "days since last purchase," and "is weekend." A text field becomes sentiment scores, keyword indicators, length metrics, and embedding vectors. The art is identifying which transformations capture the signal that helps the model make better predictions.

Common techniques include aggregation (count of logins in the last 7 days), ratio computation (purchase-to-visit ratio), time-based features (recency, frequency, monetary values), categorical encoding (one-hot, target encoding), interaction features (product of two features), and embedding generation (converting text or categorical data into dense vectors).

For growth models, domain-specific features often outperform generic ones. A churn prediction model benefits from features like "percentage decline in feature usage over 30 days," "number of support tickets with negative sentiment," and "days since last team member invitation." The best features encode domain knowledge about what behaviors signal the outcome you are predicting.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-drift",
    term: "Data Drift",
    definition:
      "A change in the statistical properties of model input data over time compared to the training data distribution, potentially degrading model performance if left undetected and unaddressed.",
    explanation: `Data drift occurs when the real-world data your model encounters diverges from the data it was trained on. A product recommendation model trained on pre-pandemic shopping behavior will perform poorly when consumer preferences shift. A fraud detection model trained on historical patterns will miss new fraud techniques. The model itself has not changed, but the world around it has.

There are several types of drift. Covariate drift is when input feature distributions change (average order value increases). Concept drift is when the relationship between features and the target changes (what constitutes a "good" recommendation evolves). Prior probability drift is when the class distribution changes (fraud becomes more or less common).

Monitoring for drift involves statistical tests (Kolmogorov-Smirnov, Population Stability Index, Jensen-Shannon divergence) comparing recent data distributions against the training baseline. When significant drift is detected, teams can retrain the model on recent data, adjust feature engineering, or trigger alerts for manual investigation. Tools like Evidently, Arize, and WhyLabs provide drift monitoring as part of their ML observability platforms.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "model-monitoring",
    term: "Model Monitoring",
    definition:
      "The practice of continuously tracking ML model performance, data quality, and system health in production to detect degradation, drift, and anomalies before they significantly impact users.",
    explanation: `Model monitoring goes beyond infrastructure monitoring to track the quality of model outputs. While infrastructure metrics tell you if the model is serving responses, model monitoring tells you if those responses are any good. Key metrics include prediction accuracy (compared against delayed ground truth), output distribution (are predictions shifting?), feature drift (are inputs changing?), and business impact (are model-driven features achieving their goals?).

A comprehensive monitoring setup includes real-time dashboards for prediction distributions, automated alerts when metrics cross thresholds, data drift detection comparing current inputs to training distributions, and feedback loop tracking that connects model predictions to business outcomes.

For AI products in production, model monitoring is essential because model degradation is often silent. A recommendation model might gradually serve less relevant suggestions as user preferences evolve, with engagement declining slowly enough that no single alert fires. Continuous monitoring with trend analysis catches this gradual degradation, triggering retraining or investigation before the business impact becomes significant.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "statistical-significance",
    term: "Statistical Significance",
    definition:
      "A determination that an observed result is unlikely to have occurred by random chance alone, typically declared when the p-value falls below a predetermined threshold, usually 0.05.",
    explanation: `Statistical significance answers the question: "Is this result real or just noise?" In A/B testing, you observe a difference between variants (e.g., variant B has a 3% higher conversion rate). Statistical significance testing determines whether this observed difference is likely due to the actual effect of your change or could plausibly be explained by random variation in user behavior.

The standard approach uses hypothesis testing. The null hypothesis assumes no difference between variants. You calculate a test statistic and corresponding p-value. If the p-value is below your significance level (typically 0.05, meaning a 5% chance of a false positive), you reject the null hypothesis and declare the result statistically significant.

Common pitfalls include peeking at results before the sample size is reached (inflating false positive rates), ignoring multiple testing corrections when evaluating many metrics simultaneously, and conflating statistical significance with practical significance. A result can be statistically significant but practically meaningless if the effect size is tiny. Always consider effect size and confidence intervals alongside p-values when making decisions.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "p-value",
    term: "P-Value",
    definition:
      "The probability of observing results at least as extreme as the actual results, assuming the null hypothesis is true, used to assess the strength of evidence against the null hypothesis in statistical testing.",
    explanation: `The p-value quantifies how surprising your data is under the assumption that there is no real effect. A p-value of 0.03 means there is a 3% probability of seeing a result this extreme (or more extreme) if the null hypothesis were true. It does not mean there is a 3% probability that the null hypothesis is true; this is a common and important misconception.

In practice, p-values below 0.05 are conventionally considered statistically significant, though this threshold is arbitrary. A p-value of 0.049 and 0.051 represent nearly identical evidence, yet one crosses the threshold and the other does not. This binary interpretation has led to calls for more nuanced statistical reporting, including confidence intervals and effect sizes.

For growth teams running A/B tests, understanding p-values prevents costly decision errors. A very small p-value (0.001) with a large effect size is strong evidence for shipping a change. A borderline p-value (0.04) with a small effect size might not justify the engineering cost of implementation. Bayesian alternatives provide more intuitive probability statements and are increasingly popular in modern experimentation platforms.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "bayesian-inference",
    term: "Bayesian Inference",
    definition:
      "A statistical framework that updates probability estimates as new evidence becomes available, combining prior beliefs with observed data to produce posterior probability distributions over hypotheses.",
    explanation: `Bayesian inference starts with a prior distribution representing your belief before seeing data, then updates this belief using observed data through Bayes' theorem to produce a posterior distribution. Unlike frequentist methods that provide point estimates and p-values, Bayesian methods provide full probability distributions that answer questions like "what is the probability that variant B is better than variant A?"

The Bayesian approach is particularly natural for A/B testing. Instead of waiting for a fixed sample size and then declaring significance, Bayesian methods continuously update the probability that each variant is best. You can check results at any time without inflating error rates, and the output is intuitive: "there is a 94% probability that variant B improves conversion by 2-5%."

For growth teams, Bayesian methods offer practical advantages. They handle small sample sizes better than frequentist methods, provide probabilistic answers that align with business decision-making, and support more flexible experimental designs. Platforms like Optimizely and VWO now offer Bayesian analysis alongside traditional frequentist statistics.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "multi-armed-bandit",
    term: "Multi-Armed Bandit",
    definition:
      "An optimization algorithm that balances exploration of unknown options with exploitation of known good options, dynamically allocating more traffic to better-performing variants during an experiment.",
    explanation: `The multi-armed bandit problem gets its name from a gambler facing multiple slot machines (one-armed bandits) with unknown payout rates. The gambler must balance trying different machines to learn their payouts (exploration) with playing the machine that seems best so far (exploitation). In optimization, each "arm" is a variant being tested.

Unlike traditional A/B tests that split traffic equally for the entire experiment, bandit algorithms dynamically shift traffic toward better-performing variants. Thompson Sampling, Upper Confidence Bound (UCB), and epsilon-greedy are common algorithms. As data accumulates, more traffic flows to the winning variant, reducing the opportunity cost of showing inferior variants to users.

For growth teams, bandits are ideal for optimizing continuous choices: which headline to show, which recommendation algorithm to use, which pricing tier to display. They converge faster than A/B tests for clear winners and continuously adapt to changing conditions. The trade-off is reduced statistical rigor: bandits optimize for cumulative reward rather than producing clean causal estimates of treatment effects.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "thompson-sampling",
    term: "Thompson Sampling",
    definition:
      "A Bayesian bandit algorithm that selects actions by sampling from posterior probability distributions of each option's reward, naturally balancing exploration and exploitation as uncertainty decreases.",
    explanation: `Thompson Sampling maintains a probability distribution (typically Beta distribution for binary outcomes) over the expected reward for each variant. At each decision point, it samples a value from each variant's distribution and selects the variant with the highest sampled value. Early on, when distributions are wide (high uncertainty), exploration happens naturally. As data accumulates and distributions narrow, the algorithm increasingly exploits the best variant.

The elegance of Thompson Sampling lies in its principled uncertainty handling. A variant with limited data has a wide distribution, so it occasionally samples high values and gets explored. A variant with strong evidence of being best has a narrow, high distribution and is selected most of the time. No manual tuning of exploration rates is needed.

For AI-powered personalization, Thompson Sampling is widely used to optimize content recommendations, email send times, notification strategies, and pricing. It adapts quickly to changing user preferences and handles the cold-start problem gracefully by maintaining appropriate uncertainty for new options. Its Bayesian foundation also provides natural confidence intervals for reporting.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "streaming-data",
    term: "Streaming Data",
    definition:
      "Continuously generated data that is processed and analyzed in real time or near-real time as it arrives, rather than being stored first and processed in batches at scheduled intervals.",
    explanation: `Streaming data architectures process events as they flow through the system, enabling sub-second reactions to new information. User clicks, IoT sensor readings, transaction events, and log entries are examples of streaming data. Platforms like Apache Kafka, Apache Flink, Apache Spark Streaming, and AWS Kinesis provide the infrastructure for ingesting and processing these continuous data flows.

The key architectural difference from batch processing is that streaming systems process events individually or in micro-batches (milliseconds to seconds) rather than large batches (minutes to hours). This enables use cases that require immediacy: real-time fraud detection, live dashboards, instant personalization, and alerting on anomalous patterns.

For AI products, streaming data enables real-time feature computation for model inference. Instead of relying on features computed hours ago in a batch pipeline, streaming pipelines compute up-to-the-second features like "number of page views in the last 5 minutes" or "running average session duration." This freshness can significantly improve model accuracy for time-sensitive predictions like fraud detection and real-time recommendations.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "change-data-capture",
    term: "Change Data Capture (CDC)",
    definition:
      "A technique for identifying and capturing changes made to a database in real time by reading the database's transaction log, enabling downstream systems to react to data changes as they occur.",
    explanation: `CDC reads the write-ahead log (WAL) or binary log of a database to capture every insert, update, and delete as it happens. Tools like Debezium, AWS DMS, and Fivetran use CDC to stream database changes to downstream systems without impacting the source database's performance. This is far more efficient than periodic full-table scans to detect changes.

The captured change events contain the before and after state of each row, along with metadata like the transaction ID and timestamp. These events can be streamed to message queues (Kafka), data warehouses, search indexes, or caches, keeping downstream systems synchronized with the source database in near-real time.

For AI systems, CDC enables real-time feature updates. When a user updates their profile or makes a purchase, CDC captures the change and streams it to the feature store, ensuring that the next model prediction uses the latest information. CDC also enables incremental model training data pipelines, where only new and changed records are processed rather than reprocessing the entire dataset.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-lineage",
    term: "Data Lineage",
    definition:
      "The tracking of data's origin, transformations, and movement through systems over time, providing an audit trail that shows where data came from, how it was modified, and where it was delivered.",
    explanation: `Data lineage answers critical questions: "Where did this number in the dashboard come from?" and "If I change this source table, what downstream reports and models will be affected?" It maps the complete journey of data from source systems through transformations, aggregations, and derivations to final consumption points.

Lineage can be captured at different granularities: table-level (this table feeds that table), column-level (this column is derived from those columns), and row-level (this specific record came from that specific source record). Tools like dbt provide automatic lineage through SQL parsing, while platforms like Atlan and DataHub aggregate lineage across multiple data systems.

For AI teams, data lineage is essential for model governance and debugging. When a model's performance degrades, lineage helps trace back from model predictions through feature pipelines to source data, identifying where a data quality issue was introduced. Lineage also supports regulatory compliance by documenting how personal data flows through ML systems and which models consume it.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-governance",
    term: "Data Governance",
    definition:
      "The framework of policies, processes, and standards that ensure data is managed consistently, securely, and in compliance with regulations throughout its lifecycle across an organization.",
    explanation: `Data governance establishes the rules for how data is collected, stored, accessed, shared, and deleted. It covers data ownership (who is responsible for each dataset), access control (who can read or modify data), quality standards (what level of accuracy and completeness is required), retention policies (how long data is kept), and regulatory compliance (GDPR, CCPA, HIPAA requirements).

Effective governance balances control with accessibility. Overly restrictive governance creates bottlenecks where teams wait weeks for data access approvals. Too little governance leads to data quality issues, security breaches, and compliance violations. Modern data governance platforms provide self-serve access with automated policy enforcement, audit logging, and classification-based controls.

For AI teams, data governance has direct implications for model development. Training data must comply with privacy regulations, access to sensitive features requires proper authorization, model outputs containing personal information must respect data handling policies, and audit trails must document which data was used to train which models. Governance is not just a compliance requirement; it builds the trust needed for AI systems to operate responsibly.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-quality",
    term: "Data Quality",
    definition:
      "The measure of data's fitness for its intended use, assessed across dimensions including accuracy, completeness, consistency, timeliness, and validity, directly impacting the reliability of analytics and ML models.",
    explanation: `Data quality issues are the most common cause of ML model failures in production. The classic "garbage in, garbage out" principle applies directly: a model trained on inaccurate, incomplete, or inconsistent data will produce unreliable predictions regardless of how sophisticated the algorithm is.

Key data quality dimensions include accuracy (does the data reflect reality?), completeness (are values missing?), consistency (do related fields agree?), timeliness (is the data current?), uniqueness (are there duplicates?), and validity (do values fall within expected ranges?). Automated quality checks at each pipeline stage catch issues before they propagate downstream.

Tools like Great Expectations, dbt tests, Soda, and Monte Carlo provide data quality testing and monitoring. For AI teams, quality checks should cover training data (distribution validation, label accuracy), feature data (null rates, range validation, freshness), and model output data (format validation, distribution monitoring). Investing in data quality prevention is dramatically cheaper than debugging model failures caused by bad data.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "schema-evolution",
    term: "Schema Evolution",
    definition:
      "The process of modifying a data schema over time to accommodate changing requirements while maintaining backward and forward compatibility with existing data and consumers.",
    explanation: `Schemas evolve as business requirements change: new fields are added, fields are renamed, types change, and deprecated fields are removed. Schema evolution manages these changes without breaking existing data pipelines, applications, or stored data. The challenge is coordinating changes across producers, storage, and consumers that may update at different times.

Schema registries (like Confluent Schema Registry) enforce compatibility rules. Backward-compatible changes (adding optional fields, removing fields with defaults) ensure new consumers can read old data. Forward-compatible changes ensure old consumers can read new data. Full compatibility ensures both, but limits the types of changes allowed.

For AI data pipelines, schema evolution is critical because training data accumulates over time. When a feature schema changes, historical data must remain usable or be migrated. Formats like Parquet, Avro, and Delta Lake support schema evolution natively, allowing columns to be added, removed, or renamed while maintaining the ability to read historical data. This ensures that model training can use the full historical dataset even as the schema evolves.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-partitioning",
    term: "Data Partitioning",
    definition:
      "The practice of dividing large datasets into smaller, manageable segments based on key attributes like date or region, improving query performance by allowing the system to scan only relevant partitions.",
    explanation: `Data partitioning organizes data into physical or logical segments based on a partition key. A table partitioned by date stores each day's data separately. When a query filters on date range, the query engine skips irrelevant partitions entirely, dramatically reducing the amount of data scanned and the query execution time.

Common partitioning strategies include range partitioning (by date, numeric ranges), hash partitioning (distributing evenly by hash of a key), and list partitioning (by specific values like country or category). The choice of partition key should align with common query patterns; partitioning by date is effective only if most queries filter on date.

For AI teams working with large datasets, proper partitioning can reduce feature engineering query times from hours to minutes. Training data extraction queries that filter by date range benefit enormously from date-based partitioning. Feature computation queries that aggregate by user benefit from user-based partitioning. The partition strategy should be designed around the most common and expensive query patterns in your ML workflows.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "columnar-storage",
    term: "Columnar Storage",
    definition:
      "A data storage format that organizes data by columns rather than rows, enabling highly efficient compression and dramatically faster analytical queries that access only a subset of columns.",
    explanation: `Traditional row-based storage stores all columns of a record together: (name, age, city, salary), (name, age, city, salary). Columnar storage groups all values of the same column together: (name, name, name), (age, age, age). This layout has profound implications for analytical workloads that typically access a few columns across many rows.

Columnar storage enables two major optimizations. First, queries that select specific columns (SELECT avg(salary) FROM employees) read only the relevant column data, skipping all others. For wide tables with hundreds of columns, this can reduce I/O by 95%. Second, columns of the same type compress extremely well because similar values are stored adjacently, achieving 5-10x compression ratios.

Formats like Apache Parquet and Apache ORC are the standard columnar formats for data lakes. Data warehouses like BigQuery, Snowflake, and Redshift use columnar storage internally. For AI teams, columnar formats are ideal for storing training datasets and feature tables, where feature engineering queries typically select specific columns from tables with many features.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "olap",
    term: "OLAP (Online Analytical Processing)",
    definition:
      "A computing approach optimized for complex analytical queries over large datasets, supporting multi-dimensional analysis with operations like aggregation, filtering, and drill-down across multiple dimensions.",
    explanation: `OLAP systems are designed for analytical workloads: complex queries that aggregate millions of rows, join large tables, compute running totals, and group by multiple dimensions. These queries are read-heavy, scan large portions of the data, and return aggregated results. Data warehouses and columnar databases are OLAP systems.

OLAP contrasts with OLTP (Online Transaction Processing), which handles high-volume transactional operations like inserting orders, updating inventory, and processing payments. OLTP systems optimize for many small, fast read-write operations; OLAP systems optimize for fewer, complex read operations over large datasets.

For AI and growth teams, OLAP systems are where analytical queries for dashboards, reports, and feature engineering run. Computing features like "total revenue per customer over the last 90 days" or "average session duration by user segment" are OLAP workloads. Understanding the OLAP nature of these queries helps teams choose appropriate tools and optimize query performance for their ML data pipelines.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "oltp",
    term: "OLTP (Online Transaction Processing)",
    definition:
      "A database processing paradigm optimized for handling large volumes of short, atomic transactions with fast reads and writes, powering the operational systems that run day-to-day business operations.",
    explanation: `OLTP systems power your application's core operations: user registration, order placement, payment processing, and inventory management. They are optimized for high-throughput transactional workloads with ACID guarantees (Atomicity, Consistency, Isolation, Durability), ensuring data integrity even under concurrent access.

OLTP databases like PostgreSQL, MySQL, and Amazon Aurora use row-based storage and B-tree indexes optimized for point lookups and small range scans. They handle thousands of concurrent transactions per second, each touching a small number of rows. Response times are measured in milliseconds.

For AI applications, OLTP databases are the source of truth for operational data that feeds into ML pipelines. User interactions, transactions, and state changes captured in OLTP systems are extracted (via ETL, ELT, or CDC) and loaded into analytical systems for feature engineering and model training. Understanding the distinction between OLTP and OLAP helps teams avoid anti-patterns like running heavy analytical queries on production OLTP databases, which degrades application performance.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "star-schema",
    term: "Star Schema",
    definition:
      "A data warehouse modeling pattern that organizes data into a central fact table containing measurable events surrounded by dimension tables containing descriptive attributes, resembling a star shape.",
    explanation: `The star schema is the most common data warehouse modeling pattern. The fact table at the center contains the quantitative data you want to analyze: sales amounts, click counts, session durations. Surrounding dimension tables provide the context: who (customer dimension), what (product dimension), when (date dimension), and where (location dimension). Foreign keys in the fact table reference each dimension.

This denormalized structure is optimized for analytical queries. A query like "total revenue by product category by month by region" joins the fact table with three dimension tables using simple key lookups. The star shape makes queries intuitive and fast because most analytical questions follow the pattern of "measure X sliced by dimensions Y and Z."

For AI teams building feature pipelines, star schemas provide a clean structure for aggregating features. User-level features are computed by grouping the fact table by user dimension. Time-based features use the date dimension for windowed aggregations. The clear separation of facts and dimensions makes feature engineering queries straightforward and maintainable.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "slowly-changing-dimension",
    term: "Slowly Changing Dimension (SCD)",
    definition:
      "A data warehousing technique for tracking changes to dimension attributes over time, preserving historical context so that past facts can be analyzed against the dimension values that were current at that time.",
    explanation: `Dimensions change: customers move cities, products change categories, employees change departments. Slowly changing dimensions handle these updates while preserving analytical accuracy. Without SCD, historical analysis would incorrectly attribute all past activity to the current dimension values, distorting trends and comparisons.

The most common types are SCD Type 1 (overwrite the old value, losing history), Type 2 (add a new row with effective dates, preserving full history), and Type 3 (add a column for the previous value, tracking one level of history). Type 2 is most common in practice because it preserves complete history while enabling both current and historical analysis.

For AI teams, SCD Type 2 is essential for building point-in-time correct training data. A churn prediction model must use the customer's attributes as they were at the time of the prediction, not their current attributes. Without proper SCD handling, training data would contain future information (data leakage), inflating apparent model performance and degrading real-world accuracy.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-normalization",
    term: "Data Normalization",
    definition:
      "The process of organizing data to reduce redundancy and improve integrity through a series of normal forms, or the statistical process of scaling numeric features to a standard range for machine learning.",
    explanation: `Data normalization has two meanings depending on context. In database design, normalization reduces redundancy by decomposing tables into smaller, related tables. First Normal Form eliminates repeating groups. Second Normal Form removes partial dependencies. Third Normal Form removes transitive dependencies. The goal is a schema where each fact is stored once, preventing update anomalies.

In machine learning, normalization scales numeric features to comparable ranges. Min-max normalization scales values to [0, 1]. Z-score normalization (standardization) transforms features to have mean 0 and standard deviation 1. This prevents features with large numeric ranges (like salary in thousands) from dominating features with small ranges (like age in tens) in distance-based algorithms.

Both meanings are relevant for AI teams. Database normalization in operational systems keeps data clean and consistent at the source. Feature normalization in ML pipelines ensures models treat all features fairly. Choosing the right normalization technique depends on the algorithm (neural networks prefer min-max; tree-based models are often scale-invariant) and the data distribution (z-score handles outliers differently than min-max).`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-deduplication",
    term: "Data Deduplication",
    definition:
      "The process of identifying and removing duplicate records from a dataset using exact matching, fuzzy matching, or probabilistic techniques to ensure each real-world entity is represented exactly once.",
    explanation: `Duplicate data degrades analytics and ML models. The same customer appearing three times inflates customer counts, skews segmentation analysis, and creates inconsistent model features. Deduplication identifies these duplicates and consolidates them into single, canonical records.

Exact deduplication matches on unique identifiers like email addresses or user IDs. Fuzzy deduplication handles variations: "John Smith" vs. "Jon Smith," "123 Main St" vs. "123 Main Street." Techniques include string similarity metrics (Levenshtein distance, Jaro-Winkler), phonetic matching (Soundex), and ML-based entity resolution that learns to identify duplicates from labeled examples.

For AI teams, deduplication is a critical data quality step. Duplicate training samples bias the model toward over-represented records. Duplicate users in a recommendation system produce inconsistent behavior signals. Deduplication during data pipeline ingestion prevents these issues from propagating. At scale, efficient deduplication requires blocking strategies (comparing records only within likely-match groups) to avoid the quadratic cost of comparing every record pair.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "data-sampling",
    term: "Data Sampling",
    definition:
      "The technique of selecting a representative subset from a larger dataset for analysis or model training, reducing computational cost while preserving the statistical properties of the full dataset.",
    explanation: `Sampling enables work with datasets too large to process in full. Random sampling selects records with equal probability. Stratified sampling ensures proportional representation of important subgroups (maintaining the same class ratio in a classification dataset). Reservoir sampling handles streaming data where the total size is unknown. Importance sampling weights samples by their relevance to the target distribution.

The key consideration is sample size. Too small a sample introduces high variance and may miss rare but important patterns. Too large a sample wastes computation without meaningfully improving results. Statistical power analysis helps determine the minimum sample size needed for a given confidence level and effect size.

For AI teams, sampling strategies directly impact model quality. Downsampling majority classes addresses class imbalance. Stratified sampling ensures rare categories are represented in evaluation sets. Progressive sampling starts with small datasets for rapid prototyping and scales up for final training. Understanding sampling theory prevents common mistakes like evaluating model performance on a biased subsample or training on a sample that does not represent the production data distribution.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "time-series-data",
    term: "Time-Series Data",
    definition:
      "A sequence of data points collected or recorded at successive, typically uniform, time intervals, used for temporal analysis, forecasting, and detecting patterns that evolve over time.",
    explanation: `Time-series data is generated by any system that produces measurements over time: server metrics, stock prices, user engagement counts, temperature readings, and sales figures. The temporal ordering is the defining characteristic, as the sequence and timing of observations carry meaning that is lost if records are shuffled.

Time-series analysis involves specialized techniques: trend decomposition (separating long-term direction from seasonal patterns and noise), stationarity testing (determining if statistical properties change over time), autocorrelation analysis (measuring how current values relate to past values), and forecasting (predicting future values from historical patterns).

For growth teams, time-series data powers forecasting models (revenue projections, traffic predictions), anomaly detection (identifying unusual metric spikes or drops), and seasonal analysis (understanding weekly, monthly, or yearly patterns in user behavior). Specialized time-series databases like InfluxDB, TimescaleDB, and Amazon Timestream are optimized for the high write volumes and temporal queries that time-series workloads demand.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "graph-database",
    term: "Graph Database",
    definition:
      "A database that uses graph structures with nodes, edges, and properties to store and query data, excelling at traversing complex relationships that would require expensive joins in relational databases.",
    explanation: `Graph databases model data as interconnected entities. Nodes represent objects (users, products, documents), edges represent relationships (follows, purchased, references), and properties store attributes on both nodes and edges. This structure makes relationship traversal a first-class operation rather than an expensive join.

Queries like "find all friends of friends who purchased product X" or "what is the shortest path between user A and user B" that require multiple joins in relational databases are natural and performant in graph databases. Neo4j, Amazon Neptune, and ArangoDB are popular graph database platforms, using query languages like Cypher or Gremlin.

For AI and growth teams, graph databases power recommendation systems (collaborative filtering through user-product graphs), fraud detection (identifying suspicious connection patterns), knowledge graphs (structured representations of domain knowledge for RAG systems), and social network analysis (identifying influencers, communities, and viral paths). The graph structure also enables graph neural networks, an emerging ML approach that learns directly from graph-structured data.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "document-database",
    term: "Document Database",
    definition:
      "A NoSQL database that stores data as flexible, self-describing documents (typically JSON or BSON), allowing varied structures within the same collection without requiring a predefined schema.",
    explanation: `Document databases store records as documents, each containing its own structure. Unlike relational databases where every row in a table must conform to the same schema, documents in the same collection can have different fields. This flexibility accommodates evolving data models, semi-structured data, and hierarchical information that maps naturally to application objects.

MongoDB, CouchDB, and Amazon DocumentDB are popular document databases. They excel at use cases with rapidly evolving schemas, hierarchical data (user profiles with nested preferences), and applications where each record may have different attributes (product catalogs with varying specifications per category).

For AI teams, document databases are often used to store unstructured or semi-structured data that feeds ML pipelines: user interaction logs with varying event schemas, content metadata with flexible attributes, and model configuration documents. The schemaless nature allows data structures to evolve alongside model requirements without migration overhead. However, the lack of enforced schema can lead to data quality issues if governance is not maintained.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
  {
    slug: "key-value-store",
    term: "Key-Value Store",
    definition:
      "A simple, high-performance database that stores data as key-value pairs, optimized for fast lookups by key with minimal overhead, commonly used for caching, session storage, and feature serving.",
    explanation: `Key-value stores offer the simplest data model: a unique key maps to a value. Operations are limited to get, put, and delete by key. This simplicity enables extreme performance, with many key-value stores achieving sub-millisecond read latency and handling millions of operations per second. Redis, DynamoDB, and Memcached are widely used key-value stores.

The trade-off is limited query flexibility. You cannot search by value, perform range queries across arbitrary attributes, or join data. The application must know the exact key to retrieve data. This makes key-value stores ideal for well-known access patterns: caching (key is the cache key), session storage (key is the session ID), configuration (key is the setting name), and rate limiting (key is the client ID).

For AI serving infrastructure, key-value stores are essential for low-latency feature lookup. When a model needs a user's features for real-time inference, the feature store's online layer (typically Redis or DynamoDB) serves precomputed features by user ID in under a millisecond. This speed is critical for keeping model inference within latency budgets when feature retrieval is on the critical path.`,
    category: "data",
    relatedTerms: [],
    relatedPosts: [],
  },
];
