"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    MeshDistortMaterial,
    MeshWobbleMaterial,
    Float,
    Environment,
    Icosahedron,
    Torus,
    Box,
    Octahedron,
    Sphere
} from "@react-three/drei";
import * as THREE from "three";

// Reusable animated shape component
function AnimatedShape({
    children,
    position,
    speed = 1,
    spinSpeed = 0.2,
    floatIntensity = 2,
    scale = 1,
    color = "#4f46e5",
    accentColor = "#0ea5e9",
    type = "distort",
    wireframe = false
}: any) {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialPosition = useMemo(() => new THREE.Vector3(...position), position);
    const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        // Mouse tracking interaction
        const targetX = (state.pointer.x * Math.PI) / 4;
        const targetY = (state.pointer.y * Math.PI) / 4;

        // Smooth rotation towards mouse + continuous spin
        meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
        meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.05;
        meshRef.current.rotation.z = time * spinSpeed + randomOffset;

        // Playful hover effect pushing away from mouse slightly
        const mouseVec = new THREE.Vector3(state.pointer.x * 5, state.pointer.y * 5, 0);
        const dist = initialPosition.distanceTo(mouseVec);
        if (dist < 3) {
            const pushDir = initialPosition.clone().sub(mouseVec).normalize().multiplyScalar(0.5 / (dist + 0.1));
            meshRef.current.position.lerp(initialPosition.clone().add(pushDir), 0.1);
        } else {
            meshRef.current.position.lerp(initialPosition, 0.05);
        }
    });

    return (
        <Float speed={speed} rotationIntensity={1} floatIntensity={floatIntensity}>
            <mesh ref={meshRef} position={position} scale={scale}>
                {children}
                {type === "distort" ? (
                    <MeshDistortMaterial
                        color={color}
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                        wireframe={wireframe}
                    />
                ) : type === "wobble" ? (
                    <MeshWobbleMaterial
                        color={color}
                        factor={1}
                        speed={2}
                        roughness={0.1}
                        metalness={0.5}
                        wireframe={wireframe}
                    />
                ) : (
                    <meshStandardMaterial
                        color={color}
                        roughness={0.1}
                        metalness={0.8}
                        emissive={accentColor}
                        emissiveIntensity={0.2}
                        wireframe={wireframe}
                    />
                )}
            </mesh>
        </Float>
    );
}

export function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 opacity-70 cursor-pointer pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="pointer-events-auto">
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
                <Environment preset="city" />

                <group position={[0, 0, 0]}>
                    {/* Center piece - Abstract Icosahedron */}
                    <AnimatedShape position={[0, -0.5, 0]} scale={1.2} type="distort" wireframe>
                        <Icosahedron args={[1, 0]} />
                    </AnimatedShape>
                    {/* Inner core */}
                    <AnimatedShape position={[0, -0.5, 0]} scale={0.7} type="standard" color="#0ea5e9" spinSpeed={-0.3}>
                        <Icosahedron args={[1, 1]} />
                    </AnimatedShape>

                    {/* Orbiting objects */}
                    <AnimatedShape position={[-3, 2, -2]} scale={0.8} speed={1.5} spinSpeed={1} type="wobble" color="#ec4899">
                        <Torus args={[0.5, 0.2, 16, 32]} />
                    </AnimatedShape>

                    <AnimatedShape position={[3, 1.5, 1]} scale={0.6} speed={2} spinSpeed={-0.8} type="standard" color="#8b5cf6" accentColor="#a78bfa" wireframe>
                        <Box args={[1, 1, 1]} />
                    </AnimatedShape>

                    <AnimatedShape position={[-2.5, -2, 1]} scale={0.7} speed={1.2} spinSpeed={0.5} type="wobble" color="#14b8a6">
                        <Octahedron args={[1, 0]} />
                    </AnimatedShape>

                    <AnimatedShape position={[2.5, -2.5, -1]} scale={0.5} speed={2.5} spinSpeed={-1.2} type="distort" color="#f59e0b">
                        <Sphere args={[1, 32, 32]} />
                    </AnimatedShape>
                </group>
            </Canvas>
        </div>
    );
}
