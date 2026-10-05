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
import { conceptCTheme } from '../../../themes/conceptCTheme'

function ConceptCProjectDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const projectIndex = projects.findIndex(
    (project) => project.slug === slug,
  )

  const project = projects[projectIndex]

  if (!project) {
    return (
      <ThemeProvider theme={conceptCTheme}>
        <CssBaseline />

        <Box
          sx={{
            minHeight: '100svh',

            bgcolor: '#061F33',
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
                'rgba(185,218,242,0.16)',
            }}
          >
            <Box
              sx={{
                mb: 2,

                color: '#649ABD',

                fontSize: '0.56rem',
                fontWeight: 700,

                letterSpacing: '0.15em',

                textTransform: 'uppercase',
              }}
            >
              Project / Error 404
            </Box>

            <Box
              component="h1"
              sx={{
                m: 0,

                mb: 4,

                fontSize: {
                  xs: '3.3rem',
                  md: '6rem',
                },

                fontWeight: 500,

                lineHeight: 0.94,

                letterSpacing: '-0.06em',
              }}
            >
              Project node
              <br />
              not found.
            </Box>

            <Box
              component="button"
              type="button"

              onClick={() =>
                navigate(
                  '/contracting/concept-c',
                )
              }

              sx={{
                appearance: 'none',

                border:
                  '1px solid rgba(185,218,242,0.35)',

                px: 3,
                py: 1.4,

                bgcolor: 'transparent',
                color: '#FFFFFF',

                fontFamily: 'inherit',

                fontSize: '0.72rem',
                fontWeight: 700,

                cursor: 'pointer',

                '&:hover': {
                  bgcolor: '#B9DAF2',
                  color: '#082F4D',
                },
              }}
            >
              Back to Concept C
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
    <ThemeProvider theme={conceptCTheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',

          bgcolor: '#061F33',
          color: '#FFFFFF',

          overflowX: 'clip',
        }}
      >
        {/* =====================================
            PREMIUM HEADER
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
              'rgba(255,255,255,0.14)',
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

              display: 'flex',

              justifyContent:
                'space-between',

              alignItems: 'center',

              gap: 3,
            }}
          >
            <Box
              component={RouterLink}
              to="/contracting/concept-c"
              sx={{
                display: 'flex',
                alignItems: 'center',

                gap: 1.4,

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
                  fontSize: '1.25rem',
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


            <Box
              component={RouterLink}
              to="/contracting/concept-c"
              sx={{
                display: 'inline-flex',

                alignItems: 'center',

                gap: 1,

                color:
                  'rgba(255,255,255,0.78)',

                textDecoration: 'none',

                fontSize: '0.66rem',
                fontWeight: 600,

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
              }}
            >
              <Box component="span">
                ←
              </Box>

              Projects
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
              xs: '92svh',
              md: '100svh',
            },

            overflow: 'hidden',

            bgcolor: '#082F4D',
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
                  'saturate(0.72) contrast(1.08)',
              }}
            />
          )}


          <Box
            sx={{
              position: 'absolute',
              inset: 0,

              background: `
                linear-gradient(
                  90deg,
                  rgba(8,47,77,0.78) 0%,
                  rgba(8,47,77,0.24) 56%,
                  rgba(8,47,77,0.15) 100%
                ),
                linear-gradient(
                  180deg,
                  rgba(8,47,77,0.24) 0%,
                  rgba(8,47,77,0.04) 42%,
                  rgba(8,47,77,0.78) 100%
                )
              `,
            }}
          />


          {/* subtle system grid */}

          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,

              opacity: 0.08,

              backgroundImage: `
                linear-gradient(
                  rgba(185,218,242,0.28) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(185,218,242,0.28) 1px,
                  transparent 1px
                )
              `,

              backgroundSize:
                '72px 72px',
            }}
          />


          <Box
            sx={{
              position: 'relative',

              zIndex: 2,

              width: '100%',
              maxWidth: 1740,
              mx: 'auto',

              minHeight: {
                xs: '92svh',
                md: '100svh',
              },

              px: {
                xs: 2.5,
                sm: 4,
                md: 6,
                lg: 8,
              },

              pt: {
                xs: 15,
                md: 19,
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
            <Box
              sx={{
                color:
                  'rgba(255,255,255,0.58)',

                fontSize: '0.54rem',
                fontWeight: 700,

                letterSpacing:
                  '0.15em',

                textTransform:
                  'uppercase',
              }}
            >
              Project Node /{' '}
              {String(
                projectIndex + 1,
              ).padStart(2, '0')}
            </Box>


            <Box
              sx={{
                mt: 'auto',

                mb: {
                  xs: 5,
                  md: 7,
                },

                maxWidth: 1050,
              }}
            >
              <Box
                sx={{
                  mb: 1.8,

                  color: '#B9DAF2',

                  fontSize: '0.6rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.14em',

                  textTransform:
                    'uppercase',
                }}
              >
                {project.city}
                {' / '}
                {project.region}
              </Box>

              <Box
                component="h1"
                sx={{
                  m: 0,

                  fontSize: {
                    xs: '3.3rem',
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
          </Box>


          {/* =================================
              FLOATING PROJECT DATA CARD
          ================================== */}

          <Box
            sx={{
              position: 'absolute',

              zIndex: 5,

              right: {
                xs: 20,
                sm: 40,
                md: 60,
                lg: '7%',
              },

              bottom: {
                xs: 22,
                md: 45,
              },

              left: {
                xs: 20,
                sm: 'auto',
              },

              width: {
                sm: 390,
                md: 430,
              },

              bgcolor: '#EEF4F6',
              color: '#082F4D',

              boxShadow:
                '0 26px 70px rgba(3,20,32,0.26)',
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2,

                display: 'flex',

                justifyContent:
                  'space-between',

                borderBottom: '1px solid',

                borderColor:
                  'rgba(8,47,77,0.12)',
              }}
            >
              <Box
                sx={{
                  color: '#649ABD',

                  fontSize: '0.5rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.14em',

                  textTransform:
                    'uppercase',
                }}
              >
                Project Data
              </Box>

              <Box
                sx={{
                  color:
                    'rgba(8,47,77,0.38)',

                  fontSize: '0.48rem',
                  fontWeight: 700,
                }}
              >
                NODE{' '}
                {String(
                  projectIndex + 1,
                ).padStart(2, '0')}
              </Box>
            </Box>


            <Box
              sx={{
                px: 3,
                py: 2.5,
              }}
            >
              <ProjectData
                label="Location"
                value={project.city}
              />

              <ProjectData
                label="Region"
                value={project.region}
              />

              <ProjectData
                label="Sector"
                value={project.category}
              />

              <ProjectData
                label="Status"
                value={
                  project.status ?? '—'
                }
              />
            </Box>
          </Box>
        </Box>


        {/* =====================================
            PROJECT OVERVIEW
        ====================================== */}

        <Box
          component="section"
          sx={{
            bgcolor: '#061F33',

            borderBottom: '1px solid',

            borderColor:
              'rgba(185,218,242,0.14)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 1740,
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

                fontSize: '0.54rem',
                fontWeight: 700,

                letterSpacing:
                  '0.15em',

                textTransform:
                  'uppercase',
              }}
            >
              Project Overview
            </Box>


            <Box>
              <Box
                component="h2"
                sx={{
                  m: 0,

                  mb: 4,

                  maxWidth: 900,

                  fontSize: {
                    xs: '2.7rem',
                    sm: '3.8rem',
                    md: '4.8rem',
                    lg: '5.5rem',
                  },

                  fontWeight: 500,

                  lineHeight: 0.98,

                  letterSpacing:
                    '-0.055em',
                }}
              >
                Delivery shaped
                <br />

                <Box
                  component="span"
                  sx={{
                    color: '#B9DAF2',
                  }}
                >
                  around long-term value.
                </Box>
              </Box>


              <Box
                sx={{
                  maxWidth: 720,

                  color:
                    'rgba(255,255,255,0.52)',

                  fontSize: {
                    xs: '0.94rem',
                    md: '1.02rem',
                  },

                  lineHeight: 1.9,
                }}
              >
                {project.shortDescription ??
                  `${project.name} forms part of the FBS Contracting portfolio in Saudi Arabia.`}
              </Box>
            </Box>
          </Box>
        </Box>


        {/* =====================================
            DELIVERY SYSTEM
        ====================================== */}

        <Box
          component="section"
          sx={{
            bgcolor: '#082F4D',

            borderBottom: '1px solid',

            borderColor:
              'rgba(185,218,242,0.14)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 1740,
              mx: 'auto',

              px: {
                xs: 2.5,
                sm: 4,
                md: 6,
                lg: 8,
              },

              py: {
                xs: 8,
                md: 11,
              },
            }}
          >
            <Box
              sx={{
                mb: 5,

                display: 'flex',

                justifyContent:
                  'space-between',

                gap: 3,

                color: '#649ABD',

                fontSize: '0.52rem',
                fontWeight: 700,

                letterSpacing:
                  '0.14em',

                textTransform:
                  'uppercase',
              }}
            >
              <Box>
                Delivery System
              </Box>

              <Box>
                Project /{' '}
                {String(
                  projectIndex + 1,
                ).padStart(2, '0')}
              </Box>
            </Box>


            <Box
              sx={{
                display: 'grid',

                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },

                borderTop: '1px solid',
                borderLeft: '1px solid',

                borderColor:
                  'rgba(185,218,242,0.14)',
              }}
            >
              <SystemTile
                index="01"
                title="Planning"
                text="Project requirements aligned before execution."
              />

              <SystemTile
                index="02"
                title="Coordination"
                text="Delivery stages managed through a connected process."
              />

              <SystemTile
                index="03"
                title="Execution"
                text="Construction delivered with focus on quality and control."
              />

              <SystemTile
                index="04"
                title="Continuity"
                text="A long-term view of project performance and value."
              />
            </Box>
          </Box>
        </Box>


        {/* =====================================
            NEXT PROJECT
        ====================================== */}

        <Box
          component={RouterLink}

          to={`/contracting/concept-c/projects/${nextProject.slug}`}

          sx={{
            position: 'relative',

            display: 'block',

            minHeight: {
              xs: 560,
              sm: 680,
              md: 780,
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

                filter:
                  'saturate(0.70) contrast(1.08)',
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
                  rgba(8,47,77,0.86) 100%
                )
              `,
            }}
          />


          <Box
            sx={{
              position: 'relative',

              zIndex: 2,

              width: '100%',
              maxWidth: 1740,
              mx: 'auto',

              minHeight: {
                xs: 560,
                sm: 680,
                md: 780,
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
                  'rgba(255,255,255,0.58)',

                fontSize: '0.54rem',
                fontWeight: 700,

                letterSpacing:
                  '0.14em',

                textTransform:
                  'uppercase',
              }}
            >
              Next Project Node
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
                    mb: 1,

                    color: '#B9DAF2',

                    fontSize: '0.56rem',
                    fontWeight: 700,

                    letterSpacing:
                      '0.14em',

                    textTransform:
                      'uppercase',
                  }}
                >
                  {nextProject.city}
                  {' / '}
                  {nextProject.region}
                </Box>

                <Box
                  sx={{
                    fontSize: {
                      xs: '3rem',
                      sm: '4.4rem',
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

                  gap: 1,

                  fontSize: '0.7rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.08em',
                }}
              >
                Open Project

                <Box>
                  ↗
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>


        {/* Footer */}

        <Box
          component="footer"
          sx={{
            bgcolor: '#EEF4F6',
            color: '#082F4D',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 1740,
              mx: 'auto',

              px: {
                xs: 2.5,
                sm: 4,
                md: 6,
                lg: 8,
              },

              py: 4,

              display: 'flex',

              flexDirection: {
                xs: 'column',
                sm: 'row',
              },

              justifyContent:
                'space-between',

              gap: 2,

              color:
                'rgba(8,47,77,0.48)',

              fontSize: '0.56rem',
              fontWeight: 700,

              letterSpacing:
                '0.09em',

              textTransform:
                'uppercase',
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
    </ThemeProvider>
  )
}


function ProjectData({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Box
      sx={{
        py: 1.5,

        display: 'flex',

        justifyContent:
          'space-between',

        gap: 3,

        borderBottom: '1px solid',

        borderColor:
          'rgba(8,47,77,0.10)',

        '&:last-of-type': {
          borderBottom: 0,
        },
      }}
    >
      <Box
        sx={{
          color:
            'rgba(8,47,77,0.42)',

          fontSize: '0.48rem',
          fontWeight: 700,

          letterSpacing:
            '0.12em',

          textTransform:
            'uppercase',
        }}
      >
        {label}
      </Box>

      <Box
        sx={{
          fontSize: '0.76rem',
          fontWeight: 700,

          textAlign: 'right',
        }}
      >
        {value}
      </Box>
    </Box>
  )
}


function SystemTile({
  index,
  title,
  text,
}: {
  index: string
  title: string
  text: string
}) {
  return (
    <Box
      sx={{
        minHeight: 260,

        p: {
          xs: 3,
          md: 3.5,
        },

        borderRight: '1px solid',
        borderBottom: '1px solid',

        borderColor:
          'rgba(185,218,242,0.14)',

        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          color: '#649ABD',

          fontSize: '0.5rem',
          fontWeight: 700,
        }}
      >
        {index}
      </Box>

      <Box
        sx={{
          mt: 'auto',
        }}
      >
        <Box
          sx={{
            mb: 1.3,

            fontSize: '1.35rem',
            fontWeight: 600,

            letterSpacing:
              '-0.035em',
          }}
        >
          {title}
        </Box>

        <Box
          sx={{
            maxWidth: 280,

            color:
              'rgba(255,255,255,0.44)',

            fontSize: '0.74rem',

            lineHeight: 1.7,
          }}
        >
          {text}
        </Box>
      </Box>
    </Box>
  )
}

export default ConceptCProjectDetails