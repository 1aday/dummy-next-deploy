import Link from "next/link";
import { ArrowLeft, ArrowRight, Github, Twitter, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { getAllPosts, getTagsWithCount } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Writing | AI Growth Stack",
  description: "Deep technical guides on AI-powered product growth, retention systems, growth loops, personalization, and monetization strategies. Code-first tutorials from growth engineers building AI-native products.",
  alternates: { canonical: "/blog" },
};

const TOP_TAG_COUNT = 8;

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getTagsWithCount();
  const topTags = tags.slice(0, TOP_TAG_COUNT);
  const remainingCount = tags.length - TOP_TAG_COUNT;

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
                className="relative text-sm font-medium text-foreground group"
              >
                Writing
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-primary" />
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

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </Link>

        <header className="mb-8">
          <h1 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            Writing
          </h1>
          <p className="text-lg text-muted-foreground/90">
            <span className="font-semibold text-primary">{posts.length}</span> deep guides on AI-powered product growth, retention, and monetization
          </p>
        </header>

        {/* Topic filter — top tags only */}
        <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {topTags.map(({ tag, slug, count }) => (
            <Link
              key={slug}
              href={`/blog/tags/${slug}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              {tag}
              <span className="text-muted-foreground/60">{count}</span>
            </Link>
          ))}
          {remainingCount > 0 && (
            <Link
              href="/blog/tags/ai"
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-dashed border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
            >
              +{remainingCount} more
              <ChevronRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        <div className="space-y-4">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-sm">
                <div className="relative z-10">
                  <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <time>{format(new Date(post.date), "MMM d, yyyy")}</time>
                    <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/40" />
                    <span>{post.readingTime}</span>
                    {post.tags && post.tags[0] && (
                      <>
                        <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/40" />
                        <span className="text-primary/70">{post.tags[0]}</span>
                      </>
                    )}
                  </div>
                  <h2 className="mb-1.5 font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-32 border-t border-border/50">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2026 · Crafted with attention to detail
            </p>
            <div className="flex items-center gap-3">
              {siteConfig.social.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="mt-6 text-center text-xs text-muted-foreground/60">
            Next.js 15 · React 19 · Tailwind CSS v4
          </p>
        </div>
      </footer>
    </>
  );
}
