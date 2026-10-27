import { Link } from 'react-router-dom'
import type { MediaRef } from '../v2/content/model'
import { V3Image } from './Image'
import { Arrow } from './icons'
export type MenuCardContent={title:string;note:string;to?:string;href?:string;media?:MediaRef;image:string;imageFit?:'contain';symbol?:'people'|'building'|'line';action?:()=>void}
export function MegaMenuCard({card,onFollow}:{card:MenuCardContent;onFollow:()=>void}){
 const content=<><span className={'v3-menu-card-visual'+(card.imageFit?' is-'+card.imageFit:'')} aria-hidden="true"><V3Image media={card.media} src={card.image} alt="" eager/><span className="v3-menu-card-shade"/></span><span className="v3-menu-card-copy"><strong>{card.title}</strong><small>{card.note}</small><Arrow/></span></>
 const follow=()=>{onFollow();card.action?.()}
 if(card.href)return <a className="v3-menu-card" href={card.href} target="_blank" rel="noopener noreferrer" onClick={follow}>{content}</a>
 if(card.action)return <button className="v3-menu-card" onClick={follow}>{content}</button>
 return card.to?<Link className="v3-menu-card" to={card.to} onClick={follow}>{content}</Link>:null
}
