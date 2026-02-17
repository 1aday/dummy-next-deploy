import { getAllPosts, getAllTags } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { Navigation } from "@/components/navigation";
import { Search, Tag } from "lucide-react";

export const metadata = {
  title: "Blog | Terminal Thoughts",
  description: "Technical articles about AI, machine learning, and software engineering",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <header className="mb-12">
            <h1 className="mb-4 font-serif text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              All Posts
            </h1>
            <p className="text-lg text-muted-foreground">
              {posts.length} articles about AI, machine learning, and software engineering
            </p>
          </header>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-12 flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="inline-block rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:border-primary/50"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
              <Search className="h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">No posts found</h3>
                <p className="text-sm text-muted-foreground">
                  Check back later for new content.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
