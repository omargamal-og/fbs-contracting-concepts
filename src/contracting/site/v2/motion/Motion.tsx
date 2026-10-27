import { useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, useGSAP, motionTokens } from './gsap'
import { useReducedMotion } from './useReducedMotion'
export function Motion({children,className='',identity=''}:{children:ReactNode;className?:string;identity?:string}) {
  const scope=useRef<HTMLDivElement>(null)
  const reduced=useReducedMotion()
  useGSAP(()=>{
    if(reduced)return
    const root=scope.current
    if(!root)return
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element=>{
      gsap.fromTo(element,{y:36,opacity:0},{y:0,opacity:1,duration:motionTokens.duration,ease:motionTokens.ease,
        scrollTrigger:{trigger:element,start:'top 94%',once:true},clearProps:'transform,opacity'})
    })
    root.querySelectorAll<HTMLElement>('[data-stagger]').forEach(element=>{
      gsap.fromTo(element.children,{y:25,opacity:0},{y:0,opacity:1,duration:0.8,ease:motionTokens.ease,stagger:motionTokens.stagger,
        scrollTrigger:{trigger:element,start:'top 94%',once:true},clearProps:'transform,opacity'})
    })
    root.querySelectorAll<HTMLElement>('[data-image-mask]').forEach(element=>{
      gsap.fromTo(element,{clipPath:'inset(8% 0 8% 0)'},{clipPath:'inset(0% 0 0% 0)',duration:1.25,ease:motionTokens.ease,
        scrollTrigger:{trigger:element,start:'top 94%',once:true},clearProps:'clipPath'})
    })
    const media=gsap.matchMedia()
    media.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)',()=>{
      root.querySelectorAll<HTMLElement>('[data-parallax]').forEach(element=>{
        gsap.fromTo(element,{yPercent:-4,scale:1.09},{yPercent:4,scale:1.09,ease:'none',scrollTrigger:{trigger:element.parentElement,start:'top bottom',end:'bottom top',scrub:0.6}})
      })
    })
    const refresh=window.setTimeout(()=>ScrollTrigger.refresh(),100)
    return()=>{media.revert();window.clearTimeout(refresh)}
  },{scope,dependencies:[identity,reduced],revertOnUpdate:true})
  return <div ref={scope} className={className}>{children}</div>
}
export function AnimatedNumber({value,formatted}:{value:number;formatted:string}) {
  const span=useRef<HTMLSpanElement>(null)
  const reduced=useReducedMotion()
  useGSAP(()=>{
    if(reduced || !span.current)return
    const node=span.current,progress={value:0}
    gsap.to(progress,{value:1,duration:1.7,ease:'power2.out',scrollTrigger:{trigger:node,start:'top 95%',once:true},onUpdate:()=>{
      node.style.setProperty('--number-progress',String(progress.value))
      node.textContent=new Intl.NumberFormat(document.documentElement.lang === 'ar'?'ar-SA':'en-US',{maximumFractionDigits:value<10?1:0}).format(value*progress.value)
    },onComplete:()=>{node.textContent=formatted}})
  },{scope:span,dependencies:[value,formatted,reduced],revertOnUpdate:true})
  return <><span className="v2-sr-only">{formatted}</span><span ref={span} aria-hidden="true">{formatted}</span></>
}



