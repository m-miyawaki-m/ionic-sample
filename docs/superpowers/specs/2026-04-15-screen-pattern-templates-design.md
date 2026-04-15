# 画面パターンテンプレート設計

倉庫管理アプリの6画面を、Ionic部品で構成した画面パターンテンプレートとして再構築する。各ファイルは完全独立（import共有なし）で、コピペでそのまま新画面のベースとして使える。

---

## 設計方針

- Ionic標準部品のカスタマイズのみで実現
- 複雑なビューロジックは使わない（ref() + v-for 程度）
- データはモック固定値
- 各ファイル完全独立、共有コンポーネントなし
- 画面エリア構造だけ全パターンで統一

---

## 共通画面構造

全6パターンが以下のエリア構成をインラインで持つ。

```
┌─────────────────────────────────┐
│ ① Header                        │
│   [☰ メニュー]  パターン名       │
├─────────────────────────────────┤
│ ② 条件エリア（開閉式）     [+][-]│
│   フィールド群（パターンごとに異なる）│
│   検索ボタン                     │
├─────────────────────────────────┤
│ ③ コンテンツエリア               │
│   [リスト | カード] 切替          │
│   データ行 ...                   │
│   データ行 ...                   │
│   データ行 ...                   │
├─────────────────────────────────┤
│ ④ 画面ボタンエリア（固定・上段）  │
│   固有ボタン + ページング (2〜5個) │
├─────────────────────────────────┤
│ ⑤ 共通ボタンエリア（固定・下段）  │
│   メニュー / スキャン / 印刷 (3個)│
└─────────────────────────────────┘
```

### ① Header

- `ion-header` + `ion-toolbar`
- 左: `ion-menu-button`（ハンバーガー → サイドドロワー起動）
- 中央: `ion-title`（パターン名）

### サイドドロワー (ion-menu)

- `ion-menu side="start"` で左からスライドイン
- 6パターン画面へのナビゲーションリンク（ion-list + ion-item + routerLink）
- 各ファイルにインラインで記述

### ② 条件エリア（開閉式）

- ラベル行: 左にタイトル（「検索条件」「入力条件」等）、右に +/- ボタン横並び
- +ボタン: 条件フィールドを展開表示（`v-show="isOpen"`）
- -ボタン: 条件フィールドを折りたたみ（`v-show` で非表示）
- 開閉状態: `const isOpen = ref(true)`
- 検索ボタン: 条件エリアの中に配置（閉じると隠れる）
- パターンによってラベルを変更（「検索条件」「入力条件」「絞り込み」等）

使用部品（パターンに応じて組み合わせ）:
- `ion-input` — テキスト入力
- `ion-input[type=number]` — 数値入力
- `ion-select` — プルダウン選択
- `ion-checkbox` — チェックボックス
- `ion-radio-group` — ラジオボタン
- `ion-searchbar` — 検索バー
- `ion-datetime-button` + `ion-datetime` — 日付選択

### ③ コンテンツエリア

- `ion-content` 内に配置
- `ion-segment` でリスト/カード切替（`const viewMode = ref<'list' | 'card'>('list')`）
- リスト表示: `ion-list` + `ion-item` + v-for
- カード表示: `ion-card` + v-for
- データ: `ref()` のモック配列
- パターンによってリスト行内にチェック・入力・プルダウンが入る
- 行内ボタン: 項目が多い場合は「詳細」ボタン、入力フィールドがある場合は「入力」ボタンを行内に配置 → モーダルまたは別ページで全項目表示・編集

### ④ 画面ボタンエリア（Footer上段）

- `ion-footer` 内の最初の `ion-toolbar`
- パターン固有の操作ボタン（2〜5個）
- ページングボタン（結果件数が多い場合）: 先頭 / 前へ / 次へ
- 例: `登録確定 / クリア / 先頭 / 前へ / 次へ`

### ⑤ 共通ボタンエリア（Footer下段）

- `ion-footer` 内の2番目の `ion-toolbar`
- 全画面共通の3ボタン固定: **メニュー / スキャン / 印刷**

### Vue テンプレート骨格

```vue
<template>
  <ion-page>
    <!-- サイドドロワー -->
    <ion-menu side="start" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item router-link="/samples/pickup/scan-input">スキャン入力型</ion-item>
          <ion-item router-link="/samples/pickup/scan-accumulate">スキャン蓄積型</ion-item>
          <ion-item router-link="/samples/pickup/search-view">検索照会型</ion-item>
          <ion-item router-link="/samples/pickup/input-helpers">入力補助パターン</ion-item>
          <ion-item router-link="/samples/pickup/inline-edit">インライン編集型</ion-item>
          <ion-item router-link="/samples/pickup/detail-screen">詳細表示・編集型</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>パターン名</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- ② 条件エリア -->
        <div class="condition-area">
          <div class="condition-header">
            <span class="condition-title">検索条件</span>
            <div class="condition-buttons">
              <ion-button size="small" fill="solid" color="success" @click="isOpen = true">+</ion-button>
              <ion-button size="small" fill="solid" color="danger" @click="isOpen = false">−</ion-button>
            </div>
          </div>
          <div v-show="isOpen" class="condition-body">
            <!-- パターンごとの入力フィールド -->
            <ion-button expand="block" color="primary">検索</ion-button>
          </div>
        </div>

        <!-- ③ コンテンツ -->
        <ion-segment v-model="viewMode">
          <ion-segment-button value="list">リスト</ion-segment-button>
          <ion-segment-button value="card">カード</ion-segment-button>
        </ion-segment>

        <!-- リスト/カード表示（v-for） -->
      </ion-content>

      <ion-footer>
        <!-- ④ 画面ボタン -->
        <ion-toolbar>
          <ion-button>固有ボタン1</ion-button>
          <ion-button>先頭</ion-button>
          <ion-button>前へ</ion-button>
          <ion-button>次へ</ion-button>
        </ion-toolbar>
        <!-- ⑤ 共通ボタン -->
        <ion-toolbar>
          <ion-button>メニュー</ion-button>
          <ion-button>スキャン</ion-button>
          <ion-button>印刷</ion-button>
        </ion-toolbar>
      </ion-footer>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import { /* Ionic部品 */ } from '@ionic/vue';

const isOpen = ref(true);
const viewMode = ref<'list' | 'card'>('list');
const items = ref([/* モックデータ */]);
</script>
```

---

## 6パターン個別定義

### 1. ScanInputPattern — スキャン入力型

- **ファイル:** `src/views/samples/pickup/ScanInputPattern.vue`
- **ルート:** `/samples/pickup/scan-input`
- **条件エリアラベル:** 「入力条件」
- **条件フィールド:**
  - ロケーション — `ion-input`
  - 品目コード — `ion-input`（検索アイコン付き）
  - 数量 — `ion-input type="number"`
  - ロット番号 — `ion-input`
  - 検索ボタン
- **コンテンツ:** 登録済み履歴リスト（ion-list + ion-item、品名・数量・ステータス）
  - 項目が多い行: 「詳細」ボタンで全項目表示（モーダル）
- **画面ボタン:** 登録確定 / クリア / 先頭 / 前へ / 次へ
- **共通ボタン:** メニュー / スキャン / 印刷
- **元画面:** 入庫検品, 棚卸, ロケーション移動

### 2. ScanAccumulatePattern — スキャン蓄積型

- **ファイル:** `src/views/samples/pickup/ScanAccumulatePattern.vue`
- **ルート:** `/samples/pickup/scan-accumulate`
- **条件エリアラベル:** 「絞り込み条件」
- **条件フィールド:**
  - 種別 — `ion-select`（プルダウン）
  - 日付 — `ion-datetime-button` + `ion-datetime`
  - 検索ボタン
- **コンテンツ:** ion-segment（リスト/カード切替）+ スキャン蓄積データ一覧
  - リスト: ion-item（No. + 品名 + ステータスバッジ）
  - カード: ion-card（No. + 品名 + グリッド詳細 + ステータスバッジ）
  - カード内ボタン: 「詳細」（全項目モーダル表示）/「入力」（編集モーダル）/ 削除
- **画面ボタン:** 一括登録 / 全選択 / クリア / 前へ / 次へ
- **共通ボタン:** メニュー / スキャン / 印刷
- **元画面:** 出荷検品, 出荷実績登録

### 3. SearchViewPattern — 検索照会型

- **ファイル:** `src/views/samples/pickup/SearchViewPattern.vue`
- **ルート:** `/samples/pickup/search-view`
- **条件エリアラベル:** 「検索条件」
- **条件フィールド:**
  - 品目コード/名称 — `ion-searchbar`
  - 倉庫 — `ion-select`
  - 棚 — `ion-select`
  - 在庫ありのみ — `ion-checkbox`
  - 不足のみ — `ion-checkbox`
  - 検索ボタン
- **コンテンツ:** 検索結果リスト（読み取り専用、ion-list + ion-item + ion-note）
  - 件数表示: 「検索結果 XX件」
  - 行: 品目コード + 品名 + 数量 + 棚番
  - 項目が多い行: 「詳細」ボタンで全項目モーダル表示
- **画面ボタン:** CSV出力 / 先頭 / 前へ / 次へ
- **共通ボタン:** メニュー / スキャン / 印刷
- **元画面:** 在庫照会

### 4. InputHelpersPattern — 入力補助パターン集

- **ファイル:** `src/views/samples/pickup/InputHelpersPattern.vue`
- **ルート:** `/samples/pickup/input-helpers`
- **条件エリアラベル:** 「入力条件」
- **条件フィールド（入力補助UIをフル活用）:**
  - 倉庫選択 — `ion-select`（単一選択プルダウン）
  - 品目検索 — `ion-input` + 検索アイコン → `ion-modal`（マスタ検索選択）
  - 登録日 — `ion-datetime-button` + `ion-datetime`（カレンダー）
  - 区分 — `ion-radio-group`（ラジオボタン）
  - ステータス — `ion-checkbox`（複数チェック）
  - 検索ボタン
- **コンテンツ:** 入力補助UIの実例カタログ
  - プルダウン（ion-select）: 単一選択 / 複数選択
  - 検索モーダル（ion-modal + ion-searchbar）: マスタ一覧から検索選択
  - 日付選択（ion-datetime）: カレンダー / 時刻
  - 確認ダイアログ（ion-alert）: OK/Cancel
- **画面ボタン:** 登録確定 / リセット
- **共通ボタン:** メニュー / スキャン / 印刷
- **特徴:** 条件エリア自体がメインの見どころ

### 5. InlineEditPattern — リスト内インライン編集型

- **ファイル:** `src/views/samples/pickup/InlineEditPattern.vue`
- **ルート:** `/samples/pickup/inline-edit`
- **条件エリアラベル:** 「絞り込み」
- **条件フィールド:**
  - ステータス — `ion-select`
  - 検索ボタン
- **コンテンツ:** リスト行内に編集UIを含む一覧
  - 各行: `ion-checkbox`（選択）+ 品名 + ステータスバッジ
  - 行内フィールド: 予定数（読み取り専用）/ 実績数（`ion-input` 編集可能）
  - 行内フィールド: 備考（`ion-input`）
  - 行内フィールド: 区分（`ion-select` プルダウン）
  - 行内ボタン: 「入力」（未入力項目がある場合、モーダルで全項目編集）
- **画面ボタン:** 登録確定 / 全選択 / 選択削除 / 前へ / 次へ
- **共通ボタン:** メニュー / スキャン / 印刷
- **元画面:** 出荷検品（実数量入力）, 出荷実績（備考入力）

### 6. DetailScreenPattern — 詳細表示・編集型

- **ファイル:** `src/views/samples/pickup/DetailScreenPattern.vue`
- **ルート:** `/samples/pickup/detail-screen`
- **条件エリア:** 最小限（なし or 簡易フィルタ）
- **コンテンツ（メイン画面）:** 一覧リスト → タップで詳細に遷移
  - 各行: 品番 + 品名 + 遷移矢印
- **詳細画面（モーダル版）:** `ion-modal` でフルスクリーン表示
  - 読み取り専用: 品番 / 数量 / ロット / スキャン時刻
  - 編集可能: 保管場所（`ion-input`）/ 区分（`ion-select`）/ 備考（`ion-textarea`）
  - ボタン: 保存 / 戻る
- **詳細画面（別ページ版）:** `/samples/pickup/detail-screen/detail/:id` に遷移
  - 同じフィールド構成をページとして表示
- **画面ボタン:** 前へ / 次へ
- **共通ボタン:** メニュー / スキャン / 印刷
- **元画面:** 出荷実績の詳細画面

---

## ルート定義

```typescript
// src/router/index.ts に追加
{ path: '/samples/pickup/scan-input', component: () => import('@/views/samples/pickup/ScanInputPattern.vue') },
{ path: '/samples/pickup/scan-accumulate', component: () => import('@/views/samples/pickup/ScanAccumulatePattern.vue') },
{ path: '/samples/pickup/search-view', component: () => import('@/views/samples/pickup/SearchViewPattern.vue') },
{ path: '/samples/pickup/input-helpers', component: () => import('@/views/samples/pickup/InputHelpersPattern.vue') },
{ path: '/samples/pickup/inline-edit', component: () => import('@/views/samples/pickup/InlineEditPattern.vue') },
{ path: '/samples/pickup/detail-screen', component: () => import('@/views/samples/pickup/DetailScreenPattern.vue') },
{ path: '/samples/pickup/detail-screen/detail/:id', component: () => import('@/views/samples/pickup/DetailScreenDetailPage.vue') },
```

---

## PickupIndex への追加

`src/views/samples/pickup/PickupIndex.vue` に6パターンのカードを追加:

| タイトル | 説明 | リンク先 |
|---------|------|---------|
| スキャン入力型 | スキャン→フォーム入力→登録 | /samples/pickup/scan-input |
| スキャン蓄積型 | 連続スキャン→リスト蓄積→一括登録 | /samples/pickup/scan-accumulate |
| 検索照会型 | 条件入力→検索→結果一覧 | /samples/pickup/search-view |
| 入力補助パターン | プルダウン/モーダル/日付/ラジオ | /samples/pickup/input-helpers |
| インライン編集型 | リスト行内のチェック・入力・選択 | /samples/pickup/inline-edit |
| 詳細表示・編集型 | 一覧→モーダル/ページで詳細編集 | /samples/pickup/detail-screen |

---

## 技術制約

| 項目 | 制約 |
|------|------|
| ロジック | ref() + v-for のみ。computed / watch / composable 不使用 |
| データ | モック固定値（ref 配列） |
| 部品 | Ionic標準部品のみ。カスタムコンポーネント不使用 |
| ファイル構成 | 1パターン1ファイル完全独立。import共有なし |
| スタイル | scoped CSS。共通CSSファイルなし |
| TypeScript | @ts-nocheck。型定義は最小限 |

---

## 作成ファイル一覧

| # | ファイル | 種別 |
|---|---------|------|
| 1 | `src/views/samples/pickup/ScanInputPattern.vue` | 新規 |
| 2 | `src/views/samples/pickup/ScanAccumulatePattern.vue` | 新規 |
| 3 | `src/views/samples/pickup/SearchViewPattern.vue` | 新規 |
| 4 | `src/views/samples/pickup/InputHelpersPattern.vue` | 新規 |
| 5 | `src/views/samples/pickup/InlineEditPattern.vue` | 新規 |
| 6 | `src/views/samples/pickup/DetailScreenPattern.vue` | 新規 |
| 7 | `src/views/samples/pickup/DetailScreenDetailPage.vue` | 新規 |
| 8 | `src/router/index.ts` | 編集（ルート追加） |
| 9 | `src/views/samples/pickup/PickupIndex.vue` | 編集（カード追加） |
