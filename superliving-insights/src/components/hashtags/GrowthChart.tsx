"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type { HashtagData } from "@/lib/types"

interface GrowthChartProps {
  hashtag: HashtagData
}

export function GrowthChart({ hashtag }: GrowthChartProps) {
  const discoveryIndex = hashtag.growthTimeline.findIndex((point) => point.count > 0)
  const promotedIndex = 7

  return (
    <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
        growth timeline
      </p>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={hashtag.growthTimeline}>
            <CartesianGrid stroke="var(--border-dim)" strokeDasharray="2 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--text-dim)", fontSize: 10, fontFamily: "DM Mono" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--text-dim)", fontSize: 10, fontFamily: "DM Mono" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--bg-raised)",
                border: "1px solid var(--border-dim)",
                borderRadius: 8,
                fontFamily: "DM Mono, monospace",
                fontSize: 11,
              }}
            />
            {discoveryIndex >= 0 ? (
              <ReferenceLine
                x={hashtag.growthTimeline[discoveryIndex].date}
                stroke="#2A2A2A"
                strokeDasharray="3 3"
                label={{
                  value: "First discovered",
                  position: "top",
                  fill: "#7C6AF7",
                  fontSize: 10,
                  fontFamily: "DM Mono",
                }}
              />
            ) : null}
            <ReferenceLine
              x={hashtag.growthTimeline[promotedIndex]?.date}
              stroke="#2A2A2A"
              strokeDasharray="3 3"
              label={{
                value: "Promoted to pool",
                position: "top",
                fill: "#7C6AF7",
                fontSize: 10,
                fontFamily: "DM Mono",
              }}
            />
            <Area dataKey="count" stroke="#7C6AF7" fill="#7C6AF7" fillOpacity={0.2} strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
