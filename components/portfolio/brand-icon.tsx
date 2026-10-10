import { cn } from '@/lib/utils'

type BrandIconProps = {
  src: string
  mono?: boolean
  className?: string
}

/** Renders a decorative brand SVG from /public/icons. Mono icons are tinted with the current text color. */
export function BrandIcon({ src, mono, className }: BrandIconProps) {
  const url = `/icons/${src}`

  if (mono) {
    return (
      <span
        aria-hidden="true"
        className={cn('inline-block size-5 shrink-0 bg-current', className)}
        style={{
          maskImage: `url(${url})`,
          WebkitMaskImage: `url(${url})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      />
    )
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={url}
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      loading="lazy"
      decoding="async"
      className={cn('size-5 shrink-0', className)}
    />
  )
}
