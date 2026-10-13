import { useLanguage } from '../../i18n/useLanguage'

import {
  getFeaturedProjectByRegion,
} from '../../data/projects'

import {
  useEffect,
  useRef,
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

import type { ProjectRegionId } from '../../i18n/types'

type ProjectId = ProjectRegionId

// Illustrative anchors in the existing 800 × 620 viewBox, not geographic coordinates.
const projectPositions: Record<ProjectId, { x: number; y: number }> = {
  riyadh: { x: 457, y: 303 },
  jeddah: { x: 219, y: 347 },
  madinah: { x: 286, y: 244 },
  taif: { x: 248, y: 399 },
  tabuk: { x: 229, y: 162 },
}

function ProjectMap() {
  const t = useTranslation()

  const { language } = useLanguage()

  const [selectedProject, setSelectedProject] =
  useState<ProjectId>('riyadh')

  const mapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [mapTransform, setMapTransform] = useState<
    Pick<DOMMatrix, 'a' | 'b' | 'c' | 'd' | 'e' | 'f'> | null
  >(null)

  useEffect(() => {
    const map = mapRef.current
    const svg = svgRef.current
    if (!map || !svg) return

    // Include the SVG's meet/letterboxing transform while keeping native buttons
    // and their tap targets at a readable CSS size outside the scaled drawing.
    const observer = new ResizeObserver(() => {
      const matrix = svg.getScreenCTM()
      if (!matrix) return
      const bounds = map.getBoundingClientRect()
      setMapTransform({
        a: matrix.a,
        b: matrix.b,
        c: matrix.c,
        d: matrix.d,
        e: matrix.e - bounds.left,
        f: matrix.f - bounds.top,
      })
    })
    observer.observe(svg)
    observer.observe(map)
    return () => observer.disconnect()
  }, [])

  const project =
  getFeaturedProjectByRegion(selectedProject)

  if (!project) {
    return null
  }

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
            ref={mapRef}
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
              ref={svgRef}
              aria-hidden="true"
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

            {mapTransform && (
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
                    getFeaturedProjectByRegion(id)?.name[language] ??
                    t.home.projectMap.projects[id].title
                  }

                  aria-pressed={isSelected}

                  sx={{
                    position: 'absolute',

                    left: mapTransform.a * position.x +
                      mapTransform.c * position.y + mapTransform.e,
                    top: mapTransform.b * position.x +
                      mapTransform.d * position.y + mapTransform.f,

                    transform:
                      'translate(-50%, -50%)',

                    width: { xs: 32, sm: 44 },
                    height: { xs: 32, sm: 44 },
                    p: 0,
                    border: 0,
                    borderRadius: '50%',
                    bgcolor: 'transparent',
                    cursor: 'pointer',
                    '&:focus-visible': {
                      outline: '2px solid #082F4D',
                      outlineOffset: 3,
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                      width: isSelected ? 28 : 20,
                      height: isSelected ? 28 : 20,
                      boxSizing: 'border-box',
                      borderRadius: '50%',
                      border: '5px solid #FFFFFF',
                      bgcolor: isSelected ? '#082F4D' : '#649ABD',
                      boxShadow: '0 8px 22px rgba(8,47,77,0.22)',
                      transition:
                        'width 180ms ease, height 180ms ease, background-color 180ms ease',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: -10,
                        borderRadius: '50%',
                        border: '1px solid',
                        borderColor: isSelected
                          ? 'rgba(8,47,77,0.25)'
                          : 'transparent',
                      },
                    }}
                  />
                </Box>
              )
            })}

            {/* Map Label */}

            <Box
              sx={{
                position: 'absolute',

                insetInlineStart: {
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
              {t.home.projectMap.countryLabel}
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
            <Box aria-live="polite">
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
                {t.home.projectCategories[project.category].title}
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
                {project.name[language]}
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
                {project.location[language]}
              </Typography>
            </Box>

            <Button
              component={RouterLink}

              to={contractingPath(
                `projects/${project.slug}`,
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