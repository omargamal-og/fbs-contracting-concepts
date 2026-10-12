import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'

import { useTranslation } from '../../i18n/useTranslation'

function CoreValuesPage() {
  const t = useTranslation()

  const content = t.innerPages.about.coreValues

  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#FFFFFF',
      }}
    >
      <InnerPageHero
        eyebrow={content.eyebrow}
        title={content.title}
      />

      <Box
        component="section"
        sx={{
          py: {
            xs: 8,
            md: 12,
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
                sm: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(3, minmax(0, 1fr))',
              },

              gap: {
                xs: 2.5,
                md: 3,
              },
            }}
          >
            {content.values.map((value, index) => (
              <Box
                key={value}
                sx={{
                  p: {
                    xs: 3.5,
                    md: 4,
                  },

                  minHeight: 250,

                  minWidth: 0,

                  display: 'flex',
                  flexDirection: 'column',

                  justifyContent: 'space-between',

                  bgcolor: '#EEF4F6',

                  border: '1px solid #DAE4EA',

                  borderRadius: '20px',

                  transition:
                    'background-color 250ms ease, transform 250ms ease, box-shadow 250ms ease',

                  '&:hover': {
                    bgcolor: '#FFFFFF',

                    transform: 'translateY(-5px)',

                    boxShadow:
                      '0 16px 40px rgba(8,47,77,0.08)',
                  },
                }}
              >
                {/* Number and decoration */}

                <Box
                  sx={{
                    display: 'flex',

                    justifyContent: 'space-between',

                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#649ABD',

                      fontSize: '0.85rem',

                      fontWeight: 700,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>

                  <Box
                    sx={{
                      width: 42,
                      height: 42,

                      border: '1px solid #B9DAF2',

                      borderRadius: '50%',

                      display: 'grid',

                      placeItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,

                        borderRadius: '50%',

                        bgcolor: '#649ABD',
                      }}
                    />
                  </Box>
                </Box>

                {/* Value */}

                <Box>
                  <Typography
                    component="h2"
                    sx={{
                      color: '#082F4D',

                      fontSize: {
                        xs: '1.75rem',
                        md: '2.1rem',
                      },

                      fontWeight: 600,

                      lineHeight: 1.25,

                      overflowWrap: 'anywhere',
                    }}
                  >
                    {value}
                  </Typography>

                  <Box
                    sx={{
                      width: 48,
                      height: '2px',

                      bgcolor: '#649ABD',

                      mt: 3,
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default CoreValuesPage