import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#94d500',
      contrastText: '#fff',
    },
    secondary: {
      main: '#101e8d',
      contrastText: '#fff',
    },
    // añadimos color «danger»
    error: {
      main: '#d32f2f',
      contrastText: '#fff',
    },
  },
})