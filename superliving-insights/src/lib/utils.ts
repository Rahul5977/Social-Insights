import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K"
  return n.toString()
}

export function formatPercent(n: number): string {
  return n.toFixed(1) + "%"
}

export function getTrendColor(percent: number): string {
  if (percent >= 100) return "#10B981"
  if (percent >= 30) return "#F59E0B"
  return "#6B7280"
}

export function heatmapColor(value: number, max: number): string {
  if (value === 0) return "#0F0A1E"
  const intensity = value / max
  const r = Math.round(124 * intensity)
  const g = Math.round(106 * intensity)
  const b = Math.round(Math.max(200, 247 - intensity * 50))
  return `rgb(${r},${g},${b})`
}
