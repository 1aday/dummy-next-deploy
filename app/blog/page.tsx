import Link from "next/link";
import { ArrowLeft, ArrowRight, Github, Twitter } from "lucide-react";
import { format } from "date-fns";
import { getAllPosts, getTagsWithCount } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Growth Guides | AI Growth Stack",
  description: "Deep technical guides on AI-powered product growth, retention systems, growth loops, personalization, and monetization strategies. Code-first tutorials from growth engineers building AI-native products.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getTagsWithCount();

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

        <header className="mb-12">
          <h1 className="mb-5 font-display text-5xl font-bold text-foreground md:text-6xl">
            Growth Guides
          </h1>
          <p className="text-xl text-muted-foreground/90">
            <span className="font-semibold text-primary">{posts.length}</span> deep guides on AI-powered product growth, retention, and monetization
          </p>
        </header>

        {/* Topic Tags */}
        <div className="mb-10 flex flex-wrap gap-2">
          {tags.map(({ tag, slug, count }) => (
            <Link
              key={slug}
              href={`/blog/tags/${slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              {tag}
              <span className="text-muted-foreground">({count})</span>
            </Link>
          ))}
        </div>

        <div className="space-y-6">
          {posts.map((post, index) => (
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
                  <h2 className="mb-3 font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="mb-4 text-muted-foreground/90 leading-relaxed">
                    {post.excerpt}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
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
