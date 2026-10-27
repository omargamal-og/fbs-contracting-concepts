import { useCallback, useEffect, useState } from 'react'
import { getPublicHomepage } from '../content/publicContent'
import { adaptPublishedHomepage } from '../v2/content/loadHomepage'
import { emptyHomepage, type HomepageView, type StatisticView } from '../v2/content/model'
import type { SiteLanguage } from '../i18n/types'
export type V3HomepageView=HomepageView&{reviewStatistics?:StatisticView[]}
export type V3Content={data:V3HomepageView;status:'loading'|'ready'|'unavailable'|'error'}
export function useHomepageContent(language:SiteLanguage){
 const [revision,setRevision]=useState(0),[loaded,setLoaded]=useState<{key:string;value:V3Content}>()
 const key=language+':'+revision
 useEffect(()=>{
  const controller=new AbortController()
  const deadline=window.setTimeout(()=>{controller.abort();setLoaded({key,value:{data:emptyHomepage(language),status:'error'}})},8000)
  async function load():Promise<V3Content>{
   const review=import.meta.env.DEV?(await import('./reviewStatistics.development')).reviewStatistics(language):undefined
   const result=await getPublicHomepage({language,signal:controller.signal})
   if(result.status==='ready'){
    const data=await adaptPublishedHomepage(result.data,language,controller.signal)
    // Preserve CMS city keys for the V3 city-level map without changing V2's adapter.
    data.projects=data.projects.map(project=>({...project,cityKey:result.data.projects.find(row=>row.item.id===project.id)?.details.city_key??null}))
    data.news.sort((a,b)=>(Date.parse(b.date??'')||0)-(Date.parse(a.date??'')||0));return {data:{...data,reviewStatistics:review},status:'ready'}
   }
   const data=emptyHomepage(language)
   if(import.meta.env.DEV){const fixture=await import('./developmentProjects');data.projects=fixture.developmentProjects(language);data.source='development'}
   // Approved statistics/news stay separate from the explicitly requested DEV review.
   return {data:{...data,reviewStatistics:review},status:result.status==='error'?'error':'unavailable'}
  }
  void load().then(value=>{if(!controller.signal.aborted)setLoaded({key,value})}).catch(()=>{if(!controller.signal.aborted)setLoaded({key,value:{data:emptyHomepage(language),status:'error'}})}).finally(()=>window.clearTimeout(deadline))
  return()=>{controller.abort();window.clearTimeout(deadline)}
 },[language,key])
 return {content:loaded?.key===key?loaded.value:{data:emptyHomepage(language),status:'loading'} as V3Content,retry:useCallback(()=>setRevision(v=>v+1),[])}
}
