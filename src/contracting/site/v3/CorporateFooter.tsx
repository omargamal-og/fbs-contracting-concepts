import { Link } from 'react-router-dom'
import { contractingPath } from '../config/site'
import type { HomepageView } from '../v2/content/model'
import { v3Brand } from './branding'
import { type V3Copy, V3_BASE } from './content'
import { Arrow } from './icons'
import { OFFICIAL_LINKEDIN, upgradeCopy } from './upgradeContent'

// Authentic platform silhouettes already used by this repository. Account URLs
// come only from approved CMS settings, apart from the user-specified FBS page.
const platforms={
 'linkedin.com':{name:'LinkedIn',color:'#0A66C2',path:'M5.3 3a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM3.5 9h3.6v12H3.5V9Zm6 0H13v1.7h.05c.5-.95 1.73-1.95 3.56-1.95 3.8 0 4.5 2.5 4.5 5.75V21h-3.6v-5.75c0-1.4-.03-3.2-1.95-3.2-1.97 0-2.27 1.5-2.27 3.1V21H9.5V9Z'},
 'youtube.com':{name:'YouTube',color:'#FF0000',path:'M23.5 6.2a3.1 3.1 0 0 0-2.2-2.2C19.35 3.5 12 3.5 12 3.5s-7.35 0-9.3.5A3.1 3.1 0 0 0 .5 6.2 32.4 32.4 0 0 0 0 12a32.4 32.4 0 0 0 .5 5.8A3.1 3.1 0 0 0 2.7 20c1.95.5 9.3.5 9.3.5s7.35 0 9.3-.5a3.1 3.1 0 0 0 2.2-2.2A32.4 32.4 0 0 0 24 12a32.4 32.4 0 0 0-.5-5.8ZM9.75 15.6V8.4L16 12Z'},
 'instagram.com':{name:'Instagram',color:'#C13584',path:'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z'},
 'x.com':{name:'X',color:'#000000',path:'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.637 7.584H.474l8.6-9.833L0 1.154h7.594l5.243 6.932Zm-1.29 19.492h2.039L6.482 3.24H4.295Z'},
 'facebook.com':{name:'Facebook',color:'#1877F2',path:'M13 22v-8h3l.5-4H13V8c0-1.2.4-2 2-2h1.8V2.4A22 22 0 0 0 14.2 2C10.5 2 9 4 9 7.7V10H6v4h3v8h4Z'},
} as const

export function CorporateFooter({t,data}:{t:V3Copy;data:HomepageView}) {
 const language=data.language,u=upgradeCopy(language),brand=v3Brand(language)
 const local=(path:string)=>{const url=new URL(path,window.location.origin);url.searchParams.set('lang',language);return url.pathname+url.search+url.hash}
 const columns=[
  {title:u.company,links:[[t.nav.whoWeAre,V3_BASE+'/company#about'],[t.nav.ourTeam,V3_BASE+'/company#leadership'],[t.nav.visionMission,V3_BASE+'/company#vision-mission'],[u.governance,V3_BASE+'/governance'],[t.careers,'careers']]},
  {title:u.whatWeDo,links:[[u.services,V3_BASE+'/what-we-do#services'],[u.capabilities,V3_BASE+'/what-we-do#capabilities'],[u.supplierRegistration,'suppliers']]},
  {title:u.ourApproach,links:[[u.howWeDeliver,V3_BASE+'/approach#delivery'],[t.nav.sustainability,V3_BASE+'/approach#sustainability'],[t.nav.training,'training']]},
  {title:t.projects,links:[[t.nav.residential,V3_BASE+'/projects#residential'],[t.nav.commercial,V3_BASE+'/projects#commercial'],[t.news,V3_BASE+'/news'],[t.contactLink,'contact']]},
 ]
 const published=data.source==='published',contact=published?data.contact:null
 const supplied=[{name:'LinkedIn',url:OFFICIAL_LINKEDIN},...(contact?.socials??[])]
 const seen=new Set<string>(),socials=supplied.flatMap(social=>{
  try{const url=new URL(social.url),host=url.hostname.replace(/^www\./,''),platform=platforms[host as keyof typeof platforms];if(url.protocol!=='https:'||!platform||seen.has(platform.name))return[];seen.add(platform.name);return[{...platform,url:url.href}]}catch{return[]}
 })
 return <footer className="v3-footer"><div className="v3-footer-main">
  <div className="v3-footer-brand"><Link to={local(V3_BASE)} aria-label={brand.label}><img src={brand.src} alt={brand.label} width={brand.width} height={brand.height} style={{aspectRatio:brand.width+'/'+brand.height}}/></Link><p>{u.footerLine}</p><nav className="v3-footer-socials" aria-label={u.social}>{socials.map(social=><a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} style={{'--platform-color':social.color} as React.CSSProperties}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={social.path}/></svg><span>{social.name}</span></a>)}</nav>
   <div className="v3-footer-contact">{contact?.email&&<a dir="ltr" href={'mailto:'+contact.email}>{contact.email}</a>}{contact?.phone&&<a dir="ltr" href={'tel:'+contact.phone.replace(/[^+0-9]/g,'')}>{contact.phone}</a>}{!contact?.email&&!contact?.phone&&<Link to={local(contractingPath('contact'))}>{u.contact}<Arrow/></Link>}</div>
  </div>
  {columns.map(column=><nav className="v3-footer-column" key={column.title} aria-label={column.title}><h2>{column.title}</h2>{column.links.map(([label,path])=><Link key={path} to={path.startsWith(V3_BASE)?local(path):local(contractingPath(path))}>{label}</Link>)}</nav>)}
 </div><div className="v3-footer-bottom"><p>© {new Date().getFullYear()} {brand.label}. {u.rights}</p><a className="v3-link" href="#v3-top">{t.back}<Arrow/></a></div></footer>
}
