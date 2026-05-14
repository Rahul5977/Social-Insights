"use client"

import type { Route } from "next"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { AudienceInsights } from "@/components/hashtags/AudienceInsights"
import { CompareColumn } from "@/components/hashtags/CompareColumn"
import { GrowthChart } from "@/components/hashtags/GrowthChart"
import { HashtagReels } from "@/components/hashtags/HashtagReels"
import { HashtagSelector } from "@/components/hashtags/HashtagSelector"
import { HashtagStats } from "@/components/hashtags/HashtagStats"
import { HookBreakdown } from "@/components/hashtags/HookBreakdown"
import { RelatedNetwork } from "@/components/hashtags/RelatedNetwork"
import { TopBar } from "@/components/layout/TopBar"
import { MOCK_EXPLORE_REELS, MOCK_HASHTAG_DATA } from "@/lib/mock-data"

export default function HashtagsContent() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const tags = (params.get("tags") ?? "").split(",").map((item) => item.trim()).filter(Boolean)
  const compareMode = params.get("compare") === "true"

  const allTags = Object.keys(MOCK_HASHTAG_DATA)
  const selected = tags.slice(0, 3).map((tag) => MOCK_HASHTAG_DATA[tag]).filter(Boolean)

  const push = (nextTags: string[], nextCompare: boolean) => {
    const qs = new URLSearchParams()
    if (nextTags.length) qs.set("tags", nextTags.join(","))
    qs.set("compare", String(nextCompare))
    router.push(`${pathname}?${qs.toString()}` as Route)
  }

  const addTag = (name: string) => {
    if (tags.length >= 3 || tags.includes(name)) return
    push([...tags, name], compareMode)
  }

  const removeTag = (name: string) => {
    push(tags.filter((t) => t !== name), compareMode)
  }

  const toggleCompare = () => {
    push(tags, !compareMode)
  }

  const primary = selected[0]

  return (
    <div className="ml-[240px] min-h-screen">
      <TopBar
        title="Hashtag Deep Dive"
        badgeText="Compare 1-3 tags"
        timeWindow="24h"
        onTimeWindowChange={() => null}
      />
      <main className="space-y-4 px-6 py-5">
        <HashtagSelector
          allTags={allTags}
          selectedTags={tags}
          onAddTag={addTag}
          onRemoveTag={removeTag}
          compareMode={compareMode}
          onToggleCompare={toggleCompare}
        />

        {selected.length === 0 ? (
          <div className="rounded-lg border border-[var(--border-dim)] bg-[var(--bg-surface)] p-6 font-mono text-sm text-[var(--text-muted)]">
            Add at least one hashtag to start deep dive.
          </div>
        ) : compareMode && selected.length > 1 ? (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${selected.length}, minmax(0, 1fr))` }}
          >
            {selected.map((hashtag) => (
              <CompareColumn key={hashtag.name} hashtag={hashtag} />
            ))}
          </div>
        ) : primary ? (
          <div className="space-y-4">
            <HashtagStats hashtag={primary} />
            <GrowthChart hashtag={primary} />
            <HookBreakdown hashtag={primary} />
            <RelatedNetwork hashtag={primary} onHashtagClick={addTag} />
            <AudienceInsights hashtag={primary} />
            <HashtagReels reels={MOCK_EXPLORE_REELS} tags={tags} />
          </div>
        ) : null}
      </main>
    </div>
  )
}
