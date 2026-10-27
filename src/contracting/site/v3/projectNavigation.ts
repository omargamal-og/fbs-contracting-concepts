import type { SiteLanguage } from '../i18n/types'
import { V3_BASE } from './content'
export function projectDetailPath(slug:string,language:SiteLanguage){return V3_BASE+'/projects/'+encodeURIComponent(slug)+'?lang='+language}
