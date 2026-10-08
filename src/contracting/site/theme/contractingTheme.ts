import { createTheme } from '@mui/material/styles'

export const contractingTheme = createTheme({
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