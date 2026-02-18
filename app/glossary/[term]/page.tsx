import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import {
  getAllTerms,
  getTermBySlug,
  getRelatedTerms,
  categoryLabels,
  categoryColors,
} from "@/lib/glossary";
import { getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export async function generateStaticParams() {
  const terms = getAllTerms();
  return terms.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term: slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) return { title: "Not Found" };

  return {
    title: `${term.term} — Definition | AI Growth Stack`,
    description: term.definition,
    alternates: {
      canonical: `/glossary/${slug}`,
    },
    openGraph: {
      title: `${term.term} — Definition | AI Growth Stack`,
      description: term.definition,
      type: "article",
      siteName: "AI Growth Stack",
    },
  };
}

function getLinkedPosts(slugs: string[]) {
  return slugs
    .map((slug) => {
      try {
        const post = getPostBySlug(slug);
        return {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          readingTime: post.readingTime,
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean) as {
    slug: string;
    title: string;
    excerpt: string;
    readingTime: string;
  }[];
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term: slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) notFound();

  const relatedPosts = getLinkedPosts(term.relatedPosts);
  const relatedTerms = getRelatedTerms(term);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: term.term,
      description: term.definition,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "AI Growth Glossary",
        url: `${BASE_URL}/glossary`,
      },
      url: `${BASE_URL}/glossary/${slug}`,
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
          name: term.term,
          item: `${BASE_URL}/glossary/${slug}`,
        },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/glossary"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to glossary</span>
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Link
              href={`/glossary/category/${term.category}`}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold hover:opacity-80 transition-opacity ${categoryColors[term.category]}`}
            >
              <BookOpen className="h-3 w-3" />
              {categoryLabels[term.category]}
            </Link>
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl">
            {term.term}
          </h1>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-lg leading-relaxed text-foreground/90">
              {term.definition}
            </p>
          </div>
        </header>

        {/* Explanation */}
        <section className="mb-16">
          <div className="prose">
            {term.explanation.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="mb-4 text-base leading-relaxed text-muted-foreground/90"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
              Related Terms
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedTerms.map((related) => (
                <Link
                  key={related.slug}
                  href={`/glossary/${related.slug}`}
                  className="group rounded-2xl border border-border bg-card p-4 hover-lift transition-all"
                >
                  <h3 className="mb-1 font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {related.term}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {related.definition}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
              Further Reading
            </h2>
            <div className="space-y-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                      {post.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="ml-4 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
