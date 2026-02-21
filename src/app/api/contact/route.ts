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
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>", // デフォルトの送信元アドレス（無料プランの場合）
            to: process.env.EMAIL_USER || email, // ご自身のメールアドレス（設定されていなければ仮にお客様のアドレス）
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

        // ユーザーにお礼メールを自動送信
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>", // 独自のドメインを登録するまではこれを使用
            to: email, // お問い合わせしてくれた人のメール
            subject: `【自動返信】お問い合わせありがとうございます`,
            text: `
${name} 様

この度はポートフォリオサイトよりお問い合わせいただき、誠にありがとうございます。
以下の内容でお問い合わせを承りました。

内容を確認次第、改めてご連絡させていただきますので、今しばらくお待ちくださいませ。

--------------------------------------------------
【お名前】
${name}

【メールアドレス】
${email}

【お問い合わせ内容】
${message}
--------------------------------------------------

※このメールはお問い合わせいただいた方に自動で送信しております。
※ご返信には1〜2営業日ほどいただく場合がございます。
            `,
        });

        // クライアントには成功を返す
        return NextResponse.json({ success: true, message: "Emails sent successfully" });
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
