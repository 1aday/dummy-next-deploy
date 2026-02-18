import Link from "next/link";
import { ArrowLeft, Github, Twitter, Mail, Sparkles, Code2, FileText, Lightbulb } from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "About | AI Growth Stack",
  description: "Master AI-powered product growth with deep technical guides from growth engineers building AI-native products that scale",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
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
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                Writing
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
              </Link>
              <Link 
                href="/about" 
                className="relative text-sm font-medium text-foreground group"
              >
                About
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-primary" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link 
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </Link>

        <div className="space-y-16">
          <section>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Making AI practical</span>
            </div>

            <h1 className="mb-8 font-display text-5xl font-bold text-foreground md:text-6xl">
              About
            </h1>
            
            <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
              <p>
                I'm an ML engineer who's spent years building AI systems in production. 
                I write about the practical side—transformers, RAG pipelines, fine-tuning, 
                and the real engineering challenges behind modern AI.
              </p>

              <p>
                This blog is my attempt to share what actually works, not just what sounds 
                impressive in papers. If you're building AI systems and hitting the messy 
                reality behind the clean abstractions, this is for you.
              </p>

              <p>
                I prioritize clarity over cleverness, and practical utility over theoretical elegance.
                Every post aims to leave you with something you can actually use.
              </p>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <section>
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground">
              What I Write About
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="group rounded-2xl border border-border bg-card p-6 hover-lift transition-all">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold text-foreground">
                  Deep Technical Dives
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Transformer architectures, training techniques, and the math that makes it work
                </p>
              </div>

              <div className="group rounded-2xl border border-border bg-card p-6 hover-lift transition-all">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold text-foreground">
                  Production Engineering
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Real lessons from deploying LLMs and RAG systems at scale
                </p>
              </div>

              <div className="group rounded-2xl border border-border bg-card p-6 hover-lift transition-all">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold text-foreground">
                  Code-First Explanations
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Runnable examples in Python and PyTorch you can actually use
                </p>
              </div>

              <div className="group rounded-2xl border border-border bg-card p-6 hover-lift transition-all">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold text-foreground">
                  Honest Trade-offs
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  What works, what doesn't, and when to use each approach
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <section>
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground">
              Get in Touch
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-3">
              {siteConfig.social.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 hover-lift"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <Github className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">GitHub</div>
                    <div className="text-xs text-muted-foreground">View projects</div>
                  </div>
                  <span className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              )}

              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 hover-lift badge-dot"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                    <Twitter className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Twitter</div>
                    <div className="text-xs text-muted-foreground">Follow updates</div>
                  </div>
                  <span className="absolute inset-0 bg-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              )}

              {siteConfig.social.email && (
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 hover-lift"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-xs text-muted-foreground">Say hello</div>
                  </div>
                  <span className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-32 border-t border-border/50">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2026 · Crafted with attention to detail
            </p>
            <div className="flex items-center gap-3">
              {siteConfig.social.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="mt-6 text-center text-xs text-muted-foreground/60">
            Next.js 15 · React 19 · Tailwind CSS v4
          </p>
        </div>
      </footer>
    </>
  );
}
