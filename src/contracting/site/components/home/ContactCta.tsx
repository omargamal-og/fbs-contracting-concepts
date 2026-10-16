
import {
  Box,
  Button,
  SvgIcon,
  Typography,
} from '@mui/material'

import { Link as RouterLink } from 'react-router-dom'

import { contractingPath } from '../../config/site'
import { useLanguage } from '../../i18n/useLanguage'
import { useTranslation } from '../../i18n/useTranslation'

function ContactCta() {
  const t = useTranslation()
  const { language, direction } = useLanguage()
  const rtl = direction === 'rtl'

  return (
    <Box
      component="section"
      id="contact-cta"
      aria-labelledby="contact-cta-title"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        bgcolor: '#FFFFFF',
        background:
          'linear-gradient(115deg, #FFFFFF 35%, #EEF4F6 100%)',
        py: {
          xs: 9,
          md: 13,
          lg: 16,
        },

        // Subtle architectural decoration
        '&::before': {
          content: '""',
          position: 'absolute',
          width: 650,
          height: 650,
          top: -340,
          right: -250,
          borderRadius: '50%',
          border: '1px solid rgba(100,154,189,0.13)',
          pointerEvents: 'none',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1600,
          mx: 'auto',
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
              md: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
            },
            gap: {
              xs: 7,
              md: 8,
              lg: 12,
            },
            alignItems: 'center',
          }}
        >
          {/* Main Content */}
          <Box sx={{ minWidth: 0 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 3,
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  width: 34,
                  height: 2,
                  bgcolor: '#649ABD',
                }}
              />

              <Typography
                sx={{
                  color: '#386682',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: rtl ? '0.03em' : '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                {t.home.contactCta.eyebrow}
              </Typography>
            </Box>

            <Typography
              component="h2"
              id="contact-cta-title"
              sx={{
                m: 0,
                color: '#082F4D',
                fontSize: {
                  xs: '2.7rem',
                  sm: '3.7rem',
                  md: '4.2rem',
                  lg: '5rem',
                },
                fontWeight: 500,
                lineHeight: rtl ? 1.2 : 1.08,
                letterSpacing: rtl ? '-0.025em' : '-0.045em',
                overflowWrap: 'break-word',
              }}
            >
              {t.home.contactCta.titleLine1}

              <Box
                component="span"
                sx={{
                  display: 'block',
                  color: '#386682',
                }}
              >
                {t.home.contactCta.titleLine2}
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,
                maxWidth: 570,
                color: '#386682',
                fontSize: {
                  xs: '0.95rem',
                  md: '1.05rem',
                },
                lineHeight: 1.9,
              }}
            >
              {t.home.contactCta.description}
            </Typography>

            <Button
              component={RouterLink}
              to={contractingPath('contact')}
              endIcon={
                <SvgIcon
                  aria-hidden="true"
                  sx={{
                    fontSize: '1.1rem',
                    transform: rtl ? 'scaleX(-1)' : 'none',
                  }}
                >
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </SvgIcon>
              }
              sx={{
                mt: 4,
                px: 3.5,
                minHeight: 54,
                borderRadius: '9px',
                bgcolor: '#082F4D',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 700,
                boxShadow: '0 10px 25px rgba(8,47,77,0.12)',
                transition:
                  'background-color 200ms ease, transform 200ms ease, box-shadow 200ms ease',

                '&:hover': {
                  bgcolor: '#164B6B',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 30px rgba(8,47,77,0.18)',
                },

                '&:focus-visible': {
                  outline: '2px solid #649ABD',
                  outlineOffset: 4,
                },

                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                  '&:hover': {
                    transform: 'none',
                  },
                },
              }}
            >
              {t.home.contactCta.primaryCta}
            </Button>
          </Box>

          {/* Contact Information */}
          <Box
            sx={{
              minWidth: 0,
              borderInlineStart: {
                xs: 'none',
                md: '1px solid rgba(8,47,77,0.12)',
              },
              paddingInlineStart: {
                xs: 0,
                md: 5,
                lg: 7,
              },
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {/* Phone */}
            <Box
              component="a"
              href="tel:920024010"
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2.5,
                textDecoration: 'none',
                color: '#082F4D',
                '&:hover .contact-value': {
                  color: '#386682',
                },
                '&:focus-visible': {
                  outline: '2px solid #649ABD',
                  outlineOffset: 5,
                },
              }}
            >
              <SvgIcon
                aria-hidden="true"
                sx={{
                  mt: 0.5,
                  color: '#386682',
                  fontSize: 27,
                }}
              >
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.56 3.58.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.56 3.58a1 1 0 0 1-.25 1.01l-2.19 2.2Z" />
              </SvgIcon>

              <Box>
                <Typography
                  sx={{
                    color: '#386682',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    mb: 0.8,
                  }}
                >
                  {language === 'ar' ? 'اتصل بنا' : 'Call Us'}
                </Typography>

                <Typography
                  className="contact-value"
                  dir="ltr"
                  sx={{
                    color: '#082F4D',
                    fontSize: {
                      xs: '1.4rem',
                      md: '1.6rem',
                    },
                    fontWeight: 600,
                    transition: 'color 180ms ease',
                  }}
                >
                  920024010
                </Typography>
              </Box>
            </Box>

            {/* Email */}
            <Box
              component="a"
              href="mailto:info.cont@fbs.com.sa"
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2.5,
                textDecoration: 'none',
                color: '#082F4D',
                minWidth: 0,
                '&:hover .contact-value': {
                  color: '#386682',
                },
                '&:focus-visible': {
                  outline: '2px solid #649ABD',
                  outlineOffset: 5,
                },
              }}
            >
              <SvgIcon
                aria-hidden="true"
                sx={{
                  mt: 0.5,
                  color: '#386682',
                  fontSize: 27,
                }}
              >
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
              </SvgIcon>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    color: '#386682',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    mb: 0.8,
                  }}
                >
                  {language === 'ar' ? 'راسلنا' : 'Email Us'}
                </Typography>

                <Typography
                  className="contact-value"
                  dir="ltr"
                  sx={{
                    color: '#082F4D',
                    fontSize: {
                      xs: '1.05rem',
                      lg: '1.25rem',
                    },
                    fontWeight: 600,
                    overflowWrap: 'anywhere',
                    transition: 'color 180ms ease',
                  }}
                >
                  info.cont@fbs.com.sa
                </Typography>
              </Box>
            </Box>

            {/* Location */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2.5,
              }}
            >
              <SvgIcon
                aria-hidden="true"
                sx={{
                  mt: 0.5,
                  color: '#386682',
                  fontSize: 27,
                }}
              >
                <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
              </SvgIcon>

              <Box>
                <Typography
                  sx={{
                    color: '#386682',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    mb: 0.8,
                  }}
                >
                  {language === 'ar' ? 'موقعنا' : 'Our Location'}
                </Typography>

                <Typography
                  sx={{
                    color: '#082F4D',
                    fontSize: '1rem',
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  {language === 'ar'
                    ? 'الرياض، حي التعاون، المملكة العربية السعودية'
                    : 'Al-Taawun District, Riyadh, Saudi Arabia'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Architectural bottom line */}
        <Box
          aria-hidden="true"
          sx={{
            mt: {
              xs: 8,
              md: 11,
            },
            width: '100%',
            height: '1px',
            background:
              'linear-gradient(90deg, #649ABD, rgba(100,154,189,0.08))',
          }}
        />
      </Box>
    </Box>
  )
}

export default ContactCta
