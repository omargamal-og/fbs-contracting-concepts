import {
  Box,
  Container,
  Typography,
} from '@mui/material'

type InnerPageHeroProps = {
  eyebrow: string
  title: string
  description?: string
}

function InnerPageHero({
  eyebrow,
  title,
  description,
}: InnerPageHeroProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#FFFFFF',

        pt: {
          xs: 7,
          md: 9,
          lg: 11,
        },

        pb: {
          xs: 7,
          md: 9,
        },

        borderBottom: '1px solid',

        borderColor:
          'rgba(8,47,77,0.08)',
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
        <Typography
          sx={{
            mb: 2,

            color: '#649ABD',

            fontSize: '0.7rem',

            fontWeight: 700,

            letterSpacing: '0.16em',

            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </Typography>

        <Typography
          component="h1"
          sx={{
            m: 0,

            maxWidth: 1000,

            color: '#082F4D',

            fontSize: {
              xs: '3.2rem',
              sm: '4rem',
              md: '5.2rem',
              lg: '6rem',
            },

            fontWeight: 500,

            lineHeight: 0.94,

            letterSpacing: '-0.06em',
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            sx={{
              mt: 3,

              maxWidth: 720,

              color:
                'rgba(8,47,77,0.58)',

              fontSize: {
                xs: '0.95rem',
                md: '1.05rem',
              },

              lineHeight: 1.8,
            }}
          >
            {description}
          </Typography>
        )}

        <Box
          sx={{
            mt: {
              xs: 5,
              md: 7,
            },

            display: 'grid',

            gridTemplateColumns:
              '80px 1fr',

            gap: 2,

            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              height: '2px',

              bgcolor: '#649ABD',
            }}
          />

          <Box
            sx={{
              height: '1px',

              bgcolor:
                'rgba(8,47,77,0.10)',
            }}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default InnerPageHero