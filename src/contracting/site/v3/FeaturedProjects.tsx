import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { HomepageView, ProjectView } from '../v2/content/model'
import { useMediaSource } from '../v2/content/useMediaSource'
import { useReducedMotion } from '../v2/motion/useReducedMotion'
import type { V3Copy } from './content'
import { premiumCopy } from './premiumCopy'
import { Arrow, PlaybackIcon } from './icons'
import { useProjectGallery } from './useProjectGallery'
import { V3Image } from './Image'
import { Link } from 'react-router-dom'
import { projectDetailPath } from './projectNavigation'
import { MEDIA, V3_BASE } from './content'
import { featuredProfileProjectSlugs } from './profileProjects'

type Delivery = { url: string; srcSet: string }
// One signed-media subscription per real project, shared by all visual repeats.
function GalleryAsset({ project, enabled, onDelivery }: { project: ProjectView; enabled: boolean; onDelivery: (id: string, delivery: Delivery) => void }) {
 const delivery = useMediaSource(project.image, enabled)
 useEffect(() => { onDelivery(project.id, { url: delivery.url||project.image?.developmentUrl||'', srcSet: delivery.srcSet }) }, [project.id, project.image?.developmentUrl, delivery.url, delivery.srcSet, onDelivery])
 return null
}

export function FeaturedProjects({ t, data }: { t: V3Copy; data: HomepageView }) {
 const reduced = useReducedMotion()
 const projects = data.projects.filter(project=>featuredProfileProjectSlugs.includes(project.slug)), rtl = data.language === 'ar', p = premiumCopy(data.language)
 const identity = data.language + ':' + projects.map(project => project.id).join(',')
 const gallery = useProjectGallery(identity, rtl, reduced), { viewport, track, setDragging } = gallery
 const [images, setImages] = useState<Record<string, Delivery>>({})
 const deliver = useCallback((id: string, delivery: Delivery) => setImages(previous => previous[id]?.url === delivery.url && previous[id]?.srcSet === delivery.srcSet ? previous : { ...previous, [id]: delivery }), [])
 const drag = useRef<{ x: number; y: number; offset: number; scroll: number; pointer: number; moved: boolean } | null>(null)
 const suppressClick = useRef(0)
 useEffect(() => {
  const release = () => { if (drag.current) { drag.current = null; setDragging(false); viewport.current?.classList.remove('is-dragging') } }
  window.addEventListener('pointerup', release); window.addEventListener('pointercancel', release); window.addEventListener('blur', release)
  return () => { window.removeEventListener('pointerup', release); window.removeEventListener('pointercancel', release); window.removeEventListener('blur', release) }
 }, [setDragging, viewport])
 function originalButtons() { return Array.from(track.current?.querySelectorAll<HTMLAnchorElement>('[data-gallery-original] a[data-project-link]') ?? []) }
 function reveal(number: number, focus = false) {
  const index = (number + projects.length) % projects.length, button = originalButtons()[index], node = viewport.current
  if (!button || !node) return
  if (reduced) {
   const card = button.closest<HTMLElement>('.v3-project-card')!, a = card.getBoundingClientRect(), b = node.getBoundingClientRect()
   node.scrollBy({ left: rtl ? a.right - b.right : a.left - b.left, behavior: 'instant' }); gallery.moveTo(index * gallery.getStep())
  } else { gallery.moveTo(index * gallery.getStep());  }
  if (focus) button.focus({ preventScroll: true })
 }
 function key(event: KeyboardEvent<HTMLElement>) {
  const current = originalButtons().indexOf(document.activeElement as HTMLAnchorElement)
  if (current < 0) return
  let next: number
  if (event.key === 'ArrowRight') next = current + (rtl ? -1 : 1)
  else if (event.key === 'ArrowLeft') next = current + (rtl ? 1 : -1)
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = projects.length - 1
  else return
  event.preventDefault(); reveal(Math.max(0, Math.min(projects.length - 1, next)), true)
 }
 function start(event: PointerEvent<HTMLDivElement>) {
  if (event.button !== 0 || !projects.length) return
  if (event.pointerType === 'mouse') event.preventDefault()
  drag.current = { x: event.clientX, y: event.clientY, offset: gallery.getOffset(), scroll: event.currentTarget.scrollLeft, pointer: event.pointerId, moved: false }
  setDragging(true)
 }
 function move(event: PointerEvent<HTMLDivElement>) {
  const start = drag.current; if (!start || start.pointer !== event.pointerId) return
  const dx = event.clientX - start.x, dy = event.clientY - start.y
  if (!start.moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
   start.moved = true; event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.classList.add('is-dragging')
  }
  if (!start.moved) return
  if (reduced) event.currentTarget.scrollLeft = start.scroll - dx
  else { gallery.moveTo(start.offset - dx * (rtl ? -1 : 1));  }
 }
 function end(event: PointerEvent<HTMLDivElement>) {
  if (drag.current?.moved) suppressClick.current = performance.now() + 500
  drag.current = null; setDragging(false); event.currentTarget.classList.remove('is-dragging')
  if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
 }
 function card(project: ProjectView, index: number, clone: boolean) {
  const image = images[project.id]
  return <article className="v3-project-card" key={project.id} data-project-index={index}
   onPointerEnter={event=>{if(event.pointerType!=='touch')gallery.setHovered(true)}} onPointerLeave={event=>{if(event.pointerType!=='touch')gallery.setHovered(false)}}>
   <Link className="v3-project-card-link" data-project-link to={projectDetailPath(project.slug,data.language)} aria-label={t.viewProject+': '+project.name} tabIndex={clone?-1:0} draggable={false}>
   <div className="v3-featured-visual">{image?.url ? <div className="v3-image"><div className="v3-image-plane"><img src={image.url} srcSet={image.srcSet || undefined} sizes="(max-width:767px) 85vw, 480px" alt={clone ? '' : project.image?.alt || project.name} width={project.image?.width} height={project.image?.height} draggable={false} decoding="async"/></div></div> : <V3Image alt={clone ? '' : project.name}/>}<span className="v3-project-ordinal" aria-hidden="true">{String(index+1).padStart(2,'0')}<span/>{String(projects.length).padStart(2,'0')}</span></div>
   <div className="v3-project-info"><p className="v3-eyebrow">{project.location || t.projects}</p><h3>{project.name}</h3>{project.category && <p className="v3-card-category">{project.category}</p>}<span className="v3-link">{t.viewProject}<Arrow/></span></div>
   </Link>
  </article>
 }
 return <section className="v3-section v3-projects-section" id="v3-projects" aria-labelledby="v3-projects-title" onKeyDown={key}
  onFocusCapture={event => {
   gallery.setFocused(Boolean((event.target as Element).closest('.v3-project-card'))&&(event.target as HTMLElement).matches(':focus-visible'))
   const card = (event.target as Element).closest<HTMLElement>('[data-gallery-original] .v3-project-card'), node = viewport.current
   if (card && node) { const a = card.getBoundingClientRect(), b = node.getBoundingClientRect(); if (a.left < b.left || a.right > b.right) reveal(Number(card.dataset.projectIndex)) }
  }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) gallery.setFocused(false) }}>
  <div className="v3-shell v3-projects-shell">
   <div className="v3-section-top" data-v3-reveal><div><p className="v3-eyebrow">{t.featured}</p><h2 id="v3-projects-title">{t.featuredTitle}</h2></div>{projects.length > 0 && <div className="v3-project-controls">
    {!reduced ? <button className="v3-gallery-play" aria-label={gallery.paused ? p.playGallery : p.pauseGallery} aria-pressed={gallery.paused} onClick={() => gallery.setPaused(value => !value)}><PlaybackIcon paused={gallery.paused}/><span>{gallery.paused ? p.play : p.pause}</span></button> : <span className="v3-gallery-still">{p.stationaryGallery}</span>}
    <button className="v3-icon-button" aria-label={t.previousProject} onClick={() => reveal(Math.round(gallery.getOffset() / gallery.getStep()) - 1, true)}><Arrow previous/></button><button className="v3-icon-button" aria-label={t.nextProject} onClick={() => reveal(Math.round(gallery.getOffset() / gallery.getStep()) + 1, true)}><Arrow/></button>
   </div>}</div>
   {projects.map(project => <GalleryAsset key={project.id} project={project} enabled={gallery.near} onDelivery={deliver}/>)}
   {projects.length ? <><p className="v3-gallery-help" id="v3-gallery-help">{p.galleryHelp}</p><div ref={viewport} className={'v3-project-card-rail' + (reduced ? ' is-stationary' : '')} role="region" aria-label={t.featured} aria-describedby="v3-gallery-help"
    onScroll={event => { if (reduced) gallery.moveTo(Math.abs(event.currentTarget.scrollLeft)) }}
    onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={event => { if (event.target === event.currentTarget) end(event) }} onDragStart={event => event.preventDefault()}
    onClick={event => {
     if (performance.now() < suppressClick.current) { event.preventDefault(); event.stopPropagation(); return }
    }}>
    <div ref={track} className="v3-gallery-track"><div className="v3-gallery-group" data-gallery-original>{projects.map((project, index) => card(project, index, false))}</div>{!reduced && Array.from({ length: gallery.copies }, (_, copy) => <div key={copy} className="v3-gallery-group" data-gallery-copy aria-hidden="true">{projects.map((project, index) => card(project, index, true))}</div>)}</div>
   </div></> : <div className="v3-project-unavailable"><V3Image src={MEDIA+'construction-structure.webp'} alt={t.serviceVisual}/><div><p className="v3-eyebrow">{p.projectNote}</p><h3>{t.projectsEmpty}</h3><p>{t.projectsEmptyNote}</p><nav className="v3-project-empty-links" aria-label={t.projects}><Link to={V3_BASE+'/projects#residential'}>{t.nav.residential}<Arrow/></Link><Link to={V3_BASE+'/projects#commercial'}>{t.nav.commercial}<Arrow/></Link><Link to={V3_BASE+'/projects#project-map'}>{t.nav.ourProjects}<Arrow/></Link></nav></div></div>}
   <div className="v3-project-section-foot"><span className="v3-label-dot"/><p>{p.projectNote}</p><span aria-hidden="true"/></div>
  </div>
 </section>
}
