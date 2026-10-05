import { Box } from '@mui/material'

import { projects } from '../../../core/data/projects'
import { contractingContent } from '../../../data/content'

const enquiryTypes = [
  'New Project',
  'Partnerships',
  'General Enquiry',
]

function PremiumContact() {
  const visual =
    projects.find(
      (project) =>
        project.slug === 'jawharat-al-ghuroob',
    ) ?? projects[0]

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        position: 'relative',

        bgcolor: '#082F4D',
        color: '#FFFFFF',

        overflow: 'hidden',

        borderTop: '1px solid',
        borderColor:
          'rgba(185,218,242,0.14)',
      }}
    >
      {/* =====================================
          CINEMATIC BACKDROP
      ====================================== */}

      <Box
        sx={{
          position: 'relative',

          minHeight: {
            xs: 780,
            md: 900,
            lg: 960,
          },

          overflow: 'hidden',
        }}
      >
        {visual?.coverImage && (
          <Box
            component="img"
            src={visual.coverImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            sx={{
              position: 'absolute',
              inset: 0,

              width: '100%',
              height: '100%',

              objectFit: 'cover',

              filter:
                'saturate(0.72) contrast(1.06)',
            }}
          />
        )}


        {/* Image treatment */}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,

            background: `
              linear-gradient(
                180deg,
                rgba(8,47,77,0.30) 0%,
                rgba(8,47,77,0.14) 35%,
                rgba(8,47,77,0.82) 100%
              ),
              linear-gradient(
                90deg,
                rgba(8,47,77,0.62) 0%,
                rgba(8,47,77,0.08) 65%
              )
            `,
          }}
        />


        {/* Small top information */}

        <Box
          sx={{
            position: 'relative',

            zIndex: 2,

            width: '100%',
            maxWidth: 1740,
            mx: 'auto',

            px: {
              xs: 2.5,
              sm: 4,
              md: 6,
              lg: 8,
            },

            pt: {
              xs: 6,
              md: 8,
            },

            display: 'flex',

            justifyContent: 'space-between',
            alignItems: 'center',

            gap: 3,

            color:
              'rgba(255,255,255,0.58)',

            fontSize: '0.5rem',
            fontWeight: 700,

            letterSpacing: '0.14em',

            textTransform: 'uppercase',
          }}
        >
          <Box>
            FBS Contracting
          </Box>

          <Box>
            Riyadh / Saudi Arabia
          </Box>
        </Box>


        {/* =====================================
            FLOATING CARD
        ====================================== */}

        <Box
          sx={{
            position: 'absolute',

            zIndex: 4,

            left: {
              xs: 20,
              sm: 40,
              md: 70,
              lg: 'auto',
            },

            right: {
              xs: 20,
              sm: 40,
              md: 70,
              lg: '8%',
            },

            bottom: {
              xs: 24,
              md: 45,
              lg: 56,
            },

            width: {
              lg: 'min(680px, 42vw)',
            },

            bgcolor: '#EEF4F6',
            color: '#082F4D',

            border: '1px solid',
            borderColor:
              'rgba(8,47,77,0.10)',

            boxShadow:
              '0 30px 80px rgba(3,20,32,0.28)',
          }}
        >
          {/* Card top */}

          <Box
            sx={{
              px: {
                xs: 3,
                md: 4,
                lg: 5,
              },

              pt: {
                xs: 3,
                md: 4,
                lg: 5,
              },

              pb: 3,

              display: 'flex',

              justifyContent:
                'space-between',

              gap: 3,

              borderBottom: '1px solid',

              borderColor:
                'rgba(8,47,77,0.12)',
            }}
          >
            <Box
              sx={{
                display: 'flex',

                alignItems: 'center',

                gap: 1.2,

                color: '#649ABD',

                fontSize: '0.54rem',
                fontWeight: 700,

                letterSpacing:
                  '0.14em',

                textTransform:
                  'uppercase',
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,

                  borderRadius: '50%',

                  bgcolor: '#649ABD',
                }}
              />

              Start a Conversation
            </Box>


            <Box
              sx={{
                color:
                  'rgba(8,47,77,0.38)',

                fontSize: '0.5rem',
                fontWeight: 700,

                letterSpacing:
                  '0.12em',

                textTransform:
                  'uppercase',
              }}
            >
              Contact / 01
            </Box>
          </Box>


          {/* Card body */}

          <Box
            sx={{
              px: {
                xs: 3,
                md: 4,
                lg: 5,
              },

              py: {
                xs: 4,
                md: 5,
                lg: 6,
              },
            }}
          >
            <Box
              sx={{
                mb: 2,

                color: '#649ABD',

                fontSize: '0.56rem',
                fontWeight: 700,

                letterSpacing:
                  '0.15em',

                textTransform:
                  'uppercase',
              }}
            >
              Ready for the next project?
            </Box>


            <Box
              component="h2"
              sx={{
                m: 0,

                maxWidth: 570,

                fontSize: {
                  xs: '2.7rem',
                  sm: '3.8rem',
                  md: '4.6rem',
                  lg: '5rem',
                },

                fontWeight: 500,

                lineHeight: 0.96,

                letterSpacing:
                  '-0.055em',
              }}
            >
              Let’s build
              <br />
              what comes next.
            </Box>


            <Box
              sx={{
                mt: 3,

                maxWidth: 500,

                color:
                  'rgba(8,47,77,0.62)',

                fontSize: {
                  xs: '0.88rem',
                  md: '0.96rem',
                },

                lineHeight: 1.8,
              }}
            >
              {contractingContent.cta.description}
            </Box>


            {/* Enquiry categories */}

            <Box
              sx={{
                mt: {
                  xs: 4,
                  md: 5,
                },

                borderTop: '1px solid',
                borderColor:
                  'rgba(8,47,77,0.12)',
              }}
            >
              {enquiryTypes.map(
                (item, index) => (
                  <Box
                    key={item}
                    sx={{
                      py: 2,

                      display: 'grid',

                      gridTemplateColumns:
                        '42px 1fr',

                      gap: 1,

                      alignItems: 'center',

                      borderBottom:
                        '1px solid',

                      borderColor:
                        'rgba(8,47,77,0.10)',
                    }}
                  >
                    <Box
                      sx={{
                        color:
                          '#649ABD',

                        fontSize:
                          '0.5rem',

                        fontWeight:
                          700,
                      }}
                    >
                      {String(
                        index + 1,
                      ).padStart(2, '0')}
                    </Box>

                    <Box
                      sx={{
                        fontSize:
                          '0.82rem',

                        fontWeight:
                          700,
                      }}
                    >
                      {item}
                    </Box>
                  </Box>
                ),
              )}
            </Box>


            {/* CTA */}

            <Box
              sx={{
                mt: 4,

                display: 'flex',

                justifyContent: {
                  xs: 'stretch',
                  sm: 'flex-end',
                },
              }}
            >
              <Box
                component="a"

                href="https://www.fbs.com.sa/contact"

                target="_blank"
                rel="noopener noreferrer"

                sx={{
                  minHeight: 52,

                  width: {
                    xs: '100%',
                    sm: 'auto',
                  },

                  px: 3,

                  display: 'inline-flex',

                  justifyContent:
                    'center',

                  alignItems: 'center',

                  gap: 1.5,

                  bgcolor: '#082F4D',
                  color: '#FFFFFF',

                  textDecoration:
                    'none',

                  fontSize: '0.72rem',
                  fontWeight: 700,

                  letterSpacing:
                    '0.08em',

                  transition:
                    'background-color 180ms ease, color 180ms ease',

                  '& span': {
                    transition:
                      'transform 180ms ease',
                  },

                  '&:hover': {
                    bgcolor: '#649ABD',
                  },

                  '&:hover span': {
                    transform:
                      'translate(5px, -5px)',
                  },

                  '&:focus-visible': {
                    outline:
                      '2px solid #649ABD',

                    outlineOffset: 4,
                  },
                }}
              >
                Contact FBS

                <Box component="span">
                  ↗
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>


        {/* Large left message */}

        <Box
          sx={{
            position: 'absolute',

            zIndex: 2,

            left: {
              xs: 20,
              sm: 40,
              md: 70,
              lg: '8%',
            },

            bottom: {
              xs: 570,
              sm: 600,
              lg: 80,
            },

            display: {
              xs: 'none',
              lg: 'block',
            },

            maxWidth: 650,

            color: '#FFFFFF',
          }}
        >
          <Box
            sx={{
              mb: 1.5,

              color: '#B9DAF2',

              fontSize: '0.54rem',
              fontWeight: 700,

              letterSpacing:
                '0.15em',

              textTransform:
                'uppercase',
            }}
          >
            Next / FBS Contracting
          </Box>

          <Box
            sx={{
              fontSize: {
                lg: '3.4rem',
                xl: '4.2rem',
              },

              fontWeight: 500,

              lineHeight: 1.02,

              letterSpacing:
                '-0.05em',
            }}
          >
            From the first brief
            <br />
            to final delivery.
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PremiumContact