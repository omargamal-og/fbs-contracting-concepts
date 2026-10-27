import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

// One physical cycle, with visual repeats after it. Offset is measured in CSS px,
// independent of language; only the rendered transform changes sign in RTL.
export function useProjectGallery(identity: string, rtl: boolean, reduced: boolean) {
 const viewport = useRef<HTMLDivElement>(null), track = useRef<HTMLDivElement>(null)
 const offset = useRef(0), cycle = useRef(0), step = useRef(0)
 const [copies, setCopies] = useState(3), [near, setNear] = useState(false), [inView, setInView] = useState(false)
 const [visible, setVisible] = useState(!document.hidden), [paused, setPaused] = useState(false)
 const [hovered, setHovered] = useState(false), [focused, setFocused] = useState(false), [dragging, setDragging] = useState(false)
 const paint = useCallback(() => {
  const node = track.current
  if (!node || !cycle.current || reduced) return
  offset.current = ((offset.current % cycle.current) + cycle.current) % cycle.current
  node.style.setProperty('transform', `translate3d(${(rtl ? 1 : -1) * offset.current}px,0,0)`)
 }, [rtl, reduced])
 useLayoutEffect(() => {
  const node = viewport.current, content = track.current
  if (!node || !content) return
  offset.current = 0; node.scrollTo({left:0,behavior:'instant'}); content.style.removeProperty('transform')
  const measure = () => {
   const group = content.querySelector<HTMLElement>('[data-gallery-original]'), card = group?.querySelector<HTMLElement>('.v3-project-card')
   if (!group || !card) return
   cycle.current = group.getBoundingClientRect().width
   step.current = card.getBoundingClientRect().width + Number.parseFloat(getComputedStyle(group).columnGap)
   setCopies(Math.max(1, Math.ceil(node.clientWidth / cycle.current)))
   content.setAttribute('data-gallery-period', String(cycle.current))
   paint()
  }
  measure()
  const resize = new ResizeObserver(measure); resize.observe(node)
  return () => { resize.disconnect(); content.style.removeProperty('transform') }
  // Rebuild only for new records, direction or the user's motion preference.
 }, [identity, rtl, reduced, paint])
 useEffect(() => {
  const node = viewport.current; if (!node) return
  const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 })
  const preload = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: '600px' })
  observer.observe(node); preload.observe(node)
  const visibility = () => setVisible(!document.hidden)
  document.addEventListener('visibilitychange', visibility)
  return () => { observer.disconnect(); preload.disconnect(); document.removeEventListener('visibilitychange', visibility) }
 }, [identity])
 const state = reduced ? 'reduced' : !visible ? 'hidden' : !inView ? 'offscreen' : paused || hovered || focused || dragging ? 'paused' : 'running'
 useEffect(() => {
  const node = viewport.current; if (node) node.setAttribute('data-gallery-state', state)
  if (state !== 'running') return
  let frame = 0, previous = 0
  const tick = (time: number) => {
   if (previous) offset.current += Math.min(time - previous, 64) * 0.048 // 48 CSS pixels / second, no easing.
   previous = time; paint(); frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(frame)
  // Offset/geometry are refs so frames do not rerender the component.
 }, [state, rtl, reduced, identity, paint])
 return { viewport, track, getOffset: () => offset.current, getStep: () => step.current, moveTo: (value: number) => { offset.current = value; paint() }, copies, near, paused, setPaused, setHovered, setFocused, setDragging, state }
}
