import { Link } from 'react-router-dom'
import { contractingPath } from '../config/site'
import type { SiteLanguage } from '../i18n/types'
import type { HomepageView } from '../v2/content/model'
import { MEDIA, V3_BASE, type V3Copy } from './content'
import { Arrow } from './icons'
import { V3Image } from './Image'
import { upgradeCopy } from './upgradeContent'

export function ApproachMegaMenu({t,data,language,onFollow,onBack}:{t:V3Copy;data:HomepageView;language:SiteLanguage;onFollow:()=>void;onBack:()=>void}) {
 const u=upgradeCopy(language),local=(path:string)=>{const url=new URL(path,window.location.origin);url.searchParams.set('lang',language);return url.pathname+url.search+url.hash}
 // Categories point to existing FBS content. No new services or policy claims.
 const cards=[
  {title:u.services,note:u.servicesNote,image:'company-collaboration.webp',to:V3_BASE+'#v3-expertise'},
  {title:u.safety,note:u.safetyNote,image:'hero-02-poster.jpg',to:contractingPath('about/core-values')},
  {title:u.quality,note:u.qualityNote,image:'construction-structure.webp',to:contractingPath('sustainability/continuous-improvement')},
  {title:u.environment,note:u.environmentNote,image:'construction-background.webp',to:contractingPath('sustainability/environmental-responsibility')},
  {title:u.people,note:u.peopleNote,image:'company-collaboration.webp',to:contractingPath('training')},
  {title:u.continuity,note:u.continuityNote,image:'expertise-groundwork.webp',to:contractingPath('business-continuity/risk-assessment-management')},
 ]
 const capabilities=data.services.length?data.services.map(service=>service.title):t.services
 return <div className="v3-approach-menu">
  <button className="v3-approach-back" onClick={onBack}><Arrow previous/>{t.navigation}</button><div className="v3-approach-intro"><p className="v3-eyebrow">{u.approach}</p><h2>{u.approachTitle}</h2><p>{u.approachIntro}</p><Link className="v3-link" to={local(V3_BASE+'#v3-expertise')} onClick={onFollow}>{u.approachLink}<Arrow/></Link>
   <nav aria-label={u.capabilities} className="v3-approach-capabilities v3-menu-links"><p className="v3-eyebrow">{u.capabilities}</p>{capabilities.slice(0,5).map((title,index)=><Link data-v3-menu-link key={title} to={local(V3_BASE+'#v3-expertise')} onClick={onFollow}><span>{String(index+1).padStart(2,'0')}</span>{title}<Arrow/></Link>)}</nav>
  </div>
  <div><div className="v3-approach-grid">{cards.map(card=><Link className="v3-approach-card" data-v3-menu-link key={card.title} to={local(card.to)} onClick={onFollow}><div className="v3-approach-image"><V3Image src={MEDIA+card.image} alt="" eager/></div><div><h3>{card.title}<Arrow/></h3><p>{card.note}</p></div></Link>)}</div><p className="v3-menu-media-note">{u.stockNote}</p></div>
 </div>
}
