"use client"

interface HookDistributionProps {
  data: { hookType: string; percent: number }[]
}

export function HookDistribution({ data }: HookDistributionProps) {
  return (
    <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
        Hook distribution
      </p>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.hookType}>
            <div className="mb-1 flex items-center justify-between font-mono text-[11px]">
              <span className="text-[var(--text-primary)]">{item.hookType}</span>
              <span className="text-[var(--text-muted)]">{item.percent}%</span>
            </div>
            <div className="h-1.5 rounded bg-[var(--bg-raised)]">
              <div className="h-full rounded bg-[var(--accent)]" style={{ width: `${item.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
