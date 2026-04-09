# 端末解像度・DPR 調査ガイド

業務用ハンディターミナル（Xnavis 等）でWebアプリを表示する際の
解像度・DPR の考え方と、Chrome DevTools での再現方法をまとめる。

---

## 目次

1. [解像度の基本概念](#1-解像度の基本概念)
2. [業務用端末で文字が小さくなる原因](#2-業務用端末で文字が小さくなる原因)
3. [実機での調査方法](#3-実機での調査方法)
4. [Chrome DevTools でのシミュレーション](#4-chrome-devtools-でのシミュレーション)
5. [Xnavis (X-N10 / X-N15) 端末情報](#5-xnavis-x-n10--x-n15-端末情報)
6. [表示崩れの対処法](#6-表示崩れの対処法)
7. [開発時のチェックリスト](#7-開発時のチェックリスト)

---

## 1. 解像度の基本概念

### 3つの数値を区別する

| 用語 | 例 (iPhone 14) | 説明 |
|------|----------------|------|
| **物理ピクセル** | 2532 x 1170 | ハードウェアの実際のドット数 |
| **CSSピクセル (論理ピクセル)** | 844 x 390 | ブラウザがレイアウトに使う仮想サイズ |
| **DPR (Device Pixel Ratio)** | 3 | 物理 / CSS の倍率 |

**Web のレイアウトに影響するのは CSS ピクセル。**

```
CSSピクセル = 物理ピクセル / DPR
```

### 代表端末の比較

| 端末 | 画面 | 物理解像度 | DPR | CSSビューポート幅 |
|------|------|-----------|-----|-------------------|
| iPhone SE (3rd) | 4.7" | 1334 x 750 | 2 | 375px |
| iPhone 14 | 6.1" | 2532 x 1170 | 3 | 390px |
| iPhone 14 Pro Max | 6.7" | 2796 x 1290 | 3 | 430px |
| 一般的な Android | 6.0" | 1920 x 1080 | 3 | 360px |
| 業務用端末 (HD, DPR 1) | 5.0" | 1280 x 720 | 1 | **720px** |
| 業務用端末 (HD, DPR 2) | 5.0" | 1280 x 720 | 2 | **360px** |

一般的なスマホの CSS ビューポート幅は **360px 〜 430px** 程度。

---

## 2. 業務用端末で文字が小さくなる原因

### DPR が低い (1 〜 1.5) 場合

業務用端末はコスト・バッテリー重視で、DPR が低いことが多い。

```
物理解像度 1280 x 720、DPR 1 の場合：
→ CSSビューポート = 720 x 1280
→ ブラウザは「タブレット並みの幅」と認識
→ 全てのUI要素が縮小表示される
```

一般スマホ (CSS 幅 360px) の**約2倍の幅**にレイアウトされるため、
ボタン・文字すべてが半分のサイズに見える。

---

## 3. 実機での調査方法

### 方法 A: ブラウザのアドレスバーから

以下を Chrome のアドレスバーに貼り付けて実行：

```
javascript:alert('物理: '+screen.width+'x'+screen.height+'\nDPR: '+devicePixelRatio+'\nCSS viewport: '+document.documentElement.clientWidth+'x'+document.documentElement.clientHeight)
```

### 方法 B: USB デバッグ (推奨)

1. 端末の「開発者オプション」で USB デバッグを有効化
2. USB ケーブルで PC に接続
3. PC の Chrome で `chrome://inspect` を開く
4. 端末のタブが表示される → 「inspect」をクリック
5. Console で以下を実行：

```js
console.log(`物理解像度: ${screen.width} x ${screen.height}`);
console.log(`DPR: ${devicePixelRatio}`);
console.log(`CSSビューポート: ${document.documentElement.clientWidth} x ${document.documentElement.clientHeight}`);
console.log(`User Agent: ${navigator.userAgent}`);
```

### 記録すべき値

| 項目 | 値 (実機で記入) |
|------|----------------|
| screen.width | |
| screen.height | |
| devicePixelRatio | |
| clientWidth | |
| clientHeight | |
| navigator.userAgent | |

---

## 4. Chrome DevTools でのシミュレーション

### カスタムデバイスの登録手順

1. F12 で DevTools を開く
2. **Settings** (歯車アイコン) → **Devices**
3. **Add custom device** をクリック
4. 以下を入力：

#### 推奨: 2パターン登録

| 設定名 | Width | Height | DPR | User Agent | 用途 |
|--------|-------|--------|-----|------------|------|
| Xnavis (実機再現) | 720 | 1280 | 1 | (空欄でOK) | 実機の表示を再現 |
| Xnavis (補正後) | 360 | 640 | 2 | (空欄でOK) | viewport 修正後の確認 |

※ 実機調査で値が判明したら差し替える。

### 使い方

1. DevTools のデバイスツールバー (スマホアイコン) を ON
2. 上部ドロップダウンから登録したデバイスを選択
3. 表示を確認

### DPR の手動変更

デバイスツールバー右側の `⋮` → **Add device pixel ratio** にチェック
→ DPR 切り替えが表示される。

---

## 5. Xnavis (X-N10 / X-N15) 端末情報

### 公式スペック

| 項目 | 内容 |
|------|------|
| メーカー | デンソーウェーブ |
| 製品名 | Xnavis (エクスナビス) |
| モデル | X-N10 (WiFi), X-N15 (4G) |
| OS | Android 13 |
| 画面サイズ | 5 インチ |
| 重量 | 約 180g |
| 防塵防滴 | IP54 |
| 機能 | バーコード / 2次元コード / NFC / RFID (HF) |

### 解像度 (未確認 - 実機調査が必要)

公式サイトでは液晶解像度の詳細が公開されていない。
5 インチ業務用端末の一般的なスペックから推測：

| パターン | 物理解像度 | DPR (推測) | CSSビューポート幅 |
|----------|-----------|-----------|-------------------|
| HD (有力) | 1280 x 720 | 1 〜 2 | 720px 〜 360px |
| FHD | 1920 x 1080 | 2 〜 3 | 540px 〜 360px |

**実機確認後にこの表を更新すること。**

### 情報入手先

- 公式製品ページ: https://www.denso-wave.com/ja/adcd/product/xmare/xnavis.html
- マニュアル (要ログイン): https://www.denso-wave.com/ja/adcd/download/category/manual/x-n/
- カスタマーデスク: 0120-585-271

---

## 6. 表示崩れの対処法

### 対処 1: viewport meta で幅を固定

`index.html` の viewport を変更：

```html
<!-- Ionic デフォルト -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 幅を 390px に固定 (全端末に影響) -->
<meta name="viewport" content="width=390, initial-scale=1.0">
```

### 対処 2: JS で端末を検出して viewport を書き換え (推奨)

特定端末だけ対処できる。`App.vue` の `onMounted` 等で：

```typescript
const adjustViewportForBusinessTerminal = () => {
  const vw = document.documentElement.clientWidth;
  const screenW = screen.width;

  // CSSビューポートが広いのに物理画面が小さい = 業務端末
  if (vw > 500 && screenW < 800) {
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      meta.setAttribute('content', 'width=390, initial-scale=1.0');
    }
  }
};

adjustViewportForBusinessTerminal();
```

### 対処 3: CSS メディアクエリで font-size を補正

```css
/* 業務端末向け: ビューポートが広い小画面デバイス */
@media screen and (min-width: 500px) and (max-device-width: 800px) {
  :root {
    font-size: 20px; /* デフォルト 16px より大きく */
  }
}
```

### 対処 4: Ionic CSS 変数でコンポーネントサイズを調整

```css
:root {
  /* Ionic のフォントサイズ変数 */
  --ion-font-size: 18px;
}

ion-item {
  --min-height: 56px; /* デフォルト 48px → 大きく */
}

ion-button {
  --padding-top: 12px;
  --padding-bottom: 12px;
  font-size: 18px;
}
```

---

## 7. 開発時のチェックリスト

### PC 開発時

- [ ] Chrome DevTools にカスタムデバイス「Xnavis」を登録した
- [ ] DPR 1 (実機再現) と DPR 2 (補正後) の両方で表示確認している
- [ ] タッチターゲットが 48px x 48px 以上ある (手袋使用を想定)
- [ ] フォントサイズが小さすぎないか確認した (最小 14px 推奨)

### 実機テスト時

- [ ] 実機の screen.width / height / DPR を記録した
- [ ] USB デバッグでリモート inspect を試した
- [ ] 文字サイズが読みやすいか確認した
- [ ] バーコード読取画面の表示領域が適切か確認した
- [ ] 横持ち (ランドスケープ) での表示も確認した
