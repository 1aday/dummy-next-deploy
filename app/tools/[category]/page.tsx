import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Wrench } from "lucide-react";
import { getAllToolCategories, getToolCategoryBySlug } from "@/lib/tools";
import { getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export async function generateStaticParams() {
  const categories = getAllToolCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getToolCategoryBySlug(slug);
  if (!category) return { title: "Not Found" };

  return {
    title: `Best ${category.title} for AI Growth | AI Growth Stack`,
    description: category.description,
    alternates: {
      canonical: `/tools/${slug}`,
    },
    openGraph: {
      title: `Best ${category.title} for AI Growth | AI Growth Stack`,
      description: category.description,
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

export default async function ToolCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getToolCategoryBySlug(slug);
  if (!category) notFound();

  const relatedPosts = getLinkedPosts(category.relatedPosts);

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
        name: "Tools",
        item: `${BASE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.title,
        item: `${BASE_URL}/tools/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/tools"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>All tool categories</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Wrench className="h-3.5 w-3.5" />
            <span>Tool Comparison</span>
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            {category.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground/90">
            {category.description}
          </p>
        </header>

        {/* Tool Comparison Table */}
        <section className="mb-16">
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tool
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Best For
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Pricing
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.tools.map((tool, i) => (
                  <tr
                    key={tool.name}
                    className={
                      i % 2 === 0 ? "bg-background" : "bg-card/50"
                    }
                  >
                    <td className="px-4 py-3">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:underline"
                      >
                        {tool.name}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {tool.bestFor}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {tool.pricing}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Tool Cards */}
        <section className="mb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
            Detailed Overview
          </h2>
          <div className="space-y-4">
            {category.tools.map((tool) => (
              <article
                key={tool.name}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {tool.name}
                  </h3>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    Visit site
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="rounded-lg bg-primary/5 px-3 py-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Pricing
                    </span>
                    <p className="text-sm font-medium text-foreground">
                      {tool.pricing}
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/5 px-3 py-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Best for
                    </span>
                    <p className="text-sm font-medium text-foreground">
                      {tool.bestFor}
                    </p>
                  </div>
                </div>
              </article>
            ))}
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
    </>
  );
}
