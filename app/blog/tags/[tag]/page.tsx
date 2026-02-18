import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { format } from "date-fns";
import { getAllTags, getPostsByTagSlug, tagToSlug, getTagsWithCount } from "@/lib/posts";

const BASE_URL = "https://growthstack.dev";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tagToSlug(tag),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagSlug } = await params;
  const result = getPostsByTagSlug(tagSlug);
  if (!result) return { title: "Tag Not Found" };

  return {
    title: `${result.tag} Articles`,
    description: `Deep technical guides on ${result.tag}. ${result.posts.length} articles covering practical ${result.tag.toLowerCase()} strategies, implementations, and best practices.`,
    alternates: {
      canonical: `/blog/tags/${tagSlug}`,
    },
    openGraph: {
      title: `${result.tag} Articles | AI Growth Stack`,
      description: `${result.posts.length} deep technical guides on ${result.tag.toLowerCase()}`,
      type: "website",
      siteName: "AI Growth Stack",
    },
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagSlug } = await params;
  const result = getPostsByTagSlug(tagSlug);
  if (!result) notFound();

  const { tag, posts } = result;
  const allTags = getTagsWithCount();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${tag} Articles`,
    description: `Articles about ${tag} on AI Growth Stack`,
    url: `${BASE_URL}/blog/tags/${tagSlug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/blog"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>All articles</span>
        </Link>

        <header className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Tag className="h-3.5 w-3.5" />
            <span>Topic</span>
          </div>
          <h1 className="mb-4 font-display text-5xl font-bold text-foreground md:text-6xl">
            {tag}
          </h1>
          <p className="text-xl text-muted-foreground/90">
            <span className="font-semibold text-primary">{posts.length}</span>{" "}
            {posts.length === 1 ? "article" : "articles"} on {tag.toLowerCase()}
          </p>
        </header>

        {/* Tag Cloud */}
        <div className="mb-12 flex flex-wrap gap-2">
          {allTags.map(({ tag: t, slug, count }) => (
            <Link
              key={slug}
              href={`/blog/tags/${slug}`}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                slug === tagSlug
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border/50 bg-secondary/50 text-secondary-foreground hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              {t}
              <span className="text-muted-foreground">({count})</span>
            </Link>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <article className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift gradient-border transition-all">
                <div className="relative z-10">
                  <div className="mb-3 flex items-center justify-between">
                    <time className="text-sm font-medium text-muted-foreground">
                      {format(new Date(post.date), "MMMM d, yyyy")}
                    </time>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="mb-3 font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="mb-4 text-muted-foreground/90 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <span>Read article</span>
                    <ArrowRight className="h-4 w-4 arrow-animate" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </article>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
