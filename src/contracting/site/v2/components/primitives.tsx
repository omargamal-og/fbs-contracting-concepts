import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useMediaSource } from '../content/useMediaSource'
import type { MediaRef } from '../content/model'
export function Arrow({diagonal=false}:{diagonal?:boolean}) {
  return <svg className="v2-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal?'M5 19 19 5M5 5h14v14':'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.4"/></svg>
}
export function TextLink({to,children,light=false}:{to:string;children:ReactNode;light?:boolean}) {
  return <Link className={'v2-text-link'+(light?' is-light':'')} to={to}>{children}<Arrow/></Link>
}
export function Eyebrow({children}:{children:ReactNode}) {return <p className="v2-eyebrow">{children}</p>}
export function MediaImage({media,className='',eager=false,style,parallax=false}:{media?:MediaRef;className?:string;eager?:boolean;style?:CSSProperties;parallax?:boolean}) {
  const root=useRef<HTMLDivElement>(null)
  const [near,setNear]=useState(eager)
  const [failed,setFailed]=useState('')
  useEffect(()=>{
    if(eager || !root.current)return
    const observer=new IntersectionObserver(([entry])=>{setNear(entry.isIntersecting)},{rootMargin:'600px'})
    observer.observe(root.current)
    return()=>observer.disconnect()
  },[eager])
  const source=useMediaSource(media,near)
  return <div ref={root} className={'v2-media '+className} style={style} data-media-empty={!media||source.failed||failed===source.url||undefined}>
    <div className="v2-media-plane" data-parallax={parallax||undefined}>{source.url && source.url!==failed && <img src={source.url} srcSet={source.srcSet||undefined} sizes="(max-width: 700px) 100vw, 70vw" alt={media?.alt??''}
      width={media?.width} height={media?.height} loading={eager?'eager':'lazy'} fetchPriority={eager?'high':'auto'} decoding="async" onError={()=>setFailed(source.url)}/>}
    {(!source.url||source.url===failed) && <span className="v2-media-drawing" aria-hidden="true"/>}</div>
  </div>
}

