export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px] will-change-transform motion-safe:animate-drift-a" />
      <div className="absolute right-[-10%] top-1/3 h-[360px] w-[420px] rounded-full bg-azure/15 blur-[120px] will-change-transform motion-safe:animate-drift-b" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
