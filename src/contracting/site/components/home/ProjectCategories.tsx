import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import {
  Link as RouterLink,
} from 'react-router-dom'

import {
  contractingPath,
} from '../../config/site'

import {
  useTranslation,
} from '../../i18n/useTranslation'

function ProjectCategories() {
  const t = useTranslation()

  const categories = [
    {
      number: '01',

      title:
        t.home.projectCategories.residential.title,

      description:
        t.home.projectCategories.residential.description,

      path: 'projects/residential',

      variant: 'light',
    },

    {
      number: '02',

      title:
        t.home.projectCategories.commercial.title,

      description:
        t.home.projectCategories.commercial.description,

      path: 'projects/commercial',

      variant: 'blue',
    },
  ] as const

  return (
    <Box
      component="section"
      id="project-categories"
      sx={{
        bgcolor: '#FFFFFF',

        py: {
          xs: 8,
          md: 11,
          lg: 13,
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
              md: '0.85fr 1.15fr',
            },

            gap: {
              xs: 3,
              md: 6,
            },

            alignItems: 'end',

            mb: {
              xs: 5,
              md: 7,
            },
          }}
        >
          <Box>
            <Typography
              sx={{
                mb: 1.5,

                color: '#649ABD',

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

                fontSize: {
                  xs: '2.8rem',
                  md: '4rem',
                },

                fontWeight: 500,

                lineHeight: 1,

                letterSpacing: '-0.05em',
              }}
            >
              {t.home.projectCategories.titleLine1}

              <Box
                component="span"
                sx={{
                  display: 'block',

                  color: '#649ABD',
                }}
              >
                {t.home.projectCategories.titleLine2}
              </Box>
            </Typography>
          </Box>

          <Typography
            sx={{
              justifySelf: {
                md: 'end',
              },

              maxWidth: 520,

              color: 'rgba(8,47,77,0.60)',

              fontSize: {
                xs: '0.94rem',
                md: '1rem',
              },

              lineHeight: 1.8,
            }}
          >
            {t.home.projectCategories.description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, minmax(0, 1fr))',
            },

            gap: {
              xs: 2,
              md: 3,
            },
          }}
        >
          {categories.map((category) => {
            const isBlue =
              category.variant === 'blue'

            return (
              <Box
                key={category.path}

                component={RouterLink}

                to={contractingPath(
                  category.path,
                )}

                sx={{
                  position: 'relative',

                  minHeight: {
                    xs: 340,
                    md: 460,
                    lg: 500,
                  },

                  p: {
                    xs: 3,
                    md: 4,
                    lg: 5,
                  },

                  overflow: 'hidden',

                  display: 'flex',

                  flexDirection: 'column',

                  justifyContent: 'space-between',

                  bgcolor: isBlue
                    ? '#082F4D'
                    : '#EEF4F6',

                  color: isBlue
                    ? '#FFFFFF'
                    : '#082F4D',

                  borderRadius: {
                    xs: '20px',
                    md: '26px',
                  },

                  textDecoration: 'none',

                  transition:
                    'transform 280ms ease, box-shadow 280ms ease',

                  '&:hover': {
                    transform:
                      'translateY(-5px)',

                    boxShadow:
                      '0 24px 65px rgba(8,47,77,0.12)',
                  },

                  '&:hover .project-arrow': {
                    transform:
                      'translate(4px, -4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',

                    top: -130,
                    right: -110,

                    width: 360,
                    height: 360,

                    borderRadius: '50%',

                    border: '1px solid',

                    borderColor: isBlue
                      ? 'rgba(185,218,242,0.16)'
                      : 'rgba(8,47,77,0.09)',
                  }}
                />

                <Box
                  sx={{
                    position: 'relative',

                    zIndex: 1,

                    display: 'flex',

                    justifyContent:
                      'space-between',

                    alignItems: 'flex-start',
                  }}
                >
                  <Typography
                    sx={{
                      color: isBlue
                        ? '#B9DAF2'
                        : '#649ABD',

                      fontSize: '0.68rem',

                      fontWeight: 700,

                      letterSpacing: '0.14em',
                    }}
                  >
                    {category.number}
                  </Typography>

                  <Box
                    className="project-arrow"
                    sx={{
                      width: 46,
                      height: 46,

                      display: 'grid',

                      placeItems: 'center',

                      borderRadius: '50%',

                      border: '1px solid',

                      borderColor: isBlue
                        ? 'rgba(255,255,255,0.24)'
                        : 'rgba(8,47,77,0.14)',

                      transition:
                        'transform 200ms ease',
                    }}
                  >
                    ↗
                  </Box>
                </Box>

                <Box
                  sx={{
                    position: 'relative',

                    zIndex: 1,

                    maxWidth: 500,
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      m: 0,

                      fontSize: {
                        xs: '2.5rem',
                        md: '3.4rem',
                      },

                      fontWeight: 500,

                      lineHeight: 1,

                      letterSpacing: '-0.05em',
                    }}
                  >
                    {category.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 2,

                      maxWidth: 430,

                      color: isBlue
                        ? 'rgba(255,255,255,0.66)'
                        : 'rgba(8,47,77,0.58)',

                      fontSize: '0.9rem',

                      lineHeight: 1.75,
                    }}
                  >
                    {category.description}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}

export default ProjectCategories