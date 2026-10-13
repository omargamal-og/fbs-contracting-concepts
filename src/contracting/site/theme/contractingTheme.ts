import { createTheme } from '@mui/material/styles'

export const contractingTheme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#082F4D',
      light: '#649ABD',
    },

    secondary: {
      main: '#A1B4BF',
      light: '#B9DAF2',
    },

    background: {
      default: '#EEF4F6',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#082F4D',
      secondary: '#649ABD',
    },
  },

  typography: {
    fontFamily:
      '"Inter", "Segoe UI", Arial, sans-serif',

    h1: {
      fontWeight: 500,
      letterSpacing: '-0.055em',
    },

    h2: {
      fontWeight: 500,
      letterSpacing: '-0.045em',
    },

    h3: {
      fontWeight: 500,
      letterSpacing: '-0.035em',
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 14,
  },
})

// Local fallback for the outlined fields currently used by this feature.
// No RTL Stylis plugin is installed; these overrides do not affect other themes.
export const contractingRtlTheme = createTheme(contractingTheme, {
  direction: 'rtl',
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.MuiInputLabel-outlined': {
            left: 'auto',
            right: 0,
            transformOrigin: 'top right',
            transform: 'translate(-14px, 16px) scale(1)',
            '&.MuiInputLabel-sizeSmall': {
              transform: 'translate(-14px, 9px) scale(1)',
            },
            '&.MuiInputLabel-shrink': {
              transform: 'translate(-14px, -9px) scale(0.75)',
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: { textAlign: 'start' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { textAlign: 'right' },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { textAlign: 'start' },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { textAlign: 'start' },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&&&': {
            paddingRight: 14,
            paddingLeft: 'calc(var(--_caret, 32px) + var(--_endAdornment, 0px))',
          },
        },
        icon: { right: 'auto', left: 7 },
      },
    },
  },
})
