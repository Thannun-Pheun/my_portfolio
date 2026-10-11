import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Github, FolderGit2, Users, MapPin } from 'lucide-react'
import { profile, quotes } from '../config/site.js'
import { sortByUpdated } from '../services/githubApi.js'

/** Small stat shown under the hero buttons. */
function Stat({ value, label }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-lg font-bold text-white">
        {value === undefined ? '—' : value}
      </span>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  )
}

/**
 * AnimatedName — my name animates in one character at a time
 * (rise + de-blur, staggered 55ms apart), then the gradient keeps
 * shimmering with a slow colour wave. Honors prefers-reduced-motion,
 * and screen readers get the plain text (the animated letters are
 * aria-hidden so it won't read "T h a n n u n ...").
 */
const NAME = 'Thannun Pheun'

const ENTRY_DELAY = 0.4 // start after the h1 itself fades in
const STAGGER = 0.055 // gap between letters

function AnimatedName({ animate }) {
  if (!animate) {
    return (
      <span className="bg-gradient-to-r from-accent to-accent-blue bg-clip-text text-transparent">
        {NAME}
      </span>
    )
  }
  let idx = 0 // continuous stagger index across both words
  const words = NAME.split(' ')
  return (
    <span aria-hidden="true">
      <span className="sr-only">{NAME}</span>
      {words.map((word, w) => (
        <Fragment key={word}>
          <span className="inline-block whitespace-nowrap">
            {[...word].map((ch) => {
              const i = idx++
              return (
                <motion.span
                  key={ch + i}
                  initial={{ opacity: 0, y: '55%', filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.5,
                    delay: ENTRY_DELAY + i * STAGGER,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="animate-name-shimmer inline-block bg-gradient-to-r from-accent via-accent-blue to-accent bg-[length:250%_auto] bg-clip-text text-transparent"
                  style={{ animationDelay: `${(i * 240) % 2800}ms` }}
                >
                  {ch}
                </motion.span>
              )
            })}
          </span>
          {w < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  )
}

/**
 * Hero — first screen. Live numbers come from the GitHub API
 * (`ghData`), everything else is verified profile information.
 */
export default function Hero({ ghData }) {
  const reduce = useReducedMotion()
  const user = ghData?.status === 'success' || ghData?.status === 'fallback' ? ghData.data.user : null
  const avatar = user?.avatar_url || profile.avatarUrl

  const fade = (d) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: d, ease: [0.21, 0.47, 0.32, 0.98] },
        }

  return (
    <section id="home" className="relative overflow-hidden pt-16">
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 bg-grid-faint [background-size:44px_44px]" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-[-120px] h-[320px] w-[420px] rounded-full bg-accent-blue/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 md:pb-28 md:pt-24 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.span
            {...fade(0)}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-mono text-xs text-accent-blue"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue" />
            </span>
            Open to Web Developer internships
          </motion.span>

          <motion.h1
            {...fade(0.08)}
            className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <AnimatedName animate={!reduce} />.
          </motion.h1>

          <motion.p {...fade(0.16)} className="mt-4 font-display text-lg font-semibold text-slate-200 sm:text-xl">
            {profile.role}
          </motion.p>

          <motion.p {...fade(0.22)} className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {quotes.tagline}
          </motion.p>

          <motion.div {...fade(0.28)} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              View My Projects <ArrowRight size={16} />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github size={16} /> Explore My GitHub
            </a>
          </motion.div>

          {/* Live from the GitHub API */}
          <motion.div {...fade(0.34)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.06] pt-6">
            <Stat value={user?.public_repos} label="Public repositories" />
            <Stat value={user?.followers} label="Followers" />
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-white">4th year</span>
              <span className="text-xs text-slate-500">IT @ Build Bright University</span>
            </div>
            {ghData?.status === 'fallback' && (
              <span className="text-[10px] text-slate-600">numbers = verified snapshot</span>
            )}
          </motion.div>
        </div>

        {/* Right visual: real GitHub avatar + code card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-accent-blue/25 blur-2xl" aria-hidden />
          <div className="card relative p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={`${avatar}&size=256`}
                  width={76}
                  height={76}
                  alt={`${profile.name} — GitHub profile picture`}
                  className="rounded-2xl border border-white/10"
                />
                <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-night-700 bg-night-900 text-accent-blue">
                  <MapPin size={12} />
                </span>
              </div>
              <div>
                <p className="font-display font-bold text-white">{profile.name}</p>
                <p className="font-mono text-xs text-accent-blue">@{profile.githubUrl.split('/').pop()}</p>
                <p className="mt-1 text-xs text-slate-500">{profile.location}</p>
              </div>
            </div>

            {/* Decorative code-inspired card */}
            <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.06] bg-night-950">
              <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-2 font-mono text-[10px] text-slate-500">developer.js</span>
                <FolderGit2 size={12} className="ml-auto text-slate-600" />
              </div>
              <pre className="overflow-x-auto px-4 py-4 font-mono text-[11px] leading-relaxed text-slate-300 sm:text-xs">
                <code>{`const `}<span className="text-accent-blue">developer</span>{` = {
  name: '`}<span className="text-emerald-300">Thannun Pheun</span>{`',
  role: '`}<span className="text-emerald-300">IT Student</span>{`',
  learning: ['`}
                  <span className="text-emerald-300">React.js</span>{`', '`}
                  <span className="text-emerald-300">PHP / Laravel</span>{`', '`}
                  <span className="text-emerald-300">Node.js</span>{`'],
  goal: '`}<span className="text-emerald-300">Full-Stack Developer</span>{`',
}`}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
