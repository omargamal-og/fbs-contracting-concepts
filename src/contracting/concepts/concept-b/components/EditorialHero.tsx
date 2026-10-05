import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import { Box } from '@mui/material'

import {
  Link as RouterLink,
} from 'react-router-dom'

import { projects } from '../../../core/data/projects'

function EditorialHero() {
  const featuredProjects = useMemo(
    () => projects.slice(0, 3),
    [],
  )

  const [activeSlide, setActiveSlide] =
    useState(0)

  useEffect(() => {
    const reduceMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

    if (
      reduceMotion ||
      featuredProjects.length <= 1
    ) {
      return
    }

    const interval = window.setInterval(
      () => {
        setActiveSlide(
          (current) =>
            (current + 1) %
            featuredProjects.length,
        )
      },
      6500,
    )

    return () => {
      window.clearInterval(interval)
    }
  }, [featuredProjects.length])

  const activeProject =
    featuredProjects[activeSlide]

  if (!activeProject) {
    return null
  }

  const scrollToProjects = () => {
    document
      .querySelector('#projects')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
  }

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',

        minHeight: {
          xs: '100svh',
          md: '100svh',
        },

        overflow: 'hidden',

        bgcolor: '#082F4D',

        color: '#FFFFFF',
      }}
    >
      {/* Background slides */}

      {featuredProjects.map(
        (project, index) => {
          const active =
            index === activeSlide

          return (
            <Box
              key={project.id}
              component="img"
              src={project.coverImage}
              alt={
                active
                  ? project.name
                  : ''
              }
              aria-hidden={!active}
              sx={{
                position: 'absolute',
                inset: 0,
              
                width: '100%',
                height: '100%',
              
                objectFit: 'cover',
              
                opacity: active ? 1 : 0,
              
                transition: 'opacity 800ms ease',
                willChange: 'opacity',
              
                filter: 'saturate(0.88) contrast(1.03)',
              
                pointerEvents: 'none',
              }}
            />
          )
        },
      )}


      {/* Cinematic overlays */}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,

          background: `
            linear-gradient(
              90deg,
              rgba(8,47,77,0.72) 0%,
              rgba(8,47,77,0.46) 36%,
              rgba(8,47,77,0.18) 70%,
              rgba(8,47,77,0.28) 100%
            ),
            linear-gradient(
              180deg,
              rgba(8,47,77,0.18) 0%,
              rgba(8,47,77,0.04) 38%,
              rgba(8,47,77,0.56) 100%
            )
          `,
        }}
      />


      {/* Content */}

      <Box
        sx={{
          position: 'relative',

          zIndex: 2,

          width: '100%',
          maxWidth: 1700,
          mx: 'auto',

          minHeight: '100svh',

          px: {
            xs: 2.5,
            sm: 4,
            md: 6,
            lg: 8,
          },

          pt: {
            xs: 15,
            md: 19,
          },

          pb: {
            xs: 4,
            md: 5,
          },

          display: 'flex',

          flexDirection: 'column',

          justifyContent:
            'space-between',
        }}
      >
        {/* Main message */}

        <Box
          sx={{
            mt: {
              xs: 'auto',
              md: '15vh',
            },

            mb: {
              xs: 6,
              md: 9,
            },

            maxWidth: 900,
          }}
        >
          <Box
            sx={{
              mb: 2.5,

              display: 'flex',
              alignItems: 'center',

              gap: 1.5,

              color:
                'rgba(255,255,255,0.72)',

              fontSize: '0.66rem',
              fontWeight: 700,

              letterSpacing: '0.15em',

              textTransform: 'uppercase',
            }}
          >
            <Box
              sx={{
                width: 40,
                height: '1px',

                bgcolor: '#B9DAF2',
              }}
            />

            FBS Contracting
          </Box>


          <Box
            component="h1"
            sx={{
              m: 0,

              maxWidth: 850,

              fontSize: {
                xs: '3.2rem',
                sm: '4.8rem',
                md: '5.9rem',
                lg: '6.8rem',
              },

              fontWeight: 500,

              lineHeight: {
                xs: 0.98,
                md: 0.94,
              },

              letterSpacing:
                '-0.06em',

              textWrap: 'balance',
            }}
          >
            Building places
            <br />

            <Box
              component="span"
              sx={{
                color: '#B9DAF2',
              }}
            >
              that endure.
            </Box>
          </Box>


          <Box
            sx={{
              mt: {
                xs: 3,
                md: 4,
              },

              maxWidth: 500,

              color:
                'rgba(255,255,255,0.76)',

              fontSize: {
                xs: '0.92rem',
                md: '1.02rem',
              },

              lineHeight: 1.75,
            }}
          >
            Construction shaped by
            precision, responsibility and
            long-term value.
          </Box>


          {/* Actions */}

          <Box
            sx={{
              mt: 4,

              display: 'flex',
              flexWrap: 'wrap',

              alignItems: 'center',

              gap: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            <Box
              component="button"
              type="button"
              onClick={scrollToProjects}
              sx={{
                minHeight: 48,

                border: 0,

                px: 3,
                py: 1.35,

                bgcolor: '#FFFFFF',
                color: '#082F4D',

                fontFamily: 'inherit',

                fontSize: '0.74rem',
                fontWeight: 700,

                letterSpacing: '0.08em',

                cursor: 'pointer',

                transition:
                  'background-color 180ms ease, transform 180ms ease',

                '&:hover': {
                  bgcolor: '#B9DAF2',

                  transform:
                    'translateY(-2px)',
                },

                '&:focus-visible': {
                  outline:
                    '2px solid #B9DAF2',

                  outlineOffset: 4,
                },
              }}
            >
              Explore Projects
            </Box>


            <Box
              component={RouterLink}
              to={`/contracting/concept-b/projects/${activeProject.slug}`}
              sx={{
                minHeight: 48,

                display: 'inline-flex',

                alignItems: 'center',

                gap: 1.2,

                color: '#FFFFFF',

                textDecoration: 'none',

                fontSize: '0.72rem',
                fontWeight: 700,

                letterSpacing: '0.08em',

                '& span': {
                  transition:
                    'transform 180ms ease',
                },

                '&:hover span': {
                  transform:
                    'translate(5px, -5px)',
                },

                '&:focus-visible': {
                  outline:
                    '2px solid #B9DAF2',

                  outlineOffset: 5,
                },
              }}
            >
              View featured project

              <Box component="span">
                ↗
              </Box>
            </Box>
          </Box>
        </Box>


        {/* Bottom information */}

        <Box
          sx={{
            pt: 2.5,
            pb: 0.5,
        
            display: 'grid',
        
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr auto',
            },
        
            gap: {
              xs: 3,
              md: 5,
            },
        
            alignItems: 'end',
        
            borderTop: '1px solid',
            borderColor: 'rgba(255,255,255,0.20)',
        
            background:
              'linear-gradient(180deg, rgba(8,47,77,0) 0%, rgba(8,47,77,0.18) 100%)',
          }}
        >
          {/* Active project */}

          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '40px 1fr',
                sm: '60px auto auto auto',
              },

              gap: {
                xs: 1.5,
                sm: 4,
              },

              alignItems: 'end',
            }}
          >
            <Box
              sx={{
                color: '#B9DAF2',

                fontSize: '0.62rem',
                fontWeight: 700,

                letterSpacing: '0.12em',
              }}
            >
              {String(
                activeSlide + 1,
              ).padStart(2, '0')}
            </Box>


            <HeroMeta
              label="Featured Project"
              value={activeProject.name}
            />

            <HeroMeta
              label="Location"
              value={activeProject.city}
            />

            <HeroMeta
              label="Region"
              value={activeProject.region}
            />
          </Box>


          {/* Slider navigation */}

          <Box
            sx={{
              display: 'flex',

              alignItems: 'center',

              gap: 1,
            }}
          >
            {featuredProjects.map(
              (project, index) => {
                const active =
                  index === activeSlide

                return (
                  <Box
                    key={project.id}
                    component="button"
                    type="button"
                    aria-label={`Show ${project.name}`}
                    aria-pressed={active}
                    onClick={() =>
                      setActiveSlide(index)
                    }
                    sx={{
                      width: active
                        ? 44
                        : 18,

                      height: 2,

                      border: 0,
                      p: 0,

                      bgcolor: active
                        ? '#B9DAF2'
                        : 'rgba(255,255,255,0.34)',

                      cursor: 'pointer',

                      transition:
                        'width 250ms ease, background-color 250ms ease',

                      '&:focus-visible': {
                        outline:
                          '2px solid #FFFFFF',

                        outlineOffset: 5,
                      },
                    }}
                  />
                )
              },
            )}
          </Box>
        </Box>
      </Box>


      {/* Scroll cue */}

      <Box
        sx={{
          display: {
            xs: 'none',
            lg: 'flex',
          },

          position: 'absolute',

          right: 22,
          top: '50%',

          zIndex: 3,

          transform:
            'translateY(-50%) rotate(90deg)',

          transformOrigin: 'center',

          alignItems: 'center',

          gap: 1.5,

          color:
            'rgba(255,255,255,0.55)',

          fontSize: '0.55rem',
          fontWeight: 700,

          letterSpacing: '0.15em',

          textTransform: 'uppercase',
        }}
      >
        Scroll to discover

        <Box
          sx={{
            width: 50,
            height: 1,

            bgcolor:
              'rgba(255,255,255,0.4)',
          }}
        />
      </Box>
    </Box>
  )
}


function HeroMeta({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Box>
      <Box
        sx={{
          mb: 0.5,

          color:
            'rgba(255,255,255,0.52)',

          fontSize: '0.5rem',
          fontWeight: 700,

          letterSpacing: '0.12em',

          textTransform: 'uppercase',
        }}
      >
        {label}
      </Box>

      <Box
        sx={{
          color: '#FFFFFF',

          fontSize: {
            xs: '0.76rem',
            md: '0.82rem',
          },

          fontWeight: 600,
        }}
      >
        {value}
      </Box>
    </Box>
  )
}

export default EditorialHero