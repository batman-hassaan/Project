import { useState } from 'react'
import styled from 'styled-components'
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton,
  useTheme,
  Fade,
  Grow
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'

const StyledResultContainer = styled(Paper)`
  padding: 24px;
  margin-top: 24px;
  position: relative;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: ${({ theme }) => 
    theme.palette.mode === 'dark' 
      ? 'linear-gradient(145deg, #1E1E1E 0%, #2A2A2A 100%)' 
      : 'linear-gradient(145deg, #FFFFFF 0%, #F8F8F8 100%)'};
  box-shadow: ${({ theme }) => 
    theme.palette.mode === 'dark'
      ? '0 4px 20px rgba(0, 0, 0, 0.3)'
      : '0 4px 20px rgba(0, 0, 0, 0.1)'};
  border: 1px solid ${({ theme }) => 
    theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)'};
`

const StyledCopyButton = styled(motion(IconButton))`
  position: absolute;
  top: 12px;
  right: 12px;
  backdrop-filter: blur(4px);
  background-color: ${({ theme }) => 
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.05)'} !important;
  &:hover {
    background-color: ${({ theme }) => 
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.1)'} !important;
  }
`

const CaptionResult = ({ caption, error }) => {
  const theme = useTheme()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(caption)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!caption) return null

  return (
    <Grow in={true} timeout={500}>
      <StyledResultContainer theme={theme} elevation={0}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography 
            variant="h5" 
            gutterBottom 
            color={error ? "error" : "primary"}
            fontWeight={600}
          >
            {error ? "⚠️ Error" : "✨ Generated Caption"}
          </Typography>
          
          {!error && (
            <StyledCopyButton
              onClick={handleCopy}
              size="small"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              theme={theme}
            >
              <Fade in={!copied} timeout={300}>
                {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
              </Fade>
            </StyledCopyButton>
          )}
        </Box>

        <Box 
          sx={{ 
            padding: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            borderLeft: `4px solid ${error ? theme.palette.error.main : theme.palette.primary.main}`
          }}
        >
          <ReactMarkdown components={{
            p: ({ children }) => (
              <Typography 
                paragraph 
                sx={{ 
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.6,
                  fontSize: '1.1rem'
                }}
              >
                {children}
              </Typography>
            ),
            strong: ({ children }) => (
              <strong style={{ color: theme.palette.primary.main }}>
                {children}
              </strong>
            ),
            em: ({ children }) => (
              <em style={{ color: theme.palette.secondary.main }}>
                {children}
              </em>
            )
          }}>
            {caption}
          </ReactMarkdown>
        </Box>

        {!error && (
          <Fade in={copied}>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{
                position: 'absolute',
                right: 52,
                top: 18
              }}
            >
              Copied!
            </Typography>
          </Fade>
        )}
      </StyledResultContainer>
    </Grow>
  )
}

export default CaptionResult