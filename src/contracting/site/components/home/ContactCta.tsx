import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'

import {
  Link as RouterLink,
} from 'react-router-dom'

import {
  contractingPath,
} from '../../config/site'

import {
  useTranslation,
} from '../../i18n/useTranslation'

function ContactCta() {
  const t = useTranslation()

  return (
    <Box
      component="section"
      id="contact-cta"
      sx={{
        bgcolor: '#FFFFFF',

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
            position: 'relative',

            overflow: 'hidden',

            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr auto',
            },

            gap: {
              xs: 4,
              md: 6,
            },

            alignItems: 'end',

            p: {
              xs: 3.5,
              sm: 5,
              md: 6,
              lg: 7,
            },

            bgcolor: '#EEF4F6',

            border: '1px solid',

            borderColor:
              'rgba(8,47,77,0.08)',

            borderRadius: {
              xs: '22px',
              md: '30px',
            },
          }}
        >
          {/* Decorative circle */}

          <Box
            sx={{
              position: 'absolute',

              width: {
                xs: 280,
                md: 480,
              },

              height: {
                xs: 280,
                md: 480,
              },

              top: {
                xs: -150,
                md: -240,
              },

              right: {
                xs: -150,
                md: -190,
              },

              borderRadius: '50%',

              border: '1px solid',

              borderColor:
                'rgba(100,154,189,0.16)',
            }}
          />

          {/* Content */}

          <Box
            sx={{
              position: 'relative',

              zIndex: 1,

              maxWidth: 820,
            }}
          >
            <Typography
              sx={{
                mb: 1.6,

                color: '#649ABD',

                fontSize: '0.7rem',

                fontWeight: 700,

                letterSpacing: '0.16em',

                textTransform: 'uppercase',
              }}
            >
              {t.home.contactCta.eyebrow}
            </Typography>

            <Typography
              component="h2"
              sx={{
                m: 0,

                color: '#082F4D',

                fontSize: {
                  xs: '2.8rem',
                  sm: '3.6rem',
                  md: '4.5rem',
                  lg: '5rem',
                },

                fontWeight: 500,

                lineHeight: 0.98,

                letterSpacing: '-0.055em',
              }}
            >
              {t.home.contactCta.titleLine1}

              <Box
                component="span"
                sx={{
                  display: 'block',

                  color: '#649ABD',
                }}
              >
                {t.home.contactCta.titleLine2}
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,

                maxWidth: 620,

                color:
                  'rgba(8,47,77,0.58)',

                fontSize: {
                  xs: '0.94rem',
                  md: '1rem',
                },

                lineHeight: 1.8,
              }}
            >
              {t.home.contactCta.description}
            </Typography>
          </Box>

          {/* CTA */}

          <Button
            component={RouterLink}

            to={contractingPath('contact')}

            sx={{
              position: 'relative',

              zIndex: 1,

              minHeight: 54,

              px: 3.8,

              justifySelf: {
                xs: 'start',
                md: 'end',
              },

              bgcolor: '#082F4D',

              color: '#FFFFFF',

              borderRadius: '999px',

              fontSize: '0.78rem',

              fontWeight: 700,

              boxShadow: 'none',

              '&:hover': {
                bgcolor: '#649ABD',

                boxShadow: 'none',
              },
            }}
          >
            {t.home.contactCta.primaryCta}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default ContactCta