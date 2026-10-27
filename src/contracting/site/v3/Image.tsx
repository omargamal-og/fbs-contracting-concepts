import { useEffect, useRef, useState } from 'react'
import type { MediaRef } from '../v2/content/model'
import { useMediaSource } from '../v2/content/useMediaSource'
export function V3Image({media,src,alt='',className='',eager=false,parallax=false,position='center'}:{media?:MediaRef;src?:string;alt?:string;className?:string;eager?:boolean;parallax?:boolean;position?:string}){
 const root=useRef<HTMLDivElement>(null),[near,setNear]=useState(eager),[failed,setFailed]=useState('')
 useEffect(()=>{if(eager||!root.current)return;const observer=new IntersectionObserver(([entry])=>setNear(entry.isIntersecting),{rootMargin:'500px'});observer.observe(root.current);return()=>observer.disconnect()},[eager])
 const delivery=useMediaSource(media,near),url=delivery.url||src
 return <div ref={root} className={'v3-image '+className}><div className="v3-image-plane" data-v3-parallax={parallax||undefined}>
 {url&&url!==failed?<img src={url} srcSet={delivery.srcSet||undefined} sizes="(max-width:767px) 100vw, 65vw" alt={media?.alt||alt} width={media?.width} height={media?.height} loading={eager?'eager':'lazy'} decoding="async" style={{objectPosition:position}} onError={()=>setFailed(url)}/>:<div className="v3-image-placeholder" aria-hidden="true"><svg viewBox="0 0 400 300" fill="none"><path d="M30 260 170 80l130 40v140M80 260V120l180-60 90 80v120M170 80v180M80 160l180-60M80 200l180-60M80 240l180-60"/></svg></div>}
 </div></div>
}
