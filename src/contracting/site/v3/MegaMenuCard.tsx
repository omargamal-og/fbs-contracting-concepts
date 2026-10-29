import { Link } from 'react-router-dom'
import type { MediaRef } from '../v2/content/model'
import { V3Image } from './Image'
import { Arrow } from './icons'
export type MenuCardContent={title:string;note:string;to?:string;href?:string;media?:MediaRef;image:string;imageFit?:'contain';symbol?:'people'|'building'|'line';action?:()=>void;actionLabel?:string}
export function MegaMenuCard({card,onFollow,variant='standard'}:{card:MenuCardContent;onFollow:()=>void;variant?:'standard'|'feature'|'spotlight'}){
 const className='v3-menu-card v3-menu-card-'+variant
 const content=<><span className={'v3-menu-card-visual'+(card.imageFit?' is-'+card.imageFit:'')} aria-hidden="true"><V3Image media={card.media} src={card.image} alt="" eager/><span className="v3-menu-card-shade"/></span><span className="v3-menu-card-copy"><strong>{card.title}</strong><small>{card.note}</small>{variant==='feature'&&card.actionLabel&&<span className="v3-menu-card-cta">{card.actionLabel}<Arrow/></span>}<Arrow/></span></>
 const follow=()=>{onFollow();card.action?.()}
 if(card.href)return <a className={className} href={card.href} target="_blank" rel="noopener noreferrer" onClick={follow}>{content}</a>
 if(card.action)return <button className={className} onClick={follow}>{content}</button>
 return card.to?<Link className={className} to={card.to} onClick={follow}>{content}</Link>:null
}
