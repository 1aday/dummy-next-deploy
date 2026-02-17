import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author?: string;
  tags?: string[];
  readingTime: string;
  coverImage?: string;
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug: realSlug,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || "",
    content,
    author: data.author,
    tags: data.tags || [],
    readingTime: stats.text,
    coverImage: data.coverImage,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
  return posts;
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags?.includes(tag));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = posts.flatMap((post) => post.tags || []);
  return Array.from(new Set(tags));
}

export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export function getPostsByTagSlug(tagSlug: string): { tag: string; posts: Post[] } | null {
  const allTags = getAllTags();
  const tag = allTags.find((t) => tagToSlug(t) === tagSlug);
  if (!tag) return null;
  return { tag, posts: getPostsByTag(tag) };
}

export function getTagsWithCount(): { tag: string; slug: string; count: number }[] {
  const posts = getAllPosts();
  const tagCounts = new Map<string, number>();
  posts.forEach((post) => {
    (post.tags || []).forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, slug: tagToSlug(tag), count }))
    .sort((a, b) => b.count - a.count);
}
