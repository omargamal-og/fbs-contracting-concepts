import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import {
  useTranslation,
} from '../../i18n/useTranslation'

function CapabilitiesOverview() {
  const t = useTranslation()

  const capabilities = [
    {
      number: '01',
      ...t.home.capabilities.items.construction,
    },

    {
      number: '02',
      ...t.home.capabilities.items.management,
    },

    {
      number: '03',
      ...t.home.capabilities.items.quality,
    },

    {
      number: '04',
      ...t.home.capabilities.items.coordination,
    },
  ]

  return (
    <Box
      component="section"
      id="capabilities"
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
              lg: '0.72fr 1.28fr',
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
              {t.home.capabilities.eyebrow}
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
              {t.home.capabilities.titleLine1}

              <Box
                component="span"
                sx={{
                  display: 'block',

                  color: '#649ABD',
                }}
              >
                {t.home.capabilities.titleLine2}
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,

                maxWidth: 480,

                color: 'rgba(8,47,77,0.58)',

                fontSize: '0.96rem',

                lineHeight: 1.8,
              }}
            >
              {t.home.capabilities.description}
            </Typography>
          </Box>

          {/* Capabilities */}

          <Box>
            {capabilities.map(
              (capability) => (
                <Box
                  key={capability.number}
                  sx={{
                    py: {
                      xs: 3,
                      md: 3.5,
                    },

                    display: 'grid',

                    gridTemplateColumns: {
                      xs: '48px 1fr',
                      md: '70px 0.8fr 1.2fr',
                    },

                    gap: {
                      xs: 1.5,
                      md: 3,
                    },

                    alignItems: 'start',

                    borderTop: '1px solid',

                    borderColor:
                      'rgba(8,47,77,0.12)',

                    '&:last-of-type': {
                      borderBottom: '1px solid',

                      borderColor:
                        'rgba(8,47,77,0.12)',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: '#649ABD',

                      fontSize: '0.62rem',

                      fontWeight: 700,

                      letterSpacing: '0.12em',
                    }}
                  >
                    {capability.number}
                  </Typography>

                  <Typography
                    sx={{
                      color: '#082F4D',

                      fontSize: {
                        xs: '1.1rem',
                        md: '1.25rem',
                      },

                      fontWeight: 600,

                      lineHeight: 1.3,
                    }}
                  >
                    {capability.title}
                  </Typography>

                  <Typography
                    sx={{
                      gridColumn: {
                        xs: '2',
                        md: 'auto',
                      },

                      color:
                        'rgba(8,47,77,0.56)',

                      fontSize: '0.9rem',

                      lineHeight: 1.75,
                    }}
                  >
                    {capability.description}
                  </Typography>
                </Box>
              ),
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default CapabilitiesOverview