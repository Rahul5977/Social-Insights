"use client"

import type { HashtagData } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

interface HashtagStatsProps {
  hashtag: HashtagData
}

export function HashtagStats({ hashtag }: HashtagStatsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <StatCard label="Discovered" value={`${hashtag.discoveredDaysAgo}d ago`} />
      <StatCard label="Appearances" value={formatNumber(hashtag.totalAppearances)} />
      <StatCard label="Avg likes" value={formatNumber(hashtag.avgLikes)} />
      <StatCard label="India ratio" value={`${Math.round(hashtag.indiaRatio * 100)}%`} />
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{label}</p>
      <p className="mt-2 font-mono text-xl text-[var(--accent)]">{value}</p>
    </div>
  )
}
