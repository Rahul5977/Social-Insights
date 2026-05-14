"use client"

import type { ExploreFilters } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

interface FilterSummaryProps {
  filters: ExploreFilters
  totalRows: number
}

export function FilterSummary({ filters, totalRows }: FilterSummaryProps) {
  return (
    <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
        filter summary
      </p>
      <div className="mt-3 space-y-2 font-mono text-xs">
        <div className="flex justify-between">
          <span className="text-[var(--text-dim)]">Query</span>
          <span className="text-[var(--text-primary)]">{filters.query || "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--text-dim)]">Hashtags</span>
          <span className="text-[var(--text-primary)]">{filters.hashtags.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--text-dim)]">Window</span>
          <span className="text-[var(--text-primary)]">{filters.window}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--text-dim)]">Domain</span>
          <span className="text-[var(--text-primary)]">{filters.domain}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--text-dim)]">Min Likes</span>
          <span className="text-[var(--text-primary)]">{formatNumber(filters.minLikes)}</span>
        </div>
      </div>
      <div className="mt-4 rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] p-3">
        <p className="font-mono text-[10px] text-[var(--text-dim)]">Filtered rows</p>
        <p className="mt-1 font-mono text-xl text-[var(--accent)]">{formatNumber(totalRows)}</p>
      </div>
    </div>
  )
}
