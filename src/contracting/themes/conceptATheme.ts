import { createTheme } from '@mui/material/styles'

export const conceptATheme = createTheme({
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

    divider: 'rgba(8,47,77,0.14)',
  },

  typography: {
    fontFamily:
      '"Arial", "Helvetica Neue", sans-serif',

    h1: {
      fontWeight: 500,
      lineHeight: 0.96,
      letterSpacing: '-0.05em',
    },

    h2: {
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: '-0.045em',
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
      fontWeight: 700,
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
          backgroundColor: '#B9DAF2',
          color: '#082F4D',
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