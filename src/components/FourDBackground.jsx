import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// Custom Shader Material
const HyperShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color('#4facfe') },
        uColorEnd: { value: new THREE.Color('#f093fb') }
    },
    vertexShader: `
    varying vec2 vUv;
    varying float vDisplacement;
    uniform float uTime;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vDisplacement = snoise(position + vec3(2.0 * uTime));
      vec3 newPosition = position + normal * (vDisplacement * 0.4);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      float distort = 2.0 * vDisplacement;
      vec3 color = mix(uColorStart, uColorEnd, distort);
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

const HyperObject = () => {
    const meshRef = useRef();
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColorStart: { value: new THREE.Color('#4facfe') },
            uColorEnd: { value: new THREE.Color('#f093fb') }
        }),
        []
    );

    useFrame((state) => {
        const { clock } = state;
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime() * 0.4;
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.z = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
            <icosahedronGeometry args={[1, 64]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={HyperShaderMaterial.vertexShader}
                fragmentShader={HyperShaderMaterial.fragmentShader}
                wireframe={true}
            />
        </mesh>
    );
};

const FourDBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 75 }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />

                <ambientLight intensity={0.5} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <HyperObject />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                    <ChromaticAberration offset={[0.002, 0.002]} />
                    <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default FourDBackground;
