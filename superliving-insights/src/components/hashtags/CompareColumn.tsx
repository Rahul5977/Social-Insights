"use client"

import { GrowthChart } from "@/components/hashtags/GrowthChart"
import { HashtagStats } from "@/components/hashtags/HashtagStats"
import type { HashtagData } from "@/lib/types"

interface CompareColumnProps {
  hashtag: HashtagData
}

export function CompareColumn({ hashtag }: CompareColumnProps) {
  return (
    <div className="space-y-3 rounded-lg border border-[var(--border-dim)] bg-[var(--bg-base)] p-3">
      <h3 className="font-display text-lg text-[var(--text-primary)]">#{hashtag.name}</h3>
      <HashtagStats hashtag={hashtag} />
      <GrowthChart hashtag={hashtag} />
    </div>
  )
}
