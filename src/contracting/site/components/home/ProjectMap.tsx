import { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Button, Chip, Container, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'

import saudiMapSvg from '../../../core/assets/saudi-arabia.svg?raw'
import { conceptATheme } from '../../../themes/conceptATheme'
import { projects, type ContractingProject } from '../../data/projects'
import { contractingPath } from '../../config/site'
import { useLanguage } from '../../i18n/useLanguage'
import { useTranslation } from '../../i18n/useTranslation'
import type { ProjectRegionId, SiteLanguage } from '../../i18n/types'

// Existing display anchors from Concept A; Taif keeps the previously approved
// Home anchor normalized from its 800 × 620 viewBox. No new geographic data.
const cityPositions = {
  riyadh: { x: 59, y: 47, svgId: 'SA01' },
  jeddah: { x: 25.5, y: 65.5, svgId: 'SA02' },
  madinah: { x: 31, y: 48, svgId: 'SA03' },
  taif: { x: 248 / 800 * 100, y: 399 / 620 * 100, svgId: 'SA02' },
  tabuk: { x: 18, y: 28, svgId: 'SA07' },
} satisfies Record<ProjectRegionId, { x: number; y: number; svgId: string }>

const cityGroups = (Object.keys(cityPositions) as ProjectRegionId[]).map((city) => ({
  city,
  projects: projects.filter((project) => project.region === city),
})).filter((group) => group.projects.length > 0)

// CSS-pixel display offsets keep thumbnails apart; these are not project coordinates.
function photoOffset(city: ProjectRegionId, index: number, count: number, compact: boolean) {
  if (city === 'riyadh') {
    const rows = Math.ceil(count / 2)
    return {
      x: (index % 2 - 0.5) * (compact ? 64 : 100),
      y: (Math.floor(index / 2) - (rows - 1) / 2) * (compact ? 68 : 100),
    }
  }
  const offsets = compact
    ? { jeddah: { x: -32, y: 52 }, madinah: { x: -34, y: -4 }, taif: { x: 18, y: 60 }, tabuk: { x: 0, y: -32 } }
    : { jeddah: { x: -40, y: 62 }, madinah: { x: -50, y: -4 }, taif: { x: 42, y: 76 }, tabuk: { x: 0, y: -52 } }
  return offsets[city]
}

type PhotoPinProps = {
  project: ContractingProject
  language: SiteLanguage
  direction: 'rtl' | 'ltr'
  size: number
  selected: boolean
  reduceMotion: boolean
  onPreview: () => void
}

function ProjectPhotoPin({ project, language, direction, size, selected, reduceMotion, onPreview }: PhotoPinProps) {
  const portalAttributes = { 'data-contracting-portal': true, dir: direction, lang: language }
  return (
    <Tooltip
      title={project.name[language]}
      describeChild
      arrow
      disableTouchListener
      enterDelay={100}
      enterNextDelay={80}
      placement="top"
      slotProps={{
        popper: { ...portalAttributes, modifiers: [{ name: 'preventOverflow', options: { padding: 12 } }] },
        transition: { timeout: reduceMotion ? 0 : 160 },
        tooltip: { sx: {
          bgcolor: '#082F4D', color: '#FFFFFF', borderRadius: '8px',
          maxWidth: 'min(260px, calc(100vw - 24px))', px: 1.5, py: 1,
          fontSize: '0.75rem', lineHeight: 1.5, textAlign: 'start', overflowWrap: 'anywhere',
          boxShadow: '0 8px 24px rgba(8,47,77,0.18)',
        } },
        arrow: { sx: { color: '#082F4D' } },
      }}
    >
      <Box
        component={RouterLink}
        to={contractingPath('projects/' + project.slug)}
        data-project-photo-pin={project.slug}
        data-project-region={project.region}
        aria-label={project.name[language]}
        onMouseEnter={onPreview}
        onFocus={onPreview}
        sx={{
          display: 'block', width: size, height: size, borderRadius: '13px',
          textDecoration: 'none', position: 'relative', cursor: 'pointer',
          '&:hover .photo-pin-frame, &:focus-visible .photo-pin-frame': {
            borderColor: '#9A7B4F', boxShadow: '0 0 0 3px rgba(178,154,112,0.20), 0 10px 24px rgba(8,47,77,0.22)',
          },
          '&:hover .photo-pin-image, &:focus-visible .photo-pin-image': {
            transform: reduceMotion ? 'none' : 'scale(1.08)',
          },
          '&:active .photo-pin-frame': { transform: reduceMotion ? 'none' : 'scale(0.97)' },
        }}
      >
        <Box className="photo-pin-frame" sx={{
          width: '100%', height: '100%', boxSizing: 'border-box',
          overflow: 'hidden', borderRadius: '13px', border: '2px solid #9A7B4F',
          bgcolor: '#DAE4EA',
          boxShadow: selected ? '0 0 0 2px rgba(178,154,112,0.20), 0 8px 20px rgba(8,47,77,0.18)' : '0 5px 14px rgba(8,47,77,0.16)',
          transition: 'box-shadow 200ms ease, border-color 200ms ease, transform 100ms ease',
        }}>
          {project.image && (
            <Box component="img" className="photo-pin-image"
              src={project.image} alt="" loading="lazy" decoding="async" draggable={false}
              width={size} height={size}
              sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 260ms ease' }}
            />
          )}
        </Box>
      </Box>
    </Tooltip>
  )
}

function ProjectMap() {
  const t = useTranslation()
  const content = t.home.projectMap
  const { language, direction } = useLanguage()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const siteTheme = useTheme()
  const mapTheme = useMemo(() => createTheme(conceptATheme, {
    direction, palette: { text: { secondary: siteTheme.palette.text.secondary } },
  }), [direction, siteTheme.palette.text.secondary])
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug)
  const [revealed, setRevealed] = useState(false)
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const selectedProject = projects.find((project) => project.slug === selectedSlug) ?? projects[0]
  const compact = mapSize.width < 400
  const pinSize = compact ? 44 : 60
  const visible = reduceMotion || revealed || typeof IntersectionObserver === 'undefined'
  const photoPins = cityGroups.flatMap((group) => group.projects.map((project, index) => ({
    project,
    offset: photoOffset(group.city, index, group.projects.length, compact),
    anchor: cityPositions[group.city],
  })))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setMapSize((current) => current.width === width && current.height === height ? current : { width, height })
    })
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const field = fieldRef.current
    if (!field || reduceMotion || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setRevealed(true)
      observer.disconnect()
    }, { threshold: 0.14 })
    observer.observe(field)
    return () => observer.disconnect()
  }, [reduceMotion])

  if (!selectedProject) return null

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

                color: 'text.secondary',

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

                  color: '#4F7F9C',
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

              color: 'rgba(8,47,77,0.72)',

              fontSize: '0.96rem',

              lineHeight: 1.8,
            }}
          >
            {t.home.projectMap.description}
          </Typography>
        </Box>

        <ThemeProvider theme={mapTheme}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.35fr) minmax(360px, 0.65fr)' },
            gap: { xs: 3, lg: 4 }, alignItems: 'stretch',
          }}>
            <Box data-concept-a-map-card sx={{
              bgcolor: '#ECE9DF', border: '1px solid rgba(23,23,23,0.10)',
              minWidth: 0, p: { xs: 2.5, md: 5 }, display: 'flex', flexDirection: 'column',
            }}>
              <Box
                ref={fieldRef}
                data-photo-map-field
                data-revealed={visible}
                onFocusCapture={() => setRevealed(true)}
                sx={{
                  pt: { xs: 6, sm: 5 }, pb: { xs: 9, sm: 11 },
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(10px)',
                  transition: 'opacity 600ms ease, transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                  '&:focus-within': { opacity: 1, transform: 'none', transitionDelay: '0ms' },
                  '@media (prefers-reduced-motion: reduce)': { opacity: 1, transform: 'none', transition: 'none' },
                }}
              >
                <Box ref={canvasRef} data-photo-map-canvas dir="ltr"
                  sx={{ position: 'relative', width: '100%', maxWidth: 700, mx: 'auto' }}>
                  <Box
                    data-project-map-svg
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: saudiMapSvg }}
                    sx={{
                      width: '100%', pointerEvents: 'none',
                      '& svg': { display: 'block', width: '100%', height: 'auto' },
                      '& path': {
                        fill: '#9DA896', stroke: '#F5F2EA', strokeWidth: 1, opacity: 0.86,
                        transition: 'fill 250ms ease, opacity 250ms ease, stroke 250ms ease',
                      },
                      ['& #' + cityPositions[selectedProject.region].svgId]: {
                        fill: '#B29A70', stroke: '#FFFFFF', strokeWidth: 2, opacity: 1,
                        filter: 'drop-shadow(0 6px 12px rgba(154,123,79,0.18))',
                      },
                    }}
                  />

                  {/* Connector endpoints follow the existing SVG's CSS size. */}
                  {mapSize.width > 0 && (
                    <Box component="svg" aria-hidden="true" data-photo-connectors sx={{
                      position: 'absolute', inset: 0, width: '100%', height: '100%',
                      overflow: 'visible', pointerEvents: 'none',
                    }}>
                      {photoPins.map(({ project, anchor, offset }) => (
                        <line key={project.slug} data-project-connector={project.slug}
                          x1={mapSize.width * anchor.x / 100} y1={mapSize.height * anchor.y / 100}
                          x2={mapSize.width * anchor.x / 100 + offset.x} y2={mapSize.height * anchor.y / 100 + offset.y}
                          stroke="#9A7B4F" strokeWidth={selectedSlug === project.slug ? 1.4 : 1}
                          strokeOpacity={selectedSlug === project.slug ? 0.7 : 0.4}
                          strokeLinecap="round"
                        />
                      ))}
                    </Box>
                  )}

                  {cityGroups.map(({ city }) => (
                    <Box key={city} data-map-anchor={city} aria-hidden="true" sx={{
                      position: 'absolute', left: cityPositions[city].x + '%', top: cityPositions[city].y + '%',
                      transform: 'translate(-50%, -50%)', width: 10, height: 10,
                      borderRadius: '50%', bgcolor: '#082F4D', border: '2px solid #FFFFFF',
                      boxSizing: 'border-box', pointerEvents: 'none',
                    }}>
                      {city === selectedProject.region && (
                        <Box data-photo-anchor-pulse sx={{
                          position: 'absolute', left: '50%', top: '50%', width: 18, height: 18,
                          border: '1px solid rgba(154,123,79,0.42)', borderRadius: '50%',
                          animation: 'fbsPhotoAnchorPulse 6s ease-out infinite', pointerEvents: 'none',
                          '@keyframes fbsPhotoAnchorPulse': {
                            '0%, 25%': { transform: 'translate(-50%, -50%) scale(0.8)', opacity: 0 },
                            '35%': { transform: 'translate(-50%, -50%) scale(0.9)', opacity: 0.3 },
                            '75%, 100%': { transform: 'translate(-50%, -50%) scale(1.8)', opacity: 0 },
                          },
                        }} />
                      )}
                    </Box>
                  ))}
                  <Typography aria-hidden="true" dir={direction} sx={{
                    position: 'absolute', left: 'calc(59% + 8px)', top: '47%',
                    transform: 'translateY(-50%)', fontSize: '0.62rem', lineHeight: 1.3,
                    color: '#082F4D', bgcolor: 'rgba(236,233,223,0.94)', px: 0.4,
                    borderRadius: '3px', whiteSpace: 'nowrap', pointerEvents: 'none',
                  }}>
                    {content.projects.riyadh.location}
                  </Typography>

                  {photoPins.map(({ project, anchor, offset }, index) => (
                    <Box key={project.slug} data-photo-pin-position={project.slug} sx={{
                      position: 'absolute',
                      left: 'calc(' + anchor.x + '% + ' + offset.x + 'px)',
                      top: 'calc(' + anchor.y + '% + ' + offset.y + 'px)',
                      transform: 'translate(-50%, -50%)', zIndex: 2,
                      '&:hover, &:focus-within': { zIndex: 3 },
                    }}>
                      <Box data-photo-pin-entrance sx={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'none' : 'translateY(10px) scale(0.94)',
                        transition: 'opacity 420ms ease ' + index * 55 + 'ms, transform 420ms cubic-bezier(0.22, 1, 0.36, 1) ' + index * 55 + 'ms',
                        '&:focus-within': { opacity: 1, transform: 'none', transitionDelay: '0ms' },
                        '@media (prefers-reduced-motion: reduce)': { opacity: 1, transform: 'none', transition: 'none' },
                      }}>
                        <ProjectPhotoPin project={project} language={language} direction={direction}
                          size={pinSize} selected={selectedProject.slug === project.slug} reduceMotion={reduceMotion}
                          onPreview={() => setSelectedSlug(project.slug)} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2,
                mt: 'auto', pt: 2, borderTop: '1px solid rgba(23,23,23,0.08)',
              }}>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.7rem', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                  {content.countryLabel}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', flexShrink: 0 }}>
                  {new Intl.NumberFormat(language).format(projects.length)}{' '}
                  {projects.length === 1 ? content.projectSingular : content.projectPlural}
                </Typography>
              </Box>
              <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '0.72rem', lineHeight: 1.6 }}>
                {content.photoPositionNote}
              </Typography>
            </Box>

            <Box data-map-project-preview sx={{
              bgcolor: '#082F4D', color: '#FFFFFF', p: { xs: 4, md: 5 },
              minWidth: 0, minHeight: { xs: 360, lg: 'auto' },
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <Box>
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.78)', letterSpacing: 1.6 }}>
                  {content.selectedProjectLabel}
                </Typography>
                <Box sx={{ mt: 3, mb: 4 }}>
                  <Chip label={t.home.projectCategories[selectedProject.category].title} size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.09)', color: '#FFFFFF' }} />
                </Box>
                <Box aria-live="polite" aria-atomic="true">
                  <Typography component="h3" variant="h3" sx={{
                    maxWidth: 380, fontSize: { xs: '2rem', md: '2.5rem' }, lineHeight: 1.1, overflowWrap: 'anywhere',
                  }}>
                    {selectedProject.name[language]}
                  </Typography>
                  <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.78)', fontSize: '0.95rem' }}>
                    {selectedProject.location[language]}
                  </Typography>
                </Box>
                <Typography sx={{ mt: 4, maxWidth: 420, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                  {content.photoPinHint}
                </Typography>
              </Box>
              <Button component={RouterLink} to={contractingPath('projects/' + selectedProject.slug)}
                aria-label={content.viewProject + ': ' + selectedProject.name[language]}
                variant="contained" sx={{
                  mt: 6, alignSelf: 'flex-start', bgcolor: '#FFFFFF', color: '#082F4D', px: 3,
                  '&:hover': { bgcolor: '#E8E8E8' },
                }}>
                {content.viewProject}
              </Button>
            </Box>
          </Box>
        </ThemeProvider>
      </Container>
    </Box>
  )
}

export default ProjectMap
