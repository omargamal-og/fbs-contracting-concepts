import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import ContractingNavbar from '../components/navigation/ContractingNavbar'

import { useLanguage } from '../i18n/useLanguage'

function ContractingLayout() {
  const {
    direction,
    language,
  } = useLanguage()
  return (
    <Box
    dir={direction}
    lang={language}
      sx={{
        minHeight: '100vh',
        bgcolor: '#EEF4F6',
        color: '#082F4D',
      }}
    >
      <ContractingNavbar />

      <Outlet />
    </Box>
  )
}

export default ContractingLayout