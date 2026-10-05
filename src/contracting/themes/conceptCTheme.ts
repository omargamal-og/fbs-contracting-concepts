import { createTheme } from '@mui/material/styles'

export const conceptCTheme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#B9DAF2',
      contrastText: '#082F4D',
    },

    secondary: {
      main: '#649ABD',
      contrastText: '#FFFFFF',
    },

    background: {
      default: '#082F4D',
      paper: '#0B3A5D',
    },

    text: {
      primary: '#FFFFFF',
      secondary: '#A1B4BF',
    },

    divider: 'rgba(185,218,242,0.16)',
  },

  typography: {
    fontFamily:
      '"Arial", "Helvetica Neue", sans-serif',

    h1: {
      fontWeight: 500,
      lineHeight: 0.92,
      letterSpacing: '-0.055em',
    },

    h2: {
      fontWeight: 500,
      lineHeight: 0.96,
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
      letterSpacing: '0.16em',
    },
  },

  shape: {
    borderRadius: 0,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#082F4D',
          color: '#FFFFFF',
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