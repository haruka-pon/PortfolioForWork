"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Hero3D } from "@/components/ui/Hero3D";

export function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent">
            {/* 3D Canvas Background */}
            <Hero3D />

            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse -z-10" />

            <div className="container px-4 md:px-6 relative z-10 text-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="pointer-events-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-secondary text-sm text-muted-foreground mb-6 backdrop-blur-md shadow-lg shadow-background/50">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-foreground/90 font-medium">Open for new opportunities</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 drop-shadow-2xl">
                        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Haruka</span>
                        <br />
                        <span className="text-foreground">Full Stack Engineer</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
                        Bridging the gap between <span className="text-primary font-bold">Code</span> and <span className="text-accent font-bold">Design</span>.
                        <br className="hidden md:block" />
                        I build aesthetic, high-performance web applications.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#works">
                            <Button size="lg" className="rounded-full text-base px-8 group relative overflow-hidden shadow-xl shadow-primary/20">
                                <span className="relative z-10 flex items-center gap-2 font-semibold">
                                    View Works <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Button>
                        </a>
                        <a href="#contact">
                            <Button variant="outline" size="lg" className="rounded-full text-base px-8 border-primary/30 hover:bg-primary/10 bg-background/50 backdrop-blur-md">
                                Contact Me
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center p-1 backdrop-blur-sm bg-background/20">
                    <div className="w-1 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                </div>
            </motion.div>
        </section>
    );
}
