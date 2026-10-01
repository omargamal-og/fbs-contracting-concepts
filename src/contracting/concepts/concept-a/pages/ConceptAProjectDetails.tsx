import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Typography,
} from '@mui/material'

import { ThemeProvider } from '@mui/material/styles'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import { projects } from '../../../core/data/projects'
import { conceptATheme } from '../../../themes/conceptATheme'

import Reveal from '../../../core/components/Reveal'

import ExecutiveHeader from '../components/ExecutiveHeader'
import ExecutiveCTA from '../components/ExecutiveCTA'
import ExecutiveFooter from '../components/ExecutiveFooter'

function ConceptAProjectDetails() {
  const navigate = useNavigate()
  const { slug } = useParams()

  const projectIndex = projects.findIndex(
    (project) => project.slug === slug,
  )

  const project =
    projectIndex >= 0
      ? projects[projectIndex]
      : null

  const nextProject =
    projectIndex >= 0
      ? projects[
          (projectIndex + 1) % projects.length
        ]
      : null

  if (!project) {
    return (
      <ThemeProvider theme={conceptATheme}>
        <CssBaseline />

        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
          }}
        >
          <Container
            sx={{
              minHeight: '100vh',

              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: 'secondary.main',
                letterSpacing: 2,
              }}
            >
              404
            </Typography>

            <Typography
              variant="h1"
              sx={{
                mt: 2,

                fontSize: {
                  xs: '3rem',
                  md: '6rem',
                },
              }}
            >
              Project not found.
            </Typography>

            <Button
              onClick={() =>
                navigate(
                  '/contracting/concept-a',
                )
              }
              sx={{ mt: 5 }}
            >
              ← Back to Contracting
            </Button>
          </Container>
        </Box>
      </ThemeProvider>
    )
  }

  const gallery =
    project.gallery?.length
      ? project.gallery
      : project.coverImage
        ? [project.coverImage]
        : []

  return (
    <ThemeProvider theme={conceptATheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          overflowX: 'hidden',
        }}
      >
        <ExecutiveHeader />

        {/* Project Hero */}
        <Box
          component="section"
          sx={{
            position: 'relative',

            minHeight: {
              xs: '82vh',
              md: '100vh',
            },

            display: 'flex',
            alignItems: 'flex-end',

            bgcolor: '#171717',
            color: '#fff',

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

                transform: 'scale(1.03)',
              }}
            />
          )}

          {/* Image overlays */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,

              background:
                'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.10) 32%, rgba(0,0,0,0.88) 100%)',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,

              background:
                'linear-gradient(90deg, rgba(0,0,0,0.58) 0%, transparent 65%)',
            }}
          />

          <Container
            sx={{
              position: 'relative',
              zIndex: 2,

              pb: {
                xs: 7,
                md: 10,
              },

              pt: {
                xs: 16,
                md: 20,
              },
            }}
          >
            <Button
              onClick={() =>
                navigate(
                  '/contracting/concept-a',
                )
              }
              sx={{
                mb: 5,

                px: 0,

                color:
                  'rgba(255,255,255,0.7)',

                '&:hover': {
                  color: '#fff',
                  bgcolor: 'transparent',
                },
              }}
            >
              ← Back to Projects
            </Button>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,

                mb: 3,
              }}
            >
              <Chip
                label={project.category}
                sx={{
                  bgcolor:
                    'rgba(255,255,255,0.12)',

                  color: '#fff',

                  backdropFilter:
                    'blur(10px)',
                }}
              />

              {project.status && (
                <Chip
                  label={project.status}
                  variant="outlined"
                  sx={{
                    color: '#fff',

                    borderColor:
                      'rgba(255,255,255,0.35)',
                  }}
                />
              )}
            </Box>

            <Typography
              component="h1"
              sx={{
                maxWidth: 1000,

                fontSize: {
                  xs: '3.5rem',
                  sm: '5rem',
                  md: '7.5rem',
                },

                fontWeight: 600,

                lineHeight: 0.92,

                letterSpacing:
                  '-0.055em',
              }}
            >
              {project.name}
            </Typography>

            <Typography
              sx={{
                mt: 4,

                color:
                  'rgba(255,255,255,0.7)',

                fontSize: {
                  xs: '1rem',
                  md: '1.15rem',
                },

                letterSpacing: 0.5,
              }}
            >
              {project.city}
              {' · '}
              {project.region}
              {' · '}
              Saudi Arabia
            </Typography>
          </Container>
        </Box>

        {/* Project Information */}
        <Reveal>
          <Box
            component="section"
            sx={{
              py: {
                xs: 9,
                md: 15,
              },

              bgcolor:
                'background.paper',
            }}
          >
            <Container>
              <Box
                sx={{
                  display: 'grid',

                  gridTemplateColumns: {
                    xs: '1fr',
                    lg: '0.65fr 1.35fr',
                  },

                  gap: {
                    xs: 6,
                    lg: 12,
                  },
                }}
              >
                {/* Meta */}
                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color:
                        'secondary.main',

                      fontWeight: 700,
                      letterSpacing: 2,
                    }}
                  >
                    Project Information
                  </Typography>

                  <Box
                    sx={{
                      mt: 4,

                      borderTop:
                        '1px solid',

                      borderColor:
                        'divider',
                    }}
                  >
                    {[
                      [
                        'Location',
                        `${project.city}, Saudi Arabia`,
                      ],

                      [
                        'Region',
                        project.region,
                      ],

                      [
                        'Sector',
                        project.category,
                      ],

                      [
                        'Status',
                        project.status ??
                          '—',
                      ],
                    ].map(
                      ([label, value]) => (
                        <Box
                          key={label}
                          sx={{
                            py: 2.5,

                            display:
                              'grid',

                            gridTemplateColumns:
                              '110px 1fr',

                            gap: 2,

                            borderBottom:
                              '1px solid',

                            borderColor:
                              'divider',
                          }}
                        >
                          <Typography
                            sx={{
                              color:
                                'text.secondary',

                              fontSize:
                                '0.78rem',
                            }}
                          >
                            {label}
                          </Typography>

                          <Typography
                            sx={{
                              fontWeight: 600,
                            }}
                          >
                            {value}
                          </Typography>
                        </Box>
                      ),
                    )}
                  </Box>
                </Box>

                {/* Overview */}
                <Box>
                  <Typography
                    variant="h2"
                    sx={{
                      maxWidth: 800,

                      fontSize: {
                        xs: '2.7rem',
                        md: '4.8rem',
                      },

                      lineHeight: 1.04,
                    }}
                  >
                    Building places designed
                    for lasting value.
                  </Typography>

                  <Typography
                    sx={{
                      mt: 5,

                      maxWidth: 700,

                      color:
                        'text.secondary',

                      fontSize: {
                        xs: '1rem',
                        md: '1.14rem',
                      },

                      lineHeight: 1.9,
                    }}
                  >
                    {project.shortDescription ??
                      `${project.name} is part of FBS Contracting's portfolio of projects across Saudi Arabia.`}
                  </Typography>
                </Box>
              </Box>
            </Container>
          </Box>
        </Reveal>

        {/* Main Feature Image */}
        {gallery[0] && (
          <Reveal>
            <Box
              component="section"
              sx={{
                px: {
                  xs: 2,
                  md: 4,
                },

                pb: {
                  xs: 2,
                  md: 4,
                },

                bgcolor:
                  'background.paper',
              }}
            >
              <Box
                component="img"
                src={gallery[0]}
                alt={project.name}
                sx={{
                  display: 'block',

                  width: '100%',

                  height: {
                    xs: 420,
                    md: '80vh',
                  },

                  minHeight: {
                    md: 620,
                  },

                  objectFit: 'cover',
                }}
              />
            </Box>
          </Reveal>
        )}

        {/* Gallery */}
        {gallery.length > 1 && (
          <Reveal>
            <Box
              component="section"
              sx={{
                py: {
                  xs: 8,
                  md: 14,
                },
              }}
            >
              <Container>
                <Typography
                  variant="overline"
                  sx={{
                    color:
                      'secondary.main',

                    fontWeight: 700,

                    letterSpacing: 2,
                  }}
                >
                  Project Gallery
                </Typography>

                <Typography
                  variant="h2"
                  sx={{
                    mt: 2,

                    mb: {
                      xs: 5,
                      md: 8,
                    },

                    fontSize: {
                      xs: '2.8rem',
                      md: '4.5rem',
                    },
                  }}
                >
                  A closer look.
                </Typography>

                <Box
                  sx={{
                    display: 'grid',

                    gridTemplateColumns: {
                      xs: '1fr',
                      md: 'repeat(2, 1fr)',
                    },

                    gap: {
                      xs: 2,
                      md: 3,
                    },
                  }}
                >
                  {gallery
                    .slice(1)
                    .map(
                      (
                        image,
                        index,
                      ) => (
                        <Box
                          key={image}
                          component="img"
                          src={image}
                          alt={`${project.name} ${index + 2}`}
                          sx={{
                            display:
                              'block',

                            width: '100%',

                            height: {
                              xs: 330,
                              md:
                                index %
                                  3 ===
                                0
                                  ? 620
                                  : 460,
                            },

                            objectFit:
                              'cover',

                            gridColumn: {
                              md:
                                index %
                                  3 ===
                                0
                                  ? 'span 2'
                                  : 'span 1',
                            },
                          }}
                        />
                      ),
                    )}
                </Box>
              </Container>
            </Box>
          </Reveal>
        )}

        {/* Project Statement */}
        <Reveal>
          <Box
            component="section"
            sx={{
              py: {
                xs: 10,
                md: 16,
              },

              bgcolor: '#171717',
              color: '#fff',
            }}
          >
            <Container>
              <Typography
                variant="overline"
                sx={{
                  color: '#D0B382',

                  letterSpacing: 2.2,
                }}
              >
                FBS Contracting
              </Typography>

              <Typography
                sx={{
                  mt: 3,

                  maxWidth: 1000,

                  fontSize: {
                    xs: '2.5rem',
                    md: '5.2rem',
                  },

                  lineHeight: 1.07,

                  letterSpacing:
                    '-0.04em',
                }}
              >
                Quality in execution.
                Responsibility in every
                detail.
              </Typography>
            </Container>
          </Box>
        </Reveal>

        {/* Next Project */}
        {nextProject && (
          <Box
            component="section"
            onClick={() => {
              navigate(
                `/contracting/concept-a/projects/${nextProject.slug}`,
              )

              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }}
            sx={{
              position: 'relative',

              minHeight: {
                xs: 460,
                md: 600,
              },

              display: 'flex',
              alignItems: 'flex-end',

              bgcolor: '#222',
              color: '#fff',

              cursor: 'pointer',

              overflow: 'hidden',

              '&:hover .next-image': {
                transform:
                  'scale(1.055)',
              },

              '&:hover .next-arrow': {
                transform:
                  'translateX(12px)',
              },
            }}
          >
            {nextProject.coverImage && (
              <Box
                className="next-image"
                component="img"
                src={
                  nextProject.coverImage
                }
                alt={nextProject.name}
                sx={{
                  position: 'absolute',
                  inset: 0,

                  width: '100%',
                  height: '100%',

                  objectFit: 'cover',

                  transition:
                    'transform 900ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
            )}

            <Box
              sx={{
                position: 'absolute',
                inset: 0,

                background:
                  'linear-gradient(0deg, rgba(0,0,0,0.88), rgba(0,0,0,0.15) 70%)',
              }}
            />

            <Container
              sx={{
                position: 'relative',
                zIndex: 2,

                pb: {
                  xs: 6,
                  md: 9,
                },
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color:
                    'rgba(255,255,255,0.55)',

                  letterSpacing: 2,
                }}
              >
                Next Project
              </Typography>

              <Box
                sx={{
                  mt: 2,

                  display: 'flex',

                  justifyContent:
                    'space-between',

                  alignItems:
                    'flex-end',

                  gap: 4,
                }}
              >
                <Typography
                  sx={{
                    maxWidth: 850,

                    fontSize: {
                      xs: '3rem',
                      md: '6rem',
                    },

                    fontWeight: 600,

                    lineHeight: 0.98,

                    letterSpacing:
                      '-0.045em',
                  }}
                >
                  {nextProject.name}
                </Typography>

                <Typography
                  className="next-arrow"
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'block',
                    },

                    fontSize: '4rem',

                    transition:
                      'transform 250ms ease',
                  }}
                >
                  →
                </Typography>
              </Box>
            </Container>
          </Box>
        )}

        <Reveal>
          <ExecutiveCTA />
        </Reveal>

        <ExecutiveFooter />
      </Box>
    </ThemeProvider>
  )
}

export default ConceptAProjectDetails