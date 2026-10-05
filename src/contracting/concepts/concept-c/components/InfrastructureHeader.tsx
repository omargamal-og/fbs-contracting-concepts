import { useEffect, useState } from 'react'

import {
  Box,
  Drawer,
} from '@mui/material'
import LanguageSelector from '../../../core/components/LanguageSelector'

const navItems = [
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
]

function InfrastructureHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    handleScroll()

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true },
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      )
    }
  }, [])

  const scrollToSection = (
    href: string,
  ) => {
    setMenuOpen(false)

    document
      .querySelector(href)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
  }

  const scrollHome = () => {
    setMenuOpen(false)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'fixed',

          top: 0,
          left: 0,
          right: 0,

          zIndex: 1200,

          color: '#FFFFFF',

          bgcolor: scrolled
            ? 'rgba(8,47,77,0.88)'
            : 'rgba(8,47,77,0.08)',

          backdropFilter: scrolled
            ? 'blur(22px)'
            : 'blur(8px)',

          borderBottom: '1px solid',

          borderColor: scrolled
            ? 'rgba(185,218,242,0.14)'
            : 'rgba(255,255,255,0.10)',

          transition:
            'background-color 280ms ease, backdrop-filter 280ms ease, border-color 280ms ease',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1740,
            mx: 'auto',

            height: {
              xs: 72,
              md: 86,
            },

            px: {
              xs: 2.5,
              sm: 4,
              md: 6,
              lg: 8,
            },

            display: 'grid',

            gridTemplateColumns: {
              xs: 'minmax(0, 1fr) auto',
              md: '270px 1fr 270px',
            },

            alignItems: 'center',
          }}
        >
          {/* Brand */}

          <Box
            component="button"
            type="button"
            onClick={scrollHome}
            sx={{
              appearance: 'none',

              width: 'fit-content',

              border: 0,
              p: 0,

              bgcolor: 'transparent',
              color: '#FFFFFF',

              display: 'flex',
              alignItems: 'center',

              gap: 1.4,

              cursor: 'pointer',

              textAlign: 'left',

              '&:focus-visible': {
                outline:
                  '2px solid #B9DAF2',

                outlineOffset: 6,
              },
            }}
          >
            <Box
              sx={{
                fontSize: {
                  xs: '1.15rem',
                  md: '1.3rem',
                },

                fontWeight: 800,

                letterSpacing:
                  '-0.04em',
              }}
            >
              FBS
            </Box>

            <Box
              sx={{
                width: '1px',
                height: 28,

                flexShrink: 0,

                bgcolor:
                  'rgba(255,255,255,0.30)',
              }}
            />

            <Box>
              <Box
                sx={{
                  fontSize: '0.52rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.14em',

                  textTransform:
                    'uppercase',
                }}
              >
                Contracting
              </Box>

              <Box
                sx={{
                  mt: 0.15,

                  color:
                    'rgba(255,255,255,0.50)',

                  fontSize: '0.46rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.13em',

                  textTransform:
                    'uppercase',
                }}
              >
                Saudi Arabia
              </Box>
            </Box>
          </Box>


          {/* Navigation */}

          <Box
            component="nav"
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },

              justifyContent: 'center',
              alignItems: 'center',

              gap: {
                md: 3.2,
                lg: 4.5,
              },
            }}
          >
            {navItems.map((item) => (
              <Box
                key={item.href}

                component="button"
                type="button"

                onClick={() =>
                  scrollToSection(item.href)
                }

                sx={{
                  appearance: 'none',

                  border: 0,
                  p: 0,

                  bgcolor: 'transparent',

                  color:
                    'rgba(255,255,255,0.72)',

                  fontFamily: 'inherit',

                  fontSize: '0.66rem',
                  fontWeight: 600,

                  letterSpacing:
                    '0.06em',

                  cursor: 'pointer',

                  position: 'relative',

                  transition:
                    'color 180ms ease',

                  '&::after': {
                    content: '""',

                    position: 'absolute',

                    left: 0,
                    right: 0,
                    bottom: -9,

                    height: '1px',

                    bgcolor: '#B9DAF2',

                    opacity: 0,

                    transform:
                      'scaleX(0.7)',

                    transition:
                      'opacity 180ms ease, transform 180ms ease',
                  },

                  '&:hover': {
                    color: '#FFFFFF',
                  },

                  '&:hover::after': {
                    opacity: 1,

                    transform:
                      'scaleX(1)',
                  },

                  '&:focus-visible': {
                    outline:
                      '2px solid #B9DAF2',

                    outlineOffset: 6,
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>


          {/* Right */}

          <Box
            sx={{
              justifySelf: 'end',

              display: 'flex',
              alignItems: 'center',

              gap: {
                xs: 2,
                md: 2.8,
              },
            }}
          >

          <LanguageSelector />

            <Box
              component="button"
              type="button"

              onClick={() =>
                scrollToSection('#contact')
              }

              sx={{
                display: {
                  xs: 'none',
                  md: 'inline-flex',
                },

                appearance: 'none',

                border: 0,
                p: 0,

                bgcolor: 'transparent',
                color: '#FFFFFF',

                fontFamily: 'inherit',

                fontSize: '0.66rem',
                fontWeight: 600,

                letterSpacing:
                  '0.06em',

                cursor: 'pointer',

                '&:hover': {
                  color: '#B9DAF2',
                },

                '&:focus-visible': {
                  outline:
                    '2px solid #B9DAF2',

                  outlineOffset: 6,
                },
              }}
            >
              Contact
            </Box>


            <Box
              component="button"
              type="button"

              aria-expanded={menuOpen}

              onClick={() =>
                setMenuOpen(true)
              }

              sx={{
                appearance: 'none',

                border: 0,
                p: 0,

                bgcolor: 'transparent',
                color: '#FFFFFF',

                display: 'inline-flex',
                alignItems: 'center',

                gap: 1,

                fontFamily: 'inherit',

                fontSize: '0.66rem',
                fontWeight: 700,

                letterSpacing:
                  '0.10em',

                textTransform:
                  'uppercase',

                cursor: 'pointer',

                '&:focus-visible': {
                  outline:
                    '2px solid #B9DAF2',

                  outlineOffset: 6,
                },
              }}
            >
              Menu

              <Box
                sx={{
                  width: 18,

                  display: 'grid',

                  gap: '4px',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '1px',

                    bgcolor: '#FFFFFF',
                  }}
                />

                <Box
                  sx={{
                    width: '70%',
                    height: '1px',

                    justifySelf: 'end',

                    bgcolor: '#FFFFFF',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>


      {/* Premium menu */}

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
        slotProps={{
          paper: {
            sx: {
              width: {
                xs: '100%',
                sm: 500,
              },

              bgcolor: '#EEF4F6',
              color: '#082F4D',

              backgroundImage: 'none',
            },
          },
        }}
      >
        <Box
          sx={{
            minHeight: '100%',

            px: {
              xs: 3,
              sm: 5,
            },

            pt: 3,
            pb: 4,

            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',

              justifyContent:
                'space-between',

              alignItems: 'center',

              pb: 3,

              borderBottom: '1px solid',

              borderColor:
                'rgba(8,47,77,0.14)',
            }}
          >
            <Box
              sx={{
                fontSize: '1.3rem',
                fontWeight: 800,
              }}
            >
              FBS
            </Box>

            <Box
              component="button"
              type="button"

              onClick={() =>
                setMenuOpen(false)
              }

              sx={{
                appearance: 'none',

                border: 0,
                p: 0,

                bgcolor: 'transparent',
                color: '#082F4D',

                fontFamily: 'inherit',

                fontSize: '0.62rem',
                fontWeight: 700,

                letterSpacing:
                  '0.11em',

                textTransform:
                  'uppercase',

                cursor: 'pointer',
              }}
            >
              Close
            </Box>
          </Box>


          <Box
            component="nav"
            sx={{
              mt: 5,
            }}
          >
            {navItems.map(
              (item, index) => (
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

                    width: '100%',

                    border: 0,
                    borderBottom:
                      '1px solid',

                    borderColor:
                      'rgba(8,47,77,0.14)',

                    bgcolor:
                      'transparent',

                    color: '#082F4D',

                    py: 2.7,

                    display: 'grid',

                    gridTemplateColumns:
                      '45px 1fr auto',

                    gap: 1.5,

                    alignItems: 'center',

                    textAlign: 'left',

                    cursor: 'pointer',
                  }}
                >
                  <Box
                    sx={{
                      color: '#649ABD',

                      fontSize: '0.54rem',
                      fontWeight: 700,
                    }}
                  >
                    {String(
                      index + 1,
                    ).padStart(2, '0')}
                  </Box>

                  <Box
                    sx={{
                      fontSize: {
                        xs: '2rem',
                        sm: '2.5rem',
                      },

                      fontWeight: 500,

                      letterSpacing:
                        '-0.045em',
                    }}
                  >
                    {item.label}
                  </Box>

                  <Box
                    sx={{
                      color: '#649ABD',
                    }}
                  >
                    ↗
                  </Box>
                </Box>
              ),
            )}
          </Box>


          <Box
            sx={{
              mt: 4,
            }}
          >
            <Box
              component="button"
              type="button"

              onClick={() =>
                scrollToSection('#contact')
              }

              sx={{
                appearance: 'none',

                width: '100%',

                border: 0,

                px: 2.5,
                py: 2,

                bgcolor: '#082F4D',
                color: '#FFFFFF',

                fontFamily: 'inherit',

                fontSize: '0.72rem',
                fontWeight: 700,

                cursor: 'pointer',
              }}
            >
              Start a Conversation ↗
            </Box>
          </Box>


          <Box
            sx={{
              mt: 'auto',

              pt: 6,

              display: 'flex',

              justifyContent:
                'space-between',

              gap: 3,

              color:
                'rgba(8,47,77,0.45)',

              fontSize: '0.56rem',
              fontWeight: 700,

              letterSpacing:
                '0.10em',

              textTransform: 'uppercase',
            }}
          >
            <Box>
              Riyadh
            </Box>

            <Box>
              Saudi Arabia
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default InfrastructureHeader