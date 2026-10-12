import { useState } from 'react'

import type {
  ChangeEvent,
  FormEvent,
} from 'react'

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'
import { useTranslation } from '../../i18n/useTranslation'

function CareersPage() {
  const t = useTranslation()

  const content = t.innerPages.careers

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const [cvFile, setCvFile] = useState<File | null>(null)

  const [fileError, setFileError] = useState<
    'type' | 'size' | null
  >(null)

  const [reviewOpen, setReviewOpen] = useState(false)

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    setFileError(null)
    setCvFile(null)

    if (!file) return

    const extension = file.name
      .split('.')
      .pop()
      ?.toLowerCase()

    const allowedExtensions = [
      'pdf',
      'doc',
      'docx',
    ]

    if (
      !extension ||
      !allowedExtensions.includes(extension)
    ) {
      setFileError('type')
      event.target.value = ''
      return
    }

    const maxFileSize = 5 * 1024 * 1024

    if (file.size > maxFileSize) {
      setFileError('size')
      event.target.value = ''
      return
    }

    setCvFile(file)
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (fileError) return

    setReviewOpen(true)
  }

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      bgcolor: '#FFFFFF',
      borderRadius: '12px',
    },
  }

  const applicationFields = [
    {
      label: content.nameLabel,
      value: name,
    },
    {
      label: content.emailLabel,
      value: email,
    },
    {
      label: content.subjectLabel,
      value: subject,
    },
    {
      label: content.messageLabel,
      value: message,
    },
    {
      label: content.cvLabel,
      value: cvFile?.name ?? content.notAttachedLabel,
    },
  ]

  return (
    <Box
      component="main"
      sx={{ bgcolor: '#FFFFFF' }}
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
          py: { xs: 7, md: 10 },
        }}
      >
        <Container
          maxWidth="lg"
        >
          <Typography
            sx={{
              maxWidth: 950,
              color: '#082F4D',
              fontSize: {
                xs: '1.25rem',
                md: '1.65rem',
              },
              fontWeight: 500,
              lineHeight: 1.8,
            }}
          >
            {content.introduction}
          </Typography>
        </Container>
      </Box>

      {/* Career Opportunities */}

      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 11 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h2"
            sx={{
              color: '#082F4D',
              fontSize: {
                xs: '2rem',
                md: '2.8rem',
              },
              fontWeight: 600,
              mb: 4,
            }}
          >
            {content.opportunitiesTitle}
          </Typography>

          <Box
            sx={{
              p: { xs: 4, md: 6 },
              bgcolor: '#EEF4F6',
              border: '1px solid #DAE4EA',
              borderRadius: '22px',
            }}
          >
            <Typography
              component="h3"
              sx={{
                color: '#082F4D',
                fontSize: '1.5rem',
                fontWeight: 600,
                mb: 2,
              }}
            >
              {content.noVacanciesTitle}
            </Typography>

            <Typography
              sx={{
                color: '#40586B',
                lineHeight: 1.9,
              }}
            >
              {content.noVacanciesDescription}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Application Form */}

      <Box
        component="section"
        sx={{
          bgcolor: '#EEF4F6',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h2"
            sx={{
              color: '#082F4D',
              fontSize: {
                xs: '2rem',
                md: '2.8rem',
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
              lineHeight: 1.8,
              mb: 5,
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
              onChange={(event) =>
                setName(event.target.value)
              }
              required
              fullWidth
              sx={inputStyles}
            />

            <TextField
              label={content.emailLabel}
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              fullWidth
              sx={inputStyles}
            />

            <TextField
              label={content.subjectLabel}
              value={subject}
              onChange={(event) =>
                setSubject(event.target.value)
              }
              required
              fullWidth
              sx={{
                ...inputStyles,
                gridColumn: '1 / -1',
              }}
            />

            <TextField
              label={content.messageLabel}
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              multiline
              rows={6}
              required
              fullWidth
              sx={{
                ...inputStyles,
                gridColumn: '1 / -1',
              }}
            />

            {/* CV Upload */}

            <Box
              sx={{
                gridColumn: '1 / -1',
                p: 3,
                bgcolor: '#FFFFFF',
                border: '1px dashed #A1B4BF',
                borderRadius: '16px',
              }}
            >
              <Typography
                sx={{
                  color: '#082F4D',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {content.cvLabel}
              </Typography>

              <Button
                component="label"
                variant="outlined"
                sx={{
                  color: '#082F4D',
                  borderColor: '#649ABD',
                  borderRadius: '10px',
                  textTransform: 'none',
                }}
              >
                {content.cvLabel}

                <input
                  hidden
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </Button>

              {cvFile && (
                <Typography
                  sx={{
                    mt: 2,
                    color: '#082F4D',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {cvFile.name}
                </Typography>
              )}

              <Typography
                sx={{
                  mt: 2,
                  color: '#647B8B',
                  fontSize: '0.85rem',
                }}
              >
                {content.cvHint}
              </Typography>

              {fileError && (
                <Typography
                  role="alert"
                  sx={{
                    mt: 2,
                    color: '#C62828',
                    fontSize: '0.9rem',
                  }}
                >
                  {fileError === 'type'
                    ? content.invalidCvType
                    : content.invalidCvSize}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                gridColumn: '1 / -1',
                mt: 1,
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
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#124B70',
                  },
                }}
              >
                {content.submitLabel}
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
        </Container>
      </Box>

      {/* Application Review */}

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
          {applicationFields.map((field) => (
            <Box
              key={field.label}
              sx={{ mb: 3 }}
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
            sx={{
              color: '#082F4D',
            }}
          >
            {content.closeLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CareersPage