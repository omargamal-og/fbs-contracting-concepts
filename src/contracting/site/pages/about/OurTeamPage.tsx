import { useEffect, useRef, useState } from 'react'
import { Box, Container, Typography, useMediaQuery } from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'
import { useTranslation } from '../../i18n/useTranslation'
import type { ManagementMemberId } from '../../i18n/types'

import nawafImage from '../../assets/images/team/uniform/nawaf-binshuail.png'
import waelImage from '../../assets/images/team/uniform/wael-darkazanli.png'
import ahmedImage from '../../assets/images/team/uniform/ahmed-talat.png'
import mashaelImage from '../../assets/images/team/uniform/mashael-alraqaib.png'
import nasserImage from '../../assets/images/team/uniform/nasser-yaseen.png'
import khaledImage from '../../assets/images/team/uniform/khaled-mansour.png'

const managementImages: Record<ManagementMemberId, string> = {
  nawaf: nawafImage,
  wael: waelImage,
  ahmed: ahmedImage,
  mashael: mashaelImage,
  nasser: nasserImage,
  khaled: khaledImage,
}

const colors = {
  navy: '#082F4D',
  blue: '#386682',
  sky: '#649ABD',
  pale: '#B9DAF2',
  line: '#D5E5EF',
  mist: '#EEF4F6',
} as const

const portraitBackground =
  'radial-gradient(ellipse 70% 65% at 50% 65%, rgba(185,218,242,0.85) 0%, rgba(218,228,234,0.55) 56%, transparent 100%), linear-gradient(150deg, #F4F9FC 5%, #DAE4EA 100%)'

function OurTeamPage() {
  const t = useTranslation()
  const content = t.innerPages.about.ourTeam
  const ceo = content.members.find((member) => member.id === 'nawaf')
  const management = content.members.filter((member) => member.id !== 'nawaf')
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (reduceMotion) return
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') {
      // Avoid hiding the portraits in older browsers.
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.08 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [reduceMotion])

  if (!ceo) return null

  const revealed = isVisible || reduceMotion
  const entranceStyle = (delay: number) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.975)',
    transition: `opacity 720ms ease ${delay}ms, transform 820ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, border-color 300ms ease, box-shadow 300ms ease`,
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      transform: 'none',
      transition: 'none',
    },
  })

  return (
    <Box component="main" sx={{ bgcolor: '#FFFFFF' }}>
      <InnerPageHero eyebrow={content.eyebrow} title={content.title} />

      <Box
        component="section"
        ref={sectionRef}
        aria-labelledby="team-leadership-title"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 8, md: 12, lg: 14 },
          bgcolor: '#F7FAFC',
          backgroundImage: `
            radial-gradient(circle at 8% 24%, rgba(185,218,242,0.26), transparent 32%),
            radial-gradient(circle at 94% 80%, rgba(100,154,189,0.10), transparent 30%)
          `,
        }}
      >
        <Container
          maxWidth={false}
          sx={{ maxWidth: 1600, px: { xs: 2.5, sm: 4, md: 6, lg: 8 } }}
        >
          {/* Leadership heading */}
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
            <Box aria-hidden="true" sx={{ width: 48, height: 3, mx: 'auto', mb: 2.5, bgcolor: colors.sky, borderRadius: 3 }} />
            <Typography
              id="team-leadership-title"
              component="h2"
              sx={{
                m: 0,
                color: colors.navy,
                fontSize: { xs: '1.9rem', sm: '2.2rem', md: '2.7rem' },
                fontWeight: 650,
                lineHeight: 1.3,
              }}
            >
              {content.leadershipTitle}
            </Typography>
          </Box>

          {/* CEO: top of the visual tree */}
          <Box sx={{ maxWidth: 820, mx: 'auto', ...entranceStyle(0) }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 0.94fr) minmax(0, 1.06fr)' },
                overflow: 'hidden',
                borderRadius: { xs: '22px', md: '28px' },
                border: `1px solid ${colors.line}`,
                bgcolor: '#FFFFFF',
                boxShadow: '0 24px 70px rgba(8,47,77,0.10)',
                '&:hover .ceo-sheen': { transform: 'translateX(340%) skewX(-18deg)' },
                '&:hover .ceo-portrait': { filter: 'saturate(1.10) contrast(1.025)' },
                '@media (prefers-reduced-motion: reduce)': {
                  '&:hover .ceo-sheen': { transform: 'none' },
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: { xs: 280, sm: 320, md: 355 },
                  bgcolor: colors.mist,
                  background: portraitBackground,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    insetInline: 0,
                    bottom: 0,
                    height: '30%',
                    background: 'linear-gradient(0deg, rgba(8,47,77,0.055), transparent)',
                    pointerEvents: 'none',
                  },
                }}
              >
                <Box
                  component="img"
                  className="ceo-portrait"
                  src={managementImages[ceo.id]}
                  alt={ceo.name}
                  width={700}
                  height={520}
                  loading="eager"
                  decoding="async"
                  sx={{
                    display: 'block',
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center bottom',
                    transition: 'filter 600ms ease',
                    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                  }}
                />
                <Box
                  className="ceo-sheen"
                  aria-hidden="true"
                  sx={{
                    position: 'absolute', top: 0, bottom: 0, left: 0, width: '34%',
                    zIndex: 1, pointerEvents: 'none',
                    background: 'linear-gradient(105deg, transparent, rgba(255,255,255,0.32), transparent)',
                    transform: 'translateX(-130%) skewX(-18deg)',
                    transition: 'transform 900ms cubic-bezier(0.22, 1, 0.36, 1)',
                    '@media (prefers-reduced-motion: reduce)': { display: 'none' },
                  }}
                />
              </Box>

              <Box
                sx={{
                  minWidth: 0,
                  px: { xs: 3.5, sm: 4.5, md: 6 },
                  py: { xs: 4, md: 5 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  aria-hidden="true"
                  sx={{ fontSize: '0.76rem', letterSpacing: '0.2em', fontWeight: 800, color: colors.sky, mb: 3 }}
                >
                  01
                </Typography>
                <Box aria-hidden="true" sx={{ width: 44, height: 2, bgcolor: colors.sky, mb: 2.5 }} />
                <Typography
                  component="h3"
                  sx={{
                    m: 0,
                    color: colors.navy,
                    fontSize: { xs: '1.9rem', sm: '2.1rem', md: '2.6rem' },
                    fontWeight: 650,
                    lineHeight: 1.23,
                    overflowWrap: 'break-word',
                  }}
                >
                  {ceo.name}
                </Typography>
                <Typography
                  sx={{ mt: 1.7, color: colors.blue, fontSize: { xs: '1rem', md: '1.12rem' }, fontWeight: 600, lineHeight: 1.65 }}
                >
                  {ceo.role}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Visual connectors are decorative, not an assertion of reporting lines. */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'relative',
              height: 108,
              mt: 0,
              display: { xs: 'none', lg: 'block' },
              opacity: revealed ? 1 : 0,
              transition: 'opacity 550ms ease 350ms',
              '@media (prefers-reduced-motion: reduce)': { opacity: 1, transition: 'none' },
            }}
          >
            {/* Draw the hierarchy: stem, horizontal branch, then five vertical branches. */}
            <Box sx={{
              position: 'absolute', left: '50%', top: 0, height: 43,
              borderInlineStart: `2px solid ${colors.sky}`,
              transformOrigin: 'center top', transform: revealed ? 'scaleY(1)' : 'scaleY(0)',
              transition: 'transform 430ms ease 220ms',
              '@media (prefers-reduced-motion: reduce)': { transform: 'none', transition: 'none' },
            }} />
            <Box sx={{
              position: 'absolute', left: '10%', right: '10%', top: 42, height: 2,
              bgcolor: colors.sky, borderRadius: 2,
              transformOrigin: 'center', transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 720ms cubic-bezier(0.22, 1, 0.36, 1) 600ms',
              '@media (prefers-reduced-motion: reduce)': { transform: 'none', transition: 'none' },
            }} />
            {[10, 30, 50, 70, 90].map((position, index) => (
              <Box key={position} sx={{
                position: 'absolute', left: `${position}%`, top: 42, height: 66,
                borderInlineStart: `2px solid ${colors.line}`,
                transformOrigin: 'center top', transform: revealed ? 'scaleY(1)' : 'scaleY(0)',
                transition: `transform 390ms ease ${1160 + index * 85}ms`,
                '@media (prefers-reduced-motion: reduce)': { transform: 'none', transition: 'none' },
              }} />
            ))}
          </Box>

          {/* Management team */}
          <Box sx={{ mt: { xs: 9, md: 10, lg: 0 } }}>
            <Typography
              component="h2"
              sx={{
                m: 0,
                mb: { xs: 4, lg: 5 },
                color: colors.navy,
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 650,
                textAlign: { xs: 'start', lg: 'center' },
              }}
            >
              {content.managementTitle}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'minmax(0, 1fr)',
                  sm: 'repeat(2, minmax(0, 1fr))',
                  md: 'repeat(3, minmax(0, 1fr))',
                  lg: 'repeat(5, minmax(0, 1fr))',
                },
                gap: { xs: 2.5, md: 3, lg: 2 },
                alignItems: 'stretch',
              }}
            >
              {management.map((member, index) => (
                <Box
                  key={member.id}
                  sx={{
                    minWidth: 0,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    border: `1px solid ${colors.line}`,
                    bgcolor: '#FFFFFF',
                    boxShadow: '0 8px 28px rgba(8,47,77,0.045)',
                    ...entranceStyle(110 + index * 85),
                    // A blue line draws across the bottom instead of lifting the card.
                    '&::after': {
                      content: '""', position: 'absolute', insetInline: 0, bottom: 0,
                      height: 3, background: `linear-gradient(90deg, ${colors.sky}, ${colors.pale})`,
                      transform: 'scaleX(0)', transformOrigin: 'center',
                      transition: 'transform 530ms cubic-bezier(0.22, 1, 0.36, 1)',
                      pointerEvents: 'none',
                    },
                    '&:hover': {
                      borderColor: colors.sky,
                      boxShadow: '0 14px 38px rgba(8,47,77,0.11)',
                    },
                    '&:hover::after': { transform: 'scaleX(1)' },
                    '&:hover .team-portrait': {
                      filter: 'saturate(1.12) contrast(1.04)',
                    },
                    '&:hover .team-light-sweep': {
                      transform: 'translateX(340%) skewX(-18deg)',
                    },
                    '&:hover .team-portrait-halo': {
                      opacity: 1, transform: 'scale(1.12)',
                    },
                    '@media (prefers-reduced-motion: reduce)': {
                      opacity: 1, transform: 'none', transition: 'none',
                      '&::after': { transition: 'none' },
                      '& .team-light-sweep': { display: 'none' },
                      '& .team-portrait-halo': { transition: 'none' },
                      '& .team-portrait': { transition: 'none' },
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: { xs: 265, sm: 240, md: 235, lg: 210, xl: 235 },
                      overflow: 'hidden',
                      background: portraitBackground,
                      bgcolor: colors.mist,
                    }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{ position: 'absolute', insetInline: '12%', bottom: 6, height: 1, bgcolor: 'rgba(100,154,189,0.22)' }}
                    />
                    <Box
                      className="team-portrait-halo"
                      aria-hidden="true"
                      sx={{
                        position: 'absolute', left: '11%', top: 5, width: '78%',
                        aspectRatio: '1', borderRadius: '50%', pointerEvents: 'none',
                        background: 'radial-gradient(circle, rgba(185,218,242,0.75), transparent 70%)',
                        opacity: 0.35, transform: 'scale(0.92)',
                        transition: 'opacity 600ms ease, transform 650ms ease',
                      }}
                    />
                    <Box
                      component="img"
                      className="team-portrait"
                      src={managementImages[member.id]}
                      alt={member.name}
                      width={700}
                      height={520}
                      loading="lazy"
                      decoding="async"
                      sx={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center bottom',
                        filter: 'saturate(0.82)',
                        transition: 'filter 600ms ease',
                        '@media (prefers-reduced-motion: reduce)': { transition: 'none', filter: 'none' },
                      }}
                    />
                    {/* Decorative light sweep; no animation runs continuously. */}
                    <Box
                      className="team-light-sweep"
                      aria-hidden="true"
                      sx={{
                        position: 'absolute', top: 0, bottom: 0, left: 0,
                        width: '38%', zIndex: 2, pointerEvents: 'none',
                        background: 'linear-gradient(105deg, transparent, rgba(255,255,255,0.38), transparent)',
                        transform: 'translateX(-130%) skewX(-18deg)',
                        transition: 'transform 820ms cubic-bezier(0.22, 1, 0.36, 1)',
                        '@media (prefers-reduced-motion: reduce)': { display: 'none' },
                      }}
                    />
                  </Box>
                  <Box sx={{ p: { xs: 3, lg: 2.3, xl: 3 }, minHeight: 165, flexGrow: 1 }}>
                    <Typography
                      aria-hidden="true"
                      sx={{ color: colors.sky, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', mb: 1.5 }}
                    >
                      {String(index + 2).padStart(2, '0')}
                    </Typography>
                    <Typography
                      component="h3"
                      sx={{ m: 0, color: colors.navy, fontSize: { xs: '1.23rem', lg: '1.08rem', xl: '1.22rem' }, fontWeight: 650, lineHeight: 1.38, overflowWrap: 'break-word' }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      sx={{ mt: 1.1, color: colors.blue, fontSize: { xs: '0.9rem', lg: '0.81rem', xl: '0.9rem' }, lineHeight: 1.65 }}
                    >
                      {member.role}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default OurTeamPage
