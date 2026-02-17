import { Navigation } from "@/components/navigation";
import { AboutPageClient } from "@/components/about-page-client";

export const metadata = {
  title: "About | Terminal Thoughts",
  description: "About this blog and the person behind it",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <AboutPageClient />
      
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 Terminal Thoughts. Built with Next.js + Tailwind CSS + Framer Motion.
            </p>
            <div className="flex gap-6">
              <a href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Home
              </a>
              <a href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Blog
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
