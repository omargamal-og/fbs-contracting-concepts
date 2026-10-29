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
import { upgradeCopy } from './upgradeContent'
import { mapCopy } from './map/copy'
type Group='company'|'projects'|'approach'|'connect'|'governance'
type Panel=Group|'login'
type MenuDestination={label:string;to:string;status?:string;description?:string}
export default function CenteredNavigation({t,data}:{t:V3Copy;data:HomepageView;onNews?:(item:NewsView)=>void}){
 const {language,setLanguage}=useLanguage(),reduced=useReducedMotion(),navigate=useNavigate(),location=useLocation()
 function switchLanguage(){const next=language==='en'?'ar':'en';close(false,true);setLanguage(next);const query=new URLSearchParams(location.search);query.set('lang',next);navigate({pathname:location.pathname,search:'?'+query.toString(),hash:location.hash},{replace:true,preventScrollReset:true})}
 const p=premiumCopy(language),u=upgradeCopy(language),brand=v3Brand(language),ar=language==='ar',labels:Record<Panel,string>={company:ar?'\u0627\u0644\u0634\u0631\u0643\u0629':t.company,projects:ar?'\u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639':t.projects,approach:ar?'\u0646\u0647\u062c\u0646\u0627':u.approach,connect:ar?'\u062a\u0648\u0627\u0635\u0644':u.connect,governance:ar?'\u062d\u0648\u0643\u0645\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062a':u.governance,login:ar?'\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644':p.login}
 const localized=(path:string)=>{const url=new URL(path,window.location.origin);url.searchParams.set('lang',language);return url.pathname+url.search+url.hash}
 const [active,setActive]=useState<Panel|null>(null),[scrolled,setScrolled]=useState(false)
 const isHomePage=location.pathname.replace(/\/+$/,'')===V3_BASE
 const root=useRef<HTMLElement>(null),panel=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement|null>(null)
 const closing=useRef<gsap.core.Tween|null>(null)
 const timer=useRef<number|null>(null),hoverRelease=useRef<number|null>(null),hoverBlocked=useRef(false),hovered=useRef(false),focusNext=useRef(false)
 const groups:Group[]=['company','projects','approach','connect']
 const panelGroups:Group[]=[...groups,'governance']
 const descriptions:Record<Group,string>={company:ar?'\u062a\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0641\u0631\u064a\u0642\u0646\u0627 \u0648\u0631\u0624\u064a\u062a\u0646\u0627 \u0648\u0642\u064a\u0645\u0646\u0627.':t.menuCompany,projects:ar?'\u0627\u0633\u062a\u0643\u0634\u0641 \u0645\u0634\u0627\u0631\u064a\u0639\u0646\u0627 \u0627\u0644\u0633\u0643\u0646\u064a\u0629 \u0648\u0627\u0644\u062a\u062c\u0627\u0631\u064a\u0629.':t.menuProjects,approach:ar?'\u062a\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u062e\u062f\u0645\u0627\u062a\u0646\u0627 \u0648\u0645\u0628\u0627\u062f\u0626 \u0627\u0644\u0639\u0645\u0644.':u.approachIntro,connect:ar?'\u0645\u0648\u0627\u0631\u062f \u0648\u0642\u0646\u0648\u0627\u062a \u0644\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064a\u0642\u0646\u0627.':t.menuConnect,governance:ar?'موضوعات حول المساءلة والأخلاقيات والخصوصية.':'Topics related to accountability, ethics, and privacy.'}
 const destinations:Record<Group,string>={company:V3_BASE+'/company',projects:V3_BASE+'/projects',approach:V3_BASE+'/approach',connect:contractingPath('contact'),governance:V3_BASE+'/governance'}
 const companyLinks:MenuDestination[]=[
  {label:ar?'\u0645\u0646 \u0646\u062d\u0646':t.nav.whoWeAre,to:V3_BASE+'/company#about',description:ar?'قصتنا وهويتنا وما يوجّه عملنا.':'Our story, identity, and what guides our work.'},
  {label:ar?'\u0641\u0631\u064a\u0642\u0646\u0627':t.nav.ourTeam,to:V3_BASE+'/company#leadership',description:ar?'تعرّف على القيادات والأشخاص خلف العمل.':'Meet the people and leaders behind the work.'},
  {label:ar?'\u0627\u0644\u0631\u0624\u064a\u0629 \u0648\u0627\u0644\u0631\u0633\u0627\u0644\u0629':t.nav.visionMission,to:V3_BASE+'/company#vision-mission',description:ar?'التوجه الذي يحدد أهدافنا على المدى الطويل.':'The direction shaping our long-term goals.'},
  {label:ar?'\u0631\u0624\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629 2030':t.visionLink,to:contractingPath('about/saudi-vision-2030'),description:ar?'استكشف رؤية المملكة وأولوياتها.':'Explore the Kingdom’s vision and priorities.'},
  {label:ar?'\u0642\u064a\u0645\u0646\u0627':t.nav.coreValues,to:V3_BASE+'/company#values',description:ar?'المبادئ التي توجه أسلوب عملنا.':'Principles that guide how we work.'},
 ]
 const projectsLinks:MenuDestination[]=[
  {label:ar?'\u0633\u0643\u0646\u064a':t.nav.residential,to:V3_BASE+'/projects#residential',description:ar?'تصفح فئة المشروعات السكنية.':'Browse the residential project category.'},
  {label:ar?'\u062a\u062c\u0627\u0631\u064a':t.nav.commercial,to:V3_BASE+'/projects#commercial',description:ar?'تصفح فئة المشروعات التجارية.':'Browse the commercial project category.'},
  {label:ar?'\u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639':t.projects,to:V3_BASE+'/projects#directory',description:ar?'اعرض دليل المشروعات المتاح.':'View the available project directory.'},
  {label:ar?'\u0627\u0633\u062a\u0643\u0634\u0641 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629':mapCopy(language).title,to:V3_BASE+'/projects#project-map',description:ar?'اكتشف مواقع المشروعات حسب المدينة.':'Explore project locations by city.'},
 ]
 const approachLinks:MenuDestination[]=[
  {label:ar?'\u062e\u062f\u0645\u0627\u062a\u0646\u0627':u.services,to:V3_BASE+'/what-we-do#services',description:ar?'استكشف خدمات المقاولات والتخصصات.':'Explore contracting services and disciplines.'},
  {label:ar?'\u0627\u0644\u0633\u0644\u0627\u0645\u0629':u.safety,to:V3_BASE+'/approach#safety',description:ar?'ممارسات السلامة في بيئة العمل.':'Safety practices across the work environment.'},
  {label:ar?'\u0627\u0644\u062c\u0648\u062f\u0629':u.quality,to:V3_BASE+'/approach#quality',description:ar?'التفاصيل ومراجعة جودة التنفيذ.':'Attention to detail and quality review.'},
  {label:ar?'\u0645\u062f\u0648\u0646\u0629 \u0627\u0644\u0623\u062e\u0644\u0627\u0642\u064a\u0627\u062a':'Code of Ethics',to:V3_BASE+'/governance#code-of-ethics',description:ar?'مبادئ السلوك المهني والمسؤول.':'Professional principles and responsible conduct.'},
  {label:ar?'\u0627\u0644\u0627\u0633\u062a\u062f\u0627\u0645\u0629':t.nav.sustainability,to:V3_BASE+'/approach#sustainability',description:ar?'اعتبارات البيئة والاستدامة.':'Environmental and sustainability considerations.'},
  {label:ar?'\u0627\u0644\u0645\u062c\u062a\u0645\u0639\u0627\u062a':'Communities',to:V3_BASE+'/approach#social-responsibility',description:ar?'التواصل مع المجتمعات المحلية.':'Engagement with local communities.'},
 ]
 const connectLinks:MenuDestination[]=[
  {label:ar?'\u0627\u0644\u0648\u0638\u0627\u0626\u0641':t.careers,to:contractingPath('careers'),description:ar?'اطّلع على فرص العمل المتاحة.':'Explore career opportunities.'},
  {label:ar?'\u0627\u0644\u062a\u062f\u0631\u064a\u0628':t.nav.training,to:contractingPath('training'),description:ar?'تعرف على برامج التدريب والتطوير.':'Learn about training and development.'},
  {label:ar?'\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u0645\u0648\u0631\u062f\u064a\u0646':u.supplierRegistration,to:contractingPath('suppliers'),description:ar?'ابدأ طلب التسجيل كمورد.':'Start a supplier registration request.'},
  {label:ar?'\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 FBS':t.contactLink,to:contractingPath('contact'),description:ar?'تواصل مع فريق FBS.':'Get in touch with the FBS team.'},
 ]
 const governanceLinks:MenuDestination[]=[
  {label:ar?'\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u0625\u0628\u0644\u0627\u063a \u0639\u0646 \u0627\u0644\u0645\u062e\u0627\u0644\u0641\u0627\u062a':'Whistleblower Policy',to:V3_BASE+'/governance#whistleblowing-policy',description:ar?'معلومات حول الإبلاغ عن المخاوف.':'Information relating to reporting concerns.'},
  {label:ar?'\u0645\u062f\u0648\u0646\u0629 \u0627\u0644\u0623\u062e\u0644\u0627\u0642\u064a\u0627\u062a':'Code of Ethics',to:V3_BASE+'/governance#code-of-ethics',description:ar?'موضوعات تتعلق بالسلوك المهني.':'Topics relating to professional conduct.'},
  {label:ar?'\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064a\u0629':'Global Privacy Policy',to:V3_BASE+'/governance#privacy-policy',description:ar?'معلومات حول الخصوصية والتعامل مع البيانات.':'Information about privacy and data handling.'},
  {label:ar?'\u0645\u0633\u0624\u0648\u0644 \u062d\u0645\u0627\u064a\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a':'Data Protection Officer',to:V3_BASE+'/governance#data-protection-officer',description:ar?'معلومات حول حماية البيانات والتواصل.':'Information about data protection and contacts.'},
 ]
 const publishedProjects=data.projects.filter(project=>project.published)
 const cards:Record<Group,MenuCardContent[]>={
  company:[
   {title:labels.company,note:u.companyNote,to:V3_BASE+'/company#about',image:MEDIA+'construction-perspective.webp'},
   {title:companyLinks[3].label,note:companyLinks[3].description||u.companyNote,to:contractingPath('about/saudi-vision-2030'),image:MEDIA+'construction-background.webp'},
  ],
  projects:[
   ...publishedProjects.filter(project=>project.image).slice(0,2).map(project=>({title:project.name,note:project.location||u.projectNote,to:V3_BASE+'/projects/'+project.slug,media:project.image,image:''})),
   {title:projectsLinks[0].label,note:projectsLinks[0].description||u.projectNote,to:V3_BASE+'/projects#residential',image:MEDIA+'hero-03-poster.jpg'},
   {title:projectsLinks[1].label,note:projectsLinks[1].description||u.projectNote,to:V3_BASE+'/projects#commercial',image:MEDIA+'construction-structure.webp'},
  ].slice(0,2),
  approach:[
   {title:approachLinks[1].label,note:u.safetyNote,to:V3_BASE+'/approach#safety',image:MEDIA+'hero-02-poster.jpg'},
   {title:approachLinks[4].label,note:u.environmentNote,to:V3_BASE+'/approach#sustainability',image:MEDIA+'architectural-detail.webp'},
  ],
  governance:[
   {title:governanceLinks[1].label,note:governanceLinks[1].description||'',to:governanceLinks[1].to,image:MEDIA+'company-collaboration.webp'},
   {title:governanceLinks[2].label,note:governanceLinks[2].description||'',to:governanceLinks[2].to,image:MEDIA+'expertise-groundwork.webp'},
  ],
  connect:connectLinks.map((item,index)=>({title:item.label,note:item.description||'',to:item.to,image:[MEDIA+'hero-01-poster.jpg',MEDIA+'construction-perspective.webp',MEDIA+'hero-03-poster.jpg',MEDIA+'hero-02-poster.jpg'][index]})),
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
  const positionMenu=()=>panel.current?.style.setProperty('--v3-menu-top',`${header?.getBoundingClientRect().bottom??90}px`)
  positionMenu();window.addEventListener('resize',positionMenu)
  const scrollbar=window.innerWidth-document.documentElement.clientWidth
  if(scrollbar)document.body.style.setProperty('padding-right',scrollbar+'px')
  header?.style.setProperty('--v3-scrollbar',scrollbar+'px')
  document.body.style.setProperty('overflow','hidden');if(page)page.setAttribute('inert','')
  if(focusNext.current){requestAnimationFrame(()=>panel.current?.querySelector<HTMLElement>('a[href],button')?.focus({preventScroll:true}));focusNext.current=false}
  document.addEventListener('keydown',escape)
  return()=>{document.removeEventListener('keydown',escape);window.removeEventListener('resize',positionMenu);document.body.style.setProperty('overflow',previous);document.body.style.setProperty('padding-right',padding);header?.style.removeProperty('--v3-scrollbar');if(page)page.removeAttribute('inert')}
 },[active])
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);if(hoverRelease.current)clearTimeout(hoverRelease.current);closing.current?.kill()},[])
 useGSAP(()=>{
  if(!active||reduced)return
  gsap.fromTo('[data-v3-menu-link]',{opacity:0,y:20},{opacity:1,y:0,duration:0.52,stagger:0.055,ease:timing.ease,delay:0.09})
  gsap.fromTo('.v3-menu-card,.v3-policy-row,.v3-login-option',{opacity:0,y:18},{opacity:1,y:0,duration:timing.change,stagger:0.06,ease:timing.ease,delay:0.12})
  gsap.fromTo('.v3-menu-card-visual',{clipPath:'inset(12% 0 0 round 16px)'},{clipPath:'inset(0% 0 0 round 16px)',duration:0.65,ease:timing.ease,delay:0.1})
 },{scope:root,dependencies:[active,language,reduced],revertOnUpdate:true})
 function keydown(event:KeyboardEvent<HTMLElement>){
  if(event.key==='Escape'&&active){event.preventDefault();close(true)}
  if(event.key==='Tab'&&active){const focusable=Array.from(root.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')??[]).filter(node=>node.getClientRects().length);const first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus({preventScroll:true})}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus({preventScroll:true})}}
 }
 const destinationLink=(item:MenuDestination,index:number)=><Link data-v3-menu-link key={item.label} to={localized(item.to)} onClick={()=>close(false,true)}><span className="v3-menu-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={['M4 20V7l4-3 4 3v13M12 20V4h8v16M2 20h20M7 9h2m-2 4h2m7-5h2m-2 4h2m-2 4h2','M16 20v-2a4 4 0 0 0-8 0v2M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20v-2a3 3 0 0 1 3-3m12 0a3 3 0 0 1 3 3v2','M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8m0-12.8-2.8 2.8m-7.2 7.2-2.8 2.8','M12 21s8-4 8-11V5l-8-3-8 3v5c0 7 8 11 8 11Z','M4 20 12 4l8 16M7 14h10M9 10h6','M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z'][index%6]}/></svg></span><span className="v3-menu-link-label"><strong>{item.label}</strong>{item.description&&<small>{item.description}</small>}{item.status&&<small>{item.status}</small>}</span><Arrow/></Link>
 function navButton(group:Panel){return <button key={group} className={group==='login'?'v3-login-trigger':group==='governance'?'v3-governance-trigger':undefined} data-v3-group={group} aria-haspopup="dialog" aria-expanded={active===group} aria-controls={active===group?'v3-mega-panel':undefined} aria-current={group!=='login'&&location.pathname.startsWith(destinations[group])?'location':undefined}
  onMouseEnter={event=>{if(group!=='login'&&!hoverBlocked.current&&window.matchMedia('(hover:hover)').matches)open(group,event.currentTarget,false,true)}}
  onClick={event=>active===group&&!hovered.current?close(true):open(group,event.currentTarget,true)}
  onKeyDown={event=>{if(event.key==='ArrowDown'){event.preventDefault();open(group,event.currentTarget,true)}if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const items:Panel[]=[...groups,'governance','login'],index=items.indexOf(group),delta=(event.key==='ArrowRight'?1:-1)*(language==='ar'?-1:1);root.current?.querySelector<HTMLButtonElement>('[data-v3-group="'+items[(index+delta+items.length)%items.length]+'"]')?.focus()}}}>{labels[group]}</button>}
 return <header ref={root} className={'v3-nav'+(isHomePage?' is-home':' is-inner')+(scrolled?' is-scrolled':'')+(active?' is-open':'')} onKeyDown={keydown} role={active?'dialog':undefined} aria-modal={active?true:undefined} aria-label={active?t.navigation:undefined}
  onMouseLeave={()=>{if(active!=='login'&&window.matchMedia('(hover:hover)').matches)timer.current=window.setTimeout(()=>close(),240)}} onMouseEnter={()=>{if(timer.current)clearTimeout(timer.current)}}>
  <div className="v3-nav-inner">
   <Link to={localized(V3_BASE)} className="v3-logo" aria-label={brand.label} onClick={()=>close(false,true)}><img src={brand.src} alt={brand.label} width={brand.width} height={brand.height} style={{aspectRatio:brand.width+'/'+brand.height}}/></Link>
   <nav className="v3-primary-nav" aria-label={t.navigation}>{groups.map(navButton)}</nav>
   <div className="v3-nav-end">{navButton('governance')}{navButton('login')}<button className="v3-language" onClick={switchLanguage} lang={language==='en'?'ar':'en'}>{t.language}</button><button className="v3-mobile-toggle" aria-label={active?t.close:t.menu} aria-expanded={!!active} aria-controls={active?'v3-mega-panel':undefined} onClick={event=>active?close(true):open('company',event.currentTarget,true)}><span/><span/></button></div>
  </div>
  {active&&<><div className="v3-menu-scrim" aria-hidden="true" onClick={()=>close(true)}/><div className={'v3-menu is-'+active+(active==='login'?' v3-login-menu':'')} id="v3-mega-panel" ref={panel}><button className="v3-panel-close" aria-label={t.close} onClick={()=>close(true)}>{String.fromCharCode(215)}</button>{active==='login'?<><p className="v3-eyebrow">FBS CONTRACTING</p><h2>{labels.login}</h2><p className="v3-login-intro">{ar?'\u0627\u062e\u062a\u0631 \u0645\u0648\u0631\u062f\u0627\u064b \u0644\u0644\u0648\u0638\u0627\u0626\u0641 \u0623\u0648 \u0627\u0644\u0645\u0648\u0631\u062f\u064a\u0646 \u0623\u0648 \u0625\u0631\u0634\u0627\u062f\u0627\u062a \u0627\u0644\u0625\u062f\u0627\u0631\u0629.':p.portalNote}</p><div className="v3-login-options">{loginPortals.map(portal=><div className="v3-login-option" key={portal.id}><div><strong>{portal.id==='administration'?(ar?'\u0627\u0644\u0625\u062f\u0627\u0631\u0629':p.administration):portal.id==='suppliers'?(ar?'\u062f\u062e\u0648\u0644 \u0627\u0644\u0645\u0648\u0631\u062f\u064a\u0646':p.supplierLogin):ar?'\u0627\u0644\u0648\u0638\u0627\u0626\u0641':t.careers}</strong><span>{portal.id==='administration'?p.adminNote:portal.id==='suppliers'?p.supplierLoginNote:p.portalStatus}</span></div>{portal.publicPath?<Link to={localized(contractingPath(portal.publicPath))} onClick={()=>close(false,true)}>{p.publicCareers}<Arrow/></Link>:null}</div>)}</div></>:<div className={'v3-menu-layout v3-menu-layout-'+active}>
   <nav className="v3-menu-groups" aria-label={t.navigation}>{panelGroups.map(group=><button key={group} aria-pressed={group===active} onMouseEnter={()=>{if(window.matchMedia('(hover:hover)').matches){closing.current?.kill();setActive(group)}}} onClick={()=>{closing.current?.kill();setActive(group)}}>{labels[group]}</button>)}</nav>
   <MegaMenuCard variant="feature" card={{...cards[active][0],to:cards[active][0].to?localized(cards[active][0].to):undefined,actionLabel:ar?'\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u0645\u0632\u064a\u062f':'Discover more'}} onFollow={()=>close(false,true)}/>
   <div className="v3-menu-primary"><p className="v3-eyebrow">FBS CONTRACTING</p><h2>{labels[active]}</h2><p className="v3-menu-description">{descriptions[active]}</p><nav className="v3-menu-links" aria-label={labels[active]}>{(active==='company'?companyLinks:active==='projects'?projectsLinks:active==='approach'?approachLinks:active==='connect'?connectLinks:governanceLinks.filter(item=>!item.to.endsWith('#whistleblowing-policy'))).map(destinationLink)}</nav></div>
   <MegaMenuCard variant="spotlight" card={{...cards[active][1],to:cards[active][1].to?localized(cards[active][1].to):undefined}} onFollow={()=>close(false,true)}/>
  </div>}</div></>}
 </header>
}
