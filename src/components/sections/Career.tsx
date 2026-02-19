"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, Building2 } from "lucide-react";

const CAREER_ITEMS = [
    {
        company: "株式会社ゲオネットワークス",
        period: "2024年4月 – 現在",
        role: "新卒入社 / エンジニア",
        description: [
            {
                title: "大規模ECサイトの保守・運用・開発",
                details: [
                    "月間流通規模の大きいECサイトの保守・改修業務を担当",
                    "既存機能の改善、バグ修正、パフォーマンス改善対応",
                    "新機能追加に伴う実装対応",
                    "API開発およびフロントエンド実装対応",
                    "SQLチューニング・データ整合性対応",
                ],
            },
            {
                title: "新規ECサイト開発プロジェクト",
                details: ["新規ECサイトの立ち上げに参画", "バックエンド・フロントエンド双方を対応"],
            },
            {
                title: "大規模プロジェクト参画（約100億円規模）",
                details: [
                    "上流工程（要件整理・仕様検討）から下流工程（実装・テスト）まで一貫して担当",
                    "海外出張を実施し、現地調査を行いながらの開発対応",
                    "関係部署・現地担当者との調整業務",
                    "大規模案件における品質・スケジュール意識を持った開発",
                ],
            },
        ],
    },
];

export function CareerSection() {
    return (
        <section className="py-24 px-4 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        Career History
                    </h2>
                    <p className="text-muted-foreground">これまでの経歴と主な担当業務</p>
                </motion.div>

                <div className="space-y-12">
                    {CAREER_ITEMS.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 md:pl-0"
                        >
                            {/* Mobile Timeline Line */}
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent md:hidden" />

                            <div className="md:flex gap-12 items-start">
                                {/* Left: Date & Company */}
                                <div className="md:w-1/3 mb-6 md:mb-0 md:text-right relative">
                                    {/* Desktop Timeline Dot */}
                                    <div className="hidden md:block absolute top-2 -right-[31px] w-4 h-4 rounded-full bg-background border-4 border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] z-20" />
                                    {/* Desktop Timeline Line */}
                                    <div className="hidden md:block absolute top-2 -right-6 w-px h-full bg-gradient-to-b from-primary/50 to-transparent" />

                                    <div className="sticky top-24 space-y-2">
                                        <h3 className="text-xl font-bold text-foreground flex items-center md:justify-end gap-2 group">
                                            <Building2 className="w-5 h-5 md:hidden text-primary" />
                                            {item.company}
                                        </h3>
                                        <div className="flex items-center md:justify-end gap-2 text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm font-mono">{item.period}</span>
                                        </div>
                                        <div className="pt-2">
                                            <Badge variant="outline" className="border-primary/30 text-primary">
                                                {item.role}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Details */}
                                <div className="md:w-2/3 space-y-8">
                                    {item.description.map((project, pIndex) => (
                                        <div
                                            key={pIndex}
                                            className="group bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300 hover:bg-card/50 hover:shadow-lg"
                                        >
                                            <h4 className="font-bold text-lg flex items-center gap-3 pb-3 border-b border-primary/10 mb-4 text-foreground/90 group-hover:text-primary transition-colors">
                                                <Briefcase className="w-4 h-4 text-primary" />
                                                {project.title}
                                            </h4>
                                            <ul className="space-y-3">
                                                {project.details.map((detail, dIndex) => (
                                                    <li
                                                        key={dIndex}
                                                        className="text-muted-foreground text-sm leading-relaxed flex items-start gap-3"
                                                    >
                                                        <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-primary/40 shrink-0 group-hover:bg-primary transition-colors" />
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
