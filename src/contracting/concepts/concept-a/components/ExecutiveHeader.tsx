import { Box, Button, Container, Drawer, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  ["About", "#about"],
  ["Capabilities", "#capabilities"],
  ["Projects", "#projects"],
  ["Our Footprint", "#footprint"],
  ["Contact", "#contact"],
] as const;

function ExecutiveHeader() {
  const [scrolled, setScrolled] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const homePath = "/contracting/concept-a";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogoClick = () => {
    setMobileOpen(false);

    if (location.pathname === homePath) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    navigate(homePath);
  };

  const handleNavigation = (target: string) => {
    setMobileOpen(false);

    if (location.pathname === homePath) {
      const element = document.querySelector(target);

      element?.scrollIntoView({
        behavior: "smooth",
      });

      return;
    }

    navigate(`${homePath}${target}`);
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

          color: "#fff",

          bgcolor: scrolled ? "rgba(18,18,18,0.92)" : "transparent",

          backdropFilter: scrolled ? "blur(18px)" : "none",

          borderBottom: "1px solid",

          borderColor: scrolled ? "rgba(255,255,255,0.08)" : "transparent",

          transition:
            "background-color 280ms ease, border-color 280ms ease, backdrop-filter 280ms ease",
        }}
      >
        <Container>
          <Box
            sx={{
              height: {
                xs: 72,
                md: 84,
              },

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Brand */}
            <Box
              component="button"
              type="button"
              onClick={handleLogoClick}
              aria-label="Go to FBS Contracting home"
              sx={{
                p: 0,
                m: 0,

                border: 0,
                bgcolor: "transparent",

                color: "inherit",
                textAlign: "left",

                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "0.95rem",
                    md: "1.15rem",
                  },

                  fontWeight: 700,

                  letterSpacing: "-0.02em",
                }}
              >
                FBS Contracting
              </Typography>

              <Typography
                sx={{
                  mt: 0.2,

                  display: {
                    xs: "none",
                    sm: "block",
                  },

                  color: "rgba(255,255,255,0.48)",

                  fontSize: "0.62rem",

                  letterSpacing: 1.5,

                  textTransform: "uppercase",
                }}
              >
                Faisal Bin Saedan Properties
              </Typography>
            </Box>

            {/* Desktop */}
            <Box
              component="nav"
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },

                alignItems: "center",
                gap: 0.5,
              }}
            >
              {navItems.slice(0, 4).map(([label, target]) => (
                <Button
                  key={label}
                  onClick={() => handleNavigation(target)}
                  color="inherit"
                  sx={{
                    px: 2,

                    color: "rgba(255,255,255,0.76)",

                    "&:hover": {
                      color: "#fff",

                      bgcolor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  {label}
                </Button>
              ))}

              <Button
                onClick={() => handleNavigation("#contact")}
                variant="outlined"
                sx={{
                  ml: 2,
                  px: 2.5,

                  color: "#fff",

                  borderColor: "rgba(255,255,255,0.38)",

                  "&:hover": {
                    borderColor: "#fff",

                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                Contact
              </Button>
            </Box>

            {/* Mobile Menu */}
            <Button
              onClick={() => setMobileOpen(true)}
              sx={{
                display: {
                  xs: "inline-flex",
                  md: "none",
                },

                minWidth: 0,

                px: 0,

                color: "#fff",

                fontSize: "0.75rem",

                fontWeight: 700,

                letterSpacing: 1,

                borderBottom: "1px solid rgba(255,255,255,0.4)",

                borderRadius: 0,
              }}
            >
              Menu
            </Button>
          </Box>
        </Container>
      </Box>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: {
                xs: "100%",
                sm: 420,
              },
        
              maxWidth: "100%",
        
              bgcolor: "#151515",
              color: "#fff",
        
              p: {
                xs: 3,
                sm: 4,
              },
            },
          },
        }}
      >
        <Box
          sx={{
            minHeight: "calc(100dvh - 48px)",

            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              FBS Contracting
            </Typography>

            <Button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              sx={{
                minWidth: 40,
                width: 40,
                height: 40,

                p: 0,

                color: "#fff",

                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "50%",

                fontSize: "1.2rem",

                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.25)",
                },
              }}
            >
              ×
            </Button>
          </Box>

          <Box
            sx={{
              mt: 10,
            }}
          >
            {navItems.map(([label, target], index) => (
              <Box
                key={label}
                component="button"
                type="button"
                onClick={() => handleNavigation(target)}
                sx={{
                  width: "100%",

                  py: 2.3,

                  border: 0,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",

                  bgcolor: "transparent",

                  color: "#fff",

                  display: "flex",
                  alignItems: "center",

                  justifyContent: "space-between",

                  textAlign: "left",

                  cursor: "pointer",

                  transition:
                    "padding 200ms ease, background-color 200ms ease",

                  "&:hover": {
                    px: 1,
                    bgcolor: "rgba(255,255,255,0.035)",
},
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.55rem",

                    fontWeight: 500,
                  }}
                >
                  {label}
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.35)",

                    fontSize: "0.7rem",
                  }}
                >
                  0{index + 1}
                </Typography>
              </Box>
            ))}
          </Box>

          <Typography
            sx={{
              mt: "auto",

              pt: 5,

              color: "rgba(255,255,255,0.35)",

              fontSize: "0.72rem",
            }}
          >
            Faisal Bin Saedan Properties
            <br />
            Riyadh, Saudi Arabia
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}

export default ExecutiveHeader;
