"use client"

import Link from "next/link"
import type { Route } from "next"
import { usePathname } from "next/navigation"
import {
  Bookmark,
  Hash,
  LayoutDashboard,
  Search,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react"

const navItems = [
  { href: "/dashboard" as Route, label: "Dashboard", icon: LayoutDashboard },
  { href: "/explore" as Route, label: "Explore", icon: Search },
  { href: "/hashtags" as Route, label: "Hashtags", icon: Hash },
  { href: "/trends" as Route, label: "Trends", icon: TrendingUp },
  { href: "/creators" as Route, label: "Creators", icon: Users },
  { href: "/library" as Route, label: "Library", icon: Bookmark },
  { href: "/settings" as Route, label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-[240px] border-r border-[var(--border-dim)] bg-[var(--bg-surface)]">
      <div className="px-5 pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--accent)] font-mono text-sm font-bold text-white">
            SL
          </div>
          <div>
            <p className="font-display text-[15px] font-medium text-[var(--text-primary)]">
              SuperLiving
            </p>
            <p className="font-mono text-[11px] text-[var(--text-muted)]">Insights</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-[var(--text-dim)]">
            Navigation
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                    isActive
                      ? "border-l-2 border-[var(--accent)] bg-[var(--accent-dim)] font-medium text-[var(--accent-text)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)]",
                  ].join(" ")}
                >
                  <Icon size={16} strokeWidth={1.5} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-4">
        <p className="font-mono text-[10px] text-[var(--text-dim)]">Last synced</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--success)]" />
          <p className="text-sm text-[var(--text-muted)]">2 minutes ago</p>
        </div>
      </div>
    </aside>
  )
}
