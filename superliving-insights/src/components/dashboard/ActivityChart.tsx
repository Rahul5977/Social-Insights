"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

import { formatNumber } from "@/lib/utils"

interface ActivityChartProps {
  data: { hour: string; reels: number }[]
}

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
        activity by hour
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis
            dataKey="hour"
            interval={2}
            tick={{ fill: "var(--text-dim)", fontSize: 10, fontFamily: "DM Mono" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "#1A1528" }}
            formatter={(value) => [`${formatNumber(Number(value))} reels`, "Activity"]}
            contentStyle={{
              backgroundColor: "#161616",
              border: "1px solid #2A2A2A",
              borderRadius: "6px",
              color: "#F1F0EC",
              fontFamily: "DM Mono, monospace",
              fontSize: "11px",
            }}
          />
          <Bar dataKey="reels" radius={[2, 2, 0, 0]} fill="#7C6AF7" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}
