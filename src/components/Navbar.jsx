import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Menu, X, Download, FileText } from 'lucide-react'
import { profile, navLinks, cv } from '../config/site.js'

/**
 * Fixed responsive navigation bar.
 * The "Download CV" button only appears when a real CV file is
 * referenced in src/config/site.js (cv.cvFile).
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-night-950/80 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        {/* Logo / name */}
        <button
          onClick={() => go('home')}
          className="group font-display text-lg font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          aria-label="Back to top"
        >
          <span className="text-accent">{'<'}</span>
          {profile.shortName}
          <span className="text-accent-blue">{'/>'}</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {cv.cvFile && (
            <a href={cv.cvFile} download className="btn-primary hidden !px-4 !py-2 sm:inline-flex">
              <FileText size={16} /> Download CV
            </a>
          )}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="hidden rounded-lg border border-white/10 p-2 text-slate-300 transition-colors hover:border-accent/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent md:inline-flex"
          >
            <Github size={18} />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="rounded-lg border border-white/10 p-2 text-slate-200 transition-colors hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/[0.06] bg-night-900 md:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  <Github size={16} /> Open GitHub
                </a>
              </li>
              {cv.cvFile && (
                <li>
                  <a
                    href={cv.cvFile}
                    download
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    <Download size={16} /> Download CV
                  </a>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
