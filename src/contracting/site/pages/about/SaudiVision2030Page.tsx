import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'
import { useTranslation } from '../../i18n/useTranslation'
import vision2030Logo from '../../assets/images/about/saudi-vision-2030-official-logo.png'

function SaudiVision2030Page() {
  const t = useTranslation()

  const content =
    t.innerPages.about.saudiVision2030

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

      {/* Vision Statement */}

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
                md: '0.75fr 1.25fr',
              },

              gap: {
                xs: 4,
                md: 8,
              },

              alignItems: 'center',
            }}
          >
            {/* Decorative 2030 */}

            <Box
              sx={{
                bgcolor: '#EEF4F6',

                border: '1px solid #DAE4EA',

                borderRadius: '28px',

                minHeight: {
                  xs: 240,
                  md: 360,
                },

                display: 'flex',

                justifyContent: 'center',

                alignItems: 'center',

                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={vision2030Logo}
                alt={content.title}
                sx={{
                  width: {
                    xs: '75%',
                    md: '82%',
                  },

                  maxWidth: 420,

                  height: 'auto',

                  objectFit: 'contain',

                  display: 'block',
                }}
              />
            </Box>

            {/* Statement */}

            <Box>
              <Box
                sx={{
                  width: 56,

                  height: '3px',

                  bgcolor: '#649ABD',

                  mb: 4,
                }}
              />

              <Typography
                component="h2"
                sx={{
                  color: '#082F4D',

                  fontSize: {
                    xs: '1.65rem',
                    md: '2.3rem',
                  },

                  fontWeight: 500,

                  lineHeight: 1.6,
                }}
              >
                {content.statement}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Company Commitment */}

      <Box
        component="section"
        sx={{
          bgcolor: '#EEF4F6',

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
          <Typography
            sx={{
              maxWidth: 1000,

              color: '#40586B',

              fontSize: {
                xs: '1rem',
                md: '1.15rem',
              },

              lineHeight: 2,
            }}
          >
            {content.description}
          </Typography>

          <Box
            sx={{
              mt: {
                xs: 8,
                md: 10,
              },

              pt: 6,

              borderTop: '1px solid #DAE4EA',
            }}
          >
            <Typography
              component="h2"
              sx={{
                color: '#082F4D',

                fontSize: {
                  xs: '2rem',
                  md: '3rem',
                },

                fontWeight: 600,

                mb: 5,
              }}
            >
              {content.commitmentsTitle}
            </Typography>

            <Box
              sx={{
                display: 'grid',

                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, minmax(0, 1fr))',
                },

                gap: 3,
              }}
            >
              {content.commitments.map(
                (commitment, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: {
                        xs: 3,
                        md: 4,
                      },

                      minHeight: 175,

                      bgcolor: '#FFFFFF',

                      border: '1px solid #DAE4EA',

                      borderRadius: '18px',

                      display: 'flex',

                      flexDirection: 'column',

                      justifyContent: 'space-between',

                      gap: 3,

                      transition:
                        'transform 250ms ease, box-shadow 250ms ease',

                      '&:hover': {
                        transform: 'translateY(-4px)',

                        boxShadow:
                          '0 14px 35px rgba(8,47,77,0.07)',
                      },
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

                    <Typography
                      component="h3"
                      sx={{
                        color: '#082F4D',

                        fontSize: {
                          xs: '1.15rem',
                          md: '1.35rem',
                        },

                        fontWeight: 600,

                        lineHeight: 1.6,
                      }}
                    >
                      {commitment}
                    </Typography>
                  </Box>
                ),
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default SaudiVision2030Page