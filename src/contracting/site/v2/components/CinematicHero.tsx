import { useEffect, useRef, useState } from 'react'
import type { HeroEntry, HomepageView } from '../content/model'
import { useMediaSource } from '../content/useMediaSource'
import { v2Dictionary } from '../i18n'
import { gsap, useGSAP } from '../motion/gsap'
import { useReducedMotion } from '../motion/useReducedMotion'
import { Arrow, MediaImage } from './primitives'
function Film({entry,active,paused,muted,loop,onEnded,onBlocked}:{entry:HeroEntry;active:boolean;paused:boolean;muted:boolean;loop:boolean;onEnded:()=>void;onBlocked:()=>void}) {
  const reduced=useReducedMotion(),video=useRef<HTMLVideoElement>(null)
  const [mobile,setMobile]=useState(()=>window.matchMedia('(max-width:700px)').matches)
  const [failed,setFailed]=useState(false)
  useEffect(()=>{const query=window.matchMedia('(max-width:700px)');const change=()=>setMobile(query.matches);query.addEventListener('change',change);return()=>query.removeEventListener('change',change)},[])
  const media=mobile&&entry.mobile?entry.mobile:entry.media
  const source=useMediaSource(media,active&&!reduced)
  const poster=useMediaSource(entry.poster,active)
  useEffect(()=>{
    const node=video.current
    if(!node||!source.url)return
    const sync=()=>{
      if(!active||paused||reduced||document.hidden)node.pause()
      else void node.play().catch((error: unknown)=>{if(!(error instanceof DOMException && error.name==='AbortError'))onBlocked()})
    }
    sync();document.addEventListener('visibilitychange',sync)
    return()=>{node.pause();document.removeEventListener('visibilitychange',sync)}
  },[active,paused,reduced,source.url,onBlocked])
  return <div className={'v2-film'+(active?' is-active':'')} aria-hidden="true" style={{'--focal-x':entry.focalPoint.x+'%','--focal-y':entry.focalPoint.y+'%'} as React.CSSProperties}>
    <MediaImage media={media.type==='image'?media:entry.poster} eager className="v2-film-poster"/>
    {media.type==='video'&&!reduced&&!failed&&source.url&&<video ref={video} className="v2-hero-video" src={source.url} poster={poster.url||undefined} muted={muted} loop={loop} playsInline preload={active?'auto':'none'}
      onError={()=>setFailed(true)} onEnded={onEnded} tabIndex={-1} disablePictureInPicture/>}
  </div>
}
export function CinematicHero({data}:{data:HomepageView}) {
  const t=v2Dictionary(data.language),reduced=useReducedMotion(),scope=useRef<HTMLElement>(null)
  const [index,setIndex]=useState(0),[paused,setPaused]=useState(false),[muted,setMuted]=useState(true),[visible,setVisible]=useState(true)
  useEffect(()=>{
    if(!scope.current)return
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting))
    observer.observe(scope.current)
    return()=>observer.disconnect()
  },[])
  const active=data.heroMedia[index%Math.max(1,data.heroMedia.length)]
  const hasVideo=active?.media.type==='video'
  const next=()=>setIndex(value=>(value+1)%Math.max(1,data.heroMedia.length))
  useEffect(()=>{
    if(data.heroMedia.length<2||paused||!visible||reduced||hasVideo)return
    const timer=window.setInterval(()=>setIndex(value=>(value+1)%data.heroMedia.length),8500)
    return()=>clearInterval(timer)
  },[data.heroMedia.length,paused,visible,reduced,hasVideo])
  useGSAP(()=>{
    if(reduced)return
    gsap.fromTo('[data-hero-line]',{yPercent:110,rotate:2},{yPercent:0,rotate:0,duration:1.25,stagger:0.13,ease:'power4.out',delay:0.15})
    gsap.fromTo('[data-hero-detail]',{opacity:0,y:18},{opacity:1,y:0,duration:0.9,stagger:0.1,delay:0.65,ease:'power3.out'})
  },{scope,dependencies:[data.language,data.hero.title,reduced],revertOnUpdate:true})
  const title=data.hero.title||'FBS\nContracting'
  return <section ref={scope} className="v2-hero" id="v2-hero" aria-labelledby="v2-hero-heading">
    <div className="v2-hero-media">{data.heroMedia.length?data.heroMedia.map((entry,entryIndex)=><Film key={entry.id} entry={entry} active={entryIndex===index%data.heroMedia.length} paused={paused||!visible} muted={muted} loop={data.heroMedia.length===1}
      onEnded={()=>{if(!paused&&!reduced)next()}} onBlocked={()=>setPaused(true)}/>):<div className="v2-hero-abstract" aria-hidden="true"><div/><div/><div/><span>FBS</span></div>}</div>
    <div className="v2-hero-shade"/>
    <div className="v2-hero-content v2-container">
      <p className="v2-eyebrow" data-hero-detail><span className="v2-small-rule"/>{t.heroEyebrow}</p>
      <div className="v2-hero-editorial"><h1 id="v2-hero-heading">{title.split('\n').map((line,lineIndex)=><span className="v2-line-clip" key={lineIndex}><span data-hero-line>{line}</span></span>)}</h1>
        <div className="v2-hero-aside" data-hero-detail>{data.hero.summary&&<p>{data.hero.summary}</p>}<a href="#v2-projects" className="v2-button v2-button-light">{t.explore}<Arrow/></a></div>
      </div>
      <div className="v2-hero-bottom" data-hero-detail><a href="#v2-impact" className="v2-scroll"><span className="v2-scroll-line"/>{t.scroll}</a>
        <div className="v2-film-controls">{data.source==='development'&&<span className="v2-film-caption">{t.previewArtwork}</span>}
          {hasVideo&&!reduced&&<><button onClick={()=>setPaused(value=>!value)} aria-label={paused?t.play:t.pause}>{paused?'▶':'Ⅱ'}</button><button onClick={()=>setMuted(value=>!value)} aria-label={muted?t.unmute:t.mute}>{muted?'◌':'◉'}</button></>}
          {data.heroMedia.length>1&&<><div className="v2-film-dots">{data.heroMedia.map((entry,entryIndex)=><button key={entry.id} onClick={()=>setIndex(entryIndex)} aria-label={t.selectFilm+' '+(entryIndex+1)} aria-pressed={entryIndex===index%data.heroMedia.length}/>)}</div><button onClick={next} aria-label={t.nextFilm}><Arrow/></button></>}
          {(!hasVideo||reduced)&&<span className="v2-still-indicator"><span/>{reduced?t.staticView:t.still}</span>}
        </div>
      </div>
    </div>
  </section>
}

