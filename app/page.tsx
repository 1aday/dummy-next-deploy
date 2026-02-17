import Link from "next/link";
import { ArrowRight, Github, Twitter, Mail, Sparkles, BookOpen, TrendingUp, Users } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";
import { NewsletterForm } from "@/components/newsletter-form";
import { getAllGuides } from "@/lib/guides";

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);
  const guides = getAllGuides();

  // Most popular based on topic breadth (posts with most common tags)
  const popularSlugs = [
    "ai-product-growth-2026",
    "rag-pipeline-mistakes",
    "predictive-churn-models",
    "prompt-engineering-best-practices-2026",
    "embedding-recommendations",
  ];
  const popularPosts = popularSlugs
    .map((slug) => allPosts.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <>
      <nav className="sticky top-0 z-50 glass-card border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="group flex items-center gap-2 font-display text-base font-semibold text-foreground"
            >
              <span className="relative flex items-center gap-1.5">
                <span className="text-primary">AI</span>
                <span className="text-accent">Growth</span>
                <span className="text-muted-foreground">/</span>
                <span>Stack</span>
                <span className="absolute -inset-2 rounded bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/guides"
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                Guides
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
              </Link>
              <Link
                href="/blog"
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                Writing
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
              </Link>
              <Link
                href="/about"
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                About
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-20">
        {/* Hero */}
        <section className="mb-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Available for consulting</span>
          </div>
          <h1 className="mb-6 font-display text-5xl font-bold text-foreground md:text-6xl lg:text-7xl">
            Product Growth in{" "}<br />the Age of AI
          </h1>
          <p className="mb-10 max-w-2xl text-xl leading-relaxed text-muted-foreground/90">
            Master AI-powered growth loops, retention systems, and monetization strategies.
            Deep technical guides on building growth engines with LLMs, embeddings, and predictive models.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-border bg-card text-muted-foreground hover-lift hover-glow"
              >
                <Github className="relative z-10 h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-border bg-card text-muted-foreground hover-lift hover-glow badge-dot"
              >
                <Twitter className="relative z-10 h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <a
                href="mailto:hello@example.com"
                className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-border bg-card text-muted-foreground hover-lift hover-glow"
              >
                <Mail className="relative z-10 h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-10 max-w-md">
            <NewsletterForm variant="inline" />
          </div>

          {/* Social Proof */}
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Join growth engineers from Stripe, Vercel, and Anthropic</span>
          </div>
        </section>

        {/* Start Here - Guides */}
        <section className="mb-20">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Start Here
              </h2>
            </div>
            <Link
              href="/guides"
              className="group flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <span>All guides</span>
              <ArrowRight className="h-4 w-4 arrow-animate" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group rounded-2xl border border-border bg-card p-5 hover-lift gradient-border transition-all"
              >
                <div className="relative z-10">
                  <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
                    {guide.sections.length} chapters
                  </span>
                  <h3 className="mb-2 font-display text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{guide.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Most Popular */}
        <section className="mb-20">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <TrendingUp className="h-4 w-4 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Most Popular
              </h2>
            </div>
          </div>
          <div className="space-y-3">
            {popularPosts.map((post, index) => (
              post && (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-display text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{post.readingTime}</span>
                      {post.tags && post.tags[0] && (
                        <>
                          <span>·</span>
                          <span>{post.tags[0]}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary arrow-animate" />
                </Link>
              )
            ))}
          </div>
        </section>

        {/* Recent Writing */}
        <section>
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Recent Writing
            </h2>
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <span>View all {allPosts.length} articles</span>
              <ArrowRight className="h-4 w-4 arrow-animate" />
            </Link>
          </div>

          <div className="space-y-6">
            {recentPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <article className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift gradient-border transition-all">
                  <div className="relative z-10">
                    <div className="mb-3 flex items-center justify-between">
                      <time className="text-sm font-medium text-muted-foreground">
                        {format(new Date(post.date), "MMMM d, yyyy")}
                      </time>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="mb-3 font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mb-4 text-muted-foreground/90 leading-relaxed">
                      {post.excerpt}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-lg border border-border/50 bg-secondary/50 px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <span>Read article</span>
                      <ArrowRight className="h-4 w-4 arrow-animate" />
                    </div>
                  </div>

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-32 border-t border-border/50">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2026 AI Growth Stack
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="/feed.xml" className="hover:text-foreground transition-colors">RSS</Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="mt-6 text-center text-xs text-muted-foreground/60">
            Next.js 16 · React 19 · Tailwind CSS v4
          </p>
        </div>
      </footer>
    </>
  );
}
