"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Sparkles, Zap } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import type { Post } from "@/lib/posts";

interface HomePageProps {
  posts: Post[];
}

export function HomePage({ posts }: HomePageProps) {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const postsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const postsInView = useInView(postsRef, { once: true, amount: 0.1 });
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section - Asymmetric Layout with Parallax */}
      <section className="relative border-b border-border">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          ref={heroRef}
          className="relative mx-auto max-w-7xl px-6 py-20 md:py-32"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left column - Text */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                <span>Deep Technical AI Content</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl"
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={heroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="block"
                >
                  AI Engineering
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={heroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="gradient-text"
                >
                  Beyond the Hype
                </motion.span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
              >
                In-depth technical articles about transformers, RAG pipelines, fine-tuning, and the real engineering 
                challenges behind modern AI systems. Code included.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col gap-4 sm:flex-row sm:gap-4"
              >
                <Link href="/blog">
                  <motion.div
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(var(--color-primary), 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Explore Articles</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </motion.div>
                </Link>
                
                <Link href="/about">
                  <motion.div
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-8 text-sm font-semibold text-foreground"
                    whileHover={{ scale: 1.05, borderColor: "var(--color-primary)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>About</span>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-wrap gap-8 pt-8 border-t border-border"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-3xl font-bold text-foreground"
                    initial={{ scale: 0 }}
                    animate={heroInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1, type: "spring" }}
                  >
                    {posts.length}+
                  </motion.div>
                  <div className="text-sm text-muted-foreground">Technical Posts</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-3xl font-bold text-foreground"
                    initial={{ scale: 0 }}
                    animate={heroInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                  >
                    15K+
                  </motion.div>
                  <div className="text-sm text-muted-foreground">Words Written</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-3xl font-bold text-foreground"
                    initial={{ scale: 0 }}
                    animate={heroInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.4, type: "spring" }}
                  >
                    100%
                  </motion.div>
                  <div className="text-sm text-muted-foreground">Code Examples</div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right column - Enhanced Visual */}
            <EnhancedHeroVisual />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Why Read This Blog?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              No fluff. No surface-level tutorials. Just deep technical content with working code.
            </p>
          </motion.div>

          <div ref={featuresRef} className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Code2,
                title: "Code-First Approach",
                description: "Every article includes working implementations in Python and PyTorch. Learn by reading real code, not pseudocode.",
                color: "primary",
                delay: 0,
              },
              {
                icon: BookOpen,
                title: "Deep Technical Dives",
                description: "We don't shy away from complexity. Expect mathematical intuition, architectural analysis, and production insights.",
                color: "accent",
                delay: 0.2,
              },
              {
                icon: Sparkles,
                title: "Production Focus",
                description: "Real lessons from building AI systems at scale. Covering gotchas, trade-offs, and practical considerations.",
                color: "primary",
                delay: 0.4,
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ 
                  y: -12, 
                  transition: { duration: 0.3 } 
                }}
              >
                <motion.div
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-background p-8 shadow-lg"
                  whileHover="hover"
                >
                  {/* Animated background blob */}
                  <motion.div
                    className={`absolute top-0 right-0 h-32 w-32 bg-${feature.color}/5 rounded-full blur-2xl`}
                    variants={{
                      hover: { scale: 1.5, backgroundColor: `var(--color-${feature.color})/15` }
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <div className="relative">
                    <motion.div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-${feature.color}/10 text-${feature.color} ring-1 ring-${feature.color}/20`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <feature.icon className="h-7 w-7" />
                    </motion.div>
                    <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0"
                    variants={{
                      hover: { opacity: 1 }
                    }}
                    style={{
                      background: `linear-gradient(135deg, var(--color-${feature.color})/20, var(--color-accent)/20)`,
                      padding: "2px",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={postsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12 flex items-end justify-between"
          >
            <div>
              <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Latest Posts
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Deep technical explorations of AI and machine learning
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>View all</span>
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Link>
          </motion.div>

          <div ref={postsRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 50 }}
                animate={postsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 * i,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={postsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center sm:hidden"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              <span>View all posts</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 Terminal Thoughts. Built with Next.js + Tailwind CSS + Framer Motion.
            </p>
            <div className="flex gap-6">
              <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Enhanced Hero Visual Component with 3D effects
function EnhancedHeroVisual() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true });

  return (
    <motion.div
      ref={containerRef}
      className="relative lg:h-[600px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="absolute inset-0 grid grid-cols-2 gap-4">
        {/* Card 1 */}
        <motion.div
          className="space-y-4"
          initial={{ x: -50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <FeatureCard
            icon={Code2}
            title="Transformers"
            progress={[80, 60]}
            color="primary"
            delay={0.6}
          />
          <FeatureCard
            icon={Zap}
            title="RAG Systems"
            progress={[100, 67]}
            color="accent"
            delay={0.8}
          />
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="space-y-4 pt-12"
          initial={{ x: 50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <FeatureCard
            icon={Sparkles}
            title="Fine-tuning"
            progress={[75, 50]}
            color="primary"
            delay={1}
          />
          <FeatureCard
            icon={BookOpen}
            title="Embeddings"
            progress={[80, 60]}
            color="accent"
            delay={1.2}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: any;
  title: string;
  progress: number[];
  color: "primary" | "accent";
  delay: number;
}

function FeatureCard({ icon: Icon, title, progress, color, delay }: FeatureCardProps) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      className="glass-effect rounded-2xl p-6 shadow-xl group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${color}/10`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className={`h-5 w-5 text-${color}`} />
        </motion.div>
        <div className="font-semibold text-foreground">{title}</div>
      </div>
      <div className="space-y-2">
        {progress.map((value, i) => (
          <div key={i} className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className={`h-2 rounded-full bg-${i === 0 ? color : color === "primary" ? "accent" : "primary"}`}
              initial={{ width: 0 }}
              animate={inView ? { width: `${value}%` } : {}}
              transition={{ duration: 1, delay: delay + 0.2 + i * 0.1, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
