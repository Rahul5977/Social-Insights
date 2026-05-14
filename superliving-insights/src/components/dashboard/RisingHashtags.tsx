"use client"

import type { DiscoveredHashtag } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

interface RisingHashtagsProps {
  hashtags: DiscoveredHashtag[]
}

export function RisingHashtags({ hashtags }: RisingHashtagsProps) {
  return (
    <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
        rising hashtags
      </p>
      <div className="space-y-3">
        {hashtags.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between text-sm">
              <p className="font-medium text-[var(--text-primary)]">#{item.name}</p>
              {item.isNew && (
                <span className="rounded border border-emerald-800 bg-emerald-950 px-1.5 py-0.5 font-mono text-[10px] text-emerald-400">
                  new
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
              <span>{formatNumber(item.appearances)} posts</span>
              <span>{formatNumber(item.avgLikes)} avg likes</span>
            </div>
            <div className="mt-1 h-1.5 rounded bg-[var(--bg-raised)]">
              <div
                className="h-full rounded bg-[var(--accent)]"
                style={{ width: `${Math.round(item.relativeScore * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
