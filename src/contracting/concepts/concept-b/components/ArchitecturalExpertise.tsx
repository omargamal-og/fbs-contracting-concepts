import { useState } from 'react'

import { Box } from '@mui/material'

import Reveal from '../../../core/components/Reveal'
import { contractingContent } from '../../../data/content'
import { projects } from '../../../core/data/projects'

function ArchitecturalExpertise() {
  const [activeIndex, setActiveIndex] = useState(0)

  const capabilities =
    contractingContent.capabilities

  const activeCapability =
    capabilities[activeIndex] ??
    capabilities[0]

  const imagery = [
    projects[0]?.coverImage,
    projects[1]?.coverImage,
    projects[2]?.coverImage,
    projects[3]?.coverImage,
  ]

  const activeImage =
    imagery[activeIndex] ??
    projects[0]?.coverImage

  if (!activeCapability) {
    return null
  }

  return (
    <Box
      id="capabilities"
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
              Expertise
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
                From planning
                <br />
                to delivery.
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
                A coordinated construction approach
                covering the stages that shape project
                quality, execution and long-term
                performance.
              </Box>
            </Box>
          </Box>
        </Reveal>


        {/* Experience */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(0, 0.9fr) minmax(420px, 1.1fr)',
            },

            gap: {
              xs: 5,
              lg: 7,
            },

            alignItems: 'stretch',
          }}
        >
          {/* Capability index */}

          <Reveal distance={18}>
            <Box
              sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              {capabilities.map(
                (capability, index) => {
                  const active =
                    activeIndex === index

                  return (
                    <Box
                      key={capability.title}

                      component="button"
                      type="button"

                      aria-pressed={active}

                      onClick={() =>
                        setActiveIndex(index)
                      }

                      sx={{
                        appearance: 'none',

                        width: '100%',

                        border: 0,
                        borderBottom:
                          '1px solid',

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
                          md: active
                            ? 2.5
                            : 0,
                        },

                        py: {
                          xs: 3,
                          md: 3.5,
                        },

                        display: 'grid',

                        gridTemplateColumns:
                          '46px 1fr auto',

                        gap: 2,

                        alignItems: 'center',

                        textAlign: 'left',

                        cursor: 'pointer',

                        transition:
                          'background-color 220ms ease, color 220ms ease, padding 220ms ease',

                        '&:hover': {
                          bgcolor:
                            'rgba(255,255,255,0.7)',

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
                      {/* Number */}

                      <Box
                        sx={{
                          color: active
                            ? '#649ABD'
                            : 'text.secondary',

                          fontSize:
                            '0.58rem',

                          fontWeight: 700,

                          letterSpacing:
                            '0.08em',
                        }}
                      >
                        {String(
                          index + 1,
                        ).padStart(2, '0')}
                      </Box>


                      {/* Title */}

                      <Box
                        sx={{
                          fontSize: {
                            xs: '1.5rem',
                            sm: '1.8rem',
                            md: '2.1rem',
                            lg: '2.35rem',
                          },

                          fontWeight: 500,

                          lineHeight: 1.05,

                          letterSpacing:
                            '-0.04em',
                        }}
                      >
                        {capability.title}
                      </Box>


                      {/* Arrow */}

                      <Box
                        sx={{
                          color: active
                            ? '#649ABD'
                            : 'text.secondary',

                          fontSize:
                            '1.1rem',

                          transform: active
                            ? 'translate(3px, -3px)'
                            : 'none',

                          transition:
                            'transform 180ms ease, color 180ms ease',
                        }}
                      >
                        ↗
                      </Box>
                    </Box>
                  )
                },
              )}
            </Box>
          </Reveal>


          {/* Active capability story */}

          <Reveal
            delay={80}
            distance={20}
          >
            <Box
              sx={{
                height: '100%',

                display: 'flex',
                flexDirection: 'column',

                bgcolor: '#FFFFFF',

                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {/* Visual */}

              <Box
                sx={{
                  position: 'relative',

                  minHeight: {
                    xs: 380,
                    sm: 500,
                    lg: 520,
                  },

                  overflow: 'hidden',

                  bgcolor: '#082F4D',
                }}
              >
                {activeImage && (
                  <Box
                    key={activeImage}
                    component="img"
                    src={activeImage}
                    alt={activeCapability.title}
                    loading="lazy"

                    sx={{
                      position: 'absolute',
                      inset: 0,

                      width: '100%',
                      height: '100%',

                      objectFit: 'cover',

                      filter:
                        'saturate(0.88) contrast(1.03)',

                      animation:
                        'expertiseImageIn 500ms ease both',

                      '@keyframes expertiseImageIn': {
                        from: {
                          opacity: 0,
                          transform:
                            'scale(1.018)',
                        },

                        to: {
                          opacity: 1,
                          transform:
                            'scale(1)',
                        },
                      },

                      '@media (prefers-reduced-motion: reduce)': {
                        animation: 'none',
                      },
                    }}
                  />
                )}

                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,

                    background:
                      'linear-gradient(180deg, rgba(8,47,77,0.02) 45%, rgba(8,47,77,0.62) 100%)',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',

                    left: {
                      xs: 20,
                      md: 26,
                    },

                    right: {
                      xs: 20,
                      md: 26,
                    },

                    bottom: {
                      xs: 20,
                      md: 24,
                    },

                    display: 'flex',

                    justifyContent:
                      'space-between',

                    alignItems: 'end',

                    gap: 3,

                    color: '#FFFFFF',
                  }}
                >
                  <Box
                    sx={{
                      color: '#B9DAF2',

                      fontSize: '0.56rem',
                      fontWeight: 700,

                      letterSpacing:
                        '0.13em',

                      textTransform:
                        'uppercase',
                    }}
                  >
                    Capability /{' '}
                    {String(
                      activeIndex + 1,
                    ).padStart(2, '0')}
                  </Box>

                  <Box
                    sx={{
                      display: {
                        xs: 'none',
                        sm: 'block',
                      },

                      color:
                        'rgba(255,255,255,0.68)',

                      fontSize: '0.55rem',

                      letterSpacing:
                        '0.1em',

                      textTransform:
                        'uppercase',
                    }}
                  >
                    FBS Contracting
                  </Box>
                </Box>
              </Box>


              {/* Copy */}

              <Box
                sx={{
                  flex: 1,

                  p: {
                    xs: 3,
                    md: 4,
                    lg: 4.5,
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
                  Our Expertise
                </Box>


                <Box
                  component="h3"
                  sx={{
                    m: 0,

                    mb: 2.5,

                    maxWidth: 520,

                    fontSize: {
                      xs: '2rem',
                      md: '2.7rem',
                      lg: '3.2rem',
                    },

                    fontWeight: 500,

                    lineHeight: 1,

                    letterSpacing:
                      '-0.045em',
                  }}
                >
                  {activeCapability.title}
                </Box>


                <Box
                  sx={{
                    maxWidth: 600,

                    color: 'text.secondary',

                    fontSize: {
                      xs: '0.9rem',
                      md: '0.98rem',
                    },

                    lineHeight: 1.8,
                  }}
                >
                  {
                    activeCapability.description
                  }
                </Box>


                {/* Bottom detail */}

                <Box
                  sx={{
                    mt: 'auto',
                    pt: 4,

                    display: 'grid',

                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: '1fr auto',
                    },

                    gap: 2,

                    alignItems: 'end',
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: 380,

                      color: 'text.secondary',

                      fontSize: '0.74rem',

                      lineHeight: 1.7,
                    }}
                  >
                    Integrated into the wider project
                    delivery process with a focus on
                    coordination, quality and
                    accountability.
                  </Box>

                  <Box
                    sx={{
                      color: '#649ABD',

                      fontSize: '0.58rem',
                      fontWeight: 700,

                      letterSpacing:
                        '0.12em',

                      textTransform:
                        'uppercase',
                    }}
                  >
                    {String(
                      capabilities.length,
                    ).padStart(2, '0')}{' '}
                    capabilities
                  </Box>
                </Box>
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Box>
    </Box>
  )
}

export default ArchitecturalExpertise