import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const Hero = () => {
    return (
        <section id="home" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <GlassCard className="hero-content">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        fontSize: '4rem',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 30px rgba(79, 172, 254, 0.3)'
                    }}
                >
                    Mahaveer Tirumalasetty
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{ fontSize: '1.5rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '2rem' }}
                >
                    Software Engineer | Gen AI | Agentic AI
                </motion.p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '12px 30px',
                            borderRadius: '30px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                            color: '#000',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        View Projects
                    </motion.a>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '12px 30px',
                            borderRadius: '30px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            color: '#fff',
                            cursor: 'pointer'
                        }}
                    >
                        Contact Me
                    </motion.a>
                </div>
            </GlassCard>
        </section>
    );
};

export default Hero;
