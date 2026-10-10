import { Users } from 'lucide-react'
import { experience } from '@/lib/portfolio'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-y border-border bg-card/20">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading
          id="experience-heading"
          index="04"
          eyebrow="Experience"
          title="Building, shipping, and supporting the team."
        />

        <ol className="relative space-y-8 border-l border-border pl-6 md:pl-10">
          {experience.map((job) => (
            <li key={`${job.role}-${job.company ?? ''}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[29px] top-2 size-2.5 rounded-full bg-gradient-to-br from-violet to-azure ring-4 ring-background md:-left-[45px]"
              />
              <Reveal className="grid gap-8 rounded-2xl border border-border bg-background/60 p-6 md:p-8 lg:grid-cols-[1fr_1.5fr]">
                <div>
                  {job.period ? (
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{job.period}</p>
                  ) : null}
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{job.role}</h3>
                  {job.company ? <p className="mt-1 text-muted-foreground">{job.company}</p> : null}
                  <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{job.summary}</p>
                  {job.highlight ? (
                    <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground">
                      <Users className="size-4 shrink-0 text-violet" aria-hidden="true" />
                      {job.highlight}
                    </p>
                  ) : null}
                </div>
                <ul className="space-y-3">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-violet" />
                      <span className="text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
