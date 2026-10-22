import type { ContentItem, ContentKind, Language, TableRow, Translation } from './database.types'
export const CONTENT_TABLES = {
  site_settings: 'site_settings', page: 'pages', page_section: 'page_sections', navigation_item: 'navigation_items',
  service: 'services', sector: 'sectors', project: 'projects', project_media: 'project_media', statistic: 'statistics',
  hero_media: 'hero_media', news: 'news', job_opening: 'job_openings', media_asset: 'media_assets',
} as const satisfies Record<ContentKind, string>
export type PublicItem = Pick<ContentItem, 'id' | 'kind' | 'slug' | 'sort_order' | 'publication_status' | 'approval_status' | 'published_at' | 'expires_at'>
export type LocalizedContent<K extends ContentKind> = {
  item: PublicItem; translation: Translation; details: TableRow<(typeof CONTENT_TABLES)[K]>
}
export type ContentResult<T> =
  | { status: 'ready'; data: T }
  | { status: 'unavailable'; reason: 'not_configured' | 'empty' }
  | { status: 'error'; message: string; retryable: boolean }
export type ContentState<T> = ContentResult<T> | { status: 'loading' }
export type ContentRequest = { language: Language; signal?: AbortSignal }
export type HomepageContent = {
  page: LocalizedContent<'page'>; sections: LocalizedContent<'page_section'>[]
  hero: LocalizedContent<'hero_media'>[]; statistics: LocalizedContent<'statistic'>[]
  projects: LocalizedContent<'project'>[]; services: LocalizedContent<'service'>[]
  sectors: LocalizedContent<'sector'>[]; news: LocalizedContent<'news'>[]
}

