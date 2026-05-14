"use client"

const HEAT_COLORS = ["#0F0A1E", "#2D1F6E", "#4A3399", "#6550CC", "#7C6AF7"]
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function heatColor(v: number, max: number): string {
  if (max <= 0) return HEAT_COLORS[0]
  const ratio = v / max
  const step = Math.round(ratio * (HEAT_COLORS.length - 1))
  return HEAT_COLORS[Math.max(0, Math.min(HEAT_COLORS.length - 1, step))]
}

interface PostingHeatmapProps {
  matrix: number[][]
}

export function PostingHeatmap({ matrix }: PostingHeatmapProps) {
  const max = Math.max(...matrix.flat(), 1)
  const total = matrix.flat().reduce((acc, cur) => acc + cur, 0)
  const peak = Math.max(...matrix.flat())
  const avg = Math.round(total / (matrix.length * matrix[0].length))

  return (
    <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
        POSTING HEATMAP · 7x24 posting intensity · IST
      </p>

      <div className="overflow-x-auto">
        <div className="inline-grid grid-cols-[50px_repeat(24,28px)] gap-1">
          <div />
          {Array.from({ length: 24 }, (_, hour) => (
            <div key={hour} className="text-center font-mono text-[10px] text-[var(--text-dim)]">
              {hour % 3 === 0 ? hour : ""}
            </div>
          ))}

          {matrix.map((row, dayIdx) => (
            <div key={dayIdx} className="contents">
              <div className="self-center pr-2 text-right font-mono text-[10px] text-[var(--text-dim)]">
                {dayLabels[dayIdx]}
              </div>
              {row.map((value, hour) => (
                <div
                  key={`${dayIdx}-${hour}`}
                  style={{ width: 28, height: 28, background: heatColor(value, max) }}
                  title={`${dayLabels[dayIdx]} ${hour}:00 IST — ${value} reels`}
                  className="rounded-[4px]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            Peak slot
          </p>
          <p className="mt-2 font-mono text-2xl text-[var(--accent)]">{peak}</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Highest reels in one hour block</p>
        </div>
        <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            Average
          </p>
          <p className="mt-2 font-mono text-2xl text-[var(--accent)]">{avg}</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Mean reels per hour across week</p>
        </div>
        <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            Weekly volume
          </p>
          <p className="mt-2 font-mono text-2xl text-[var(--accent)]">{total}</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Total tracked reels in 7 days</p>
        </div>
      </div>
    </section>
  )
}
