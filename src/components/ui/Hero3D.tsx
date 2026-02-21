"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
    const sphereRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (sphereRef.current && coreRef.current) {
            // Base slow rotation
            const time = state.clock.getElapsedTime();

            // Mouse tracking (pointer is normalized -1 to 1)
            const targetX = (state.pointer.x * Math.PI) / 4;
            const targetY = (state.pointer.y * Math.PI) / 4;

            // Interpolate towards the target rotation for smooth movement
            sphereRef.current.rotation.y += (targetX - sphereRef.current.rotation.y) * 0.05;
            sphereRef.current.rotation.x += (-targetY - sphereRef.current.rotation.x) * 0.05;

            // Also rotate the core slightly differently for depth
            coreRef.current.rotation.y += (targetX - coreRef.current.rotation.y) * 0.08;
            coreRef.current.rotation.x += (-targetY - coreRef.current.rotation.x) * 0.08;

            // Add the continuous spin on top of the pointer hover
            sphereRef.current.rotation.z = time * 0.2;
            coreRef.current.rotation.z = time * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
            <Sphere ref={sphereRef} args={[1, 64, 64]}>
                <MeshDistortMaterial
                    color="#4f46e5" // Primary color
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    wireframe={true}
                />
            </Sphere>

            <Sphere ref={coreRef} args={[0.7, 32, 32]}>
                <meshStandardMaterial
                    color="#0ea5e9" // Accent color
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
        <div className="absolute inset-0 z-0 opacity-60">
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
                <Environment preset="city" />

                <group position={[0, 0, 0]} scale={1.2}>
                    <AnimatedSphere />
                </group>
            </Canvas>
        </div>
    );
}
