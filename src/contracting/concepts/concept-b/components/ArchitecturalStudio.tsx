import { Box } from '@mui/material'

import Reveal from '../../../core/components/Reveal'
import { projects } from '../../../core/data/projects'

function ArchitecturalStudio() {
  const studioProject =
    projects.find(
      (project) => project.slug === 'malfa-al-asala',
    ) ?? projects[0]

  if (!studioProject) {
    return null
  }

  return (
    <Box
      id="about"
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
              Our Approach
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
                    md: '5.2rem',
                    lg: '6rem',
                  },

                  fontWeight: 500,

                  lineHeight: 0.98,

                  letterSpacing: '-0.055em',
                }}
              >
                Built around
                <br />
                the way people live.
              </Box>
            </Box>
          </Box>
        </Reveal>


        {/* Main story */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(0, 1.45fr) minmax(360px, 0.55fr)',
            },

            gap: {
              xs: 5,
              lg: 6,
            },

            alignItems: 'stretch',
          }}
        >
          {/* Large visual */}

          <Reveal distance={24}>
            <Box
              sx={{
                position: 'relative',

                minHeight: {
                  xs: 460,
                  sm: 620,
                  lg: 760,
                },

                overflow: 'hidden',

                bgcolor: '#082F4D',
              }}
            >
              {studioProject.coverImage && (
                <Box
                  component="img"
                  src={studioProject.coverImage}
                  alt={studioProject.name}
                  loading="lazy"
                  sx={{
                    position: 'absolute',
                    inset: 0,

                    width: '100%',
                    height: '100%',

                    objectFit: 'cover',

                    filter:
                      'saturate(0.88) contrast(1.03)',
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
                      rgba(8,47,77,0.02) 40%,
                      rgba(8,47,77,0.68) 100%
                    )
                  `,
                }}
              />

              {/* Image caption */}

              <Box
                sx={{
                  position: 'absolute',

                  left: {
                    xs: 20,
                    md: 28,
                  },

                  right: {
                    xs: 20,
                    md: 28,
                  },

                  bottom: {
                    xs: 20,
                    md: 28,
                  },

                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'end',

                  gap: 3,

                  color: '#FFFFFF',
                }}
              >
                <Box>
                  <Box
                    sx={{
                      mb: 0.8,

                      color: '#B9DAF2',

                      fontSize: '0.56rem',
                      fontWeight: 700,

                      letterSpacing: '0.13em',

                      textTransform: 'uppercase',
                    }}
                  >
                    Built Environment
                  </Box>

                  <Box
                    sx={{
                      fontSize: {
                        xs: '1.8rem',
                        md: '2.2rem',
                      },

                      fontWeight: 500,

                      letterSpacing: '-0.04em',
                    }}
                  >
                    {studioProject.name}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'block',
                    },

                    color:
                      'rgba(255,255,255,0.7)',

                    fontSize: '0.6rem',

                    letterSpacing: '0.1em',

                    textTransform: 'uppercase',

                    textAlign: 'right',
                  }}
                >
                  {studioProject.city}
                  <br />
                  Saudi Arabia
                </Box>
              </Box>
            </Box>
          </Reveal>


          {/* Story panel */}

          <Reveal
            delay={80}
            distance={20}
          >
            <Box
              sx={{
                height: '100%',

                display: 'flex',
                flexDirection: 'column',

                px: {
                  lg: 2,
                },

                pt: {
                  lg: 3,
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 2,

                  mb: 4,

                  bgcolor: '#649ABD',
                }}
              />

              <Box
                component="h3"
                sx={{
                  m: 0,

                  mb: 3,

                  maxWidth: 440,

                  fontSize: {
                    xs: '2rem',
                    md: '2.6rem',
                    lg: '3.1rem',
                  },

                  fontWeight: 500,

                  lineHeight: 1.05,

                  letterSpacing: '-0.045em',
                }}
              >
                Quality is not a layer
                added at the end.
              </Box>


              <Box
                sx={{
                  maxWidth: 470,

                  color: 'text.secondary',

                  fontSize: {
                    xs: '0.92rem',
                    md: '1rem',
                  },

                  lineHeight: 1.85,
                }}
              >
                It begins with how a project is planned,
                coordinated and delivered. FBS Contracting
                brings those stages together with a clear
                focus on precision, responsibility and
                long-term performance.
              </Box>


              {/* Principles */}

              <Box
                sx={{
                  mt: {
                    xs: 6,
                    lg: 'auto',
                  },

                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                {[
                  {
                    number: '01',
                    title: 'Precision',
                    description:
                      'Clear coordination from planning through execution.',
                  },

                  {
                    number: '02',
                    title: 'Responsibility',
                    description:
                      'Consistent attention to quality and delivery.',
                  },

                  {
                    number: '03',
                    title: 'Continuity',
                    description:
                      'A long-term view of performance and value.',
                  },
                ].map((item) => (
                  <Box
                    key={item.number}
                    sx={{
                      py: 2.5,

                      display: 'grid',

                      gridTemplateColumns:
                        '44px 1fr',

                      gap: 2,

                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box
                      sx={{
                        color: '#649ABD',

                        fontSize: '0.58rem',
                        fontWeight: 700,

                        pt: 0.35,
                      }}
                    >
                      {item.number}
                    </Box>

                    <Box>
                      <Box
                        sx={{
                          mb: 0.6,

                          fontSize: '1rem',
                          fontWeight: 700,
                        }}
                      >
                        {item.title}
                      </Box>

                      <Box
                        sx={{
                          maxWidth: 360,

                          color: 'text.secondary',

                          fontSize: '0.76rem',
                          lineHeight: 1.65,
                        }}
                      >
                        {item.description}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        </Box>


        {/* Closing statement */}

        <Reveal distance={18}>
          <Box
            sx={{
              mt: {
                xs: 7,
                md: 10,
              },

              pt: {
                xs: 4,
                md: 5,
              },

              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                md: '220px 1fr',
              },

              gap: {
                xs: 2,
                md: 6,
              },

              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                color: 'text.secondary',

                fontSize: '0.58rem',
                fontWeight: 700,

                letterSpacing: '0.13em',

                textTransform: 'uppercase',
              }}
            >
              FBS Contracting
            </Box>

            <Box
              sx={{
                maxWidth: 940,

                fontSize: {
                  xs: '1.65rem',
                  sm: '2.1rem',
                  md: '2.8rem',
                },

                fontWeight: 500,

                lineHeight: 1.2,

                letterSpacing: '-0.04em',
              }}
            >
              Every project is an opportunity to create
              something that performs well today and
              continues to matter tomorrow.
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  )
}

export default ArchitecturalStudio