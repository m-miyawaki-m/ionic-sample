# パターン集の作り方ガイド

公式デモをベースに、業務で使える独自パターン集を作成する手順。

---

## 全体の流れ

```
1. 部品を選ぶ
2. 公式デモからバリエーションを抽出
3. 業務シナリオからパターンを考える
4. 補足説明を書く
5. Vue ファイルに組み立てる
```

---

## Step 1: 部品を選ぶ

業務アプリでよく使う部品をピックアップする。

**選定基準:**
- 画面に頻繁に登場する（ボタン、入力、リスト等）
- 設定パターンが多く、使い分けの判断が必要
- チーム内で「どう使うべきか」の認識を揃えたい部品

---

## Step 2: 公式デモからバリエーションを抽出

### 2-1. 公式カタログを開く

本プロジェクトの公式カタログ（`/samples/catalog`）から対象部品のデモ一覧を確認する。

例: ボタンの場合
```
/samples/catalog/button/basic
/samples/catalog/button/fill
/samples/catalog/button/expand
/samples/catalog/button/size
/samples/catalog/button/shape
/samples/catalog/button/icons
/samples/catalog/button/theming-colors
...
```

### 2-2. Props を軸にセクション分けする

各デモは 1 つの Props に対応している。これをそのままセクションにする。

| 公式デモ名 | Props | パターンセクション名 |
|-----------|-------|-------------------|
| basic | (デフォルト) | 基本 |
| fill | fill | Fill |
| size | size | Size |
| expand | expand | Expand |
| shape | shape | Shape |
| icons | slot(start/end) | Icon 配置 |
| theming-colors | color | Color |

### 2-3. 公式デモのソースコードをコピーする

各デモページの「Source」を開き、`<template>` 内のコードをコピーする。

```html
<!-- 公式デモ button/fill の Source からコピー -->
<ion-button>Default</ion-button>
<ion-button fill="clear">Clear</ion-button>
<ion-button fill="outline">Outline</ion-button>
<ion-button fill="solid">Solid</ion-button>
```

### 2-4. 組み合わせを追加する

公式デモは 1 Props ずつだが、パターン集では組み合わせも作る。

```html
<!-- fill × shape の組み合わせマトリクス -->
<ion-button fill="solid">Solid + Default</ion-button>
<ion-button fill="solid" shape="round">Solid + Round</ion-button>
<ion-button fill="outline">Outline + Default</ion-button>
<ion-button fill="outline" shape="round">Outline + Round</ion-button>
<ion-button fill="clear">Clear + Default</ion-button>
<ion-button fill="clear" shape="round">Clear + Round</ion-button>
```

### 2-5. 状態バリエーションを追加する

disabled / readonly / error / loading など、状態による変化も網羅する。

```html
<!-- disabled 状態を各 fill で -->
<ion-button disabled>Solid Disabled</ion-button>
<ion-button fill="outline" disabled>Outline Disabled</ion-button>
<ion-button fill="clear" disabled>Clear Disabled</ion-button>
```

---

## Step 3: 業務シナリオからパターンを考える

### 3-1. 業務フローを書き出す

対象アプリの業務フローから、その部品が登場する場面を列挙する。

例（倉庫管理アプリのボタン）:
- 検品画面で「確定」「キャンセル」を押す
- バーコードスキャンを起動する
- リストの一括操作（全選択/削除）
- 処理中のローディング表示
- ステータスの切替（有効/無効）

### 3-2. 各場面のコードを書く

業務での使い方を実際のコードにする。

```html
<!-- 確定/キャンセル並び -->
<ion-button fill="outline" color="medium">キャンセル</ion-button>
<ion-button color="primary">確定</ion-button>
```

```html
<!-- スキャン起動ボタン -->
<ion-button expand="block" size="large">
  <ion-icon :icon="barcodeOutline" slot="start" />
  スキャン開始
</ion-button>
```

```html
<!-- ローディング付き -->
<ion-button :disabled="isLoading">
  <ion-spinner v-if="isLoading" slot="start" name="crescent" />
  {{ isLoading ? '処理中...' : '送信' }}
</ion-button>
```

### 3-3. パターンに名前をつける

「確定/キャンセル並び」「スキャン起動ボタン」のように、
チーム内で呼べる名前をつける。これがそのまま h2 見出しになる。

---

## Step 4: 補足説明を書く

全パターンに 1-2 行の日本語補足をつける。以下の観点で書く。

### 書くこと

| 観点 | 例 |
|------|-----|
| **なぜこの組み合わせか** | 「キャンセルは outline、確定は solid で主副を区別」|
| **いつ使うか** | 「バーコード読取の起動画面に」 |
| **注意点** | 「disabled 中は色が薄くなるので文字色に注意」 |
| **代替案との比較** | 「toggle より明示的に状態を示したい場合に」 |

### テンプレート

```
{何をする/何が起きる}。{なぜそうするか/いつ使うか}。
```

例:
- 「color プロパティで意味別に色分け。primary=主操作、danger=破壊的操作に使う。」
- 「expand='block' + size='large' で画面幅いっぱいの大ボタン。バーコード読取の起動に。」

---

## Step 5: Vue ファイルに組み立てる

### 5-1. ファイル構成テンプレート

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>{部品名} パターン集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <!-- 概要 -->
      <p style="color:var(--ion-color-medium)">
        {この部品の1行説明}
      </p>

      <!-- ========== バリエーション ========== -->

      <div class="section">
        <h2>{プロパティ名}</h2>
        <p>{補足説明}</p>
        <!-- 公式デモからコピー＋拡張したコード -->
      </div>

      <div class="section">
        <h2>{プロパティ名 2}</h2>
        <p>{補足説明}</p>
        <!-- ... -->
      </div>

      <!-- ========== 業務利用パターン ========== -->

      <div class="section">
        <h2>{パターン名}</h2>
        <p>{補足説明}</p>
        <!-- 業務シナリオのコード -->
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  // ... 部品固有のインポート
} from '@ionic/vue';
import { /* アイコン */ } from 'ionicons/icons';
import { ref } from 'vue';

// リアクティブな状態（必要な場合のみ）
</script>

<style scoped>
.section {
  margin-top: 24px;
}
.section h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}
.section p {
  color: var(--ion-color-medium);
  font-size: 14px;
  margin-bottom: 12px;
}
</style>
```

### 5-2. セクション構成の目安

| 区分 | セクション数 | 内容 |
|------|------------|------|
| バリエーション | 5〜10 | Props ごとに 1 セクション + 組み合わせ + 状態 |
| 業務パターン | 5〜10 | 業務シナリオごとに 1 セクション |
| **合計** | **10〜20+** | 網羅的にやるなら 30+ |

### 5-3. ルート追加

`src/router/index.ts` にルートを追加する。

```typescript
{
  path: '/samples/pickup/{slug}',
  component: () => import('@/views/samples/pickup/{Name}Patterns.vue'),
},
```

---

## チェックリスト

新しいパターンページを作るときの確認項目。

- [ ] 公式カタログの全デモを確認したか
- [ ] Props を網羅したか（公式 API ページの Properties 表と照合）
- [ ] 組み合わせパターンを追加したか（fill × shape 等）
- [ ] 状態バリエーションを追加したか（disabled / error / loading）
- [ ] 業務フローから利用シーンを 5 つ以上洗い出したか
- [ ] 全パターンに日本語補足を書いたか
- [ ] `npm run build` でエラーがないか
- [ ] ブラウザで全セクションの動作を確認したか

---

## 例: 新しい部品「ion-toggle」を追加する場合

1. 公式カタログで toggle のデモを確認
   - `/samples/catalog/toggle/basic`
   - `/samples/catalog/toggle/theming-colors`
   - `/samples/catalog/toggle/label-placement`
   - ...

2. バリエーション洗い出し
   - Color (6色)
   - Justify (start/end/space-between)
   - Label Placement (start/end/fixed/stacked)
   - Disabled / Checked 状態
   - Helper & Error

3. 業務パターン洗い出し
   - 設定画面の ON/OFF トグルリスト
   - 通知設定（プッシュ/メール/SMS）
   - ダークモード切替
   - 機能の有効/無効切替

4. ファイル作成: `src/views/samples/pickup/TogglePatterns.vue`

5. ルート追加 + PickupIndex にカード追加

6. ビルド & 動作確認
