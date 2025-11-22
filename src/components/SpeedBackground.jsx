import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

const Tunnel = () => {
    const meshRef = useRef();

    // Create a tube geometry
    const geometry = useMemo(() => {
        const path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, -1000)
        ]);
        return new THREE.TubeGeometry(path, 20, 10, 8, false);
    }, []);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color('#FF0000') } // Neon Red
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float speed = 0.8; // High speed
          float dash = sin(vUv.x * 50.0 + uTime * speed); // Dense dashes
          if (dash < 0.5) discard; 
          
          // Gradient fade for depth
          float opacity = smoothstep(0.0, 1.0, vUv.y); 
          gl_FragColor = vec4(uColor, opacity * 0.8);
        }
      `,
            side: THREE.BackSide,
            transparent: true,
            wireframe: true,
            depthWrite: false,
        });
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
            meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2; // Faster rotation
        }
    });

    return <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, 0]} scale={2} />;
};

const SpeedBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#0A0A0A' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <fog attach="fog" args={['#0A0A0A', 5, 20]} />
                <Tunnel />
                <EffectComposer>
                    <Bloom intensity={0.5} luminanceThreshold={0.2} /> {/* Reduced bloom */}
                    <ChromaticAberration offset={[0.001, 0.001]} /> {/* Subtle aberration */}
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default SpeedBackground;
