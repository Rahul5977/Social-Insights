"use client"

import { ArrowUpRight } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { ReelRow, SortField } from "@/lib/types"
import { formatNumber, formatPercent } from "@/lib/utils"

interface ReelsTableProps {
  rows: ReelRow[]
  sort: SortField
  sortDirection: "asc" | "desc"
  onSortHeaderClick: (field: SortField) => void
}

const columnTemplate = "grid-cols-[40px_180px_80px_80px_60px_100px_110px_120px_70px_32px]"

export function ReelsTable({
  rows,
  sort,
  sortDirection,
  onSortHeaderClick,
}: ReelsTableProps) {
  const indicator = sortDirection === "asc" ? "↑" : "↓"

  return (
    <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-3">
      <div
        className={`grid ${columnTemplate} items-center gap-2 border-b border-[var(--border-dim)] pb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]`}
      >
        <div>Rank</div>
        <div>Creator</div>
        <button className="text-left" onClick={() => onSortHeaderClick("likes")}>
          Likes {sort === "likes" ? indicator : ""}
        </button>
        <button className="text-left" onClick={() => onSortHeaderClick("views")}>
          Views {sort === "views" ? indicator : ""}
        </button>
        <button className="text-left" onClick={() => onSortHeaderClick("engagement")}>
          Eng% {sort === "engagement" ? indicator : ""}
        </button>
        <div>Hook</div>
        <div>Hashtags</div>
        <div>Topic</div>
        <div>Posted</div>
        <div />
      </div>

      <div className="space-y-1 pt-1">
        {rows.map((row) => (
          <Tooltip key={row.id}>
            <TooltipTrigger asChild>
              <div
                className={`group grid ${columnTemplate} cursor-pointer items-center gap-2 rounded px-1 py-2 hover:bg-[var(--bg-raised)] ${
                  row.rank <= 2 ? "border-l-2 border-[var(--accent)] pl-2" : ""
                }`}
              >
                <div className="font-mono text-xs text-[var(--text-muted)]">{String(row.rank).padStart(2, "0")}</div>
                <div className="truncate text-[13px] font-medium text-[var(--text-primary)]">
                  {row.creatorHandle}
                </div>
                <div className="font-mono text-xs text-[var(--text-muted)]">{formatNumber(row.likes)}</div>
                <div className="font-mono text-xs text-[var(--text-muted)]">{formatNumber(row.views)}</div>
                <div className="font-mono text-xs text-[var(--text-muted)]">
                  {formatPercent(row.engagementRate)}
                </div>
                <div className="truncate font-mono text-[11px] text-[var(--text-muted)]">{row.hookType}</div>
                <div className="flex items-center gap-1">
                  {row.hashtags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-[var(--border-dim)] px-1 py-0.5 font-mono text-[10px] text-[var(--text-muted)]"
                    >
                      #{tag}
                    </span>
                  ))}
                  {row.hashtags.length > 2 ? (
                    <span className="font-mono text-[10px] text-[var(--text-dim)]">
                      +{row.hashtags.length - 2}
                    </span>
                  ) : null}
                </div>
                <div>
                  <span
                    className="rounded-sm px-2 py-0.5 font-mono text-[10px]"
                    style={{
                      color: row.topicColor,
                      backgroundColor: `${row.topicColor}26`,
                    }}
                  >
                    {row.topicName}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-[var(--text-dim)]">{row.postedAgo}</div>
                <div className="text-[var(--text-dim)] opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight size={12} />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[280px] bg-[var(--bg-raised)] text-[var(--text-primary)]">
              {row.captionPreview}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
