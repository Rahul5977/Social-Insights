"use client"

import { cn } from "@/lib/utils"
import type { CreatorFull } from "@/lib/types"

interface CreatorListProps {
  creators: CreatorFull[]
  selected: string
  onSelect: (handle: string) => void
  sortBy: string
  onSortByChange: (value: string) => void
  filterType: string
  onFilterTypeChange: (value: string) => void
}

export function CreatorList({
  creators,
  selected,
  onSelect,
  sortBy,
  onSortByChange,
  filterType,
  onFilterTypeChange,
}: CreatorListProps) {
  const filtered = creators.filter((creator) =>
    filterType === "All" ? true : creator.creatorType === filterType
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "followers") return b.followers - a.followers
    if (sortBy === "likes") return b.avgLikes - a.avgLikes
    return a.rank - b.rank
  })

  return (
    <aside className="w-[380px] shrink-0 overflow-y-auto border-r border-[var(--border-dim)]">
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value)}
            className="rounded border border-[var(--border-dim)] bg-[var(--bg-surface)] px-3 py-1.5 font-mono text-xs text-[var(--text-primary)]"
          >
            <option value="rank">Sort: Rank</option>
            <option value="followers">Sort: Followers</option>
            <option value="likes">Sort: Avg Likes</option>
          </select>
        </div>

        <div className="flex gap-1">
          {["All", "Doctor", "Influencer", "Brand"].map((pill) => (
            <button
              key={pill}
              onClick={() => onFilterTypeChange(pill)}
              className={cn(
                "rounded-sm px-2 py-1 font-mono text-[11px]",
                filterType === pill
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border-dim)] text-[var(--text-muted)] hover:border-[var(--border-mid)]"
              )}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1 px-3 pb-3">
        {sorted.map((creator) => (
          <button
            key={creator.handle}
            onClick={() => onSelect(creator.handle)}
            className={cn(
              "w-full cursor-pointer rounded border px-3 py-2 text-left transition-colors",
              selected === creator.handle
                ? "border-[var(--accent)] bg-[var(--accent-dim)]"
                : "border-[var(--border-dim)] hover:bg-[var(--bg-raised)]"
            )}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-[10px] text-white"
                style={{ backgroundColor: creator.avatarColor }}
              >
                {creator.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm text-[var(--text-primary)]">{creator.displayName}</p>
                <p className="font-mono text-[10px] text-[var(--text-dim)]">@{creator.handle}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}
