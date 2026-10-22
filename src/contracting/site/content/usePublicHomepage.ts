import { useEffect, useState } from 'react'
import type { Language } from './database.types'
import { getPublicHomepage } from './publicContent'
import type { ContentState, HomepageContent } from './types'
// Prepared for Phase 2; intentionally not mounted in the current homepage.
export function usePublicHomepage(language: Language): ContentState<HomepageContent> {
  const [loaded, setLoaded] = useState<{ language: Language; state: ContentState<HomepageContent> }>({ language, state: { status: 'loading' } })
  useEffect(() => {
    const controller = new AbortController()
    void getPublicHomepage({ language, signal: controller.signal }).then(state => {
      if (!controller.signal.aborted) setLoaded({ language, state })
    })
    return () => controller.abort()
  }, [language])
  return loaded.language === language ? loaded.state : { status: 'loading' }
}

