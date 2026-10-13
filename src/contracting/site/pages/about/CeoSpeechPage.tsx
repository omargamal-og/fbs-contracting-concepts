import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'

import { useTranslation } from '../../i18n/useTranslation'

import ceoImage from '../../assets/images/about/ceo-nawaf-binshuail.png'

function CeoSpeechPage() {
  const t = useTranslation()

  const content = t.innerPages.about.ceoSpeech

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
            xs: 7,
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
          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                lg: '0.7fr 1.3fr',
              },

              gap: {
                xs: 6,
                lg: 10,
              },

              alignItems: 'start',
            }}
          >
            {/* CEO Profile */}

            <Box>
              <Box
                sx={{
                  bgcolor: '#EEF4F6',

                  borderRadius: '24px',

                  overflow: 'hidden',

                  display: 'flex',

                  justifyContent: 'center',

                  alignItems: 'flex-end',

                  minHeight: {
                    xs: 300,
                    md: 380,
                  },
                }}
              >
                <Box
                  component="img"
                  src={ceoImage}
                  alt={content.name}
                  sx={{
                    width: '100%',
                    maxWidth: 420,

                    height: 'auto',

                    objectFit: 'contain',

                    display: 'block',
                  }}
                />
              </Box>

              <Typography
                component="h2"
                sx={{
                  mt: 3,
                  mb: 1,

                  color: '#082F4D',

                  fontSize: {
                    xs: '1.8rem',
                    md: '2.2rem',
                  },

                  fontWeight: 600,
                }}
              >
                {content.name}
              </Typography>

              <Typography
                sx={{
                  color: 'text.secondary',

                  fontSize: '0.95rem',

                  fontWeight: 600,
                }}
              >
                {content.role}
              </Typography>
            </Box>

            {/* CEO Message */}

            <Box
              sx={{
                display: 'flex',

                flexDirection: 'column',

                gap: 3,
              }}
            >
              <Typography
                sx={{
                  color: 'text.secondary',

                  fontSize: '0.75rem',

                  fontWeight: 700,

                  textTransform: 'uppercase',
                }}
              >
                {t.home.hero.eyebrow}
              </Typography>

              {content.body.map((paragraph, index) => (
                <Typography
                  key={index}
                  component="p"
                  sx={{
                    m: 0,

                    color: '#40586B',

                    fontSize: {
                      xs: '0.98rem',
                      md: '1.07rem',
                    },

                    lineHeight: 2,

                    fontWeight: 400,
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default CeoSpeechPage