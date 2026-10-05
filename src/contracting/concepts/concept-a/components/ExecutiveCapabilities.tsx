import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import { contractingContent } from '../../../data/content'

function ExecutiveCapabilities() {
  return (
    <Box
      id="capabilities"
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

        bgcolor: 'background.default',
      }}
    >
      <Container>
        {/* Heading */}
        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: '0.7fr 1.3fr',
            },

            gap: {
              xs: 3,
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

              letterSpacing: 2.4,
            }}
          >
            Capabilities
          </Typography>

          <Box>
            <Typography
              variant="h2"
              sx={{
                maxWidth: 780,

                fontSize: {
                  xs: '2.8rem',
                  md: '3.8rem',
                  lg: '4.6rem',
                },

                lineHeight: 1.03,
              }}
            >
              Built around every stage of delivery.
            </Typography>

            <Typography
              sx={{
                mt: 3,

                maxWidth: 620,

                color: 'text.secondary',

                lineHeight: 1.8,
              }}
            >
              Integrated construction capabilities focused on
              disciplined execution, efficiency and long-term
              project value.
            </Typography>
          </Box>
        </Box>

        {/* Capability rows */}
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {contractingContent.capabilities.map(
            (capability) => (
              <Box
                key={capability.number}
                sx={{
                  position: 'relative',

                  display: 'grid',

                  gridTemplateColumns: {
                    xs: '60px 1fr',
                    md: '110px 0.8fr 1.2fr',
                  },

                  gap: {
                    xs: 2,
                    md: 5,
                  },

                  alignItems: 'start',

                  py: {
                    xs: 4,
                    md: 5.5,
                  },

                  borderBottom: '1px solid',
                  borderColor: 'divider',

                  overflow: 'hidden',

                  transition:
                    'padding 250ms ease, background-color 250ms ease',

                  '&::before': {
                    content: '""',

                    position: 'absolute',

                    left: 0,
                    top: 0,

                    width: 3,
                    height: '100%',

                    bgcolor: 'secondary.main',

                    transform: 'scaleY(0)',

                    transformOrigin: 'bottom',

                    transition:
                      'transform 280ms ease',
                  },

                  '&:hover': {
                    bgcolor: '#EEF4F6',

                    px: {
                      xs: 2,
                      md: 3,
                    },
                  },

                  '&:hover::before': {
                    transform: 'scaleY(1)',
                  },

                  '&:hover .capability-number': {
                    color: 'secondary.main',
                  },

                  '&:hover .capability-arrow': {
                    transform:
                      'translate(8px, -8px)',
                  },
                }}
              >
                <Typography
                  className="capability-number"
                  sx={{
                    color: 'text.secondary',

                    fontSize: '0.75rem',

                    letterSpacing: 1.5,

                    transition:
                      'color 200ms ease',
                  }}
                >
                  {capability.number}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontSize: {
                      xs: '1.55rem',
                      md: '2rem',
                    },

                    lineHeight: 1.15,
                  }}
                >
                  {capability.title}
                </Typography>

                <Box
                  sx={{
                    gridColumn: {
                      xs: '2',
                      md: 'auto',
                    },

                    display: 'flex',
                    gap: 3,
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography
                    sx={{
                      maxWidth: 560,

                      color: 'text.secondary',

                      lineHeight: 1.8,
                    }}
                  >
                    {capability.description}
                  </Typography>

                  <Typography
                    className="capability-arrow"
                    sx={{
                      ml: 'auto',

                      fontSize: '1.4rem',

                      transition:
                        'transform 220ms ease',
                    }}
                  >
                    ↗
                  </Typography>
                </Box>
              </Box>
            ),
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default ExecutiveCapabilities