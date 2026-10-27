import {
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { LanguageContext } from './LanguageContext'
import type { SiteLanguage } from './types'

type LanguageProviderProps = {
  children: ReactNode
  initialLanguage?: SiteLanguage
}

function LanguageProvider({
  children,
  initialLanguage = 'en',
}: LanguageProviderProps) {
  const [language, setLanguage] =
    useState<SiteLanguage>(initialLanguage)

  const direction: 'ltr' | 'rtl' =
    language === 'ar'
      ? 'rtl'
      : 'ltr'

  const toggleLanguage = () => {
    setLanguage((current) =>
      current === 'en'
        ? 'ar'
        : 'en',
    )
  }

  const value = useMemo(
    () => ({
      language,
      direction,
      setLanguage,
      toggleLanguage,
    }),
    [language, direction],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider