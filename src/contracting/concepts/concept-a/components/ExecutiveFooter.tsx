import {
  Box,
  Container,
  Typography,
} from '@mui/material'

function ExecutiveFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#082F4D',
        color: '#fff',

        pt: {
          xs: 6,
          md: 10,
        },

        pb: 4,
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              sm: '1.25fr 0.75fr 0.75fr',
            },

            gap: {
              xs: 4,
              sm: 5,
              md: 8,
            },

            pb: {
              xs: 5,
              md: 8,
            },
          }}
        >
          {/* Brand */}
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: '2rem',
                  md: '2.8rem',
                },

                fontWeight: 600,

                letterSpacing: '-0.04em',
              }}
            >
              FBS Contracting
            </Typography>

            <Typography
              sx={{
                mt: 2,

                maxWidth: 420,

                color:
                  'rgba(255,255,255,0.46)',

                lineHeight: 1.7,
              }}
            >
              Building with quality, responsibility and
              long-term value across Saudi Arabia.
            </Typography>
          </Box>

          {/* Navigation */}
          <Box>
            <Typography
              sx={{
                color:
                  'rgba(255,255,255,0.35)',

                fontSize: '0.68rem',

                letterSpacing: 1.8,

                textTransform: 'uppercase',

                mb: 2.5,
              }}
            >
              Explore
            </Typography>

            {[
              ['About', '#about'],
              ['Capabilities', '#capabilities'],
              ['Projects', '#projects'],
              ['Our Footprint', '#footprint'],
            ].map(([label, href]) => (
              <Typography
                key={label}
                component="a"
                href={href}
                sx={{
                  display: 'block',

                  width: 'fit-content',

                  mb: 1.5,

                  color:
                    'rgba(255,255,255,0.72)',

                  textDecoration: 'none',

                  '&:hover': {
                    color: '#fff',
                  },
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>

          {/* Company */}
          <Box>
            <Typography
              sx={{
                color:
                  'rgba(255,255,255,0.35)',

                fontSize: '0.68rem',

                letterSpacing: 1.8,

                textTransform: 'uppercase',

                mb: 2.5,
              }}
            >
              Company
            </Typography>

            <Typography
              sx={{
                color:
                  'rgba(255,255,255,0.72)',

                lineHeight: 1.8,
              }}
            >
              Faisal Bin Saedan
              <br />
              Properties
            </Typography>

            <Typography
              sx={{
                mt: 2,

                color:
                  'rgba(255,255,255,0.45)',
              }}
            >
              Riyadh, Saudi Arabia
            </Typography>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box
          sx={{
            pt: 3,

            borderTop:
              '1px solid rgba(255,255,255,0.08)',

            display: 'flex',

            flexDirection: {
              xs: 'column',
              sm: 'row',
            },

            gap: 2,

            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              color:
                'rgba(255,255,255,0.30)',

              fontSize: '0.72rem',
            }}
          >
            © FBS Contracting
          </Typography>

          <Typography
            sx={{
              color:
                'rgba(255,255,255,0.30)',

              fontSize: '0.72rem',
            }}
          >
            Faisal Bin Saedan Properties
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default ExecutiveFooter