import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Lightbulb, Building2, Wrench, BookOpen, HelpCircle } from "lucide-react";
import { getAllUseCases, getUseCaseBySlug } from "@/lib/use-cases";
import { getIndustryBySlug } from "@/lib/industries";
import { getToolCategoryBySlug } from "@/lib/tools";
import { getTermBySlug } from "@/lib/glossary";
import { getPostBySlug } from "@/lib/posts";
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

  const ogImageUrl = `${BASE_URL}/og?title=${encodeURIComponent(useCase.headline)}&tags=${encodeURIComponent(useCase.keywords.slice(0, 3).join(","))}`;

  return {
    title: useCase.headline,
    description: useCase.description,
    alternates: {
      canonical: `/use-cases/${slug}`,
    },
    openGraph: {
      title: `${useCase.headline} | AI Growth Stack`,
      description: useCase.description,
      type: "article" as const,
      siteName: "AI Growth Stack",
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: useCase.headline,
      description: useCase.description,
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

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);
  if (!useCase) notFound();

  const linkedPosts = getLinkedPostData(useCase.relatedPosts);
  const allUseCases = getAllUseCases().filter((uc) => uc.slug !== slug);

  // Resolve industry data for each industry mapping
  const industryApplications = useCase.industryMapping
    .map((m) => {
      const industry = getIndustryBySlug(m.industrySlug);
      if (!industry) return null;
      const aiUseCase = industry.aiUseCases[m.useCaseIndex];
      if (!aiUseCase) return null;
      return { industry, aiUseCase };
    })
    .filter(Boolean) as { industry: { slug: string; name: string; aiUseCases: { title: string; description: string; impact: string }[] }; aiUseCase: { title: string; description: string; impact: string } }[];

  // Resolve tool categories
  const primaryCategories = useCase.primaryToolCategories
    .map((s) => getToolCategoryBySlug(s))
    .filter(Boolean) as { slug: string; title: string }[];

  // Resolve glossary terms
  const glossaryTerms = useCase.relatedGlossaryTerms
    .map((s) => getTermBySlug(s))
    .filter(Boolean) as { slug: string; term: string; definition: string }[];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: useCase.headline,
      description: useCase.description,
      author: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
      publisher: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/use-cases/${slug}` },
      url: `${BASE_URL}/use-cases/${slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Use Cases", item: `${BASE_URL}/use-cases` },
        { "@type": "ListItem", position: 3, name: useCase.name, item: `${BASE_URL}/use-cases/${slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: useCase.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
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
            <Link href="/" className="group flex items-center gap-2 font-display text-base font-semibold text-foreground">
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
        <Link
          href="/use-cases"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>All Use Cases</span>
        </Link>

        {/* Hero */}
        <header className="mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Use Case</span>
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold leading-[1.15] text-foreground md:text-5xl">
            {useCase.headline}
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground/90">
            {useCase.description}
          </p>
        </header>

        <div className="mb-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Industry Applications */}
        {industryApplications.length > 0 && (
          <section className="mb-14">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>Industry Applications</span>
            </div>
            <h2 className="mb-6 font-display text-3xl font-bold text-foreground">
              Where This Use Case Drives Growth
            </h2>
            <div className="space-y-4">
              {industryApplications.map((item) => (
                <Link
                  key={item.industry.slug}
                  href={`/ai-growth-for/${item.industry.slug}`}
                  className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.industry.name}
                    </h3>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary whitespace-nowrap">
                      {item.aiUseCase.impact}
                    </span>
                  </div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground/80">{item.aiUseCase.title}</h4>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{item.aiUseCase.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recommended Tool Categories */}
        {primaryCategories.length > 0 && (
          <section className="mb-14">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Wrench className="h-4 w-4" />
              <span>Recommended Tools</span>
            </div>
            <h2 className="mb-6 font-display text-3xl font-bold text-foreground">
              Tools for {useCase.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {primaryCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/tools/${category.slug}`}
                  className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  {category.title}
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href={`/use-cases/${slug}/tools`}
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                View full tool recommendations
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </section>
        )}

        {/* Related Glossary Terms */}
        {glossaryTerms.length > 0 && (
          <section className="mb-14">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Related Concepts</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {glossaryTerms.map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="rounded-lg border border-border/50 bg-secondary/50 px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  {term.term}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {useCase.faqs.length > 0 && (
          <section className="mb-14">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </div>
            <h2 className="mb-6 font-display text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {useCase.faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="mb-2 font-display text-base font-semibold text-foreground">{faq.question}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
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

        <NewsletterForm />

        {/* Cross-links */}
        <div className="mt-16">
          <h3 className="mb-6 font-display text-lg font-bold text-foreground">Explore other AI use cases</h3>
          <div className="flex flex-wrap gap-2">
            {allUseCases.map((uc) => (
              <Link
                key={uc.slug}
                href={`/use-cases/${uc.slug}`}
                className="inline-flex items-center rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                {uc.name}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
