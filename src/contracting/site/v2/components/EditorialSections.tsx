import { useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { contractingPath } from '../../config/site'
import { v2Path, type HomepageView } from '../content/model'
import { v2Dictionary } from '../i18n'
import { AnimatedNumber } from '../motion/Motion'
import { gsap, useGSAP } from '../motion/gsap'
import { useReducedMotion } from '../motion/useReducedMotion'
import { Arrow, Eyebrow, MediaImage, TextLink } from './primitives'
export function ImpactSection({data}:{data:HomepageView}) {
  const t=v2Dictionary(data.language)
  return <section id="v2-impact" className="v2-impact v2-paper" aria-labelledby="v2-impact-heading"><div className="v2-container">
    <div className="v2-impact-label"><h2 id="v2-impact-heading" className="v2-eyebrow">{t.impact}</h2>{data.source==='development'&&<p className="v2-approval-note">{t.impactNote}</p>}</div>
    {data.statistics.length?<dl className="v2-statistics">{data.statistics.slice(0,4).map(stat=>{
      const divisor=[1,1000,1000000,1000000000].includes(stat.divisor)?stat.divisor:1
      const number=stat.value/divisor,formatted=new Intl.NumberFormat(data.language==='ar'?'ar-SA':'en-US',{maximumFractionDigits:number<10?1:0}).format(number)
      const suffix=divisor===1000000000?t.billion:divisor===1000000?t.million:divisor===1000?t.thousand:''
      return <div key={stat.id}><dt>{stat.label}{stat.unit&&<span> / <bdi>{stat.unit}</bdi></span>}</dt><dd><bdi><AnimatedNumber value={number} formatted={formatted}/>{suffix&&<span className="v2-stat-suffix">{suffix}</span>}{stat.qualifier==='plus'&&<span className="v2-stat-plus">+</span>}</bdi></dd></div>
    })}</dl>:<div className="v2-impact-empty"><h3>{t.impactEmpty}</h3><p>{t.impactEmptyNote}</p></div>}
  </div></section>
}
export function CompanySection({data}:{data:HomepageView}) {
  const t=v2Dictionary(data.language)
  return <section id="v2-company" className="v2-company v2-paper v2-section" aria-labelledby="v2-company-heading"><div className="v2-container">
    <div className="v2-editorial-heading"><Eyebrow>{t.aboutEyebrow}</Eyebrow><h2 id="v2-company-heading" data-reveal>{data.company.title||t.aboutTitle}</h2></div>
    <div className="v2-company-grid"><div className="v2-company-visual" data-image-mask><MediaImage media={data.projects[0]?.image} parallax style={{objectPosition:'center'}}/><div className="v2-image-caption"><span>FBS CONTRACTING</span><span>{data.source==='development'?t.preview:t.company}</span></div></div>
      <div className="v2-company-copy" data-reveal><p className="v2-lead">{data.company.summary||t.contentPending}</p>{data.company.body&&<p>{data.company.body}</p>}<TextLink to={contractingPath('about/who-we-are')}>{t.aboutLink}</TextLink>
        <div className="v2-company-signature" aria-hidden="true"><span>FBS</span><span>CONTRACTING</span></div>
      </div></div>
  </div></section>
}
export function ExpertiseSection({data}:{data:HomepageView}) {
  const t=v2Dictionary(data.language),reduced=useReducedMotion()
  const [selected,setSelected]=useState(0),root=useRef<HTMLElement>(null)
  const active=data.services[selected%Math.max(1,data.services.length)]
  const visual=data.projects[(selected+1)%Math.max(1,data.projects.length)]?.image??data.heroMedia[0]?.poster??data.heroMedia[0]?.media
  useGSAP(()=>{
    if(reduced)return
    gsap.fromTo('.v2-expertise-story',{opacity:0,y:15},{opacity:1,y:0,duration:0.5,ease:'power3.out'})
  },{scope:root,dependencies:[selected,reduced,data.language],revertOnUpdate:true})
  function tabKey(event:KeyboardEvent<HTMLButtonElement>,index:number){
    const length=data.services.length
    let next:number
    if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%length
    else if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index-1+length)%length
    else if(event.key==='Home')next=0
    else if(event.key==='End')next=length-1
    else return
    event.preventDefault();setSelected(next);root.current?.querySelector<HTMLButtonElement>('#v2-service-'+next)?.focus()
  }
  return <section ref={root} id="v2-expertise" className="v2-expertise v2-section v2-dark" aria-labelledby="v2-expertise-heading"><div className="v2-container">
    <div className="v2-section-heading" data-reveal><div><Eyebrow>{t.expertiseEyebrow}</Eyebrow><h2 id="v2-expertise-heading">{data.expertise.title||t.expertiseTitle}</h2></div><p>{data.expertise.summary||t.contentPending}</p></div>
    <div className="v2-expertise-grid"><div className="v2-service-list" role="tablist" aria-label={t.expertise} aria-orientation="vertical">{data.services.length?data.services.map((service,index)=><button id={'v2-service-'+index} key={service.id} role="tab" aria-selected={selected===index} tabIndex={selected===index?0:-1} aria-controls="v2-service-panel"
      onClick={()=>setSelected(index)} onKeyDown={event=>tabKey(event,index)} className={selected===index?'is-active':''}><span>{String(index+1).padStart(2,'0')}</span>{service.title}<Arrow diagonal/></button>):<div className="v2-services-empty"><span aria-hidden="true">↗</span><h3>{t.servicesEmpty}</h3><p>{t.contentPending}</p></div>}</div>
      <div className="v2-expertise-story" id="v2-service-panel" role={active?'tabpanel':undefined} aria-labelledby={active?'v2-service-'+selected:undefined} tabIndex={0}>
        <div className="v2-expertise-image"><MediaImage media={visual}/><span className="v2-story-index" aria-hidden="true">{String(selected+1).padStart(2,'0')}</span></div>
        <div className="v2-story-description"><h3>{active?.title??t.expertise}</h3>{active?.summary&&<p>{active.summary}</p>}<TextLink to={contractingPath('contact')} light>{t.serviceLink}</TextLink></div>
      </div></div>
  </div></section>
}
export function ProjectsSection({data}:{data:HomepageView}) {
  const t=v2Dictionary(data.language)
  const visible=data.projects.slice(0,3)
  return <section id="v2-projects" className="v2-projects v2-paper v2-section" aria-labelledby="v2-projects-heading"><div className="v2-container">
    <div className="v2-section-heading" data-reveal><div><Eyebrow>{t.projectsEyebrow}</Eyebrow><h2 id="v2-projects-heading">{t.projectsTitle}</h2></div><a className="v2-text-link" href="#v2-map">{t.allProjects}<Arrow/></a></div>
    {visible.length?<div className="v2-project-editorial">{visible.map((project,index)=><article key={project.id} className={'v2-project-feature feature-'+index} data-reveal>
      <Link to={v2Path('projects/'+project.slug)} className="v2-project-image" aria-label={t.viewProject+': '+project.name} data-image-mask><MediaImage media={project.image} parallax={index===0}/><span className="v2-project-open" aria-hidden="true"><Arrow diagonal/></span>{project.category&&<span className="v2-project-category">{project.category}</span>}</Link>
      <div className="v2-project-caption"><div><span className="v2-eyebrow">{project.location??t.projects}</span><h3><Link to={v2Path('projects/'+project.slug)}>{project.name}</Link></h3></div><span className="v2-project-ordinal" aria-hidden="true">{String(index+1).padStart(2,'0')}</span></div>
    </article>)}</div>:<div className="v2-project-empty"><div className="v2-architectural-lines" aria-hidden="true"/><h3>{t.projectEmpty}</h3><p>{t.projectEmptyNote}</p></div>}
  </div></section>
}
export function SustainabilitySection({data}:{data:HomepageView}) {
  const t=v2Dictionary(data.language)
  return <section className="v2-future v2-dark v2-section" id="v2-sustainability" aria-labelledby="v2-future-heading"><div className="v2-container">
    <Eyebrow>{t.sustainabilityEyebrow}</Eyebrow><div className="v2-future-grid"><div data-reveal><div className="v2-future-emblem" aria-hidden="true"><svg viewBox="0 0 140 140" fill="none"><circle cx="70" cy="70" r="65"/><circle cx="70" cy="70" r="42"/><path d="M70 5v130M5 70h130M24 24l92 92M24 116l92-92"/></svg></div>
      <p className="v2-eyebrow">{t.sustainability}</p><h2 id="v2-future-heading">{data.sustainability.title||t.sustainability}</h2><p>{data.sustainability.summary||t.contentPending}</p><TextLink to={contractingPath('sustainability')} light>{t.exploreSustainability}</TextLink></div>
      <div data-reveal><div className="v2-vision-wordmark" aria-hidden="true"><span>{data.language==='ar'?'رؤية':'VISION'}</span><strong>2030</strong></div><p className="v2-eyebrow">{t.vision}</p><h2>{data.vision.title||t.vision}</h2><p>{data.vision.summary||t.contentPending}</p><TextLink to={contractingPath('about/saudi-vision-2030')} light>{t.exploreVision}</TextLink></div></div>
  </div></section>
}
export function ConnectSection({data}:{data:HomepageView}) {
  const t=v2Dictionary(data.language)
  return <section className="v2-connect v2-paper v2-section" id="v2-connect" aria-labelledby="v2-connect-heading"><div className="v2-container">
    <Eyebrow>{t.connectEyebrow}</Eyebrow><div className="v2-connect-main" data-reveal><h2 id="v2-connect-heading">{t.connectTitle}</h2><Link to={contractingPath('contact')} className="v2-contact-orbit" aria-label={t.contact}><Arrow diagonal/></Link></div>
    <div className="v2-connect-secondary" data-stagger><Link to={contractingPath('careers')}><span><small>{t.careersDescription}</small>{t.careers}</span><Arrow/></Link><Link to={contractingPath('suppliers')}><span><small>{t.suppliersDescription}</small>{t.suppliers}</span><Arrow/></Link></div>
  </div></section>
}

