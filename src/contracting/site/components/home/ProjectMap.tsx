import {
  useState,
} from 'react'

import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'

import {
  Link as RouterLink,
} from 'react-router-dom'

import {
  contractingPath,
} from '../../config/site'

import {
  useTranslation,
} from '../../i18n/useTranslation'

type ProjectId =
  | 'riyadh'
  | 'jeddah'
  | 'dammam'

const projectPositions: Record<
  ProjectId,
  {
    x: string
    y: string
    slug: string
  }
> = {
  riyadh: {
    x: '56%',
    y: '45%',
    slug: 'riyadh-residential-development',
  },

  jeddah: {
    x: '25%',
    y: '48%',
    slug: 'jeddah-commercial-development',
  },

  dammam: {
    x: '72%',
    y: '34%',
    slug: 'eastern-province-development',
  },
}

function ProjectMap() {
  const t = useTranslation()

  const [selectedProject, setSelectedProject] =
    useState<ProjectId>('riyadh')

  const project =
    t.home.projectMap.projects[
      selectedProject
    ]

  const projectConfig =
    projectPositions[selectedProject]

  return (
    <Box
      component="section"
      id="project-map"
      sx={{
        bgcolor: '#EEF4F6',

        py: {
          xs: 8,
          md: 11,
          lg: 13,
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
        {/* Heading */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: '0.9fr 1.1fr',
            },

            gap: {
              xs: 3,
              md: 7,
            },

            alignItems: 'end',

            mb: {
              xs: 5,
              md: 7,
            },
          }}
        >
          <Box>
            <Typography
              sx={{
                mb: 1.5,

                color: '#649ABD',

                fontSize: '0.7rem',

                fontWeight: 700,

                letterSpacing: '0.16em',

                textTransform: 'uppercase',
              }}
            >
              {t.home.projectMap.eyebrow}
            </Typography>

            <Typography
              component="h2"
              sx={{
                m: 0,

                color: '#082F4D',

                fontSize: {
                  xs: '2.8rem',
                  md: '4rem',
                  lg: '4.5rem',
                },

                fontWeight: 500,

                lineHeight: 0.98,

                letterSpacing: '-0.055em',
              }}
            >
              {t.home.projectMap.titleLine1}

              <Box
                component="span"
                sx={{
                  display: 'block',

                  color: '#649ABD',
                }}
              >
                {t.home.projectMap.titleLine2}
              </Box>
            </Typography>
          </Box>

          <Typography
            sx={{
              justifySelf: {
                md: 'end',
              },

              maxWidth: 520,

              color: 'rgba(8,47,77,0.58)',

              fontSize: '0.96rem',

              lineHeight: 1.8,
            }}
          >
            {t.home.projectMap.description}
          </Typography>
        </Box>

        {/* Map Panel */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              lg: '1.45fr 0.55fr',
            },

            bgcolor: '#FFFFFF',

            borderRadius: {
              xs: '22px',
              md: '30px',
            },

            overflow: 'hidden',

            border: '1px solid',

            borderColor:
              'rgba(8,47,77,0.08)',

            boxShadow:
              '0 24px 70px rgba(8,47,77,0.07)',
          }}
        >
          {/* Map */}

          <Box
            sx={{
              position: 'relative',

              minHeight: {
                xs: 470,
                md: 620,
                lg: 680,
              },

              bgcolor: '#F7FAFB',

              overflow: 'hidden',
            }}
          >
            {/* Saudi Arabia SVG */}

            <Box
              component="svg"
              viewBox="0 0 800 620"
              preserveAspectRatio="xMidYMid meet"
              sx={{
                position: 'absolute',

                inset: '8%',

                width: '84%',
                height: '84%',
              }}
            >
              <path
                d="
                  M190 110
                  L350 95
                  L505 125
                  L590 195
                  L610 270
                  L575 335
                  L605 410
                  L520 500
                  L390 535
                  L270 505
                  L205 430
                  L170 340
                  L145 245
                  Z
                "
                fill="#DAE4EA"
                stroke="#A1B4BF"
                strokeWidth="2"
              />

              <path
                d="
                  M190 110
                  L350 95
                  L505 125
                "
                fill="none"
                stroke="#B9DAF2"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </Box>

            {/* Pins */}

            {(
              Object.keys(
                projectPositions,
              ) as ProjectId[]
            ).map((id) => {
              const position =
                projectPositions[id]

              const isSelected =
                selectedProject === id

              return (
                <Box
                  key={id}

                  component="button"

                  type="button"

                  onClick={() =>
                    setSelectedProject(id)
                  }

                  aria-label={
                    t.home.projectMap.projects[
                      id
                    ].title
                  }

                  sx={{
                    position: 'absolute',

                    left: position.x,
                    top: position.y,

                    transform:
                      'translate(-50%, -50%)',

                    width: isSelected
                      ? 28
                      : 20,

                    height: isSelected
                      ? 28
                      : 20,

                    p: 0,

                    borderRadius: '50%',

                    border: '5px solid',

                    borderColor:
                      '#FFFFFF',

                    bgcolor: isSelected
                      ? '#082F4D'
                      : '#649ABD',

                    boxShadow:
                      '0 8px 22px rgba(8,47,77,0.22)',

                    cursor: 'pointer',

                    transition:
                      'width 180ms ease, height 180ms ease, background-color 180ms ease',

                    '&::after': {
                      content: '""',

                      position: 'absolute',

                      inset: -10,

                      borderRadius: '50%',

                      border: '1px solid',

                      borderColor:
                        isSelected
                          ? 'rgba(8,47,77,0.25)'
                          : 'transparent',
                    },
                  }}
                />
              )
            })}

            {/* Map Label */}

            <Box
              sx={{
                position: 'absolute',

                left: {
                  xs: 20,
                  md: 30,
                },

                bottom: {
                  xs: 20,
                  md: 30,
                },

                color:
                  'rgba(8,47,77,0.38)',

                fontSize: '0.6rem',

                fontWeight: 700,

                letterSpacing: '0.14em',

                textTransform: 'uppercase',
              }}
            >
              Saudi Arabia
            </Box>
          </Box>

          {/* Project Preview */}

          <Box
            sx={{
              p: {
                xs: 3,
                md: 4,
                lg: 5,
              },

              display: 'flex',

              flexDirection: 'column',

              justifyContent:
                'space-between',

              bgcolor: '#FFFFFF',

              borderInlineStart: {
                lg: '1px solid',
              },

              borderColor:
                'rgba(8,47,77,0.08)',
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: '#649ABD',

                  fontSize: '0.62rem',

                  fontWeight: 700,

                  letterSpacing: '0.14em',

                  textTransform:
                    'uppercase',
                }}
              >
                {project.type}
              </Typography>

              <Typography
                component="h3"
                sx={{
                  mt: 1.5,

                  mb: 0,

                  color: '#082F4D',

                  fontSize: {
                    xs: '2rem',
                    lg: '2.6rem',
                  },

                  fontWeight: 500,

                  lineHeight: 1,

                  letterSpacing: '-0.045em',
                }}
              >
                {project.title}
              </Typography>

              <Typography
                sx={{
                  mt: 2,

                  color:
                    'rgba(8,47,77,0.50)',

                  fontSize: '0.86rem',

                  fontWeight: 600,
                }}
              >
                {project.location}
              </Typography>
            </Box>

            <Button
              component={RouterLink}

              to={contractingPath(
                `projects/${projectConfig.slug}`,
              )}

              sx={{
                mt: {
                  xs: 4,
                  lg: 8,
                },

                alignSelf: 'flex-start',

                minHeight: 48,

                px: 2.8,

                bgcolor: '#082F4D',

                color: '#FFFFFF',

                borderRadius: '999px',

                fontSize: '0.74rem',

                fontWeight: 700,

                '&:hover': {
                  bgcolor: '#649ABD',
                },
              }}
            >
              {t.home.projectMap.viewProject}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ProjectMap