import { Box } from '@mui/material'

import { siteTokens } from '../theme/tokens'
import HomeHero from '../components/home/HomeHero'
import ProjectCategories from '../components/home/ProjectCategories'

function HomePage() {
  return (
    <Box component="main">
      {/* Hero */}

      <HomeHero />

      {/* Company Introduction */}

      <Box
        component="section"
        id="company-introduction"
        sx={{
          minHeight: 500,
          bgcolor: 'background.paper',
          display: 'grid',
          placeItems: 'center',
          px: siteTokens.layout.pagePadding,
        }}
      >
        Company Introduction
      </Box>

      {/* Capabilities */}

      <Box
        component="section"
        id="capabilities"
        sx={{
          minHeight: 500,
          bgcolor: 'background.default',
          display: 'grid',
          placeItems: 'center',
          px: siteTokens.layout.pagePadding,
        }}
      >
        Capabilities Overview
      </Box>

      {/* Project Categories */}

      <ProjectCategories />

      {/* Interactive Map */}

      <Box
        component="section"
        id="project-map"
        sx={{
          minHeight: 700,
          bgcolor: 'primary.main',
          color: 'common.white',
          display: 'grid',
          placeItems: 'center',
          px: siteTokens.layout.pagePadding,
        }}
      >
        Interactive Saudi Map
      </Box>

      {/* Saudi Vision 2030 */}

      <Box
        component="section"
        id="saudi-vision-2030"
        sx={{
          minHeight: 600,
          bgcolor: 'background.default',
          display: 'grid',
          placeItems: 'center',
          px: siteTokens.layout.pagePadding,
        }}
      >
        Saudi Vision 2030
      </Box>

      {/* Our Values */}

      <Box
        component="section"
        id="our-values"
        sx={{
          minHeight: 600,
          bgcolor: 'background.paper',
          display: 'grid',
          placeItems: 'center',
          px: siteTokens.layout.pagePadding,
        }}
      >
        Our Values
      </Box>

      {/* Sustainability */}

      <Box
        component="section"
        id="sustainability"
        sx={{
          minHeight: 600,
          bgcolor: 'background.default',
          display: 'grid',
          placeItems: 'center',
          px: siteTokens.layout.pagePadding,
        }}
      >
        Sustainability
      </Box>

      {/* Contact CTA */}

      <Box
        component="section"
        id="contact"
        sx={{
          minHeight: 420,
          bgcolor: 'primary.main',
          color: 'common.white',
          display: 'grid',
          placeItems: 'center',
          px: siteTokens.layout.pagePadding,
        }}
      >
        Contact CTA
      </Box>
    </Box>
  )
}

export default HomePage