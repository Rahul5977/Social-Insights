"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import type { AudioTrackFull } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

interface AudioTrendsProps {
  tracks: AudioTrackFull[]
}

export function AudioTrends({ tracks }: AudioTrendsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[58%_42%]">
      <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
          AUDIO TRENDS · top tracks · last 24h
        </p>
        <div className="space-y-2">
          {tracks.map((track) => (
            <div
              key={track.name}
              className="grid grid-cols-[36px_1fr_auto_auto] items-center gap-3 border-b border-[var(--border-dim)] py-2"
            >
              <div className="font-mono text-xs text-[var(--text-muted)]">#{track.rank}</div>
              <div className="min-w-0">
                <p className="truncate text-sm text-[var(--text-primary)]">{track.name}</p>
                <p className="truncate font-mono text-[10px] text-[var(--text-dim)]">{track.artist}</p>
              </div>
              <p className="font-mono text-[11px] text-[var(--text-muted)]">
                {formatNumber(track.usageCount)} uses
              </p>
              <p className="font-mono text-[11px] text-emerald-400">
                {track.growthPercent > 0 ? "+" : ""}
                {track.growthPercent}%
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
          usage distribution
        </p>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tracks}>
              <CartesianGrid stroke="var(--border-dim)" strokeDasharray="2 3" vertical={false} />
              <XAxis
                dataKey="rank"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--text-dim)", fontSize: 11, fontFamily: "DM Mono" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--text-dim)", fontSize: 11, fontFamily: "DM Mono" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#161616",
                  border: "1px solid #2A2A2A",
                  borderRadius: 8,
                  fontFamily: "DM Mono, monospace",
                  fontSize: 11,
                }}
              />
              <Bar dataKey="usageCount" fill="#7C6AF7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}
