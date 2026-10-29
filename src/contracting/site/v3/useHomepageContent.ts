import { useCallback, useEffect, useState } from 'react'
import { getPublicHomepage } from '../content/publicContent'
import { adaptPublishedHomepage } from '../v2/content/loadHomepage'
import { emptyHomepage, type HomepageView, type NewsView, type ServiceView, type StatisticView } from '../v2/content/model'
import type { SiteLanguage } from '../i18n/types'
import { developmentProjects } from './developmentProjects'
import { reviewStatistics } from './reviewStatistics.development'
import { getConsolidationDemo } from './consolidationDemo.development'
import type { MapProject } from './map/model'
export type V3HomepageView=HomepageView&{reviewStatistics?:StatisticView[];demoNews?:NewsView[];demoServices?:ServiceView[];demoContent?:boolean}
export type V3Content={data:V3HomepageView;status:'loading'|'ready'|'unavailable'|'error'}
function demoFallback(language:SiteLanguage,status:'unavailable'|'error'):V3Content{
 const data=emptyHomepage(language),editorial=getConsolidationDemo(language)
 data.projects=developmentProjects(language);data.source='development'
 const demoNews:NewsView[]=editorial.news.map(item=>({id:item.id,slug:item.id,title:item.title,excerpt:item.excerpt,body:item.body,date:null,linkedinUrl:null}))
 const demoServices:ServiceView[]=editorial.services.map(item=>({...item}))
 return {data:{...data,reviewStatistics:reviewStatistics(language),demoNews,demoServices,demoContent:true},status}
}
export function useHomepageContent(language:SiteLanguage){
 const [revision,setRevision]=useState(0),[loaded,setLoaded]=useState<{key:string;value:V3Content}>()
 const key=language+':'+revision
 useEffect(()=>{
  const controller=new AbortController()
  const deadline=window.setTimeout(()=>{controller.abort();setLoaded({key,value:demoFallback(language,'error')})},8000)
  async function load():Promise<V3Content>{
   const review=reviewStatistics(language)
   const result=await getPublicHomepage({language,signal:controller.signal})
   if(result.status==='ready'){
    const data=await adaptPublishedHomepage(result.data,language,controller.signal)
    // Preserve CMS city keys for the V3 city-level map without changing V2's adapter.
    data.projects=data.projects.map(project=>({...project,cityKey:result.data.projects.find(row=>row.item.id===project.id)?.details.city_key??null}))
    const publicProjectSlugs=new Set(data.projects.map(project=>project.slug))
    data.news.sort((a,b)=>(Date.parse(b.date??'')||0)-(Date.parse(a.date??'')||0))
    const editorial=getConsolidationDemo(language)
    const demoNews:NewsView[]=editorial.news.map(item=>({id:'demo-'+item.id,slug:item.id,title:item.title,excerpt:item.excerpt,body:item.body,date:null,linkedinUrl:null}))
    const demoServices:ServiceView[]=data.services.length?[]:editorial.services.map(item=>({...item}))
    const profileRecords=developmentProjects(language)
    const bySlug=new Map<string,MapProject>(data.projects.map(project=>[project.slug,project as MapProject]))
    for(const profile of profileRecords){
     const current=bySlug.get(profile.slug)
     if(current){
      // Enrich a public record with profile-sourced facts when a field is absent;
      // keep its CMS publication state and all populated approved values intact.
      bySlug.set(profile.slug,{...profile,...current,category:current.category||profile.category,summary:current.summary||profile.summary,
       image:current.image||profile.image,period:current.period||profile.period,units:current.units||profile.units,
       cityKey:current.cityKey||profile.cityKey,published:current.published})
     }else bySlug.set(profile.slug,profile)
    }
    data.projects=[...bySlug.values()]
    const demoProjects=profileRecords.filter(project=>!publicProjectSlugs.has(project.slug))
    return {data:{...data,reviewStatistics:review,demoNews,demoServices,demoContent:Boolean(demoNews.length||demoServices.length||demoProjects.length||!data.statistics.length)},status:'ready'}
   }
   return demoFallback(language,result.status==='error'?'error':'unavailable')
  }
  void load().then(value=>{if(!controller.signal.aborted)setLoaded({key,value})}).catch(()=>{if(!controller.signal.aborted)setLoaded({key,value:demoFallback(language,'error')})}).finally(()=>window.clearTimeout(deadline))
  return()=>{controller.abort();window.clearTimeout(deadline)}
 },[language,key])
 return {content:loaded?.key===key?loaded.value:{data:emptyHomepage(language),status:'loading'} as V3Content,retry:useCallback(()=>setRevision(v=>v+1),[])}
}
