export const siteConfig = {
  name: "AI Growth Stack",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://growthstack.dev",
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "",
    email: process.env.NEXT_PUBLIC_EMAIL || "",
  },
};
