import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
    console.log("=== API Route /api/contact CALLED ===");
    try {
        const formData = await req.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        // ハニーポット（スパム対策）のチェック
        const honey = formData.get('_honey');
        if (honey && honey !== '') {
            console.warn("Spam detected: honey pot filled with:", honey);
            return NextResponse.json({ error: "Spam detected" }, { status: 400 });
        }

        // 環境変数が設定されていない場合のエラーハンドリング
        if (!process.env.RESEND_API_KEY) {
            console.error("Resend API key is missing. Please set RESEND_API_KEY in your .env.local file.");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        // EMAIL_USER が無い場合はエラーにするか、仮のアドレスを設定
        const toEmail = process.env.EMAIL_USER;
        if (!toEmail) {
            console.error("EMAIL_USER is missing in .env.local");
            return NextResponse.json({ error: "Server configuration error: missing EMAIL_USER" }, { status: 500 });
        }

        // 自分自身（サイト管理者）に送付する通知メール
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>", // デフォルトの送信元アドレス（無料プランの場合）
            to: toEmail, // Resendに登録したご自身のメールアドレスのみが使用可能
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
            console.error("=============== RESEND DETAILED ERROR ===============");
            console.error("Error Object:", JSON.stringify(error, null, 2));
            console.error("Error Name:", error.name);
            console.error("Error Message:", error.message);
            console.error("=====================================================");
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        /* 
         * 注意：Resendの無料枠（onboardingドメイン）では、
         * サインアップした自分のアドレス以外（＝お問い合わせしてきた第三者）へメールを送信することが制限されています。
         */

        // クライアントには成功を返す
        return NextResponse.json({ success: true, message: "Emails sent successfully" });
    } catch (err: unknown) {
        console.error("=============== UNHANDLED EXCEPTION ===============");
        console.error(err);
        console.error("===================================================");
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
