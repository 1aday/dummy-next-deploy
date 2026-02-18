import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import { getPostBySlug } from "@/lib/posts";
import { NewsletterForm } from "@/components/newsletter-form";

const BASE_URL = "https://growthstack.dev";

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `/guides/${slug}`,
    },
    openGraph: {
      title: `${guide.title} | AI Growth Stack`,
      description: guide.description,
      type: "article",
      siteName: "AI Growth Stack",
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
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

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
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
        "@id": `${BASE_URL}/guides/${slug}`,
      },
      url: `${BASE_URL}/guides/${slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: guide.title, item: `${BASE_URL}/guides/${slug}` },
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
              <Link href="/guides" className="relative text-sm font-medium text-foreground group">
                Guides
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-primary" />
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
          href="/guides"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>All guides</span>
        </Link>

        {/* Header */}
        <header className="mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{guide.sections.length} chapters</span>
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold leading-[1.15] text-foreground md:text-5xl lg:text-6xl">
            {guide.title}
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground/90">
            {guide.description}
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="mb-14 rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-foreground">In this guide</h2>
          <ol className="space-y-2">
            {guide.sections.map((section, i) => (
              <li key={i}>
                <a
                  href={`#section-${i}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium">{section.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-14" />

        {/* Sections */}
        {guide.sections.map((section, i) => {
          const linkedPosts = getLinkedPostData(section.linkedPosts);
          return (
            <section key={i} id={`section-${i}`} className="mb-16">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                Chapter {i + 1}
              </div>
              <h2 className="mb-6 font-display text-3xl font-bold text-foreground">
                {section.title}
              </h2>
              <div className="prose">
                {section.content.split("\n\n").map((paragraph, pi) => {
                  if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                    return (
                      <h3 key={pi} className="text-xl font-semibold mt-8 mb-3 text-foreground">
                        {paragraph.replace(/\*\*/g, "")}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith("- ") || paragraph.startsWith("* ")) {
                    const items = paragraph.split("\n").filter(Boolean);
                    return (
                      <ul key={pi} className="my-4 space-y-2 pl-6 list-disc">
                        {items.map((item, li) => (
                          <li key={li} className="text-foreground/90 leading-[1.75] text-[17px]">
                            {renderBoldText(item.replace(/^[-*]\s/, ""))}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={pi} className="my-6 leading-[1.75] text-[17px] text-foreground/90">
                      {renderBoldText(paragraph)}
                    </p>
                  );
                })}
              </div>

              {/* Linked Posts */}
              {linkedPosts.length > 0 && (
                <div className="mt-8 rounded-xl border border-border bg-card p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Deep dive
                  </p>
                  <div className="space-y-3">
                    {linkedPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-primary/5"
                      >
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                            {post.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{post.readingTime}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary arrow-animate" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Mid-guide newsletter CTA (after 3rd section) */}
              {i === 2 && <NewsletterForm variant="mid-article" />}

              {i < guide.sections.length - 1 && (
                <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              )}
            </section>
          );
        })}

        {/* Bottom Newsletter CTA */}
        <NewsletterForm />

        {/* Other Guides */}
        <div className="mt-16">
          <h3 className="mb-6 font-display text-lg font-bold text-foreground">
            Continue learning
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {getAllGuides()
              .filter((g) => g.slug !== slug)
              .map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <p className="mb-1 text-xs font-semibold text-primary">{g.tagline}</p>
                  <h4 className="font-display text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {g.title}
                  </h4>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </>
  );
}

function renderBoldText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
