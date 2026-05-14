"use client"

import type { HashtagData } from "@/lib/types"

interface RelatedNetworkProps {
  hashtag: HashtagData
  onHashtagClick: (name: string) => void
}

export function RelatedNetwork({ hashtag, onHashtagClick }: RelatedNetworkProps) {
  const centerX = 250
  const centerY = 150
  const related = hashtag.relatedHashtags.slice(0, 8)

  return (
    <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
        related network
      </p>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 500 300" className="h-[300px] w-full min-w-[500px]">
          {related.map((item, i) => {
            const angle = (i * 45 * Math.PI) / 180
            const x = centerX + 120 * Math.cos(angle)
            const y = centerY + 100 * Math.sin(angle)
            return (
              <g key={item.name}>
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="#2A2A2A"
                  strokeWidth={1}
                  opacity={item.coOccurrence}
                />
                <foreignObject x={x - 58} y={y - 14} width={116} height={28}>
                  <button
                    onClick={() => onHashtagClick(item.name)}
                    className="h-full w-full cursor-pointer rounded border px-1 font-mono text-[10px]"
                    style={
                      item.trend === "growing"
                        ? { background: "#064E3B", borderColor: "#10B981", color: "#10B981" }
                        : item.trend === "declining"
                          ? { background: "#3F1F1F", borderColor: "#EF4444", color: "#EF4444" }
                          : { background: "var(--bg-surface)", borderColor: "var(--border-dim)", color: "var(--text-muted)" }
                    }
                  >
                    #{item.name}
                  </button>
                </foreignObject>
              </g>
            )
          })}

          <foreignObject x={175} y={120} width={150} height={36}>
            <div className="flex h-full items-center justify-center rounded border border-[var(--accent)] bg-[var(--accent-dim)] font-mono text-xs text-[var(--accent-text)]">
              #{hashtag.name}
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  )
}
