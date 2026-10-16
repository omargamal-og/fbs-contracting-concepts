import {
  Box,
  Container,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'
import { useTranslation } from '../../i18n/useTranslation'

import type { ManagementMemberId } from '../../i18n/types'

import nawafImage from '../../assets/images/team/nawaf-binshuail.png'
import waelImage from '../../assets/images/team/wael-darkazanli.png'
import ahmedImage from '../../assets/images/team/ahmed-talat.png'
import mashaelImage from '../../assets/images/team/mashael-alraqaib.png'
import nasserImage from '../../assets/images/team/nasser-yaseen.png'
import khaledImage from '../../assets/images/team/khaled-mansour.png'

const managementImages: Record<ManagementMemberId, string> = {
  nawaf: nawafImage,
  wael: waelImage,
  ahmed: ahmedImage,
  mashael: mashaelImage,
  nasser: nasserImage,
  khaled: khaledImage,
}

function OurTeamPage() {
  const t = useTranslation()

  const content = t.innerPages.about.ourTeam

  const ceo = content.members.find(
    (member) => member.id === 'nawaf',
  )

  const management = content.members.filter(
    (member) => member.id !== 'nawaf',
  )

  if (!ceo) return null

  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#FFFFFF',
      }}
    >
      <InnerPageHero
        eyebrow={content.eyebrow}
        title={content.title}
      />

      <Box
        component="section"
        sx={{
          py: {
            xs: 8,
            md: 12,
          },
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
          {/* Executive Leadership */}

          <Typography
            component="h2"
            sx={{
              color: '#082F4D',
              fontSize: {
                xs: '1.8rem',
                md: '2.4rem',
              },
              fontWeight: 600,
              mb: 4,
            }}
          >
            {content.leadershipTitle}
          </Typography>

          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                md: '0.85fr 1.15fr',
              },

              bgcolor: '#EEF4F6',

              border: '1px solid #DAE4EA',

              borderRadius: '24px',

              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: {
                  xs: 300,
                  md: 380,
                },

                bgcolor: '#DAE4EA',

                display: 'flex',

                justifyContent: 'center',

                alignItems: 'flex-end',
              }}
            >
              <Box
                component="img"
                loading="lazy"
                decoding="async"
                src={managementImages[ceo.id]}
                alt={ceo.name}
                sx={{
                  width: '100%',
                  height: '100%',

                  objectFit: 'contain',

                  objectPosition: 'center bottom',
                }}
              />
            </Box>

            <Box
              sx={{
                p: {
                  xs: 4,
                  md: 6,
                },

                display: 'flex',

                flexDirection: 'column',

                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  mb: 2,
                }}
              >
                {t.home.hero.eyebrow}
              </Typography>

              <Typography
                component="h3"
                sx={{
                  color: '#082F4D',
                  fontSize: {
                    xs: '2rem',
                    md: '3rem',
                  },
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {ceo.name}
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                {ceo.role}
              </Typography>
            </Box>
          </Box>

          {/* Management Team */}

          <Box
            sx={{
              mt: {
                xs: 9,
                md: 12,
              },
            }}
          >
            <Typography
              component="h2"
              sx={{
                color: '#082F4D',

                fontSize: {
                  xs: '1.8rem',
                  md: '2.4rem',
                },

                fontWeight: 600,

                mb: 4,
              }}
            >
              {content.managementTitle}
            </Typography>

            <Box
              sx={{
                display: 'grid',

                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                  lg: 'repeat(3, minmax(0, 1fr))',
                },

                gap: 3,
              }}
            >
              {management.map((member) => (
                <Box
                  key={member.id}
                  sx={{
                    border: '1px solid #DAE4EA',

                    borderRadius: '20px',

                    overflow: 'hidden',

                    bgcolor: '#FFFFFF',

                    transition:
                      'transform 250ms ease, box-shadow 250ms ease',

                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow:
                        '0 16px 40px rgba(8,47,77,0.08)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 290,

                      bgcolor: '#EEF4F6',

                      display: 'flex',

                      alignItems: 'flex-end',

                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      loading="lazy"
                      decoding="async"
                      src={managementImages[member.id]}
                      alt={member.name}
                      sx={{
                        width: '100%',
                        height: '100%',

                        objectFit: 'contain',

                        objectPosition: 'center bottom',
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      p: 3,
                      minHeight: 125,
                    }}
                  >
                    <Typography
                      component="h3"
                      sx={{
                        color: '#082F4D',

                        fontSize: '1.25rem',

                        fontWeight: 600,

                        lineHeight: 1.4,
                      }}
                    >
                      {member.name}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,

                        color: 'text.secondary',

                        fontSize: '0.9rem',

                        fontWeight: 500,

                        lineHeight: 1.6,
                      }}
                    >
                      {member.role}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default OurTeamPage