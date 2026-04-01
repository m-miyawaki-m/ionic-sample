# TypeScript 基礎ガイド

このガイドでは、倉庫在庫管理アプリ（Ionic Vue + TypeScript + Capacitor）で使われている TypeScript の基本を、実際のコードを例に解説します。

---

## 目次

1. [TypeScriptとは](#typescriptとは)
2. [基本の型](#基本の型)
3. [interface の定義](#interface-の定義)
4. [type alias vs interface](#type-alias-vs-interface)
5. [Generics（ジェネリクス）](#genericsジェネリクス)
6. [Union types（ユニオン型）](#union-typesユニオン型)
7. [Optional properties（省略可能なプロパティ）](#optional-properties省略可能なプロパティ)
8. [型アサーション](#型アサーション)
9. [import type](#import-type)
10. [Vue + TypeScript](#vue--typescript)
11. [Capacitor + TypeScript](#capacitor--typescript)

---

## TypeScriptとは

TypeScript は **JavaScript に型（type）を追加した言語** です。

```
JavaScript:  const name = "倉庫A";        // name が何型かは実行しないとわからない
TypeScript:  const name: string = "倉庫A"; // name は string だと明示できる
```

TypeScript で書いたコードはビルド時に普通の JavaScript に変換（トランスパイル）されます。つまり、最終的にブラウザや端末が実行するのは JavaScript です。TypeScript は「開発中にミスを早期発見するための仕組み」と考えるとわかりやすいでしょう。

### なぜ TypeScript を使うのか

- **タイプミスをコンパイル時に検出できる** -- `item.quanity`（typo）と書くとエディタが即座に警告してくれる
- **エディタの補完が強力になる** -- `.` を打つだけでプロパティ一覧が表示される
- **コードの意図が読み手に伝わりやすい** -- 「この関数は何を受け取り、何を返すか」が型宣言を見ればわかる
- **リファクタリングが安全になる** -- プロパティ名を変更すると、使っている箇所すべてでエラーが出る

---

## 基本の型

TypeScript でよく使う基本の型は 4 つです。

### string（文字列）

```ts
const itemCode: string = 'ITEM-001';
const location: string = 'A-01-01';
```

### number（数値）

```ts
const quantity: number = 150;
const price: number = 1280.5;
```

### boolean（真偽値）

```ts
const success: boolean = true;
const isScanning: boolean = false;
```

### array（配列）

```ts
// 書き方1: 型名[]
const items: string[] = ['ITEM-001', 'ITEM-002', 'ITEM-003'];

// 書き方2: Array<型名>
const quantities: Array<number> = [150, 80, 45];
```

### 実際のプロジェクトでの例

`src/composables/useApi.ts` で基本の型が使われている箇所を見てみましょう。

```ts
const loading = ref(false);          // boolean -- API通信中かどうか
const error = ref<string | null>(null); // string または null -- エラーメッセージ
```

`src/views/InventoryPage.vue` のモックデータでも確認できます。

```ts
const mockInventory: InventoryInfo[] = [
  { itemCode: 'ITEM-001', itemName: '防寒手袋', location: 'A-01-01', quantity: 150 },
  //          ^^^^^^^^     ^^^^^^^^^             ^^^^^^^^             ^^^^^^^^
  //          string       string                string               number
];
```

---

## interface の定義

`interface` はオブジェクトの「形（shape）」を定義するものです。「このオブジェクトにはどんなプロパティがあり、それぞれ何型か」を宣言します。

このプロジェクトの型定義は `src/types/index.ts` にまとめられています。

### ScanResult -- スキャン結果

バーコードやQRコードを読み取った結果を表します。

```ts
/** スキャン結果 */
export interface ScanResult {
  /** 読み取った値（バーコード値やQR内容） */
  value: string;
  /** フォーマット（CODE128, QR_CODE, etc.） */
  format: string;
}
```

- `value` -- 読み取ったバーコードの中身（例: `'ITEM-001'`）
- `format` -- バーコードの種類（例: `'CODE128'`, `'QR_CODE'`）

使用例（`src/composables/useSP2Scanner.ts`）:

```ts
const lastResult = ref<ScanResult | null>(null);
// ...
scanListener = await SP2Scanner.addListener('scanResult', (result) => {
  lastResult.value = result;  // result は ScanResult 型と保証される
});
```

### ApiResponse -- API レスポンスの共通型

API から返ってくるレスポンスの共通フォーマットです。Generics を使っていますが、ここではまず構造を理解しましょう。

```ts
/** API レスポンスの共通型 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
```

- `success` -- API 呼び出しが成功したかどうか
- `data` -- 成功時に返るデータ（型は呼び出し元が指定する）
- `error` -- 失敗時のエラーメッセージ

### MenuAction -- メニューの項目

ページ右上のアクションメニュー（三点メニュー）の各項目です。

```ts
/** ActionMenuの項目 */
export interface MenuAction {
  label: string;
  action: string;
  icon?: string;    // 省略可能（? がついている）
}
```

使用例（`src/views/ReceivingPage.vue`）:

```ts
const menuItems: MenuAction[] = [
  { label: 'QRコード読み取り', action: 'qr' },
  { label: 'バーコード読み取り', action: 'barcode' },
  { label: 'A) 縦並び表示', action: 'vertical' },
  // icon は省略している（optional なので OK）
];
```

### DataListItem -- リストの行データ

`DataList` コンポーネントに渡す各行のデータです。

```ts
/** DataListの行 */
export interface DataListItem {
  id: string;
  title: string;
  subtitle?: string;
  note?: string;
}
```

使用例（`src/views/InventoryPage.vue`）:

```ts
filteredListItems.value = matches.map((inv) => ({
  id: inv.itemCode,
  title: inv.itemName,
  subtitle: `${inv.itemCode} / ${inv.location}`,
  note: `${inv.quantity}個`,
}));
```

### SelectOption -- 選択肢

`SelectPopup` コンポーネントに渡す選択肢データです。

```ts
/** SelectPopupの選択肢 */
export interface SelectOption {
  label: string;
  value: string;
}
```

### ReceivingItem -- 入荷検品

入荷検品画面のフォームデータです。

```ts
/** 入荷検品の暫定項目 */
export interface ReceivingItem {
  location: string;
  itemCode: string;
  quantity: number;
  lotNumber?: string;    // ロット番号は省略可能
}
```

使用例（`src/views/ReceivingPage.vue`）:

```ts
const form = reactive<ReceivingItem>({
  location: '',
  itemCode: '',
  quantity: 1,
  lotNumber: '',
});
```

`reactive<ReceivingItem>(...)` と書くことで、`form` のプロパティが `ReceivingItem` の定義と一致していることが保証されます。存在しないプロパティにアクセスしようとするとエラーになります。

### ShippingItem -- 出荷検品

```ts
/** 出荷検品の暫定項目 */
export interface ShippingItem {
  shippingOrderId: string;
  itemCode: string;
  quantity: number;
}
```

### StocktakingItem -- 棚卸し

```ts
/** 棚卸しの暫定項目 */
export interface StocktakingItem {
  location: string;
  itemCode: string;
  actualQuantity: number;
}
```

### InventoryInfo -- 在庫照会

```ts
/** 在庫照会の暫定結果 */
export interface InventoryInfo {
  itemCode: string;
  itemName: string;
  location: string;
  quantity: number;
}
```

### RelocationItem -- ロケーション移動

```ts
/** ロケーション移動の暫定項目 */
export interface RelocationItem {
  fromLocation: string;
  toLocation: string;
  itemCode: string;
  quantity: number;
}
```

---

## type alias vs interface

TypeScript には、型を定義する方法が 2 つあります: `interface` と `type`（type alias）。
このプロジェクトでは **目的に応じて使い分け** ています。

### interface -- オブジェクトの形を定義

オブジェクトの構造を定義するときは `interface` を使います。

```ts
export interface ScanResult {
  value: string;
  format: string;
}
```

**interface の特徴:**
- プロパティを持つオブジェクトの型を定義するのに適している
- `extends` でほかの interface を継承できる
- 同名の interface を複数宣言すると自動的にマージされる（宣言マージ）

### type alias -- 値の種類を定義

「この変数にはこのいずれかの値しか入らない」という制約を定義するときは `type` を使います。

```ts
// src/types/index.ts
export type ScannerStatus = 'connected' | 'disconnected' | 'unknown';
```

```ts
// src/views/ReceivingPage.vue
type LayoutType = 'vertical' | 'grouped' | 'stepper';
type ScannableField = 'location' | 'itemCode' | 'lotNumber';
```

```ts
// src/views/ShippingPage.vue
type ScannableField = 'shippingOrderId' | 'itemCode';
```

```ts
// src/views/RelocationPage.vue
type ScannableField = 'fromLocation' | 'toLocation' | 'itemCode';
```

```ts
// src/composables/useScanFeedback.ts
export type FeedbackType = 'none' | 'vibrate' | 'toast' | 'vibrate+toast';
```

**type alias の特徴:**
- Union type（`|` で複数の値を列挙する型）を定義するのに適している
- プリミティブ型の組み合わせ、関数型、タプルなど何でも定義できる
- 宣言マージは行われない

### 使い分けの指針

| 場面 | 使うもの | 例 |
|------|---------|-----|
| オブジェクトの形を定義 | `interface` | `ScanResult`, `ReceivingItem` |
| 許容する値を列挙 | `type` | `ScannerStatus`, `LayoutType` |
| スキャン対象フィールドを限定 | `type` | `ScannableField` |

このプロジェクトでは **「プロパティを持つ構造 = interface」「値の種類を限定 = type」** という基準で一貫して使い分けています。

---

## Generics（ジェネリクス）

Generics は「型をパラメータとして受け取る」仕組みです。関数の引数のように型を渡すことで、1 つの定義をさまざまな型で再利用できます。

### ApiResponse\<T\> の解説

```ts
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;          // T は呼び出し元が指定する型
  error?: string;
}
```

`<T = unknown>` の部分がジェネリクスの宣言です。

- `T` -- 型パラメータ（仮の型名、慣例で `T` を使う）
- `= unknown` -- デフォルト型（指定しなければ `unknown` になる）

この定義により、`ApiResponse<InventoryInfo>` と書けば `data` プロパティが `InventoryInfo | undefined` になり、`ApiResponse<string>` と書けば `data` プロパティが `string | undefined` になります。

### useApi での活用

`src/composables/useApi.ts` では、API の各メソッドがジェネリクスを使って戻り値の型を柔軟に指定できるようになっています。

```ts
const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: unknown,
): Promise<ApiResponse<T>> => {
  // ...
  return { success: true, data };    // data は T 型
};

const get  = <T>(path: string) => request<T>('GET', path);
const post = <T>(path: string, body: unknown) => request<T>('POST', path, body);
const put  = <T>(path: string, body: unknown) => request<T>('PUT', path, body);
const del  = <T>(path: string) => request<T>('DELETE', path);
```

呼び出し側での利用例:

```ts
// ReceivingPage.vue
const res = await post('/receiving', form);
// res の型は ApiResponse<unknown>
// res.success が true なら処理続行、false なら res.error を表示
```

もし API のレスポンスの型を明示したい場合は次のように書きます:

```ts
const res = await get<InventoryInfo[]>('/inventory');
// res.data の型は InventoryInfo[] | undefined
```

### ジェネリクスの読み方のコツ

```
ApiResponse<InventoryInfo>
    ↓
{
  success: boolean;
  data?: InventoryInfo;     // T が InventoryInfo に置き換わる
  error?: string;
}
```

「`<T>` の部分に具体的な型を当てはめて読む」のがポイントです。

---

## Union types（ユニオン型）

`|`（パイプ）で複数の型を組み合わせた型です。「A または B または C」のいずれかを表します。

### 文字列リテラルのユニオン

このプロジェクトで最も多く使われているパターンです。

```ts
// スキャナの状態は3つのうちいずれか
export type ScannerStatus = 'connected' | 'disconnected' | 'unknown';

// レイアウトは3つのうちいずれか
type LayoutType = 'vertical' | 'grouped' | 'stepper';

// HTTPメソッドは4つのうちいずれか
method: 'GET' | 'POST' | 'PUT' | 'DELETE'

// フィードバックの種類は4つのうちいずれか
export type FeedbackType = 'none' | 'vibrate' | 'toast' | 'vibrate+toast';
```

指定外の値を代入しようとするとコンパイルエラーになります:

```ts
const status: ScannerStatus = 'connected';     // OK
const status: ScannerStatus = 'connecting';     // エラー! 'connecting' は許可されていない
```

### 型のユニオン

文字列リテラルだけでなく、型同士を `|` でつなぐこともできます。

```ts
// string または null
const error = ref<string | null>(null);

// ScanResult または null
const lastResult = ref<ScanResult | null>(null);

// InventoryInfo または null
const result = ref<InventoryInfo | null>(null);
```

`null` とのユニオンは「まだ値がないかもしれない」という状態を型で表現するときに頻繁に使います。

---

## Optional properties（省略可能なプロパティ）

プロパティ名の後に `?` をつけると、そのプロパティは省略可能になります。

### interface での使用

```ts
export interface ReceivingItem {
  location: string;
  itemCode: string;
  quantity: number;
  lotNumber?: string;    // ? がついている = 省略可能
}
```

これにより、`lotNumber` は「あってもなくてもよい」プロパティになります:

```ts
// lotNumber あり -- OK
const item1: ReceivingItem = {
  location: 'A-01-01',
  itemCode: 'ITEM-001',
  quantity: 10,
  lotNumber: 'LOT-2026-001',
};

// lotNumber なし -- これも OK
const item2: ReceivingItem = {
  location: 'A-01-01',
  itemCode: 'ITEM-001',
  quantity: 10,
};
```

### このプロジェクトで Optional が使われている箇所

```ts
// ApiResponse -- data と error は状況により有無が変わる
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;           // 成功時のみ存在
  error?: string;     // 失敗時のみ存在
}

// MenuAction -- アイコンはなくてもよい
export interface MenuAction {
  label: string;
  action: string;
  icon?: string;
}

// DataListItem -- subtitle と note はなくてもよい
export interface DataListItem {
  id: string;
  title: string;
  subtitle?: string;
  note?: string;
}
```

### Vue コンポーネントの props でも活躍

```ts
// ScanInput.vue
defineProps<{
  modelValue: string;
  label: string;
  placeholder?: string;    // 省略可能な prop
}>();

// PageLayout.vue
withDefaults(defineProps<{
  title: string;
  backHref?: string;       // 省略可能 + デフォルト値あり
  menuItems?: MenuAction[];
  contentClass?: string;
}>(), {
  backHref: '/home',
  menuItems: () => [],
  contentClass: 'ion-padding',
});
```

`?` をつけた props は親コンポーネントから渡さなくても OK です。`withDefaults` と組み合わせると、省略された場合のデフォルト値も設定できます。

---

## 型アサーション

型アサーション（`as`）は、TypeScript に「この値はこの型だと私が保証する」と伝える構文です。

### as LayoutType

`localStorage` から取得した値は `string | null` 型ですが、実際には `'vertical'` や `'grouped'` のいずれかであるとわかっている場合に使います。

```ts
// src/views/ReceivingPage.vue
const layout = ref<LayoutType>(
  (localStorage.getItem('receivingLayout') as LayoutType) || 'vertical'
);
```

`localStorage.getItem()` の戻り値は `string | null` ですが、`as LayoutType` で `'vertical' | 'grouped' | 'stepper'` 型として扱っています。

同様の例が各ページにあります:

```ts
// ShippingPage.vue
const layout = ref<LayoutType>(
  (localStorage.getItem('shippingLayout') as LayoutType) || 'vertical'
);

// StocktakingPage.vue
const layout = ref<LayoutType>(
  (localStorage.getItem('stocktakingLayout') as LayoutType) || 'vertical'
);
```

メニュー選択時にも使われています:

```ts
const onMenuSelect = (action: string) => {
  if (['vertical', 'grouped', 'stepper'].includes(action)) {
    layout.value = action as LayoutType;    // action は string だが、LayoutType の値だと保証
  }
};
```

### as HTMLInputElement

DOM イベントでイベントターゲットの型を指定する場合にも使います。

```ts
// src/components/ScanInput.vue
@ion-input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
```

`$event.target` は `EventTarget | null` 型ですが、`<ion-input>` のイベントなので実際には `HTMLInputElement` です。`as HTMLInputElement` とすることで `.value` プロパティにアクセスできるようになります。

### as FeedbackType

```ts
// src/composables/useScanFeedback.ts
const feedbackType = ref<FeedbackType>(
  (localStorage.getItem('scanFeedback') as FeedbackType) || 'vibrate+toast'
);
```

### 注意点

型アサーションは TypeScript の型チェックを上書きする機能です。**実際の値が指定した型と一致しない場合でもエラーにはならない**ため、使いすぎに注意してください。このプロジェクトでは `localStorage` からの読み出しや DOM イベントなど、TypeScript が正確な型を推論できない場面に限定して使っています。

---

## import type

`import type` は **型情報だけをインポートする** 構文です。

### 通常の import との違い

```ts
// 通常の import -- 値（関数やクラス）をインポート
import { ref, reactive } from 'vue';
import { SP2Scanner } from '@/plugins/sp2-scanner';

// import type -- 型だけをインポート（実行時には消える）
import type { ScanResult, ScannerStatus } from '@/types';
import type { ReceivingItem, MenuAction } from '@/types';
import type { SP2ScannerPlugin } from './sp2-scanner';
```

### なぜ使い分けるのか

`import type` で読み込んだものはビルド時に完全に除去されます。つまり最終的な JavaScript ファイルには含まれません。

- **バンドルサイズの削減** -- 不要なコードが含まれない
- **循環参照の回避** -- 型だけの参照は実行時の依存に含まれない
- **意図の明確化** -- 「これは型としてのみ使う」ことが読み手に伝わる

### このプロジェクトでの使用例

```ts
// src/composables/useApi.ts
import type { ApiResponse } from '@/types';

// src/composables/useSP2Scanner.ts
import type { ScanResult, ScannerStatus } from '@/types';

// src/plugins/sp2-scanner.ts
import type { ScanResult, ScannerStatus } from '@/types';

// src/plugins/sp2-scanner-web.ts
import type { SP2ScannerPlugin } from './sp2-scanner';
import type { ScannerStatus } from '@/types';

// src/components/ActionMenu.vue
import type { MenuAction } from '@/types';

// src/components/DataList.vue
import type { DataListItem } from '@/types';

// src/components/SelectPopup.vue
import type { SelectOption } from '@/types';

// src/components/ScannerStatus.vue
import type { ScannerStatus } from '@/types';

// src/views/ReceivingPage.vue
import type { ReceivingItem, MenuAction } from '@/types';

// src/views/InventoryPage.vue
import type { InventoryInfo, MenuAction, DataListItem } from '@/types';
```

**指針:** `src/types/index.ts` からのインポートは基本的にすべて `import type` を使います。なぜなら、このファイルに含まれるのは `interface` と `type` だけで、実行時に必要な値（関数やクラス）は一切ないからです。

---

## Vue + TypeScript

Vue 3 の Composition API は TypeScript との相性が非常に良く、このプロジェクトでも全面的に活用しています。

### defineProps\<T\> での型付き props

`defineProps` にジェネリクスで型を渡すことで、コンポーネントが受け取る props を型安全にできます。

**基本形（ScanInput.vue）:**

```ts
defineProps<{
  modelValue: string;
  label: string;
  placeholder?: string;
}>();
```

**interface 型を使った例（ActionMenu.vue）:**

```ts
import type { MenuAction } from '@/types';

defineProps<{
  items: MenuAction[];    // MenuAction の配列を受け取る
}>();
```

**withDefaults でデフォルト値を設定（PageLayout.vue）:**

```ts
import type { MenuAction } from '@/types';

withDefaults(defineProps<{
  title: string;
  backHref?: string;
  menuItems?: MenuAction[];
  contentClass?: string;
}>(), {
  backHref: '/home',
  menuItems: () => [],       // 配列のデフォルト値はファクトリ関数で
  contentClass: 'ion-padding',
});
```

**型を使って props を参照（ScannerStatus.vue）:**

```ts
import type { ScannerStatus } from '@/types';

const props = defineProps<{
  status: ScannerStatus;
}>();

// props.status は ScannerStatus 型 = 'connected' | 'disconnected' | 'unknown'
const color = computed(() => {
  switch (props.status) {
    case 'connected': return 'success';
    case 'disconnected': return 'danger';
    default: return 'medium';
  }
});
```

`switch` の各 `case` で、`props.status` が `ScannerStatus` に定義された値のいずれかであることがエディタの補完で提示されます。

**インライン型の例（ResultCard.vue）:**

```ts
defineProps<{
  visible: boolean;
  title: string;
  subtitle?: string;
  items: { label: string; value: string | number }[];
}>();
```

`items` のように、小さな型はインラインで直接定義することもできます。

### defineEmits\<T\> での型付き emit

`defineEmits` で、コンポーネントが発行するイベントの名前と引数の型を定義できます。

**基本形（ScanInput.vue）:**

```ts
const emit = defineEmits<{
  'update:modelValue': [value: string];
  scan: [];
  focus: [];
}>();
```

- `'update:modelValue': [value: string]` -- `string` 型の引数を 1 つ持つイベント
- `scan: []` -- 引数なしのイベント
- `focus: []` -- 引数なしのイベント

**親コンポーネントに action を渡す例（ActionMenu.vue）:**

```ts
const emit = defineEmits<{
  select: [action: string];
}>();

// 使用
emit('select', action);   // OK -- action は string
emit('select', 123);      // エラー! number は string に代入できない
emit('click');             // エラー! 'click' イベントは定義されていない
```

**複数イベントの例（SelectPopup.vue）:**

```ts
const emit = defineEmits<{
  close: [];
  select: [value: string];
}>();
```

### ref\<T\>() での型付き ref

Vue の `ref()` にジェネリクスで型を渡すことで、リアクティブな値の型を指定できます。

**基本的な使い方:**

```ts
// 初期値から型を推論（明示不要）
const isOpen = ref(false);             // ref<boolean>
const currentStep = ref(0);           // ref<number>
const itemCode = ref('');             // ref<string>
const toastMessage = ref('');         // ref<string>
```

**型を明示する必要がある場合:**

```ts
// Union type を使う場合
const error = ref<string | null>(null);
// null から型を推論すると ref<null> になってしまうため、明示が必要

// カスタム型を使う場合
const status = ref<ScannerStatus>('unknown');
const lastResult = ref<ScanResult | null>(null);
const result = ref<InventoryInfo | null>(null);

// type alias を使う場合
const layout = ref<LayoutType>('vertical');
const activeField = ref<ScannableField>('location');
const feedbackType = ref<FeedbackType>('vibrate+toast');

// 配列の場合
const filteredListItems = ref<DataListItem[]>([]);
```

**reactive\<T\> での型付き（フォームデータ）:**

```ts
// ReceivingPage.vue
const form = reactive<ReceivingItem>({
  location: '', itemCode: '', quantity: 1, lotNumber: ''
});

// ShippingPage.vue
const form = reactive<ShippingItem>({
  shippingOrderId: '', itemCode: '', quantity: 1
});

// StocktakingPage.vue
const form = reactive<StocktakingItem>({
  location: '', itemCode: '', actualQuantity: 0
});

// RelocationPage.vue
const form = reactive<RelocationItem>({
  fromLocation: '', toLocation: '', itemCode: '', quantity: 1
});
```

`reactive<ReceivingItem>(...)` のように interface 型を渡すことで、フォームのフィールドが interface の定義と一致していることが保証されます。

---

## Capacitor + TypeScript

Capacitor のプラグインを TypeScript で定義する方法です。このプロジェクトではハンディスキャナ（SP2）のプラグインを例にしています。

### プラグインインターフェース定義

`src/plugins/sp2-scanner.ts` でスキャナプラグインの API を interface として定義しています。

```ts
import { registerPlugin, type PluginListenerHandle } from '@capacitor/core';
import type { ScanResult, ScannerStatus } from '@/types';

export interface SP2ScannerPlugin {
  /** SDK初期化・スキャナ接続 */
  initialize(): Promise<{ success: boolean }>;

  /** スキャン開始（1回読み取り） */
  startScan(): Promise<void>;

  /** スキャン停止 */
  stopScan(): Promise<void>;

  /** スキャナの接続状態を取得 */
  getStatus(): Promise<{ status: ScannerStatus }>;

  /** SDK解放・切断 */
  destroy(): Promise<void>;

  /** スキャン結果イベントリスナー */
  addListener(
    eventName: 'scanResult',
    listenerFunc: (result: ScanResult) => void,
  ): Promise<PluginListenerHandle>;

  /** 全リスナー削除 */
  removeAllListeners(): Promise<void>;
}
```

この interface を定義することで得られるメリット:

1. **プラグインの API が明文化される** -- どのメソッドがあり、何を引数に取り、何を返すかが一目でわかる
2. **ネイティブ実装と Web モック実装に同じ API を強制できる** -- interface を満たさないと TypeScript がエラーを出す
3. **呼び出し側でも型安全** -- `SP2Scanner.getStatus()` の戻り値が `{ status: ScannerStatus }` であることが保証される

### registerPlugin\<T\>

`registerPlugin` は Capacitor のコア関数で、ジェネリクスを使ってプラグインの型を指定します。

```ts
export const SP2Scanner = registerPlugin<SP2ScannerPlugin>('SP2Scanner', {
  web: () => import('./sp2-scanner-web').then((m) => new m.SP2ScannerWeb()),
});
```

- `registerPlugin<SP2ScannerPlugin>` -- `SP2Scanner` 変数の型が `SP2ScannerPlugin` になる
- 第1引数 `'SP2Scanner'` -- ネイティブ側のプラグイン名（Java/Swift のクラス名と対応）
- 第2引数の `web` -- Web 環境で使われるモック実装

### Web モック実装での implements

`src/plugins/sp2-scanner-web.ts` では `implements` キーワードで interface を実装しています。

```ts
import { WebPlugin } from '@capacitor/core';
import type { SP2ScannerPlugin } from './sp2-scanner';

export class SP2ScannerWeb extends WebPlugin implements SP2ScannerPlugin {
  async initialize(): Promise<{ success: boolean }> {
    return { success: true };
  }

  async startScan(): Promise<void> {
    // モック動作: ダミーデータを返す
  }

  async stopScan(): Promise<void> { }

  async getStatus(): Promise<{ status: ScannerStatus }> {
    return { status: 'connected' };
  }

  async destroy(): Promise<void> { }
}
```

`implements SP2ScannerPlugin` と書くことで、`SP2ScannerPlugin` interface に定義されたすべてのメソッドを実装しなければコンパイルエラーになります。たとえば `getStatus()` メソッドを書き忘れると即座にエラーが表示されます。

### Composable での活用

`src/composables/useSP2Scanner.ts` では、プラグインの型付きメソッドをそのまま使っています。

```ts
import type { ScanResult, ScannerStatus } from '@/types';

export function useSP2Scanner() {
  const status = ref<ScannerStatus>('unknown');
  const lastResult = ref<ScanResult | null>(null);

  const initialize = async () => {
    const res = await SP2Scanner.initialize();
    // res の型は { success: boolean } -- interface で定義した通り
    if (res.success) {
      const st = await SP2Scanner.getStatus();
      // st の型は { status: ScannerStatus }
      status.value = st.status;
    }
  };

  // コールバックの引数も型付き
  const onScanResult = (callback: (result: ScanResult) => void) => {
    resultCallback = callback;
  };

  return { status, lastResult, isScanning, startScan, stopScan, onScanResult };
}
```

プラグインの interface 定義がしっかりしていれば、composable を使う画面側でも型の恩恵を受けられます。

---

## まとめ

| 機能 | 何ができるか | このプロジェクトでの代表例 |
|------|-------------|------------------------|
| 基本の型 | 変数の型を明示 | `string`, `number`, `boolean` |
| interface | オブジェクトの形を定義 | `ScanResult`, `ReceivingItem` |
| type alias | 値の種類を限定 | `ScannerStatus`, `LayoutType` |
| Generics | 型をパラメータ化 | `ApiResponse<T>`, `ref<T>()` |
| Union types | 複数の型を許容 | `'connected' \| 'disconnected'` |
| Optional | 省略可能なプロパティ | `lotNumber?: string` |
| 型アサーション | 型を手動で指定 | `as LayoutType`, `as HTMLInputElement` |
| import type | 型だけをインポート | `import type { ScanResult }` |
| defineProps\<T\> | props を型安全に | 全コンポーネント |
| defineEmits\<T\> | emit を型安全に | 全コンポーネント |
| ref\<T\>() | ref を型安全に | `ref<ScannerStatus>('unknown')` |
| registerPlugin\<T\> | プラグインを型安全に | `SP2Scanner` |

TypeScript の型システムは、このプロジェクト全体を通じて「正しいデータが正しい場所に流れること」を保証しています。エディタの補完や型エラーを活用しながら開発することで、バグの少ないコードを効率的に書くことができます。
