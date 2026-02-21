"use client";

import { useRef, useMemo, useState, useEffect } from "react";
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
    wireframe = false,
    burstTime = 0
}: any) {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialPosition = useMemo(() => new THREE.Vector3(...position), position);
    const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

    // Target to fly to during burst
    const burstTarget = useMemo(() => {
        const dir = initialPosition.clone().normalize();
        // If it's the center piece, pick a random direction
        if (dir.lengthSq() === 0) {
            dir.set((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)).normalize();
        }
        // Fly 5-12 units outward
        return dir.multiplyScalar(Math.random() * 7 + 5);
    }, [initialPosition]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        // Continuous spin
        meshRef.current.rotation.z = time * spinSpeed + randomOffset;

        const timeSinceBurst = burstTime > 0 ? (Date.now() - burstTime) / 1000 : 999;

        let targetPos = initialPosition.clone();
        let lerpSpeed = 0.05;

        if (timeSinceBurst < 0.4) {
            // Burst outwards quickly!
            targetPos = burstTarget.clone();
            lerpSpeed = 0.15;
            // Add excited spinning
            meshRef.current.rotation.x += 0.2;
            meshRef.current.rotation.y += 0.2;
        } else if (timeSinceBurst < 2.5) {
            // Drift back smoothly like scattered pieces reforming
            lerpSpeed = 0.03;
        } else {
            // Normal gentle hover rotation based on mouse within its localized space
            const targetX = (state.pointer.x * Math.PI) / 4;
            const targetY = (state.pointer.y * Math.PI) / 4;
            meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
            meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.05;
        }

        meshRef.current.position.lerp(targetPos, lerpSpeed);
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

// Group that follows the mouse
function InteractiveGroup({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!groupRef.current) return;
        // Group follows mouse smoothly
        const targetX = state.pointer.x * 2.5;
        const targetY = state.pointer.y * 2.5;
        groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
        groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    });

    return <group ref={groupRef}>{children}</group>
}

export function Hero3D() {
    const [burstTime, setBurstTime] = useState(0);

    // Listen to window clicks so clicks anywhere on the screen trigger it
    useEffect(() => {
        const handleClick = () => setBurstTime(Date.now());
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
                <Environment preset="city" />

                <InteractiveGroup>
                    {/* Center piece - Abstract Icosahedron */}
                    <AnimatedShape burstTime={burstTime} position={[0, -0.5, 0]} scale={1.2} type="distort" wireframe>
                        <Icosahedron args={[1, 0]} />
                    </AnimatedShape>
                    {/* Inner core */}
                    <AnimatedShape burstTime={burstTime} position={[0, -0.5, 0]} scale={0.7} type="standard" color="#0ea5e9" spinSpeed={-0.3}>
                        <Icosahedron args={[1, 1]} />
                    </AnimatedShape>

                    {/* Orbiting objects */}
                    <AnimatedShape burstTime={burstTime} position={[-3, 2, -2]} scale={0.8} speed={1.5} spinSpeed={1} type="wobble" color="#ec4899">
                        <Torus args={[0.5, 0.2, 16, 32]} />
                    </AnimatedShape>

                    <AnimatedShape burstTime={burstTime} position={[3, 1.5, 1]} scale={0.6} speed={2} spinSpeed={-0.8} type="standard" color="#8b5cf6" accentColor="#a78bfa" wireframe>
                        <Box args={[1, 1, 1]} />
                    </AnimatedShape>

                    <AnimatedShape burstTime={burstTime} position={[-2.5, -2, 1]} scale={0.7} speed={1.2} spinSpeed={0.5} type="wobble" color="#14b8a6">
                        <Octahedron args={[1, 0]} />
                    </AnimatedShape>

                    <AnimatedShape burstTime={burstTime} position={[2.5, -2.5, -1]} scale={0.5} speed={2.5} spinSpeed={-1.2} type="distort" color="#f59e0b">
                        <Sphere args={[1, 32, 32]} />
                    </AnimatedShape>
                </InteractiveGroup>
            </Canvas>
        </div>
    );
}
