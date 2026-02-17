import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Sparkles } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { Navigation } from "@/components/navigation";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Technical Writing on AI & Engineering
              </div>
              
              <h1 className="mb-6 font-serif text-5xl font-normal tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Deep dives into
                <span className="text-primary"> artificial intelligence</span>
              </h1>
              
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
                In-depth technical articles about machine learning, LLMs, and the engineering
                challenges behind modern AI systems.
              </p>
              
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/blog"
                  className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                >
                  Read the blog
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link
                  href="/about"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-8 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                >
                  About this blog
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Code-First</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Real implementations, not just theory. Every post includes working code examples
                  you can run.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Deep Technical</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We don't shy away from complexity. Expect mathematical intuition and
                  architectural deep-dives.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Production Focus</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Lessons from building real systems. We cover the gotchas, trade-offs, and
                  practical considerations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="bg-background">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Recent Posts</h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Built with Next.js · Terminal Thoughts © 2026
          </p>
        </div>
      </footer>
    </>
  );
}
