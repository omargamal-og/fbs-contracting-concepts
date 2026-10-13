import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'

import {
  Link as RouterLink,
  useParams,
} from 'react-router-dom'

import InnerPageHero from '../../components/inner/InnerPageHero'

import { contractingPath } from '../../config/site'

import { getProjectBySlug } from '../../data/projects'

import { useLanguage } from '../../i18n/useLanguage'
import { useTranslation } from '../../i18n/useTranslation'

function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>()

  const { language } = useLanguage()

  const t = useTranslation()

  const content = t.projectDetails

  const project = getProjectBySlug(slug ?? '')

  // Project Not Found

  if (!project) {
    return (
      <Box
        component="main"
        sx={{
          bgcolor: '#FFFFFF',
          minHeight: '60vh',
        }}
      >
        <InnerPageHero
          eyebrow={content.eyebrow}
          title={content.notFoundTitle}
          description={content.notFoundDescription}
        />

        <Container
          sx={{
            py: 6,
          }}
        >
          <Button
            component={RouterLink}
            to={contractingPath('projects/residential')}
          >
            {content.backToProjects}
          </Button>
        </Container>
      </Box>
    )
  }

  const category =
    t.home.projectCategories[project.category]

  const categoryPath =
    project.category === 'residential'
      ? 'projects/residential'
      : 'projects/commercial'

  const details = [
    {
      label: content.locationLabel,
      value: project.location[language],
    },

    {
      label: content.categoryLabel,
      value: category.title,
    },

    ...(project.constructionPeriod
      ? [
          {
            label: content.constructionPeriodLabel,

            value: `${project.constructionPeriod.startYear} — ${project.constructionPeriod.endYear}`,
          },
        ]
      : []),

    ...(project.units
      ? [
          {
            label: content.unitsLabel,

            value: `${project.units.count.toLocaleString()} ${
              project.units.type === 'apartments'
                ? content.apartmentsLabel
                : content.villasLabel
            }`,
          },
        ]
      : []),
  ]

  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#FFFFFF',
      }}
    >
      {/* Project Hero */}

      <InnerPageHero
        eyebrow={content.eyebrow}
        title={project.name[language]}
        description={project.location[language]}
      />

      {/* Project Content */}

      <Box
        component="section"
        sx={{
          py: {
            xs: 7,
            md: 11,
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
                lg: '1.35fr 0.65fr',
              },

              gap: {
                xs: 5,
                lg: 7,
              },

              alignItems: 'start',
            }}
          >
            {/* Project Image */}

            <Box
              sx={{
                bgcolor: '#EEF4F6',

                border: '1px solid #DAE4EA',

                borderRadius: '24px',

                overflow: 'hidden',

                aspectRatio: '16 / 10',

                display: 'flex',

                alignItems: 'center',

                justifyContent: 'center',
              }}
            >
              {project.image ? (
                <Box
                  component="img"
                  src={project.image}
                  alt={project.name[language]}
                  sx={{
                    width: '100%',
                    height: '100%',

                    objectFit: 'contain',

                    display: 'block',
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    color: '#649ABD',
                    fontSize: '1.4rem',
                    fontWeight: 600,
                  }}
                >
                  {t.home.hero.eyebrow}
                </Typography>
              )}
            </Box>

            {/* Project Information */}

            <Box
              sx={{
                bgcolor: '#EEF4F6',

                border: '1px solid #DAE4EA',

                borderRadius: '24px',

                p: {
                  xs: 3,
                  md: 4,
                },
              }}
            >
              <Typography
                component="h2"
                sx={{
                  color: '#082F4D',

                  fontSize: {
                    xs: '1.6rem',
                    md: '2rem',
                  },

                  fontWeight: 600,

                  mb: 4,
                }}
              >
                {content.informationTitle}
              </Typography>

              {details.map((detail) => (
                <Box
                  key={detail.label}
                  sx={{
                    py: 2.5,

                    borderTop: '1px solid',

                    borderColor: '#DAE4EA',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#649ABD',

                      fontSize: '0.75rem',

                      fontWeight: 700,

                      mb: 1,
                    }}
                  >
                    {detail.label}
                  </Typography>

                  <Typography
                    sx={{
                      color: '#082F4D',

                      fontSize: '1.1rem',

                      fontWeight: 600,

                      lineHeight: 1.6,
                    }}
                  >
                    {detail.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Back Link */}

          <Box
            sx={{
              mt: {
                xs: 6,
                md: 8,
              },
            }}
          >
            <Button
              component={RouterLink}
              to={contractingPath(categoryPath)}
              sx={{
                minHeight: 48,

                px: 3,

                borderRadius: '999px',

                bgcolor: '#082F4D',

                color: '#FFFFFF',

                fontSize: '0.8rem',

                fontWeight: 700,

                '&:hover': {
                  bgcolor: '#649ABD',
                },
              }}
            >
              {content.backToProjects}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default ProjectDetailsPage