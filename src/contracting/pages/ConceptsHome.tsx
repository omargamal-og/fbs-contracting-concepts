import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material'

import { Link } from 'react-router-dom'

const concepts = [
  {
    id: 'a',
    name: 'Concept A',
    description: 'Corporate / Executive',
  },
  {
    id: 'b',
    name: 'Concept B',
    description: 'Architectural / Editorial',
  },
  {
    id: 'c',
    name: 'Concept C',
    description: 'Modern / Infrastructure / Tech',
  },
]

function ConceptsHome() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{ mb: 2 }}
      >
        FBS Contracting
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 5 }}
      >
        UI Concepts Presentation
      </Typography>

      <Grid container spacing={3}>
        {concepts.map((concept) => (
          <Grid
            key={concept.id}
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  {concept.name}
                </Typography>

                <Typography color="text.secondary">
                  {concept.description}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  component={Link}
                  to={`/contracting/concept-${concept.id}`}
                >
                  View Concept
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ConceptsHome