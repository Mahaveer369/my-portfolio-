import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState("default");

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    useEffect(() => {
        const handleHoverStart = () => setCursorVariant("text");
        const handleHoverEnd = () => setCursorVariant("default");

        const elements = document.querySelectorAll("a, button, .project-card, .glass-card");
        elements.forEach(el => {
            el.addEventListener("mouseenter", handleHoverStart);
            el.addEventListener("mouseleave", handleHoverEnd);
        });

        return () => {
            elements.forEach(el => {
                el.removeEventListener("mouseenter", handleHoverStart);
                el.removeEventListener("mouseleave", handleHoverEnd);
            });
        };
    });

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "rgba(79, 172, 254, 0.3)",
            border: "1px solid rgba(79, 172, 254, 0.8)",
            mixBlendMode: "screen"
        },
        text: {
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            height: 80,
            width: 80,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            mixBlendMode: "difference"
        }
    };

    return (
        <motion.div
            className="cursor"
            variants={variants}
            animate={cursorVariant}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 9999
            }}
        />
    );
};

export default CustomCursor;
