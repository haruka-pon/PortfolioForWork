"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const WORKS = [
    {
        title: "E-Commerce Platform Renewal",
        category: "Full Stack Dev",
        image: "/placeholder-1.jpg", // Placeholder
        tech: ["Laravel", "Vue.js", "AWS", "MySQL"],
        description: "大規模ECサイトのリニューアル案件。レガシーコードからの脱却とパフォーマンス改善を担当。",
    },
    {
        title: "Corporate Dashboard System",
        category: "Frontend Dev",
        image: "/placeholder-2.jpg", // Placeholder
        tech: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
        description: "社内KPI管理用ダッシュボードの設計・実装。直感的なUIとリアルタイムデータ反映を実現。",
    },
    {
        title: "Inventory Management Tool",
        category: "Tool Dev",
        image: "/placeholder-3.jpg", // Placeholder
        tech: ["Node.js", "Google Apps Script", "Spreadsheet"],
        description: "スプレッドシートと連携した在庫管理自動化ツール。業務工数を月40時間削減。",
    },
];

export function WorksSection() {
    return (
        <section id="works" className="py-24 px-4 bg-background">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        Selected Works
                    </h2>
                    <p className="text-muted-foreground">
                        過去の実績の一部をご紹介します（守秘義務のため一部抽象化しています）
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {WORKS.map((work, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Card className="overflow-hidden border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors duration-300">
                                <div className="aspect-video relative bg-muted overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                    {/* Placeholder for actual image */}
                                    <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground text-sm">
                                        Project Image
                                    </div>
                                </div>

                                <CardContent className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <span className="text-xs font-mono text-primary">{work.category}</span>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {/* Links placeholders */}
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {work.title}
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {work.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {work.tech.map((t) => (
                                            <Badge key={t} variant="secondary" className="text-xs">
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
