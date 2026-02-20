"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
    const sphereRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (sphereRef.current) {
            // Slowly rotate the sphere over time
            sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
            sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={sphereRef} args={[1, 64, 64]}>
                <MeshDistortMaterial
                    color="#4f46e5" // Primary color roughly (Indigo)
                    attach="material"
                    distort={0.4} // Level of distortion
                    speed={2} // Speed of distortion animation
                    roughness={0.2}
                    metalness={0.8}
                    wireframe={true} // Tech vibe
                />
            </Sphere>

            {/* Adding a solid inner core for depth */}
            <Sphere args={[0.7, 32, 32]}>
                <meshStandardMaterial
                    color="#0ea5e9" // Accent color (Sky blue)
                    roughness={0.1}
                    metalness={0.8}
                    emissive="#0ea5e9"
                    emissiveIntensity={0.5}
                />
            </Sphere>
        </Float>
    );
}

export function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
                <Environment preset="city" />

                {/* Move it slightly right and up on larger screens, center on mobile */}
                <group position={[0, 0, 0]} scale={1.2}>
                    <AnimatedSphere />
                </group>
            </Canvas>
        </div>
    );
}
