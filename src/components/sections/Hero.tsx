"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent">
            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse" />

            <div className="container px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-secondary text-sm text-muted-foreground mb-6 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span>Open for new opportunities</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
                        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Haruka</span>
                        <br />
                        <span className="text-foreground">Full Stack Engineer</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                        Bridging the gap between <span className="text-primary font-medium">Code</span> and <span className="text-accent font-medium">Design</span>.
                        <br className="hidden md:block" />
                        I build aesthetic, high-performance web applications.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#works">
                            <Button size="lg" className="rounded-full text-base px-8 group relative overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">
                                    View Works <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Button>
                        </a>
                        <a href="#contact">
                            <Button variant="outline" size="lg" className="rounded-full text-base px-8 border-primary/20 hover:bg-primary/5">
                                Contact Me
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-primary rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
