"use client"

import type { CreatorFull } from "@/lib/types"
import { formatNumber, formatPercent } from "@/lib/utils"

interface ComparePanelProps {
  creators: CreatorFull[]
  onClear: () => void
}

export function ComparePanel({ creators, onClear }: ComparePanelProps) {
  const topHook = (creator: CreatorFull) =>
    creator.hookDistribution.reduce((best, item) => (item.percent > best.percent ? item : best))

  const maxFollowers = Math.max(...creators.map((c) => c.followers))
  const maxLikes = Math.max(...creators.map((c) => c.avgLikes))
  const maxEng = Math.max(...creators.map((c) => c.avgEngagement))
  const hookValues = creators.map((c) => topHook(c).percent)
  const maxHook = Math.max(...hookValues)

  return (
    <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
          compare creators
        </p>
        <button
          onClick={onClear}
          className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        >
          Clear compare ×
        </button>
      </div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${Math.max(2, creators.length)}, minmax(0, 1fr))` }}
      >
        {creators.map((creator) => {
          const creatorTopHook = topHook(creator)
          return (
            <div key={creator.handle} className="rounded border border-[var(--border-dim)] p-3">
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-[10px] text-white"
                  style={{ backgroundColor: creator.avatarColor }}
                >
                  {creator.initials}
                </div>
                <div>
                  <p className="text-sm text-[var(--text-primary)]">@{creator.handle}</p>
                  <p className="font-mono text-[10px] text-[var(--text-dim)]">{creator.creatorType}</p>
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[var(--text-dim)]">Followers</span>
                  <span className={creator.followers === maxFollowers ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}>
                    {formatNumber(creator.followers)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-dim)]">Avg Likes</span>
                  <span className={creator.avgLikes === maxLikes ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}>
                    {formatNumber(creator.avgLikes)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-dim)]">Avg Eng%</span>
                  <span className={creator.avgEngagement === maxEng ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}>
                    {formatPercent(creator.avgEngagement)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-dim)]">Top Hook</span>
                  <span className={creatorTopHook.percent === maxHook ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}>
                    {creatorTopHook.hookType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-dim)]">Best Time</span>
                  <span className="text-[var(--text-muted)]">
                    {creator.bestPostingDay} {creator.bestPostingHour}:00
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
