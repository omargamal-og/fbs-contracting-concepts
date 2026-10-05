import { Box } from '@mui/material'

const footerLinks = [
  {
    label: 'Projects',
    href: '#projects',
  },
  {
    label: 'Footprint',
    href: '#footprint',
  },
  {
    label: 'Studio',
    href: '#about',
  },
  {
    label: 'Expertise',
    href: '#capabilities',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
]

function ArchitecturalFooter() {
  const scrollToSection = (
    href: string,
  ) => {
    document
      .querySelector(href)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
  }

  const scrollHome = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#FFFFFF',
        color: '#082F4D',

        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1700,
          mx: 'auto',

          px: {
            xs: 2.5,
            sm: 4,
            md: 6,
            lg: 8,
          },

          pt: {
            xs: 6,
            md: 8,
          },

          pb: {
            xs: 4,
            md: 5,
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              sm: '1.4fr 1fr',
              lg: '2fr 1fr 1fr',
            },

            gap: {
              xs: 5,
              md: 7,
            },
          }}
        >
          {/* Brand */}

          <Box>
            <Box
              component="button"
              type="button"
              onClick={scrollHome}
              sx={{
                appearance: 'none',

                border: 0,
                p: 0,

                bgcolor: 'transparent',
                color: '#082F4D',

                cursor: 'pointer',

                textAlign: 'left',

                '&:focus-visible': {
                  outline:
                    '2px solid #649ABD',

                  outlineOffset: 5,
                },
              }}
            >
              <Box
                sx={{
                  fontSize: {
                    xs: '2.2rem',
                    md: '2.8rem',
                  },

                  fontWeight: 800,

                  letterSpacing:
                    '-0.055em',
                }}
              >
                FBS
              </Box>

              <Box
                sx={{
                  mt: 0.4,

                  color: '#649ABD',

                  fontSize: '0.58rem',
                  fontWeight: 700,

                  letterSpacing: '0.15em',

                  textTransform:
                    'uppercase',
                }}
              >
                Contracting Division
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,

                maxWidth: 390,

                color: 'text.secondary',

                fontSize: '0.82rem',
                lineHeight: 1.8,
              }}
            >
              Construction and project delivery
              shaped around precision,
              responsibility and long-term value.
            </Box>
          </Box>


          {/* Navigation */}

          <Box>
            <FooterLabel>
              Explore
            </FooterLabel>

            <Box
              component="nav"
              sx={{
                mt: 2.5,
              }}
            >
              {footerLinks.map(
                (link) => (
                  <Box
                    key={link.href}

                    component="button"
                    type="button"

                    onClick={() =>
                      scrollToSection(
                        link.href,
                      )
                    }

                    sx={{
                      appearance: 'none',

                      display: 'block',

                      border: 0,

                      p: 0,
                      mb: 1.5,

                      bgcolor:
                        'transparent',

                      color:
                        'text.primary',

                      fontFamily:
                        'inherit',

                      fontSize:
                        '0.82rem',

                      fontWeight: 600,

                      cursor: 'pointer',

                      transition:
                        'color 180ms ease, transform 180ms ease',

                      '&:hover': {
                        color:
                          '#649ABD',

                        transform:
                          'translateX(4px)',
                      },

                      '&:focus-visible': {
                        outline:
                          '2px solid #649ABD',

                        outlineOffset: 4,
                      },
                    }}
                  >
                    {link.label}
                  </Box>
                ),
              )}
            </Box>
          </Box>


          {/* Location */}

          <Box>
            <FooterLabel>
              Based in
            </FooterLabel>

            <Box
              sx={{
                mt: 2.5,

                fontSize: '0.82rem',

                lineHeight: 1.8,
              }}
            >
              Riyadh
              <br />
              Saudi Arabia
            </Box>

            <Box
              component="a"
              href="https://www.fbs.com.sa/contact"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mt: 3,

                display: 'inline-flex',

                alignItems: 'center',

                gap: 1,

                color: '#082F4D',

                textDecoration: 'none',

                fontSize: '0.68rem',
                fontWeight: 700,

                letterSpacing: '0.08em',

                '& span': {
                  transition:
                    'transform 180ms ease',
                },

                '&:hover': {
                  color: '#649ABD',
                },

                '&:hover span': {
                  transform:
                    'translate(4px, -4px)',
                },

                '&:focus-visible': {
                  outline:
                    '2px solid #649ABD',

                  outlineOffset: 5,
                },
              }}
            >
              Contact

              <Box component="span">
                ↗
              </Box>
            </Box>
          </Box>
        </Box>


        {/* Bottom */}

        <Box
          sx={{
            mt: {
              xs: 7,
              md: 10,
            },

            pt: 2.5,

            display: 'flex',

            flexDirection: {
              xs: 'column',
              sm: 'row',
            },

            justifyContent:
              'space-between',

            gap: 1.5,

            borderTop: '1px solid',
            borderColor: 'divider',

            color: 'text.secondary',

            fontSize: '0.58rem',

            letterSpacing: '0.08em',

            textTransform: 'uppercase',
          }}
        >
          <Box>
            © {new Date().getFullYear()} Faisal Bin Saedan
          </Box>

          <Box>
            Contracting / Saudi Arabia
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


function FooterLabel({
  children,
}: {
  children: string
}) {
  return (
    <Box
      sx={{
        color: '#649ABD',

        fontSize: '0.56rem',
        fontWeight: 700,

        letterSpacing: '0.14em',

        textTransform: 'uppercase',
      }}
    >
      {children}
    </Box>
  )
}

export default ArchitecturalFooter