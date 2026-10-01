import { Box, Container, CssBaseline, Typography } from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";

import Reveal from "../../core/components/Reveal";

import { conceptATheme } from "../../themes/conceptATheme";

import ExecutiveHeader from "./components/ExecutiveHeader";
import ExecutiveHero from "./components/ExecutiveHero";
import ExecutiveAbout from "./components/ExecutiveAbout";
import ExecutiveCapabilities from "./components/ExecutiveCapabilities";
import ExecutiveProjects from "./components/ExecutiveProjects";
import ExecutiveProjectMap from "./components/ExecutiveProjectMap";
import ExecutiveCTA from "./components/ExecutiveCTA";
import ExecutiveFooter from "./components/ExecutiveFooter";

function ConceptA() {
  return (
    <ThemeProvider theme={conceptATheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          overflowX: "hidden",
        }}
      >
        <ExecutiveHeader />

        <ExecutiveHero />

        <Reveal>
          <ExecutiveAbout />
        </Reveal>

        <Reveal>
          <ExecutiveCapabilities />
        </Reveal>

        <Reveal>
          <ExecutiveProjects />
        </Reveal>

        <Reveal>
          <Box
            id="footprint"
            component="section"
            sx={{
              py: {
                xs: 10,
                md: 16,
              },

              scrollMarginTop: {
                xs: 72,
                md: 84,
              },
              
            }}
          >
            <Container>
              <Typography
                variant="overline"
                sx={{
                  color: "secondary.main",
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
                    xs: "2.5rem",
                    md: "4rem",
                  },
                }}
              >
                Building across the Kingdom.
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  maxWidth: 650,
                  mb: 7,
                  lineHeight: 1.7,
                }}
              >
                Explore selected FBS Contracting projects across key regions of
                Saudi Arabia.
              </Typography>

              <ExecutiveProjectMap />
            </Container>
          </Box>
        </Reveal>

        <Reveal>
          <ExecutiveCTA />
        </Reveal>

        <ExecutiveFooter />
      </Box>
    </ThemeProvider>
  );
}

export default ConceptA;
