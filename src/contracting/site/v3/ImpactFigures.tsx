import { useRef } from 'react'
import type { StatisticView } from '../v2/content/model'
import type { SiteLanguage } from '../i18n/types'
import { useReducedMotion } from '../v2/motion/useReducedMotion'
import { gsap, useGSAP } from '../v2/motion/gsap'

export function ImpactFigures({stats,language,draft}:{stats:StatisticView[];language:SiteLanguage;draft:boolean}) {
 const root=useRef<HTMLDListElement>(null),reduced=useReducedMotion()
 const format=new Intl.NumberFormat(language,{maximumFractionDigits:1})
 const identity=stats.map(stat=>stat.id+':'+stat.value+':'+stat.divisor).join('|')
 useGSAP(()=>{
  if(reduced||!root.current)return
  let inView=false
  const timeline=gsap.timeline({paused:true})
  root.current.querySelectorAll<HTMLElement>('[data-metric-number]').forEach((node,index)=>{
   const value=Number(node.dataset.metricNumber),progress={value:0}
   timeline.to(progress,{value,duration:1.7,ease:'power2.out',onUpdate:()=>{node.textContent=new Intl.NumberFormat(language,{maximumFractionDigits:1}).format(progress.value)}},index*.075)
  })
  const sync=()=>{if(inView&&!document.hidden)timeline.play();else timeline.pause()}
  const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;sync()},{threshold:.12})
  observer.observe(root.current);document.addEventListener('visibilitychange',sync)
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);timeline.kill()}
 },{scope:root,dependencies:[identity,language,reduced],revertOnUpdate:true})
 return <dl ref={root} className={draft?'v3-review-statistics':'v3-statistics'} aria-describedby={draft?'v3-impact-review-note':undefined}>{stats.map(stat=>{
  const divisor=[1000,1e6,1e9].includes(stat.divisor)?stat.divisor:1,value=stat.value/divisor
  const suffix=divisor===1e9?(language==='ar'?' مليار':'B'):divisor===1e6?(language==='ar'?' مليون':'M'):divisor===1000?(language==='ar'?' ألف':'k'):''
  return <div key={stat.id} data-metric-value={stat.value}><dt>{stat.label}{stat.unit&&<span> / {stat.unit}</span>}</dt><dd><span className="v3-sr-only">{format.format(stat.value)+(stat.qualifier==='plus'?'+':'')}</span><bdi aria-hidden="true"><span data-metric-number={value}>{format.format(value)}</span><span className="v3-metric-suffix">{suffix}</span>{stat.qualifier==='plus'&&<sup>+</sup>}</bdi></dd>{!draft&&stat.referenceDate&&<small>{stat.referenceDate}</small>}</div>
 })}</dl>
}
