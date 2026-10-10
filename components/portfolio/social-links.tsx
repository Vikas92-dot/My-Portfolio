import { profile } from '@/lib/portfolio'
import { BrandIcon } from './brand-icon'

const links = [
  { label: 'GitHub', href: profile.githubUrl, icon: 'github.svg' },
  { label: 'LinkedIn', href: profile.linkedinUrl, icon: 'linkedin.svg' },
].filter((l): l is { label: string; href: string; icon: string } => Boolean(l.href))

export function SocialLinks() {
  if (links.length === 0) return null

  return (
    <ul className="flex items-center gap-2">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
          >
            <BrandIcon src={link.icon} mono className="size-4" />
            <span className="sr-only">{`${profile.name} on ${link.label}`}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
