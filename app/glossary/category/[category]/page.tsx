import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import {
  getTermsByCategory,
  getGlossaryCategories,
  glossaryCategoryMeta,
  type GlossaryTerm,
} from "@/lib/glossary";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export async function generateStaticParams() {
  return getGlossaryCategories().map((cat) => ({ category: cat }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: rawCategory } = await params;
  const category = rawCategory as GlossaryTerm["category"];
  const meta = glossaryCategoryMeta[category];

  if (!meta) {
    return { title: "Not Found" };
  }

  return {
    title: `${meta.name} Glossary | AI Growth Stack`,
    description: meta.description,
    alternates: {
      canonical: `/glossary/category/${category}`,
    },
    openGraph: {
      title: `${meta.name} Glossary | AI Growth Stack`,
      description: meta.description,
      type: "website" as const,
      siteName: "AI Growth Stack",
      url: `/glossary/category/${category}`,
      images: [
        {
          url: `${BASE_URL}/og?title=${encodeURIComponent(meta.name + " Glossary")}`,
        },
      ],
    },
  };
}

const categoryColors: Record<GlossaryTerm["category"], string> = {
  "ai-fundamentals": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  growth: "bg-green-500/10 text-green-500 border-green-500/20",
  engineering: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  data: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

export default async function GlossaryCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: rawCategory } = await params;
  const category = rawCategory as GlossaryTerm["category"];
  const meta = glossaryCategoryMeta[category];

  if (!meta) {
    notFound();
  }

  const terms = getTermsByCategory(category);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${meta.name} Glossary`,
      description: meta.description,
      url: `${BASE_URL}/glossary/category/${category}`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: terms.map((term, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: term.term,
          url: `${BASE_URL}/glossary/${term.slug}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Glossary",
          item: `${BASE_URL}/glossary`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: meta.name,
          item: `${BASE_URL}/glossary/category/${category}`,
        },
      ],
    },
  ];

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
        <Link
          href="/glossary"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Glossary</span>
        </Link>

        <div className="mb-12">
          <div
            className={`mb-4 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${categoryColors[category]}`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            {meta.name}
          </div>
          <h1 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {meta.name} Glossary
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {meta.description}
          </p>
        </div>

        <div className="space-y-3">
          {terms.map((term) => (
            <Link
              key={term.slug}
              href={`/glossary/${term.slug}`}
              className="group block rounded-2xl border border-border bg-card p-5 hover-lift transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="mb-1 font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {term.term}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {term.definition}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="mb-6 font-display text-lg font-bold text-foreground">
            Browse other categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {getGlossaryCategories()
              .filter((c) => c !== category)
              .map((cat) => (
                <Link
                  key={cat}
                  href={`/glossary/category/${cat}`}
                  className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors hover:opacity-80 ${categoryColors[cat]}`}
                >
                  {glossaryCategoryMeta[cat].name}
                </Link>
              ))}
          </div>
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
