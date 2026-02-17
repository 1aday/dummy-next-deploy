import Link from "next/link";
import { ArrowRight, Github, Twitter, Mail } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <nav className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="font-display text-lg font-semibold text-foreground">
              A
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Writing
              </Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-24">
        {/* Hero */}
        <section className="mb-24">
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            AI Engineer & Technical Writer
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
            Building production AI systems and writing about the messy reality behind the abstractions.
            Deep dives into transformers, RAG, fine-tuning, and what actually works.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="mailto:hello@example.com"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </section>

        {/* Recent Writing */}
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Recent Writing
            </h2>
            <Link 
              href="/blog"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              <span>View all</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-8">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="border-l-2 border-border pl-6 transition-all hover:border-primary">
                  <time className="text-sm text-muted-foreground">
                    {format(new Date(post.date), "MMMM d, yyyy")}
                  </time>
                  <h3 className="mt-2 mb-2 font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Read more</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
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
