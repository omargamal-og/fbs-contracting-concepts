import {
  useState,
  type MouseEvent,
} from 'react'
import saudiMapSvg from '../../../core/assets/saudi-arabia.svg?raw'
import {
  Box,
  Button,
  Chip,
  Typography,
} from '@mui/material'

import { projects } from '../../../core/data/projects'
import { useProjectMap } from '../../../core/hooks/useProjectMap'
import { useNavigate } from 'react-router-dom'

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

function ExecutiveProjectMap() {
  const navigate = useNavigate()

  const [hoveredRegion, setHoveredRegion] =
  useState<string | null>(null)

  const [regionPointer, setRegionPointer] =
  useState({
    x: 0,
    y: 0,
  })
  
  const {
    activeRegion,
    setActiveRegion,
    activeProject,
    setActiveProjectId,
    filteredProjects,
  } = useProjectMap(projects)

  const selectedProject =
    activeProject ?? filteredProjects[0] ?? null

  const highlightedRegion =
  activeRegion !== 'All'
    ? activeRegion
    : selectedProject?.region ?? null 

  const handleRegionClick = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    const target = event.target as SVGElement
  
    const region =
      svgIdToRegion[
        target.id as keyof typeof svgIdToRegion
      ]
  
    if (!region) return
  
    setActiveRegion(region)
    setActiveProjectId(null)
  }

  const handleRegionPointerMove = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    const target = event.target as SVGElement
  
    const region =
      svgIdToRegion[
        target.id as keyof typeof svgIdToRegion
      ]
  
    if (!region) {
      setHoveredRegion(null)
      return
    }
  
    const rect =
      event.currentTarget.getBoundingClientRect()
  
    setHoveredRegion(region)
  
    setRegionPointer({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  return (
    <Box>
      {/* Region Filters */}
      <Box
        sx={{
          display: 'flex',
        
          gap: {
            xs: 1,
            md: 2,
          },
        
          flexWrap: {
            xs: 'nowrap',
            md: 'wrap',
          },
        
          overflowX: {
            xs: 'auto',
            md: 'visible',
          },
        
          pb: {
            xs: 1,
            md: 0,
          },
        
          scrollbarWidth: 'none',
        
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >{regions.map((region) => {
        const isActive = activeRegion === region
      
        return (
          <Button
            key={region}
            onClick={() => {
              setActiveRegion(region)
              setActiveProjectId(null)
            }}
            sx={{
              flexShrink: 0,
              minWidth: 0,
              px: 2.2,
              py: 1.2,
      
              borderRadius: 0,
              borderBottom: '2px solid',
      
              borderColor: isActive
                ? 'secondary.main'
                : 'transparent',
      
              color: isActive
                ? 'text.primary'
                : 'text.secondary',
      
              bgcolor: 'transparent',
      
              '&:hover': {
                bgcolor: 'transparent',
                color: 'text.primary',
              },
            }}
          >
            {region}
          </Button>
        )
      })}
      </Box>

      <Box
        sx={{
          display: 'grid',

          gridTemplateColumns: {
            xs: '1fr',
            lg: 'minmax(0, 1.35fr) minmax(360px, 0.65fr)',
          },

          gap: {
            xs: 3,
            lg: 4,
          },

          alignItems: 'stretch',
        }}
      >
        {/* Map Card */}
        <Box
          sx={{
            bgcolor: '#ECE9DF',

            border: '1px solid',
            borderColor: 'rgba(23,23,23,0.10)',

            minWidth: 0,

            p: {
              xs: 2.5,
              md: 5,
            },

            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Actual image becomes the coordinate system */}
          <Box
            sx={{
              position: 'relative',

              width: '100%',
              maxWidth: 700,

              mx: 'auto',
            }}
          >
            
            <Box
              onClick={handleRegionClick}
              onMouseMove={handleRegionPointerMove}
              onMouseLeave={() => setHoveredRegion(null)}
              dangerouslySetInnerHTML={{
                __html: saudiMapSvg,
              }}
              sx={{
                width: '100%',

                '& svg': {
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                },

                '& path': {
                  fill: '#9DA896',
                  stroke: '#F5F2EA',
                  strokeWidth: 1,

                  transition:
                    'fill 250ms ease, opacity 250ms ease, stroke 250ms ease',

                  opacity:
                    activeRegion === 'All'
                      ? 0.86
                      : 0.28,
                },

                '& #SA01, & #SA02, & #SA03, & #SA07': {
                  cursor: 'pointer',
                },

                '& #SA01:hover, & #SA02:hover, & #SA03:hover, & #SA07:hover': {
                  fill: '#AA9875',
                  opacity: 1,
                },

                ...(highlightedRegion
                  ? {
                      [`& #${regionToSvgId[highlightedRegion]}`]: {
                        fill: '#B29A70',
                        stroke: '#FFFFFF',
                        strokeWidth: 2,
                        opacity: 1,
                
                        filter:
                          'drop-shadow(0 6px 12px rgba(154,123,79,0.18))',
                      },
                    }
                  : {}),
              }}
            />

            {hoveredRegion && (
              <Box
                sx={{
                  position: 'absolute',

                  left: regionPointer.x,
                  top: regionPointer.y,

                  transform: 'translate(14px, -50%)',

                  px: 1.5,
                  py: 0.8,

                  bgcolor: '#082F4D',
                  color: '#fff',

                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: 1,

                  textTransform: 'uppercase',

                  pointerEvents: 'none',

                  zIndex: 20,

                  boxShadow:
                    '0 8px 24px rgba(0,0,0,0.15)',
                }}
              >
                {hoveredRegion}
              </Box>
            )}

            {/* Pins */}
            {filteredProjects.map((project) => {
              const isActive =
                selectedProject?.id === project.id

              return (
                <Box
                  key={project.id}
                  sx={{
                    position: 'absolute',

                    left: `${project.mapPosition.x}%`,
                    top: `${project.mapPosition.y}%`,

                    transform:
                      'translate(-50%, -50%)',

                    zIndex: isActive ? 5 : 3,

                    '&:hover .project-label': {
                      opacity: 1,
                      transform:
                        'translate(-50%, -12px)',
                      pointerEvents: 'auto',
                    },
                  }}
                >
                  {/* Pulse */}
                  {isActive && (
                    <Box
                      sx={{
                        position: 'absolute',

                        width: 32,
                        height: 32,

                        left: '50%',
                        top: '50%',

                        transform:
                          'translate(-50%, -50%)',

                        borderRadius: '50%',

                        border:
                          '1px solid rgba(154,123,79,0.55)',

                        animation:
                          'fbsMapPulse 2.6s ease-out infinite',

                        '@keyframes fbsMapPulse': {
                          '0%': {
                            transform:
                              'translate(-50%, -50%) scale(0.55)',
                            opacity: 0.65,
                          },

                          '100%': {
                            transform:
                              'translate(-50%, -50%) scale(1.7)',
                            opacity: 0,
                          },
                        },
                      }}
                    />
                  )}

                  {/* Actual clickable pin */}
                  <Box
                    component="button"
                    type="button"

                    aria-label={`View ${project.name}`}
                    aria-pressed={isActive}

                    onClick={() =>
                      setActiveProjectId(project.id)
                    }

                    sx={{
                      flexShrink: 0,
                      position: 'relative',

                      width: isActive ? 20 : 16,
                      height: isActive ? 20 : 16,

                      display: 'block',

                      p: 0,

                      borderRadius: '50%',

                      border: '4px solid #fff',

                      bgcolor: isActive
                        ? 'secondary.main'
                        : '#082F4D',

                      opacity:
                        activeProject
                          ? isActive
                            ? 1
                            : 0.72
                          : 1,

                      boxShadow:
                        '0 2px 10px rgba(0,0,0,0.18)',

                      cursor: 'pointer',

                      transition:
                        'transform 180ms ease, background-color 180ms ease',

                      '&:hover': {
                        transform: 'scale(1.3)',
                      },

                      '&:focus-visible': {
                        outline:
                          '3px solid rgba(154,123,79,0.35)',
                        outlineOffset: 4,
                      },
                    }}
                  />

                  {/* Project Preview */}
                  <Box
                    className="project-label"
                    sx={{
                      position: 'absolute',

                      left: '50%',
                      bottom: '100%',

                      transform:
                        'translate(-50%, -5px)',

                      mb: 1.4,

                      width: 220,

                      bgcolor: '#082F4D',
                      color: '#fff',

                      opacity: 0,

                      pointerEvents: 'none',

                      overflow: 'hidden',

                      transition:
                        'opacity 180ms ease, transform 180ms ease',

                      boxShadow:
                        '0 18px 45px rgba(0,0,0,0.22)',

                      zIndex: 30,

                      '&::after': {
                        content: '""',

                        position: 'absolute',

                        left: '50%',
                        top: '100%',

                        transform:
                          'translateX(-50%)',

                        borderLeft:
                          '7px solid transparent',

                        borderRight:
                          '7px solid transparent',

                        borderTop:
                          '7px solid #082F4D',
                      },
                    }}
                  >
                    {project.coverImage && (
                      <Box
                        component="img"
                        src={project.coverImage}
                        alt={project.name}
                        sx={{
                          width: '100%',
                          height: 115,

                          display: 'block',

                          objectFit: 'cover',
                        }}
                      />
                    )}

                    <Box sx={{ p: 1.7 }}>
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          fontWeight: 700,
                        }}
                      >
                        {project.name}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.4,

                          fontSize: '0.72rem',

                          color:
                            'rgba(255,255,255,0.58)',
                        }}
                      >
                        {project.city}
                        {' · '}
                        {project.category}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',

              mt: 2,
              pt: 2,

              borderTop:
                '1px solid rgba(23,23,23,0.08)',
            }}
          >
            <Typography
              sx={{
                color: 'text.secondary',

                fontSize: '0.7rem',

                letterSpacing: 1.5,

                textTransform: 'uppercase',
              }}
            >
              Kingdom of Saudi Arabia
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: '0.75rem',
              }}
            >
              {filteredProjects.length}{' '}
              {filteredProjects.length === 1
                ? 'Project'
                : 'Projects'}
            </Typography>
          </Box>
        </Box>

        {/* Project Details */}
        <Box
          sx={{
            bgcolor: '#082F4D',
            color: '#fff',

            p: {
              xs: 4,
              md: 5,
            },

            minHeight: {
              xs: 360,
              lg: 'auto',
            },

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {selectedProject ? (
            <>
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color:
                      'rgba(255,255,255,0.42)',

                    letterSpacing: 1.6,
                  }}
                >
                  Selected Project
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,

                    mt: 3,
                    mb: 4,
                  }}
                >
                  <Chip
                    label={selectedProject.category}
                    size="small"
                    sx={{
                      bgcolor:
                        'rgba(255,255,255,0.09)',

                      color: '#fff',
                    }}
                  />

                  {selectedProject.status && (
                    <Chip
                      label={selectedProject.status}
                      size="small"

                      sx={{
                        bgcolor:
                          'rgba(154,123,79,0.18)',

                        color: '#D8BE96',
                      }}
                    />
                  )}
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    maxWidth: 380,

                    fontSize: {
                      xs: '2.2rem',
                      md: '3rem',
                    },

                    lineHeight: 1.05,
                  }}
                >
                  {selectedProject.name}
                </Typography>

                <Typography
                  sx={{
                    mt: 2,

                    color:
                      'rgba(255,255,255,0.5)',

                    fontSize: '0.95rem',
                  }}
                >
                  {selectedProject.city}
                  {' · '}
                  {selectedProject.region}
                </Typography>

                {selectedProject.shortDescription && (
                  <Typography
                    sx={{
                      mt: 4,

                      maxWidth: 420,

                      lineHeight: 1.75,

                      color:
                        'rgba(255,255,255,0.68)',
                    }}
                  >
                    {selectedProject.shortDescription}
                  </Typography>
                )}
              </Box>

              <Button
                variant="contained"
                onClick={() => {
                  if (!selectedProject) return

                  navigate(
                    `/contracting/concept-a/projects/${selectedProject.slug}`,
                  )
                }}
                sx={{
                  mt: 6,
                  alignSelf: 'flex-start',
                  bgcolor: '#fff',
                  color: '#082F4D',
                  px: 3,

                  '&:hover': {
                    bgcolor: '#E8E8E8',
                  },
                }}
              >
                View Project
              </Button>
            </>
          ) : (
            <Typography>
              No projects available.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ExecutiveProjectMap