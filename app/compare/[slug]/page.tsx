import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, X, Scale } from "lucide-react";
import { getAllComparisons, getComparisonBySlug } from "@/lib/comparisons";
import { getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export async function generateStaticParams() {
  const comparisons = getAllComparisons();
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return { title: "Not Found" };

  return {
    title: `${comparison.title} | AI Growth Stack`,
    description: comparison.description,
    alternates: {
      canonical: `/compare/${slug}`,
    },
    openGraph: {
      title: `${comparison.title} | AI Growth Stack`,
      description: comparison.description,
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

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const relatedPosts = getLinkedPosts(comparison.relatedPosts);

  const jsonLd = {
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
        name: "Compare",
        item: `${BASE_URL}/compare`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: comparison.title,
        item: `${BASE_URL}/compare/${slug}`,
      },
    ],
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

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Scale className="h-3.5 w-3.5" />
            <span>Comparison</span>
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            {comparison.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground/90">
            {comparison.description}
          </p>
        </header>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
            Head-to-Head Comparison
          </h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Criteria
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-primary">
                    {comparison.itemA.name.split("(")[0].trim()}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-primary">
                    {comparison.itemB.name.split("(")[0].trim()}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.criteria.map((criterion, i) => (
                  <tr
                    key={criterion.name}
                    className={
                      i % 2 === 0
                        ? "bg-background"
                        : "bg-card/50"
                    }
                  >
                    <td className="px-4 py-3 text-sm font-medium text-foreground">
                      {criterion.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {criterion.itemA}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {criterion.itemB}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros & Cons Side by Side */}
        <section className="mb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
            Pros & Cons
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Item A */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                {comparison.itemA.name}
              </h3>

              <div className="mb-6">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-green-500">
                  Pros
                </h4>
                <ul className="space-y-2">
                  {comparison.itemA.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <span className="text-muted-foreground">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-red-400">
                  Cons
                </h4>
                <ul className="space-y-2">
                  {comparison.itemA.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      <span className="text-muted-foreground">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-primary/5 p-4">
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  Best for
                </h4>
                <p className="text-sm text-muted-foreground">
                  {comparison.itemA.bestFor}
                </p>
              </div>
            </div>

            {/* Item B */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                {comparison.itemB.name}
              </h3>

              <div className="mb-6">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-green-500">
                  Pros
                </h4>
                <ul className="space-y-2">
                  {comparison.itemB.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <span className="text-muted-foreground">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-red-400">
                  Cons
                </h4>
                <ul className="space-y-2">
                  {comparison.itemB.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      <span className="text-muted-foreground">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-primary/5 p-4">
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  Best for
                </h4>
                <p className="text-sm text-muted-foreground">
                  {comparison.itemB.bestFor}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
            The Verdict
          </h2>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-base leading-relaxed text-foreground/90">
              {comparison.verdict}
            </p>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
              Related Reading
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
