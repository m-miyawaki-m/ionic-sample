# Ionic レイアウト・テーブル チートシート

Ionic Vue でのエリア分け、テーブル作成、よく使うレイアウトパターンをまとめたリファレンス。
すべて `@ionic/vue` の標準コンポーネントと CSS で実現（外部ライブラリ不要）。

---

## 目次

1. [ページ基本構造](#1-ページ基本構造)
2. [エリア分け（セクション分割）](#2-エリア分けセクション分割)
3. [グリッドレイアウト](#3-グリッドレイアウト)
4. [テーブルの作成方法](#4-テーブルの作成方法)
5. [横スクロールテーブル](#5-横スクロールテーブル)
6. [ヘッダー固定 + スクロールコンテンツ](#6-ヘッダー固定--スクロールコンテンツ)
7. [フッター固定ボタン](#7-フッター固定ボタン)
8. [検索エリア + リストエリア](#8-検索エリア--リストエリア)
9. [カードレイアウト](#9-カードレイアウト)
10. [フォームレイアウト](#10-フォームレイアウト)
11. [Split Pane（2ペイン）](#11-split-pane2ペイン)
12. [Flex / CSS で自由配置](#12-flex--css-で自由配置)
13. [よくある組み合わせパターン](#13-よくある組み合わせパターン)

---

## 1. ページ基本構造

すべてのページの骨格。`ion-page` が最上位、`ion-header` と `ion-content` を子に持つ。

```html
<template>
  <ion-page>
    <!-- ヘッダー（上部固定） -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>ページタイトル</ion-title>
        <ion-buttons slot="end">
          <ion-button>操作</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- メインコンテンツ（スクロール領域） -->
    <ion-content class="ion-padding">
      <!-- ここに内容 -->
    </ion-content>

    <!-- フッター（下部固定、任意） -->
    <ion-footer>
      <ion-toolbar>
        <ion-button expand="block">登録</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
```

**構成ルール:**
- `ion-page` は必須。ないとページ遷移アニメーションが壊れる
- `ion-header` は上部固定。スクロールしても動かない
- `ion-content` がスクロール領域。`class="ion-padding"` で内側余白
- `ion-footer` は下部固定。登録・印刷ボタンの配置に

---

## 2. エリア分け（セクション分割）

### ion-list + ion-list-header でセクション分け

```html
<ion-list-header>
  <ion-label>入力エリア</ion-label>
</ion-list-header>
<ion-list>
  <ion-item>
    <ion-input label="品番" label-placement="stacked" />
  </ion-item>
</ion-list>

<ion-list-header>
  <ion-label>結果エリア</ion-label>
</ion-list-header>
<ion-list>
  <ion-item v-for="item in items" :key="item.id">
    <ion-label>{{ item.name }}</ion-label>
  </ion-item>
</ion-list>
```

### ion-item-divider でリスト内区切り

```html
<ion-list>
  <ion-item-divider>
    <ion-label>食品</ion-label>
  </ion-item-divider>
  <ion-item><ion-label>りんご</ion-label></ion-item>
  <ion-item><ion-label>みかん</ion-label></ion-item>

  <ion-item-divider>
    <ion-label>日用品</ion-label>
  </ion-item-divider>
  <ion-item><ion-label>洗剤</ion-label></ion-item>
</ion-list>
```

### ion-card でブロック分け

```html
<ion-card>
  <ion-card-header>
    <ion-card-title>入力</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    <!-- 入力フォーム -->
  </ion-card-content>
</ion-card>

<ion-card>
  <ion-card-header>
    <ion-card-title>結果</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    <!-- リスト -->
  </ion-card-content>
</ion-card>
```

---

## 3. グリッドレイアウト

Ionic の 12 カラムグリッド。`ion-grid > ion-row > ion-col`。

### 基本（均等分割）

```html
<ion-grid>
  <ion-row>
    <ion-col>1/3</ion-col>
    <ion-col>1/3</ion-col>
    <ion-col>1/3</ion-col>
  </ion-row>
</ion-grid>
```

### サイズ指定

```html
<ion-grid>
  <ion-row>
    <ion-col size="4">左 (4/12)</ion-col>
    <ion-col size="8">右 (8/12)</ion-col>
  </ion-row>
</ion-grid>
```

### レスポンシブ

```html
<ion-col size="12" size-md="6" size-lg="4">
  <!-- モバイル: 全幅、タブレット: 半分、PC: 1/3 -->
</ion-col>
```

### キーバリュー表示（詳細画面向き）

```html
<ion-grid>
  <ion-row>
    <ion-col size="4" style="color:var(--ion-color-medium)">品番</ion-col>
    <ion-col size="8">A001</ion-col>
  </ion-row>
  <ion-row>
    <ion-col size="4" style="color:var(--ion-color-medium)">品名</ion-col>
    <ion-col size="8">ボルト M8×30</ion-col>
  </ion-row>
  <ion-row>
    <ion-col size="4" style="color:var(--ion-color-medium)">在庫数</ion-col>
    <ion-col size="8">1,250</ion-col>
  </ion-row>
</ion-grid>
```

---

## 4. テーブルの作成方法

Ionic には `<table>` コンポーネントがない。3 つの方法がある。

### 方法 A: ion-grid でテーブル風

最も Ionic らしい方法。軽いテーブルに向く。

```html
<ion-grid>
  <!-- ヘッダー行 -->
  <ion-row style="background:var(--ion-color-light);font-weight:600;font-size:13px">
    <ion-col size="2">No.</ion-col>
    <ion-col size="3">品番</ion-col>
    <ion-col size="4">品名</ion-col>
    <ion-col size="3">数量</ion-col>
  </ion-row>
  <!-- データ行 -->
  <ion-row v-for="item in items" :key="item.no"
    style="border-bottom:1px solid var(--ion-color-light-shade);font-size:13px">
    <ion-col size="2">{{ item.no }}</ion-col>
    <ion-col size="3">{{ item.code }}</ion-col>
    <ion-col size="4">{{ item.name }}</ion-col>
    <ion-col size="3">{{ item.qty }}</ion-col>
  </ion-row>
</ion-grid>
```

**メリット:** Ionic のグリッドシステムと統一。レスポンシブ対応可能。
**デメリット:** 列数が多いと `size` の配分が難しい。

### 方法 B: HTML `<table>` をそのまま使う

列数が多いテーブルに向く。横スクロールと相性が良い。

```html
<div style="overflow-x:auto">
  <table style="width:100%;min-width:800px;border-collapse:collapse;font-size:13px">
    <thead>
      <tr style="background:var(--ion-color-light)">
        <th style="padding:8px;text-align:left">No.</th>
        <th style="padding:8px;text-align:left">品番</th>
        <th style="padding:8px;text-align:left">品名</th>
        <th style="padding:8px;text-align:right">数量</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.no"
        style="border-bottom:1px solid var(--ion-color-light-shade)">
        <td style="padding:8px">{{ item.no }}</td>
        <td style="padding:8px">{{ item.code }}</td>
        <td style="padding:8px">{{ item.name }}</td>
        <td style="padding:8px;text-align:right">{{ item.qty }}</td>
      </tr>
    </tbody>
  </table>
</div>
```

**メリット:** 列幅が自動調整。多列テーブルに最適。
**デメリット:** Ionic コンポーネントと見た目が少し異なる。

### 方法 C: CSS Flex でカスタムテーブル

完全にカスタムしたい場合。

```html
<div class="table-header">
  <span class="col-no">No.</span>
  <span class="col-code">品番</span>
  <span class="col-name">品名</span>
  <span class="col-qty">数量</span>
</div>
<div v-for="item in items" :key="item.no" class="table-row">
  <span class="col-no">{{ item.no }}</span>
  <span class="col-code">{{ item.code }}</span>
  <span class="col-name">{{ item.name }}</span>
  <span class="col-qty">{{ item.qty }}</span>
</div>
```

```css
.table-header, .table-row {
  display: flex;
  font-size: 13px;
}
.table-header {
  background: var(--ion-color-light);
  font-weight: 600;
  position: sticky;
  top: 0;
}
.table-row {
  border-bottom: 1px solid var(--ion-color-light-shade);
}
.col-no   { flex: 0 0 40px; padding: 8px; }
.col-code { flex: 0 0 80px; padding: 8px; }
.col-name { flex: 1;        padding: 8px; }
.col-qty  { flex: 0 0 60px; padding: 8px; text-align: right; }
```

**メリット:** 列幅の完全制御。sticky ヘッダーとの相性が良い。
**デメリット:** CSS を書く量が多い。

### 3 方法の使い分け

| 方法 | 列数 | 横スクロール | おすすめ場面 |
|------|------|------------|------------|
| ion-grid | 3〜6列 | 不要 | 簡易なリスト・詳細画面 |
| HTML table | 7列以上 | 必要 | 在庫照会等のデータテーブル |
| CSS Flex | 自由 | 任意 | カスタムデザインが必要な場合 |

---

## 5. 横スクロールテーブル

列数が多い場合（10列以上）の定番パターン。

```html
<div style="overflow-x:auto; -webkit-overflow-scrolling:touch">
  <table style="min-width:1600px; border-collapse:collapse; font-size:12px">
    <thead>
      <tr style="background:var(--ion-color-light); position:sticky; top:0; z-index:1">
        <th style="min-width:40px; padding:6px">No.</th>
        <th style="min-width:80px; padding:6px">品番</th>
        <th style="min-width:120px; padding:6px">品名</th>
        <!-- ... 20列まで続く -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.no">
        <td style="padding:6px">{{ item.no }}</td>
        <!-- ... -->
      </tr>
    </tbody>
  </table>
</div>
```

**ポイント:**
- `overflow-x: auto` で横スクロールを有効化
- `-webkit-overflow-scrolling: touch` で iOS のスムーズスクロール
- `min-width: 1600px` でテーブルが縮まないようにする
- `position: sticky; top: 0` でヘッダー行を固定
- 実例: `/samples/screen-patterns/inventory`（20列テーブル）

---

## 6. ヘッダー固定 + スクロールコンテンツ

`ion-header` は自動的に上部固定。`ion-content` が独立してスクロールする。

```html
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>常に見える</ion-title>
    </ion-toolbar>
    <!-- 第2ツールバーも固定可能 -->
    <ion-toolbar>
      <ion-searchbar placeholder="検索..." />
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <!-- ここだけスクロール -->
    <ion-list>
      <ion-item v-for="i in 100" :key="i">
        <ion-label>アイテム {{ i }}</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-page>
```

**検索バーを固定したい場合:**
ヘッダーに第 2 ツールバーとして配置するか、`ion-content` の `fixed` slot を使う。

```html
<ion-content>
  <div slot="fixed" style="top:0;width:100%;z-index:10;background:var(--ion-background-color)">
    <ion-searchbar placeholder="検索..." />
  </div>
  <!-- リスト（上にパディングを入れる） -->
  <div style="padding-top:56px">
    <ion-list>...</ion-list>
  </div>
</ion-content>
```

---

## 7. フッター固定ボタン

ページ下部に固定ボタンを配置。スクロールしても常に見える。

```html
<ion-footer>
  <ion-toolbar>
    <div style="display:flex;gap:8px;padding:0 16px">
      <ion-button fill="outline" expand="block" style="flex:1">キャンセル</ion-button>
      <ion-button expand="block" style="flex:1">登録</ion-button>
    </div>
  </ion-toolbar>
</ion-footer>
```

**2 ボタン並び:**
```
[キャンセル(outline)] [登録(solid)]
```

**3 ボタン並び:**
```html
<div style="display:flex;gap:8px;padding:0 16px">
  <ion-button fill="outline" style="flex:1">戻る</ion-button>
  <ion-button fill="outline" style="flex:1">印刷</ion-button>
  <ion-button style="flex:1">登録</ion-button>
</div>
```

---

## 8. 検索エリア + リストエリア

業務アプリの定番パターン。入力 → 検索 → リスト表示。

```html
<ion-content class="ion-padding">
  <!-- 入力エリア -->
  <div style="display:flex;gap:8px;align-items:end">
    <ion-item style="flex:1">
      <ion-input
        label="伝票番号"
        label-placement="stacked"
        placeholder="番号を入力"
        v-model="query"
        @keyup.enter="search"
      />
    </ion-item>
    <ion-button @click="search">
      <ion-icon :icon="searchOutline" slot="icon-only" />
    </ion-button>
  </div>

  <!-- ローディング -->
  <div v-if="loading" class="ion-text-center ion-padding">
    <ion-spinner name="crescent" />
    <p style="color:var(--ion-color-medium)">検索中...</p>
  </div>

  <!-- 結果リスト -->
  <ion-list v-else-if="items.length > 0">
    <ion-item v-for="item in items" :key="item.id">
      <ion-label>
        <h2>{{ item.name }}</h2>
        <p>{{ item.code }}</p>
      </ion-label>
      <ion-badge slot="end">{{ item.qty }}</ion-badge>
    </ion-item>
  </ion-list>

  <!-- 空状態 -->
  <div v-else class="ion-text-center ion-padding">
    <p style="color:var(--ion-color-medium)">検索結果がありません</p>
  </div>
</ion-content>
```

**3 状態の切替:**
1. `loading === true` → スピナー表示
2. `items.length > 0` → リスト表示
3. それ以外 → 空状態メッセージ

実例: `/samples/screen-patterns/receiving`

---

## 9. カードレイアウト

### リスト型カード（検索結果の表示）

```html
<ion-card v-for="item in items" :key="item.id">
  <ion-card-header>
    <ion-card-title>{{ item.code }} {{ item.name }}</ion-card-title>
    <ion-card-subtitle>{{ item.category }}</ion-card-subtitle>
  </ion-card-header>
  <ion-card-content>
    <ion-grid>
      <ion-row>
        <ion-col size="4" style="color:var(--ion-color-medium)">在庫数</ion-col>
        <ion-col size="8" style="font-weight:600">{{ item.stock }}</ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="4" style="color:var(--ion-color-medium)">ロケ</ion-col>
        <ion-col size="8">{{ item.location }}</ion-col>
      </ion-row>
    </ion-grid>
    <ion-button fill="clear" size="small">詳細を見る</ion-button>
  </ion-card-content>
</ion-card>
```

実例: `/samples/screen-patterns/inventory-card`

### グリッド型カード（メニュー画面）

```html
<ion-grid>
  <ion-row>
    <ion-col size="6" v-for="menu in menus" :key="menu.path">
      <ion-card button :router-link="menu.path">
        <ion-card-content class="ion-text-center">
          <ion-icon :icon="menu.icon" size="large" color="primary" />
          <h3>{{ menu.title }}</h3>
        </ion-card-content>
      </ion-card>
    </ion-col>
  </ion-row>
</ion-grid>
```

---

## 10. フォームレイアウト

### 基本フォーム

```html
<ion-list>
  <ion-item>
    <ion-input label="品番" label-placement="stacked" placeholder="A001" />
  </ion-item>
  <ion-item>
    <ion-input label="品名" label-placement="stacked" placeholder="ボルト M8" />
  </ion-item>
  <ion-item>
    <ion-input label="数量" label-placement="stacked" type="number" placeholder="0" />
  </ion-item>
  <ion-item>
    <ion-select label="カテゴリ" label-placement="stacked" placeholder="選択">
      <ion-select-option value="parts">部品</ion-select-option>
      <ion-select-option value="material">資材</ion-select-option>
    </ion-select>
  </ion-item>
</ion-list>
```

### 横並びフォーム（入力 + ボタン）

```html
<div style="display:flex;gap:8px;align-items:end;padding:0 16px">
  <ion-item style="flex:1">
    <ion-input label="品番" label-placement="stacked" />
  </ion-item>
  <ion-button>検索</ion-button>
</div>
```

### チェックリスト

```html
<ion-list>
  <ion-item v-for="task in tasks" :key="task.id">
    <ion-checkbox
      slot="start"
      v-model="task.checked"
    />
    <ion-label>{{ task.name }}</ion-label>
  </ion-item>
</ion-list>
```

---

## 11. Split Pane（2ペイン）

デスクトップで左メニュー常時表示、モバイルでドロワーに切替。

```html
<ion-split-pane content-id="main" when="lg">
  <!-- サイドメニュー -->
  <ion-menu content-id="main" type="overlay">
    <ion-header>
      <ion-toolbar>
        <ion-title>メニュー</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item router-link="/page1">ページ1</ion-item>
        <ion-item router-link="/page2">ページ2</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>

  <!-- メインコンテンツ -->
  <ion-router-outlet id="main" />
</ion-split-pane>
```

**`when` の値:**
| 値 | ブレークポイント | 用途 |
|---|---|---|
| `"sm"` | 576px+ | ほぼ常にサイドバー表示 |
| `"md"` | 768px+ | タブレット以上 |
| `"lg"` | 992px+ | デスクトップのみ（おすすめ） |
| `"xl"` | 1200px+ | 大画面のみ |

実例: `/samples/catalog`（公式カタログのサイドバー）

---

## 12. Flex / CSS で自由配置

Ionic コンポーネントだけで表現しにくい場合は CSS Flex を併用。

### 横並び（均等幅）

```html
<div style="display:flex;gap:8px">
  <ion-button style="flex:1" fill="outline">キャンセル</ion-button>
  <ion-button style="flex:1">確定</ion-button>
</div>
```

### 横並び（左右寄せ）

```html
<div style="display:flex;justify-content:space-between;align-items:center">
  <span>合計: 5件</span>
  <ion-button size="small">全選択</ion-button>
</div>
```

### アイコンボタンバー

```html
<div style="display:flex;gap:4px">
  <ion-button fill="clear" size="small">
    <ion-icon slot="icon-only" :icon="createOutline" />
  </ion-button>
  <ion-button fill="clear" size="small">
    <ion-icon slot="icon-only" :icon="trashOutline" />
  </ion-button>
  <ion-button fill="clear" size="small">
    <ion-icon slot="icon-only" :icon="shareOutline" />
  </ion-button>
</div>
```

### ステータスバッジ横並び

```html
<div style="display:flex;gap:8px;flex-wrap:wrap">
  <ion-badge color="success">完了: 12</ion-badge>
  <ion-badge color="warning">処理中: 3</ion-badge>
  <ion-badge color="danger">エラー: 1</ion-badge>
</div>
```

---

## 13. よくある組み合わせパターン

### パターン 1: 業務登録画面

```
ion-page
├── ion-header          ← タイトル + 一括登録ボタン
├── ion-content
│   ├── 検索入力 (flex: input + button)
│   ├── ion-spinner     ← ローディング中
│   ├── テーブル        ← 検索結果（チェック + 入力 + 削除）
│   └── 空状態          ← 結果なし
└── ion-footer          ← 登録 + 印刷ボタン
```

実例: `/samples/screen-patterns/receiving`

### パターン 2: 照会画面（テーブル）

```
ion-page
├── ion-header          ← タイトル
├── ion-content
│   ├── 検索入力
│   ├── ion-spinner
│   └── 横スクロールテーブル (overflow-x:auto + min-width)
└── ion-footer          ← 印刷ボタン
```

実例: `/samples/screen-patterns/inventory`

### パターン 3: 照会画面（カード）

```
ion-page
├── ion-header          ← タイトル
├── ion-content
│   ├── 検索入力
│   ├── ion-spinner
│   └── ion-card × N   ← 品番ごとのカード
└── ion-footer          ← 印刷ボタン
```

実例: `/samples/screen-patterns/inventory-card`

### パターン 4: メニュー画面

```
ion-page
├── ion-header          ← アプリタイトル
└── ion-content
    ├── ion-grid        ← カード型メニュー (size="6" で 2列)
    └── ion-list        ← リスト型リンク
```

実例: `/home`

### パターン 5: サイドバー + コンテンツ

```
ion-page
└── ion-split-pane (when="lg")
    ├── ion-menu        ← サイドバー (アコーディオン等)
    └── ion-router-outlet ← メインコンテンツ (ルートで切替)
```

実例: `/samples/catalog`

---

## CSS 変数 早見表

Ionic の CSS 変数を使えば、ライト/ダークモード両方に自動対応する。

| 用途 | CSS 変数 | ライト値 | ダーク値 |
|------|---------|---------|---------|
| 背景色 | `var(--ion-background-color)` | #fff | #1e1e1e |
| テキスト色 | `var(--ion-text-color)` | #000 | #fff |
| 薄い背景 | `var(--ion-color-light)` | #f4f5f8 | #313131 |
| 境界線 | `var(--ion-color-light-shade)` | #d7d8da | #474747 |
| 補助テキスト | `var(--ion-color-medium)` | #92949c | #989aa2 |
| 主要色 | `var(--ion-color-primary)` | #3880ff | #3880ff |
| 成功 | `var(--ion-color-success)` | #2dd36f | #2dd36f |
| 警告 | `var(--ion-color-warning)` | #ffc409 | #ffc409 |
| 危険 | `var(--ion-color-danger)` | #eb445a | #eb445a |

**ルール:** カスタム CSS では `#fff` や `#000` をハードコードせず、上記の CSS 変数を使う。

---

## 14. コンポーネントのサイズ・色の変え方

Ionic コンポーネントは `color` / `size` 属性と CSS 変数でカスタマイズできる。
公式サンプルをベースに変更する際のリファレンス。

### 14-1. 色（color 属性）

ほぼ全てのコンポーネントで `color` 属性が使える。

```html
<!-- ボタン -->
<ion-button color="primary">主操作</ion-button>
<ion-button color="danger">削除</ion-button>
<ion-button color="success">完了</ion-button>
<ion-button color="warning">注意</ion-button>
<ion-button color="medium">補助</ion-button>
<ion-button color="dark">暗い</ion-button>
<ion-button color="light">明るい</ion-button>

<!-- チェックボックス -->
<ion-checkbox color="success">完了</ion-checkbox>

<!-- ラジオ -->
<ion-radio color="danger">緊急</ion-radio>

<!-- トグル -->
<ion-toggle color="primary">通知</ion-toggle>

<!-- バッジ -->
<ion-badge color="danger">3</ion-badge>

<!-- スピナー -->
<ion-spinner color="primary" />

<!-- アイコン -->
<ion-icon :icon="heartOutline" color="danger" />

<!-- テキスト -->
<ion-text color="danger">エラーメッセージ</ion-text>

<!-- 入力（エラー状態） -->
<ion-input color="danger" class="ion-invalid ion-touched" error-text="必須項目です" />

<!-- ツールバー -->
<ion-toolbar color="primary">
  <ion-title>青いヘッダー</ion-title>
</ion-toolbar>

<!-- リスト項目 -->
<ion-item color="light">背景が薄いグレー</ion-item>
```

**使える色一覧:**

| color 値 | 用途 | 色 |
|---------|------|-----|
| `primary` | 主操作、リンク | 青 (#3880ff) |
| `secondary` | 副操作 | 紫 (#3dc2ff) |
| `tertiary` | 第三 | 薄紫 (#5260ff) |
| `success` | 完了、有効 | 緑 (#2dd36f) |
| `warning` | 注意、処理中 | 黄 (#ffc409) |
| `danger` | エラー、削除 | 赤 (#eb445a) |
| `light` | 背景、区切り | 薄灰 (#f4f5f8) |
| `medium` | 補助テキスト、無効 | 灰 (#92949c) |
| `dark` | 強調テキスト | 黒 (#222428) |

### 14-2. サイズ（size 属性）

#### ion-button

```html
<ion-button size="small">小</ion-button>   <!-- 高さ低め、font小 -->
<ion-button>デフォルト</ion-button>          <!-- 標準 -->
<ion-button size="large">大</ion-button>    <!-- 高さ高め、font大 -->
```

#### ion-icon

```html
<ion-icon :icon="star" size="small" />      <!-- 18px -->
<ion-icon :icon="star" />                    <!-- 24px -->
<ion-icon :icon="star" size="large" />       <!-- 32px -->

<!-- さらに大きく（CSS） -->
<ion-icon :icon="star" style="font-size:48px" />
```

#### ion-spinner

```html
<ion-spinner />                                    <!-- デフォルト -->
<ion-spinner style="width:48px;height:48px" />     <!-- 大きく -->
<ion-spinner style="width:16px;height:16px" />     <!-- 小さく -->
```

#### ion-badge

```html
<!-- CSS でサイズ調整 -->
<ion-badge>3</ion-badge>                                    <!-- デフォルト -->
<ion-badge style="font-size:16px;padding:6px 12px">3</ion-badge>  <!-- 大きく -->
<ion-badge style="font-size:10px;padding:2px 6px">3</ion-badge>   <!-- 小さく -->
```

#### ion-input / ion-textarea

```html
<!-- CSS 変数でフォントサイズ変更 -->
<ion-input style="--font-size:18px" />   <!-- 大きい入力欄 -->
<ion-input style="--font-size:12px" />   <!-- 小さい入力欄 -->
```

#### ion-card

```html
<!-- CSS で幅/高さ調整 -->
<ion-card style="max-width:400px">...</ion-card>        <!-- 幅制限 -->
<ion-card style="min-height:200px">...</ion-card>       <!-- 最低高さ -->
```

### 14-3. CSS カスタムプロパティ（コンポーネント固有）

各コンポーネントは `--` で始まる CSS カスタムプロパティを持つ。
公式サンプルの Theming セクションで確認可能。

#### ion-button

```html
<ion-button style="
  --background: #ff6b6b;
  --color: white;
  --border-radius: 20px;
  --padding-start: 24px;
  --padding-end: 24px;
  --box-shadow: 0 4px 12px rgba(0,0,0,0.2);
">カスタムボタン</ion-button>
```

#### ion-input

```html
<ion-input style="
  --background: var(--ion-color-light);
  --padding-start: 16px;
  --border-radius: 8px;
  --highlight-color-focused: var(--ion-color-primary);
" />
```

#### ion-item

```html
<ion-item style="
  --background: var(--ion-color-light);
  --padding-start: 20px;
  --min-height: 60px;
  --border-color: transparent;
">...</ion-item>
```

#### ion-card

```html
<ion-card style="
  --background: var(--ion-color-light);
  --border-radius: 16px;
  --box-shadow: 0 2px 8px rgba(0,0,0,0.1);
">...</ion-card>
```

#### ion-toolbar

```html
<ion-toolbar style="
  --background: var(--ion-color-primary);
  --color: white;
  --min-height: 56px;
">...</ion-toolbar>
```

#### ion-list

```html
<ion-list style="
  --ion-item-background: transparent;
  --ion-item-border-color: var(--ion-color-light-shade);
">...</ion-list>
```

### 14-4. テキストのサイズ・色

Ionic コンポーネント外のテキストは通常の CSS で変更する。

```html
<!-- ion-text で色を変える -->
<ion-text color="danger">エラー</ion-text>
<ion-text color="medium">補足</ion-text>

<!-- CSS で自由に -->
<p style="font-size:12px; color:var(--ion-color-medium)">小さい補足テキスト</p>
<h2 style="font-size:20px; color:var(--ion-color-dark)">見出し</h2>

<!-- ion-label 内の階層 -->
<ion-label>
  <h2 style="font-size:16px">タイトル</h2>       <!-- 大きめ -->
  <p style="font-size:12px">サブテキスト</p>      <!-- 小さめ、自動で medium 色 -->
</ion-label>

<!-- ion-note（自動で小さく薄い色） -->
<ion-note>補足情報</ion-note>
<ion-note color="danger">エラー詳細</ion-note>
```

### 14-5. 全幅・余白の調整

```html
<!-- ボタンの幅 -->
<ion-button expand="block">コンテナ幅</ion-button>
<ion-button expand="full">画面幅いっぱい</ion-button>

<!-- コンテンツの余白 -->
<ion-content class="ion-padding">16pxの内側余白</ion-content>
<ion-content class="ion-no-padding">余白なし</ion-content>

<!-- 個別余白（Ionic ユーティリティクラス） -->
<div class="ion-padding">全方向 16px</div>
<div class="ion-padding-horizontal">左右 16px</div>
<div class="ion-padding-vertical">上下 16px</div>
<div class="ion-padding-top">上 16px</div>
<div class="ion-margin-top">上マージン 16px</div>
<div class="ion-margin-bottom">下マージン 16px</div>
<div class="ion-no-padding">余白なし</div>
<div class="ion-no-margin">マージンなし</div>

<!-- テキスト配置 -->
<div class="ion-text-center">中央寄せ</div>
<div class="ion-text-start">左寄せ</div>
<div class="ion-text-end">右寄せ</div>
<div class="ion-text-wrap">折り返し</div>
<div class="ion-text-nowrap">折り返しなし</div>
```

### 14-6. 公式サンプルのカスタマイズ例

公式カタログ (`/samples/catalog`) のデモを業務用にカスタマイズする手順:

**例: button/basic を業務ボタンに変更**

```html
<!-- 公式サンプル（そのまま） -->
<ion-button>Default</ion-button>
<ion-button :disabled="true">Disabled</ion-button>

<!-- 業務用にカスタマイズ -->
<ion-button color="primary" size="large" expand="block">
  <ion-icon :icon="checkmarkOutline" slot="start" />
  検品完了
</ion-button>
```

変更点: `color` で意味を付与、`size` で大きく、`expand` で全幅、`icon` を追加。

**例: input/basic を品番入力に変更**

```html
<!-- 公式サンプル -->
<ion-input label="Default input" />

<!-- 業務用にカスタマイズ -->
<ion-input
  label="品番"
  label-placement="stacked"
  placeholder="スキャンまたは手入力"
  helper-text="13桁のJANコード"
  clear-input
  style="--font-size:18px"
>
  <ion-icon :icon="barcodeOutline" slot="start" />
</ion-input>
```

変更点: `label-placement` で見た目変更、`placeholder` / `helper-text` で補助、`clear-input` でクリア機能、CSS でフォント大きく、`icon` 追加。

**例: list/basic を在庫リストに変更**

```html
<!-- 公式サンプル -->
<ion-list>
  <ion-item><ion-label>Item</ion-label></ion-item>
</ion-list>

<!-- 業務用にカスタマイズ -->
<ion-list>
  <ion-item v-for="item in items" :key="item.code" detail>
    <ion-icon :icon="cubeOutline" slot="start" color="primary" />
    <ion-label>
      <h2 style="font-size:15px">{{ item.name }}</h2>
      <p style="font-size:12px">{{ item.code }} / {{ item.location }}</p>
    </ion-label>
    <ion-badge slot="end" :color="item.stock < 10 ? 'danger' : 'success'">
      {{ item.stock }}
    </ion-badge>
  </ion-item>
</ion-list>
```

変更点: `v-for` でデータ駆動、`icon` で種類を示す、`badge` で数量表示（閾値で色分け）、`detail` で矢印。
