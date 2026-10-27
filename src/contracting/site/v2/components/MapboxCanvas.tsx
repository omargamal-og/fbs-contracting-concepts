import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { ProjectView } from '../content/model'
import { useReducedMotion } from '../motion/useReducedMotion'
export default function MapboxCanvas({projects,selectedId,token,onSelect,onFailure,label}:{projects:ProjectView[];selectedId:string;token:string;onSelect:(id:string)=>void;onFailure:()=>void;label:string}) {
  const container=useRef<HTMLDivElement>(null),map=useRef<mapboxgl.Map|null>(null)
  const reduced=useReducedMotion(),selection=useRef(onSelect),failure=useRef(onFailure)
  useEffect(()=>{selection.current=onSelect;failure.current=onFailure},[onSelect,onFailure])
  useEffect(()=>{
    if(!container.current||!projects[0]?.coordinates)return
    let instance:mapboxgl.Map|null=null,cancelled=false
    const timeout=window.setTimeout(()=>{if(!cancelled)failure.current()},12000)
    try {
      if(!mapboxgl.supported())throw new Error('WebGL unavailable')
      const first=projects[0].coordinates
      instance=new mapboxgl.Map({container:container.current,accessToken:token,style:'mapbox://styles/mapbox/standard',
        config:{basemap:{lightPreset:'dusk',show3dObjects:true}},center:[first.longitude,first.latitude],zoom:6,pitch:reduced?0:48,bearing:reduced?0:-12,
        attributionControl:false,cooperativeGestures:true,renderWorldCopies:false})
      map.current=instance
      instance.scrollZoom.disable()
      instance.addControl(new mapboxgl.AttributionControl({compact:true}))
      instance.addControl(new mapboxgl.NavigationControl({visualizePitch:true}),'top-right')
      instance.on('load',()=>{
        window.clearTimeout(timeout)
        if(projects.length>1){const bounds=new mapboxgl.LngLatBounds();projects.forEach(project=>{if(project.coordinates)bounds.extend([project.coordinates.longitude,project.coordinates.latitude])});instance?.fitBounds(bounds,{padding:70,maxZoom:10,duration:reduced?0:1000})}
      })
      instance.on('error',()=>{if(!cancelled)failure.current()})
      projects.forEach(project=>{
        if(!project.coordinates)return
        const button=document.createElement('button')
        button.type='button';button.className='v2-map-marker';button.setAttribute('aria-label',project.name);button.textContent='↗'
        button.addEventListener('click',()=>selection.current(project.id))
        new mapboxgl.Marker({element:button,anchor:'bottom'}).setLngLat([project.coordinates.longitude,project.coordinates.latitude]).addTo(instance!)
      })
    } catch {if(!cancelled)failure.current()}
    return()=>{cancelled=true;window.clearTimeout(timeout);instance?.remove();map.current=null}
  },[projects,token,reduced])
  useEffect(()=>{
    const project=projects.find(row=>row.id===selectedId)
    if(!map.current||!project?.coordinates)return
    const target={center:[project.coordinates.longitude,project.coordinates.latitude] as [number,number],zoom:13,pitch:reduced?0:54,bearing:reduced?0:-12}
    if(reduced)map.current.jumpTo(target)
    else map.current.flyTo({...target,duration:1600,essential:false})
  },[selectedId,projects,reduced])
  return <div ref={container} className="v2-map-canvas" role="region" aria-label={label}/>
}

