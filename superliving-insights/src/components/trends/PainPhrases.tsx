"use client"

import { useMemo, useState } from "react"

import { MOCK_REELS } from "@/lib/mock-data"
import type { PainPhrase } from "@/lib/types"

interface PainPhrasesProps {
  phrases: PainPhrase[]
}

export function PainPhrases({ phrases }: PainPhrasesProps) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const maxFrequency = Math.max(...phrases.map((item) => item.frequency), 1)
  const handles = useMemo(() => MOCK_REELS.map((reel) => reel.creatorHandle), [])

  const half = Math.ceil(phrases.length / 2)
  const columns = [phrases.slice(0, half), phrases.slice(half)]

  return (
    <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
        PAIN PHRASES · high-friction Hinglish triggers · last 24h
      </p>
      <div className="grid grid-cols-2 gap-4">
        {columns.map((list, idx) => (
          <div key={idx}>
            {list.map((item, rowIdx) => {
              const isOpen = expanded === item.phrase
              const related = [
                handles[(rowIdx + idx) % handles.length],
                handles[(rowIdx + idx + 2) % handles.length],
                handles[(rowIdx + idx + 4) % handles.length],
              ]
              return (
                <div key={item.phrase} className="relative">
                  <button
                    className="relative flex w-full justify-between border-b border-[var(--border-dim)] py-2 text-left"
                    onClick={() => setExpanded((prev) => (prev === item.phrase ? null : item.phrase))}
                  >
                    <div
                      className="absolute inset-y-1 left-0 rounded"
                      style={{
                        width: `${(item.frequency / maxFrequency) * 100}%`,
                        background: "rgba(124,106,247,0.08)",
                      }}
                    />
                    <span className="relative font-mono text-[12px] text-[var(--text-primary)]">
                      {item.phrase}
                    </span>
                    <span className="relative font-mono text-[12px] text-[var(--text-muted)]">
                      {item.frequency}
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="border-t border-[var(--border-dim)] bg-[var(--bg-raised)] p-3">
                      <p className="font-mono text-[11px] text-[var(--text-muted)]">
                        {item.reelCount} reels triggered this phrase
                      </p>
                      <p className="mt-1 text-xs text-[var(--text-primary)]">{related.join(" · ")}</p>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
