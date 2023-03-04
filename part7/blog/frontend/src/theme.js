import { createTheme } from '@mui/material/styles'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

// A custom theme for this app
const theme = createTheme({
  palette: {
    background: {
      default: '#f6fcfe'
    }
  },
  typography: {
    h1: {
      fontSize: '2.125rem',
      marginBottom: '1.5rem'
    },
    h2: {
      fontSize: '1.5rem',
      marginBottom: '1rem'
    },
    h3: {
      fontSize: '1.25rem',
      marginBottom: '0.75rem'
    }
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'standard',
        margin: 'dense'
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small'
      },
      styleOverrides: {
        root: {
          '&.active': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
          }
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover'
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          position: 'absolute',
          left: '1rem',
          right: '1rem',
          maxWidth: '500px',
          margin: 'auto',
          zIndex: 100
        }
      }
    }
  }
})

export default theme
