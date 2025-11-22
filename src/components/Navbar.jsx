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
                padding: scrolled ? '15px 40px' : '25px 40px',
                background: scrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
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
                }}
            >
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#FF2800' }}>//</span> MAHAVEER TIRUMALASETTY
                </div>
            </div>

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
        </motion.nav>
    );
};

export default Navbar;
