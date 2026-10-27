import { useLayoutEffect, useRef, type RefObject } from 'react'
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom'
// V3 owns its scroll position. Content/media updates never replay navigation.
const positions=new Map<string,number>()
export function useV3Scroll(root:RefObject<HTMLDivElement|null>){
 const location=useLocation(),navigate=useNavigate(),navigation=useNavigationType()
 const previous=useRef<{pathname:string;hash:string;search:string}|null>(null)
 useLayoutEffect(()=>{
  const prior=previous.current,searchOnly=navigation==='REPLACE'&&prior?.pathname===location.pathname&&prior.hash===location.hash&&prior.search!==location.search
  const reload=!prior&&performance.getEntriesByType('navigation').some(entry=>(entry as PerformanceNavigationTiming).type==='reload')
  const restoration=history.scrollRestoration;history.scrollRestoration='manual'
  if(!searchOnly){
   const restored=navigation==='POP'?positions.get(location.key):undefined
   const anchor=!reload&&location.hash?document.getElementById(decodeURIComponent(location.hash.slice(1))):null
   if(restored!==undefined)window.scrollTo({top:restored,behavior:'instant'})
   else if(anchor)window.scrollTo({top:window.scrollY+anchor.getBoundingClientRect().top-(Number.parseFloat(getComputedStyle(anchor).scrollMarginTop)||0),behavior:'instant'})
   else window.scrollTo({top:0,left:0,behavior:'instant'})
  }
  previous.current={pathname:location.pathname,hash:location.hash,search:location.search}
  const save=()=>{positions.set(location.key,window.scrollY);if(positions.size>100)positions.delete(positions.keys().next().value!)}
  save();window.addEventListener('scroll',save,{passive:true})
  return()=>{window.removeEventListener('scroll',save);history.scrollRestoration=restoration}
 },[location.key,location.pathname,location.search,location.hash,navigation])
 useLayoutEffect(()=>{
  const node=root.current;if(!node)return
  const follow=(event:MouseEvent)=>{
   if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return
   const anchor=(event.target as Element).closest<HTMLAnchorElement>('a[href]');if(!anchor||anchor.target||anchor.hasAttribute('download'))return
   const url=new URL(anchor.href,window.location.href)
   if(url.origin!==window.location.origin||url.pathname!==location.pathname||!url.hash)return
   event.preventDefault()
   navigate({pathname:url.pathname,search:url.search||location.search,hash:url.hash})
  }
  node.addEventListener('click',follow);return()=>node.removeEventListener('click',follow)
 },[root,navigate,location.pathname,location.search])
}
