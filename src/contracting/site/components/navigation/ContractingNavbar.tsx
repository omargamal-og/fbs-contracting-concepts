import {
  useEffect,
  useState,
} from 'react'

import { Box, Button, Collapse, Drawer } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import { mainNavigation, type NavigationKey } from "../../data/navigation";

import { useTranslation } from "../../i18n/useTranslation";

import { contractingPath } from "../../config/site";

import { useLanguage } from "../../i18n/useLanguage";

function ContractingNavbar() {
  const t = useTranslation();

  const [isScrolled, setIsScrolled] =
  useState(false)

useEffect(() => {
  const handleScroll = () => {
      setIsScrolled(
        window.scrollY > 40,
      )
    }

    handleScroll()

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      },
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      )
    }
  }, [])

  const { language, setLanguage } = useLanguage();

  const [activeDropdown, setActiveDropdown] = useState<NavigationKey | null>(
    null
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  const [mobileGroup, setMobileGroup] =
  useState<NavigationKey | null>(null)

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileGroup(null);
  };

  return (
    <>
      <Box
        component="header"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setActiveDropdown(null);
          }
        }}
        // sx={{
        //   position: "sticky",

        //   top: 0,

        //   zIndex: 1200,

        //   bgcolor: "rgba(255,255,255,0.92)",

        //   backdropFilter: "blur(18px)",

        //   WebkitBackdropFilter: "blur(18px)",

        //   borderBottom: "1px solid",

        //   borderColor: "rgba(8,47,77,0.10)",
        // }}
        sx={{
          position: 'sticky',
        
          top: 0,
        
          zIndex: 1200,
        
          bgcolor: isScrolled
            ? 'rgba(8,47,77,0.88)'
            : 'rgba(255,255,255,0)',
        
          backdropFilter: isScrolled
            ? 'blur(18px)'
            : 'none',
        
          WebkitBackdropFilter: isScrolled
            ? 'blur(18px)'
            : 'none',
        
          borderBottom: '1px solid',

          borderColor: isScrolled
            ? 'rgba(255,255,255,0.10)'
            : 'transparent',
        
          boxShadow: isScrolled
            ? '0 10px 40px rgba(8,47,77,0.10)'
            : 'none',
        
            transition:
            'background-color 260ms ease, color 260ms ease, border-color 260ms ease, box-shadow 260ms ease, backdrop-filter 260ms ease',
        }}
      >
        <Box
          sx={{
            width: "100%",

            maxWidth: 1760,

            mx: "auto",

            height: {
              xs: 72,
              lg: 84,
            },

            px: {
              xs: 2.5,
              sm: 4,
              md: 5,
              lg: 6,
              xl: 8,
            },

            display: "grid",

            gridTemplateColumns: {
              xs: "minmax(0, 1fr) auto",

              lg: "220px minmax(0, 1fr) auto",
            },

            alignItems: "center",

            gap: 2,
          }}
        >
          {/* Brand */}

          <Box
            component={RouterLink}
            to={contractingPath()}
            sx={{
              width: "fit-content",

              display: "flex",

              alignItems: "center",

              gap: 1.25,

              color: isScrolled
                ? '#FFFFFF'
                : '#082F4D',

              textDecoration: "none",

              "&:focus-visible": {
                outline: "2px solid #649ABD",

                outlineOffset: 6,
              },
            }}
          >
            <Box
              sx={{
                fontSize: {
                  xs: "1.15rem",
                  lg: "1.3rem",
                },

                fontWeight: 800,

                letterSpacing: "-0.04em",
              }}
            >
              {t.navigation.logo_t1}
            </Box>

            <Box
              sx={{
                width: "1px",

                height: 28,

                bgcolor: isScrolled
                ? 'rgba(255,255,255,0.28)'
                : 'rgba(8,47,77,0.20)',
              }}
            />

            <Box
              sx={{
                fontSize: "0.53rem",

                fontWeight: 700,

                lineHeight: 1.25,

                letterSpacing: "0.13em",

                textTransform: "uppercase",
              }}
            >
              {t.navigation.logo_t2}
            </Box>
          </Box>

          {/* Desktop Navigation */}

          <Box
            component="nav"
            aria-label="Main navigation"
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },

              justifyContent: "center",

              alignItems: "center",

              gap: {
                lg: 0.4,
                xl: 0.9,
              },
            }}
          >
            {mainNavigation.map((item) => {
              const hasChildren = Boolean(item.children?.length);

              const isOpen = activeDropdown === item.labelKey;

              if (!hasChildren) {
                return (
                  <Button
                    key={item.labelKey}
                    component={RouterLink}
                    to={contractingPath(item.path ?? "")}
                    sx={{
                      px: {
                        lg: 1,
                        xl: 1.35,
                      },

                      minWidth: 0,

                      color: isScrolled
                      ? '#FFFFFF'
                      : '#082F4D',

                      fontSize: {
                        lg: '0.74rem',
                        xl: '0.78rem',
                      },

                      fontWeight: 600,

                      whiteSpace: "nowrap",

                      borderRadius: 0,

                      '&:hover': {
                        bgcolor: 'transparent',

                        color: isScrolled
                          ? '#B9DAF2'
                          : '#649ABD',
                      },
                    }}
                  >
                    {t.navigation[item.labelKey]}
                  </Button>
                );
              }

              return (
                <Box
                  key={item.labelKey}
                  onMouseEnter={() => setActiveDropdown(item.labelKey)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onBlur={(event) => {
                    const nextTarget = event.relatedTarget;

                    if (
                      nextTarget instanceof Node &&
                      event.currentTarget.contains(nextTarget)
                    ) {
                      return;
                    }

                    setActiveDropdown(null);
                  }}
                  sx={{
                    position: "relative",
                  }}
                >
                  {/* Parent trigger */}

                  <Button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    onFocus={() => setActiveDropdown(item.labelKey)}
                    onClick={() =>
                      setActiveDropdown((current) =>
                        current === item.labelKey ? null : item.labelKey
                      )
                    }
                    sx={{
                      px: {
                        lg: 1,
                        xl: 1.35,
                      },

                      minWidth: 0,

                      color: isOpen
                      ? isScrolled
                        ? '#B9DAF2'
                        : '#649ABD'
                      : isScrolled
                        ? '#FFFFFF'
                        : '#082F4D',

                      fontSize: {
                        lg: '0.74rem',
                        xl: '0.78rem',
                      },

                      fontWeight: 600,

                      whiteSpace: "nowrap",

                      borderRadius: 0,

                      '&:hover': {
                        bgcolor: 'transparent',

                        color: isScrolled
                          ? '#B9DAF2'
                          : '#649ABD',
                      },
                    }}
                  >
                    {t.navigation[item.labelKey]}

                    <Box
                      component="span"
                      sx={{
                        ml: 0.65,

                        fontSize: "0.55rem",

                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",

                        transition: "transform 180ms ease",
                      }}
                    >
                      ↓
                    </Box>
                  </Button>

                  {/* Dropdown */}

                  <Box
                    role="menu"
                    sx={{
                      position: "absolute",

                      top: "calc(100% + 14px)",

                      left: "50%",

                      width: 330,

                      p: 1,

                      bgcolor: "#FFFFFF",

                      border: "1px solid",

                      borderColor: "rgba(8,47,77,0.10)",

                      borderRadius: "16px",

                      boxShadow: "0 22px 60px rgba(8,47,77,0.14)",

                      opacity: isOpen ? 1 : 0,

                      visibility: isOpen ? "visible" : "hidden",

                      pointerEvents: isOpen ? "auto" : "none",

                      transform: isOpen
                        ? "translate(-50%, 0)"
                        : "translate(-50%, -8px)",

                      transition:
                        "opacity 180ms ease, transform 180ms ease, visibility 180ms ease",

                      "&::before": {
                        content: '""',

                        position: "absolute",

                        left: 0,
                        right: 0,

                        top: -15,

                        height: 15,
                      },
                    }}
                  >
                    {item.children?.map((child, index) => (
                      <Box
                        key={child.path}
                        component={RouterLink}
                        to={contractingPath(child.path)}
                        role="menuitem"
                        onClick={() => setActiveDropdown(null)}
                        sx={{
                          minHeight: 52,

                          px: 1.8,

                          display: "grid",

                          gridTemplateColumns: "34px 1fr auto",

                          gap: 1,

                          alignItems: "center",

                          color: "#082F4D",

                          textDecoration: "none",

                          borderRadius: "10px",

                          transition:
                            "background-color 160ms ease, color 160ms ease",

                          "&:hover": {
                            bgcolor: "#EEF4F6",

                            color: "#649ABD",
                          },

                          "&:focus-visible": {
                            outline: "2px solid #649ABD",

                            outlineOffset: -2,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            color: "#A1B4BF",

                            fontSize: "0.48rem",

                            fontWeight: 700,
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </Box>

                        <Box
                          sx={{
                            fontSize: "0.78rem",

                            fontWeight: 600,
                          }}
                        >
                          {t.navigation[child.labelKey]}
                        </Box>

                        <Box
                          sx={{
                            color: "#649ABD",

                            fontSize: "0.75rem",
                          }}
                        >
                          ↗
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Right side */}

          <Box
            sx={{
              justifySelf: "end",

              display: "flex",

              alignItems: "center",

              gap: {
                xs: 1.2,
                lg: 1.5,
              },
            }}
          >
            {/* Language UI */}

            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },

                alignItems: "center",

                gap: 0.6,

                px: 0.7,
                py: 0.45,

                border: "1px solid",

                borderColor: isScrolled
                ? 'rgba(255,255,255,0.22)'
                : 'rgba(8,47,77,0.14)',

                borderRadius: "999px",
              }}
            >
              <Box
                component="button"
                type="button"
                onClick={() => setLanguage("en")}
                sx={{
                  border: 0,

                  px: 0.8,
                  py: 0.45,

                  bgcolor: "transparent",

                  color:
                  language === 'en'
                    ? isScrolled
                      ? '#FFFFFF'
                      : '#082F4D'
                    : isScrolled
                      ? 'rgba(255,255,255,0.48)'
                      : 'rgba(8,47,77,0.38)',

                  fontFamily: "inherit",

                  fontSize: "0.6rem",

                  fontWeight: 700,

                  cursor: "pointer",

                  borderRadius: "999px",
                }}
              >
                EN
              </Box>

              <Box
                sx={{
                  width: "1px",

                  height: 14,

                  bgcolor: isScrolled
                  ? 'rgba(255,255,255,0.18)'
                  : 'rgba(8,47,77,0.14)',
                }}
              />

              <Box
                component="button"
                type="button"
                dir="rtl"
                onClick={() => setLanguage("ar")}
                sx={{
                  border: 0,

                  px: 0.8,
                  py: 0.45,

                  bgcolor: "transparent",

                  color:
                  language === 'ar'
                    ? isScrolled
                      ? '#B9DAF2'
                      : '#649ABD'
                    : isScrolled
                      ? 'rgba(255,255,255,0.48)'
                      : 'rgba(8,47,77,0.38)',

                  fontFamily: "inherit",

                  fontSize: "0.68rem",

                  fontWeight: 700,

                  cursor: "pointer",

                  borderRadius: "999px",
                }}
              >
                العربية
              </Box>
            </Box>

            {/* Mobile menu trigger */}

            <Box
              component="button"
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              sx={{
                appearance: "none",

                border: "1px solid",

                borderColor: isScrolled
                ? 'rgba(255,255,255,0.22)'
                : 'rgba(8,47,77,0.14)',

                bgcolor: "transparent",

                color: isScrolled
                ? '#FFFFFF'
                : '#082F4D',

                borderRadius: "999px",

                minHeight: 38,

                px: 1.5,

                display: {
                  xs: "inline-flex",
                  lg: "none",
                },

                alignItems: "center",

                gap: 0.9,

                fontFamily: "inherit",

                fontSize: "0.64rem",

                fontWeight: 700,

                cursor: "pointer",
              }}
            >
              {t.navigation.menu}

              <Box
                sx={{
                  width: 15,

                  display: "grid",

                  gap: "3px",
                }}
              >
                <Box
                  sx={{
                    height: "1px",

                    bgcolor: isScrolled
                    ? '#FFFFFF'
                    : '#082F4D',
                  }}
                />

                <Box
                  sx={{
                    width: "70%",

                    height: "1px",

                    justifySelf: "end",

                    bgcolor: isScrolled
                    ? '#FFFFFF'
                    : '#082F4D',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Mobile Drawer */}

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={closeMobileMenu}
        slotProps={{
          paper: {
            sx: {
              width: {
                xs: "100%",
                sm: 480,
              },

              bgcolor: "#FFFFFF",

              color: "#082F4D",

              backgroundImage: "none",
            },
          },
        }}
      >
        <Box
          sx={{
            minHeight: "100%",

            px: {
              xs: 3,
              sm: 4,
            },

            pt: 3,
            pb: 4,

            display: "flex",

            flexDirection: "column",
          }}
        >
          {/* Drawer Header */}

          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              justifyContent: "space-between",

              pb: 3,

              borderBottom: "1px solid",

              borderColor: "rgba(8,47,77,0.10)",
            }}
          >
            <Box>
              <Box
                sx={{
                  fontSize: "1.25rem",

                  fontWeight: 800,

                  letterSpacing: "-0.04em",
                }}
              >
                FBS
              </Box>

              <Box
                sx={{
                  mt: 0.3,

                  color: "#649ABD",

                  fontSize: "0.5rem",

                  fontWeight: 700,

                  letterSpacing: "0.14em",

                  textTransform: "uppercase",
                }}
              >
                Contracting
              </Box>
            </Box>

            <Box
              component="button"
              type="button"
              onClick={closeMobileMenu}
              sx={{
                appearance: "none",

                border: 0,

                bgcolor: "transparent",

                color: "#082F4D",

                p: 1,

                fontFamily: "inherit",

                fontSize: "0.65rem",

                fontWeight: 700,

                cursor: "pointer",
              }}
            >
              {t.navigation.close}
            </Box>
          </Box>

          {/* Drawer Navigation */}

          <Box
            component="nav"
            sx={{
              mt: 4,
            }}
          >
            {mainNavigation.map((item, index) => {
              const hasChildren = Boolean(item.children?.length);

              const isOpen = mobileGroup === item.labelKey;

              if (!hasChildren) {
                return (
                  <Box
                    key={item.labelKey}
                    component={RouterLink}
                    to={contractingPath(item.path ?? "")}
                    onClick={closeMobileMenu}
                    sx={{
                      minHeight: 64,

                      display: "grid",

                      gridTemplateColumns: "42px 1fr auto",

                      gap: 1,

                      alignItems: "center",

                      color: "#082F4D",

                      textDecoration: "none",

                      borderBottom: "1px solid",

                      borderColor: "rgba(8,47,77,0.10)",
                    }}
                  >
                    <Box
                      sx={{
                        color: "#649ABD",

                        fontSize: "0.52rem",

                        fontWeight: 700,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Box>

                    <Box
                      sx={{
                        fontSize: "1.15rem",

                        fontWeight: 600,
                      }}
                    >
                      {t.navigation[item.labelKey]}
                    </Box>

                    <Box
                      sx={{
                        color: "#649ABD",
                      }}
                    >
                      ↗
                    </Box>
                  </Box>
                );
              }

              return (
                <Box
                  key={item.labelKey}
                  sx={{
                    borderBottom: "1px solid",

                    borderColor: "rgba(8,47,77,0.10)",
                  }}
                >
                  <Box
                    component="button"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setMobileGroup((current) =>
                        current === item.labelKey ? null : item.labelKey
                      )
                    }
                    sx={{
                      appearance: "none",

                      width: "100%",

                      minHeight: 64,

                      border: 0,

                      bgcolor: "transparent",

                      color: "#082F4D",

                      p: 0,

                      display: "grid",

                      gridTemplateColumns: "42px 1fr auto",

                      gap: 1,

                      alignItems: "center",

                      textAlign: "left",

                      fontFamily: "inherit",

                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        color: "#649ABD",

                        fontSize: "0.52rem",

                        fontWeight: 700,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Box>

                    <Box
                      sx={{
                        fontSize: "1.15rem",

                        fontWeight: 600,
                      }}
                    >
                      {t.navigation[item.labelKey]}
                    </Box>

                    <Box
                      sx={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",

                        transition: "transform 180ms ease",

                        color: "#649ABD",
                      }}
                    >
                      ↓
                    </Box>
                  </Box>

                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <Box
                      sx={{
                        pb: 1.5,

                        pl: 5.2,
                      }}
                    >
                      {item.children?.map((child) => (
                        <Box
                          key={child.path}
                          component={RouterLink}
                          to={contractingPath(child.path)}
                          onClick={closeMobileMenu}
                          sx={{
                            minHeight: 46,

                            display: "flex",

                            alignItems: "center",

                            color: "rgba(8,47,77,0.72)",

                            textDecoration: "none",

                            fontSize: "0.8rem",

                            fontWeight: 600,

                            "&:hover": {
                              color: "#649ABD",
                            },
                          }}
                        >
                          {t.navigation[child.labelKey]}
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                </Box>
              );
            })}
          </Box>

          {/* Drawer language */}

          {/* Drawer language */}

          <Box
            sx={{
              mt: 'auto',
              pt: 5,

              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',

              gap: 3,

              borderTop: '1px solid',
              borderColor: 'rgba(8,47,77,0.10)',
            }}
          >
            <Box
              component="button"
              type="button"

              aria-pressed={language === 'en'}

              onClick={() =>
                setLanguage('en')
              }

              sx={{
                border: 0,

                bgcolor: 'transparent',

                color:
                  language === 'en'
                    ? '#082F4D'
                    : 'rgba(8,47,77,0.42)',

                p: 0,

                fontFamily: 'inherit',

                fontSize: '0.72rem',

                fontWeight: 700,

                cursor: 'pointer',
              }}
            >
              {t.language.english}
            </Box>

            <Box
              component="button"
              type="button"

              dir="rtl"

              aria-pressed={language === 'ar'}

              onClick={() =>
                setLanguage('ar')
              }

              sx={{
                border: 0,

                bgcolor: 'transparent',

                color:
                  language === 'ar'
                    ? '#649ABD'
                    : 'rgba(8,47,77,0.42)',

                p: 0,

                fontFamily: 'inherit',

                fontSize: '0.78rem',

                fontWeight: 700,

                cursor: 'pointer',
              }}
            >
              {t.language.arabic}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default ContractingNavbar;
