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

// Existing illustrative anchors from the Concept A map, not geographic project coordinates.
const cityPositions = {
  riyadh: { x: 59, y: 47, svgId: 'SA01' },
  jeddah: { x: 25.5, y: 65.5, svgId: 'SA02' },
  madinah: { x: 31, y: 48, svgId: 'SA03' },
  taif: { x: (248 / 800) * 100, y: (399 / 620) * 100, svgId: 'SA02' },
  tabuk: { x: 18, y: 28, svgId: 'SA07' },
} satisfies Record<ProjectRegionId, { x: number; y: number; svgId: string }>

const cityGroups = (Object.keys(cityPositions) as ProjectRegionId[])
  .map((city) => ({ city, items: projects.filter((project) => project.region === city) }))
  .filter((group) => group.items.length > 0)

// The visual offsets separate projects in one city; they do not claim exact locations.
function pinOffset(city: ProjectRegionId, index: number, count: number, compact: boolean) {
  if (city === 'riyadh') {
    const rows = Math.ceil(count / 2)
    return {
      x: (index % 2 - 0.5) * (compact ? 64 : 100),
      y: (Math.floor(index / 2) - (rows - 1) / 2) * (compact ? 68 : 100),
    }
  }

  const positions = compact
    ? {
        jeddah: { x: -32, y: 52 },
        madinah: { x: -34, y: -4 },
        taif: { x: 18, y: 60 },
        tabuk: { x: 0, y: -32 },
      }
    : {
        jeddah: { x: -40, y: 62 },
        madinah: { x: -50, y: -4 },
        taif: { x: 42, y: 76 },
        tabuk: { x: 0, y: -52 },
      }
  return positions[city]
}

type PhotoPinProps = {
  project: ContractingProject
  language: SiteLanguage
  direction: 'ltr' | 'rtl'
  size: number
  selected: boolean
  reducedMotion: boolean
  onPreview: () => void
  viewProjectLabel: string
}

function PhotoPin({ project, language, direction, size, selected, reducedMotion, onPreview, viewProjectLabel }: PhotoPinProps) {
  const projectName = project.name[language]
  const projectLocation = project.location[language]

  return (
    <Tooltip
      arrow
      describeChild
      disableTouchListener
      disableInteractive={false}
      leaveDelay={220}
      enterDelay={90}
      enterNextDelay={60}
      placement="top"
      title={
        <Box
          component={RouterLink}
          to={contractingPath(`projects/${project.slug}`)}
          aria-label={`${viewProjectLabel}: ${projectName}`}
          onMouseEnter={onPreview}
          dir={direction}
          lang={language}
          sx={{
            display: 'block', width: '100%', overflow: 'hidden',
            color: '#082F4D', textDecoration: 'none',
            '&:hover .map-hover-photo': { transform: reducedMotion ? 'none' : 'scale(1.06)' },
            '&:focus-visible': { outline: '3px solid #649ABD', outlineOffset: -3 },
            '@media (prefers-reduced-motion: reduce)': {
              '& .map-hover-photo': { transition: 'none' },
            },
          }}
        >
          {/* Clickable photo: same project-details URL as the pin. */}
          <Box sx={{
            height: 142, bgcolor: '#DAE4EA', position: 'relative', overflow: 'hidden',
          }}>
            {project.image && (
              <Box
                component="img"
                className="map-hover-photo"
                src={project.image}
                alt=""
                loading="eager"
                decoding="async"
                sx={{
                  display: 'block', width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
            )}
            <Box aria-hidden="true" sx={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(180deg, transparent 60%, rgba(8,47,77,0.30))',
            }} />
            <Box aria-hidden="true" sx={{
              position: 'absolute', top: 12, insetInlineEnd: 12,
              width: 32, height: 32, borderRadius: '50%',
              display: 'grid', placeItems: 'center',
              color: '#082F4D', bgcolor: 'rgba(255,255,255,0.94)',
              boxShadow: '0 4px 12px rgba(8,47,77,0.18)',
              fontSize: '1rem', pointerEvents: 'none',
            }}>{direction === 'rtl' ? '↖' : '↗'}</Box>
          </Box>
          <Box sx={{ px: 2, py: 1.6 }}>
            <Typography sx={{
              color: '#082F4D', fontSize: '0.92rem', fontWeight: 700,
              lineHeight: 1.45, overflowWrap: 'anywhere',
            }}>
              {projectName}
            </Typography>
            <Typography sx={{
              color: '#386682', fontSize: '0.75rem', lineHeight: 1.5, mt: 0.65,
              overflowWrap: 'anywhere',
            }}>
              {projectLocation}
            </Typography>
            <Typography component="span" sx={{
              display: 'inline-flex', mt: 1.1, color: '#082F4D',
              fontWeight: 700, fontSize: '0.73rem',
              borderBottom: '1px solid #649ABD', pb: 0.2,
            }}>{viewProjectLabel} {direction === 'rtl' ? '↖' : '↗'}</Typography>
          </Box>
        </Box>
      }
      slotProps={{
        popper: {
          dir: direction,
          lang: language,
          modifiers: [
            { name: 'offset', options: { offset: [0, 4] } },
            { name: 'flip', options: { padding: 12 } },
            { name: 'preventOverflow', options: { padding: 12 } },
          ],
          sx: { pointerEvents: 'auto', zIndex: 1400 },
        },
        transition: { timeout: reducedMotion ? 0 : 190 },
        tooltip: {
          sx: {
            p: 0,
            bgcolor: '#FFFFFF',
            maxWidth: 'min(264px, calc(100vw - 24px))',
            width: 264,
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(100,154,189,0.4)',
            boxShadow: '0 22px 58px rgba(8,47,77,0.25)',
          },
        },
        arrow: { sx: { color: '#FFFFFF' } },
      }}
    >
      <Box
        component={RouterLink}
        to={contractingPath(`projects/${project.slug}`)}
        data-project-photo-pin={project.slug}
        data-project-region={project.region}
        aria-label={`${projectName} — ${projectLocation}`}
        onMouseEnter={onPreview}
        onFocus={onPreview}
        sx={{
          position: 'relative',
          width: size,
          height: size,
          display: 'grid',
          placeItems: 'center',
          boxSizing: 'border-box',
          textDecoration: 'none',
          borderRadius: '50%',
          bgcolor: selected ? '#082F4D' : '#FFFFFF',
          color: selected ? '#FFFFFF' : '#082F4D',
          border: `2px solid ${selected ? '#082F4D' : '#649ABD'}`,
          boxShadow: selected
            ? '0 0 0 5px rgba(100,154,189,0.23), 0 10px 25px rgba(8,47,77,0.25)'
            : '0 7px 18px rgba(8,47,77,0.17)',
          cursor: 'pointer',
          isolation: 'isolate',
          '&::before': {
            content: '""', position: 'absolute', inset: -7,
            borderRadius: '50%', border: '1.5px solid #649ABD',
            opacity: selected ? 0.65 : 0, pointerEvents: 'none',
            animation: selected && !reducedMotion
              ? 'fbsMapBeacon 3.8s ease-out infinite' : 'none',
          },
          '&::after': {
            content: '""', position: 'absolute', width: 7, height: 7,
            borderRadius: '50%', insetBlockStart: 4, insetInlineEnd: 4,
            bgcolor: selected ? '#B9DAF2' : '#649ABD',
            boxShadow: '0 0 8px rgba(100,154,189,0.65)',
            pointerEvents: 'none',
          },
          '@keyframes fbsMapBeacon': {
            '0%': { opacity: 0.65, transform: 'scale(0.95)' },
            '75%, 100%': { opacity: 0, transform: 'scale(1.5)' },
          },
          transition: 'transform 230ms ease, background-color 200ms ease, box-shadow 230ms ease',
          '&:hover, &:focus-visible': {
            transform: reducedMotion ? 'none' : 'translateY(-5px) scale(1.09)',
            bgcolor: '#082F4D',
            color: '#FFFFFF',
            boxShadow: '0 0 0 6px rgba(100,154,189,0.25), 0 16px 30px rgba(8,47,77,0.28)',
            '& .pin-center': { fill: '#082F4D' },
            '&::before': { opacity: 0.95, animation: 'none', transform: 'scale(1.12)' },
          },
          '&:focus-visible': { outline: '3px solid #386682', outlineOffset: 6 },
          '&:active': { transform: reducedMotion ? 'none' : 'scale(0.95)' },
          '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&::before': { animation: 'none' } },
        }}
      >
        <Box
          component="svg"
          aria-hidden="true"
          viewBox="0 0 24 24"
          sx={{ width: size * 0.57, height: size * 0.57, display: 'block', overflow: 'visible' }}
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.87-3.13-7-7-7Z"
            fill="currentColor"
          />
          <circle className="pin-center" cx="12" cy="9" r="2.6" fill={selected ? '#082F4D' : '#FFFFFF'} />
        </Box>
      </Box>
    </Tooltip>
  )
}

function ProjectMap() {
  const t = useTranslation()
  const content = t.home.projectMap
  const { language, direction } = useLanguage()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const siteTheme = useTheme()
  const mapTheme = useMemo(() => createTheme(conceptATheme, {
    direction,
    palette: { text: { secondary: siteTheme.palette.text.secondary } },
  }), [direction, siteTheme.palette.text.secondary])

  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(projects[0]?.slug)
  const [revealed, setRevealed] = useState(false)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const selected = projects.find((project) => project.slug === selectedSlug) ?? projects[0]
  const compact = size.width < 400
  const pinSize = compact ? 44 : 48
  const visible = reducedMotion || revealed || typeof IntersectionObserver === 'undefined'

  const pins = cityGroups.flatMap((group) => group.items.map((project, index) => ({
    project,
    anchor: cityPositions[group.city],
    offset: pinOffset(group.city, index, group.items.length, compact),
  })))

  useEffect(() => {
    const element = canvasRef.current
    if (!element) return

    const measure = () => {
      const rect = element.getBoundingClientRect()
      setSize((old) => old.width === rect.width && old.height === rect.height
        ? old : { width: rect.width, height: rect.height })
    }
    measure()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const element = fieldRef.current
    if (!element || reducedMotion || revealed || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setRevealed(true)
      observer.disconnect()
    }, { threshold: 0.12 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion, revealed])

  if (!selected) return null

  return (
    <Box component="section" id="project-map" sx={{
      bgcolor: '#EEF4F6', py: { xs: 8, md: 11, lg: 13 },
    }}>
      <Container maxWidth={false} sx={{
        maxWidth: 1600, px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
      }}>
        <Box sx={{
          display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' },
          gap: { xs: 3, md: 7 }, alignItems: 'end', mb: { xs: 5, md: 7 },
        }}>
          <Box>
            <Typography sx={{
              mb: 1.5, color: 'text.secondary', fontSize: '0.7rem',
              fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>{content.eyebrow}</Typography>
            <Typography component="h2" sx={{
              m: 0, color: '#082F4D', fontSize: { xs: '2.8rem', md: '4rem', lg: '4.5rem' },
              fontWeight: 500, lineHeight: direction === 'rtl' ? 1.2 : 1.04,
              letterSpacing: direction === 'rtl' ? 0 : '-0.055em',
            }}>
              {content.titleLine1}
              <Box component="span" sx={{ display: 'block', color: '#386682' }}>
                {content.titleLine2}
              </Box>
            </Typography>
          </Box>
          <Typography sx={{
            justifySelf: { md: 'end' }, maxWidth: 520, color: '#386682',
            fontSize: '0.96rem', lineHeight: 1.8,
          }}>{content.description}</Typography>
        </Box>

        <ThemeProvider theme={mapTheme}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1.35fr) minmax(340px, 0.65fr)' },
            gap: { xs: 3, lg: 4 }, alignItems: 'stretch',
          }}>
            {/* Original Concept A Saudi outline. Project images appear on pin hover/focus. */}
            <Box data-concept-a-map-card sx={{
              minWidth: 0, display: 'flex', flexDirection: 'column',
              p: { xs: 2.5, md: 4 },
              borderRadius: { xs: '22px', md: '28px' },
              border: '1px solid rgba(100,154,189,0.25)',
              background: 'linear-gradient(145deg, #FFFFFF 0%, #EEF4F6 60%, #DAE4EA 100%)',
              backgroundImage: `linear-gradient(rgba(100,154,189,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100,154,189,0.06) 1px, transparent 1px),
                linear-gradient(145deg, #FFFFFF 0%, #EEF4F6 60%, #DAE4EA 100%)`,
              backgroundSize: '36px 36px, 36px 36px, auto',
              boxShadow: '0 18px 48px rgba(8,47,77,0.08)',
            }}>
              <Box ref={fieldRef} data-photo-map-field data-revealed={visible}
                onFocusCapture={() => setRevealed(true)}
                sx={{
                  py: { xs: 6, md: 8 },
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(12px)',
                  transition: 'opacity 650ms ease, transform 650ms ease',
                  '&:focus-within': { opacity: 1, transform: 'none' },
                  '@media (prefers-reduced-motion: reduce)': {
                    opacity: 1, transform: 'none', transition: 'none',
                  },
                }}>
                <Box ref={canvasRef} data-photo-map-canvas dir="ltr" sx={{
                  position: 'relative', width: '100%', maxWidth: 700, mx: 'auto',
                }}>
                  <Box data-project-map-svg aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: saudiMapSvg }}
                    sx={{
                      width: '100%', pointerEvents: 'none',
                      '& svg': {
                        display: 'block', width: '100%', height: 'auto',
                        filter: 'drop-shadow(0 12px 20px rgba(8,47,77,0.09))',
                      },
                      '& path': {
                        fill: '#B9DAF2', stroke: '#FFFFFF', strokeWidth: 1,
                        opacity: 0.94, transition: 'fill 300ms ease, opacity 300ms ease',
                      },
                      ['& #' + cityPositions[selected.region].svgId]: {
                        fill: '#649ABD', stroke: '#FFFFFF', strokeWidth: 2,
                        opacity: 1, filter: 'drop-shadow(0 5px 10px rgba(8,47,77,0.15))',
                      },
                    }} />

                  {/* SVG lines follow the real rendered SVG dimensions. */}
                  {size.width > 0 && (
                    <Box component="svg" aria-hidden="true" data-photo-connectors
                      viewBox={`0 0 ${size.width} ${size.height}`}
                      preserveAspectRatio="none"
                      sx={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%',
                        pointerEvents: 'none', overflow: 'visible',
                        '@keyframes fbsMapLineFlow': {
                          from: { strokeDashoffset: 0 },
                          to: { strokeDashoffset: -32 },
                        },
                      }}>
                      {pins.map(({ project, anchor, offset }) => (
                        <line key={project.slug} data-project-connector={project.slug}
                          x1={(size.width * anchor.x) / 100}
                          y1={(size.height * anchor.y) / 100}
                          x2={(size.width * anchor.x) / 100 + offset.x}
                          y2={(size.height * anchor.y) / 100 + offset.y}
                          stroke={selected.slug === project.slug ? '#082F4D' : '#649ABD'}
                          strokeWidth={selected.slug === project.slug ? 1.8 : 1.2}
                          strokeOpacity={selected.slug === project.slug ? 0.85 : 0.48}
                          strokeLinecap="round"
                          strokeDasharray={selected.slug === project.slug ? '8 8' : undefined}
                          style={{ animation: selected.slug === project.slug && !reducedMotion
                            ? 'fbsMapLineFlow 5s linear infinite' : 'none' }}
                        />
                      ))}
                    </Box>
                  )}

                  {cityGroups.map(({ city }) => (
                    <Box key={city} data-map-anchor={city} aria-hidden="true" sx={{
                      position: 'absolute',
                      left: `${cityPositions[city].x}%`, top: `${cityPositions[city].y}%`,
                      width: 10, height: 10, borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      bgcolor: '#082F4D', border: '2px solid #FFFFFF',
                      boxSizing: 'border-box', pointerEvents: 'none',
                    }}>
                      {city === selected.region && (
                        <Box sx={{
                          position: 'absolute', top: '50%', left: '50%',
                          width: 18, height: 18, borderRadius: '50%',
                          border: '1px solid rgba(100,154,189,0.65)',
                          transform: 'translate(-50%, -50%)',
                          animation: reducedMotion ? 'none' : 'fbsMapPulse 3.6s ease-out infinite',
                          '@keyframes fbsMapPulse': {
                            '0%': { opacity: 0.65, transform: 'translate(-50%, -50%) scale(0.8)' },
                            '100%': { opacity: 0, transform: 'translate(-50%, -50%) scale(2.4)' },
                          },
                        }} />
                      )}
                    </Box>
                  ))}

                  <Typography aria-hidden="true" dir={direction} sx={{
                    position: 'absolute', top: '47%', left: 'calc(59% + 8px)',
                    transform: 'translateY(-50%)',
                    fontSize: '0.62rem', lineHeight: 1.3, color: '#082F4D',
                    bgcolor: 'rgba(238,244,246,0.92)', borderRadius: '3px',
                    px: 0.5, whiteSpace: 'nowrap', pointerEvents: 'none',
                  }}>{content.projects.riyadh.location}</Typography>

                  {pins.map(({ project, anchor, offset }, index) => (
                    <Box key={project.slug} data-photo-pin-position={project.slug} sx={{
                      position: 'absolute', zIndex: 2,
                      left: `calc(${anchor.x}% + ${offset.x}px)`,
                      top: `calc(${anchor.y}% + ${offset.y}px)`,
                      transform: 'translate(-50%, -50%)',
                      '&:hover, &:focus-within': { zIndex: 4 },
                    }}>
                      <Box sx={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'none' : 'translateY(12px) scale(0.92)',
                        transition: `opacity 440ms ease ${index * 65}ms, transform 440ms ease ${index * 65}ms`,
                        '&:focus-within': { opacity: 1, transform: 'none', transitionDelay: '0ms' },
                        '@media (prefers-reduced-motion: reduce)': {
                          opacity: 1, transform: 'none', transition: 'none',
                        },
                      }}>
                        <PhotoPin
                          project={project}
                          language={language}
                          direction={direction}
                          size={pinSize}
                          selected={selected.slug === project.slug}
                          reducedMotion={reducedMotion}
                          onPreview={() => setSelectedSlug(project.slug)}
                          viewProjectLabel={content.viewProject}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{
                mt: 'auto', pt: 2, borderTop: '1px solid rgba(8,47,77,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2,
              }}>
                <Typography sx={{ color: '#386682', fontSize: '0.72rem', letterSpacing: 1.2 }}>
                  {content.countryLabel}
                </Typography>
                <Typography sx={{ color: '#386682', fontSize: '0.76rem' }}>
                  {new Intl.NumberFormat(language).format(projects.length)}{' '}
                  {projects.length === 1 ? content.projectSingular : content.projectPlural}
                </Typography>
              </Box>
              <Typography sx={{ mt: 2, color: '#386682', fontSize: '0.72rem', lineHeight: 1.6 }}>
                {content.photoPositionNote}
              </Typography>
            </Box>

            {/* Selected project preview uses its own actual photo and details route. */}
            <Box data-map-project-preview sx={{
              minWidth: 0, overflow: 'hidden', borderRadius: { xs: '22px', md: '28px' },
              bgcolor: '#082F4D', color: '#FFFFFF',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 18px 48px rgba(8,47,77,0.15)',
            }}>
              <Box sx={{ height: { xs: 230, lg: 290 }, position: 'relative', bgcolor: '#164B6B' }}>
                {selected.image && (
                  <Box component="img" key={selected.slug} src={selected.image} alt=""
                    loading="lazy" decoding="async"
                    sx={{
                      width: '100%', height: '100%', display: 'block', objectFit: 'cover',
                      animation: reducedMotion ? 'none' : 'fbsMapPreviewReveal 420ms ease both',
                      '@keyframes fbsMapPreviewReveal': {
                        from: { opacity: 0.65, transform: 'scale(1.03)' },
                        to: { opacity: 1, transform: 'scale(1)' },
                      },
                    }} />
                )}
                <Box aria-hidden="true" sx={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'linear-gradient(180deg, transparent 40%, rgba(8,47,77,0.45) 100%)',
                }} />
                <Chip size="small" label={t.home.projectCategories[selected.category].title}
                  sx={{
                    position: 'absolute', bottom: 18, insetInlineStart: 18,
                    bgcolor: '#FFFFFF', color: '#082F4D', fontWeight: 700,
                  }} />
              </Box>
              <Box sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}>
                <Typography sx={{ color: '#B9DAF2', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1.2 }}>
                  {content.selectedProjectLabel}
                </Typography>
                <Box aria-live="polite" aria-atomic="true" data-selected-project={selected.slug}>
                  <Typography component="h3" sx={{
                    m: 0, fontSize: { xs: '1.85rem', lg: '2.25rem' },
                    fontWeight: 600, lineHeight: 1.18, overflowWrap: 'anywhere',
                  }}>{selected.name[language]}</Typography>
                  <Typography sx={{ mt: 1.5, color: '#DAE4EA', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {selected.location[language]}
                  </Typography>
                </Box>
                <Typography sx={{ color: '#DAE4EA', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  {content.photoPinHint}
                </Typography>
                <Button component={RouterLink}
                  to={contractingPath(`projects/${selected.slug}`)}
                  aria-label={`${content.viewProject}: ${selected.name[language]}`}
                  sx={{
                    mt: 'auto', alignSelf: 'flex-start', minHeight: 50, px: 3.2,
                    borderRadius: '9px', bgcolor: '#FFFFFF', color: '#082F4D',
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#B9DAF2' },
                    '&:focus-visible': { outline: '2px solid #B9DAF2', outlineOffset: 4 },
                  }}>
                  {content.viewProject}
                  <Box component="span" aria-hidden="true" sx={{ marginInlineStart: 1 }}>
                    {direction === 'rtl' ? '↖' : '↗'}
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </Container>
    </Box>
  )
}

export default ProjectMap
