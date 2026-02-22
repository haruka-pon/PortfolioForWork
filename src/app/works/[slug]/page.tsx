import { getWorkBySlug, WORKS_DATA } from "@/data/works";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
    return WORKS_DATA.map((work) => ({
        slug: work.slug,
    }));
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
    const work = getWorkBySlug(params.slug);

    if (!work) {
        notFound();
    }

    const Icon = work.icon;

    return (
        <main className="min-h-screen bg-background pt-24 pb-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <Link href="/#works" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    ポートフォリオへ戻る
                </Link>

                <div className={`rounded-3xl border border-white/5 bg-card/40 backdrop-blur-sm overflow-hidden shadow-2xl`}>
                    <div className={`${work.bg} p-8 md:p-16 flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                        <Icon className={`w-32 h-32 md:w-48 md:h-48 ${work.color} opacity-80 drop-shadow-2xl transform hover:scale-105 transition-transform duration-700`} />
                    </div>

                    <div className="p-8 md:p-12 space-y-12">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="outline" className={`${work.color} border-${work.color.split('-')[1]}-500/30 text-base py-1 px-4`}>
                                    {work.category}
                                </Badge>
                                <Badge variant="secondary" className="text-sm bg-secondary/50">
                                    担当: {work.role}
                                </Badge>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                                {work.title}
                            </h1>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {work.tech.map((t) => (
                                    <span key={t} className="px-3 py-1 bg-background/50 rounded-full text-sm font-medium text-foreground/80 border border-white/5">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-xl font-bold flex items-center gap-2 border-b border-border/50 pb-2 mb-4">
                                <span className={work.color}>01.</span> 課題 (Challenge)
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                {work.detail.challenge}
                            </p>

                            <h3 className="text-xl font-bold flex items-center gap-2 border-b border-border/50 pb-2 mb-4">
                                <span className={work.color}>02.</span> 解決策 (Solution)
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                {work.detail.solution}
                            </p>

                            <h3 className="text-xl font-bold flex items-center gap-2 border-b border-border/50 pb-2 mb-4">
                                <span className={work.color}>03.</span> 成果 (Result)
                            </h3>
                            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                                <p className="text-lg text-foreground leading-relaxed flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                                    <span>{work.detail.result}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
