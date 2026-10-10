import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/portfolio'
import { BrandIcon } from './brand-icon'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/40 p-6 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-foreground/15 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-violet/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 flex-1 text-pretty leading-relaxed text-muted-foreground">{project.description}</p>

      {project.stack.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.stack.map((t) => (
            <li key={t} className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
              {t}
            </li>
          ))}
        </ul>
      ) : null}

      {project.githubUrl || project.liveUrl ? (
        <div className="mt-6 flex gap-4 text-sm">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium hover:text-violet">
              Live site
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only">{`for ${project.title} (opens in a new tab)`}</span>
            </a>
          ) : null}
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
              <BrandIcon src="github.svg" mono className="size-3.5" />
              Source
              <span className="sr-only">{`code for ${project.title} (opens in a new tab)`}</span>
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
