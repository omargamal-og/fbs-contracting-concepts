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

function SustainabilitySection() {
  const t = useTranslation()

  const items = [
    {
      number: '01',
      ...t.home.sustainability.items.environmental,
    },

    {
      number: '02',
      ...t.home.sustainability.items.social,
    },

    {
      number: '03',
      ...t.home.sustainability.items.economic,
    },
  ]

  return (
    <Box
      component="section"
      id="sustainability"
      sx={{
        bgcolor: '#EEF4F6',

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
              lg: '0.75fr 1.25fr',
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
              {t.home.sustainability.eyebrow}
            </Typography>

            <Typography
              component="h2"
              sx={{
                m: 0,

                color: '#082F4D',

                fontSize: {
                  xs: '2.8rem',
                  md: '4rem',
                  lg: '4.5rem',
                },

                fontWeight: 500,

                lineHeight: 0.98,

                letterSpacing: '-0.055em',
              }}
            >
              {t.home.sustainability.titleLine1}

              <Box
                component="span"
                sx={{
                  display: 'block',

                  color: '#649ABD',
                }}
              >
                {t.home.sustainability.titleLine2}
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,

                maxWidth: 500,

                color: 'rgba(8,47,77,0.58)',

                fontSize: '0.96rem',

                lineHeight: 1.8,
              }}
            >
              {t.home.sustainability.description}
            </Typography>

            <Button
              component={RouterLink}

              to={contractingPath(
                'sustainability',
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
              {t.home.sustainability.cta}
            </Button>
          </Box>

          {/* Items */}

          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, minmax(0, 1fr))',
              },

              borderTop: '1px solid',

              borderColor:
                'rgba(8,47,77,0.10)',
            }}
          >
            {items.map((item) => (
              <Box
                key={item.number}
                sx={{
                  minHeight: {
                    xs: 250,
                    md: 340,
                  },

                  p: {
                    xs: 3,
                    md: 3.5,
                  },

                  borderBottom: '1px solid',

                  borderInlineEnd: '1px solid',

                  borderColor:
                    'rgba(8,47,77,0.10)',

                  transition:
                    'background-color 220ms ease, transform 220ms ease',

                  '&:hover': {
                    bgcolor: '#FFFFFF',

                    transform:
                      'translateY(-4px)',
                  },
                }}
              >
                <Typography
                  sx={{
                    mb: {
                      xs: 5,
                      md: 7,
                    },

                    color: '#649ABD',

                    fontSize: '0.62rem',

                    fontWeight: 700,

                    letterSpacing: '0.14em',
                  }}
                >
                  {item.number}
                </Typography>

                <Typography
                  component="h3"
                  sx={{
                    m: 0,

                    color: '#082F4D',

                    fontSize: {
                      xs: '1.45rem',
                      md: '1.65rem',
                    },

                    fontWeight: 500,

                    lineHeight: 1.15,

                    letterSpacing: '-0.035em',
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    mt: 1.6,

                    color:
                      'rgba(8,47,77,0.56)',

                    fontSize: '0.87rem',

                    lineHeight: 1.75,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default SustainabilitySection