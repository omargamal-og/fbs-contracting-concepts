import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import { contractingContent } from '../../../data/content'
import { projects } from '../../../core/data/projects'

function ExecutiveAbout() {
  const aboutImage =
    projects.find(
      (project) => project.slug === 'malfa-al-asala',
    )?.coverImage

  return (
    <>
      <Box
        id="about"
        component="section"
        sx={{
          py: {
            xs: 10,
            md: 16,
          },

          scrollMarginTop: {
            xs: 72,
            md: 84,
          },

          bgcolor: 'background.paper',
        }}
      >
        <Container>
          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                lg: '0.85fr 1.15fr',
              },

              gap: {
                xs: 7,
                lg: 12,
              },

              alignItems: 'center',
            }}
          >
            {/* Content */}
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: 'secondary.main',
                  fontWeight: 700,
                  letterSpacing: 2.4,
                }}
              >
                {contractingContent.about.eyebrow}
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  mt: 2.5,

                  maxWidth: 700,

                  fontSize: {
                    xs: '2.8rem',
                    md: '4.6rem',
                  },

                  lineHeight: 1.02,
                }}
              >
                {contractingContent.about.title}
              </Typography>

              <Typography
                sx={{
                  mt: 4,

                  maxWidth: 620,

                  color: 'text.secondary',

                  fontSize: {
                    xs: '1rem',
                    md: '1.12rem',
                  },

                  lineHeight: 1.85,
                }}
              >
                {contractingContent.about.description}
              </Typography>

              <Box
                sx={{
                  mt: 6,

                  display: 'grid',

                  gridTemplateColumns: {
                    xs: '1fr 1fr',
                    sm: 'repeat(3, 1fr)',
                  },

                  gap: 3,
                }}
              >
                {[
                  ['01', 'Quality'],
                  ['02', 'Safety'],
                  ['03', 'Integrity'],
                ].map(([number, label]) => (
                  <Box
                    key={number}
                    sx={{
                      pt: 2.5,

                      borderTop: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'secondary.main',

                        fontSize: '0.72rem',
                        fontWeight: 700,

                        letterSpacing: 1.5,
                      }}
                    >
                      {number}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Image */}
            <Box
              sx={{
                position: 'relative',

                minHeight: {
                  xs: 420,
                  md: 620,
                },
              }}
            >
              {aboutImage && (
                <Box
                  component="img"
                  src={aboutImage}
                  alt="FBS Contracting project"
                  sx={{
                    width: '100%',
                    height: '100%',

                    position: 'absolute',
                    inset: 0,

                    objectFit: 'cover',
                  }}
                />
              )}

              {/* Image overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,

                  background:
                    'linear-gradient(0deg, rgba(0,0,0,0.32), transparent 55%)',
                }}
              />

              {/* Floating statement */}
              <Box
                sx={{
                  position: 'absolute',

                  left: {
                    xs: 20,
                    md: -45,
                  },

                  bottom: {
                    xs: 20,
                    md: 50,
                  },

                  width: {
                    xs: 'calc(100% - 40px)',
                    md: 310,
                  },

                  bgcolor: '#082F4D',
                  color: '#fff',

                  p: {
                    xs: 3,
                    md: 4,
                  },

                  boxShadow:
                    '0 24px 70px rgba(0,0,0,0.18)',
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: '#649ABD',
                    letterSpacing: 1.8,
                  }}
                >
                  Our Approach
                </Typography>

                <Typography
                  sx={{
                    mt: 2,

                    fontSize: {
                      xs: '1.25rem',
                      md: '1.5rem',
                    },

                    lineHeight: 1.45,
                  }}
                >
                  Building relationships as carefully as we
                  build projects.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats */}
      <Box
        component="section"
        sx={{
          bgcolor: '#082F4D',
          color: '#fff',
        }}
      >
        <Container>
          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(3, 1fr)',
              },
            }}
          >
            {contractingContent.stats.map((stat, index) => (
              <Box
                key={stat.label}
                sx={{
                  py: {
                    xs: 5,
                    md: 7,
                  },

                  px: {
                    xs: 0,
                    sm: 4,
                  },

                  borderBottom: {
                    xs: '1px solid rgba(255,255,255,0.1)',
                    sm: 0,
                  },

                  borderRight: {
                    xs: 0,
                    sm:
                      index <
                      contractingContent.stats.length - 1
                        ? '1px solid rgba(255,255,255,0.1)'
                        : 0,
                  },

                  '&:first-of-type': {
                    pl: {
                      sm: 0,
                    },
                  },

                  '&:last-of-type': {
                    pr: {
                      sm: 0,
                    },
                  },
                }}
              >
                <Typography
                  sx={{
                    color: '#649ABD',

                    fontSize: {
                      xs: '3.5rem',
                      md: '5rem',
                    },

                    fontWeight: 500,

                    letterSpacing: '-0.04em',

                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </Typography>

                <Typography
                  sx={{
                    mt: 1.5,

                    color:
                      'rgba(255,255,255,0.55)',

                    fontSize: '0.85rem',

                    letterSpacing: 0.5,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default ExecutiveAbout