import { Box, Typography, IconButton, useTheme, Link, Divider, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub, LinkedIn, Email, Favorite, CameraAlt } from '@mui/icons-material';
const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        background: `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'rgba(255,255,255,0.9)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
        }
      }}
    >
      <Box sx={{ 
        maxWidth: '1400px',
        mx: 'auto',
        px: { xs: 2, md: 6 }
      }}>
        {/* Main Footer Content */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' },
          gap: 4,
          mb: 6
        }}>
          {/* App Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CameraAlt sx={{ 
                fontSize: 32,
                color: theme.palette.secondary.light,
                mr: 2
              }} />
              <Typography variant="h5" sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(90deg, #fff 0%, #e0f7fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                CaptionGen AI
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ 
              mb: 2,
              lineHeight: 1.7,
              opacity: 0.8
            }}>
              Transform your images with AI-powered captions. Our advanced technology helps you create perfect captions for social media, marketing, and personal use.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[
                { icon: <GitHub />, label: 'GitHub', href: 'https://github.com/batman-hassaan' },
                { icon: <LinkedIn />, label: 'LinkedIn', href: 'https://linkedin.com/in/hassaanshahid217' },
                { icon: <Email />, label: 'Email', href: 'mailto:hassaan@example.com' }
              ].map((item, index) => (
                <Tooltip key={index} title={item.label} arrow>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <IconButton
                      href={item.href}
                      target="_blank"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': {
                          color: theme.palette.secondary.light,
                          backgroundColor: 'rgba(100, 181, 246, 0.2)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </motion.div>
                </Tooltip>
              ))}
            </Box>
          </motion.div>

          {/* Footer Links */}
          {['Product', 'Resources', 'Company'].map((category, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <Typography variant="h6" sx={{ 
                mb: 2,
                fontWeight: 600,
                color: theme.palette.secondary.light
              }}>
                {category}
              </Typography>
              <Box component="ul" sx={{ 
                listStyle: 'none',
                p: 0,
                m: 0,
                display: 'grid',
                gap: 1.5
              }}>
                {['Features', 'Pricing', 'Examples', 'API Docs'].slice(0, 4).map((item, j) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link
                      href="#"
                      underline="none"
                      sx={{
                        color: 'rgba(255,255,255,0.8)',
                        '&:hover': {
                          color: theme.palette.secondary.light
                        },
                        transition: 'color 0.2s ease',
                        display: 'block'
                      }}
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Divider */}
        <Divider sx={{ 
          my: 3,
          borderColor: 'rgba(255,255,255,0.1)',
          position: 'relative',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            width: '20px',
            height: '2px',
            background: theme.palette.secondary.light
          },
          '&::before': {
            left: 0,
            transform: 'translateY(-50%)'
          },
          '&::after': {
            right: 0,
            transform: 'translateY(-50%)'
          }
        }} />

        {/* Copyright Section */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Typography variant="body2" sx={{ 
              display: 'flex',
              alignItems: 'center',
              opacity: 0.8
            }}>
              Made with 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ display: 'inline-block', margin: '0 6px' }}
              >
                <Favorite sx={{ 
                  color: '#ff6b6b', 
                  fontSize: '1.1rem'
                }} />
              </motion.span>
              by 
              <Link 
                href="https://github.com/batman-hassaan" 
                target="_blank"
                underline="hover"
                sx={{ 
                  color: 'inherit',
                  fontWeight: 500,
                  ml: '6px',
                  '&:hover': {
                    color: theme.palette.secondary.light
                  }
                }}
              >
                Hassaan
              </Link>
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 } }}>
            <Link href="#" underline="hover" sx={{ 
              color: 'rgba(255,255,255,0.8)',
              '&:hover': { color: theme.palette.secondary.light },
              fontSize: '0.9rem'
            }}>
              Privacy Policy
            </Link>
            <Link href="#" underline="hover" sx={{ 
              color: 'rgba(255,255,255,0.8)',
              '&:hover': { color: theme.palette.secondary.light },
              fontSize: '0.9rem'
            }}>
              Terms of Service
            </Link>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © {new Date().getFullYear()} CaptionGen AI
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Footer;