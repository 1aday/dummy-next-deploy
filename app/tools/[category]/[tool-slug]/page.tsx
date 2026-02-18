import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Wrench, Building2 } from "lucide-react";
import { getAllTools, getToolBySlug, getToolCategoryBySlug } from "@/lib/tools";
import { getAllIndustries } from "@/lib/industries";
import { getAllToolComparisons } from "@/lib/tool-comparisons";
import { getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export async function generateStaticParams() {
  return getAllTools().map(({ tool, category }) => ({
    category: category.slug,
    "tool-slug": tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; "tool-slug": string }> }) {
  const { category: catSlug, "tool-slug": toolSlug } = await params;
  const result = getToolBySlug(toolSlug);
  if (!result || result.category.slug !== catSlug) return { title: "Not Found" };

  const { tool, category } = result;
  const title = `${tool.name} Review 2026: ${category.title} | AI Growth Stack`;
  const description = `${tool.name} review — ${tool.description.slice(0, 120)}. Pricing, best use cases, industry fit, and alternatives.`;

  return {
    title,
    description,
    alternates: { canonical: `/tools/${catSlug}/${toolSlug}` },
    openGraph: { title, description, type: "article", siteName: "AI Growth Stack" },
  };
}

function getLinkedPosts(slugs: string[]) {
  return slugs
    .map((s) => { try { const p = getPostBySlug(s); return { slug: p.slug, title: p.title, excerpt: p.excerpt }; } catch { return null; } })
    .filter(Boolean) as { slug: string; title: string; excerpt: string }[];
}

export default async function ToolProfilePage({ params }: { params: Promise<{ category: string; "tool-slug": string }> }) {
  const { category: catSlug, "tool-slug": toolSlug } = await params;
  const result = getToolBySlug(toolSlug);
  if (!result || result.category.slug !== catSlug) notFound();

  const { tool, category } = result;
  const alternatives = category.tools.filter((t) => t.slug !== toolSlug);
  const industries = getAllIndustries();
  const relatedPosts = getLinkedPosts(category.relatedPosts);

  const comparisons = getAllToolComparisons().filter(
    (c) => c.toolA.slug === toolSlug || c.toolB.slug === toolSlug
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${tool.name} Review 2026`,
      description: tool.description,
      author: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
      publisher: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
        { "@type": "ListItem", position: 3, name: category.title, item: `${BASE_URL}/tools/${catSlug}` },
        { "@type": "ListItem", position: 4, name: tool.name, item: `${BASE_URL}/tools/${catSlug}/${toolSlug}` },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link href={`/tools/${catSlug}`} className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>All {category.title}</span>
        </Link>

        <header className="mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Wrench className="h-3.5 w-3.5" />
            <span>{category.title}</span>
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold leading-[1.15] text-foreground md:text-5xl">
            {tool.name}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground/90">
            {tool.description}
          </p>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Visit {tool.name}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </header>

        {/* Key Details */}
        <section className="mb-14">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">At a Glance</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pricing</h3>
              <p className="text-base font-medium text-foreground">{tool.pricing}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Best For</h3>
              <p className="text-base font-medium text-foreground">{tool.bestFor}</p>
            </div>
          </div>
        </section>

        {/* Industry Fit */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>Industry Fit</span>
          </div>
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
            {tool.name} by Industry
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            See how {tool.name} fits into the AI stack for each industry.
          </p>
          <div className="flex flex-wrap gap-2">
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/tools/${catSlug}/for/${ind.slug}`}
                className="inline-flex items-center rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                {ind.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Comparisons */}
        {comparisons.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
              Compare {tool.name}
            </h2>
            <div className="space-y-3">
              {comparisons.map((comp) => {
                const otherName = comp.toolA.slug === toolSlug ? comp.toolB.name : comp.toolA.name;
                return (
                  <Link
                    key={comp.slug}
                    href={`/compare/tools/${comp.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div>
                      <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {tool.name} vs {otherName}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">{comp.categoryTitle} comparison</p>
                    </div>
                    <ArrowRight className="ml-4 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Alternatives */}
        <section className="mb-14">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
            Alternatives to {tool.name}
          </h2>
          <div className="space-y-4">
            {alternatives.map((alt) => (
              <div key={alt.slug} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-2 flex items-center justify-between">
                  <Link href={`/tools/${catSlug}/${alt.slug}`} className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors">
                    {alt.name}
                  </Link>
                  <a href={alt.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                    Visit <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="mb-2 text-sm text-muted-foreground">{alt.description.slice(0, 150)}...</p>
                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Pricing:</span> {alt.pricing}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Related Reading</h2>
            <div className="space-y-3">
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{post.excerpt}</p>
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
