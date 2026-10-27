import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/useLanguage'
import { contractingPath } from '../../config/site'
import { v2Path, type HomepageView } from '../content/model'
import { v2Dictionary } from '../i18n'
import { gsap, useGSAP } from '../motion/gsap'
import { useReducedMotion } from '../motion/useReducedMotion'
import { Arrow, MediaImage } from './primitives'
type Group='company'|'expertise'|'projects'|'news'|'connect'
export function MegaNavigation({data}:{data:HomepageView}) {
  const {language,setLanguage}=useLanguage(),t=v2Dictionary(language),reduced=useReducedMotion()
  const [active,setActive]=useState<Group|null>(null),[scrolled,setScrolled]=useState(false)
  const root=useRef<HTMLElement>(null),panel=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement|null>(null)
  const openedByHover=useRef(false),focusPanel=useRef(false),closeTimer=useRef<ReturnType<typeof setTimeout>|null>(null)
  const groups:Group[]=['company','expertise','projects','news','connect']
  const links:Record<Group,{label:string;href:string}[]>={
    company:[{label:t.who,href:contractingPath('about/who-we-are')},{label:t.ourTeam,href:contractingPath('about/our-team')},{label:t.visionMission,href:contractingPath('about/vision-mission')},{label:t.values,href:contractingPath('about/core-values')},{label:t.businessContinuity,href:contractingPath('business-continuity')}],
    expertise:[{label:t.expertise,href:v2Path()+'#v2-expertise'},{label:t.residential,href:contractingPath('projects/residential')},{label:t.commercial,href:contractingPath('projects/commercial')},{label:t.sustainability,href:contractingPath('sustainability')}],
    projects:[{label:t.allProjects,href:v2Path()+'#v2-projects'},{label:t.mapEyebrow.split('/')[1].trim(),href:v2Path()+'#v2-map'},{label:t.residential,href:contractingPath('projects/residential')},{label:t.commercial,href:contractingPath('projects/commercial')}],
    news:[{label:t.newsTitle.replace('\n',' '),href:v2Path()+'#v2-news'}],
    connect:[{label:t.contact,href:contractingPath('contact')},{label:t.careers,href:contractingPath('careers')},{label:t.suppliers,href:contractingPath('suppliers')},{label:t.training,href:contractingPath('training')}],
  }
  function close(restore=false){setActive(null);if(restore)requestAnimationFrame(()=>trigger.current?.focus())}
  function open(group:Group,button:HTMLButtonElement,focus=false,hover=false){openedByHover.current=hover;if(closeTimer.current)clearTimeout(closeTimer.current);trigger.current=button;focusPanel.current=focus;setActive(group)}
  useEffect(()=>{const update=()=>setScrolled(window.scrollY>40);window.addEventListener('scroll',update,{passive:true});update();return()=>window.removeEventListener('scroll',update)},[])
  useEffect(()=>{
    if(!active)return
    const previous=document.body.style.overflow
    document.body.style.overflow='hidden'
    const page=document.querySelector<HTMLElement>('[data-v2-page]')
    if(page)page.inert=true
    if(focusPanel.current){requestAnimationFrame(()=>panel.current?.querySelector<HTMLAnchorElement>('a')?.focus());focusPanel.current=false}
    return()=>{document.body.style.overflow=previous;if(page)page.inert=false}
  },[active])
  useEffect(()=>()=>{if(closeTimer.current)clearTimeout(closeTimer.current)},[])
  useGSAP(()=>{
    if(!active||!panel.current)return
    if(!reduced){gsap.fromTo(panel.current,{opacity:0,y:-16},{opacity:1,y:0,duration:0.45,ease:'power3.out'});gsap.fromTo(panel.current.querySelectorAll('[data-menu-link]'),{opacity:0,y:20},{opacity:1,y:0,stagger:0.055,duration:0.45,ease:'power3.out'})}
  },{scope:root,dependencies:[active,language,reduced],revertOnUpdate:true})
  function keydown(event:KeyboardEvent<HTMLElement>){
    if(event.key==='Escape'&&active){event.preventDefault();close(true)}
    if(event.key==='Tab'&&active){
      const elements=Array.from(root.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')??[]).filter(element=>element.getClientRects().length)
      const first=elements[0],last=elements.at(-1)
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}
    }
  }
  return <header ref={root} className={'v2-nav'+(scrolled?' is-scrolled':'')+(active?' is-open':'')} onKeyDown={keydown}
    role={active?'dialog':undefined} aria-modal={active?true:undefined} aria-label={active?t.navigation:undefined}
    onMouseLeave={()=>{if(window.matchMedia('(hover:hover)').matches)closeTimer.current=setTimeout(()=>close(),220)}}
    onMouseEnter={()=>{if(closeTimer.current)clearTimeout(closeTimer.current)}}>
    <div className="v2-nav-bar">
      <Link className="v2-brand" to={v2Path()} aria-label={t.heroEyebrow+' · '+t.home} onClick={()=>close()}><span dir="ltr">FBS</span><span className="v2-brand-descriptor">{language==='ar'?'للمقاولات':'CONTRACTING'}</span></Link>
      <nav className="v2-desktop-nav" aria-label={t.navigation}>
        {groups.map((group,index)=><button key={group} aria-expanded={active===group} aria-controls="v2-mega-panel"
          onMouseEnter={event=>{if(window.matchMedia('(hover:hover)').matches)open(group,event.currentTarget,false,true)}}
          onClick={event=>active===group&&!openedByHover.current?close(true):open(group,event.currentTarget,true)}
          onKeyDown={event=>{
            if(event.key==='ArrowDown'){event.preventDefault();open(group,event.currentTarget,true)}
            if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
              event.preventDefault();const change=(event.key==='ArrowRight'?1:-1)*(language==='ar'?-1:1)
              const next=groups[(index+change+groups.length)%groups.length]
              const button=root.current?.querySelector<HTMLButtonElement>('[data-group="'+next+'"]');button?.focus();if(active&&button)open(next,button)
            }
          }} data-group={group} className={active===group?'is-active':''}>{t[group]}<span aria-hidden="true">+</span></button>)}
      </nav>
      <div className="v2-nav-actions"><button className="v2-language" onClick={()=>{close();setLanguage(language==='ar'?'en':'ar')}} lang={language==='ar'?'en':'ar'}>{t.language}</button>
        <button className={'v2-menu-toggle'+(active?' is-active':'')} aria-label={active?t.close:t.menu} aria-expanded={!!active} aria-controls="v2-mega-panel"
          onClick={event=>active?close(true):open('company',event.currentTarget,true)}><span/><span/></button></div>
    </div>
    {active&&<div id="v2-mega-panel" ref={panel} className="v2-mega-panel">
      <div className="v2-mobile-groups">{groups.map(group=><button key={group} aria-pressed={active===group} onClick={()=>setActive(group)}>{t[group]}</button>)}</div>
      <div className="v2-mega-content"><div className="v2-mega-links"><p className="v2-eyebrow">{String(groups.indexOf(active)+1).padStart(2,'0')} / {t[active]}</p>
        <nav aria-label={t[active]}>{links[active].map((link,index)=><Link key={link.href} data-menu-link to={link.href} onClick={()=>{
          close();const hash=link.href.split('#')[1];if(hash)requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView({behavior:reduced?'instant':'smooth'}))
        }}><span className="v2-mega-number">{String(index+1).padStart(2,'0')}</span>{link.label}<Arrow diagonal/></Link>)}</nav>
        <p className="v2-mega-bottom">FBS CONTRACTING <span>{t.saudi}</span></p>
      </div><div className="v2-mega-art"><MediaImage media={data.projects[groups.indexOf(active)%Math.max(1,data.projects.length)]?.image??data.heroMedia[0]?.poster??data.heroMedia[0]?.media} eager/>
        <span>{data.source==='development'?t.previewArtwork:t.heroEyebrow}</span></div></div>
    </div>}
  </header>
}

