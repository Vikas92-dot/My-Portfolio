import { ArrowUp } from 'lucide-react'
import { profile } from '@/lib/portfolio'
import { SocialLinks } from './social-links'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          {`© ${new Date().getFullYear()} ${profile.name}. ${profile.role}.`}
        </p>
        <div className="flex items-center gap-4">
          <SocialLinks />
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
