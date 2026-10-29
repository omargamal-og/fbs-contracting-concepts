import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LanguageProvider from '../i18n/LanguageProvider'
import { useLanguage } from '../i18n/useLanguage'
import type { SiteLanguage } from '../i18n/types'
import type { NewsView } from '../v2/content/model'
import CenteredNavigation from './CenteredNavigation'
import { CorporateFooter } from './CorporateFooter'
import { DetailDialog } from './HomeSections'
import { V3Image } from './Image'
import { Arrow } from './icons'
import { copy, V3_BASE } from './content'
import { useHomepageContent } from './useHomepageContent'
import { useV3Scroll } from './useV3Scroll'
import './styles.css'
import './premium.css'
import './expansive.css'
import './completion.css'
import './map/map.css'
import './visual.css'
import './signature.css'

function ProjectPage(){
 const {slug}=useParams(),{language,direction}=useLanguage(),t=copy(language),{content,retry}=useHomepageContent(language)
 const root=useRef<HTMLDivElement>(null),[news,setNews]=useState<NewsView>()
 const project=content.data.projects.find(item=>item.slug===slug),back=V3_BASE+'?lang='+language+'#v3-projects'
 useV3Scroll(root)
 useEffect(()=>{const prior={lang:document.documentElement.lang,dir:document.documentElement.dir,title:document.title};document.documentElement.lang=language;document.documentElement.dir=direction;document.title=(project?.name??t.projects)+' | FBS Contracting';return()=>{document.documentElement.lang=prior.lang;document.documentElement.dir=prior.dir;document.title=prior.title}},[language,direction,project?.name,t.projects])
 return <div className="fbs-v3 v3-project-page" dir={direction} lang={language} ref={root} id="v3-top">
  <a className="v3-skip" href="#v3-main">{t.skip}</a><CenteredNavigation t={t} data={content.data} onNews={setNews}/>
  <div data-v3-page><main id="v3-main" className="v3-project-detail-main"><Link to={back} className="v3-link v3-project-back"><Arrow previous/>{t.featured}</Link>
   {project?<><div className="v3-project-detail-heading"><div><p className="v3-eyebrow">{project.location||t.projects}</p><h1 id="v3-project-detail-title">{project.name}</h1></div><span className="v3-project-detail-mark" aria-hidden="true">FBS / {t.projects}</span></div>
    {project.image&&<div className="v3-project-detail-image"><V3Image media={project.image} alt={project.image.alt||project.name} eager/></div>}
    <div className="v3-project-detail-facts"><span>{project.category==='residential'?(language==='en'?'Residential':'سكني'):project.category==='commercial'?(language==='en'?'Commercial':'تجاري'):t.projects}</span>{project.period&&<span>{language==='en'?'Period':'الفترة'} · {project.period.startYear}–{project.period.endYear}</span>}{project.units&&<span>{new Intl.NumberFormat(language).format(project.units.count)} {project.units.type==='apartments'?(language==='en'?'apartments':'شقة'):language==='en'?'villas':'فيلا'}</span>}</div>
    {project.summary&&<p className="v3-project-detail-summary">{project.summary}</p>}
    <Link to={back} className="v3-link">{t.featured}<Arrow/></Link>
   </>:content.status==='loading'?<p className="v3-project-detail-status" role="status">{language==='en'?'Loading project…':'جارٍ تحميل المشروع…'}</p>:<div className="v3-project-detail-status"><h1>{language==='en'?'Project not available':'المشروع غير متاح'}</h1><p>{t.projectsEmptyNote}</p>{content.status==='error'&&<button className="v3-link" onClick={retry}>{t.retry}</button>}</div>}
  </main><CorporateFooter t={t} data={content.data}/></div>
  {news&&<DetailDialog t={t} title={news.title} onClose={()=>setNews(undefined)}><V3Image media={news.image} alt={news.title} eager/><p className="v3-lead">{news.excerpt}</p><div className="v3-article-body">{news.body.split(/\n\s*\n/).map((p,index)=><p key={index}>{p}</p>)}</div>{news.linkedinUrl&&<a className="v3-link" href={news.linkedinUrl} target="_blank" rel="noopener noreferrer">{t.originalPost}<Arrow/></a>}</DetailDialog>}
 </div>
}
export default function ProjectDetails(){const [initial]=useState<SiteLanguage>(()=>new URLSearchParams(window.location.search).get('lang')==='ar'?'ar':'en');return <LanguageProvider initialLanguage={initial}><ProjectPage/></LanguageProvider>}
