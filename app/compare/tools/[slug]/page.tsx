import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Scale } from "lucide-react";
import { getAllToolComparisons, getToolComparisonBySlug } from "@/lib/tool-comparisons";
import { getToolBySlug } from "@/lib/tools";
import { getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export async function generateStaticParams() {
  return getAllToolComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp = getToolComparisonBySlug(slug);
  if (!comp) return { title: "Not Found" };

  const title = `${comp.toolA.name} vs ${comp.toolB.name}: ${comp.categoryTitle} Comparison | AI Growth Stack`;
  const description = `Detailed comparison of ${comp.toolA.name} and ${comp.toolB.name}. Compare pricing, performance, and features to choose the right ${comp.categoryTitle.toLowerCase()} for your AI stack.`;

  return {
    title,
    description,
    alternates: { canonical: `/compare/tools/${slug}` },
    openGraph: { title, description, type: "article", siteName: "AI Growth Stack" },
  };
}

export default async function ToolComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp = getToolComparisonBySlug(slug);
  if (!comp) notFound();

  const toolAData = getToolBySlug(comp.toolA.slug);
  const toolBData = getToolBySlug(comp.toolB.slug);
  const allComps = getAllToolComparisons()
    .filter((c) => c.categorySlug === comp.categorySlug && c.slug !== slug)
    .slice(0, 6);

  const relatedPosts = (toolAData?.category.relatedPosts || [])
    .map((s) => { try { const p = getPostBySlug(s); return { slug: p.slug, title: p.title, excerpt: p.excerpt }; } catch { return null; } })
    .filter(Boolean) as { slug: string; title: string; excerpt: string }[];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${comp.toolA.name} vs ${comp.toolB.name}`,
      description: `Comparison of ${comp.toolA.name} and ${comp.toolB.name} for ${comp.categoryTitle.toLowerCase()}.`,
      author: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
      publisher: { "@type": "Organization", name: "AI Growth Stack", url: BASE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
        { "@type": "ListItem", position: 3, name: comp.categoryTitle, item: `${BASE_URL}/tools/${comp.categorySlug}` },
        { "@type": "ListItem", position: 4, name: `${comp.toolA.name} vs ${comp.toolB.name}`, item: `${BASE_URL}/compare/tools/${slug}` },
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
        <Link href={`/tools/${comp.categorySlug}`} className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>All {comp.categoryTitle}</span>
        </Link>

        <header className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Scale className="h-3.5 w-3.5" />
            <span>Tool Comparison</span>
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            {comp.toolA.name} vs {comp.toolB.name}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground/90">
            A head-to-head comparison of two leading {comp.categoryTitle.toLowerCase()} for AI-powered growth.
            See how they stack up on pricing, performance, and capabilities.
          </p>
        </header>

        {/* Quick Stats */}
        {toolAData && toolBData && (
          <section className="mb-14">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{toolAData.tool.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Pricing:</span> {toolAData.tool.pricing}</p>
                  <p><span className="font-medium text-foreground">Best for:</span> {toolAData.tool.bestFor}</p>
                </div>
                <Link href={`/tools/${comp.categorySlug}/${comp.toolA.slug}`} className="mt-3 inline-block text-xs font-medium text-primary hover:underline">
                  Full review →
                </Link>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{toolBData.tool.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Pricing:</span> {toolBData.tool.pricing}</p>
                  <p><span className="font-medium text-foreground">Best for:</span> {toolBData.tool.bestFor}</p>
                </div>
                <Link href={`/tools/${comp.categorySlug}/${comp.toolB.slug}`} className="mt-3 inline-block text-xs font-medium text-primary hover:underline">
                  Full review →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Comparison Table */}
        <section className="mb-14">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Head-to-Head Comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Criteria</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-primary">{comp.toolA.name}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-primary">{comp.toolB.name}</th>
                </tr>
              </thead>
              <tbody>
                {comp.criteria.map((criterion, i) => (
                  <tr key={criterion.name} className={i % 2 === 0 ? "bg-background" : "bg-card/50"}>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{criterion.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{criterion.toolA}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{criterion.toolB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-14">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">The Verdict</h2>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-base leading-relaxed text-foreground/90">{comp.verdict}</p>
          </div>
        </section>

        {/* Industry-Specific Links */}
        <section className="mb-14">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Best {comp.categoryTitle} by Industry</h2>
          <div className="flex flex-wrap gap-2">
            {["saas", "fintech", "e-commerce", "healthtech", "edtech", "marketplace", "devtools", "media", "gaming", "real-estate", "logistics", "hr-tech", "cybersecurity", "insurtech", "legal-tech"].map((ind) => (
              <Link key={ind} href={`/tools/${comp.categorySlug}/for/${ind}`} className="inline-flex items-center rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5">
                {ind.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
              </Link>
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

        {/* More Comparisons */}
        {allComps.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-6 font-display text-lg font-bold text-foreground">More {comp.categoryTitle} comparisons</h3>
            <div className="flex flex-wrap gap-2">
              {allComps.map((c) => (
                <Link key={c.slug} href={`/compare/tools/${c.slug}`} className="inline-flex items-center rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5">
                  {c.toolA.name} vs {c.toolB.name}
                </Link>
              ))}
            </div>
          </div>
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
