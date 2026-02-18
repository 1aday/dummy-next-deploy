import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, GraduationCap, Wrench, BarChart3, BookOpen, Zap } from "lucide-react";
import { getAllConceptIndustryPages, getConceptIndustryPage, getConceptsForIndustry, getIndustriesForConcept } from "@/lib/concept-industry";
import { getTermBySlug } from "@/lib/glossary";
import { getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export async function generateStaticParams() {
  return getAllConceptIndustryPages().map((p) => ({
    concept: p.conceptSlug,
    industry: p.industrySlug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ concept: string; industry: string }> }) {
  const { concept, industry } = await params;
  const page = getConceptIndustryPage(concept, industry);
  if (!page) return { title: "Not Found" };

  const title = `${page.conceptTerm} for ${page.industryName}: Complete Guide | AI Growth Stack`;
  const description = `How ${page.industryName} companies use ${page.conceptTerm}. ${page.whyNeeded.slice(0, 120)}`;

  return {
    title,
    description,
    alternates: { canonical: `/learn/${concept}/for/${industry}` },
    openGraph: { title, description, type: "article", siteName: "AI Growth Stack" },
  };
}

function getLinkedPosts(slugs: string[]) {
  return slugs
    .map((s) => { try { const p = getPostBySlug(s); return { slug: p.slug, title: p.title, excerpt: p.excerpt }; } catch { return null; } })
    .filter(Boolean) as { slug: string; title: string; excerpt: string }[];
}

export default async function ConceptIndustryPage({ params }: { params: Promise<{ concept: string; industry: string }> }) {
  const { concept: conceptSlug, industry: industrySlug } = await params;
  const page = getConceptIndustryPage(conceptSlug, industrySlug);
  if (!page) notFound();

  const glossaryTerm = getTermBySlug(conceptSlug);
  const relatedPosts = getLinkedPosts(page.relatedPosts);
  const relatedConcepts = page.relatedConcepts
    .map((s) => getTermBySlug(s))
    .filter(Boolean) as { slug: string; term: string; definition: string }[];
  const otherIndustries = getIndustriesForConcept(conceptSlug).filter((p) => p.industrySlug !== industrySlug);
  const otherConcepts = getConceptsForIndustry(industrySlug).filter((p) => p.conceptSlug !== conceptSlug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${page.conceptTerm} for ${page.industryName}`,
      description: page.whyNeeded,
      author: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
      publisher: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Learn", item: `${BASE_URL}/learn` },
        { "@type": "ListItem", position: 3, name: page.conceptTerm, item: `${BASE_URL}/glossary/${conceptSlug}` },
        { "@type": "ListItem", position: 4, name: `For ${page.industryName}`, item: `${BASE_URL}/learn/${conceptSlug}/for/${industrySlug}` },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
              <Link href="/guides" className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">Guides<span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" /></Link>
              <Link href="/blog" className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">Writing<span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" /></Link>
              <Link href="/about" className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">About<span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" /></Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/learn" className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>All learning guides</span>
        </Link>

        <header className="mb-14">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <GraduationCap className="h-3.5 w-3.5" />
              {page.conceptTerm}
            </span>
            <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
              {page.industryName}
            </span>
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold leading-[1.15] text-foreground md:text-5xl">
            {page.conceptTerm} for {page.industryName}
          </h1>

          {/* Quick Definition */}
          {glossaryTerm && (
            <div className="mb-6 rounded-xl border border-border bg-card p-5">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quick Definition</h2>
              <p className="text-base leading-relaxed text-foreground/90">{glossaryTerm.definition}</p>
              <Link href={`/glossary/${conceptSlug}`} className="mt-2 inline-block text-xs font-medium text-primary hover:underline">Full glossary entry →</Link>
            </div>
          )}

          <p className="text-lg leading-relaxed text-muted-foreground/90">
            {page.whyNeeded}
          </p>
        </header>

        {/* Applications */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span>Applications</span>
          </div>
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground">
            How {page.industryName} Uses {page.conceptTerm}
          </h2>
          <div className="space-y-4">
            {page.applications.map((app, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{app.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{app.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Tools */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Wrench className="h-4 w-4" />
            <span>Recommended Tools</span>
          </div>
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground">
            Tools for {page.conceptTerm} in {page.industryName}
          </h2>
          <div className="space-y-4">
            {page.recommendedTools.map((tool) => (
              <div key={tool.name} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{tool.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{tool.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Expected Metrics */}
        <section className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            <span>Expected Results</span>
          </div>
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground">Metrics You Can Expect</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {page.expectedMetrics.map((m, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 text-center">
                <div className="mb-1 font-display text-2xl font-bold text-primary">{m.value}</div>
                <div className="text-sm text-muted-foreground">{m.metric}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Concepts */}
        {relatedConcepts.length > 0 && (
          <section className="mb-14">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Related Concepts</span>
            </div>
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Also Learn About</h2>
            <div className="space-y-3">
              {relatedConcepts.map((c) => (
                <Link key={c.slug} href={`/glossary/${c.slug}`} className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{c.term}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{c.definition}</p>
                  </div>
                  <ArrowRight className="ml-4 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Deep Dive Reading</h2>
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

        {/* Same concept, other industries */}
        {otherIndustries.length > 0 && (
          <section className="mb-10">
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">
              {page.conceptTerm} in other industries
            </h3>
            <div className="flex flex-wrap gap-2">
              {otherIndustries.map((p) => (
                <Link key={p.industrySlug} href={`/learn/${conceptSlug}/for/${p.industrySlug}`} className="inline-flex items-center rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5">
                  {p.industryName}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Same industry, other concepts */}
        {otherConcepts.length > 0 && (
          <section className="mb-10">
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">
              More AI concepts for {page.industryName}
            </h3>
            <div className="flex flex-wrap gap-2">
              {otherConcepts.map((p) => (
                <Link key={p.conceptSlug} href={`/learn/${p.conceptSlug}/for/${industrySlug}`} className="inline-flex items-center rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5">
                  {p.conceptTerm}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="mt-32 border-t border-border/50">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">© 2026 AI Growth Stack</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="/feed.xml" className="hover:text-foreground transition-colors">RSS</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
