import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Sparkles, Zap, TrendingUp, Target } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { Navigation } from "@/components/navigation";
import { HeroVisual } from "@/components/hero-visual";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen overflow-hidden">
        {/* Hero Section - Asymmetric Layout */}
        <section className="relative border-b border-border">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Left column - Text */}
              <div className="space-y-8 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm animate-fade-in delay-100">
                  <Sparkles className="h-4 w-4" />
                  <span>Deep Technical AI Content</span>
                </div>
                
                <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl animate-fade-in-up delay-200">
                  AI Engineering
                  <br />
                  <span className="gradient-text">Beyond the Hype</span>
                </h1>
                
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl animate-fade-in-up delay-300">
                  In-depth technical articles about transformers, RAG pipelines, fine-tuning, and the real engineering 
                  challenges behind modern AI systems. Code included.
                </p>
                
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 animate-fade-in-up delay-400">
                  <Link
                    href="/blog"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
                  >
                    <span>Explore Articles</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  
                  <Link
                    href="/about"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-8 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:border-primary/50 hover:scale-105"
                  >
                    <span>About</span>
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 pt-8 border-t border-border animate-fade-in-up delay-500">
                  <div>
                    <div className="text-3xl font-bold text-foreground">{posts.length}+</div>
                    <div className="text-sm text-muted-foreground">Technical Posts</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">15K+</div>
                    <div className="text-sm text-muted-foreground">Words Written</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">100%</div>
                    <div className="text-sm text-muted-foreground">Code Examples</div>
                  </div>
                </div>
              </div>

              {/* Right column - Visual element */}
              <HeroVisual />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Why Read This Blog?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                No fluff. No surface-level tutorials. Just deep technical content with working code.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
                <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-2xl transition-all group-hover:bg-primary/10" />
                <div className="relative">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Code2 className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                    Code-First Approach
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Every article includes working implementations in Python and PyTorch. Learn by reading real code, not pseudocode.
                  </p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
                <div className="absolute top-0 right-0 h-32 w-32 bg-accent/5 rounded-full blur-2xl transition-all group-hover:bg-accent/10" />
                <div className="relative">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                    Deep Technical Dives
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    We don't shy away from complexity. Expect mathematical intuition, architectural analysis, and production insights.
                  </p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
                <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-2xl transition-all group-hover:bg-primary/10" />
                <div className="relative">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                    Production Focus
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Real lessons from building AI systems at scale. Covering gotchas, trade-offs, and practical considerations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Latest Posts
                </h2>
                <p className="text-lg text-muted-foreground">
                  Deep technical explorations of AI and machine learning
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
              >
                <span>View all</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <div key={post.slug} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center sm:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
              >
                <span>View all posts</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 Terminal Thoughts. Built with Next.js + Tailwind CSS.
            </p>
            <div className="flex gap-6">
              <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
