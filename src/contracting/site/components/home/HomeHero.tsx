import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'

import {
  Link as RouterLink,
} from 'react-router-dom'

import heroProjectsImage from '../../assets/images/home/hero-projects.jpg'

import {
  contractingPath,
} from '../../config/site'

import {
  useTranslation,
} from '../../i18n/useTranslation'

function HomeHero() {
  const t = useTranslation()

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        position: 'relative',
        bgcolor: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          maxWidth: 1760,

          mx: 'auto',

          px: {
            xs: 2.5,
            sm: 4,
            md: 5,
            lg: 6,
            xl: 8,
          },

          py: {
            xs: 3,
            md: 4,
            lg: 4.5,
          },
        }}
      >
        <Box
          sx={{
            minHeight: {
              xs: 'auto',
              lg: 'calc(100vh - 132px)',
            },

            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: '0.62fr 1.38fr',
            },

            gap: {
              xs: 4,
              lg: 5,
              xl: 7,
            },

            alignItems: 'center',
          }}
        >
          {/* Content */}

          <Box
            sx={{
              position: 'relative',
              zIndex: 2,

              pt: {
                xs: 3,
                lg: 0,
              },

              pb: {
                xs: 1,
                lg: 0,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',

                gap: 1.5,

                mb: {
                  xs: 2.5,
                  md: 3,
                },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: '1px',

                  bgcolor: '#649ABD',
                }}
              />

              <Typography
                component="span"
                sx={{
                  color: '#649ABD',

                  fontSize: {
                    xs: '0.64rem',
                    md: '0.7rem',
                  },

                  fontWeight: 700,

                  letterSpacing: '0.17em',

                  textTransform: 'uppercase',
                }}
              >
                {t.home.hero.eyebrow}
              </Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                m: 0,

                maxWidth: 640,

                color: '#082F4D',

                fontSize: {
                  xs: '3rem',
                  sm: '4rem',
                  md: '4.7rem',
                  lg: '4.5rem',
                  xl: '5.4rem',
                },

                fontWeight: 500,

                lineHeight: {
                  xs: 1,
                  md: 0.97,
                },

                letterSpacing: {
                  xs: '-0.05em',
                  md: '-0.06em',
                },
              }}
            >
              {t.home.hero.titleLine1}
              <Box
                component="span"
                sx={{
                  display: 'block',
                  color: '#649ABD',
                }}
              >
                {t.home.hero.titleLine2}
              </Box>
            </Typography>

            <Typography
              component="p"
              sx={{
                maxWidth: 520,

                mt: {
                  xs: 2.5,
                  md: 3.5,
                },

                mb: 0,

                color: 'rgba(8,47,77,0.66)',

                fontSize: {
                  xs: '0.92rem',
                  md: '1rem',
                },

                lineHeight: 1.8,
              }}
            >
              {t.home.hero.description}
            </Typography>

            <Box
              sx={{
                mt: {
                  xs: 3.5,
                  md: 4.5,
                },

                display: 'flex',

                flexWrap: 'wrap',

                gap: 1.25,
              }}
            >
              <Button
                component={RouterLink}

                to={contractingPath(
                  'projects/residential',
                )}

                sx={{
                  minHeight: 52,

                  px: 3.3,

                  bgcolor: '#082F4D',

                  color: '#FFFFFF',

                  borderRadius: '999px',

                  fontSize: '0.76rem',

                  fontWeight: 700,

                  boxShadow: 'none',

                  '&:hover': {
                    bgcolor: '#649ABD',
                    boxShadow: 'none',
                  },
                }}
              >
                {t.home.hero.primaryCta}
              </Button>

              <Button
                component={RouterLink}

                to={contractingPath(
                  'about/who-we-are',
                )}

                variant="outlined"

                sx={{
                  minHeight: 52,

                  px: 3.3,

                  color: '#082F4D',

                  borderColor:
                    'rgba(8,47,77,0.20)',

                  borderRadius: '999px',

                  fontSize: '0.76rem',

                  fontWeight: 700,

                  '&:hover': {
                    borderColor: '#649ABD',

                    bgcolor:
                      'rgba(100,154,189,0.06)',
                  },
                }}
              >
                {t.home.hero.secondaryCta}
              </Button>
            </Box>

            {/* Small note */}

            <Box
              sx={{
                mt: {
                  xs: 4,
                  lg: 7,
                },

                pt: 2.5,

                maxWidth: 420,

                borderTop: '1px solid',

                borderColor:
                  'rgba(8,47,77,0.10)',

                display: {
                  xs: 'none',
                  md: 'flex',
                },

                alignItems: 'center',

                gap: 2,
              }}
            >
              <Typography
                sx={{
                  color:
                    'rgba(8,47,77,0.42)',

                  fontSize: '0.58rem',

                  fontWeight: 700,

                  letterSpacing: '0.13em',

                  textTransform: 'uppercase',
                }}
              >
                {t.home.hero.location}
              </Typography>

              <Box
                sx={{
                  flex: 1,

                  height: '1px',

                  bgcolor:
                    'rgba(8,47,77,0.10)',
                }}
              />
            </Box>
          </Box>


          {/* Hero visual */}

          <Box
            sx={{
              position: 'relative',

              minWidth: 0,

              aspectRatio: '16 / 9',

              borderRadius: {
                xs: '22px',
                md: '28px',
              },

              overflow: 'hidden',

              bgcolor: '#DAE4EA',

              boxShadow:
                '0 30px 80px rgba(8,47,77,0.10)',
            }}
          >
            <Box
              component="img"

              src={heroProjectsImage}

              alt="FBS Contracting projects"

              sx={{
                width: '100%',
                height: '100%',

                display: 'block',

                objectFit: 'cover',

                objectPosition: 'center center',
              }}
            />

            {/* Very light image treatment */}

            <Box
              sx={{
                position: 'absolute',

                inset: 0,

                pointerEvents: 'none',

                background: `
                  linear-gradient(
                    90deg,
                    rgba(8,47,77,0.04) 0%,
                    rgba(8,47,77,0.00) 38%
                  )
                `,
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HomeHero