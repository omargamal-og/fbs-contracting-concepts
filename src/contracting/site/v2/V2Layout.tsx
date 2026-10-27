import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage'
import { useV2Content } from './content/useV2Content'
import { emptyHomepage } from './content/model'
import { v2Dictionary } from './i18n'
import { MegaNavigation } from './components/MegaNavigation'
import { SharedBackdrop } from './components/SharedBackdrop'
import { CorporateFooter } from './components/CorporateFooter'
import HomePage from './HomePage'
import DetailPage from './DetailPage'
import './styles.css'
export default function V2Layout() {
  const {language,direction}=useLanguage(),{state,retry}=useV2Content(language),location=useLocation(),t=v2Dictionary(language)
  const data=state.status==='ready'?state.data:emptyHomepage(language)
  useEffect(()=>{
    const previous={language:document.documentElement.lang,direction:document.documentElement.dir,title:document.title}
    document.documentElement.lang=language;document.documentElement.dir=direction
    document.title=language==='ar'?'FBS للمقاولات | معاينة الموقع المؤسسي':'FBS Contracting | Corporate preview'
    try{localStorage.setItem('fbs-v2-language',language)}catch{/* Storage is optional. */}
    return()=>{document.documentElement.lang=previous.language;document.documentElement.dir=previous.direction;document.title=previous.title}
  },[language,direction])
  useEffect(()=>{
    if(!location.hash)return
    const timer=window.setTimeout(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView(),80)
    return()=>window.clearTimeout(timer)
  },[location.hash,state.status])
  return <div className="fbs-v2" data-preview={data.source==='development'||undefined} dir={direction} lang={language} id="v2-top">
    <a className="v2-skip" href="#v2-main">{language==='ar'?'انتقل إلى المحتوى':'Skip to content'}</a>
    {data.source==='development'&&<aside className="v2-preview-banner"><strong>{t.preview}</strong><span>{t.previewNote}</span></aside>}
    <SharedBackdrop entry={data.heroMedia[0]}/><MegaNavigation data={data}/>
    <div data-v2-page>
      {state.status==='loading'&&<p className="v2-content-status" role="status">{t.loading}</p>}
      {state.status==='error'&&<p className="v2-content-status" role="alert">{t.error} <button onClick={retry}>{t.retry}</button></p>}
      {state.status==='ready'&&data.source==='unavailable'&&<p className="v2-content-status" role="status">{state.backend==='error'?t.error:t.unavailable} <button onClick={retry}>{t.retry}</button></p>}
      <Routes><Route index element={<HomePage data={data}/>}/><Route path="projects/:slug" element={<DetailPage data={data} type="project"/>}/><Route path="news/:slug" element={<DetailPage data={data} type="news"/>}/><Route path="*" element={<DetailPage data={data} type="notfound"/>}/></Routes>
      <CorporateFooter data={data}/>
    </div>
  </div>
}

