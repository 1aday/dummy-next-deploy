"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import type { GlossaryTerm, GlossaryCategory } from "@/lib/glossary";

interface GlossarySearchProps {
  terms: GlossaryTerm[];
  categoryLabels: Record<GlossaryCategory, string>;
  categoryColors: Record<GlossaryCategory, string>;
  categories: GlossaryCategory[];
}

export function GlossarySearch({
  terms,
  categoryLabels,
  categoryColors,
  categories,
}: GlossarySearchProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | null>(
    null
  );

  const filtered = useMemo(() => {
    let result = terms;

    if (activeCategory) {
      result = result.filter((t) => t.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q)
      );
    }

    return result;
  }, [terms, query, activeCategory]);

  const grouped = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const term of filtered) {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    }
    return groups;
  }, [filtered]);

  const letters = Object.keys(grouped).sort();

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      counts[cat] = terms.filter((t) => t.category === cat).length;
    }
    return counts;
  }, [terms, categories]);

  return (
    <>
      {/* Search Input */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms..."
          className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
        {query && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="mb-12 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeCategory === null
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
          }`}
        >
          All
          <span className="opacity-60">{terms.length}</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setActiveCategory(activeCategory === cat ? null : cat)
            }
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeCategory === cat
                ? categoryColors[cat]
                : "border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
            }`}
          >
            {categoryLabels[cat]}
            <span className="opacity-60">{categoryCounts[cat]}</span>
          </button>
        ))}
      </div>

      {/* Alphabetical Index */}
      {letters.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-sm font-semibold text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>
      )}

      {/* Terms by Letter */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            No terms found
          </p>
          <p className="mt-2 text-sm text-muted-foreground/60">
            Try a different search or clear filters
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {letters.map((letter) => (
            <section key={letter} id={`letter-${letter}`}>
              <h2 className="mb-4 font-display text-3xl font-bold text-foreground/20">
                {letter}
              </h2>
              <div className="space-y-3">
                {grouped[letter].map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="group block rounded-2xl border border-border bg-card p-5 hover-lift transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                            {term.term}
                          </h3>
                          <span
                            className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryColors[term.category]}`}
                          >
                            {categoryLabels[term.category]}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {term.definition}
                        </p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
