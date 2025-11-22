import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, title, content }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)', // Note: framer motion handles transform, but centering needs this or layout prop
                            x: '-50%', // Framer motion shorthand
                            y: '-50%',
                            width: '90%',
                            maxWidth: '600px',
                            background: 'rgba(20, 20, 30, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            padding: '30px',
                            zIndex: 1001,
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            color: '#fff'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1.5rem',
                                cursor: 'pointer'
                            }}
                        >
                            <FaTimes />
                        </button>
                        <h2 style={{ marginBottom: '20px', color: '#4facfe' }}>{title}</h2>
                        <div style={{ lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.8)' }}>
                            {content}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;
