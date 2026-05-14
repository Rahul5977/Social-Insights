"use client"

import { useMemo, useState } from "react"
import { Play, TrendingDown, TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { MOCK_REELS } from "@/lib/mock-data"
import type { HookStat } from "@/lib/types"
import { formatNumber, formatPercent } from "@/lib/utils"

interface HookLeaderboardProps {
  hooks: HookStat[]
}

export function HookLeaderboard({ hooks }: HookLeaderboardProps) {
  const [selectedHook, setSelectedHook] = useState<string | null>(hooks[0]?.hookType ?? null)

  const selectedData = useMemo(
    () => hooks.find((hook) => hook.hookType === selectedHook) ?? null,
    [hooks, selectedHook]
  )

  const topReels = useMemo(() => {
    if (!selectedData) return []
    return selectedData.topReels
      .map((id) => MOCK_REELS.find((reel) => reel.id === id))
      .filter((reel): reel is NonNullable<typeof reel> => Boolean(reel))
  }, [selectedData])

  return (
    <div className="flex gap-4 overflow-hidden">
      <div className="min-w-0 flex-1 rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
          HOOK PATTERNS · performance by hook type · last 24h
        </p>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hooks} layout="vertical" margin={{ left: 8, right: 8 }}>
              <CartesianGrid stroke="var(--border-dim)" strokeDasharray="2 3" horizontal={false} />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--text-dim)", fontSize: 10, fontFamily: "DM Mono" }}
              />
              <YAxis
                type="category"
                dataKey="hookType"
                width={120}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--text-muted)", fontSize: 11, fontFamily: "DM Mono" }}
              />
              <Tooltip
                cursor={{ fill: "#1A1528" }}
                contentStyle={{
                  backgroundColor: "#161616",
                  border: "1px solid #2A2A2A",
                  borderRadius: 8,
                  fontFamily: "DM Mono, monospace",
                  fontSize: 11,
                }}
              />
              <Bar
                dataKey="count"
                radius={[0, 4, 4, 0]}
                fill="#7C6AF7"
                onClick={(data) => {
                  const hookType = (data as { payload?: { hookType?: string } })?.payload?.hookType
                  if (hookType) setSelectedHook(hookType)
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <aside
        className={[
          "w-[280px] shrink-0 rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4 transition-transform duration-300",
          selectedData ? "translate-x-0" : "translate-x-[120%]",
        ].join(" ")}
      >
        {selectedData ? (
          <>
            <p className="font-display text-2xl text-[var(--text-primary)]">{selectedData.hookType}</p>
            <div className="mt-3 rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] p-3">
              <p className="font-mono text-[10px] uppercase text-[var(--text-dim)]">Avg Engagement</p>
              <p className="mt-1 font-mono text-xl text-[var(--accent)]">
                {formatPercent(selectedData.avgEngagement)}
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {selectedData.trendPercent >= 0 ? (
                  <TrendingUp size={12} className="text-emerald-400" />
                ) : (
                  <TrendingDown size={12} className="text-red-400" />
                )}
                <span
                  className={selectedData.trendPercent >= 0 ? "text-emerald-400" : "text-red-400"}
                >
                  {selectedData.trendPercent > 0 ? "+" : ""}
                  {selectedData.trendPercent}%
                </span>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {topReels.map((reel) => (
                <div
                  key={reel.id}
                  className="flex items-center gap-2 rounded border border-[var(--border-dim)] px-2 py-2"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--bg-raised)]">
                    <Play size={10} className="text-[var(--text-dim)]" />
                  </div>
                  <p className="min-w-0 flex-1 truncate text-xs text-[var(--text-primary)]">
                    {reel.creatorHandle}
                  </p>
                  <p className="font-mono text-[11px] text-[var(--text-muted)]">
                    {formatNumber(reel.likes)}
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full rounded border border-[var(--accent)] px-3 py-2 font-mono text-xs text-[var(--accent)] transition-colors hover:bg-[var(--accent-dim)]">
              Use in Script Maker →
            </button>
          </>
        ) : null}
      </aside>
    </div>
  )
}
