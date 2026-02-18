declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}

// Newsletter
export function trackNewsletterSignup(
  location: "inline" | "mid-article" | "exit-intent" | "default"
) {
  trackEvent("newsletter_signup", { location });
}

// Content clicks
export function trackArticleClick(slug: string, title: string, index: number) {
  trackEvent("article_click", { slug, title, index });
}

export function trackGuideClick(slug: string, title: string) {
  trackEvent("guide_click", { slug, title });
}

export function trackTagClick(tag: string) {
  trackEvent("tag_click", { tag });
}

// External links
export function trackExternalClick(url: string) {
  trackEvent("external_click", { url });
}

// Exit intent
export function trackExitIntentShown() {
  trackEvent("exit_intent_shown");
}

export function trackExitIntentDismissed() {
  trackEvent("exit_intent_dismissed");
}

// Scroll depth
export function trackScrollDepth(percentage: number) {
  trackEvent("scroll_depth", { percentage });
}

// CTA
export function trackCTAClick(label: string, location: string) {
  trackEvent("cta_click", { label, location });
}
