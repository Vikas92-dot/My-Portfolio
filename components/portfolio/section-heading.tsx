import { Reveal } from './reveal'

type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: React.ReactNode
  description?: string
  id: string
}

export function SectionHeading({ index, eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="text-violet">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-border" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </Reveal>
  )
}
