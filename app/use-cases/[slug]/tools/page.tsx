import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Wrench, Building2, CheckCircle } from "lucide-react";
import { getAllUseCases, getUseCaseBySlug } from "@/lib/use-cases";
import { getToolCategoryBySlug } from "@/lib/tools";
import { getIndustryBySlug } from "@/lib/industries";
import { getStackForIndustry } from "@/lib/industry-stacks";
import { NewsletterForm } from "@/components/newsletter-form";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export async function generateStaticParams() {
  return getAllUseCases().map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);
  if (!useCase) return { title: "Not Found" };

  const title = `Best Tools for ${useCase.name} | AI Growth Stack`;
  const description = `Discover the best AI tools and platforms for ${useCase.name.toLowerCase()}. Compare features, pricing, and use cases across ${useCase.primaryToolCategories.length + useCase.secondaryToolCategories.length} tool categories.`;

  return {
    title,
    description,
    alternates: { canonical: `/use-cases/${slug}/tools` },
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "AI Growth Stack",
      images: [{ url: `${BASE_URL}/og?title=${encodeURIComponent("Best Tools for " + useCase.name)}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og?title=${encodeURIComponent("Best Tools for " + useCase.name)}`],
    },
  };
}

export default async function UseCaseToolsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);
  if (!useCase) notFound();

  const primaryCategories = useCase.primaryToolCategories
    .map((catSlug) => getToolCategoryBySlug(catSlug))
    .filter(Boolean);

  const secondaryCategories = useCase.secondaryToolCategories
    .map((catSlug) => getToolCategoryBySlug(catSlug))
    .filter(Boolean);

  const industryContexts = useCase.industryMapping.slice(0, 4).map((m) => {
    const industry = getIndustryBySlug(m.industrySlug);
    const stack = getStackForIndustry(m.industrySlug);
    return { mapping: m, industry, stack };
  }).filter((ctx) => ctx.industry != null);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Best Tools for ${useCase.name}`,
      description: `Discover the best AI tools and platforms for ${useCase.name.toLowerCase()}. Compare features, pricing, and use cases across ${useCase.primaryToolCategories.length + useCase.secondaryToolCategories.length} tool categories.`,
      author: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
      publisher: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/use-cases/${slug}/tools` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Use Cases", item: `${BASE_URL}/use-cases` },
        { "@type": "ListItem", position: 3, name: useCase.name, item: `${BASE_URL}/use-cases/${slug}` },
        { "@type": "ListItem", position: 4, name: "Tools", item: `${BASE_URL}/use-cases/${slug}/tools` },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <article className="mx-auto max-w-3xl px-6 py-16">
        {/* Back link */}
        <Link href={`/use-cases/${slug}`} className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>{useCase.name}</span>
        </Link>

        {/* Hero */}
        <header className="mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Wrench className="h-3.5 w-3.5" />
            <span>Tool Guide</span>
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold leading-[1.15] text-foreground md:text-5xl">
            Best Tools for {useCase.name}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground/90">
            Building a strong {useCase.name.toLowerCase()} stack requires the right combination of tools across
            {" "}{useCase.primaryToolCategories.length + useCase.secondaryToolCategories.length} key categories.
            Here&apos;s a comprehensive breakdown of the best platforms, their strengths, pricing, and ideal use cases
            to help you make the right choice.
          </p>
        </header>

        {/* Primary tool categories */}
        {primaryCategories.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground">Core Tools</h2>
            {primaryCategories.map((category) => (
              <div key={category!.slug} className="mb-10">
                <Link href={`/tools/${category!.slug}`} className="group">
                  <h3 className="mb-2 font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {category!.title}
                    <ArrowRight className="ml-2 inline-block h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  </h3>
                </Link>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{category!.description}</p>
                <div className="space-y-3">
                  {category!.tools.map((tool) => (
                    <div key={tool.slug} className="rounded-xl border border-border bg-card p-5">
                      <div className="mb-2 flex items-start justify-between gap-4">
                        <h4 className="font-display text-base font-semibold text-foreground">{tool.name}</h4>
                        <span className="shrink-0 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                          {tool.pricing}
                        </span>
                      </div>
                      <p className="mb-2 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
                      <p className="text-xs text-muted-foreground/80">
                        <span className="font-medium text-foreground/70">Best for:</span> {tool.bestFor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Secondary tool categories */}
        {secondaryCategories.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground">Also Consider</h2>
            {secondaryCategories.map((category) => (
              <div key={category!.slug} className="mb-10">
                <Link href={`/tools/${category!.slug}`} className="group">
                  <h3 className="mb-2 font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {category!.title}
                    <ArrowRight className="ml-2 inline-block h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  </h3>
                </Link>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{category!.description}</p>
                <div className="space-y-3">
                  {category!.tools.map((tool) => (
                    <div key={tool.slug} className="rounded-xl border border-border bg-card p-5">
                      <div className="mb-2 flex items-start justify-between gap-4">
                        <h4 className="font-display text-base font-semibold text-foreground">{tool.name}</h4>
                        <span className="shrink-0 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                          {tool.pricing}
                        </span>
                      </div>
                      <p className="mb-2 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
                      <p className="text-xs text-muted-foreground/80">
                        <span className="font-medium text-foreground/70">Best for:</span> {tool.bestFor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Selection criteria */}
        <section className="mb-14">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">What to Look For</h2>
          <div className="space-y-3">
            {useCase.selectionCriteria.map((criterion, i) => (
              <div key={i} className="flex gap-3 rounded-lg border border-border/50 bg-card p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-[15px] leading-relaxed text-foreground/90">{criterion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Industry-specific context */}
        {industryContexts.length > 0 && (
          <section className="mb-14">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>Industry Context</span>
            </div>
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
              How Different Industries Approach {useCase.name}
            </h2>
            <div className="space-y-4">
              {industryContexts.map((ctx) => {
                const industry = ctx.industry!;
                const aiUseCase = industry.aiUseCases?.[ctx.mapping.useCaseIndex];
                const stackEntries = ctx.stack;

                // Find matching stack commentary for primary categories
                const relevantStackNotes = useCase.primaryToolCategories
                  .map((catSlug) => {
                    const entry = Array.isArray(stackEntries)
                      ? stackEntries.find((s: { categorySlug?: string; slug?: string }) => s.categorySlug === catSlug || s.slug === catSlug)
                      : null;
                    const category = getToolCategoryBySlug(catSlug);
                    return entry && category ? { category, entry } : null;
                  })
                  .filter(Boolean);

                return (
                  <div key={industry.slug} className="rounded-xl border border-border bg-card p-5">
                    <Link href={`/ai-growth-for/${industry.slug}`} className="group">
                      <h3 className="mb-2 font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                        {industry.name}
                      </h3>
                    </Link>
                    {aiUseCase && (
                      <p className="mb-2 text-sm leading-relaxed text-muted-foreground">
                        {aiUseCase.description}
                      </p>
                    )}
                    {aiUseCase?.impact && (
                      <p className="text-xs font-medium text-primary">{aiUseCase.impact}</p>
                    )}
                    {relevantStackNotes.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {relevantStackNotes.map((note) => (
                          <p key={note!.category.slug} className="text-xs text-muted-foreground">
                            <span className="font-medium text-foreground/70">{note!.category.title}:</span>{" "}
                            {(note!.entry as { commentary?: string })?.commentary ?? "Recommended for this industry."}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="mb-14">
          <NewsletterForm />
        </section>

        {/* Cross-links to other use-case tool pages */}
        <div className="mt-16">
          <h3 className="mb-6 font-display text-lg font-bold text-foreground">Explore tools for other use cases</h3>
          <div className="flex flex-wrap gap-2">
            {getAllUseCases().filter(uc => uc.slug !== slug).map((uc) => (
              <Link key={uc.slug} href={`/use-cases/${uc.slug}/tools`}
                className="inline-flex items-center rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5">
                {uc.name}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
