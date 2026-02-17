import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Writing | Terminal Thoughts",
  description: "Technical articles about AI, machine learning, and software engineering",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <nav className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="font-display text-lg font-semibold text-foreground">
              A
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/blog" className="text-sm font-medium text-foreground">
                Writing
              </Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link 
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>

        <header className="mb-16">
          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Writing
          </h1>
          <p className="text-lg text-muted-foreground">
            {posts.length} articles about AI, machine learning, and software engineering
          </p>
        </header>

        <div className="space-y-12">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="border-l-2 border-border pl-6 transition-all hover:border-primary">
                <time className="text-sm text-muted-foreground">
                  {format(new Date(post.date), "MMMM d, yyyy")} · {post.readingTime}
                </time>
                <h2 className="mt-2 mb-3 font-display text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mb-3 text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-border mt-24">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <p className="text-sm text-muted-foreground text-center">
            © 2026 · Built with Next.js
          </p>
        </div>
      </footer>
    </>
  );
}
