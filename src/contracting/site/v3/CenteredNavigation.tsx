import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { contractingPath } from '../config/site'
import { useLanguage } from '../i18n/useLanguage'
import { gsap, useGSAP } from '../v2/motion/gsap'
import { useReducedMotion } from '../v2/motion/useReducedMotion'
import { MEDIA, V3_BASE, type V3Copy } from './content'
import { Arrow } from './icons'
import { MegaMenuCard, type MenuCardContent } from './MegaMenuCard'
import type { HomepageView, NewsView } from '../v2/content/model'
import { timing } from './motion'
import { premiumCopy } from './premiumCopy'
import { loginPortals } from './navigationReadiness'
import { v3Brand } from './branding'
import { OFFICIAL_LINKEDIN, upgradeCopy } from './upgradeContent'
import { mapCopy } from './map/copy'
import vision2030Logo from '../assets/images/about/saudi-vision-2030-official-logo.png'
type Group='company'|'whatwedo'|'approach'|'projects'|'news'
type Panel=Group|'login'
type MenuDestination={label:string;to:string;status?:string}
export default function CenteredNavigation({t,data,onNews}:{t:V3Copy;data:HomepageView;onNews:(item:NewsView)=>void}){
 const {language,setLanguage}=useLanguage(),reduced=useReducedMotion(),navigate=useNavigate(),location=useLocation()
 function switchLanguage(){const next=language==='en'?'ar':'en';close(false,true);setLanguage(next);const query=new URLSearchParams(location.search);query.set('lang',next);navigate({pathname:location.pathname,search:'?'+query.toString(),hash:location.hash},{replace:true,preventScrollReset:true})}
 const p=premiumCopy(language),u=upgradeCopy(language),brand=v3Brand(language),labels={company:t.company,whatwedo:u.whatWeDo,approach:u.ourApproach,projects:t.projects,news:t.news,login:p.login}
 const localized=(path:string)=>{const url=new URL(path,window.location.origin);url.searchParams.set('lang',language);return url.pathname+url.search+url.hash}
 const [active,setActive]=useState<Panel|null>(null),[scrolled,setScrolled]=useState(false)
 const root=useRef<HTMLElement>(null),panel=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement|null>(null)
 const closing=useRef<gsap.core.Tween|null>(null)
 const timer=useRef<number|null>(null),hoverRelease=useRef<number|null>(null),hoverBlocked=useRef(false),hovered=useRef(false),focusNext=useRef(false)
 const groups:Group[]=['company','whatwedo','approach','projects','news']
 const descriptions:Record<Group,string>={company:t.menuCompany,whatwedo:t.servicesDescription,approach:u.approachIntro,projects:t.menuProjects,news:t.menuNews}
 const destinations:Record<Group,string>={company:V3_BASE+'/company',whatwedo:V3_BASE+'/what-we-do',approach:V3_BASE+'/approach',projects:V3_BASE+'/projects',news:V3_BASE+'/news'}
 const latest=data.source==='published'?data.news.slice(0,3):[]
 const companyLinks:MenuDestination[]=[
  {label:t.nav.whoWeAre,to:V3_BASE+'/company#about'},
  {label:t.nav.ourTeam,to:V3_BASE+'/company#leadership'},
  {label:t.nav.visionMission,to:V3_BASE+'/company#vision-mission'},
  {label:t.visionLink,to:contractingPath('about/saudi-vision-2030')},
  {label:t.nav.coreValues,to:V3_BASE+'/company#values'},
  {label:u.governance,to:V3_BASE+'/governance'},
  {label:t.careers,to:contractingPath('careers')},
 ]
 const projectsLinks:MenuDestination[]=[
  {label:t.nav.residential,to:V3_BASE+'/projects#residential'},
  {label:t.nav.commercial,to:V3_BASE+'/projects#commercial'},
  {label:t.projects,to:V3_BASE+'/projects#directory'},
  {label:mapCopy(language).title,to:V3_BASE+'/projects#project-map'},
 ]
 const whatWeDoLinks:MenuDestination[]=[{label:u.services,to:V3_BASE+'/what-we-do#services'},{label:u.capabilities,to:V3_BASE+'/what-we-do#capabilities'},{label:u.procurement,to:contractingPath('suppliers')}]
 const approachLinks:MenuDestination[]=[
  {label:u.howWeDeliver,to:V3_BASE+'/approach#delivery'},
  {label:u.safetyQuality,to:V3_BASE+'/approach#safety'},
  {label:t.nav.sustainability,to:V3_BASE+'/approach#sustainability'},
  {label:u.continuity,to:V3_BASE+'/approach#continuity'},
  {label:t.nav.training,to:contractingPath('training')},
 ]
 const cards:Record<Group,MenuCardContent[]>={
  company:[
   {title:u.company,note:u.companyNote,to:V3_BASE+'/company#about',image:MEDIA+'company-collaboration.webp'},
   {title:t.nav.ourTeam,note:t.menuCompany,to:V3_BASE+'/company#leadership',image:MEDIA+'hero-02-poster.jpg'},
   {title:t.visionLink,note:u.companyNote,to:contractingPath('about/saudi-vision-2030'),image:vision2030Logo,imageFit:'contain'},
   {title:t.nav.coreValues,note:t.nav.visionMission,to:V3_BASE+'/company#values',image:MEDIA+'construction-structure.webp'},
  ],
  whatwedo:[
   {title:u.services,note:u.servicesNote,to:V3_BASE+'/what-we-do#services',image:MEDIA+'expertise-groundwork.webp'},
   {title:u.capabilities,note:u.companyNote,to:V3_BASE+'/what-we-do#capabilities',image:MEDIA+'construction-structure.webp'},
   {title:u.procurement,note:u.supplierRegistration,to:contractingPath('suppliers'),image:MEDIA+'hero-02-poster.jpg'},
  ],
  approach:[
   {title:u.safetyQuality,note:u.safetyNote,to:V3_BASE+'/approach#safety',image:MEDIA+'hero-02-poster.jpg'},
   {title:u.environment,note:u.environmentNote,to:V3_BASE+'/approach#sustainability',image:MEDIA+'construction-background.webp'},
   {title:u.continuity,note:u.continuityNote,to:V3_BASE+'/approach#continuity',image:MEDIA+'architectural-detail.webp'},
  ],
  projects:data.source==='published'&&data.projects.length?data.projects.slice(0,3).map(project=>({
   title:project.name,note:project.location||project.summary||u.projectNote,to:V3_BASE+'/projects/'+project.slug,
   media:project.image,image:MEDIA+'construction-structure.webp',
  })): [
   {title:t.nav.residential,note:u.projectNote,to:V3_BASE+'/projects#residential',image:MEDIA+'construction-structure.webp'},
   {title:t.nav.commercial,note:u.projectNote,to:V3_BASE+'/projects#commercial',image:MEDIA+'construction-background.webp'},
   {title:t.projects,note:t.menuProjects,to:V3_BASE+'/projects#directory',image:MEDIA+'architectural-detail.webp'},
   {title:mapCopy(language).title,note:t.menuProjects,to:V3_BASE+'/projects#project-map',image:MEDIA+'hero-01-poster.jpg'},
  ],
  news:latest.length?[...latest.map((item:NewsView):MenuCardContent=>({title:item.title,note:item.excerpt||t.menuNews,media:item.image,image:MEDIA+'architectural-detail.webp',to:V3_BASE+'/news#latest',action:()=>onNews(item)})),{title:u.follow,note:u.newsSource,href:OFFICIAL_LINKEDIN,image:MEDIA+'company-collaboration.webp'}]:[
   {title:t.newsTitle,note:u.newsNote,to:V3_BASE+'/news',image:MEDIA+'architectural-detail.webp'},
   {title:u.follow,note:u.newsSource,href:OFFICIAL_LINKEDIN,image:MEDIA+'company-collaboration.webp'},
  ],
 }
 function close(restore=false,immediate=false){
  hoverBlocked.current=true;if(hoverRelease.current)clearTimeout(hoverRelease.current);hoverRelease.current=window.setTimeout(()=>{hoverBlocked.current=false},600)
  const finish=()=>{setActive(null);if(restore)requestAnimationFrame(()=>trigger.current?.focus({preventScroll:true}))}
  closing.current?.kill()
  if(panel.current&&!reduced&&!immediate)closing.current=gsap.to(panel.current,{opacity:0,y:-14,duration:0.26,ease:'power2.in',onComplete:finish})
  else finish()
 }
 function open(group:Panel,button:HTMLButtonElement,focus=false,hover=false){
  closing.current?.kill();if(panel.current)gsap.set(panel.current,{clearProps:'opacity,transform'})
  if(timer.current)clearTimeout(timer.current);trigger.current=button;hovered.current=hover;focusNext.current=focus;if(active===group&&focus){panel.current?.querySelector<HTMLElement>('a[href],button')?.focus({preventScroll:true});focusNext.current=false}setActive(group)
 }
 const escape=useEffectEvent((event:globalThis.KeyboardEvent)=>{if(event.key==='Escape'&&!event.defaultPrevented){event.preventDefault();close(true)}})
 useEffect(()=>{const sync=()=>setScrolled(window.scrollY>50);sync();window.addEventListener('scroll',sync,{passive:true});return()=>window.removeEventListener('scroll',sync)},[])
 useLayoutEffect(()=>{
  if(!active)return
  const previous=document.body.style.overflow,padding=document.body.style.paddingRight,page=document.querySelector<HTMLElement>('[data-v3-page]'),header=root.current
  const scrollbar=window.innerWidth-document.documentElement.clientWidth
  if(scrollbar)document.body.style.setProperty('padding-right',scrollbar+'px')
  header?.style.setProperty('--v3-scrollbar',scrollbar+'px')
  document.body.style.setProperty('overflow','hidden');if(page)page.setAttribute('inert','')
  if(focusNext.current){requestAnimationFrame(()=>panel.current?.querySelector<HTMLElement>('a[href],button')?.focus({preventScroll:true}));focusNext.current=false}
  document.addEventListener('keydown',escape)
  return()=>{document.removeEventListener('keydown',escape);document.body.style.setProperty('overflow',previous);document.body.style.setProperty('padding-right',padding);header?.style.removeProperty('--v3-scrollbar');if(page)page.removeAttribute('inert')}
 },[active])
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);if(hoverRelease.current)clearTimeout(hoverRelease.current);closing.current?.kill()},[])
 useGSAP(()=>{
  if(!active||reduced)return
  gsap.fromTo(panel.current,{opacity:0,y:-22},{opacity:1,y:0,duration:timing.menu,ease:timing.ease})
  gsap.fromTo('[data-v3-menu-link]',{opacity:0,y:20},{opacity:1,y:0,duration:0.52,stagger:0.055,ease:timing.ease,delay:0.09})
  gsap.fromTo('.v3-menu-card,.v3-policy-row,.v3-login-option',{opacity:0,y:18},{opacity:1,y:0,duration:timing.change,stagger:0.06,ease:timing.ease,delay:0.12})
  gsap.fromTo('.v3-menu-card-visual',{clipPath:'inset(12% 0 0 round 16px)'},{clipPath:'inset(0% 0 0 round 16px)',duration:0.65,ease:timing.ease,delay:0.1})
 },{scope:root,dependencies:[active,language,reduced],revertOnUpdate:true})
 function keydown(event:KeyboardEvent<HTMLElement>){
  if(event.key==='Escape'&&active){event.preventDefault();close(true)}
  if(event.key==='Tab'&&active){const focusable=Array.from(root.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')??[]).filter(node=>node.getClientRects().length);const first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus({preventScroll:true})}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus({preventScroll:true})}}
 }
 const destinationLink=(item:MenuDestination)=><Link data-v3-menu-link key={item.label} to={localized(item.to)} onClick={()=>close(false,true)}><span className="v3-menu-link-label">{item.label}{item.status&&<small>{item.status}</small>}</span><Arrow/></Link>
 function navButton(group:Panel){return <button key={group} className={group==='login'?'v3-login-trigger':undefined} data-v3-group={group} aria-haspopup="dialog" aria-expanded={active===group} aria-controls={active===group?'v3-mega-panel':undefined} aria-current={group!=='login'&&location.pathname.startsWith(destinations[group])?'location':undefined}
  onMouseEnter={event=>{if(group!=='login'&&!hoverBlocked.current&&window.matchMedia('(hover:hover)').matches)open(group,event.currentTarget,false,true)}}
  onClick={event=>active===group&&!hovered.current?close(true):open(group,event.currentTarget,true)}
  onKeyDown={event=>{if(event.key==='ArrowDown'){event.preventDefault();open(group,event.currentTarget,true)}if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const items:Panel[]=[...groups,'login'],index=items.indexOf(group),delta=(event.key==='ArrowRight'?1:-1)*(language==='ar'?-1:1);root.current?.querySelector<HTMLButtonElement>('[data-v3-group="'+items[(index+delta+items.length)%items.length]+'"]')?.focus()}}}>{labels[group]}{group!=='login'&&<span aria-hidden="true">+</span>}</button>}
 return <header ref={root} className={'v3-nav'+(scrolled?' is-scrolled':'')+(active?' is-open':'')} onKeyDown={keydown} role={active?'dialog':undefined} aria-modal={active?true:undefined} aria-label={active?t.navigation:undefined}
  onMouseLeave={()=>{if(active!=='login'&&window.matchMedia('(hover:hover)').matches)timer.current=window.setTimeout(()=>close(),240)}} onMouseEnter={()=>{if(timer.current)clearTimeout(timer.current)}}>
  <div className="v3-nav-inner">
   <Link to={localized(V3_BASE)} className="v3-logo" aria-label={brand.label} onClick={()=>close(false,true)}><img src={brand.src} alt={brand.label} width={brand.width} height={brand.height} style={{aspectRatio:brand.width+'/'+brand.height}}/></Link>
   <nav className="v3-primary-nav" aria-label={t.navigation}>{groups.map(navButton)}</nav>
   <div className="v3-nav-end"><Link className="v3-contact-utility" to={localized(contractingPath('contact'))} onClick={()=>close(false,true)}>{t.contactLink}</Link>{navButton('login')}<button className="v3-language" onClick={switchLanguage} lang={language==='en'?'ar':'en'}>{t.language}</button><button className="v3-mobile-toggle" aria-label={active?t.close:t.menu} aria-expanded={!!active} aria-controls={active?'v3-mega-panel':undefined} onClick={event=>active?close(true):open('company',event.currentTarget,true)}><span/><span/></button></div>
  </div>
  {active&&<><div className="v3-menu-scrim" aria-hidden="true" onClick={()=>close(true)}/><div className={'v3-menu is-'+active+(active==='login'?' v3-login-menu':'')} id="v3-mega-panel" ref={panel}><button className="v3-panel-close" aria-label={t.close} onClick={()=>close(true)}>{String.fromCharCode(215)}</button>{active==='login'?<><p className="v3-eyebrow">FBS CONTRACTING</p><h2>{p.login}</h2><p className="v3-login-intro">{p.portalNote}</p><div className="v3-login-options">{loginPortals.map(portal=><div className="v3-login-option" key={portal.id}><div><strong>{portal.id==='administration'?p.administration:portal.id==='suppliers'?p.supplierLogin:t[portal.id]}</strong><span>{portal.id==='administration'?p.adminNote:portal.id==='suppliers'?p.supplierLoginNote:p.portalStatus}</span></div>{portal.publicPath?<Link to={localized(contractingPath(portal.publicPath))} onClick={()=>close(false,true)}>{p.publicCareers}<Arrow/></Link>:null}</div>)}</div></>:<div className={'v3-menu-layout v3-menu-layout-'+active}>
   <nav className="v3-menu-groups" aria-label={t.navigation}>{groups.map(group=><button key={group} aria-pressed={group===active} onClick={()=>{closing.current?.kill();setActive(group)}}>{labels[group]}</button>)}</nav>
   <div className="v3-menu-primary"><p className="v3-eyebrow">FBS CONTRACTING</p><h2>{labels[active]}</h2><p className="v3-menu-description">{descriptions[active]}</p>{active==='company'?<nav className="v3-menu-links" aria-label={labels.company}>{companyLinks.map(destinationLink)}</nav>:active==='whatwedo'?<nav className="v3-menu-links" aria-label={labels.whatwedo}>{whatWeDoLinks.map(destinationLink)}</nav>:active==='approach'?<nav className="v3-menu-links" aria-label={labels.approach}>{approachLinks.map(destinationLink)}</nav>:active==='projects'?<nav className="v3-menu-links" aria-label={labels.projects}>{projectsLinks.map(destinationLink)}</nav>:<nav className="v3-menu-links" aria-label={labels.news}>{destinationLink({label:t.newsTitle,to:V3_BASE+'/news'})}<a data-v3-menu-link href={OFFICIAL_LINKEDIN} target="_blank" rel="noopener noreferrer" onClick={()=>close(false,true)}>{u.follow}<Arrow/></a></nav>}</div>
   <div className={'v3-menu-cards v3-menu-cards-'+active} data-project-records={active==='projects'&&data.source==='published'&&data.projects.length>0?'true':undefined}>{cards[active].map((card,index)=><MegaMenuCard key={active+index} card={{...card,to:card.to?localized(card.to):undefined}} onFollow={()=>close(false,true)}/>)}</div>
   <p className="v3-menu-media-note">{u.stockNote}</p>
  </div>}</div></>}
 </header>
}
