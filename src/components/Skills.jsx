import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import SkillIcon from './SkillIcon'
import { skillCategories } from '../data/content.js'

/**
 * Skills — every entry here is supported by my GitHub profile README
 * (stated tech stack). "Learning" means my README literally lists the
 * technology under "Currently learning".
 */
function SkillCard({ skill }) {
  const learning = skill.level === 'learning'
  return (
    <div className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-white/[0.03]">
      <SkillIcon id={skill.icon} name={skill.name} />
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-semibold text-white">{skill.name}</p>
        <p className="text-xs text-slate-500">
          {learning ? 'Currently learning' : 'Studied / used'}
        </p>
      </div>
      <span
        className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] ${
          learning
            ? 'border-amber-400/30 bg-amber-400/10 text-amber-300'
            : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
        }`}
      >
        {learning ? 'LEARNING' : 'KNOWN'}
      </span>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative bg-night-900/40">
      <div className="section-anchor">
        <SectionHeader
          kicker="02 · Skills"
          title="Technical Skills"
          blurb="My honest toolkit today. Technologies marked LEARNING are the ones my GitHub profile lists as currently in progress — I prefer to be accurate rather than impressive."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.06}>
              <div className="card h-full overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                  <h3 className="font-display text-base font-semibold text-white">{cat.title}</h3>
                  <span className="font-mono text-xs text-slate-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {cat.skills.map((s) => (
                    <SkillCard key={s.name} skill={s} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="card mt-8 flex flex-col items-center gap-3 p-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-slate-400">
              Also on my board for 2026 — deepen React, master backend development and ship{' '}
              <span className="font-semibold text-slate-200">10+ real projects</span>.
            </p>
            <span className="chip shrink-0">🎯 Goal: Full-Stack Developer</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
