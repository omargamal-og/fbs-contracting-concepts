import { useMemo, useRef, useState, type MouseEvent } from 'react'
import {
  Box, Button, Chip, ListSubheader, Menu, MenuItem, Typography, Container,
  useMediaQuery,
} from '@mui/material'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'

import saudiMapSvg from '../../../core/assets/saudi-arabia.svg?raw'
import { conceptATheme } from '../../../themes/conceptATheme'
import { projects } from '../../data/projects'
import { contractingPath } from '../../config/site'
import { useLanguage } from '../../i18n/useLanguage'
import { useTranslation } from '../../i18n/useTranslation'
import type { ProjectRegionId } from '../../i18n/types'

// Visual anchors copied from Concept A's core/data/projects.ts (first pin per city).
// Taif retains the previous Home map's illustrative anchor, normalized from its
// 800 × 620 viewBox as requested. These are display anchors, not geographic data.
const cityPositions = {
  riyadh: { x: 59, y: 47, svgId: 'SA01' },
  jeddah: { x: 25.5, y: 65.5, svgId: 'SA02' },
  madinah: { x: 31, y: 48, svgId: 'SA03' },
  taif: { x: 248 / 800 * 100, y: 399 / 620 * 100, svgId: 'SA02' },
  tabuk: { x: 18, y: 28, svgId: 'SA07' },
} satisfies Record<ProjectRegionId, { x: number; y: number; svgId: string }>

const cities = (Object.keys(cityPositions) as ProjectRegionId[]).filter(
  (city) => projects.some((project) => project.region === city),
)

function ProjectMap() {
  const t = useTranslation()
  const content = t.home.projectMap
  const { language, direction } = useLanguage()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const siteTheme = useTheme()
  // Keep Concept A's visual theme and the site's accessible small-text color.
  const mapTheme = useMemo(() => createTheme(conceptATheme, {
    direction, palette: { text: { secondary: siteTheme.palette.text.secondary } },
  }), [direction, siteTheme.palette.text.secondary])
  const [selectedCity, setSelectedCity] = useState<ProjectRegionId>('riyadh')
  const [filter, setFilter] = useState<ProjectRegionId | 'all'>('all')
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [hover, setHover] = useState<{ city: ProjectRegionId | null; regionId: string; x: number; y: number } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const pinRefs = useRef<Partial<Record<ProjectRegionId, HTMLButtonElement | null>>>({})
  const selectedProjects = projects.filter((project) => project.region === selectedCity)
  const selectedCategories = [...new Set(selectedProjects.map((project) => project.category))]
  const cityName = (city: ProjectRegionId) => content.projects[city].location
  const countLabel = (count: number) =>
    new Intl.NumberFormat(language).format(count) + ' ' +
    (count === 1 ? content.projectSingular : content.projectPlural)
  const closeProjects = () => setAnchor(null)
  const openCity = (city: ProjectRegionId, element: HTMLElement) => {
    setSelectedCity(city)
    setFilter(city)
    setHover(null)
    setAnchor(element)
  }
  const nearestCity = (event: MouseEvent<HTMLElement>, candidates = cities) => {
    const bounds = canvasRef.current!.getBoundingClientRect()
    const distance = (city: ProjectRegionId) => {
      const position = cityPositions[city]
      return Math.hypot(
        event.clientX - bounds.left - bounds.width * position.x / 100,
        event.clientY - bounds.top - bounds.height * position.y / 100,
      )
    }
    return candidates.reduce((nearest, city) => distance(city) < distance(nearest) ? city : nearest)
  }
  const handlePinClick = (event: MouseEvent<HTMLButtonElement>, city: ProjectRegionId) => {
    // Nearby cities can share enlarged touch areas on a small map. Resolve pointer
    // clicks to the nearest existing anchor; keyboard clicks keep the focused city.
    const targetCity = event.detail > 0 ? nearestCity(event) : city
    const pin = pinRefs.current[targetCity]!
    pin.focus({ preventScroll: true })
    openCity(targetCity, pin)
  }
  const regionLabels: Record<string, string> = {
    SA01: cityName('riyadh'), SA02: content.makkahRegion,
    SA03: cityName('madinah'), SA07: cityName('tabuk'),
  }
  const handleRegionClick = (event: MouseEvent<HTMLDivElement>) => {
    const id = (event.target as Element).id
    const candidates = cities.filter((city) => cityPositions[city].svgId === id)
    if (!candidates.length) return
    const city = nearestCity(event, candidates)
    const pin = pinRefs.current[city]!
    pin.focus({ preventScroll: true })
    openCity(city, pin)
  }
  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (anchor) return
    const target = event.target as Element
    const city = target.closest('[data-city-pin]') ? nearestCity(event) : null
    const label = city ? cityName(city) : regionLabels[target.id]
    if (!label) { setHover(null); return }
    const bounds = event.currentTarget.getBoundingClientRect()
    setHover({ city, regionId: target.id, x: Math.max(8, Math.min(event.clientX - bounds.left + 14, bounds.width - 200)), y: event.clientY - bounds.top })
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
          {/* Same filter strip, map card, outline and side panel as Concept A. */}
          <Box sx={{
            display: 'flex', gap: { xs: 1, md: 2 },
            flexWrap: { xs: 'nowrap', md: 'wrap' },
            overflowX: { xs: 'auto', md: 'visible' },
            pb: { xs: 1, md: 0 }, scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}>
            {(['all', ...cities] as const).map((city) => (
              <Button
                key={city}
                type="button"
                aria-pressed={filter === city}
                aria-haspopup={city === 'all' ? undefined : 'menu'}
                aria-expanded={city === 'all' ? undefined : Boolean(anchor?.id === 'map-filter-' + city)}
                aria-controls={city !== 'all' && anchor?.id === 'map-filter-' + city ? 'contracting-city-projects' : undefined}
                id={'map-filter-' + city}
                onClick={(event) => {
                  if (city === 'all') {
                    setFilter('all')
                    closeProjects()
                  } else openCity(city, event.currentTarget)
                }}
                sx={{
                  flexShrink: 0, minWidth: 0, minHeight: 44, px: 2.2, py: 1.2,
                  borderRadius: 0, borderBottom: '2px solid',
                  borderColor: filter === city ? 'secondary.main' : 'transparent',
                  color: filter === city ? 'text.primary' : 'text.secondary',
                  bgcolor: 'transparent',
                  '&:hover': { bgcolor: 'transparent', color: 'text.primary' },
                }}
              >
                {city === 'all' ? content.allLocations : cityName(city)}
              </Button>
            ))}
          </Box>

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
                ref={canvasRef}
                data-city-map-canvas
                dir="ltr"
                onMouseMove={handlePointerMove}
                onMouseLeave={() => setHover(null)}
                sx={{ position: 'relative', width: '100%', maxWidth: 700, mx: 'auto' }}
              >
                <Box
                  aria-hidden="true"
                  onClick={handleRegionClick}
                  dangerouslySetInnerHTML={{ __html: saudiMapSvg }}
                  sx={{
                    width: '100%',
                    '& svg': { display: 'block', width: '100%', height: 'auto' },
                    '& path': {
                      fill: '#9DA896', stroke: '#F5F2EA', strokeWidth: 1,
                      transition: 'fill 250ms ease, opacity 250ms ease, stroke 250ms ease',
                      opacity: filter === 'all' ? 0.86 : 0.28,
                    },
                    '& #SA01, & #SA02, & #SA03, & #SA07': { cursor: 'pointer' },
                    '& #SA01:hover, & #SA02:hover, & #SA03:hover, & #SA07:hover': {
                      fill: '#AA9875', opacity: 1,
                    },
                    ['& #' + cityPositions[selectedCity].svgId]: {
                      fill: '#B29A70', stroke: '#FFFFFF', strokeWidth: 2, opacity: 1,
                      filter: 'drop-shadow(0 6px 12px rgba(154,123,79,0.18))',
                    },
                  }}
                />

                {hover && (
                  <Box dir={direction} sx={{
                    position: 'absolute',
                    left: hover.x,
                    top: hover.y, transform: 'translateY(-50%)',
                    px: 1.5, py: 0.8, maxWidth: 'calc(100% - 16px)',
                    bgcolor: '#082F4D', color: '#FFFFFF', fontSize: '0.72rem',
                    fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                    pointerEvents: 'none', zIndex: 20, boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  }} aria-hidden="true">
                    {hover.city ? cityName(hover.city) : regionLabels[hover.regionId]}
                  </Box>
                )}

                {cities.map((city) => {
                  const isActive = selectedCity === city
                  const position = cityPositions[city]
                  return (
                    <Box key={city} sx={{
                      position: 'absolute', left: position.x + '%', top: position.y + '%',
                      transform: 'translate(-50%, -50%)', zIndex: isActive ? 5 : 3,
                    }}>
                      {isActive && (
                        <Box data-map-pulse aria-hidden="true" sx={{
                          position: 'absolute', width: 32, height: 32, left: '50%', top: '50%',
                          transform: 'translate(-50%, -50%)', borderRadius: '50%',
                          border: '1px solid rgba(154,123,79,0.55)', pointerEvents: 'none',
                          animation: 'fbsMapPulse 2.6s ease-out infinite',
                          '@keyframes fbsMapPulse': {
                            '0%': { transform: 'translate(-50%, -50%) scale(0.55)', opacity: 0.65 },
                            '100%': { transform: 'translate(-50%, -50%) scale(1.7)', opacity: 0 },
                          },
                        }} />
                      )}
                      <Box
                        component="button"
                        ref={(element: HTMLButtonElement | null) => { pinRefs.current[city] = element }}
                        id={'map-pin-' + city}
                        data-city-pin={city}
                        type="button"
                        aria-label={content.viewCityProjects + ' ' + cityName(city)}
                        aria-pressed={isActive}
                        aria-haspopup="menu"
                        aria-expanded={anchor?.id === 'map-pin-' + city}
                        aria-controls={anchor?.id === 'map-pin-' + city ? 'contracting-city-projects' : undefined}
                        onClick={(event: MouseEvent<HTMLButtonElement>) => handlePinClick(event, city)}
                        sx={{
                          position: 'relative', display: 'block', width: 44, height: 44,
                          p: 0, border: 0, borderRadius: '50%', bgcolor: 'transparent', cursor: 'pointer',
                        }}
                      >
                        <Box component="span" className="city-pin-dot" aria-hidden="true" sx={{
                          position: 'absolute', left: '50%', top: '50%',
                          transform: 'translate(-50%, -50%)' + (hover?.city === city && !reduceMotion ? ' scale(1.3)' : ''),
                          boxSizing: 'border-box',
                          width: isActive ? 20 : 16, height: isActive ? 20 : 16,
                          borderRadius: '50%', border: '4px solid #FFFFFF',
                          bgcolor: isActive ? 'secondary.main' : '#082F4D',
                          opacity: filter !== 'all' && !isActive ? 0.72 : 1,
                          boxShadow: '0 2px 10px rgba(0,0,0,0.18)', pointerEvents: 'none',
                          transition: 'transform 180ms ease, background-color 180ms ease',
                        }} />
                      </Box>
                    </Box>
                  )
                })}
              </Box>

              <Box sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                gap: 2, mt: 2, pt: 2, borderTop: '1px solid rgba(23,23,23,0.08)',
              }}>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.7rem', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                  {content.countryLabel}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', flexShrink: 0 }}>
                  {countLabel(filter === 'all' ? projects.length : selectedProjects.length)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{
              bgcolor: '#082F4D', color: '#FFFFFF', p: { xs: 4, md: 5 },
              minWidth: 0, minHeight: { xs: 360, lg: 'auto' },
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <Box>
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.78)', letterSpacing: 1.6 }}>
                  {content.selectedCity}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3, mb: 4 }}>
                  {selectedCategories.map((category) => (
                    <Chip key={category} label={t.home.projectCategories[category].title} size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.09)', color: '#FFFFFF' }} />
                  ))}
                </Box>
                <Typography component="h3" variant="h3" sx={{
                  maxWidth: 380, fontSize: { xs: '2.2rem', md: '3rem' },
                  lineHeight: 1.05, overflowWrap: 'anywhere',
                }}>
                  {cityName(selectedCity)}
                </Typography>
                <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.78)', fontSize: '0.95rem' }}>
                  {countLabel(selectedProjects.length)}
                </Typography>
                <Typography sx={{ mt: 4, maxWidth: 420, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                  {content.chooseProject}
                </Typography>
              </Box>
              <Button
                id="map-city-projects-button"
                type="button"
                variant="contained"
                aria-haspopup="menu"
                aria-expanded={anchor?.id === 'map-city-projects-button'}
                aria-controls={anchor?.id === 'map-city-projects-button' ? 'contracting-city-projects' : undefined}
                onClick={(event) => { setHover(null); setAnchor(event.currentTarget) }}
                sx={{ mt: 6, alignSelf: 'flex-start', bgcolor: '#FFFFFF', color: '#082F4D', px: 3,
                  '&:hover': { bgcolor: '#E8E8E8' } }}
              >
                {content.viewProjects}
              </Button>
            </Box>
          </Box>

          <Menu
            data-contracting-portal
            dir={direction}
            lang={language}
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={closeProjects}
            transitionDuration={reduceMotion ? 0 : undefined}
            marginThreshold={16}
            anchorOrigin={{ vertical: 'top', horizontal: direction === 'rtl' ? 'right' : 'left' }}
            transformOrigin={{ vertical: 'bottom', horizontal: direction === 'rtl' ? 'right' : 'left' }}
            slotProps={{
              paper: {
                dir: direction, lang: language,
                sx: {
                  width: 320, maxWidth: 'calc(100vw - 32px)',
                  maxHeight: 'min(440px, calc(100dvh - 32px))',
                  bgcolor: '#082F4D', color: '#FFFFFF', borderRadius: 0,
                  boxShadow: '0 18px 45px rgba(0,0,0,0.22)',
                },
              },
              list: { id: 'contracting-city-projects', 'aria-labelledby': 'contracting-city-projects-heading' },
            }}
          >
            <ListSubheader component="li" role="presentation" disableSticky sx={{
              bgcolor: '#082F4D', color: '#FFFFFF', px: 2, py: 1.5, lineHeight: 1.5,
              borderBottom: '1px solid rgba(255,255,255,0.18)',
            }}>
              <Typography id="contracting-city-projects-heading" component="h3" sx={{ fontSize: '1rem', fontWeight: 700 }}>
                {cityName(selectedCity)}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.78)' }}>
                {countLabel(selectedProjects.length)}
              </Typography>
            </ListSubheader>
            {selectedProjects.map((project) => (
              <MenuItem
                key={project.slug}
                component={RouterLink}
                to={contractingPath('projects/' + project.slug)}
                aria-label={project.name[language]}
                onClick={closeProjects}
                sx={{
                  minHeight: 56, px: 2, py: 1.5, gap: 2,
                  alignItems: 'center', whiteSpace: 'normal', textAlign: 'start',
                  borderBottom: '1px solid rgba(255,255,255,0.12)',
                  '&:hover, &.Mui-focusVisible': { bgcolor: 'rgba(255,255,255,0.12)' },
                }}
              >
                <Box sx={{ minWidth: 0, flex: 1, overflowWrap: 'anywhere' }}>
                  <Typography component="span" sx={{ display: 'block', fontSize: '0.85rem', fontWeight: 700 }}>
                    {project.name[language]}
                  </Typography>
                  <Typography component="span" sx={{ display: 'block', mt: 0.4, fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)' }}>
                    {t.home.projectCategories[project.category].title}
                  </Typography>
                </Box>
                <Box component="span" aria-hidden="true">{direction === 'rtl' ? '↖' : '↗'}</Box>
              </MenuItem>
            ))}
          </Menu>
        </ThemeProvider>
      </Container>
    </Box>
  )
}

export default ProjectMap
