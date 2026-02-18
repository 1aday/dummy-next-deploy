import { BookOpen } from "lucide-react";
import {
  getAllTerms,
  getGlossaryCategories,
  categoryLabels,
  categoryColors,
} from "@/lib/glossary";
import { siteConfig } from "@/lib/config";
import { GlossarySearch } from "@/components/glossary-search";

const BASE_URL = siteConfig.url;

export const metadata = {
  title: "AI Growth Glossary | AI Growth Stack",
  description:
    "A comprehensive glossary of 600+ AI, growth, and engineering terms. Clear definitions and in-depth explanations for every concept in the AI growth stack.",
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

export default function GlossaryPage() {
  const terms = getAllTerms();
  const categories = getGlossaryCategories();

  // Limit JSON-LD ItemList to 100 entries for performance
  const jsonLdTerms = terms.slice(0, 100);

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
      itemListElement: jsonLdTerms.map((term, i) => ({
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
            to growth metrics, marketing, infrastructure, and beyond.
          </p>
        </header>

        <GlossarySearch
          terms={terms}
          categoryLabels={categoryLabels}
          categoryColors={categoryColors}
          categories={categories}
        />
      </main>
    </>
  );
}
