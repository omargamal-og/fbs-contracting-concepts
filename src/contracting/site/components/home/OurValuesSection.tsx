import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import {
  useTranslation,
} from '../../i18n/useTranslation'

function OurValuesSection() {
  const t = useTranslation()

  const values = t.innerPages.about.coreValues.values.map(
    (title, index) => ({
      number: String(index + 1).padStart(2, '0'),
      title,
    }),
  )

  return (
    <Box
      component="section"
      id="our-values"
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
              lg: '0.72fr 1.28fr',
            },

            gap: {
              xs: 5,
              lg: 10,
            },

            alignItems: 'start',
          }}
        >
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
              {t.home.values.eyebrow}
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
              {t.home.values.titleLine1}

              <Box
                component="span"
                sx={{
                  display: 'block',

                  color: '#649ABD',
                }}
              >
                {t.home.values.titleLine2}
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
              {t.home.values.description}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
              },

              borderTop: '1px solid',

              borderInlineStart: {
                sm: '1px solid',
              },

              borderColor:
                'rgba(8,47,77,0.10)',
            }}
          >
            {values.map(
              (
                value
              ) => (
                <Box
                  key={value.number}
                  sx={{
                    minHeight: {
                      xs: 180,
                      md: 210,
                    },

                    p: {
                      xs: 3,
                      md: 4,
                    },

                    borderInlineEnd: '1px solid',

                    borderBottom: '1px solid',

                    borderColor:
                      'rgba(8,47,77,0.10)',

                    transition:
                      'background-color 220ms ease',

                    '&:hover': {
                      bgcolor: '#EEF4F6',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      mb: 5,

                      color: '#649ABD',

                      fontSize: '0.62rem',

                      fontWeight: 700,

                      letterSpacing: '0.14em',
                    }}
                  >
                    {value.number}
                  </Typography>

                  <Typography
                    component="h3"
                    sx={{
                      m: 0,

                      color: '#082F4D',

                      fontSize: {
                        xs: '1.65rem',
                        md: '1.9rem',
                      },

                      fontWeight: 500,

                      letterSpacing: '-0.035em',
                    }}
                  >
                    {value.title}
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

export default OurValuesSection