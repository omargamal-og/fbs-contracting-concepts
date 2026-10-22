import type { LocalizedContent } from './types'
// Presentation components consume these models, never Supabase queries.
export function adaptProject(project: LocalizedContent<'project'>) {
  const { item, translation, details } = project
  return {
    id: item.id, slug: item.slug, name: translation.title, location: translation.location_label,
    sectorId: details.sector_id, deliveryStatus: details.delivery_status,
    constructionPeriod: details.start_year !== null && details.end_year !== null ? { startYear: details.start_year, endYear: details.end_year } : null,
    units: details.units_count !== null && details.units_type ? { count: details.units_count, type: details.units_type } : null,
    coordinates: details.coordinates_verified && details.latitude !== null && details.longitude !== null
      ? { latitude: details.latitude, longitude: details.longitude, precision: details.location_precision } : null,
  }
}
export function adaptStatistic(statistic: LocalizedContent<'statistic'>) {
  return { id: statistic.item.id, label: statistic.translation.title, value: statistic.details.value,
    unit: statistic.details.unit, qualifier: statistic.details.qualifier, referenceDate: statistic.details.reference_date,
    displayDivisor: statistic.details.display_divisor }
}
export function adaptSection(section: LocalizedContent<'page_section'>) {
  return { id: section.item.id, key: section.details.section_key, type: section.details.section_type,
    title: section.translation.title, summary: section.translation.summary, body: section.translation.body,
    content: section.translation.content, settings: section.details.settings }
}
export function adaptHeroMedia(hero: LocalizedContent<'hero_media'>) {
  return { id: hero.item.id, assetId: hero.details.asset_id, posterAssetId: hero.details.poster_asset_id,
    mobileAssetId: hero.details.mobile_asset_id, alt: hero.translation.alt_text,
    focalPoint: { x: hero.details.focal_point_x, y: hero.details.focal_point_y } }
}

