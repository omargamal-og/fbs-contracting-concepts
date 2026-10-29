import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { contractingPath } from '../config/site'
import LanguageProvider from '../i18n/LanguageProvider'
import { useLanguage } from '../i18n/useLanguage'
import type { SiteLanguage } from '../i18n/types'
import { translations } from '../i18n/translations'
import type { NewsView, ProjectView } from '../v2/content/model'
import { copy, MEDIA, V3_BASE } from './content'
import { useHomepageContent } from './useHomepageContent'
import { useV3Scroll } from './useV3Scroll'
import CenteredNavigation from './CenteredNavigation'
import { CorporateFooter } from './CorporateFooter'
import { DetailDialog } from './HomeSections'
import { SaudiProjectMap } from './map/SaudiProjectMap'
import { V3Image } from './Image'
import { Arrow } from './icons'
import { OFFICIAL_LINKEDIN, upgradeCopy } from './upgradeContent'
import { governancePolicies } from './navigationReadiness'
import { v3Brand } from './branding'
import { getConsolidationDemo } from './consolidationDemo.development'
import nawafImage from '../assets/images/team/uniform/nawaf-binshuail.png'
import waelImage from '../assets/images/team/uniform/wael-darkazanli.png'
import ahmedImage from '../assets/images/team/uniform/ahmed-talat.png'
import mashaelImage from '../assets/images/team/uniform/mashael-alraqaib.png'
import nasserImage from '../assets/images/team/uniform/nasser-yaseen.png'
import khaledImage from '../assets/images/team/uniform/khaled-mansour.png'
import './styles.css'
import './premium.css'
import './expansive.css'
import './completion.css'
import './map/map.css'
import './visual.css'
import './signature.css'
import './map/world.css'
import './navigation-redesign.css'
import './consolidated-pages.css'

export type ConsolidatedPageId='company'|'what-we-do'|'approach'|'projects'|'news'|'governance'
type DemoArticle={id:string;title:string;category:string;excerpt:string;body:string}
const teamImages:Record<string,string>={nawaf:nawafImage,wael:waelImage,ahmed:ahmedImage,mashael:mashaelImage,nasser:nasserImage,khaled:khaledImage}
const visualImages=[MEDIA+'company-collaboration.webp',MEDIA+'hero-02-poster.jpg',MEDIA+'construction-structure.webp',MEDIA+'construction-background.webp',MEDIA+'architectural-detail.webp',MEDIA+'expertise-groundwork.webp']

function ConsolidatedPageView({page}:{page:ConsolidatedPageId}){
 const {language,direction}=useLanguage(),t=copy(language),u=upgradeCopy(language),dictionary=translations[language],inner=dictionary.innerPages
 const {content}=useHomepageContent(language),data=content.data
 const root=useRef<HTMLDivElement>(null),detailReturn=useRef<HTMLElement|null>(null)
 const [article,setArticle]=useState<NewsView|DemoArticle>()
 const [projectSearch,setProjectSearch]=useState('')
 const [projectCategory,setProjectCategory]=useState(()=>{
  const value=new URLSearchParams(window.location.search).get('category')
  return value==='residential'||value==='commercial'?value:'all'
 })
 const demo=getConsolidationDemo(language)
 const brand=v3Brand(language)
 const local=(path:string)=>{const url=new URL(path,window.location.origin);url.searchParams.set('lang',language);return url.pathname+url.search+url.hash}
 useV3Scroll(root)
 useEffect(()=>{
  const previous={lang:document.documentElement.lang,dir:document.documentElement.dir,title:document.title}
  document.documentElement.lang=language;document.documentElement.dir=direction
  const titles:Record<ConsolidatedPageId,string>={company:language==='en'?'Company':'الشركة','what-we-do':language==='en'?'What We Do':'ماذا نقدم',approach:language==='en'?'Our Approach':'نهجنا',projects:t.projects,news:t.news,governance:u.governance}
  document.title=titles[page]+' | '+brand.label
  return()=>{document.documentElement.lang=previous.lang;document.documentElement.dir=previous.dir;document.title=previous.title}
 },[language,direction,page,brand.label,t.projects,t.news,u.governance])
 const company=inner.about,vision=company.visionMission,team=company.ourTeam,services=data.services.length?data.services:demo.services??t.services.map((title,index)=>({id:'capability-'+index,title,summary:t.servicesDescription}))
 const news:({kind:'published';item:NewsView}|{kind:'demo';item:DemoArticle})[]=data.news.length?data.news.map(item=>({kind:'published',item})):demo.news.map(item=>({kind:'demo',item}))
 const projectCards=data.projects
 const filteredProjectCards=projectCards.filter(project=>{
  const matchesCategory=projectCategory==='all'||project.category===projectCategory
  const query=projectSearch.trim().toLocaleLowerCase(language)
  const matchesSearch=!query||[project.name,project.location,project.summary,project.slug,project.category].some(value=>value?.toLocaleLowerCase(language).includes(query))
  return matchesCategory&&matchesSearch
 })
 const titles:Record<ConsolidatedPageId,string>={company:u.company,'what-we-do':u.whatWeDo,approach:u.ourApproach,projects:t.projects,news:t.news,governance:u.governance}
 const intros:Record<ConsolidatedPageId,string>={company:t.description,'what-we-do':t.servicesDescription,approach:t.sustainabilityContent.description,projects:t.projectDescription,news:t.menuNews,governance:u.governanceIntro}
 const heroImages:Record<ConsolidatedPageId,string>={company:MEDIA+'company-collaboration.webp','what-we-do':MEDIA+'expertise-groundwork.webp',approach:MEDIA+'construction-background.webp',projects:MEDIA+'construction-structure.webp',news:MEDIA+'architectural-detail.webp',governance:MEDIA+'construction-perspective.webp'}
 const textSection=(id:string,title:string,lead:string,body:string[],image:string,links?:{label:string;to:string}[])=><section className="v3-consolidated-section" id={id} key={id}><div className="v3-consolidated-section-copy"><p className="v3-eyebrow">FBS CONTRACTING</p><h2>{title}</h2><p className="v3-consolidated-lead">{lead}</p>{body.filter(Boolean).map((paragraph,index)=><p key={index}>{paragraph}</p>)}{links?.length&&<nav className="v3-consolidated-inline-links" aria-label={title}>{links.map(link=><Link key={link.to} to={local(link.to)}>{link.label}<Arrow/></Link>)}</nav>}</div><div className="v3-consolidated-section-visual"><V3Image src={image} alt={title}/><span className="v3-visual-label">{t.stockShort}</span></div></section>
 const anchors=page==='company'?[
  {label:language==='en'?'About FBS':'عن FBS',to:'#about'},
  {label:language==='en'?'Leadership':'القيادة',to:'#leadership'},
  {label:vision.title,to:'#vision-mission'},
  {label:language==='en'?'Our Values':'قيمنا',to:'#values'},
  {label:t.visionLink,to:contractingPath('about/saudi-vision-2030')},
  {label:u.governance,to:V3_BASE+'/governance'},
 ]:page==='what-we-do'?[{label:u.services,to:'#services'},{label:u.capabilities,to:'#capabilities'}]:page==='approach'?[{label:u.howWeDeliver,to:'#delivery'},{label:u.continuity,to:'#continuity'},{label:t.nav.sustainability,to:'#sustainability'},{label:t.nav.training,to:contractingPath('training')}]:page==='projects'?[{label:language==='en'?'Project directory':'دليل المشاريع',to:'#directory'},{label:mapCopyTitle(language),to:'#project-map'}]:page==='news'?[{label:language==='en'?'Latest stories':'أحدث الأخبار',to:'#latest'},{label:u.follow,to:OFFICIAL_LINKEDIN}]:[{label:language==='en'?'Governance overview':'نظرة عامة على الحوكمة',to:'#governance-overview'},{label:language==='en'?'Policy topics':'موضوعات السياسات',to:'#policy-topics'}]
 return <div className="fbs-v3 v3-consolidated" dir={direction} lang={language} ref={root} id="v3-top" data-consolidated-page={page}>
  <a className="v3-skip" href="#v3-main">{t.skip}</a><CenteredNavigation t={t} data={data} onNews={item=>{detailReturn.current=root.current?.querySelector<HTMLElement>('[data-v3-group=news]')??null;setArticle(item)}}/>
  <div data-v3-page><main className="v3-consolidated-main" id="v3-main">
   <header className="v3-consolidated-hero"><div className="v3-consolidated-hero-copy"><p className="v3-eyebrow">{dictionary.home.hero.eyebrow}</p><h1>{titles[page]}</h1><p>{intros[page]}</p><nav aria-label={t.navigation}>{anchors.map(anchor=>anchor.to.startsWith('http')?<a key={anchor.to} href={anchor.to} target="_blank" rel="noopener noreferrer">{anchor.label}<Arrow/></a>:anchor.to.startsWith('#')?<a key={anchor.to} href={anchor.to}>{anchor.label}<Arrow/></a>:<Link key={anchor.to} to={local(anchor.to)}>{anchor.label}<Arrow/></Link>)}</nav></div><div className="v3-consolidated-hero-visual"><V3Image src={heroImages[page]} alt="" eager/><span className="v3-visual-label">{t.stockShort}</span></div><span className="v3-consolidated-index">FBS / 0{['company','what-we-do','approach','projects','news','governance'].indexOf(page)+1}</span></header>
   {page==='company'&&<>
    {textSection('about',company.whoWeAre.title,company.whoWeAre.introduction,[company.whoWeAre.uniqueness,company.whoWeAre.values,company.whoWeAre.safety,company.whoWeAre.expertise,company.whoWeAre.closing],MEDIA+'company-collaboration.webp',[
     {label:inner.about.whyFbs.title,to:'#why-fbs'},{label:vision.title,to:'#vision-mission'},{label:t.visionLink,to:contractingPath('about/saudi-vision-2030')},{label:u.governance,to:V3_BASE+'/governance'},
    ])}
    <section className="v3-consolidated-block" id="leadership"><div className="v3-consolidated-heading"><p className="v3-eyebrow">{team.eyebrow}</p><h2>{team.leadershipTitle}</h2><p>{language==='en'?'Leadership messages and the wider team, brought together in one place.':'رسائل القيادة والفريق في مكان واحد.'}</p></div><div className="v3-consolidated-leadership">
     {[{id:'chairman',content:company.chairmanSpeech,image:MEDIA+'hero-02-poster.jpg'},{id:'ceo',content:company.ceoSpeech,image:MEDIA+'company-collaboration.webp'}].map(item=><article className="v3-leadership-message" id={item.id+'-message'} key={item.id}><V3Image src={item.image} alt="" eager/><div><p className="v3-eyebrow">{item.content.role}</p><h3>{item.content.title}</h3><p>{item.content.body[0]}</p><p>{item.content.name}</p></div></article>)}
    </div><div className="v3-team-grid">{team.members.map(member=><article className="v3-team-card" key={member.id}><img src={teamImages[member.id]} alt={member.name} loading="lazy"/><div><h3>{member.name}</h3><p>{member.role}</p></div></article>)}</div></section>
    {textSection('why-fbs',inner.about.whyFbs.title,company.whoWeAre.closing,inner.about.whyFbs.features.map(item=>item.title+': '+item.description),MEDIA+'construction-structure.webp')}
    {textSection('vision-mission',vision.title,vision.vision.description,[vision.mission.description,vision.objectives.title],MEDIA+'architectural-detail.webp')}
    <section className="v3-consolidated-block" id="values"><div className="v3-consolidated-heading"><p className="v3-eyebrow">{dictionary.home.values.eyebrow}</p><h2>{dictionary.home.values.titleLine1} {dictionary.home.values.titleLine2}</h2><p>{dictionary.home.values.description}</p></div><div className="v3-consolidated-value-grid">{Object.values(dictionary.home.values.items).map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
    <section className="v3-consolidated-feature" id="saudi-vision"><V3Image src={MEDIA+'construction-background.webp'} alt="" eager/><div><p className="v3-eyebrow">{dictionary.home.vision2030.eyebrow}</p><h2>{dictionary.home.vision2030.titleLine1} {dictionary.home.vision2030.titleLine2}</h2><p>{dictionary.home.vision2030.description}</p><Link className="v3-link" to={local(contractingPath('about/saudi-vision-2030'))}>{t.visionLink}<Arrow/></Link></div></section>
   </>}
   {page==='what-we-do'&&<>
    <section className="v3-consolidated-block" id="services"><div className="v3-consolidated-heading"><p className="v3-eyebrow">{u.services}</p><h2>{dictionary.home.capabilities.titleLine1} {dictionary.home.capabilities.titleLine2}</h2><p>{data.source==='published'&&data.expertise.summary?data.expertise.summary:dictionary.home.capabilities.description}</p></div><div className="v3-consolidated-service-grid">{services.map((service,index)=><article className="v3-consolidated-service" key={service.id}><div className="v3-consolidated-service-image"><V3Image src={visualImages[index%visualImages.length]} alt="" eager/><span>0{index+1}</span></div><div><p className="v3-eyebrow">{u.services}</p><h3>{service.title}</h3><p>{service.summary||t.servicesDescription}</p></div></article>)}</div></section>
    <section className="v3-consolidated-block v3-capabilities-block" id="capabilities"><div className="v3-consolidated-heading"><p className="v3-eyebrow">{u.capabilities}</p><h2>{u.capabilityTitle}</h2><p>{data.expertise.summary||t.servicesDescription}</p></div><div className="v3-capability-steps">{(demo?.services.slice(0,4)??dictionary.home.capabilities.items.slice(0,4).map((title,index)=>({id:String(index),title,summary:t.servicesDescription}))).map((item,index)=><article key={item.id}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.summary}</p></article>)}</div></section>
   </>}
   {page==='approach'&&<>
    <section className="v3-consolidated-block" id="delivery"><div className="v3-consolidated-heading"><p className="v3-eyebrow">{u.howWeDeliver}</p><h2>{inner.about.whoWeAre.title}</h2><p>{inner.about.whoWeAre.introduction}</p></div><div className="v3-approach-principles">{[
     {id:'safety',title:u.safety,description:inner.about.whoWeAre.safety,image:MEDIA+'hero-02-poster.jpg',to:contractingPath('about/core-values')},
     {id:'quality',title:u.quality,description:inner.sustainability.continuousImprovement.introduction,image:MEDIA+'construction-structure.webp',to:contractingPath('sustainability/continuous-improvement')},
     {id:'training',title:inner.training.title,description:inner.training.introduction,image:MEDIA+'company-collaboration.webp',to:contractingPath('training')},
     {id:'business-continuity-card',title:u.continuity,description:inner.businessContinuity.riskAssessment.introduction,image:MEDIA+'architectural-detail.webp',to:V3_BASE+'/approach#continuity'},
    ].map(item=><article id={item.id} key={item.title}><V3Image src={item.image} alt="" eager/><div><h3>{item.title}</h3><p>{item.description}</p><Link className="v3-link" to={local(item.to)}>{u.exploreTopic}<Arrow/></Link></div></article>)}</div>
    </section>
    <section className="v3-consolidated-block v3-continuity-section" id="continuity"><div className="v3-consolidated-heading"><p className="v3-eyebrow">{u.continuity}</p><h2>{inner.businessContinuity.riskAssessment.focusTitle}</h2><p>{inner.businessContinuity.riskAssessment.introduction}</p></div><div className="v3-continuity-topics">{[
      {id:'risk-assessment-management',content:inner.businessContinuity.riskAssessment},
      {id:'business-impact-analysis',content:inner.businessContinuity.businessImpactAnalysis},
      {id:'plan-development',content:inner.businessContinuity.planDevelopment},
      {id:'recovery-restoration',content:inner.businessContinuity.recoveryRestoration},
      {id:'leadership-accountability',content:inner.businessContinuity.leadershipAccountability},
     ].map(({id,content})=><article id={id} key={id}><p className="v3-eyebrow">{content.eyebrow}</p><h3>{content.title}</h3><p>{content.introduction}</p><details><summary>{content.focusTitle}</summary><ul>{content.focusAreas.map(area=><li key={area.title}><strong>{area.title}</strong><span>{area.description}</span></li>)}</ul><p>{content.closing}</p></details></article>)}</div></section>
    <section className="v3-consolidated-block" id="sustainability"><div className="v3-consolidated-heading"><p className="v3-eyebrow">{t.sustainabilityLabel}</p><h2>{dictionary.home.sustainability.titleLine1} {dictionary.home.sustainability.titleLine2}</h2><p>{data.sustainability.summary||dictionary.home.sustainability.description}</p></div><div className="v3-consolidated-value-grid">{Object.values(dictionary.home.sustainability.items).map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div><div className="v3-approach-principles v3-sustainability-topics">{[
     {id:'environmental-responsibility',content:inner.sustainability.environmental,image:MEDIA+'construction-background.webp'},
     {id:'social-responsibility',content:inner.sustainability.social,image:MEDIA+'company-collaboration.webp'},
     {id:'economic-responsibility',content:inner.sustainability.economic,image:MEDIA+'construction-structure.webp'},
     {id:'continuous-improvement',content:inner.sustainability.continuousImprovement,image:MEDIA+'expertise-groundwork.webp'},
    ].map(({id,content,image})=><article id={id} key={id}><V3Image src={image} alt="" eager/><div><h3>{content.title}</h3><p>{content.introduction}</p><details><summary>{'commitments' in content?content.commitmentsTitle:content.systemsTitle}</summary><ul>{'commitments' in content?content.commitments.map(item=><li key={item.title}><strong>{item.title}</strong><span>{item.description}</span></li>):content.systems.map(item=><li key={item.title}><strong>{item.title}</strong><span>{item.description}</span></li>)}</ul>{'steps' in content&&<><h4>{content.approachTitle}</h4><ul>{content.steps.map(item=><li key={item.title}><strong>{item.title}</strong><span>{item.description}</span></li>)}</ul></>}<p>{content.closing}</p></details></div></article>)}</div></section>
   </>}
   {page==='projects'&&<>
    <section className="v3-consolidated-block" id="directory"><div className="v3-consolidated-heading"><p className="v3-eyebrow">{t.featured}</p><h2>{t.featuredTitle}</h2><p>{t.projectDescription}</p></div><div className="v3-project-filters" role="group" aria-label={language==='en'?'Filter projects':'تصفية المشاريع'}><label className="v3-project-search"><span>{language==='en'?'Search projects':'ابحث في المشاريع'}</span><input type="search" value={projectSearch} onChange={event=>setProjectSearch(event.target.value)} placeholder={language==='en'?'Name, city or details':'الاسم أو المدينة أو التفاصيل'} /></label><div className="v3-project-filter-buttons">{(['all','residential','commercial'] as const).map(filter=><button type="button" key={filter} aria-pressed={projectCategory===filter} onClick={()=>setProjectCategory(filter)}>{filter==='all'?(language==='en'?'All projects':'كل المشاريع'):filter==='residential'?t.nav.residential:t.nav.commercial}</button>)}</div></div><div className="v3-project-directory">{filteredProjectCards.length?filteredProjectCards.map(project=><ProjectDirectoryCard key={project.id} project={project} language={language}/>):<p className="v3-project-no-results" role="status">{language==='en'?'No projects match this search.':'لا توجد مشاريع تطابق هذا البحث.'}</p>}</div></section>
    <section className="v3-consolidated-block v3-project-categories" aria-label={t.projects}><div className="v3-consolidated-heading"><p className="v3-eyebrow">{t.nav.ourProjects}</p><h2>{dictionary.home.projectCategories.titleLine1} {dictionary.home.projectCategories.titleLine2}</h2><p>{dictionary.home.projectCategories.description}</p></div><div className="v3-project-category-links"><article id="residential"><h3>{dictionary.home.projectCategories.residential.title}</h3><p>{dictionary.home.projectCategories.residential.description}</p><Link to={local(V3_BASE+'/projects?category=residential#directory')}>{u.viewCategory}<Arrow/></Link></article><article id="commercial"><h3>{dictionary.home.projectCategories.commercial.title}</h3><p>{dictionary.home.projectCategories.commercial.description}</p><Link to={local(V3_BASE+'/projects?category=commercial#directory')}>{u.viewCategory}<Arrow/></Link></article></div></section>
    <div id="project-map" className="v3-consolidated-map"><SaudiProjectMap language={language} projects={data.projects} preview={data.projects.some(project=>!project.published)}/></div>
   </>}
   {page==='news'&&<section className="v3-consolidated-block" id="latest"><div className="v3-consolidated-heading"><p className="v3-eyebrow">{u.newsLabel}</p><h2>{t.newsTitle}</h2><p>{t.menuNews}</p><a className="v3-link" href={OFFICIAL_LINKEDIN} target="_blank" rel="noopener noreferrer">{u.follow}<Arrow/></a></div>{news.length?<div className="v3-consolidated-news-grid">{news.map(({kind,item},index)=><button className="v3-news-story-card" id={'story-'+item.id} key={item.id} onClick={()=>{detailReturn.current=root.current?.querySelector<HTMLElement>('#story-'+item.id)??null;setArticle(item)}}><V3Image media={kind==='published'?item.image:undefined} src={visualImages[index%visualImages.length]} alt="" eager/><span className="v3-eyebrow">{kind==='published'?(item.date?new Intl.DateTimeFormat(language,{dateStyle:'long'}).format(new Date(item.date+'T00:00:00Z')):u.newsLabel):item.category}</span><h3>{item.title}</h3><p>{item.excerpt}</p><span className="v3-link">{t.readArticle}<Arrow/></span></button>)}</div>:<div className="v3-consolidated-news-empty"><V3Image src={MEDIA+'architectural-detail.webp'} alt="" eager/><div><h3>{u.newsEditorialTitle}</h3><p>{u.newsEditorialNote}</p><a className="v3-link" href={OFFICIAL_LINKEDIN} target="_blank" rel="noopener noreferrer">{u.follow}<Arrow/></a></div></div>}</section>}
   {page==='governance'&&<>
    <section className="v3-consolidated-block" id="governance-overview"><div className="v3-consolidated-heading"><p className="v3-eyebrow">{u.governance}</p><h2>{language==='en'?'A clear guide to governance topics':'دليل واضح لموضوعات الحوكمة'}</h2><p>{u.governanceOverview}</p></div></section>
    <section className="v3-consolidated-block" id="policy-topics"><div className="v3-consolidated-heading"><p className="v3-eyebrow">FBS CONTRACTING</p><h2>{language==='en'?'Governance topics':'موضوعات الحوكمة'}</h2></div><div className="v3-governance-topic-grid">{(demo?.governance??governancePolicies.map(policy=>({id:policy.slug,title:policy[language],summary:u.governanceTopicGeneral}))).map(topic=><article id={topic.id} key={topic.id}><span className="v3-governance-topic-mark" aria-hidden="true">↗</span><h3>{topic.title}</h3><p>{topic.summary}</p></article>)}</div></section>
   </>}
  </main><CorporateFooter t={t} data={data}/></div>
  {article&&<DetailDialog t={t} title={article.title} onClose={()=>{setArticle(undefined);const target=detailReturn.current;detailReturn.current=null;if(target)requestAnimationFrame(()=>target.focus({preventScroll:true}))}}><div className="v3-consolidated-article-image"><V3Image media={'image' in article?article.image:undefined} src={MEDIA+'architectural-detail.webp'} alt={article.title} eager/></div><p className="v3-lead">{article.excerpt}</p><div className="v3-article-body">{article.body.split(/\n\s*\n/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div>{'linkedinUrl' in article&&article.linkedinUrl&&<a className="v3-link" href={article.linkedinUrl} target="_blank" rel="noopener noreferrer">{t.originalPost}<Arrow/></a>}</DetailDialog>}
 </div>
}

function ProjectDirectoryCard({project,language}:{project:ProjectView;language:SiteLanguage}){
 const t=copy(language),u=upgradeCopy(language)
 const category=project.category==='residential'?(language==='en'?'Residential':'سكني'):project.category==='commercial'?(language==='en'?'Commercial':'تجاري'):t.projects
 return <Link className="v3-project-directory-card" to={V3_BASE+'/projects/'+encodeURIComponent(project.slug)+'?lang='+language}>{project.image?<V3Image media={project.image} alt={project.image.alt||project.name} eager/>:<div className="v3-project-no-image" aria-label={language==='en'?'Project image not included in the profile':'لا تتضمن بيانات الملف صورة للمشروع'}><span aria-hidden="true">FBS</span><small>{language==='en'?'Profile project':'مشروع من الملف التعريفي'}</small></div>}<div><p className="v3-eyebrow">{category} · {project.location||t.projects}{project.period?` · ${project.period.startYear}–${project.period.endYear}`:''}</p><h3>{project.name}</h3>{project.summary&&<p>{project.summary}</p>}<span className="v3-link">{u.viewCategory}<Arrow/></span></div></Link>
}
function mapCopyTitle(language:SiteLanguage){return language==='en'?'Saudi Arabia project map':'خريطة المشاريع في السعودية'}
export default function V3ConsolidatedPage({page}:{page:ConsolidatedPageId}){const [initial]=useState<SiteLanguage>(()=>new URLSearchParams(window.location.search).get('lang')==='ar'?'ar':'en');return <LanguageProvider initialLanguage={initial}><ConsolidatedPageView page={page}/></LanguageProvider>}
