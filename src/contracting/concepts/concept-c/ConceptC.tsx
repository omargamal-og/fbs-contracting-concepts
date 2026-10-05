import {
  Box,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'

import { conceptCTheme } from '../../themes/conceptCTheme'

import InfrastructureHeader from './components/InfrastructureHeader'
import SystemsHero from './components/SystemsHero'
import InfrastructureProjects from './components/InfrastructureProjects'
import ProjectNetwork from './components/ProjectNetwork'
import CapabilitySystem from './components/CapabilitySystem'
import CompanySystemOverview from './components/CompanySystemOverview'
import PremiumContact from './components/PremiumContact'
import PremiumFooter from './components/PremiumFooter'

function ConceptC() {
  return (
    <ThemeProvider theme={conceptCTheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',

          bgcolor: 'background.default',
          color: 'text.primary',

          overflowX: 'clip',
        }}
      >
        <InfrastructureHeader />
        <SystemsHero />
        <InfrastructureProjects />
        <ProjectNetwork />
        <CapabilitySystem />
        <CompanySystemOverview />
        <PremiumContact />
        <PremiumFooter />
      </Box>
    </ThemeProvider>
  )
}

export default ConceptC