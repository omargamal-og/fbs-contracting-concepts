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

function CompanyIntroduction() {
  const t = useTranslation()

  return (
    <Box
      component="section"
      id="company-introduction"
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
              lg: '0.78fr 1.22fr',
            },

            gap: {
              xs: 5,
              lg: 10,
            },

            alignItems: 'start',
          }}
        >
          {/* Heading */}

          <Box>
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
              {t.home.companyIntroduction.eyebrow}
            </Typography>

            <Typography
              component="h2"
              sx={{
                m: 0,

                maxWidth: 620,

                color: '#082F4D',

                fontSize: {
                  xs: '2.8rem',
                  sm: '3.5rem',
                  md: '4.2rem',
                  lg: '4.6rem',
                },

                fontWeight: 500,

                lineHeight: 0.98,

                letterSpacing: '-0.055em',
              }}
            >
              {t.home.companyIntroduction.titleLine1}

              <Box
                component="span"
                sx={{
                  display: 'block',

                  color: '#649ABD',
                }}
              >
                {t.home.companyIntroduction.titleLine2}
              </Box>
            </Typography>
          </Box>

          {/* Content */}

          <Box
            sx={{
              maxWidth: 700,

              justifySelf: {
                lg: 'end',
              },
            }}
          >
            <Typography
              sx={{
                m: 0,

                color: '#082F4D',

                fontSize: {
                  xs: '1.08rem',
                  md: '1.24rem',
                },

                fontWeight: 500,

                lineHeight: 1.65,
              }}
            >
              {t.home.companyIntroduction.description}
            </Typography>

            <Typography
              sx={{
                mt: 2.5,

                color: 'rgba(8,47,77,0.58)',

                fontSize: {
                  xs: '0.92rem',
                  md: '0.98rem',
                },

                lineHeight: 1.85,
              }}
            >
              {t.home.companyIntroduction.secondaryText}
            </Typography>

            <Button
              component={RouterLink}

              to={contractingPath(
                'about/who-we-are',
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
              {t.home.companyIntroduction.cta}
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            mt: {
              xs: 7,
              md: 9,
            },

            height: '1px',

            bgcolor:
              'rgba(8,47,77,0.10)',
          }}
        />
      </Container>
    </Box>
  )
}

export default CompanyIntroduction