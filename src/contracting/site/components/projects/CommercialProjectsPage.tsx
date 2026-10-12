import {
  Box,
  Container,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'
import ProjectCard from '../../components/projects/ProjectCard'

import {
  getProjectsByCategory,
} from '../../data/projects'

import { useTranslation } from '../../i18n/useTranslation'

function CommercialProjectsPage() {
  const t = useTranslation()

  const content =
    t.home.projectCategories.commercial

    const commercialProjects =
    getProjectsByCategory('commercial').sort(
      (a, b) =>
        Number(Boolean(b.image)) -
        Number(Boolean(a.image)),
    )

  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#FFFFFF',
      }}
    >
      <InnerPageHero
        eyebrow={t.home.projectCategories.eyebrow}
        title={content.title}
        description={content.description}
      />

      <Box
        component="section"
        sx={{
          bgcolor: '#EEF4F6',

          py: {
            xs: 8,
            md: 12,
          },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1600,

            px: {
              xs: 2.5,
              sm: 4,
              md: 6,
              lg: 8,
            },
          }}
        >
          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, minmax(0, 1fr))',
                xl: 'repeat(3, minmax(0, 1fr))',
              },

              gap: {
                xs: 3,
                md: 4,
              },
            }}
          >
            {commercialProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default CommercialProjectsPage