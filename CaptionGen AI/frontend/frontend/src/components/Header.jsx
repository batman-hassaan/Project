import { AppBar, Toolbar, Typography, Box, useTheme, Button, IconButton, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { CameraAlt, Bolt, GitHub, Menu } from '@mui/icons-material';
import { useState } from 'react';

const Header = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AppBar 
      position="sticky"
      elevation={0}
      sx={{
        background: `linear-gradient(145deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 70%)`,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
        py: 0.5,
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ minHeight: '80px !important' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          width: '100%',
          maxWidth: '1400px',
          mx: 'auto',
          px: { xs: 2, md: 6 }
        }}>
          {/* Logo Section with Micro-interaction */}
          <Tooltip title="AI Caption Generator" arrow>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                marginRight: 16
              }}
            >
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                mr: 2
              }}>
                <CameraAlt sx={{ 
                  fontSize: 26,
                  color: theme.palette.common.white
                }} />
              </Box>
              <Typography 
                variant="h5"
                component="div"
                sx={{ 
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  background: 'linear-gradient(90deg, #fff 0%, #e0f7fa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: '"Poppins", sans-serif',
                  display: { xs: 'none', md: 'block' }
                }}
              >
                <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                  <motion.span
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 2.5 
                    }}
                  >
                    <Bolt sx={{ 
                      fontSize: 28, 
                      mr: 1,
                      color: theme.palette.secondary.light 
                    }} />
                  </motion.span>
                  CaptionGen AI
                </Box>
              </Typography>
            </motion.div>
          </Tooltip>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="end"
            sx={{ 
              ml: 'auto',
              display: { md: 'none' },
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu />
          </IconButton>

          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            ml: 'auto',
            gap: 3
          }}>
            {['Features', 'How It Works', 'Examples', 'Pricing'].map((item) => (
              <motion.div key={item} whileHover={{ y: -2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.9)',
                    cursor: 'pointer',
                    '&:hover': {
                      color: theme.palette.secondary.light
                    },
                    transition: 'color 0.2s ease'
                  }}
                >
                  {item}
                </Typography>
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  ml: 2,
                  px: 3,
                  py: 1,
                  borderRadius: '12px',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(0, 150, 255, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 18px rgba(0, 150, 255, 0.4)'
                  }
                }}
              >
                Try For Free
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Toolbar>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 2,
              gap: 2,
              background: 'rgba(0,0,0,0.1)'
            }}>
              {['Features', 'How It Works', 'Examples', 'Pricing'].map((item) => (
                <motion.div 
                  key={item}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.9)',
                      cursor: 'pointer',
                      '&:hover': {
                        color: theme.palette.secondary.light
                      }
                    }}
                  >
                    {item}
                  </Typography>
                </motion.div>
              ))}
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  mt: 1,
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  fontWeight: 600
                }}
              >
                Try For Free
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </AppBar>
  );
};

export default Header;