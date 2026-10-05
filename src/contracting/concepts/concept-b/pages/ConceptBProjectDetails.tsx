import {
  Box,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'

import {
  Link as RouterLink,
  useNavigate,
  useParams,
} from 'react-router-dom'

import { projects } from '../../../core/data/projects'
import { conceptBTheme } from '../../../themes/conceptBTheme'

function ConceptBProjectDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const projectIndex = projects.findIndex(
    (project) => project.slug === slug,
  )

  const project = projects[projectIndex]

  if (!project) {
    return (
      <ThemeProvider theme={conceptBTheme}>
        <CssBaseline />

        <Box
          component="main"
          sx={{
            minHeight: '100svh',

            bgcolor: '#082F4D',
            color: '#FFFFFF',

            display: 'grid',
            placeItems: 'center',

            px: 3,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 900,

              py: 8,

              borderTop: '1px solid',
              borderBottom: '1px solid',

              borderColor:
                'rgba(255,255,255,0.18)',
            }}
          >
            <Box
              sx={{
                mb: 2,

                color: '#B9DAF2',

                fontSize: '0.62rem',
                fontWeight: 700,

                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              404 / Project
            </Box>

            <Box
              component="h1"
              sx={{
                m: 0,

                mb: 4,

                fontSize: {
                  xs: '3.5rem',
                  md: '6rem',
                },

                fontWeight: 500,

                lineHeight: 0.95,

                letterSpacing: '-0.06em',
              }}
            >
              Project
              <br />
              not found.
            </Box>

            <Box
              component="button"
              type="button"
              onClick={() =>
                navigate(
                  '/contracting/concept-b',
                )
              }
              sx={{
                appearance: 'none',

                border: '1px solid',
                borderColor:
                  'rgba(255,255,255,0.4)',

                px: 3,
                py: 1.4,

                bgcolor: 'transparent',
                color: '#FFFFFF',

                fontFamily: 'inherit',

                fontSize: '0.72rem',
                fontWeight: 700,

                cursor: 'pointer',

                '&:hover': {
                  bgcolor: '#FFFFFF',
                  color: '#082F4D',
                },
              }}
            >
              Back to Concept B
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    )
  }

  const nextProject =
    projects[
      (projectIndex + 1) %
        projects.length
    ]

  return (
    <ThemeProvider theme={conceptBTheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',

          bgcolor: 'background.default',
          color: 'text.primary',

          overflowX: 'clip',
        }}
      >
        {/* =====================================
            PROJECT HEADER
        ====================================== */}

        <Box
          component="header"
          sx={{
            position: 'absolute',

            top: 0,
            left: 0,
            right: 0,

            zIndex: 20,

            color: '#FFFFFF',

            borderBottom: '1px solid',
            borderColor:
              'rgba(255,255,255,0.18)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 1700,
              mx: 'auto',

              minHeight: {
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

              gridTemplateColumns:
                '1fr auto',

              alignItems: 'center',
            }}
          >
            {/* Brand */}

            <Box
              component={RouterLink}
              to="/contracting/concept-b"
              sx={{
                width: 'fit-content',

                display: 'flex',
                alignItems: 'center',

                gap: 1.5,

                color: '#FFFFFF',
                textDecoration: 'none',

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
                    md: '1.35rem',
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
                  height: 26,
                  flexShrink: 0,

                  bgcolor:
                    'rgba(255,255,255,0.35)',
                }}
              />

              <Box
                sx={{
                  fontSize: '0.55rem',
                  fontWeight: 700,

                  lineHeight: 1.2,

                  letterSpacing:
                    '0.14em',

                  textTransform:
                    'uppercase',
                }}
              >
                Contracting
                <br />
                Division
              </Box>
            </Box>


            {/* Back */}

            <Box
              component={RouterLink}
              to="/contracting/concept-b"
              sx={{
                display: 'inline-flex',

                alignItems: 'center',

                gap: 1,

                color:
                  'rgba(255,255,255,0.82)',

                textDecoration: 'none',

                fontSize: '0.68rem',
                fontWeight: 700,

                letterSpacing:
                  '0.08em',

                transition:
                  'color 180ms ease',

                '& span': {
                  transition:
                    'transform 180ms ease',
                },

                '&:hover': {
                  color: '#FFFFFF',
                },

                '&:hover span': {
                  transform:
                    'translateX(-4px)',
                },

                '&:focus-visible': {
                  outline:
                    '2px solid #B9DAF2',

                  outlineOffset: 5,
                },
              }}
            >
              <Box component="span">
                ←
              </Box>

              Back to Projects
            </Box>
          </Box>
        </Box>


        {/* =====================================
            CINEMATIC HERO
        ====================================== */}

        <Box
          component="main"
          sx={{
            position: 'relative',

            minHeight: {
              xs: '88svh',
              md: '100svh',
            },

            bgcolor: '#082F4D',
            color: '#FFFFFF',

            overflow: 'hidden',
          }}
        >
          {project.coverImage && (
            <Box
              component="img"
              src={project.coverImage}
              alt={project.name}
              sx={{
                position: 'absolute',
                inset: 0,

                width: '100%',
                height: '100%',

                objectFit: 'cover',

                filter:
                  'saturate(0.88) contrast(1.03)',
              }}
            />
          )}


          {/* Overlay */}

          <Box
            sx={{
              position: 'absolute',
              inset: 0,

              background: `
                linear-gradient(
                  90deg,
                  rgba(8,47,77,0.56) 0%,
                  rgba(8,47,77,0.12) 65%
                ),
                linear-gradient(
                  180deg,
                  rgba(8,47,77,0.18) 10%,
                  rgba(8,47,77,0.04) 45%,
                  rgba(8,47,77,0.78) 100%
                )
              `,
            }}
          />


          {/* Hero content */}

          <Box
            sx={{
              position: 'relative',

              zIndex: 2,

              width: '100%',
              maxWidth: 1700,
              mx: 'auto',

              minHeight: {
                xs: '88svh',
                md: '100svh',
              },

              px: {
                xs: 2.5,
                sm: 4,
                md: 6,
                lg: 8,
              },

              pt: {
                xs: 16,
                md: 20,
              },

              pb: {
                xs: 4,
                md: 5,
              },

              display: 'flex',

              flexDirection: 'column',

              justifyContent:
                'space-between',
            }}
          >
            {/* Top label */}

            <Box
              sx={{
                color:
                  'rgba(255,255,255,0.68)',

                fontSize: '0.6rem',
                fontWeight: 700,

                letterSpacing: '0.15em',

                textTransform:
                  'uppercase',
              }}
            >
              Project /{' '}
              {String(
                projectIndex + 1,
              ).padStart(2, '0')}
            </Box>


            {/* Project title */}

            <Box
              sx={{
                mt: 'auto',

                mb: {
                  xs: 6,
                  md: 8,
                },

                maxWidth: 1100,
              }}
            >
              <Box
                sx={{
                  mb: 2,

                  display: 'flex',

                  alignItems: 'center',

                  gap: 1.5,

                  color: '#B9DAF2',

                  fontSize: '0.62rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.14em',

                  textTransform:
                    'uppercase',
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: '1px',

                    bgcolor:
                      '#B9DAF2',
                  }}
                />

                {project.city}
                {' — '}
                {project.region}
              </Box>


              <Box
                component="h1"
                sx={{
                  m: 0,

                  maxWidth: 1050,

                  fontSize: {
                    xs: '3.4rem',
                    sm: '5rem',
                    md: '6.8rem',
                    lg: '8rem',
                  },

                  fontWeight: 500,

                  lineHeight: {
                    xs: 0.98,
                    md: 0.92,
                  },

                  letterSpacing:
                    '-0.065em',

                  textWrap: 'balance',
                }}
              >
                {project.name}
              </Box>
            </Box>


            {/* Hero metadata */}

            <Box
              sx={{
                pt: 2.5,

                display: 'grid',

                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(4, auto)',
                },

                justifyContent: {
                  sm: 'start',
                },

                gap: {
                  xs: 3,
                  sm: 6,
                },

                borderTop: '1px solid',

                borderColor:
                  'rgba(255,255,255,0.22)',
              }}
            >
              <HeroMeta
                label="Location"
                value={project.city}
              />

              <HeroMeta
                label="Region"
                value={project.region}
              />

              <HeroMeta
                label="Sector"
                value={project.category}
              />

              <HeroMeta
                label="Status"
                value={
                  project.status ?? '—'
                }
              />
            </Box>
          </Box>
        </Box>


        {/* =====================================
            PROJECT STORY
        ====================================== */}

        <Box
          component="section"
          sx={{
            bgcolor: '#FFFFFF',

            borderBottom: '1px solid',
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

              py: {
                xs: 8,
                md: 12,
                lg: 14,
              },

              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                md: '220px minmax(0, 1fr)',
                lg: '220px minmax(0, 0.8fr) minmax(320px, 0.45fr)',
              },

              gap: {
                xs: 3,
                md: 6,
                lg: 8,
              },

              alignItems: 'start',
            }}
          >
            {/* Label */}

            <Box
              sx={{
                color: '#649ABD',

                fontSize: '0.6rem',
                fontWeight: 700,

                letterSpacing: '0.15em',

                textTransform:
                  'uppercase',
              }}
            >
              The Project
            </Box>


            {/* Story */}

            <Box>
              <Box
                component="h2"
                sx={{
                  m: 0,

                  mb: 4,

                  maxWidth: 720,

                  fontSize: {
                    xs: '2.7rem',
                    sm: '3.7rem',
                    md: '4.5rem',
                    lg: '5.2rem',
                  },

                  fontWeight: 500,

                  lineHeight: 1,

                  letterSpacing:
                    '-0.055em',
                }}
              >
                Designed around
                <br />
                long-term value.
              </Box>


              <Box
                sx={{
                  maxWidth: 650,

                  color: 'text.secondary',

                  fontSize: {
                    xs: '0.95rem',
                    md: '1.03rem',
                  },

                  lineHeight: 1.9,
                }}
              >
                {project.shortDescription ??
                  `${project.name} forms part of the FBS Contracting portfolio in Saudi Arabia.`}
              </Box>
            </Box>


            {/* Metadata panel */}

            <Box
              sx={{
                gridColumn: {
                  md: '2',
                  lg: 'auto',
                },

                mt: {
                  xs: 3,
                  lg: 0,
                },

                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <DetailRow
                label="Location"
                value={project.city}
              />

              <DetailRow
                label="Region"
                value={project.region}
              />

              <DetailRow
                label="Sector"
                value={project.category}
              />

              <DetailRow
                label="Status"
                value={
                  project.status ?? '—'
                }
              />
            </Box>
          </Box>
        </Box>


        {/* =====================================
            STATEMENT
        ====================================== */}

        <Box
          component="section"
          sx={{
            bgcolor: '#EEF4F6',

            borderBottom: '1px solid',
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

              py: {
                xs: 8,
                md: 12,
                lg: 14,
              },

              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                md: '220px 1fr',
              },

              gap: {
                xs: 3,
                md: 6,
              },
            }}
          >
            <Box
              sx={{
                color: '#649ABD',

                fontSize: '0.6rem',
                fontWeight: 700,

                letterSpacing:
                  '0.15em',

                textTransform:
                  'uppercase',
              }}
            >
              FBS Contracting
            </Box>


            <Box
              sx={{
                maxWidth: 1100,

                fontSize: {
                  xs: '2rem',
                  sm: '2.7rem',
                  md: '3.6rem',
                  lg: '4.3rem',
                },

                fontWeight: 500,

                lineHeight: 1.15,

                letterSpacing:
                  '-0.045em',
              }}
            >
              Every project is shaped by
              careful coordination, clear
              execution and a commitment to
              quality that lasts.
            </Box>
          </Box>
        </Box>


        {/* =====================================
            NEXT PROJECT
        ====================================== */}

        <Box
          component="section"
          sx={{
            bgcolor: '#082F4D',
          }}
        >
          <Box
            component={RouterLink}
            to={`/contracting/concept-b/projects/${nextProject.slug}`}
            sx={{
              position: 'relative',

              display: 'block',

              minHeight: {
                xs: 520,
                sm: 650,
                md: 760,
              },

              overflow: 'hidden',

              color: '#FFFFFF',
              textDecoration: 'none',

              '& .next-image': {
                transition:
                  'transform 1000ms cubic-bezier(.2,.7,.2,1)',
              },

              '&:hover .next-image': {
                transform:
                  'scale(1.025)',
              },

              '&:hover .next-arrow': {
                transform:
                  'translate(6px, -6px)',
              },

              '&:focus-visible': {
                outline:
                  '4px solid #649ABD',

                outlineOffset: -4,
              },
            }}
          >
            {nextProject.coverImage && (
              <Box
                className="next-image"
                component="img"
                src={nextProject.coverImage}
                alt={nextProject.name}
                loading="lazy"
                sx={{
                  position: 'absolute',
                  inset: 0,

                  width: '100%',
                  height: '100%',

                  objectFit: 'cover',

                  transform: 'scale(1)',

                  filter:
                    'saturate(0.86) contrast(1.04)',
                }}
              />
            )}


            <Box
              sx={{
                position: 'absolute',
                inset: 0,

                background: `
                  linear-gradient(
                    180deg,
                    rgba(8,47,77,0.12) 20%,
                    rgba(8,47,77,0.76) 100%
                  )
                `,
              }}
            />


            <Box
              sx={{
                position: 'relative',

                zIndex: 2,

                width: '100%',
                maxWidth: 1700,
                mx: 'auto',

                minHeight: {
                  xs: 520,
                  sm: 650,
                  md: 760,
                },

                px: {
                  xs: 2.5,
                  sm: 4,
                  md: 6,
                  lg: 8,
                },

                py: {
                  xs: 4,
                  md: 5,
                },

                display: 'flex',

                flexDirection: 'column',

                justifyContent:
                  'space-between',
              }}
            >
              <Box
                sx={{
                  color:
                    'rgba(255,255,255,0.68)',

                  fontSize: '0.6rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.15em',

                  textTransform:
                    'uppercase',
                }}
              >
                Next Project /{' '}
                {String(
                  (projectIndex + 1) %
                    projects.length +
                    1,
                ).padStart(2, '0')}
              </Box>


              <Box
                sx={{
                  display: 'grid',

                  gridTemplateColumns: {
                    xs: '1fr',
                    md: '1fr auto',
                  },

                  gap: 4,

                  alignItems: 'end',
                }}
              >
                <Box>
                  <Box
                    sx={{
                      mb: 1.5,

                      color: '#B9DAF2',

                      fontSize: '0.6rem',
                      fontWeight: 700,

                      letterSpacing:
                        '0.14em',

                      textTransform:
                        'uppercase',
                    }}
                  >
                    {nextProject.city}
                    {' — '}
                    {nextProject.region}
                  </Box>


                  <Box
                    sx={{
                      maxWidth: 1000,

                      fontSize: {
                        xs: '3rem',
                        sm: '4.5rem',
                        md: '6rem',
                        lg: '7rem',
                      },

                      fontWeight: 500,

                      lineHeight: 0.94,

                      letterSpacing:
                        '-0.06em',
                    }}
                  >
                    {nextProject.name}
                  </Box>
                </Box>


                <Box
                  sx={{
                    display: 'flex',

                    alignItems: 'center',

                    gap: 1.5,

                    pb: {
                      md: 1,
                    },

                    fontSize: '0.72rem',
                    fontWeight: 700,

                    letterSpacing:
                      '0.08em',
                  }}
                >
                  Explore Project

                  <Box
                    className="next-arrow"
                    component="span"
                    sx={{
                      fontSize: '1.2rem',

                      transition:
                        'transform 180ms ease',
                    }}
                  >
                    ↗
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>


        {/* =====================================
            MINIMAL FOOTER
        ====================================== */}

        <Box
          component="footer"
          sx={{
            bgcolor: '#FFFFFF',

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

              py: {
                xs: 4,
                md: 5,
              },

              display: 'flex',

              flexDirection: {
                xs: 'column',
                sm: 'row',
              },

              justifyContent:
                'space-between',

              gap: 2,

              color: 'text.secondary',

              fontSize: '0.58rem',

              letterSpacing:
                '0.08em',

              textTransform:
                'uppercase',
            }}
          >
            <Box>
              © {new Date().getFullYear()}{' '}
              Faisal Bin Saedan
            </Box>

            <Box>
              Contracting / Saudi Arabia
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}


function HeroMeta({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Box>
      <Box
        sx={{
          mb: 0.45,

          color:
            'rgba(255,255,255,0.52)',

          fontSize: '0.5rem',
          fontWeight: 700,

          letterSpacing: '0.12em',

          textTransform: 'uppercase',
        }}
      >
        {label}
      </Box>

      <Box
        sx={{
          color: '#FFFFFF',

          fontSize: {
            xs: '0.76rem',
            md: '0.82rem',
          },

          fontWeight: 600,
        }}
      >
        {value}
      </Box>
    </Box>
  )
}


function DetailRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Box
      sx={{
        py: 2.2,

        display: 'flex',

        justifyContent:
          'space-between',

        gap: 3,

        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          color: 'text.secondary',

          fontSize: '0.55rem',
          fontWeight: 700,

          letterSpacing: '0.12em',

          textTransform: 'uppercase',
        }}
      >
        {label}
      </Box>

      <Box
        sx={{
          fontSize: '0.8rem',
          fontWeight: 600,

          textAlign: 'right',
        }}
      >
        {value}
      </Box>
    </Box>
  )
}

export default ConceptBProjectDetails