import {
  Box,
  Button,
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

function SaudiVisionSection() {
  const t = useTranslation()

  return (
    <Box
      component="section"
      id="saudi-vision-2030"
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
            position: 'relative',

            overflow: 'hidden',

            minHeight: {
              xs: 520,
              md: 580,
            },

            p: {
              xs: 3,
              sm: 4,
              md: 6,
              lg: 7,
            },

            display: 'flex',

            alignItems: 'flex-end',

            borderRadius: {
              xs: '22px',
              md: '30px',
            },

            bgcolor: '#EEF4F6',

            border: '1px solid',

            borderColor:
              'rgba(8,47,77,0.08)',
          }}
        >
          {/* Decorative number */}

          <Typography
            aria-hidden="true"
            sx={{
              position: 'absolute',

              top: {
                xs: 18,
                md: -10,
              },

              right: {
                xs: 18,
                md: 40,
              },

              color:
                'rgba(100,154,189,0.10)',

              fontSize: {
                xs: '7rem',
                md: '13rem',
                lg: '16rem',
              },

              fontWeight: 700,

              lineHeight: 1,

              letterSpacing: '-0.08em',

              userSelect: 'none',
            }}
          >
            2030
          </Typography>

          {/* Decorative circles */}

          <Box
            sx={{
              position: 'absolute',

              width: {
                xs: 280,
                md: 520,
              },

              height: {
                xs: 280,
                md: 520,
              },

              top: {
                xs: -120,
                md: -210,
              },

              left: {
                xs: -130,
                md: -180,
              },

              borderRadius: '50%',

              border: '1px solid',

              borderColor:
                'rgba(100,154,189,0.16)',
            }}
          />

          <Box
            sx={{
              position: 'relative',

              zIndex: 1,

              maxWidth: 760,
            }}
          >
            <Typography
              sx={{
                mb: 1.6,

                color: '#649ABD',

                fontSize: '0.7rem',

                fontWeight: 700,

                letterSpacing: '0.16em',

                textTransform: 'uppercase',
              }}
            >
              {t.home.vision2030.eyebrow}
            </Typography>

            <Typography
              component="h2"
              sx={{
                m: 0,

                color: '#082F4D',

                fontSize: {
                  xs: '2.8rem',
                  sm: '3.6rem',
                  md: '4.5rem',
                  lg: '5rem',
                },

                fontWeight: 500,

                lineHeight: 0.98,

                letterSpacing: '-0.055em',
              }}
            >
              {t.home.vision2030.titleLine1}

              <Box
                component="span"
                sx={{
                  display: 'block',

                  color: '#649ABD',
                }}
              >
                {t.home.vision2030.titleLine2}
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,

                maxWidth: 620,

                color:
                  'rgba(8,47,77,0.60)',

                fontSize: {
                  xs: '0.94rem',
                  md: '1rem',
                },

                lineHeight: 1.85,
              }}
            >
              {t.home.vision2030.description}
            </Typography>

            <Button
              component={RouterLink}

              to={contractingPath(
                'about/saudi-vision-2030',
              )}

              sx={{
                mt: 3.5,

                px: 0,

                minWidth: 0,

                color: '#082F4D',

                fontSize: '0.78rem',

                fontWeight: 700,

                borderRadius: 0,

                '&::after': {
                  content: '"→"',

                  ml: 1.2,

                  color: '#649ABD',

                  transition:
                    'transform 180ms ease',
                },

                '&:hover': {
                  bgcolor: 'transparent',

                  color: '#649ABD',
                },

                '&:hover::after': {
                  transform:
                    'translateX(4px)',
                },
              }}
            >
              {t.home.vision2030.cta}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default SaudiVisionSection