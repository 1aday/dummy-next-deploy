import fs from "fs";
import path from "path";
import matter from "gray-matter";

const slug = process.argv[2];
if (!slug) {
  console.error(
    "Usage: npx tsx scripts/generate-linkedin-carousel.ts <slug>"
  );
  process.exit(1);
}

const filePath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
if (!fs.existsSync(filePath)) {
  console.error(`Post not found: ${slug}`);
  process.exit(1);
}

const fileContents = fs.readFileSync(filePath, "utf8");
const { data, content } = matter(fileContents);

console.log(`\u{1F4CA} LINKEDIN CAROUSEL: ${data.title}`);
console.log("================================\n");

console.log("SLIDE 1 (Cover):");
console.log(data.title);
console.log("by AI Growth Stack\n");

// Extract H2 sections
const h2Sections = content.match(/^## .+$/gm) || [];
const sectionContents = content.split(/^## /m).slice(1);

let slideNum = 2;
for (let i = 0; i < Math.min(h2Sections.length, 8); i++) {
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
  const takeaway = paragraphs[0]
    ? paragraphs[0]
        .trim()
        .replace(/\*\*/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .slice(0, 300)
    : heading;

  console.log(`SLIDE ${slideNum}:`);
  console.log(`${heading}\n`);
  console.log(`${takeaway}\n`);
  slideNum++;
}

console.log("FINAL SLIDE (CTA):");
console.log("Read the full guide");
console.log(`\u{1F517} aigrowthstack.com/blog/${slug}`);
console.log("Follow for more AI growth insights");
