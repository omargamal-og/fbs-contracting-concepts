import { createContext } from 'react'

import type { SiteLanguage } from './types'

export type LanguageContextValue = {
  language: SiteLanguage
  direction: 'ltr' | 'rtl'
  setLanguage: (language: SiteLanguage) => void
  toggleLanguage: () => void
}

export const LanguageContext =
  createContext<LanguageContextValue | undefined>(
    undefined,
  )