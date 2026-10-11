import { Mail, Phone, Github, MessageSquare } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { contact } from '../config/site.js'

/**
 * Contact
 * No fake contact form: submitting to nowhere would be dishonest.
 * Every channel below is a real, working link (mailto / tel / GitHub).
 */
const CHANNELS = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: contact.email,
    href: contact.email ? `mailto:${contact.email}` : null,
    note: 'Publicly shared on my GitHub profile — best for project and internship inquiries.',
  },
  {
    id: 'github',
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Thannun-Pheun',
    href: 'https://github.com/Thannun-Pheun',
    note: 'Open an issue in any of my repositories and I\'ll reply there.',
  },
]

export default function Contact() {
  const channels = CHANNELS.filter((c) => c.href)

  return (
    <section id="contact" className="relative">
      <div className="section-anchor">
        <SectionHeader
          kicker="06 · Contact"
          title="Get In Touch"
          blurb="Have a project idea, an internship opportunity, or a learning question? I'd love to hear from you."
        />

        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="border-b border-white/[0.06] bg-night-900/60 px-6 py-4">
                <p className="font-display text-sm font-semibold text-white">
                  Available channels
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  I intentionally don&apos;t run a contact form — these are direct, real links to
                  reach me.
                </p>
              </div>
              <ul className="divide-y divide-white/[0.06]">
                {channels.map((c) => {
                  const Icon = c.icon
                  return (
                    <li key={c.id}>
                      <a
                        href={c.href}
                        target={c.id === 'github' ? '_blank' : undefined}
                        rel={c.id === 'github' ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-accent/[0.06]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-blue transition-colors group-hover:bg-accent/25">
                          <Icon size={18} />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-sm font-semibold text-white">
                            {c.label}
                          </span>
                          <span className="block truncate font-mono text-[13px] text-accent-blue">
                            {c.value}
                          </span>
                          <span className="mt-0.5 block text-xs text-slate-500">{c.note}</span>
                        </span>
                        <span
                          aria-hidden
                          className="ml-auto text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue"
                        >
                          →
                        </span>
                      </a>
                    </li>
                  )
                })}
                {contact.phone && (
                  <li>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-accent/[0.06]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-blue transition-colors group-hover:bg-accent/25">
                        <Phone size={18} />
                      </span>
                      <span>
                        <span className="block font-display text-sm font-semibold text-white">
                          Phone
                        </span>
                        <span className="block font-mono text-[13px] text-slate-400">
                          {contact.phone}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          Published on my GitHub profile.
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="ml-auto text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue"
                      >
                        →
                      </span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="card flex flex-col items-center gap-4 p-8 text-center md:w-80">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-blue text-white shadow-glow">
                <MessageSquare size={26} />
              </span>
              <h3 className="font-display text-lg font-bold text-white">
                Let&apos;s build something
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                I&apos;m looking for web developer internships and collaboration on practical
                projects — especially React, PHP/Laravel and full-stack work.
              </p>
              <a href={`mailto:${contact.email}`} className="btn-primary w-full">
                <Mail size={16} /> Send me an email
              </a>
              <p className="text-[11px] text-slate-600">
                Only publicly verified channels are listed — add more in{' '}
                <code className="font-mono">src/config/site.js</code>.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
