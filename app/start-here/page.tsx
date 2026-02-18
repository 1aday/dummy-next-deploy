import Link from "next/link";
import {
  BookOpen,
  Compass,
  Layers,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Code2,
} from "lucide-react";
import { getPostBySlug, getPostsByTag } from "@/lib/posts";
import { getAllGuides } from "@/lib/guides";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export const metadata = {
  title: "Start Here | AI Growth Stack",
  description:
    "Your curated reading path through AI-powered product growth. From foundational concepts to deep-dive guides, organized by topic and skill level.",
  alternates: {
    canonical: "/start-here",
  },
  openGraph: {
    title: "Start Here | AI Growth Stack",
    description:
      "Your curated reading path through AI-powered product growth.",
    type: "website",
    siteName: "AI Growth Stack",
  },
};

function getPostSafe(slug: string) {
  try {
    return getPostBySlug(slug);
  } catch {
    return null;
  }
}

function getTopPostsByTag(tag: string, limit: number) {
  try {
    return getPostsByTag(tag).slice(0, limit);
  } catch {
    return [];
  }
}

export default function StartHerePage() {
  const foundationalSlugs = [
    "ai-product-growth-2026",
    "rag-pipeline-mistakes",
    "prompt-engineering-best-practices-2026",
  ];
  const foundationalPosts = foundationalSlugs
    .map(getPostSafe)
    .filter(Boolean) as NonNullable<ReturnType<typeof getPostSafe>>[];

  const guides = getAllGuides();

  const topicClusters = [
    {
      name: "Growth & Retention",
      icon: <TrendingUp className="h-5 w-5" />,
      tags: ["Product Growth", "Retention", "Growth Loops"],
    },
    {
      name: "AI Engineering",
      icon: <Code2 className="h-5 w-5" />,
      tags: ["RAG", "Embeddings", "LLMs"],
    },
    {
      name: "Optimization",
      icon: <Sparkles className="h-5 w-5" />,
      tags: ["Personalization", "A/B Testing", "Pricing"],
    },
  ];

  const industries = [
    { slug: "saas", name: "SaaS" },
    { slug: "fintech", name: "Fintech" },
    { slug: "e-commerce", name: "E-Commerce" },
    { slug: "healthtech", name: "HealthTech" },
    { slug: "devtools", name: "DevTools" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Start Here — AI Growth Stack",
    description:
      "A curated reading path through AI-powered product growth.",
    url: `${BASE_URL}/start-here`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-3xl px-6 py-20">
        {/* Header */}
        <header className="mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Compass className="h-3.5 w-3.5" />
            <span>Reading path</span>
          </div>
          <h1 className="mb-6 font-display text-5xl font-bold text-foreground md:text-6xl">
            Start Here
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground/90">
            New to the AI Growth Stack? This page maps out the best path
            through our content — whether you&apos;re a growth engineer, product
            manager, or founder building with AI.
          </p>
        </header>

        {/* Section 1: Foundational Reading */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Foundational Reading
              </h2>
              <p className="text-sm text-muted-foreground">
                Start with these three essential posts
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {foundationalPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift gradient-border transition-all">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-display text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="mb-2 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <span>Read article</span>
                        <ArrowRight className="h-3.5 w-3.5 arrow-animate" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Deep-Dive Guides */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Deep-Dive Guides
              </h2>
              <p className="text-sm text-muted-foreground">
                Comprehensive, multi-chapter guides on core topics
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group block"
              >
                <article className="h-full rounded-2xl border border-border bg-card p-6 hover-lift transition-all">
                  <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {guide.sections.length} chapters
                  </span>
                  <h3 className="mb-2 font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {guide.tagline}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <span>Read guide</span>
                    <ArrowRight className="h-3.5 w-3.5 arrow-animate" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 3: By Topic */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                By Topic
              </h2>
              <p className="text-sm text-muted-foreground">
                Explore posts grouped by topic cluster
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {topicClusters.map((cluster) => {
              const seenSlugs = new Set<string>();
              const posts = cluster.tags
                .flatMap((tag) => getTopPostsByTag(tag, 4))
                .filter((post) => {
                  if (seenSlugs.has(post.slug)) return false;
                  seenSlugs.add(post.slug);
                  return true;
                })
                .slice(0, 4);

              return (
                <div key={cluster.name}>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-primary">{cluster.icon}</span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {cluster.name}
                    </h3>
                    <div className="ml-2 flex gap-1.5">
                      {cluster.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-primary/5 px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {posts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-4 py-3 hover:border-primary/30 hover:bg-card transition-all"
                      >
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {post.title}
                        </span>
                        <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                          {post.readingTime}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: By Industry */}
        <section>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                By Industry
              </h2>
              <p className="text-sm text-muted-foreground">
                AI growth strategies tailored to your sector
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/ai-growth-for/${industry.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 hover-lift transition-all"
              >
                <span className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  AI Growth for {industry.name}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary arrow-animate" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
