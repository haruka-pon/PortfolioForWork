import { WORKS_DATA } from "@/data/works";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WorksListPage() {
    return (
        <main className="min-h-screen bg-background pt-24 pb-16 px-4">
            <div className="container mx-auto max-w-5xl">
                <Link href="/#works" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    ポートフォリオのトップへ戻る
                </Link>

                <div className="space-y-24">
                    <div className="text-center space-y-4 mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">All Works</h1>
                        <p className="text-xl text-muted-foreground">これまでの主な実績一覧</p>
                    </div>

                    {WORKS_DATA.map((work, index) => {
                        const Icon = work.icon;
                        return (
                            <div key={work.slug} id={work.slug} className="rounded-3xl border border-white/5 bg-card/40 backdrop-blur-sm overflow-hidden shadow-2xl flex flex-col md:flex-row">
                                {/* Visual Side - Bigger size for list page */}
                                <div className={`${work.bg} md:w-2/5 p-12 flex flex-col items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                    <Icon className={`w-32 h-32 md:w-48 md:h-48 ${work.color} opacity-80 drop-shadow-2xl transform hover:scale-105 transition-transform duration-700`} />
                                </div>

                                {/* Content Side */}
                                <div className="p-8 md:p-12 md:w-3/5 space-y-8">
                                    <div className="space-y-4 border-b border-border/50 pb-6">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Badge variant="outline" className={`${work.color} border-${work.color.split('-')[1]}-500/30 text-sm py-1 px-4`}>
                                                {work.category}
                                            </Badge>
                                            <Badge variant="secondary" className="text-xs bg-secondary/50">
                                                担当: {work.role}
                                            </Badge>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                            {work.title}
                                        </h2>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {work.tech.map((t) => (
                                                <span key={t} className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium text-foreground/80 border border-white/5">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                                                <span className={work.color}>01.</span> 概要・課題
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {work.detail.challenge}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                                                <span className={work.color}>02.</span> 解決策・アプローチ
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {work.detail.solution}
                                            </p>
                                        </div>

                                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                                            <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                                                <span className={work.color}>03.</span> 成果
                                            </h3>
                                            <p className="text-foreground leading-relaxed flex items-start gap-4">
                                                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                                                <span>{work.detail.result}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-24 text-center">
                    <Link href="/#contact">
                        <span className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-2">
                            お問い合わせへ進む
                        </span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
