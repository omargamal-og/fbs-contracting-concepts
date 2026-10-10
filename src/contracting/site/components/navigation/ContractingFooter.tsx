import {
  Box,
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
  useLanguage,
} from '../../i18n/useLanguage'

import {
  useTranslation,
} from '../../i18n/useTranslation'

function ContractingFooter() {
  const t = useTranslation()

  const {
    language,
    setLanguage,
  } = useLanguage()

  const currentYear =
    new Date().getFullYear()

  const footerColumns = [
    {
      title: t.footer.companyTitle,

      links: [
        {
          label: t.footer.whoWeAre,
          path: 'about/who-we-are',
        },

        {
          label: t.footer.visionMission,
          path: 'about/vision-mission',
        },

        {
          label: t.footer.values,
          path: 'about/core-values',
        },
      ],
    },

    {
      title: t.footer.projectsTitle,

      links: [
        {
          label: t.footer.residential,
          path: 'projects/residential',
        },

        {
          label: t.footer.commercial,
          path: 'projects/commercial',
        },

        {
          label: t.footer.sustainability,
          path: 'sustainability',
        },
      ],
    },

    {
      title: t.footer.connectTitle,

      links: [
        {
          label: t.footer.careers,
          path: 'careers',
        },

        {
          label: t.footer.suppliers,
          path: 'suppliers',
        },

        {
          label: t.footer.contact,
          path: 'contact',
        },
      ],
    },
  ]

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#FFFFFF',

        borderTop: '1px solid',

        borderColor:
          'rgba(8,47,77,0.10)',
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

          pt: {
            xs: 7,
            md: 9,
          },

          pb: {
            xs: 3,
            md: 4,
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: '1.25fr 1fr',
            },

            gap: {
              xs: 6,
              lg: 10,
            },
          }}
        >
          {/* Brand */}

          <Box
            sx={{
              maxWidth: 520,
            }}
          >
            <Box
              component={RouterLink}

              to={contractingPath()}

              sx={{
                width: 'fit-content',

                display: 'flex',

                alignItems: 'center',

                gap: 1.4,

                color: '#082F4D',

                textDecoration: 'none',
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.6rem',

                  fontWeight: 800,

                  letterSpacing:
                    '-0.045em',
                }}
              >
                FBS
              </Typography>

              <Box
                sx={{
                  width: '1px',

                  height: 32,

                  bgcolor:
                    'rgba(8,47,77,0.16)',
                }}
              />

              <Typography
                sx={{
                  fontSize: '0.58rem',

                  fontWeight: 700,

                  letterSpacing:
                    '0.14em',

                  textTransform:
                    'uppercase',
                }}
              >
                Contracting
              </Typography>
            </Box>

            <Typography
              sx={{
                mt: 3,

                maxWidth: 470,

                color:
                  'rgba(8,47,77,0.56)',

                fontSize: '0.92rem',

                lineHeight: 1.8,
              }}
            >
              {t.footer.description}
            </Typography>
          </Box>

          {/* Links */}

          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs:
                  'repeat(2, minmax(0, 1fr))',

                sm:
                  'repeat(3, minmax(0, 1fr))',
              },

              gap: {
                xs: 4,
                md: 6,
              },
            }}
          >
            {footerColumns.map(
              (column) => (
                <Box
                  key={column.title}
                >
                  <Typography
                    sx={{
                      mb: 2.5,

                      color: '#649ABD',

                      fontSize:
                        '0.62rem',

                      fontWeight: 700,

                      letterSpacing:
                        '0.14em',

                      textTransform:
                        'uppercase',
                    }}
                  >
                    {column.title}
                  </Typography>

                  <Box
                    sx={{
                      display: 'grid',

                      gap: 1.5,
                    }}
                  >
                    {column.links.map(
                      (link) => (
                        <Box
                          key={link.path}

                          component={
                            RouterLink
                          }

                          to={contractingPath(
                            link.path,
                          )}

                          sx={{
                            width:
                              'fit-content',

                            color:
                              '#082F4D',

                            textDecoration:
                              'none',

                            fontSize:
                              '0.82rem',

                            fontWeight:
                              600,

                            transition:
                              'color 180ms ease',

                            '&:hover': {
                              color:
                                '#649ABD',
                            },
                          }}
                        >
                          {link.label}
                        </Box>
                      ),
                    )}
                  </Box>
                </Box>
              ),
            )}
          </Box>
        </Box>

        {/* Bottom */}

        <Box
          sx={{
            mt: {
              xs: 7,
              md: 9,
            },

            pt: 3,

            borderTop: '1px solid',

            borderColor:
              'rgba(8,47,77,0.10)',

            display: 'flex',

            flexDirection: {
              xs: 'column',
              sm: 'row',
            },

            alignItems: {
              xs: 'flex-start',
              sm: 'center',
            },

            justifyContent:
              'space-between',

            gap: 2,
          }}
        >
          <Typography
            sx={{
              color:
                'rgba(8,47,77,0.42)',

              fontSize: '0.68rem',
            }}
          >
            © {currentYear}{' '}
            {t.footer.copyright}
          </Typography>

          {/* Language */}

          <Box
            sx={{
              display: 'flex',

              alignItems: 'center',

              gap: 1.2,
            }}
          >
            <Box
              component="button"

              type="button"

              onClick={() =>
                setLanguage('en')
              }

              sx={{
                border: 0,

                p: 0,

                bgcolor:
                  'transparent',

                color:
                  language === 'en'
                    ? '#082F4D'
                    : 'rgba(8,47,77,0.36)',

                fontFamily:
                  'inherit',

                fontSize:
                  '0.68rem',

                fontWeight: 700,

                cursor: 'pointer',
              }}
            >
              English
            </Box>

            <Box
              sx={{
                width: '1px',

                height: 14,

                bgcolor:
                  'rgba(8,47,77,0.14)',
              }}
            />

            <Box
              component="button"

              type="button"

              dir="rtl"

              onClick={() =>
                setLanguage('ar')
              }

              sx={{
                border: 0,

                p: 0,

                bgcolor:
                  'transparent',

                color:
                  language === 'ar'
                    ? '#649ABD'
                    : 'rgba(8,47,77,0.36)',

                fontFamily:
                  'inherit',

                fontSize:
                  '0.72rem',

                fontWeight: 700,

                cursor: 'pointer',
              }}
            >
              العربية
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ContractingFooter