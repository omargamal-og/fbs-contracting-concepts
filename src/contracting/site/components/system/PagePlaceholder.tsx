import { Box } from '@mui/material'

type PagePlaceholderProps = {
  eyebrow?: string
  title: string
}

function PagePlaceholder({
  eyebrow = 'FBS Contracting',
  title,
}: PagePlaceholderProps) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 3,
        bgcolor: '#EEF4F6',
        color: '#082F4D',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1100,
        }}
      >
        <Box
          sx={{
            mb: 2,
            color: '#649ABD',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </Box>

        <Box
          component="h1"
          sx={{
            m: 0,
            fontSize: {
              xs: '3rem',
              md: '5rem',
            },
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: '-0.055em',
          }}
        >
          {title}
        </Box>
      </Box>
    </Box>
  )
}

export default PagePlaceholder