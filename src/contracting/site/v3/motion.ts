import type { RefObject } from 'react'
import { gsap, useGSAP } from '../v2/motion/gsap'
import { useReducedMotion } from '../v2/motion/useReducedMotion'
export const timing={ease:'power3.out',entrance:0.8,change:0.5,stagger:0.085,menu:0.48,ambientLine:5,ambientOrbit:24}
export function useHomepageMotion(root:RefObject<HTMLDivElement|null>,image:RefObject<HTMLDivElement|null>,identity:string){
 const reduced=useReducedMotion()
 useGSAP(()=>{
  if(reduced)return
  gsap.utils.toArray<HTMLElement>('[data-v3-reveal]',root.current).forEach(element=>gsap.fromTo(element,{opacity:0,y:32},{opacity:1,y:0,duration:timing.entrance,ease:timing.ease,scrollTrigger:{trigger:element,start:'top 94%',once:true},clearProps:'transform,opacity'}))
  gsap.utils.toArray<HTMLElement>('[data-v3-stagger]',root.current).forEach(element=>gsap.fromTo(element.children,{opacity:0,y:22},{opacity:1,y:0,duration:0.7,stagger:timing.stagger,ease:timing.ease,scrollTrigger:{trigger:element,start:'top 93%',once:true},clearProps:'transform,opacity'}))
  gsap.utils.toArray<HTMLElement>('[data-v3-mask]',root.current).forEach(element=>gsap.fromTo(element,{clipPath:'inset(9% 0 5% 0 round 36px)'},{clipPath:'inset(0% 0 0% 0 round 32px)',duration:1.05,ease:timing.ease,scrollTrigger:{trigger:element,start:'top 95%',once:true},clearProps:'clipPath'}))
  gsap.fromTo('.v3-company-drawing path',{strokeDashoffset:1000},{strokeDashoffset:0,duration:2.4,ease:'power2.inOut',scrollTrigger:{trigger:'.v3-company-visual',start:'top 80%',once:true}})
  const connection=(navigator as Navigator & {connection?:{saveData?:boolean;addEventListener?:(name:string,fn:()=>void)=>void;removeEventListener?:(name:string,fn:()=>void)=>void}}).connection
  const device=navigator as Navigator & {deviceMemory?:number;getBattery?:()=>Promise<{charging:boolean;level:number;addEventListener:(name:string,fn:()=>void)=>void;removeEventListener:(name:string,fn:()=>void)=>void}>}
  let lowBattery=false,disposed=false,battery:Awaited<ReturnType<NonNullable<typeof device.getBattery>>>|undefined
  const constrained=()=>connection?.saveData||(navigator.hardwareConcurrency>0&&navigator.hardwareConcurrency<=4)||(device.deviceMemory!==undefined&&device.deviceMemory<=4)||lowBattery
  const ambient=gsap.utils.toArray<HTMLElement>('[data-v3-ambient]',root.current).map(element=>({element,inView:false,tween:element.dataset.v3Ambient==='orbit'?gsap.to(element,{rotation:360,svgOrigin:'60 60',duration:timing.ambientOrbit,repeat:-1,ease:'none',paused:true}):gsap.to(element,{x:36,opacity:0.55,duration:timing.ambientLine,repeat:-1,yoyo:true,ease:'sine.inOut',paused:true})}))
  const sync=()=>ambient.forEach(item=>{const disabled=constrained(),playing=!disabled&&item.inView&&!document.hidden;item.tween.paused(!playing);item.element.dataset.ambientState=disabled?'disabled':playing?'running':'paused'})
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{const item=ambient.find(item=>item.element===entry.target);if(item)item.inView=entry.isIntersecting});sync()},{threshold:0.1})
  ambient.forEach(item=>observer.observe(item.element));sync()
  document.addEventListener('visibilitychange',sync);connection?.addEventListener?.('change',sync)
  const power=()=>{lowBattery=Boolean(battery&&!battery.charging&&battery.level<0.2);sync()}
  void device.getBattery?.().then(value=>{if(disposed)return;battery=value;battery.addEventListener('chargingchange',power);battery.addEventListener('levelchange',power);power()}).catch(()=>{/* Battery API is optional. */})
  const media=gsap.matchMedia()
  media.add('(min-width:1000px)',()=>{gsap.utils.toArray<HTMLElement>('[data-v3-parallax]',root.current).forEach(element=>gsap.fromTo(element,{yPercent:-4,scale:1.08},{yPercent:4,scale:1.08,ease:'none',scrollTrigger:{trigger:element.parentElement,start:'top bottom',end:'bottom top',scrub:0.65}}))})
  gsap.utils.toArray<HTMLElement>('[data-image-window]',root.current).forEach(element=>gsap.to(image.current,{opacity:0.9,ease:'none',scrollTrigger:{trigger:element,start:'top bottom',end:'top 20%',scrub:0.7}}))
  return()=>{disposed=true;media.revert();observer.disconnect();document.removeEventListener('visibilitychange',sync);connection?.removeEventListener?.('change',sync);battery?.removeEventListener('chargingchange',power);battery?.removeEventListener('levelchange',power);ambient.forEach(item=>{item.tween.kill();delete item.element.dataset.ambientState})}
 },{scope:root,dependencies:[identity,reduced],revertOnUpdate:true})
}
