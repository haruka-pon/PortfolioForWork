import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        // ハニーポット（スパム対策）のチェック
        const honey = formData.get('_honey');
        if (honey) {
            return NextResponse.json({ error: "Spam detected" }, { status: 400 });
        }

        // 環境変数が設定されていない場合のエラーハンドリング
        if (!process.env.RESEND_API_KEY) {
            console.error("Resend API key is missing. Please set RESEND_API_KEY in your .env.local file.");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        // 自分自身（サイト管理者）に送付する通知メール
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>", // デフォルトの送信元アドレス（無料プランの場合）
            // Resendの無料枠（ドメイン未登録）では、Resendに登録したご自身のメールアドレス宛てにしか送信できません
            to: process.env.EMAIL_USER || "Resendに登録したあなたのメールアドレス",
            replyTo: email,
            subject: `【お問い合わせ】ポートフォリオサイトから新しいメッセージが届きました`,
            text: `
ポートフォリオサイトから新しいお問い合わせがありました。

【お名前】
${name}

【メールアドレス】
${email}

【お問い合わせ内容】
${message}
            `,
        });

        if (error) {
            console.error("Resend API Error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        /* 
         * 注意：Resendの無料枠（onboardingドメイン）では、
         * サインアップした自分のアドレス以外（＝お問い合わせしてきた第三者）へメールを送信することが制限されています。
         * 自動返信機能を使う場合は、事前にご自身のカスタムドメイン（例: haruka.com）をご購入の上、
         * Resendの dashboard > Domains で設定・認証していただく必要があります。
         * そのため、自動返信機能は一時的にコメントアウトしています。
         */
        // await resend.emails.send({
        //     from: "Acme <onboarding@resend.dev>", 
        //     to: email, 
        //     subject: `【自動返信】...`,
        //     text: `...`
        // });

        // クライアントには成功を返す
        return NextResponse.json({ success: true, message: "Emails sent successfully" });
    } catch (err: unknown) {
        console.error("API Route Error:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
