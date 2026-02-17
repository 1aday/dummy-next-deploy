"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

interface NewsletterFormProps {
  variant?: "default" | "inline" | "mid-article";
}

export function NewsletterForm({ variant = "default" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className={variant === "default" ? "mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center" : variant === "mid-article" ? "my-10 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center" : ""}>
        <div className="flex items-center justify-center gap-2 text-primary">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">You&apos;re on the list! Check your inbox to confirm.</span>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Get updates
        </button>
      </form>
    );
  }

  if (variant === "mid-article") {
    return (
      <div className="my-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-base font-bold text-foreground">
              Enjoying this article?
            </p>
            <p className="text-sm text-muted-foreground">
              Get deep technical guides like this delivered weekly.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
      <h3 className="mb-2 font-display text-xl font-bold text-foreground">
        Get AI growth insights weekly
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Join engineers and product leaders building with AI. No spam, unsubscribe anytime.
      </p>
      <form
        className="mx-auto flex max-w-md gap-3"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
