import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from '@mui/material'

import type {
  ReactNode,
} from 'react'

import {
  contractingTheme,
  contractingRtlTheme,
} from './contractingTheme'
import { accessibilityStyles } from './accessibilityStyles'
import { useLanguage } from '../i18n/useLanguage'

type ContractingThemeProviderProps = {
  children: ReactNode
}

function ContractingThemeProvider({
  children,
}: ContractingThemeProviderProps) {
  const { direction } = useLanguage()
  const theme = direction === 'rtl' ? contractingRtlTheme : contractingTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={accessibilityStyles} />

      {children}
    </ThemeProvider>
  )
}

export default ContractingThemeProvider