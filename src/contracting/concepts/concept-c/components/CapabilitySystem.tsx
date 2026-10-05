import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { Box } from '@mui/material'

import { contractingContent } from '../../../data/content'

function CapabilitySystem() {
  const capabilities =
    contractingContent.capabilities

  const [activeIndex, setActiveIndex] =
    useState(0)

  const rowsRef =
    useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntry =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting,
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio,
              )[0]

          if (!visibleEntry) {
            return
          }

          const index = Number(
            visibleEntry.target.getAttribute(
              'data-capability-index',
            ),
          )

          if (!Number.isNaN(index)) {
            setActiveIndex(index)
          }
        },
        {
          threshold: [
            0.35,
            0.55,
            0.75,
          ],

          rootMargin:
            '-20% 0px -35% 0px',
        },
      )

    rowsRef.current.forEach(
      (element) => {
        if (element) {
          observer.observe(element)
        }
      },
    )

    return () =>
      observer.disconnect()
  }, [])


  const activeCapability =
    capabilities[activeIndex] ??
    capabilities[0]

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
          md: 84,
        },

        bgcolor: '#061F33',
        color: '#FFFFFF',

        borderTop: '1px solid',

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
        {/* Header */}

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
              xs: 6,
              md: 8,
            },
          }}
        >
          <Box
            sx={{
              color: '#649ABD',

              fontSize: '0.56rem',
              fontWeight: 700,

              letterSpacing:
                '0.16em',

              textTransform:
                'uppercase',
            }}
          >
            Capability System
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

                letterSpacing:
                  '-0.055em',
              }}
            >
              One process.
              <br />

              <Box
                component="span"
                sx={{
                  color: '#B9DAF2',
                }}
              >
                Multiple systems.
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,

                maxWidth: 560,

                color:
                  'rgba(255,255,255,0.48)',

                fontSize: {
                  xs: '0.88rem',
                  md: '0.96rem',
                },

                lineHeight: 1.8,
              }}
            >
              Each capability operates as
              part of a coordinated delivery
              structure from planning through
              execution.
            </Box>
          </Box>


          <Box
            sx={{
              color:
                'rgba(255,255,255,0.28)',

              fontSize: '0.5rem',
              fontWeight: 700,

              letterSpacing:
                '0.14em',

              textTransform:
                'uppercase',
            }}
          >
            System / 0
            {capabilities.length}
          </Box>
        </Box>


        {/* Main */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(380px, 0.72fr) minmax(0, 1.28fr)',
            },

            gap: {
              xs: 5,
              lg: 7,
            },

            alignItems: 'start',
          }}
        >
          {/* Capability stages */}

          <Box>
            {capabilities.map(
              (capability, index) => {
                const active =
                  activeIndex === index

                return (
                  <Box
                    key={capability.title}

                    ref={(element) => {
                      rowsRef.current[index] =
                        element as HTMLButtonElement | null
                    }}

                    data-capability-index={
                      index
                    }

                    component="button"
                    type="button"

                    onClick={() =>
                      setActiveIndex(
                        index,
                      )
                    }

                    aria-pressed={active}

                    sx={{
                      appearance: 'none',

                      width: '100%',

                      minHeight: {
                        xs: 180,
                        lg: 270,
                      },

                      border: 0,
                      borderTop:
                        '1px solid',

                      borderColor:
                        'rgba(185,218,242,0.14)',

                      bgcolor:
                        'transparent',

                      color: active
                        ? '#FFFFFF'
                        : 'rgba(255,255,255,0.40)',

                      px: 0,

                      py: {
                        xs: 3,
                        lg: 4,
                      },

                      display: 'grid',

                      gridTemplateColumns:
                        '52px 1fr',

                      gap: 2,

                      textAlign: 'left',

                      cursor: 'pointer',

                      position: 'relative',

                      transition:
                        'color 250ms ease',

                      '&::before': {
                        content: '""',

                        position:
                          'absolute',

                        left: 0,
                        bottom: -1,

                        width: active
                          ? '100%'
                          : 0,

                        height: '2px',

                        bgcolor:
                          '#B9DAF2',

                        boxShadow: active
                          ? '0 0 18px rgba(185,218,242,0.45)'
                          : 'none',

                        transition:
                          'width 400ms cubic-bezier(.2,.7,.2,1)',
                      },

                      '&:hover': {
                        color: '#FFFFFF',
                      },

                      '&:focus-visible': {
                        outline:
                          '2px solid #B9DAF2',

                        outlineOffset: 5,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        color: active
                          ? '#B9DAF2'
                          : '#649ABD',

                        fontSize:
                          '0.54rem',

                        fontWeight: 700,

                        pt: 0.6,
                      }}
                    >
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </Box>


                    <Box>
                      <Box
                        component="h3"
                        sx={{
                          m: 0,

                          mb: 2,

                          maxWidth: 520,

                          fontSize: {
                            xs: '1.7rem',
                            md: '2.1rem',
                            lg: '2.5rem',
                          },

                          fontWeight: 500,

                          lineHeight: 1,

                          letterSpacing:
                            '-0.045em',
                        }}
                      >
                        {
                          capability.title
                        }
                      </Box>


                      <Box
                        sx={{
                          maxWidth: 500,

                          color: active
                            ? 'rgba(255,255,255,0.56)'
                            : 'rgba(255,255,255,0.28)',

                          fontSize:
                            '0.78rem',

                          lineHeight: 1.75,

                          transition:
                            'color 250ms ease',
                        }}
                      >
                        {
                          capability.description
                        }
                      </Box>
                    </Box>
                  </Box>
                )
              },
            )}
          </Box>


          {/* Sticky system visual */}

          <Box
            sx={{
              position: {
                lg: 'sticky',
              },

              top: {
                lg: 110,
              },
            }}
          >
            <Box
              sx={{
                minHeight: {
                  xs: 540,
                  md: 620,
                  lg: 650,
                },

                border: '1px solid',

                borderColor:
                  'rgba(185,218,242,0.14)',

                bgcolor: '#082F4D',

                display: 'flex',

                flexDirection:
                  'column',
              }}
            >
              {/* Top bar */}

              <Box
                sx={{
                  px: 2.5,
                  py: 2,

                  display: 'flex',

                  justifyContent:
                    'space-between',

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
                  Delivery Architecture
                </Box>

                <Box>
                  Stage{' '}
                  {String(
                    activeIndex + 1,
                  ).padStart(
                    2,
                    '0',
                  )}
                </Box>
              </Box>


              {/* Diagram */}

              <Box
                sx={{
                  position: 'relative',

                  flex: 1,

                  minHeight: 410,

                  overflow: 'hidden',
                }}
              >
                {/* Grid */}

                <Box
                  aria-hidden="true"
                  sx={{
                    position:
                      'absolute',

                    inset: 0,

                    opacity: 0.12,

                    backgroundImage: `
                      linear-gradient(
                        rgba(185,218,242,0.26) 1px,
                        transparent 1px
                      ),
                      linear-gradient(
                        90deg,
                        rgba(185,218,242,0.26) 1px,
                        transparent 1px
                      )
                    `,

                    backgroundSize:
                      '46px 46px',
                  }}
                />


                {/* Central core */}

                <Box
                  sx={{
                    position:
                      'absolute',

                    left: '50%',
                    top: '48%',

                    transform:
                      'translate(-50%, -50%)',

                    width: {
                      xs: 150,
                      md: 190,
                    },

                    height: {
                      xs: 150,
                      md: 190,
                    },

                    border:
                      '1px solid',

                    borderColor:
                      'rgba(185,218,242,0.30)',

                    borderRadius:
                      '50%',

                    display: 'grid',

                    placeItems:
                      'center',

                    boxShadow:
                      '0 0 60px rgba(100,154,189,0.10)',

                    '&::before': {
                      content: '""',

                      position:
                        'absolute',

                      inset: 18,

                      border:
                        '1px dashed rgba(185,218,242,0.20)',

                      borderRadius:
                        '50%',

                      animation:
                        'systemRotate 18s linear infinite',

                      '@keyframes systemRotate':
                        {
                          to: {
                            transform:
                              'rotate(360deg)',
                          },
                        },

                      '@media (prefers-reduced-motion: reduce)':
                        {
                          animation:
                            'none',
                        },
                    },
                  }}
                >
                  <Box
                    sx={{
                      position:
                        'relative',

                      zIndex: 2,

                      textAlign:
                        'center',
                    }}
                  >
                    <Box
                      sx={{
                        mb: 0.8,

                        color:
                          '#649ABD',

                        fontSize:
                          '0.46rem',

                        fontWeight:
                          700,

                        letterSpacing:
                          '0.14em',

                        textTransform:
                          'uppercase',
                      }}
                    >
                      Active System
                    </Box>

                    <Box
                      sx={{
                        maxWidth: 130,

                        color:
                          '#FFFFFF',

                        fontSize: {
                          xs: '0.9rem',
                          md: '1rem',
                        },

                        fontWeight:
                          700,

                        lineHeight:
                          1.3,
                      }}
                    >
                      {
                        activeCapability.title
                      }
                    </Box>
                  </Box>
                </Box>


                {/* Orbit nodes */}

                {capabilities.map(
                  (
                    capability,
                    index,
                  ) => {
                    const positions =
                      [
                        {
                          left: '50%',
                          top: '14%',
                        },
                        {
                          left: '82%',
                          top: '48%',
                        },
                        {
                          left: '50%',
                          top: '82%',
                        },
                        {
                          left: '18%',
                          top: '48%',
                        },
                      ]

                    const active =
                      index ===
                      activeIndex

                    return (
                      <Box
                        key={
                          capability.title
                        }

                        component="button"
                        type="button"

                        onClick={() =>
                          setActiveIndex(
                            index,
                          )
                        }

                        aria-label={`Activate ${capability.title}`}

                        sx={{
                          appearance:
                            'none',

                          position:
                            'absolute',

                          left:
                            positions[
                              index
                            ]
                              ?.left ??
                            '50%',

                          top:
                            positions[
                              index
                            ]
                              ?.top ??
                            '50%',

                          transform:
                            'translate(-50%, -50%)',

                          width: active
                            ? 22
                            : 13,

                          height: active
                            ? 22
                            : 13,

                          p: 0,

                          border:
                            '2px solid',

                          borderColor:
                            active
                              ? '#FFFFFF'
                              : '#649ABD',

                          borderRadius:
                            '50%',

                          bgcolor:
                            active
                              ? '#B9DAF2'
                              : '#082F4D',

                          boxShadow:
                            active
                              ? '0 0 0 10px rgba(185,218,242,0.10), 0 0 28px rgba(185,218,242,0.55)'
                              : '0 0 12px rgba(100,154,189,0.28)',

                          cursor:
                            'pointer',

                          transition:
                            'width 180ms ease, height 180ms ease, box-shadow 180ms ease',
                        }}
                      />
                    )
                  },
                )}


                {/* Connection lines */}

                <Box
                  aria-hidden="true"
                  sx={{
                    position:
                      'absolute',

                    left: '50%',
                    top: '14%',

                    width: '1px',
                    height: '34%',

                    bgcolor:
                      'rgba(185,218,242,0.18)',
                  }}
                />

                <Box
                  aria-hidden="true"
                  sx={{
                    position:
                      'absolute',

                    left: '50%',
                    top: '48%',

                    width: '32%',
                    height: '1px',

                    bgcolor:
                      'rgba(185,218,242,0.18)',
                  }}
                />

                <Box
                  aria-hidden="true"
                  sx={{
                    position:
                      'absolute',

                    left: '50%',
                    top: '48%',

                    width: '1px',
                    height: '34%',

                    bgcolor:
                      'rgba(185,218,242,0.18)',
                  }}
                />

                <Box
                  aria-hidden="true"
                  sx={{
                    position:
                      'absolute',

                    right: '50%',
                    top: '48%',

                    width: '32%',
                    height: '1px',

                    bgcolor:
                      'rgba(185,218,242,0.18)',
                  }}
                />
              </Box>


              {/* Active data */}

              <Box
                sx={{
                  p: {
                    xs: 2.5,
                    md: 3,
                  },

                  borderTop:
                    '1px solid',

                  borderColor:
                    'rgba(185,218,242,0.14)',
                }}
              >
                <Box
                  sx={{
                    mb: 0.8,

                    color:
                      '#649ABD',

                    fontSize:
                      '0.48rem',

                    fontWeight: 700,

                    letterSpacing:
                      '0.14em',

                    textTransform:
                      'uppercase',
                  }}
                >
                  Active Capability
                </Box>

                <Box
                  sx={{
                    mb: 1.5,

                    fontSize: {
                      xs: '1.5rem',
                      md: '2rem',
                    },

                    fontWeight: 500,

                    letterSpacing:
                      '-0.04em',
                  }}
                >
                  {
                    activeCapability.title
                  }
                </Box>

                <Box
                  sx={{
                    maxWidth: 600,

                    color:
                      'rgba(255,255,255,0.48)',

                    fontSize:
                      '0.76rem',

                    lineHeight: 1.7,
                  }}
                >
                  {
                    activeCapability.description
                  }
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CapabilitySystem