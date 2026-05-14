"use client"

import type { Creator } from "@/lib/types"
import { formatNumber, formatPercent } from "@/lib/utils"

interface TopCreatorsProps {
  creators: Creator[]
}

export function TopCreators({ creators }: TopCreatorsProps) {
  return (
    <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
        top creators
      </p>
      <div className="space-y-2">
        {creators.map((creator) => (
          <div
            key={creator.handle}
            className="flex items-center gap-3 rounded border border-[var(--border-dim)] px-3 py-2"
          >
            <div className="font-mono text-xs text-[var(--text-muted)]">{creator.rank}</div>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-[10px] text-white"
              style={{ backgroundColor: creator.avatarColor }}
            >
              {creator.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-[var(--text-primary)]">{creator.handle}</p>
              <p className="font-mono text-[10px] text-[var(--text-dim)]">{creator.creatorType}</p>
            </div>
            <div className="text-right font-mono text-[11px] text-[var(--text-muted)]">
              <p>{formatNumber(creator.totalViews)} views</p>
              <p>{formatPercent(creator.avgEngagement)} ER</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
