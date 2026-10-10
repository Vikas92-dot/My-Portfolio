import { cn } from '@/lib/utils'

type LinkButtonProps = React.ComponentProps<'a'> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

const variants = {
  primary:
    'bg-foreground text-background hover:bg-foreground/90 shadow-[0_0_0_1px_oklch(1_0_0/10%),0_8px_30px_-8px_oklch(0.66_0.21_292/60%)]',
  secondary: 'border border-border bg-card/60 text-foreground backdrop-blur hover:border-foreground/20 hover:bg-card',
  ghost: 'text-muted-foreground hover:bg-card hover:text-foreground',
}

export function LinkButton({ variant = 'primary', className, ...props }: LinkButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
