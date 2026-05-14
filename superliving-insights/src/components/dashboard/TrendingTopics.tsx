"use client"

import type { TrendingTopic } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

interface TrendingTopicsProps {
  topics: TrendingTopic[]
  activeTopic: string
  setActiveTopic: (topicId: string) => void
}

export function TrendingTopics({
  topics,
  activeTopic,
  setActiveTopic,
}: TrendingTopicsProps) {
  return (
    <section className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
        Trending Topics
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {topics.map((topic) => {
          const isActive = topic.id === activeTopic
          return (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={[
                "flex shrink-0 items-center gap-2 rounded-sm border px-3 py-2 text-left transition-colors",
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--accent-text)]"
                  : "border-[var(--border-dim)] text-[var(--text-muted)] hover:border-[var(--border-mid)] hover:text-[var(--text-primary)]",
              ].join(" ")}
            >
              <span className="font-display text-sm">{topic.name}</span>
              <span className="font-mono text-[10px]">+{formatNumber(topic.velocityPercent)}%</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
