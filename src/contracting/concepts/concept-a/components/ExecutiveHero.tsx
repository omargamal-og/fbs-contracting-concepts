import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material'

import {
  useEffect,
  useState,
} from 'react'

import { contractingContent } from '../../../data/content'

const heroImages = [
  'https://atheelco.com/wp-content/uploads/2025/08/6-villa-shot-2-1067x800-1-1024x768.webp',

  'https://atheelco.com/wp-content/uploads/2025/08/A1-copy-1067x800-1-1024x768.webp',

  'https://atheelco.com/wp-content/uploads/2023/11/1-2-1024x576.jpg.webp',
]

function ExecutiveHero() {
  const [activeSlide, setActiveSlide] =
    useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) =>
        current === heroImages.length - 1
          ? 0
          : current + 1,
      )
    }, 5500)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        bgcolor: '#171717',
        color: '#fff',
      }}
    >
      {/* Background Slides */}
      {heroImages.map((image, index) => (
        <Box
          key={image}
          sx={{
            position: 'absolute',
            inset: 0,

            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',

            opacity:
              index === activeSlide
                ? 1
                : 0,

            transform:
              index === activeSlide
                ? 'scale(1.04)'
                : 'scale(1)',

            transition:
              'opacity 1200ms ease, transform 6500ms ease',

            zIndex: 0,
          }}
        />
      ))}

      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,

          background:
            'linear-gradient(90deg, rgba(15,15,15,0.92) 0%, rgba(15,15,15,0.72) 42%, rgba(15,15,15,0.20) 75%, rgba(15,15,15,0.06) 100%)',

          zIndex: 1,
        }}
      />

      {/* Bottom Gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,

          background:
            'linear-gradient(0deg, rgba(0,0,0,0.48) 0%, transparent 38%)',

          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container
        sx={{
          position: 'relative',
          zIndex: 2,

          minHeight: '100vh',

          display: 'flex',
          alignItems: 'center',

          py: {
            xs: 8,
            md: 10,
          },

          pt: {
            xs: 12,
            md: 14,
          },
        }}
      >
        <Box
          sx={{
            maxWidth: 900,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: '#D0B382',

              fontWeight: 700,

              letterSpacing: 2.8,

              fontSize: {
                xs: '0.72rem',
                md: '0.78rem',
              },
            }}
          >
            {contractingContent.hero.eyebrow}
          </Typography>

          <Typography
            component="h1"
            sx={{
              mt: 2.5,

              maxWidth: 900,

              fontSize: {
                xs: '3.3rem',
                sm: '4.5rem',
                md: '6.3rem',
              },

              lineHeight: {
                xs: 1,
                md: 0.95,
              },

              letterSpacing: '-0.045em',

              fontWeight: 600,
            }}
          >
            {contractingContent.hero.title}
          </Typography>

          <Typography
            sx={{
              mt: 4,

              maxWidth: 630,

              color:
                'rgba(255,255,255,0.72)',

              fontSize: {
                xs: '1rem',
                md: '1.18rem',
              },

              lineHeight: 1.8,
            }}
          >
            {contractingContent.hero.description}
          </Typography>

          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={2}
            sx={{
              mt: 5,

              alignItems: {
                xs: 'stretch',
                sm: 'flex-start',
              },
            }}
          >
            <Button
              href="#projects"
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#fff',
                color: '#171717',

                px: 3.5,
                py: 1.5,

                '&:hover': {
                  bgcolor: '#EAEAEA',
                },
              }}
            >
              Explore Projects
            </Button>

            <Button
              href="#about"
              variant="outlined"
              size="large"
              sx={{
                px: 3.5,
                py: 1.5,

                color: '#fff',

                borderColor:
                  'rgba(255,255,255,0.42)',

                '&:hover': {
                  borderColor: '#fff',

                  bgcolor:
                    'rgba(255,255,255,0.05)',
                },
              }}
            >
              About FBS Contracting
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Slide Indicator */}
      <Box
        sx={{
          position: 'absolute',

          left: {
            xs: 24,
            md: 48,
          },

          bottom: {
            xs: 24,
            md: 38,
          },

          zIndex: 3,

          display: 'flex',
          gap: 1,
        }}
      >
        {heroImages.map((_, index) => (
          <Box
            key={index}
            component="button"
            type="button"
            aria-label={`Show hero slide ${index + 1}`}
            onClick={() =>
              setActiveSlide(index)
            }
            sx={{
              width:
                index === activeSlide
                  ? 42
                  : 16,

              height: 3,

              p: 0,
              border: 0,

              bgcolor:
                index === activeSlide
                  ? '#D0B382'
                  : 'rgba(255,255,255,0.4)',

              cursor: 'pointer',

              transition:
                'width 250ms ease, background-color 250ms ease',
            }}
          />
        ))}
      </Box>

      {/* Side Label */}
      <Typography
        sx={{
          display: {
            xs: 'none',
            lg: 'block',
          },

          position: 'absolute',

          right: 36,
          bottom: 42,

          zIndex: 3,

          color:
            'rgba(255,255,255,0.48)',

          fontSize: '0.68rem',

          letterSpacing: 2.4,

          textTransform: 'uppercase',

          writingMode: 'vertical-rl',
        }}
      >
        Building across Saudi Arabia
      </Typography>
    </Box>
  )
}

export default ExecutiveHero