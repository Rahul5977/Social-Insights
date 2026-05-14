"use client"

interface BestTimesProps {
  bestPostingDay: string
  bestPostingHour: number
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const HOURS = [9, 14, 20]

export function BestTimes({ bestPostingDay, bestPostingHour }: BestTimesProps) {
  const bestDayIndex = DAYS.findIndex((day) => day.toLowerCase() === bestPostingDay.slice(0, 3).toLowerCase())
  const bestHourIndex = HOURS.reduce(
    (closest, hour, index) =>
      Math.abs(hour - bestPostingHour) < Math.abs(HOURS[closest] - bestPostingHour) ? index : closest,
    0
  )

  return (
    <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
        Best times
      </p>
      <div className="space-y-1">
        <div className="grid grid-cols-[36px_repeat(3,1fr)] gap-1">
          <div />
          {HOURS.map((hour) => (
            <p key={hour} className="text-center font-mono text-[10px] text-[var(--text-dim)]">
              {hour}
            </p>
          ))}
        </div>
        {DAYS.map((day, dIdx) => (
          <div key={day} className="grid grid-cols-[36px_repeat(3,1fr)] gap-1">
            <p className="self-center font-mono text-[10px] text-[var(--text-dim)]">{day}</p>
            {HOURS.map((_, hIdx) => {
              const isBest = dIdx === bestDayIndex && hIdx === bestHourIndex
              return (
                <div
                  key={`${day}-${hIdx}`}
                  className="h-5 rounded"
                  style={{ backgroundColor: isBest ? "#7C6AF7" : "#1A1528" }}
                />
              )
            })}
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] text-[var(--text-muted)]">
        Peak slot: {bestPostingDay} · {bestPostingHour}:00
      </p>
    </div>
  )
}
