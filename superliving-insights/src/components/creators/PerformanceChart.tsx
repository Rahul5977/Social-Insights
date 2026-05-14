"use client"

import {
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { formatNumber } from "@/lib/utils"

interface PerformanceChartProps {
  data: number[]
  average: number
  creatorName: string
  height?: number
}

export function PerformanceChart({ data, average, creatorName, height = 220 }: PerformanceChartProps) {
  const chartData = data.map((likes, index) => ({
    reel: index + 1,
    likes,
  }))

  return (
    <div className="h-full rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
        PERFORMANCE · last 20 reels · {creatorName}
      </p>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <XAxis
              dataKey="reel"
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
              formatter={(value) => [formatNumber(Number(value)), "Likes"]}
            />
            <ReferenceLine
              y={average}
              stroke="#F59E0B"
              strokeDasharray="4 4"
              label={{
                value: `Avg ${formatNumber(average)}`,
                fill: "#F59E0B",
                fontSize: 10,
                fontFamily: "DM Mono",
              }}
            />
            <Line type="monotone" dataKey="likes" stroke="#7C6AF7" strokeWidth={1.5} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
