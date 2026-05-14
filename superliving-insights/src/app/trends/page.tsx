"use client"

import { useEffect, useMemo, useState } from "react"

import { TopBar } from "@/components/layout/TopBar"
import { AudioTrends } from "@/components/trends/AudioTrends"
import { HookLeaderboard } from "@/components/trends/HookLeaderboard"
import { PainPhrases } from "@/components/trends/PainPhrases"
import { PostingHeatmap } from "@/components/trends/PostingHeatmap"
import { TopicVelocity } from "@/components/trends/TopicVelocity"
import {
  MOCK_AUDIO_TRENDS,
  MOCK_HEATMAP,
  MOCK_HOOKS,
  MOCK_PAIN_PHRASES,
  MOCK_VELOCITY_14D,
} from "@/lib/mock-data"
import type { TimeWindow } from "@/lib/types"

const sectionPills = [
  { id: "hooks", label: "Topics" },
  { id: "audio", label: "Audio" },
  { id: "heatmap", label: "Heatmap" },
  { id: "phrases", label: "Phrases" },
  { id: "velocity", label: "Velocity" },
] as const

const timeWindows: TimeWindow[] = ["6h", "24h", "7d", "30d"]

export default function TrendsPage() {
  const [activeSection, setActiveSection] = useState<(typeof sectionPills)[number]["id"]>("hooks")
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("24h")

  useEffect(() => {
    const onScroll = () => {
      const offsets = sectionPills
        .map((section) => {
          const el = document.getElementById(section.id)
          if (!el) return null
          return { id: section.id, top: Math.abs(el.getBoundingClientRect().top - 100) }
        })
        .filter((item): item is { id: (typeof sectionPills)[number]["id"]; top: number } => Boolean(item))

      const closest = offsets.sort((a, b) => a.top - b.top)[0]
      if (closest) setActiveSection(closest.id)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const centerContent = useMemo(
    () => (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {sectionPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => {
                setActiveSection(pill.id)
                document.getElementById(pill.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className={[
                "rounded-sm px-3 py-1.5 font-mono text-xs transition-colors",
                activeSection === pill.id
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border-dim)] text-[var(--text-muted)] hover:border-[var(--border-mid)]",
              ].join(" ")}
            >
              {pill.label}
            </button>
          ))}
        </div>
        <div className="h-5 w-px bg-[var(--border-dim)]" />
        <div className="flex items-center gap-1">
          {timeWindows.map((window) => (
            <button
              key={window}
              onClick={() => setTimeWindow(window)}
              className={[
                "rounded-sm px-2 py-1 font-mono text-[11px] transition-colors",
                timeWindow === window
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border-dim)] text-[var(--text-muted)] hover:border-[var(--border-mid)]",
              ].join(" ")}
            >
              {window}
            </button>
          ))}
        </div>
      </div>
    ),
    [activeSection, timeWindow]
  )

  return (
    <div className="ml-[240px] min-h-screen">
      <TopBar
        timeWindow={timeWindow}
        onTimeWindowChange={setTimeWindow}
        title="Trends"
        badgeText="Healthcare · India"
        centerContent={centerContent}
      />

      <main className="px-6 py-5">
        <div id="hooks" className="mb-8 border-b border-[var(--border-dim)] pb-8">
          <HookLeaderboard hooks={MOCK_HOOKS} />
        </div>

        <div id="audio" className="mb-8 border-b border-[var(--border-dim)] pb-8">
          <AudioTrends tracks={MOCK_AUDIO_TRENDS} />
        </div>

        <div id="heatmap" className="mb-8 border-b border-[var(--border-dim)] pb-8">
          <PostingHeatmap matrix={MOCK_HEATMAP} />
        </div>

        <div id="phrases" className="mb-8 border-b border-[var(--border-dim)] pb-8">
          <PainPhrases phrases={MOCK_PAIN_PHRASES} />
        </div>

        <div id="velocity" className="mb-8 border-b border-[var(--border-dim)] pb-8">
          <TopicVelocity data={MOCK_VELOCITY_14D} />
        </div>
      </main>
    </div>
  )
}
