"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, LayoutDashboard, Workflow, Sparkles } from "lucide-react";

const WORKS = [
    {
        title: "E-Commerce Platform Renewal",
        category: "Full Stack Dev",
        icon: ShoppingCart,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tech: ["Laravel", "Vue.js", "AWS", "MySQL"],
        description: "大規模ECサイトのリニューアル案件。レガシーコードからの脱却とパフォーマンス改善（レスポンスタイム50%短縮）を担当。バックエンドのAPI設計からフロントエンドのつなぎ込みまで一貫して行いました。",
        role: "API設計・フロント連動",
    },
    {
        title: "Corporate Dashboard System",
        category: "Frontend Dev",
        icon: LayoutDashboard,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        tech: ["React", "TypeScript", "Tailwind CSS"],
        description: "社内KPI管理用ダッシュボードの設計・実装。直感的なUIとリアルタイムデータ反映を実現し、経営陣の意思決定スピード向上に貢献しました。",
        role: "UI/UXコンポーネント実装",
    },
    {
        title: "Inventory Management Tool",
        category: "Tool Dev",
        icon: Workflow,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        tech: ["Node.js", "Google Apps Script"],
        description: "スプレッドシートと連携した在庫管理自動化ツール。手作業で行っていたデータ集計処理をプログラム化し、現場の業務工数を月間約40時間削減しました。",
        role: "要件定義・ツール開発",
    },
];

export function WorksSection() {
    return (
        <section id="works" className="py-24 px-4 bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <div className="inline-block p-2 rounded-full bg-primary/10 mb-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Selected Works
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        プロジェクトの目的を理解し、技術で解決した実績の一部をご提案します。<br className="hidden md:block" />
                        <span className="text-sm">※守秘義務のため、具体的なサービス名等の記載は控えております。</span>
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {WORKS.map((work, index) => {
                        const Icon = work.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative bg-card/40 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-card/60 transition-colors shadow-lg hover:shadow-xl hover:border-primary/30"
                            >
                                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                                    {/* Visual Representation */}
                                    <div className={`shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center ${work.bg} ${work.color} shadow-inner transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3`}>
                                        <Icon className="w-12 h-12 md:w-16 md:h-16 opacity-80" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <div>
                                                <Badge variant="outline" className={`${work.color} border-${work.color.split('-')[1]}-500/30 mb-2`}>
                                                    {work.category}
                                                </Badge>
                                                <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {work.title}
                                                </h3>
                                            </div>
                                            <Badge variant="secondary" className="w-fit bg-secondary/50 backdrop-blur-md">
                                                📝 {work.role}
                                            </Badge>
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed md:text-lg">
                                            {work.description}
                                        </p>

                                        <div className="pt-4 flex flex-wrap gap-2 border-t border-border/50">
                                            {work.tech.map((t) => (
                                                <span key={t} className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium text-foreground/80 border border-white/5">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
