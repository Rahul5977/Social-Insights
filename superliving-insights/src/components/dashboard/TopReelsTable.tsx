"use client"

import { Play } from "lucide-react"

import type { Reel } from "@/lib/types"
import { formatNumber, formatPercent } from "@/lib/utils"

interface TopReelsTableProps {
  reels: Reel[]
}

export function TopReelsTable({ reels }: TopReelsTableProps) {
  return (
    <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
          top reels
        </p>
        <p className="font-mono text-[10px] text-[var(--text-dim)]">last 24h · sorted by likes</p>
      </div>

      <div className="w-full">
        <div className="flex items-center gap-3 border-b border-[var(--border-dim)] pb-2 font-mono text-[10px] uppercase text-[var(--text-dim)]">
          <div className="w-10">Rank</div>
          <div className="w-10">Reel</div>
          <div className="min-w-[160px] flex-1">Creator</div>
          <div className="w-20 text-right">Likes</div>
          <div className="w-20 text-right">Views</div>
          <div className="w-16 text-right">ER</div>
          <div className="w-20">Topic</div>
        </div>

        {reels.map((reel) => (
          <div
            key={reel.id}
            className={[
              "group flex cursor-pointer items-center gap-3 border-b border-[var(--border-dim)] py-2.5 transition-colors hover:bg-[var(--bg-raised)]",
              reel.rank <= 2 ? "border-l-2 border-[var(--accent)] pl-2" : "pl-0",
            ].join(" ")}
          >
            <div className="w-10 font-mono text-[13px] text-[var(--text-muted)]">{reel.rank}</div>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[var(--bg-raised)]">
              <Play size={10} className="text-[var(--text-dim)]" />
            </div>
            <div className="min-w-[160px] flex-1 text-[13px] font-medium text-[var(--text-primary)]">
              {reel.creatorHandle}
            </div>
            <div className="w-20 text-right font-mono text-[13px] text-[var(--text-muted)]">
              {formatNumber(reel.likes)}
            </div>
            <div className="w-20 text-right font-mono text-[13px] text-[var(--text-muted)]">
              {formatNumber(reel.views)}
            </div>
            <div className="w-16 text-right font-mono text-[13px] text-[var(--text-muted)]">
              {formatPercent(reel.engagementRate)}
            </div>
            <div className="w-20">
              <span
                className="rounded-sm px-2 py-0.5 font-mono text-[10px]"
                style={{
                  color: reel.topicColor,
                  backgroundColor: `${reel.topicColor}26`,
                }}
              >
                {reel.topicName}
              </span>
            </div>
            <div className="ml-auto flex items-center font-mono text-[11px] text-[var(--text-dim)]">
              {reel.postedAgo}
              <span className="ml-2 opacity-0 transition-opacity group-hover:opacity-100">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
