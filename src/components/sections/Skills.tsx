"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Layout, Settings, Palette, CheckCircle2 } from "lucide-react";

const SKILL_CATEGORIES = [
    {
        title: "Backend",
        icon: Server,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "group-hover:border-blue-500/50",
        skills: [
            "PHP (Laravel)",
            "REST API 設計・実装",
            "業務システム開発",
            "既存機能改修・保守",
            "バッチ処理実装",
            "MySQL (テーブル・クエリ設計)",
        ],
    },
    {
        title: "Frontend",
        icon: Layout,
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        border: "group-hover:border-pink-500/50",
        skills: [
            "React (TypeScript)",
            "SPA開発",
            "API連携画面実装",
            "JavaScript (ES6+)",
            "HTML5 / CSS3",
        ],
    },
    {
        title: "Server / Tools",
        icon: Settings,
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "group-hover:border-green-500/50",
        skills: [
            "Node.js (API開発)",
            "Java (基礎理解)",
            "Google Apps Script (業務自動化)",
            "VBA (Excel業務効率化)",
        ],
    },
    {
        title: "Design",
        icon: Palette,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "group-hover:border-purple-500/50",
        skills: ["Figma", "Adobe XD", "デザインデータからのコーディング"],
    },
];

export function SkillsSection() {
    return (
        <section id="skills" className="py-24 px-4 bg-muted/20">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                        Services & Skills
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Laravelを中心としたWebアプリケーション開発を本業としており、
                        API設計からフロントエンド実装まで一貫して対応可能です。
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SKILL_CATEGORIES.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className={`h-full border-white/5 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl group ${category.border}`}>
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div className={`p-3 rounded-xl ${category.bg} ${category.color}`}>
                                        <category.icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-xl font-bold tracking-wide">
                                        {category.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {category.skills.map((skill) => (
                                            <li key={skill} className="flex items-start gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                                                <CheckCircle2 className={`w-4 h-4 mt-1 shrink-0 ${category.color} opacity-70`} />
                                                <span className="text-sm font-medium">{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block px-8 py-6 bg-gradient-to-br from-background to-secondary rounded-2xl border border-dashed border-primary/30 shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-sm md:text-base font-bold text-foreground/90 relative z-10">
                            🧩 バックエンドAPI構築からフロント画面実装まで、<br className="md:hidden" />「Webシステム × 業務自動化」も対応可能です
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
