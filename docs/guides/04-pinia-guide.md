# Pinia 導入ガイド

## 目次

1. [Pinia とは](#1-pinia-とは)
2. [Composable との使い分け](#2-composable-との使い分け)
3. [Pinia の基本的な使い方](#3-pinia-の基本的な使い方)
4. [このプロジェクトでの導入例](#4-このプロジェクトでの導入例)
5. [Composable から Pinia ストアへの移行パターン](#5-composable-から-pinia-ストアへの移行パターン)
6. [判断基準まとめ](#6-判断基準まとめ)

---

## 1. Pinia とは

Pinia は **Vue 公式の状態管理ライブラリ**。Vue 3 の Composition API と完全に統合されており、Vuex の後継として位置づけられている。

**特徴:**

- TypeScript との相性が非常に良い（型推論が自然に効く）
- Vue DevTools で状態の確認・タイムトラベルデバッグができる
- SSR 対応
- 軽量（約 1KB gzipped）
- ボイラープレートが少ない

**インストール:**

```bash
npm install pinia
```

**main.ts への登録:**

```ts
// src/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { IonicVue } from '@ionic/vue';

const app = createApp(App)
  .use(IonicVue)
  .use(createPinia())  // Pinia を追加
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
```

---

## 2. Composable との使い分け

### 現在のプロジェクト構成

このプロジェクトでは composable で状態管理を行っている。

| composable | 用途 | 状態の共有範囲 |
|---|---|---|
| `useSP2Scanner` | スキャナ制御 | コンポーネントごとに独立 |
| `useApi` | HTTP リクエスト | コンポーネントごとに独立 |
| `useLoadingMode` | ローディング表示モード | モジュールスコープで共有 |
| `useDarkMode` | ダークモード切替 | モジュールスコープで共有 |
| `useScanFeedback` | スキャンフィードバック設定 | モジュールスコープで共有 |

### Composable が適している場面

**インスタンスごとに独立した状態を持つケース:**

```ts
// useApi は呼び出すたびに独立した loading / error を持つ
// ReceivingPage と ShippingPage で別々の loading 状態になる
const { loading, post } = useApi();
```

**ライフサイクルと密結合なケース:**

```ts
// useSP2Scanner は onMounted / onUnmounted でリソースを管理する
// コンポーネントの生存期間と一致させる必要がある
export function useSP2Scanner() {
  onMounted(() => { initialize(); });
  onUnmounted(async () => { await SP2Scanner.destroy(); });
  // ...
}
```

**再利用可能なロジックの切り出し:**

- フォームバリデーション
- デバウンス処理
- API 通信のラッパー

**結論:** `useApi` や `useSP2Scanner` は composable のままでよい。

### Pinia が適している場面

**複数の画面・コンポーネントで同じ状態を共有するケース:**

- スキャナの接続状態（`status`）は全画面のヘッダーに表示したい
- ダークモード、ローディングモード、フィードバック設定はアプリ全体に影響する

**DevTools でデバッグしたいケース:**

- 「今のスキャナ状態は？」「ダークモードは ON？」を DevTools で即座に確認できる
- 状態変更の履歴をタイムトラベルで追える

**複数の設定を一箇所にまとめたいケース:**

- 現在 `useLoadingMode`、`useDarkMode`、`useScanFeedback` がバラバラに存在
- Pinia なら `useUserSettingsStore` として一つにまとめられる

---

## 3. Pinia の基本的な使い方

### defineStore（Setup Store 構文）

Pinia には Options Store と Setup Store の 2 つの書き方があるが、このプロジェクトでは **Setup Store 構文**を推奨する。Composition API に近い書き方なので、既存の composable からの移行がスムーズ。

```ts
// src/stores/counter.ts
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  // ---- state ----
  const count = ref(0);

  // ---- getters ----
  const doubleCount = computed(() => count.value * 2);
  const isPositive = computed(() => count.value > 0);

  // ---- actions ----
  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function reset() {
    count.value = 0;
  }

  return {
    count,
    doubleCount,
    isPositive,
    increment,
    decrement,
    reset,
  };
});
```

**対応関係:**

| Composition API | Pinia の Setup Store での役割 |
|---|---|
| `ref()` / `reactive()` | **state** |
| `computed()` | **getters** |
| 普通の関数 | **actions** |

### コンポーネントからの利用

```vue
<template>
  <div>
    <p>カウント: {{ counter.count }}</p>
    <p>2倍: {{ counter.doubleCount }}</p>
    <ion-button @click="counter.increment()">+1</ion-button>
    <ion-button @click="counter.decrement()">-1</ion-button>
    <ion-button @click="counter.reset()">リセット</ion-button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();
</script>
```

### 注意: 分割代入すると reactivity が壊れる

```ts
// NG: reactivity が失われる
const { count, doubleCount } = useCounterStore();

// OK: storeToRefs を使う（state / getters のみ）
import { storeToRefs } from 'pinia';

const counter = useCounterStore();
const { count, doubleCount } = storeToRefs(counter);
// actions は storeToRefs 不要（関数なので）
const { increment, decrement } = counter;
```

---

## 4. このプロジェクトでの導入例

### 4-1. スキャナ状態ストア

現在の `useSP2Scanner` は `onMounted` / `onUnmounted` でハードウェアリソースを管理しているため、composable のまま残す。ただし、**接続状態（status）だけはアプリ全体で共有**したいので、状態の保持を Pinia ストアに分離する。

```ts
// src/stores/scanner.ts
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { ScannerStatus, ScanResult } from '@/types';

export const useScannerStore = defineStore('scanner', () => {
  // ---- state ----
  const status = ref<ScannerStatus>('unknown');
  const lastResult = ref<ScanResult | null>(null);
  const isScanning = ref(false);

  // ---- getters ----
  const isConnected = computed(() => status.value === 'connected');
  const statusLabel = computed(() => {
    switch (status.value) {
      case 'connected': return '接続中';
      case 'disconnected': return '未接続';
      default: return '不明';
    }
  });

  // ---- actions ----
  function setStatus(newStatus: ScannerStatus) {
    status.value = newStatus;
  }

  function setLastResult(result: ScanResult) {
    lastResult.value = result;
    isScanning.value = false;
  }

  function setScanningState(scanning: boolean) {
    isScanning.value = scanning;
  }

  return {
    status,
    lastResult,
    isScanning,
    isConnected,
    statusLabel,
    setStatus,
    setLastResult,
    setScanningState,
  };
});
```

composable 側はストアを参照するように変更:

```ts
// src/composables/useSP2Scanner.ts（改修後）
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { SP2Scanner } from '@/plugins/sp2-scanner';
import { useScannerStore } from '@/stores/scanner';
import type { ScanResult } from '@/types';

export function useSP2Scanner() {
  const store = useScannerStore();
  const { status, lastResult, isScanning } = storeToRefs(store);

  let scanListener: { remove: () => Promise<void> } | null = null;
  let resultCallback: ((result: ScanResult) => void) | null = null;

  const initialize = async () => {
    const res = await SP2Scanner.initialize();
    if (res.success) {
      const st = await SP2Scanner.getStatus();
      store.setStatus(st.status);
    }
    scanListener = await SP2Scanner.addListener('scanResult', (result) => {
      store.setLastResult(result);
      if (resultCallback) {
        resultCallback(result);
      }
    });
  };

  const startScan = async () => {
    store.setScanningState(true);
    await SP2Scanner.startScan();
  };

  const stopScan = async () => {
    store.setScanningState(false);
    await SP2Scanner.stopScan();
  };

  const onScanResult = (callback: (result: ScanResult) => void) => {
    resultCallback = callback;
  };

  onMounted(() => { initialize(); });
  onUnmounted(async () => {
    if (scanListener) { await scanListener.remove(); }
    await SP2Scanner.destroy();
  });

  return { status, lastResult, isScanning, startScan, stopScan, onScanResult };
}
```

これにより、どの画面からでもスキャナ状態を参照できる:

```vue
<!-- src/components/ScannerStatus.vue（改修後） -->
<template>
  <ion-chip :color="chipColor">
    <ion-icon :icon="chipIcon" />
    <ion-label>スキャナ: {{ scanner.statusLabel }}</ion-label>
  </ion-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonChip, IonIcon, IonLabel } from '@ionic/vue';
import { bluetoothOutline, closeCircleOutline, helpCircleOutline } from 'ionicons/icons';
import { useScannerStore } from '@/stores/scanner';

const scanner = useScannerStore();

const chipColor = computed(() => {
  switch (scanner.status) {
    case 'connected': return 'success';
    case 'disconnected': return 'danger';
    default: return 'medium';
  }
});

const chipIcon = computed(() => {
  switch (scanner.status) {
    case 'connected': return bluetoothOutline;
    case 'disconnected': return closeCircleOutline;
    default: return helpCircleOutline;
  }
});
</script>
```

### 4-2. ユーザー設定ストア

`useLoadingMode`、`useDarkMode`、`useScanFeedback`、ホーム画面のレイアウト設定を一つのストアにまとめる。

```ts
// src/stores/userSettings.ts
import { ref, computed, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import type { ScanResult } from '@/types';

export type LoadingMode = 'overlay' | 'button';
export type HomeLayout = 'list' | 'grid' | 'buttons';
export type FeedbackType = 'none' | 'vibrate' | 'toast' | 'vibrate+toast';

export const useUserSettingsStore = defineStore('userSettings', () => {
  // ========================================
  // ダークモード
  // ========================================
  const isDark = ref(false);

  function initDarkMode() {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      isDark.value = saved === 'true';
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  function toggleDarkMode() {
    isDark.value = !isDark.value;
  }

  // watchEffect でクラスと localStorage を同期
  watchEffect(() => {
    document.documentElement.classList.toggle('ion-palette-dark', isDark.value);
    localStorage.setItem('darkMode', String(isDark.value));
  });

  // ========================================
  // ローディングモード
  // ========================================
  const loadingMode = ref<LoadingMode>(
    (localStorage.getItem('loadingMode') as LoadingMode) || 'overlay'
  );

  function setLoadingMode(mode: LoadingMode) {
    loadingMode.value = mode;
    localStorage.setItem('loadingMode', mode);
  }

  // ========================================
  // ホーム画面レイアウト
  // ========================================
  const homeLayout = ref<HomeLayout>(
    (localStorage.getItem('homeLayout') as HomeLayout) || 'list'
  );

  function setHomeLayout(layout: HomeLayout) {
    homeLayout.value = layout;
    localStorage.setItem('homeLayout', layout);
  }

  // ========================================
  // スキャンフィードバック
  // ========================================
  const feedbackType = ref<FeedbackType>(
    (localStorage.getItem('scanFeedback') as FeedbackType) || 'vibrate+toast'
  );

  const toastMessage = ref('');
  const toastVisible = ref(false);

  function setFeedbackType(type: FeedbackType) {
    feedbackType.value = type;
    localStorage.setItem('scanFeedback', type);
  }

  async function triggerFeedback(result: ScanResult) {
    const type = feedbackType.value;

    if (type === 'vibrate' || type === 'vibrate+toast') {
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch {
        console.log('[ScanFeedback] Haptics not available');
      }
    }

    if (type === 'toast' || type === 'vibrate+toast') {
      toastMessage.value = `読み取り: ${result.value}`;
      toastVisible.value = true;
      setTimeout(() => { toastVisible.value = false; }, 1500);
    }
  }

  async function triggerSuccess() {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch {
      console.log('[ScanFeedback] Haptics not available');
    }
  }

  async function triggerError() {
    try {
      await Haptics.notification({ type: NotificationType.Error });
    } catch {
      console.log('[ScanFeedback] Haptics not available');
    }
  }

  // ========================================
  // 初期化
  // ========================================
  initDarkMode();

  // ========================================
  // getters
  // ========================================
  const isOverlayLoading = computed(() => loadingMode.value === 'overlay');

  return {
    // ダークモード
    isDark,
    toggleDarkMode,
    // ローディングモード
    loadingMode,
    setLoadingMode,
    isOverlayLoading,
    // ホーム画面レイアウト
    homeLayout,
    setHomeLayout,
    // スキャンフィードバック
    feedbackType,
    toastMessage,
    toastVisible,
    setFeedbackType,
    triggerFeedback,
    triggerSuccess,
    triggerError,
  };
});
```

コンポーネントからの利用:

```vue
<!-- ReceivingPage.vue の script 部分（抜粋） -->
<script setup lang="ts">
import { useUserSettingsStore } from '@/stores/userSettings';

const settings = useUserSettingsStore();

// loadingMode を直接参照
// settings.loadingMode === 'overlay'

// ローディングモードの切替
const onMenuSelect = (action: string) => {
  if (action === 'loading-overlay') {
    settings.setLoadingMode('overlay');
  } else if (action === 'loading-button') {
    settings.setLoadingMode('button');
  }
};
</script>
```

```vue
<!-- HomePage.vue の script 部分（抜粋） -->
<script setup lang="ts">
import { useUserSettingsStore } from '@/stores/userSettings';

const settings = useUserSettingsStore();

// layout は settings.homeLayout で取得
// レイアウト変更は settings.setHomeLayout('grid') で OK

const onMenuSelect = (action: string) => {
  settings.setHomeLayout(action as 'list' | 'grid' | 'buttons');
};
</script>

<template>
  <template v-if="settings.homeLayout === 'list'">
    <!-- リスト表示 -->
  </template>
  <template v-if="settings.homeLayout === 'grid'">
    <!-- グリッド表示 -->
  </template>
</template>
```

### ディレクトリ構成

```
src/
  stores/
    scanner.ts           # スキャナ状態ストア
    userSettings.ts      # ユーザー設定ストア（統合）
  composables/
    useSP2Scanner.ts     # ハードウェア制御（ストアを内部で利用）
    useApi.ts            # HTTP通信（変更不要）
```

---

## 5. Composable から Pinia ストアへの移行パターン

### パターン A: モジュールスコープ共有 → Pinia に移行

`useLoadingMode`、`useDarkMode`、`useScanFeedback` のようにモジュールスコープの `ref` でグローバル共有しているものが対象。

**移行前:**

```ts
// composable 内でモジュールスコープに ref を置く
const mode = ref<LoadingMode>('overlay');

export function useLoadingMode() {
  const setMode = (m: LoadingMode) => {
    mode.value = m;
    localStorage.setItem('loadingMode', m);
  };
  return { loadingMode: mode, setMode };
}
```

**移行後:**

```ts
// defineStore 内に ref を置く
export const useUserSettingsStore = defineStore('userSettings', () => {
  const loadingMode = ref<LoadingMode>('overlay');

  function setLoadingMode(mode: LoadingMode) {
    loadingMode.value = mode;
    localStorage.setItem('loadingMode', mode);
  }

  return { loadingMode, setLoadingMode };
});
```

**変更点:**

1. モジュールスコープの `ref` を `defineStore` のコールバック内に移動
2. setter 関数は actions としてそのまま使える
3. 利用側は `useLoadingMode()` を `useUserSettingsStore()` に置き換え

### パターン B: composable + Pinia の併用

`useSP2Scanner` のようにライフサイクルやハードウェア制御が絡む場合、composable を残しつつ、共有したい状態だけ Pinia に切り出す。

**移行のステップ:**

1. 共有したい状態（`status` など）を Pinia ストアに定義
2. composable 内で Pinia ストアを利用して状態を更新
3. 他のコンポーネントから直接ストアを参照可能にする

```ts
// composable は残す（ライフサイクル管理のため）
export function useSP2Scanner() {
  const store = useScannerStore();  // Pinia ストアを利用

  onMounted(() => { /* 初期化 */ });
  onUnmounted(() => { /* 破棄 */ });

  return { ...storeToRefs(store), startScan, stopScan, onScanResult };
}
```

### パターン C: そのまま composable のまま残す

`useApi` のようにインスタンスごとに独立した状態を持つものは移行不要。

**判断基準:** 呼び出すたびに新しい `loading` / `error` が作られるかどうか。

---

## 6. 判断基準まとめ

### Pinia を使うべきケース

| 条件 | 例 |
|---|---|
| 複数画面で状態を共有する | スキャナ接続状態、ユーザー設定 |
| DevTools でデバッグしたい | 「今の設定は？」を即座に確認 |
| 関連する設定を一箇所にまとめたい | ダークモード + ローディング + フィードバック |
| 状態変更の履歴を追いたい | タイムトラベルデバッグ |
| テスト時にストアをモックしたい | `createTestingPinia()` で簡単にモック |

### Composable のままでよいケース

| 条件 | 例 |
|---|---|
| インスタンスごとに独立した状態 | `useApi`（画面ごとの loading/error） |
| ライフサイクルと密結合 | `useSP2Scanner`（onMounted/onUnmounted） |
| 単純なロジックの再利用 | フォームバリデーション、デバウンス |
| 状態を持たないユーティリティ | 日付フォーマット、計算ロジック |

### 判断フローチャート

```
その状態は複数のコンポーネントで共有される？
  ├─ No → Composable のまま
  └─ Yes → ライフサイクル管理（onMounted等）が必要？
              ├─ No → Pinia ストアに移行（パターン A）
              └─ Yes → Composable + Pinia 併用（パターン B）
                        ├ 共有状態 → Pinia
                        └ ライフサイクル制御 → Composable
```

### このプロジェクトでの推奨

| 現在の composable | 推奨 | 理由 |
|---|---|---|
| `useApi` | **composable のまま** | 画面ごとに独立した loading/error が必要 |
| `useSP2Scanner` | **composable + Pinia 併用** | ライフサイクル管理は composable、接続状態は Pinia で共有 |
| `useLoadingMode` | **Pinia に統合** | 他の設定と合わせて `useUserSettingsStore` へ |
| `useDarkMode` | **Pinia に統合** | 同上 |
| `useScanFeedback` | **Pinia に統合** | 同上 |

---

## 参考リンク

- [Pinia 公式ドキュメント](https://pinia.vuejs.org/)
- [Vue.js 状態管理](https://ja.vuejs.org/guide/scaling-up/state-management)
- [Pinia vs Composables（Vue.js RFC）](https://github.com/vuejs/rfcs/discussions/270)
