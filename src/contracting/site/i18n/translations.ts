import { ar } from './ar'
import { en } from './en'

import type {
  SiteDictionary,
  SiteLanguage,
} from './types'

export const translations: Record<
  SiteLanguage,
  SiteDictionary
> = {
  en,
  ar,
}