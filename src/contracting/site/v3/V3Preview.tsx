import { useEffect, useRef, useState } from 'react'
import LanguageProvider from '../i18n/LanguageProvider'
import { useLanguage } from '../i18n/useLanguage'
import type { SiteLanguage } from '../i18n/types'
import type { NewsView, ProjectView } from '../v2/content/model'
import { copy, MEDIA } from './content'
import CenteredNavigation from './CenteredNavigation'
import CinematicHero from './CinematicHero'
import { FeaturedProjects } from './FeaturedProjects'
import { V3Image } from './Image'
import { useHomepageContent } from './useHomepageContent'
import { useHomepageMotion } from './motion'
import { ClosingSection, CompanySection, DetailDialog, ExpertiseSection, ImageReveal, ImpactSection, NewsSection, SustainabilitySection } from './HomeSections'
import { useV3Scroll } from './useV3Scroll'
import { CorporateFooter } from './CorporateFooter'
import { SaudiProjectMap } from './map/SaudiProjectMap'
import { Arrow } from './icons'
import './styles.css'
import './premium.css'
import './expansive.css'
import './completion.css'
import './map/map.css'
import './visual.css'
import './signature.css'
import './map/world.css'
import './navigation-redesign.css'
function Experience(){
 const {language,direction}=useLanguage(),t=copy(language),root=useRef<HTMLDivElement>(null),image=useRef<HTMLDivElement>(null)
 const {content,retry}=useHomepageContent(language),data=content.data
 const detailReturn=useRef<HTMLElement|null>(null)
 const [detail,setDetail]=useState<{kind:'project';item:ProjectView}|{kind:'news';item:NewsView}>()
 useEffect(()=>{const previous={lang:document.documentElement.lang,dir:document.documentElement.dir,title:document.title};document.documentElement.lang=language;document.documentElement.dir=direction;document.title=language==='ar'?'FBS للمقاولات | معاينة الموقع':'FBS Contracting | Corporate preview';try{localStorage.setItem('fbs-v3-language',language)}catch{/* Optional preference. */}return()=>{document.documentElement.lang=previous.lang;document.documentElement.dir=previous.dir;document.title=previous.title}},[language,direction])
 useV3Scroll(root)
 useHomepageMotion(root,image,language+':'+content.status+':'+data.projects.length)
 return <div ref={root} className="fbs-v3" dir={direction} lang={language} id="v3-top">
  <a className="v3-skip" href="#v3-main">{t.skip}</a>
  <div className="v3-persistent-image" ref={image} aria-hidden="true"><picture><source media="(max-width:767px)" srcSet={MEDIA+'construction-background-mobile.webp'}/><img src={MEDIA+'construction-background.webp'} alt="" width="2000" height="1126"/></picture><div className="v3-image-wash"/></div>
  <CenteredNavigation t={t} data={data} onNews={item=>{detailReturn.current=root.current?.querySelector<HTMLElement>(window.matchMedia('(min-width:1280px)').matches?'[data-v3-group=news]':'.v3-mobile-toggle')??null;setDetail({kind:'news',item})}}/>
  <div className="v3-page" data-v3-page><CinematicHero t={t} language={language}/><main id="v3-main" className="v3-main">
   <ImpactSection t={t} data={data}/>
   <CompanySection t={t} data={data}/>
   <ImageReveal t={t}/>
   <ExpertiseSection t={t} data={data}/>
   <FeaturedProjects t={t} data={data}/>
   <SaudiProjectMap language={language} projects={data.projects} preview={import.meta.env.DEV&&data.source==='development'}/>
   <ImageReveal t={t} second/>
   <SustainabilitySection t={t} data={data}/>
   <NewsSection t={t} data={data} onOpen={item=>setDetail({kind:'news',item})}/>
   <ClosingSection t={t} language={language}/>
   {content.status==='error'&&<div className="v3-content-notice" role="status">{t.error}<button onClick={retry}>{t.retry}</button></div>}
  </main><CorporateFooter t={t} data={data}/></div>
  {detail&&<DetailDialog t={t} title={detail.kind==='project'?detail.item.name:detail.item.title} onClose={()=>{setDetail(undefined);const target=detailReturn.current;detailReturn.current=null;if(target)requestAnimationFrame(()=>target.focus({preventScroll:true}))}}>
   {detail.kind==='project'?<><V3Image media={detail.item.image} alt={detail.item.name} eager/>{!detail.item.published&&<p className="v3-project-preview">{t.projectPreview}</p>}{detail.item.location&&<p className="v3-dialog-location">{t.location+' · '+detail.item.location}</p>}{detail.item.summary&&<p className="v3-lead">{detail.item.summary}</p>}</>:<><V3Image media={detail.item.image} alt={detail.item.title} eager/>{detail.item.date&&<time dateTime={detail.item.date}>{new Intl.DateTimeFormat(language,{dateStyle:'long'}).format(new Date(detail.item.date+'T00:00:00Z'))}</time>}<p className="v3-lead">{detail.item.excerpt}</p><div className="v3-article-body">{detail.item.body.split(/\n\s*\n/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div>{detail.item.linkedinUrl&&<a className="v3-link" href={detail.item.linkedinUrl} target="_blank" rel="noopener noreferrer">{t.originalPost}<Arrow/></a>}</>}
  </DetailDialog>}
 </div>
}
function preferredLanguage():SiteLanguage{const lang=new URLSearchParams(window.location.search).get('lang');if(lang==='en'||lang==='ar')return lang;try{return localStorage.getItem('fbs-v3-language')==='ar'?'ar':'en'}catch{return 'en'}}
export default function V3Preview(){const [initialLanguage]=useState(preferredLanguage);return <LanguageProvider initialLanguage={initialLanguage}><Experience/></LanguageProvider>}
