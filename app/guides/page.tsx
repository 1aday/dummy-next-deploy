import Link from "next/link";
import { ArrowRight, Rocket, Brain, Database, Target } from "lucide-react";
import { getAllGuides } from "@/lib/guides";

const BASE_URL = "https://growthstack.dev";

const iconMap: Record<string, React.ReactNode> = {
  rocket: <Rocket className="h-6 w-6" />,
  brain: <Brain className="h-6 w-6" />,
  database: <Database className="h-6 w-6" />,
  target: <Target className="h-6 w-6" />,
};

export const metadata = {
  title: "Guides | AI Growth Stack",
  description: "Comprehensive guides on AI-powered product growth, LLMs, RAG systems, and personalization. Deep technical content for growth engineers building AI-native products.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "Guides | AI Growth Stack",
    description: "Comprehensive guides on AI-powered product growth, LLMs, RAG systems, and personalization.",
    type: "website",
    siteName: "AI Growth Stack",
  },
};

export default function GuidesPage() {
  const guides = getAllGuides();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Growth Stack Guides",
    description: "Comprehensive guides on AI-powered product growth",
    url: `${BASE_URL}/guides`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: guides.length,
      itemListElement: guides.map((guide, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/guides/${guide.slug}`,
        name: guide.title,
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
              <Link href="/guides" className="relative text-sm font-medium text-foreground group">
                Guides
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-primary" />
              </Link>
              <Link href="/blog" className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                Writing
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
              </Link>
              <Link href="/about" className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                About
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-20">
        <header className="mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <span>Start here</span>
          </div>
          <h1 className="mb-6 font-display text-5xl font-bold text-foreground md:text-6xl">
            Comprehensive Guides
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground/90">
            Deep-dive guides covering everything you need to build AI-powered growth systems.
            Each guide combines strategy, architecture, and hands-on code.
          </p>
        </header>

        <div className="space-y-6">
          {guides.map((guide, index) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group block"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <article className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover-lift gradient-border transition-all">
                <div className="relative z-10">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {iconMap[guide.icon] || <Rocket className="h-6 w-6" />}
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {guide.sections.length} chapters
                      </span>
                    </div>
                  </div>
                  <h2 className="mb-3 font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {guide.title}
                  </h2>
                  <p className="mb-5 text-muted-foreground/90 leading-relaxed">
                    {guide.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <span>Read guide</span>
                    <ArrowRight className="h-4 w-4 arrow-animate" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </article>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
