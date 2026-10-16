import { useEffect, useRef, useState } from 'react'
import { Box, SvgIcon, Typography, useMediaQuery } from '@mui/material'
import { useLanguage } from '../../i18n/useLanguage'
import { useTranslation } from '../../i18n/useTranslation'
import type { HeroStatisticId } from '../../i18n/types'

// Transcribed from the existing hero-projects.jpg artwork, not the concept demo data.
// These company figures remain pending official client approval.
const statistics: {
  id: HeroStatisticId; value: number; divisor?: number; plus?: boolean; unit?: 'SAR' | 'm²' | 'm³'
}[] = [
  { id: 'projectValue', value: 1_200_000_000, divisor: 1_000_000_000, plus: true, unit: 'SAR' },
  { id: 'residentialProjects', value: 15 },
  { id: 'residentialUnits', value: 3000, plus: true },
  { id: 'builtUpArea', value: 800_000, divisor: 1000, plus: true, unit: 'm²' },
  { id: 'commercialProjects', value: 30, plus: true },
  { id: 'concreteWorks', value: 200_000, divisor: 1000, plus: true, unit: 'm³' },
  { id: 'employees', value: 2000, plus: true },
]

const iconPaths: Record<HeroStatisticId, string> = {
  projectValue: 'M5 6a7 3 0 1 0 14 0A7 3 0 1 0 5 6m0 0v12c0 4 14 4 14 0V6M5 10c0 4 14 4 14 0M5 14c0 4 14 4 14 0',
  residentialProjects: 'm3 11 9-8 9 8M5 9v12h14V9M10 21v-7h4v7',
  residentialUnits: 'M5 21V4h10v17M15 10h4v11M3 21h18M8 7h1m3 0h1M8 11h1m3 0h1M8 15h1m3 0h1M9 21v-3h3v3',
  builtUpArea: 'M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5M4 4l5 5m11-5-5 5m5 11-5-5M4 20l5-5',
  commercialProjects: 'M4 21V9h7v12m0-17h8v17M2 21h20M7 12v1m0 3v1m7-10h2m-2 4h2m-2 4h2m-2 6v-3h2v3',
  concreteWorks: 'm3 7 9-4 9 4-9 4-9-4m0 5 9 4 9-4M3 17l9 4 9-4',
  employees: 'M9 8a3 3 0 1 0 6 0 3 3 0 1 0-6 0M5 21v-4c0-5 14-5 14 0v4H5M5 6a2 2 0 1 0 0 4m14-4a2 2 0 1 1 0 4M2 19v-3q0-3 4-3m16 6v-3q0-3-4-3',
}

const visuallyHidden = {
  position: 'absolute', width: 1, height: 1, p: 0, m: '-1px',
  overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0,
} as const

function HeroStatistics() {
  const { language } = useLanguage()
  const { statistics: content } = useTranslation().home.hero
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const rootRef = useRef<HTMLDListElement>(null)
  const hasStarted = useRef(false)
  const [started, setStarted] = useState(false)
  const [progress, setProgress] = useState(0)
  const visible = reducedMotion || started
  const fraction = reducedMotion ? 1 : progress
  const locale = language === 'ar' ? 'ar-SA' : 'en-US'
  const integerFormat = new Intl.NumberFormat(locale)
  const decimalFormat = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })

  useEffect(() => {
    let frame = 0
    if (reducedMotion) {
      frame = requestAnimationFrame(() => {
        hasStarted.current = true
        setStarted(true)
        setProgress(1)
      })
      return () => cancelAnimationFrame(frame)
    }
    if (hasStarted.current) return
    const root = rootRef.current
    if (!root) return
    let observer: IntersectionObserver | undefined
    const begin = () => {
      if (hasStarted.current) return
      hasStarted.current = true
      observer?.disconnect()
      setStarted(true)
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = Math.min(1, (now - start) / 1400)
        setProgress(elapsed === 1 ? 1 : 1 - Math.pow(1 - elapsed, 3))
        if (elapsed < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    if (typeof IntersectionObserver === 'undefined') frame = requestAnimationFrame(begin)
    else {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) begin()
      }, { threshold: 0.12 })
      observer.observe(root)
    }
    return () => { observer?.disconnect(); cancelAnimationFrame(frame) }
  }, [reducedMotion])

  return (
    <Box>
      <Box component="dl" ref={rootRef} data-hero-statistics aria-label={content.heading}
        aria-describedby="hero-statistics-approval" sx={{
          m: 0, display: 'grid', gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(4, minmax(0, 1fr))', lg: 'repeat(7, minmax(0, 1fr))',
          }, gap: { xs: 1.25, sm: 1.5, xl: 2 },
        }}>
        {statistics.map((stat, index) => {
          const divisor = stat.divisor ?? 1
          const scaled = stat.value / divisor
          const isDecimal = divisor === 1_000_000_000
          const format = isDecimal ? decimalFormat : integerFormat
          const count = isDecimal ? scaled * fraction : Math.floor(scaled * fraction)
          const suffix = isDecimal ? content.billion : divisor === 1000 ? content.thousand : ''
          const unit = stat.unit === 'SAR' ? content.currencyUnit : stat.unit
          const finalNumber = (stat.plus ? '+' : '') + integerFormat.format(stat.value) + (unit ? ' ' + unit : '')
          return (
            
          <Box key={stat.id} data-hero-stat={stat.id} sx={{
            position: 'relative',
            minWidth: 0,
            minHeight: { xs: 155, lg: 168 },
            p: { xs: 1.8, sm: 2, lg: 2.2 },
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',

            borderRadius: '16px',
            border: '1px solid rgba(185,218,242,0.85)',

            background: `
              linear-gradient(
                145deg,
                rgba(255,255,255,0.94) 0%,
                rgba(238,244,246,0.84) 100%
              )
            `,

            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',

            boxShadow: `
              0 10px 30px rgba(8,47,77,0.08),
              inset 0 1px 0 rgba(255,255,255,0.9)
            `,

            '&::before': {
              content: '""',
              position: 'absolute',
              insetInlineStart: 0,
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'linear-gradient(180deg, #649ABD, #B9DAF2)',
              pointerEvents: 'none',
            },

            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(14px)',

            transition: `
              opacity 600ms ease ${index * 65}ms,
              transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 65}ms,
              border-color 220ms ease,
              box-shadow 220ms ease
            `,

            '&:last-child': {
              gridColumn: { xs: '1 / -1', sm: 'auto' },
            },

            '&:hover': {
              transform: 'translateY(-5px)',
              borderColor: '#649ABD',
              boxShadow: '0 18px 40px rgba(8,47,77,0.15)',
              transitionDelay: '0ms',
            },

            '@media (prefers-reduced-motion: reduce)': {
              opacity: 1,
              transform: 'none',
              transition: 'none',
              '&:hover': {
                transform: 'none',
              },
            },
          }}>
              <Box component="dt" sx={{ display: 'contents' }}>
                <SvgIcon aria-hidden="true" viewBox="0 0 24 24" sx={{
                  width: 36,
                  height: 36,
                  mb: 1.5,
                  p: '7px',
                  borderRadius: '10px',
                  color: '#386682',
                  bgcolor: 'rgba(185,218,242,0.45)',
                  fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round',
                }}><path d={iconPaths[stat.id]} /></SvgIcon>
                <Typography component="span" sx={{
                  order: 2, mt: 0.75, color: '#082F4D', fontSize: { xs: '0.76rem', lg: '0.78rem' }, lineHeight: 1.45,
                }}>
                  {content.labels[stat.id]}{unit && <Box component="bdi" sx={{ whiteSpace: 'nowrap' }}>{' · '}{unit}</Box>}
                </Typography>
              </Box>
              <Box component="dd" sx={{ m: 0, minHeight: 40, display: 'flex', alignItems: 'center' }}>
                {/* Only this static final value is exposed to assistive technology. */}
                <Box component="span" sx={visuallyHidden} data-hero-stat-final>{finalNumber}</Box>
                <Box component="span" dir="ltr" aria-hidden="true" data-hero-stat-number sx={{
                  fontFamily: language === 'en' ? 'Georgia, "Times New Roman", serif' : 'inherit',
                  fontSize: { xs: '1.8rem', sm: '1.95rem', xl: '2.2rem' },
                  fontWeight: 600,
                  color: '#082F4D',
                  lineHeight: 1.15, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
                }}>
                  {stat.plus && '+'}{format.format(count)}
                  {suffix && <Box component="bdi" sx={{ fontSize: language === 'ar' ? '0.5em' : '0.72em', letterSpacing: 0 }}>{' '}{suffix}</Box>}
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default HeroStatistics
