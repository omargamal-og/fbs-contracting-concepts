import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'

import {
  useTranslation,
} from '../../i18n/useTranslation'

function WhoWeArePage() {
  const t = useTranslation()

  const content =
    t.innerPages.about.whoWeAre

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
        description={content.introduction}
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
                lg: '0.65fr 1.35fr',
              },

              gap: {
                xs: 5,
                lg: 10,
              },
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

                  maxWidth: 500,

                  color: '#082F4D',

                  fontSize: {
                    xs: '2.5rem',
                    md: '3.6rem',
                  },

                  fontWeight: 500,

                  lineHeight: 1,

                  letterSpacing: '-0.05em',
                }}
              >
                {t.home.companyIntroduction.titleLine1}{' '}
                {t.home.companyIntroduction.titleLine2}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',

                gap: 3,
              }}
            >
              {[
                content.uniqueness,
                content.values,
                content.safety,
                content.expertise,
              ].map((paragraph) => (
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
              ))}

              <Typography
                sx={{
                  mt: 2,

                  color: '#082F4D',

                  fontSize: {
                    xs: '1.1rem',
                    md: '1.25rem',
                  },

                  fontWeight: 600,

                  lineHeight: 1.6,
                }}
              >
                {content.closing}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default WhoWeArePage