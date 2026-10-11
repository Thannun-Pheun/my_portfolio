import { GraduationCap, MapPin, Search, Code2 } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import { profile, quotes } from '../config/site.js'

const FACT_CARDS = [
  {
    icon: GraduationCap,
    title: 'Education',
    text: `${profile.degree}, ${profile.university}, Cambodia.`,
  },
  {
    icon: MapPin,
    title: 'Based in',
    text: `${profile.location}. Open to remote internships.`,
  },
  {
    icon: Search,
    title: 'Currently learning',
    text: 'PHP, Laravel, React.js and Node.js — moving toward full-stack development.',
  },
  {
    icon: Code2,
    title: 'Focus',
    text: 'Responsive, user-friendly web applications built through real coursework and personal practice.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="section-anchor">
        <SectionHeader
          kicker="01 · About"
          title="About Me"
          blurb="A short, honest introduction — no inflated titles, just where I am and where I'm going."
        />

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 text-[15px] leading-relaxed text-slate-400">
            <p>
              I&apos;m <span className="font-semibold text-slate-200">{profile.name}</span>, an
              Information Technology student at{' '}
              <span className="font-semibold text-slate-200">{profile.university}</span> in Cambodia,
              currently in my fourth year. My final university project — a full-stack{' '}
              <a
                href={`${profile.githubUrl}/Booking_System`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue underline-offset-4 hover:underline"
              >
                booking system
              </a>{' '}
              — pushed me to learn how a real application is put together: a usable front end, an
              API back end and version control to keep everything organised.
            </p>
            <p>
              I&apos;m early in my career: so far my experience comes from university projects and
              self-directed learning rather than professional work. I study web technologies
              continuously (HTML, CSS, JavaScript, and now React, PHP/Laravel and Node.js) and I
              learn best by building, so I&apos;m working toward a goal of 10+ real projects in 2026.
            </p>
            <p>
              My aim is to become a professional web developer — someone who turns ideas into
              useful, well-made digital products. I&apos;m currently looking for a Web Developer
              internship where I can contribute, learn from a team and grow fast.
            </p>
            <blockquote className="border-l-2 border-accent pl-4 font-mono text-sm italic text-slate-300">
              “{quotes.favorite}”
              <footer className="mt-1 text-xs not-italic text-slate-500">
                — my favorite quote, published on my GitHub profile
              </footer>
            </blockquote>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {FACT_CARDS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="card group p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-blue transition-colors group-hover:bg-accent/25">
                  <Icon size={17} />
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card col-span-full flex items-center justify-between p-5 font-display text-sm font-semibold text-slate-200 transition-colors hover:border-accent/40 hover:text-white"
            >
              See my public work on GitHub <span aria-hidden className="text-accent-blue">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
