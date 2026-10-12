import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'
import { useTranslation } from '../../i18n/useTranslation'

function VisionMissionPage() {
  const t = useTranslation()

  const content = t.innerPages.about.visionMission

  const sections = [
    {
      number: '01',
      ...content.vision,
    },
    {
      number: '02',
      ...content.mission,
    },
  ]

  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#FFFFFF',
      }}
    >
      <InnerPageHero
        eyebrow={content.eyebrow}
        title={content.title}
      />

      <Box
        component="section"
        sx={{
          py: {
            xs: 8,
            md: 12,
          },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1600,

            px: {
              xs: 2.5,
              sm: 4,
              md: 6,
              lg: 8,
            },
          }}
        >
          {/* Vision and Mission */}

          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, minmax(0, 1fr))',
              },

              gap: 3,
            }}
          >
            {sections.map((section) => (
              <Box
                key={section.number}
                sx={{
                  p: {
                    xs: 4,
                    md: 5,
                  },

                  borderRadius: '24px',

                  bgcolor: '#EEF4F6',

                  border: '1px solid #DAE4EA',

                  minHeight: 320,

                  display: 'flex',

                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{
                    color: '#649ABD',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  {section.number}
                </Typography>

                <Box
                  sx={{
                    width: 48,
                    height: '2px',
                    bgcolor: '#649ABD',
                    mt: 3,
                    mb: 3,
                  }}
                />

                <Typography
                  component="h2"
                  sx={{
                    color: '#082F4D',

                    fontSize: {
                      xs: '2rem',
                      md: '2.5rem',
                    },

                    fontWeight: 600,

                    mb: 3,
                  }}
                >
                  {section.title}
                </Typography>

                <Typography
                  sx={{
                    color: '#40586B',

                    fontSize: '1.05rem',

                    lineHeight: 1.9,
                  }}
                >
                  {section.description}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Objectives */}

          <Box
            sx={{
              mt: {
                xs: 9,
                md: 12,
              },

              pt: 7,

              borderTop:
                '1px solid #DAE4EA',
            }}
          >
            <Typography
              component="h2"
              sx={{
                color: '#082F4D',

                fontSize: {
                  xs: '2.2rem',
                  md: '3rem',
                },

                fontWeight: 600,

                mb: 5,
              }}
            >
              {content.objectives.title}
            </Typography>

            <Box
              sx={{
                display: 'grid',

                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(3, minmax(0, 1fr))',
                },

                gap: 3,
              }}
            >
              {content.objectives.items.map(
                (objective, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 3,

                      borderInlineStart:
                        '3px solid #649ABD',

                      bgcolor: '#FFFFFF',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#649ABD',

                        fontSize: '0.8rem',

                        fontWeight: 700,

                        mb: 2,
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </Typography>

                    <Typography
                      sx={{
                        color: '#082F4D',

                        fontSize: '1.05rem',

                        lineHeight: 1.8,
                      }}
                    >
                      {objective}
                    </Typography>
                  </Box>
                ),
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default VisionMissionPage