export default function Home() {
  const posts = [
    {
      id: 1,
      title: "Building AGI in Your Basement: A Practical Guide",
      date: "2026-02-15",
      excerpt: "What they don't tell you about training language models on consumer hardware.",
      readTime: "8 min read",
    },
    {
      id: 2,
      title: "Why Your RAG Pipeline is Probably Wrong",
      date: "2026-02-10",
      excerpt: "Common mistakes in retrieval-augmented generation and how to fix them.",
      readTime: "12 min read",
    },
    {
      id: 3,
      title: "Fine-tuning vs Prompting: The Real Trade-offs",
      date: "2026-02-05",
      excerpt: "An honest look at when each approach actually makes sense.",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-black font-mono text-green-400">
      {/* CRT Effect Overlay */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.02)_50%)] bg-[length:100%_4px] opacity-30" />
      
      {/* Grain Texture */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.015] mix-blend-overlay">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-16">
        {/* Terminal Header */}
        <header className="mb-16 border border-green-500/30 bg-black/50 p-6 shadow-[0_0_20px_rgba(0,255,0,0.1)] backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2 text-green-500/60">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-500">→</span>
              <span className="text-green-400">whoami</span>
            </div>
            <h1 className="text-2xl font-bold text-green-300">./technical_posts</h1>
            <p className="text-sm text-green-500/70">
              Writing about AI, machine learning, and the future of computation
            </p>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="mb-12 flex gap-6 border-l-2 border-green-500/30 pl-4 text-sm">
          <div>
            <span className="text-green-500/60">Posts:</span>{" "}
            <span className="text-green-400">{posts.length}</span>
          </div>
          <div>
            <span className="text-green-500/60">Status:</span>{" "}
            <span className="animate-pulse text-green-400">● Online</span>
          </div>
          <div>
            <span className="text-green-500/60">Last Update:</span>{" "}
            <span className="text-green-400">2026-02-15</span>
          </div>
        </div>

        {/* Blog Posts */}
        <main className="space-y-8">
          <div className="mb-6 flex items-center gap-2 text-green-500/60">
            <span className="text-green-500">→</span>
            <span>cat recent_posts.txt</span>
          </div>

          {posts.map((post, index) => (
            <article
              key={post.id}
              className="group cursor-pointer border border-green-500/20 bg-black/30 p-6 transition-all hover:border-green-500/50 hover:bg-black/50 hover:shadow-[0_0_30px_rgba(0,255,0,0.1)]"
            >
              <div className="mb-3 flex items-center gap-3 text-xs text-green-500/60">
                <span className="font-bold text-green-500">
                  [{String(index + 1).padStart(2, "0")}]
                </span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              
              <h2 className="mb-3 text-xl font-bold text-green-300 transition-colors group-hover:text-green-200">
                {post.title}
              </h2>
              
              <p className="mb-4 leading-relaxed text-green-400/80">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-green-500/60 transition-colors group-hover:text-green-500">
                <span>→</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  Read more
                </span>
              </div>
            </article>
          ))}
        </main>

        {/* Footer Terminal Prompt */}
        <footer className="mt-16 border-t border-green-500/20 pt-8">
          <div className="flex items-center gap-2 text-sm text-green-500/60">
            <span className="text-green-500">→</span>
            <span>Connect:</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-green-400"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-green-400"
            >
              Twitter
            </a>
            <span>·</span>
            <a
              href="mailto:hello@example.com"
              className="transition-colors hover:text-green-400"
            >
              Email
            </a>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-green-500/40">
            <span className="animate-pulse">▊</span>
            <span>System ready. Press any key to continue...</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
