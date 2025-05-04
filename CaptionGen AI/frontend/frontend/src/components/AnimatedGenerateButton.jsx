import { Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedGenerateButton = ({ image, isLoading }) => {
  return (
    <Button
      component={motion.button}
      type="submit"
      variant="contained"
      color="primary"
      disabled={!image || isLoading}
      size="large"
      whileHover={{
        scale: 1.1,
        y: -5,
        transition: { type: 'spring', stiffness: 500, damping: 15 }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.2 }
      }}
      animate={!isLoading && image ? { 
        scale: [1, 1.02, 1],
        boxShadow: ['0 10px 30px rgba(33, 150, 243, 0.45)', '0 12px 35px rgba(33, 150, 243, 0.6)', '0 10px 30px rgba(33, 150, 243, 0.45)']
      } : {}}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      sx={{
        py: 2,
        px: 8,
        fontSize: '1.2rem',
        fontWeight: 700,
        borderRadius: 50,
        textTransform: 'none',
        letterSpacing: '0.5px',
        position: 'relative',
        overflow: 'hidden',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #1e88e5 0%, #42a5f5 50%, #90caf9 100%)',
        boxShadow: '0 10px 30px rgba(33, 150, 243, 0.45)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          background: 'linear-gradient(135deg, #1565c0 0%, #1e88e5 50%, #64b5f6 100%)',
          color: '#ffffff',
          textShadow: '0 0 8px rgba(255, 255, 255, 0.7)',
          '& .button-text': {
            transform: 'translateY(-1px)'
          }
        },
        '&:disabled': {
          background: 'linear-gradient(135deg, #9e9e9e 0%, #bdbdbd 100%)',
          boxShadow: 'none',
          cursor: 'not-allowed',
          color: '#f5f5f5',
        },
      }}
      startIcon={
        isLoading ? (
          <CircularProgress 
            size={24} 
            sx={{ 
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }} 
          />
        ) : null
      }
    >
      <motion.span 
        className="button-text"
        style={{
          display: 'inline-block',
          transition: 'all 0.3s ease'
        }}
      >
        {isLoading ? 'Generating...' : 'Generate Caption'}
      </motion.span>

      {/* Shine animation overlay */}
      <motion.span
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
        animate={{ left: ['-100%', '150%'] }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 1,
          ease: [0.4, 0, 0.2, 1]
        }}
      />
      
      {/* Pulse glow effect */}
      <motion.span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 50,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0
        }}
        animate={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.5, 2]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeOut"
        }}
      />
    </Button>
  );
};

export default AnimatedGenerateButton;