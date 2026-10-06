import {
  Box,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'

import ArchitecturalHeader from './components/ArchitecturalHeader'
import EditorialHero from './components/EditorialHero'

import { conceptBTheme } from '../../themes/conceptBTheme'
import ArchitecturalProjects from './components/ArchitecturalProjects'
import ArchitecturalProjectNetwork from './components/ArchitecturalProjectNetwork'
import ArchitecturalStudio from './components/ArchitecturalStudio'
import ArchitecturalExpertise from './components/ArchitecturalExpertise'
import ArchitecturalClosing from './components/ArchitecturalClosing'
import ArchitecturalFooter from './components/ArchitecturalFooter'

function ConceptB() {
  return (
    <ThemeProvider theme={conceptBTheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          overflowX: 'clip',
        }}
      >
        <ArchitecturalHeader />
        <EditorialHero />
        <ArchitecturalProjects />
        <ArchitecturalProjectNetwork />
        <ArchitecturalStudio />
        <ArchitecturalExpertise />
        <ArchitecturalClosing />
        <ArchitecturalFooter />
      </Box>
    </ThemeProvider>
  )
}

export default ConceptB