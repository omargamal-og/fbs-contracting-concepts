import { Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import Reveal from '../../../core/components/Reveal'
import { projects } from '../../../core/data/projects'

function ArchitecturalProjects() {
  const featuredProject = projects[0]
  const remainingProjects = projects.slice(1)

  if (!featuredProject) {
    return null
  }

  return (
    <Box
      id="projects"
      component="section"
      sx={{
        scrollMarginTop: {
          xs: 72,
          md: 88,
        },

        bgcolor: '#FFFFFF',
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

          pt: {
            xs: 8,
            md: 12,
            lg: 14,
          },

          pb: {
            xs: 8,
            md: 12,
          },
        }}
      >
        {/* Section intro */}

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
                md: 9,
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
              Selected Projects
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
                Places shaped
                <br />
                with purpose.
              </Box>

              <Box
                sx={{
                  mt: 3,

                  maxWidth: 560,

                  color: 'text.secondary',

                  fontSize: {
                    xs: '0.9rem',
                    md: '1rem',
                  },

                  lineHeight: 1.8,
                }}
              >
                A selection of residential developments
                delivered across Saudi Arabia with a focus
                on quality, coordination and long-term value.
              </Box>
            </Box>
          </Box>
        </Reveal>


        {/* Main featured project */}

        <Reveal distance={24}>
          <Box
            component={RouterLink}
            to={`/contracting/concept-b/projects/${featuredProject.slug}`}
            aria-label={`View ${featuredProject.name}`}
            sx={{
              position: 'relative',

              display: 'block',

              minHeight: {
                xs: 460,
                sm: 600,
                md: 720,
                lg: 820,
              },

              overflow: 'hidden',

              bgcolor: '#082F4D',

              color: '#FFFFFF',
              textDecoration: 'none',

              '& .featured-image': {
                transition:
                  'transform 900ms cubic-bezier(.2,.7,.2,1)',
              },

              '&:hover .featured-image': {
                transform: 'scale(1.025)',
              },

              '&:hover .featured-arrow': {
                transform: 'translate(5px, -5px)',
              },

              '&:focus-visible': {
                outline: '3px solid #649ABD',
                outlineOffset: 5,
              },
            }}
          >
            {featuredProject.coverImage && (
              <Box
                className="featured-image"
                component="img"
                src={featuredProject.coverImage}
                alt={featuredProject.name}
                loading="lazy"
                sx={{
                  position: 'absolute',
                  inset: 0,

                  width: '100%',
                  height: '100%',

                  objectFit: 'cover',

                  transform: 'scale(1)',

                  filter:
                    'saturate(0.9) contrast(1.03)',
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
                    rgba(8,47,77,0.06) 30%,
                    rgba(8,47,77,0.74) 100%
                  )
                `,
              }}
            />

            {/* top caption */}

            <Box
              sx={{
                position: 'absolute',

                top: {
                  xs: 20,
                  md: 28,
                },

                left: {
                  xs: 20,
                  md: 28,
                },

                right: {
                  xs: 20,
                  md: 28,
                },

                display: 'flex',

                justifyContent: 'space-between',
                alignItems: 'center',

                gap: 2,

                color: 'rgba(255,255,255,0.75)',

                fontSize: '0.58rem',
                fontWeight: 700,

                letterSpacing: '0.13em',
                textTransform: 'uppercase',
              }}
            >
              <Box>
                Featured Project
              </Box>

              <Box>
                01 / {String(projects.length).padStart(2, '0')}
              </Box>
            </Box>


            {/* bottom content */}

            <Box
              sx={{
                position: 'absolute',

                left: {
                  xs: 20,
                  md: 32,
                },

                right: {
                  xs: 20,
                  md: 32,
                },

                bottom: {
                  xs: 22,
                  md: 34,
                },

                display: 'grid',

                gridTemplateColumns: {
                  xs: '1fr',
                  md: '1fr auto',
                },

                gap: {
                  xs: 3,
                  md: 5,
                },

                alignItems: 'end',
              }}
            >
              <Box>
                <Box
                  sx={{
                    mb: 1.2,

                    color: '#B9DAF2',

                    fontSize: '0.6rem',
                    fontWeight: 700,

                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  {featuredProject.city} — {featuredProject.region}
                </Box>

                <Box
                  component="h3"
                  sx={{
                    m: 0,

                    fontSize: {
                      xs: '2.5rem',
                      sm: '3.5rem',
                      md: '4.8rem',
                      lg: '5.8rem',
                    },

                    fontWeight: 500,

                    lineHeight: 0.94,

                    letterSpacing: '-0.055em',
                  }}
                >
                  {featuredProject.name}
                </Box>
              </Box>


              <Box
                sx={{
                  display: 'flex',

                  alignItems: 'center',

                  gap: 1.5,

                  pb: {
                    md: 0.8,
                  },

                  fontSize: '0.7rem',
                  fontWeight: 700,

                  letterSpacing: '0.08em',

                  whiteSpace: 'nowrap',
                }}
              >
                View Project

                <Box
                  className="featured-arrow"
                  component="span"
                  sx={{
                    fontSize: '1rem',

                    transition:
                      'transform 180ms ease',
                  }}
                >
                  ↗
                </Box>
              </Box>
            </Box>
          </Box>
        </Reveal>


        {/* Remaining projects */}

        <Box
          sx={{
            mt: {
              xs: 6,
              md: 9,
            },

            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, minmax(0, 1fr))',
            },

            gap: {
              xs: 6,
              md: 3,
              lg: 4,
            },
          }}
        >
          {remainingProjects.map(
            (project, index) => (
              <Reveal
                key={project.id}
                delay={index * 60}
                distance={20}
              >
                <ProjectTile
                  project={project}
                  index={index + 2}
                />
              </Reveal>
            ),
          )}
        </Box>
      </Box>
    </Box>
  )
}


function ProjectTile({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const projectUrl =
    `/contracting/concept-b/projects/${project.slug}`

  return (
    <Box
      component="article"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',

        pt: 2,
      }}
    >
      <Box
        component={RouterLink}
        to={projectUrl}
        aria-label={`View ${project.name}`}
        sx={{
          position: 'relative',

          display: 'block',

          height: {
            xs: 400,
            sm: 520,
            md: 580,
            lg: 650,
          },

          overflow: 'hidden',

          bgcolor: '#082F4D',

          color: '#FFFFFF',
          textDecoration: 'none',

          '& img': {
            transition:
              'transform 800ms cubic-bezier(.2,.7,.2,1)',
          },

          '&:hover img': {
            transform: 'scale(1.025)',
          },

          '&:focus-visible': {
            outline: '3px solid #649ABD',
            outlineOffset: 4,
          },
        }}
      >
        {project.coverImage && (
          <Box
            component="img"
            src={project.coverImage}
            alt={project.name}
            loading="lazy"
            sx={{
              width: '100%',
              height: '100%',

              objectFit: 'cover',

              transform: 'scale(1)',

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
              'linear-gradient(180deg, rgba(8,47,77,0.02) 45%, rgba(8,47,77,0.60) 100%)',
          }}
        />

        <Box
          sx={{
            position: 'absolute',

            top: 18,
            right: 18,

            color: 'rgba(255,255,255,0.74)',

            fontSize: '0.56rem',
            fontWeight: 700,

            letterSpacing: '0.12em',
          }}
        >
          {String(index).padStart(2, '0')}
        </Box>
      </Box>


      {/* Project information */}

      <Box
        sx={{
          pt: 2.5,

          display: 'grid',

          gridTemplateColumns: {
            xs: '1fr auto',
          },

          gap: 3,

          alignItems: 'start',
        }}
      >
        <Box>
          <Box
            component="h3"
            sx={{
              m: 0,

              mb: 1,

              fontSize: {
                xs: '1.7rem',
                md: '2rem',
                lg: '2.3rem',
              },

              fontWeight: 500,

              lineHeight: 1,

              letterSpacing: '-0.045em',
            }}
          >
            {project.name}
          </Box>

          <Box
            sx={{
              color: 'text.secondary',

              fontSize: '0.78rem',

              lineHeight: 1.6,
            }}
          >
            {project.city}
            {' / '}
            {project.region}
          </Box>
        </Box>


        <Box
          component={RouterLink}
          to={projectUrl}
          aria-label={`View ${project.name}`}
          sx={{
            display: 'inline-flex',

            alignItems: 'center',

            gap: 1,

            color: '#082F4D',

            textDecoration: 'none',

            fontSize: '0.65rem',
            fontWeight: 700,

            letterSpacing: '0.08em',

            '& span': {
              transition:
                'transform 180ms ease',
            },

            '&:hover': {
              color: '#649ABD',
            },

            '&:hover span': {
              transform:
                'translate(4px, -4px)',
            },

            '&:focus-visible': {
              outline: '2px solid #649ABD',
              outlineOffset: 5,
            },
          }}
        >
          View

          <Box component="span">
            ↗
          </Box>
        </Box>
      </Box>


      {/* metadata */}

      <Box
        sx={{
          mt: 2.5,

          pt: 2,

          display: 'grid',

          gridTemplateColumns: '1fr 1fr',

          gap: 2,

          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <ProjectMeta
          label="Sector"
          value={project.category}
        />

        <ProjectMeta
          label="Status"
          value={project.status ?? '—'}
        />
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
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        {value}
      </Box>
    </Box>
  )
}

export default ArchitecturalProjects