"use client"

import { useMemo, useState } from "react"

import { ComparePanel } from "@/components/creators/ComparePanel"
import { CreatorDetail } from "@/components/creators/CreatorDetail"
import { CreatorList } from "@/components/creators/CreatorList"
import { TopBar } from "@/components/layout/TopBar"
import { MOCK_CREATORS_FULL } from "@/lib/mock-data"

export default function CreatorsPage() {
  const [selectedHandle, setSelectedHandle] = useState(MOCK_CREATORS_FULL[0]?.handle ?? "")
  const [sortBy, setSortBy] = useState("rank")
  const [filterType, setFilterType] = useState("All")
  const [compareList, setCompareList] = useState<string[]>([])

  const selectedCreator = useMemo(
    () => MOCK_CREATORS_FULL.find((creator) => creator.handle === selectedHandle) ?? MOCK_CREATORS_FULL[0],
    [selectedHandle]
  )

  const compareCreators = useMemo(
    () => MOCK_CREATORS_FULL.filter((creator) => compareList.includes(creator.handle)),
    [compareList]
  )

  const toggleCompare = (handle: string) => {
    setCompareList((prev) => {
      if (prev.includes(handle)) return prev.filter((item) => item !== handle)
      if (prev.length >= 3) return prev
      return [...prev, handle]
    })
  }

  return (
    <div className="ml-[240px] min-h-screen">
      <TopBar
        title="Creators"
        badgeText="Performance Intelligence"
        timeWindow="24h"
        onTimeWindowChange={() => null}
      />
      <div className="flex min-h-[calc(100vh-48px)]">
        <CreatorList
          creators={MOCK_CREATORS_FULL}
          selected={selectedHandle}
          onSelect={setSelectedHandle}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          filterType={filterType}
          onFilterTypeChange={setFilterType}
        />

        {compareList.length >= 2 ? (
          <section className="flex-1 p-4">
            <ComparePanel creators={compareCreators} onClear={() => setCompareList([])} />
          </section>
        ) : selectedCreator ? (
          <CreatorDetail
            creator={selectedCreator}
            compareList={compareList}
            onToggleCompare={toggleCompare}
          />
        ) : null}
      </div>
    </div>
  )
}
