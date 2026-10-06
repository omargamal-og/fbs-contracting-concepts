import type { MouseEvent } from 'react'

import { Box } from '@mui/material'

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

function ArchitecturalProjectNetwork() {
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
      id="network"
      component="section"
      sx={{
        scrollMarginTop: {
          xs: 72,
          md: 84,
        },

        bgcolor: '#082F4D',
        color: '#FFFFFF',

        borderTop: '1px solid',
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
            lg: 13,
          },
        }}
      >
        {/* =====================================
            SECTION HEADER
        ====================================== */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: '220px 1fr auto',
            },

            gap: {
              xs: 2.5,
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
            Kingdom Network
          </Box>


          <Box>
            <Box
              component="h2"
              sx={{
                m: 0,

                maxWidth: 900,

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
              Project nodes
              <br />

              <Box
                component="span"
                sx={{
                  color: '#B9DAF2',
                }}
              >
                across Saudi Arabia.
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,

                maxWidth: 560,

                color:
                  'rgba(255,255,255,0.52)',

                fontSize: {
                  xs: '0.88rem',
                  md: '0.96rem',
                },

                lineHeight: 1.8,
              }}
            >
              Explore the current FBS Contracting
              portfolio as a connected regional
              project network.
            </Box>
          </Box>


          <Box
            sx={{
              pb: {
                md: 0.6,
              },

              color:
                'rgba(255,255,255,0.32)',

              fontSize: '0.5rem',
              fontWeight: 700,

              letterSpacing: '0.14em',

              textTransform: 'uppercase',
            }}
          >
            Network / Operational
          </Box>
        </Box>


        {/* =====================================
            REGION FILTER
        ====================================== */}

        <Box
          sx={{
            mb: 2,

            display: 'flex',

            overflowX: 'auto',

            border: '1px solid',

            borderColor:
              'rgba(185,218,242,0.14)',

            scrollbarWidth: 'none',

            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {regions.map((region) => {
            const active =
              region === activeRegion

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

                  flex: {
                    md: 1,
                  },

                  flexShrink: 0,

                  minWidth: {
                    xs: 105,
                    md: 0,
                  },

                  border: 0,
                  borderRight:
                    '1px solid',

                  borderColor:
                    'rgba(185,218,242,0.12)',

                  px: 2.5,
                  py: 1.7,

                  bgcolor: active
                    ? 'rgba(185,218,242,0.08)'
                    : 'transparent',

                  color: active
                    ? '#B9DAF2'
                    : 'rgba(255,255,255,0.42)',

                  fontFamily: 'inherit',

                  fontSize: '0.56rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.12em',

                  textTransform: 'uppercase',

                  cursor: 'pointer',

                  position: 'relative',

                  '&::after': {
                    content: '""',

                    position: 'absolute',

                    left: 0,
                    right: 0,
                    bottom: 0,

                    height: '2px',

                    bgcolor: '#B9DAF2',

                    opacity: active
                      ? 1
                      : 0,

                    boxShadow: active
                      ? '0 0 14px rgba(185,218,242,0.55)'
                      : 'none',
                  },

                  '&:hover': {
                    color: '#FFFFFF',

                    bgcolor:
                      'rgba(185,218,242,0.04)',
                  },

                  '&:focus-visible': {
                    outline:
                      '2px solid #B9DAF2',

                    outlineOffset: -2,
                  },

                  '&:last-of-type': {
                    borderRight: 0,
                  },
                }}
              >
                {region}
              </Box>
            )
          })}
        </Box>


        {/* =====================================
            NETWORK SYSTEM
        ====================================== */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(0, 1.5fr) minmax(350px, 0.5fr)',
            },

            border: '1px solid',

            borderColor:
              'rgba(185,218,242,0.14)',

            bgcolor: '#061F33',
          }}
        >
          {/* =================================
              MAP
          ================================== */}

          <Box
            sx={{
              position: 'relative',

              minHeight: {
                xs: 520,
                sm: 680,
                md: 760,
                lg: 780,
              },

              overflow: 'hidden',

              borderRight: {
                lg: '1px solid',
              },

              borderBottom: {
                xs: '1px solid',
                lg: 0,
              },

              borderColor:
                'rgba(185,218,242,0.14)',

              background: `
                radial-gradient(
                  circle at 50% 45%,
                  rgba(100,154,189,0.10),
                  transparent 48%
                ),
                #061F33
              `,
            }}
          >
            {/* Technical grid */}

            <Box
              aria-hidden="true"
              sx={{
                position: 'absolute',
                inset: 0,

                opacity: 0.14,

                backgroundImage: `
                  linear-gradient(
                    rgba(185,218,242,0.22) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(185,218,242,0.22) 1px,
                    transparent 1px
                  )
                `,

                backgroundSize:
                  '52px 52px',
              }}
            />


            {/* Top labels */}

            <Box
              sx={{
                position: 'absolute',

                top: 22,
                left: 24,
                right: 24,

                zIndex: 10,

                display: 'flex',

                justifyContent:
                  'space-between',

                gap: 3,

                pointerEvents: 'none',
              }}
            >
              <Box>
                <Box
                  sx={{
                    color: '#649ABD',

                    fontSize: '0.48rem',
                    fontWeight: 700,

                    letterSpacing:
                      '0.14em',

                    textTransform:
                      'uppercase',
                  }}
                >
                  Geographic Network
                </Box>

                <Box
                  sx={{
                    mt: 0.5,

                    color:
                      'rgba(255,255,255,0.54)',

                    fontSize: '0.62rem',
                  }}
                >
                  Saudi Arabia
                </Box>
              </Box>


              <Box
                sx={{
                  color: '#B9DAF2',

                  fontSize: '0.48rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.14em',

                  textTransform:
                    'uppercase',

                  textAlign: 'right',
                }}
              >
                {String(
                  filteredProjects.length,
                ).padStart(2, '0')}{' '}
                Active Nodes
              </Box>
            </Box>


            {/* Exact map coordinate canvas */}

            <Box
              sx={{
                position: 'absolute',

                inset: {
                  xs: '90px 18px 50px',
                  sm: '95px 48px 50px',
                  md: '100px 65px 55px',
                  lg: '105px 55px 55px',
                },

                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',

                  width: '100%',
                  maxWidth: 900,

                  aspectRatio: '1000 / 824',
                }}
              >
                {/* Saudi SVG */}

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
                      fill:
                        'rgba(100,154,189,0.10) !important',

                      stroke:
                        'rgba(185,218,242,0.20)',

                      strokeWidth: 1,

                      opacity: 1,

                      transition:
                        'fill 220ms ease, stroke 220ms ease',
                    },

                    '& svg [id="SA01"], & svg [id="SA02"], & svg [id="SA03"], & svg [id="SA07"]':
                      {
                        cursor: 'pointer',

                        '&:hover': {
                          fill:
                            'rgba(100,154,189,0.20) !important',
                        },
                      },

                    ...(activeSvgId
                      ? {
                          [`& svg [id="${activeSvgId}"]`]:
                            {
                              fill:
                                'rgba(100,154,189,0.28) !important',

                              stroke:
                                '#649ABD',
                            },
                        }
                      : {}),
                  }}

                  dangerouslySetInnerHTML={{
                    __html: saudiMapSvg,
                  }}
                />


                {/* Network connections */}

                {selectedProject && (
                  <Box
                    component="svg"

                    viewBox="0 0 1000 824"

                    preserveAspectRatio="none"

                    aria-hidden="true"

                    sx={{
                      position: 'absolute',
                      inset: 0,

                      width: '100%',
                      height: '100%',

                      overflow: 'visible',

                      pointerEvents: 'none',
                    }}
                  >
                    {filteredProjects
                      .filter(
                        (project) =>
                          project.id !==
                          selectedProject.id,
                      )
                      .map((project) => (
                        <line
                          key={project.id}

                          x1={
                            selectedProject
                              .mapPosition
                              .x * 10
                          }

                          y1={
                            selectedProject
                              .mapPosition
                              .y * 8.24
                          }

                          x2={
                            project.mapPosition
                              .x * 10
                          }

                          y2={
                            project.mapPosition
                              .y * 8.24
                          }

                          stroke="rgba(185,218,242,0.34)"

                          strokeWidth="1"

                          strokeDasharray="8 10"

                          vectorEffect="non-scaling-stroke"

                          className="network-line"
                        />
                      ))}
                  </Box>
                )}


                {/* Nodes */}

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

                          zIndex: 8,

                          width: active
                            ? 20
                            : 12,

                          height: active
                            ? 20
                            : 12,

                          p: 0,

                          border: '2px solid',

                          borderColor: active
                            ? '#FFFFFF'
                            : '#B9DAF2',

                          borderRadius: '50%',

                          bgcolor: active
                            ? '#B9DAF2'
                            : '#082F4D',

                          boxShadow: active
                            ? '0 0 0 10px rgba(185,218,242,0.10), 0 0 28px rgba(185,218,242,0.65)'
                            : '0 0 12px rgba(185,218,242,0.35)',

                          cursor: 'pointer',

                          transition:
                            'width 180ms ease, height 180ms ease, background-color 180ms ease, box-shadow 180ms ease',

                          '&::after': active
                            ? {
                                content:
                                  '""',

                                position:
                                  'absolute',

                                inset: -8,

                                border:
                                  '1px solid rgba(185,218,242,0.40)',

                                borderRadius:
                                  '50%',

                                animation:
                                  'networkPulse 1.8s ease-out infinite',

                                '@keyframes networkPulse':
                                  {
                                    '0%': {
                                      transform:
                                        'scale(0.65)',

                                      opacity: 1,
                                    },

                                    '100%': {
                                      transform:
                                        'scale(1.5)',

                                      opacity: 0,
                                    },
                                  },

                                '@media (prefers-reduced-motion: reduce)':
                                  {
                                    animation:
                                      'none',
                                  },
                              }
                            : {},

                          '&:focus-visible': {
                            outline:
                              '2px solid #FFFFFF',

                            outlineOffset: 5,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position:
                              'absolute',

                            left: '50%',
                            top: 'calc(100% + 10px)',

                            transform:
                              'translateX(-50%)',

                            display: active
                              ? 'block'
                              : 'none',

                            color: '#B9DAF2',

                            fontSize:
                              '0.44rem',

                            fontWeight: 700,

                            letterSpacing:
                              '0.09em',

                            whiteSpace:
                              'nowrap',

                            textTransform:
                              'uppercase',

                            pointerEvents:
                              'none',
                          }}
                        >
                          Node{' '}
                          {String(
                            projects.findIndex(
                              (item) =>
                                item.id ===
                                project.id,
                            ) + 1,
                          ).padStart(2, '0')}
                        </Box>
                      </Box>
                    )
                  },
                )}


                {/* Animated line CSS */}

                <Box
                  component="style"
                  sx={{
                    display: 'none',
                  }}
                >
                  {`
                    .network-line {
                      animation: networkDash 12s linear infinite;
                    }

                    @keyframes networkDash {
                      to {
                        stroke-dashoffset: -180;
                      }
                    }

                    @media (prefers-reduced-motion: reduce) {
                      .network-line {
                        animation: none;
                      }
                    }
                  `}
                </Box>
              </Box>
            </Box>


            {/* Map footer */}

            <Box
              sx={{
                position: 'absolute',

                left: 24,
                right: 24,
                bottom: 20,

                display: 'flex',

                justifyContent:
                  'space-between',

                gap: 3,

                color:
                  'rgba(255,255,255,0.28)',

                fontSize: '0.44rem',
                fontWeight: 700,

                letterSpacing:
                  '0.12em',

                textTransform: 'uppercase',
              }}
            >
              <Box>
                Select node to inspect
              </Box>

              <Box>
                Network lines represent project relationships
              </Box>
            </Box>
          </Box>


          {/* =================================
              DATA PANEL
          ================================== */}

          <Box
            sx={{
              display: 'flex',

              flexDirection: 'column',

              minWidth: 0,
            }}
          >
            {selectedProject ? (
              <>
                {/* Panel header */}

                <Box
                  sx={{
                    px: 2.5,
                    py: 2,

                    display: 'flex',

                    justifyContent:
                      'space-between',

                    alignItems: 'center',

                    gap: 3,

                    borderBottom:
                      '1px solid',

                    borderColor:
                      'rgba(185,218,242,0.14)',

                    color: '#649ABD',

                    fontSize: '0.48rem',
                    fontWeight: 700,

                    letterSpacing:
                      '0.14em',

                    textTransform:
                      'uppercase',
                  }}
                >
                  <Box>
                    Node Inspector
                  </Box>

                  <Box>
                    Online
                  </Box>
                </Box>


                {/* Image */}

                <Box
                  sx={{
                    position: 'relative',

                    minHeight: {
                      xs: 330,
                      lg: 310,
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

                      sx={{
                        position: 'absolute',
                        inset: 0,

                        width: '100%',
                        height: '100%',

                        objectFit: 'cover',

                        filter:
                          'saturate(0.7) contrast(1.08)',
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,

                      background:
                        'linear-gradient(180deg, rgba(8,47,77,0.08) 25%, rgba(8,47,77,0.76) 100%)',
                    }}
                  />

                  <Box
                    sx={{
                      position: 'absolute',

                      left: 22,
                      right: 22,
                      bottom: 20,

                      color: '#B9DAF2',

                      fontSize: '0.5rem',
                      fontWeight: 700,

                      letterSpacing:
                        '0.13em',

                      textTransform:
                        'uppercase',
                    }}
                  >
                    Active visual feed
                  </Box>
                </Box>


                {/* Project information */}

                <Box
                  sx={{
                    flex: 1,

                    p: {
                      xs: 3,
                      lg: 3.5,
                    },

                    display: 'flex',

                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      mb: 1,

                      color: '#649ABD',

                      fontSize: '0.52rem',
                      fontWeight: 700,

                      letterSpacing:
                        '0.14em',

                      textTransform:
                        'uppercase',
                    }}
                  >
                    {selectedProject.city}
                    {' / '}
                    {selectedProject.region}
                  </Box>


                  <Box
                    component="h3"
                    sx={{
                      m: 0,

                      mb: 2.5,

                      fontSize: {
                        xs: '2rem',
                        lg: '2.6rem',
                      },

                      fontWeight: 500,

                      lineHeight: 1,

                      letterSpacing:
                        '-0.045em',
                    }}
                  >
                    {selectedProject.name}
                  </Box>


                  {selectedProject.shortDescription && (
                    <Box
                      sx={{
                        mb: 4,

                        color:
                          'rgba(255,255,255,0.48)',

                        fontSize: '0.8rem',

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

                      borderTop: '1px solid',

                      borderColor:
                        'rgba(185,218,242,0.14)',
                    }}
                  >
                    <NetworkData
                      label="Node"
                      value={`0${projects.findIndex(
                        (project) =>
                          project.id ===
                          selectedProject.id,
                      ) + 1}`}
                    />

                    <NetworkData
                      label="Sector"
                      value={
                        selectedProject.category
                      }
                    />

                    <NetworkData
                      label="Status"
                      value={
                        selectedProject.status ??
                        '—'
                      }
                    />

                    <NetworkData
                      label="Region"
                      value={
                        selectedProject.region
                      }
                    />
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  flex: 1,

                  display: 'grid',
                  placeItems: 'center',

                  minHeight: 400,

                  color:
                    'rgba(255,255,255,0.38)',

                  fontSize: '0.7rem',
                }}
              >
                No active project nodes.
              </Box>
            )}
          </Box>
        </Box>


        {/* =====================================
            SYSTEM RAIL
        ====================================== */}

        <Box
          sx={{
            mt: 2,

            px: 2,

            py: 1.5,

            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr 1fr',
              md: 'repeat(4, 1fr)',
            },

            border: '1px solid',

            borderColor:
              'rgba(185,218,242,0.12)',

            bgcolor:
              'rgba(6,31,51,0.38)',
          }}
        >
          <SystemMetric
            label="Network"
            value="Online"
          />

          <SystemMetric
            label="Visible Nodes"
            value={String(
              filteredProjects.length,
            ).padStart(2, '0')}
          />

          <SystemMetric
            label="Active Region"
            value={activeRegion}
          />

          <SystemMetric
            label="Selected Node"
            value={
              selectedProject?.name ?? '—'
            }
          />
        </Box>
      </Box>
    </Box>
  )
}


function NetworkData({
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
          'rgba(185,218,242,0.10)',
      }}
    >
      <Box
        sx={{
          color:
            'rgba(255,255,255,0.30)',

          fontSize: '0.46rem',
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

          fontSize: '0.68rem',
          fontWeight: 600,

          textAlign: 'right',
        }}
      >
        {value}
      </Box>
    </Box>
  )
}


function SystemMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Box
      sx={{
        px: 2,
        py: 0.5,

        borderRight: {
          md: '1px solid',
        },

        borderColor:
          'rgba(185,218,242,0.10)',

        '&:last-of-type': {
          borderRight: 0,
        },
      }}
    >
      <Box
        sx={{
          mb: 0.4,

          color:
            'rgba(255,255,255,0.28)',

          fontSize: '0.44rem',
          fontWeight: 700,

          letterSpacing:
            '0.12em',

          textTransform: 'uppercase',
        }}
      >
        {label}
      </Box>

      <Box
        sx={{
          color: '#B9DAF2',

          fontSize: '0.68rem',
          fontWeight: 700,

          whiteSpace: {
            md: 'nowrap',
          },

          overflow: {
            md: 'hidden',
          },

          textOverflow: {
            md: 'ellipsis',
          },
        }}
      >
        {value}
      </Box>
    </Box>
  )
}

export default ArchitecturalProjectNetwork