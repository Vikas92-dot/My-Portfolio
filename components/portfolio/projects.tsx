import { projects } from '@/lib/portfolio'
import { ProjectCard } from './project-card'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

export function Projects() {
  if (projects.length === 0) return null

  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
      <SectionHeading id="projects-heading" index="03.1" eyebrow="More work" title="Other projects" />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
