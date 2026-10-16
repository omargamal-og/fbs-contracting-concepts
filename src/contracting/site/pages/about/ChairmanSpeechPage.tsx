import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'

import {
  useTranslation,
} from '../../i18n/useTranslation'

function ChairmanSpeechPage() {
  const t = useTranslation()

  const content =
    t.innerPages.about.chairmanSpeech

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
                lg: '0.7fr 1.3fr',
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
                  color: 'text.secondary',

                  fontSize: '0.7rem',

                  fontWeight: 700,

                  letterSpacing: '0.16em',

                  textTransform: 'uppercase',
                }}
              >
                {t.home.hero.eyebrow}
              </Typography>

              <Typography
                component="h2"
                sx={{
                  mt: 2,

                  mb: 0,

                  color: '#082F4D',

                  fontSize: {
                    xs: '2.4rem',
                    md: '3.4rem',
                  },

                  fontWeight: 500,

                  lineHeight: 1,

                  letterSpacing: '-0.05em',
                }}
              >
                {content.name}
              </Typography>

              <Typography
                sx={{
                  mt: 1,

                  color: 'text.secondary',

                  fontSize: '0.82rem',

                  fontWeight: 700,
                }}
              >
                {content.role}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',

                gap: 3,
              }}
            >
              {content.body.map(
                (paragraph) => (
                  <Typography
                    key={paragraph}
                    sx={{
                      color:
                        'rgba(8,47,77,0.72)',

                      fontSize: {
                        xs: '0.96rem',
                        md: '1.04rem',
                      },

                      lineHeight: 1.9,
                    }}
                  >
                    {paragraph}
                  </Typography>
                ),
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default ChairmanSpeechPage