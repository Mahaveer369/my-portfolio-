import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', onClick, ...props }) => {
    return (
        <motion.div
            className={`glass-card ${className}`}
            onClick={onClick}
            whileHover={{
                y: -5,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                borderRadius: '24px',
                padding: '40px',
                cursor: onClick ? 'pointer' : 'default'
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
