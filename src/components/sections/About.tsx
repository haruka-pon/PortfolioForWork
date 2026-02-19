"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function AboutSection() {
    return (
        <section className="py-24 bg-secondary/20">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <Badge variant="outline" className="border-primary/50 text-primary">About Me</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold">成果に直結するWeb開発を<br className="md:hidden" />一貫サポート</h2>
                    </div>

                    <div className="prose prose-lg dark:prose-invert mx-auto leading-relaxed text-muted-foreground space-y-6">
                        <p>
                            はじめまして。プロフィールをご覧いただきありがとうございます。<br />
                            本業では<strong className="text-foreground">フルスタックエンジニア</strong>として、最近ではLaravelを中心にWEB開発を行っています。
                        </p>
                        <p>
                            現在は本業で、大規模ECサイトの保守・運用・新規開発に携わっており、API設計からフロントエンド実装まで一貫して対応しています。
                            「作るだけ」でなく、<strong className="text-foreground">運用を見据えた設計・保守しやすい実装</strong>を心がけています。
                        </p>
                        <div className="p-6 bg-background/50 backdrop-blur-sm rounded-2xl border border-primary/10 shadow-sm">
                            <p className="mb-4 font-bold text-foreground">💡 こんなこと、お任せください</p>
                            <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside">
                                <li>小規模な機能追加や改修</li>
                                <li>既存システムのパフォーマンス改善</li>
                                <li>業務効率化ツールの開発</li>
                                <li>「こんなことできる？」という技術相談</li>
                            </ul>
                        </div>
                        <p>
                            エンジニア歴は若手ですが、その分<strong className="text-foreground">スピード感と柔軟性</strong>には自信があります。
                            丁寧なヒアリングと、分かりやすい説明を心がけています。
                            一緒により良いサービスを作れることを楽しみにしております。
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
