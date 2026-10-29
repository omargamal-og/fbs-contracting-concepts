import type { SiteLanguage } from '../i18n/types'
import { MEDIA } from './content'

// Both supplied transparent brand assets share the same canvas dimensions.
export function v3Brand(language: SiteLanguage) {
 return {
  src: MEDIA + (language === 'ar' ? 'fbs-contracting-ar-transparent.png' : 'fbs-contracting-en-transparent.png'),
  width: 910,
  height: 385,
  label: language === 'ar' ? 'FBS \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u0627\u062a' : 'FBS Contracting',
 }
}
