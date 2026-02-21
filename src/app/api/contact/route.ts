import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("Email configuration is missing. Please set EMAIL_USER and EMAIL_PASS in your .env.local file.");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        // Nodemailerのトランスポーター設定 (Gmailを想定)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Gmailの「アプリ パスワード」を使用してください
            },
        });

        // 1. サイト管理者（自分）宛ての通知メール
        const mailOptionsToAdmin = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // 自分宛て
            replyTo: email, // 返信先をお客様のメールアドレスに設定
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
        };

        // 2. お問い合わせユーザー宛ての自動返信メール
        const mailOptionsToUser = {
            from: `"Haruka's Portfolio" <${process.env.EMAIL_USER}>`,
            to: email, // 送信者のメールアドレス
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
        };

        // メールを送信
        await transporter.sendMail(mailOptionsToAdmin);
        await transporter.sendMail(mailOptionsToUser);

        // クライアントには成功を返す
        return NextResponse.json({ success: true, message: "Emails sent successfully" });
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
