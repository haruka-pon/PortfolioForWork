"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// --- Particle System Types & Helpers ---
type Particle = {
    id: number;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    rotationSpeed: THREE.Vector3;
    color: string;
    scale: number;
    createdAt: number;
    lifespan: number; // in seconds
};

const PARTICLE_COLORS = ["#4f46e5", "#0ea5e9", "#ec4899", "#8b5cf6", "#f43f5e"];
const PARTICLE_GEOMETRIES = [
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.TetrahedronGeometry(0.15),
    new THREE.OctahedronGeometry(0.15),
    new THREE.IcosahedronGeometry(0.15),
];

// --- Components ---

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
                    color="#4f46e5"
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
                    color="#0ea5e9"
                    roughness={0.1}
                    metalness={0.8}
                    emissive="#0ea5e9"
                    emissiveIntensity={0.5}
                />
            </Sphere>
        </Float>
    );
}

function Particles({ particles }: { particles: Particle[] }) {
    // Generate random geometries for particles once
    const particleData = useMemo(() => {
        return particles.map(p => ({
            ...p,
            geometry: PARTICLE_GEOMETRIES[Math.floor(Math.random() * PARTICLE_GEOMETRIES.length)],
        }));
    }, [particles]);

    return (
        <group>
            {particleData.map((p) => (
                <ParticleMesh key={p.id} data={p} />
            ))}
        </group>
    );
}

function ParticleMesh({ data }: { data: Particle & { geometry: THREE.BufferGeometry } }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);

    useFrame((state) => {
        if (!meshRef.current || !materialRef.current) return;

        const timeNow = state.clock.getElapsedTime();
        const age = timeNow - data.createdAt;
        const lifeRatio = Math.max(0, 1 - age / data.lifespan);

        // Move particle
        meshRef.current.position.add(data.velocity);

        // Add gravity/drag over time
        data.velocity.y -= 0.001;
        data.velocity.multiplyScalar(0.98); // friction

        // Rotate particle
        meshRef.current.rotation.x += data.rotationSpeed.x;
        meshRef.current.rotation.y += data.rotationSpeed.y;
        meshRef.current.rotation.z += data.rotationSpeed.z;

        // Scale and fade out
        const currentScale = data.scale * lifeRatio * Math.sin(lifeRatio * Math.PI); // pop in and out
        meshRef.current.scale.set(currentScale, currentScale, currentScale);

        materialRef.current.opacity = lifeRatio;
    });

    return (
        <mesh ref={meshRef} position={data.position.clone()} geometry={data.geometry}>
            <meshStandardMaterial
                ref={materialRef}
                color={data.color}
                transparent
                opacity={1}
                roughness={0.2}
                metalness={0.8}
                emissive={data.color}
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

function Scene() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const nextId = useRef(0);

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        // e.stopPropagation(); // Don't stop propagation if we want underlying stuff to trigger, but here it's fine

        // Only react to primary clicks (left click/touch)
        if (e.button !== 0) return;

        const clickPoint = e.point.clone();
        // Since the plane is at z=0 and camera looks at it, e.point gives the intersection.
        // We want the particles to spawn slightly towards the camera.
        clickPoint.z += 0.5;

        // Generate 5-10 particles per click
        const numParticles = Math.floor(Math.random() * 6) + 5;
        const newParticles: Particle[] = [];
        const now = e.object.parent?.parent?.children ? performance.now() / 1000 : Date.now() / 1000; // rough clock, better to let useFrame handle exact time if needed, but this is close enough for creation offset. Actually, let's just use simple Date.now since we sync it loosely, or 0 and update inside.

        // To strictly sync with useFrame clock, we can just use a hack: created at 0, updated on first frame.
        // For simplicity, Date.now() / 1000 is fine if we also use Date.now() internally, but R3F clock is better.
        // We'll pass 0 and initialize it in the Particle component, but let's just pass `now` and use standard Three clock relative

        for (let i = 0; i < numParticles; i++) {
            // Random blast direction
            const vx = (Math.random() - 0.5) * 0.15;
            const vy = (Math.random() - 0.5) * 0.15;
            const vz = (Math.random() * 0.1) + 0.05; // Pop towards camera slightly

            newParticles.push({
                id: nextId.current++,
                position: clickPoint.clone(),
                velocity: new THREE.Vector3(vx, vy, vz),
                rotationSpeed: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2
                ),
                color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
                scale: Math.random() * 0.5 + 0.5,
                createdAt: -1, // Will be set on first frame
                lifespan: Math.random() * 1.5 + 1.0, // 1 to 2.5 seconds
            });
        }

        setParticles((prev) => [...prev, ...newParticles].slice(-50)); // Keep max 50 particles to prevent lag
    };

    // Clean up dead particles periodically
    useFrame((state) => {
        const timeNow = state.clock.getElapsedTime();

        let needsCleanup = false;
        particles.forEach(p => {
            if (p.createdAt === -1) p.createdAt = timeNow; // Initialize time
            if (timeNow - p.createdAt > p.lifespan) needsCleanup = true;
        });

        if (needsCleanup) {
            setParticles(prev => prev.filter(p => p.createdAt === -1 || (timeNow - p.createdAt <= p.lifespan)));
        }
    });

    return (
        <group>
            {/* Invisible plane to catch clicks across the whole screen */}
            <mesh
                position={[0, 0, -1]}
                onPointerDown={handlePointerDown}
                visible={false}
            >
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

            <group position={[0, 0, 0]} scale={1.2}>
                <AnimatedSphere />
            </group>

            <Particles particles={particles} />
        </group>
    );
}

export function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
                <Environment preset="city" />
                <Scene />
            </Canvas>
        </div>
    );
}
