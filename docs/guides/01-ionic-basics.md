# Ionic 基礎ガイド -- 倉庫管理アプリ向け

このガイドは、Vue/TypeScript の経験がある開発者が Ionic を素早く理解するためのリファレンスです。
本プロジェクト（倉庫在庫管理アプリ）で実際に使うコンポーネントとパターンに絞って解説します。

---

## 目次

1. [Ionic とは何か](#1-ionic-とは何か)
2. [ページ構造コンポーネント](#2-ページ構造コンポーネント)
3. [リスト・データ表示](#3-リストデータ表示)
4. [フォーム入力](#4-フォーム入力)
5. [ボタン・アイコン・チップ](#5-ボタンアイコンチップ)
6. [カード](#6-カード)
7. [フィードバック・オーバーレイ](#7-フィードバックオーバーレイ)
8. [グリッドレイアウト](#8-グリッドレイアウト)
9. [進捗・ローディング](#9-進捗ローディング)
10. [ナビゲーション](#10-ナビゲーション)
11. [テーマ・スタイリング](#11-テーマスタイリング)
12. [Ionic ライフサイクル](#12-ionic-ライフサイクル)

---

## 1. Ionic とは何か

Ionic は **Web 技術（HTML/CSS/JavaScript）でネイティブ品質のモバイルアプリを作る** UI フレームワークです。

```
Vue 3 + TypeScript    ← アプリロジック
Ionic Vue             ← UI コンポーネント（ネイティブ風の見た目）
Capacitor             ← ネイティブ機能へのブリッジ（カメラ、Bluetooth 等）
Android / iOS         ← 実機で動作
```

このプロジェクトの技術スタック:

| 層 | 技術 | バージョン |
|---|---|---|
| フレームワーク | Vue 3 (Composition API) | ^3.3.0 |
| UI ライブラリ | @ionic/vue | ^8.0.0 |
| ルーティング | @ionic/vue-router | ^8.0.0 |
| ネイティブ | Capacitor | 8.3.0 |
| 言語 | TypeScript | ~5.9.0 |
| ビルド | Vite | ^5.0.0 |

**重要な前提**: Ionic コンポーネントは `@ionic/vue` から個別にインポートして使います。Vue の通常のコンポーネントと同じ感覚で使えます。

```typescript
// main.ts -- IonicVue プラグインを登録するだけ
import { IonicVue } from '@ionic/vue';

const app = createApp(App)
  .use(IonicVue)
  .use(router);
```

---

## 2. ページ構造コンポーネント

すべてのページは `IonPage > IonHeader + IonContent` という構造を持ちます。
本プロジェクトでは `PageLayout` コンポーネントでこの構造を共通化しています。

### IonPage

全画面の最上位ラッパー。**すべてのビューで必須**。これがないとナビゲーションのトランジションが正しく動きません。

### IonHeader / IonToolbar / IonTitle

ページ上部のヘッダー領域です。

### IonContent

スクロール可能なメインコンテンツ領域です。

### IonButtons / IonBackButton

ツールバー内にボタンを配置するコンテナと、戻るボタンです。

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- 左端に戻るボタン -->
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>

        <ion-title>入荷検品</ion-title>

        <!-- 右端にアクションボタン -->
        <ion-buttons slot="end">
          <ion-button @click="doSomething">
            <ion-icon slot="icon-only" :icon="settingsOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- ページの中身 -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButtons, IonBackButton, IonButton, IonIcon,
} from '@ionic/vue';
import { settingsOutline } from 'ionicons/icons';
</script>
```

**本プロジェクトでの使い方**: 各ページで直接書く代わりに `PageLayout` コンポーネントを使います。

```vue
<template>
  <PageLayout title="入荷検品" :menu-items="menuItems" @menu-select="onMenuSelect">
    <!-- ページ固有の内容だけ書く -->
  </PageLayout>
</template>
```

> `PageLayout` は内部で `IonPage > IonHeader > IonToolbar + IonContent` を構成し、
> `backHref` で戻るボタン、`menuItems` で右上のポップオーバーメニューを制御します。

---

## 3. リスト・データ表示

### IonList / IonItem / IonLabel / IonNote

データの一覧表示に使います。Ionic で最も頻繁に使うコンポーネント群です。

```vue
<template>
  <!-- 基本的なリスト -->
  <ion-list>
    <ion-item v-for="item in items" :key="item.id">
      <ion-label>
        <h2>{{ item.title }}</h2>
        <p>{{ item.subtitle }}</p>
      </ion-label>
      <ion-note slot="end">{{ item.note }}</ion-note>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonNote } from '@ionic/vue';
</script>
```

**IonItem の主要な属性**:

| 属性 | 説明 | 例 |
|---|---|---|
| `button` | タップ可能にする（リップルエフェクト付き） | `<ion-item button>` |
| `detail` | 右端に矢印を表示 | `<ion-item detail>` |
| `lines` | 区切り線の制御 | `lines="none"` / `lines="full"` |
| `router-link` | ページ遷移先 | `:router-link="'/receiving'"` |

**slot の位置**:

```vue
<ion-item>
  <ion-icon :icon="someIcon" slot="start" />   <!-- 左端 -->
  <ion-label>メインテキスト</ion-label>          <!-- 中央 -->
  <ion-note slot="end">補足</ion-note>          <!-- 右端 -->
</ion-item>
```

**本プロジェクトの実例** -- ホーム画面のメニュー:

```vue
<ion-list>
  <ion-item
    v-for="menu in menus"
    :key="menu.path"
    :router-link="menu.path"
    detail
  >
    <ion-icon :icon="menu.icon" slot="start" />
    <ion-label>
      <h2>{{ menu.title }}</h2>
      <p>{{ menu.description }}</p>
    </ion-label>
  </ion-item>
</ion-list>
```

---

## 4. フォーム入力

### IonInput

テキスト・数値入力フィールドです。Vue の `v-model` の代わりに `:value` + `@ion-input` で双方向バインディングします。

```vue
<template>
  <ion-item>
    <ion-input
      :value="code"
      label="品目コード"
      label-placement="stacked"
      placeholder="スキャンまたは入力"
      @ion-input="code = ($event.target as HTMLInputElement).value"
    />
  </ion-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonItem, IonInput } from '@ionic/vue';

const code = ref('');
</script>
```

**label-placement の値**:

- `stacked` -- ラベルが入力欄の上に表示（本プロジェクトで採用）
- `floating` -- 入力時にラベルが上に浮く
- `fixed` -- ラベルが左に固定

**type の値**: `"text"` (デフォルト), `"number"`, `"email"`, `"password"`, `"tel"` 等

> **注意**: Ionic の入力コンポーネントは `@ion-input` イベントを使います（Vue の `@input` ではなく）。
> フォーカスイベントも `@ion-focus` / `@ion-blur` です。

### IonSelect

ドロップダウン選択です。本プロジェクトでは代わりに `SelectPopup`（IonModal ベース）を使っていますが、
簡単な選択には IonSelect も有効です。

```vue
<template>
  <ion-item>
    <ion-select
      label="倉庫"
      label-placement="stacked"
      placeholder="選択してください"
      :value="warehouse"
      @ion-change="warehouse = $event.detail.value"
    >
      <ion-select-option value="A">倉庫A</ion-select-option>
      <ion-select-option value="B">倉庫B</ion-select-option>
      <ion-select-option value="C">倉庫C</ion-select-option>
    </ion-select>
  </ion-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonItem, IonSelect, IonSelectOption } from '@ionic/vue';

const warehouse = ref('');
</script>
```

### IonToggle / IonCheckbox

ON/OFF の切り替えとチェックボックスです。

```vue
<template>
  <ion-list>
    <ion-item>
      <ion-toggle :checked="autoScan" @ion-change="autoScan = $event.detail.checked">
        自動スキャン
      </ion-toggle>
    </ion-item>
    <ion-item>
      <ion-checkbox :checked="confirmed" @ion-change="confirmed = $event.detail.checked">
        確認済み
      </ion-checkbox>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonList, IonItem, IonToggle, IonCheckbox } from '@ionic/vue';

const autoScan = ref(false);
const confirmed = ref(false);
</script>
```

---

## 5. ボタン・アイコン・チップ

### IonButton

```vue
<template>
  <div class="ion-padding">
    <!-- 基本ボタン -->
    <ion-button @click="submit">登録</ion-button>

    <!-- 横幅いっぱい -->
    <ion-button expand="block" @click="submit">登録</ion-button>

    <!-- アウトライン -->
    <ion-button expand="block" fill="outline" @click="cancel">キャンセル</ion-button>

    <!-- 透明（ツールバー用） -->
    <ion-button fill="clear">
      <ion-icon slot="icon-only" :icon="menuOutline" />
    </ion-button>

    <!-- 色の指定 -->
    <ion-button color="danger">削除</ion-button>
    <ion-button color="success">完了</ion-button>

    <!-- サイズ -->
    <ion-button size="large" expand="block">大きなボタン</ion-button>

    <!-- アイコン付き -->
    <ion-button :router-link="'/receiving'">
      <ion-icon :icon="downloadOutline" slot="start" />
      入荷検品
    </ion-button>

    <!-- 無効化 & ローディング -->
    <ion-button :disabled="loading" expand="block">
      <ion-spinner v-if="loading" name="crescent" slot="start" />
      {{ loading ? '送信中...' : '登録' }}
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonIcon, IonSpinner } from '@ionic/vue';
import { menuOutline, downloadOutline } from 'ionicons/icons';

const loading = ref(false);
</script>
```

**expand**: `"block"`（親幅いっぱい）/ `"full"`（角丸なし全幅）

**fill**: `"solid"`（デフォルト）/ `"outline"` / `"clear"`

**color**: `"primary"` / `"secondary"` / `"success"` / `"warning"` / `"danger"` / `"medium"` / `"light"` / `"dark"`

### IonIcon

Ionicons ライブラリからアイコンを使います。

```vue
<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { scanOutline, searchOutline, bluetoothOutline } from 'ionicons/icons';
</script>

<template>
  <ion-icon :icon="scanOutline" />
  <ion-icon :icon="scanOutline" size="large" color="primary" />
</template>
```

アイコン一覧: https://ionic.io/ionicons

**本プロジェクトで使っているアイコン**:

| アイコン | 用途 |
|---|---|
| `downloadOutline` | 入荷検品 |
| `pushOutline` | 出荷検品 |
| `clipboardOutline` | 棚卸し |
| `searchOutline` | 在庫照会 / 検索ボタン |
| `swapHorizontalOutline` | ロケーション移動 |
| `scanOutline` | スキャンボタン |
| `menuOutline` | メニューボタン |
| `bluetoothOutline` | スキャナ接続状態 |
| `moonOutline` / `sunnyOutline` | ダークモード切替 |
| `checkmarkOutline` | 選択済みマーク |

### IonChip

ステータスバッジとして使います。本プロジェクトでは `ScannerStatus` コンポーネントで使用。

```vue
<template>
  <ion-chip color="success">
    <ion-icon :icon="bluetoothOutline" />
    <ion-label>スキャナ: 接続中</ion-label>
  </ion-chip>

  <ion-chip color="danger">
    <ion-icon :icon="closeCircleOutline" />
    <ion-label>スキャナ: 未接続</ion-label>
  </ion-chip>
</template>

<script setup lang="ts">
import { IonChip, IonIcon, IonLabel } from '@ionic/vue';
import { bluetoothOutline, closeCircleOutline } from 'ionicons/icons';
</script>
```

---

## 6. カード

### IonCard / IonCardHeader / IonCardContent

フォームのグループ分けや検索結果の表示に使います。

```vue
<template>
  <!-- 情報表示カード -->
  <ion-card>
    <ion-card-header>
      <ion-card-title>防寒手袋</ion-card-title>
      <ion-card-subtitle>ITEM-001</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-list lines="none">
        <ion-item>
          <ion-label>ロケーション</ion-label>
          <ion-note slot="end">A-01-01</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>在庫数</ion-label>
          <ion-note slot="end">150</ion-note>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>

  <!-- フォームグループ化カード -->
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>スキャン項目</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-list lines="none">
        <!-- ScanInput などのフォーム要素 -->
      </ion-list>
    </ion-card-content>
  </ion-card>

  <!-- タップ可能なカード（ホーム画面のグリッド） -->
  <ion-card button :router-link="'/receiving'">
    <ion-card-content class="ion-text-center">
      <ion-icon :icon="downloadOutline" size="large" color="primary" />
      <h3>入荷検品</h3>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonList, IonItem, IonLabel, IonNote, IonIcon,
} from '@ionic/vue';
import { downloadOutline } from 'ionicons/icons';
</script>
```

---

## 7. フィードバック・オーバーレイ

ユーザーへの通知やモーダル表示に使うコンポーネント群です。

### IonToast

一時的なメッセージ通知です。画面下部に表示されて自動的に消えます。

```vue
<template>
  <ion-toast
    :is-open="!!message"
    :message="message"
    :color="color"
    :duration="3000"
    @did-dismiss="message = ''"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonToast } from '@ionic/vue';

const message = ref('');
const color = ref('success');

// 使い方:
// message.value = '登録しました';     color.value = 'success';
// message.value = '登録に失敗しました'; color.value = 'danger';
</script>
```

> 本プロジェクトでは `FeedbackToast` コンポーネントとして共通化しています。

### IonAlert

確認ダイアログです。ユーザーに判断を求めるときに使います。

```vue
<template>
  <ion-alert
    :is-open="showAlert"
    header="確認"
    message="この操作を取り消せません。実行しますか？"
    :buttons="alertButtons"
    @did-dismiss="showAlert = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonAlert } from '@ionic/vue';

const showAlert = ref(false);

const alertButtons = [
  { text: 'キャンセル', role: 'cancel' },
  { text: '実行', handler: () => { /* 処理 */ } },
];
</script>
```

### IonLoading

全画面のローディングオーバーレイです。API 通信中などに画面操作をブロックします。

```vue
<template>
  <ion-loading
    :is-open="loading"
    message="通信中..."
    :duration="0"
    spinner="crescent"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonLoading } from '@ionic/vue';

const loading = ref(false);
</script>
```

> `spinner` の種類: `"crescent"`, `"dots"`, `"circles"`, `"bubbles"`, `"lines"` 等
>
> 本プロジェクトでは `LoadingOverlay` コンポーネントとして共通化しています。

### IonModal

全画面または部分的なモーダルです。本プロジェクトでは `SelectPopup` で選択 UI として使用。

```vue
<template>
  <ion-modal :is-open="isOpen" @did-dismiss="emit('close')">
    <ion-header>
      <ion-toolbar>
        <ion-title>選択してください</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="emit('close')">閉じる</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="option in options" :key="option.value" button @click="select(option)">
          <ion-label>{{ option.label }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonModal, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonButton, IonContent, IonList, IonItem, IonLabel,
} from '@ionic/vue';
</script>
```

**シートモーダル（下からスライド）**:

```vue
<!-- breakpoints を指定するとボトムシートになる -->
<ion-modal
  :is-open="showSideMenu"
  :initial-breakpoint="1"
  :breakpoints="[0, 1]"
  @did-dismiss="showSideMenu = false"
>
  <!-- 内容 -->
</ion-modal>
```

### IonPopover

要素に紐づく小さなポップアップです。本プロジェクトでは `ActionMenu` で使用。

```vue
<template>
  <ion-button fill="clear" @click="openPopover">
    <ion-icon slot="icon-only" :icon="menuOutline" />
  </ion-button>

  <ion-popover
    :is-open="isOpen"
    :event="popoverEvent"
    @did-dismiss="isOpen = false"
  >
    <ion-content>
      <ion-list lines="none">
        <ion-item v-for="item in items" :key="item.action" button @click="select(item)">
          <ion-label>{{ item.label }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonIcon, IonPopover, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';
import { menuOutline } from 'ionicons/icons';

const isOpen = ref(false);
const popoverEvent = ref<Event | null>(null);

// ポイント: :event にクリックイベントを渡すと、ボタンの近くに表示される
const openPopover = (e: Event) => {
  popoverEvent.value = e;
  isOpen.value = true;
};
</script>
```

### IonActionSheet

画面下部からスライドするアクションリストです。

```vue
<template>
  <ion-button @click="showSheet = true">スキャンモード選択</ion-button>

  <ion-action-sheet
    :is-open="showSheet"
    header="スキャンモード選択"
    :buttons="sheetButtons"
    @did-dismiss="showSheet = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonActionSheet } from '@ionic/vue';

const showSheet = ref(false);

const sheetButtons = [
  { text: 'QRコード読み取り', handler: () => { /* 処理 */ } },
  { text: 'バーコード読み取り', handler: () => { /* 処理 */ } },
  { text: 'キャンセル', role: 'cancel' as const },
];
</script>
```

**オーバーレイの使い分け（本プロジェクトの方針）**:

| コンポーネント | 用途 | 本プロジェクトでの使用 |
|---|---|---|
| IonToast | 成功/エラーの一時通知 | `FeedbackToast` として全画面共通 |
| IonAlert | 確認ダイアログ | 削除確認等（必要時） |
| IonLoading | 通信中のブロッキング | `LoadingOverlay` として共通化 |
| IonModal | 全画面/シートの入力UI | `SelectPopup` で選択肢表示 |
| IonPopover | ボタン近くの小メニュー | `ActionMenu` で右上メニュー（**採用**） |
| IonActionSheet | 下からのアクション選択 | ComponentsPage でデモ |

---

## 8. グリッドレイアウト

### IonGrid / IonRow / IonCol

12カラムのレスポンシブグリッドです。ホーム画面のカード型メニューで使用。

```vue
<template>
  <ion-grid>
    <ion-row>
      <!-- size="6" → 12カラム中6カラム分 = 2列 -->
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
</template>

<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonIcon } from '@ionic/vue';
</script>
```

**size の値**: `"1"` ~ `"12"`。`"6"` で2列、`"4"` で3列、`"3"` で4列。

レスポンシブ対応: `size-sm`, `size-md`, `size-lg`, `size-xl` でブレークポイントごとに変更可能。

---

## 9. 進捗・ローディング

### IonSpinner

インラインのローディングインジケーターです。

```vue
<template>
  <!-- ボタン内で使用 -->
  <ion-button :disabled="loading">
    <ion-spinner v-if="loading" name="crescent" slot="start" />
    {{ loading ? '送信中...' : '登録' }}
  </ion-button>

  <!-- 単独で使用 -->
  <ion-spinner v-if="loading" name="crescent" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonSpinner } from '@ionic/vue';

const loading = ref(false);
</script>
```

### IonProgressBar

ステッパー型レイアウトの進捗表示に使用しています。

```vue
<template>
  <!-- 確定的な進捗（ステッパー） -->
  <ion-progress-bar :value="(currentStep + 1) / totalSteps" />

  <!-- 不確定な進捗（API通信中） -->
  <ion-progress-bar type="indeterminate" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonProgressBar } from '@ionic/vue';

const currentStep = ref(0);
const totalSteps = 4;
</script>
```

**本プロジェクトの実例** -- ステッパー型レイアウト:

```vue
<div class="ion-margin-top ion-padding-horizontal">
  <ion-text color="medium">
    <p>ステップ {{ currentStep + 1 }} / {{ steps.length }}: {{ steps[currentStep].label }}</p>
  </ion-text>
  <ion-progress-bar :value="(currentStep + 1) / steps.length" />
</div>
```

---

## 10. ナビゲーション

### ルーター設定

Ionic Vue では `@ionic/vue-router` の `createRouter` を使います。
通常の Vue Router とほぼ同じですが、Ionic のページトランジション（スライドアニメーション）が自動的に適用されます。

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: () => import('@/views/HomePage.vue') },
  { path: '/receiving', name: 'Receiving', component: () => import('@/views/ReceivingPage.vue') },
  // ...
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
```

### App.vue

`IonApp` と `IonRouterOutlet` で全体をラップします。

```vue
<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
```

### ページ遷移の方法

```vue
<template>
  <!-- 方法1: router-link 属性（IonItem, IonButton, IonCard で使える） -->
  <ion-item :router-link="'/receiving'" detail>
    <ion-label>入荷検品</ion-label>
  </ion-item>

  <ion-button :router-link="'/shipping'">出荷検品</ion-button>

  <ion-card button :router-link="'/stocktaking'">
    <ion-card-content>棚卸し</ion-card-content>
  </ion-card>

  <!-- 方法2: プログラムによる遷移 -->
  <ion-button @click="goToReceiving">入荷検品</ion-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToReceiving = () => {
  router.push('/receiving');
};
</script>
```

### 戻るボタン

`IonBackButton` は Ionic のナビゲーション履歴を参照して自動的に動作します。

```vue
<ion-buttons slot="start">
  <!-- default-href: 履歴がない場合のフォールバック先 -->
  <ion-back-button default-href="/home" />
</ion-buttons>
```

> `PageLayout` では `backHref` prop で制御しています。
> ホーム画面では `back-href=""` で戻るボタンを非表示にしています。

---

## 11. テーマ・スタイリング

### CSS 変数

Ionic のスタイリングは **CSS カスタムプロパティ（CSS 変数）** が中心です。
`src/theme/variables.css` でプロジェクト全体のテーマを定義しています。

```css
/* src/theme/variables.css */
:root {
  --ion-color-primary: #3880ff;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-success: #2dd36f;
  --ion-color-danger: #eb445a;
  --ion-color-warning: #ffc409;
  --ion-color-medium: #92949c;
  /* ... */
}
```

**個別コンポーネントのスタイル変更**:

```css
/* カードの背景色をカスタマイズ */
ion-card {
  --background: var(--ion-color-light);
}

/* ツールバーの背景色 */
ion-toolbar {
  --background: var(--ion-color-primary);
  --color: white;
}
```

### ダークモード

本プロジェクトではダークモードを `ion-palette-dark` クラスで切り替えています。

```typescript
// src/composables/useDarkMode.ts
// document.documentElement に ion-palette-dark クラスを付け外しする
document.documentElement.classList.toggle('ion-palette-dark', isDark.value);
```

`src/theme/variables.css` で `.ion-palette-dark` セレクタにダーク用の CSS 変数を定義:

```css
.ion-palette-dark {
  --ion-background-color: #1a1a2e;
  --ion-text-color: #ffffff;
  --ion-item-background: #1e1e3a;
  --ion-card-background: #24244a;
  --ion-toolbar-background: #16162e;
  --ion-color-primary: #6a8fff;
}
```

`main.ts` ではシステム設定に連動するダークモード CSS もインポート済み:

```typescript
import '@ionic/vue/css/palettes/dark.system.css';
```

### ユーティリティクラス

Ionic にはよく使うスタイルのユーティリティクラスが用意されています。
`main.ts` でインポート済みのものがそのまま使えます。

**パディング / マージン**:

| クラス | 効果 |
|---|---|
| `ion-padding` | 全方向にパディング（16px） |
| `ion-padding-horizontal` | 左右にパディング |
| `ion-padding-vertical` | 上下にパディング |
| `ion-margin-top` | 上にマージン |
| `ion-no-padding` | パディングを除去 |

**テキスト**:

| クラス | 効果 |
|---|---|
| `ion-text-center` | テキスト中央揃え |
| `ion-text-start` | テキスト左揃え |
| `ion-text-end` | テキスト右揃え |

**本プロジェクトでの使用例**:

```vue
<!-- PageLayout の content に ion-padding を適用 -->
<ion-content class="ion-padding">

<!-- セクション間のスペース -->
<ion-list class="ion-margin-top">

<!-- ボタン領域の左右パディング -->
<div class="ion-padding-horizontal">

<!-- カードグリッドのテキスト中央揃え -->
<ion-card-content class="ion-text-center">
```

### main.ts で読み込む CSS

```typescript
// 必須 -- Ionic コンポーネントが正しく動作するために必要
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

// オプション -- ユーティリティクラス
import '@ionic/vue/css/padding.css';       // ion-padding 等
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css'; // ion-text-center 等
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

// ダークモード
import '@ionic/vue/css/palettes/dark.system.css';

// プロジェクト固有テーマ
import './theme/variables.css';
```

---

## 12. Ionic ライフサイクル

Ionic は Vue のライフサイクルに加えて、**独自のライフサイクルフック** を持っています。
これは Ionic のページキャッシュ（スタック管理）に起因します。

### なぜ必要か

Ionic はページ遷移時にページを破棄せずキャッシュします（ネイティブアプリと同じ挙動）。
そのため `onMounted` は **最初の1回しか呼ばれません**。
ページに戻ってきたときにデータを更新したい場合は Ionic のフックを使います。

### フック一覧

| Ionic フック | タイミング | Vue の相当 | 用途 |
|---|---|---|---|
| `ionViewWillEnter` | ページ表示直前（毎回） | -- | データ再取得、フォームリセット |
| `ionViewDidEnter` | ページ表示完了後（毎回） | -- | アニメーション後の処理 |
| `ionViewWillLeave` | ページ離脱直前（毎回） | -- | フォーム保存、タイマー停止 |
| `ionViewDidLeave` | ページ離脱完了後（毎回） | -- | クリーンアップ |

### 使い方

```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { onIonViewWillEnter, onIonViewDidEnter, onIonViewWillLeave } from '@ionic/vue';

// 初回のみ -- 1回だけ実行される初期化
onMounted(() => {
  console.log('初回マウント時のみ');
});

// 毎回 -- ページに来るたびに実行
onIonViewWillEnter(() => {
  console.log('ページ表示直前（毎回）');
  // ここでデータを再取得する
});

onIonViewDidEnter(() => {
  console.log('ページ表示完了後（毎回）');
  // 入力フィールドにフォーカスを当てるなど
});

onIonViewWillLeave(() => {
  console.log('ページから離れる直前（毎回）');
  // スキャナーの停止など
});
</script>
```

### 使い分けの指針

```
ページに来るたびにデータを取得したい → onIonViewWillEnter
ページ初回のみの初期化             → onMounted
ページを離れるときの後始末          → onIonViewWillLeave
```

**本プロジェクトでの実践的な例**:

```vue
<script setup lang="ts">
import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';

const { status, startScan, stopScan, onScanResult } = useSP2Scanner();

// ページに来るたびにスキャナー状態を確認
onIonViewWillEnter(() => {
  // スキャナーの接続確認やフォームのリセット
});

// ページを離れるときにスキャナーを停止
onIonViewWillLeave(() => {
  stopScan();
});
</script>
```

> **注意**: Ionic のライフサイクルフックは `IonPage` の直下のコンポーネントでのみ動作します。
> ネストされた子コンポーネントでは使えないので、ページレベルで呼び出してください。
