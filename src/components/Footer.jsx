import { Github, ArrowUp } from 'lucide-react'
import { profile, navLinks } from '../config/site.js'

export default function Footer() {
  const year = new Date().getFullYear() // dynamic current year

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/[0.06] bg-night-900/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_1fr_auto]">
        {/* Brand */}
        <div>
          <p className="font-display text-lg font-bold text-white">
            <span className="text-accent">{'<'}</span>
            {profile.name}
            <span className="text-accent-blue">{'/>'}</span>
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
            IT student and aspiring web developer, building practical and user-friendly web
            experiences — one project at a time.
          </p>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer navigation">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-slate-400">
            Explore
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="text-sm text-slate-500 transition-colors hover:text-accent-blue"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social + top */}
        <div className="flex flex-col items-start gap-4 md:items-end">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition-colors hover:border-accent/60 hover:text-white"
          >
            <Github size={18} />
          </a>
          <button
            onClick={toTop}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 font-display text-xs font-semibold text-slate-300 transition-colors hover:border-accent/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <ArrowUp size={13} /> Back to top
          </button>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-5 text-xs text-slate-600 sm:px-8">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>Built with React, Tailwind CSS &amp; live data from the GitHub API.</p>
        </div>
      </div>
    </footer>
  )
}
