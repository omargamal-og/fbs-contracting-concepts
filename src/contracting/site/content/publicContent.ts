import { getPublicContentClient, type PublicContentClient } from './client'
import type { ContentKind, TableRow, Translation } from './database.types'
import { CONTENT_TABLES, type ContentRequest, type ContentResult, type HomepageContent, type LocalizedContent, type PublicItem } from './types'

const publicFields = 'id,kind,slug,sort_order,publication_status,approval_status,published_at,expires_at'
const batchSize = 100
// RLS remains authoritative even if these explicit publication filters are removed.
export async function getPublicContent<K extends ContentKind>(kind: K, request: ContentRequest, suppliedClient?: PublicContentClient): Promise<ContentResult<LocalizedContent<K>[]>> {
  const configured = suppliedClient ? { status: 'ready' as const, client: suppliedClient } : getPublicContentClient()
  if (configured.status !== 'ready') return configured
  const client = configured.client
  const result: LocalizedContent<K>[] = []
  try {
    for (let offset = 0; ; offset += batchSize) {
      const rootsQuery = client.from('content_items').select(publicFields)
        .eq('kind', kind).eq('publication_status', 'published').eq('approval_status', 'approved')
        .order('sort_order').order('id').range(offset, offset + batchSize - 1)
      const roots = await (request.signal ? rootsQuery.abortSignal(request.signal) : rootsQuery)
      if (roots.error) throw roots.error
      if (!roots.data?.length) break
      const ids = roots.data.map(row => row.id)
      const translationQuery = client.from('content_translations').select('*').in('content_id', ids).eq('language_code', request.language)
      const table = CONTENT_TABLES[kind] as (typeof CONTENT_TABLES)[ContentKind]
      const detailQuery = client.from(table).select('*').in('id', ids)
      const [translations, details] = await Promise.all([
        request.signal ? translationQuery.abortSignal(request.signal) : translationQuery,
        request.signal ? detailQuery.abortSignal(request.signal) : detailQuery,
      ])
      if (translations.error || details.error) throw translations.error || details.error
      const localized = new Map((translations.data ?? []).map(row => [row.content_id, row as Translation]))
      // All detail tables have an id PK and are mapped to their discriminated kind above.
      const detailRows = (details.data ?? []) as TableRow<(typeof CONTENT_TABLES)[K]>[]
      const detailMap = new Map(detailRows.map(row => [row.id, row]))
      for (const item of roots.data) {
        if (item.publication_status !== 'published' || item.approval_status !== 'approved') continue
        const translation = localized.get(item.id)
        const detail = detailMap.get(item.id)
        // An unpublish between requests must never produce a partial presentation model.
        if (translation && detail) result.push({ item: item as PublicItem, translation, details: detail })
      }
      if (roots.data.length < batchSize) break
    }
    return result.length ? { status: 'ready', data: result } : { status: 'unavailable', reason: 'empty' }
  } catch {
    return { status: 'error', message: 'Published content could not be loaded.', retryable: true }
  }
}
export function getPublicProjects(request: ContentRequest, client?: PublicContentClient) {
  return getPublicContent('project', request, client)
}
export async function getPublicHomepage(request: ContentRequest, client?: PublicContentClient): Promise<ContentResult<HomepageContent>> {
  const pages = await getPublicContent('page', request, client)
  if (pages.status !== 'ready') return pages
  const page = pages.data.find(row => row.details.route_path === '')
  if (!page) return { status: 'unavailable', reason: 'empty' }
  const [sections,hero,statistics,projects,services,sectors,news] = await Promise.all([
    getPublicContent('page_section', request, client), getPublicContent('hero_media', request, client),
    getPublicContent('statistic', request, client), getPublicContent('project', request, client),
    getPublicContent('service', request, client), getPublicContent('sector', request, client), getPublicContent('news', request, client),
  ])
  for (const result of [sections,hero,statistics,projects,services,sectors,news]) {
    if (result.status === 'error' || (result.status === 'unavailable' && result.reason === 'not_configured')) return result
  }
  const data = <T>(result: ContentResult<T[]>) => result.status === 'ready' ? result.data : []
  return { status: 'ready', data: {
    page,
    sections: data(sections).filter(row => row.details.page_id === page.item.id),
    hero: data(hero).filter(row => row.details.page_id === page.item.id),
    statistics: data(statistics), projects: data(projects),
    services: data(services), sectors: data(sectors), news: data(news),
  } }
}
// site-media is private even for released assets. Do not use getPublicUrl().
export async function getReleasedMediaUrl(asset: LocalizedContent<'media_asset'>, client?: PublicContentClient, lifetimeSeconds = 60): Promise<ContentResult<string>> {
  if (!asset.details.object_path) return { status: 'unavailable', reason: 'empty' }
  const configured = client ? { status: 'ready' as const, client } : getPublicContentClient()
  if (configured.status !== 'ready') return configured
  try {
    const result = await configured.client.storage.from('site-media').createSignedUrl(asset.details.object_path, Math.min(900, Math.max(60, Math.trunc(lifetimeSeconds) || 60)))
    if (result.error || !result.data?.signedUrl) throw new Error('Media unavailable')
    return { status: 'ready', data: result.data.signedUrl }
  } catch { return { status: 'error', message: 'Released media could not be loaded.', retryable: true } }
}


// Variants inherit the approved parent asset's RLS; used by responsive media delivery.
export async function getPublicMediaVariants(request: ContentRequest, suppliedClient?: PublicContentClient): Promise<ContentResult<TableRow<'media_variants'>[]>> {
  const configured = suppliedClient ? { status: 'ready' as const, client: suppliedClient } : getPublicContentClient()
  if (configured.status !== 'ready') return configured
  try {
    const rows: TableRow<'media_variants'>[] = []
    for (let offset = 0; ; offset += batchSize) {
      const query = configured.client.from('media_variants').select('*').order('id').range(offset, offset + batchSize - 1)
      const result = await (request.signal ? query.abortSignal(request.signal) : query)
      if (result.error) throw result.error
      rows.push(...result.data)
      if (result.data.length < batchSize) break
    }
    return { status: 'ready', data: rows }
  } catch { return { status: 'error', message: 'Published media variants could not be loaded.', retryable: true } }
}
