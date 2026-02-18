"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Writing" },
  { href: "/glossary", label: "Glossary" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
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
            {navLinks.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative text-sm font-medium transition-colors group ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 bg-primary transition-all ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
