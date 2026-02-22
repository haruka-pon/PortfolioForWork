import { ShoppingCart, LayoutDashboard, Workflow, LucideIcon } from "lucide-react";

export interface WorkItem {
    slug: string;
    title: string;
    category: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    tech: string[];
    description: string;
    role: string;
    detail: {
        challenge: string;
        solution: string;
        result: string;
    };
}

export const WORKS_DATA: WorkItem[] = [
    {
        slug: "e-commerce-renewal",
        title: "E-Commerce Platform Renewal",
        category: "Full Stack Dev",
        icon: ShoppingCart,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tech: ["Laravel", "Vue.js", "AWS", "MySQL"],
        description: "大規模ECサイトのリニューアル案件。レガシーコードからの脱却とパフォーマンス改善（レスポンスタイム50%短縮）を担当。バックエンドのAPI設計からフロントエンドのつなぎ込みまで一貫して行いました。",
        role: "API設計・フロント連動",
        detail: {
            challenge: "既存システムが老朽化し、アクセス集中時のレスポンス悪化や機能拡張の難しさが課題となっていました。",
            solution: "LaravelとVue.jsによるモダンなアーキテクチャへ全面刷新しました。データベースクエリの最適化やAWSインフラの見直しによりパフォーマンスを抜本的に改善しました。",
            result: "レスポンスタイムが平均50%短縮され、ユーザーの離脱率が大きく改善。また、コードの保守性が向上し、今後の新機能開発スピードも向上しました。"
        }
    },
    {
        slug: "corporate-dashboard",
        title: "Corporate Dashboard System",
        category: "Frontend Dev",
        icon: LayoutDashboard,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        tech: ["React", "TypeScript", "Tailwind CSS"],
        description: "社内KPI管理用ダッシュボードの設計・実装。直感的なUIとリアルタイムデータ反映を実現し、経営陣の意思決定スピード向上に貢献しました。",
        role: "UI/UXコンポーネント実装",
        detail: {
            challenge: "各部署のデータが様々な形式で分散しており、経営層がリアルタイムでビジネスの全体像を把握できない状態でした。",
            solution: "ReactとTypeScriptを用い、コンポーネント指向で再利用性の高いダッシュボード画面を開発。Tailwind CSSを活用し、モダンで直感的なUIデザインに仕上げました。",
            result: "散在していたデータを美しいグラフなどで一元的に可視化できるようになり、日々の会議での意思決定スピードが大幅に短縮されました。"
        }
    },
    {
        slug: "inventory-management",
        title: "Inventory Management Tool",
        category: "Tool Dev",
        icon: Workflow,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        tech: ["Node.js", "Google Apps Script"],
        description: "スプレッドシートと連携した在庫管理自動化ツール。手作業で行っていたデータ集計処理をプログラム化し、現場の業務工数を月間約40時間削減しました。",
        role: "要件定義・ツール開発",
        detail: {
            challenge: "バックオフィスの担当者が日々の在庫集計を手作業（コピー＆ペースト）で行っており、ヒューマンエラーの発生や多大な業務時間が負担となっていました。",
            solution: "Google Apps Script (GAS) を活用し、各スプレッドシート上のデータを自動で収集・集計・整形するプログラムを開発しました。トリガーを設定し完全自動化を実現しました。",
            result: "複雑な集計が一瞬で完了するようになり、現場の作業工数を月間約40時間削減。入力ミスによる在庫のズレも防げるようになりました。"
        }
    },
];

export function getWorkBySlug(slug: string): WorkItem | undefined {
    return WORKS_DATA.find(work => work.slug === slug);
}
