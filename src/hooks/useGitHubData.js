/**
 * useGitHubData
 * Loads the public profile, repos and language stats from GitHub.
 * - status 'loading'  -> show skeletons
 * - status 'success'  -> live numbers
 * - status 'fallback' -> API failed; verified snapshot from
 *                        src/data/content.js is shown instead
 *                        (the UI labels it as a snapshot).
 */
import { useEffect, useState } from 'react'
import { fetchGitHubData } from '../services/githubApi.js'
import { githubSnapshot, githubSnapshotRepos } from '../data/content.js'

/** Numbers that were captured manually and are verified. */
const SNAPSHOT_DATA = {
  user: {
    login: 'Thannun-Pheun',
    html_url: 'https://github.com/Thannun-Pheun',
    avatar_url: 'https://avatars.githubusercontent.com/u/185444949?v=4',
    public_repos: githubSnapshot.public_repos,
    followers: githubSnapshot.followers,
    following: githubSnapshot.following,
    created_at: githubSnapshot.created_at,
  },
  repos: githubSnapshotRepos,
  languages: {},
}

export default function useGitHubData() {
  const [state, setState] = useState({
    status: 'loading', // loading | success | fallback | error
    data: null,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    fetchGitHubData()
      .then((data) => {
        if (!cancelled) setState({ status: 'success', data, error: null })
      })
      .catch((error) => {
        if (cancelled) return
        if (error?.status === 404) {
          setState({ status: 'error', data: null, error })
        } else {
          // Rate limit / network hiccup -> verified snapshot fallback.
          setState({ status: 'fallback', data: SNAPSHOT_DATA, error })
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
