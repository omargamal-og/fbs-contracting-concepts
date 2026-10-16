import { Box, Button, Container, SvgIcon, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import heroArchitectureImage from '../../assets/images/home/fbs-hero-architecture.webp'
import { contractingPath } from '../../config/site'
import { useLanguage } from '../../i18n/useLanguage'
import { useTranslation } from '../../i18n/useTranslation'
import HeroStatistics from './HeroStatistics'

const entrance = {
  animation: 'fbsHeroEntrance 800ms cubic-bezier(0.22, 1, 0.36, 1) both',
  '@keyframes fbsHeroEntrance': {
    from: { opacity: 0, transform: 'translateY(14px)' },
    to: { opacity: 1, transform: 'none' },
  },
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none', opacity: 1, transform: 'none',
  },
}

function HomeHero() {
  const t = useTranslation()
  const { direction, language } = useLanguage()
  const rtl = direction === 'rtl'

  return (
    <Box component="section" id="hero" aria-labelledby="contracting-hero-title" sx={{
      position: 'relative', isolation: 'isolate', bgcolor: '#EEF4F6', color: '#082F4D',
      display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gridTemplateRows: '1fr auto',
      minHeight: { lg: 'calc(100svh - 84px)' },
    }}>
      {/* A clean, existing project image; the approved reference is not used as artwork. */}
      <Box data-hero-backdrop sx={{
        gridColumn: 1, gridRow: { xs: '1', lg: '1 / 3' }, position: 'relative',
        minWidth: 0, minHeight: { xs: 600, sm: 620, lg: 0 }, zIndex: 0, overflow: 'hidden',
      }}>
        <Box component="img" src={heroArchitectureImage} alt={t.home.hero.imageAlt}
          width={1672} height={941} loading="eager" fetchPriority="high"
          sx={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: { xs: '72% center', lg: 'center center' },
          }} />
        <Box aria-hidden="true" sx={{
          position: 'absolute', inset: 0,
          background: {
            xs: `linear-gradient(
              180deg,
              rgba(246,249,250,0.98) 0%,
              rgba(246,249,250,0.93) 38%,
              rgba(246,249,250,0.55) 62%,
              rgba(246,249,250,0.10) 82%
            )`,

            lg: `
              linear-gradient(
                ${rtl ? '270deg' : '90deg'},
                rgba(246,249,250,0.98) 0%,
                rgba(246,249,250,0.88) 24%,
                rgba(246,249,250,0.50) 41%,
                rgba(246,249,250,0.04) 64%,
                transparent 78%
              ),
              linear-gradient(
                0deg,
                rgba(238,244,246,0.30) 0%,
                transparent 28%
              )
            `,
          },
        }} />
      </Box>

      <Container maxWidth={false} sx={{
        gridColumn: 1, gridRow: 1, zIndex: 1, position: 'relative', maxWidth: 1760,
        px: { xs: 2.5, sm: 4, md: 5, lg: 6, xl: 8 },
        pt: { xs: 6, sm: 8, lg: 9 }, pb: { xs: 27, sm: 30, lg: 10 },
        alignSelf: 'start',
      }}>
        <Box sx={{ maxWidth: { xs: 560, lg: '48%' }, minWidth: 0 }}>
          <Typography component="p" sx={{
            ...entrance, m: 0, mb: 2.5, color: '#386682', fontSize: '0.68rem',
            fontWeight: 700, letterSpacing: rtl ? '0.04em' : '0.2em', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: 1.5,
            '&::before': { content: '""', width: 32, height: 1, bgcolor: '#9A7B4F', flexShrink: 0 },
          }}>
            {t.home.hero.eyebrow}
          </Typography>
          <Typography component="h1" id="contracting-hero-title" sx={{
            ...entrance, animationDelay: '100ms', m: 0,
            fontFamily: language === 'en' ? 'Georgia, "Times New Roman", serif' : 'inherit',
            fontSize: { xs: '2.65rem', sm: '3.8rem', lg: '4.4rem', xl: '5rem' },
            fontWeight: 500, lineHeight: rtl ? 1.2 : 1.07,
            letterSpacing: rtl ? '-0.035em' : '-0.045em', overflowWrap: 'break-word',
          }}>
            {t.home.hero.titleLine1}
            <Box
              component="span"
              sx={{
                display: 'block',
                color: '#386682',
              }}
            >
              {t.home.hero.titleLine2}
            </Box>
          </Typography>
          <Typography component="p" sx={{
            ...entrance, animationDelay: '200ms', mt: 3, mb: 0, maxWidth: 510,
            color: '#314F61', fontSize: { xs: '0.94rem', sm: '1.02rem' }, lineHeight: 1.8,
          }}>
            {t.home.hero.description}
          </Typography>
          <Box sx={{
            ...entrance, animationDelay: '300ms', mt: 3.5, display: 'flex', flexWrap: 'wrap', gap: 1.5,
            '&:focus-within': { animation: 'none', opacity: 1, transform: 'none' },
          }}>
            <Button component={RouterLink} to={contractingPath('projects/residential')}
              endIcon={<SvgIcon aria-hidden="true" sx={{ transform: rtl ? 'scaleX(-1)' : 'none' }}>
                <path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </SvgIcon>}
              sx={{
                minHeight: 52, px: 3, gap: 1, borderRadius: '8px', bgcolor: '#082F4D', color: '#FFFFFF',
                fontSize: '0.8rem', boxShadow: '0 8px 24px rgba(8,47,77,0.16)',
                transition: 'background-color 200ms ease, box-shadow 200ms ease',
                '& .MuiButton-endIcon': { margin: 0 },
                '&:hover': {
                  bgcolor: '#164B6B',
                  boxShadow: '0 12px 30px rgba(8,47,77,0.24)',
                },
              }}>
              {t.home.hero.primaryCta}
            </Button>
            <Button component={RouterLink} to={contractingPath('about/who-we-are')} variant="outlined" sx={{
              minHeight: 52, px: 3, borderRadius: '8px', color: '#082F4D', fontSize: '0.8rem',
              bgcolor: 'rgba(255,255,255,0.88)', borderColor: 'rgba(8,47,77,0.22)',
              backdropFilter: 'blur(8px)',
              '&:hover': { bgcolor: '#FFFFFF', borderColor: '#649ABD' },
            }}>
              {t.home.hero.secondaryCta}
            </Button>
          </Box>
        </Box>
      </Container>

      <Container maxWidth={false} sx={{
        gridColumn: 1, gridRow: 2, zIndex: 1, position: 'relative', maxWidth: 1760,
        px: { xs: 2.5, sm: 4, md: 5, lg: 6, xl: 8 },
        pt: { xs: 3, lg: 0 }, pb: { xs: 4, lg: 3.5 },
      }}>
        <HeroStatistics />
      </Container>
    </Box>
  )
}

export default HomeHero
