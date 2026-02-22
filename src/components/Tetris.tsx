"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RotateCcw } from "lucide-react";

// --- Game Constants & Helpers ---
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

// Defines shapes [y, x] relative to center
const TETROMINOS = {
    I: { shape: [[0, -1], [0, 0], [0, 1], [0, 2]], color: "bg-cyan-500" },
    J: { shape: [[-1, -1], [0, -1], [0, 0], [0, 1]], color: "bg-blue-600" },
    L: { shape: [[-1, 1], [0, -1], [0, 0], [0, 1]], color: "bg-orange-500" },
    O: { shape: [[0, 0], [0, 1], [1, 0], [1, 1]], color: "bg-yellow-400" },
    S: { shape: [[0, 0], [0, 1], [-1, -1], [-1, 0]], color: "bg-green-500" },
    T: { shape: [[-1, 0], [0, -1], [0, 0], [0, 1]], color: "bg-purple-500" },
    Z: { shape: [[-1, 0], [-1, 1], [0, -1], [0, 0]], color: "bg-red-500" }
};

type TetrominoType = keyof typeof TETROMINOS;
const RANDOM_KEYS = Object.keys(TETROMINOS) as TetrominoType[];

const createEmptyBoard = () => Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));

// --- Main Component ---
export function Tetris({ onClose }: { onClose: () => void }) {
    const [board, setBoard] = useState(createEmptyBoard());
    const [currentPiece, setCurrentPiece] = useState<{
        type: TetrominoType;
        pos: { x: number; y: number };
        shape: number[][];
    } | null>(null);

    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const dropSpeed = useRef(1000);

    // Focus ref for keyboard events
    const gameRef = useRef<HTMLDivElement>(null);

    // Spawn a new piece
    const spawnPiece = useCallback(() => {
        const type = RANDOM_KEYS[Math.floor(Math.random() * RANDOM_KEYS.length)];
        const newPiece = {
            type,
            pos: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
            shape: TETROMINOS[type].shape
        };

        // Check game over immediately on spawn
        if (checkCollision(newPiece.pos, newPiece.shape, board)) {
            setGameOver(true);
            return null;
        }
        setCurrentPiece(newPiece);
        return newPiece;
    }, [board]);

    // Check board collisions
    const checkCollision = (pos: { x: number; y: number }, shape: number[][], currentBoard: string[][]) => {
        for (const [dy, dx] of shape) {
            const newY = pos.y + dy;
            const newX = pos.x + dx;

            // Wall and floor bounds
            if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) return true;
            // Existing blocks (skip top invisible rows if needed, but handled safely)
            if (newY >= 0 && currentBoard[newY][newX] !== null) return true;
        }
        return false;
    };

    // Merge piece into board and clear lines
    const mergePiece = useCallback(() => {
        if (!currentPiece) return;

        const newBoard = board.map(row => [...row]);
        currentPiece.shape.forEach(([dy, dx]) => {
            const y = currentPiece.pos.y + dy;
            const x = currentPiece.pos.x + dx;
            if (y >= 0 && y < BOARD_HEIGHT) {
                newBoard[y][x] = TETROMINOS[currentPiece.type].color;
            }
        });

        // Line clears
        let linesCleared = 0;
        const finalBoard = newBoard.filter(row => {
            const isFull = row.every(cell => cell !== null);
            if (isFull) linesCleared++;
            return !isFull;
        });

        // Add empty rows to top
        for (let i = 0; i < linesCleared; i++) {
            finalBoard.unshift(Array(BOARD_WIDTH).fill(null));
        }

        if (linesCleared > 0) {
            setScore(prev => prev + [0, 100, 300, 500, 800][linesCleared]);
            // Speed up game slightly
            dropSpeed.current = Math.max(100, dropSpeed.current - (linesCleared * 20));
        }

        setBoard(finalBoard);
        setCurrentPiece(null);
    }, [board, currentPiece]);

    // Movement actions
    const moveDown = useCallback(() => {
        if (gameOver || isPaused || !currentPiece) return;

        if (!checkCollision({ x: currentPiece.pos.x, y: currentPiece.pos.y + 1 }, currentPiece.shape, board)) {
            setCurrentPiece(prev => prev ? { ...prev, pos: { ...prev.pos, y: prev.pos.y + 1 } } : null);
        } else {
            mergePiece();
        }
    }, [currentPiece, board, gameOver, isPaused, mergePiece]);

    const moveLaterally = useCallback((dir: number) => {
        if (gameOver || isPaused || !currentPiece) return;

        if (!checkCollision({ x: currentPiece.pos.x + dir, y: currentPiece.pos.y }, currentPiece.shape, board)) {
            setCurrentPiece(prev => prev ? { ...prev, pos: { ...prev.pos, x: prev.pos.x + dir } } : null);
        }
    }, [currentPiece, board, gameOver, isPaused]);

    const rotate = useCallback(() => {
        if (gameOver || isPaused || !currentPiece) return;

        // Standard 90 deg rotation around 0,0 for coordinates
        const newShape = currentPiece.shape.map(([dy, dx]) => [dx, -dy]);

        // Wall kick basic (try naturally, if failed, don't rotate)
        if (!checkCollision(currentPiece.pos, newShape, board)) {
            setCurrentPiece(prev => prev ? { ...prev, shape: newShape } : null);
        }
    }, [currentPiece, board, gameOver, isPaused]);

    // Game Loop
    useEffect(() => {
        if (gameOver || isPaused) return;

        if (!currentPiece) {
            spawnPiece();
            return;
        }

        const dropInterval = setInterval(moveDown, dropSpeed.current);
        return () => clearInterval(dropInterval);
    }, [currentPiece, spawnPiece, moveDown, gameOver, isPaused]);

    // Keyboard Handlers
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft": moveLaterally(-1); break;
                case "ArrowRight": moveLaterally(1); break;
                case "ArrowDown": moveDown(); break;
                case "ArrowUp": rotate(); break;
                case " ": // Hard drop
                    if (!currentPiece || isPaused || gameOver) break;
                    let tempY = currentPiece.pos.y;
                    while (!checkCollision({ x: currentPiece.pos.x, y: tempY + 1 }, currentPiece.shape, board)) {
                        tempY++;
                    }
                    setCurrentPiece(prev => prev ? { ...prev, pos: { ...prev.pos, y: tempY } } : null);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [moveLaterally, moveDown, rotate, currentPiece, isPaused, gameOver, board]);

    const startGame = () => {
        setBoard(createEmptyBoard());
        setCurrentPiece(null);
        setScore(0);
        setGameOver(false);
        setIsPaused(false);
        dropSpeed.current = 800;
    };

    useEffect(() => {
        // Start game initially
        startGame();
        if (gameRef.current) gameRef.current.focus();
    }, []);

    // Render helpers
    const renderGrid = () => {
        const displayBoard = board.map(row => [...row]);

        // Overlay current piece
        if (currentPiece) {
            currentPiece.shape.forEach(([dy, dx]) => {
                const y = currentPiece.pos.y + dy;
                const x = currentPiece.pos.x + dx;
                if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
                    displayBoard[y][x] = TETROMINOS[currentPiece.type].color;
                }
            });
        }

        return displayBoard.map((row, y) => (
            <div key={y} className="flex">
                {row.map((cell, x) => (
                    <div
                        key={`${y}-${x}`}
                        className={`w-6 h-6 sm:w-8 sm:h-8 border border-white/10 ${cell || 'bg-black/40'} shadow-inner rounded-sm m-[1px]`}
                    />
                ))}
            </div>
        ));
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-xl p-4"
                ref={gameRef}
                tabIndex={0}
            >
                <div className="relative bg-card/50 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-8 items-center md:items-start max-w-3xl w-full">

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Game Board */}
                    <div className="bg-black/60 p-2 rounded-xl border border-white/5 relative shadow-[0_0_50px_rgba(var(--primary),0.1)]">
                        {renderGrid()}

                        {gameOver && (
                            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm">
                                <h3 className="text-3xl font-bold text-red-500 mb-2">GAME OVER</h3>
                                <p className="text-xl mb-6">Score: {score}</p>
                                <button
                                    onClick={startGame}
                                    className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:scale-105 transition-transform"
                                >
                                    Play Again
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Controls & Status */}
                    <div className="flex flex-col gap-6 w-full md:w-64">
                        <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-center">
                            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-1">Score</p>
                            <p className="text-4xl font-mono font-bold text-primary">{score}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center">
                            <button
                                onClick={() => setIsPaused(!isPaused)}
                                className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-full font-medium transition-colors"
                            >
                                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                                {isPaused ? "Resume" : "Pause"}
                            </button>
                            <button
                                onClick={startGame}
                                className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-full font-medium transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" /> Reset
                            </button>
                        </div>

                        <div className="bg-black/20 p-4 rounded-xl text-sm text-muted-foreground mt-auto hidden md:block border border-white/5">
                            <p className="font-bold mb-2">Controls:</p>
                            <ul className="space-y-1">
                                <li><kbd className="bg-white/10 px-1 rounded">↑</kbd> Rotate</li>
                                <li><kbd className="bg-white/10 px-1 rounded">←</kbd> <kbd className="bg-white/10 px-1 rounded">→</kbd> Move</li>
                                <li><kbd className="bg-white/10 px-1 rounded">↓</kbd> Soft Drop</li>
                                <li><kbd className="bg-white/10 px-1 rounded">Space</kbd> Hard Drop</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
}
