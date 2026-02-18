import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { getAllTerms, type GlossaryTerm } from "@/lib/glossary";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export const metadata = {
  title: "AI Growth Glossary | AI Growth Stack",
  description:
    "A comprehensive glossary of AI, growth, and engineering terms. Clear definitions and in-depth explanations for every concept in the AI growth stack.",
  alternates: {
    canonical: "/glossary",
  },
  openGraph: {
    title: "AI Growth Glossary | AI Growth Stack",
    description:
      "Clear definitions and in-depth explanations for every concept in the AI growth stack.",
    type: "website",
    siteName: "AI Growth Stack",
  },
};

const categoryLabels: Record<GlossaryTerm["category"], string> = {
  "ai-fundamentals": "AI Fundamentals",
  growth: "Growth",
  engineering: "Engineering",
  data: "Data",
};

const categoryColors: Record<GlossaryTerm["category"], string> = {
  "ai-fundamentals": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  growth: "bg-green-500/10 text-green-500 border-green-500/20",
  engineering: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  data: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

export default function GlossaryPage() {
  const terms = getAllTerms();

  // Group alphabetically
  const grouped = terms.reduce<Record<string, GlossaryTerm[]>>((acc, term) => {
    const letter = term.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort();

  const categories = [
    "ai-fundamentals",
    "growth",
    "engineering",
    "data",
  ] as const;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Growth Glossary",
    description:
      "A comprehensive glossary of AI, growth, and engineering terms.",
    url: `${BASE_URL}/glossary`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: terms.length,
      itemListElement: terms.map((term, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/glossary/${term.slug}`,
        name: term.term,
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
        <header className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Reference</span>
          </div>
          <h1 className="mb-6 font-display text-5xl font-bold text-foreground md:text-6xl">
            AI Growth Glossary
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground/90">
            Every term you need to know, explained clearly. From AI fundamentals
            to growth metrics and engineering patterns.
          </p>
        </header>

        {/* Category Filter Pills */}
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count = terms.filter((t) => t.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/glossary/category/${cat}`}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors hover:opacity-80 ${categoryColors[cat]}`}
              >
                {categoryLabels[cat]}
                <span className="opacity-60">{count}</span>
              </Link>
            );
          })}
        </div>

        {/* Alphabetical Index */}
        <div className="mb-10 flex flex-wrap gap-2">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-sm font-semibold text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Terms by Letter */}
        <div className="space-y-12">
          {letters.map((letter) => (
            <section key={letter} id={`letter-${letter}`}>
              <h2 className="mb-4 font-display text-3xl font-bold text-foreground/20">
                {letter}
              </h2>
              <div className="space-y-3">
                {grouped[letter].map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="group block rounded-2xl border border-border bg-card p-5 hover-lift transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                            {term.term}
                          </h3>
                          <span
                            className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryColors[term.category]}`}
                          >
                            {categoryLabels[term.category]}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {term.definition}
                        </p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
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
