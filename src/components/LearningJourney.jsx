import { Github, GraduationCap, Rocket, User, Target } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { journey } from '../data/content.js'

const ICONS = { github: Github, graduation: GraduationCap, rocket: Rocket, user: User, target: Target }

/**
 * LearningJourney — only milestones backed by evidence: GitHub API
 * dates, repository history and my profile README. The last entry is
 * my stated 2026 goal, drawn with a dashed marker so it is clearly
 * "future", not history.
 */
export default function LearningJourney() {
  return (
    <section id="journey" className="relative">
      <div className="section-anchor">
        <SectionHeader
          kicker="05 · Journey"
          title="My Learning Journey"
          blurb="A timeline built only from confirmed dates — when I joined GitHub, what I've studied, and what I've shipped."
        />

        <ol className="relative ml-2 space-y-0 border-l border-white/10 pl-8 md:ml-4">
          {journey.map((item, i) => {
            const Icon = ICONS[item.icon] || Target
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <li className="relative pb-10 last:pb-0">
                  {/* Marker */}
                  <span
                    aria-hidden
                    className={`absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full border md:-left-[46px] ${
                      item.done
                        ? 'border-accent/50 bg-night-800 text-accent-blue'
                        : 'border-dashed border-slate-500/60 bg-night-950 text-slate-500'
                    }`}
                  >
                    <Icon size={14} />
                  </span>

                  <div
                    className={`card p-5 transition-transform duration-300 hover:-translate-y-0.5 ${
                      item.done ? '' : 'border-dashed opacity-90'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] ${
                          item.done
                            ? 'bg-accent/15 text-accent-blue'
                            : 'border border-dashed border-white/20 text-slate-400'
                        }`}
                      >
                        {item.date || 'Ongoing'}
                      </span>
                      <h3 className="font-display text-sm font-semibold text-white sm:text-base">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{item.text}</p>
                  </div>
                </li>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
