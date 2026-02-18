import Link from "next/link";
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react";
import { getAllConceptIndustryPages } from "@/lib/concept-industry";
import { siteConfig } from "@/lib/config";

const BASE_URL = siteConfig.url;

export const metadata = {
  title: "Learn AI Concepts by Industry | AI Growth Stack",
  description:
    "Industry-specific guides to AI concepts. Learn how RAG, embeddings, LLMs, A/B testing, and more apply to your specific industry — from SaaS to HealthTech to Legal Tech.",
  alternates: { canonical: "/learn" },
  openGraph: {
    title: "Learn AI Concepts by Industry | AI Growth Stack",
    description: "Industry-specific guides to AI concepts for growth teams.",
    type: "website",
    siteName: "AI Growth Stack",
  },
};

export default function LearnIndex() {
  const pages = getAllConceptIndustryPages();

  const byIndustry = pages.reduce((acc, page) => {
    if (!acc[page.industryName]) acc[page.industryName] = [];
    acc[page.industryName].push(page);
    return acc;
  }, {} as Record<string, typeof pages>);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Learn", item: `${BASE_URL}/learn` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/" className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Home</span>
        </Link>

        <header className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Learn</span>
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            AI Concepts by Industry
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground/90">
            Learn how key AI and growth concepts apply specifically to your industry.
            Each guide covers why the concept matters, practical applications, recommended tools, and expected results.
          </p>
        </header>

        {Object.entries(byIndustry).map(([industryName, industryPages]) => (
          <section key={industryName} className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold text-foreground">{industryName}</h2>
            <div className="space-y-2">
              {industryPages.map((page) => (
                <Link
                  key={`${page.conceptSlug}-${page.industrySlug}`}
                  href={`/learn/${page.conceptSlug}/for/${page.industrySlug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-3 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {page.conceptTerm} for {page.industryName}
                    </h3>
                  </div>
                  <ArrowRight className="ml-4 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
