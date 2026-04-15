# Ionic 構造タグ・スロット・配置制御リファレンス

Ionic の構造タグ（`ion-toolbar`, `ion-item`, `ion-footer` 等）が持つ **slot（スロット）** と、
縦横の配置制御を行うタグの仕組みをまとめた解説ドキュメント。

> 既存ガイドとの違い:
> - `01-ionic-basics.md` → コンポーネント全体の入門
> - `21-ionic-layout-cheatsheet.md` → よくあるレイアウトパターン集
> - **本ドキュメント** → 構造タグの slot と配置の「なぜそうなるか」を解説

---

## 目次

1. [slot とは何か](#1-slot-とは何か)
2. [ion-toolbar のスロット](#2-ion-toolbar-のスロット)
3. [ion-item のスロット](#3-ion-item-のスロット)
4. [ion-button / ion-icon のスロット](#4-ion-button--ion-icon-のスロット)
5. [縦方向の配置制御](#5-縦方向の配置制御)
6. [横方向の配置制御](#6-横方向の配置制御)
7. [ion-content のスロット](#7-ion-content-のスロット)
8. [ion-card の構造](#8-ion-card-の構造)
9. [ion-accordion の構造](#9-ion-accordion-の構造)
10. [ion-segment / ion-tabs の構造](#10-ion-segment--ion-tabs-の構造)
11. [ion-menu / ion-split-pane の構造](#11-ion-menu--ion-split-pane-の構造)
12. [slot 使い分け早見表](#12-slot-使い分け早見表)
13. [業務画面での slot 設計指針](#13-業務画面での-slot-設計指針)

---

## 1. slot とは何か

Ionic コンポーネントは **Web Components の Shadow DOM** で構築されている。
`slot` 属性は「このコンテンツを親コンポーネントのどの場所に配置するか」を指定する仕組み。

```html
<!-- "start" という名前のスロットに配置される -->
<ion-icon :icon="scanOutline" slot="start" />
```

Vue の `<slot name="xxx">` と概念は同じだが、Ionic の場合はコンポーネント内部の
Shadow DOM のスロットに対応するため、**Ionic が定義した名前しか使えない**。

### slot を指定しない場合

slot 属性を省略すると「デフォルトスロット」に入る。
多くのコンポーネントではデフォルトスロットが中央の主要コンテンツ領域になる。

```html
<ion-toolbar>
  <!-- slot なし → デフォルト（中央領域） -->
  <ion-title>ページタイトル</ion-title>
</ion-toolbar>
```

---

## 2. ion-toolbar のスロット

`ion-toolbar` は Ionic で最もスロットが多いコンポーネント。
`ion-header` と `ion-footer` のどちらの中でも同じスロットが使える。

### スロット一覧

```
┌─────────────────────────────────────────────────────┐
│ ion-toolbar                                         │
│                                                     │
│  [secondary]  [start]  ──default──  [end]  [primary]│
│                                                     │
└─────────────────────────────────────────────────────┘
```

| スロット名 | 位置（md） | 位置（ios） | 用途 |
|-----------|-----------|-----------|------|
| `start` | 左端 | 左端 | 戻るボタン、メニューボタン |
| `end` | 右端 | 右端 | アクションボタン |
| `secondary` | 左端（startの右） | 左端 | サブ操作ボタン |
| `primary` | 右端（endの左） | 右端 | メイン操作ボタン |
| (default) | 中央 | 中央 | `ion-title`、`ion-searchbar` 等 |

### start / end と primary / secondary の違い

**`start` / `end`**:
- 位置が**絶対的**。どのプラットフォームでも左/右に固定される。
- 予測しやすいので、Android 端末専用の業務アプリでは使いやすい。

**`primary` / `secondary`**:
- 位置が**プラットフォーム依存**。
- `md`（Android）: secondary=左、primary=右
- `ios`（iPhone）: secondary=左、primary=右（v7以降はほぼ同じ）
- iOS / Android 両対応アプリでプラットフォームの UX ガイドラインに従いたい場合に使う。

```html
<!-- 固定配置（業務アプリ向き） -->
<ion-toolbar>
  <ion-buttons slot="start">
    <ion-back-button default-href="/home" />
  </ion-buttons>
  <ion-title>ページタイトル</ion-title>
  <ion-buttons slot="end">
    <ion-button>保存</ion-button>
  </ion-buttons>
</ion-toolbar>

<!-- プラットフォーム適応配置 -->
<ion-toolbar>
  <ion-buttons slot="secondary">
    <ion-button>キャンセル</ion-button>
  </ion-buttons>
  <ion-title>編集</ion-title>
  <ion-buttons slot="primary">
    <ion-button>保存</ion-button>
  </ion-buttons>
</ion-toolbar>
```

### 複数の ion-buttons を同じスロットに配置

同じスロット名の `ion-buttons` を複数置くと、出現順に並ぶ。

```html
<ion-toolbar>
  <ion-buttons slot="end">
    <ion-button>検索</ion-button>
  </ion-buttons>
  <ion-buttons slot="end">
    <ion-button>設定</ion-button>
  </ion-buttons>
  <ion-title>タイトル</ion-title>
</ion-toolbar>
```

ただし、1つの `ion-buttons` の中に複数の `ion-button` を入れるほうが一般的:

```html
<ion-toolbar>
  <ion-buttons slot="end">
    <ion-button>検索</ion-button>
    <ion-button>設定</ion-button>
  </ion-buttons>
  <ion-title>タイトル</ion-title>
</ion-toolbar>
```

### ヘッダーとフッターでの使い分け

```html
<!-- ヘッダー: ナビゲーション + タイトル + アクション -->
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button />
    </ion-buttons>
    <ion-title>出荷検品</ion-title>
    <ion-buttons slot="end">
      <ion-button>
        <ion-icon slot="icon-only" :icon="settingsOutline" />
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<!-- フッター: 業務ボタン + ページング -->
<ion-footer>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button fill="outline" color="medium">CSV出力</ion-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button fill="clear" size="small">前へ</ion-button>
      <ion-button fill="clear" size="small">次へ</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-footer>
```

### フッターに複数 toolbar を重ねる

`ion-footer` 内に `ion-toolbar` を複数置ける。上から下の順に積まれる。

```html
<ion-footer>
  <!-- 1段目: 業務操作ボタン -->
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button fill="outline">CSV出力</ion-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button fill="clear">前へ</ion-button>
      <ion-button fill="clear">次へ</ion-button>
    </ion-buttons>
  </ion-toolbar>
  <!-- 2段目: ナビゲーションバー -->
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button @click="$router.push('/home')">
        <ion-icon slot="icon-only" :icon="homeOutline" />
      </ion-button>
    </ion-buttons>
    <ion-title size="small">ホーム</ion-title>
  </ion-toolbar>
</ion-footer>
```

```
画面表示イメージ:
┌──────────────────────────────┐
│ [CSV出力]         [前へ][次へ]│ ← 1段目
├──────────────────────────────┤
│ [🏠]    ホーム               │ ← 2段目
└──────────────────────────────┘
```

---

## 3. ion-item のスロット

`ion-item` は Ionic のリスト行を構成する汎用コンテナ。
左・中央・右の3領域にコンテンツを振り分ける。

### スロット一覧

```
┌───────────────────────────────────────────┐
│ ion-item                                  │
│                                           │
│  [start]  ────── default ──────  [end]    │
│                                           │
└───────────────────────────────────────────┘
```

| スロット名 | 位置 | よく配置するもの |
|-----------|------|----------------|
| `start` | 左端 | アイコン、チェックボックス、アバター、サムネイル |
| (default) | 中央 | `ion-label`、`ion-input`、`ion-select` |
| `end` | 右端 | `ion-note`、`ion-badge`、`ion-button`、トグル |

### 基本パターン

```html
<!-- アイコン + ラベル + バッジ -->
<ion-item>
  <ion-icon :icon="cubeOutline" slot="start" color="primary" />
  <ion-label>
    <h2>ボルト M8×30</h2>
    <p>品番: A001</p>
  </ion-label>
  <ion-badge slot="end" color="success">150</ion-badge>
</ion-item>

<!-- チェックボックス + ラベル -->
<ion-item>
  <ion-checkbox slot="start" v-model="checked" />
  <ion-label>在庫ありのみ</ion-label>
</ion-item>

<!-- ラベル + ノート + ボタン（end に複数） -->
<ion-item>
  <ion-label>
    <h3>コピー用紙 A4</h3>
    <p>東京倉庫 / B-03</p>
  </ion-label>
  <ion-note slot="end" color="danger">8</ion-note>
  <ion-button slot="end" fill="clear" size="small">詳細</ion-button>
</ion-item>
```

### slot="end" に複数の要素を置く

`end` に複数の要素を直接置ける。出現順に左から右へ並ぶ。

```html
<ion-item>
  <ion-label>品目名</ion-label>
  <ion-note slot="end">120個</ion-note>
  <ion-button slot="end" fill="clear" size="small">編集</ion-button>
</ion-item>
```

```
表示: [品目名          120個 [編集]]
```

### アバター・サムネイルの配置

`ion-avatar` と `ion-thumbnail` は slot で配置位置を指定する。

```html
<!-- アバター（丸型、小さい） -->
<ion-item>
  <ion-avatar slot="start">
    <img src="/img/user.png" />
  </ion-avatar>
  <ion-label>担当者名</ion-label>
</ion-item>

<!-- サムネイル（四角、やや大きい） -->
<ion-item>
  <ion-thumbnail slot="start">
    <img src="/img/product.png" />
  </ion-thumbnail>
  <ion-label>
    <h2>商品名</h2>
    <p>商品説明</p>
  </ion-label>
</ion-item>
```

---

## 4. ion-button / ion-icon のスロット

### ion-button 内の icon スロット

`ion-button` の中に `ion-icon` を配置する場合、slot でアイコンの位置を制御する。

| スロット名 | 効果 |
|-----------|------|
| `start` | テキストの左にアイコン |
| `end` | テキストの右にアイコン |
| `icon-only` | アイコンのみ（テキストなし、余白調整） |

```html
<!-- 左アイコン + テキスト -->
<ion-button>
  <ion-icon :icon="scanOutline" slot="start" />
  スキャン
</ion-button>

<!-- テキスト + 右アイコン -->
<ion-button>
  次へ
  <ion-icon :icon="arrowForwardOutline" slot="end" />
</ion-button>

<!-- アイコンのみ -->
<ion-button fill="clear">
  <ion-icon :icon="settingsOutline" slot="icon-only" />
</ion-button>
```

```
表示:
[🔍 スキャン]   [次へ →]   [⚙]
  slot=start     slot=end   slot=icon-only
```

### icon-only が重要な理由

`slot="icon-only"` を付けないと、ボタンにテキストがないにもかかわらず
テキスト用の余白が確保されてしまい、不自然な見た目になる。
**テキストなしのアイコンボタンには必ず `slot="icon-only"` を付ける。**

```html
<!-- NG: 余白が不自然 -->
<ion-button fill="clear">
  <ion-icon :icon="settingsOutline" />
</ion-button>

<!-- OK: icon-only で余白が最適化される -->
<ion-button fill="clear">
  <ion-icon :icon="settingsOutline" slot="icon-only" />
</ion-button>
```

### ion-spinner の配置

`ion-spinner` も `ion-button` 内で slot を使う。

```html
<ion-button :disabled="loading">
  <ion-spinner v-if="loading" name="crescent" slot="start" />
  {{ loading ? '送信中...' : '登録' }}
</ion-button>
```

---

## 5. 縦方向の配置制御

### ページの縦構造

Ionic ページは上から下へ **3つの固定領域** で構成される。

```
┌──────────────────────────────┐
│ ion-header                   │ ← 画面上部に固定（スクロールしない）
│   └ ion-toolbar (1個以上)    │
├──────────────────────────────┤
│ ion-content                  │ ← スクロール領域
│   └ ページの中身             │
├──────────────────────────────┤
│ ion-footer                   │ ← 画面下部に固定（スクロールしない）
│   └ ion-toolbar (1個以上)    │
└──────────────────────────────┘
```

**制約ルール:**
- `ion-header`, `ion-content`, `ion-footer` は **`ion-page` の直下** に置く
- この3つ以外の要素を `ion-page` 直下に置くと、レイアウトが崩れる
- `ion-content` の外に div 等を直置きすると、スクロールが正しく動かない

```html
<!-- NG: ion-page 直下に div がある -->
<ion-page>
  <ion-header>...</ion-header>
  <div>ここに置くと問題になる</div>  <!-- NG -->
  <ion-footer>...</ion-footer>
</ion-page>

<!-- OK: 必ず ion-content の中に入れる -->
<ion-page>
  <ion-header>...</ion-header>
  <ion-content>
    <div>ここなら OK</div>
  </ion-content>
  <ion-footer>...</ion-footer>
</ion-page>
```

### ion-header の複数 toolbar

`ion-header` に `ion-toolbar` を複数積むと、全て上部に固定される。
検索バーや条件エリアの固定に使う。

```html
<ion-header>
  <!-- 1段目: タイトルバー -->
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button />
    </ion-buttons>
    <ion-title>在庫照会</ion-title>
  </ion-toolbar>
  <!-- 2段目: 検索バー（固定） -->
  <ion-toolbar>
    <ion-searchbar placeholder="品番で検索" />
  </ion-toolbar>
</ion-header>
```

```
画面イメージ:
┌──────────────────────────────┐
│ [←]  在庫照会                │ ← 1段目 toolbar
├──────────────────────────────┤
│ 🔍 品番で検索                │ ← 2段目 toolbar（固定）
├──────────────────────────────┤
│                              │
│  （スクロールするリスト）     │ ← ion-content
│                              │
└──────────────────────────────┘
```

### ion-footer の用途

`ion-footer` は画面下部に固定される。以下の用途で使う:

| 用途 | パターン |
|------|---------|
| 登録ボタン | `ion-toolbar` + `ion-button expand="block"` |
| 操作ボタン群 | `ion-toolbar` + `ion-buttons slot="start/end"` |
| ページング | `ion-toolbar` + 前へ/次へボタン |
| ナビゲーションバー | `ion-toolbar` + アイコンボタン群 |
| 複合フッター | 上記を `ion-toolbar` 2段で組み合わせ |

### ion-footer を使うべき場面

```
使うべき:
- 常に画面に見えている必要があるボタン（登録、送信）
- ナビゲーションバー
- ページングコントロール

使わなくてよい:
- スクロールに追従するボタン → ion-content 内に配置
- モーダル内のボタン → モーダルの ion-footer を使う
```

---

## 6. 横方向の配置制御

### 方法 1: ion-toolbar のスロットで左右に配置

ツールバー内の要素を左右に配置する場合。

```html
<ion-toolbar>
  <ion-buttons slot="start">
    <ion-button>左のボタン</ion-button>
  </ion-buttons>
  <ion-title>中央のタイトル</ion-title>
  <ion-buttons slot="end">
    <ion-button>右のボタン</ion-button>
  </ion-buttons>
</ion-toolbar>
```

```
[左のボタン]   中央のタイトル   [右のボタン]
```

### 方法 2: ion-grid で列分割

コンテンツエリア内で横に並べる場合。12カラムグリッド。

```html
<ion-grid>
  <ion-row>
    <ion-col size="6">左半分</ion-col>
    <ion-col size="6">右半分</ion-col>
  </ion-row>
</ion-grid>
```

### ion-row の class による縦方向の揃え

`ion-row` に Ionic のユーティリティクラスを付けて、行内の縦揃えを制御できる。

| クラス | 効果 |
|-------|------|
| `ion-align-items-start` | 上揃え |
| `ion-align-items-center` | 中央揃え（上下） |
| `ion-align-items-end` | 下揃え |
| `ion-align-items-stretch` | 高さを揃える（デフォルト） |

```html
<ion-grid>
  <ion-row class="ion-align-items-center">
    <ion-col size="4">短いテキスト</ion-col>
    <ion-col size="8">
      長いテキスト長いテキスト<br/>
      折り返しがあっても中央揃え
    </ion-col>
  </ion-row>
</ion-grid>
```

### ion-col の class による横方向の揃え

| クラス | 効果 |
|-------|------|
| `ion-text-start` | 左揃え（デフォルト） |
| `ion-text-center` | 中央揃え |
| `ion-text-end` | 右揃え |

```html
<ion-grid>
  <ion-row>
    <ion-col size="4" class="ion-text-start">左揃え</ion-col>
    <ion-col size="4" class="ion-text-center">中央</ion-col>
    <ion-col size="4" class="ion-text-end">右揃え</ion-col>
  </ion-row>
</ion-grid>
```

### ion-col の offset / push / pull

| 属性 | 効果 |
|------|------|
| `offset="3"` | 左に3カラム分の空白を入れる |
| `push="3"` | 表示位置を右に3カラム分ずらす（DOM順は変えない） |
| `pull="3"` | 表示位置を左に3カラム分ずらす（DOM順は変えない） |

```html
<!-- 中央寄せ（左右に余白） -->
<ion-grid>
  <ion-row>
    <ion-col size="6" offset="3">
      中央に配置される（左3 + 本体6 + 右3 = 12）
    </ion-col>
  </ion-row>
</ion-grid>

<!-- DOM順と表示順を入れ替え -->
<ion-grid>
  <ion-row>
    <ion-col size="4" push="8">DOM上は先だが右に表示</ion-col>
    <ion-col size="8" pull="4">DOM上は後だが左に表示</ion-col>
  </ion-row>
</ion-grid>
```

### 方法 3: ion-item のスロットで左右配置

リスト行内で要素を左右に配置する場合（セクション2と同じ仕組み）。

```html
<ion-item>
  <ion-icon :icon="cubeOutline" slot="start" />
  <ion-label>品目名</ion-label>
  <ion-badge slot="end" color="success">150</ion-badge>
</ion-item>
```

```
[📦] 品目名                    [150]
start  default                  end
```

### 方法 4: CSS Flex（Ionic タグで対応できない場合）

`ion-toolbar` や `ion-item` のスロットで表現しにくい場合は CSS Flex を併用する。

```html
<!-- 均等幅ボタン -->
<div style="display:flex; gap:8px; padding:0 16px">
  <ion-button fill="outline" style="flex:1">キャンセル</ion-button>
  <ion-button style="flex:1">登録</ion-button>
</div>

<!-- 左右端に分散 -->
<div style="display:flex; justify-content:space-between; align-items:center; padding:0 16px">
  <span>検索結果 8件</span>
  <ion-button size="small">全選択</ion-button>
</div>
```

### 横方向配置の選び方

| 場面 | 方法 |
|------|------|
| ツールバー内の左右配置 | `ion-toolbar` の `slot="start"` / `slot="end"` |
| リスト行内の左右配置 | `ion-item` の `slot="start"` / `slot="end"` |
| コンテンツの列分割 | `ion-grid` + `ion-row` + `ion-col` |
| ボタンの均等幅配置 | CSS Flex (`display:flex; flex:1`) |
| 左右端に分散配置 | CSS Flex (`justify-content:space-between`) |

---

## 7. ion-content のスロット

`ion-content` には `fixed` スロットがある。

| スロット名 | 効果 |
|-----------|------|
| (default) | スクロールする領域に配置 |
| `fixed` | スクロールしない固定領域に配置 |

```html
<ion-content>
  <!-- 固定要素: スクロールしても動かない -->
  <div slot="fixed" style="bottom:16px; right:16px; z-index:10">
    <ion-fab-button>
      <ion-icon :icon="addOutline" />
    </ion-fab-button>
  </div>

  <!-- スクロールするコンテンツ -->
  <ion-list>
    <ion-item v-for="i in 100" :key="i">
      <ion-label>アイテム {{ i }}</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
```

`fixed` スロットの要素は `position: absolute` として扱われるため、
`top`, `bottom`, `left`, `right` で位置を指定する。

### FAB（Floating Action Button）

`ion-fab` は `ion-content` 内で使う浮動ボタン。`slot="fixed"` と同等の効果を持つ。

```html
<ion-content>
  <!-- 右下に浮動ボタン -->
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button>
      <ion-icon :icon="addOutline" />
    </ion-fab-button>
  </ion-fab>

  <!-- コンテンツ -->
  <ion-list>...</ion-list>
</ion-content>
```

| 属性 | 値 | 効果 |
|------|---|------|
| `vertical` | `"top"` / `"center"` / `"bottom"` | 縦位置 |
| `horizontal` | `"start"` / `"center"` / `"end"` | 横位置 |
| `edge` | `true` | ヘッダー/フッターの境界線上に配置 |

---

## 8. ion-card の構造

`ion-card` は slot を使わず、子コンポーネントの **出現順** でレイアウトが決まる。

```html
<ion-card>
  <ion-card-header>          ← 上部（タイトル領域）
    <ion-card-subtitle>サブタイトル</ion-card-subtitle>
    <ion-card-title>タイトル</ion-card-title>
  </ion-card-header>
  <ion-card-content>         ← 下部（本文領域）
    本文テキスト
  </ion-card-content>
</ion-card>
```

`ion-card-header` と `ion-card-content` の順序を入れ替えると表示順も変わる。
slot による配置制御ではなく、DOM 順 = 表示順。

---

## 9. ion-accordion の構造

`ion-accordion` は `slot="header"` と `slot="content"` で開閉パネルを構成する。

```html
<ion-accordion-group>
  <ion-accordion value="section1">
    <!-- slot="header": 常に表示される部分（クリックで開閉） -->
    <ion-item slot="header">
      <ion-label>セクション1</ion-label>
    </ion-item>
    <!-- slot="content": 展開時に表示される部分 -->
    <div slot="content" class="ion-padding">
      展開コンテンツ
    </div>
  </ion-accordion>
</ion-accordion-group>
```

| スロット名 | 効果 |
|-----------|------|
| `header` | 常に表示。クリックで content を開閉 |
| `content` | accordion が開いたときだけ表示 |

---

## 10. ion-segment / ion-tabs の構造

### ion-segment（タブ切り替え UI）

`ion-segment` 自体は slot を持たない。`ion-segment-button` の中に配置する要素が slot を使う。

```html
<ion-segment v-model="selectedTab">
  <ion-segment-button value="list">
    <ion-icon :icon="listOutline" />  <!-- デフォルトスロット -->
    <ion-label>リスト</ion-label>
  </ion-segment-button>
  <ion-segment-button value="card">
    <ion-icon :icon="gridOutline" />
    <ion-label>カード</ion-label>
  </ion-segment-button>
</ion-segment>

<!-- タブの中身は v-if / v-show で切り替え -->
<div v-if="selectedTab === 'list'">リスト表示</div>
<div v-if="selectedTab === 'card'">カード表示</div>
```

### ion-segment-button の layout 属性

| layout | 効果 |
|--------|------|
| `"icon-bottom"` | アイコンが下（デフォルト） |
| `"icon-top"` | アイコンが上 |
| `"icon-start"` | アイコンが左 |
| `"icon-end"` | アイコンが右 |
| `"icon-hide"` | アイコン非表示 |
| `"label-hide"` | ラベル非表示 |

### ion-tabs（ルーティング付きタブ）

`ion-tabs` はルーティングと連動するタブバー。slot でタブバーの位置を制御する。

```html
<ion-tabs>
  <!-- slot="top": タブバーを上に表示 -->
  <!-- slot なし（デフォルト）: タブバーを下に表示 -->
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="home" href="/home">
      <ion-icon :icon="homeOutline" />
      <ion-label>ホーム</ion-label>
    </ion-tab-button>
    <ion-tab-button tab="search" href="/search">
      <ion-icon :icon="searchOutline" />
      <ion-label>検索</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</ion-tabs>
```

| スロット名 | 効果 |
|-----------|------|
| `"bottom"` | 画面下部にタブバー（デフォルト） |
| `"top"` | 画面上部にタブバー |

---

## 11. ion-menu / ion-split-pane の構造

### ion-menu

サイドメニュー。`side` 属性で左右、`content-id` でメインコンテンツを指定。

```html
<ion-app>
  <ion-menu side="start" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>メニュー</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>メニュー項目</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>

  <ion-router-outlet id="main-content" />
</ion-app>
```

| 属性 | 値 | 効果 |
|------|---|------|
| `side` | `"start"` | 左からスライド（デフォルト、LTR言語） |
| `side` | `"end"` | 右からスライド |
| `type` | `"overlay"` | コンテンツの上に重なる |
| `type` | `"reveal"` | コンテンツが右にずれる |
| `type` | `"push"` | メニューがコンテンツを押す |

### ion-split-pane

画面幅に応じてメニューを常時表示/ドロワーに切り替える。

```html
<ion-split-pane content-id="main-content" when="lg">
  <ion-menu content-id="main-content">
    <!-- メニュー内容 -->
  </ion-menu>
  <ion-router-outlet id="main-content" />
</ion-split-pane>
```

| when | ブレークポイント | 効果 |
|------|---------------|------|
| `"sm"` | 576px+ | ほぼ常にサイドバー |
| `"md"` | 768px+ | タブレット以上 |
| `"lg"` | 992px+ | デスクトップのみ |
| `"xl"` | 1200px+ | 大画面のみ |
| `false` | なし | 常にドロワー |

---

## 12. slot 使い分け早見表

### コンポーネント別 slot 一覧

| コンポーネント | 使えるスロット | 備考 |
|--------------|--------------|------|
| `ion-toolbar` | `start`, `end`, `primary`, `secondary`, default | 最多スロット |
| `ion-item` | `start`, `end`, default | リスト行 |
| `ion-button` (内部) | `start`, `end`, `icon-only` | icon/spinner の配置 |
| `ion-content` | `fixed`, default | 固定要素用 |
| `ion-accordion` | `header`, `content` | 開閉パネル |
| `ion-tab-bar` | `bottom`, `top` | タブ位置 |
| `ion-card` | なし（DOM順で制御） | slot 不要 |
| `ion-select` | `start`, `end`, `label` | 装飾要素の配置 |
| `ion-input` | `start`, `end`, `label` | 装飾要素の配置 |

### slot 名の意味（共通）

| slot 名 | 意味 |
|---------|------|
| `start` | 要素の開始側（LTR では左） |
| `end` | 要素の終端側（LTR では右） |
| `primary` | プラットフォームのメイン操作位置 |
| `secondary` | プラットフォームのサブ操作位置 |
| `icon-only` | アイコンのみ表示（テキスト余白なし） |
| `fixed` | スクロールに追従しない固定位置 |
| `header` | 開閉パネルの見出し部分 |
| `content` | 開閉パネルの本文部分 |
| `top` / `bottom` | 上端/下端への配置 |

---

## 13. 業務画面での slot 設計指針

### ヘッダー toolbar の定型パターン

```html
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button default-href="/home" />
    </ion-buttons>
    <ion-title>画面タイトル</ion-title>
    <ion-buttons slot="end">
      <!-- 画面固有のアクションメニュー -->
      <ActionMenu :items="menuItems" @select="onMenuSelect" />
    </ion-buttons>
  </ion-toolbar>
</ion-header>
```

本プロジェクトでは `PageLayout` がこの構造を共通化している。

### フッター toolbar の設計パターン

#### パターン A: 登録ボタンのみ

```html
<ion-footer>
  <ion-toolbar>
    <ion-button expand="block" class="ion-margin-horizontal">
      登録
    </ion-button>
  </ion-toolbar>
</ion-footer>
```

#### パターン B: 左右にボタン配置

```html
<ion-footer>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button fill="outline" color="medium">CSV出力</ion-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button color="primary">登録</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-footer>
```

#### パターン C: 操作ボタン + ナビバー（2段）

```html
<ion-footer>
  <!-- 1段目: 画面固有の操作 -->
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button fill="outline">CSV出力</ion-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button fill="clear" size="small">前へ</ion-button>
      <ion-button fill="clear" size="small">次へ</ion-button>
    </ion-buttons>
  </ion-toolbar>
  <!-- 2段目: 共通ナビゲーション -->
  <ion-toolbar>
    <div style="display:flex; justify-content:space-around; padding:4px 0">
      <button class="nav-item" @click="$router.push('/home')">
        <ion-icon :icon="homeOutline" />
        <span>ホーム</span>
      </button>
      <button class="nav-item">
        <ion-icon :icon="scanOutline" />
        <span>スキャン</span>
      </button>
    </div>
  </ion-toolbar>
</ion-footer>
```

### Android 業務端末での推奨

- `primary` / `secondary` より **`start` / `end`** を使う
  - 理由: Android 専用端末ではプラットフォーム適応の必要がなく、位置が予測しやすい
- フッターの `ion-toolbar` は **最大2段** まで
  - 理由: 業務端末は画面が小さいため、フッターが厚くなるとコンテンツ領域を圧迫する
- ナビバーが必要な場合は **CSS Flex で構築** する
  - 理由: `ion-tab-bar` はルーティング前提のため、画面遷移と独立したナビには向かない

---

## 付録: よくある間違い

### 1. ion-page 直下に div を置く

```html
<!-- NG -->
<ion-page>
  <ion-header>...</ion-header>
  <div class="my-content">...</div>
  <ion-footer>...</ion-footer>
</ion-page>

<!-- OK -->
<ion-page>
  <ion-header>...</ion-header>
  <ion-content><div class="my-content">...</div></ion-content>
  <ion-footer>...</ion-footer>
</ion-page>
```

### 2. icon-only を付け忘れる

```html
<!-- NG: テキスト用の余白が入る -->
<ion-button fill="clear">
  <ion-icon :icon="settingsOutline" />
</ion-button>

<!-- OK -->
<ion-button fill="clear">
  <ion-icon :icon="settingsOutline" slot="icon-only" />
</ion-button>
```

### 3. ion-buttons を使わずに slot を付ける

`ion-toolbar` の `start` / `end` スロットに `ion-button` を直接置いても動くが、
`ion-buttons` でラップしないとスタイル（サイズ、間隔）が適用されない。

```html
<!-- NG: 動くがスタイルが崩れる -->
<ion-toolbar>
  <ion-button slot="start">戻る</ion-button>
  <ion-title>タイトル</ion-title>
</ion-toolbar>

<!-- OK -->
<ion-toolbar>
  <ion-buttons slot="start">
    <ion-button>戻る</ion-button>
  </ion-buttons>
  <ion-title>タイトル</ion-title>
</ion-toolbar>
```

### 4. ion-footer を ion-content の中に入れる

```html
<!-- NG: フッターがスクロールに巻き込まれる -->
<ion-page>
  <ion-header>...</ion-header>
  <ion-content>
    <div>コンテンツ</div>
    <ion-footer>...</ion-footer>  <!-- NG -->
  </ion-content>
</ion-page>

<!-- OK: ion-page 直下に置く -->
<ion-page>
  <ion-header>...</ion-header>
  <ion-content><div>コンテンツ</div></ion-content>
  <ion-footer>...</ion-footer>
</ion-page>
```

### 5. slot="start" と style="float:left" を混同する

Ionic の slot は Shadow DOM のスロット機構であり、CSS の float とは無関係。
`slot="start"` はコンポーネント内部の特定の領域にコンテンツを「差し込む」仕組み。
CSS で位置をオーバーライドしても、slot で決まった領域から移動することはない。
