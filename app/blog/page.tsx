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
        <div className="mx-auto max-w-7xl px-6 py-16">
          <header className="mb-16">
            <div className="mb-6 animate-fade-in-up">
              <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                All Posts
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                {posts.length} in-depth articles about AI, machine learning, and software engineering
              </p>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 animate-fade-in-up delay-100">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Topics:</span>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:bg-muted hover:border-primary/50 hover:text-primary hover:scale-105"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </header>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <div 
                  key={post.slug} 
                  className="animate-fade-in-up" 
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center rounded-2xl border border-dashed border-border bg-muted/30 p-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">No posts found</h3>
                <p className="text-sm text-muted-foreground">
                  Check back later for new technical content.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 Terminal Thoughts. Built with Next.js + Tailwind CSS.
            </p>
            <div className="flex gap-6">
              <a href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Home
              </a>
              <a href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                About
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
