import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const TimelineItem = ({ data, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            style={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                paddingBottom: '40px',
                position: 'relative',
                width: '50%',
                alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                paddingRight: index % 2 === 0 ? '30px' : '0',
                paddingLeft: index % 2 !== 0 ? '30px' : '0',
            }}
        >
            {/* Timeline Line Dot */}
            <div
                style={{
                    position: 'absolute',
                    [index % 2 === 0 ? 'right' : 'left']: '-6px',
                    top: '0',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#4facfe',
                    boxShadow: '0 0 10px #4facfe',
                    zIndex: 2
                }}
            />

            <GlassCard className="timeline-card" style={{ width: '100%', maxWidth: '400px' }}>
                <span style={{ color: '#4facfe', fontSize: '0.9rem', fontWeight: 'bold' }}>{data.year}</span>
                <h3 style={{ fontSize: '1.2rem', margin: '5px 0', color: '#fff' }}>{data.title}</h3>
                <h4 style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '10px' }}>{data.subtitle}</h4>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.5' }}>{data.description}</p>
            </GlassCard>
        </motion.div>
    );
};

const Timeline = ({ items }) => {
    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0' }}>
            {/* Center Line */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: '2px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateX(-50%)'
                }}
            />

            {items.map((item, index) => (
                <TimelineItem key={index} data={item} index={index} />
            ))}
        </div>
    );
};

export default Timeline;
