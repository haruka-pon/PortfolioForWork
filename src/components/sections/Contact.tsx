"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Sparkles } from "lucide-react";

export function ContactSection() {
    return (
        <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/30">
            <div className="container mx-auto max-w-3xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="space-y-8 bg-card/30 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl"
                >
                    <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
                        <Sparkles className="w-6 h-6 text-primary" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Let's work together!
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        ご覧いただきありがとうございます。<br />
                        「こんなことできる？」という段階からでも、まずはお気軽にご相談ください。<br />
                        丁寧なヒアリングから、最適なソリューションをご提案いたします。
                    </p>

                    <div className="pt-8">
                        <Button size="lg" className="rounded-full text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                            <Mail className="mr-2 w-5 h-5" />
                            お問い合わせはこちら
                        </Button>
                    </div>

                    <p className="text-sm text-muted-foreground pt-8">
                        通常 1〜2営業日以内に返信いたします。
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
