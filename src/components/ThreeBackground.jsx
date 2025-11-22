import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, color, type }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.2 : 1}
            >
                {type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
                {type === 'torus' && <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />}
                {type === 'octahedron' && <octahedronGeometry args={[1.2]} />}

                <meshStandardMaterial
                    color={color}
                    roughness={0.1}
                    metalness={0.8}
                    emissive={color}
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.8}
                    wireframe={false}
                />
            </mesh>
        </Float>
    );
};

const Scene = () => {
    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#4facfe" />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#f093fb" />
            <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <FloatingShape position={[-4, 2, -5]} color="#4facfe" type="torus" />
            <FloatingShape position={[4, -2, -4]} color="#00f2fe" type="icosahedron" />
            <FloatingShape position={[0, 4, -6]} color="#a18cd1" type="octahedron" />
            <FloatingShape position={[-5, -3, -8]} color="#fbc2eb" type="icosahedron" />
            <FloatingShape position={[5, 3, -7]} color="#8fd3f4" type="torus" />

            {/* Background particles/debris */}
            {Array.from({ length: 20 }).map((_, i) => (
                <FloatingShape
                    key={i}
                    position={[
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 10 - 10
                    ]}
                    color={['#4facfe', '#00f2fe', '#a18cd1'][Math.floor(Math.random() * 3)]}
                    type="octahedron"
                />
            ))}
        </>
    );
};

const ThreeBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 75 }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <Scene />
                <fog attach="fog" args={['#0f0f1a', 5, 20]} />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
