"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Mail, CheckCircle, Loader2 } from "lucide-react";
import {
  trackExitIntentShown,
  trackExitIntentDismissed,
  trackNewsletterSignup,
} from "@/lib/analytics";

const STORAGE_KEY = "exit-popup-dismissed";
const DELAY_MS = 30_000;

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    trackExitIntentDismissed();
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable
    }
  }, []);

  useEffect(() => {
    // Check if already dismissed
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    // Wait 30s before arming the exit-intent listener
    const timer = setTimeout(() => {
      setReady(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        setVisible(true);
        trackExitIntentShown();
      }
    }

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ready]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      trackNewsletterSignup("exit-intent");
      // Auto-dismiss after success
      setTimeout(() => dismiss(), 2500);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <p className="font-display text-lg font-bold text-foreground">
              You&apos;re on the list!
            </p>
            <p className="text-sm text-muted-foreground">
              Check your inbox to confirm your subscription.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mb-2 font-display text-xl font-bold text-foreground">
                Before you go...
              </h2>
              <p className="text-sm text-muted-foreground">
                Get weekly AI growth insights delivered to your inbox. Join engineers from Stripe, Vercel, and Anthropic.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                disabled={loading}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                autoFocus
              />
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Subscribe for free
              </button>
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}
            </form>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              No spam, unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
