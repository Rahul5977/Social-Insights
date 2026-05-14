"use client"

import { RefreshCw } from "lucide-react"
import type { ReactNode } from "react"

import type { TimeWindow } from "@/lib/types"

const timeWindows: TimeWindow[] = ["6h", "24h", "7d", "30d"]

interface TopBarProps {
  timeWindow: TimeWindow
  onTimeWindowChange: (w: TimeWindow) => void
  onFetchNow?: () => void
  title?: string
  badgeText?: string
  centerContent?: ReactNode
}

export function TopBar({
  timeWindow,
  onTimeWindowChange,
  onFetchNow,
  title = "Dashboard",
  badgeText = "Healthcare · India",
  centerContent,
}: TopBarProps) {
  return (
    <header className="flex h-12 items-center justify-between border-b border-[var(--border-dim)] bg-[var(--bg-base)] px-6">
      <div className="flex items-center">
        <h1 className="font-display text-[15px] font-medium">{title}</h1>
        <span className="ml-3 rounded border border-[var(--accent)] bg-[var(--accent-dim)] px-2 py-0.5 font-mono text-[11px] text-[var(--accent-text)]">
          {badgeText}
        </span>
      </div>

      {centerContent ? (
        <div>{centerContent}</div>
      ) : (
        <div className="flex items-center gap-2">
          {timeWindows.map((window) => (
            <button
              key={window}
              onClick={() => onTimeWindowChange(window)}
              className={[
                "rounded-sm px-3 py-1.5 font-mono text-xs transition-colors",
                window === timeWindow
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border-dim)] text-[var(--text-muted)] hover:border-[var(--border-mid)]",
              ].join(" ")}
            >
              {window}
            </button>
          ))}
        </div>
      )}

      {onFetchNow ? (
        <button
          onClick={onFetchNow}
          className="flex items-center gap-2 rounded bg-[var(--accent)] px-4 py-2 font-mono text-xs text-white hover:opacity-90"
        >
          <RefreshCw size={14} />
          Fetch Now
        </button>
      ) : (
        <div />
      )}
    </header>
  )
}
