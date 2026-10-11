/**
 * GitHub public API helpers.
 * No token is used (and none should be added client-side — the
 * unauthenticated limit of ~60 requests/hour per visitor is plenty
 * for this page). All calls are read-only public data.
 */
import { GITHUB_USERNAME } from '../config/site.js'

const BASE = 'https://api.github.com'

async function gh(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (res.status === 403 || res.status === 429) {
    const err = new Error('GitHub API rate limit reached. Try again soon.')
    err.rateLimited = true
    throw err
  }
  if (!res.ok) {
    const err = new Error(`GitHub API error (${res.status})`)
    err.status = res.status
    throw err
  }
  return res.json()
}

/** Aggregate language bytes across public repos -> { JS: 12000, ... } */
function mergeLanguages(reposLangs) {
  const totals = {}
  reposLangs.forEach((langs) => {
    Object.entries(langs || {}).forEach(([lang, bytes]) => {
      totals[lang] = (totals[lang] || 0) + bytes
    })
  })
  return totals
}

/**
 * One entry point that fetches profile, repositories and used
 * languages. Returns { user, repos, languages }.
 */
export async function fetchGitHubData() {
  const [user, repos] = await Promise.all([
    gh(`/users/${GITHUB_USERNAME}`),
    gh(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
  ])

  // Language stats require one request per repo. If a repo call fails,
  // ignore it rather than breaking the whole section.
  const reposLangs = (
    await Promise.all(
      repos.slice(0, 20).map((r) => gh(`/repos/${r.full_name}/languages`).catch(() => ({}))),
    )
  ).map((l) => l || {})

  return { user, repos, languages: mergeLanguages(reposLangs) }
}

/** Sort helper: most recently pushed repositories first. */
export function sortByUpdated(repos) {
  return [...repos].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
}

/** Turn { JS: 120, PHP: 40 } into [{ name, bytes, percent }] */
export function languagePercentages(languages) {
  const total = Object.values(languages).reduce((s, v) => s + v, 0)
  if (!total) return []
  return Object.entries(languages)
    .map(([name, bytes]) => ({ name, bytes, percent: (bytes / total) * 100 }))
    .sort((a, b) => b.bytes - a.bytes)
}
