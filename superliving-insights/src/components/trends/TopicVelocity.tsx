"use client"

import { useMemo, useState } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type { VelocityPoint14d } from "@/lib/types"

interface TopicVelocityProps {
  data: VelocityPoint14d[]
}

type ViewMode = "absolute" | "relative"

const series = [
  { key: "thyroid", color: "#7C6AF7" },
  { key: "pcos", color: "#10B981" },
  { key: "diabetes", color: "#F59E0B" },
  { key: "ayurveda", color: "#EC4899" },
  { key: "mentalHealth", color: "#06B6D4" },
  { key: "postNatal", color: "#EF4444" },
] as const

export function TopicVelocity({ data }: TopicVelocityProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("absolute")

  const chartData = useMemo(() => {
    if (viewMode === "absolute") return data

    const first = data[0]
    return data.map((point) => ({
      label: point.label,
      thyroid: (point.thyroid / first.thyroid) * 100,
      pcos: (point.pcos / first.pcos) * 100,
      diabetes: (point.diabetes / first.diabetes) * 100,
      ayurveda: (point.ayurveda / first.ayurveda) * 100,
      mentalHealth: (point.mentalHealth / first.mentalHealth) * 100,
      postNatal: (point.postNatal / first.postNatal) * 100,
    }))
  }, [data, viewMode])

  return (
    <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
          TOPIC VELOCITY · 14 day change
        </p>
        <div className="flex gap-1 rounded-sm border border-[var(--border-dim)] p-0.5">
          {(["absolute", "relative"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={[
                "rounded-sm px-2 py-1 font-mono text-[10px] transition-colors",
                viewMode === mode
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-raised)]",
              ].join(" ")}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="var(--border-dim)" strokeDasharray="2 3" vertical={false} />
            <XAxis
              dataKey="label"
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
              formatter={(value) => {
                const numericValue = Number(value ?? 0)
                return viewMode === "relative"
                  ? `${numericValue.toFixed(1)}%`
                  : `${Math.round(numericValue)}`
              }}
              contentStyle={{
                backgroundColor: "#161616",
                border: "1px solid #2A2A2A",
                borderRadius: 8,
                fontFamily: "DM Mono, monospace",
                fontSize: 11,
              }}
            />
            {series.map((item) => (
              <Line
                key={item.key}
                type="monotone"
                dataKey={item.key}
                stroke={item.color}
                strokeWidth={1.5}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
