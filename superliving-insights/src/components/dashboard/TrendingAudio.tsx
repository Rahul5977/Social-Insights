"use client"

import { Music2 } from "lucide-react"

import type { AudioTrack } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

interface TrendingAudioProps {
  tracks: AudioTrack[]
}

export function TrendingAudio({ tracks }: TrendingAudioProps) {
  return (
    <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
        trending audio
      </p>
      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track.name}
            className="flex items-center gap-3 rounded border border-[var(--border-dim)] px-3 py-2"
          >
            <div className="font-mono text-xs text-[var(--text-muted)]">{track.rank}</div>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[var(--bg-raised)]">
              <Music2 size={14} className="text-[var(--text-dim)]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-[var(--text-primary)]">{track.name}</p>
              <p className="font-mono text-[10px] text-[var(--text-dim)]">
                {formatNumber(track.usageCount)} uses
              </p>
            </div>
            <div className="text-right font-mono text-[11px] text-[var(--text-muted)]">
              <p>{formatNumber(track.avgViews)} avg views</p>
              <p className="text-emerald-400">+{formatNumber(track.growthPercent)}%</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
