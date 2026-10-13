import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'

import { useTranslation } from '../../i18n/useTranslation'

function WhyFbsPage() {
  const t = useTranslation()

  const content = t.innerPages.about.whyFbs

  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#FFFFFF',
      }}
    >
      {/* Page Hero */}

      <InnerPageHero
        eyebrow={content.eyebrow}
        title={content.title}
      />

      {/* Features Section */}

      <Box
        component="section"
        sx={{
          py: {
            xs: 8,
            md: 12,
          },

          bgcolor: '#FFFFFF',
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
            {content.features.map((feature, index) => (
              <Box
                key={feature.title}
                sx={{
                  p: {
                    xs: 3,
                    md: 4,
                  },

                  minWidth: 0,

                  minHeight: 320,

                  display: 'flex',

                  flexDirection: 'column',

                  bgcolor: '#EEF4F6',

                  border: '1px solid #DAE4EA',

                  borderRadius: '20px',

                  transition:
                    'transform 250ms ease, background-color 250ms ease, box-shadow 250ms ease',

                  '&:hover': {
                    transform: 'translateY(-6px)',

                    bgcolor: '#FFFFFF',

                    boxShadow:
                      '0 18px 45px rgba(8,47,77,0.08)',
                  },
                }}
              >
                {/* Feature Number */}

                <Typography
                  sx={{
                    color: 'text.secondary',

                    fontSize: '0.8rem',

                    fontWeight: 700,

                    letterSpacing: '0.12em',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>

                {/* Decorative Line */}

                <Box
                  sx={{
                    width: 40,

                    height: '2px',

                    bgcolor: '#649ABD',

                    mt: 3,
                    mb: 3,
                  }}
                />

                {/* Feature Title */}

                <Typography
                  component="h2"
                  sx={{
                    mb: 2,

                    color: '#082F4D',

                    fontSize: {
                      xs: '1.35rem',
                      md: '1.55rem',
                    },

                    fontWeight: 600,

                    lineHeight: 1.3,
                  }}
                >
                  {feature.title}
                </Typography>

                {/* Feature Description */}

                <Typography
                  sx={{
                    color: 'rgba(8,47,77,0.67)',

                    fontSize: '0.95rem',

                    lineHeight: 1.85,

                    flexGrow: 1,
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default WhyFbsPage