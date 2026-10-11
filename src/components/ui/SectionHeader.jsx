import Reveal from './Reveal'

/** Consistent heading for every page section. */
export default function SectionHeader({ kicker, title, blurb }) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title mt-2">
        {title}
        <span className="text-accent">.</span>
      </h2>
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-accent to-accent-blue" />
      {blurb && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">{blurb}</p>}
    </Reveal>
  )
}
