import { Box } from '@mui/material'

import HomeHero from '../components/home/HomeHero'
import ProjectCategories from '../components/home/ProjectCategories'
import CompanyIntroduction from '../components/home/CompanyIntroduction'
import CapabilitiesOverview from '../components/home/CapabilitiesOverview'
import ProjectMap from '../components/home/ProjectMap'
import SaudiVisionSection from '../components/home/SaudiVisionSection'
import OurValuesSection from '../components/home/OurValuesSection'
import SustainabilitySection from '../components/home/SustainabilitySection'
import ContactCta from '../components/home/ContactCta'

function HomePage() {
  return (
    <Box component="main">
      {/* Hero */}

      <HomeHero />

      {/* Company Introduction */}

      <CompanyIntroduction />

      {/* Capabilities */}

      <CapabilitiesOverview />

      {/* Project Categories */}

      <ProjectCategories />

      {/* Interactive Map */}

      <ProjectMap/>

      {/* Saudi Vision 2030 */}

      <SaudiVisionSection />

      {/* Our Values */}

      <OurValuesSection />

      {/* Sustainability */}

      <SustainabilitySection />

      {/* Contact CTA */}

      <ContactCta />


    </Box>
  )
}

export default HomePage