"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type { VelocityPoint } from "@/lib/types"

interface VelocityChartProps {
  data: VelocityPoint[]
}

const legendItems = [
  { key: "thyroid", label: "Thyroid", color: "#7C6AF7" },
  { key: "pcos", label: "PCOS", color: "#10B981" },
  { key: "diabetes", label: "Diabetes", color: "#F59E0B" },
]

export function VelocityChart({ data }: VelocityChartProps) {
  return (
    <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
        velocity chart
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="1 4" stroke="var(--border-dim)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: "var(--text-dim)", fontSize: 11, fontFamily: "DM Mono" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: "#161616",
              border: "1px solid #2A2A2A",
              borderRadius: "6px",
              color: "#F1F0EC",
              fontFamily: "DM Mono, monospace",
              fontSize: "11px",
            }}
          />
          <Area
            type="monotone"
            dataKey="thyroid"
            stroke="#7C6AF7"
            fill="#7C6AF7"
            fillOpacity={0.1}
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="pcos"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.1}
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="diabetes"
            stroke="#F59E0B"
            fill="#F59E0B"
            fillOpacity={0.1}
            strokeWidth={1.5}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-3 flex items-center gap-4">
        {legendItems.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="font-mono text-[11px] text-[var(--text-muted)]">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
