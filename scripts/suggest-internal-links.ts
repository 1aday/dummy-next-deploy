import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

interface PostInfo {
  slug: string;
  title: string;
  tags: string[];
  internalLinks: string[];
  content: string;
}

const posts: PostInfo[] = files.map((file) => {
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
  const { data, content: body } = matter(raw);
  const linkMatches = body.match(/\/blog\/([a-z0-9-]+)/g) || [];
  const internalLinks = linkMatches.map((l) => l.replace("/blog/", ""));

  return {
    slug: file.replace(".mdx", ""),
    title: data.title || file,
    tags: data.tags || [],
    internalLinks,
    content: body,
  };
});

// Find missing links
console.log("\u{1F4CA} INTERNAL LINKING REPORT");
console.log("==========================\n");

const totalLinks = posts.reduce((sum, p) => sum + p.internalLinks.length, 0);
console.log(`Posts analyzed: ${posts.length}`);
console.log(`Total internal links found: ${totalLinks}`);
console.log(
  `Average links per post: ${(totalLinks / posts.length).toFixed(1)}\n`
);

console.log(
  "\u{1F517} MISSING LINKS (high tag overlap, no existing link):\n"
);

for (const post of posts) {
  const suggestions: { slug: string; title: string; sharedTags: number }[] = [];

  for (const other of posts) {
    if (other.slug === post.slug) continue;
    if (post.internalLinks.includes(other.slug)) continue;

    const sharedTags = post.tags.filter((t) => other.tags.includes(t)).length;
    if (sharedTags >= 2) {
      suggestions.push({
        slug: other.slug,
        title: other.title,
        sharedTags,
      });
    }
  }

  if (suggestions.length > 0) {
    suggestions.sort((a, b) => b.sharedTags - a.sharedTags);
    console.log(`"${post.title}" (${post.slug})`);
    for (const s of suggestions.slice(0, 3)) {
      console.log(
        `  \u2192 Should link to: "${s.title}" (${s.slug}) [${s.sharedTags} shared tags]`
      );
    }
    console.log();
  }
}

console.log("\n\u{1F4C8} POSTS WITH FEWEST INTERNAL LINKS:\n");
const sorted = [...posts].sort(
  (a, b) => a.internalLinks.length - b.internalLinks.length
);
for (let i = 0; i < Math.min(5, sorted.length); i++) {
  console.log(
    `${i + 1}. "${sorted[i].title}" (${sorted[i].slug}) \u2014 ${sorted[i].internalLinks.length} internal links`
  );
}
