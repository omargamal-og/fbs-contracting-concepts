import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'
import { useTranslation } from '../../i18n/useTranslation'

function ContinuousImprovementPage() {
  const t = useTranslation()

  const content =
    t.innerPages.sustainability.continuousImprovement

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
          bgcolor: '#EEF4F6',
          py: {
            xs: 8,
            md: 11,
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
              maxWidth: 1050,
              color: '#082F4D',
              fontSize: {
                xs: '1.25rem',
                md: '1.7rem',
              },
              fontWeight: 500,
              lineHeight: 1.85,
            }}
          >
            {content.introduction}
          </Typography>
        </Container>
      </Box>

      {/* Management Systems */}

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
          <Typography
            component="h2"
            sx={{
              mb: 6,
              color: '#082F4D',
              fontSize: {
                xs: '2rem',
                md: '3rem',
              },
              fontWeight: 600,
            }}
          >
            {content.systemsTitle}
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
            {content.systems.map((system, index) => (
              <Box
                key={system.title}
                sx={{
                  p: {
                    xs: 3.5,
                    md: 4,
                  },

                  minHeight: 330,
                  minWidth: 0,

                  display: 'flex',
                  flexDirection: 'column',

                  bgcolor: '#EEF4F6',
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
                    color: '#649ABD',
                    fontWeight: 700,
                    fontSize: '0.8rem',
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
                      xs: '1.35rem',
                      md: '1.6rem',
                    },

                    fontWeight: 600,
                    lineHeight: 1.35,
                    mb: 2,
                  }}
                >
                  {system.title}
                </Typography>

                <Typography
                  sx={{
                    color: '#40586B',
                    fontSize: '0.94rem',
                    lineHeight: 1.85,
                  }}
                >
                  {system.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Improvement Approach */}

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
            {content.approachTitle}
          </Typography>

          <Box>
            {content.steps.map((step, index) => (
              <Box
                key={step.title}
                sx={{
                  display: 'grid',

                  gridTemplateColumns: {
                    xs: '48px minmax(0, 1fr)',
                    md: '75px 0.8fr 1.2fr',
                  },

                  gap: {
                    xs: 2,
                    md: 5,
                  },

                  py: {
                    xs: 4,
                    md: 5,
                  },

                  borderTop: '1px solid #DAE4EA',

                  '&:last-child': {
                    borderBottom: '1px solid #DAE4EA',
                  },
                }}
              >
                <Typography
                  sx={{
                    color: '#649ABD',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>

                <Typography
                  component="h3"
                  sx={{
                    color: '#082F4D',

                    fontSize: {
                      xs: '1.2rem',
                      md: '1.5rem',
                    },

                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  {step.title}
                </Typography>

                <Typography
                  sx={{
                    gridColumn: {
                      xs: '2',
                      md: 'auto',
                    },

                    color: '#40586B',
                    fontSize: '0.96rem',
                    lineHeight: 1.85,
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Closing Statement */}

      <Box
        component="section"
        sx={{
          bgcolor: '#FFFFFF',

          py: {
            xs: 8,
            md: 10,
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
              p: {
                xs: 4,
                md: 6,
              },

              bgcolor: '#EEF4F6',
              borderRadius: '24px',
              borderInlineStart: '4px solid #649ABD',
            }}
          >
            <Typography
              sx={{
                color: '#082F4D',

                fontSize: {
                  xs: '1.1rem',
                  md: '1.4rem',
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

export default ContinuousImprovementPage