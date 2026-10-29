import { useEffect, useEffectEvent, useRef, useState, type KeyboardEvent } from 'react'
import type { SiteLanguage } from '../../i18n/types'
import { useReducedMotion } from '../../v2/motion/useReducedMotion'
import { V3Image } from '../Image'
import { Arrow } from '../icons'
import { approvedCityProjects, cities, type MapProject } from './model'
import { mapCopy } from './copy'
import type { SaudiScene, SceneAction } from './createSaudiScene'
import { Link } from 'react-router-dom'
import { projectDetailPath } from '../projectNavigation'

type ConstructionPeriodFilter='all'|'past'|'current'|'future'
function projectPeriodGroup(project:MapProject,currentYear:number):Exclude<ConstructionPeriodFilter,'all'>|null{
  const period=project.period
  if(!period||!Number.isFinite(period.startYear)||!Number.isFinite(period.endYear)||period.startYear>period.endYear)return null
  if(period.endYear<currentYear)return 'past'
  if(period.startYear>currentYear)return 'future'
  return 'current'
}

export function SaudiProjectMap({ language, projects, preview=false }: { language: SiteLanguage; projects: MapProject[]; preview?:boolean }) {
  const t = mapCopy(language), reduced = useReducedMotion()
  const periodLabels={past:t.pastPeriod,current:t.currentPeriod,future:t.futurePeriod}
  const currentYear=new Date().getFullYear()
  const section = useRef<HTMLElement>(null), host = useRef<HTMLDivElement>(null), scene = useRef<SaudiScene | null>(null), toggle = useRef<HTMLButtonElement>(null)
  const [near, setNear] = useState(false), [ready, setReady] = useState(false), [failed, setFailed] = useState(false), [interacting, setInteracting] = useState(false)
  const [selected, setSelected] = useState('riyadh'), [category, setCategory] = useState(''), [periodFilter,setPeriodFilter]=useState<ConstructionPeriodFilter>('all')
  const [ambient,setAmbient]=useState(()=>!(navigator as Navigator&{connection?:{saveData?:boolean}}).connection?.saveData),[projectIndex,setProjectIndex]=useState(0)
  const isPreview=preview
  const selectedCity = cities.find(city => city.id === selected)!, available = projects.filter(project => (project.published||isPreview)&&cities.some(city => city.id === project.cityKey))
  const categories = [...new Set(available.map(project => project.category).filter((value): value is string => Boolean(value)))]
  const filteredProjects=available.filter(project=>(!category||project.category===category)&&(periodFilter==='all'||projectPeriodGroup(project,currentYear)===periodFilter))
  const cityProjects = isPreview?filteredProjects.filter(project=>project.cityKey===selected):approvedCityProjects(filteredProjects, selected, category)
  const activeProject=cityProjects.length?cityProjects[projectIndex%cityProjects.length]:undefined
  const syncView = useEffectEvent((view: SaudiScene) => {view.enable(interacting);view.setAmbient(ambient); if (selected !== 'riyadh') view.select(selected) })
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setNear(true); observer.disconnect() } }, { rootMargin: '250px' })
    if (section.current) observer.observe(section.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!near || !host.current || failed) return
    const node = host.current; let disposed = false, view: SaudiScene | undefined, visible = false, factory:typeof import('./createSaudiScene').createSaudiScene|undefined
    function initialize(){
      if(disposed||view||!visible||!factory)return
      try{view=factory(node,Array.from(node.querySelectorAll<HTMLElement>('.v3-map-pin')),reduced,()=>setFailed(true));scene.current=view;view.setActive(true);view.entrance();syncView(view);setReady(true)}catch{setFailed(true)}
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting;initialize(); view?.setActive(visible) }, { threshold: 0.05 })
    observer.observe(node)
    void import('./createSaudiScene').then(({ createSaudiScene }) => {
      factory=createSaudiScene;initialize()
    }).catch(() => { if (!disposed) setFailed(true) })
    return () => { disposed = true; observer.disconnect(); view?.dispose(); scene.current = null }
  }, [near, reduced, failed])
  useEffect(() => { scene.current?.enable(interacting) }, [interacting, ready])
  useEffect(()=>{scene.current?.setAmbient(ambient)},[ambient,ready])
  function select(id: string) { setSelected(id);setProjectIndex(0);scene.current?.select(id) }
  function action(action: SceneAction) { scene.current?.action(action) }
  function key(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || !interacting) return
    const actions: Record<string, SceneAction> = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'in', ArrowDown: 'out', '+': 'in', '=': 'in', '-': 'out', '0': 'reset' }
    if (event.key === 'Escape') { event.preventDefault(); setInteracting(false); toggle.current?.focus({ preventScroll: true }) }
    else if (actions[event.key]) { event.preventDefault(); action(actions[event.key]) }
  }
  return <section ref={section} id="v3-map" className="v3-section v3-map-section" aria-labelledby="v3-map-title">
    <div className="v3-map-heading" data-v3-reveal><div><p className="v3-eyebrow">{t.eyebrow}</p><h2 id="v3-map-title">{t.title}</h2></div><p>{t.intro}</p></div>
    <div className="v3-map-layout">
      <div className="v3-map-visual">
        <div className="v3-map-scene">
        <div className="v3-map-stage-label" aria-hidden="true"><span/>{t.kingdom}</div>
        <nav className="v3-map-cities" aria-label={t.cities}>{cities.map((city,index) => <button key={city.id} aria-pressed={city.id === selected} onClick={() => select(city.id)}><small aria-hidden="true">{String(index+1).padStart(2,'0')}</small>{city.name[language]}<span aria-hidden="true">↗</span></button>)}</nav>
        <p className="v3-map-model-note">{t.modelNote}</p>
        <div ref={host} className={'v3-map-canvas' + (interacting && !failed ? ' is-interactive' : '')} role="region" aria-label={t.canvas} aria-describedby="v3-map-help" tabIndex={interacting && !failed ? 0 : -1} onKeyDown={key} data-state={failed ? 'fallback' : ready ? 'ready' : 'loading'}>
          {!failed&&<><span className="v3-map-sea-label" data-map-sea="38,21">{t.redSea}</span><span className="v3-map-sea-label" data-map-sea="51,26.5">{t.gulf}</span></>}
          {!failed && <div className="v3-map-pins" aria-hidden="true">{cities.map(city => {const entries=filteredProjects.filter(project=>project.cityKey===city.id);return <button type="button" tabIndex={-1} className={'v3-map-pin'+(entries.length?' has-project':'') + (selected === city.id ? ' is-selected' : '')} key={city.id} title={`${city.name[language]} · ${entries.length}`} onClick={() => select(city.id)}><i/><span>{city.name[language]}</span><b className="v3-pin-count">{entries.length}</b></button>})}</div>}
          {(!ready || failed) && <div className="v3-map-status" role="status"><span className="v3-eyebrow">{t.scope}</span><p>{failed ? t.fallback : t.loading}</p></div>}
        </div>
        {!failed&&ready&&!reduced&&<button className="v3-map-ambient" aria-pressed={!ambient} aria-label={ambient?t.pauseMotion:t.playMotion} onClick={()=>setAmbient(value=>!value)}><span aria-hidden="true">{ambient?'Ⅱ':'▷'}</span>{ambient?t.pauseMotion:t.playMotion}</button>}
        {!failed && ready && <div className="v3-map-tools"><button ref={toggle} className="v3-map-toggle" aria-pressed={interacting} onClick={() => { const next = !interacting; setInteracting(next); if (next) host.current?.focus({ preventScroll: true }) }}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3 8 5v9l-8 4-8-4V8l8-5ZM4 8l8 5 8-5M12 13v8"/></svg>{interacting ? t.done : t.enable}</button><div>{([['left', t.left, 'M7 7h8a6 6 0 1 1-5 10M7 7l4-4M7 7l4 4'], ['right', t.right, 'M17 7H9a6 6 0 1 0 5 10M17 7l-4-4M17 7l-4 4'], ['in', t.zoomIn, 'M5 12h14M12 5v14'], ['out', t.zoomOut, 'M5 12h14'], ['reset', t.reset, 'M5 10a7 7 0 1 1 1 8M5 10V4M5 10h6']] as const).map(([value, label, path]) => <button key={value} aria-label={label} title={label} onClick={() => action(value)}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={path}/></svg></button>)}</div></div>}
        </div>
        <p id="v3-map-help" className="v3-map-help">{failed ? t.noProjectsNote : <><span>{t.shortHelp}</span><span className="v3-map-sr-only">{t.help}</span></>}</p>
        <div className="v3-map-credit"><span>{t.scope}</span><a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener noreferrer">{t.credit}</a></div>
      </div>
      <div className="v3-map-information" data-map-project-panel>
        <label className="v3-map-filter">{t.periodFilter}<select value={periodFilter} onChange={event=>{setPeriodFilter(event.target.value as ConstructionPeriodFilter);setProjectIndex(0)}}><option value="all">{t.allPeriods}</option><option value="past">{t.pastPeriod}</option><option value="current">{t.currentPeriod}</option><option value="future">{t.futurePeriod}</option></select></label>
        {categories.length > 1 && <label className="v3-map-filter">{t.filter}<select value={category} onChange={event => {setCategory(event.target.value);setProjectIndex(0)}}><option value="">{t.all}</option>{categories.map(value => <option key={value}>{value}</option>)}</select></label>}
        <div className="v3-map-panel" aria-live="polite" aria-atomic="true"><p className="v3-eyebrow">{t.cityPreview}</p><h3>{selectedCity.name[language]}</h3><p className="v3-map-coordinates" dir="ltr">{selectedCity.coordinates[1].toFixed(2)}° N <span/> {selectedCity.coordinates[0].toFixed(2)}° E</p>
          {activeProject ? <div className="v3-map-projects"><article key={activeProject.id}>{activeProject.image && <V3Image media={activeProject.image} alt={activeProject.image.alt||activeProject.name}/>}<h4>{activeProject.name}</h4>{activeProject.category && <p>{activeProject.category==='residential'?t.residential:activeProject.category==='commercial'?t.commercial:activeProject.category}</p>}{activeProject.period&&<><small className="v3-map-project-status">{activeProject.period.startYear}–{activeProject.period.endYear}</small>{projectPeriodGroup(activeProject,currentYear)&&<small className="v3-map-project-status">{periodLabels[projectPeriodGroup(activeProject,currentYear)!]}</small>}</>}<Link className="v3-link" to={projectDetailPath(activeProject.slug,language)}>{t.project}<Arrow/></Link></article>{cityProjects.length>1&&<div className="v3-map-project-switch"><button aria-label={t.previous} onClick={()=>setProjectIndex(value=>(value-1+cityProjects.length)%cityProjects.length)}><Arrow previous/></button><span>{String(projectIndex%cityProjects.length+1).padStart(2,'0')} / {String(cityProjects.length).padStart(2,'0')}</span><button aria-label={t.next} onClick={()=>setProjectIndex(value=>(value+1)%cityProjects.length)}><Arrow/></button></div>}</div> : <div className="v3-map-no-projects"><p>{language==='en'?'Explore another city.':'\u0627\u0633\u062a\u0643\u0634\u0641 \u0645\u062f\u064a\u0646\u0629 \u0623\u062e\u0631\u0649.'}</p><small>{t.noProjectsNote}</small></div>}
        </div>
      </div>
    </div>
  </section>
}
