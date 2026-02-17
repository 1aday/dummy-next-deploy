"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <motion.article 
        className={cn(
          "relative h-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg",
          "transition-all duration-500",
          className
        )}
        whileHover={{ y: -12, transition: { duration: 0.3 } }}
      >
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        >
          <motion.div
            className="absolute top-0 right-0 h-40 w-40 bg-primary/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-40 w-40 bg-accent/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative flex h-full flex-col p-8">
          {/* Metadata */}
          <div className="mb-5 flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.date}>
                {format(new Date(post.date), "MMM d, yyyy")}
              </time>
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Title */}
          <motion.h2 
            className="mb-4 font-display text-2xl font-semibold leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300"
          >
            {post.title}
          </motion.h2>

          {/* Excerpt */}
          <p className="mb-6 flex-1 text-base leading-relaxed text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/50">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <motion.span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground ring-1 ring-border/50"
                    whileHover={{ scale: 1.05, backgroundColor: "var(--color-primary)", color: "var(--color-primary-foreground)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {tag}
                  </motion.span>
                ))}
                {post.tags.length > 2 && (
                  <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground ring-1 ring-border/50">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>
            )}
            
            {/* Read more arrow */}
            <motion.div 
              className="flex items-center gap-2 text-sm font-semibold text-primary"
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="hidden sm:inline">Read</span>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Hover border glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(135deg, var(--color-primary)/20, var(--color-accent)/20)",
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </motion.article>
    </Link>
  );
}
