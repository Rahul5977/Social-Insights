"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface HashtagSelectorProps {
  allTags: string[]
  selectedTags: string[]
  onAddTag: (name: string) => void
  onRemoveTag: (name: string) => void
  compareMode: boolean
  onToggleCompare: () => void
}

export function HashtagSelector({
  allTags,
  selectedTags,
  onAddTag,
  onRemoveTag,
  compareMode,
  onToggleCompare,
}: HashtagSelectorProps) {
  const [query, setQuery] = useState("")
  const available = allTags.filter((tag) => !selectedTags.includes(tag))
  const suggestions = available.filter((tag) => tag.toLowerCase().includes(query.toLowerCase())).slice(0, 6)

  return (
    <div className="space-y-3 rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-3">
      <div className="flex flex-wrap items-center gap-2">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-sm border border-[var(--accent)] bg-[var(--accent-dim)] px-2 py-1 font-mono text-[11px] text-[var(--accent-text)]"
          >
            #{tag}
            <button onClick={() => onRemoveTag(tag)} aria-label={`remove ${tag}`}>
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Add hashtag..."
          className="w-full rounded border border-[var(--border-dim)] bg-[var(--bg-raised)] px-2 py-1 font-mono text-xs text-[var(--text-primary)]"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              onAddTag(tag)
              setQuery("")
            }}
            className="rounded-sm border border-[var(--border-dim)] px-2 py-1 font-mono text-[11px] text-[var(--text-muted)] hover:border-[var(--border-mid)]"
          >
            + #{tag}
          </button>
        ))}
      </div>

      <button
        onClick={onToggleCompare}
        className={[
          "rounded-sm px-3 py-1.5 font-mono text-xs",
          compareMode
            ? "bg-[var(--accent)] text-white"
            : "border border-[var(--border-dim)] text-[var(--text-muted)]",
        ].join(" ")}
      >
        Compare mode: {compareMode ? "On" : "Off"}
      </button>
    </div>
  )
}
