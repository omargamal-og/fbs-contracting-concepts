import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'

import { Box } from '@mui/material'

import { projects } from '../../../core/data/projects'

function InfrastructureProjects() {
  const [activeIndex, setActiveIndex] =
    useState(0)

  const activeProject =
    projects[activeIndex] ?? projects[0]

  if (!activeProject) {
    return null
  }

  return (
    <Box
      id="projects"
      component="section"
      sx={{
        scrollMarginTop: {
          xs: 72,
          md: 84,
        },

        bgcolor: '#061F33',
        color: '#FFFFFF',

        borderTop: '1px solid',
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
            lg: 13,
          },
        }}
      >
        {/* Header */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: '220px 1fr auto',
            },

            gap: {
              xs: 2,
              md: 5,
            },

            alignItems: 'end',

            mb: {
              xs: 5,
              md: 7,
            },
          }}
        >
          <Box
            sx={{
              color: '#649ABD',

              fontSize: '0.56rem',
              fontWeight: 700,

              letterSpacing: '0.16em',

              textTransform: 'uppercase',
            }}
          >
            Project Registry
          </Box>


          <Box
            component="h2"
            sx={{
              m: 0,

              maxWidth: 850,

              fontSize: {
                xs: '2.8rem',
                sm: '4rem',
                md: '5rem',
                lg: '5.8rem',
              },

              fontWeight: 500,

              lineHeight: 0.96,

              letterSpacing: '-0.055em',
            }}
          >
            Connected projects.
            <br />

            <Box
              component="span"
              sx={{
                color: '#B9DAF2',
              }}
            >
              One delivery system.
            </Box>
          </Box>


          <Box
            sx={{
              pb: {
                md: 0.7,
              },

              color:
                'rgba(255,255,255,0.42)',

              fontSize: '0.54rem',
              fontWeight: 700,

              letterSpacing: '0.14em',

              textTransform: 'uppercase',
            }}
          >
            {String(projects.length).padStart(
              2,
              '0',
            )}{' '}
            Project Nodes
          </Box>
        </Box>


        {/* Main matrix */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(360px, 0.62fr) minmax(0, 1.38fr)',
            },

            border: '1px solid',

            borderColor:
              'rgba(185,218,242,0.14)',
          }}
        >
          {/* Project list */}

          <Box
            sx={{
              borderRight: {
                lg: '1px solid',
              },

              borderBottom: {
                xs: '1px solid',
                lg: 0,
              },

              borderColor:
                'rgba(185,218,242,0.14)',
            }}
          >
            <Box
              sx={{
                px: 2.5,
                py: 2,

                display: 'flex',

                justifyContent:
                  'space-between',

                alignItems: 'center',

                borderBottom: '1px solid',

                borderColor:
                  'rgba(185,218,242,0.14)',

                color: '#649ABD',

                fontSize: '0.5rem',
                fontWeight: 700,

                letterSpacing:
                  '0.14em',

                textTransform: 'uppercase',
              }}
            >
              <Box>
                Node Index
              </Box>

              <Box>
                Region
              </Box>
            </Box>


            {projects.map(
              (project, index) => {
                const active =
                  activeIndex === index

                return (
                  <Box
                    key={project.id}

                    component="button"
                    type="button"

                    aria-pressed={active}

                    onClick={() =>
                      setActiveIndex(index)
                    }

                    sx={{
                      appearance: 'none',

                      width: '100%',

                      border: 0,
                      borderBottom:
                        '1px solid',

                      borderColor:
                        'rgba(185,218,242,0.12)',

                      bgcolor: active
                        ? 'rgba(185,218,242,0.08)'
                        : 'transparent',

                      color: active
                        ? '#FFFFFF'
                        : 'rgba(255,255,255,0.58)',

                      px: 2.5,
                      py: {
                        xs: 2.5,
                        md: 3,
                      },

                      display: 'grid',

                      gridTemplateColumns:
                        '44px minmax(0, 1fr) auto',

                      gap: 2,

                      alignItems: 'center',

                      textAlign: 'left',

                      cursor: 'pointer',

                      position: 'relative',

                      transition:
                        'background-color 180ms ease, color 180ms ease',

                      '&::before': {
                        content: '""',

                        position: 'absolute',

                        left: 0,
                        top: 0,
                        bottom: 0,

                        width: '2px',

                        bgcolor: '#B9DAF2',

                        opacity: active
                          ? 1
                          : 0,

                        boxShadow: active
                          ? '0 0 16px rgba(185,218,242,0.7)'
                          : 'none',

                        transition:
                          'opacity 180ms ease',
                      },

                      '&:hover': {
                        bgcolor:
                          'rgba(185,218,242,0.05)',

                        color: '#FFFFFF',
                      },

                      '&:focus-visible': {
                        outline:
                          '2px solid #B9DAF2',

                        outlineOffset: -2,
                      },
                    }}
                  >
                    {/* Index */}

                    <Box
                      sx={{
                        color: active
                          ? '#B9DAF2'
                          : '#649ABD',

                        fontSize: '0.54rem',
                        fontWeight: 700,

                        letterSpacing:
                          '0.08em',
                      }}
                    >
                      {String(
                        index + 1,
                      ).padStart(2, '0')}
                    </Box>


                    {/* Name */}

                    <Box>
                      <Box
                        sx={{
                          mb: 0.5,

                          fontSize: {
                            xs: '0.9rem',
                            md: '1rem',
                          },

                          fontWeight: 600,

                          letterSpacing:
                            '-0.015em',
                        }}
                      >
                        {project.name}
                      </Box>

                      <Box
                        sx={{
                          color:
                            'rgba(255,255,255,0.34)',

                          fontSize: '0.58rem',

                          letterSpacing:
                            '0.08em',

                          textTransform:
                            'uppercase',
                        }}
                      >
                        {project.city}
                      </Box>
                    </Box>


                    {/* Region */}

                    <Box
                      sx={{
                        color: active
                          ? '#B9DAF2'
                          : 'rgba(255,255,255,0.38)',

                        fontSize: '0.55rem',
                        fontWeight: 700,

                        letterSpacing:
                          '0.08em',

                        textTransform:
                          'uppercase',
                      }}
                    >
                      {project.region}
                    </Box>
                  </Box>
                )
              },
            )}
          </Box>


          {/* Active visual */}

          <Box
            sx={{
              minWidth: 0,

              bgcolor: '#082F4D',
            }}
          >
            <Box
              sx={{
                position: 'relative',

                minHeight: {
                  xs: 500,
                  sm: 640,
                  lg: 720,
                },

                overflow: 'hidden',
              }}
            >
              {projects.map(
                (project, index) => (
                  <Box
                    key={project.id}

                    component="img"

                    src={project.coverImage}
                    alt={
                      index === activeIndex
                        ? project.name
                        : ''
                    }

                    aria-hidden={
                      index !== activeIndex
                    }

                    sx={{
                      position: 'absolute',
                      inset: 0,

                      width: '100%',
                      height: '100%',

                      objectFit: 'cover',

                      opacity:
                        index ===
                        activeIndex
                          ? 1
                          : 0,

                      filter:
                        'saturate(0.7) contrast(1.08)',

                      transition:
                        'opacity 600ms ease',

                      pointerEvents:
                        'none',
                    }}
                  />
                ),
              )}


              {/* Visual overlays */}

              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,

                  background: `
                    linear-gradient(
                      180deg,
                      rgba(8,47,77,0.08) 20%,
                      rgba(8,47,77,0.18) 48%,
                      rgba(8,47,77,0.92) 100%
                    )
                  `,
                }}
              />


              {/* top technical bar */}

              <Box
                sx={{
                  position: 'absolute',

                  top: 0,
                  left: 0,
                  right: 0,

                  px: 2.5,
                  py: 2,

                  display: 'flex',

                  justifyContent:
                    'space-between',

                  alignItems: 'center',

                  borderBottom:
                    '1px solid',

                  borderColor:
                    'rgba(185,218,242,0.18)',

                  color:
                    'rgba(255,255,255,0.60)',

                  fontSize: '0.5rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.14em',

                  textTransform:
                    'uppercase',
                }}
              >
                <Box>
                  Visual Feed
                </Box>

                <Box>
                  Node{' '}
                  {String(
                    activeIndex + 1,
                  ).padStart(2, '0')}
                </Box>
              </Box>


              {/* Crosshair */}

              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',

                  top: '50%',
                  left: '50%',

                  width: 80,
                  height: 80,

                  transform:
                    'translate(-50%, -50%)',

                  opacity: 0.18,

                  '&::before': {
                    content: '""',

                    position: 'absolute',

                    left: '50%',
                    top: 0,
                    bottom: 0,

                    width: '1px',

                    bgcolor: '#B9DAF2',
                  },

                  '&::after': {
                    content: '""',

                    position: 'absolute',

                    top: '50%',
                    left: 0,
                    right: 0,

                    height: '1px',

                    bgcolor: '#B9DAF2',
                  },
                }}
              />


              {/* Active project data */}

              <Box
                sx={{
                  position: 'absolute',

                  left: {
                    xs: 22,
                    md: 30,
                  },

                  right: {
                    xs: 22,
                    md: 30,
                  },

                  bottom: {
                    xs: 22,
                    md: 30,
                  },

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

                      fontSize: '0.55rem',
                      fontWeight: 700,

                      letterSpacing:
                        '0.15em',

                      textTransform:
                        'uppercase',
                    }}
                  >
                    Active Node /{' '}
                    {String(
                      activeIndex + 1,
                    ).padStart(2, '0')}
                  </Box>

                  <Box
                    component="h3"
                    sx={{
                      m: 0,

                      maxWidth: 760,

                      fontSize: {
                        xs: '2.4rem',
                        sm: '3.4rem',
                        md: '4.4rem',
                        lg: '5.2rem',
                      },

                      fontWeight: 500,

                      lineHeight: 0.95,

                      letterSpacing:
                        '-0.055em',
                    }}
                  >
                    {activeProject.name}
                  </Box>

                  <Box
                    sx={{
                      mt: 1.5,

                      color:
                        'rgba(255,255,255,0.56)',

                      fontSize: '0.74rem',
                    }}
                  >
                    {activeProject.city}
                    {' / '}
                    {activeProject.region}
                  </Box>
                </Box>


                {/* Data block */}

                <Box
                  sx={{
                    minWidth: {
                      md: 250,
                    },

                    borderTop: '1px solid',
                    borderColor:
                      'rgba(185,218,242,0.18)',
                  }}
                >
                  <DataRow
                    label="Sector"
                    value={
                      activeProject.category
                    }
                  />

                  <DataRow
                    label="Status"
                    value={
                      activeProject.status ??
                      '—'
                    }
                  />

                  <DataRow
                    label="Region"
                    value={
                      activeProject.region
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Open Project */}
        <Box
          component={RouterLink}
          to={`/contracting/concept-c/projects/${activeProject.slug}`}
          sx={{
            mt: 3,
            width: 'fit-content',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: '#B9DAF2',
            textDecoration: 'none',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.08em',

            '& span': {
              transition: 'transform 180ms ease',
            },

            '&:hover span': {
              transform: 'translate(5px, -5px)',
            },
          }}
        >
          Open Project

          <Box component="span">
            ↗
          </Box>
        </Box>             
        {/* Bottom rail */}

        <Box
          sx={{
            mt: 2,

            display: 'flex',

            justifyContent:
              'space-between',

            gap: 3,

            color:
              'rgba(255,255,255,0.28)',

            fontSize: '0.48rem',
            fontWeight: 700,

            letterSpacing: '0.13em',

            textTransform: 'uppercase',
          }}
        >
          <Box>
            FBS Contracting / Project System
          </Box>

          <Box>
            Registry Status / Operational
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


function DataRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Box
      sx={{
        py: 1.3,

        display: 'flex',

        justifyContent:
          'space-between',

        gap: 3,

        borderBottom: '1px solid',

        borderColor:
          'rgba(185,218,242,0.12)',
      }}
    >
      <Box
        sx={{
          color:
            'rgba(255,255,255,0.34)',

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
          color: '#FFFFFF',

          fontSize: '0.7rem',
          fontWeight: 600,

          textAlign: 'right',
        }}
      >
        {value}
      </Box>
    </Box>
  )
}

export default InfrastructureProjects