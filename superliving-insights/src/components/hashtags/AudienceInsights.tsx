"use client"

import type { HashtagData } from "@/lib/types"

interface AudienceInsightsProps {
  hashtag: HashtagData
}

export function AudienceInsights({ hashtag }: AudienceInsightsProps) {
  const topTheme = hashtag.contentThemes[0]
  const topType = hashtag.creatorTypeRatio[0]
  const bestSlot = Math.max(...hashtag.postingHeatmap)

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Card
        label="Top Theme"
        value={topTheme?.theme ?? "N/A"}
        description={`${topTheme?.count ?? 0} reels`}
      />
      <Card
        label="Creator Mix"
        value={topType?.type ?? "N/A"}
        description={`${topType?.percent ?? 0}% share`}
      />
      <Card
        label="Peak Slot"
        value={String(bestSlot)}
        description="Highest posting intensity in heatmap"
      />
    </div>
  )
}

function Card({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{label}</p>
      <p className="mt-2 text-sm text-[var(--text-primary)]">{value}</p>
      <p className="mt-1 font-mono text-[11px] text-[var(--text-muted)]">{description}</p>
    </div>
  )
}
