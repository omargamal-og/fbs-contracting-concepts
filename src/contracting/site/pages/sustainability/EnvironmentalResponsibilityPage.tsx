import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'
import { useTranslation } from '../../i18n/useTranslation'

function EnvironmentalResponsibilityPage() {
  const t = useTranslation()

  const content =
    t.innerPages.sustainability.environmental

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
            xs: 7,
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
          <Typography
            sx={{
              maxWidth: 1000,
              color: '#082F4D',
              fontSize: {
                xs: '1.25rem',
                md: '1.7rem',
              },
              fontWeight: 500,
              lineHeight: 1.8,
            }}
          >
            {content.introduction}
          </Typography>
        </Container>
      </Box>

      {/* Environmental Commitments */}

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
              color: '#082F4D',
              fontSize: {
                xs: '2rem',
                md: '3rem',
              },
              fontWeight: 600,
              mb: 6,
            }}
          >
            {content.commitmentsTitle}
          </Typography>

          <Box>
            {content.commitments.map(
              (commitment, index) => (
                <Box
                  key={commitment.title}
                  sx={{
                    display: 'grid',

                    gridTemplateColumns: {
                      xs: '48px minmax(0, 1fr)',
                      md: '70px 0.8fr 1.2fr',
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
                      borderBottom:
                        '1px solid #DAE4EA',
                    },

                    transition:
                      'background-color 220ms ease',

                    '&:hover': {
                      bgcolor: '#EEF4F6',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>

                  <Typography
                    component="h3"
                    sx={{
                      color: '#082F4D',
                      fontWeight: 600,
                      fontSize: {
                        xs: '1.25rem',
                        md: '1.5rem',
                      },
                      lineHeight: 1.4,
                    }}
                  >
                    {commitment.title}
                  </Typography>

                  <Typography
                    sx={{
                      gridColumn: {
                        xs: '2',
                        md: 'auto',
                      },

                      color: '#40586B',
                      fontSize: '0.98rem',
                      lineHeight: 1.9,
                    }}
                  >
                    {commitment.description}
                  </Typography>
                </Box>
              ),
            )}
          </Box>

          {/* Closing Statement */}

          <Box
            sx={{
              mt: 8,
              p: {
                xs: 4,
                md: 6,
              },

              bgcolor: '#EEF4F6',
              borderRadius: '24px',
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

export default EnvironmentalResponsibilityPage