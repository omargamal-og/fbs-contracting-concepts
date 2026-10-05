import { createTheme } from '@mui/material/styles'

export const conceptBTheme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#082F4D',
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#649ABD',
      contrastText: '#FFFFFF',
    },

    background: {
      default: '#EEF4F6',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#082F4D',
      secondary: '#5F7483',
    },

    divider: 'rgba(8, 47, 77, 0.14)',
  },

  typography: {
    fontFamily:
      '"Arial", "Helvetica Neue", sans-serif',

    h1: {
      fontWeight: 500,
      letterSpacing: '-0.055em',
      lineHeight: 0.95,
    },

    h2: {
      fontWeight: 500,
      letterSpacing: '-0.045em',
      lineHeight: 0.98,
    },

    h3: {
      fontWeight: 500,
      letterSpacing: '-0.035em',
    },

    body1: {
      lineHeight: 1.7,
    },

    body2: {
      lineHeight: 1.65,
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },

    overline: {
      fontWeight: 700,
      letterSpacing: '0.14em',
    },
  },

  shape: {
    borderRadius: 0,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#EEF4F6',
          color: '#082F4D',
        },

        '::selection': {
          backgroundColor: '#649ABD',
          color: '#FFFFFF',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})