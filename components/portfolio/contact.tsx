import { ArrowUpRight, Mail } from 'lucide-react'
import { profile } from '@/lib/portfolio'
import { BrandIcon } from './brand-icon'
import { Reveal } from './reveal'

type Channel = { label: string; value: string; href: string; icon: React.ReactNode; external: boolean }

function getChannels(): Channel[] {
  const channels: Channel[] = []
  if (profile.email) {
    channels.push({
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: <Mail className="size-5" aria-hidden="true" />,
      external: false,
    })
  }
  if (profile.linkedinUrl) {
    channels.push({
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: profile.linkedinUrl,
      icon: <BrandIcon src="linkedin.svg" mono />,
      external: true,
    })
  }
  if (profile.githubUrl) {
    channels.push({
      label: 'GitHub',
      value: 'See my code',
      href: profile.githubUrl,
      icon: <BrandIcon src="github.svg" mono />,
      external: true,
    })
  }
  return channels
}

export function Contact() {
  const channels = getChannels()

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 mx-auto h-80 max-w-3xl rounded-full bg-violet/15 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-violet">05</span> — Contact
          </p>
          <h2 id="contact-heading" className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            {'Let’s build something '}
            <span className="text-gradient">together.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            I’m open to conversations about full stack roles, real-time systems, and interesting web projects.
          </p>
        </Reveal>

        {channels.length > 0 ? (
          <ul className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {channels.map((c, i) => (
              <li key={c.label}>
                <Reveal delay={i * 0.06}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 transition-colors hover:border-foreground/20 hover:bg-card"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-foreground">
                      {c.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-muted-foreground">{c.label}</span>
                      <span className="block truncate font-medium">{c.value}</span>
                    </span>
                    <ArrowUpRight
                      className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                      aria-hidden="true"
                    />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
