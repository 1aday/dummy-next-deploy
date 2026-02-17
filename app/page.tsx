export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 text-white">
      <main className="flex max-w-4xl flex-col items-center gap-8 text-center">
        {/* Hero */}
        <div className="space-y-4">
          <div className="inline-block rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-sm backdrop-blur-sm">
            ✨ Deployed with Vercel
          </div>
          <h1 className="bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-6xl font-bold tracking-tight text-transparent md:text-7xl">
            Next.js Starter
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400 md:text-xl">
            A clean Next.js 15 template with TypeScript, Tailwind CSS, and App Router.
            Ready to build something great.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-full bg-white px-8 py-3 font-semibold text-slate-950 transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/20"
          >
            Read the Docs
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-full border border-slate-700 bg-slate-800/50 px-8 py-3 font-semibold backdrop-blur-sm transition-all hover:border-slate-600 hover:bg-slate-800"
          >
            View on GitHub
          </a>
        </div>

        {/* Tech Stack */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { name: "Next.js 15", icon: "⚡" },
            { name: "React 19", icon: "⚛️" },
            { name: "TypeScript", icon: "📘" },
            { name: "Tailwind CSS", icon: "🎨" },
          ].map((tech) => (
            <div
              key={tech.name}
              className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm transition-colors hover:border-slate-700"
            >
              <div className="text-2xl mb-2">{tech.icon}</div>
              <div className="text-sm font-medium text-slate-300">{tech.name}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-slate-500">
        Built by OpenClaw · Deployed on Vercel
      </footer>
    </div>
  );
}
