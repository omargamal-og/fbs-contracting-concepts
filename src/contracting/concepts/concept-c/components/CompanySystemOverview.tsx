import { Box } from '@mui/material'

import { projects } from '../../../core/data/projects'
import { contractingContent } from '../../../data/content'

function CompanySystemOverview() {
  const regionsCount =
    new Set(projects.map((project) => project.region)).size

  const capabilities =
    contractingContent.capabilities

  return (
    <Box
      id="company"
      component="section"
      sx={{
        scrollMarginTop: {
          xs: 72,
          md: 84,
        },

        bgcolor: '#082F4D',
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

              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            Company System
          </Box>

          <Box>
            <Box
              component="h2"
              sx={{
                m: 0,

                maxWidth: 920,

                fontSize: {
                  xs: '2.8rem',
                  sm: '4rem',
                  md: '5rem',
                  lg: '5.8rem',
                },

                fontWeight: 500,

                lineHeight: 0.96,

                letterSpacing: '-0.055em',
              }}
            >
              Built as one
              <br />

              <Box
                component="span"
                sx={{
                  color: '#B9DAF2',
                }}
              >
                connected delivery platform.
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,

                maxWidth: 600,

                color:
                  'rgba(255,255,255,0.50)',

                fontSize: {
                  xs: '0.88rem',
                  md: '0.96rem',
                },

                lineHeight: 1.8,
              }}
            >
              FBS Contracting brings planning,
              execution, quality and regional
              delivery into one coordinated
              operating model.
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

              textTransform: 'uppercase',
            }}
          >
            Company / Core
          </Box>
        </Box>


        {/* Main system */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(0, 1.25fr) minmax(340px, 0.55fr)',
            },

            border: '1px solid',

            borderColor:
              'rgba(185,218,242,0.14)',

            bgcolor: '#061F33',
          }}
        >
          {/* Operating architecture */}

          <Box
            sx={{
              position: 'relative',

              minHeight: {
                xs: 640,
                md: 760,
              },

              overflow: 'hidden',

              borderRight: {
                lg: '1px solid',
              },

              borderBottom: {
                xs: '1px solid',
                lg: 0,
              },

              borderColor:
                'rgba(185,218,242,0.14)',
            }}
          >
            {/* Grid */}

            <Box
              aria-hidden="true"
              sx={{
                position: 'absolute',
                inset: 0,

                opacity: 0.12,

                backgroundImage: `
                  linear-gradient(
                    rgba(185,218,242,0.24) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(185,218,242,0.24) 1px,
                    transparent 1px
                  )
                `,

                backgroundSize:
                  '54px 54px',
              }}
            />


            {/* Labels */}

            <Box
              sx={{
                position: 'absolute',

                top: 22,
                left: 24,
                right: 24,

                zIndex: 3,

                display: 'flex',

                justifyContent:
                  'space-between',

                gap: 3,

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
                Operating Architecture
              </Box>

              <Box>
                FBS / Core System
              </Box>
            </Box>


            {/* System stack */}

            <Box
              sx={{
                position: 'absolute',

                inset: {
                  xs: '90px 24px 40px',
                  md: '100px 70px 50px',
                },

                display: 'flex',

                flexDirection: 'column',

                justifyContent: 'center',
              }}
            >
              {/* Input */}

              <SystemBlock
                index="00"
                label="Project Input"
                title="Project Requirements"
                accent
              />

              <Connector />

              {capabilities.map(
                (capability, index) => (
                  <Box
                    key={capability.title}
                  >
                    <SystemBlock
                      index={String(
                        index + 1,
                      ).padStart(2, '0')}
                      label="Delivery Layer"
                      title={capability.title}
                    />

                    {index <
                      capabilities.length -
                        1 && <Connector />}
                  </Box>
                ),
              )}

              <Connector />

              <SystemBlock
                index="05"
                label="Output"
                title="Regional Project Delivery"
                accent
              />
            </Box>
          </Box>


          {/* Status panel */}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',

              minWidth: 0,
            }}
          >
            <Box
              sx={{
                px: 2.5,
                py: 2,

                display: 'flex',

                justifyContent:
                  'space-between',

                borderBottom: '1px solid',

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
                System Status
              </Box>

              <Box>
                Online
              </Box>
            </Box>


            {/* Main signal */}

            <Box
              sx={{
                p: {
                  xs: 3,
                  lg: 3.5,
                },

                borderBottom: '1px solid',

                borderColor:
                  'rgba(185,218,242,0.14)',
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,

                  mb: 3,

                  borderRadius: '50%',

                  bgcolor: '#B9DAF2',

                  boxShadow:
                    '0 0 0 8px rgba(185,218,242,0.08), 0 0 24px rgba(185,218,242,0.55)',
                }}
              />

              <Box
                sx={{
                  mb: 1,

                  color: '#649ABD',

                  fontSize: '0.5rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.14em',

                  textTransform:
                    'uppercase',
                }}
              >
                Operating Model
              </Box>

              <Box
                sx={{
                  maxWidth: 360,

                  fontSize: {
                    xs: '2rem',
                    lg: '2.6rem',
                  },

                  fontWeight: 500,

                  lineHeight: 1,

                  letterSpacing:
                    '-0.045em',
                }}
              >
                Connected
                <br />
                delivery.
              </Box>

              <Box
                sx={{
                  mt: 2.5,

                  maxWidth: 360,

                  color:
                    'rgba(255,255,255,0.46)',

                  fontSize: '0.78rem',

                  lineHeight: 1.75,
                }}
              >
                Projects, capabilities and regional
                execution operate within one
                coordinated contracting structure.
              </Box>
            </Box>


            {/* System data */}

            <Box
              sx={{
                flex: 1,

                p: {
                  xs: 3,
                  lg: 3.5,
                },

                display: 'flex',

                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  borderTop: '1px solid',

                  borderColor:
                    'rgba(185,218,242,0.14)',
                }}
              >
                <SystemRow
                  label="Project Nodes"
                  value={String(
                    projects.length,
                  ).padStart(2, '0')}
                />

                <SystemRow
                  label="Regions Represented"
                  value={String(
                    regionsCount,
                  ).padStart(2, '0')}
                />

                <SystemRow
                  label="Capabilities"
                  value={String(
                    capabilities.length,
                  ).padStart(2, '0')}
                />

                <SystemRow
                  label="Delivery Model"
                  value="Connected"
                />
              </Box>


              <Box
                sx={{
                  mt: 'auto',
                  pt: 5,

                  color:
                    'rgba(255,255,255,0.24)',

                  fontSize: '0.46rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.12em',

                  textTransform:
                    'uppercase',
                }}
              >
                FBS Contracting / Saudi Arabia
              </Box>
            </Box>
          </Box>
        </Box>


        {/* Bottom statement */}

        <Box
          sx={{
            mt: {
              xs: 7,
              md: 10,
            },

            pt: 4,

            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: '220px 1fr',
            },

            gap: {
              xs: 2,
              md: 5,
            },

            borderTop: '1px solid',

            borderColor:
              'rgba(185,218,242,0.14)',
          }}
        >
          <Box
            sx={{
              color: '#649ABD',

              fontSize: '0.52rem',
              fontWeight: 700,

              letterSpacing:
                '0.14em',

              textTransform: 'uppercase',
            }}
          >
            System Principle
          </Box>

          <Box
            sx={{
              maxWidth: 1080,

              fontSize: {
                xs: '1.8rem',
                sm: '2.5rem',
                md: '3.4rem',
                lg: '4rem',
              },

              fontWeight: 500,

              lineHeight: 1.15,

              letterSpacing:
                '-0.045em',
            }}
          >
            Every part of delivery is connected —
            from project requirements to regional
            execution.
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


function SystemBlock({
  index,
  label,
  title,
  accent = false,
}: {
  index: string
  label: string
  title: string
  accent?: boolean
}) {
  return (
    <Box
      sx={{
        minHeight: 86,

        display: 'grid',

        gridTemplateColumns: {
          xs: '48px 1fr',
          sm: '64px 1fr auto',
        },

        gap: 2,

        alignItems: 'center',

        px: {
          xs: 2,
          sm: 2.5,
        },

        py: 1.8,

        border: '1px solid',

        borderColor: accent
          ? 'rgba(185,218,242,0.38)'
          : 'rgba(185,218,242,0.14)',

        bgcolor: accent
          ? 'rgba(185,218,242,0.07)'
          : 'rgba(8,47,77,0.36)',

        position: 'relative',

        '&::before': accent
          ? {
              content: '""',

              position: 'absolute',

              left: 0,
              top: 0,
              bottom: 0,

              width: '2px',

              bgcolor: '#B9DAF2',

              boxShadow:
                '0 0 14px rgba(185,218,242,0.5)',
            }
          : {},
      }}
    >
      <Box
        sx={{
          color: '#649ABD',

          fontSize: '0.5rem',
          fontWeight: 700,
        }}
      >
        {index}
      </Box>

      <Box>
        <Box
          sx={{
            mb: 0.4,

            color:
              'rgba(255,255,255,0.28)',

            fontSize: '0.44rem',
            fontWeight: 700,

            letterSpacing:
              '0.12em',

            textTransform: 'uppercase',
          }}
        >
          {label}
        </Box>

        <Box
          sx={{
            color: accent
              ? '#B9DAF2'
              : '#FFFFFF',

            fontSize: {
              xs: '0.86rem',
              sm: '0.95rem',
            },

            fontWeight: 700,
          }}
        >
          {title}
        </Box>
      </Box>

      <Box
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },

          width: 8,
          height: 8,

          borderRadius: '50%',

          bgcolor: accent
            ? '#B9DAF2'
            : '#649ABD',

          boxShadow: accent
            ? '0 0 16px rgba(185,218,242,0.60)'
            : 'none',
        }}
      />
    </Box>
  )
}


function Connector() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        height: 28,

        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '1px',
          height: '100%',

          bgcolor:
            'rgba(185,218,242,0.20)',

          position: 'relative',

          '&::after': {
            content: '""',

            position: 'absolute',

            left: '50%',
            bottom: 0,

            width: 5,
            height: 5,

            borderRight:
              '1px solid rgba(185,218,242,0.45)',

            borderBottom:
              '1px solid rgba(185,218,242,0.45)',

            transform:
              'translateX(-50%) rotate(45deg)',
          },
        }}
      />
    </Box>
  )
}


function SystemRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Box
      sx={{
        py: 1.7,

        display: 'flex',

        justifyContent:
          'space-between',

        gap: 3,

        borderBottom: '1px solid',

        borderColor:
          'rgba(185,218,242,0.10)',
      }}
    >
      <Box
        sx={{
          color:
            'rgba(255,255,255,0.30)',

          fontSize: '0.46rem',
          fontWeight: 700,

          letterSpacing:
            '0.12em',

          textTransform: 'uppercase',
        }}
      >
        {label}
      </Box>

      <Box
        sx={{
          color: '#B9DAF2',

          fontSize: '0.72rem',
          fontWeight: 700,

          textAlign: 'right',
        }}
      >
        {value}
      </Box>
    </Box>
  )
}

export default CompanySystemOverview