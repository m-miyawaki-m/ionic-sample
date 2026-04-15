# 画面パターンテンプレート リファレンス

6つの画面パターンテンプレートで使用している Ionic 部品・Vue 文法・CSS のクイックリファレンス。
コピペ改変時に「この属性は何？」「色を変えたい」などの参照用。

---

## 目次

**基本（パターンテンプレートで使用中）**

1. [ページ構造](#1-ページ構造)
2. [データ表示](#2-データ表示)
3. [入力部品](#3-入力部品)
4. [ボタン配置](#4-ボタン配置)
5. [色の変更](#5-色の変更)
6. [モーダル・ダイアログ](#6-モーダルダイアログ)
7. [ページ追加・遷移](#7-ページ追加遷移)
8. [アイコン](#8-アイコン)
9. [CSS パターン](#9-css-パターン)

**追加（業務アプリで必要になる部品・概念）**

10. [トースト通知](#10-トースト通知)
11. [ローディング表示](#11-ローディング表示)
12. [スワイプアクション](#12-スワイプアクション)
13. [アクションシート](#13-アクションシート)
14. [アコーディオン](#14-アコーディオン)
15. [グリッドレイアウト](#15-グリッドレイアウト)
16. [トグルスイッチ](#16-トグルスイッチ)
17. [チップ](#17-チップ)
18. [Ionic ライフサイクル](#18-ionic-ライフサイクル)
19. [無限スクロール](#19-無限スクロール)
20. [プルトゥリフレッシュ](#20-プルトゥリフレッシュ)
21. [FAB（フローティングアクションボタン）](#21-fabフローティングアクションボタン)
22. [フォームバリデーション表示](#22-フォームバリデーション表示)

---

## 1. ページ構造

### 基本骨格

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-menu-button slot="start" />   <!-- ハンバーガーメニュー -->
        <ion-title>画面名</ion-title>
      </ion-toolbar>
      <!-- 条件エリア（header内＝固定） -->
    </ion-header>

    <ion-content class="ion-padding">
      <!-- スクロールするコンテンツ -->
    </ion-content>

    <ion-footer>
      <ion-toolbar><!-- 画面ボタン --></ion-toolbar>
      <ion-toolbar><!-- ナビバー --></ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
```

| エリア | 部品 | スクロール |
|--------|------|-----------|
| ヘッダー | `ion-header` | 固定 |
| 条件エリア | `ion-header` 内の `div` | 固定 |
| コンテンツ | `ion-content` | スクロール |
| フッター | `ion-footer` | 固定 |

### 条件エリアの開閉

```vue
<div class="condition-area ion-padding-horizontal">
  <div class="condition-header">
    <span class="condition-title">検索条件</span>
    <div class="condition-buttons">
      <ion-button size="small" fill="solid" color="success" @click="isOpen = true">+</ion-button>
      <ion-button size="small" fill="solid" color="danger" @click="isOpen = false">−</ion-button>
    </div>
  </div>
  <div v-show="isOpen" class="condition-body">
    <!-- 入力フィールド群 -->
  </div>
</div>
```

```ts
const isOpen = ref(false);  // 初期は閉じた状態
```

- `v-show` — 表示/非表示を切り替え（DOM は残る、表示トグル向き）
- `v-if` — 条件が false なら DOM ごと消える（重い部品の遅延表示向き）

---

## 2. データ表示

### モックデータの定義

```ts
const items = ref([
  { id: 1, itemCode: 'BP-001', itemName: 'ボールペン', quantity: 150, status: 'OK' },
  { id: 2, itemCode: 'PP-A4', itemName: 'コピー用紙', quantity: 8, status: 'NG' },
]);
```

### リスト表示（ion-list + v-for）

```vue
<ion-list>
  <ion-item v-for="item in items" :key="item.id">
    <ion-label>
      <h3>{{ item.itemCode }} {{ item.itemName }}</h3>
      <p>数量: {{ item.quantity }}</p>
    </ion-label>
    <ion-badge slot="end" :color="item.status === 'OK' ? 'success' : 'danger'">
      {{ item.status }}
    </ion-badge>
  </ion-item>
</ion-list>
```

| 要素 | 説明 |
|------|------|
| `v-for="item in items"` | 配列をループして行を生成 |
| `:key="item.id"` | 各行のユニークキー（必須） |
| `{{ item.itemCode }}` | テンプレート内で値を表示 |
| `slot="end"` | 行の右端に配置 |

### カード表示（ion-card + v-for）

```vue
<ion-card v-for="item in items" :key="item.id"
          :class="{ 'card-ng': item.status === 'NG' }">
  <ion-card-header>
    <ion-card-subtitle>No.{{ item.id }}</ion-card-subtitle>
    <ion-card-title>{{ item.itemCode }} {{ item.itemName }}</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    <div class="card-grid">
      <div class="card-field"><span class="card-label">数量</span><span>{{ item.quantity }}</span></div>
      <div class="card-field"><span class="card-label">棚</span><span>{{ item.location }}</span></div>
    </div>
    <div class="card-actions">
      <ion-button fill="outline" size="small">詳細</ion-button>
      <ion-button fill="outline" size="small" color="danger">削除</ion-button>
    </div>
  </ion-card-content>
</ion-card>
```

### リスト/カード切替（ion-segment）

```vue
<ion-segment v-model="viewMode">
  <ion-segment-button value="list"><ion-label>リスト</ion-label></ion-segment-button>
  <ion-segment-button value="card"><ion-label>カード</ion-label></ion-segment-button>
</ion-segment>

<!-- 表示切替 -->
<ion-list v-if="viewMode === 'list'">...</ion-list>
<div v-if="viewMode === 'card'">...</div>
```

```ts
const viewMode = ref('list');
```

### 件数表示 + 検索後のみ表示

```vue
<div v-show="showResults" class="content-area">
  <p class="result-count">検索結果 {{ items.length }}件</p>
  <ion-list>...</ion-list>
</div>
```

```ts
const showResults = ref(false);
// 検索ボタンの @click で showResults = true にする
```

### 条件付き表示

```vue
<!-- ステータスに応じた色 -->
<ion-badge :color="item.status === 'OK' ? 'success' : 'danger'">{{ item.status }}</ion-badge>

<!-- 数値に応じた色 -->
<ion-note :color="item.quantity < 10 ? 'danger' : 'success'">{{ item.quantity }}</ion-note>

<!-- 条件でボタン表示/非表示 -->
<ion-button v-if="!item.inputComplete" fill="outline" size="small" color="warning">入力</ion-button>

<!-- 条件でクラス付与（赤い左ボーダー） -->
<div :class="{ 'row-ng': item.status === 'NG' }">...</div>
```

---

## 3. 入力部品

### テキスト入力（ion-input）

```vue
<ion-item>
  <ion-input label="品目コード" label-placement="stacked" placeholder="入力してください"
             v-model="form.itemCode" />
</ion-item>
```

| 属性 | 値 | 説明 |
|------|-----|------|
| `label` | `"品目コード"` | フィールドラベル |
| `label-placement` | `"stacked"` | ラベルを上に配置（業務アプリ標準） |
| `type` | `"number"`, `"date"` | 入力タイプ |
| `placeholder` | `"..."` | プレースホルダー |
| `v-model` | `form.field` | 双方向バインド |
| `:value` | `item.field` | 単方向バインド（インライン編集） |

### 検索アイコン付き入力

```vue
<ion-input label="品目コード" label-placement="stacked" v-model="form.itemCode">
  <ion-icon :icon="searchOutline" slot="end" @click="isItemModalOpen = true" />
</ion-input>
```

### プルダウン（ion-select）

```vue
<!-- 単一選択 -->
<ion-item>
  <ion-select label="倉庫" label-placement="stacked" placeholder="選択" v-model="form.warehouse">
    <ion-select-option value="tokyo">東京倉庫</ion-select-option>
    <ion-select-option value="osaka">大阪倉庫</ion-select-option>
  </ion-select>
</ion-item>

<!-- 複数選択 -->
<ion-select label="ステータス" :multiple="true" v-model="form.statuses">
  <ion-select-option value="ok">OK</ion-select-option>
  <ion-select-option value="ng">NG</ion-select-option>
</ion-select>

<!-- ポップオーバー表示（行内で使う場合） -->
<ion-select interface="popover" :value="item.category">...</ion-select>
```

### チェックボックス（ion-checkbox）

```vue
<ion-item>
  <ion-checkbox v-model="form.includeInactive">無効品を含む</ion-checkbox>
</ion-item>

<!-- リスト行内で使う場合 -->
<ion-checkbox v-model="item.checked" />
```

### ラジオボタン（ion-radio-group）

```vue
<ion-radio-group v-model="form.category">
  <ion-list-header><ion-label>区分</ion-label></ion-list-header>
  <ion-item><ion-radio value="normal">通常</ion-radio></ion-item>
  <ion-item><ion-radio value="urgent">緊急</ion-radio></ion-item>
  <ion-item><ion-radio value="return">返品</ion-radio></ion-item>
</ion-radio-group>
```

### 検索バー（ion-searchbar）

```vue
<ion-searchbar placeholder="品目コード/名称" v-model="searchText" />
```

### 日付選択（ion-datetime）

```vue
<!-- 日付入力フィールド -->
<ion-input label="登録日" label-placement="stacked" type="date" v-model="form.registeredDate" />

<!-- カレンダー表示（コンテンツ内） -->
<ion-datetime presentation="date" v-model="demo.selectedDate" />
```

### テキストエリア（ion-textarea）

```vue
<ion-item>
  <ion-textarea label="備考" label-placement="stacked" placeholder="備考を入力"
                v-model="item.remarks" :rows="3" />
</ion-item>
```

---

## 4. ボタン配置

### fill（塗りスタイル）

```vue
<ion-button fill="solid">塗りつぶし（デフォルト）</ion-button>
<ion-button fill="outline">枠線のみ</ion-button>
<ion-button fill="clear">テキストのみ</ion-button>
```

### size

```vue
<ion-button size="small">小さいボタン</ion-button>
<ion-button size="large">大きいボタン</ion-button>
<ion-button>標準サイズ</ion-button>
```

### expand

```vue
<ion-button expand="block">横幅いっぱい</ion-button>
```

### ツールバー内の配置（slot）

```vue
<ion-toolbar>
  <ion-buttons slot="start">
    <ion-button>左寄せボタン</ion-button>
  </ion-buttons>
  <ion-buttons slot="end">
    <ion-button>右寄せボタン</ion-button>
  </ion-buttons>
</ion-toolbar>
```

### フッター2段構成

```vue
<ion-footer>
  <!-- 上段: 画面固有ボタン + ページング -->
  <ion-toolbar class="screen-buttons">
    <ion-buttons slot="start">
      <ion-button fill="outline" color="primary">登録確定</ion-button>
      <ion-button fill="outline" color="medium">クリア</ion-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button fill="clear" size="small">先頭</ion-button>
      <ion-button fill="clear" size="small">前へ</ion-button>
      <ion-button fill="clear" size="small">次へ</ion-button>
    </ion-buttons>
  </ion-toolbar>

  <!-- 下段: ナビバー（ホーム/スキャン/印刷） -->
  <ion-toolbar class="nav-bar">
    <div class="nav-bar-inner">
      <button class="nav-bar-item" @click="$router.push('/home')">
        <ion-icon :icon="homeOutline" />
        <span>ホーム</span>
      </button>
      <button class="nav-bar-item">
        <ion-icon :icon="scanOutline" />
        <span>スキャン</span>
      </button>
      <button class="nav-bar-item">
        <ion-icon :icon="printOutline" />
        <span>印刷</span>
      </button>
    </div>
  </ion-toolbar>
</ion-footer>
```

> `ion-tab-bar` はタブルーティング必須でエラーになるため、CSS 製のナビバーを使用している。

---

## 5. 色の変更

### Ionic のカラーシステム

`color` 属性で指定。ボタン、バッジ、ノートなど多くの部品で共通。

| 色名 | 用途 | 見た目 |
|------|------|--------|
| `primary` | 主操作（検索、登録） | 青系 |
| `success` | 正常、OK | 緑系 |
| `danger` | エラー、NG、削除 | 赤系 |
| `warning` | 警告、未入力 | 黄系 |
| `medium` | 補助操作（クリア等） | グレー |
| `tertiary` | 副操作（スキャン等） | 紫系 |
| `dark` | 印刷など | 黒系 |

### 使い方

```vue
<!-- 固定色 -->
<ion-button color="primary">検索</ion-button>
<ion-button color="danger">削除</ion-button>
<ion-badge color="success">OK</ion-badge>

<!-- 条件で色を変える -->
<ion-badge :color="item.status === 'OK' ? 'success' : 'danger'">{{ item.status }}</ion-badge>
<ion-note :color="item.quantity < 10 ? 'danger' : 'success'">{{ item.quantity }}</ion-note>
```

### CSS 変数での色利用

```css
color: var(--ion-color-medium);        /* グレーテキスト */
color: var(--ion-color-primary);       /* 青テキスト */
background: var(--ion-color-light);    /* 薄いグレー背景 */
border-left: 3px solid var(--ion-color-danger);  /* 赤いアクセント線 */
```

---

## 6. モーダル・ダイアログ

### モーダル（ion-modal）

全項目表示や検索選択に使用。

```vue
<!-- テンプレート -->
<ion-modal :is-open="isModalOpen" @did-dismiss="isModalOpen = false">
  <ion-header>
    <ion-toolbar>
      <ion-title>品目検索</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="isModalOpen = false">閉じる</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-searchbar placeholder="検索" />
    <ion-list>
      <ion-item v-for="item in masterItems" :key="item.code" button @click="selectItem(item.code)">
        <ion-label>{{ item.code }} {{ item.name }}</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-modal>
```

```ts
const isModalOpen = ref(false);

// モーダルを開く
const openModal = () => { isModalOpen.value = true; };

// 選択して閉じる
const selectItem = (code: string) => {
  form.value.itemCode = code;
  isModalOpen.value = false;
};
```

### 確認ダイアログ（ion-alert）

```vue
<ion-alert
  :is-open="isAlertOpen"
  header="確認"
  message="この操作を実行しますか？"
  :buttons="['キャンセル', 'OK']"
  @did-dismiss="isAlertOpen = false"
/>
```

```ts
const isAlertOpen = ref(false);
// ボタン @click="isAlertOpen = true" で表示
```

---

## 7. ページ追加・遷移

### 新しいページを追加する手順

#### 1. Vue ファイルを作成

```
src/views/samples/pickup/NewPattern.vue
```

#### 2. ルートを追加（src/router/index.ts）

```ts
{
  path: '/pattern/new-pattern',
  component: () => import('@/views/samples/pickup/NewPattern.vue'),
},

// パラメータ付きルート（詳細ページ等）
{
  path: '/pattern/new-pattern/detail/:id',
  component: () => import('@/views/samples/pickup/NewPatternDetail.vue'),
},
```

#### 3. HomePageにリンクを追加（任意）

```vue
<ion-item router-link="/pattern/new-pattern" detail>
  <ion-icon :icon="someIcon" slot="start" />
  <ion-label>
    <h2>新しいパターン</h2>
    <p>説明テキスト</p>
  </ion-label>
</ion-item>
```

#### 4. サイドメニューに追加（App.vue）

```ts
const menuLinks = [
  // ...既存リンク
  { path: '/pattern/new-pattern', label: '新しいパターン', icon: someIcon },
];
```

### 遷移方法の使い分け

| 方法 | コード | 用途 |
|------|--------|------|
| 宣言的 | `router-link="/pattern/xxx"` | リストやボタンの静的リンク |
| 命令的 | `@click="$router.push('/home')"` | クリックハンドラ内 |
| 動的パス | `` :router-link="`/pattern/detail/${item.id}`" `` | パラメータ付き |
| 戻る | `<ion-back-button default-href="/pattern/detail-screen" />` | 詳細→一覧の戻る |

### サイドメニュー（App.vue で定義済み）

```vue
<!-- App.vue に定義。各ページは ion-menu-button だけで制御 -->
<ion-menu side="start" content-id="main-content">
  <ion-content>
    <ion-list>
      <ion-item button v-for="link in menuLinks" @click="navigateTo(link.path)">
        <ion-icon :icon="link.icon" slot="start" />
        <ion-label>{{ link.label }}</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-menu>
```

```ts
import { menuController } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = async (path: string) => {
  await menuController.close();  // メニューを閉じてから
  router.push(path);             // 遷移
};
```

> `router-link` と `menuController.close()` を同時に使うと競合するため、`router.push()` で遷移する。

---

## 8. アイコン

### import と使い方

```ts
import { searchOutline, scanOutline, homeOutline, printOutline } from 'ionicons/icons';
```

```vue
<ion-icon :icon="searchOutline" />             <!-- 単体表示 -->
<ion-icon :icon="scanOutline" slot="start" />  <!-- ボタン・アイテム内 -->
```

### テンプレートで使用中のアイコン

| アイコン | 用途 |
|---------|------|
| `searchOutline` | 検索フィールド、検索ボタン |
| `scanOutline` | スキャンボタン |
| `homeOutline` | ホームボタン |
| `printOutline` | 印刷ボタン |
| `createOutline` | 編集アイコン |
| `layersOutline` | 蓄積型アイコン |
| `constructOutline` | 入力補助アイコン |
| `documentTextOutline` | 詳細表示アイコン |

> 全アイコン `*Outline` バリアントで統一。一覧は `/samples/ionicons` で確認可能。

---

## 9. CSS パターン

### Ionic ユーティリティクラス

```vue
<ion-content class="ion-padding">           <!-- 全方向パディング -->
<div class="ion-padding-horizontal">        <!-- 左右パディング -->
<ion-button class="ion-margin-top">         <!-- 上マージン -->
```

### 条件エリアのスタイル

```css
.condition-area {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 16px;
}
.condition-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
}
.condition-title {
  font-weight: 600;
  font-size: 16px;
}
```

### カードのグリッドレイアウト

```css
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* 2列均等 */
  gap: 4px;
}
```

### インライン編集行

```css
.edit-row {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 10px;
}
.row-ng {
  border-left: 3px solid var(--ion-color-danger);  /* NG行に赤線 */
}
.row-fields {
  display: flex;
  gap: 8px;
}
.field-pair {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

### ナビバー（タブバー風）

```css
.nav-bar {
  --background: var(--ion-color-light);
  --border-width: 1px 0 0 0;
}
.nav-bar-inner {
  display: flex;
  justify-content: space-around;
  padding: 4px 0;
}
.nav-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  color: var(--ion-color-medium);
  font-size: 11px;
  padding: 4px 16px;
  cursor: pointer;
}
.nav-bar-item ion-icon {
  font-size: 22px;
}
```

### ツールバーのカスタマイズ

```css
.screen-buttons {
  --border-width: 1px 0 0 0;   /* 上線のみ */
}
```

> `--` プレフィックスの CSS 変数は Ionic 部品の内部スタイルを上書きする方法。
> 通常の CSS プロパティ (`background`, `color` 等) とは別に、各 Ionic 部品が独自の CSS 変数を持っている。

---

## 10. トースト通知

操作結果のフィードバック（登録成功、エラー等）に使う。

```vue
<template>
  <ion-button @click="showToast">登録</ion-button>
</template>

<script setup lang="ts">
import { toastController } from '@ionic/vue';

const showToast = async () => {
  const toast = await toastController.create({
    message: '登録が完了しました',
    duration: 2000,           // 2秒で自動消去
    position: 'bottom',       // top | middle | bottom
    color: 'success',         // success / danger / warning
  });
  await toast.present();
};
</script>
```

| オプション | 値 | 説明 |
|-----------|-----|------|
| `message` | 文字列 | 表示テキスト |
| `duration` | ミリ秒 | 自動消去までの時間（0で手動閉じ） |
| `position` | `'top'` `'middle'` `'bottom'` | 表示位置 |
| `color` | `'success'` `'danger'` 等 | 背景色 |
| `buttons` | 配列 | 閉じるボタン等を追加可能 |

### 閉じるボタン付きトースト

```ts
const toast = await toastController.create({
  message: 'エラーが発生しました',
  color: 'danger',
  duration: 0,              // 手動で閉じるまで表示
  buttons: [
    { text: '閉じる', role: 'cancel' }
  ],
});
```

---

## 11. ローディング表示

API 通信中やデータ検索中にスピナーを表示する。

### 方法1: loadingController（全画面オーバーレイ）

```ts
import { loadingController } from '@ionic/vue';

const search = async () => {
  const loading = await loadingController.create({
    message: '検索中...',
    spinner: 'crescent',     // crescent | dots | circular 等
  });
  await loading.present();

  // データ取得処理...

  await loading.dismiss();   // 完了後に閉じる
};
```

### 方法2: ion-spinner（インライン表示）

```vue
<ion-spinner v-if="isLoading" name="crescent" />
<ion-list v-else>
  <!-- 結果表示 -->
</ion-list>
```

```ts
const isLoading = ref(false);

const search = async () => {
  isLoading.value = true;
  // データ取得処理...
  isLoading.value = false;
};
```

| スピナー名 | 見た目 |
|-----------|--------|
| `crescent` | 三日月回転（iOS風） |
| `dots` | 3点点滅 |
| `circular` | 円回転（Material風） |
| `lines` | 線放射 |

---

## 12. スワイプアクション

リスト行を横スワイプして削除・編集ボタンを表示する。

```vue
<ion-list>
  <ion-item-sliding v-for="item in items" :key="item.id">
    <!-- メイン行 -->
    <ion-item>
      <ion-label>{{ item.itemCode }} {{ item.itemName }}</ion-label>
    </ion-item>

    <!-- 右スワイプで出るボタン -->
    <ion-item-options side="end">
      <ion-item-option color="primary" @click="editItem(item)">
        <ion-icon :icon="createOutline" slot="icon-only" />
      </ion-item-option>
      <ion-item-option color="danger" @click="deleteItem(item)">
        <ion-icon :icon="trashOutline" slot="icon-only" />
      </ion-item-option>
    </ion-item-options>

    <!-- 左スワイプで出るボタン（任意） -->
    <ion-item-options side="start">
      <ion-item-option color="success" @click="markDone(item)">完了</ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</ion-list>
```

| 属性 | 値 | 説明 |
|------|-----|------|
| `side` | `"end"` | 右スワイプ（←方向にドラッグ） |
| `side` | `"start"` | 左スワイプ（→方向にドラッグ） |
| `expandable` | (属性) | スワイプしきると自動実行 |

---

## 13. アクションシート

画面下部からスライドアップするメニュー。「...」ボタンや長押しの選択肢に使う。

```ts
import { actionSheetController } from '@ionic/vue';

const showActions = async () => {
  const actionSheet = await actionSheetController.create({
    header: '操作を選択',
    buttons: [
      { text: '編集',   icon: createOutline,  handler: () => { /* 編集処理 */ } },
      { text: 'コピー', icon: copyOutline,    handler: () => { /* コピー処理 */ } },
      { text: '削除',   icon: trashOutline,   role: 'destructive', handler: () => { /* 削除処理 */ } },
      { text: 'キャンセル', role: 'cancel' },
    ],
  });
  await actionSheet.present();
};
```

| ボタンの role | 効果 |
|-------------|------|
| `'destructive'` | 赤色で表示（削除等の危険操作） |
| `'cancel'` | 一番下に分離表示 |
| なし | 通常表示 |

---

## 14. アコーディオン

セクションの折りたたみ/展開。条件エリアの `v-show` 自作よりも Ionic ネイティブの見た目が得られる。

```vue
<ion-accordion-group>
  <ion-accordion value="detail">
    <ion-item slot="header" color="light">
      <ion-label>詳細情報</ion-label>
    </ion-item>
    <div slot="content" class="ion-padding">
      <p>ここに折りたたみコンテンツ</p>
      <ion-list>
        <ion-item><ion-input label="備考" label-placement="stacked" /></ion-item>
      </ion-list>
    </div>
  </ion-accordion>

  <ion-accordion value="history">
    <ion-item slot="header" color="light">
      <ion-label>履歴</ion-label>
    </ion-item>
    <div slot="content" class="ion-padding">
      <p>履歴コンテンツ</p>
    </div>
  </ion-accordion>
</ion-accordion-group>
```

| 属性 | 説明 |
|------|------|
| `value` | 開閉を識別するキー |
| `slot="header"` | クリックで開閉するヘッダー |
| `slot="content"` | 折りたたまれる中身 |
| `multiple` | `ion-accordion-group` に付けると複数同時展開可能 |

---

## 15. グリッドレイアウト

フォームやカードの2列・3列配置に使う。

```vue
<ion-grid>
  <ion-row>
    <ion-col size="6">
      <ion-item>
        <ion-input label="品目コード" label-placement="stacked" />
      </ion-item>
    </ion-col>
    <ion-col size="6">
      <ion-item>
        <ion-input label="ロケーション" label-placement="stacked" />
      </ion-item>
    </ion-col>
  </ion-row>
  <ion-row>
    <ion-col size="12">
      <ion-item>
        <ion-input label="備考" label-placement="stacked" />
      </ion-item>
    </ion-col>
  </ion-row>
</ion-grid>
```

### size 一覧（12カラムグリッド）

| size | 幅 | 用途 |
|------|-----|------|
| `"12"` | 100% | 全幅（1列） |
| `"6"` | 50% | 2列均等 |
| `"4"` | 33% | 3列均等 |
| `"3"` | 25% | 4列均等 |
| `"8"` + `"4"` | 66% + 33% | メイン + サブ |

### レスポンシブ対応

```vue
<!-- スマホ1列、タブレット2列 -->
<ion-col size="12" size-md="6">...</ion-col>
```

| 属性 | ブレークポイント |
|------|----------------|
| `size` | 全サイズ共通 |
| `size-sm` | 576px 以上 |
| `size-md` | 768px 以上 |
| `size-lg` | 992px 以上 |

---

## 16. トグルスイッチ

ON/OFF の切り替え。設定画面やフィルタに使う。

```vue
<ion-item>
  <ion-toggle v-model="settings.notifications">通知を受け取る</ion-toggle>
</ion-item>

<ion-item>
  <ion-toggle v-model="settings.darkMode" color="dark">ダークモード</ion-toggle>
</ion-item>

<!-- 無効状態 -->
<ion-item>
  <ion-toggle :disabled="true">変更不可</ion-toggle>
</ion-item>
```

### checkbox vs toggle の使い分け

| 部品 | 用途 |
|------|------|
| `ion-checkbox` | 複数項目の選択（チェックリスト） |
| `ion-toggle` | 単一の ON/OFF 切り替え（設定） |

---

## 17. チップ

タグやフィルタ条件の表示に使う。

```vue
<!-- 基本 -->
<ion-chip>
  <ion-label>タグ名</ion-label>
</ion-chip>

<!-- 色付き -->
<ion-chip color="success">
  <ion-icon :icon="checkmarkOutline" />
  <ion-label>完了</ion-label>
</ion-chip>

<!-- 閉じるボタン付き（フィルタ解除） -->
<ion-chip @click="removeFilter('tokyo')">
  <ion-label>東京倉庫</ion-label>
  <ion-icon :icon="closeCircleOutline" />
</ion-chip>

<!-- 選択フィルタ（複数チップの並び） -->
<div style="display:flex;flex-wrap:wrap;gap:4px;">
  <ion-chip v-for="tag in tags" :key="tag.value"
            :color="tag.selected ? 'primary' : 'medium'"
            @click="tag.selected = !tag.selected">
    <ion-label>{{ tag.label }}</ion-label>
  </ion-chip>
</div>
```

---

## 18. Ionic ライフサイクル

Vue の `onMounted` だけでなく、Ionic 固有のライフサイクルがある。
ページ遷移時のデータ再取得に重要。

```ts
import { onIonViewWillEnter, onIonViewDidEnter, onIonViewWillLeave } from '@ionic/vue';

// ページが表示される直前（毎回呼ばれる）
onIonViewWillEnter(() => {
  // データの再取得、リストのリフレッシュ
  loadItems();
});

// ページが表示された後
onIonViewDidEnter(() => {
  // フォーカス設定等
});

// ページから離れる直前
onIonViewWillLeave(() => {
  // クリーンアップ処理
});
```

### Vue ライフサイクルとの違い

| フック | いつ呼ばれる | 用途 |
|--------|------------|------|
| `onMounted` | 初回マウント時のみ | 初期化処理 |
| `onIonViewWillEnter` | **表示のたびに毎回** | データ再取得 |
| `onIonViewDidEnter` | 表示アニメーション完了後 | フォーカス設定 |
| `onIonViewWillLeave` | 離脱直前 | 保存確認、クリーンアップ |

> Ionic はページをキャッシュするため、戻るボタンで戻ったとき `onMounted` は呼ばれない。
> データの再取得には `onIonViewWillEnter` を使うこと。

---

## 19. 無限スクロール

大量データを段階的に読み込む。

```vue
<ion-content>
  <ion-list>
    <ion-item v-for="item in displayedItems" :key="item.id">
      <ion-label>{{ item.itemName }}</ion-label>
    </ion-item>
  </ion-list>

  <ion-infinite-scroll @ionInfinite="loadMore" threshold="100px">
    <ion-infinite-scroll-content loading-spinner="crescent" loading-text="読み込み中..." />
  </ion-infinite-scroll>
</ion-content>
```

```ts
const displayedItems = ref(items.value.slice(0, 20));  // 最初は20件

const loadMore = (ev: CustomEvent) => {
  const current = displayedItems.value.length;
  const next = items.value.slice(current, current + 20);
  displayedItems.value.push(...next);

  // すべて読み込んだら無限スクロールを無効化
  if (displayedItems.value.length >= items.value.length) {
    (ev.target as HTMLIonInfiniteScrollElement).disabled = true;
  }
  (ev.target as HTMLIonInfiniteScrollElement).complete();
};
```

---

## 20. プルトゥリフレッシュ

リストを引き下げてデータを再読み込み。

```vue
<ion-content>
  <ion-refresher slot="fixed" @ionRefresh="doRefresh">
    <ion-refresher-content pulling-text="引き下げて更新" refreshing-spinner="crescent" />
  </ion-refresher>

  <ion-list>
    <!-- リスト内容 -->
  </ion-list>
</ion-content>
```

```ts
const doRefresh = (ev: CustomEvent) => {
  // データ再取得処理...
  // 完了したらスピナーを閉じる
  (ev.target as HTMLIonRefresherElement).complete();
};
```

---

## 21. FAB（フローティングアクションボタン）

画面右下に浮遊するボタン。主操作（追加、スキャン等）に使う。

```vue
<ion-content>
  <!-- コンテンツ -->

  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button>
      <ion-icon :icon="addOutline" />
    </ion-fab-button>
  </ion-fab>
</ion-content>
```

### 複数ボタン展開

```vue
<ion-fab slot="fixed" vertical="bottom" horizontal="end">
  <ion-fab-button>
    <ion-icon :icon="addOutline" />
  </ion-fab-button>
  <ion-fab-list side="top">
    <ion-fab-button color="primary"><ion-icon :icon="scanOutline" /></ion-fab-button>
    <ion-fab-button color="success"><ion-icon :icon="createOutline" /></ion-fab-button>
  </ion-fab-list>
</ion-fab>
```

| 属性 | 値 | 説明 |
|------|-----|------|
| `vertical` | `"bottom"` `"top"` `"center"` | 縦位置 |
| `horizontal` | `"end"` `"start"` `"center"` | 横位置 |
| `side` | `"top"` `"bottom"` `"start"` `"end"` | 展開方向 |

---

## 22. フォームバリデーション表示

入力エラーの表示パターン。Ionic には組み込みバリデーションはないため、自前で制御する。

```vue
<ion-item :class="{ 'ion-invalid ion-touched': errors.itemCode }">
  <ion-input label="品目コード" label-placement="stacked"
             v-model="form.itemCode" required />
  <ion-note slot="error">品目コードは必須です</ion-note>
</ion-item>

<ion-item :class="{ 'ion-invalid ion-touched': errors.quantity }">
  <ion-input label="数量" label-placement="stacked" type="number"
             v-model="form.quantity" />
  <ion-note slot="error">数量は1以上を入力してください</ion-note>
</ion-item>
```

```ts
const errors = ref({
  itemCode: false,
  quantity: false,
});

const validate = () => {
  errors.value.itemCode = !form.value.itemCode;
  errors.value.quantity = Number(form.value.quantity) < 1;
  return !errors.value.itemCode && !errors.value.quantity;
};
```

| クラス | 効果 |
|--------|------|
| `ion-invalid` | エラー状態（赤い下線） |
| `ion-touched` | 一度触れた状態（エラー表示の条件） |
| `ion-valid` | 正常状態（緑の下線） |

> `slot="error"` の `ion-note` は `ion-invalid` + `ion-touched` のときだけ表示される。
