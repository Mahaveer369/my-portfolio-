import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Web = () => {
    const count = 100;
    const radius = 10;
    const connections = [];
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * radius * 2;
            const y = (Math.random() - 0.5) * radius * 2;
            const z = (Math.random() - 0.5) * 5;
            temp.push({ position: new THREE.Vector3(x, y, z), velocity: new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, 0) });
        }
        return temp;
    }, []);

    const linesGeometry = useRef();
    const pointsGeometry = useRef();

    useFrame(() => {
        const positions = [];
        const linePositions = [];

        particles.forEach(p => {
            p.position.add(p.velocity);

            // Bounce off walls
            if (p.position.x > radius || p.position.x < -radius) p.velocity.x *= -1;
            if (p.position.y > radius || p.position.y < -radius) p.velocity.y *= -1;

            positions.push(p.position.x, p.position.y, p.position.z);

            // Connect particles
            particles.forEach(p2 => {
                const dist = p.position.distanceTo(p2.position);
                if (dist < 2.5) {
                    linePositions.push(p.position.x, p.position.y, p.position.z);
                    linePositions.push(p2.position.x, p2.position.y, p2.position.z);
                }
            });
        });

        if (pointsGeometry.current) {
            pointsGeometry.current.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        }
        if (linesGeometry.current) {
            linesGeometry.current.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        }
    });

    return (
        <>
            <points>
                <bufferGeometry ref={pointsGeometry} />
                <pointsMaterial color="#00FFFF" size={0.05} transparent opacity={0.6} />
            </points>
            <lineSegments>
                <bufferGeometry ref={linesGeometry} />
                <lineBasicMaterial color="#00FFFF" transparent opacity={0.15} />
            </lineSegments>
        </>
    );
};

const SpiderWebBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#050505' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Web />
            </Canvas>
        </div>
    );
};

export default SpiderWebBackground;
