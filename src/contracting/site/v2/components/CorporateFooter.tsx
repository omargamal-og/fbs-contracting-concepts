import { Link } from 'react-router-dom'
import { contractingPath } from '../../config/site'
import { v2Path, type HomepageView } from '../content/model'
import { v2Dictionary } from '../i18n'
import { Arrow } from './primitives'
export function CorporateFooter({data}:{data:HomepageView}) {
  const t=v2Dictionary(data.language)
  return <footer className="v2-footer v2-dark"><div className="v2-container">
    <div className="v2-footer-top"><Link to={v2Path()} className="v2-footer-brand" dir="ltr">FBS<small>{data.language==='ar'?'للمقاولات':'CONTRACTING'}</small></Link>
      <div className="v2-footer-column"><p>{t.company}</p><Link to={contractingPath('about/who-we-are')}>{t.who}</Link><Link to={contractingPath('about/our-team')}>{t.ourTeam}</Link><Link to={contractingPath('sustainability')}>{t.sustainability}</Link></div>
      <div className="v2-footer-column"><p>{t.projects}</p><a href={v2Path()+'#v2-projects'}>{t.allProjects}</a><Link to={contractingPath('projects/residential')}>{t.residential}</Link><Link to={contractingPath('projects/commercial')}>{t.commercial}</Link></div>
      <div className="v2-footer-column"><p>{t.connect}</p><Link to={contractingPath('careers')}>{t.careers}</Link><Link to={contractingPath('suppliers')}>{t.suppliers}</Link><Link to={contractingPath('contact')}>{t.contact}</Link></div>
    </div>
    {(data.contact.email||data.contact.phone||data.contact.socials.length>0)&&<div className="v2-footer-contact">{data.contact.email&&<a href={'mailto:'+data.contact.email}>{data.contact.email}</a>}{data.contact.phone&&<a dir="ltr" href={'tel:'+data.contact.phone.replace(/[^+0-9]/g,'')}>{data.contact.phone}</a>}{data.contact.socials.map(social=><a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">{social.name} ↗</a>)}</div>}
    <div className="v2-footer-bottom"><p>© {new Date().getFullYear()} {t.footerStatement}. {t.rights}</p><span>{t.saudi}</span><a href="#v2-top">{t.backTop}<Arrow/></a></div>
  </div></footer>
}

