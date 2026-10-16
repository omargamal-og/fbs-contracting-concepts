import { useRef, useState } from 'react'

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
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'

import InnerPageHero from '../../components/inner/InnerPageHero'
import { useTranslation } from '../../i18n/useTranslation'
import { useLanguage } from '../../i18n/useLanguage'
import { isValidSupplierPhone } from '../../utils/validateSupplierPhone'

function SupplierRegistrationPage() {
  const t = useTranslation()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { direction, language } = useLanguage()

  const content = t.innerPages.supplierRegistration

  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('')
  const [notes, setNotes] = useState('')

  const [profileFile, setProfileFile] =
    useState<File | null>(null)

  const [fileError, setFileError] =
    useState<'type' | 'size' | null>(null)

  const [phoneError, setPhoneError] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)

  const [fieldErrors, setFieldErrors] = useState({
    companyName: false,
    contactName: false,
    email: false,
    category: false,
  })

  const updateFieldError = (field: keyof typeof fieldErrors, invalid: boolean) => {
    setFieldErrors((current) => ({ ...current, [field]: current[field] && invalid }))
  }

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    setFileError(null)
    setProfileFile(null)

    if (!file) return

    const extension = file.name
      .split('.')
      .pop()
      ?.toLowerCase()

    if (
      !extension ||
      !['pdf', 'doc', 'docx'].includes(extension)
    ) {
      setFileError('type')
      event.target.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('size')
      event.target.value = ''
      return
    }

    setProfileFile(file)
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const nextErrors = {
      companyName: !companyName.trim(),
      contactName: !contactName.trim(),
      email: !email.trim() || !event.currentTarget.querySelector<HTMLInputElement>('input[type="email"]')?.validity.valid,
      category: !content.categories.some((item) => item.value === category),
    }
    setFieldErrors(nextErrors)

    const invalidPhone = !isValidSupplierPhone(phone)
    setPhoneError(invalidPhone)

    if (Object.values(nextErrors).some(Boolean) || invalidPhone || fileError) return
    setReviewOpen(true)
  }

  const updatePhoneError = (value: string) => {
    const invalid = !isValidSupplierPhone(value)
    setPhoneError((current) => current && invalid)
  }

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: '#FFFFFF',
      borderRadius: '12px',
    },
  }

  const selectedCategory =
    content.categories.find(
      (item) => item.value === category,
    )?.label ?? ''

  const reviewFields = [
    {
      label: content.companyNameLabel,
      value: companyName,
    },
    {
      label: content.contactNameLabel,
      value: contactName,
    },
    {
      label: content.emailLabel,
      value: email,
      direction: 'ltr',
    },
    {
      label: content.phoneLabel,
      value: phone,
      direction: 'ltr',
    },
    {
      label: content.categoryLabel,
      value: selectedCategory,
    },
    {
      label: content.notesLabel,
      value: notes,
    },
    {
      label: content.profileLabel,
      value:
        profileFile?.name ?? content.notAttachedLabel,
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
          py: { xs: 8, md: 11 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{
              maxWidth: 950,
              color: '#082F4D',
              fontSize: {
                xs: '1.25rem',
                md: '1.7rem',
              },
              lineHeight: 1.8,
              fontWeight: 500,
            }}
          >
            {content.introduction}
          </Typography>
        </Container>
      </Box>

      {/* Registration Form */}

      <Box
        component="section"
        sx={{
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
                md: '3rem',
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
              lineHeight: 1.9,
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
              label={content.companyNameLabel}
              value={companyName}
              onChange={(event) => {
                setCompanyName(event.target.value)
                updateFieldError('companyName', !event.target.value.trim())
              }}
              onInvalid={() => setFieldErrors((current) => ({ ...current, companyName: true }))}
              error={fieldErrors.companyName}
              helperText={fieldErrors.companyName ? t.validation.requiredField : undefined}
              required
              fullWidth
              sx={fieldSx}
            />

            <TextField
              label={content.contactNameLabel}
              value={contactName}
              onChange={(event) => {
                setContactName(event.target.value)
                updateFieldError('contactName', !event.target.value.trim())
              }}
              onInvalid={() => setFieldErrors((current) => ({ ...current, contactName: true }))}
              error={fieldErrors.contactName}
              helperText={fieldErrors.contactName ? t.validation.requiredField : undefined}
              required
              fullWidth
              sx={fieldSx}
            />

            <TextField
              label={content.emailLabel}
              type="email"
              slotProps={{ htmlInput: { dir: 'ltr' } }}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                updateFieldError('email', !event.target.value.trim() || !event.target.validity.valid)
              }}
              onInvalid={() => setFieldErrors((current) => ({ ...current, email: true }))}
              error={fieldErrors.email}
              helperText={
                fieldErrors.email
                  ? email.trim() ? t.validation.invalidEmail : t.validation.requiredField
                  : undefined
              }
              required
              fullWidth
              sx={fieldSx}
            />

            <TextField
              label={content.phoneLabel}
              type="tel"
              slotProps={{ htmlInput: { dir: 'ltr' } }}
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value)
                updatePhoneError(event.target.value)
              }}
              onInvalid={() => setPhoneError(true)}
              error={phoneError}
              helperText={
                phoneError
                  ? phone.trim() ? content.invalidPhone : t.validation.requiredField
                  : undefined
              }
              required
              fullWidth
              sx={fieldSx}
            />

            <TextField
              select
              slotProps={{ select: { MenuProps: { dir: direction, lang: language, ...{ 'data-contracting-portal': '' }, transitionDuration: reduceMotion ? 0 : undefined } } }}
              label={content.categoryLabel}
              value={category}
              onChange={(event) => {
                setCategory(event.target.value)
                updateFieldError('category', !content.categories.some((item) => item.value === event.target.value))
              }}
              onInvalid={() => setFieldErrors((current) => ({ ...current, category: true }))}
              error={fieldErrors.category}
              helperText={fieldErrors.category ? t.validation.invalidCategory : undefined}
              required
              fullWidth
              sx={{
                ...fieldSx,
                gridColumn: '1 / -1',
              }}
            >
              <MenuItem value="" disabled>
                {content.categoryPlaceholder}
              </MenuItem>

              {content.categories.map((item) => (
                <MenuItem
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label={content.notesLabel}
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              multiline
              rows={5}
              fullWidth
              sx={{
                ...fieldSx,
                gridColumn: '1 / -1',
              }}
            />

            {/* Company Profile */}

            <Box
              sx={{
                gridColumn: '1 / -1',
                p: 3,
                bgcolor: '#EEF4F6',
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
                {content.profileLabel}
              </Typography>

              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-invalid={Boolean(fileError)}
                aria-describedby={
                  'suppliers-file-hint' +
                  (fileError ? ' suppliers-file-error' : profileFile ? ' suppliers-file-name' : '')
                }
                variant="outlined"
                sx={{
                  color: '#082F4D',
                  borderColor: 'text.secondary',
                  borderRadius: '10px',
                  textTransform: 'none',
                }}
              >
                {content.profileLabel}
              </Button>

              <input
                ref={fileInputRef}
                hidden
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />

              {profileFile && (
                <Typography id="suppliers-file-name" role="status"
                  sx={{
                    mt: 2,
                    color: '#082F4D',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {profileFile.name}
                </Typography>
              )}

              <Typography id="suppliers-file-hint"
                sx={{
                  mt: 2,
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                }}
              >
                {content.profileHint}
              </Typography>

              {fileError && (
                <Typography
                  id="suppliers-file-error"
                  role="alert"
                  sx={{
                    mt: 2,
                    color: '#C62828',
                    fontSize: '0.9rem',
                  }}
                >
                  {fileError === 'type'
                    ? content.invalidFileType
                    : content.invalidFileSize}
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
                color: 'text.secondary',
                fontSize: '0.85rem',
                lineHeight: 1.8,
              }}
            >
              {content.demoNotice}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Review Dialog */}

      <Dialog
        data-contracting-portal
        transitionDuration={reduceMotion ? 0 : undefined}
        aria-describedby="suppliers-review-notice"
        dir={direction}
        lang={language}
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
              sx={{ mb: 3 }}
            >
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                {field.label}
              </Typography>

              <Typography
                dir={field.direction}
                sx={{
                  color: '#082F4D',
                  textAlign: direction === 'rtl' ? 'right' : 'left',
                  overflowWrap: 'anywhere',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {field.value}
              </Typography>
            </Box>
          ))}

          <Typography id="suppliers-review-notice"
            sx={{
              color: 'text.secondary',
              fontSize: '0.85rem',
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

export default SupplierRegistrationPage