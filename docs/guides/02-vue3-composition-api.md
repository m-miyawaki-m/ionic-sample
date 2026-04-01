# Vue 3 Composition API 実践ガイド

このガイドでは、本プロジェクト（倉庫在庫管理アプリ）で使われている Vue 3 Composition API の仕組みと書き方を、実際のコードを参照しながら解説する。

---

## 目次

1. [Composition API とは](#1-composition-api-とは)
2. [script setup 構文](#2-script-setup-構文)
3. [リアクティビティ](#3-リアクティビティ)
4. [コンポーネント間通信](#4-コンポーネント間通信)
5. [Composable（合成関数）パターン](#5-composable合成関数パターン)
6. [ライフサイクルフック](#6-ライフサイクルフック)
7. [テンプレート構文](#7-テンプレート構文)

---

## 1. Composition API とは

### Options API との違い

Vue 2 で主流だった Options API は、`data`、`methods`、`computed`、`watch` などのオプションごとにコードを分類する書き方だった。

```vue
<!-- Options API（Vue 2 スタイル） -->
<script>
export default {
  data() {
    return {
      itemCode: '',
      loading: false,
    };
  },
  computed: {
    isValid() {
      return this.itemCode.length > 0;
    },
  },
  methods: {
    async search() {
      this.loading = true;
      // ...
    },
  },
};
</script>
```

Composition API では、**関連するロジックをまとめて書ける**。「スキャナの状態管理」「API通信」「フォーム操作」といった **機能単位** でコードをグループ化できるため、コードの見通しが良くなる。

```vue
<!-- Composition API（Vue 3 スタイル） -->
<script setup lang="ts">
import { ref, computed } from 'vue';

// --- スキャナ関連 ---
const { status, startScan, onScanResult } = useSP2Scanner();

// --- フォーム関連 ---
const itemCode = ref('');
const loading = ref(false);
const isValid = computed(() => itemCode.value.length > 0);

async function search() {
  loading.value = true;
  // ...
}
</script>
```

### なぜ Composition API を使うか

| 観点 | Options API | Composition API |
|------|-------------|-----------------|
| コードの整理 | オプション種別ごとに分散 | 機能ごとにまとめられる |
| ロジックの再利用 | Mixin（名前衝突リスクあり） | Composable（型安全、明示的） |
| TypeScript | 型推論が弱い | 型推論がフルに効く |
| Ionic Vue | 利用可能 | **推奨**（公式ドキュメントも Composition API で記述） |

本プロジェクトでは全コンポーネントが Composition API で書かれている。特に、スキャナ制御（`useSP2Scanner`）やAPI通信（`useApi`）など、**画面を跨いで再利用するロジック** を composable として切り出しており、Composition API の利点を活かしている。

---

## 2. script setup 構文

`<script setup>` は Composition API の簡略記法で、本プロジェクトの全コンポーネントで採用している。

### 通常の Composition API と script setup の違い

```vue
<!-- 通常の Composition API -->
<script>
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    return { count }; // テンプレートに公開する変数を明示的に return
  },
};
</script>
```

```vue
<!-- script setup（本プロジェクトの書き方） -->
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
// return 不要 ── トップレベルの変数・関数がすべてテンプレートに公開される
</script>
```

### script setup の特徴

- `setup()` 関数と `return` の記述が不要
- トップレベルに宣言した変数・関数・import がテンプレートから直接参照できる
- `defineProps`、`defineEmits` などのコンパイラマクロが使える（import 不要）
- `lang="ts"` を付けると TypeScript が使える

本プロジェクトでは `<script setup lang="ts">` を統一的に使用している。以下は `ScannerStatus.vue` の例。

```vue
<!-- src/components/ScannerStatus.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { IonChip, IonIcon, IonLabel } from '@ionic/vue';
import { bluetoothOutline, closeCircleOutline, helpCircleOutline } from 'ionicons/icons';
import type { ScannerStatus } from '@/types';

const props = defineProps<{
  status: ScannerStatus;
}>();

// computed も関数も、そのままテンプレートから参照される
const color = computed(() => {
  switch (props.status) {
    case 'connected': return 'success';
    case 'disconnected': return 'danger';
    default: return 'medium';
  }
});
</script>
```

---

## 3. リアクティビティ

Vue 3 のリアクティビティシステムは、値の変更を自動的に検知してテンプレートを更新する仕組み。Composition API では `ref()` と `reactive()` を使い分ける。

### 3.1 ref() vs reactive()

#### ref() -- 単一の値を包む

`ref()` はプリミティブ値（string, number, boolean）やオブジェクトを「リアクティブな箱」に入れる。JavaScript 側では `.value` でアクセスする。テンプレート内では `.value` は不要（自動展開される）。

```typescript
// src/views/InventoryPage.vue より
const itemCode = ref('');            // string
const loading = ref(false);          // boolean
const result = ref<InventoryInfo | null>(null);  // オブジェクトまたは null

// 値の読み書きは .value を使う
itemCode.value = 'ITEM-001';
loading.value = true;
result.value = { itemCode: 'ITEM-001', itemName: '防寒手袋', location: 'A-01-01', quantity: 150 };
```

```html
<!-- テンプレート内では .value 不要 -->
<ion-input :value="itemCode" />
<ion-spinner v-if="loading" />
```

#### reactive() -- オブジェクト全体をリアクティブにする

`reactive()` はオブジェクト自体をリアクティブにする。`.value` は不要。フォームデータのように複数のフィールドを持つオブジェクトに適している。

```typescript
// src/views/ReceivingPage.vue より
const form = reactive<ReceivingItem>({
  location: '',
  itemCode: '',
  quantity: 1,
  lotNumber: '',
});

// 直接プロパティにアクセスできる（.value 不要）
form.location = 'A-01-01';
form.itemCode = 'ITEM-001';
form.quantity = 10;
```

#### 使い分けの指針（このプロジェクトでの方針）

| 用途 | 使うもの | プロジェクトでの例 |
|------|----------|-------------------|
| プリミティブ値（string, number, boolean） | `ref()` | `loading`, `itemCode`, `toastMessage` |
| null になり得るオブジェクト | `ref()` | `result: ref<InventoryInfo \| null>(null)` |
| フォームデータ（構造が固定のオブジェクト） | `reactive()` | `form: reactive<ReceivingItem>({...})` |
| 配列（差し替えが発生する） | `ref()` | `filteredListItems: ref<DataListItem[]>([])` |

**ポイント**: `reactive()` はオブジェクト自体の再代入ができない（`form = { ... }` は不可）。フォームのリセットは各プロパティを個別に初期化する。

```typescript
// src/views/ReceivingPage.vue -- フォームリセット
form.location = '';
form.itemCode = '';
form.quantity = 1;
form.lotNumber = '';
```

一方、`ref()` なら丸ごと差し替えられる。

```typescript
// ref の場合は丸ごと差し替え可能
result.value = null;
filteredListItems.value = [];
```

### 3.2 computed() -- 算出プロパティ

`computed()` は他のリアクティブな値から自動計算される読み取り専用の値を定義する。依存する値が変わると自動で再計算される。

```typescript
// src/views/InventoryPage.vue より
const resultItems = computed(() => {
  if (!result.value) return [];
  return [
    { label: '品目コード', value: result.value.itemCode },
    { label: 'ロケーション', value: result.value.location },
    { label: '在庫数', value: result.value.quantity },
  ];
});
// result.value が変更されるたび、resultItems も自動で再計算される
```

```typescript
// src/components/ScannerStatus.vue より
const color = computed(() => {
  switch (props.status) {
    case 'connected': return 'success';
    case 'disconnected': return 'danger';
    default: return 'medium';
  }
});
// props.status が変わると color も連動して変わる
```

`computed()` を使うべき場面:
- 他のリアクティブな値を加工・変換して表示したいとき
- テンプレート内に複雑なロジックを書きたくないとき
- キャッシュの恩恵を受けたいとき（依存値が変わらなければ再計算されない）

### 3.3 watch() / watchEffect()

#### watchEffect() -- 依存を自動追跡する

`watchEffect()` は、内部で参照しているリアクティブな値を自動的に追跡し、いずれかが変わると再実行される。「何を監視するか」を明示する必要がない。

```typescript
// src/composables/useDarkMode.ts より
watchEffect(() => {
  document.documentElement.classList.toggle('ion-palette-dark', isDark.value);
  localStorage.setItem('darkMode', String(isDark.value));
});
```

この `watchEffect` は以下のように動作する:

1. 初回実行時: 関数を実行し、内部で `isDark.value` が読まれたことを検知する
2. 依存の追跡: `isDark` を自動的に監視対象として登録する
3. 変更時: `isDark.value` が変わるたびに関数が再実行される
4. 副作用: DOM のクラス切り替えと localStorage への保存が行われる

`useDarkMode` では、この仕組みを使って「ダークモードの ON/OFF」という1つの状態変更が、DOM への反映と永続化の2つの副作用を自動的に引き起こすようにしている。

#### watch() -- 監視対象と実行内容を明示的に分ける

`watch()` は監視対象を第1引数で明示的に指定し、第2引数のコールバックで変更前後の値を受け取れる。

```typescript
// watch の基本形（参考例）
watch(itemCode, (newValue, oldValue) => {
  console.log(`品目コードが ${oldValue} から ${newValue} に変わった`);
});
```

#### watch と watchEffect の使い分け

| 特性 | watch() | watchEffect() |
|------|---------|---------------|
| 監視対象の指定 | 明示的に指定 | 自動検知 |
| 新旧値の参照 | 可能 | 不可 |
| 初回実行 | デフォルトでは実行しない | 即座に実行する |
| 用途 | 条件付きの処理、前後の値比較 | シンプルな副作用の同期 |

本プロジェクトでは `useDarkMode` のように、「状態をDOMやストレージに同期する」用途で `watchEffect` を使っている。

---

## 4. コンポーネント間通信

### 4.1 defineProps -- 親から子へデータを渡す

`defineProps` はコンパイラマクロで、import なしで使える。TypeScript のジェネリクス構文で型を定義する。

```typescript
// src/components/ScanInput.vue より
defineProps<{
  modelValue: string;
  label: string;
  placeholder?: string;   // ? で省略可能
}>();
```

```typescript
// src/components/ResultCard.vue より
defineProps<{
  visible: boolean;
  title: string;
  subtitle?: string;
  items: { label: string; value: string | number }[];
}>();
```

#### withDefaults -- デフォルト値の設定

省略可能な props にデフォルト値を与えるには `withDefaults` で `defineProps` を包む。

```typescript
// src/components/PageLayout.vue より
withDefaults(defineProps<{
  title: string;
  backHref?: string;
  menuItems?: MenuAction[];
  contentClass?: string;
}>(), {
  backHref: '/home',
  menuItems: () => [],    // 配列・オブジェクトは関数で返す
  contentClass: 'ion-padding',
});
```

```typescript
// src/components/SubmitButton.vue より
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
```

**注意**: 配列やオブジェクトのデフォルト値はファクトリ関数 `() => []` で返す必要がある。プリミティブ値はそのまま書けばよい。

#### props の値をスクリプト内で使う

`defineProps` の戻り値を変数に受けると、スクリプト内から props にアクセスできる。

```typescript
// src/components/ScannerStatus.vue より
const props = defineProps<{
  status: ScannerStatus;
}>();

const color = computed(() => {
  switch (props.status) {    // props.status でアクセス
    case 'connected': return 'success';
    // ...
  }
});
```

テンプレート内では `props.` は不要で、直接 `status` と書ける。

### 4.2 defineEmits -- 子から親へイベントを送る

`defineEmits` で、コンポーネントが発火するイベントを型付きで定義する。

```typescript
// src/components/ScanInput.vue より
const emit = defineEmits<{
  'update:modelValue': [value: string];  // v-model 用
  scan: [];                               // 引数なしイベント
  focus: [];                              // 引数なしイベント
}>();
```

テンプレートやスクリプトから `emit()` を呼んでイベントを発火する。

```html
<!-- テンプレートから発火 -->
<ion-input @ion-input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
<ion-button @click="emit('scan')">
```

```typescript
// src/components/DataList.vue より
const emit = defineEmits<{
  select: [id: string];
}>();
```

```html
<!-- テンプレートから発火 -->
<ion-item @click="emit('select', item.id)">
```

親コンポーネント側では `@イベント名` で受け取る。

```html
<!-- src/views/InventoryPage.vue より -->
<DataList :items="filteredListItems" @select="selectFromList" />
```

### 4.3 v-model on custom components -- カスタムコンポーネントの v-model

Vue 3 では、カスタムコンポーネントに `v-model` を使うと、以下の2つが自動的にバインドされる:

- props: `modelValue`
- event: `update:modelValue`

つまり、次の2つの書き方は等価になる。

```html
<!-- v-model の省略記法 -->
<ScanInput v-model="form.location" />

<!-- 展開した書き方（上と同じ意味） -->
<ScanInput :modelValue="form.location" @update:modelValue="form.location = $event" />
```

#### ScanInput での v-model 実装パターン

`ScanInput` コンポーネントの実装を見ると、v-model を受けるためのパターンがわかる。

```vue
<!-- src/components/ScanInput.vue -->
<template>
  <ion-item>
    <ion-input
      :value="modelValue"
      :label="label"
      label-placement="stacked"
      :placeholder="placeholder"
      @ion-input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <ion-button slot="end" fill="clear" @click="emit('scan')">
      <ion-icon :icon="scanOutline" />
    </ion-button>
  </ion-item>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;       // 1. modelValue という名前で props を受け取る
  label: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];  // 2. update:modelValue イベントを定義する
  scan: [];
  focus: [];
}>();
</script>
```

親コンポーネントでの使い方:

```html
<!-- src/views/ReceivingPage.vue より -->
<ScanInput
  v-model="form.location"
  label="ロケーション"
  placeholder="スキャンまたは入力"
  @focus="activeField = 'location'"
  @scan="scanTo('location')"
/>
```

`v-model` は `modelValue` / `update:modelValue` の組み合わせの糖衣構文であり、入力コンポーネントではこのパターンを統一的に使うことで、親から双方向バインディングが簡潔に書ける。

`NumberInput` も同じパターンに従っている:

```vue
<!-- src/components/NumberInput.vue -->
<script setup lang="ts">
defineProps<{
  modelValue: number;      // number 型の v-model
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

---

## 5. Composable（合成関数）パターン

### 5.1 Composable とは何か

Composable は、Composition API のリアクティブな機能（`ref`, `computed`, `watch`, ライフサイクルフックなど）を使って、**再利用可能なステートフルロジック** を関数としてまとめたもの。React の Custom Hooks に相当する。

Options API 時代の Mixin と比べて以下の利点がある:

- **名前の衝突がない**: 返り値を明示的に分割代入するため、どこから何が来たか明確
- **型安全**: TypeScript の型推論がフルに効く
- **依存関係が明示的**: import で取得するため、暗黙の依存が発生しない

### 5.2 このプロジェクトの Composable 一覧

本プロジェクトには5つの composable がある（すべて `src/composables/` に配置）。

| Composable | ファイル | 役割 | 状態スコープ |
|------------|----------|------|-------------|
| `useSP2Scanner` | `useSP2Scanner.ts` | SP2スキャナの初期化・スキャン実行・結果取得・破棄 | インスタンスごと |
| `useApi` | `useApi.ts` | HTTP通信（GET/POST/PUT/DELETE）、ローディング・エラー状態 | インスタンスごと |
| `useDarkMode` | `useDarkMode.ts` | ダークモードの ON/OFF 切替と永続化 | グローバル共有 |
| `useScanFeedback` | `useScanFeedback.ts` | スキャン後のバイブレーション・トースト表示 | グローバル共有 |
| `useLoadingMode` | `useLoadingMode.ts` | ローディング表示モード（全画面 or ボタン）の管理 | グローバル共有 |

#### 状態スコープについて

composable の設計で重要なのは、**状態をどこに置くか** という判断。

**インスタンスごとの状態**: `ref()` を関数内に書く。呼び出しごとに独立した状態が作られる。

```typescript
// src/composables/useApi.ts
export function useApi() {
  const loading = ref(false);  // 関数内 → 呼び出しごとに独立
  const error = ref<string | null>(null);
  // ...
}
```

**グローバル共有の状態**: `ref()` を関数外（モジュールスコープ）に書く。すべての呼び出し元で同じ状態を共有する。

```typescript
// src/composables/useDarkMode.ts
const isDark = ref(false);  // モジュールスコープ → 全コンポーネントで共有

export function useDarkMode() {
  // isDark はどのコンポーネントから呼んでも同じ値を指す
  // ...
  return { isDark, toggle };
}
```

```typescript
// src/composables/useLoadingMode.ts
const mode = ref<LoadingMode>(
  (localStorage.getItem('loadingMode') as LoadingMode) || 'overlay'
);  // モジュールスコープ → 全コンポーネントで共有

export function useLoadingMode() {
  // ...
  return { loadingMode: mode, setMode };
}
```

### 5.3 Composable の作り方のルール

本プロジェクトの composable は、以下の規約に従っている。

#### 1. `use` 接頭辞を付ける

```typescript
export function useSP2Scanner() { ... }
export function useApi() { ... }
export function useDarkMode() { ... }
```

Vue のエコシステムでは `use` 接頭辞が composable の慣例。これにより、通常の関数と composable を区別できる。

#### 2. リアクティブな状態を返す

composable は `ref` や `computed` で作ったリアクティブな値と、それを操作する関数を返す。

```typescript
// src/composables/useApi.ts
export function useApi() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const get = <T>(path: string) => request<T>('GET', path);
  const post = <T>(path: string, body: unknown) => request<T>('POST', path, body);
  // ...

  return { loading, error, get, post, put, del };
  //       ^^^^^^^ リアクティブな状態    ^^^^^^^^^^^ 操作関数
}
```

#### 3. 必要に応じてライフサイクルフックを使う

composable 内で `onMounted` や `onUnmounted` を使うことで、リソースの初期化と破棄を自動化できる（詳細は次のセクション）。

#### 4. 呼び出し側は分割代入で必要なものだけ取り出す

```typescript
// src/views/ReceivingPage.vue より
const { status, startScan, onScanResult } = useSP2Scanner();
const { loading, post } = useApi();
const { loadingMode, setMode } = useLoadingMode();
```

必要なものだけ取り出せるため、コードの意図が明確になる。

---

## 6. ライフサイクルフック

Composition API では、ライフサイクルフックを関数として呼び出す。本プロジェクトで使われている主要なフックは `onMounted` と `onUnmounted`。

### onMounted -- コンポーネントがDOMに追加された後

```typescript
import { onMounted } from 'vue';

onMounted(() => {
  // DOM がレンダリングされた後に実行される
  // 初期化処理やAPI呼び出しなど
});
```

### onUnmounted -- コンポーネントがDOMから削除される時

```typescript
import { onUnmounted } from 'vue';

onUnmounted(() => {
  // イベントリスナーの解除、タイマーのクリア、リソースの解放など
});
```

### useSP2Scanner での活用例

`useSP2Scanner` は、ライフサイクルフックを composable 内で使う好例。コンポーネントのマウント時にスキャナを初期化し、アンマウント時に確実に破棄する。

```typescript
// src/composables/useSP2Scanner.ts
export function useSP2Scanner() {
  const status = ref<ScannerStatus>('unknown');
  const lastResult = ref<ScanResult | null>(null);
  const isScanning = ref(false);

  let scanListener: { remove: () => Promise<void> } | null = null;

  const initialize = async () => {
    const res = await SP2Scanner.initialize();
    if (res.success) {
      const st = await SP2Scanner.getStatus();
      status.value = st.status;
    }
    // スキャン結果のイベントリスナーを登録
    scanListener = await SP2Scanner.addListener('scanResult', (result) => {
      lastResult.value = result;
      isScanning.value = false;
      if (resultCallback) {
        resultCallback(result);
      }
    });
  };

  // コンポーネントのマウント時にスキャナを初期化
  onMounted(() => {
    initialize();
  });

  // コンポーネントのアンマウント時にリソースを解放
  onUnmounted(async () => {
    if (scanListener) {
      await scanListener.remove();   // リスナー解除
    }
    await SP2Scanner.destroy();       // スキャナ破棄
  });

  return { status, lastResult, isScanning, startScan, stopScan, onScanResult };
}
```

この composable を使うコンポーネント側では、ライフサイクルを意識する必要がない。`useSP2Scanner()` を呼ぶだけで、初期化と破棄が自動的に管理される。

```typescript
// src/views/ReceivingPage.vue より
// useSP2Scanner() を呼ぶだけで、onMounted/onUnmounted が内部で設定される
const { status, startScan, onScanResult } = useSP2Scanner();
```

**重要**: composable 内でライフサイクルフックを使う場合、その composable は `setup()` 内（`<script setup>` のトップレベル）で同期的に呼び出す必要がある。非同期関数の中や `setTimeout` のコールバック内で呼び出すと、ライフサイクルフックが正しく登録されない。

---

## 7. テンプレート構文

### 7.1 v-if -- 条件付きレンダリング

要素の表示/非表示を制御する。条件が `false` のとき、要素はDOMから完全に削除される。

```html
<!-- src/views/InventoryPage.vue より -->
<ResultCard :visible="!!result" :title="result?.itemName ?? ''" ... />

<ion-button v-if="result" expand="block" fill="outline" @click="resetSearch">
  一覧に戻る
</ion-button>
```

`v-else-if` と `v-else` も使える:

```html
<!-- src/views/InventoryPage.vue のグループ型レイアウトより -->
<template v-if="result">
  <ion-list lines="none">
    <!-- 検索結果の表示 -->
  </ion-list>
</template>
<DataList v-else-if="searched && filteredListItems.length > 0"
  :items="filteredListItems" @select="selectFromList" />
<p v-else class="ion-padding ion-text-center">検索ボタンを押してください</p>
```

### 7.2 v-for -- リストレンダリング

配列の各要素に対して繰り返し描画する。`:key` 属性でユニークなキーを指定する。

```html
<!-- src/views/HomePage.vue より -->
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
```

```html
<!-- src/components/DataList.vue より -->
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
```

### 7.3 v-model -- 双方向バインディング

フォーム要素やカスタムコンポーネントとデータを双方向に結びつける。

```html
<!-- ネイティブ要素での v-model は通常の HTML input で使う -->
<!-- Ionic コンポーネントでは :value と @ion-input を使うことが多い -->

<!-- カスタムコンポーネントでの v-model（本プロジェクトの主な使い方） -->
<ScanInput v-model="form.location" label="ロケーション" placeholder="スキャンまたは入力" />
<NumberInput v-model="form.quantity" label="数量" placeholder="数量を入力" :min="0" />
<SearchBar v-model="itemCode" label="品目コード" placeholder="スキャンまたは入力して検索" />
```

### 7.4 slot -- コンテンツの差し込み

slot は、親コンポーネントから子コンポーネントにテンプレートの断片を渡す仕組み。子コンポーネント側で `<slot />` と書いた場所に、親から渡されたコンテンツが挿入される。

#### PageLayout でのデフォルト slot

`PageLayout` はヘッダー（タイトル、戻るボタン、メニュー）を共通化しつつ、コンテンツ部分を各ページが自由に定義できるようにしている。

```vue
<!-- src/components/PageLayout.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button v-if="backHref" :default-href="backHref" />
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ActionMenu :items="menuItems" @select="(action) => emit('menu-select', action)" />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :class="contentClass">
      <slot />   <!-- ここに親から渡されたコンテンツが入る -->
    </ion-content>
  </ion-page>
</template>
```

親コンポーネントでは、`<PageLayout>` タグの中に書いた内容がすべて `<slot />` の位置に挿入される。

```html
<!-- src/views/ReceivingPage.vue より -->
<PageLayout title="入荷検品" :menu-items="menuItems" @menu-select="onMenuSelect">
  <!-- ここから下がすべて slot に入る -->
  <ScannerStatus :status="status" />
  <template v-if="layout === 'vertical'">
    <ion-list class="ion-margin-top">
      <!-- フォーム内容 -->
    </ion-list>
    <SubmitButton label="登録" :loading="loading" @submit="submit" />
  </template>
  <!-- ...他のレイアウトパターン -->
</PageLayout>
```

このパターンにより、全ページでヘッダーの構造を統一しつつ、メインコンテンツだけを各ページで差し替えている。

### 7.5 template v-if -- レイアウト切替パターン

`<template>` タグに `v-if` を付けると、**DOMに余計な要素を追加せずに** 複数の要素をまとめて条件分岐できる。本プロジェクトでは、レイアウトの切り替えでこのパターンを多用している。

```html
<!-- src/views/HomePage.vue より -->

<!-- A) リスト型 -->
<template v-if="layout === 'list'">
  <ion-list>
    <ion-item v-for="menu in menus" :key="menu.path" :router-link="menu.path" detail>
      <ion-icon :icon="menu.icon" slot="start" />
      <ion-label>
        <h2>{{ menu.title }}</h2>
        <p>{{ menu.description }}</p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<!-- B) グリッド（カード）型 -->
<template v-if="layout === 'grid'">
  <ion-grid>
    <ion-row>
      <ion-col size="6" v-for="menu in menus" :key="menu.path">
        <ion-card button :router-link="menu.path">
          <!-- カード内容 -->
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<!-- C) 大ボタン型 -->
<template v-if="layout === 'buttons'">
  <div class="ion-padding-horizontal">
    <ion-button v-for="menu in menus" :key="menu.path" expand="block" size="large" :router-link="menu.path">
      <ion-icon :icon="menu.icon" slot="start" />
      {{ menu.title }}
    </ion-button>
  </div>
</template>
```

切り替えのロジックは `ref` と組み合わせてシンプルに実現している:

```typescript
type LayoutType = 'list' | 'grid' | 'buttons';
const layout = ref<LayoutType>(
  (localStorage.getItem('homeLayout') as LayoutType) || 'list'
);

const onMenuSelect = (action: string) => {
  layout.value = action as LayoutType;
  localStorage.setItem('homeLayout', action);
};
```

このパターンは本プロジェクトのほぼ全ページ（HomePage, ReceivingPage, InventoryPage, StocktakingPage など）で共通して使われており、「同じデータに対してUIだけ切り替える」という要件をテンプレートの `v-if` だけで実現している。

---

## まとめ

本プロジェクトで繰り返し現れるパターンを整理する:

| パターン | 使われている場所 | キーポイント |
|----------|-----------------|-------------|
| `ref()` で単一値を管理 | 全ページ、全 composable | プリミティブ値、null許容オブジェクト、配列に使う |
| `reactive()` でフォームを管理 | ReceivingPage, StocktakingPage 他 | 固定構造のオブジェクトに使う |
| `computed()` で派生値を生成 | ScannerStatus, InventoryPage | props や ref から表示用データを導出 |
| `watchEffect()` で副作用を同期 | useDarkMode | 状態変更をDOMやストレージに自動反映 |
| `defineProps` + `withDefaults` | PageLayout, SubmitButton, DataList 他 | TypeScript で型安全に props を定義 |
| `defineEmits` + v-model | ScanInput, NumberInput, SearchBar | `modelValue` / `update:modelValue` パターン |
| Composable で共通ロジック切り出し | useSP2Scanner, useApi 他 | `use` 接頭辞、状態スコープの使い分け |
| `onMounted` / `onUnmounted` | useSP2Scanner | リソースの初期化と破棄を自動化 |
| `<template v-if>` でレイアウト切替 | 全ページ | DOM要素を増やさずに複数UIを切り替え |
| `<slot />` でコンテンツ差し込み | PageLayout | 共通レイアウトと個別コンテンツの分離 |
