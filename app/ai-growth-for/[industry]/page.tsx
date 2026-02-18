import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, TrendingUp, AlertTriangle, Zap, BarChart3 } from "lucide-react";
import { getAllIndustries, getIndustryBySlug } from "@/lib/industries";
import { getPostBySlug } from "@/lib/posts";
import { NewsletterForm } from "@/components/newsletter-form";

const BASE_URL = "https://growthstack.dev";

export async function generateStaticParams() {
  const industries = getAllIndustries();
  return industries.map((industry) => ({
    industry: industry.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Not Found" };

  const ogImageUrl = `${BASE_URL}/og?title=${encodeURIComponent(industry.headline)}&tags=${encodeURIComponent(industry.keyTechnologies.slice(0, 3).join(","))}`;

  return {
    title: industry.headline,
    description: industry.description,
    alternates: {
      canonical: `/ai-growth-for/${slug}`,
    },
    openGraph: {
      title: `${industry.headline} | AI Growth Stack`,
      description: industry.description,
      type: "article",
      siteName: "AI Growth Stack",
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: industry.headline,
      description: industry.description,
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

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const linkedPosts = getLinkedPostData(industry.relatedPosts);
  const allIndustries = getAllIndustries().filter((i) => i.slug !== slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: industry.headline,
      description: industry.description,
      author: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
      publisher: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/ai-growth-for/${slug}` },
      url: `${BASE_URL}/ai-growth-for/${slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "AI Growth Strategies", item: `${BASE_URL}/ai-growth-for` },
        { "@type": "ListItem", position: 3, name: industry.name, item: `${BASE_URL}/ai-growth-for/${slug}` },
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

      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Home</span>
        </Link>

        {/* Header */}
        <header className="mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{industry.name} Growth</span>
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold leading-[1.15] text-foreground md:text-5xl">
            {industry.headline}
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground/90">
            {industry.description}
          </p>
        </header>

        {/* Key Metrics */}
        <div className="mb-14 grid gap-4 md:grid-cols-3">
          {industry.metrics.map((metric, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5 text-center">
              <div className="mb-1 font-display text-3xl font-bold text-primary">{metric.value}</div>
              <div className="mb-1 text-sm font-semibold text-foreground">{metric.label}</div>
              <div className="text-xs text-muted-foreground">{metric.context}</div>
            </div>
          ))}
        </div>

        <div className="mb-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Pain Points */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <span>Common Challenges</span>
          </div>
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground">
            Why {industry.name} Companies Need AI Growth
          </h2>
          <div className="space-y-4">
            {industry.painPoints.map((point, i) => (
              <div key={i} className="flex gap-3 rounded-lg border border-border/50 bg-card p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-orange-500/10 text-xs font-bold text-orange-600">
                  {i + 1}
                </span>
                <p className="text-[17px] leading-relaxed text-foreground/90">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Use Cases */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span>AI Solutions</span>
          </div>
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground">
            How AI Transforms {industry.name} Growth
          </h2>
          <div className="space-y-6">
            {industry.aiUseCases.map((useCase, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-foreground">{useCase.title}</h3>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary whitespace-nowrap">
                    {useCase.impact}
                  </span>
                </div>
                <p className="text-[17px] leading-relaxed text-foreground/90">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <NewsletterForm variant="mid-article" />

        {/* Key Technologies */}
        <section className="mb-14 mt-14">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            <span>Technology Stack</span>
          </div>
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground">
            Key AI Technologies for {industry.name}
          </h2>
          <div className="flex flex-wrap gap-3">
            {industry.keyTechnologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href={`/ai-growth-for/${slug}/stack`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View recommended tools for {industry.name}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        {/* Related Posts */}
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

        {/* Bottom Newsletter */}
        <NewsletterForm />

        {/* Other Industries */}
        <div className="mt-16">
          <h3 className="mb-6 font-display text-lg font-bold text-foreground">
            Explore AI growth strategies by industry
          </h3>
          <div className="flex flex-wrap gap-2">
            {allIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/ai-growth-for/${ind.slug}`}
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
