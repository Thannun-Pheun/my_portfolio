import { motion } from 'framer-motion'
import { Github, ExternalLink, Lock, Star, GitFork, Clock3, FolderOpen } from 'lucide-react'
import { profile } from '../config/site.js'

/**
 * ProjectCard — driven by hand-curated facts (data/content.js) and
 * enriched with live repository stats when the GitHub API responds.
 * A screenshot is shown ONLY if one exists in the repository;
 * otherwise the card uses an honest placeholder header.
 */
export default function ProjectCard({ project, repo, index = 0 }) {
  const url = repo?.html_url || `${profile.githubUrl}/${project.repoName}`
  const updated = repo?.pushed_at
    ? new Date(repo.pushed_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-glow"
    >
      {/* Header — no screenshots are publicly available in these repos,
          so we use a styled monoogram header instead of fake previews. */}
      <div className="relative flex h-36 items-center justify-center overflow-hidden border-b border-white/[0.06] bg-gradient-to-br from-night-800 via-night-900 to-night-800">
        <div
          aria-hidden
          className="absolute inset-0 bg-grid-faint opacity-60 [background-size:26px_26px]"
        />
        <div className="relative flex items-center gap-3">
          <FolderOpen size={22} className="text-accent-blue/70" />
          <span className="font-display text-lg font-bold tracking-tight text-white/90">
            {project.repoName}
          </span>
        </div>
        {project.isFeatured && (
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
            Final Project
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold text-white transition-colors group-hover:text-accent-blue">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-400">
          {project.description}
        </p>

        {/* Technologies actually evidenced */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        {/* Honest status note */}
        {project.status === 'private-sources' && (
          <p className="mt-4 flex items-start gap-2 rounded-lg border border-white/[0.06] bg-night-900/60 px-3 py-2 text-xs text-slate-400">
            <Lock size={13} className="mt-0.5 shrink-0 text-amber-300" />
            The web and API source code currently lives in private sub-modules of this repository.
            A live demo is not published yet — links below go to the real repository.
          </p>
        )}

        {/* Meta from live repo data */}
        {repo && (
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.06] pt-3 font-mono text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Star size={12} /> {repo.stargazers_count}
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork size={12} /> {repo.forks_count}
            </span>
            {updated && (
              <span className="inline-flex items-center gap-1">
                <Clock3 size={12} /> Updated {updated}
              </span>
            )}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary !px-4 !py-2.5 text-xs"
          >
            <Github size={14} /> View Source Code
          </a>
          {/* Live Demo link rendered ONLY when a real demo URL exists */}
          {repo?.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-4 !py-2.5 text-xs"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
