import { useState } from 'react'
import LanguageProvider from '../i18n/LanguageProvider'
import ContractingThemeProvider from '../theme/ContractingThemeProvider'
import type { SiteLanguage } from '../i18n/types'
import V2Layout from './V2Layout'
function preferredLanguage():SiteLanguage {
  const requested=new URLSearchParams(window.location.search).get('lang')
  if(requested==='ar'||requested==='en')return requested
  try{return localStorage.getItem('fbs-v2-language')==='ar'?'ar':'en'}catch{return 'en'}
}
export default function V2Routes() {
  const [initialLanguage]=useState(preferredLanguage)
  return <LanguageProvider initialLanguage={initialLanguage}><ContractingThemeProvider><V2Layout/></ContractingThemeProvider></LanguageProvider>
}

