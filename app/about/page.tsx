import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Github, Twitter, Mail, Rss, Code2, TrendingUp, Zap } from "lucide-react";

export const metadata = {
  title: "About | Terminal Thoughts",
  description: "About this blog and the person behind it",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <div className="border-b border-border bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              About Terminal Thoughts
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Technical writing about AI and machine learning, focused on the practical side.
              No hype, no buzzwords—just code, architectures, and lessons learned.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-12">
            {/* What You'll Find */}
            <section>
              <h2 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">
                What You'll Find Here
              </h2>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-6 shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Deep Technical Dives</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Transformer architectures, training techniques, and model optimization with mathematical intuition.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/20">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Production Engineering</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Lessons from deploying LLMs, RAG systems, and ML infrastructure at scale.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Code-First Explanations</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Runnable examples in Python, PyTorch, and modern frameworks. Learn by reading real code.
                  </p>
                </div>
              </div>
            </section>

            {/* Who Writes This */}
            <section>
              <h2 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">
                Who Writes This
              </h2>

              <div className="space-y-4 leading-relaxed text-foreground/90">
                <p>
                  I'm an ML engineer who's spent years building AI systems in production. I believe in
                  sharing what actually works, not just what sounds impressive in papers.
                </p>

                <p>
                  This blog started as a way to document my own learning and share hard-won lessons with
                  the community. If you're building AI systems and running into the messy reality behind
                  the clean abstractions, this is for you.
                </p>
              </div>
            </section>

            {/* Philosophy */}
            <section>
              <h2 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">
                Philosophy
              </h2>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 shadow-md">
                <blockquote className="space-y-4 text-foreground/90">
                  <p className="text-lg font-medium leading-relaxed">
                    "The best way to understand something is to build it. The second best way is to read
                    about someone else building it and hitting all the problems you would have hit."
                  </p>
                  <footer className="text-sm text-muted-foreground">
                    — This blog's unofficial motto
                  </footer>
                </blockquote>
              </div>

              <p className="mt-6 leading-relaxed text-foreground/90">
                I prioritize clarity over cleverness, and practical utility over theoretical elegance.
                Every post aims to leave you with something you can actually use.
              </p>
            </section>

            {/* Get in Touch */}
            <section>
              <h2 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">
                Get in Touch
              </h2>

              <p className="mb-6 leading-relaxed text-foreground/90">
                Have questions, feedback, or just want to chat about AI engineering?
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted hover:border-primary/50 hover:scale-105"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted hover:border-primary/50 hover:scale-105"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted hover:border-primary/50 hover:scale-105"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </a>
                <a
                  href="/rss.xml"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted hover:border-primary/50 hover:scale-105"
                >
                  <Rss className="h-4 w-4" />
                  <span>RSS</span>
                </a>
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
              <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                Want to stay updated?
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                New posts typically drop weekly. Follow me on Twitter or subscribe to the RSS feed to
                never miss an article.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
              >
                <span>Browse All Posts</span>
                <span>→</span>
              </Link>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 Terminal Thoughts. Built with Next.js + Tailwind CSS.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Home
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
