import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Use the generated image path (assuming it's moved to public or imported)
// For now, we'll use the absolute path for the prototype, but in a real app, this should be in public/assets
// We will copy the artifact to the public folder in a separate step.
const ferrariImage = '/ferrari.png';

const CarTransition = ({ isNavigating }) => {
    return (
        <AnimatePresence>
            {isNavigating && (
                <motion.div
                    initial={{ x: '-100vw' }}
                    animate={{ x: '100vw' }}
                    exit={{ x: '100vw' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: 0,
                        transform: 'translateY(-50%)',
                        zIndex: 9999,
                        pointerEvents: 'none',
                        width: '100vw',
                        height: '300px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <img
                        src={ferrariImage}
                        alt="Ferrari"
                        style={{
                            width: '600px',
                            height: 'auto',
                            filter: 'drop-shadow(10px 10px 20px rgba(0,0,0,0.5))'
                        }}
                    />
                    {/* Speed Lines */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '-20%',
                        width: '200%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #fff, transparent)',
                        transform: 'translateY(-50%)',
                        opacity: 0.5
                    }} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CarTransition;
