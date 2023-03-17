import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import theme from './theme'
import { FleshMessageContextProvider } from './contexts/flashMessage'
import { AuthUserContextProvider } from './contexts/authUser'
// import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* CssBaseline kickstart an elegant, consistent,
        and simple baseline to build upon. */}
        <CssBaseline />
        <AuthUserContextProvider>
          <FleshMessageContextProvider>
            <App />
          </FleshMessageContextProvider>
        </AuthUserContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ThemeProvider>
)
