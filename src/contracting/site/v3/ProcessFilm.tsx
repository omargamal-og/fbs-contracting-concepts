import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../v2/motion/useReducedMotion'
import { MEDIA, type V3Copy } from './content'
import { PlaybackIcon } from './icons'
import { upgradeCopy } from './upgradeContent'
import type { SiteLanguage } from '../i18n/types'

export function ProcessFilm({t,language}:{t:V3Copy;language:SiteLanguage}) {
 const root=useRef<HTMLDivElement>(null),video=useRef<HTMLVideoElement>(null),reduced=useReducedMotion()
 const [inView,setInView]=useState(false),[visible,setVisible]=useState(!document.hidden),[paused,setPaused]=useState(false)
 const [mobile,setMobile]=useState(()=>window.matchMedia('(max-width:767px)').matches),[failed,setFailed]=useState(false)
 const p=upgradeCopy(language),saveData=Boolean((navigator as Navigator&{connection?:{saveData?:boolean}}).connection?.saveData),still=reduced||mobile||saveData
 useEffect(()=>{
  const query=window.matchMedia('(max-width:767px)'),resize=()=>setMobile(query.matches),visibility=()=>setVisible(!document.hidden)
  const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting),{threshold:0.1})
  if(root.current)observer.observe(root.current)
  query.addEventListener('change',resize);document.addEventListener('visibilitychange',visibility)
  return()=>{observer.disconnect();query.removeEventListener('change',resize);document.removeEventListener('visibilitychange',visibility)}
 },[])
 useEffect(()=>{
  const node=video.current;if(!node)return
  if(!still&&inView&&visible&&!paused&&!failed)void node.play().catch(()=>setFailed(true))
  else node.pause()
  return()=>node.pause()
 },[still,inView,visible,paused,failed])
 return <div ref={root} className="v3-process-film" data-process-state={still?'still':!inView||!visible||paused||failed?'paused':'playing'}>
  <img src={MEDIA+'company-collaboration.webp'} alt={t.serviceVisual} width="1400" height="788"/>
  {!still&&inView&&!failed&&<video ref={video} src={MEDIA+'hero-02-engineers.mp4'} poster={MEDIA+'company-collaboration.webp'} muted playsInline loop preload="none" tabIndex={-1} aria-hidden="true" disablePictureInPicture onError={()=>setFailed(true)}/>}
  {!still&&!failed&&<button className="v3-film-control" aria-label={paused?p.playFilm:p.pauseFilm} aria-pressed={paused} onClick={()=>setPaused(value=>!value)}><PlaybackIcon paused={paused}/></button>}
 </div>
}
