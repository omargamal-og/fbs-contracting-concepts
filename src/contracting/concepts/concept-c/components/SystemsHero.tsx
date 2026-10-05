import {
  useEffect,
  useState,
} from 'react'

import { Box } from '@mui/material'

import { projects } from '../../../core/data/projects'

function SystemsHero() {
  const [activeIndex, setActiveIndex] =
    useState(0)

  const featuredProjects =
    projects.slice(0, 4)

  useEffect(() => {
    const reduceMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

    if (
      reduceMotion ||
      featuredProjects.length <= 1
    ) {
      return
    }

    const timer = window.setInterval(
      () => {
        setActiveIndex(
          (current) =>
            (current + 1) %
            featuredProjects.length,
        )
      },
      6000,
    )

    return () =>
      window.clearInterval(timer)
  }, [featuredProjects.length])

  const activeProject =
    featuredProjects[activeIndex]

  if (!activeProject) {
    return null
  }

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',

        minHeight: '100svh',

        bgcolor: '#082F4D',

        color: '#FFFFFF',

        overflow: 'hidden',
      }}
    >
      {/* Background project imagery */}

      {featuredProjects.map(
        (project, index) => (
          <Box
            key={project.id}

            component="img"

            src={project.coverImage}
            alt=""

            aria-hidden="true"

            sx={{
              position: 'absolute',
              inset: 0,

              width: '100%',
              height: '100%',

              objectFit: 'cover',

              opacity:
                index === activeIndex
                  ? 0.33
                  : 0,

              filter:
                'grayscale(0.18) saturate(0.6) contrast(1.08)',

              transition:
                'opacity 900ms ease',

              pointerEvents: 'none',
            }}
          />
        ),
      )}


      {/* Brand-color overlays */}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,

          background: `
            linear-gradient(
              90deg,
              rgba(8,47,77,0.98) 0%,
              rgba(8,47,77,0.90) 38%,
              rgba(8,47,77,0.54) 68%,
              rgba(8,47,77,0.82) 100%
            ),
            linear-gradient(
              180deg,
              rgba(8,47,77,0.42) 0%,
              rgba(8,47,77,0.14) 55%,
              rgba(8,47,77,0.94) 100%
            )
          `,
        }}
      />


      {/* Technical grid */}

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,

          opacity: 0.12,

          backgroundImage: `
            linear-gradient(
              rgba(185,218,242,0.32) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(185,218,242,0.32) 1px,
              transparent 1px
            )
          `,

          backgroundSize:
            '72px 72px',

          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)',
        }}
      />


      {/* Moving scan line */}

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',

          left: 0,
          right: 0,

          height: '1px',

          bgcolor:
            'rgba(185,218,242,0.45)',

          boxShadow:
            '0 0 18px rgba(185,218,242,0.30)',

          animation:
            'scanLine 8s linear infinite',

          '@keyframes scanLine': {
            from: {
              top: '10%',
            },

            to: {
              top: '95%',
            },
          },

          '@media (prefers-reduced-motion: reduce)': {
            display: 'none',
          },
        }}
      />


      <Box
        sx={{
          position: 'relative',

          zIndex: 2,

          width: '100%',
          maxWidth: 1740,
          mx: 'auto',

          minHeight: '100svh',

          px: {
            xs: 2.5,
            sm: 4,
            md: 6,
            lg: 8,
          },

          pt: {
            xs: 14,
            md: 17,
          },

          pb: {
            xs: 3,
            md: 4,
          },

          display: 'grid',

          gridTemplateRows:
            '1fr auto',
        }}
      >
        {/* Main hero */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(0, 1.15fr) minmax(340px, 0.55fr)',
            },

            gap: {
              xs: 5,
              lg: 8,
            },

            alignItems: 'center',
          }}
        >
          {/* Left */}

          <Box
            sx={{
              maxWidth: 980,
            }}
          >
            <Box
              sx={{
                mb: 2.5,

                display: 'flex',
                alignItems: 'center',

                gap: 1.5,

                color: '#B9DAF2',

                fontSize: '0.6rem',
                fontWeight: 700,

                letterSpacing:
                  '0.16em',

                textTransform:
                  'uppercase',
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,

                  borderRadius: '50%',

                  bgcolor: '#B9DAF2',

                  boxShadow:
                    '0 0 18px rgba(185,218,242,0.9)',

                  animation:
                    'pulseNode 1.8s ease-in-out infinite',

                  '@keyframes pulseNode': {
                    '0%, 100%': {
                      opacity: 0.45,
                    },

                    '50%': {
                      opacity: 1,
                    },
                  },

                  '@media (prefers-reduced-motion: reduce)': {
                    animation: 'none',
                  },
                }}
              />

              Contracting / Delivery System
            </Box>


            <Box
              component="h1"
              sx={{
                m: 0,

                maxWidth: 980,

                fontSize: {
                  xs: '3.6rem',
                  sm: '5rem',
                  md: '6.2rem',
                  lg: '6.8rem',
                },

                fontWeight: 500,

                lineHeight: {
                  xs: 0.98,
                  md: 0.92,
                },

                letterSpacing:
                  '-0.06em',
              }}
            >
              Building what moves
              <br />

              <Box
                component="span"
                sx={{
                  color: '#B9DAF2',
                }}
              >
                Saudi Arabia forward.
              </Box>

              <br />
            </Box>


            <Box
              sx={{
                mt: 3.5,

                maxWidth: 520,

                color:
                  'rgba(255,255,255,0.66)',

                fontSize: {
                  xs: '0.9rem',
                  md: '1rem',
                },

                lineHeight: 1.8,
              }}
            >
              A connected approach to
              construction, project delivery
              and regional execution across
              Saudi Arabia.
            </Box>
          </Box>


          {/* Right telemetry */}

          <Box
            sx={{
              alignSelf: {
                lg: 'stretch',
              },

              display: {
                xs: 'none',
                md: 'grid',
              },

              gridTemplateRows:
                'auto 1fr auto',

              border: '1px solid',

              borderColor:
                'rgba(185,218,242,0.18)',

              bgcolor:
                'rgba(8,47,77,0.32)',

              backdropFilter:
                'blur(12px)',
            }}
          >
            <Box
              sx={{
                p: 2.5,

                display: 'flex',

                justifyContent:
                  'space-between',

                borderBottom:
                  '1px solid',

                borderColor:
                  'rgba(185,218,242,0.14)',

                color: '#B9DAF2',

                fontSize: '0.52rem',
                fontWeight: 700,

                letterSpacing:
                  '0.14em',

                textTransform:
                  'uppercase',
              }}
            >
              <Box>
                Project Network
              </Box>

              <Box>
                Live / 01
              </Box>
            </Box>


            {/* Network visual */}

            <Box
              sx={{
                position: 'relative',

                minHeight: 330,

                overflow: 'hidden',
              }}
            >
              {/* connection lines */}

              <Box
                sx={{
                  position: 'absolute',

                  left: '20%',
                  top: '30%',

                  width: '58%',
                  height: '1px',

                  bgcolor:
                    'rgba(185,218,242,0.22)',

                  transform:
                    'rotate(22deg)',

                  transformOrigin:
                    'left center',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',

                  left: '28%',
                  top: '62%',

                  width: '50%',
                  height: '1px',

                  bgcolor:
                    'rgba(185,218,242,0.20)',

                  transform:
                    'rotate(-28deg)',

                  transformOrigin:
                    'left center',
                }}
              />


              {featuredProjects.map(
                (project, index) => {
                  const positions = [
                    {
                      left: '18%',
                      top: '27%',
                    },
                    {
                      left: '66%',
                      top: '42%',
                    },
                    {
                      left: '31%',
                      top: '67%',
                    },
                    {
                      left: '72%',
                      top: '73%',
                    },
                  ]

                  const position =
                    positions[index]

                  const active =
                    index === activeIndex

                  return (
                    <Box
                      key={project.id}

                      component="button"
                      type="button"

                      aria-label={`Show ${project.name}`}
                      aria-pressed={active}

                      onClick={() =>
                        setActiveIndex(
                          index,
                        )
                      }

                      sx={{
                        appearance: 'none',

                        position: 'absolute',

                        left:
                          position?.left ??
                          '50%',

                        top:
                          position?.top ??
                          '50%',

                        transform:
                          'translate(-50%, -50%)',

                        width: active
                          ? 18
                          : 11,

                        height: active
                          ? 18
                          : 11,

                        p: 0,

                        border: '2px solid',
                        borderColor:
                          active
                            ? '#FFFFFF'
                            : '#B9DAF2',

                        borderRadius: '50%',

                        bgcolor:
                          active
                            ? '#B9DAF2'
                            : '#082F4D',

                        boxShadow: active
                          ? '0 0 0 9px rgba(185,218,242,0.12), 0 0 24px rgba(185,218,242,0.55)'
                          : '0 0 12px rgba(185,218,242,0.25)',

                        cursor: 'pointer',

                        transition:
                          'width 180ms ease, height 180ms ease, background-color 180ms ease, box-shadow 180ms ease',
                      }}
                    />
                  )
                },
              )}


              <Box
                sx={{
                  position: 'absolute',

                  left: 22,
                  bottom: 20,

                  color:
                    'rgba(255,255,255,0.42)',

                  fontSize: '0.48rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.12em',

                  textTransform:
                    'uppercase',
                }}
              >
                Regional Project Nodes
              </Box>
            </Box>


            {/* Active data */}

            <Box
              sx={{
                p: 2.5,

                borderTop: '1px solid',

                borderColor:
                  'rgba(185,218,242,0.14)',
              }}
            >
              <Box
                sx={{
                  mb: 0.8,

                  color: '#649ABD',

                  fontSize: '0.5rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.14em',

                  textTransform:
                    'uppercase',
                }}
              >
                Active Node
              </Box>

              <Box
                sx={{
                  fontSize: '1.3rem',
                  fontWeight: 600,

                  letterSpacing:
                    '-0.03em',
                }}
              >
                {activeProject.name}
              </Box>

              <Box
                sx={{
                  mt: 0.8,

                  color:
                    'rgba(255,255,255,0.54)',

                  fontSize: '0.68rem',
                }}
              >
                {activeProject.city}
                {' / '}
                {activeProject.region}
              </Box>
            </Box>
          </Box>
        </Box>


        {/* Bottom telemetry strip */}

        <Box
          sx={{
            mt: {
              xs: 4,
              md: 5,
            },

            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr 1fr',
              md: '1.6fr 1fr 1fr 1fr',
            },

            border: '1px solid',
            borderColor: 'rgba(185,218,242,0.16)',

            bgcolor: 'rgba(6,31,51,0.42)',

            backdropFilter: 'blur(12px)',
          }}
        >
          <Telemetry
            index="01"
            label="Active Project"
            value={activeProject.name}
            active
          />

          <Telemetry
            index="02"
            label="Region"
            value={activeProject.region}
          />

          <Telemetry
            index="03"
            label="Sector"
            value={activeProject.category}
          />

          <Telemetry
            index="04"
            label="System Status"
            value="Operational"
            status
          />
        </Box>
      </Box>
    </Box>
  )
}


function Telemetry({
  index,
  label,
  value,
  active = false,
  status = false,
}: {
  index: string
  label: string
  value: string
  active?: boolean
  status?: boolean
}) {
  return (
    <Box
      sx={{
        position: 'relative',

        minHeight: {
          xs: 92,
          md: 104,
        },

        px: {
          xs: 2,
          md: 2.5,
        },

        py: 2,

        borderRight: '1px solid',
        borderBottom: {
          xs: '1px solid',
          md: 0,
        },

        borderColor:
          'rgba(185,218,242,0.12)',

        '&:nth-of-type(2n)': {
          borderRight: {
            xs: 0,
            md: '1px solid',
          },
        },

        '&:last-of-type': {
          borderRight: 0,
        },

        ...(active && {
          bgcolor:
            'rgba(185,218,242,0.055)',

          '&::before': {
            content: '""',

            position: 'absolute',

            left: 0,
            top: 0,
            bottom: 0,

            width: '2px',

            bgcolor: '#B9DAF2',

            boxShadow:
              '0 0 14px rgba(185,218,242,0.55)',
          },
        }),
      }}
    >
      <Box
        sx={{
          mb: 1.5,

          display: 'flex',

          justifyContent: 'space-between',
          alignItems: 'center',

          gap: 2,
        }}
      >
        <Box
          sx={{
            color: '#649ABD',

            fontSize: '0.47rem',
            fontWeight: 700,

            letterSpacing: '0.14em',
          }}
        >
          {index}
        </Box>

        {status && (
          <Box
            sx={{
              display: 'flex',

              alignItems: 'center',

              gap: 0.8,

              color: '#B9DAF2',

              fontSize: '0.44rem',
              fontWeight: 700,

              letterSpacing: '0.12em',

              textTransform: 'uppercase',
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,

                borderRadius: '50%',

                bgcolor: '#B9DAF2',

                boxShadow:
                  '0 0 10px rgba(185,218,242,0.75)',
              }}
            />

            Live
          </Box>
        )}
      </Box>


      <Box
        sx={{
          mb: 0.5,

          color:
            'rgba(255,255,255,0.36)',

          fontSize: '0.48rem',
          fontWeight: 700,

          letterSpacing: '0.13em',

          textTransform: 'uppercase',
        }}
      >
        {label}
      </Box>


      <Box
        sx={{
          color: active
            ? '#B9DAF2'
            : '#FFFFFF',

          fontSize: {
            xs: '0.78rem',
            md: active
              ? '0.95rem'
              : '0.82rem',
          },

          fontWeight: 700,

          lineHeight: 1.3,
        }}
      >
        {value}
      </Box>
    </Box>
  )
}

export default SystemsHero