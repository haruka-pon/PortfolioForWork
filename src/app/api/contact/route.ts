import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // ハニーポット（スパム対策）のチェック
        const honey = formData.get('_honey');
        if (honey) {
            return NextResponse.json({ error: "Spam detected" }, { status: 400 });
        }

        // 実際にはここでResendやNodemailerを使ってメールを送信する処理を実装します
        console.log("========= お問い合わせ受信 =========");
        console.log(`名前: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`メッセージ:\n${message}`);
        console.log("====================================");

        // クライアントには成功を返す
        return NextResponse.json({ success: true, message: "Message received successfully" });
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
