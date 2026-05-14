"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import type { HashtagData } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

const COLORS = ["#7C6AF7", "#10B981", "#F59E0B", "#EC4899", "#06B6D4"]

interface HookBreakdownProps {
  hashtag: HashtagData
}

export function HookBreakdown({ hashtag }: HookBreakdownProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[40%_60%]">
      <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
          hook mix
        </p>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={hashtag.hookDistribution} dataKey="count" nameKey="hook" innerRadius={45} outerRadius={80}>
                {hashtag.hookDistribution.map((item, idx) => (
                  <Cell key={item.hook} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
          top creators
        </p>
        <div className="space-y-2">
          {hashtag.topCreators.map((creator) => (
            <div
              key={creator.handle}
              className="grid grid-cols-[1fr_70px_70px_70px] items-center gap-2 border-b border-[var(--border-dim)] py-2 text-xs"
            >
              <p className="truncate text-[var(--text-primary)]">{creator.handle}</p>
              <p className="font-mono text-[var(--text-muted)]">{formatNumber(creator.followers)}</p>
              <p className="font-mono text-[var(--text-muted)]">{creator.reelCount}</p>
              <p className="font-mono text-[var(--text-muted)]">{formatNumber(creator.avgLikes)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
