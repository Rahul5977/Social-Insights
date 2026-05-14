"use client"

import { useEffect, useMemo, useState } from "react"
import type { Route } from "next"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { FilterBar } from "@/components/explore/FilterBar"
import { FilterInsights } from "@/components/explore/FilterInsights"
import { FilterSummary } from "@/components/explore/FilterSummary"
import { ExploreTopBar } from "@/components/explore/ExploreTopBar"
import { Pagination } from "@/components/explore/Pagination"
import { ReelsTable } from "@/components/explore/ReelsTable"
import { TopBar } from "@/components/layout/TopBar"
import { MOCK_EXPLORE_REELS, MOCK_HASHTAGS } from "@/lib/mock-data"
import type { DomainFilter, ExploreFilters, ReelRow, SortField, TimeWindow } from "@/lib/types"

const TIME_WINDOWS: TimeWindow[] = ["6h", "24h", "7d", "30d"]
const SORT_FIELDS: SortField[] = ["likes", "views", "engagement", "recency"]
const DOMAINS: DomainFilter[] = ["all", "weight_loss", "skin", "mental_health", "ayurveda"]

function parseFilters(searchParams: URLSearchParams): ExploreFilters {
  const windowValue = searchParams.get("window") as TimeWindow | null
  const sortValue = searchParams.get("sort") as SortField | null
  const domainValue = searchParams.get("domain") as DomainFilter | null

  return {
    query: searchParams.get("q") ?? "",
    hashtags: (searchParams.get("hashtags") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    window: TIME_WINDOWS.includes(windowValue ?? "24h") ? (windowValue as TimeWindow) : "24h",
    sort: SORT_FIELDS.includes(sortValue ?? "likes") ? (sortValue as SortField) : "likes",
    minLikes: Number(searchParams.get("minLikes") ?? 0) || 0,
    domain: DOMAINS.includes(domainValue ?? "all") ? (domainValue as DomainFilter) : "all",
    page: Math.max(1, Number(searchParams.get("page") ?? 1) || 1),
  }
}

function normalizeDomain(domain: DomainFilter | null | undefined): string {
  if (!domain || domain === "all") return "all"
  if (domain === "weight_loss") return "weight"
  if (domain === "mental_health") return "mental"
  return String(domain).replace("_", " ")
}

function filterReels(reels: ReelRow[], filters: ExploreFilters): ReelRow[] {
  return reels
    .filter(
      (r) =>
        filters.hashtags.length === 0 || filters.hashtags.some((h) => r.hashtags.includes(h))
    )
    .filter(
      (r) =>
        normalizeDomain(filters.domain) === "all" ||
        r.topicName.toLowerCase().includes(normalizeDomain(filters.domain))
    )
    .filter((r) => r.likes >= filters.minLikes)
    .filter(
      (r) =>
        !filters.query ||
        r.captionPreview.toLowerCase().includes(filters.query.toLowerCase()) ||
        r.creatorHandle.toLowerCase().includes(filters.query.toLowerCase())
    )
    .sort((a, b) => {
      if (filters.sort === "likes") return b.likes - a.likes
      if (filters.sort === "views") return b.views - a.views
      if (filters.sort === "engagement") return b.engagementRate - a.engagementRate
      const hoursA = Number(a.postedAgo.replace(/[^\d]/g, "")) || 0
      const hoursB = Number(b.postedAgo.replace(/[^\d]/g, "")) || 0
      return hoursA - hoursB
    })
}

export default function ExploreContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const filters = useMemo(
    () => parseFilters(new URLSearchParams(searchParams.toString())),
    [searchParams]
  )
  const sortDirection = searchParams.get("dir") === "asc" ? "asc" : "desc"
  const [searchValue, setSearchValue] = useState(filters.query)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    setSearchValue(filters.query)
  }, [filters.query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        document.getElementById("explore-search")?.focus()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const pushParams = (updates: Record<string, string | number | string[] | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
        params.delete(key)
      } else if (Array.isArray(value)) {
        params.set(key, value.join(","))
      } else {
        params.set(key, String(value))
      }
    })

    const query = params.toString()
    router.push((query ? `${pathname}?${query}` : pathname) as Route)
  }

  const filteredRows = useMemo(() => {
    const rows = filterReels(MOCK_EXPLORE_REELS, filters)
    return sortDirection === "asc" ? rows.reverse() : rows
  }, [filters, sortDirection])

  const pageSize = 8
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const currentPage = Math.min(filters.page, totalPages)
  const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  useEffect(() => {
    if (filters.page !== currentPage) {
      pushParams({ page: currentPage })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const handleQueryChange = (value: string) => {
    setSearchValue(value)
    pushParams({ q: value, page: 1 })
  }

  const handleToggleHashtag = (hashtag: string) => {
    const next = filters.hashtags.includes(hashtag)
      ? filters.hashtags.filter((item) => item !== hashtag)
      : [...filters.hashtags, hashtag]
    pushParams({ hashtags: next, page: 1 })
  }

  const handleSortHeaderClick = (field: SortField) => {
    if (filters.sort === field) {
      pushParams({ dir: sortDirection === "desc" ? "asc" : "desc", page: 1 })
      return
    }
    pushParams({ sort: field, dir: "desc", page: 1 })
  }

  const handleExport = () => {
    setToast(`Preparing export · ${filteredRows.length} rows`)
    window.setTimeout(() => setToast(null), 2500)

    const header = "rank,creatorHandle,likes,views,engagementRate,topicName,hookType,postedAgo"
    const csv = [
      header,
      ...filteredRows.map((r) =>
        [
          r.rank,
          r.creatorHandle,
          r.likes,
          r.views,
          r.engagementRate,
          r.topicName,
          r.hookType,
          r.postedAgo,
        ].join(",")
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "explore-export.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const resetFilters = () => {
    router.push(pathname as Route)
  }

  return (
    <div className="relative ml-[240px] min-h-screen">
      <TopBar
        title="Explore"
        badgeText="Shareable Search"
        timeWindow={filters.window}
        onTimeWindowChange={(window) => pushParams({ window, page: 1 })}
      />

      <main className="space-y-4 px-6 py-5">
        <ExploreTopBar
          query={searchValue}
          onQueryChange={handleQueryChange}
          onResetFilters={resetFilters}
          onExport={handleExport}
        />

        <FilterBar
          hashtags={MOCK_HASHTAGS.map((item) => item.name)}
          selectedHashtags={filters.hashtags}
          window={filters.window}
          sort={filters.sort}
          minLikes={filters.minLikes}
          domain={filters.domain}
          onToggleHashtag={handleToggleHashtag}
          onWindowChange={(window) => pushParams({ window, page: 1 })}
          onSortChange={(sort) => pushParams({ sort, page: 1 })}
          onMinLikesChange={(minLikes) => pushParams({ minLikes, page: 1 })}
          onDomainChange={(domain) => pushParams({ domain, page: 1 })}
        />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">
          <div className="space-y-3">
            <ReelsTable
              rows={paginatedRows}
              sort={filters.sort}
              sortDirection={sortDirection}
              onSortHeaderClick={handleSortHeaderClick}
            />
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => pushParams({ page })}
            />
          </div>

          <div className="space-y-3">
            <FilterSummary filters={filters} totalRows={filteredRows.length} />
            <FilterInsights rows={filteredRows} />
          </div>
        </div>
      </main>

      {toast ? (
        <div className="fixed bottom-5 right-5 rounded-lg border border-[var(--border-dim)] bg-[var(--bg-raised)] px-4 py-3 font-mono text-xs text-[var(--text-primary)]">
          {toast}
        </div>
      ) : null}
    </div>
  )
}
