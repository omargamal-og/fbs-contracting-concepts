import { getPublicContent, getPublicHomepage, getPublicMediaVariants } from '../../content/publicContent'
import { adaptHeroMedia, adaptProject, adaptSection, adaptStatistic } from '../../content/adapters'
import type { Language } from '../../content/database.types'
import type { ContentResult, HomepageContent, LocalizedContent } from '../../content/types'
import { emptyHomepage, safeLinkedInUrl, type HomepageState, type HomepageView, type MediaRef } from './model'
const records = <T>(result: ContentResult<T[]>) => result.status === 'ready' ? result.data : []
export function publishedMedia(record: LocalizedContent<'media_asset'>): MediaRef | undefined {
  if (record.item.publication_status !== 'published' || record.item.approval_status !== 'approved' || !record.details.object_path || record.details.media_type === 'document') return undefined
  return {id:record.item.id,type:record.details.media_type,alt:record.translation.alt_text??record.translation.title,
    width:record.details.width??undefined,height:record.details.height??undefined,record}
}
export async function adaptPublishedHomepage(home: HomepageContent, language: Language, signal: AbortSignal): Promise<HomepageView> {
  const request = {language,signal}
  const [assetResult,galleryResult,settingsResult,variantResult] = await Promise.all([
    getPublicContent('media_asset',request),getPublicContent('project_media',request),getPublicContent('site_settings',request),getPublicMediaVariants(request),
  ])
  const media = new Map<string,MediaRef>()
  for (const asset of records(assetResult)) {
    const ref = publishedMedia(asset)
    if (ref) {
      ref.variants = records(variantResult).filter(variant=>variant.asset_id === asset.item.id).map(variant=>({key:variant.variant_key,width:variant.width,mime:variant.mime_type,record:{...asset,details:{...asset.details,object_path:variant.object_path,mime_type:variant.mime_type}}}))
      media.set(ref.id,ref)
    }
  }
  const sections = home.sections.map(adaptSection)
  function section(key: string) {
    const value = sections.find(row=>row.key === key)
    return {title:value?.title??'',summary:value?.summary??'',body:value?.body??undefined}
  }
  const settings = records(settingsResult)[0]?.details
  const sectorLabels = new Map(home.sectors.map(sector=>[sector.item.id,sector.translation.title]))
  const gallery = records(galleryResult)
  return {
    language,source:'published',hero:section('hero'),company:section('companyIntroduction'),expertise:section('capabilities'),
    heroMedia:home.hero.flatMap(row=>{
      const hero=adaptHeroMedia(row),asset=media.get(hero.assetId)
      return asset ? [{id:hero.id,media:asset,poster:hero.posterAssetId?media.get(hero.posterAssetId):undefined,mobile:hero.mobileAssetId?media.get(hero.mobileAssetId):undefined,focalPoint:hero.focalPoint}] : []
    }),
    services:home.services.map(row=>({id:row.item.id,title:row.translation.title,summary:row.translation.summary??row.translation.body??''})),
    statistics:home.statistics.filter(row=>row.item.publication_status === 'published' && row.item.approval_status === 'approved' && row.details.reference_date).map(row=>{
      const stat=adaptStatistic(row)
      return {id:stat.id,label:stat.label,value:stat.value,unit:stat.unit,qualifier:stat.qualifier,divisor:stat.displayDivisor,referenceDate:stat.referenceDate}
    }),
    projects:home.projects.map(row=>{
      const project=adaptProject(row)
      const items=gallery.filter(image=>image.details.project_id === project.id)
      const cover=items.find(image=>image.details.media_role === 'cover')??items[0]
      return {...project,name:project.name,location:project.location,category:project.sectorId?sectorLabels.get(project.sectorId)??null:null,
        summary:row.translation.summary,image:cover?media.get(cover.details.asset_id):undefined,
        gallery:items.flatMap(image=>{const ref=media.get(image.details.asset_id);return ref?[ref]:[]}),
        coordinates:row.details.coordinate_source?.trim() && row.details.location_precision !== 'unknown'?project.coordinates:null,
        period:project.constructionPeriod,deliveryStatus:project.deliveryStatus,published:true}
    }),
    news:home.news.map(row=>({id:row.item.id,slug:row.item.slug,title:row.translation.title,excerpt:row.translation.summary??'',body:row.translation.body??'',date:row.details.article_date,
      image:row.details.cover_asset_id?media.get(row.details.cover_asset_id):undefined,linkedinUrl:safeLinkedInUrl(row.details.linkedin_original_url)})),
    sustainability:section('sustainability'),vision:section('vision2030'),
    contact:{email:settings?.contact_email??null,phone:settings?.contact_phone??null,socials:settings?.social_links && typeof settings.social_links === 'object' && !Array.isArray(settings.social_links)
      ? Object.entries(settings.social_links).flatMap(([name,value])=>typeof value === 'string' && /^https:\/\//.test(value)?[{name,url:value}]:[]) : []},
  }
}
export async function loadV2Homepage(language: Language, signal: AbortSignal): Promise<HomepageState> {
  const result=await getPublicHomepage({language,signal})
  if (signal.aborted) return {status:'loading'}
  if (result.status === 'ready') return {status:'ready',data:await adaptPublishedHomepage(result.data,language,signal),backend:'published'}
  // Vite removes this entire dynamic import and its local business/media fixtures in production.
  if (import.meta.env.DEV) {
    const {developmentHomepage}=await import('./fixtures.development')
    return {status:'ready',data:developmentHomepage(language),backend:result.status === 'error'?'error':'unavailable'}
  }
  return {status:'ready',data:emptyHomepage(language),backend:result.status === 'error'?'error':'unavailable'}
}

