import { Layers, Radio, Target } from 'lucide-react'
import { about } from '@/lib/portfolio'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const icons = [Layers, Radio, Target]

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        id="about-heading"
        index="01"
        eyebrow="About"
        title={
          <>
            Practical engineering, <span className="text-muted-foreground">end to end.</span>
          </>
        }
      />

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <Reveal className="space-y-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <ul className="space-y-3">
          {about.highlights.map((h, i) => {
            const Icon = icons[i % icons.length]
            return (
              <li key={h.title}>
                <Reveal delay={i * 0.08} className="flex gap-4 rounded-2xl border border-border bg-card/40 p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-violet">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-medium">{h.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
