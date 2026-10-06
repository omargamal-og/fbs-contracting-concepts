import { useState } from 'react'

import {
  Box,
  Button,
  Menu,
  MenuItem,
} from '@mui/material'

const languages = [
  {
    code: 'EN',
    label: 'English',
    active: true,
  },
  {
    code: 'AR',
    label: 'العربية',
    active: false,
  },
  {
    code: 'UR',
    label: 'اردو',
    active: false,
  },
  {
    code: 'TR',
    label: 'Türkçe',
    active: false,
  },
]

type LanguageSelectorProps = {
  tone?: 'dark' | 'light'
}

function LanguageSelector({
  tone = 'dark',
}: LanguageSelectorProps) {
  const [anchorEl, setAnchorEl] =
    useState<HTMLElement | null>(null)

  const open = Boolean(anchorEl)

  const isDark = tone === 'dark'

  return (
    <>
      <Button
        onClick={(event) =>
          setAnchorEl(event.currentTarget)
        }
        aria-haspopup="menu"
        aria-expanded={open}
        sx={{
          minWidth: 0,
        
          px: 1.4,
          py: 0.8,
        
          color: isDark
            ? 'rgba(255,255,255,0.88)'
            : '#082F4D',
        
          fontSize: '0.64rem',
          fontWeight: 700,
        
          letterSpacing: '0.08em',
        
          border: '1px solid',
          borderColor: isDark
            ? 'rgba(185,218,242,0.22)'
            : 'rgba(8,47,77,0.16)',
        
          borderRadius: '12px',
        
          bgcolor: isDark
            ? 'rgba(8,47,77,0.08)'
            : 'rgba(255,255,255,0.22)',
        
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        
          '&:hover': {
            color: isDark
              ? '#B9DAF2'
              : '#649ABD',
        
            bgcolor: isDark
              ? 'rgba(185,218,242,0.08)'
              : 'rgba(8,47,77,0.05)',
        
            borderColor: isDark
              ? 'rgba(185,218,242,0.40)'
              : 'rgba(100,154,189,0.35)',
          },
        }}
      >
        EN

        <Box
          component="span"
          sx={{
            ml: 0.8,

            fontSize: '0.6rem',

            transform: open
              ? 'rotate(180deg)'
              : 'rotate(0deg)',

            transition:
              'transform 180ms ease',
          }}
        >
          ↓
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1.2,
            
              minWidth: 240,
            
              bgcolor: 'transparent',
            
              color: '#FFFFFF',
            
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
            
              borderRadius: '16px',
            
              border:
                '1px solid rgba(255,255,255,0.18)',
            
              boxShadow: 'none',
            
              backgroundImage: 'none',
            
              overflow: 'hidden',
            },
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            disabled={!language.active}
            onClick={() =>
              setAnchorEl(null)
            }
            sx={{
              minHeight: 58,
            
              px: 2.2,
            
              display: 'grid',
            
              gridTemplateColumns:
                '42px 1fr auto',
            
              gap: 1.2,
            
              opacity: '1 !important',
            
              color: '#FFFFFF',
            
              borderBottom:
                '1px solid rgba(185,218,242,0.10)',
            
              '&:last-of-type': {
                borderBottom: 0,
              },
            
              '&.Mui-disabled': {
                color:
                  'rgba(255,255,255,0.72)',
              },
            
              bgcolor: 'transparent',

              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.06)',
              },
            }}
          >
            <Box
              sx={{
                color: '#B9DAF2',

                fontSize: '0.52rem',
                fontWeight: 700,

                letterSpacing: '0.08em',
              }}
            >
              {language.code}
            </Box>

            <Box
              dir={
                language.code === 'AR' ||
                language.code === 'UR'
                  ? 'rtl'
                  : 'ltr'
              }
              sx={{
                justifySelf: 'start',

                fontSize: '0.82rem',
                fontWeight: 600,
              }}
            >
              {language.label}
            </Box>

            <Box
              sx={{
                color: language.active
                ? '#B9DAF2'
                : 'rgba(255,255,255,0.34)',

                fontSize: '0.46rem',
                fontWeight: 700,

                letterSpacing: '0.08em',

                textTransform: 'uppercase',
              }}
            >
              {language.active
                ? 'Current'
                : 'Coming soon'}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default LanguageSelector