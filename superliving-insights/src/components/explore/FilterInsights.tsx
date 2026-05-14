"use client"

import type { ReelRow } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

interface FilterInsightsProps {
  rows: ReelRow[]
}

export function FilterInsights({ rows }: FilterInsightsProps) {
  const topRow = rows[0]
  const avgLikes = rows.length
    ? Math.round(rows.reduce((sum, row) => sum + row.likes, 0) / rows.length)
    : 0
  const avgEngagement = rows.length
    ? rows.reduce((sum, row) => sum + row.engagementRate, 0) / rows.length
    : 0

  return (
    <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
        insights
      </p>
      <div className="mt-3 space-y-3">
        <div className="rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] p-3">
          <p className="font-mono text-[10px] text-[var(--text-dim)]">Top reel</p>
          <p className="mt-1 truncate text-sm text-[var(--text-primary)]">
            {topRow ? topRow.creatorHandle : "No results"}
          </p>
        </div>
        <div className="rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] p-3">
          <p className="font-mono text-[10px] text-[var(--text-dim)]">Average likes</p>
          <p className="mt-1 font-mono text-lg text-[var(--accent)]">{formatNumber(avgLikes)}</p>
        </div>
        <div className="rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] p-3">
          <p className="font-mono text-[10px] text-[var(--text-dim)]">Average engagement</p>
          <p className="mt-1 font-mono text-lg text-[var(--accent)]">{avgEngagement.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  )
}
