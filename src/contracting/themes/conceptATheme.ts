import { createTheme } from '@mui/material/styles'

export const conceptATheme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#171717',
    },

    secondary: {
      main: '#9A7B4F',
    },

    background: {
      default: '#F6F4EF',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#171717',
      secondary: '#66635E',
    },
  },

  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',

    h1: {
      fontWeight: 600,
      letterSpacing: '-0.04em',
    },

    h2: {
      fontWeight: 600,
      letterSpacing: '-0.03em',
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 4,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          paddingInline: '22px',
          paddingBlock: '11px',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid rgba(0,0,0,0.08)',
        },
      },
    },
  },
})