import { useCallback, useEffect, useRef, useState } from 'react'
import { films, HERO_SCENE_SECONDS, type V3Copy } from './content'
import type { SiteLanguage } from '../i18n/types'
import { useReducedMotion } from '../v2/motion/useReducedMotion'
import { gsap, useGSAP } from '../v2/motion/gsap'
import { Arrow, PlaybackIcon } from './icons'
import { timing } from './motion'
export default function CinematicHero({t,language}:{t:V3Copy;language:SiteLanguage}){
 const reduced=useReducedMotion(),root=useRef<HTMLElement>(null),videos=useRef<(HTMLVideoElement|null)[]>([])
 const [mobile,setMobile]=useState(()=>window.matchMedia('(max-width:767px)').matches)
 const [index,setIndex]=useState(0),[paused,setPaused]=useState(false),[inView,setInView]=useState(true),[visible,setVisible]=useState(!document.hidden)
 const [blocked,setBlocked]=useState(false),progress=useRef<HTMLSpanElement>(null),lastChange=useRef(0)
 const saveData=Boolean((navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData)
 const still=reduced||mobile||saveData
 const select=useCallback((next:number)=>{lastChange.current=performance.now();setIndex((next+films.length)%films.length);if(progress.current)progress.current.style.width='0%'},[])
 useEffect(()=>{const query=window.matchMedia('(max-width:767px)');const change=()=>setMobile(query.matches);query.addEventListener('change',change);return()=>query.removeEventListener('change',change)},[])
 useEffect(()=>{const change=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',change);const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting));if(root.current)observer.observe(root.current);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',change)}},[])
 useEffect(()=>{
  const timers:number[]=[]
  videos.current.forEach((video,number)=>{
   if(!video)return
   if(number===index&&!paused&&!still&&inView&&visible){
    if(video.ended||video.currentTime>=video.duration-0.8)video.currentTime=0
    void video.play().then(()=>setBlocked(false)).catch((error:unknown)=>{if(!(error instanceof DOMException&&error.name==='AbortError')){setBlocked(true);setPaused(true)}})
   }else if(number!==index&&!paused&&inView&&visible){timers.push(window.setTimeout(()=>{video.pause();video.currentTime=0},1150))}
   else video.pause()
  })
  return()=>timers.forEach(clearTimeout)
 },[index,paused,still,inView,visible])
 useEffect(()=>()=>videos.current.forEach(video=>video?.pause()),[])
 useGSAP(()=>{if(reduced)return;gsap.fromTo('[data-v3-hero]',{opacity:0,y:22},{opacity:1,y:0,duration:0.9,stagger:0.1,ease:timing.ease,delay:0.1})},{scope:root,dependencies:[language,reduced],revertOnUpdate:true})
 useGSAP(()=>{if(reduced)return;gsap.fromTo('.v3-scene-name',{opacity:0,y:8},{opacity:1,y:0,duration:timing.change,ease:timing.ease})},{scope:root,dependencies:[index,language,still,blocked,reduced],revertOnUpdate:true})
 function update(video:HTMLVideoElement,number:number,timestamp:number){
  if(number!==index||!video.duration||paused||!inView||!visible)return
  const segment=Math.min(HERO_SCENE_SECONDS,video.duration-1.05)
  if(progress.current)progress.current.style.width=(Math.min(1,video.currentTime/segment)*100)+'%'
  if(video.currentTime>=segment&&timestamp-lastChange.current>1600)select(index+1)
 }
 return <section ref={root} className="v3-hero" id="v3-hero" aria-labelledby="v3-title" data-still={still||undefined}>
  <div className="v3-film-stage" aria-hidden="true">{films.map((film,number)=><div className={'v3-film'+(index===number?' is-active':'')} key={film.id} data-scene={film.id}>
   <img src={film.poster} alt="" fetchPriority={number===0?'high':'auto'} width="1600" height="900"/>
   {!still&&<video ref={node=>{videos.current[number]=node}} src={film.src} poster={film.poster} muted playsInline preload={number===0?'auto':'metadata'} tabIndex={-1} disablePictureInPicture
    onTimeUpdate={event=>update(event.currentTarget,number,event.timeStamp)} onEnded={()=>{if(number===index&&!paused&&inView)select(index+1)}} onError={()=>{if(number===index){setBlocked(true);setPaused(true)}}}/>}
  </div>)}</div>
  <div className="v3-hero-overlay"/>
  <div className="v3-hero-copy v3-container"><p className="v3-eyebrow" data-v3-hero>FBS CONTRACTING</p><h1 id="v3-title" data-v3-hero>{t.headlineLines.map(line=><span className="v3-headline-line" key={line}>{line}</span>)}</h1><p className="v3-hero-description" data-v3-hero>{t.description}</p><a className="v3-button v3-button-white" href="#v3-company" data-v3-hero>{t.scroll}<Arrow/></a></div>
  <div className="v3-hero-bottom v3-container"><div className="v3-player"><button aria-label={t.previous} onClick={()=>select(index-1)}><Arrow previous/></button>
   {!still&&<button aria-label={paused?t.play:t.pause} aria-pressed={paused} onClick={()=>setPaused(value=>!value)}><PlaybackIcon paused={paused}/></button>}
   <button aria-label={t.next} onClick={()=>select(index+1)}><Arrow/></button><span className="v3-scene-name">{still||blocked?t.still:films[index].label[language]}</span></div>
   <div className="v3-sequence" dir="ltr" aria-label={t.scene}>{films.map((film,number)=><button key={film.id} aria-label={t.select+' '+film.id} aria-pressed={index===number} onClick={()=>select(number)}>{film.id}</button>)}<span className="v3-sequence-track"><span ref={progress}/></span></div>
  </div><p className="v3-stock-note">{t.stock}</p>
 </section>
}
