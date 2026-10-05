import { Box } from '@mui/material'

import Reveal from '../../../core/components/Reveal'
import { projects } from '../../../core/data/projects'
import { contractingContent } from '../../../data/content'

function ArchitecturalClosing() {
  const closingProject =
    projects.find(
      (project) => project.slug === 'malfa-jeddah',
    ) ?? projects[0]

  const scrollToProjects = () => {
    document
      .querySelector('#projects')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
  }

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        scrollMarginTop: {
          xs: 72,
          md: 88,
        },

        bgcolor: '#082F4D',
        color: '#FFFFFF',
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
            xs: 6,
            md: 8,
            lg: 10,
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(0, 0.85fr) minmax(520px, 1.15fr)',
            },

            gap: {
              xs: 5,
              lg: 6,
            },

            alignItems: 'stretch',
          }}
        >
          {/* Message */}

          <Reveal distance={20}>
            <Box
              sx={{
                height: '100%',

                display: 'flex',
                flexDirection: 'column',

                justifyContent: 'space-between',

                py: {
                  lg: 3,
                },
              }}
            >
              <Box>
                <Box
                  sx={{
                    mb: 4,

                    display: 'flex',
                    alignItems: 'center',

                    gap: 1.5,

                    color: '#B9DAF2',

                    fontSize: '0.6rem',
                    fontWeight: 700,

                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  <Box
                    sx={{
                      width: 38,
                      height: '1px',

                      bgcolor: '#649ABD',
                    }}
                  />

                  Start a Conversation
                </Box>

                <Box
                  component="h2"
                  sx={{
                    m: 0,

                    maxWidth: 720,

                    fontSize: {
                      xs: '3rem',
                      sm: '4.2rem',
                      md: '5.2rem',
                      lg: '5.8rem',
                    },

                    fontWeight: 500,

                    lineHeight: 0.98,

                    letterSpacing: '-0.055em',
                  }}
                >
                  {contractingContent.cta.title}
                </Box>

                <Box
                  sx={{
                    mt: 3.5,

                    maxWidth: 540,

                    color:
                      'rgba(255,255,255,0.70)',

                    fontSize: {
                      xs: '0.92rem',
                      md: '1rem',
                    },

                    lineHeight: 1.85,
                  }}
                >
                  {contractingContent.cta.description}
                </Box>
              </Box>


              {/* Actions */}

              <Box
                sx={{
                  mt: {
                    xs: 6,
                    lg: 9,
                  },

                  display: 'flex',

                  flexWrap: 'wrap',

                  gap: 2,
                }}
              >
                <Box
                  component="a"
                  href="https://www.fbs.com.sa/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    minHeight: 50,

                    px: 3,
                    py: 1.4,

                    display: 'inline-flex',

                    alignItems: 'center',

                    gap: 1.5,

                    bgcolor: '#FFFFFF',
                    color: '#082F4D',

                    textDecoration: 'none',

                    fontSize: '0.72rem',
                    fontWeight: 700,

                    letterSpacing: '0.08em',

                    transition:
                      'background-color 180ms ease, transform 180ms ease',

                    '& span': {
                      transition:
                        'transform 180ms ease',
                    },

                    '&:hover': {
                      bgcolor: '#B9DAF2',

                      transform:
                        'translateY(-2px)',
                    },

                    '&:hover span': {
                      transform:
                        'translate(4px, -4px)',
                    },

                    '&:focus-visible': {
                      outline:
                        '2px solid #B9DAF2',

                      outlineOffset: 5,
                    },
                  }}
                >
                  Contact FBS

                  <Box component="span">
                    ↗
                  </Box>
                </Box>


                <Box
                  component="button"
                  type="button"
                  onClick={scrollToProjects}
                  sx={{
                    appearance: 'none',

                    minHeight: 50,

                    border: '1px solid',
                    borderColor:
                      'rgba(255,255,255,0.35)',

                    px: 3,
                    py: 1.4,

                    bgcolor: 'transparent',

                    color: '#FFFFFF',

                    fontFamily: 'inherit',

                    fontSize: '0.72rem',
                    fontWeight: 700,

                    letterSpacing: '0.08em',

                    cursor: 'pointer',

                    transition:
                      'background-color 180ms ease, border-color 180ms ease',

                    '&:hover': {
                      bgcolor:
                        'rgba(255,255,255,0.08)',

                      borderColor:
                        'rgba(255,255,255,0.7)',
                    },

                    '&:focus-visible': {
                      outline:
                        '2px solid #B9DAF2',

                      outlineOffset: 5,
                    },
                  }}
                >
                  Explore Projects
                </Box>
              </Box>


              {/* Small footer note */}

              <Box
                sx={{
                  mt: 7,
                  pt: 2.5,

                  borderTop: '1px solid',

                  borderColor:
                    'rgba(255,255,255,0.16)',

                  display: 'flex',

                  justifyContent: 'space-between',

                  gap: 3,

                  color:
                    'rgba(255,255,255,0.46)',

                  fontSize: '0.56rem',
                  fontWeight: 700,

                  letterSpacing: '0.12em',

                  textTransform: 'uppercase',
                }}
              >
                <Box>
                  FBS Contracting
                </Box>

                <Box>
                  Riyadh — Saudi Arabia
                </Box>
              </Box>
            </Box>
          </Reveal>


          {/* Visual */}

          <Reveal
            delay={80}
            distance={24}
          >
            <Box
              sx={{
                position: 'relative',

                minHeight: {
                  xs: 440,
                  sm: 580,
                  lg: 700,
                },

                overflow: 'hidden',

                bgcolor: '#061F33',
              }}
            >
              {closingProject?.coverImage && (
                <Box
                  component="img"
                  src={closingProject.coverImage}
                  alt={closingProject.name}
                  loading="lazy"
                  sx={{
                    position: 'absolute',
                    inset: 0,

                    width: '100%',
                    height: '100%',

                    objectFit: 'cover',

                    filter:
                      'saturate(0.86) contrast(1.04)',
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
                      rgba(8,47,77,0.06) 25%,
                      rgba(8,47,77,0.68) 100%
                    )
                  `,
                }}
              />


              {/* Top label */}

              <Box
                sx={{
                  position: 'absolute',

                  top: {
                    xs: 20,
                    md: 26,
                  },

                  left: {
                    xs: 20,
                    md: 26,
                  },

                  right: {
                    xs: 20,
                    md: 26,
                  },

                  display: 'flex',

                  justifyContent:
                    'space-between',

                  gap: 2,

                  color:
                    'rgba(255,255,255,0.66)',

                  fontSize: '0.55rem',
                  fontWeight: 700,

                  letterSpacing: '0.13em',

                  textTransform: 'uppercase',
                }}
              >
                <Box>
                  FBS / Contracting
                </Box>

                <Box>
                  Saudi Arabia
                </Box>
              </Box>


              {/* Bottom label */}

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

                  justifyContent:
                    'space-between',

                  alignItems: 'end',

                  gap: 3,

                  color: '#FFFFFF',
                }}
              >
                <Box>
                  <Box
                    sx={{
                      mb: 0.7,

                      color: '#B9DAF2',

                      fontSize: '0.55rem',
                      fontWeight: 700,

                      letterSpacing:
                        '0.13em',

                      textTransform:
                        'uppercase',
                    }}
                  >
                    Built for what comes next
                  </Box>

                  <Box
                    sx={{
                      fontSize: {
                        xs: '1.7rem',
                        md: '2.2rem',
                      },

                      fontWeight: 500,

                      letterSpacing:
                        '-0.04em',
                    }}
                  >
                    {closingProject?.name}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'block',
                    },

                    color:
                      'rgba(255,255,255,0.62)',

                    fontSize: '0.58rem',

                    textAlign: 'right',
                  }}
                >
                  {closingProject?.city}
                  <br />
                  {closingProject?.region}
                </Box>
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Box>
    </Box>
  )
}

export default ArchitecturalClosing