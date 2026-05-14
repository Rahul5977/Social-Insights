"use client"

import { Fragment } from "react"

import { heatmapColor } from "@/lib/utils"

interface PostingHeatmapProps {
  matrix: number[][]
}

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hourLabels = [0, 3, 6, 9, 12, 15, 18, 21]

export function PostingHeatmap({ matrix }: PostingHeatmapProps) {
  const maxValue = Math.max(...matrix.flat(), 1)

  return (
    <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
        posting heatmap
      </p>
      <div className="space-y-2 overflow-x-auto">
        <div className="grid min-w-[760px] grid-cols-[40px_repeat(24,1fr)] gap-px">
          <div />
          {Array.from({ length: 24 }, (_, hour) => (
            <div
              key={`hour-${hour}`}
              className="text-center font-mono text-[10px] text-[var(--text-dim)]"
            >
              {hourLabels.includes(hour) ? hour : ""}
            </div>
          ))}

          {matrix.map((row, day) => (
            <Fragment key={`day-row-${day}`}>
              <div className="pr-2 text-right font-mono text-[10px] text-[var(--text-dim)]">
                {dayLabels[day]}
              </div>
              {row.map((value, hour) => (
                <div
                  key={`${day}-${hour}`}
                  className="aspect-square min-w-0"
                  style={{ backgroundColor: heatmapColor(value, maxValue) }}
                  title={`${dayLabels[day]} ${hour}:00 IST — ${value} reels`}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-[var(--text-dim)]">
        <span>Low</span>
        <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: heatmapColor(1, maxValue) }} />
        <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: heatmapColor(maxValue, maxValue) }} />
        <span>High</span>
      </div>
    </section>
  )
}
