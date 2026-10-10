import type { CSSProperties } from 'react'

/** Inline style that staggers the `animate-enter` / `animate-enter-x` CSS utilities. */
export function enterDelay(ms: number): CSSProperties {
  return { '--enter-delay': `${ms}ms` } as CSSProperties
}
