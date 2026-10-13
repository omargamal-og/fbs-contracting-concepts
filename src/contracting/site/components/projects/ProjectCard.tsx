import {
  Box,
  Typography,
} from '@mui/material'

import {
  Link as RouterLink,
} from 'react-router-dom'

import type {
  ContractingProject,
} from '../../data/projects'

import { contractingPath } from '../../config/site'
import { useLanguage } from '../../i18n/useLanguage'
import { useTranslation } from '../../i18n/useTranslation'

type ProjectCardProps = {
  project: ContractingProject
}

function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useLanguage()
  const t = useTranslation()

  const category =
    t.home.projectCategories[project.category]

  return (
    <Box
      component={RouterLink}
      to={contractingPath(`projects/${project.slug}`)}
      sx={{
        display: 'flex',
        flexDirection: 'column',

        minWidth: 0,

        bgcolor: '#FFFFFF',

        border: '1px solid #DAE4EA',
        borderRadius: '20px',

        overflow: 'hidden',

        textDecoration: 'none',
        color: 'inherit',

        transition:
          'transform 250ms ease, box-shadow 250ms ease',

        '&:hover': {
          transform: 'translateY(-5px)',

          boxShadow:
            '0 18px 45px rgba(8,47,77,0.09)',
        },

        '&:focus-visible': {
          outline: '3px solid #649ABD',
          outlineOffset: 3,
        },
      }}
    >
      {/* Project Image */}

      <Box
        sx={{
          width: '100%',
          aspectRatio: '2 / 1',

          overflow: 'hidden',

          bgcolor: '#DAE4EA',
        }}
      >
        {project.image ? (
          <Box
            component="img"
            loading="lazy"
            decoding="async"
            src={project.image}
            alt={project.name[language]}
            sx={{
              display: 'block',

              width: '100%',
              height: '100%',

              objectFit: 'cover',

              transition: 'transform 350ms ease',

              '&:hover': {
                transform: 'scale(1.04)',
              },
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',

              display: 'flex',
              flexDirection: 'column',

              alignItems: 'center',
              justifyContent: 'center',

              gap: 2,

              background:
                'linear-gradient(135deg, #EEF4F6 0%, #DAE4EA 100%)',
            }}
          >
            <Typography
              sx={{
                color: '#082F4D',

                fontSize: {
                  xs: '1.5rem',
                  md: '2rem',
                },

                fontWeight: 700,
              }}
            >
              FBS
            </Typography>

            <Box
              sx={{
                width: 48,
                height: '2px',
                bgcolor: '#649ABD',
              }}
            />

            <Typography
              sx={{
                textTransform: 'uppercase',
                color: 'text.secondary',

                fontSize: '0.72rem',
                fontWeight: 700,

                letterSpacing: '0.12em',
              }}
            >
              {t.navigation.logo_t2}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Project Information */}

      <Box
        sx={{
          p: {
            xs: 3,
            md: 3.5,
          },

          display: 'flex',
          flexDirection: 'column',

          flexGrow: 1,
        }}
      >
        <Typography
          sx={{
            color: 'text.secondary',

            fontSize: '0.72rem',
            fontWeight: 700,

            mb: 2,
          }}
        >
          {category.title}
        </Typography>

        <Typography
          component="h3"
          sx={{
            color: '#082F4D',

            fontSize: {
              xs: '1.35rem',
              md: '1.65rem',
            },

            fontWeight: 600,
            lineHeight: 1.35,
          }}
        >
          {project.name[language]}
        </Typography>

        <Typography
          sx={{
            mt: 1.5,

            color: 'rgba(8,47,77,0.72)',

            fontSize: '0.92rem',
          }}
        >
          {project.location[language]}
        </Typography>

        {project.constructionPeriod && (
          <Typography
            sx={{
              mt: 2,

              color: 'text.secondary',

              fontSize: '0.85rem',

              fontWeight: 600,
            }}
          >
            {project.constructionPeriod.startYear}
            {' — '}
            {project.constructionPeriod.endYear}
          </Typography>
        )}

        <Box
          sx={{
            mt: 'auto',
            pt: 4,
          }}
        >
          <Typography
            component="span"
            sx={{
              color: '#082F4D',

              fontSize: '0.85rem',
              fontWeight: 700,

              borderBottom: '1px solid #649ABD',

              pb: 0.6,
            }}
          >
            {t.home.projectMap.viewProject}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectCard