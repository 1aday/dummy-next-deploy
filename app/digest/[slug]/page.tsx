import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, ExternalLink, Newspaper } from "lucide-react";
import { getAllDigests, getDigestBySlug } from "@/lib/digests";
import { getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export async function generateStaticParams() {
  const digests = getAllDigests();
  return digests.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const digest = getDigestBySlug(slug);
  if (!digest) return { title: "Not Found" };

  return {
    title: `${digest.title} | AI Growth Stack`,
    description: digest.intro,
    alternates: {
      canonical: `/digest/${slug}`,
    },
    openGraph: {
      title: `${digest.title} | AI Growth Stack`,
      description: digest.intro,
      type: "article",
      siteName: "AI Growth Stack",
    },
  };
}

function getPostData(slug: string) {
  try {
    const post = getPostBySlug(slug);
    return { slug: post.slug, title: post.title, readingTime: post.readingTime };
  } catch {
    return null;
  }
}

export default async function DigestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const digest = getDigestBySlug(slug);
  if (!digest) notFound();

  const allDigests = getAllDigests();
  const currentIndex = allDigests.findIndex((d) => d.slug === slug);
  const prevDigest = currentIndex < allDigests.length - 1 ? allDigests[currentIndex + 1] : null;
  const nextDigest = currentIndex > 0 ? allDigests[currentIndex - 1] : null;

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
        name: "Digest",
        item: `${BASE_URL}/digest`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: digest.title,
        item: `${BASE_URL}/digest/${slug}`,
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
          href="/digest"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>All digests</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Newspaper className="h-3.5 w-3.5" />
            <span>Issue #{digest.number}</span>
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            {digest.title}
          </h1>
          <time
            dateTime={digest.date}
            className="text-sm font-medium text-muted-foreground"
          >
            {format(new Date(digest.date), "MMMM d, yyyy")}
          </time>
        </header>

        {/* Intro */}
        <div className="mb-12 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <p className="text-base leading-relaxed text-foreground/90">
            {digest.intro}
          </p>
        </div>

        {/* Items */}
        <div className="space-y-6">
          {digest.items.map((item, index) => {
            const linkedPost = item.postSlug
              ? getPostData(item.postSlug)
              : null;

            return (
              <article
                key={index}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-1 flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h2>
                </div>
                <p className="mb-4 ml-10 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <div className="ml-10">
                  {linkedPost ? (
                    <Link
                      href={`/blog/${linkedPost.slug}`}
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      Read article
                      <ArrowRight className="h-3.5 w-3.5 arrow-animate" />
                    </Link>
                  ) : item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      Visit link
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-16 flex items-center justify-between">
          {prevDigest ? (
            <Link
              href={`/digest/${prevDigest.slug}`}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Issue #{prevDigest.number}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextDigest ? (
            <Link
              href={`/digest/${nextDigest.slug}`}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Issue #{nextDigest.number}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>
    </>
  );
}
