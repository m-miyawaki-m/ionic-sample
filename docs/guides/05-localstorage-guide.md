# localStorage ガイド

このガイドでは、本プロジェクト（倉庫管理アプリ）における `localStorage` の使い方、注意点、実装パターンを説明する。

---

## localStorageとは

`localStorage` は、ブラウザ（WebView）にキーバリュー形式でデータを永続保存するためのWeb標準API。ページをリロードしてもアプリを再起動してもデータが残る。

主な特徴:

- **同期API** -- 呼び出しは即座に完了する（Promiseではない）
- **文字列のみ** -- キーも値もすべて文字列として保存される
- **オリジン単位** -- 同一オリジン内でのみ共有される
- **容量制限** -- 通常5MB程度（設定値の保存には十分すぎる容量）

---

## このプロジェクトでの使用箇所

本アプリでは、ユーザーのUI設定をlocalStorageに保存し、次回起動時に復元している。

| キー | 用途 | 型 | デフォルト値 |
|------|------|----|-------------|
| `darkMode` | ダークモードのON/OFF | `'true' \| 'false'` | OSの設定に従う |
| `homeLayout` | ホーム画面のレイアウト | `'list' \| 'grid' \| 'buttons'` | `'list'` |
| `receivingLayout` | 入荷検品画面のレイアウト | `'vertical' \| 'grouped' \| 'stepper'` | `'vertical'` |
| `shippingLayout` | 出荷検品画面のレイアウト | `'vertical' \| 'grouped' \| 'stepper'` | `'vertical'` |
| `stocktakingLayout` | 棚卸し画面のレイアウト | `'vertical' \| 'grouped' \| 'stepper'` | `'vertical'` |
| `inventoryLayout` | 在庫照会画面のレイアウト | `'vertical' \| 'grouped' \| 'stepper'` | `'vertical'` |
| `relocationLayout` | ロケーション移動画面のレイアウト | `'vertical' \| 'grouped' \| 'stepper'` | `'vertical'` |
| `loadingMode` | ローディング表示パターン | `'overlay' \| 'button'` | `'overlay'` |
| `scanFeedback` | スキャン時のフィードバック | `'none' \| 'vibrate' \| 'toast' \| 'vibrate+toast'` | `'vibrate+toast'` |

すべてUI設定（非機密データ）であり、localStorageの用途として適切。

---

## 基本API

### getItem -- 値の読み込み

```typescript
const value = localStorage.getItem('darkMode');
// 値が存在すれば文字列を返す。存在しなければ null を返す。
```

### setItem -- 値の保存

```typescript
localStorage.setItem('darkMode', 'true');
// キーが既に存在すれば上書きされる。
```

### removeItem -- 値の削除

```typescript
localStorage.removeItem('darkMode');
// キーが存在しなくてもエラーにはならない。
```

### clear -- 全削除

```typescript
localStorage.clear();
// このオリジンのlocalStorageを全削除する。通常は使わない。
```

---

## Capacitor/Androidでの注意点

### WebViewのlocalStorageの永続性

Capacitor（Android WebView）では、localStorageは基本的に永続化される。通常のブラウザと同様にアプリ再起動後もデータは保持される。

ただし、以下の状況では消える可能性がある:

- ユーザーが「設定 > アプリ > ストレージを削除」を実行した場合
- Android OSがストレージ不足時にWebViewデータをクリアした場合（まれ）
- アプリをアンインストールした場合

**対策**: localStorageに保存するのはUIの設定値のみとし、消えても再設定すれば済むデータに限定する。本プロジェクトではこの方針に従っている。

### アプリ更新時の挙動

アプリをバージョンアップ（APKの上書きインストール）した場合、**localStorageのデータは保持される**。ユーザーの設定は更新後も引き継がれる。

ただし、WebViewのメジャーバージョンが変わった場合にデータが消える可能性がゼロではないため、デフォルト値を必ず用意すること。

### 容量制限

Android WebViewでの容量制限は通常 **5MB** 程度。本プロジェクトのようにUI設定値（数十バイト程度の文字列）を保存する用途であれば、容量を気にする必要は全くない。

---

## セキュリティ注意点

### localStorageに入れてはいけないもの

localStorageはプレーンテキストで保存され、暗号化されない。以下のような**機密データは絶対にlocalStorageに保存してはいけない**:

- 認証トークン（JWT、APIキーなど）
- パスワード
- 個人情報
- セッション情報

### 機密データの保存先

機密データを端末に保存する必要がある場合は、以下を使用する:

- **Capacitor Preferences plugin** (`@capacitor/preferences`) -- ネイティブのキーバリューストレージ。Android では SharedPreferences に保存される。
- **Secure Storage plugin** -- 暗号化されたストレージ。認証トークンなどに適している。

```typescript
// Capacitor Preferences の例（機密データ向き）
import { Preferences } from '@capacitor/preferences';

// 保存
await Preferences.set({ key: 'authToken', value: token });

// 読み込み
const { value } = await Preferences.get({ key: 'authToken' });

// 削除
await Preferences.remove({ key: 'authToken' });
```

注意: Preferences は非同期API（`async/await`が必要）であり、localStorageの同期APIとは使い勝手が異なる。

---

## よくあるパターン

### デフォルト値付きの読み込み

`getItem` は値が存在しない場合に `null` を返すため、`||` 演算子でデフォルト値を設定する。

```typescript
// ホーム画面のレイアウト -- 未設定なら 'list' をデフォルトにする
const layout = ref<LayoutType>(
  (localStorage.getItem('homeLayout') as LayoutType) || 'list'
);
```

これは本プロジェクトの全てのlocalStorage読み込みで使われているパターン。

### JSON.stringify / JSON.parse でオブジェクトを保存

localStorageは文字列しか保存できないため、オブジェクトや配列を保存するには変換が必要。

```typescript
// オブジェクトを保存
const settings = { theme: 'dark', fontSize: 16 };
localStorage.setItem('settings', JSON.stringify(settings));

// オブジェクトを読み込み
const raw = localStorage.getItem('settings');
const settings = raw ? JSON.parse(raw) : { theme: 'light', fontSize: 14 };
```

本プロジェクトでは保存する値がすべて単純な文字列のため、JSON変換は使っていない。しかし将来的に複合的な設定を保存する場合に必要になる。

### composableでラップして型安全にする

本プロジェクトでは、localStorage の操作を Vue composable でラップし、型安全かつリアクティブに扱っている。

#### パターン1: シンプルなモード切り替え（useLoadingMode）

```typescript
// src/composables/useLoadingMode.ts
import { ref } from 'vue';

export type LoadingMode = 'overlay' | 'button';

// モジュールスコープでrefを定義 → アプリ全体で共有される（シングルトン）
const mode = ref<LoadingMode>(
  (localStorage.getItem('loadingMode') as LoadingMode) || 'overlay'
);

export function useLoadingMode() {
  const setMode = (m: LoadingMode) => {
    mode.value = m;
    localStorage.setItem('loadingMode', m);
  };

  return { loadingMode: mode, setMode };
}
```

ポイント:
- `ref` をモジュールスコープ（関数の外）で定義することで、どのコンポーネントから呼んでも同じ状態を共有する
- `LoadingMode` 型を `export` して、使う側でも型安全を確保する
- setter関数で `ref` への代入と `localStorage` への保存を同時に行う

#### パターン2: 初期化ロジック付き（useDarkMode）

```typescript
// src/composables/useDarkMode.ts
import { ref, watchEffect } from 'vue';

const isDark = ref(false);

export function useDarkMode() {
  const init = () => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      isDark.value = saved === 'true';
    } else {
      // 保存値がなければOSの設定に従う
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  };

  const toggle = () => {
    isDark.value = !isDark.value;
  };

  // isDarkが変化するたびにDOMクラスの切り替えとlocalStorageへの保存を行う
  watchEffect(() => {
    document.documentElement.classList.toggle('ion-palette-dark', isDark.value);
    localStorage.setItem('darkMode', String(isDark.value));
  });

  init();

  return { isDark, toggle };
}
```

ポイント:
- boolean値は `String()` で文字列に変換して保存し、読み込み時に `=== 'true'` で比較する
- `watchEffect` を使い、値の変更を自動的にlocalStorageに反映する
- 保存値がない場合のフォールバック（OSのダークモード設定）を用意する

#### パターン3: コンポーネント内で直接使用（HomePage）

composable化せず、コンポーネント内で直接localStorageを使うパターンもある。

```typescript
// src/views/HomePage.vue
type LayoutType = 'list' | 'grid' | 'buttons';

const layout = ref<LayoutType>(
  (localStorage.getItem('homeLayout') as LayoutType) || 'list'
);

const onMenuSelect = (action: string) => {
  layout.value = action as LayoutType;
  localStorage.setItem('homeLayout', action);
};
```

このパターンはそのページでしか使わない設定に適している。複数のコンポーネントから同じ設定を参照する場合は、composableに切り出すべき。

---

## まとめ

| 判断基準 | 保存先 |
|---------|--------|
| UI設定値（消えても再設定可能） | `localStorage` |
| 認証トークン、パスワード等の機密データ | Capacitor Preferences / Secure Storage |
| 大量データ、構造化データ | IndexedDB / SQLite |

本プロジェクトでは、UIの設定値（レイアウト、ダークモード、ローディングモード、スキャンフィードバック）のみをlocalStorageに保存しており、この方針は適切である。値が消えた場合でもデフォルト値にフォールバックするよう実装されているため、ユーザー体験に大きな影響はない。
