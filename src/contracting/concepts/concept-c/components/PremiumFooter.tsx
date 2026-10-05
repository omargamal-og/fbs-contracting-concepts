import { Box } from '@mui/material'

const footerLinks = [
  {
    label: 'Projects',
    href: '#projects',
  },
  {
    label: 'Network',
    href: '#network',
  },
  {
    label: 'Capabilities',
    href: '#capabilities',
  },
  {
    label: 'Company',
    href: '#company',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
]

function PremiumFooter() {
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

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',

        overflow: 'hidden',

        bgcolor: '#EEF4F6',
        color: '#082F4D',

        borderTop: '1px solid',
        borderColor:
          'rgba(8,47,77,0.10)',
      }}
    >
      {/* Giant background word */}

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',

          left: '50%',
          bottom: {
            xs: 30,
            md: -40,
          },

          transform:
            'translateX(-50%)',

          color:
            'rgba(8,47,77,0.035)',

          fontSize: {
            xs: '9rem',
            sm: '14rem',
            md: '20rem',
            lg: '27rem',
          },

          fontWeight: 800,

          lineHeight: 0.75,

          letterSpacing:
            '-0.08em',

          whiteSpace: 'nowrap',

          pointerEvents: 'none',
        }}
      >
        FBS
      </Box>


      <Box
        sx={{
          position: 'relative',

          zIndex: 2,

          width: '100%',
          maxWidth: 1740,
          mx: 'auto',

          px: {
            xs: 2.5,
            sm: 4,
            md: 6,
            lg: 8,
          },

          pt: {
            xs: 7,
            md: 10,
          },

          pb: {
            xs: 4,
            md: 5,
          },
        }}
      >
        {/* Top */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: '1.5fr 0.7fr 0.7fr',
            },

            gap: {
              xs: 6,
              md: 7,
            },
          }}
        >
          {/* Brand */}

          <Box>
            <Box
              sx={{
                fontSize: {
                  xs: '2.5rem',
                  md: '3rem',
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
                mt: 0.5,

                color: '#649ABD',

                fontSize: '0.56rem',
                fontWeight: 700,

                letterSpacing:
                  '0.15em',

                textTransform:
                  'uppercase',
              }}
            >
              Contracting
            </Box>


            <Box
              sx={{
                mt: {
                  xs: 3,
                  md: 4,
                },

                maxWidth: 560,

                fontSize: {
                  xs: '1.5rem',
                  sm: '1.8rem',
                  md: '2.2rem',
                },

                fontWeight: 500,

                lineHeight: 1.25,

                letterSpacing:
                  '-0.04em',
              }}
            >
              Building with precision.
              <br />
              Delivering with purpose.
            </Box>
          </Box>


          {/* Explore */}

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
                (item) => (
                  <Box
                    key={item.href}

                    component="button"
                    type="button"

                    onClick={() =>
                      scrollToSection(
                        item.href,
                      )
                    }

                    sx={{
                      appearance: 'none',

                      display: 'block',

                      border: 0,

                      p: 0,
                      mb: 1.6,

                      bgcolor:
                        'transparent',

                      color: '#082F4D',

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
                    {item.label}
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
                mt: 3.5,

                display: 'inline-flex',

                alignItems: 'center',

                gap: 1,

                color: '#082F4D',

                textDecoration:
                  'none',

                fontSize: '0.7rem',
                fontWeight: 700,

                letterSpacing:
                  '0.07em',

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
              }}
            >
              Contact FBS

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
              xs: 9,
              md: 14,
            },

            pt: 2.5,

            display: 'flex',

            flexDirection: {
              xs: 'column',
              sm: 'row',
            },

            justifyContent:
              'space-between',

            gap: 2,

            borderTop: '1px solid',

            borderColor:
              'rgba(8,47,77,0.14)',

            color:
              'rgba(8,47,77,0.48)',

            fontSize: '0.56rem',
            fontWeight: 700,

            letterSpacing:
              '0.09em',

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

        fontSize: '0.54rem',
        fontWeight: 700,

        letterSpacing:
          '0.14em',

        textTransform: 'uppercase',
      }}
    >
      {children}
    </Box>
  )
}

export default PremiumFooter