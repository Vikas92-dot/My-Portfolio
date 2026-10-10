'use client'

import { useId, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type StepId = 'source' | 'backend' | 'kafka' | 'consumers' | 'redis' | 'mongo' | 'ws' | 'next'
type Tone = 'neutral' | 'hot' | 'persist'

type Step = { id: StepId; label: string; sub: string; description: string; tone: Tone }

const steps: Step[] = [
  { id: 'source', label: 'Live data', sub: 'Third-party feed', tone: 'neutral', description: 'Live match data arrives from a third-party application.' },
  { id: 'backend', label: 'Backend', sub: 'Processing', tone: 'neutral', description: 'The backend receives and processes the incoming live data.' },
  { id: 'kafka', label: 'Kafka', sub: 'Topics', tone: 'neutral', description: 'Processed data is published to Kafka topics, which distribute it to multiple consumers.' },
  { id: 'consumers', label: 'Consumers', sub: 'Multiple', tone: 'neutral', description: 'Multiple consumers read from the topics and handle different parts of the data.' },
  { id: 'redis', label: 'Redis', sub: 'Market odds', tone: 'hot', description: 'Frequently changing information, such as market odds, is kept in Redis.' },
  { id: 'mongo', label: 'MongoDB', sub: 'Match details', tone: 'persist', description: 'Persistent application data, such as match details, is stored in MongoDB.' },
  { id: 'ws', label: 'WebSockets', sub: 'Live updates', tone: 'hot', description: 'Odds updates are pushed to connected clients in real time over WebSockets.' },
  { id: 'next', label: 'Next.js', sub: 'Frontend', tone: 'neutral', description: 'The Next.js interface displays matches and reflects odds updates as they arrive.' },
]

type NodeId = Exclude<StepId, 'consumers'> | 'c1' | 'c2' | 'c3'
type DiagramNode = { id: NodeId; step: StepId; x: number; y: number; w: number; h: number; label: string; sub?: string; tone: Tone }

const W = 124
const H = 64

const nodes: DiagramNode[] = [
  { id: 'source', step: 'source', x: 72, y: 220, w: W, h: H, label: 'Live data', sub: 'third-party', tone: 'neutral' },
  { id: 'backend', step: 'backend', x: 232, y: 220, w: W, h: H, label: 'Backend', sub: 'processing', tone: 'neutral' },
  { id: 'kafka', step: 'kafka', x: 392, y: 220, w: W, h: H, label: 'Kafka', sub: 'topics', tone: 'neutral' },
  { id: 'c1', step: 'consumers', x: 552, y: 112, w: W, h: 46, label: 'Consumer', tone: 'neutral' },
  { id: 'c2', step: 'consumers', x: 552, y: 220, w: W, h: 46, label: 'Consumer', tone: 'neutral' },
  { id: 'c3', step: 'consumers', x: 552, y: 328, w: W, h: 46, label: 'Consumer', tone: 'neutral' },
  { id: 'redis', step: 'redis', x: 716, y: 128, w: 136, h: 72, label: 'Redis', sub: 'market odds', tone: 'hot' },
  { id: 'mongo', step: 'mongo', x: 716, y: 312, w: 136, h: 72, label: 'MongoDB', sub: 'match details', tone: 'persist' },
  { id: 'ws', step: 'ws', x: 878, y: 220, w: W, h: H, label: 'WebSockets', sub: 'live updates', tone: 'hot' },
  { id: 'next', step: 'next', x: 1032, y: 220, w: 120, h: H, label: 'Next.js', sub: 'frontend', tone: 'neutral' },
]

const edges: { from: NodeId; to: NodeId; tone: Tone }[] = [
  { from: 'source', to: 'backend', tone: 'neutral' },
  { from: 'backend', to: 'kafka', tone: 'neutral' },
  { from: 'kafka', to: 'c1', tone: 'neutral' },
  { from: 'kafka', to: 'c2', tone: 'neutral' },
  { from: 'kafka', to: 'c3', tone: 'neutral' },
  { from: 'c1', to: 'redis', tone: 'hot' },
  { from: 'c2', to: 'redis', tone: 'hot' },
  { from: 'c2', to: 'mongo', tone: 'persist' },
  { from: 'c3', to: 'mongo', tone: 'persist' },
  { from: 'redis', to: 'ws', tone: 'hot' },
  { from: 'mongo', to: 'ws', tone: 'persist' },
  { from: 'ws', to: 'next', tone: 'hot' },
]

const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<NodeId, DiagramNode>

const toneStroke: Record<Tone, string> = {
  neutral: 'var(--muted-foreground)',
  hot: 'var(--azure)',
  persist: 'var(--violet)',
}

function edgePath(from: DiagramNode, to: DiagramNode) {
  const x1 = from.x + from.w / 2
  const x2 = to.x - to.w / 2
  const mx = (x1 + x2) / 2
  return `M ${x1} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${x2} ${to.y}`
}

export function ArchitectureDiagram() {
  const [hovered, setHovered] = useState<StepId | null>(null)
  const [selected, setSelected] = useState<StepId | null>(null)
  const active = hovered ?? selected
  const toggleSelected = (id: StepId) => setSelected((cur) => (cur === id ? null : id))
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-15% 0px' })
  const reduce = useReducedMotion()
  const titleId = useId()
  const descId = useId()

  const activeStep = steps.find((s) => s.id === active) ?? null
  const isNodeActive = (n: DiagramNode) => active === n.step
  const isEdgeActive = (to: NodeId) => active !== null && nodeById[to].step === active

  return (
    <div ref={ref} className="relative">
      {/* Desktop: SVG flow */}
      <div className="hidden overflow-hidden rounded-3xl border border-border bg-background/60 p-6 lg:block lg:p-8">
        <svg
          viewBox="0 60 1100 320"
          className="h-auto w-full"
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title id={titleId}>Real-time data architecture</title>
          <desc id={descId}>
            Live data from a third-party feed is processed by the backend, published to Kafka topics, and read by multiple
            consumers. Consumers write frequently changing market odds to Redis and persistent match details to MongoDB.
            Updates are delivered over WebSockets to the Next.js frontend.
          </desc>

          <defs>
            <pattern id="arch-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="oklch(1 0 0 / 6%)" />
            </pattern>
          </defs>
          <rect x="0" y="60" width="1100" height="320" fill="url(#arch-dots)" />

          {edges.map((e, i) => {
            const d = edgePath(nodeById[e.from], nodeById[e.to])
            const highlighted = isEdgeActive(e.to)
            const dimmed = active !== null && !highlighted
            // pathLength drives stroke-dasharray, so dashed edges fade in instead to keep their dash pattern.
            const dashed = e.tone === 'persist'
            return (
              <g key={`${e.from}-${e.to}`}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke={toneStroke[e.tone]}
                  strokeWidth={highlighted ? 2 : 1.25}
                  strokeOpacity={dimmed ? 0.15 : e.tone === 'neutral' ? 0.45 : 0.75}
                  strokeDasharray={dashed ? '5 5' : undefined}
                  initial={reduce ? false : dashed ? { opacity: 0 } : { pathLength: 0 }}
                  animate={inView || reduce ? (dashed ? { opacity: 1 } : { pathLength: 1 }) : undefined}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: 'easeInOut' }}
                  style={{ transition: 'stroke-opacity 200ms, stroke-width 200ms' }}
                />
                {inView && !reduce ? (
                  <circle r={e.tone === 'hot' ? 3 : 2.5} fill={toneStroke[e.tone]} opacity={dimmed ? 0.2 : 0.95}>
                    <animateMotion
                      dur={e.tone === 'hot' ? '1.8s' : e.tone === 'persist' ? '3.6s' : '2.6s'}
                      begin={`${1 + i * 0.25}s`}
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                ) : null}
              </g>
            )
          })}

          {nodes.map((n, i) => {
            const on = isNodeActive(n)
            const dimmed = active !== null && !on
            const accent = n.tone === 'neutral' ? 'var(--foreground)' : toneStroke[n.tone]
            return (
              <motion.g
                key={n.id}
                initial={reduce ? false : { opacity: 0 }}
                animate={inView || reduce ? { opacity: dimmed ? 0.45 : 1 } : undefined}
                transition={{ duration: 0.4, delay: reduce ? 0 : 0.05 * i }}
                onMouseEnter={() => setHovered(n.step)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => toggleSelected(n.step)}
                className="cursor-pointer"
              >
                <rect
                  x={n.x - n.w / 2}
                  y={n.y - n.h / 2}
                  width={n.w}
                  height={n.h}
                  rx={14}
                  fill="var(--card)"
                  stroke={on ? accent : 'oklch(1 0 0 / 12%)'}
                  strokeWidth={on ? 1.5 : 1}
                  style={{ transition: 'stroke 200ms' }}
                />
                {n.tone !== 'neutral' ? (
                  <circle cx={n.x - n.w / 2 + 14} cy={n.y - n.h / 2 + 14} r={3} fill={toneStroke[n.tone]} />
                ) : null}
                <text
                  x={n.x}
                  y={n.sub ? n.y - 3 : n.y + 4}
                  textAnchor="middle"
                  fill="var(--foreground)"
                  fontSize={n.sub ? 14 : 12.5}
                  fontWeight={600}
                  fontFamily="var(--font-geist-sans)"
                >
                  {n.label}
                </text>
                {n.sub ? (
                  <text
                    x={n.x}
                    y={n.y + 15}
                    textAnchor="middle"
                    fill="var(--muted-foreground)"
                    fontSize={11.5}
                    fontFamily="var(--font-geist-mono)"
                    letterSpacing="0.04em"
                  >
                    {n.sub}
                  </text>
                ) : null}
              </motion.g>
            )
          })}
        </svg>
      </div>

      {/* Mobile: vertical flow */}
      <MobileFlow active={active} onSelect={toggleSelected} />

      {/* Step explorer */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <ol className="flex flex-wrap gap-2" aria-label="Architecture steps">
          {steps.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={selected === s.id}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => toggleSelected(s.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet',
                  active === s.id
                    ? 'border-foreground/25 bg-card text-foreground'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                <span className="font-mono text-[10px] text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>

        <div
          aria-live="polite"
          className="min-h-[88px] rounded-2xl border border-border bg-card/40 p-5"
        >
          {activeStep ? (
            <motion.div key={activeStep.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <ToneDot tone={activeStep.tone} />
                {activeStep.label}
                <span aria-hidden="true">·</span>
                {activeStep.sub}
              </p>
              <p className="mt-2 text-pretty leading-relaxed">{activeStep.description}</p>
            </motion.div>
          ) : (
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Hover or select a step to see what happens at each stage of the pipeline.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-azure" />
          Frequently changing data (Redis)
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-0 w-6 border-t-2 border-dashed border-violet" />
          Persistent data (MongoDB)
        </span>
        <span className="font-mono text-xs">Illustrative diagram — not a live system.</span>
      </div>
    </div>
  )
}

function ToneDot({ tone }: { tone: Tone }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'size-1.5 rounded-full',
        tone === 'hot' ? 'bg-azure' : tone === 'persist' ? 'bg-violet' : 'bg-muted-foreground',
      )}
    />
  )
}

const stepById = Object.fromEntries(steps.map((s) => [s.id, s])) as Record<StepId, Step>
const mobileRows: StepId[][] = [['source'], ['backend'], ['kafka'], ['consumers'], ['redis', 'mongo'], ['ws'], ['next']]

function MobileFlow({ active, onSelect }: { active: StepId | null; onSelect: (id: StepId) => void }) {
  const byId = stepById
  const rows = mobileRows

  return (
    <div className="rounded-3xl border border-border bg-background/60 p-5 lg:hidden" aria-hidden="true">
      {rows.map((row, i) => (
        <div key={row.join('-')}>
          {i > 0 ? <Connector split={row.length > 1 || rows[i - 1].length > 1} /> : null}
          <div className={cn('grid gap-3', row.length > 1 ? 'grid-cols-2' : 'grid-cols-1')}>
            {row.map((id) => {
              const s = byId[id]
              return (
                <button
                  key={id}
                  type="button"
                  tabIndex={-1}
                  onClick={() => onSelect(id)}
                  className={cn(
                    'flex items-center justify-between rounded-xl border bg-card px-4 py-3 text-left transition-colors',
                    active === id
                      ? s.tone === 'hot'
                        ? 'border-azure'
                        : s.tone === 'persist'
                          ? 'border-violet'
                          : 'border-foreground/30'
                      : 'border-border',
                  )}
                >
                  <span>
                    <span className="block text-sm font-semibold">{s.label}</span>
                    <span className="block font-mono text-[11px] text-muted-foreground">{s.sub}</span>
                  </span>
                  <ToneDot tone={s.tone} />
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function Connector({ split }: { split: boolean }) {
  return (
    <div className={cn('relative mx-auto h-6', split ? 'w-1/2' : 'w-px')}>
      <div className={cn('absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border', split && 'hidden')} />
      {split ? (
        <>
          <div className="absolute inset-y-0 left-0 w-px bg-azure/50" />
          <div className="absolute inset-y-0 right-0 w-px border-l border-dashed border-violet/60" />
        </>
      ) : null}
      {!split ? (
        <span className="absolute inset-0 motion-reduce:hidden motion-safe:animate-packet-y">
          <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure" />
        </span>
      ) : null}
    </div>
  )
}
