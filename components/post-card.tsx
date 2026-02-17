import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className={cn(
        "relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-300",
        "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 hover:border-primary/50",
        className
      )}>
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-2xl transition-all group-hover:bg-primary/10" />
        
        <div className="relative flex h-full flex-col">
          {/* Metadata */}
          <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.date} className="font-medium">
                {format(new Date(post.date), "MMM d, yyyy")}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-medium">{post.readingTime}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-3 font-display text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags & Read more */}
          <div className="flex items-center justify-between gap-4">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              <span>Read</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
