import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, Clock, ArrowLeft, Tag, User } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Navigation } from "@/components/navigation";

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
    return {
      title: `${post.title} | Terminal Thoughts`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: post.author ? [post.author] : undefined,
      },
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Navigation />
      
      <article className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="border-b border-border bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-4xl px-6 py-12">
            {/* Back link */}
            <Link
              href="/blog"
              className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to blog</span>
            </Link>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary ring-1 ring-primary/20"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="mb-6 font-display text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date} className="font-medium">
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{post.readingTime}</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
              )}
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="prose">
            <MDXRemote source={post.content} />
          </div>

          {/* Footer Navigation */}
          <footer className="mt-20 border-t border-border pt-12">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:border-primary/50 hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>All Posts</span>
              </Link>

              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span>Filed under:</span>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="font-medium text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
