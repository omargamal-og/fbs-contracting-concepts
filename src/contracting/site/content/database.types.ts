// Hand-authored from versioned migrations. Regenerate/compare against a LOCAL Supabase
// instance before hosted rollout (see docs/supabase-foundation.md). Public schema only.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
export type Language = 'ar' | 'en'
export type PublicationStatus = 'draft' | 'in_review' | 'published' | 'archived'
export type ApprovalStatus = 'unreviewed' | 'approved' | 'rejected'
export type DeliveryStatus = 'unspecified' | 'planned' | 'in_progress' | 'completed' | 'on_hold'
export type ContentKind = 'site_settings' | 'page' | 'page_section' | 'navigation_item' | 'service' | 'sector' | 'project' | 'project_media' | 'statistic' | 'hero_media' | 'news' | 'job_opening' | 'media_asset'
type Table<Row, Required extends keyof Row> = {
  Row: Row
  Insert: Partial<Row> & Pick<Row, Required>
  Update: Partial<Row>
  Relationships: []
}
type Detail<K extends ContentKind> = { id: string; kind: K }
export type ContentItem = {
  id: string; kind: ContentKind; slug: string; publication_status: PublicationStatus
  approval_status: ApprovalStatus; approved_by: string | null; approved_at: string | null
  published_at: string | null; expires_at: string | null; sort_order: number
  created_at: string; updated_at: string
}
export type Translation = {
  content_id: string; language_code: Language; title: string; summary: string | null; body: string | null
  location_label: string | null; alt_text: string | null; seo_title: string | null; seo_description: string | null; content: Json
}
export type Project = Detail<'project'> & {
  sector_id: string | null; city_key: string | null; delivery_status: DeliveryStatus
  start_year: number | null; end_year: number | null; units_count: number | null; units_type: 'apartments' | 'villas' | null
  latitude: number | null; longitude: number | null; coordinates_verified: boolean
  location_precision: 'unknown' | 'city' | 'approximate' | 'site'; coordinate_source: string | null
}
export type MediaAsset = Detail<'media_asset'> & {
  media_type: 'image' | 'video' | 'document'; bucket_id: 'site-media'; object_path: string | null
  mime_type: string | null; width: number | null; height: number | null; duration_seconds: number | null; byte_size: number | null
}
export type Database = {
  public: {
    Tables: {
      languages: Table<{ code: Language; direction: 'ltr' | 'rtl' }, 'code' | 'direction'>
      content_items: Table<ContentItem, 'kind' | 'slug'>
      content_translations: Table<Translation, 'content_id' | 'language_code' | 'title'>
      site_settings: Table<Detail<'site_settings'> & { singleton: boolean; contact_email: string | null; contact_phone: string | null; default_language: Language; social_links: Json }, 'id'>
      pages: Table<Detail<'page'> & { route_path: string }, 'id' | 'route_path'>
      page_sections: Table<Detail<'page_section'> & { page_id: string; section_key: string; section_type: 'hero' | 'introduction' | 'services' | 'sectors' | 'projects' | 'map' | 'statistics' | 'news' | 'editorial' | 'contact'; settings: Json }, 'id' | 'page_id' | 'section_key' | 'section_type'>
      navigation_items: Table<Detail<'navigation_item'> & { parent_id: string | null; page_id: string | null; external_url: string | null }, 'id'>
      services: Table<Detail<'service'>, 'id'>
      sectors: Table<Detail<'sector'>, 'id'>
      projects: Table<Project, 'id'>
      project_services: Table<{ project_id: string; service_id: string }, 'project_id' | 'service_id'>
      media_assets: Table<MediaAsset, 'id' | 'media_type'>
      media_variants: Table<{ id: string; asset_id: string; variant_key: string; object_path: string; mime_type: string; width: number | null; height: number | null; byte_size: number | null }, 'asset_id' | 'variant_key' | 'object_path' | 'mime_type'>
      project_media: Table<Detail<'project_media'> & { project_id: string; asset_id: string; media_role: 'cover' | 'gallery' | 'video' }, 'id' | 'project_id' | 'asset_id'>
      statistics: Table<Detail<'statistic'> & { value: number; unit: string | null; qualifier: 'exact' | 'plus' | 'approximately'; display_divisor: number; reference_date: string | null }, 'id' | 'value'>
      hero_media: Table<Detail<'hero_media'> & { page_id: string; asset_id: string; poster_asset_id: string | null; mobile_asset_id: string | null; focal_point_x: number; focal_point_y: number }, 'id' | 'page_id' | 'asset_id'>
      news: Table<Detail<'news'> & { cover_asset_id: string | null; article_date: string | null; linkedin_original_url: string | null }, 'id'>
      job_openings: Table<Detail<'job_opening'> & { opens_at: string | null; closes_at: string | null }, 'id'>
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { publication_status: PublicationStatus; approval_status: ApprovalStatus; project_delivery_status: DeliveryStatus; content_kind: ContentKind }
    CompositeTypes: { [_ in never]: never }
  }
}
export type TableName = keyof Database['public']['Tables']
export type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row']

