import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Github, Twitter, Mail, Rss } from "lucide-react";

export const metadata = {
  title: "About | Terminal Thoughts",
  description: "About this blog and the person behind it",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="mb-8 font-serif text-4xl font-normal tracking-tight text-foreground md:text-5xl">
            About Terminal Thoughts
          </h1>

          <div className="prose space-y-6 text-base leading-relaxed text-foreground/90">
            <p>
              This is a technical blog focused on the practical side of artificial intelligence and
              machine learning engineering. No hype, no buzzwords—just code, architectures, and
              lessons learned from building real systems.
            </p>

            <h2 className="mb-4 mt-12 text-2xl font-semibold text-foreground">What You'll Find Here</h2>

            <ul className="space-y-3">
              <li>
                <strong className="text-foreground">Deep technical dives</strong> into transformer
                architectures, training techniques, and model optimization
              </li>
              <li>
                <strong className="text-foreground">Production engineering</strong> lessons from
                deploying LLMs, RAG systems, and ML infrastructure
              </li>
              <li>
                <strong className="text-foreground">Code-first explanations</strong> with runnable
                examples in Python, PyTorch, and modern frameworks
              </li>
              <li>
                <strong className="text-foreground">Honest trade-off analysis</strong>—what works,
                what doesn't, and when to use each approach
              </li>
            </ul>

            <h2 className="mb-4 mt-12 text-2xl font-semibold text-foreground">Who Writes This</h2>

            <p>
              I'm an ML engineer who's spent years building AI systems in production. I believe in
              sharing what actually works, not just what sounds impressive in papers.
            </p>

            <p>
              This blog started as a way to document my own learning and share hard-won lessons with
              the community. If you're building AI systems and running into the messy reality behind
              the clean abstractions, this is for you.
            </p>

            <h2 className="mb-4 mt-12 text-2xl font-semibold text-foreground">Philosophy</h2>

            <div className="rounded-lg border border-border bg-muted/30 p-6">
              <p className="mb-4 text-muted-foreground">
                "The best way to understand something is to build it. The second best way is to read
                about someone else building it and hitting all the problems you would have hit."
              </p>
              <p className="text-sm text-muted-foreground">— This blog's unofficial motto</p>
            </div>

            <p>
              I prioritize clarity over cleverness, and practical utility over theoretical elegance.
              Every post aims to leave you with something you can actually use.
            </p>

            <h2 className="mb-4 mt-12 text-2xl font-semibold text-foreground">Get in Touch</h2>

            <p>Have questions, feedback, or just want to chat about AI engineering?</p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="/rss.xml"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Rss className="h-4 w-4" />
                RSS Feed
              </a>
            </div>

            <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6">
              <h3 className="mb-3 font-semibold text-foreground">Want to stay updated?</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                New posts typically drop weekly. Follow me on Twitter or subscribe to the RSS feed to
                never miss an article.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Browse all posts →
              </Link>
            </div>
          </div>
        </div>
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
