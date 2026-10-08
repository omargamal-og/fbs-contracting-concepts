import { translations } from './translations'
import { useLanguage } from './useLanguage'

export function useTranslation() {
  const { language } = useLanguage()

  return translations[language]
}