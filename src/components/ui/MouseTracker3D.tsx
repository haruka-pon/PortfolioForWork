"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --- Click Burst Effect ---
function Bursts({ clickEvents }: { clickEvents: { id: number; x: number; y: number }[] }) {
    const { viewport } = useThree();
    const mesh = useRef<THREE.InstancedMesh>(null);
    const maxParticles = 300; // max total particles on screen at a time

    // Custom structure to hold particle data
    const particles = useRef<{ pos: THREE.Vector3; vel: THREE.Vector3; life: number; color: THREE.Color }[]>(
        Array.from({ length: maxParticles }, () => ({
            pos: new THREE.Vector3(0, 0, -1000), // hidden initially
            vel: new THREE.Vector3(),
            life: 0,
            color: new THREE.Color()
        }))
    );

    const dummy = new THREE.Object3D();
    const colorPalette = ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#f59e0b"];

    // When a new click happens, spawn a bunch of particles at that location
    useEffect(() => {
        if (clickEvents.length === 0) return;

        // Get the latest click
        const latestClick = clickEvents[clickEvents.length - 1];

        // Map screen coordinates (-1 to 1) to world coordinates (based on z=0 depth)
        const worldX = (latestClick.x * viewport.width) / 2;
        const worldY = (latestClick.y * viewport.height) / 2;

        const spawnCount = 20; // particles per click
        let spawned = 0;

        // Find dead particles and revive them as a burst
        for (let i = 0; i < maxParticles; i++) {
            if (particles.current[i].life <= 0) {
                particles.current[i].pos.set(worldX, worldY, 0);
                // Random velocity bursting outward
                const theta = Math.random() * Math.PI * 2;
                const speed = Math.random() * 0.15 + 0.05;
                particles.current[i].vel.set(Math.cos(theta) * speed, Math.sin(theta) * speed, (Math.random() - 0.5) * speed);
                particles.current[i].life = 1.0; // 1.0 represents full life, counts down to 0
                particles.current[i].color.set(colorPalette[Math.floor(Math.random() * colorPalette.length)]);

                spawned++;
                if (spawned >= spawnCount) break;
            }
        }
    }, [clickEvents, viewport]);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        let needsUpdate = false;

        particles.current.forEach((p, i) => {
            if (p.life > 0) {
                // Move particle
                p.pos.add(p.vel);
                // Apply slight gravity/drag
                p.vel.y -= 0.002;
                p.vel.multiplyScalar(0.98);

                // Decrease life
                p.life -= delta * 0.5;

                // Shrink as it dies
                const scale = Math.max(0, p.life);
                dummy.position.copy(p.pos);
                dummy.scale.set(scale, scale, scale);
                dummy.updateMatrix();

                mesh.current!.setMatrixAt(i, dummy.matrix);
                mesh.current!.setColorAt(i, p.color);
                needsUpdate = true;
            } else {
                // Hide dead particles
                p.pos.set(0, 0, -1000);
                dummy.position.copy(p.pos);
                dummy.updateMatrix();
                mesh.current!.setMatrixAt(i, dummy.matrix);
            }
        });

        if (needsUpdate) {
            mesh.current.instanceMatrix.needsUpdate = true;
            if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, maxParticles]}>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial roughness={0.2} metalness={0.8} />
        </instancedMesh>
    );
}

// Background Particles
function Particles({ count = 50 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = new THREE.Object3D();

    const particles = useRef(
        Array.from({ length: count }, () => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            ),
            speed: Math.random() * 0.5 + 0.1,
        }))
    );

    useFrame((state) => {
        if (!mesh.current) return;
        particles.current.forEach((particle, i) => {
            particle.position.y += particle.speed * 0.01;
            if (particle.position.y > 10) particle.position.y = -10;

            dummy.position.copy(particle.position);
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </instancedMesh>
    );
}

export function MouseTracker3D() {
    const [clickEvents, setClickEvents] = useState<{ id: number; x: number; y: number }[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            setClickEvents(prev => [...prev.slice(-10), { id: Date.now(), x, y }]);
        };
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />

                <Bursts clickEvents={clickEvents} />
                <Particles count={100} />
            </Canvas>
        </div>
    );
}
