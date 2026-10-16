import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { Box, Button, Collapse, Drawer, type SlideProps, useMediaQuery } from "@mui/material";

import { Link as RouterLink, useLocation } from "react-router-dom";

import { mainNavigation, type NavigationKey } from "../../data/navigation";

import { useTranslation } from "../../i18n/useTranslation";

import { contractingPath } from "../../config/site";

import { useLanguage } from "../../i18n/useLanguage";

// Drawer uses Slide by default, while its slot type exposes only TransitionProps.
declare module '@mui/material/Drawer' {
  interface DrawerTransitionSlotPropsOverrides {
    direction?: SlideProps['direction']
  }
}

function ContractingNavbar() {
  const t = useTranslation();
  const { pathname } = useLocation();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const desktopTriggers = useRef<Partial<Record<NavigationKey, HTMLButtonElement | null>>>({});
  const mobileTriggers = useRef<Partial<Record<NavigationKey, HTMLButtonElement | null>>>({});
  const currentPage = (path: string) =>
    pathname.replace(/\/$/, '') === contractingPath(path).replace(/\/$/, '')
      ? 'page' as const
      : undefined;

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

  const { language, direction, setLanguage } = useLanguage();

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
          if (event.key === "Escape" && activeDropdown) {
            event.preventDefault();
            setActiveDropdown(null);
            desktopTriggers.current[activeDropdown]?.focus();
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
            'border-color 260ms ease, box-shadow 260ms ease, backdrop-filter 260ms ease',
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
            aria-label={t.navigation.mainNavigationLabel}
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

              if (item.path === 'contact') {
                return null
              }
              const hasChildren = Boolean(item.children?.length);

              const isOpen = activeDropdown === item.labelKey;

              if (!hasChildren) {
                return (
                  <Button
                    key={item.labelKey}
                    component={RouterLink}
                    to={contractingPath(item.path ?? "")}
                    aria-current={currentPage(item.path ?? "")}
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
                          : 'text.secondary',
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
                    ref={(element) => { desktopTriggers.current[item.labelKey] = element; }}
                    aria-controls={`contracting-desktop-${item.labelKey}`}
                    aria-expanded={isOpen}
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
                        : 'text.secondary'
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
                          : 'text.secondary',
                      },
                    }}
                  >
                    {t.navigation[item.labelKey]}

                    <Box aria-hidden="true"
                      component="span"
                      sx={{
                        marginInlineStart: 0.65,

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
                    id={`contracting-desktop-${item.labelKey}`}
                    inert={!isOpen}
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
                        aria-current={currentPage(child.path)}
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

                            color: 'text.secondary',
                          },

                          "&:focus-visible": {
                            outline: "2px solid #649ABD",

                            outlineOffset: -2,
                          },
                        }}
                      >
                        <Box aria-hidden="true"
                          sx={{
                            color: 'text.secondary',

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

                        <Box aria-hidden="true"
                          sx={{
                            color: 'text.secondary',

                            fontSize: "0.75rem",
                          }}
                        >
                          {direction === 'rtl' ? '↖' : '↗'}
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

            {/* Get in Touch CTA */}
            <Button
              component={RouterLink}
              to={contractingPath('contact')}
              aria-current={currentPage('contact')}
              endIcon={
                <Box
                  component="span"
                  aria-hidden="true"
                  sx={{
                    display: 'inline-flex',
                    fontSize: '1rem',
                    transition: 'transform 220ms ease',
                  }}
                >
                  {direction === 'rtl' ? '↖' : '↗'}
                </Box>
              }
              sx={{
                display: { xs: 'none', lg: 'inline-flex' },
                flexShrink: 0,
                alignItems: 'center',
                gap: 0.5,
                minHeight: 42,
                px: 2.2,
                borderRadius: '9px',
                bgcolor: isScrolled ? '#FFFFFF' : '#082F4D',
                color: '#082F4D',
                fontSize: '0.76rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                boxShadow: isScrolled
                  ? 'none'
                  : '0 6px 20px rgba(8,47,77,0.14)',

                '& .MuiButton-endIcon': {
                  marginInlineStart: 0.5,
                  marginInlineEnd: 0,
                },

                '&:hover': {
                  bgcolor: '#B9DAF2',
                  color: '#082F4D',
                  boxShadow: '0 8px 24px rgba(8,47,77,0.16)',

                  '& .MuiButton-endIcon > span': {
                    transform: 'translate(2px, -2px)',
                  },
                },

                '&:focus-visible': {
                  outline: '2px solid #649ABD',
                  outlineOffset: 3,
                },

                '@media (prefers-reduced-motion: reduce)': {
                  '& .MuiButton-endIcon > span': {
                    transition: 'none',
                  },
                },

                ...(!isScrolled && {
                  color: '#FFFFFF',
                }),
              }}
            >
              {language === 'en' ? 'Get in Touch' : 'تواصل معنا'}
            </Button>
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
                aria-pressed={language === "en"}
                aria-label={t.language.english}
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
                      ? 'rgba(255,255,255,0.8)'
                      : 'rgba(8,47,77,0.72)',

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
                aria-pressed={language === "ar"}
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
                      : 'text.secondary'
                    : isScrolled
                      ? 'rgba(255,255,255,0.8)'
                      : 'rgba(8,47,77,0.72)',

                  fontFamily: "inherit",

                  fontSize: "0.68rem",

                  fontWeight: 700,

                  cursor: "pointer",

                  borderRadius: "999px",
                }}
              >
                {t.language.arabic}
              </Box>
            </Box>

            {/* Mobile menu trigger */}

            <Box
              component="button"
              type="button"
              aria-label={t.navigation.openMenuLabel}
              aria-expanded={mobileOpen}
              aria-controls="contracting-mobile-navigation"
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
        data-contracting-portal
        transitionDuration={reduceMotion ? 0 : undefined}
        ModalProps={{ keepMounted: true }}
        anchor={direction === 'rtl' ? 'left' : 'right'}
        dir={direction}
        lang={language}
        open={mobileOpen}
        onClose={closeMobileMenu}
        slotProps={{
          // Without a CSS RTL plugin, keep Slide aligned with the physical anchor.
          transition: { direction: direction === 'rtl' ? 'right' : 'left' },
          paper: {
            id: "contracting-mobile-navigation",
            role: "dialog",
            "aria-modal": true,
            "aria-label": t.navigation.mainNavigationLabel,
            dir: direction,
            lang: language,
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
                {t.navigation.logo_t1}
              </Box>

              <Box
                sx={{
                  mt: 0.3,

                  color: 'text.secondary',

                  fontSize: "0.5rem",

                  fontWeight: 700,

                  letterSpacing: "0.14em",

                  textTransform: "uppercase",
                }}
              >
                {t.navigation.logo_t2}
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
            onKeyDown={(event) => {
              if (event.key === 'Escape' && mobileGroup) {
                event.preventDefault();
                event.stopPropagation();
                setMobileGroup(null);
                mobileTriggers.current[mobileGroup]?.focus();
              }
            }}
            aria-label={t.navigation.mainNavigationLabel}
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
                    aria-current={currentPage(item.path ?? "")}
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
                    <Box aria-hidden="true"
                      sx={{
                        color: 'text.secondary',

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

                    <Box aria-hidden="true"
                      sx={{
                        color: 'text.secondary',
                      }}
                    >
                      {direction === 'rtl' ? '↖' : '↗'}
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
                    ref={(element: HTMLButtonElement | null) => { mobileTriggers.current[item.labelKey] = element; }}
                    aria-controls={`contracting-mobile-${item.labelKey}`}
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

                      textAlign: "start",

                      fontFamily: "inherit",

                      cursor: "pointer",
                    }}
                  >
                    <Box aria-hidden="true"
                      sx={{
                        color: 'text.secondary',

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

                    <Box aria-hidden="true"
                      sx={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",

                        transition: "transform 180ms ease",

                        color: 'text.secondary',
                      }}
                    >
                      ↓
                    </Box>
                  </Box>

                  <Collapse in={isOpen} timeout={reduceMotion ? 0 : "auto"} inert={!isOpen}>
                    <Box
                      id={`contracting-mobile-${item.labelKey}`}
                      sx={{
                        pb: 1.5,

                        paddingInlineStart: 5.2,
                      }}
                    >
                      {item.children?.map((child) => (
                        <Box
                          key={child.path}
                          component={RouterLink}
                          to={contractingPath(child.path)}
                          aria-current={currentPage(child.path)}
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
                              color: 'text.secondary',
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
                    : 'rgba(8,47,77,0.72)',

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
                    ? 'text.secondary'
                    : 'rgba(8,47,77,0.72)',

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
