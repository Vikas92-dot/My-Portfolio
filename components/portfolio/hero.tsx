import { ArrowDown, ArrowRight, FileDown } from 'lucide-react'
import { profile } from '@/lib/portfolio'
import { enterDelay } from '@/lib/motion'
import { AmbientBackground } from './ambient-background'
import { HeroVisual } from './hero-visual'
import { LinkButton } from './link-button'
import { SocialLinks } from './social-links'

const enter = 'motion-safe:animate-enter'
const stagger = (step: number) => enterDelay(100 + step * 90)

export function Hero() {
  const words = profile.headline.split(' ')
  const isExternalResume = /^https?:\/\//.test(profile.resumeUrl ?? '')
  const afterHeadline = 2 + words.length

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <AmbientBackground />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-36 md:pt-44 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:pb-32">
        <div className="min-w-0">
          <p
            className={`${enter} mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur`}
            style={stagger(0)}
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-violet" />
            {profile.role}
          </p>

          <p className={`${enter} mb-3 text-lg text-muted-foreground`} style={stagger(1)}>
            {'Hi, I’m '}
            <span className="font-semibold text-foreground">{profile.name}</span>.
          </p>

          <h1
            id="hero-heading"
            className="text-balance break-words text-4xl font-semibold leading-[1.05] tracking-tight min-[420px]:text-5xl sm:text-6xl sm:leading-[1.02] lg:text-7xl"
          >
            {words.map((word, i) => (
              <span key={`${word}-${i}`}>
                <span
                  className={`${enter} inline-block ${i >= words.length - 2 ? 'text-gradient' : ''}`}
                  style={stagger(2 + i)}
                >
                  {word}
                </span>
                {i < words.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>

          <p
            className={`${enter} mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground`}
            style={stagger(afterHeadline)}
          >
            {profile.summary}
          </p>

          <div className={`${enter} mt-10 flex flex-wrap items-center gap-3`} style={stagger(afterHeadline + 1)}>
            <LinkButton href="#project">
              View Projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="#contact" variant="secondary">
              Contact Me
            </LinkButton>
            {profile.resumeUrl ? (
              <LinkButton
                href={profile.resumeUrl}
                variant="ghost"
                {...(isExternalResume ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}
              >
                <FileDown className="size-4" aria-hidden="true" />
                Resume
              </LinkButton>
            ) : null}
          </div>

          <div className={`${enter} mt-8`} style={stagger(afterHeadline + 2)}>
            <SocialLinks />
          </div>
        </div>

        <HeroVisual />
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-2 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet md:inline-flex"
      >
        <ArrowDown className="size-3.5" aria-hidden="true" />
        Scroll
      </a>
    </section>
  )
}
