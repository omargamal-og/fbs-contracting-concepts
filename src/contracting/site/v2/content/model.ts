import type { Language } from '../../content/database.types'
import type { LocalizedContent } from '../../content/types'
export type MediaRef = {
  id: string; type: 'image' | 'video'; alt: string; width?: number; height?: number
  developmentUrl?: string; record?: LocalizedContent<'media_asset'>
  variants?: { key: string; width: number | null; mime: string; record: LocalizedContent<'media_asset'> }[]
}
export type HeroEntry = { id: string; media: MediaRef; poster?: MediaRef; mobile?: MediaRef; focalPoint: { x: number; y: number } }
export type ProjectView = {
  id: string; slug: string; name: string; location: string | null; category: string | null; summary: string | null
  image?: MediaRef; gallery: MediaRef[]; deliveryStatus: string
  period: { startYear: number; endYear: number } | null
  units: { count: number; type: 'apartments' | 'villas' } | null
  coordinates: { latitude: number; longitude: number; precision: string } | null
  published: boolean
}
export type EditorialView = { title: string; summary: string; body?: string }
export type ServiceView = { id: string; title: string; summary: string }
export type StatisticView = { id: string; label: string; value: number; unit: string | null; qualifier: string; divisor: number; referenceDate: string | null }
export type NewsView = { id: string; slug: string; title: string; excerpt: string; body: string; date: string | null; image?: MediaRef; linkedinUrl: string | null }
export type HomepageView = {
  language: Language; source: 'published' | 'development' | 'unavailable'
  hero: EditorialView; heroMedia: HeroEntry[]; company: EditorialView; expertise: EditorialView
  services: ServiceView[]; statistics: StatisticView[]; projects: ProjectView[]; news: NewsView[]
  sustainability: EditorialView; vision: EditorialView
  contact: { email: string | null; phone: string | null; socials: { name: string; url: string }[] }
}
export type HomepageState =
  | { status: 'loading' }
  | { status: 'ready'; data: HomepageView; backend: 'published' | 'unavailable' | 'error' }
  | { status: 'error'; message: string }
export function emptyHomepage(language: Language): HomepageView {
  return { language, source: 'unavailable', hero: { title: 'FBS\nContracting', summary: '' }, heroMedia: [],
    company: { title: '', summary: '' }, expertise: { title: '', summary: '' }, services: [], statistics: [], projects: [], news: [],
    sustainability: { title: '', summary: '' }, vision: { title: '', summary: '' }, contact: { email: null, phone: null, socials: [] } }
}
export const V2_BASE = '/contracting/v2'
export function v2Path(path = '') { return V2_BASE + (path ? '/' + path.replace(/^\/+/, '') : '') }
export function verifiedMapProjects(projects: ProjectView[]) {
  return projects.filter(project => project.published && project.coordinates && project.coordinates.precision !== 'unknown' && Number.isFinite(project.coordinates.latitude)
    && Number.isFinite(project.coordinates.longitude) && Math.abs(project.coordinates.latitude) <= 90 && Math.abs(project.coordinates.longitude) <= 180)
}
export function safeLinkedInUrl(value: string | null) {
  if (!value) return null
  try { const url = new URL(value); return url.protocol === 'https:' && ['linkedin.com','www.linkedin.com'].includes(url.hostname) ? url.href : null } catch { return null }
}

