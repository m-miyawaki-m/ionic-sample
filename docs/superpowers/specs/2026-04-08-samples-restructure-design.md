# サンプルページ再構成 設計

- 作成日: 2026-04-08
- 対象: `src/views/samples/` 配下の再構成と公式コンポーネントカタログの新設

## 1. 背景と目的

業務画面 (倉庫管理) のVueロジックが厚くなってきた中で、Ionic公式コンポーネントの動作を「素の状態」で確認できる場所が欲しい。現状の `src/views/samples/` 配下には4ページあるが、いずれも業務寄りのカスタムロジック (`PageLayout` ラッパや独自コンポーネント) を含んでおり、公式ドキュメントの参照用としては純粋ではない。

本設計では以下を実現する。

1. **コンポーネントカタログ (新設)** — 1コンポーネント = 1ページの構造で、公式ドキュメントのサンプルコードをほぼそのまま貼って動かす学習・参照用の場
2. **画面モック (既存4ページの整理)** — 既存の業務寄りデモを「モックアップ」として位置づけ直し、フォルダを分離する

## 2. スコープ

### 含むもの

- 新フォルダ構成 (`samples/catalog/` `samples/mockups/`) の作成
- カタログ用のページテンプレ確立 (5コンポーネント分を初期実装)
- 既存4ページ + 1ページ (dialogs配下) の物理移動 (中身は変更しない)
- ルーティング (`src/router/index.ts`) の更新
- HomePage の「サンプル」セクションの簡素化

### 含まないもの

- 既存4モックページ自体の改修・リファクタリング
- カタログの全コンポーネント網羅 (初期5個のみ。残りは別タスク)
- 新規モック画面の追加
- 業務画面 (`HomePage` 以外の `ReceivingPage` 等) の修正
- 本番ビルドからのサンプル除外設定

## 3. フォルダ構成

```
src/views/
├── HomePage.vue                    ← 「サンプル」セクションを1行リンクに置換
├── ReceivingPage.vue               ← 業務画面 (変更なし)
├── ShippingPage.vue                ← 業務画面 (変更なし)
├── StocktakingPage.vue             ← 業務画面 (変更なし)
├── InventoryPage.vue               ← 業務画面 (変更なし)
├── RelocationPage.vue              ← 業務画面 (変更なし)
└── samples/
    ├── SamplesIndexPage.vue        【新規】 /samples
    ├── catalog/
    │   ├── CatalogIndexPage.vue    【新規】 /samples/catalog
    │   ├── ButtonPage.vue          【新規】 /samples/catalog/button
    │   ├── InputPage.vue           【新規】 /samples/catalog/input
    │   ├── ListPage.vue            【新規】 /samples/catalog/list
    │   ├── ModalPage.vue           【新規】 /samples/catalog/modal
    │   └── ToastPage.vue           【新規】 /samples/catalog/toast
    └── mockups/
        ├── MockupsIndexPage.vue    【新規】 /samples/mockups
        ├── ComponentsPage.vue      【移動】 中身そのまま
        ├── ScanDemoPage.vue        【移動】 中身そのまま
        ├── FeedbackPage.vue        【移動】 中身そのまま
        ├── DialogDemoPage.vue      【移動】 import パスのみ修正
        └── dialogs/
            ├── ScanParsePage.vue        【移動】 中身そのまま
            ├── ScanParseModal.vue       【移動】 中身そのまま
            └── ScanParseFullscreen.vue  【移動】 中身そのまま
```

## 4. ルーティング (`src/router/index.ts`)

業務画面ルートは変更しない。サンプル系のみ以下に再構成する。

```ts
// === サンプル系 ===

// インデックス3層
{
  path: '/samples',
  name: 'SamplesIndex',
  component: () => import('@/views/samples/SamplesIndexPage.vue'),
},
{
  path: '/samples/catalog',
  name: 'CatalogIndex',
  component: () => import('@/views/samples/catalog/CatalogIndexPage.vue'),
},
{
  path: '/samples/mockups',
  name: 'MockupsIndex',
  component: () => import('@/views/samples/mockups/MockupsIndexPage.vue'),
},

// カタログ (1コンポーネント=1ページ)
{ path: '/samples/catalog/button', component: () => import('@/views/samples/catalog/ButtonPage.vue') },
{ path: '/samples/catalog/input',  component: () => import('@/views/samples/catalog/InputPage.vue')  },
{ path: '/samples/catalog/list',   component: () => import('@/views/samples/catalog/ListPage.vue')   },
{ path: '/samples/catalog/modal',  component: () => import('@/views/samples/catalog/ModalPage.vue')  },
{ path: '/samples/catalog/toast',  component: () => import('@/views/samples/catalog/ToastPage.vue')  },

// モック (既存ページのpathを変更)
{ path: '/samples/mockups/components',       component: () => import('@/views/samples/mockups/ComponentsPage.vue') },
{ path: '/samples/mockups/scan-demo',        component: () => import('@/views/samples/mockups/ScanDemoPage.vue') },
{ path: '/samples/mockups/feedback',         component: () => import('@/views/samples/mockups/FeedbackPage.vue') },
{ path: '/samples/mockups/dialog-demo',      component: () => import('@/views/samples/mockups/DialogDemoPage.vue') },
{ path: '/samples/mockups/dialog-demo/scan', component: () => import('@/views/samples/mockups/dialogs/ScanParsePage.vue') },
```

### URLマッピング

| 旧 URL | 新 URL |
|---|---|
| `/samples/components` | `/samples/mockups/components` |
| `/samples/scan-demo` | `/samples/mockups/scan-demo` |
| `/samples/feedback` | `/samples/mockups/feedback` |
| `/samples/dialog-demo` | `/samples/mockups/dialog-demo` |
| `/samples/dialog-demo/scan` | `/samples/mockups/dialog-demo/scan` |

## 5. カタログページのテンプレ

各カタログページは `<ion-page>` を直書きし、`PageLayout` 等のプロジェクト固有ラッパには一切依存しない。公式ドキュメントのコードブロックをほぼそのまま貼れる構造にする。

### 雛形

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Button</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic Usage</h2>
      <ion-button>Default</ion-button>
      <ion-button color="primary">Primary</ion-button>

      <h2>Expand</h2>
      <ion-button expand="block">Block Button</ion-button>
      <ion-button expand="full">Full Button</ion-button>

      <h2>Sizes</h2>
      <ion-button size="small">Small</ion-button>
      <ion-button size="default">Default</ion-button>
      <ion-button size="large">Large</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton,
} from '@ionic/vue';
</script>
```

### テンプレのルール

1. `<script setup>` には import だけを書く。状態やロジックは原則持たない
2. 例外として、モーダルの開閉やトーストの呼び出しなど、コンポーネント自体の動作確認に必要な最小限の `ref` や composable 呼び出しは許容する
3. 必ず `<ion-back-button default-href="/samples/catalog" />` を入れる
4. セクションは `<h2>` で区切り、その下に公式サンプルのコードを貼る
5. `PageLayout` などのプロジェクト固有ラッパは import しない
6. `@/components/*` のプロジェクト共通コンポーネントも import しない (`@ionic/vue` のみ)
7. `<style>` は書かないか、scoped で最小限。レイアウトは `ion-padding` 等のIonicユーティリティクラスで済ます
8. 1ファイル100行程度を目安にする

## 6. インデックスページ

3つのインデックスページ (`SamplesIndexPage`, `CatalogIndexPage`, `MockupsIndexPage`) はいずれもカタログページと同じ書き方 (`<ion-page>` 直書き、プロジェクト共通コンポーネント不使用) で実装する。

`CatalogIndexPage` と `MockupsIndexPage` は、それぞれカタログ/モックの一覧を `<ion-list>` で表示する。一覧の項目は `<script setup>` 内の配列に定義する (この箇所は更新の必要があるため例外的にデータを持つ)。

### `SamplesIndexPage.vue` の構造

`/home` への戻るボタンと、「コンポーネントカタログ」「画面モック」の2項目を持つ `<ion-list>` のみ。

### `CatalogIndexPage.vue` の構造

`/samples` への戻るボタンと、カタログ5ページへのリンクを並べた `<ion-list>`。配列定義例:

```ts
const components = [
  { name: 'Button', path: '/samples/catalog/button' },
  { name: 'Input',  path: '/samples/catalog/input'  },
  { name: 'List',   path: '/samples/catalog/list'   },
  { name: 'Modal',  path: '/samples/catalog/modal'  },
  { name: 'Toast',  path: '/samples/catalog/toast'  },
];
```

### `MockupsIndexPage.vue` の構造

`/samples` への戻るボタンと、モック4ページへのリンクを並べた `<ion-list>`。配列定義例:

```ts
const mockups = [
  { name: 'コンポーネント一覧',     path: '/samples/mockups/components' },
  { name: 'スキャン入力デモ',       path: '/samples/mockups/scan-demo' },
  { name: 'スキャンフィードバック', path: '/samples/mockups/feedback' },
  { name: 'ダイアログデモ',         path: '/samples/mockups/dialog-demo' },
];
```

## 7. HomePage の修正

`src/views/HomePage.vue` の「サンプル」セクション (現行の `<ion-list-header>` 「サンプル」とその下の `v-for` ループ) を、`/samples` への1リンクに置換する。

### 変更後のテンプレ部分

```vue
<ion-list-header class="ion-margin-top">
  <ion-label>サンプル</ion-label>
</ion-list-header>
<ion-list>
  <ion-item router-link="/samples" detail>
    <ion-icon :icon="appsOutline" slot="start" />
    <ion-label>サンプル一覧</ion-label>
  </ion-item>
</ion-list>
```

### `<script setup>` の変更

- `samples` 配列を削除
- 不要になった `scanOutline` `notificationsOutline` `chatboxOutline` の import を削除
- `appsOutline` の import は残す

業務メニュー側 (`menus`, `layout`, `menuItems`, `onMenuSelect` 等) は一切変更しない。

## 8. 初期5コンポーネントの選定

カタログテンプレが想定する全パターンを最小数でカバーするため、以下の5つを選定する。

| # | コンポーネント | 検証する型のパターン |
|---|---|---|
| 1 | Button | 純粋表示。バリエーション (color, expand, size, fill) が多くテンプレの基本検証に最適 |
| 2 | Input | フォーム系。label, helperText, type の組み合わせを試せる |
| 3 | List | レイアウト系。`ion-item` `ion-label` の組み合わせ |
| 4 | Modal | 状態を持つオーバーレイ系。ルール2の「最小限の `ref` を許容する」例外パターンの検証 |
| 5 | Toast | composable 系。`useIonToast()` の呼び出しパターンの検証 |

## 9. 既存ファイルの物理移動

以下のファイルを移動する。原則として中身は変更しないが、`DialogDemoPage.vue` のみ後述の理由で2行修正する。

| 移動元 | 移動先 |
|---|---|
| `src/views/samples/ComponentsPage.vue` | `src/views/samples/mockups/ComponentsPage.vue` |
| `src/views/samples/ScanDemoPage.vue` | `src/views/samples/mockups/ScanDemoPage.vue` |
| `src/views/samples/FeedbackPage.vue` | `src/views/samples/mockups/FeedbackPage.vue` |
| `src/views/samples/DialogDemoPage.vue` | `src/views/samples/mockups/DialogDemoPage.vue` |
| `src/views/samples/dialogs/ScanParsePage.vue` | `src/views/samples/mockups/dialogs/ScanParsePage.vue` |
| `src/views/samples/dialogs/ScanParseModal.vue` | `src/views/samples/mockups/dialogs/ScanParseModal.vue` |
| `src/views/samples/dialogs/ScanParseFullscreen.vue` | `src/views/samples/mockups/dialogs/ScanParseFullscreen.vue` |

旧 `src/views/samples/dialogs/` は空になるので削除する。

### `DialogDemoPage.vue` の例外修正

`DialogDemoPage.vue` は `ScanParseModal.vue` と `ScanParseFullscreen.vue` を絶対パスで import しているため、移動先に合わせて以下の2行を修正する。

```ts
// 修正前
import ScanParseModal from '@/views/samples/dialogs/ScanParseModal.vue';
import ScanParseFullscreen from '@/views/samples/dialogs/ScanParseFullscreen.vue';

// 修正後
import ScanParseModal from '@/views/samples/mockups/dialogs/ScanParseModal.vue';
import ScanParseFullscreen from '@/views/samples/mockups/dialogs/ScanParseFullscreen.vue';
```

これ以外の改修 (ロジック・テンプレ・スタイル) は行わない。

## 10. 検証方法

実装後、以下を手動で確認する。

1. `npm run dev` でVite開発サーバが起動する
2. `/home` から「サンプル一覧」リンクで `/samples` に遷移できる
3. `/samples` から「コンポーネントカタログ」「画面モック」両方に遷移できる
4. `/samples/catalog` から5個のコンポーネントページすべてに遷移し、それぞれ表示・動作する
5. 各カタログページで `<ion-back-button>` が `/samples/catalog` に戻る
6. `/samples/mockups` から既存4ページすべてに遷移でき、内容が以前と同じ
7. `npm run build` でビルドエラーが出ない (vue-tsc が通る)
8. 業務画面 (`/receiving` 等) の挙動が変わっていない

## 11. 全体サマリ

| 種別 | ファイル数 |
|---|---|
| 新規作成 | 8ファイル (Index 3 + Catalog 5) |
| 物理移動 (中身変更なし) | 6ファイル |
| 物理移動 + import パス修正 | 1ファイル (`DialogDemoPage.vue`) |
| 編集 | 2ファイル (`src/router/index.ts`, `src/views/HomePage.vue`) |
