import { Suspense } from 'react'
import { Box, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

import ContractingNavbar from '../components/navigation/ContractingNavbar'

import { useLanguage } from '../i18n/useLanguage'
import { useTranslation } from '../i18n/useTranslation'
import ContractingFooter from '../components/navigation/ContractingFooter'

function ContractingLayout() {
  const t = useTranslation()
  const {
    direction,
    language,
  } = useLanguage()
  return (
    <Box
    data-contracting-site
    dir={direction}
    lang={language}
      sx={{
        minHeight: '100vh',
        bgcolor: '#EEF4F6',
        color: '#082F4D',
      }}
    >
      <ContractingNavbar />

      <Suspense
        fallback={
          <Box
            component="main"
            aria-busy="true"
            sx={{
              minHeight: '100vh',
              display: 'grid',
              placeItems: 'center',
              p: 3,
              bgcolor: '#FFFFFF',
              color: '#082F4D',
            }}
          >
            <Typography role="status">{t.loadingPage}</Typography>
          </Box>
        }
      >
        <Outlet />
      </Suspense>

      <ContractingFooter />
    </Box>
  )
}

export default ContractingLayout