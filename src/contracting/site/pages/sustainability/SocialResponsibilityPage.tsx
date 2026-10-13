import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'
import { useTranslation } from '../../i18n/useTranslation'

function SocialResponsibilityPage() {
  const t = useTranslation()

  const content =
    t.innerPages.sustainability.social

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

      {/* Social Priorities */}

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
                  key={commitment.title}
                  sx={{
                    p: {
                      xs: 3.5,
                      md: 5,
                    },
                    bgcolor: '#EEF4F6',
                    border: '1px solid #DAE4EA',
                    borderRadius: '22px',
                    minHeight: 290,
                    display: 'flex',
                    flexDirection: 'column',
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
                      mb: 2,
                      color: '#082F4D',
                      fontSize: {
                        xs: '1.4rem',
                        md: '1.7rem',
                      },
                      fontWeight: 600,
                      lineHeight: 1.3,
                    }}
                  >
                    {commitment.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: '#40586B',
                      fontSize: '0.96rem',
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

export default SocialResponsibilityPage