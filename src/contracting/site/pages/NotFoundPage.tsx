import { Box, Button, Container } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import InnerPageHero from '../components/inner/InnerPageHero'
import { contractingPath } from '../config/site'
import { useTranslation } from '../i18n/useTranslation'
import { siteTokens } from '../theme/tokens'

function NotFoundPage() {
  const { notFound } = useTranslation()

  return (
    <Box
      component="main"
      sx={{ bgcolor: siteTokens.colors.white, minHeight: '60vh' }}
    >
      <InnerPageHero
        eyebrow="404"
        title={notFound.title}
        description={notFound.description}
      />

      <Container
        maxWidth={false}
        sx={{
          maxWidth: siteTokens.layout.maxWidth,
          px: siteTokens.layout.pagePadding,
          py: 6,
        }}
      >
        <Button
          component={RouterLink}
          to={contractingPath()}
          variant="contained"
          sx={{ minHeight: 48, borderRadius: siteTokens.radius.small }}
        >
          {notFound.backToHome}
        </Button>
      </Container>
    </Box>
  )
}

export default NotFoundPage
