import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, Clock, ArrowLeft, Github, Twitter } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { NewsletterForm } from "@/components/newsletter-form";
import { getFaqsForSlug, type FaqItem } from "@/lib/faq-data";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    const ogImageUrl = `${BASE_URL}/og?title=${encodeURIComponent(post.title)}&tags=${encodeURIComponent((post.tags || []).join(","))}`;
    return {
      title: post.title,
      description: post.excerpt,
      keywords: post.tags,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.lastModified,
        authors: ["AI Growth Stack"],
        tags: post.tags,
        siteName: "AI Growth Stack",
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [ogImageUrl],
      },
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

function getRelatedPosts(currentSlug: string, currentTags: string[] = [], limit = 3) {
  const allPosts = getAllPosts();
  return allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      ...p,
      relevance: (p.tags || []).filter((t) => currentTags.includes(t)).length,
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);
}

function ArticleJsonLd({ post, slug, faqs }: { post: { title: string; excerpt: string; date: string; lastModified: string; tags?: string[]; readingTime: string; type?: "article" | "tutorial" }; slug: string; faqs?: FaqItem[] | null }) {
  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": post.type === "tutorial" ? "TechArticle" : "Article",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.lastModified,
      author: {
        "@type": "Organization",
        name: "AI Growth Stack",
        url: BASE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "AI Growth Stack",
        url: BASE_URL,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${BASE_URL}/blog/${slug}`,
      },
      keywords: (post.tags || []).join(", "),
      url: `${BASE_URL}/blog/${slug}`,
    },
    {
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
          name: "Blog",
          item: `${BASE_URL}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `${BASE_URL}/blog/${slug}`,
        },
      ],
    },
  ];

  if (faqs && faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.tags);
  const faqs = getFaqsForSlug(slug);

  return (
    <>
      <ArticleJsonLd post={post} slug={slug} faqs={faqs} />

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
                <span className="absolute -inset-2 rounded bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/blog"
                className="relative text-sm font-medium text-foreground group"
              >
                Writing
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-primary" />
              </Link>
              <Link
                href="/about"
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                About
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/blog"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to writing</span>
        </Link>

        {/* Header */}
        <header className="mb-14">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <h1 className="mb-6 font-display text-4xl font-bold leading-[1.15] text-foreground md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <time dateTime={post.date} className="font-medium">
                {format(new Date(post.date), "MMMM d, yyyy")}
              </time>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                <Clock className="h-4 w-4 text-accent" />
              </div>
              <span className="font-medium">{post.readingTime}</span>
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="mb-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Content */}
        <div className="prose">
          <MDXRemote source={post.content} />
        </div>

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-3 font-display text-base font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mid-article Newsletter CTA */}
        <NewsletterForm variant="mid-article" />

        {/* Newsletter CTA */}
        <NewsletterForm />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-6 font-display text-lg font-bold text-foreground">
              Keep reading
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  {rp.tags && rp.tags.length > 0 && (
                    <span className="mb-2 inline-block text-xs font-semibold text-primary">
                      {rp.tags[0]}
                    </span>
                  )}
                  <h4 className="mb-2 font-display text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {rp.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {rp.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 space-y-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                Enjoyed this article?
              </p>
              <p className="text-base font-semibold text-foreground">
                Share it with your network
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${BASE_URL}/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-5 font-medium text-foreground hover-lift hover:border-primary/50 hover:bg-primary/5"
              >
                <Twitter className="h-4 w-4" />
                <span>Share</span>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${BASE_URL}/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-5 font-medium text-foreground hover-lift hover:border-primary/50 hover:bg-primary/5"
              >
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>All articles</span>
          </Link>
        </footer>
      </article>

      <footer className="mt-20 border-t border-border/50">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2026 AI Growth Stack
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="/feed.xml" className="hover:text-foreground transition-colors">RSS</Link>
              {siteConfig.social.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
