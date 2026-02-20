"use client";

import { motion } from "framer-motion";

export function BackgroundAnimation() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Top right blob */}
            <motion.div
                className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full mix-blend-screen filter blur-[100px] opacity-30 bg-primary/40"
                animate={{
                    x: [0, 50, 0, -50, 0],
                    y: [0, 30, -30, 0, 0],
                    scale: [1, 1.1, 1, 0.9, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Bottom left blob */}
            <motion.div
                className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[120px] opacity-20 bg-accent/40"
                animate={{
                    x: [0, -30, 20, 0, 0],
                    y: [0, -50, 0, 30, 0],
                    scale: [1, 1.2, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            {/* Center subtle blob */}
            <motion.div
                className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full mix-blend-screen filter blur-[90px] opacity-20 bg-primary/20 xl:block hidden"
                animate={{
                    x: [0, 40, -20, 0],
                    y: [0, -30, 40, 0],
                    scale: [1, 0.8, 1.2, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />

            {/* Grid overlay for texture */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        </div>
    );
}
