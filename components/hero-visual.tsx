"use client";

import { Code2, TrendingUp, Zap, Target } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative lg:h-[600px] animate-fade-in delay-500">
      <div className="absolute inset-0 grid grid-cols-2 gap-4 rotate-3">
        {/* Card 1 */}
        <div className="space-y-4">
          <div className="glass-effect rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <div className="font-semibold text-foreground">Transformers</div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-4/5 rounded-full bg-primary" />
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-3/5 rounded-full bg-accent" />
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300 delay-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div className="font-semibold text-foreground">RAG Systems</div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-full rounded-full bg-accent" />
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-2/3 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="space-y-4 pt-12">
          <div className="glass-effect rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300 delay-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div className="font-semibold text-foreground">Fine-tuning</div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-3/4 rounded-full bg-primary" />
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-1/2 rounded-full bg-accent" />
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300 delay-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <div className="font-semibold text-foreground">Embeddings</div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-4/5 rounded-full bg-accent" />
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-3/5 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
