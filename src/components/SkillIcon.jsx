import { useEffect, useState } from 'react'

/**
 * SkillIcon — renders the same icon source used in my GitHub profile
 * README (skillicons.dev). If the remote icon cannot load, a simple
 * letter fallback keeps the layout readable.
 */
const COLOR_BY_EXT = {
  html: '#e34f26',
  css: '#1572b6',
  js: '#f7df1e',
  react: '#61dafb',
  php: '#777bb4',
  laravel: '#ff2d20',
  nodejs: '#339933',
  java: '#f89820',
  mysql: '#4479a1',
  mongodb: '#47a248',
  git: '#f05032',
  github: '#8b949e',
  vscode: '#007acc',
}

export default function SkillIcon({ id, name, size = 34 }) {
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setFailed(false)
    setReady(false)
  }, [id])

  const color = COLOR_BY_EXT[id] || '#7C5CFF'

  if (failed) {
    return (
      <span
        aria-hidden
        className="flex items-center justify-center rounded-lg border border-white/10 bg-night-900 font-display font-bold"
        style={{ width: size, height: size, color, fontSize: size * 0.45 }}
      >
        {(name || id)[0]}
      </span>
    )
  }

  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      {!ready && (
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse rounded-lg border border-white/10 bg-night-900"
        />
      )}
      <img
        src={`https://skillicons.dev/icons?i=${id}`}
        width={size}
        height={size}
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={() => setReady(true)}
        onError={() => setFailed(true)}
        className={`relative transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: size, height: size }}
      />
    </span>
  )
}
