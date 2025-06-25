import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/main.scss'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './core/store/store.ts'
import { ThemeProvider } from '@mui/material'
import { theme } from './shared/themes/theme.ts'
import { AppRoutes } from './routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
