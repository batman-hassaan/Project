import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Button,
    TextField,
    Box,
    Typography,
    CircularProgress,
    Paper,
    Fade
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const ImageUpload = ({ onCaptionGenerated, isLoading, setIsLoading, darkMode }) => {
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [preview, setPreview] = useState('');
    const containerRef = useRef(null);

    // Enhanced mouse tracking for interactive effects
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Dynamic effects based on mouse position
    const glowX = useTransform(mouseX, [0, 1000], [-50, 50]);
    const glowY = useTransform(mouseY, [0, 1000], [-30, 30]);
    const glowSize = useTransform(mouseY, [0, 1000], [100, 200]);
    const glowOpacity = useTransform(mouseY, [0, 1000], [0.1, 0.4]);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        },
        maxFiles: 1
    });

    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return;

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('image', image);
            if (prompt.trim()) {
                formData.append('prompt', prompt);
            }

            const response = await fetch('/api/generate-caption', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (response.ok) {
                onCaptionGenerated(data.caption);
            } else {
                throw new Error(data.error || 'Failed to generate caption');
            }
        } catch (error) {
            console.error('Error:', error);
            onCaptionGenerated(`Error: ${error.message}`, true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                mt: 3,
                transition: 'all 0.3s ease',
                maxWidth: '800px',
                mx: 'auto',
                px: 2,
                position: 'relative'
            }}
        >
            {/* Floating particles background */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'rgba(33, 150, 243, 0.4)',
                        zIndex: -1
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, Math.random() * 40 - 20, 0],
                        opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            <Typography
                variant="h2"
                gutterBottom
                sx={{
                    fontWeight: 800,
                    mb: 4,
                    textAlign: 'center',
                    background: 'linear-gradient(45deg, #3f51b5 20%, #2196f3 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 10px rgba(33, 150, 243, 0.3)',
                    letterSpacing: '-1px',
                    fontSize: { xs: '2rem', sm: '3rem' },
                    position: 'relative'
                }}
            >
                <motion.span
                    animate={{
                        textShadow: [
                            '0 2px 10px rgba(33, 150, 243, 0.3)',
                            '0 4px 20px rgba(33, 150, 243, 0.4)',
                            '0 2px 10px rgba(33, 150, 243, 0.3)'
                        ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    Image Caption Generator
                </motion.span>
            </Typography>

            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                style={{
                    position: 'relative',
                }}
            >
                <Paper
                    {...getRootProps()}
                    elevation={isDragActive ? 24 : 12}
                    sx={{
                        border: '3px dashed',
                        borderColor: isDragActive ? 'primary.main' : 'divider',
                        borderRadius: 4,
                        p: 4,
                        textAlign: 'center',
                        cursor: 'pointer',
                        mb: 4,
                        transition: 'all 0.3s ease',
                        background: darkMode
                            ? 'linear-gradient(145deg, rgba(33, 150, 243, 0.15) 0%, rgba(0,0,0,0.3) 100%)'
                            : 'linear-gradient(145deg, rgba(33, 150, 243, 0.08) 0%, rgba(255,255,255,0.4) 100%)',
                        position: 'relative',
                        zIndex: 1,
                        overflow: 'hidden',
                        backdropFilter: 'blur(8px)',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 15px 30px rgba(33, 150, 243, 0.3)'
                        }
                    }}
                >
                    {/* Interactive glow effect */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            width: glowSize,
                            height: glowSize,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(33, 150, 243, 0.3) 0%, transparent 70%)',
                            opacity: glowOpacity,
                            x: glowX,
                            y: glowY,
                            zIndex: -1,
                            pointerEvents: 'none',
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />

                    {/* Animated border effect */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: 12,
                            border: '2px solid transparent',
                            background: 'linear-gradient(90deg, rgba(33, 150, 243, 0.3), rgba(33, 150, 243, 0)) border-box',
                            mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                            maskComposite: 'exclude',
                            zIndex: -1
                        }}
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%']
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    <input {...getInputProps()} />
                    <AnimatePresence>
                        {!preview ? (
                            <Fade in={!preview} timeout={500}>
                                <Box>
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                    >
                                        <CloudUploadIcon
                                            sx={{
                                                fontSize: 80,
                                                mb: 2,
                                                color: 'primary.main',
                                                filter: 'drop-shadow(0 6px 12px rgba(33, 150, 243, 0.4))'
                                            }}
                                        />
                                    </motion.div>
                                    <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                                        {isDragActive ? 'Release to upload!' : 'Drop your image here'}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
                                        or click to browse files
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{
                                        fontStyle: 'italic',
                                        display: 'block',
                                        mt: 2
                                    }}>
                                        Supports: JPEG, PNG, GIF, WEBP
                                    </Typography>
                                </Box>
                            </Fade>
                        ) : (
                            <Fade in={preview} timeout={500}>
                                <Box sx={{ position: 'relative' }}>
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                    >
                                        <Box
                                            component="img"
                                            src={preview}
                                            alt="Preview"
                                            sx={{
                                                maxWidth: '100%',
                                                maxHeight: 400,
                                                borderRadius: 2,
                                                boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
                                                border: '2px solid rgba(255,255,255,0.2)',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        style={{
                                            position: 'absolute',
                                            bottom: 24,
                                            right: 24
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="medium"
                                            startIcon={<ImageIcon />}
                                            sx={{
                                                backdropFilter: 'blur(10px)',
                                                backgroundColor: 'rgba(33, 150, 243, 0.8)',
                                                color: 'white',
                                                fontWeight: 600,
                                                borderRadius: 50,
                                                px: 3,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(33, 150, 243, 1)',
                                                },
                                                boxShadow: '0 6px 20px rgba(33, 150, 243, 0.5)'
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreview('');
                                                setImage(null);
                                            }}
                                        >
                                            Change Image
                                        </Button>
                                    </motion.div>
                                </Box>
                            </Fade>
                        )}
                    </AnimatePresence>
                </Paper>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <TextField
                    fullWidth
                    label={
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Optional Prompt (e.g., 'Generate a funny caption')
                        </Typography>
                    }
                    variant="outlined"
                    margin="normal"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            fontSize: '1.1rem',
                            '&:hover fieldset': {
                                borderColor: 'primary.main',
                                boxShadow: '0 0 0 4px rgba(33, 150, 243, 0.15)'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'primary.main',
                                boxShadow: '0 0 0 4px rgba(33, 150, 243, 0.25)'
                            },
                        },
                        '& label.Mui-focused': {
                            color: 'primary.main',
                        },
                    }}
                    InputProps={{
                        sx: {
                            py: 1.5,
                            fontSize: '1.1rem'
                        }
                    }}
                />
            </motion.div>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        boxShadow: '0 15px 30px rgba(33, 150, 243, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    style={{
                        display: 'inline-block'
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!image || isLoading}
                        size="large"
                        sx={{
                            py: 2,
                            px: 8,
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            borderRadius: 50,
                            textTransform: 'none',
                            letterSpacing: '0.5px',
                            background: 'linear-gradient(45deg, #3f51b5 0%, #2196f3 100%)',
                            boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #3f51b5 0%, #2196f3 100%)',
                            },
                            '&:disabled': {
                                background: 'linear-gradient(45deg, #9e9e9e 0%, #bdbdbd 100%)',
                                boxShadow: 'none'
                            },
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        startIcon={isLoading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : null}
                    >
                        {isLoading ? 'Generating...' : 'Generate Caption'}
                        {/* Button shine effect */}
                        <motion.span
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                            }}
                            animate={{
                                left: ['-100%', '100%']
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </Button>
                </motion.div>
            </Box>
        </Box>
    );
};

export default ImageUpload;