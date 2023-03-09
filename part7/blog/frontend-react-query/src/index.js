import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import App from './App'
import theme from './theme'
import { FleshMessageContextProvider } from './contexts/flashMessage'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        {/* CssBaseline kickstart an elegant, consistent,
        and simple baseline to build upon. */}
        <CssBaseline />
        <FleshMessageContextProvider>
          <App />
        </FleshMessageContextProvider>
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
)
