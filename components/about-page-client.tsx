"use client";

import Link from "next/link";
import { Github, Twitter, Mail, Rss, Code2, TrendingUp, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AboutPageClient() {
  const heroRef = useRef(null);
  const whatRef = useRef(null);
  const whoRef = useRef(null);
  const philosophyRef = useRef(null);
  const contactRef = useRef(null);
  const ctaRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const whatInView = useInView(whatRef, { once: true, amount: 0.3 });
  const whoInView = useInView(whoRef, { once: true, amount: 0.5 });
  const philosophyInView = useInView(philosophyRef, { once: true, amount: 0.5 });
  const contactInView = useInView(contactRef, { once: true, amount: 0.5 });
  const ctaInView = useInView(ctaRef, { once: true });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-gradient-to-b from-muted/30 to-background overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div ref={heroRef} className="relative mx-auto max-w-4xl px-6 py-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block"
            >
              About{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="gradient-text"
            >
              Terminal Thoughts
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl leading-relaxed text-muted-foreground"
          >
            Technical writing about AI and machine learning, focused on the practical side.
            No hype, no buzzwords—just code, architectures, and lessons learned.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-20">
          {/* What You'll Find */}
          <section ref={whatRef}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={whatInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl lg:text-4xl"
            >
              What You'll Find Here
            </motion.h2>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Code2,
                  title: "Deep Technical Dives",
                  description: "Transformer architectures, training techniques, and model optimization with mathematical intuition.",
                  color: "primary",
                  delay: 0,
                },
                {
                  icon: TrendingUp,
                  title: "Production Engineering",
                  description: "Lessons from deploying LLMs, RAG systems, and ML infrastructure at scale.",
                  color: "accent",
                  delay: 0.2,
                },
                {
                  icon: Zap,
                  title: "Code-First Explanations",
                  description: "Runnable examples in Python, PyTorch, and modern frameworks. Learn by reading real code.",
                  color: "primary",
                  delay: 0.4,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={whatInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.6, delay: item.delay }}
                  whileHover={{ 
                    y: -10, 
                    rotateY: 5,
                    transition: { duration: 0.3 } 
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="h-full rounded-xl border border-border bg-card p-6 shadow-md group"
                    whileHover="hover"
                  >
                    <motion.div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-${item.color}/10 text-${item.color} ring-1 ring-${item.color}/20`}
                      variants={{
                        hover: { rotate: 360, scale: 1.1 }
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="h-6 w-6" />
                    </motion.div>
                    <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Who Writes This */}
          <section ref={whoRef}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={whoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl lg:text-4xl"
            >
              Who Writes This
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={whoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 leading-relaxed text-foreground/90"
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={whoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                I'm an ML engineer who's spent years building AI systems in production. I believe in
                sharing what actually works, not just what sounds impressive in papers.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={whoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                This blog started as a way to document my own learning and share hard-won lessons with
                the community. If you're building AI systems and running into the messy reality behind
                the clean abstractions, this is for you.
              </motion.p>
            </motion.div>
          </section>

          {/* Philosophy */}
          <section ref={philosophyRef}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl lg:text-4xl"
            >
              Philosophy
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={philosophyInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg overflow-hidden"
            >
              {/* Animated gradient blob */}
              <motion.div
                className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <blockquote className="relative space-y-4 text-foreground/90">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg font-medium leading-relaxed md:text-xl"
                >
                  "The best way to understand something is to build it. The second best way is to read
                  about someone else building it and hitting all the problems you would have hit."
                </motion.p>
                <motion.footer
                  initial={{ opacity: 0 }}
                  animate={philosophyInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-sm text-muted-foreground"
                >
                  — This blog's unofficial motto
                </motion.footer>
              </blockquote>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6 leading-relaxed text-foreground/90"
            >
              I prioritize clarity over cleverness, and practical utility over theoretical elegance.
              Every post aims to leave you with something you can actually use.
            </motion.p>
          </section>

          {/* Get in Touch */}
          <section ref={contactRef}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl lg:text-4xl"
            >
              Get in Touch
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 leading-relaxed text-foreground/90"
            >
              Have questions, feedback, or just want to chat about AI engineering?
            </motion.p>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com" },
                { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
                { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
                { icon: Rss, label: "RSS", href: "/rss.xml" },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={contactInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted hover:border-primary/50"
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <motion.section
            ref={ctaRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg overflow-hidden"
          >
            {/* Animated gradient blobs */}
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.4, 1],
                x: [0, 30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -30, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-3 font-display text-xl font-semibold text-foreground"
              >
                Want to stay updated?
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-6 text-sm leading-relaxed text-muted-foreground"
              >
                New posts typically drop weekly. Follow me on Twitter or subscribe to the RSS feed to
                never miss an article.
              </motion.p>
              <Link href="/blog">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
                >
                  <span>Browse All Posts</span>
                  <span>→</span>
                </motion.div>
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
