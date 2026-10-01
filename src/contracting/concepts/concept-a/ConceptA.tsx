import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Stack,
  Typography,
} from '@mui/material'

import { ThemeProvider } from '@mui/material/styles'

import { contractingContent } from '../../data/content'
import { projects } from '../../core/data/projects'
import { conceptATheme } from '../../themes/conceptATheme'
import ExecutiveProjectMap from './components/ExecutiveProjectMap'


function ConceptA() {
  return (
    <ThemeProvider theme={conceptATheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        {/* Header */}
        <Box
          component="header"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            bgcolor: 'rgba(246, 244, 239, 0.92)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Container>
            <Stack
              direction="row"
              sx={{
                height: 80,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700 }}
              >
                FBS Contracting
              </Typography>

              <Stack
                direction="row"
                spacing={3}
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex',
                  },
                }}
              >
                <Button
                  href="#about"
                  color="inherit"
                >
                  About
                </Button>

                <Button
                  href="#capabilities"
                  color="inherit"
                >
                  Capabilities
                </Button>

                <Button
                  href="#projects"
                  color="inherit"
                >
                  Projects
                </Button>

                <Button
                  href="#contact"
                  variant="contained"
                >
                  Contact
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Hero */}
        <Box
          component="section"
          sx={{
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Container>
            <Typography
              variant="overline"
              sx={{
                color: 'secondary.main',
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              {contractingContent.hero.eyebrow}
            </Typography>

            <Typography
              component="h1"
              variant="h1"
              sx={{
                maxWidth: 900,
                mt: 2,
                fontSize: {
                  xs: '3rem',
                  md: '5.5rem',
                },
              }}
            >
              {contractingContent.hero.title}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                maxWidth: 680,
                mt: 3,
                lineHeight: 1.6,
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
              >
                Explore Projects
              </Button>

              <Button
                href="#about"
                variant="outlined"
                size="large"
              >
                About FBS Contracting
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* About */}
        <Box
          id="about"
          component="section"
          sx={{
            py: {
              xs: 10,
              md: 16,
            },
            bgcolor: 'background.paper',
          }}
        >
          <Container>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '0.7fr 1.3fr',
                },
                gap: {
                  xs: 4,
                  md: 10,
                },
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: 'secondary.main',
                  fontWeight: 700,
                  letterSpacing: 2,
                }}
              >
                {contractingContent.about.eyebrow}
              </Typography>

              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    maxWidth: 800,
                    fontSize: {
                      xs: '2.5rem',
                      md: '4rem',
                    },
                  }}
                >
                  {contractingContent.about.title}
                </Typography>

                <Typography
                  sx={{
                    color: 'text.secondary',
                    maxWidth: 700,
                    mt: 4,
                    fontSize: '1.15rem',
                    lineHeight: 1.8,
                  }}
                >
                  {contractingContent.about.description}
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Stats */}
        <Box
          component="section"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            py: 8,
          }}
        >
          <Container>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(3, 1fr)',
                },
              }}
            >
              {contractingContent.stats.map((stat) => (
                <Box
                  key={stat.label}
                  sx={{
                    py: 3,
                    borderRight: {
                      xs: 0,
                      sm: '1px solid rgba(255,255,255,0.15)',
                    },
                    '&:last-child': {
                      borderRight: 0,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '3rem',
                        md: '4.5rem',
                      },
                      fontWeight: 600,
                    }}
                  >
                    {stat.value}
                  </Typography>

                  <Typography
                    sx={{
                      opacity: 0.65,
                      mt: 1,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Capabilities */}
        <Box
          id="capabilities"
          component="section"
          sx={{
            py: {
              xs: 10,
              md: 16,
            },
          }}
        >
          <Container>
            <Typography
              variant="overline"
              sx={{
                color: 'secondary.main',
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              Capabilities
            </Typography>

            <Typography
              variant="h2"
              sx={{
                mt: 2,
                mb: 8,
                fontSize: {
                  xs: '2.5rem',
                  md: '4rem',
                },
              }}
            >
              Built around every stage of delivery.
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, 1fr)',
                },
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              {contractingContent.capabilities.map((capability) => (
                <Box
                  key={capability.number}
                  sx={{
                    py: 6,
                    pr: {
                      md: 6,
                    },
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ color: 'text.secondary' }}
                  >
                    {capability.number}
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{ mt: 2 }}
                  >
                    {capability.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: 'text.secondary',
                      maxWidth: 500,
                      mt: 2,
                      lineHeight: 1.7,
                    }}
                  >
                    {capability.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Projects */}
        <Box
          id="projects"
          component="section"
          sx={{
            py: {
              xs: 10,
              md: 16,
            },
            bgcolor: 'background.paper',
          }}
        >
          <Container>
            <Typography
              variant="overline"
              sx={{
                color: 'secondary.main',
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              {contractingContent.projects.eyebrow}
            </Typography>

            <Typography
              variant="h2"
              sx={{
                mt: 2,
                maxWidth: 800,
                fontSize: {
                  xs: '2.5rem',
                  md: '4rem',
                },
              }}
            >
              {contractingContent.projects.title}
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',
                maxWidth: 650,
                mt: 3,
                lineHeight: 1.7,
              }}
            >
              {contractingContent.projects.description}
            </Typography>
            
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, 1fr)',
                },
                gap: 3,
                mt: 7,
              }}
            >
              {projects.slice(0, 4).map((project) => (
                <Box
                  key={project.id}
                  sx={{
                    minHeight: 330,
                    p: {
                      xs: 3,
                      md: 5,
                    },
                    bgcolor: '#ECE8DF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 250ms ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                    },
                  }}
                >
                  

                  <Chip
                    label={project.category}
                    size="small"
                    sx={{
                      alignSelf: 'flex-start',
                    }}
                  />

                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ mb: 1 }}
                    >
                      {project.name}
                    </Typography>

                    <Typography color="text.secondary">
                      {project.city}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        <Box
                    component="section"
                    sx={{
                      py: {
                        xs: 10,
                        md: 16,
                      },
                    }}
                  >
                    <Container>
                      <Typography
                        variant="overline"
                        sx={{
                          color: 'secondary.main',
                          fontWeight: 700,
                          letterSpacing: 2,
                        }}
                      >
                        Our Footprint
                      </Typography>

                      <Typography
                        variant="h2"
                        sx={{
                          mt: 2,
                          mb: 3,
                          maxWidth: 850,

                          fontSize: {
                            xs: '2.5rem',
                            md: '4rem',
                          },
                        }}
                      >
                        Building across the Kingdom.
                      </Typography>

                      <Typography
                        sx={{
                          color: 'text.secondary',
                          maxWidth: 650,
                          mb: 7,
                          lineHeight: 1.7,
                        }}
                      >
                        Explore selected FBS Contracting projects
                        across key regions of Saudi Arabia.
                      </Typography>

                      <ExecutiveProjectMap />
                    </Container>
                  </Box>  

                    {/* CTA */}
                    <Box
                      id="contact"
                      component="section"
                      sx={{
                        bgcolor: 'secondary.main',
                        color: '#fff',
                        py: {
                          xs: 10,
                          md: 14,
                        },
                      }}
                    >
                      <Container>
                        <Typography
                          variant="h2"
                          sx={{
                            maxWidth: 850,
                            fontSize: {
                              xs: '2.8rem',
                              md: '5rem',
                            },
                          }}
                        >
                          {contractingContent.cta.title}
                        </Typography>

                        <Typography
                          sx={{
                            maxWidth: 600,
                            mt: 3,
                            fontSize: '1.1rem',
                            lineHeight: 1.7,
                            opacity: 0.8,
                          }}
                        >
                          {contractingContent.cta.description}
                        </Typography>

                        <Button
                          variant="contained"
                          sx={{
                            mt: 5,
                            bgcolor: '#fff',
                            color: '#171717',
                            '&:hover': {
                              bgcolor: '#F4F4F4',
                            },
                          }}
                        >
                          Contact Us
                        </Button>
                      </Container>
                    </Box>

                    {/* Footer */}
                    <Box
                      component="footer"
                      sx={{
                        bgcolor: '#111',
                        color: '#fff',
                        py: 5,
                      }}
                    >
                      <Container>
                        <Stack
                          direction={{
                            xs: 'column',
                            sm: 'row',
                          }}
                          sx={{
                            justifyContent: 'space-between',
                            gap: 2,
                          }}
                        >
                          <Typography sx={{ fontWeight: 700 }}>
                            FBS Contracting
                          </Typography>

                          <Typography
                            sx={{
                              color: 'rgba(255,255,255,0.55)',
                            }}
                          >
                            Faisal Bin Saedan Properties
                          </Typography>
                        </Stack>
                      </Container>
                    </Box>
                  </Box>
                </ThemeProvider>
  )
}

export default ConceptA