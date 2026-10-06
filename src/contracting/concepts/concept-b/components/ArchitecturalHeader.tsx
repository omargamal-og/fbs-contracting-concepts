import { useState } from "react";

import { Box, Button, Drawer } from "@mui/material";
import LanguageSelector from "../../../core/components/LanguageSelector";

const navItems = [
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: 'Footprint',
    href: '#network',
  },
  {
    label: "Studio",
    href: "#about",
  },
  {
    label: "Expertise",
    href: "#capabilities",
  },
];

function ArchitecturalHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    setMenuOpen(false);

    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollHome = () => {
    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          position: "fixed",

          top: 0,
          left: 0,
          right: 0,

          zIndex: 1200,

          color: "#FFFFFF",

          bgcolor: 'rgba(8,47,77,0.12)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',

          borderBottom: '1px solid',
          borderColor: 'rgba(185,218,242,0.10)',

          boxShadow: 'none',
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1700,
            mx: "auto",

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

            display: "grid",

            gridTemplateColumns: {
              xs: "minmax(0, 1fr) auto",
              md: "260px 1fr 260px",
            },

            alignItems: "center",
          }}
        >
          {/* Brand */}

          <Box
            component="button"
            type="button"
            onClick={scrollHome}
            sx={{
              appearance: "none",
              WebkitAppearance: "none",
              userSelect: "none",
              WebkitTapHighlightColor: "transparent",

              border: 0,
              outline: 0,
              p: 0,
              m: 0,

              bgcolor: "transparent",
              color: "inherit",

              display: "flex",
              alignItems: "center",
              gap: 1.5,

              width: "fit-content",
              minWidth: 0,

              cursor: "pointer",
              textAlign: "left",

              "&:focus-visible": {
                outline: "2px solid rgba(185,218,242,0.75)",
                outlineOffset: 6,
              },
            }}
          >
            <Box
              sx={{
                fontSize: {
                  xs: "1.15rem",
                  md: "1.35rem",
                },

                fontWeight: 800,

                letterSpacing: "-0.04em",
              }}
            >
              FBS
            </Box>

            <Box
              sx={{
                width: "1px",
                height: 26,

                flexShrink: 0,

                bgcolor: "rgba(255,255,255,0.35)",
              }}
            />

            <Box
              sx={{
                fontSize: "0.56rem",
                fontWeight: 700,

                lineHeight: 1.2,

                letterSpacing: "0.14em",

                textTransform: "uppercase",
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
                xs: "none",
                md: "flex",
              },

              justifyContent: "center",
              alignItems: "center",

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
                onClick={() => scrollToSection(item.href)}
                sx={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  userSelect: "none",
                  WebkitTapHighlightColor: "transparent",

                  border: 0,
                  outline: 0,
                  p: 0,
                  m: 0,

                  bgcolor: "transparent",
                  color: "rgba(255,255,255,0.82)",

                  fontFamily: "inherit",
                  fontSize: "0.7rem",
                  fontWeight: 600,

                  letterSpacing: "0.07em",

                  cursor: "pointer",
                  position: "relative",

                  transition: "color 180ms ease",

                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -10,
                    height: 2,
                    borderRadius: "999px",
                    bgcolor: "#B9DAF2",
                    opacity: 0,
                    transform: "scaleX(0.7)",
                    transformOrigin: "center",
                    transition: "opacity 180ms ease, transform 180ms ease",
                  },

                  "&:hover": {
                    color: "#FFFFFF",
                  },

                  "&:hover::after": {
                    opacity: 1,
                    transform: "scaleX(1)",
                  },

                  "&:focus-visible": {
                    color: "#FFFFFF",
                    outline: "2px solid rgba(185,218,242,0.75)",
                    outlineOffset: 8,
                  },

                  "&:focus-visible::after": {
                    opacity: 1,
                    transform: "scaleX(1)",
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
              justifySelf: "end",

              display: "flex",
              alignItems: "center",

              gap: 2,
            }}
          >
            <LanguageSelector />

            <Button
              onClick={() => scrollToSection("#contact")}
              sx={{
                display: {
                  xs: "none",
                  md: "inline-flex",
                },

                color: "#FFFFFF",

                bgcolor: "transparent",

                border: "1px solid",
                borderColor: "rgba(255,255,255,0.42)",

                borderRadius: "12px",

                px: 2.4,
                py: 1,

                fontSize: "0.68rem",

                letterSpacing: "0.08em",

                transition:
                  "color 180ms ease, border-color 180ms ease, background-color 180ms ease",

                "&:hover": {
                  bgcolor: "transparent",

                  color: "#B9DAF2",

                  borderColor: "#B9DAF2",
                },
              }}
            >
              Build with us
            </Button>

            <Box
              component="button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="concept-b-menu"
              onClick={() => setMenuOpen(true)}
              sx={{
                appearance: "none",
                WebkitAppearance: "none",
                userSelect: "none",
                WebkitTapHighlightColor: "transparent",

                display: 'inline-flex',

                border: 0,
                outline: 0,
                p: 0,
                m: 0,

                bgcolor: "transparent",
                color: "#FFFFFF",

                fontFamily: "inherit",

                fontSize: "0.72rem",
                fontWeight: 700,

                letterSpacing: "0.1em",
                textTransform: "uppercase",

                cursor: "pointer",

                "&:focus-visible": {
                  outline: "2px solid rgba(185,218,242,0.75)",
                  outlineOffset: 6,
                },
              }}
            >
              Menu
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Drawer */}

      <Drawer
        id="concept-b-menu"
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: {
                xs: '100%',
                sm: 500,
              },
        
              bgcolor: 'rgba(8,47,77,0.12)',
              color: '#FFFFFF',
        
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
        
              backgroundImage: 'none',
        
              borderLeft:
                '1px solid rgba(185,218,242,0.14)',
        
              boxShadow:
                '-20px 0 60px rgba(3,20,32,0.14)',
        
              borderTopLeftRadius: {
                xs: 0,
                sm: '18px',
              },
        
              borderBottomLeftRadius: {
                xs: 0,
                sm: '18px',
              },
        
              overflow: 'hidden',
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
          {/* Top */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',

              pb: 3,

              borderBottom: '1px solid',
              borderColor: 'rgba(185,218,242,0.14)'
            }}
          >
            <Box>
              <Box
                sx={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                }}
              >
                FBS
              </Box>

              <Box
                sx={{
                  mt: 0.3,

                  color: '#649ABD',

                  fontSize: '0.48rem',
                  fontWeight: 700,

                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                Contracting
              </Box>
            </Box>

            <Box
              component="button"
              type="button"
              onClick={() => setMenuOpen(false)}
              sx={{
                appearance: 'none',

                border: 0,
                p: 0,

                bgcolor: 'transparent',
                color: '#FFFFFF',

                fontFamily: 'inherit',

                fontSize: '0.62rem',
                fontWeight: 700,

                letterSpacing: '0.11em',
                textTransform: 'uppercase',

                cursor: 'pointer',

                '&:hover': {
                  color: '#649ABD',
                },
              }}
            >
              Close
            </Box>
          </Box>

          {/* Navigation */}
          <Box
            component="nav"
            sx={{
              mt: 5,
            }}
          >
            {navItems.map((item, index) => (
              <Box
                key={item.href}
                component="button"
                type="button"
                onClick={() =>
                  scrollToSection(item.href)
                }
                sx={{
                  appearance: 'none',

                  width: '100%',

                  border: 0,
                  borderBottom: '1px solid',
                  borderColor: 'rgba(185,218,242,0.14)',

                  bgcolor: 'transparent',
                  color: '#FFFFFF',

                  py: 2.7,

                  display: 'grid',

                  gridTemplateColumns:
                    '45px 1fr auto',

                  gap: 1.5,

                  alignItems: 'center',

                  textAlign: 'left',

                  cursor: 'pointer',

                  transition:
                    'background-color 180ms ease, padding 180ms ease',

                  '&:hover': {
                    bgcolor:
                      'rgba(100,154,189,0.07)',

                    px: 1,
                  },

                  '&:focus-visible': {
                    outline:
                      '2px solid #649ABD',

                    outlineOffset: -2,
                  },
                }}
              >
                <Box
                  sx={{
                    color: '#B9DAF2',

                    fontSize: '0.54rem',
                    fontWeight: 700,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Box>

                <Box
                  sx={{
                    fontSize: {
                      xs: '2rem',
                      sm: '2.5rem',
                    },

                    fontWeight: 500,

                    letterSpacing: '-0.045em',
                  }}
                >
                  {item.label}
                </Box>

                <Box
                  sx={{
                    color: '#B9DAF2',

                    fontSize: '0.9rem',
                  }}
                >
                  ↗
                </Box>
              </Box>
            ))}
          </Box>

          {/* Contact CTA */}
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
                bgcolor: 'transparent !important',
                color: '#FFFFFF',
              
                minHeight: 44,
                minWidth: 92,
              
                px: 2,
                py: 1,
              
                border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: '12px',
              
                boxShadow: 'none',
              
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
              
                '&:hover': {
                  bgcolor: 'transparent !important',
                  color: '#B9DAF2',
                  borderColor: 'rgba(185,218,242,0.45)',
                  boxShadow: 'none',
                  cursor: 'pointer',
                },
              }}
            >
              Build with us ↗
            </Box>
          </Box>

          {/* Bottom */}
          <Box
            sx={{
              mt: 'auto',

              pt: 6,

              display: 'flex',

              justifyContent:
                'space-between',

              gap: 3,

              color: 'rgba(255,255,255,0.45)',

              fontSize: '0.56rem',
              fontWeight: 700,

              letterSpacing: '0.10em',
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
  );
}

export default ArchitecturalHeader;
