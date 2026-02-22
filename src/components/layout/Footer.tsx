"use client";

import { useState } from "react";
import { Tetris } from "@/components/Tetris";

export function Footer() {
    const [clickCount, setClickCount] = useState(0);
    const [showTetris, setShowTetris] = useState(false);

    const handleSecretClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);

        // Trigger after 5 quick clicks
        if (newCount >= 5) {
            setShowTetris(true);
            setClickCount(0); // reset
        }

        // Reset count if they stop clicking after a while
        setTimeout(() => {
            setClickCount(prev => Math.max(0, prev - 1));
        }, 2000);
    };

    return (
        <>
            <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/40 bg-background/50 backdrop-blur-sm relative z-10">
                <p>
                    &copy; {new Date().getFullYear()}{" "}
                    <span
                        onClick={handleSecretClick}
                        className="cursor-pointer select-none relative group"
                        title="Click me..."
                    >
                        Haruka
                        {clickCount > 0 && clickCount < 5 && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-primary/20 text-primary px-2 py-1 rounded opacity-50 pointer-events-none">
                                {5 - clickCount}
                            </span>
                        )}
                    </span>
                    . All rights reserved.
                </p>
            </footer>

            {showTetris && <Tetris onClose={() => setShowTetris(false)} />}
        </>
    );
}
