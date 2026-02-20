"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Zap, MonitorSmartphone, Mail } from "lucide-react";

const NAV_ITEMS = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "career", icon: Briefcase, label: "Career" },
    { id: "skills", icon: Zap, label: "Skills" },
    { id: "works", icon: MonitorSmartphone, label: "Works" },
    { id: "contact", icon: Mail, label: "Contact" },
];

export function FloatingNav() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show nav after scrolling down a bit
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Determine which section is currently active
            const sections = NAV_ITEMS.map(item => item.id);
            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Offset by 150px to trigger slightly before the section hits the top
                    if (rect.top <= 150) {
                        setActiveSection(sections[i]);
                        break;
                    }
                } else if (sections[i] === "hero" && window.scrollY < window.innerHeight / 2) {
                    setActiveSection("hero");
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Trigger once on mount
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        if (id === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
                >
                    <nav className="flex items-center gap-1 sm:gap-2 px-3 py-3 bg-background/50 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={(e) => handleClick(item.id, e)}
                                    className="relative group p-2 rounded-full outline-none transition-colors"
                                    aria-label={item.label}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute inset-0 bg-primary/20 rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    <Icon
                                        className={`w-5 h-5 transition-colors relative z-10 ${isActive
                                                ? "text-primary"
                                                : "text-muted-foreground group-hover:text-foreground"
                                            }`}
                                    />

                                    {/* Tooltip */}
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs font-semibold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
