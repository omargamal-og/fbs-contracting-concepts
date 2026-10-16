
import { Box, SvgIcon } from '@mui/material'
import { useLanguage } from '../../i18n/useLanguage'

const socialLinks = [
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@faisal-binsaedan',
    path: 'M23.5 6.2a3.1 3.1 0 0 0-2.2-2.2C19.35 3.5 12 3.5 12 3.5s-7.35 0-9.3.5A3.1 3.1 0 0 0 .5 6.2 32.4 32.4 0 0 0 0 12a32.4 32.4 0 0 0 .5 5.8A3.1 3.1 0 0 0 2.7 20c1.95.5 9.3.5 9.3.5s7.35 0 9.3-.5a3.1 3.1 0 0 0 2.2-2.2A32.4 32.4 0 0 0 24 12a32.4 32.4 0 0 0-.5-5.8ZM9.75 15.6V8.4L16 12Z',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@fbs.c',
    path: 'M16 2h-4v13.3a2.5 2.5 0 1 1-2.5-2.5c.5 0 1 .12 1.5.33V9.1a6.5 6.5 0 1 0 5 6.3V8.2c1.5 1.1 3.4 1.8 5.5 1.8V6C18.4 6 16 4.2 16 2Z',
  },
  {
    name: 'Snapchat',
    url: 'https://www.snapchat.com/@binsaedanco',
    path: 'M12 3.2c-3.2 0-5.2 2.4-5.2 5.7v2.5c-.8.1-1.4-.9-2.2-.3-.8.7.4 1.5 1.8 2.1.35.15.45.55.2.9-1.1 1.6-2.5 2.5-4.2 3.2.4.8 1.5 1.1 2.5 1.2.5.1.85.55 1.1 1.3.3.7.5 1 1.2.8 1.2-.5 2.5-.3 4.1.5.5.26 1 .26 1.5 0 1.6-.8 2.9-1 4.1-.5.7.2.9-.1 1.2-.8.25-.75.6-1.2 1.1-1.3 1-.1 2.1-.4 2.5-1.2-1.7-.7-3.1-1.6-4.2-3.2-.25-.35-.15-.75.2-.9 1.4-.6 2.6-1.4 1.8-2.1-.8-.6-1.4.4-2.2.3V8.9c0-3.3-2-5.7-5.2-5.7Z',
    outline: true,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/faisalsaedanco/',
    path: 'M13 22v-8h3l.5-4H13V8c0-1.2.4-2 2-2h1.8V2.4A22 22 0 0 0 14.2 2C10.5 2 9 4 9 7.7V10H6v4h3v8h4Z',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/966920024010',
    path: 'M12 2a10 10 0 0 0-8.7 14.95L2 22l5.18-1.28A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.06-1.1l-.3-.18-3.05.76.81-2.97-.2-.31A8 8 0 1 1 12 20Zm4.4-5.55c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.57.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/faisal-binsaedan/',
    path: 'M5.3 3a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM3.5 9h3.6v12H3.5V9Zm6 0H13v1.7h.05c.5-.95 1.73-1.95 3.56-1.95 3.8 0 4.5 2.5 4.5 5.75V21h-3.6v-5.75c0-1.4-.03-3.2-1.95-3.2-1.97 0-2.27 1.5-2.27 3.1V21H9.5V9Z',
  },
  {
    name: 'X',
    url: 'https://x.com/FaisalSaedanCo',
    path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.637 7.584H.474l8.6-9.833L0 1.154h7.594l5.243 6.932Zm-1.29 19.492h2.039L6.482 3.24H4.295Z',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/faisalsaedanco/',
    path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z',
  },
]

function FooterSocialLinks() {
  const { language } = useLanguage()

  return (
    <Box
      component="nav"
      aria-label={
        language === 'ar'
          ? 'روابط التواصل الاجتماعي'
          : 'Social media links'
      }
      sx={{
        mt: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {socialLinks.map((platform) => (
        <Box
          key={platform.name}
          component="a"
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          title={platform.name}
          aria-label={
            language === 'ar'
              ? `فتح ${platform.name}`
              : `Open ${platform.name}`
          }
          sx={{
            width: 43,
            height: 43,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #DAE4EA',
            borderRadius: '50%',
            bgcolor: '#FFFFFF',
            color: '#386682',
            textDecoration: 'none',
            transition:
              'background-color 200ms ease, color 200ms ease, transform 200ms ease, border-color 200ms ease',

            '&:hover': {
              bgcolor: '#082F4D',
              color: '#FFFFFF',
              borderColor: '#082F4D',
              transform: 'translateY(-3px)',
            },

            '&:focus-visible': {
              outline: '2px solid #649ABD',
              outlineOffset: 4,
            },

            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              '&:hover': {
                transform: 'none',
              },
            },
          }}
        >
          <SvgIcon
            viewBox="0 0 24 24"
            aria-hidden="true"
            sx={{
              fontSize: 19,
              fill:
                platform.name === 'Snapchat'
                  ? 'none'
                  : 'currentColor',
              stroke:
                platform.name === 'Snapchat'
                  ? 'currentColor'
                  : 'none',
              strokeWidth: 1.5,
              strokeLinejoin: 'round',
            }}
          >
            <path d={platform.path} />
          </SvgIcon>
        </Box>
      ))}
    </Box>
  )
}

export default FooterSocialLinks
