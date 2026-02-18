import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Trophy, Medal, Building2 } from "lucide-react";
import { getAllToolCategories, getToolCategoryBySlug } from "@/lib/tools";
import { getAllIndustries, getIndustryBySlug } from "@/lib/industries";
import { getIndustryToolRec, getAllIndustryToolRecs } from "@/lib/industry-tools";
import { getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export async function generateStaticParams() {
  const recs = getAllIndustryToolRecs();
  return recs.map((r) => ({
    category: r.categorySlug,
    industry: r.industrySlug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; industry: string }> }) {
  const { category: catSlug, industry: indSlug } = await params;
  const category = getToolCategoryBySlug(catSlug);
  const industry = getIndustryBySlug(indSlug);
  if (!category || !industry) return { title: "Not Found" };

  const title = `Best ${category.title} for ${industry.name} (2026) | AI Growth Stack`;
  const description = `Compare the best ${category.title.toLowerCase()} for ${industry.name} companies. Expert recommendations with industry-specific reasoning, pricing, and alternatives.`;

  return {
    title,
    description,
    alternates: { canonical: `/tools/${catSlug}/for/${indSlug}` },
    openGraph: { title, description, type: "article", siteName: "AI Growth Stack" },
  };
}

function getLinkedPosts(slugs: string[]) {
  return slugs
    .map((s) => { try { const p = getPostBySlug(s); return { slug: p.slug, title: p.title, excerpt: p.excerpt }; } catch { return null; } })
    .filter(Boolean) as { slug: string; title: string; excerpt: string }[];
}

export default async function IndustryToolPage({ params }: { params: Promise<{ category: string; industry: string }> }) {
  const { category: catSlug, industry: indSlug } = await params;
  const category = getToolCategoryBySlug(catSlug);
  const industry = getIndustryBySlug(indSlug);
  if (!category || !industry) notFound();

  const rec = getIndustryToolRec(catSlug, indSlug);
  if (!rec) notFound();

  const relatedPosts = getLinkedPosts(rec.relatedPosts);
  const otherIndustries = getAllIndustries().filter((i) => i.slug !== indSlug);
  const otherCategories = getAllToolCategories().filter((c) => c.slug !== catSlug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Best ${category.title} for ${industry.name}`,
      description: `Recommended ${category.title.toLowerCase()} for ${industry.name} companies.`,
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
        { "@type": "ListItem", position: 4, name: `For ${industry.name}`, item: `${BASE_URL}/tools/${catSlug}/for/${indSlug}` },
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
            <Building2 className="h-3.5 w-3.5" />
            <span>{industry.name}</span>
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold leading-[1.15] text-foreground md:text-5xl">
            Best {category.title} for {industry.name}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground/90">
            {rec.decisionFramework}
          </p>
        </header>

        {/* Recommendations */}
        <section className="mb-14">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Our Recommendations</h2>
          <div className="space-y-4">
            {rec.recommendations.map((tool) => (
              <div key={tool.toolSlug} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-3 flex items-center gap-3">
                  {tool.rating === "Top Pick" ? (
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  ) : tool.rating === "Runner Up" ? (
                    <Medal className="h-5 w-5 text-gray-400" />
                  ) : null}
                  <Link href={`/tools/${catSlug}/${tool.toolSlug}`} className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors">
                    {tool.toolName}
                  </Link>
                  <span className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold ${
                    tool.rating === "Top Pick"
                      ? "bg-yellow-500/10 text-yellow-600"
                      : tool.rating === "Runner Up"
                      ? "bg-gray-500/10 text-gray-500"
                      : "bg-primary/10 text-primary"
                  }`}>
                    {tool.rating}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{tool.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-14">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Quick Comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tool</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Why for {industry.name}</th>
                </tr>
              </thead>
              <tbody>
                {rec.recommendations.map((tool, i) => (
                  <tr key={tool.toolSlug} className={i % 2 === 0 ? "bg-background" : "bg-card/50"}>
                    <td className="px-4 py-3">
                      <Link href={`/tools/${catSlug}/${tool.toolSlug}`} className="font-semibold text-primary hover:underline">{tool.toolName}</Link>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{tool.rating}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{tool.reason.slice(0, 100)}...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cross Links */}
        <section className="mb-14">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Complete {industry.name} AI Stack</h2>
          <p className="mb-4 text-sm text-muted-foreground">See our recommended tools across all categories for {industry.name}.</p>
          <div className="space-y-2">
            {otherCategories.map((cat) => (
              <Link key={cat.slug} href={`/tools/${cat.slug}/for/${indSlug}`} className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-3 hover:border-primary/30 transition-all">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Best {cat.title} for {industry.name}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
            <Link href={`/ai-growth-for/${indSlug}/stack`} className="group flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-5 py-3 hover:border-primary/30 transition-all">
              <span className="text-sm font-semibold text-primary">View complete {industry.name} AI stack →</span>
            </Link>
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

        {/* Other Industries */}
        <div className="mt-16">
          <h3 className="mb-6 font-display text-lg font-bold text-foreground">Best {category.title} for other industries</h3>
          <div className="flex flex-wrap gap-2">
            {otherIndustries.map((ind) => (
              <Link key={ind.slug} href={`/tools/${catSlug}/for/${ind.slug}`} className="inline-flex items-center rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/30 hover:bg-primary/5">
                {ind.name}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
