"use client"

import type { ReelRow } from "@/lib/types"
import { formatNumber, formatPercent } from "@/lib/utils"

interface HashtagReelsProps {
  reels: ReelRow[]
  tags: string[]
}

export function HashtagReels({ reels, tags }: HashtagReelsProps) {
  const filtered = reels.filter((reel) => tags.some((tag) => reel.hashtags.includes(tag)))

  return (
    <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
        top reels for selected hashtags
      </p>
      <div className="space-y-1">
        {filtered.slice(0, 8).map((reel) => (
          <div
            key={reel.id}
            className="grid grid-cols-[120px_80px_80px_70px_1fr] items-center gap-2 border-b border-[var(--border-dim)] py-2 text-xs"
          >
            <p className="truncate text-[var(--text-primary)]">{reel.creatorHandle}</p>
            <p className="font-mono text-[var(--text-muted)]">{formatNumber(reel.likes)}</p>
            <p className="font-mono text-[var(--text-muted)]">{formatNumber(reel.views)}</p>
            <p className="font-mono text-[var(--text-muted)]">{formatPercent(reel.engagementRate)}</p>
            <p className="truncate font-mono text-[10px] text-[var(--text-dim)]">{reel.captionPreview}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
