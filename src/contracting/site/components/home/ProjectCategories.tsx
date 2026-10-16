
import { Box, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import { contractingPath } from '../../config/site'
import { useTranslation } from '../../i18n/useTranslation'
import { useLanguage } from '../../i18n/useLanguage'

const projectImages = {
  residential:
    'https://images.unsplash.com/photo-1775733924031-521cd86c69cc?auto=format&fit=crop&w=1400&q=82',
  commercial:
    'https://images.unsplash.com/photo-1771964427867-1b734fc7f5a7?auto=format&fit=crop&w=1400&q=82',
}

function ProjectCategories() {
  const t = useTranslation()
  const { direction } = useLanguage()
  const rtl = direction === 'rtl'

  const categories = [
    {
      number: '01',
      title: t.home.projectCategories.residential.title,
      description: t.home.projectCategories.residential.description,
      path: 'projects/residential',
      image: projectImages.residential,
      position: 'center 50%',
    },
    {
      number: '02',
      title: t.home.projectCategories.commercial.title,
      description: t.home.projectCategories.commercial.description,
      path: 'projects/commercial',
      image: projectImages.commercial,
      position: 'center 45%',
    },
  ]

  return (
    <Box
      component="section"
      id="project-categories"
      sx={{
        bgcolor: '#FFFFFF',
        py: { xs: 8, md: 11, lg: 13 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1600,
          px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
        }}
      >
        {/* Section Heading */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '0.85fr 1.15fr',
            },
            gap: { xs: 3, md: 6 },
            alignItems: 'end',
            mb: { xs: 5, md: 7 },
          }}
        >
          <Box>
            <Typography
              sx={{
                mb: 1.5,
                color: 'text.secondary',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {t.home.projectCategories.eyebrow}
            </Typography>

            <Typography
              component="h2"
              sx={{
                m: 0,
                color: '#082F4D',
                fontSize: { xs: '2.8rem', md: '4rem' },
                fontWeight: 500,
                lineHeight: rtl ? 1.2 : 1.05,
                letterSpacing: rtl ? 0 : '-0.05em',
              }}
            >
              {t.home.projectCategories.titleLine1}

              <Box
                component="span"
                sx={{
                  display: 'block',
                  color: '#386682',
                }}
              >
                {t.home.projectCategories.titleLine2}
              </Box>
            </Typography>
          </Box>

          <Typography
            sx={{
              justifySelf: { md: 'end' },
              maxWidth: 520,
              color: 'rgba(8,47,77,0.78)',
              fontSize: { xs: '0.94rem', md: '1rem' },
              lineHeight: 1.8,
            }}
          >
            {t.home.projectCategories.description}
          </Typography>
        </Box>

        {/* Image Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, minmax(0, 1fr))',
            },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {categories.map((category) => (
            <Box
              key={category.path}
              component={RouterLink}
              to={contractingPath(category.path)}
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                isolation: 'isolate',

                minHeight: {
                  xs: 390,
                  sm: 450,
                  md: 490,
                  lg: 540,
                },

                p: { xs: 3, md: 4, lg: 5 },
                borderRadius: { xs: '20px', md: '24px' },
                bgcolor: '#082F4D',
                color: '#FFFFFF',
                textDecoration: 'none',

                boxShadow: '0 10px 32px rgba(8,47,77,0.08)',

                transition:
                  'transform 350ms ease, box-shadow 350ms ease',

                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 24px 55px rgba(8,47,77,0.19)',
                },

                '&:hover .category-photo, &:focus-visible .category-photo': {
                  transform: 'scale(1.07)',
                },

                '&:hover .category-arrow, &:focus-visible .category-arrow': {
                  transform: rtl
                    ? 'translate(-4px, -4px)'
                    : 'translate(4px, -4px)',
                  bgcolor: '#B9DAF2',
                  color: '#082F4D',
                },

                '&:focus-visible': {
                  outline: '3px solid #649ABD',
                  outlineOffset: 4,
                },

                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                  '&:hover': { transform: 'none' },
                  '& .category-photo, & .category-arrow': {
                    transition: 'none',
                  },
                  '&:hover .category-photo, &:focus-visible .category-photo': {
                    transform: 'none',
                  },
                  '&:hover .category-arrow, &:focus-visible .category-arrow': {
                    transform: 'none',
                  },
                },
              }}
            >
              {/* Background Photo */}
              <Box
                component="img"
                className="category-photo"
                src={category.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: category.position,
                  zIndex: -2,
                  transition:
                    'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />

              {/* Readability Overlay */}
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: -1,
                  background: `
                    linear-gradient(
                      180deg,
                      rgba(8,47,77,0.38) 0%,
                      rgba(8,47,77,0.12) 32%,
                      rgba(8,47,77,0.48) 65%,
                      rgba(8,47,77,0.96) 100%
                    )
                  `,
                }}
              />

              {/* Number and Arrow */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textShadow: '0 1px 8px rgba(0,0,0,0.4)',
                  }}
                >
                  {category.number}
                </Typography>

                <Box
                  className="category-arrow"
                  aria-hidden="true"
                  sx={{
                    width: 48,
                    height: 48,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.65)',
                    bgcolor: 'rgba(8,47,77,0.34)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFFFFF',
                    fontSize: '1.25rem',
                    transition:
                      'transform 250ms ease, background-color 250ms ease',
                  }}
                >
                  {rtl ? '↖' : '↗'}
                </Box>
              </Box>

              {/* Content */}
              <Box sx={{ maxWidth: 500 }}>
                <Box
                  aria-hidden="true"
                  sx={{
                    width: 45,
                    height: 3,
                    mb: 2.5,
                    bgcolor: '#B9DAF2',
                    borderRadius: '3px',
                  }}
                />

                <Typography
                  component="h3"
                  sx={{
                    m: 0,
                    color: '#FFFFFF',
                    fontSize: {
                      xs: '2.5rem',
                      md: '3.2rem',
                      lg: '3.6rem',
                    },
                    fontWeight: 500,
                    lineHeight: rtl ? 1.2 : 1.05,
                    letterSpacing: rtl ? 0 : '-0.045em',
                  }}
                >
                  {category.title}
                </Typography>

                <Typography
                  sx={{
                    mt: 2.2,
                    maxWidth: 430,
                    color: 'rgba(255,255,255,0.94)',
                    fontSize: '0.93rem',
                    lineHeight: 1.8,
                  }}
                >
                  {category.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default ProjectCategories
