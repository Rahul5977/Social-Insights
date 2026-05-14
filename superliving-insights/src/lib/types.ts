export type TimeWindow = "6h" | "24h" | "7d" | "30d"

export interface TrendingTopic {
  id: string
  name: string
  trendScore: number
  velocityPercent: number
  velocityHours: number
  reelCount: number
  sparkline: number[]
  topCreators: string[]
}

export interface Reel {
  id: string
  rank: number
  creatorHandle: string
  likes: number
  views: number
  engagementRate: number
  topicName: string
  topicColor: string
  postedAgo: string
}

export interface Creator {
  rank: number
  initials: string
  avatarColor: string
  handle: string
  totalViews: number
  avgEngagement: number
  creatorType: "Doctor" | "Influencer" | "Brand"
}

export interface DiscoveredHashtag {
  name: string
  isNew: boolean
  appearances: number
  avgLikes: number
  relativeScore: number
}

export interface AudioTrack {
  rank: number
  name: string
  usageCount: number
  avgViews: number
  growthPercent: number
}

export interface HookStat {
  hookType: string
  count: number
  avgEngagement: number
  trendPercent: number
  topReels: string[]
}

export interface AudioTrackFull {
  rank: number
  name: string
  artist: string
  usageCount: number
  avgViews: number
  growthPercent: number
  sparkline: number[]
}

export interface PainPhrase {
  phrase: string
  frequency: number
  reelCount: number
}

export interface VelocityPoint {
  date: string
  thyroid: number
  pcos: number
  diabetes: number
}

export interface VelocityPoint14d {
  label: string
  thyroid: number
  pcos: number
  diabetes: number
  ayurveda: number
  mentalHealth: number
  postNatal: number
}

export type SortField = "likes" | "views" | "engagement" | "recency"
export type DomainFilter = "all" | "weight_loss" | "skin" | "mental_health" | "ayurveda"

export interface ExploreFilters {
  query: string
  hashtags: string[]
  window: TimeWindow
  sort: SortField
  minLikes: number
  domain: DomainFilter
  page: number
}

export interface ReelRow extends Reel {
  hookType: string
  hashtags: string[]
  captionPreview: string
}

export interface CreatorFull extends Creator {
  handle: string
  displayName: string
  followers: number
  following: number
  bio: string
  creatorType: "Doctor" | "Influencer" | "Brand"
  totalReels: number
  recentLikes: number[]
  avgLikes: number
  hookDistribution: { hookType: string; percent: number }[]
  bestPostingDay: string
  bestPostingHour: number
  reels: ReelRow[]
}

export interface HashtagData {
  name: string
  discoveredDaysAgo: number
  totalAppearances: number
  avgLikes: number
  indiaRatio: number
  growthTimeline: { date: string; count: number }[]
  hookDistribution: { hook: string; count: number }[]
  topCreators: { handle: string; followers: number; reelCount: number; avgLikes: number }[]
  relatedHashtags: {
    name: string
    coOccurrence: number
    trend: "growing" | "stable" | "declining"
  }[]
  contentThemes: { theme: string; count: number }[]
  creatorTypeRatio: { type: string; percent: number }[]
  postingHeatmap: number[]
}
