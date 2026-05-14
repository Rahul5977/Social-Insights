"use client"

import { Line, LineChart, ResponsiveContainer } from "recharts"

import type { TrendingTopic } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

interface ExplodingNowProps {
  topics: TrendingTopic[]
}

export function ExplodingNow({ topics }: ExplodingNowProps) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--accent)]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
        exploding now
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {topics.map((topic) => (
          <article
            key={topic.id}
            className="cursor-pointer rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-5 transition-colors hover:border-[var(--accent)]"
          >
            <div className="flex items-start justify-between">
              <p className="font-display text-[18px] font-medium text-[var(--text-primary)]">
                {topic.name}
              </p>
              <p className="font-mono text-[28px] text-[var(--accent)]">{topic.trendScore}</p>
            </div>

            <span className="mt-2 inline-flex rounded border border-emerald-800 bg-emerald-950 px-2 py-0.5 font-mono text-[11px] text-emerald-400">
              +{formatNumber(topic.velocityPercent)}% in {topic.velocityHours}h
            </span>

            <p className="mt-1 font-mono text-[12px] text-[var(--text-muted)]">
              {formatNumber(topic.reelCount)} reels
            </p>

            <div className="mt-3 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={topic.sparkline.map((value, idx) => ({
                    idx,
                    value,
                  }))}
                >
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 flex -space-x-2">
              {topic.topCreators.slice(0, 3).map((creator, idx) => (
                <div
                  key={`${topic.id}-${creator}-${idx}`}
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--bg-surface)] bg-[var(--accent)] font-mono text-[9px] text-white"
                >
                  {creator}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
