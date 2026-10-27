import { Component, type ReactNode, lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { verifiedMapProjects, v2Path, type HomepageView } from '../content/model'
import { v2Dictionary } from '../i18n'
import { Arrow, Eyebrow, MediaImage } from './primitives'
const MapboxCanvas=lazy(()=>import('./MapboxCanvas'))
class MapBoundary extends Component<{children:ReactNode;onFailure:()=>void},{failed:boolean}> {
  state={failed:false}
  static getDerivedStateFromError(){return {failed:true}}
  componentDidCatch(){this.props.onFailure()}
  render(){return this.state.failed?null:this.props.children}
}
export function ProjectMapSection({data}:{data:HomepageView}) {
  const t=v2Dictionary(data.language)
  const [selectedId,setSelectedId]=useState(''),[near,setNear]=useState(false),[failed,setFailed]=useState(false)
  const section=useRef<HTMLElement>(null)
  const projects=useMemo(()=>verifiedMapProjects(data.projects),[data.projects])
  const selected=data.projects.find(project=>project.id===selectedId)??data.projects[0]
  const token=import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN?.trim()??''
  const canMap=token.startsWith('pk.')&&projects.length>0&&!failed&&near
  const onSelect=useCallback((id:string)=>setSelectedId(id),[]),onFailure=useCallback(()=>setFailed(true),[])
  useEffect(()=>{if(!section.current)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setNear(true);observer.disconnect()}},{rootMargin:'300px'});observer.observe(section.current);return()=>observer.disconnect()},[])
  const fallback=<div className="v2-map-fallback" data-testid="map-fallback"><div className="v2-map-grid" aria-hidden="true"/><div className="v2-map-compass" aria-hidden="true"><span/><span/><span/></div>
    <div className="v2-map-fallback-caption"><span className="v2-eyebrow">{t.saudi}</span><h3>{t.mapFallbackTitle}</h3><p>{t.mapFallbackNote}</p></div></div>
  return <section ref={section} id="v2-map" className="v2-map-section v2-dark v2-section" aria-labelledby="v2-map-heading"><div className="v2-container">
    <div className="v2-section-heading" data-reveal><div><Eyebrow>{t.mapEyebrow}</Eyebrow><h2 id="v2-map-heading">{t.mapTitle}</h2></div><p>{t.mapIntro}</p></div>
    <div className="v2-map-layout"><div className="v2-map-stage">{canMap?<MapBoundary onFailure={onFailure}><Suspense fallback={fallback}><MapboxCanvas projects={projects} selectedId={selected?.id??''} token={token} onSelect={onSelect} onFailure={onFailure} label={t.mapLabel}/></Suspense></MapBoundary>:fallback}
      {selected&&<div className="v2-map-selected"><div className="v2-map-preview-image"><MediaImage media={selected.image}/></div><div><span className="v2-eyebrow">{selected.location??t.projects}</span><h3>{selected.name}</h3><Link to={v2Path('projects/'+selected.slug)} className="v2-text-link is-light">{t.viewProject}<Arrow/></Link></div></div>}
    </div><div className="v2-map-projects"><p className="v2-eyebrow">{t.projectSelection}</p>{data.projects.length?<div className="v2-map-project-list">{data.projects.map((project,index)=><button key={project.id} aria-pressed={selected?.id===project.id} onClick={()=>setSelectedId(project.id)}><span className="v2-map-list-number">{String(index+1).padStart(2,'0')}</span><span><strong>{project.name}</strong><small>{project.location??t.mapNoLocation}</small></span><Arrow diagonal/></button>)}</div>:<p>{t.projectEmptyNote}</p>}</div></div>
  </div></section>
}

