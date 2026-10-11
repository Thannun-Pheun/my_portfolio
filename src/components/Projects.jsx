import { useState } from 'react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import ProjectCard from './ProjectCard'
import { featuredProjects } from '../data/content.js'
import { profile } from '../config/site.js'
import { ExternalLink } from 'lucide-react'

/**
 * Projects — curated from my real GitHub repositories.
 * A technology filter is included; with only a few public repositories
 * so far, new categories will become useful as more projects land.
 */
export default function Projects({ repos = [] }) {
  const [filter, setFilter] = useState('All')
  const repoByName = Object.fromEntries(repos.map((r) => [r.name, r]))

  const matchesFilter = (p) => {
    if (filter === 'All') return true
    const hay = [...p.technologies, p.kind, p.title].join(' ').toLowerCase()
    if (filter === 'Back-end') return /back|api|node|php|laravel|server/.test(hay)
    if (filter === 'Web Development') return /web|html|css|js|react|api|front/.test(hay)
    if (filter === 'Frontend') return /front|react|html|css/.test(hay)
    if (filter === 'Open Source') return p.kind === 'open-source'
    return true
  }

  const visible = featuredProjects.filter(matchesFilter)
  const filters = ['All', 'Web Development', 'Frontend', 'Back-end', 'Open Source']

  return (
    <section id="projects" className="relative">
      <div className="section-anchor">
        <SectionHeader
          kicker="03 · Projects"
          title="Featured Projects"
          blurb="Real projects from my GitHub — described exactly as they are. Descriptions come from each repository's README and code structure, nothing is invented."
        />

        <Reveal>
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full border px-4 py-1.5 font-display text-xs font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
                  filter === f
                    ? 'border-accent bg-accent text-white'
                    : 'border-white/10 text-slate-400 hover:border-accent/40 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {visible.length > 0 ? (
          <div className="grid h-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <ProjectCard key={p.repoName} project={p} repo={repoByName[p.repoName]} index={i} />
            ))}

            {/* Empty/future state kept honest */}
            <div className="group flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center transition-colors hover:border-accent/30 hover:bg-accent/[0.03]">
              <span className="font-display text-lg font-bold text-slate-300">More on the way</span>
              <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-slate-500">
                My 2026 goal is 10+ real projects. This space is reserved for the next one I
                complete.
              </p>
              <a
                href={`${profile.githubUrl}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-4 !px-3.5 !py-2 text-xs"
              >
                Follow my progress <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-400">
            No projects match this filter yet — try another category.
          </div>
        )}

        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-xs text-slate-500">
            Only public repositories are shown. Private coursework from university is intentionally
            not listed.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
