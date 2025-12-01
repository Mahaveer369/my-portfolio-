import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'experience', label: 'Experience' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Determine active section
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                if (section) {
                    const { offsetTop, offsetHeight } = section;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
            setIsOpen(false); // Close mobile menu on click
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                padding: scrolled ? '15px 20px' : '25px 20px',
                background: scrolled || (isMobile && isOpen) ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
                backdropFilter: scrolled || (isMobile && isOpen) ? 'blur(10px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.3s ease'
            }}
        >
            <div
                onClick={() => scrollToSection('home')}
                style={{
                    cursor: 'pointer',
                    zIndex: 1001 // Ensure logo is above mobile menu
                }}
            >
                <div style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', fontWeight: 'bold', color: '#fff', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#FF2800' }}>//</span> {isMobile ? 'MAHAVEER.T' : 'MAHAVEER TIRUMALASETTY'}
                </div>
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
                <div style={{ display: 'flex', gap: '30px' }}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: activeSection === item.id ? '#00FFFF' : 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.95rem',
                                fontWeight: activeSection === item.id ? '600' : '400',
                                cursor: 'pointer',
                                position: 'relative',
                                padding: '5px 0',
                                transition: 'color 0.3s ease',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            {item.label}
                            {activeSection === item.id && (
                                <motion.div
                                    layoutId="active-line"
                                    style={{
                                        width: '100%',
                                        height: '2px',
                                        background: '#00FFFF',
                                        position: 'absolute',
                                        bottom: '-2px',
                                        left: 0
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Mobile Navigation Toggle */}
            {isMobile && (
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        zIndex: 1001,
                        cursor: 'pointer',
                        color: '#fff',
                        fontSize: '1.5rem',
                        padding: '10px'
                    }}
                >
                    {isOpen ? '✕' : '☰'}
                </div>
            )}

            {/* Mobile Menu Overlay */}
            {isMobile && isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100vh',
                        background: 'rgba(5, 5, 5, 0.98)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '30px',
                        zIndex: 1000
                    }}
                >
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: activeSection === item.id ? '#FF2800' : '#fff',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontFamily: 'Montserrat, sans-serif',
                                textTransform: 'uppercase',
                                letterSpacing: '2px'
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
