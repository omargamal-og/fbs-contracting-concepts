import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'

import { contractingContent } from '../../../data/content'

function ExecutiveCTA() {
  return (
    <Box
      id="contact"
      component="section"
      sx={{
        position: 'relative',

        bgcolor: '#9A7B4F',
        color: '#fff',

        overflow: 'hidden',

        py: {
          xs: 10,
          md: 15,
        },

        scrollMarginTop: {
          xs: 72,
          md: 84,
        },
        
      }}
    >
      {/* Decorative number */}
      <Typography
        aria-hidden="true"
        sx={{
          position: 'absolute',

          right: {
            xs: -30,
            md: 40,
          },

          top: {
            xs: 15,
            md: -35,
          },

          color:
            'rgba(255,255,255,0.055)',

          fontSize: {
            xs: '12rem',
            md: '22rem',
          },

          fontWeight: 700,

          lineHeight: 1,

          pointerEvents: 'none',
        }}
      >
        01
      </Typography>

      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color:
              'rgba(255,255,255,0.65)',

            fontWeight: 700,

            letterSpacing: 2.4,
          }}
        >
          Start a Conversation
        </Typography>

        <Typography
          variant="h2"
          sx={{
            mt: 2.5,

            maxWidth: 900,

            fontSize: {
              xs: '3rem',
              md: '6rem',
            },

            lineHeight: 0.98,

            letterSpacing: '-0.045em',
          }}
        >
          {contractingContent.cta.title}
        </Typography>

        <Box
          sx={{
            mt: 5,

            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr auto',
            },

            gap: 4,

            alignItems: 'end',
          }}
        >
          <Typography
            sx={{
              maxWidth: 600,

              color:
                'rgba(255,255,255,0.72)',

              fontSize: {
                xs: '1rem',
                md: '1.12rem',
              },

              lineHeight: 1.8,
            }}
          >
            {contractingContent.cta.description}
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              justifySelf: {
                xs: 'stretch',
                sm: 'start',
                md: 'end',
              },
            
              width: {
                xs: '100%',
                sm: 'auto',
              },
            
              bgcolor: '#fff',
              color: '#171717',
            
              px: 4,
              py: 1.7,
            
              '&:hover': {
                bgcolor: '#ECECEC',
              },
            }}
          >
            Contact FBS Contracting
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default ExecutiveCTA