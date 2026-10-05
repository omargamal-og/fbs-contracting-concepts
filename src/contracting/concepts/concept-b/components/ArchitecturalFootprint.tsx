import type { MouseEvent } from 'react'

import { Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import Reveal from '../../../core/components/Reveal'

import { projects } from '../../../core/data/projects'
import { useProjectMap } from '../../../core/hooks/useProjectMap'

import type {
  ProjectRegion,
} from '../../../core/types/project'

import saudiMapSvg from '../../../core/assets/saudi-arabia.svg?raw'

const regions = [
  'All',
  'Riyadh',
  'Makkah',
  'Madinah',
  'Tabuk',
] as const

const regionToSvgId = {
  Riyadh: 'SA01',
  Makkah: 'SA02',
  Madinah: 'SA03',
  Tabuk: 'SA07',
} as const

const svgIdToRegion = {
  SA01: 'Riyadh',
  SA02: 'Makkah',
  SA03: 'Madinah',
  SA07: 'Tabuk',
} as const

function ArchitecturalFootprint() {
  const {
    activeRegion,
    setActiveRegion,
    setActiveProjectId,
    filteredProjects,
    activeProject,
  } = useProjectMap(projects)

  const selectedProject =
    activeProject ??
    filteredProjects[0] ??
    null

  const highlightedRegion =
    activeRegion !== 'All'
      ? activeRegion
      : selectedProject?.region ?? null

  const activeSvgId =
    highlightedRegion
      ? regionToSvgId[highlightedRegion]
      : null

  const handleRegionChange = (
    region: 'All' | ProjectRegion,
  ) => {
    setActiveRegion(region)
    setActiveProjectId(null)
  }

  const handleMapClick = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (!(event.target instanceof Element)) {
      return
    }

    const regionElement =
      event.target.closest('[id]')

    if (!regionElement) {
      return
    }

    const region =
      svgIdToRegion[
        regionElement.id as keyof typeof svgIdToRegion
      ]

    if (!region) {
      return
    }

    handleRegionChange(region)
  }

  return (
    <Box
      id="footprint"
      component="section"
      sx={{
        scrollMarginTop: {
          xs: 72,
          md: 88,
        },

        bgcolor: '#EEF4F6',
        color: '#082F4D',

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
        }}
      >
        {/* Intro */}

        <Reveal distance={22}>
          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                md: '220px 1fr',
              },

              gap: {
                xs: 2.5,
                md: 6,
              },

              mb: {
                xs: 6,
                md: 8,
              },
            }}
          >
            <Box
              sx={{
                color: '#649ABD',

                fontSize: '0.62rem',
                fontWeight: 700,

                letterSpacing: '0.15em',

                textTransform: 'uppercase',
              }}
            >
              Our Footprint
            </Box>

            <Box>
              <Box
                component="h2"
                sx={{
                  m: 0,

                  maxWidth: 850,

                  fontSize: {
                    xs: '2.8rem',
                    sm: '4rem',
                    md: '5.2rem',
                    lg: '6rem',
                  },

                  fontWeight: 500,

                  lineHeight: 0.98,

                  letterSpacing: '-0.055em',
                }}
              >
                Across the
                <br />
                Kingdom.
              </Box>

              <Box
                sx={{
                  mt: 3,

                  maxWidth: 540,

                  color: 'text.secondary',

                  fontSize: {
                    xs: '0.9rem',
                    md: '1rem',
                  },

                  lineHeight: 1.8,
                }}
              >
                A growing portfolio of residential
                developments across key regions of
                Saudi Arabia.
              </Box>
            </Box>
          </Box>
        </Reveal>


        {/* Region navigation */}

        <Box
          sx={{
            mb: {
              xs: 4,
              md: 5,
            },

            display: 'flex',

            gap: {
              xs: 2.5,
              md: 4,
            },

            alignItems: 'center',

            overflowX: 'auto',

            pb: 2,

            borderBottom: '1px solid',
            borderColor: 'divider',

            scrollbarWidth: 'none',

            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {regions.map((region) => {
            const active =
              activeRegion === region

            return (
              <Box
                key={region}
                component="button"
                type="button"
                onClick={() =>
                  handleRegionChange(region)
                }
                sx={{
                  appearance: 'none',

                  flexShrink: 0,

                  border: 0,
                  outline: 0,

                  p: 0,

                  bgcolor: 'transparent',

                  color: active
                    ? '#082F4D'
                    : 'text.secondary',

                  fontFamily: 'inherit',

                  fontSize: {
                    xs: '0.75rem',
                    md: '0.8rem',
                  },

                  fontWeight: active
                    ? 700
                    : 600,

                  cursor: 'pointer',

                  position: 'relative',

                  transition:
                    'color 180ms ease',

                  '&::after': {
                    content: '""',

                    position: 'absolute',

                    left: 0,
                    right: 0,

                    bottom: -17,

                    height: 2,

                    bgcolor: '#649ABD',

                    opacity: active
                      ? 1
                      : 0,

                    transform: active
                      ? 'scaleX(1)'
                      : 'scaleX(0.7)',

                    transition:
                      'opacity 180ms ease, transform 180ms ease',
                  },

                  '&:hover': {
                    color: '#082F4D',
                  },

                  '&:focus-visible': {
                    outline:
                      '2px solid #649ABD',

                    outlineOffset: 5,
                  },
                }}
              >
                {region}
              </Box>
            )
          })}
        </Box>


        {/* Main experience */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(0, 1.55fr) minmax(340px, 0.65fr)',
            },

            minHeight: {
              lg: 680,
            },

            bgcolor: '#FFFFFF',

            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Map */}

          <Reveal
            distance={18}
            sx={{
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                position: 'relative',

                height: {
                  xs: 470,
                  sm: 600,
                  lg: '100%',
                },

                minHeight: {
                  lg: 680,
                },

                overflow: 'hidden',

                borderRight: {
                  lg: '1px solid',
                },

                borderBottom: {
                  xs: '1px solid',
                  lg: 0,
                },

                borderColor: 'divider',

                background: `
                  linear-gradient(
                    180deg,
                    #FFFFFF 0%,
                    #EEF4F6 100%
                  )
                `,
              }}
            >
              {/* Background reference */}

              <Box
                sx={{
                  position: 'absolute',

                  top: 24,
                  left: 24,

                  zIndex: 4,

                  color: 'text.secondary',

                  fontSize: '0.55rem',
                  fontWeight: 700,

                  letterSpacing: '0.13em',

                  textTransform: 'uppercase',
                }}
              >
                Saudi Arabia
                <br />
                Project Footprint
              </Box>


              <Box
                sx={{
                  position: 'absolute',

                  right: 24,
                  top: 24,

                  zIndex: 4,

                  color: '#649ABD',

                  fontSize: '0.55rem',
                  fontWeight: 700,

                  letterSpacing: '0.13em',

                  textTransform: 'uppercase',

                  textAlign: 'right',
                }}
              >
                FBS Contracting
              </Box>


              {/* Map stage */}

              <Box
                sx={{
                  position: 'absolute',

                  inset: {
                    xs: '78px 18px 42px',
                    sm: '82px 40px 44px',
                    lg: '88px 52px 48px',
                  },

                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                {/*
                  Important:
                  SVG + pins must share the exact same coordinate canvas.

                  Saudi SVG:
                  viewBox="0 0 1000 824"
                */}

                <Box
                  sx={{
                    position: 'relative',

                    width: '100%',
                    maxWidth: 820,

                    aspectRatio: '1000 / 824',

                    flexShrink: 0,
                  }}
                >
                  {/* SVG */}

                  <Box
                    onClick={handleMapClick}
                    sx={{
                      position: 'absolute',
                      inset: 0,

                      '& svg': {
                        display: 'block',

                        width: '100%',
                        height: '100%',
                      },

                      '& svg [id^="SA"]': {
                        fill: '#DAE4EA !important',

                        opacity: 0.9,

                        transition:
                          'fill 220ms ease, opacity 220ms ease',
                      },

                      '& svg [id="SA01"], & svg [id="SA02"], & svg [id="SA03"], & svg [id="SA07"]':
                        {
                          cursor: 'pointer',
                        },

                      ...(activeSvgId
                        ? {
                            [`& svg [id="${activeSvgId}"]`]:
                              {
                                fill:
                                  '#649ABD !important',

                                opacity:
                                  '1 !important',
                              },
                          }
                        : {}),
                    }}
                    dangerouslySetInnerHTML={{
                      __html: saudiMapSvg,
                    }}
                  />


                  {/* Project pins */}

                  {filteredProjects.map(
                    (project) => {
                      const active =
                        selectedProject?.id ===
                        project.id

                      return (
                        <Box
                          key={project.id}

                          component="button"
                          type="button"

                          aria-label={`Select ${project.name}`}
                          aria-pressed={active}

                          onClick={() =>
                            setActiveProjectId(
                              project.id,
                            )
                          }

                          sx={{
                            appearance: 'none',

                            position: 'absolute',

                            left: `${project.mapPosition.x}%`,
                            top: `${project.mapPosition.y}%`,

                            transform:
                              'translate(-50%, -50%)',

                            zIndex: 5,

                            width: active
                              ? 22
                              : 14,

                            height: active
                              ? 22
                              : 14,

                            p: 0,

                            border: '3px solid #FFFFFF',

                            borderRadius: '50%',

                            bgcolor: active
                              ? '#082F4D'
                              : '#649ABD',

                            boxShadow: active
                              ? '0 0 0 7px rgba(100,154,189,0.20)'
                              : '0 4px 12px rgba(8,47,77,0.18)',

                            cursor: 'pointer',

                            transition:
                              'width 180ms ease, height 180ms ease, background-color 180ms ease, box-shadow 180ms ease',

                            '&:hover': {
                              bgcolor: '#082F4D',
                            },

                            '&:focus-visible': {
                              outline:
                                '2px solid #082F4D',

                              outlineOffset: 4,
                            },
                          }}
                        />
                      )
                    },
                  )}
                </Box>
              </Box>


              {/* Bottom note */}

              <Box
                sx={{
                  position: 'absolute',

                  left: 24,
                  bottom: 22,

                  color: 'text.secondary',

                  fontSize: '0.56rem',

                  letterSpacing: '0.08em',
                }}
              >
                Select a project to explore
              </Box>
            </Box>
          </Reveal>


          {/* Active project */}

          {/* Active project */}

            <Box
              sx={{
                display: 'flex',

                flexDirection: 'column',

                minWidth: 0,

                mt: {
                  xs: 0,
                  md: 3,
                  lg: 0,
                },
              }}
            >
            {selectedProject && (
              <>
                <Box
                  sx={{
                    position: 'relative',

                    minHeight: {
                      xs: 340,
                      sm: 420,
                      lg: 390,
                    },

                    overflow: 'hidden',

                    bgcolor: '#082F4D',
                  }}
                >
                  {selectedProject.coverImage && (
                    <Box
                      component="img"

                      src={
                        selectedProject.coverImage
                      }

                      alt={
                        selectedProject.name
                      }

                      loading="lazy"

                      sx={{
                        position: 'absolute',
                        inset: 0,

                        width: '100%',
                        height: '100%',

                        objectFit: 'cover',

                        filter:
                          'saturate(0.9) contrast(1.03)',
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,

                      background:
                        'linear-gradient(180deg, rgba(8,47,77,0.02) 45%, rgba(8,47,77,0.58) 100%)',
                    }}
                  />

                  <Box
                    sx={{
                      position: 'absolute',

                      left: 22,
                      bottom: 20,

                      color:
                        'rgba(255,255,255,0.8)',

                      fontSize: '0.56rem',
                      fontWeight: 700,

                      letterSpacing:
                        '0.13em',

                      textTransform:
                        'uppercase',
                    }}
                  >
                    Featured Location
                  </Box>
                </Box>


                {/* Info */}

                <Box
                  sx={{
                    flex: 1,

                    p: {
                      xs: 3,
                      md: 4,
                    },

                    display: 'flex',

                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      mb: 1.5,

                      color: '#649ABD',

                      fontSize: '0.58rem',
                      fontWeight: 700,

                      letterSpacing:
                        '0.14em',

                      textTransform:
                        'uppercase',
                    }}
                  >
                    {selectedProject.city}
                    {' — '}
                    {selectedProject.region}
                  </Box>


                  <Box
                    component="h3"
                    sx={{
                      m: 0,

                      mb: 3,

                      fontSize: {
                        xs: '2.3rem',
                        lg: '2.8rem',
                      },

                      fontWeight: 500,

                      lineHeight: 0.98,

                      letterSpacing:
                        '-0.05em',
                    }}
                  >
                    {selectedProject.name}
                  </Box>


                  {selectedProject.shortDescription && (
                    <Box
                      sx={{
                        mb: 4,

                        color:
                          'text.secondary',

                        fontSize: '0.88rem',

                        lineHeight: 1.75,
                      }}
                    >
                      {
                        selectedProject.shortDescription
                      }
                    </Box>
                  )}


                  <Box
                    sx={{
                      mt: 'auto',

                      pt: 2.5,

                      display: 'grid',

                      gridTemplateColumns:
                        '1fr 1fr',

                      gap: 2,

                      borderTop:
                        '1px solid',

                      borderColor:
                        'divider',
                    }}
                  >
                    <ProjectMeta
                      label="Sector"
                      value={
                        selectedProject.category
                      }
                    />

                    <ProjectMeta
                      label="Status"
                      value={
                        selectedProject.status ??
                        '—'
                      }
                    />
                  </Box>


                  <Box
                    component={RouterLink}

                    to={`/contracting/concept-b/projects/${selectedProject.slug}`}

                    sx={{
                      mt: 3,

                      display:
                        'inline-flex',

                      alignItems: 'center',

                      gap: 1.2,

                      width: 'fit-content',

                      color: '#082F4D',

                      textDecoration:
                        'none',

                      fontSize: '0.7rem',
                      fontWeight: 700,

                      letterSpacing:
                        '0.08em',

                      '& span': {
                        transition:
                          'transform 180ms ease',
                      },

                      '&:hover': {
                        color:
                          '#649ABD',
                      },

                      '&:hover span': {
                        transform:
                          'translate(4px, -4px)',
                      },

                      '&:focus-visible': {
                        outline:
                          '2px solid #649ABD',

                        outlineOffset: 5,
                      },
                    }}
                  >
                    View Project

                    <Box component="span">
                      ↗
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>


        {/* Project index */}

        <Box
          sx={{
            mt: {
              xs: 4,
              md: 5,
            },

            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: `repeat(${Math.min(projects.length, 5)}, minmax(0, 1fr))`,
            },

            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {filteredProjects.map(
            (project, index) => {
              const active =
                selectedProject?.id ===
                project.id

              return (
                <Box
                  key={project.id}

                  component="button"
                  type="button"

                  onClick={() =>
                    setActiveProjectId(
                      project.id,
                    )
                  }

                  sx={{
                    appearance: 'none',

                    border: 0,
                    borderBottom:
                      '1px solid',

                    borderRight: {
                      lg:
                        index ===
                        filteredProjects.length -
                          1
                          ? 0
                          : '1px solid',
                    },

                    borderColor:
                      'divider',

                    bgcolor:
                      active
                        ? '#FFFFFF'
                        : 'transparent',

                    color:
                      active
                        ? '#082F4D'
                        : 'text.secondary',

                    px: {
                      xs: 0,
                      sm: 2,
                    },

                    py: 2.5,

                    textAlign: 'left',

                    cursor: 'pointer',

                    transition:
                      'background-color 180ms ease, color 180ms ease',

                    '&:hover': {
                      bgcolor:
                        '#FFFFFF',

                      color:
                        '#082F4D',
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
                      mb: 1,

                      color: '#649ABD',

                      fontSize: '0.55rem',
                      fontWeight: 700,
                    }}
                  >
                    {String(index + 1).padStart(
                      2,
                      '0',
                    )}
                  </Box>

                  <Box
                    sx={{
                      fontSize: '0.86rem',
                      fontWeight: 600,

                      lineHeight: 1.3,
                    }}
                  >
                    {project.name}
                  </Box>

                  <Box
                    sx={{
                      mt: 0.5,

                      fontSize: '0.66rem',
                    }}
                  >
                    {project.city}
                  </Box>
                </Box>
              )
            },
          )}
        </Box>
      </Box>
    </Box>
  )
}


function ProjectMeta({
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
          mb: 0.4,

          color: 'text.secondary',

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
          fontSize: '0.76rem',
          fontWeight: 600,
        }}
      >
        {value}
      </Box>
    </Box>
  )
}

export default ArchitecturalFootprint