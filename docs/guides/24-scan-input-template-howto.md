# スキャン入力型テンプレートで画面追加する手順

`/pattern/scan-input` を雛形として、業務画面を新規追加する手順をまとめる。
構成は **一覧画面 + 詳細画面 + 読み取り画面** の3点セット。

---

## テンプレートのファイル構成

| ファイル | 役割 |
|---|---|
| `src/views/samples/pickup/ScanInputPattern.vue` | 一覧画面（条件アコーディオン + 結果リスト + フッター） |
| `src/views/samples/pickup/ScanInputDetailPage.vue` | 詳細画面（フォーム + フッターボタン） |
| `src/views/samples/pickup/ScanInputReadPage.vue` | 読み取り画面（モックスキャン → 登録） |

ルート定義: `src/router/index.ts`

```ts
{ path: '/pattern/scan-input',       component: () => import('@/views/samples/pickup/ScanInputPattern.vue') },
{ path: '/pattern/scan-input/read',  component: () => import('@/views/samples/pickup/ScanInputReadPage.vue') },
{ path: '/pattern/scan-input/:id',   component: () => import('@/views/samples/pickup/ScanInputDetailPage.vue') },
```

> `:id` ルートは `read` より **下** に配置すること（`read` が動的セグメントに吸われるのを防ぐ）。

---

## 新規画面追加のフロー

### Step 1. テンプレートを複製

3画面まとめて作る場合:

```bash
cp src/views/samples/pickup/ScanInputPattern.vue     src/views/samples/pickup/<New>Pattern.vue
cp src/views/samples/pickup/ScanInputDetailPage.vue  src/views/samples/pickup/<New>DetailPage.vue
cp src/views/samples/pickup/ScanInputReadPage.vue    src/views/samples/pickup/<New>ReadPage.vue
```

一覧だけ・詳細だけでもOK。不要なファイルはコピーしなくてよい。

### Step 2. ルートを `index.ts` に追加

`src/router/index.ts` の `routes` 配列に追記する。

```ts
{
  path: '/pattern/<new>',
  component: () => import('@/views/samples/pickup/<New>Pattern.vue'),
},
{
  path: '/pattern/<new>/read',
  component: () => import('@/views/samples/pickup/<New>ReadPage.vue'),
},
{
  path: '/pattern/<new>/:id',
  component: () => import('@/views/samples/pickup/<New>DetailPage.vue'),
},
```

注意点:
- `read` を `:id` より上に書く（順序が重要）
- 同じパス階層 (`/pattern/...`) に揃えると サイドメニューやリンク管理が楽

### Step 3. メニューにリンクを追加（必要なら）

`src/App.vue` または該当のメニューコンポーネントにメニュー項目を追加。

```vue
<ion-item router-link="/pattern/<new>" router-direction="root">
  <ion-label>新規パターン</ion-label>
</ion-item>
```

### Step 4. 画面内のタイトル・項目を書き換え

各 `.vue` ファイルで:

- `<ion-title>` の文言
- フォームの `label` / `v-model` の項目名
- `items` のサンプルデータ（モック）
- 詳細・読み取り画面への遷移先パス（`$router.push('/pattern/<new>/...')`）

### Step 5. 動作確認

```bash
npm run dev
```

ブラウザで `/pattern/<new>` にアクセスして以下をチェック:

- アコーディオンの開閉
- 検索ボタン → ローディング → 結果表示
- 行の詳細ボタン → 詳細画面
- 読み取りボタン → 読み取り画面 → 追加 → 登録 → 戻る

---

## テンプレートが提供する標準パターン

### 一覧画面 (`*Pattern.vue`)

| 要素 | 部品 | 用途 |
|---|---|---|
| 入力条件 | `ion-accordion-group` + `ion-accordion` | 条件エリア開閉 |
| 数量入力 | `alertController` (`type: 'number'`) | 数値入力ダイアログ |
| 年月日 | `ion-popover` + `ion-datetime` (`prefer-wheel`) | ホイール日付 |
| 時刻 | `ion-popover` + `ion-datetime` (`presentation="time"`) | 時刻ピッカー |
| 検索ローディング | `loadingController` | 読み込み中グルグル |
| 結果リスト | `ion-list` + `ion-item` | チェック・OK/NG・詳細ボタン |
| OK/NG押下 | `alertController` | エラーコード/詳細表示 |
| フッター | `ion-toolbar` (footer内) | 業務ボタン群 + 読み取り |

### 詳細画面 (`*DetailPage.vue`)

| 要素 | 部品 |
|---|---|
| 戻る | `ion-back-button` |
| 入力フィールド | `ion-input` |
| プルダウン | `ion-select` + `ion-select-option` |
| ラジオ | `ion-radio-group` + `ion-radio` |
| チェック | `ion-checkbox` |
| カレンダー（開始/終了） | `ion-grid` + `ion-popover` + `ion-datetime` |
| 操作不可項目 | `:disabled="true"` / `readonly` |
| フッター | 更新 / リセット / 承認 / 削除 |

### 読み取り画面 (`*ReadPage.vue`)

| 要素 | 部品 |
|---|---|
| 戻る | `ion-back-button` |
| フォーム（読取結果） | `ion-input` (`readonly`) |
| 読み取り体 | `loadingController` で擬似的に待機 |
| 成功/失敗通知 | `toastController` (`position: 'middle'`, `duration: 1500`) |
| フッター | 追加 / クリア / 登録 |

---

## デザイン上の固定ルール

- **フッターボタンは6em固定幅**:
  ```css
  ion-footer ion-button {
    --padding-start: 0;
    --padding-end: 0;
    min-width: 6em;
    width: 6em;
  }
  ```
- **`ion-popover` の幅拡張はグローバルCSS**:
  popover は body 直下に挿入されるため `<style scoped>` では効かない。
  ```css
  <style>
  .datetime-popover { --width: 320px; }
  </style>
  ```
- **デフォルト部品のみ使用**: カスタム HTML (`<button>`/`<div>` でナビ自作 等) は避ける。

---

## ナビゲーションの書き方

### 別画面へ進む

```vue
<ion-button @click="$router.push('/pattern/<new>/read')">読み取り</ion-button>
<ion-button @click="$router.push(`/pattern/<new>/${item.id}`)">詳細</ion-button>
```

### 戻る

ヘッダー左上に `ion-back-button` を置く。`default-href` を指定すると履歴がない場合の戻り先になる。

```vue
<ion-buttons slot="start">
  <ion-back-button default-href="/pattern/<new>" />
</ion-buttons>
```

スクリプト側から戻るなら `useRouter()` の `router.back()` を使う。

---

## デフォルト部品をテンプレートに追加していく手順

新しい部品を画面に組み込むときは、`/samples/catalog` 配下のサンプルから引いてくる。
カタログには Ionic 公式デモが部品ごとに整理されている（66カテゴリ）。

### Step A. カタログでデモを探す

ブラウザで `/samples/catalog` を開き、サイドバーで対象部品を選択。
各部品ごとに複数のバリエーション（Basic / Fill / Size / Icons …）が並ぶ。

カタログ実体: `src/views/samples/catalog/demos/<部品名>/`

```
src/views/samples/catalog/demos/
├── accordion/         (アコーディオン)
├── alert/             (アラート)
├── button/            (ボタン: Basic, Fill, Size, Icons, ...)
├── checkbox/          (チェックボックス)
├── datetime/          (日時)
├── input/             (入力)
├── modal/             (モーダル)
├── popover/           (ポップオーバー)
├── radio/             (ラジオ)
├── searchbar/         (検索バー)
├── select/            (プルダウン)
├── toast/             (トースト)
├── ...                (全66カテゴリ)
```

### Step B. デモのソースをそのまま参照

例: ボタンを追加したい場合

```bash
src/views/samples/catalog/demos/button/Basic.vue
src/views/samples/catalog/demos/button/Fill.vue
src/views/samples/catalog/demos/button/Icons.vue
```

該当 `.vue` を開き、`<template>` と `<script setup>` の必要部分をコピーして
追加先（`<New>Pattern.vue` 等）に貼り付ける。

### Step C. import 文を追加

カタログ `.vue` の `import { Ion... } from '@ionic/vue'` 行を確認し、
追加先 `.vue` の import に同じものを追記する。

```ts
import {
  IonPage, IonHeader, ... ,
  IonNewComponent,        // ← 追加分
} from '@ionic/vue';
```

### Step D. テンプレート上で配置場所を決める

| 配置先 | 適した部品 |
|---|---|
| 入力条件アコーディオン内 | `ion-input` / `ion-select` / `ion-datetime` / `ion-checkbox` |
| 結果リスト 1行内 | `ion-checkbox` (slot=start) / `ion-badge` / `ion-button` (slot=end) |
| ヘッダーツールバー | `ion-menu-button` / `ion-back-button` / `ion-buttons` |
| フッターツールバー | `ion-button` (アクション群) |
| オーバーレイ系 | `alertController` / `toastController` / `loadingController` / `modalController` |

### Step E. data binding を整える

カタログのデモは独立した `ref` を使っていることが多い。テンプレートに合わせて:

- フォーム値は `form.xxx` に集約する（既存の `ref({...})` に追加）
- 一覧アイテム個別の値は `item.xxx` に追加する

### Step F. 動作確認

```bash
npm run dev
```

カタログ画面と並べて見比べ、見た目・動作が一致するか確認。

---

### 部品追加時の注意

- **slot指定を必ず確認**: `slot="start"` / `slot="end"` / `slot="header"` / `slot="content"` を間違えると表示位置がずれる
- **コントローラ系は import 漏れ注意**: `alertController` は `IonAlert` ではなく `@ionic/vue` から関数として import
- **`@ts-nocheck` がテンプレート先頭にある**: 型エラーが出ても表示確認優先（後で型を整えてもOK）
- **scoped CSS は body 直下要素に効かない**: popover / modal / toast / alert のスタイルは scoped 外に書く

---

## 標準コントローラ早見表

すべて `@ionic/vue` から import。

| コントローラ | 用途 | 主な使用箇所 |
|---|---|---|
| `alertController` | 確認/入力ダイアログ | 数量入力、エラー詳細 |
| `loadingController` | グルグル | 検索/読み取り中 |
| `toastController` | 自動消滅通知 | 読み取り成功/失敗 |

```ts
import { alertController, loadingController, toastController } from '@ionic/vue';
```

---

## チェックリスト（画面追加完了時）

### 画面追加
- [ ] `.vue` ファイルを `src/views/samples/pickup/` に作成
- [ ] `src/router/index.ts` にルート3つ追加（順序: 一覧 → read → :id）
- [ ] メニュー項目を追加（必要に応じて）
- [ ] 画面タイトル・項目名・モックデータを差し替え
- [ ] 詳細/読み取りへの遷移パスを新パスに修正
- [ ] フッターボタン固定幅CSSがコピーされている
- [ ] `npm run dev` で全画面の動線確認

### 部品追加
- [ ] `/samples/catalog` でデモを確認した
- [ ] `demos/<部品名>/<バリエーション>.vue` のテンプレートをコピー
- [ ] `import { Ion... } from '@ionic/vue'` を追記
- [ ] slot指定（start / end / header / content）が正しい
- [ ] form / items の data binding を整えた
- [ ] カタログと見比べて動作確認
