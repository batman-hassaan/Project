import { useState, useEffect } from 'react'
import { Container, CssBaseline, Fab } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import ImageUpload from './components/ImageUpload'
import CaptionResult from './components/CaptionResult'
import Header from './components/Header'
import Footer from './components/Footer'
import AnimatedGenerateButton from './components/AnimatedGenerateButton'

export default function App() {
  const [caption, setCaption] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 24px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            },
          },
        },
      },
    },
  })

  const handleCaptionGenerated = (generatedCaption, isError = false) => {
    setCaption(generatedCaption)
    setError(isError)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
          <ImageUpload 
            onCaptionGenerated={handleCaptionGenerated} 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            darkMode={darkMode}
          />
          <CaptionResult caption={caption} error={error} />
        </Container>
        <Footer />
        <Fab 
          color="primary" 
          aria-label="toggle theme"
          onClick={() => setDarkMode(!darkMode)}
          sx={{ 
            position: 'fixed',
            bottom: 24,
            right: 24,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </Fab>
      </div>
    </ThemeProvider>
  )
}