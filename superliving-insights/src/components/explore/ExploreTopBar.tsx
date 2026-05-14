"use client"

import { Download, Filter, Search, X } from "lucide-react"

interface ExploreTopBarProps {
  query: string
  onQueryChange: (query: string) => void
  onResetFilters: () => void
  onExport: () => void
}

export function ExploreTopBar({
  query,
  onQueryChange,
  onResetFilters,
  onExport,
}: ExploreTopBarProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-3">
      <div className="flex flex-1 items-center gap-2 rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] px-3 py-2">
        <Search size={14} className="text-[var(--text-dim)]" />
        <input
          id="explore-search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search caption, creator, keywords... (Cmd/Ctrl + K)"
          className="w-full bg-transparent font-mono text-xs text-[var(--text-primary)] outline-none placeholder:text-[var(--text-dim)]"
        />
      </div>

      <button
        onClick={onResetFilters}
        className="flex items-center gap-2 rounded border border-[var(--border-dim)] px-3 py-2 font-mono text-xs text-[var(--text-muted)] hover:border-[var(--border-mid)]"
      >
        <Filter size={14} />
        Filters
      </button>

      <button
        onClick={onResetFilters}
        className="flex items-center gap-2 rounded border border-[var(--border-dim)] px-3 py-2 font-mono text-xs text-[var(--text-muted)] hover:border-[var(--border-mid)]"
      >
        <X size={14} />
        Clear
      </button>

      <button
        onClick={onExport}
        className="flex items-center gap-2 rounded border border-[var(--accent)] px-3 py-2 font-mono text-xs text-[var(--accent)] hover:bg-[var(--accent-dim)]"
      >
        <Download size={14} />
        Export
      </button>
    </div>
  )
}
