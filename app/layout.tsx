import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI Growth Stack | Product Growth in the Age of AI",
    template: "%s | AI Growth Stack",
  },
  description: "Master AI-powered product growth, retention, and monetization. Deep guides on building growth loops with LLMs, embeddings, personalization, and predictive models. Code-first tutorials from growth engineers shipping AI at scale.",
  keywords: [
    "AI product growth",
    "AI-powered growth",
    "product growth AI",
    "growth engineering",
    "AI retention",
    "AI personalization",
    "growth loops",
    "AI monetization",
    "predictive churn",
    "growth stack",
    "LLM growth",
    "AI marketing",
    "growth hacking AI",
    "machine learning growth",
    "AI SEO",
    "embeddings",
    "RAG systems",
    "AI content generation",
  ],
  authors: [{ name: "AI Growth Stack" }],
  openGraph: {
    title: "AI Growth Stack | Product Growth in the Age of AI",
    description: "Master AI-powered product growth, retention, and monetization. Deep guides on growth loops with LLMs, embeddings, and predictive models.",
    type: "website",
    siteName: "AI Growth Stack",
    locale: "en_US",
    images: [{ url: "/og?title=AI%20Growth%20Stack&tags=Product%20Growth,AI,LLMs,Personalization", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Growth Stack | Product Growth in the Age of AI",
    description: "Master AI-powered product growth, retention, and monetization with real code examples",
  },
  metadataBase: new URL("https://dummy-next-deploy.vercel.app"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
