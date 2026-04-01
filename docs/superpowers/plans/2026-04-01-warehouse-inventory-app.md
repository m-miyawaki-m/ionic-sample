# 倉庫在庫管理アプリ 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ionic Vue + TypeScript + Capacitor で、SP2スキャナ連携と外部API連携を備えた倉庫在庫管理アプリの基盤を構築する。共通コンポーネントを先にサンプルページで確認し、業務画面はそれを組み合わせて構築する。

**Architecture:** 共通UIコンポーネント群 → composable（スキャナ/API） → 業務画面の3層構成。右上ハンバーガーメニューで画面ごとのアクション（スキャンモード選択等）とダークモード切替を提供。SP2 AAR SDKはCapacitor Local Pluginとしてラップ。

**Tech Stack:** Ionic 8, Vue 3, TypeScript, Capacitor 6+, Pinia, Android (Java)

---

## ファイル構成

```
ionic-sample/
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── router/
│   │   └── index.ts
│   ├── components/                       ← 共通コンポーネント
│   │   ├── PageLayout.vue                ← ヘッダー+戻る+メニュー+コンテンツ
│   │   ├── ActionMenu.vue                ← 右上ハンバーガーメニュー
│   │   ├── ScanInput.vue                 ← スキャンボタン付き入力欄
│   │   ├── NumberInput.vue               ← 数量入力欄
│   │   ├── SearchBar.vue                 ← 検索バー（スキャン/手入力→検索）
│   │   ├── ResultCard.vue                ← 検索結果/ステータス表示カード
│   │   ├── DataList.vue                  ← データ一覧リスト
│   │   ├── SelectPopup.vue               ← 選択肢ポップアップ
│   │   ├── ScannerStatus.vue             ← スキャナ接続状態チップ
│   │   ├── SubmitButton.vue              ← ローディング付き送信ボタン
│   │   └── FeedbackToast.vue             ← 成功/エラーのトースト通知
│   ├── composables/
│   │   ├── useSP2Scanner.ts              ← スキャナ操作composable
│   │   ├── useApi.ts                     ← 外部API通信composable
│   │   └── useDarkMode.ts               ← ダークモード切替composable
│   ├── plugins/
│   │   ├── sp2-scanner.ts                ← Capacitorプラグイン TypeScript定義
│   │   └── sp2-scanner-web.ts            ← Web用モック
│   ├── types/
│   │   └── index.ts                      ← 共通型定義
│   ├── views/
│   │   ├── HomePage.vue                  ← 業務メニュー
│   │   ├── ReceivingPage.vue             ← 入荷検品
│   │   ├── ShippingPage.vue              ← 出荷検品
│   │   ├── StocktakingPage.vue           ← 棚卸し
│   │   ├── InventoryPage.vue             ← 在庫照会
│   │   ├── RelocationPage.vue            ← ロケーション移動
│   │   └── samples/
│   │       ├── ComponentsPage.vue        ← 共通コンポーネント一覧
│   │       └── ScanDemoPage.vue          ← スキャン入力デモ
│   └── theme/
│       └── variables.css
├── android/
│   └── app/
│       ├── libs/
│       │   └── sp2-scanner.aar           ← SP2 SDK（後日配置）
│       ├── build.gradle
│       └── src/main/java/
│           └── io/ionic/starter/
│               ├── MainActivity.java
│               └── sp2/
│                   └── SP2Plugin.java
├── capacitor.config.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

### Task 1: Ionicプロジェクト初期化

**Files:**
- Create: プロジェクト全体（ionic start で生成）
- Modify: `capacitor.config.ts`

- [ ] **Step 1: Ionic CLIがインストールされているか確認**

```bash
ionic --version
```

インストールされていない場合:

```bash
npm install -g @ionic/cli
```

- [ ] **Step 2: Ionicプロジェクトを作成**

```bash
cd /home/miyaw/dev/learning
ionic start ionic-sample blank --type vue --capacitor --package-id=jp.co.example.warehouse
```

テンプレート `blank` で作成。`--capacitor` フラグでCapacitorも同時にセットアップされる。

Expected: `ionic-sample/` ディレクトリにプロジェクトが生成される

> **注意**: ディレクトリが既に存在する場合は中のファイルが空であることを確認するか、一度別名で作成してからコピーする。

- [ ] **Step 3: 開発サーバーで動作確認**

```bash
cd /home/miyaw/dev/learning/ionic-sample
ionic serve
```

Expected: ブラウザで `http://localhost:8100` が開き、Ionic Blankテンプレートが表示される

- [ ] **Step 4: Android プラットフォームを追加**

```bash
npm install @capacitor/android
npx cap add android
```

Expected: `android/` ディレクトリが生成される

- [ ] **Step 5: Capacitor設定を確認**

`capacitor.config.ts` の `appId` と `appName` を確認:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'jp.co.example.warehouse',
  appName: '倉庫管理',
  webDir: 'dist',
};

export default config;
```

- [ ] **Step 6: コミット**

```bash
git init
git add -A
git commit -m "feat: Ionicプロジェクト初期化 (Vue + TypeScript + Capacitor)"
```

---

### Task 2: 共通型定義 + ルーティング設定

**Files:**
- Create: `src/types/index.ts`
- Modify: `src/router/index.ts`

- [ ] **Step 1: 共通の型定義ファイルを作成**

`src/types/index.ts`:

```typescript
/** スキャン結果 */
export interface ScanResult {
  /** 読み取った値（バーコード値やQR内容） */
  value: string;
  /** フォーマット（CODE128, QR_CODE, etc.） */
  format: string;
}

/** スキャナの接続状態 */
export type ScannerStatus = 'connected' | 'disconnected' | 'unknown';

/** API レスポンスの共通型 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/** ActionMenuの項目 */
export interface MenuAction {
  label: string;
  action: string;
  icon?: string;
}

/** DataListの行 */
export interface DataListItem {
  id: string;
  title: string;
  subtitle?: string;
  note?: string;
}

/** SelectPopupの選択肢 */
export interface SelectOption {
  label: string;
  value: string;
}

/** 入荷検品の暫定項目 */
export interface ReceivingItem {
  location: string;
  itemCode: string;
  quantity: number;
  lotNumber?: string;
}

/** 出荷検品の暫定項目 */
export interface ShippingItem {
  shippingOrderId: string;
  itemCode: string;
  quantity: number;
}

/** 棚卸しの暫定項目 */
export interface StocktakingItem {
  location: string;
  itemCode: string;
  actualQuantity: number;
}

/** 在庫照会の暫定結果 */
export interface InventoryInfo {
  itemCode: string;
  itemName: string;
  location: string;
  quantity: number;
}

/** ロケーション移動の暫定項目 */
export interface RelocationItem {
  fromLocation: string;
  toLocation: string;
  itemCode: string;
  quantity: number;
}
```

- [ ] **Step 2: ルーターに全画面のルートを定義**

`src/router/index.ts` を以下の内容に置き換える:

```typescript
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/receiving',
    name: 'Receiving',
    component: () => import('@/views/ReceivingPage.vue'),
  },
  {
    path: '/shipping',
    name: 'Shipping',
    component: () => import('@/views/ShippingPage.vue'),
  },
  {
    path: '/stocktaking',
    name: 'Stocktaking',
    component: () => import('@/views/StocktakingPage.vue'),
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('@/views/InventoryPage.vue'),
  },
  {
    path: '/relocation',
    name: 'Relocation',
    component: () => import('@/views/RelocationPage.vue'),
  },
  {
    path: '/samples/components',
    name: 'SampleComponents',
    component: () => import('@/views/samples/ComponentsPage.vue'),
  },
  {
    path: '/samples/scan-demo',
    name: 'ScanDemo',
    component: () => import('@/views/samples/ScanDemoPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
```

- [ ] **Step 3: コミット**

```bash
git add src/types/index.ts src/router/index.ts
git commit -m "feat: 共通型定義とルーティング設定を追加"
```

---

### Task 3: SP2プラグイン定義 + composables

**Files:**
- Create: `src/plugins/sp2-scanner.ts`
- Create: `src/plugins/sp2-scanner-web.ts`
- Create: `src/composables/useSP2Scanner.ts`
- Create: `src/composables/useApi.ts`
- Create: `src/composables/useDarkMode.ts`

- [ ] **Step 1: Capacitorプラグインの TypeScript インターフェースを定義**

`src/plugins/sp2-scanner.ts`:

```typescript
import { registerPlugin, type PluginListenerHandle } from '@capacitor/core';
import type { ScanResult, ScannerStatus } from '@/types';

export interface SP2ScannerPlugin {
  initialize(): Promise<{ success: boolean }>;
  startScan(): Promise<void>;
  stopScan(): Promise<void>;
  getStatus(): Promise<{ status: ScannerStatus }>;
  destroy(): Promise<void>;
  addListener(
    eventName: 'scanResult',
    listenerFunc: (result: ScanResult) => void,
  ): Promise<PluginListenerHandle>;
  removeAllListeners(): Promise<void>;
}

export const SP2Scanner = registerPlugin<SP2ScannerPlugin>('SP2Scanner', {
  web: () => import('./sp2-scanner-web').then((m) => new m.SP2ScannerWeb()),
});
```

- [ ] **Step 2: Web用モックプラグインを作成**

`src/plugins/sp2-scanner-web.ts`:

```typescript
import { WebPlugin } from '@capacitor/core';
import type { SP2ScannerPlugin } from './sp2-scanner';
import type { ScannerStatus } from '@/types';

export class SP2ScannerWeb extends WebPlugin implements SP2ScannerPlugin {
  async initialize(): Promise<{ success: boolean }> {
    console.log('[SP2Scanner Web Mock] initialize');
    return { success: true };
  }

  async startScan(): Promise<void> {
    console.log('[SP2Scanner Web Mock] startScan - simulating scan...');
    setTimeout(() => {
      this.notifyListeners('scanResult', {
        value: 'MOCK-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        format: 'CODE128',
      });
    }, 1000);
  }

  async stopScan(): Promise<void> {
    console.log('[SP2Scanner Web Mock] stopScan');
  }

  async getStatus(): Promise<{ status: ScannerStatus }> {
    return { status: 'connected' };
  }

  async destroy(): Promise<void> {
    console.log('[SP2Scanner Web Mock] destroy');
  }
}
```

- [ ] **Step 3: useSP2Scanner composableを作成**

`src/composables/useSP2Scanner.ts`:

```typescript
import { ref, onMounted, onUnmounted } from 'vue';
import { SP2Scanner } from '@/plugins/sp2-scanner';
import type { ScanResult, ScannerStatus } from '@/types';

export function useSP2Scanner() {
  const status = ref<ScannerStatus>('unknown');
  const lastResult = ref<ScanResult | null>(null);
  const isScanning = ref(false);

  let scanListener: { remove: () => Promise<void> } | null = null;
  let resultCallback: ((result: ScanResult) => void) | null = null;

  const initialize = async () => {
    const res = await SP2Scanner.initialize();
    if (res.success) {
      const st = await SP2Scanner.getStatus();
      status.value = st.status;
    }
    scanListener = await SP2Scanner.addListener('scanResult', (result) => {
      lastResult.value = result;
      isScanning.value = false;
      if (resultCallback) {
        resultCallback(result);
      }
    });
  };

  const startScan = async () => {
    isScanning.value = true;
    await SP2Scanner.startScan();
  };

  const stopScan = async () => {
    isScanning.value = false;
    await SP2Scanner.stopScan();
  };

  const onScanResult = (callback: (result: ScanResult) => void) => {
    resultCallback = callback;
  };

  onMounted(() => {
    initialize();
  });

  onUnmounted(async () => {
    if (scanListener) {
      await scanListener.remove();
    }
    await SP2Scanner.destroy();
  });

  return {
    status,
    lastResult,
    isScanning,
    startScan,
    stopScan,
    onScanResult,
  };
}
```

- [ ] **Step 4: useApi composableを作成**

`src/composables/useApi.ts`:

```typescript
import { ref } from 'vue';
import type { ApiResponse } from '@/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export function useApi() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const request = async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: unknown,
  ): Promise<ApiResponse<T>> => {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      if (!res.ok) {
        error.value = data.error || `HTTP ${res.status}`;
        return { success: false, error: error.value ?? undefined };
      }
      return { success: true, data };
    } catch (e) {
      const msg = e instanceof Error ? e.message : '通信エラー';
      error.value = msg;
      return { success: false, error: msg };
    } finally {
      loading.value = false;
    }
  };

  const get = <T>(path: string) => request<T>('GET', path);
  const post = <T>(path: string, body: unknown) => request<T>('POST', path, body);
  const put = <T>(path: string, body: unknown) => request<T>('PUT', path, body);
  const del = <T>(path: string) => request<T>('DELETE', path);

  return { loading, error, get, post, put, del };
}
```

- [ ] **Step 5: useDarkMode composableを作成**

`src/composables/useDarkMode.ts`:

```typescript
import { ref, watchEffect } from 'vue';

const isDark = ref(false);

export function useDarkMode() {
  const init = () => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      isDark.value = saved === 'true';
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  };

  const toggle = () => {
    isDark.value = !isDark.value;
  };

  watchEffect(() => {
    document.documentElement.classList.toggle('ion-palette-dark', isDark.value);
    localStorage.setItem('darkMode', String(isDark.value));
  });

  init();

  return { isDark, toggle };
}
```

- [ ] **Step 6: コミット**

```bash
git add src/plugins/ src/composables/
git commit -m "feat: SP2プラグイン定義 + useSP2Scanner/useApi/useDarkMode composables"
```

---

### Task 4: 共通コンポーネント — PageLayout + ActionMenu

**Files:**
- Create: `src/components/PageLayout.vue`
- Create: `src/components/ActionMenu.vue`

- [ ] **Step 1: ActionMenu コンポーネントを作成**

右上ハンバーガーメニュー。画面ごとの選択肢をpropsで受け取り、ダークモード切替は常に表示。

`src/components/ActionMenu.vue`:

```vue
<template>
  <ion-menu-button v-if="false" />
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
        <ion-item
          v-for="item in items"
          :key="item.action"
          button
          :detail="false"
          @click="selectAction(item.action)"
        >
          <ion-icon v-if="item.icon" :icon="item.icon" slot="start" />
          <ion-label>{{ item.label }}</ion-label>
        </ion-item>

        <ion-item-divider v-if="items.length > 0" />

        <ion-item button :detail="false" @click="toggleDark">
          <ion-icon :icon="isDark ? sunnyOutline : moonOutline" slot="start" />
          <ion-label>{{ isDark ? 'ライトモード' : 'ダークモード' }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonButton, IonIcon, IonPopover, IonContent,
  IonList, IonItem, IonItemDivider, IonLabel,
} from '@ionic/vue';
import { menuOutline, moonOutline, sunnyOutline } from 'ionicons/icons';
import { useDarkMode } from '@/composables/useDarkMode';
import type { MenuAction } from '@/types';

const props = defineProps<{
  items: MenuAction[];
}>();

const emit = defineEmits<{
  select: [action: string];
}>();

const { isDark, toggle: toggleDarkMode } = useDarkMode();

const isOpen = ref(false);
const popoverEvent = ref<Event | null>(null);

const openPopover = (e: Event) => {
  popoverEvent.value = e;
  isOpen.value = true;
};

const selectAction = (action: string) => {
  isOpen.value = false;
  emit('select', action);
};

const toggleDark = () => {
  toggleDarkMode();
  isOpen.value = false;
};
</script>
```

- [ ] **Step 2: PageLayout コンポーネントを作成**

`src/components/PageLayout.vue`:

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button v-if="backHref" :default-href="backHref" />
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ActionMenu
            :items="menuItems"
            @select="(action) => emit('menu-select', action)"
          />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :class="contentClass">
      <slot />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonBackButton, IonContent,
} from '@ionic/vue';
import ActionMenu from '@/components/ActionMenu.vue';
import type { MenuAction } from '@/types';

withDefaults(defineProps<{
  title: string;
  backHref?: string;
  menuItems?: MenuAction[];
  contentClass?: string;
}>(), {
  backHref: '/home',
  menuItems: () => [],
  contentClass: 'ion-padding',
});

const emit = defineEmits<{
  'menu-select': [action: string];
}>();
</script>
```

- [ ] **Step 3: コミット**

```bash
git add src/components/PageLayout.vue src/components/ActionMenu.vue
git commit -m "feat: PageLayout + ActionMenu 共通コンポーネント（ダークモード切替付き）"
```

---

### Task 5: 共通コンポーネント — ScanInput + NumberInput + ScannerStatus

**Files:**
- Create: `src/components/ScanInput.vue`
- Create: `src/components/NumberInput.vue`
- Create: `src/components/ScannerStatus.vue`

- [ ] **Step 1: ScanInput コンポーネントを作成**

スキャンボタン付き入力欄。v-modelで値をバインドし、スキャンボタン押下時にイベントを発火。

`src/components/ScanInput.vue`:

```vue
<template>
  <ion-item>
    <ion-input
      :value="modelValue"
      :label="label"
      label-placement="stacked"
      :placeholder="placeholder"
      @ion-input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @ion-focus="emit('focus')"
    />
    <ion-button slot="end" fill="clear" @click="emit('scan')">
      <ion-icon :icon="scanOutline" />
    </ion-button>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonInput, IonButton, IonIcon } from '@ionic/vue';
import { scanOutline } from 'ionicons/icons';

defineProps<{
  modelValue: string;
  label: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  scan: [];
  focus: [];
}>();
</script>
```

- [ ] **Step 2: NumberInput コンポーネントを作成**

`src/components/NumberInput.vue`:

```vue
<template>
  <ion-item>
    <ion-input
      :value="modelValue"
      :label="label"
      label-placement="stacked"
      type="number"
      :placeholder="placeholder"
      :min="min"
      @ion-input="onInput"
    />
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonInput } from '@ionic/vue';

defineProps<{
  modelValue: number;
  label: string;
  placeholder?: string;
  min?: number;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const onInput = (event: CustomEvent) => {
  const val = Number((event.target as HTMLInputElement).value);
  emit('update:modelValue', isNaN(val) ? 0 : val);
};
</script>
```

- [ ] **Step 3: ScannerStatus コンポーネントを作成**

`src/components/ScannerStatus.vue`:

```vue
<template>
  <ion-chip :color="color">
    <ion-icon :icon="icon" />
    <ion-label>スキャナ: {{ statusLabel }}</ion-label>
  </ion-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonChip, IonIcon, IonLabel } from '@ionic/vue';
import { bluetoothOutline, closeCircleOutline, helpCircleOutline } from 'ionicons/icons';
import type { ScannerStatus } from '@/types';

const props = defineProps<{
  status: ScannerStatus;
}>();

const color = computed(() => {
  switch (props.status) {
    case 'connected': return 'success';
    case 'disconnected': return 'danger';
    default: return 'medium';
  }
});

const icon = computed(() => {
  switch (props.status) {
    case 'connected': return bluetoothOutline;
    case 'disconnected': return closeCircleOutline;
    default: return helpCircleOutline;
  }
});

const statusLabel = computed(() => {
  switch (props.status) {
    case 'connected': return '接続中';
    case 'disconnected': return '未接続';
    default: return '不明';
  }
});
</script>
```

- [ ] **Step 4: コミット**

```bash
git add src/components/ScanInput.vue src/components/NumberInput.vue src/components/ScannerStatus.vue
git commit -m "feat: ScanInput + NumberInput + ScannerStatus 共通コンポーネント"
```

---

### Task 6: 共通コンポーネント — SearchBar + ResultCard + DataList

**Files:**
- Create: `src/components/SearchBar.vue`
- Create: `src/components/ResultCard.vue`
- Create: `src/components/DataList.vue`

- [ ] **Step 1: SearchBar コンポーネントを作成**

`src/components/SearchBar.vue`:

```vue
<template>
  <ion-item>
    <ion-input
      :value="modelValue"
      :label="label"
      label-placement="stacked"
      :placeholder="placeholder"
      @ion-input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keyup.enter="emit('search')"
    />
    <ion-button slot="end" fill="clear" @click="emit('scan')">
      <ion-icon :icon="scanOutline" />
    </ion-button>
    <ion-button slot="end" fill="clear" @click="emit('search')" :disabled="!modelValue">
      <ion-icon :icon="searchOutline" />
    </ion-button>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonInput, IonButton, IonIcon } from '@ionic/vue';
import { scanOutline, searchOutline } from 'ionicons/icons';

defineProps<{
  modelValue: string;
  label?: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  search: [];
  scan: [];
}>();
</script>
```

- [ ] **Step 2: ResultCard コンポーネントを作成**

`src/components/ResultCard.vue`:

```vue
<template>
  <ion-card v-if="visible">
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
      <ion-card-subtitle v-if="subtitle">{{ subtitle }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-list lines="none">
        <ion-item v-for="(item, index) in items" :key="index">
          <ion-label>{{ item.label }}</ion-label>
          <ion-note slot="end">{{ item.value }}</ion-note>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonList, IonItem, IonLabel, IonNote,
} from '@ionic/vue';

defineProps<{
  visible: boolean;
  title: string;
  subtitle?: string;
  items: { label: string; value: string | number }[];
}>();
</script>
```

- [ ] **Step 3: DataList コンポーネントを作成**

`src/components/DataList.vue`:

```vue
<template>
  <ion-list>
    <ion-item
      v-for="item in items"
      :key="item.id"
      button
      :detail="selectable"
      @click="emit('select', item.id)"
    >
      <ion-label>
        <h2>{{ item.title }}</h2>
        <p v-if="item.subtitle">{{ item.subtitle }}</p>
      </ion-label>
      <ion-note v-if="item.note" slot="end">{{ item.note }}</ion-note>
    </ion-item>
    <ion-item v-if="items.length === 0">
      <ion-label color="medium">{{ emptyMessage }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonNote } from '@ionic/vue';
import type { DataListItem } from '@/types';

withDefaults(defineProps<{
  items: DataListItem[];
  selectable?: boolean;
  emptyMessage?: string;
}>(), {
  selectable: true,
  emptyMessage: 'データがありません',
});

const emit = defineEmits<{
  select: [id: string];
}>();
</script>
```

- [ ] **Step 4: コミット**

```bash
git add src/components/SearchBar.vue src/components/ResultCard.vue src/components/DataList.vue
git commit -m "feat: SearchBar + ResultCard + DataList 共通コンポーネント"
```

---

### Task 7: 共通コンポーネント — SelectPopup + SubmitButton + FeedbackToast

**Files:**
- Create: `src/components/SelectPopup.vue`
- Create: `src/components/SubmitButton.vue`
- Create: `src/components/FeedbackToast.vue`

- [ ] **Step 1: SelectPopup コンポーネントを作成**

`src/components/SelectPopup.vue`:

```vue
<template>
  <ion-modal :is-open="isOpen" @did-dismiss="emit('close')">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="emit('close')">閉じる</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          v-for="option in options"
          :key="option.value"
          button
          :detail="false"
          @click="select(option.value)"
        >
          <ion-label>{{ option.label }}</ion-label>
          <ion-icon
            v-if="option.value === selectedValue"
            :icon="checkmarkOutline"
            slot="end"
            color="primary"
          />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonModal, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonButton, IonContent,
  IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/vue';
import { checkmarkOutline } from 'ionicons/icons';
import type { SelectOption } from '@/types';

defineProps<{
  isOpen: boolean;
  title: string;
  options: SelectOption[];
  selectedValue?: string;
}>();

const emit = defineEmits<{
  close: [];
  select: [value: string];
}>();

const select = (value: string) => {
  emit('select', value);
  emit('close');
};
</script>
```

- [ ] **Step 2: SubmitButton コンポーネントを作成**

`src/components/SubmitButton.vue`:

```vue
<template>
  <ion-button
    expand="block"
    class="ion-margin-top"
    :disabled="disabled || loading"
    @click="emit('submit')"
  >
    <ion-spinner v-if="loading" name="crescent" slot="start" />
    {{ loading ? loadingLabel : label }}
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton, IonSpinner } from '@ionic/vue';

withDefaults(defineProps<{
  label?: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
}>(), {
  label: '登録',
  loadingLabel: '送信中...',
  loading: false,
  disabled: false,
});

const emit = defineEmits<{
  submit: [];
}>();
</script>
```

- [ ] **Step 3: FeedbackToast コンポーネントを作成**

`src/components/FeedbackToast.vue`:

```vue
<template>
  <ion-toast
    :is-open="!!message"
    :message="message"
    :color="color"
    :duration="duration"
    @did-dismiss="emit('dismiss')"
  />
</template>

<script setup lang="ts">
import { IonToast } from '@ionic/vue';

withDefaults(defineProps<{
  message: string;
  color?: string;
  duration?: number;
}>(), {
  color: 'success',
  duration: 3000,
});

const emit = defineEmits<{
  dismiss: [];
}>();
</script>
```

- [ ] **Step 4: コミット**

```bash
git add src/components/SelectPopup.vue src/components/SubmitButton.vue src/components/FeedbackToast.vue
git commit -m "feat: SelectPopup + SubmitButton + FeedbackToast 共通コンポーネント"
```

---

### Task 8: サンプル — 共通コンポーネント一覧ページ

**Files:**
- Create: `src/views/samples/ComponentsPage.vue`

- [ ] **Step 1: 全共通コンポーネントを展示するサンプルページを作成**

`src/views/samples/ComponentsPage.vue`:

```vue
<template>
  <PageLayout
    title="コンポーネント一覧"
    :menu-items="sampleMenuItems"
    @menu-select="onMenuSelect"
  >
    <p class="ion-padding-horizontal ion-text-center">
      業務画面で使用する共通コンポーネントの一覧です。
    </p>

    <!-- ScannerStatus -->
    <ion-list-header><ion-label>ScannerStatus</ion-label></ion-list-header>
    <div class="ion-padding-horizontal">
      <ScannerStatus status="connected" />
      <ScannerStatus status="disconnected" />
      <ScannerStatus status="unknown" />
    </div>

    <!-- ScanInput -->
    <ion-list-header class="ion-margin-top"><ion-label>ScanInput</ion-label></ion-list-header>
    <ion-list>
      <ScanInput
        v-model="demoScanValue"
        label="スキャン入力サンプル"
        placeholder="スキャンまたは入力"
        @scan="onDemoScan"
      />
    </ion-list>
    <p class="ion-padding-horizontal">値: {{ demoScanValue || '(未入力)' }}</p>

    <!-- NumberInput -->
    <ion-list-header class="ion-margin-top"><ion-label>NumberInput</ion-label></ion-list-header>
    <ion-list>
      <NumberInput
        v-model="demoNumberValue"
        label="数量入力サンプル"
        placeholder="0"
        :min="0"
      />
    </ion-list>
    <p class="ion-padding-horizontal">値: {{ demoNumberValue }}</p>

    <!-- SearchBar -->
    <ion-list-header class="ion-margin-top"><ion-label>SearchBar</ion-label></ion-list-header>
    <ion-list>
      <SearchBar
        v-model="demoSearchValue"
        label="検索サンプル"
        placeholder="検索キーワード"
        @search="onDemoSearch"
        @scan="onDemoScan"
      />
    </ion-list>
    <p class="ion-padding-horizontal">検索値: {{ demoSearchValue || '(未入力)' }}</p>

    <!-- ResultCard -->
    <ion-list-header class="ion-margin-top"><ion-label>ResultCard</ion-label></ion-list-header>
    <ResultCard
      :visible="true"
      title="サンプル品目"
      subtitle="ITEM-001"
      :items="[
        { label: 'ロケーション', value: 'A-01-03' },
        { label: '在庫数', value: 150 },
        { label: '単位', value: '個' },
      ]"
    />

    <!-- DataList -->
    <ion-list-header class="ion-margin-top"><ion-label>DataList</ion-label></ion-list-header>
    <DataList
      :items="demoListItems"
      @select="onDemoListSelect"
    />
    <p class="ion-padding-horizontal">選択: {{ demoSelectedId || '(未選択)' }}</p>

    <!-- SelectPopup -->
    <ion-list-header class="ion-margin-top"><ion-label>SelectPopup</ion-label></ion-list-header>
    <div class="ion-padding-horizontal">
      <ion-button @click="showSelectPopup = true">ポップアップを開く</ion-button>
      <p>選択値: {{ demoSelectValue || '(未選択)' }}</p>
    </div>
    <SelectPopup
      :is-open="showSelectPopup"
      title="選択してください"
      :options="demoSelectOptions"
      :selected-value="demoSelectValue"
      @select="(v) => demoSelectValue = v"
      @close="showSelectPopup = false"
    />

    <!-- SubmitButton -->
    <ion-list-header class="ion-margin-top"><ion-label>SubmitButton</ion-label></ion-list-header>
    <div class="ion-padding-horizontal">
      <SubmitButton label="登録" @submit="onDemoSubmit" :loading="demoLoading" />
      <SubmitButton label="照合・送信" loading-label="照合中..." @submit="onDemoSubmit" :loading="demoLoading" />
      <SubmitButton label="無効状態" :disabled="true" @submit="onDemoSubmit" />
    </div>

    <!-- FeedbackToast -->
    <ion-list-header class="ion-margin-top"><ion-label>FeedbackToast</ion-label></ion-list-header>
    <div class="ion-padding-horizontal ion-padding-bottom">
      <ion-button color="success" @click="showSuccessToast">成功Toast</ion-button>
      <ion-button color="danger" @click="showErrorToast">エラーToast</ion-button>
    </div>

    <FeedbackToast
      :message="toastMessage"
      :color="toastColor"
      @dismiss="toastMessage = ''"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonList, IonListHeader, IonLabel, IonButton } from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import ScanInput from '@/components/ScanInput.vue';
import NumberInput from '@/components/NumberInput.vue';
import SearchBar from '@/components/SearchBar.vue';
import ResultCard from '@/components/ResultCard.vue';
import DataList from '@/components/DataList.vue';
import SelectPopup from '@/components/SelectPopup.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import type { MenuAction, DataListItem, SelectOption } from '@/types';

const sampleMenuItems: MenuAction[] = [
  { label: 'サンプルアクション1', action: 'sample1' },
  { label: 'サンプルアクション2', action: 'sample2' },
];

const onMenuSelect = (action: string) => {
  alert(`メニュー選択: ${action}`);
};

// ScanInput demo
const demoScanValue = ref('');
const onDemoScan = () => {
  demoScanValue.value = 'SCAN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
};

// NumberInput demo
const demoNumberValue = ref(0);

// SearchBar demo
const demoSearchValue = ref('');
const onDemoSearch = () => {
  alert(`検索実行: ${demoSearchValue.value}`);
};

// DataList demo
const demoListItems: DataListItem[] = [
  { id: '1', title: '品目A', subtitle: 'A-01-01', note: '100個' },
  { id: '2', title: '品目B', subtitle: 'B-02-03', note: '50個' },
  { id: '3', title: '品目C', subtitle: 'C-01-02', note: '200個' },
];
const demoSelectedId = ref('');
const onDemoListSelect = (id: string) => {
  demoSelectedId.value = id;
};

// SelectPopup demo
const showSelectPopup = ref(false);
const demoSelectValue = ref('');
const demoSelectOptions: SelectOption[] = [
  { label: 'QRコード読み取り', value: 'qr' },
  { label: 'バーコード読み取り', value: 'barcode' },
  { label: '手入力', value: 'manual' },
];

// SubmitButton demo
const demoLoading = ref(false);
const onDemoSubmit = () => {
  demoLoading.value = true;
  setTimeout(() => { demoLoading.value = false; }, 2000);
};

// FeedbackToast demo
const toastMessage = ref('');
const toastColor = ref('success');
const showSuccessToast = () => {
  toastMessage.value = '操作が成功しました';
  toastColor.value = 'success';
};
const showErrorToast = () => {
  toastMessage.value = 'エラーが発生しました';
  toastColor.value = 'danger';
};
</script>
```

- [ ] **Step 2: 開発サーバーで確認**

```bash
ionic serve
```

Expected: `/samples/components` で全共通コンポーネントが表示・操作できる。右上のハンバーガーメニューにサンプルアクション + ダークモード切替が表示される。

- [ ] **Step 3: コミット**

```bash
mkdir -p src/views/samples
git add src/views/samples/ComponentsPage.vue
git commit -m "feat: 共通コンポーネント一覧サンプルページ（全部品の動作確認）"
```

---

### Task 9: サンプル — スキャン入力デモ

**Files:**
- Create: `src/views/samples/ScanDemoPage.vue`

- [ ] **Step 1: スキャン入力デモページを作成（共通コンポーネントを使用）**

`src/views/samples/ScanDemoPage.vue`:

```vue
<template>
  <PageLayout
    title="スキャン入力デモ"
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <ScannerStatus :status="status" />

    <p class="ion-margin-top">
      各欄のスキャンボタンを押すと、SP2モック経由でスキャン結果が入力されます。
    </p>

    <ion-list>
      <ScanInput
        v-for="(field, index) in fields"
        :key="index"
        v-model="field.value"
        :label="field.label"
        :placeholder="'フィールド ' + (index + 1)"
        @focus="activeIndex = index"
        @scan="scanTo(index)"
      />
    </ion-list>

    <ion-button
      expand="block"
      fill="outline"
      class="ion-margin-top"
      @click="addField"
    >
      入力欄を追加
    </ion-button>

    <ResultCard
      :visible="scanLog.length > 0"
      title="スキャン結果ログ"
      :items="scanLog.map((log) => ({
        label: log.timestamp + ' → ' + log.fieldLabel,
        value: log.value + ' (' + log.format + ')',
      }))"
    />

    <ion-button
      expand="block"
      color="medium"
      class="ion-margin-top"
      @click="clearAll"
    >
      全てクリア
    </ion-button>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { IonList, IonButton } from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import ScanInput from '@/components/ScanInput.vue';
import ResultCard from '@/components/ResultCard.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import type { MenuAction } from '@/types';

interface Field {
  label: string;
  value: string;
}

interface ScanLogEntry {
  timestamp: string;
  fieldLabel: string;
  value: string;
  format: string;
}

const menuItems: MenuAction[] = [
  { label: 'QRコード読み取り', action: 'qr' },
  { label: 'バーコード読み取り', action: 'barcode' },
];

const onMenuSelect = (action: string) => {
  alert(`スキャンモード: ${action}`);
};

const { status, startScan, onScanResult } = useSP2Scanner();

const fields = reactive<Field[]>([
  { label: 'フィールド1', value: '' },
  { label: 'フィールド2', value: '' },
  { label: 'フィールド3', value: '' },
]);

const activeIndex = ref(0);
const scanLog = ref<ScanLogEntry[]>([]);

const scanTo = async (index: number) => {
  activeIndex.value = index;
  await startScan();
};

onScanResult((result) => {
  fields[activeIndex.value].value = result.value;
  scanLog.value.unshift({
    timestamp: new Date().toLocaleTimeString(),
    fieldLabel: fields[activeIndex.value].label,
    value: result.value,
    format: result.format,
  });
});

const addField = () => {
  const n = fields.length + 1;
  fields.push({ label: `フィールド${n}`, value: '' });
};

const clearAll = () => {
  fields.forEach((f) => { f.value = ''; });
  scanLog.value = [];
};
</script>
```

- [ ] **Step 2: コミット**

```bash
git add src/views/samples/ScanDemoPage.vue
git commit -m "feat: スキャン入力デモページ（共通コンポーネント使用）"
```

---

### Task 10: ホーム画面

**Files:**
- Create: `src/views/HomePage.vue`

- [ ] **Step 1: ホーム画面を作成（PageLayoutを使用）**

`src/views/HomePage.vue`:

```vue
<template>
  <PageLayout title="倉庫管理" :back-href="''" :menu-items="[]">
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

    <ion-list-header class="ion-margin-top">
      <ion-label>サンプル</ion-label>
    </ion-list-header>
    <ion-list>
      <ion-item
        v-for="sample in samples"
        :key="sample.path"
        :router-link="sample.path"
        detail
      >
        <ion-icon :icon="sample.icon" slot="start" />
        <ion-label>{{ sample.title }}</ion-label>
      </ion-item>
    </ion-list>
  </PageLayout>
</template>

<script setup lang="ts">
import { IonList, IonListHeader, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import {
  downloadOutline, pushOutline, clipboardOutline,
  searchOutline, swapHorizontalOutline,
  appsOutline, scanOutline,
} from 'ionicons/icons';
import PageLayout from '@/components/PageLayout.vue';

const menus = [
  { title: '入荷検品', description: '商品スキャン → 入荷登録', path: '/receiving', icon: downloadOutline },
  { title: '出荷検品', description: '出荷指示照合 → 結果送信', path: '/shipping', icon: pushOutline },
  { title: '棚卸し', description: 'ロケーション・品目 → 数量確認', path: '/stocktaking', icon: clipboardOutline },
  { title: '在庫照会', description: '品目スキャン → 在庫情報表示', path: '/inventory', icon: searchOutline },
  { title: 'ロケーション移動', description: '移動元・移動先・品目を記録', path: '/relocation', icon: swapHorizontalOutline },
];

const samples = [
  { title: 'コンポーネント一覧', path: '/samples/components', icon: appsOutline },
  { title: 'スキャン入力デモ', path: '/samples/scan-demo', icon: scanOutline },
];
</script>
```

- [ ] **Step 2: コミット**

```bash
git add src/views/HomePage.vue
git commit -m "feat: ホーム画面（PageLayout使用）"
```

---

### Task 11: 業務画面 — 入荷検品（共通コンポーネント使用）

**Files:**
- Create: `src/views/ReceivingPage.vue`

- [ ] **Step 1: 入荷検品画面を作成**

`src/views/ReceivingPage.vue`:

```vue
<template>
  <PageLayout
    title="入荷検品"
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <ScannerStatus :status="status" />

    <ion-list class="ion-margin-top">
      <ScanInput
        v-model="form.location"
        label="ロケーション"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'location'"
        @scan="scanTo('location')"
      />
      <ScanInput
        v-model="form.itemCode"
        label="品目コード"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'itemCode'"
        @scan="scanTo('itemCode')"
      />
      <NumberInput
        v-model="form.quantity"
        label="数量"
        placeholder="数量を入力"
        :min="0"
      />
      <ScanInput
        v-model="form.lotNumber!"
        label="ロット番号"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'lotNumber'"
        @scan="scanTo('lotNumber')"
      />
    </ion-list>

    <SubmitButton label="登録" :loading="loading" @submit="submit" />

    <FeedbackToast
      :message="toastMessage"
      :color="toastColor"
      @dismiss="toastMessage = ''"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { IonList } from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import ScanInput from '@/components/ScanInput.vue';
import NumberInput from '@/components/NumberInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import { useApi } from '@/composables/useApi';
import type { ReceivingItem, MenuAction } from '@/types';

type ScannableField = 'location' | 'itemCode' | 'lotNumber';

const menuItems: MenuAction[] = [
  { label: 'QRコード読み取り', action: 'qr' },
  { label: 'バーコード読み取り', action: 'barcode' },
];

const onMenuSelect = (action: string) => {
  console.log('スキャンモード:', action);
};

const { status, startScan, onScanResult } = useSP2Scanner();
const { loading, post } = useApi();

const form = reactive<ReceivingItem>({
  location: '',
  itemCode: '',
  quantity: 1,
  lotNumber: '',
});

const activeField = ref<ScannableField>('location');
const toastMessage = ref('');
const toastColor = ref('success');

const scanTo = async (field: ScannableField) => {
  activeField.value = field;
  await startScan();
};

onScanResult((result) => {
  if (activeField.value === 'lotNumber') {
    form.lotNumber = result.value;
  } else {
    form[activeField.value] = result.value;
  }
});

const submit = async () => {
  const res = await post('/receiving', form);
  if (res.success) {
    toastMessage.value = '登録しました';
    toastColor.value = 'success';
    form.location = '';
    form.itemCode = '';
    form.quantity = 1;
    form.lotNumber = '';
  } else {
    toastMessage.value = res.error || '登録に失敗しました';
    toastColor.value = 'danger';
  }
};
</script>
```

- [ ] **Step 2: コミット**

```bash
git add src/views/ReceivingPage.vue
git commit -m "feat: 入荷検品画面（共通コンポーネント使用）"
```

---

### Task 12: 業務画面 — 出荷検品

**Files:**
- Create: `src/views/ShippingPage.vue`

- [ ] **Step 1: 出荷検品画面を作成**

`src/views/ShippingPage.vue`:

```vue
<template>
  <PageLayout
    title="出荷検品"
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <ScannerStatus :status="status" />

    <ion-list class="ion-margin-top">
      <ScanInput
        v-model="form.shippingOrderId"
        label="出荷指示番号"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'shippingOrderId'"
        @scan="scanTo('shippingOrderId')"
      />
      <ScanInput
        v-model="form.itemCode"
        label="品目コード"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'itemCode'"
        @scan="scanTo('itemCode')"
      />
      <NumberInput
        v-model="form.quantity"
        label="数量"
        placeholder="数量を入力"
        :min="0"
      />
    </ion-list>

    <SubmitButton label="照合・送信" loading-label="照合中..." :loading="loading" @submit="submit" />

    <FeedbackToast
      :message="toastMessage"
      :color="toastColor"
      @dismiss="toastMessage = ''"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { IonList } from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import ScanInput from '@/components/ScanInput.vue';
import NumberInput from '@/components/NumberInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import { useApi } from '@/composables/useApi';
import type { ShippingItem, MenuAction } from '@/types';

type ScannableField = 'shippingOrderId' | 'itemCode';

const menuItems: MenuAction[] = [
  { label: 'QRコード読み取り', action: 'qr' },
  { label: 'バーコード読み取り', action: 'barcode' },
];

const onMenuSelect = (action: string) => {
  console.log('スキャンモード:', action);
};

const { status, startScan, onScanResult } = useSP2Scanner();
const { loading, post } = useApi();

const form = reactive<ShippingItem>({
  shippingOrderId: '',
  itemCode: '',
  quantity: 1,
});

const activeField = ref<ScannableField>('shippingOrderId');
const toastMessage = ref('');
const toastColor = ref('success');

const scanTo = async (field: ScannableField) => {
  activeField.value = field;
  await startScan();
};

onScanResult((result) => {
  form[activeField.value] = result.value;
});

const submit = async () => {
  const res = await post('/shipping/verify', form);
  if (res.success) {
    toastMessage.value = '照合完了';
    toastColor.value = 'success';
    form.shippingOrderId = '';
    form.itemCode = '';
    form.quantity = 1;
  } else {
    toastMessage.value = res.error || '照合に失敗しました';
    toastColor.value = 'danger';
  }
};
</script>
```

- [ ] **Step 2: コミット**

```bash
git add src/views/ShippingPage.vue
git commit -m "feat: 出荷検品画面（共通コンポーネント使用）"
```

---

### Task 13: 業務画面 — 棚卸し

**Files:**
- Create: `src/views/StocktakingPage.vue`

- [ ] **Step 1: 棚卸し画面を作成**

`src/views/StocktakingPage.vue`:

```vue
<template>
  <PageLayout
    title="棚卸し"
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <ScannerStatus :status="status" />

    <ion-list class="ion-margin-top">
      <ScanInput
        v-model="form.location"
        label="ロケーション"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'location'"
        @scan="scanTo('location')"
      />
      <ScanInput
        v-model="form.itemCode"
        label="品目コード"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'itemCode'"
        @scan="scanTo('itemCode')"
      />
      <NumberInput
        v-model="form.actualQuantity"
        label="実数量"
        placeholder="数量を入力"
        :min="0"
      />
    </ion-list>

    <SubmitButton label="登録" :loading="loading" @submit="submit" />

    <FeedbackToast
      :message="toastMessage"
      :color="toastColor"
      @dismiss="toastMessage = ''"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { IonList } from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import ScanInput from '@/components/ScanInput.vue';
import NumberInput from '@/components/NumberInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import { useApi } from '@/composables/useApi';
import type { StocktakingItem, MenuAction } from '@/types';

type ScannableField = 'location' | 'itemCode';

const menuItems: MenuAction[] = [
  { label: 'QRコード読み取り', action: 'qr' },
  { label: 'バーコード読み取り', action: 'barcode' },
];

const onMenuSelect = (action: string) => {
  console.log('スキャンモード:', action);
};

const { status, startScan, onScanResult } = useSP2Scanner();
const { loading, post } = useApi();

const form = reactive<StocktakingItem>({
  location: '',
  itemCode: '',
  actualQuantity: 0,
});

const activeField = ref<ScannableField>('location');
const toastMessage = ref('');
const toastColor = ref('success');

const scanTo = async (field: ScannableField) => {
  activeField.value = field;
  await startScan();
};

onScanResult((result) => {
  form[activeField.value] = result.value;
});

const submit = async () => {
  const res = await post('/stocktaking', form);
  if (res.success) {
    toastMessage.value = '登録しました';
    toastColor.value = 'success';
    form.location = '';
    form.itemCode = '';
    form.actualQuantity = 0;
  } else {
    toastMessage.value = res.error || '登録に失敗しました';
    toastColor.value = 'danger';
  }
};
</script>
```

- [ ] **Step 2: コミット**

```bash
git add src/views/StocktakingPage.vue
git commit -m "feat: 棚卸し画面（共通コンポーネント使用）"
```

---

### Task 14: 業務画面 — 在庫照会

**Files:**
- Create: `src/views/InventoryPage.vue`

- [ ] **Step 1: 在庫照会画面を作成**

`src/views/InventoryPage.vue`:

```vue
<template>
  <PageLayout
    title="在庫照会"
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <ScannerStatus :status="status" />

    <ion-list class="ion-margin-top">
      <SearchBar
        v-model="itemCode"
        label="品目コード"
        placeholder="スキャンまたは入力して検索"
        @search="search"
        @scan="scanAndSearch"
      />
    </ion-list>

    <ResultCard
      :visible="!!result"
      :title="result?.itemName ?? ''"
      :subtitle="result?.itemCode ?? ''"
      :items="resultItems"
    />

    <FeedbackToast
      :message="errorMessage"
      color="danger"
      @dismiss="errorMessage = ''"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonList } from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import SearchBar from '@/components/SearchBar.vue';
import ResultCard from '@/components/ResultCard.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import { useApi } from '@/composables/useApi';
import type { InventoryInfo, MenuAction } from '@/types';

const menuItems: MenuAction[] = [
  { label: 'QRコード読み取り', action: 'qr' },
  { label: 'バーコード読み取り', action: 'barcode' },
  { label: 'リスト検索', action: 'list-search' },
];

const onMenuSelect = (action: string) => {
  console.log('モード:', action);
};

const { status, startScan, onScanResult } = useSP2Scanner();
const { get } = useApi();

const itemCode = ref('');
const result = ref<InventoryInfo | null>(null);
const errorMessage = ref('');

const resultItems = computed(() => {
  if (!result.value) return [];
  return [
    { label: 'ロケーション', value: result.value.location },
    { label: '在庫数', value: result.value.quantity },
  ];
});

onScanResult((scanResult) => {
  itemCode.value = scanResult.value;
  search();
});

const scanAndSearch = async () => {
  await startScan();
};

const search = async () => {
  result.value = null;
  const res = await get<InventoryInfo>(`/inventory/${encodeURIComponent(itemCode.value)}`);
  if (res.success && res.data) {
    result.value = res.data;
  } else {
    errorMessage.value = res.error || '在庫情報が見つかりません';
  }
};
</script>
```

- [ ] **Step 2: コミット**

```bash
git add src/views/InventoryPage.vue
git commit -m "feat: 在庫照会画面（共通コンポーネント使用）"
```

---

### Task 15: 業務画面 — ロケーション移動

**Files:**
- Create: `src/views/RelocationPage.vue`

- [ ] **Step 1: ロケーション移動画面を作成**

`src/views/RelocationPage.vue`:

```vue
<template>
  <PageLayout
    title="ロケーション移動"
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <ScannerStatus :status="status" />

    <ion-list class="ion-margin-top">
      <ScanInput
        v-model="form.fromLocation"
        label="移動元ロケーション"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'fromLocation'"
        @scan="scanTo('fromLocation')"
      />
      <ScanInput
        v-model="form.toLocation"
        label="移動先ロケーション"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'toLocation'"
        @scan="scanTo('toLocation')"
      />
      <ScanInput
        v-model="form.itemCode"
        label="品目コード"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'itemCode'"
        @scan="scanTo('itemCode')"
      />
      <NumberInput
        v-model="form.quantity"
        label="数量"
        placeholder="数量を入力"
        :min="0"
      />
    </ion-list>

    <SubmitButton label="移動登録" :loading="loading" @submit="submit" />

    <FeedbackToast
      :message="toastMessage"
      :color="toastColor"
      @dismiss="toastMessage = ''"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { IonList } from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import ScanInput from '@/components/ScanInput.vue';
import NumberInput from '@/components/NumberInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import { useApi } from '@/composables/useApi';
import type { RelocationItem, MenuAction } from '@/types';

type ScannableField = 'fromLocation' | 'toLocation' | 'itemCode';

const menuItems: MenuAction[] = [
  { label: 'QRコード読み取り', action: 'qr' },
  { label: 'バーコード読み取り', action: 'barcode' },
];

const onMenuSelect = (action: string) => {
  console.log('スキャンモード:', action);
};

const { status, startScan, onScanResult } = useSP2Scanner();
const { loading, post } = useApi();

const form = reactive<RelocationItem>({
  fromLocation: '',
  toLocation: '',
  itemCode: '',
  quantity: 1,
});

const activeField = ref<ScannableField>('fromLocation');
const toastMessage = ref('');
const toastColor = ref('success');

const scanTo = async (field: ScannableField) => {
  activeField.value = field;
  await startScan();
};

onScanResult((result) => {
  form[activeField.value] = result.value;
});

const submit = async () => {
  const res = await post('/relocation', form);
  if (res.success) {
    toastMessage.value = '移動を登録しました';
    toastColor.value = 'success';
    form.fromLocation = '';
    form.toLocation = '';
    form.itemCode = '';
    form.quantity = 1;
  } else {
    toastMessage.value = res.error || '登録に失敗しました';
    toastColor.value = 'danger';
  }
};
</script>
```

- [ ] **Step 2: コミット**

```bash
git add src/views/RelocationPage.vue
git commit -m "feat: ロケーション移動画面（共通コンポーネント使用）"
```

---

### Task 16: SP2 Local Plugin（Java側スタブ）

**Files:**
- Create: `android/app/src/main/java/io/ionic/starter/sp2/SP2Plugin.java`
- Modify: `android/app/src/main/java/io/ionic/starter/MainActivity.java`
- Modify: `android/app/build.gradle`

- [ ] **Step 1: build.gradleにlibs依存を追加**

`android/app/build.gradle` の `dependencies` ブロックに以下を追加:

```groovy
implementation fileTree(dir: 'libs', include: ['*.aar', '*.jar'])
```

- [ ] **Step 2: SP2Plugin.javaを作成**

AARが手元にないため、スタブ実装とする。AAR入手後にSDK呼び出しを差し替える。

`android/app/src/main/java/io/ionic/starter/sp2/SP2Plugin.java`:

```java
package io.ionic.starter.sp2;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "SP2Scanner")
public class SP2Plugin extends Plugin {

    @PluginMethod()
    public void initialize(PluginCall call) {
        // TODO: SP2 AAR SDKの初期化処理をここに実装
        JSObject result = new JSObject();
        result.put("success", true);
        call.resolve(result);
    }

    @PluginMethod()
    public void startScan(PluginCall call) {
        // TODO: SP2 AAR SDKのスキャン開始処理をここに実装
        // 例:
        // sp2Manager.startScan(new ScanCallback() {
        //     @Override
        //     public void onScanResult(String value, String format) {
        //         JSObject data = new JSObject();
        //         data.put("value", value);
        //         data.put("format", format);
        //         notifyListeners("scanResult", data);
        //     }
        // });

        // スタブ: 1秒後にモックデータを返す
        getActivity().getWindow().getDecorView().postDelayed(() -> {
            JSObject data = new JSObject();
            data.put("value", "STUB-" + System.currentTimeMillis());
            data.put("format", "CODE128");
            notifyListeners("scanResult", data);
        }, 1000);

        call.resolve();
    }

    @PluginMethod()
    public void stopScan(PluginCall call) {
        // TODO: SP2 AAR SDKのスキャン停止処理
        call.resolve();
    }

    @PluginMethod()
    public void getStatus(PluginCall call) {
        // TODO: SP2 AAR SDKから接続状態を取得
        JSObject result = new JSObject();
        result.put("status", "connected");
        call.resolve(result);
    }

    @PluginMethod()
    public void destroy(PluginCall call) {
        // TODO: SP2 AAR SDKの解放処理
        call.resolve();
    }
}
```

- [ ] **Step 3: MainActivityにプラグインを登録**

`android/app/src/main/java/io/ionic/starter/MainActivity.java` を以下に変更:

```java
package io.ionic.starter;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import io.ionic.starter.sp2.SP2Plugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(SP2Plugin.class);
        super.onCreate(savedInstanceState);
    }
}
```

- [ ] **Step 4: libsディレクトリを作成**

```bash
mkdir -p android/app/libs
echo "SP2のAARファイルをここに配置してください" > android/app/libs/README.md
```

- [ ] **Step 5: ビルド確認**

```bash
ionic build
npx cap sync android
```

Expected: エラーなくビルド・同期が完了する

- [ ] **Step 6: コミット**

```bash
git add android/app/src/main/java/io/ionic/starter/sp2/SP2Plugin.java
git add android/app/src/main/java/io/ionic/starter/MainActivity.java
git add android/app/build.gradle
git add android/app/libs/README.md
git commit -m "feat: SP2 Local Plugin スタブ実装（AAR差し替え用）"
```

---

### Task 17: 全体動作確認

- [ ] **Step 1: ブラウザで全画面の動作確認**

```bash
ionic serve
```

確認項目:
- ホーム画面からすべての画面に遷移できる
- 各業務画面で共通コンポーネント（ScanInput, NumberInput, SubmitButton等）が正しく表示される
- スキャンボタン押下でモックデータが入力される
- 右上ハンバーガーメニューが各画面で表示され、画面ごとに異なるメニュー項目が出る
- ダークモード切替が全画面で正しく動作する
- コンポーネント一覧ページで全共通コンポーネントが表示・操作できる
- スキャンデモページでスキャン→入力→ログ表示が動作する
- 戻るボタンでホームに戻れる

- [ ] **Step 2: Android ビルド確認**

```bash
ionic build
npx cap sync android
npx cap open android
```

Expected: Android Studioが開き、プロジェクトがビルド可能な状態

- [ ] **Step 3: 最終コミット（必要であれば）**

```bash
git add -A
git commit -m "chore: 全体動作確認・微調整"
```
