import { Github, Star, GitFork, ArrowUpRight, AlertCircle, Users, BookOpen, CalendarDays } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { profile, GITHUB_USERNAME } from '../config/site.js'
import { sortByUpdated, languagePercentages } from '../services/githubApi.js'

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  PHP: '#4F5D95',
  Java: '#b07219',
  HTML: '#e34f26',
  CSS: '#38bdf8',
  TypeScript: '#3178c6',
}

function fmtDate(iso) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-white/[0.06] ${className}`} />
}

function StatTile({ icon: Icon, value, label }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-blue">
        <Icon size={16} />
      </div>
      <div>
        <p className="font-display text-lg font-bold leading-none text-white">
          {value ?? <Skeleton className="h-5 w-8" />}
        </p>
        <p className="mt-1 text-xs text-slate-500">{label}</p>
      </div>
    </div>
  )
}

/**
 * GitHubActivity — live public data from api.github.com.
 * Handles loading, rate-limit/network fallback (verified snapshot)
 * and error states without ever fabricating numbers.
 */
export default function GitHubActivity({ status, data, error }) {
  const loading = status === 'loading'
  const user = status === 'success' || status === 'fallback' ? data.user : null
  const repos = status === 'success' || status === 'fallback' ? sortByUpdated(data.repos || []) : []
  const langs = status === 'success' ? languagePercentages(data.languages) : []

  return (
    <section id="github" className="relative bg-night-900/40">
      <div className="section-anchor">
        <SectionHeader
          kicker="04 · GitHub"
          title="GitHub Activity"
          blurb="Pulled live from the public GitHub API — repositories, followers and language stats as they actually are right now."
        />

        {status === 'fallback' && (
          <Reveal>
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-sm text-amber-200">
              <AlertCircle size={17} className="mt-0.5 shrink-0" />
              <p>
                The GitHub API is rate-limited or unreachable right now, so the numbers below are a{' '}
                <strong>verified snapshot from 11 Oct 2026</strong> instead of live data.
                {error?.message ? ` (${error.message})` : ''}
              </p>
            </div>
          </Reveal>
        )}

        {status === 'error' ? (
          <div className="card flex flex-col items-center gap-4 p-10 text-center">
            <AlertCircle className="text-rose-400" size={28} />
            <p className="text-sm text-slate-400">
              I couldn&apos;t load my GitHub statistics. The profile itself is still available:
            </p>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Github size={16} /> Open github.com/{GITHUB_USERNAME}
            </a>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left: profile summary + stats */}
            <Reveal className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-4">
                  {loading ? (
                    <Skeleton className="h-16 w-16 rounded-2xl" />
                  ) : (
                    <img
                      src={`${user.avatar_url}&size=128`}
                      alt={`${profile.name} avatar`}
                      width={64}
                      height={64}
                      loading="lazy"
                      className="rounded-2xl border border-white/10"
                    />
                  )}
                  <div>
                    <p className="font-display text-lg font-bold text-white">{profile.name}</p>
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-accent-blue hover:underline"
                    >
                      @{GITHUB_USERNAME}
                    </a>
                  </div>
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open GitHub profile in a new tab"
                    className="btn-secondary ml-auto hidden !px-3.5 !py-2 text-xs sm:inline-flex"
                  >
                    <ArrowUpRight size={14} /> View profile
                  </a>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  IT student &amp; aspiring web developer — learning by building. This section is a
                  live view of my public activity.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <StatTile icon={BookOpen} value={loading ? undefined : user.public_repos} label="Repos" />
                  <StatTile icon={Users} value={loading ? undefined : user.followers} label="Followers" />
                  <StatTile icon={Users} value={loading ? undefined : user.following} label="Following" />
                </div>
                {!loading && user.created_at && (
                  <p className="mt-4 flex items-center gap-2 font-mono text-xs text-slate-500">
                    <CalendarDays size={13} /> Joined GitHub {fmtDate(user.created_at)}
                  </p>
                )}
              </div>

              {/* Language stats */}
              <div className="card p-6">
                <h3 className="font-display text-sm font-semibold text-white">Languages (public code)</h3>
                {loading ? (
                  <div className="mt-4 space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                ) : langs.length > 0 ? (
                  <>
                    <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-night-700">
                      {langs.map((l) => (
                        <span
                          key={l.name}
                          style={{
                            width: `${l.percent}%`,
                            background: LANG_COLORS[l.name] || '#7C5CFF',
                          }}
                          title={`${l.name} ${l.percent.toFixed(0)}%`}
                        />
                      ))}
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                      {langs.map((l) => (
                        <li key={l.name} className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: LANG_COLORS[l.name] || '#7C5CFF' }}
                          />
                          {l.name} · {l.percent.toFixed(0)}%
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
                    GitHub hasn&apos;t detected languages in my public repositories yet — my code so
                    far lives in a README and in private project sub-modules. This chart fills
                    itself in automatically as I publish more source code.
                  </p>
                )}
              </div>
            </Reveal>

            {/* Right: repositories list */}
            <Reveal delay={0.1}>
              <div className="card h-full p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-semibold text-white">
                    Public repositories
                  </h3>
                  <span className="chip">{loading ? 'loading…' : `${repos.length} total`}</span>
                </div>

                {loading ? (
                  <div className="mt-4 space-y-3">
                    {[0, 1, 2].map((i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {repos.map((r) => (
                      <li key={r.id}>
                        <a
                          href={r.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block rounded-xl border border-white/[0.06] bg-night-900/60 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen size={14} className="shrink-0 text-accent-blue" />
                            <span className="font-mono text-sm font-semibold text-white group-hover:text-accent-blue">
                              {r.name}
                            </span>
                            {r.name === GITHUB_USERNAME && (
                              <span className="chip !px-2 !text-[9px]">Profile README</span>
                            )}
                            <ArrowUpRight
                              size={14}
                              className="ml-auto text-slate-600 transition-colors group-hover:text-accent-blue"
                            />
                          </div>
                          {r.description && (
                            <p className="mt-1.5 text-[13px] text-slate-400">{r.description}</p>
                          )}
                          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-slate-500">
                            {r.language && <span className="text-slate-400">● {r.language}</span>}
                            <span className="flex items-center gap-1">
                              <Star size={11} /> {r.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork size={11} /> {r.forks_count}
                            </span>
                            <span>Updated {fmtDate(r.pushed_at)}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary mt-4 w-full sm:hidden"
                >
                  <Github size={15} /> View profile on GitHub
                </a>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}
