import { getAllPosts, getAllTags } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { Navigation } from "@/components/navigation";
import { BlogPageClient } from "@/components/blog-page-client";

export const metadata = {
  title: "Blog | Terminal Thoughts",
  description: "Technical articles about AI, machine learning, and software engineering",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <BlogPageClient posts={posts} tags={tags} />;
}
