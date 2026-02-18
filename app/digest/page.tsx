import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Newspaper } from "lucide-react";
import { getAllDigests } from "@/lib/digests";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export const metadata = {
  title: "Weekly Digest Archive | AI Growth Stack",
  description:
    "The AI Growth Stack Weekly digest — curated links, insights, and commentary on AI-powered product growth, delivered every week.",
  alternates: {
    canonical: "/digest",
  },
  openGraph: {
    title: "Weekly Digest Archive | AI Growth Stack",
    description:
      "Curated links, insights, and commentary on AI-powered product growth.",
    type: "website",
    siteName: "AI Growth Stack",
  },
};

export default function DigestArchivePage() {
  const digests = getAllDigests();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Growth Stack Weekly Digest",
    description:
      "Curated links, insights, and commentary on AI-powered product growth.",
    url: `${BASE_URL}/digest`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: digests.length,
      itemListElement: digests.map((digest, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/digest/${digest.slug}`,
        name: digest.title,
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
        <header className="mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Newspaper className="h-3.5 w-3.5" />
            <span>Weekly digest</span>
          </div>
          <h1 className="mb-6 font-display text-5xl font-bold text-foreground md:text-6xl">
            Digest Archive
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground/90">
            Curated links, insights, and commentary on AI-powered product
            growth. Published weekly.
          </p>
        </header>

        {/* Digest List */}
        <div className="space-y-4">
          {digests.map((digest, index) => (
            <Link
              key={digest.slug}
              href={`/digest/${digest.slug}`}
              className="group block"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <article className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift gradient-border transition-all">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-display text-sm font-bold text-primary">
                    #{digest.number}
                  </span>
                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-3">
                      <h2 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {digest.title}
                      </h2>
                    </div>
                    <time
                      dateTime={digest.date}
                      className="mb-2 block text-xs font-medium text-muted-foreground"
                    >
                      {format(new Date(digest.date), "MMMM d, yyyy")}
                    </time>
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {digest.intro}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <span>Read digest</span>
                      <ArrowRight className="h-3.5 w-3.5 arrow-animate" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
