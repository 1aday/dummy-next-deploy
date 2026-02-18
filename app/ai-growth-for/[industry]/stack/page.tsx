import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers, Wrench } from "lucide-react";
import { getAllIndustries, getIndustryBySlug } from "@/lib/industries";
import { getStackForIndustry } from "@/lib/industry-stacks";
import { getToolCategoryBySlug } from "@/lib/tools";
import { getUseCasesForIndustry } from "@/lib/use-cases";
import { getPostBySlug } from "@/lib/posts";
import { NewsletterForm } from "@/components/newsletter-form";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export async function generateStaticParams() {
  return getAllIndustries().map((ind) => ({ industry: ind.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Not Found" };

  const title = `The AI Tool Stack for ${industry.name} | AI Growth Stack`;
  const description = `Discover the best AI tools and platforms for ${industry.name.toLowerCase()} companies. Category-by-category recommendations with relevance ratings and industry-specific guidance.`;
  const ogImageUrl = `${BASE_URL}/og?title=${encodeURIComponent("AI Tool Stack for " + industry.name)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/ai-growth-for/${slug}/stack`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "AI Growth Stack",
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

function getLinkedPostData(slugs: string[]) {
  return slugs
    .map((slug) => {
      try {
        const post = getPostBySlug(slug);
        return { slug: post.slug, title: post.title, readingTime: post.readingTime, excerpt: post.excerpt };
      } catch {
        return null;
      }
    })
    .filter(Boolean) as { slug: string; title: string; readingTime: string; excerpt: string }[];
}

export default async function IndustryStackPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const stack = getStackForIndustry(slug);
  const useCases = getUseCasesForIndustry(slug);
  const linkedPosts = getLinkedPostData(industry.relatedPosts);

  const enrichedStack = stack
    .map((rec) => {
      const category = getToolCategoryBySlug(rec.categorySlug);
      if (!category) return null;
      return { rec, category };
    })
    .filter(Boolean) as { rec: (typeof stack)[number]; category: NonNullable<ReturnType<typeof getToolCategoryBySlug>> }[];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `The AI Tool Stack for ${industry.name}`,
      description: `Discover the best AI tools and platforms for ${industry.name.toLowerCase()} companies. Category-by-category recommendations with relevance ratings and industry-specific guidance.`,
      author: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
      publisher: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/ai-growth-for/${slug}/stack` },
      url: `${BASE_URL}/ai-growth-for/${slug}/stack`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: `AI Growth for ${industry.name}`, item: `${BASE_URL}/ai-growth-for/${slug}` },
        { "@type": "ListItem", position: 3, name: "Tool Stack", item: `${BASE_URL}/ai-growth-for/${slug}/stack` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `AI Tool Stack for ${industry.name}`,
      itemListElement: enrichedStack.map(({ rec, category }, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: category.title,
        description: rec.commentary,
      })),
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
              <Link href="/guides" className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                Guides
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
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

      <article className="mx-auto max-w-3xl px-6 py-16">
        {/* Back link */}
        <Link
          href={`/ai-growth-for/${slug}`}
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>{industry.name}</span>
        </Link>

        {/* Hero */}
        <header className="mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Layers className="h-3.5 w-3.5" />
            <span>Tool Stack</span>
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold leading-[1.15] text-foreground md:text-5xl">
            The AI Tool Stack for {industry.name}
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground/90">
            Discover the best AI tools and platforms for {industry.name.toLowerCase()} companies.
            Category-by-category recommendations with relevance ratings and industry-specific guidance.
          </p>
        </header>

        {/* Tool Category Sections */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Wrench className="h-4 w-4" />
            <span>Recommended Tools</span>
          </div>
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground">
            Your {industry.name} AI Stack
          </h2>

          {enrichedStack.map(({ rec, category }) => {
            const relevanceColors =
              rec.relevance === "high"
                ? "bg-green-500/10 text-green-600 border-green-500/20"
                : rec.relevance === "medium"
                ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                : "bg-gray-500/10 text-gray-500 border-gray-500/20";

            return (
              <div key={rec.categorySlug} className="rounded-2xl border border-border bg-card p-6 mb-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    <Link
                      href={`/tools/${rec.categorySlug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {category.title}
                    </Link>
                  </h3>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${relevanceColors}`}>
                    {rec.relevance} relevance
                  </span>
                </div>

                <p className="mb-4 text-[17px] leading-relaxed text-foreground/90">
                  {rec.commentary}
                </p>

                {rec.recommendedTools?.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Recommended Tools
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {rec.recommendedTools.map((toolName) => {
                        const matchedTool = category.tools.find(
                          (t) => t.name.toLowerCase() === toolName.toLowerCase()
                        );

                        return (
                          <div
                            key={toolName}
                            className="rounded-lg border border-border/50 bg-background p-3"
                          >
                            <div className="font-display text-sm font-semibold text-foreground">
                              {matchedTool ? (
                                <Link
                                  href={`/tools/${rec.categorySlug}/${matchedTool.slug}`}
                                  className="hover:text-primary transition-colors"
                                >
                                  {matchedTool.name}
                                </Link>
                              ) : (
                                toolName
                              )}
                            </div>
                            {matchedTool?.pricing && (
                              <div className="mt-1 text-xs text-muted-foreground">
                                {matchedTool.pricing}
                              </div>
                            )}
                            {matchedTool?.bestFor && (
                              <div className="mt-1 text-xs text-muted-foreground/80">
                                {matchedTool.bestFor}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        <div className="mb-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Related Use Cases */}
        {useCases.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
              AI Use Cases for {industry.name}
            </h2>
            <div className="space-y-3">
              {useCases.map((uc) => (
                <Link
                  key={uc.slug}
                  href={`/use-cases/${uc.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {uc.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                      {uc.description}
                    </p>
                  </div>
                  <ArrowRight className="ml-4 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Blog Posts */}
        {linkedPosts.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
              Deep Dive: Related Articles
            </h2>
            <div className="space-y-4">
              {linkedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                  </div>
                  <ArrowRight className="ml-4 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary arrow-animate" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <NewsletterForm />

        {/* Cross-links */}
        <div className="mt-16">
          <h3 className="mb-6 font-display text-lg font-bold text-foreground">Explore other industry tool stacks</h3>
          <div className="flex flex-wrap gap-2">
            {getAllIndustries().filter(i => i.slug !== slug).map((ind) => (
              <Link
                key={ind.slug}
                href={`/ai-growth-for/${ind.slug}/stack`}
                className="inline-flex items-center rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                {ind.name}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
