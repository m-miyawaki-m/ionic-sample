# 出荷実績登録画面 設計書

## 概要

倉庫管理アプリに「出荷実績登録」画面を新規追加する。バーコードスキャンで商品を読み取り、種別ごとにカード形式で結果を蓄積し、一括登録する画面。

## 画面構成

### メイン画面: ShippingRecordPage

1スクロールビュー + 下部固定エリアの構成。

```
┌─────────────────────────┐
│ ← 出荷実績登録           │ ヘッダー (PageLayout)
├─────────────────────────┤
│ 番号 *: [SH-2026-0001] │ 入力エリア（常時表示）
│ 種別 *: ◉A ○B ○C       │ ラジオ3択（常時表示）
│   [+ その他条件]         │ 折りたたみトグル
│   ┌ 登録日時: [選択]   │
│   │ 区分: [プルダウン]  │ 展開時のみ表示
│   │ メモ1: [テキスト]   │
│   └ メモ2: [テキスト]   │
├─────────────────────────┤
│ スキャン結果 — 種別A (2件)│ カードエリア
│ ┌─────────────────────┐ │
│ │ 品番: ABC-123  数量:10│ │
│ │ ロット: L2026-04     │ │ 入力済カード
│ │ [詳細]               │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 品番: DEF-456  数量:5 │ │
│ │ ロット: L2026-05     │ │ 未入力カード
│ │ 未入力: 保管場所, 備考 │ │
│ │ [入力する]           │ │
│ └─────────────────────┘ │
├─────────────────────────┤
│ [    登録確定 (2件)    ] │ 固定ボタン
├─────────────────────────┤
│  📋入力    📷スキャン    │ 固定タブバー
└─────────────────────────┘
```

### 詳細/編集画面: ShippingRecordDetailPage

カードのボタンから別画面遷移。全項目を表示し、手入力項目のみ編集可能。

```
┌─────────────────────────┐
│ ← 詳細・編集             │
├─────────────────────────┤
│ 品番: ABC-123      (RO) │ スキャン取得項目
│ 数量: 10           (RO) │ 読み取り専用
│ ロット: L2026-04   (RO) │
├─────────────────────────┤
│ 保管場所: [入力]    (RW) │ 手入力項目
│ 備考: [入力]        (RW) │ 編集可能
├─────────────────────────┤
│ [      保存      ]      │
└─────────────────────────┘
```

## 利用する既存コンポーネント

| コンポーネント | 用途 |
|---|---|
| PageLayout | 両画面のページラッパー（ヘッダー・戻るボタン） |
| ScannerStatus | スキャナー接続状態表示 |
| SubmitButton | 登録確定ボタン、詳細画面の保存ボタン |
| FeedbackToast | 登録成功/失敗の通知 |
| LoadingOverlay | 通信中のローディング |
| SelectPopup | その他条件のプルダウン選択 |

## 利用するIonicコンポーネント

- IonRadioGroup / IonRadio: 種別ラジオ3択
- IonCard / IonCardHeader / IonCardContent: スキャン結果カード
- IonDatetime: 登録日時のカレンダー選択
- IonInput: テキスト入力フィールド
- IonButton: 各種ボタン
- IonIcon: アイコン表示
- IonBadge: 件数バッジ
- IonAlert: 登録確定の確認ダイアログ
- ion-tab-bar / ion-tab-button: 下部タブバー（入力・スキャン）

## 利用するcomposable

- useSP2Scanner: バーコードスキャン機能
- useApi: API通信
- useLoadingMode: ローディング表示モード

## データモデル

```typescript
// 種別
type ShippingRecordType = 'typeA' | 'typeB' | 'typeC';

// スキャン結果カード1件
interface ShippingRecordItem {
  id: number;                    // 連番
  type: ShippingRecordType;      // スキャン時の種別
  itemCode: string;              // 品番（スキャン取得）
  quantity: number;              // 数量（スキャン取得）
  lotNumber: string;             // ロット（スキャン取得）
  storageLoc?: string;           // 保管場所（手入力）
  remarks?: string;              // 備考（手入力）
  hasManualInput: boolean;       // 手入力項目の有無
  manualInputComplete: boolean;  // 手入力完了フラグ
  scannedAt: string;             // スキャン日時
}

// 登録フォーム
interface ShippingRecordForm {
  recordNumber: string;          // 番号（必須）
  recordType: ShippingRecordType; // 種別（必須）
  registeredAt: string;          // 登録日時
  category: string;              // 区分（プルダウン）
  memo1: string;                 // メモ1
  memo2: string;                 // メモ2
}
```

## 操作フロー

1. トップページから「出荷実績登録」ボタンで画面遷移
2. 番号入力、種別ラジオ選択（必須）
3. 必要に応じて「その他条件」を展開して入力
4. 下部「スキャン」タブでバーコード読み取り
5. 読み取り結果がカードとして追加される（選択中の種別に紐づく）
6. カードに未入力項目がある場合「入力する」ボタン表示 → 詳細/編集画面へ遷移
7. 入力済カードは「詳細」ボタン → 同じ詳細/編集画面へ遷移（手入力項目も編集可）
8. 種別ラジオを切り替えるとカード表示がフィルタされる
9. 「登録確定」ボタン押下 → 確認ダイアログ「○件登録しますか？」 → OK で API送信
10. 成功トースト表示、エラー時はエラートースト表示

## ルーティング

- `/shipping-record` → ShippingRecordPage.vue
- `/shipping-record/detail/:id` → ShippingRecordDetailPage.vue

## ホーム画面への追加

menus配列に追加:
```javascript
{ title: '出荷実績登録', description: 'バーコードスキャン → 実績登録', path: '/shipping-record', icon: createOutline }
```

## ファイル構成

- `src/views/ShippingRecordPage.vue` — メイン画面
- `src/views/ShippingRecordDetailPage.vue` — 詳細/編集画面
- `src/router/index.ts` — ルート追加
- `src/views/HomePage.vue` — ナビゲーション追加
- `src/types/index.ts` — 型定義追加
