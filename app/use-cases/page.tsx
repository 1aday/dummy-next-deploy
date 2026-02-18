import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import { getAllUseCases } from "@/lib/use-cases";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export const metadata = {
  title: "AI Use Cases for Product Growth | AI Growth Stack",
  description:
    "Explore 12 proven AI use cases that drive product growth — from churn prediction and personalization to fraud detection and demand forecasting.",
  alternates: { canonical: "/use-cases" },
  openGraph: {
    title: "AI Use Cases for Product Growth | AI Growth Stack",
    description:
      "Explore 12 proven AI use cases that drive product growth — from churn prediction and personalization to fraud detection and demand forecasting.",
    type: "website",
    siteName: "AI Growth Stack",
  },
};

export default function UseCasesIndex() {
  const useCases = getAllUseCases();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Use Cases for Product Growth",
    description:
      "Explore 12 proven AI use cases that drive product growth — from churn prediction and personalization to fraud detection and demand forecasting.",
    url: `${BASE_URL}/use-cases`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: useCases.length,
      itemListElement: useCases.map((uc, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/use-cases/${uc.slug}`,
        name: uc.name,
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
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Use Cases</span>
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            AI Use Cases for Product Growth
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground/90">
            Practical AI applications driving measurable growth across
            industries. Each use case includes industry-specific applications,
            recommended tools, and expected metrics.
          </p>
        </header>

        {/* Use Case Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {useCases.map((uc) => (
            <Link
              key={uc.slug}
              href={`/use-cases/${uc.slug}`}
              className="group rounded-2xl border border-border bg-card p-5 hover-lift transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {uc.name}
                </h3>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {uc.description}
              </p>
              <div className="mt-3">
                <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {uc.industryMapping.length} industries
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
