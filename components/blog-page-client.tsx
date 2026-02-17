"use client";

import { PostCard } from "@/components/post-card";
import { Navigation } from "@/components/navigation";
import { Search, Tag, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Post } from "@/lib/posts";

interface BlogPageClientProps {
  posts: Post[];
  tags: string[];
}

export function BlogPageClient({ posts, tags }: BlogPageClientProps) {
  const headerRef = useRef(null);
  const postsRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true });
  const postsInView = useInView(postsRef, { once: true, amount: 0.1 });

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative border-b border-border bg-gradient-to-b from-muted/30 to-background overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-24">
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 pl-2 pr-5 py-2 backdrop-blur-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-primary tracking-wide">
                  {posts.length} Technical Articles
                </span>
              </div>

              <h1 className="mb-6 font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
                <span className="block text-foreground">All Posts</span>
                <span className="gradient-text">Deep Technical Dives</span>
              </h1>
              
              <p className="max-w-2xl text-xl md:text-2xl leading-relaxed text-muted-foreground">
                In-depth articles about AI, machine learning, and software engineering.
                Real code, real insights, real engineering.
              </p>
            </motion.div>

            {/* Tags */}
            {tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 flex flex-wrap items-center gap-3"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span>Filter by topic:</span>
                </div>
                {tags.map((tag, i) => (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-flex items-center rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:border-primary/50 hover:text-primary transition-all overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative">{tag}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <div ref={postsRef} className="mx-auto max-w-7xl px-6 py-20">
          {posts.length > 0 ? (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 50 }}
                  animate={postsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 + i * 0.1,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center rounded-3xl border-2 border-dashed border-border bg-muted/30 p-16"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-foreground">No posts found</h3>
                <p className="text-lg text-muted-foreground">
                  Check back later for new technical content.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 Terminal Thoughts. Built with Next.js + Tailwind CSS + Framer Motion.
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
