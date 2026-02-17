"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, ArrowLeft, Tag, User } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ReadingProgress } from "@/components/reading-progress";
import type { Post } from "@/lib/posts";

interface BlogPostPageClientProps {
  post: Post;
}

export function BlogPostPageClient({ post }: BlogPostPageClientProps) {
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const footerRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true });
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 });
  const footerInView = useInView(footerRef, { once: true });

  return (
    <>
      <ReadingProgress />
      
      <article className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="border-b border-border bg-gradient-to-b from-muted/30 to-background overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-10 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div ref={headerRef} className="relative mx-auto max-w-4xl px-6 py-12">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/blog"
                className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <motion.div
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </motion.div>
                <span>Back to blog</span>
              </Link>
            </motion.div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6 flex flex-wrap items-center gap-2"
              >
                {post.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary ring-1 ring-primary/20"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6 font-display text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              {post.title}
            </motion.h1>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date} className="font-medium">
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                <span className="font-medium">{post.readingTime}</span>
              </motion.div>
              {post.author && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">{post.author}</span>
                </motion.div>
              )}
            </motion.div>

            {/* Excerpt */}
            {post.excerpt && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl"
              >
                {post.excerpt}
              </motion.p>
            )}
          </div>
        </div>

        {/* Content */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-3xl px-6 py-16"
        >
          <div className="prose">
            <MDXRemote source={post.content} />
          </div>

          {/* Footer Navigation */}
          <motion.footer
            ref={footerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={footerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mt-20 border-t border-border pt-12"
          >
            <div className="flex items-center justify-between gap-4">
              <Link href="/blog">
                <motion.div
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:border-primary/50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>All Posts</span>
                </motion.div>
              </Link>

              {post.tags && post.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={footerInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Tag className="h-4 w-4" />
                  <span>Filed under:</span>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="font-medium text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.footer>
        </motion.div>
      </article>
    </>
  );
}
