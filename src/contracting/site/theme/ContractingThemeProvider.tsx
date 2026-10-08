import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material'

import type {
  ReactNode,
} from 'react'

import {
  contractingTheme,
} from './contractingTheme'

type ContractingThemeProviderProps = {
  children: ReactNode
}

function ContractingThemeProvider({
  children,
}: ContractingThemeProviderProps) {
  return (
    <ThemeProvider theme={contractingTheme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  )
}

export default ContractingThemeProvider