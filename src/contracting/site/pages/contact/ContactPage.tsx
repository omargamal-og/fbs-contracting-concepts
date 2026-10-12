import { useState } from 'react'

import type { FormEvent } from 'react'

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  TextField,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'
import { useTranslation } from '../../i18n/useTranslation'

const CONTACT_PHONE = '920024010'
const CONTACT_EMAIL = 'info.cont@fbs.com.sa'

function ContactPage() {
  const t = useTranslation()
  const content = t.innerPages.contact

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const [reviewOpen, setReviewOpen] = useState(false)
  const [formError, setFormError] = useState(false)

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      setFormError(true)
      return
    }

    setFormError(false)
    setReviewOpen(true)
  }

  const contactDetails = [
    {
      label: content.phoneLabel,
      value: CONTACT_PHONE,
      href: `tel:${CONTACT_PHONE}`,
    },
    {
      label: content.emailLabel,
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      label: content.addressLabel,
      value: content.address,
      href: '',
    },
  ]

  const reviewFields = [
    {
      label: content.nameLabel,
      value: name,
    },
    {
      label: content.emailLabel,
      value: email,
    },
    {
      label: content.phoneLabel,
      value: phone || content.notProvidedLabel,
    },
    {
      label: content.subjectLabel,
      value: subject,
    },
    {
      label: content.messageLabel,
      value: message,
    },
  ]

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: '#FFFFFF',
      borderRadius: '12px',
    },
  }

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

      {/* Introduction */}

      <Box
        component="section"
        sx={{
          bgcolor: '#EEF4F6',
          py: {
            xs: 7,
            md: 10,
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{
              maxWidth: 1000,
              color: '#082F4D',

              fontSize: {
                xs: '1.25rem',
                md: '1.7rem',
              },

              fontWeight: 500,
              lineHeight: 1.85,
            }}
          >
            {content.introduction}
          </Typography>
        </Container>
      </Box>

      {/* Contact Details and Form */}

      <Box
        component="section"
        sx={{
          py: {
            xs: 8,
            md: 12,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                lg: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
              },

              alignItems: 'start',

              gap: {
                xs: 5,
                lg: 6,
              },
            }}
          >
            {/* Contact Information */}

            <Box
              sx={{
                p: {
                  xs: 3.5,
                  md: 5,
                },

                bgcolor: '#EEF4F6',
                border: '1px solid #DAE4EA',
                borderRadius: '22px',
                minWidth: 0,
              }}
            >
              <Typography
                component="h2"
                sx={{
                  color: '#082F4D',

                  fontSize: {
                    xs: '1.8rem',
                    md: '2.3rem',
                  },

                  fontWeight: 600,
                  mb: 4,
                }}
              >
                {content.detailsTitle}
              </Typography>

              {contactDetails.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    py: 3,
                    borderTop: '1px solid #DAE4EA',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#649ABD',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      mb: 1.5,
                    }}
                  >
                    {item.label}
                  </Typography>

                  {item.href ? (
                    <Link
                      href={item.href}
                      underline="hover"
                      dir="ltr"
                      sx={{
                        display: 'inline-block',
                        color: '#082F4D',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <Typography
                      sx={{
                        color: '#082F4D',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        lineHeight: 1.8,
                      }}
                    >
                      {item.value}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>

            {/* Contact Form */}

            <Box
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                component="h2"
                sx={{
                  color: '#082F4D',

                  fontSize: {
                    xs: '1.8rem',
                    md: '2.3rem',
                  },

                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {content.formTitle}
              </Typography>

              <Typography
                sx={{
                  color: '#40586B',
                  lineHeight: 1.85,
                  mb: 4,
                }}
              >
                {content.formDescription}
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: 'grid',

                  gridTemplateColumns: {
                    xs: '1fr',
                    md: 'repeat(2, minmax(0, 1fr))',
                  },

                  gap: 3,
                }}
              >
                <TextField
                  label={content.nameLabel}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value)
                    setFormError(false)
                  }}
                  autoComplete="name"
                  required
                  fullWidth
                  sx={fieldSx}
                />

                <TextField
                  label={content.emailLabel}
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setFormError(false)
                  }}
                  autoComplete="email"
                  required
                  fullWidth
                  sx={fieldSx}
                />

                <TextField
                  label={content.phoneLabel}
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  autoComplete="tel"
                  fullWidth
                  sx={fieldSx}
                />

                <TextField
                  label={content.subjectLabel}
                  value={subject}
                  onChange={(event) => {
                    setSubject(event.target.value)
                    setFormError(false)
                  }}
                  required
                  fullWidth
                  sx={fieldSx}
                />

                <TextField
                  label={content.messageLabel}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value)
                    setFormError(false)
                  }}
                  multiline
                  rows={6}
                  required
                  fullWidth
                  sx={{
                    ...fieldSx,
                    gridColumn: '1 / -1',
                  }}
                />

                {formError && (
                  <Typography
                    role="alert"
                    sx={{
                      gridColumn: '1 / -1',
                      color: '#C62828',
                      fontSize: '0.9rem',
                    }}
                  >
                    {content.requiredError}
                  </Typography>
                )}

                <Box
                  sx={{
                    gridColumn: '1 / -1',
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: '#082F4D',
                      color: '#FFFFFF',

                      px: 5,
                      py: 1.6,

                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 600,

                      '&:hover': {
                        bgcolor: '#124B70',
                      },
                    }}
                  >
                    {content.reviewButton}
                  </Button>
                </Box>

                <Typography
                  sx={{
                    gridColumn: '1 / -1',
                    color: '#647B8B',
                    fontSize: '0.85rem',
                    lineHeight: 1.8,
                  }}
                >
                  {content.demoNotice}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Review Dialog */}

      <Dialog
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            color: '#082F4D',
            fontWeight: 700,
          }}
        >
          {content.reviewTitle}
        </DialogTitle>

        <DialogContent dividers>
          {reviewFields.map((field) => (
            <Box
              key={field.label}
              sx={{
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  color: '#649ABD',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                {field.label}
              </Typography>

              <Typography
                sx={{
                  color: '#082F4D',
                  overflowWrap: 'anywhere',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {field.value}
              </Typography>
            </Box>
          ))}

          <Typography
            sx={{
              color: '#647B8B',
              fontSize: '0.85rem',
              lineHeight: 1.8,
            }}
          >
            {content.demoNotice}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setReviewOpen(false)}
            sx={{ color: '#082F4D' }}
          >
            {content.closeLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ContactPage