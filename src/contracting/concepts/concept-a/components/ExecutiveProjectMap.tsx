import {
  Box,
  Button,
  Chip,
  Typography,
} from '@mui/material'

import { projects } from '../../../core/data/projects'
import { useProjectMap } from '../../../core/hooks/useProjectMap'

const regions = [
  'All',
  'Riyadh',
  'Makkah',
  'Madinah',
  'Tabuk',
] as const

function ExecutiveProjectMap() {
  const {
    activeRegion,
    setActiveRegion,
    activeProject,
    setActiveProjectId,
    filteredProjects,
  } = useProjectMap(projects)

  const selectedProject =
    activeProject ?? filteredProjects[0] ?? null

  return (
    <Box>
      {/* Region Filters */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.2,
          mb: 5,
        }}
      >
        {regions.map((region) => {
          const isActive = activeRegion === region

          return (
            <Button
              key={region}
              size="small"
              variant={isActive ? 'contained' : 'outlined'}
              onClick={() => {
                setActiveRegion(region)
                setActiveProjectId(null)
              }}
              sx={{
                minWidth: 86,
                height: 44,

                borderColor: isActive
                  ? 'primary.main'
                  : 'rgba(23,23,23,0.25)',

                bgcolor: isActive
                  ? 'primary.main'
                  : 'transparent',

                color: isActive
                  ? '#fff'
                  : 'text.primary',

                '&:hover': {
                  bgcolor: isActive
                    ? 'primary.main'
                    : 'rgba(23,23,23,0.04)',
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
            lg: 'minmax(0, 1.45fr) minmax(320px, 0.65fr)',
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
              md: 4,
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
              maxWidth: 780,

              mx: 'auto',
            }}
          >
            <Box
              component="img"
              src="/maps/saudi-arabia.svg"
              alt="Saudi Arabia project locations"
              sx={{
                width: '100%',
                height: 'auto',

                display: 'block',

                opacity: 0.88,

                filter:
                  'sepia(0.1) saturate(0.72) brightness(0.93)',

                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />

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
                          'fbsMapPulse 1.8s ease-out infinite',

                        '@keyframes fbsMapPulse': {
                          '0%': {
                            transform:
                              'translate(-50%, -50%) scale(0.55)',
                            opacity: 1,
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
                      position: 'relative',

                      width: isActive ? 20 : 16,
                      height: isActive ? 20 : 16,

                      display: 'block',

                      p: 0,

                      borderRadius: '50%',

                      border: '4px solid #fff',

                      bgcolor: isActive
                        ? 'secondary.main'
                        : '#171717',

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

                  {/* Hover label */}
                  <Box
                    className="project-label"
                    sx={{
                      position: 'absolute',

                      left: '50%',
                      bottom: '100%',

                      transform:
                        'translate(-50%, -4px)',

                      mb: 1.5,

                      minWidth: 150,

                      bgcolor: '#171717',
                      color: '#fff',

                      px: 2,
                      py: 1.2,

                      opacity: 0,

                      pointerEvents: 'none',

                      transition:
                        'opacity 160ms ease, transform 160ms ease',

                      boxShadow:
                        '0 12px 30px rgba(0,0,0,0.16)',

                      '&::after': {
                        content: '""',

                        position: 'absolute',

                        left: '50%',
                        top: '100%',

                        transform:
                          'translateX(-50%)',

                        borderLeft:
                          '6px solid transparent',
                        borderRight:
                          '6px solid transparent',
                        borderTop:
                          '6px solid #171717',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {project.name}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.3,

                        fontSize: '0.72rem',

                        color:
                          'rgba(255,255,255,0.58)',
                      }}
                    >
                      {project.city}
                    </Typography>
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
            bgcolor: '#171717',
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
                sx={{
                  mt: 6,

                  alignSelf: 'flex-start',

                  bgcolor: '#fff',
                  color: '#171717',

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