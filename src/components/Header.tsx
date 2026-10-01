import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

import { Link } from 'react-router-dom'

function Header() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            FBS Contracting
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to="/"
              color="inherit"
            >
              Home
            </Button>

            <Button
              component={Link}
              to="/projects"
              color="inherit"
            >
              Projects
            </Button>

            <Button
              component={Link}
              to="/concept-a"
              color="inherit"
            >
              Concept A
            </Button>

            <Button
              component={Link}
              to="/concept-b"
              color="inherit"
            >
              Concept B
            </Button>

            <Button
              component={Link}
              to="/concept-c"
              color="inherit"
            >
              Concept C
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header