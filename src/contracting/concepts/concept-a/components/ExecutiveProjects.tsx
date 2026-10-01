import {
  Box,
  Button,
  Chip,
  Container,
  Typography,
} from '@mui/material'

import { useNavigate } from 'react-router-dom'

import { projects } from '../../../core/data/projects'

function ExecutiveProjects() {
  const navigate = useNavigate()

  const selectedProjects = projects.slice(0, 4)

  return (
    <Box
      id="projects"
      component="section"
      sx={{
        bgcolor: 'background.paper',

        py: {
          xs: 10,
          md: 16,
        },

        scrollMarginTop: {
          xs: 72,
          md: 84,
        },
        
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: '0.7fr 1.3fr',
            },

            gap: {
              xs: 4,
              md: 10,
            },

            mb: {
              xs: 7,
              md: 10,
            },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: 'secondary.main',
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            Selected Projects
          </Typography>

          <Box>
            <Typography
              variant="h2"
              sx={{
                maxWidth: 780,

                fontSize: {
                  xs: '2.7rem',
                  md: '3.8rem',
                  lg: '4.5rem',
                },

                lineHeight: 1.05,
              }}
            >
              A portfolio shaped across the Kingdom.
            </Typography>

            <Typography
              sx={{
                mt: 3,

                maxWidth: 620,

                color: 'text.secondary',

                fontSize: '1.05rem',

                lineHeight: 1.8,
              }}
            >
              Selected residential developments representing
              FBS Contracting&apos;s growing construction
              footprint across Saudi Arabia.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {selectedProjects.map((project, index) => (
            <Box
              key={project.id}
              component="article"

              onClick={() =>
                navigate(
                  `/contracting/concept-a/projects/${project.slug}`,
                )
              }

              sx={{
                position: 'relative',

                display: 'grid',

                gridTemplateColumns: {
                  xs: '1fr',
                  md: '80px 1fr 250px',
                },

                gap: {
                  xs: 2,
                  md: 4,
                },

                alignItems: 'center',

                py: {
                  xs: 4,
                  md: 5,
                },

                borderBottom: '1px solid',
                borderColor: 'divider',

                cursor: 'pointer',

                overflow: 'hidden',

                transition:
                  'padding 250ms ease, background-color 250ms ease',

                '&:hover': {
                  bgcolor: '#F0ECE4',
                },

                '&:hover .project-image': {
                  opacity: 1,
                  transform:
                    'translateY(-50%) scale(1)',
                },

                '&:hover .project-arrow': {
                  transform: 'translateX(8px)',
                },
              }}
            >
              {/* Number */}
              <Typography
                sx={{
                  color: 'text.secondary',

                  fontSize: '0.72rem',

                  letterSpacing: 1.5,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </Typography>

              {/* Project Info */}
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,

                    mb: 2,
                  }}
                >
                  <Chip
                    label={project.category}
                    size="small"
                  />

                  {project.status && (
                    <Chip
                      label={project.status}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    fontSize: {
                      xs: '2rem',
                      md: '3rem',
                    },

                    lineHeight: 1,

                    maxWidth: 650,
                  }}
                >
                  {project.name}
                </Typography>

                <Typography
                  sx={{
                    mt: 1.5,

                    color: 'text.secondary',

                    fontSize: '0.9rem',
                  }}
                >
                  {project.city}
                  {' · '}
                  {project.region}
                </Typography>
              </Box>

              {/* Action */}
              <Box
                sx={{
                  display: 'flex',

                  justifyContent: {
                    xs: 'flex-start',
                    md: 'flex-end',
                  },

                  alignItems: 'center',

                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.78rem',

                    fontWeight: 700,

                    letterSpacing: 1,

                    textTransform: 'uppercase',
                  }}
                >
                  View Project
                </Typography>

                <Typography
                  className="project-arrow"
                  sx={{
                    fontSize: '1.4rem',

                    transition:
                      'transform 200ms ease',
                  }}
                >
                  →
                </Typography>
              </Box>

              {/* Hover Image */}
              {project.coverImage && (
                <Box
                  className="project-image"
                  component="img"

                  src={project.coverImage}
                  alt={project.name}

                  sx={{
                    display: {
                      xs: 'none',
                      lg: 'block',
                    },

                    position: 'absolute',

                    right: 220,
                    top: '50%',

                    width: 220,
                    height: 145,

                    objectFit: 'cover',

                    opacity: 0,

                    pointerEvents: 'none',

                    transform:
                      'translateY(-50%) scale(0.94)',

                    transition:
                      'opacity 250ms ease, transform 300ms ease',

                    boxShadow:
                      '0 20px 50px rgba(0,0,0,0.16)',

                    zIndex: 3,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: {
              xs: 4,
              md: 6,
            },

            display: 'flex',

            justifyContent: {
              xs: 'stretch',
              md: 'flex-end',
            },
          }}
        >
          <Button
            variant="outlined"
            size="large"
            sx={{
              width: {
                xs: '100%',
                md: 'auto',
              },

              py: {
                xs: 1.6,
                md: 1.2,
              },
            }}
          >
            Explore All Projects
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default ExecutiveProjects