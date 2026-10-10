import { Cable } from 'lucide-react'
import { techGroups } from '@/lib/portfolio'
import { cn } from '@/lib/utils'
import { BrandIcon } from './brand-icon'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

export function Skills() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="relative border-y border-border bg-card/20">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading
          id="stack-heading"
          index="02"
          eyebrow="Technology"
          title="The tools I build with."
          description="Grouped by where they sit in the stack — from the browser to the cloud."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {techGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={(i % 3) * 0.06}
              className={cn(
                'group rounded-2xl border border-border bg-background/60 p-6 transition-colors hover:border-foreground/15',
                i < 2 ? 'lg:col-span-3' : 'lg:col-span-2',
              )}
            >
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <h3 className="font-medium">{group.title}</h3>
                <span className="font-mono text-[11px] text-muted-foreground">{String(group.items.length).padStart(2, '0')}</span>
              </div>
              <p className="mb-5 text-sm text-muted-foreground">{group.description}</p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <li
                    key={tech.name}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 py-1.5 pl-2 pr-3.5 text-sm transition-colors hover:border-violet/40 hover:bg-card"
                  >
                    {tech.icon ? (
                      <BrandIcon src={tech.icon} mono={tech.mono} className="size-4" />
                    ) : (
                      <Cable className="size-4 text-azure" aria-hidden="true" />
                    )}
                    {tech.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
