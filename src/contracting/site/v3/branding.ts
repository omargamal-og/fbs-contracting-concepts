import type { SiteLanguage } from '../i18n/types'
import { MEDIA } from './content'

// Lossless canvas trims of the approved English mark and user-supplied Arabic mark.
// Original artwork is retained; see docs/media/v3-navbar-logos.json.
export function v3Brand(language: SiteLanguage) {
 return {
  src: MEDIA + (language === 'ar' ? 'fbs-contracting-arabic-navbar.png' : 'fbs-contracting-english-navbar.png'),
  width: language === 'ar' ? 2025 : 372,
  height: language === 'ar' ? 255 : 42,
  label: language === 'ar' ? 'إف بي إس للمقاولات' : 'FBS Contracting',
 }
}
