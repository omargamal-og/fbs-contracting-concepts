import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'
import { useTranslation } from '../../i18n/useTranslation'

function TrainingPage() {
  const t = useTranslation()

  const content = t.innerPages.training

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

      {/* Introduction */}

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
                lg: '1fr 1fr',
              },

              alignItems: 'center',

              gap: {
                xs: 6,
                lg: 10,
              },
            }}
          >
            {/* Text */}

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
                    xs: '2rem',
                    md: '3rem',
                  },

                  fontWeight: 600,
                  lineHeight: 1.25,
                  mb: 4,
                }}
              >
                {content.leadTitle}
              </Typography>

              <Typography
                sx={{
                  color: '#40586B',

                  fontSize: {
                    xs: '1rem',
                    md: '1.1rem',
                  },

                  lineHeight: 2,
                }}
              >
                {content.introduction}
              </Typography>
            </Box>

            {/* Visual Area */}

            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',

                minHeight: {
                  xs: 320,
                  md: 410,
                },

                p: {
                  xs: 4,
                  md: 6,
                },

                borderRadius: '24px',

                background:
                  'linear-gradient(135deg, #082F4D 0%, #316A8D 100%)',

                '&::before': {
                  content: '""',

                  position: 'absolute',
                  width: 300,
                  height: 300,

                  border:
                    '1px solid rgba(255,255,255,0.16)',

                  borderRadius: '50%',

                  insetInlineEnd: -80,
                  top: -80,
                },

                '&::after': {
                  content: '""',

                  position: 'absolute',
                  width: 230,
                  height: 230,

                  border:
                    '1px solid rgba(255,255,255,0.12)',

                  borderRadius: '50%',

                  insetInlineEnd: 40,
                  bottom: -120,
                },
              }}
            >
              <Typography
                sx={{
                  position: 'relative',
                  zIndex: 1,

                  color: '#FFFFFF',

                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                {content.visualEyebrow}
              </Typography>

              <Typography
                sx={{
                  position: 'relative',
                  zIndex: 1,

                  maxWidth: 450,

                  color: '#FFFFFF',

                  fontSize: {
                    xs: '2rem',
                    md: '3rem',
                  },

                  fontWeight: 600,
                  lineHeight: 1.25,
                }}
              >
                {content.visualTitle}
              </Typography>

              <Typography
                sx={{
                  textTransform: 'uppercase',
                  position: 'relative',
                  zIndex: 1,

                  color: '#DAE4EA',

                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                }}
              >
                {t.home.hero.eyebrow}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Development Priorities */}

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
            component="h2"
            sx={{
              color: '#082F4D',

              fontSize: {
                xs: '2rem',
                md: '3rem',
              },

              fontWeight: 600,
              mb: 6,
            }}
          >
            {content.prioritiesTitle}
          </Typography>

          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, minmax(0, 1fr))',
              },

              gap: 3,
            }}
          >
            {content.priorities.map(
              (priority, index) => (
                <Box
                  key={priority.title}
                  sx={{
                    minWidth: 0,

                    p: {
                      xs: 4,
                      md: 5,
                    },

                    bgcolor: '#FFFFFF',

                    border: '1px solid #DAE4EA',
                    borderRadius: '22px',

                    transition:
                      'transform 250ms ease, box-shadow 250ms ease',

                    '&:hover': {
                      transform: 'translateY(-5px)',

                      boxShadow:
                        '0 18px 40px rgba(8,47,77,0.08)',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>

                  <Box
                    sx={{
                      width: 48,
                      height: '2px',
                      bgcolor: '#649ABD',
                      mt: 3,
                      mb: 3,
                    }}
                  />

                  <Typography
                    component="h3"
                    sx={{
                      color: '#082F4D',

                      fontSize: {
                        xs: '1.4rem',
                        md: '1.6rem',
                      },

                      fontWeight: 600,
                      lineHeight: 1.4,
                      mb: 2,
                    }}
                  >
                    {priority.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: '#40586B',

                      fontSize: '0.96rem',
                      lineHeight: 1.9,
                    }}
                  >
                    {priority.description}
                  </Typography>
                </Box>
              ),
            )}
          </Box>

          {/* Closing */}

          <Box
            sx={{
              mt: 8,

              p: {
                xs: 4,
                md: 6,
              },

              bgcolor: '#FFFFFF',
              borderRadius: '22px',

              borderInlineStart:
                '4px solid #649ABD',
            }}
          >
            <Typography
              sx={{
                color: '#082F4D',

                fontSize: {
                  xs: '1.1rem',
                  md: '1.35rem',
                },

                fontWeight: 500,
                lineHeight: 1.8,
              }}
            >
              {content.closing}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default TrainingPage