"use client"

import type { DomainFilter, SortField, TimeWindow } from "@/lib/types"

interface FilterBarProps {
  hashtags: string[]
  selectedHashtags: string[]
  window: TimeWindow
  sort: SortField
  minLikes: number
  domain: DomainFilter
  onToggleHashtag: (hashtag: string) => void
  onWindowChange: (window: TimeWindow) => void
  onSortChange: (sort: SortField) => void
  onMinLikesChange: (minLikes: number) => void
  onDomainChange: (domain: DomainFilter) => void
}

const windows: TimeWindow[] = ["6h", "24h", "7d", "30d"]
const sorts: SortField[] = ["likes", "views", "engagement", "recency"]
const domains: DomainFilter[] = ["all", "weight_loss", "skin", "mental_health", "ayurveda"]

export function FilterBar({
  hashtags,
  selectedHashtags,
  window,
  sort,
  minLikes,
  domain,
  onToggleHashtag,
  onWindowChange,
  onSortChange,
  onMinLikesChange,
  onDomainChange,
}: FilterBarProps) {
  const safeSort = sort ?? "likes"
  const safeDomain = domain ?? "all"

  return (
    <div className="space-y-3 rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-3">
      <div className="flex flex-wrap gap-2">
        {hashtags.map((hashtag) => {
          const active = selectedHashtags.includes(hashtag)
          return (
            <button
              key={hashtag}
              onClick={() => onToggleHashtag(hashtag)}
              className={[
                "rounded-sm px-2 py-1 font-mono text-[11px] transition-colors",
                active
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border-dim)] text-[var(--text-muted)] hover:border-[var(--border-mid)]",
              ].join(" ")}
            >
              #{hashtag}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">Window</p>
          <div className="flex gap-1">
            {windows.map((item) => (
              <button
                key={item}
                onClick={() => onWindowChange(item)}
                className={[
                  "rounded-sm px-2 py-1 font-mono text-[11px]",
                  window === item
                    ? "bg-[var(--accent)] text-white"
                    : "border border-[var(--border-dim)] text-[var(--text-muted)]",
                ].join(" ")}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">Sort</p>
          <select
            value={safeSort}
            onChange={(event) => onSortChange(event.target.value as SortField)}
            className="w-full rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] px-2 py-1 font-mono text-xs text-[var(--text-primary)]"
          >
            {sorts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">Domain</p>
          <select
            value={safeDomain}
            onChange={(event) => onDomainChange(event.target.value as DomainFilter)}
            className="w-full rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] px-2 py-1 font-mono text-xs text-[var(--text-primary)]"
          >
            {domains.map((item) => (
              <option key={item} value={item}>
                {item.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">Min Likes</p>
          <input
            type="number"
            min={0}
            step={100}
            value={minLikes}
            onChange={(event) => onMinLikesChange(Math.max(0, Number(event.target.value || 0)))}
            className="w-full rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] px-2 py-1 font-mono text-xs text-[var(--text-primary)]"
          />
        </div>
      </div>
    </div>
  )
}
