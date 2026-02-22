"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Lightformer, Environment } from "@react-three/drei";
import * as THREE from "three";

// Mouse follower logic
function Swarm() {
    const group = useRef<THREE.Group>(null);
    const { viewport, size } = useThree();
    const [mouse, setMouse] = useState(new THREE.Vector2());

    // Track mouse coordinates
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Convert to normalized device coordinates: -1 to +1
            setMouse(new THREE.Vector2(
                (e.clientX / size.width) * 2 - 1,
                -(e.clientY / size.height) * 2 + 1
            ));
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [size]);

    // Smoothly move the group towards the mouse position
    useFrame((state, delta) => {
        if (group.current) {
            // Calculate target position based on viewport size
            const targetX = (mouse.x * viewport.width) / 2;
            const targetY = (mouse.y * viewport.height) / 2;

            // Lerp current position to target for smooth trailing effect
            group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, delta * 4);
            group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, delta * 4);

            // Add slight rotation over time
            group.current.rotation.x += delta * 0.2;
            group.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <group ref={group}>
            <Float speed={5} rotationIntensity={2} floatIntensity={2}>
                <mesh position={[0, 0, 0]}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial color="#8b5cf6" wireframe opacity={0.4} transparent />
                </mesh>
                <mesh position={[1.5, -1, -2]} scale={0.5}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#ec4899" wireframe opacity={0.6} transparent />
                </mesh>
                <mesh position={[-1.5, 1, -1]} scale={0.3}>
                    <tetrahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#3b82f6" wireframe opacity={0.5} transparent />
                </mesh>
            </Float>
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
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />

                <Swarm />
                <Particles count={100} />
            </Canvas>
        </div>
    );
}
