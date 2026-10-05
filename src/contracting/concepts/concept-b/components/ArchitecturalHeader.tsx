import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Drawer,
} from '@mui/material'

const navItems = [
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
]

function ArchitecturalHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
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

  const scrollToSection = (href: string) => {
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

          backgroundColor: scrolled
            ? 'rgba(8, 47, 77, 0.78)'
            : 'rgba(8, 47, 77, 0.10)',

          backdropFilter: scrolled
            ? 'blur(18px)'
            : 'blur(8px)',

          borderBottom: '1px solid',

          borderColor: scrolled
            ? 'rgba(255,255,255,0.12)'
            : 'rgba(255,255,255,0.10)',

          transition:
            'background-color 280ms ease, backdrop-filter 280ms ease, border-color 280ms ease',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1700,
            mx: 'auto',

            height: {
              xs: 72,
              md: 88,
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
              md: '260px 1fr 260px',
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
              WebkitAppearance: 'none',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
            
              border: 0,
              outline: 0,
              p: 0,
              m: 0,
            
              bgcolor: 'transparent',
              color: 'inherit',
            
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,

              width: 'fit-content',
              minWidth: 0,
            
              cursor: 'pointer',
              textAlign: 'left',
            
              '&:focus-visible': {
                outline: '2px solid rgba(185,218,242,0.75)',
                outlineOffset: 6,
              },
            }}
          >
            <Box
              sx={{
                fontSize: {
                  xs: '1.15rem',
                  md: '1.35rem',
                },

                fontWeight: 800,

                letterSpacing: '-0.04em',
              }}
            >
              FBS
            </Box>

            <Box
              sx={{
                width: '1px',
                height: 26,

                flexShrink: 0,

                bgcolor:
                  'rgba(255,255,255,0.35)',
              }}
            />

            <Box
              sx={{
                fontSize: '0.56rem',
                fontWeight: 700,

                lineHeight: 1.2,

                letterSpacing: '0.14em',

                textTransform: 'uppercase',
              }}
            >
              Contracting
              <br />
              Division
            </Box>
          </Box>


          {/* Desktop Navigation */}

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
                md: 3,
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
                  WebkitAppearance: 'none',
                  userSelect: 'none',
                  WebkitTapHighlightColor: 'transparent',
                
                  border: 0,
                  outline: 0,
                  p: 0,
                  m: 0,
                
                  bgcolor: 'transparent',
                  color: 'rgba(255,255,255,0.82)',
                
                  fontFamily: 'inherit',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                
                  letterSpacing: '0.07em',
                
                  cursor: 'pointer',
                  position: 'relative',
                
                  transition: 'color 180ms ease',
                
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: -10,
                    height: 2,
                    borderRadius: '999px',
                    bgcolor: '#B9DAF2',
                    opacity: 0,
                    transform: 'scaleX(0.7)',
                    transformOrigin: 'center',
                    transition: 'opacity 180ms ease, transform 180ms ease',
                  },
                
                  '&:hover': {
                    color: '#FFFFFF',
                  },
                
                  '&:hover::after': {
                    opacity: 1,
                    transform: 'scaleX(1)',
                  },
                
                  '&:focus-visible': {
                    color: '#FFFFFF',
                    outline: '2px solid rgba(185,218,242,0.75)',
                    outlineOffset: 8,
                  },
                
                  '&:focus-visible::after': {
                    opacity: 1,
                    transform: 'scaleX(1)',
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>


          {/* Right side */}

          <Box
            sx={{
              justifySelf: 'end',

              display: 'flex',
              alignItems: 'center',

              gap: 2,
            }}
          >
            <Button
              onClick={() =>
                scrollToSection('#contact')
              }
              sx={{
                display: {
                  xs: 'none',
                  md: 'inline-flex',
                },

                color: '#FFFFFF',

                border: '1px solid',
                borderColor:
                  'rgba(255,255,255,0.42)',

                px: 2.4,
                py: 1,

                fontSize: '0.68rem',

                letterSpacing: '0.08em',

                '&:hover': {
                  bgcolor: '#FFFFFF',
                  color: '#082F4D',

                  borderColor: '#FFFFFF',
                },
              }}
            >
              Start a project
            </Button>


            <Box
              component="button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="concept-b-menu"
              onClick={() =>
                setMenuOpen(true)
              }
              sx={{
                appearance: 'none',
                WebkitAppearance: 'none',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
              
                display: {
                  xs: 'inline-flex',
                  md: 'none',
                },
              
                border: 0,
                outline: 0,
                p: 0,
                m: 0,
              
                bgcolor: 'transparent',
                color: '#FFFFFF',
              
                fontFamily: 'inherit',
              
                fontSize: '0.72rem',
                fontWeight: 700,
              
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              
                cursor: 'pointer',
              
                '&:focus-visible': {
                  outline: '2px solid rgba(185,218,242,0.75)',
                  outlineOffset: 6,
                },
              }}
            >
              Menu
            </Box>
          </Box>
        </Box>
      </Box>


      {/* Mobile Drawer */}

      <Drawer
        id="concept-b-menu"
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
                sm: 460,
              },

              bgcolor: '#082F4D',
              color: '#FFFFFF',

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
                'rgba(255,255,255,0.15)',
            }}
          >
            <Box
              sx={{
                fontSize: '1.25rem',
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
                border: 0,
                p: 0,

                bgcolor: 'transparent',
                color: '#FFFFFF',

                cursor: 'pointer',

                fontFamily: 'inherit',

                fontSize: '0.7rem',

                letterSpacing: '0.1em',

                textTransform: 'uppercase',
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
                    width: '100%',

                    border: 0,
                    borderBottom:
                      '1px solid',

                    borderColor:
                      'rgba(255,255,255,0.15)',

                    bgcolor:
                      'transparent',

                    color: '#FFFFFF',

                    py: 2.5,

                    display: 'grid',

                    gridTemplateColumns:
                      '44px 1fr',

                    textAlign: 'left',

                    cursor: 'pointer',

                    fontFamily: 'inherit',
                  }}
                >
                  <Box
                    sx={{
                      color: '#B9DAF2',

                      fontSize: '0.65rem',
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
                        sm: '2.4rem',
                      },

                      fontWeight: 500,

                      letterSpacing:
                        '-0.04em',
                    }}
                  >
                    {item.label}
                  </Box>
                </Box>
              ),
            )}
          </Box>


          <Box
            sx={{
              mt: 'auto',

              pt: 5,

              color:
                'rgba(255,255,255,0.55)',

              fontSize: '0.7rem',

              lineHeight: 1.8,
            }}
          >
            Faisal Bin Saedan
            <br />
            Riyadh — Saudi Arabia
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default ArchitecturalHeader