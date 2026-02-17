import Link from "next/link";
import { ArrowLeft, Github, Twitter, Mail } from "lucide-react";

export const metadata = {
  title: "About | Terminal Thoughts",
  description: "About me and this blog",
};

export default function AboutPage() {
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
              <Link href="/about" className="text-sm font-medium text-foreground">
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

        <div className="space-y-12">
          <section>
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              About
            </h1>
            
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
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

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              What I Write About
            </h2>
            
            <ul className="space-y-3 text-foreground/90">
              <li className="flex gap-3">
                <span className="text-primary">→</span>
                <span>Deep technical dives into transformer architectures and training techniques</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">→</span>
                <span>Production engineering lessons from deploying LLMs and RAG systems</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">→</span>
                <span>Code-first explanations with runnable examples in Python and PyTorch</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">→</span>
                <span>Honest trade-off analysis—what works, what doesn't, and when to use each approach</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">
              Get in Touch
            </h2>
            
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-12 items-center gap-3 rounded-lg border border-border px-4 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-12 items-center gap-3 rounded-lg border border-border px-4 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="text-sm font-medium">Twitter</span>
              </a>
              <a 
                href="mailto:hello@example.com"
                className="flex h-12 items-center gap-3 rounded-lg border border-border px-4 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm font-medium">Email</span>
              </a>
            </div>
          </section>
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
