"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --- Click Burst Effect ---
function Explosion({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 15; // Fewer particles per click for subtlety
    const dummy = new THREE.Object3D();

    // Pick a random base color for this explosion
    const colorList = ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#f87171"];
    const explosionColor = useRef(new THREE.Color(colorList[Math.floor(Math.random() * colorList.length)]));

    const particles = useRef(
        Array.from({ length: count }, () => {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const speed = Math.random() * 0.15 + 0.05; // Slower, softer speed

            // Spherical distribution for 3D explosion
            return {
                vel: new THREE.Vector3(
                    Math.sin(phi) * Math.cos(theta) * speed,
                    Math.sin(phi) * Math.sin(theta) * speed,
                    Math.cos(phi) * speed
                ),
                pos: new THREE.Vector3(0, 0, 0),
                scale: Math.random() * 0.2 + 0.1 // Much smaller particles (was 0.4 - 1.2)
            };
        })
    );
    const life = useRef(1.0);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        life.current -= delta * 1.5; // Fade out much faster

        particles.current.forEach((p, i) => {
            p.pos.add(p.vel);
            // Add a little drag and gravity
            p.vel.multiplyScalar(0.92);
            p.vel.y -= 0.002;

            dummy.position.copy(p.pos);
            // Rotate the particles as they fly
            dummy.rotation.x += 0.05;
            dummy.rotation.y += 0.05;

            const s = Math.max(0, life.current * p.scale);
            dummy.scale.set(s, s, s);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
            meshRef.current!.setColorAt(i, explosionColor.current);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={position}>
            <icosahedronGeometry args={[0.3, 0]} /> {/* Much smaller base geometry (was 0.8) */}
            <meshBasicMaterial toneMapped={false} transparent opacity={0.7} /> {/* Semi-transparent so it's not too harsh */}
        </instancedMesh>
    );
}

function Bursts({ clickEvents }: { clickEvents: { id: number; x: number; y: number }[] }) {
    const { viewport } = useThree();

    return (
        <group>
            {clickEvents.map((ev) => {
                const worldX = (ev.x * viewport.width) / 2;
                const worldY = (ev.y * viewport.height) / 2;
                // Move them slightly forward (z: 2) so they don't clip as much
                return <Explosion key={ev.id} position={[worldX, worldY, 2]} />;
            })}
        </group>
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
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 15 - 5
            ),
            speed: Math.random() * 0.5 + 0.1,
        }))
    );

    useFrame((state) => {
        if (!mesh.current) return;
        particles.current.forEach((particle, i) => {
            particle.position.y += particle.speed * 0.02;
            if (particle.position.y > 15) particle.position.y = -15;

            dummy.position.copy(particle.position);
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </instancedMesh>
    );
}

export function MouseTracker3D() {
    const [clickEvents, setClickEvents] = useState<{ id: number; x: number; y: number }[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Map to -1 to 1 coordinates for useThree viewport
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;

            // Keep last 5 explosions active
            setClickEvents(prev => [...prev.slice(-4), { id: Date.now(), x, y }]);
        };
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
                {/* We don't really need lights anymore since we use basic materials, 
                    but keeping them for any future standard materials */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />

                <Bursts clickEvents={clickEvents} />
                <Particles count={100} />
            </Canvas>
        </div>
    );
}
