import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { getAllToolCategories } from "@/lib/tools";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export const metadata = {
  title: "AI Growth Tool Stack | AI Growth Stack",
  description:
    "The essential tools for building AI-powered growth systems. Curated recommendations for vector databases, embedding models, LLM providers, analytics, A/B testing, and personalization platforms.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "AI Growth Tool Stack | AI Growth Stack",
    description:
      "The essential tools for building AI-powered growth systems.",
    type: "website",
    siteName: "AI Growth Stack",
  },
};

export default function ToolsPage() {
  const categories = getAllToolCategories();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Growth Tool Stack",
    description:
      "The essential tools for building AI-powered growth systems.",
    url: `${BASE_URL}/tools`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categories.length,
      itemListElement: categories.map((cat, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/tools/${cat.slug}`,
        name: cat.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        {/* Header */}
        <header className="mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Wrench className="h-3.5 w-3.5" />
            <span>Tool Stack</span>
          </div>
          <h1 className="mb-6 font-display text-5xl font-bold text-foreground md:text-6xl">
            AI Growth Tools
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground/90">
            Curated tool recommendations across every layer of the AI growth
            stack. From infrastructure to optimization, with honest pricing and
            best-for guidance.
          </p>
        </header>

        {/* Category Cards */}
        <div className="space-y-4">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/tools/${category.slug}`}
              className="group block"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <article className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift gradient-border transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2">
                      <h2 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h2>
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        {category.tools.length} tools
                      </span>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.tools.slice(0, 4).map((tool) => (
                        <span
                          key={tool.name}
                          className="rounded-md border border-border/60 bg-background px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tool.name}
                        </span>
                      ))}
                      {category.tools.length > 4 && (
                        <span className="rounded-md bg-primary/5 px-2 py-0.5 text-xs text-primary">
                          +{category.tools.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary arrow-animate" />
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
              © 2026 AI Growth Stack
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link
                href="/feed.xml"
                className="hover:text-foreground transition-colors"
              >
                RSS
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
