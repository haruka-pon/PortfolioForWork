"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Sparkles, Send } from "lucide-react";

export function ContactSection() {
    return (
        <section id="contact" className="py-24 px-4 bg-gradient-to-b from-background to-secondary/30">
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

                    <div className="pt-8 text-left max-w-xl mx-auto">
                        <form action="https://formsubmit.co/yagi.haruka.11@gmail.com" method="POST" className="space-y-6">
                            {/* Honey pot to prevent spam */}
                            <input type="text" name="_honey" style={{ display: 'none' }} />
                            {/* Disable Captcha */}
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_next" value="https://haruka-portfolio.vercel.app/" /> {/* Might need to update this URL later */}

                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">お名前 <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full flex h-12 rounded-lg border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="山田 太郎"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">メールアドレス <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full flex h-12 rounded-lg border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="example@yourdomain.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">お問い合わせ内容 <span className="text-red-500">*</span></label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    className="w-full flex min-h-[120px] rounded-lg border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                    placeholder="ご相談内容をこちらにご記入ください..."
                                ></textarea>
                            </div>

                            <Button type="submit" size="lg" className="w-full rounded-lg text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                                <Send className="mr-2 w-5 h-5" />
                                送信する
                            </Button>
                        </form>
                    </div>

                    <p className="text-sm text-muted-foreground pt-4">
                        通常 1〜2営業日以内に返信いたします。<br />
                        ※自動返信メールは送信されませんのでご了承ください。
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
