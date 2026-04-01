# API連携ガイド

## 目次

1. [現在の状態](#1-現在の状態)
2. [モックから実APIへの切替手順](#2-モックから実apiへの切替手順)
3. [認証の追加](#3-認証の追加)
4. [エラーハンドリング](#4-エラーハンドリング)
5. [CORS対応](#5-cors対応)
6. [APIが未確定の間の開発方法](#6-apiが未確定の間の開発方法)

---

## 1. 現在の状態

本アプリは外部の倉庫管理システムと JSON HTTP API で連携する想定だが、現時点ではAPIサーバーが存在しない。以下が現在の実装状況。

### useApi composable（`src/composables/useApi.ts`）

`fetch` による JSON 通信の基盤は実装済み。GET / POST / PUT / DELETE の各メソッドを提供している。

```ts
// src/composables/useApi.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export function useApi() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const get = <T>(path: string) => request<T>('GET', path);
  const post = <T>(path: string, body: unknown) => request<T>('POST', path, body);
  const put = <T>(path: string, body: unknown) => request<T>('PUT', path, body);
  const del = <T>(path: string) => request<T>('DELETE', path);

  return { loading, error, get, post, put, del };
}
```

### 各画面の状態

| 画面 | ファイル | API利用状況 |
|------|----------|-------------|
| 在庫照会 | `InventoryPage.vue` | `mockInventory` 配列からフィルタして表示（API未使用） |
| 入荷検品 | `ReceivingPage.vue` | `useApi.post('/receiving', form)` を呼ぶがサーバーがないのでエラー |
| 出荷検品 | `ShippingPage.vue` | `useApi.post('/shipping/verify', form)` を呼ぶがサーバーがないのでエラー |
| 棚卸し | `StocktakingPage.vue` | `useApi.post('/stocktaking', form)` を呼ぶがサーバーがないのでエラー |
| ロケーション移動 | `RelocationPage.vue` | `useApi.post('/relocation', form)` を呼ぶがサーバーがないのでエラー |

### 環境変数

`VITE_API_BASE_URL` 環境変数でAPIのベースURLを切替可能。未設定の場合は `http://localhost:3000/api` がデフォルト値になる。

---

## 2. モックから実APIへの切替手順

### Step 1: 環境変数の設定

プロジェクトルートに `.env` ファイルを作成する。

**開発用（`.env.development`）:**

```env
# 開発時はローカルのAPIサーバーまたはプロキシを指定
VITE_API_BASE_URL=http://localhost:3000/api
```

**本番用（`.env.production`）:**

```env
# 本番APIサーバーのURL
VITE_API_BASE_URL=https://api.example.com/v1
```

**ステージング用（`.env.staging`）:**

```env
VITE_API_BASE_URL=https://staging-api.example.com/v1
```

Vite は `VITE_` プレフィックスの環境変数を自動的にクライアントに公開する。`useApi.ts` では以下のように読み取っている。

```ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
```

ステージング用ビルドの例:

```bash
# .env.staging を読み込んでビルド
npx vite build --mode staging
```

> **注意:** `.env` ファイルには機密情報（APIキー等）を含めないこと。`.env` はリポジトリにコミットしない（`.gitignore` に追加する）。

### Step 2: 在庫照会の切替例

在庫照会（`src/views/InventoryPage.vue`）は現在、コンポーネント内にモックデータを持ちローカルでフィルタリングしている。これをAPI呼び出しに切り替える。

**現在のコード（モック）:**

```ts
// src/views/InventoryPage.vue

// モックデータ
const mockInventory: InventoryInfo[] = [
  { itemCode: 'ITEM-001', itemName: '防寒手袋', location: 'A-01-01', quantity: 150 },
  { itemCode: 'ITEM-002', itemName: '作業帽', location: 'A-01-02', quantity: 80 },
  // ... 12件のモックデータ
];

const search = async () => {
  result.value = null;
  searched.value = true;
  loading.value = true;

  // API通信の遅延をシミュレート（1〜2秒）
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

  const keyword = itemCode.value.toLowerCase();
  const matches = mockInventory.filter((inv) =>
    !keyword ||
    inv.itemCode.toLowerCase().includes(keyword) ||
    inv.itemName.toLowerCase().includes(keyword)
  );

  loading.value = false;

  if (matches.length === 1) {
    result.value = matches[0];
    searchDone.value = true;
    filteredListItems.value = [];
  } else if (matches.length > 1) {
    filteredListItems.value = matches.map((inv) => ({
      id: inv.itemCode,
      title: inv.itemName,
      subtitle: `${inv.itemCode} / ${inv.location}`,
      note: `${inv.quantity}個`,
    }));
  } else {
    filteredListItems.value = [];
    errorMessage.value = '在庫情報が見つかりません';
  }
};
```

**変更後のコード（API呼び出し）:**

```ts
// src/views/InventoryPage.vue

import { useApi } from '@/composables/useApi';
import type { InventoryInfo, MenuAction, DataListItem } from '@/types';

// useApi を利用（モックデータの配列は削除）
const { loading, get } = useApi();

const search = async () => {
  result.value = null;
  searched.value = true;

  const keyword = encodeURIComponent(itemCode.value);
  const res = await get<InventoryInfo[]>(`/inventory?keyword=${keyword}`);

  if (!res.success || !res.data) {
    filteredListItems.value = [];
    errorMessage.value = res.error || '在庫情報が見つかりません';
    return;
  }

  const matches = res.data;

  if (matches.length === 1) {
    result.value = matches[0];
    searchDone.value = true;
    filteredListItems.value = [];
  } else if (matches.length > 1) {
    filteredListItems.value = matches.map((inv) => ({
      id: inv.itemCode,
      title: inv.itemName,
      subtitle: `${inv.itemCode} / ${inv.location}`,
      note: `${inv.quantity}個`,
    }));
  } else {
    filteredListItems.value = [];
    errorMessage.value = '在庫情報が見つかりません';
  }
};
```

**主な変更点:**

1. `mockInventory` 配列を削除
2. `setTimeout` による遅延シミュレートを削除（`useApi` の `loading` を使うので不要）
3. ローカルの `loading` ref を削除し、`useApi` が返す `loading` を使用
4. `mockInventory.filter()` を `get<InventoryInfo[]>('/inventory?keyword=xxx')` に置き換え
5. `selectFromList` 内の `mockInventory.find()` もAPI呼び出しに変更（または `matches` をリアクティブに保持）

`selectFromList` の変更:

```ts
// 変更前: モック配列から検索
const selectFromList = (id: string) => {
  const found = mockInventory.find((inv) => inv.itemCode === id);
  if (found) {
    itemCode.value = found.itemCode;
    result.value = found;
    searchDone.value = true;
  }
};

// 変更後: 検索結果を保持して再利用
const searchResults = ref<InventoryInfo[]>([]);

const selectFromList = (id: string) => {
  const found = searchResults.value.find((inv) => inv.itemCode === id);
  if (found) {
    itemCode.value = found.itemCode;
    result.value = found;
    searchDone.value = true;
  }
};
```

### Step 3: 登録系画面の確認

登録系の4画面は既に `useApi` を使ってAPIを呼び出すコードになっている。APIサーバーを用意するだけでそのまま動作する。

**入荷検品（`src/views/ReceivingPage.vue`）:**

```ts
const { loading, post } = useApi();

const submit = async () => {
  const res = await post('/receiving', form);
  if (res.success) {
    toastMessage.value = '登録しました';
    toastColor.value = 'success';
    // フォームリセット
  } else {
    toastMessage.value = res.error || '登録に失敗しました';
    toastColor.value = 'danger';
  }
};
```

**各画面のAPIエンドポイント一覧:**

| 画面 | メソッド | エンドポイント | リクエストボディ型 |
|------|----------|----------------|---------------------|
| 入荷検品 | POST | `/receiving` | `ReceivingItem` |
| 出荷検品 | POST | `/shipping/verify` | `ShippingItem` |
| 棚卸し | POST | `/stocktaking` | `StocktakingItem` |
| ロケーション移動 | POST | `/relocation` | `RelocationItem` |

**リクエストボディの例（入荷検品）:**

```json
{
  "location": "A-01-01",
  "itemCode": "ITEM-001",
  "quantity": 10,
  "lotNumber": "LOT-2026-001"
}
```

**期待するレスポンス:**

```json
{
  "success": true,
  "data": {
    "id": "RCV-001",
    "registeredAt": "2026-04-01T10:00:00Z"
  }
}
```

エラー時:

```json
{
  "success": false,
  "error": "品目コードが見つかりません"
}
```

### Step 4: APIレスポンスの型定義

`src/types/index.ts` には既に `ApiResponse<T>` が定義されている。

```ts
// src/types/index.ts

/** API レスポンスの共通型 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
```

APIサーバーのレスポンスがこの形式に合っていれば、そのまま利用できる。APIのレスポンス形式が異なる場合は、`useApi.ts` の `request` 関数内で変換する。

**例: APIレスポンスが異なる形式の場合**

APIが以下の形式を返す場合:

```json
{
  "status": "ok",
  "result": { ... },
  "message": "エラーメッセージ"
}
```

`useApi.ts` でマッピングする:

```ts
// src/composables/useApi.ts

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
    const json = await res.json();
    if (!res.ok) {
      // APIの形式に合わせてエラーメッセージを取得
      error.value = json.message || json.error || `HTTP ${res.status}`;
      return { success: false, error: error.value ?? undefined };
    }
    // APIの形式に合わせてデータを取得
    return { success: true, data: json.result ?? json.data ?? json };
  } catch (e) {
    const msg = e instanceof Error ? e.message : '通信エラー';
    error.value = msg;
    return { success: false, error: msg };
  } finally {
    loading.value = false;
  }
};
```

**業務データの型もAPIに合わせて更新する:**

```ts
// src/types/index.ts

/** 在庫照会の結果（APIレスポンスに合わせて拡張） */
export interface InventoryInfo {
  itemCode: string;
  itemName: string;
  location: string;
  quantity: number;
  // API側に追加フィールドがあれば追加
  lotNumber?: string;
  lastUpdated?: string;
  unit?: string;
}

/** 入荷検品（APIに合わせて拡張） */
export interface ReceivingItem {
  location: string;
  itemCode: string;
  quantity: number;
  lotNumber?: string;
  // API側で必要なフィールドを追加
  inspectionDate?: string;
  inspectorId?: string;
}
```

---

## 3. 認証の追加

### useApi へのAuthorizationヘッダー追加

APIサーバーが Bearer トークン認証を要求する場合、`useApi.ts` にトークンを付与する処理を追加する。

```ts
// src/composables/useApi.ts
import { ref } from 'vue';
import { Preferences } from '@capacitor/preferences';
import type { ApiResponse } from '@/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/** 保存済みトークンを取得 */
const getToken = async (): Promise<string | null> => {
  const { value } = await Preferences.get({ key: 'auth_token' });
  return value;
};

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
      const token = await getToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
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

**Capacitor Preferences のインストール:**

```bash
npm install @capacitor/preferences
npx cap sync
```

### トークンの保存と削除

```ts
// src/composables/useAuth.ts
import { Preferences } from '@capacitor/preferences';

export function useAuth() {
  /** ログイン時にトークンを保存 */
  const saveToken = async (token: string) => {
    await Preferences.set({ key: 'auth_token', value: token });
  };

  /** ログアウト時にトークンを削除 */
  const clearToken = async () => {
    await Preferences.remove({ key: 'auth_token' });
  };

  /** トークンの有無を確認 */
  const hasToken = async (): Promise<boolean> => {
    const { value } = await Preferences.get({ key: 'auth_token' });
    return !!value;
  };

  return { saveToken, clearToken, hasToken };
}
```

### 端末認証（デバイスIDベース）の場合

倉庫業務用端末のように、ユーザーログインではなく端末単位で認証する場合のパターン。

```ts
// src/composables/useDeviceAuth.ts
import { Preferences } from '@capacitor/preferences';
import { Device } from '@capacitor/device';

export function useDeviceAuth() {
  const register = async (apiBaseUrl: string): Promise<string | null> => {
    const info = await Device.getId();
    const res = await fetch(`${apiBaseUrl}/auth/device`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId: info.identifier }),
    });
    if (!res.ok) return null;
    const { token } = await res.json();
    await Preferences.set({ key: 'auth_token', value: token });
    return token;
  };

  return { register };
}
```

端末認証を使う場合は `@capacitor/device` のインストールが必要:

```bash
npm install @capacitor/device
npx cap sync
```

---

## 4. エラーハンドリング

### useApi の既存エラー処理

現在の `useApi.ts` には基本的なエラー処理が実装されている。

```ts
// src/composables/useApi.ts（現在の実装）
try {
  const res = await fetch(`${BASE_URL}${path}`, { /* ... */ });
  const data = await res.json();
  if (!res.ok) {
    // HTTPステータスが200系以外
    error.value = data.error || `HTTP ${res.status}`;
    return { success: false, error: error.value ?? undefined };
  }
  return { success: true, data };
} catch (e) {
  // ネットワークエラー、JSON パースエラーなど
  const msg = e instanceof Error ? e.message : '通信エラー';
  error.value = msg;
  return { success: false, error: msg };
}
```

各画面では `res.success` を確認してトースト表示している。

```ts
// 例: ReceivingPage.vue
const res = await post('/receiving', form);
if (res.success) {
  toastMessage.value = '登録しました';
  toastColor.value = 'success';
} else {
  toastMessage.value = res.error || '登録に失敗しました';
  toastColor.value = 'danger';
}
```

### ネットワークエラーの強化

オフラインや接続不良時のハンドリングを追加する場合:

```ts
// src/composables/useApi.ts
} catch (e) {
  let msg: string;
  if (e instanceof TypeError && e.message === 'Failed to fetch') {
    msg = 'ネットワークに接続できません。接続状態を確認してください。';
  } else if (e instanceof Error) {
    msg = e.message;
  } else {
    msg = '通信エラー';
  }
  error.value = msg;
  return { success: false, error: msg };
}
```

### タイムアウトの実装

現在の実装にはタイムアウトがない。`AbortController` を使って追加する。

```ts
// src/composables/useApi.ts
const TIMEOUT_MS = 30000; // 30秒

const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: unknown,
): Promise<ApiResponse<T>> => {
  loading.value = true;
  error.value = null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await res.json();
    if (!res.ok) {
      error.value = data.error || `HTTP ${res.status}`;
      return { success: false, error: error.value ?? undefined };
    }
    return { success: true, data };
  } catch (e) {
    clearTimeout(timeoutId);
    let msg: string;
    if (e instanceof DOMException && e.name === 'AbortError') {
      msg = '通信がタイムアウトしました。再度お試しください。';
    } else if (e instanceof TypeError && e.message === 'Failed to fetch') {
      msg = 'ネットワークに接続できません。';
    } else if (e instanceof Error) {
      msg = e.message;
    } else {
      msg = '通信エラー';
    }
    error.value = msg;
    return { success: false, error: msg };
  } finally {
    loading.value = false;
  }
};
```

### 認証エラー（401）時のリダイレクト

```ts
// src/composables/useApi.ts
import router from '@/router';

const request = async <T>(/* ... */): Promise<ApiResponse<T>> => {
  // ...
  const res = await fetch(/* ... */);
  const data = await res.json();

  if (res.status === 401) {
    // トークンをクリアしてログイン画面へ
    await Preferences.remove({ key: 'auth_token' });
    router.replace('/login');
    return { success: false, error: '認証の有効期限が切れました' };
  }

  if (!res.ok) {
    error.value = data.error || `HTTP ${res.status}`;
    return { success: false, error: error.value ?? undefined };
  }
  // ...
};
```

---

## 5. CORS対応

### 開発時のCORS問題

`vite dev` でブラウザから直接APIサーバーにリクエストすると、オリジンが異なるためCORSエラーが発生する。

```
Access to fetch at 'https://api.example.com/v1/inventory'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

### vite.config.ts でのプロキシ設定

開発サーバーにプロキシを設定することで、ブラウザからはCORSエラーなしでAPIを呼べる。

```ts
// vite.config.ts
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.example.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
```

プロキシを使う場合、`.env.development` の `VITE_API_BASE_URL` はプロキシ経由のパスにする。

```env
# プロキシ経由（vite dev サーバー自身の /api にアクセス）
VITE_API_BASE_URL=/api
```

これにより `useApi` は `/api/inventory?keyword=xxx` にリクエストし、Vite の開発サーバーがそれを `https://api.example.com/v1/inventory?keyword=xxx` に中継する。

### 本番（Androidアプリ）ではCORS不要

Capacitor でビルドしたAndroidアプリでは、WebView内からのHTTPリクエストはブラウザのCORSポリシーの制約を受けない。そのため `.env.production` では直接APIのURLを指定すればよい。

```env
# 本番: 直接APIサーバーへ
VITE_API_BASE_URL=https://api.example.com/v1
```

> **補足:** Capacitor v4以降では `capacitor.config.ts` の `server.allowNavigation` でアクセス先ドメインを明示的に許可することが推奨される場合がある。必要に応じて設定すること。

---

## 6. APIが未確定の間の開発方法

APIの仕様がまだ確定していない段階でも、UI開発を進める方法。

### 方法1: 現在のモックデータでUI開発を進める

在庫照会の `mockInventory` 配列のように、コンポーネント内にモックデータを定義してUI開発を進められる。登録系の画面は `useApi` の呼び出しがエラーになるが、UIの確認自体は可能。

エラーを回避したい場合は、`useApi.ts` に一時的なモックモードを追加できる。

```ts
// src/composables/useApi.ts

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// モックレスポンスの定義
const mockResponses: Record<string, unknown> = {
  'POST /receiving': { success: true, data: { id: 'MOCK-001' } },
  'POST /shipping/verify': { success: true, data: { verified: true } },
  'POST /stocktaking': { success: true, data: { id: 'MOCK-002' } },
  'POST /relocation': { success: true, data: { id: 'MOCK-003' } },
};

const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: unknown,
): Promise<ApiResponse<T>> => {
  loading.value = true;
  error.value = null;

  // モックモード
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 500)); // 遅延シミュレート
    loading.value = false;
    const key = `${method} ${path}`;
    const mockRes = mockResponses[key];
    if (mockRes) {
      return mockRes as ApiResponse<T>;
    }
    return { success: true, data: {} as T };
  }

  // 以下、実際のfetch処理（既存コード）
  // ...
};
```

```env
# .env.development
VITE_USE_MOCK=true
```

### 方法2: JSON Server で簡易APIを立てる

[JSON Server](https://github.com/typicode/json-server) を使えば、JSONファイルをもとにRESTful APIを簡単に立てられる。

**インストール:**

```bash
npm install -D json-server
```

**db.json の作成（プロジェクトルート）:**

```json
{
  "inventory": [
    { "id": "ITEM-001", "itemCode": "ITEM-001", "itemName": "防寒手袋", "location": "A-01-01", "quantity": 150 },
    { "id": "ITEM-002", "itemCode": "ITEM-002", "itemName": "作業帽", "location": "A-01-02", "quantity": 80 },
    { "id": "ITEM-003", "itemCode": "ITEM-003", "itemName": "安全靴 26cm", "location": "A-02-01", "quantity": 45 },
    { "id": "ITEM-004", "itemCode": "ITEM-004", "itemName": "安全靴 27cm", "location": "A-02-02", "quantity": 32 },
    { "id": "ITEM-005", "itemCode": "ITEM-005", "itemName": "防塵マスク", "location": "B-01-01", "quantity": 500 }
  ],
  "receiving": [],
  "shipping": [],
  "stocktaking": [],
  "relocation": []
}
```

**package.json にスクリプトを追加:**

```json
{
  "scripts": {
    "dev": "vite",
    "mock-api": "json-server --watch db.json --port 3000 --routes routes.json",
    "dev:full": "concurrently \"npm run dev\" \"npm run mock-api\""
  }
}
```

**routes.json（エンドポイントのルーティング）:**

```json
{
  "/api/inventory": "/inventory",
  "/api/receiving": "/receiving",
  "/api/shipping/verify": "/shipping",
  "/api/stocktaking": "/stocktaking",
  "/api/relocation": "/relocation"
}
```

**起動:**

```bash
# APIサーバーとVite開発サーバーを同時起動
npm run dev:full
```

> `concurrently` パッケージが必要な場合: `npm install -D concurrently`

JSON Server を使えば、POST リクエストで登録系画面のデータが `db.json` に書き込まれるため、登録系画面も正常に動作確認できる。

**JSON Server での検索:**

JSON Server は `q` パラメータで全文検索ができる。`useApi` 側のパラメータ名を合わせるか、routes で調整する。

```
GET http://localhost:3000/api/inventory?q=防寒
```
