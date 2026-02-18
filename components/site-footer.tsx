import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 AI Growth Stack
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link
              href="/feed.xml"
              className="hover:text-foreground transition-colors"
            >
              RSS
            </Link>
          </div>
        </div>
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          Next.js 15 &middot; React 19 &middot; Tailwind CSS v4
        </p>
      </div>
    </footer>
  );
}
