import { Check } from 'lucide-react'
import { featuredProject } from '@/lib/portfolio'
import { ArchitectureDiagram } from './architecture-diagram'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

export function FeaturedProject() {
  return (
    <section id="project" aria-labelledby="project-heading" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        id="project-heading"
        index="03"
        eyebrow={featuredProject.eyebrow}
        title={featuredProject.title}
        description={featuredProject.summary}
      />

      <Reveal>
        <ArchitectureDiagram />
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal>
          <h3 className="text-xl font-semibold tracking-tight">What I worked on</h3>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            I contributed across the frontend and backend — from ingesting live data to getting odds updates on screen.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
            {featuredProject.stack.map((t) => (
              <li key={t} className="rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card/30">
            {featuredProject.responsibilities.map((r) => (
              <li key={r} className="flex items-start gap-3 px-5 py-4">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet/15 text-violet">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                <span className="text-pretty leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
