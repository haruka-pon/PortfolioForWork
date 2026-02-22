"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Send, ArrowUp } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    // バリデーション用ステート
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [messageError, setMessageError] = useState("");

    // Confetti用 (SPAにおけるHydrationエラーを防ぐためクライアントサイドのみでレンダリング)
    const [isClient, setIsClient] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const validateEmail = (val: string) => {
        if (!val) {
            setEmailError("メールアドレスを入力してください");
            return false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            setEmailError("正しいメールアドレスの形式で入力してください");
            return false;
        }
        setEmailError("");
        return true;
    };

    const validateMessage = (val: string) => {
        if (!val) {
            setMessageError("お問い合わせ内容を入力してください");
            return false;
        } else if (val.trim().length < 10) {
            setMessageError("お問い合わせ内容は10文字以上で入力してください");
            return false;
        }
        setMessageError("");
        return true;
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (emailError) validateEmail(e.target.value);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        if (messageError) validateMessage(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isEmailValid = validateEmail(email);
        const isMessageValid = validateMessage(message);

        if (!isEmailValid || !isMessageValid) {
            return;
        }

        setIsSubmitting(true);
        setIsError(false);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            });

            const data = await response.json().catch(() => null);

            if (response.ok) {
                setIsSuccess(true);
                form.reset();
                setEmail("");
                setMessage("");
            } else {
                console.error("Server API Error Response:", data);
                throw new Error(data?.error || `Failed to submit: ${response.status}`);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section id="contact" className="py-24 px-4 bg-gradient-to-b from-background to-secondary/30 relative">
            {isSuccess && isClient && (
                <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                        numberOfPieces={500}
                        gravity={0.15}
                    />
                </div>
            )}

            <div className="container mx-auto max-w-3xl text-center relative z-10">
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
                        {isSuccess ? (
                            <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 text-center space-y-6">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary mb-2">
                                    <Send className="w-10 h-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">送信完了しました！</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        お問い合わせありがとうございます。<br />
                                        内容を確認次第、折り返しご連絡させていただきます。
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsSuccess(false)}
                                    >
                                        続けてメッセージを送る
                                    </Button>
                                    <Button
                                        onClick={scrollToTop}
                                        className="gap-2"
                                    >
                                        <ArrowUp className="w-4 h-4" />
                                        トップへ戻る
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Honey pot to prevent spam */}
                                <input type="text" name="_honey" style={{ display: 'none' }} />
                                {/* Disable Captcha */}
                                <input type="hidden" name="_captcha" value="false" />

                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">お名前 <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        disabled={isSubmitting}
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
                                        value={email}
                                        onChange={handleEmailChange}
                                        onBlur={(e) => validateEmail(e.target.value)}
                                        required
                                        disabled={isSubmitting}
                                        className={`w-full flex h-12 rounded-lg border bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${emailError ? 'border-red-500 focus-visible:ring-red-500' : 'border-input focus-visible:ring-primary'}`}
                                        placeholder="example@yourdomain.com"
                                    />
                                    {emailError && (
                                        <p className="text-red-500 text-xs font-medium mt-1">{emailError}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">お問い合わせ内容 <span className="text-red-500">*</span></label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={message}
                                        onChange={handleMessageChange}
                                        onBlur={(e) => validateMessage(e.target.value)}
                                        required
                                        rows={5}
                                        disabled={isSubmitting}
                                        className={`w-full flex min-h-[120px] rounded-lg border bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y ${messageError ? 'border-red-500 focus-visible:ring-red-500' : 'border-input focus-visible:ring-primary'}`}
                                        placeholder="ご相談内容をこちらにご記入ください（10文字以上）..."
                                    ></textarea>
                                    {messageError && (
                                        <p className="text-red-500 text-xs font-medium mt-1">{messageError}</p>
                                    )}
                                </div>

                                {isError && (
                                    <p className="text-red-500 text-sm font-medium">
                                        エラーが発生しました。時間をおいて再度お試しください。
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting || !!emailError || !!messageError}
                                    className="w-full rounded-lg text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                    ) : (
                                        <Send className="mr-2 w-5 h-5" />
                                    )}
                                    {isSubmitting ? "送信中..." : "送信する"}
                                </Button>
                            </form>
                        )}
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
