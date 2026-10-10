import { enterDelay } from '@/lib/motion'

type Token = { text: string; tone?: 'kw' | 'fn' | 'str' | 'cm' | 'prop' }

const lines: Token[][] = [
  [{ text: '// illustrative event flow', tone: 'cm' }],
  [{ text: 'consumer', tone: 'prop' }, { text: '.' }, { text: 'on', tone: 'fn' }, { text: '(' }, { text: "'message'", tone: 'str' }, { text: ', ' }, { text: 'async', tone: 'kw' }, { text: ' (msg) => {' }],
  [{ text: '  ' }, { text: 'const', tone: 'kw' }, { text: ' update = ' }, { text: 'parse', tone: 'fn' }, { text: '(msg)' }],
  [{ text: '  ' }, { text: 'await', tone: 'kw' }, { text: ' cache.' }, { text: 'set', tone: 'fn' }, { text: '(update.key, update)' }],
  [{ text: '  ' }, { text: 'socket', tone: 'prop' }, { text: '.' }, { text: 'emit', tone: 'fn' }, { text: '(' }, { text: "'update'", tone: 'str' }, { text: ', update)' }],
  [{ text: '})' }],
]

const toneClass: Record<NonNullable<Token['tone']>, string> = {
  kw: 'text-violet',
  fn: 'text-azure',
  str: 'text-emerald-300/90',
  cm: 'text-muted-foreground/70 italic',
  prop: 'text-foreground',
}

const nodes = ['source', 'stream', 'cache', 'client']

export function HeroVisual() {
  return (
    <div className="relative min-w-0 motion-safe:animate-enter" style={enterDelay(400)} aria-hidden="true">
      <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-violet/20 via-transparent to-azure/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/70 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">consumer.ts</span>
        </div>

        <pre className="overflow-hidden px-4 py-5 font-mono text-[11px] leading-6 sm:px-5 sm:text-[13px]">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre motion-safe:animate-enter-x" style={enterDelay(700 + i * 120)}>
              <span className="mr-3 inline-block w-4 select-none text-right text-muted-foreground/40 sm:mr-4">{i + 1}</span>
              {line.map((t, j) => (
                <span key={j} className={t.tone ? toneClass[t.tone] : 'text-muted-foreground'}>
                  {t.text}
                </span>
              ))}
              {i === lines.length - 1 ? (
                <span className="ml-1 inline-block h-4 w-[7px] translate-y-0.5 bg-violet motion-safe:animate-blink" />
              ) : null}
            </div>
          ))}
        </pre>

        <div className="border-t border-border px-4 py-4 sm:px-5">
          <div className="relative flex items-center justify-between">
            <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-violet/40 via-azure/40 to-violet/40" />
            <span className="absolute inset-x-2 top-1/2 h-1.5 -translate-y-1/2 motion-reduce:hidden motion-safe:animate-packet-x">
              <span className="absolute left-0 top-0 size-1.5 -translate-x-1/2 rounded-full bg-azure shadow-[0_0_12px_2px_var(--azure)]" />
            </span>
            {nodes.map((n) => (
              <span
                key={n}
                className="relative rounded-full border border-border bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:px-2.5"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
