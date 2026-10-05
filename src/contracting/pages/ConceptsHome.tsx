import { Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import { projects } from '../core/data/projects'

const conceptCards = [
  {
    id: 'A',
    title: 'Executive Corporate',
    subtitle: 'Structured. Refined. Business-led.',
    description:
      'A premium corporate direction focused on clarity, confidence and executive presentation.',
    href: '/contracting/concept-a',
    image: projects[0]?.coverImage,
    accent: '#9B7A43',
    overlay:
      'linear-gradient(180deg, rgba(18,22,24,0.08) 20%, rgba(18,22,24,0.88) 100%)',
  },
  {
    id: 'B',
    title: 'Cinematic Premium',
    subtitle: 'Architectural. Human. Image-led.',
    description:
      'A cinematic brand experience built around projects, photography and premium spatial storytelling.',
    href: '/contracting/concept-b',
    image: projects[2]?.coverImage,
    accent: '#649ABD',
    overlay:
      'linear-gradient(180deg, rgba(8,47,77,0.05) 10%, rgba(8,47,77,0.90) 100%)',
  },
  {
    id: 'C',
    title: 'Connected Contracting',
    subtitle: 'Systems. Delivery. Precision.',
    description:
      'A connected contracting experience combining projects, regional reach and delivery systems.',
    href: '/contracting/concept-c',
    image: projects[3]?.coverImage,
    accent: '#B9DAF2',
    overlay:
      'linear-gradient(180deg, rgba(6,31,51,0.10) 10%, rgba(6,31,51,0.95) 100%)',
  },
]

function ConceptsHome() {
  return (
    <Box
      sx={{
        minHeight: '100svh',
        bgcolor: '#EEF4F6',
        color: '#082F4D',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1600,
          mx: 'auto',

          px: {
            xs: 2.5,
            sm: 4,
            md: 6,
            lg: 8,
          },

          pt: {
            xs: 7,
            md: 10,
          },

          pb: {
            xs: 6,
            md: 8,
          },
        }}
      >
        {/* Header */}

        <Box
          sx={{
            mb: {
              xs: 6,
              md: 8,
            },

            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: '220px 1fr',
            },

            gap: {
              xs: 2,
              md: 5,
            },
          }}
        >
          <Box
            sx={{
              color: '#649ABD',
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            FBS Contracting
            <br />
            Concept Presentation
          </Box>

          <Box>
            <Box
              component="h1"
              sx={{
                m: 0,

                maxWidth: 980,

                fontSize: {
                  xs: '3rem',
                  sm: '4.4rem',
                  md: '5.8rem',
                  lg: '6.8rem',
                },

                fontWeight: 500,
                lineHeight: 0.94,
                letterSpacing: '-0.06em',
              }}
            >
              Three directions.
              <br />

              <Box
                component="span"
                sx={{
                  color: '#649ABD',
                }}
              >
                One contracting brand.
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,

                maxWidth: 650,

                color: 'rgba(8,47,77,0.58)',

                fontSize: {
                  xs: '0.9rem',
                  md: '1rem',
                },

                lineHeight: 1.8,
              }}
            >
              Explore three distinct digital directions
              developed for the FBS Contracting experience.
            </Box>
          </Box>
        </Box>


        {/* Cards */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: 'repeat(3, 1fr)',
            },

            gap: {
              xs: 2.5,
              md: 3,
            },
          }}
        >
          {conceptCards.map((concept) => (
            <Box
              key={concept.id}

              component={RouterLink}
              to={concept.href}

              sx={{
                position: 'relative',

                minHeight: {
                  xs: 520,
                  md: 620,
                  lg: 680,
                },

                overflow: 'hidden',

                color: '#FFFFFF',
                textDecoration: 'none',

                bgcolor: '#082F4D',

                '& .concept-image': {
                  transition:
                    'transform 900ms cubic-bezier(.2,.7,.2,1)',
                },

                '&:hover .concept-image': {
                  transform: 'scale(1.035)',
                },

                '&:focus-visible': {
                  outline: `3px solid ${concept.accent}`,
                  outlineOffset: 4,
                },
              }}
            >
              {concept.image && (
                <Box
                  className="concept-image"

                  component="img"

                  src={concept.image}
                  alt=""

                  sx={{
                    position: 'absolute',
                    inset: 0,

                    width: '100%',
                    height: '100%',

                    objectFit: 'cover',
                  }}
                />
              )}

              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,

                  background: concept.overlay,
                }}
              />

              <Box
                sx={{
                  position: 'relative',

                  zIndex: 2,

                  minHeight: 'inherit',

                  p: {
                    xs: 3,
                    md: 4,
                  },

                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* top */}

                <Box
                  sx={{
                    display: 'flex',

                    justifyContent: 'space-between',
                    alignItems: 'center',

                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '0.56rem',
                      fontWeight: 700,

                      letterSpacing: '0.15em',

                      textTransform: 'uppercase',

                      color: concept.accent,
                    }}
                  >
                    Concept {concept.id}
                  </Box>

                  <Box
                    sx={{
                      width: 8,
                      height: 8,

                      borderRadius: '50%',

                      bgcolor: concept.accent,

                      boxShadow: `0 0 18px ${concept.accent}`,
                    }}
                  />
                </Box>


                {/* bottom */}

                <Box
                  sx={{
                    mt: 'auto',
                  }}
                >
                  <Box
                    sx={{
                      mb: 1.3,

                      color: concept.accent,

                      fontSize: '0.58rem',
                      fontWeight: 700,

                      letterSpacing: '0.12em',

                      textTransform: 'uppercase',
                    }}
                  >
                    {concept.subtitle}
                  </Box>


                  <Box
                    component="h2"
                    sx={{
                      m: 0,

                      mb: 2.5,

                      fontSize: {
                        xs: '2.5rem',
                        md: '3.3rem',
                        lg: '3rem',
                        xl: '3.5rem',
                      },

                      fontWeight: 500,

                      lineHeight: 0.98,

                      letterSpacing: '-0.05em',
                    }}
                  >
                    {concept.title}
                  </Box>


                  <Box
                    sx={{
                      maxWidth: 420,

                      mb: 4,

                      color:
                        'rgba(255,255,255,0.62)',

                      fontSize: '0.82rem',

                      lineHeight: 1.7,
                    }}
                  >
                    {concept.description}
                  </Box>


                  <Box
                    sx={{
                      pt: 2.5,

                      display: 'flex',

                      justifyContent: 'space-between',
                      alignItems: 'center',

                      gap: 2,

                      borderTop: '1px solid',

                      borderColor:
                        'rgba(255,255,255,0.20)',
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: '0.68rem',
                        fontWeight: 700,

                        letterSpacing: '0.08em',
                      }}
                    >
                      View Concept
                    </Box>

                    <Box
                      sx={{
                        color: concept.accent,

                        fontSize: '1rem',
                      }}
                    >
                      ↗
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>


        {/* Footer */}

        <Box
          sx={{
            mt: {
              xs: 6,
              md: 8,
            },

            pt: 2.5,

            display: 'flex',

            flexDirection: {
              xs: 'column',
              sm: 'row',
            },

            justifyContent: 'space-between',

            gap: 2,

            borderTop: '1px solid',

            borderColor:
              'rgba(8,47,77,0.14)',

            color:
              'rgba(8,47,77,0.44)',

            fontSize: '0.56rem',
            fontWeight: 700,

            letterSpacing: '0.10em',

            textTransform: 'uppercase',
          }}
        >
          <Box>
            FBS Contracting / UI Concepts
          </Box>

          <Box>
            Concept Review
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ConceptsHome