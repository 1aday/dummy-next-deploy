import fs from "fs";
import path from "path";
import matter from "gray-matter";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: npx tsx scripts/generate-twitter-threads.ts <slug>");
  process.exit(1);
}

const filePath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
if (!fs.existsSync(filePath)) {
  console.error(`Post not found: ${slug}`);
  process.exit(1);
}

const fileContents = fs.readFileSync(filePath, "utf8");
const { data, content } = matter(fileContents);

// Extract H2 headings and their first paragraph
const firstParagraph = content
  .split("\n\n")
  .find((p) => p.trim() && !p.startsWith("#") && !p.startsWith("---"));

const hook =
  data.excerpt ||
  (firstParagraph ? firstParagraph.trim().slice(0, 270) : data.title);

console.log(`\u{1F9F5} THREAD: ${data.title}\n`);
console.log(`1/ ${hook}\n`);

let tweetNum = 2;
// Skip the first section (content before first H2)
const h2Sections = content.match(/^## .+$/gm) || [];
const sectionContents = content.split(/^## /m).slice(1);

for (let i = 0; i < Math.min(h2Sections.length, 7); i++) {
  const heading = h2Sections[i].replace("## ", "").trim();
  const sectionText = sectionContents[i];
  // Remove the heading line (first line) and get body paragraphs
  const sectionBody = sectionText.replace(/^.+\n/, "");
  // Get first meaningful paragraph of the section
  const paragraphs = sectionBody
    .split("\n\n")
    .filter(
      (p) =>
        p.trim() &&
        !p.startsWith("#") &&
        !p.startsWith("-") &&
        !p.startsWith("```") &&
        !p.startsWith("|")
    );
  const summary = paragraphs[0]
    ? paragraphs[0].trim().replace(/\*\*/g, "").slice(0, 250)
    : heading;

  console.log(`${tweetNum}/ ${heading}\n\n${summary}\n`);
  tweetNum++;
}

console.log(
  `${tweetNum}/ Want the full breakdown with code examples?\n`
);
console.log(
  `Read the complete guide: https://growthstack.dev/blog/${slug}\n`
);
console.log(`\u267B\uFE0F RT if this was helpful!`);
