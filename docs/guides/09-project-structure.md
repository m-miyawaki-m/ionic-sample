# プロジェクト構造ガイド

本ドキュメントでは、倉庫管理アプリ（Ionic Vue + TypeScript + Capacitor）のディレクトリ構造と各ファイルの役割を説明する。

---

## ディレクトリ構造

```
ionic-sample/
├── src/
│   ├── main.ts                    — アプリのエントリーポイント
│   ├── App.vue                    — ルートコンポーネント
│   ├── vite-env.d.ts              — Vite 用の型宣言
│   ├── router/
│   │   └── index.ts               — ルーティング定義
│   ├── types/
│   │   └── index.ts               — 共通型定義
│   ├── components/                — 共通UIコンポーネント（12個）
│   │   ├── ActionMenu.vue         — コンテキストメニュー表示
│   │   ├── DataList.vue           — データ一覧表示
│   │   ├── FeedbackToast.vue      — 操作結果のトースト通知
│   │   ├── LoadingOverlay.vue     — ローディング表示
│   │   ├── NumberInput.vue        — 数量入力フィールド
│   │   ├── PageLayout.vue         — 画面共通レイアウト
│   │   ├── ResultCard.vue         — 結果カード表示
│   │   ├── ScanInput.vue          — スキャン入力フィールド
│   │   ├── ScannerStatus.vue      — スキャナ接続状態表示
│   │   ├── SearchBar.vue          — 検索バー
│   │   ├── SelectPopup.vue        — 選択ポップアップ
│   │   └── SubmitButton.vue       — 送信ボタン
│   ├── composables/               — 共通ロジック（5個）
│   │   ├── useApi.ts              — API通信の共通処理
│   │   ├── useDarkMode.ts         — ダークモード切り替え
│   │   ├── useLoadingMode.ts      — ローディング状態管理
│   │   ├── useSP2Scanner.ts       — SP2スキャナ操作
│   │   └── useScanFeedback.ts     — スキャン結果のフィードバック制御
│   ├── plugins/                   — Capacitorプラグイン定義
│   │   ├── sp2-scanner.ts         — SP2Scannerプラグインのインターフェース
│   │   └── sp2-scanner-web.ts     — Web用モック実装（開発・テスト用）
│   ├── views/                     — 画面コンポーネント
│   │   ├── HomePage.vue           — ホーム画面（業務メニュー）
│   │   ├── ReceivingPage.vue      — 入荷検品
│   │   ├── ShippingPage.vue       — 出荷検品
│   │   ├── StocktakingPage.vue    — 棚卸し
│   │   ├── InventoryPage.vue      — 在庫照会
│   │   ├── RelocationPage.vue     — ロケーション移動
│   │   └── samples/               — サンプルページ（3つ）
│   │       ├── ComponentsPage.vue — UIコンポーネント一覧デモ
│   │       ├── ScanDemoPage.vue   — スキャン動作デモ
│   │       └── FeedbackPage.vue   — フィードバック動作デモ
│   └── theme/
│       └── variables.css          — Ionicテーマ変数（カラー等）
├── android/                       — Capacitor Android プロジェクト
│   └── app/
│       ├── libs/                  — AARファイル配置場所（SP2 SDK等）
│       └── src/main/java/jp/co/example/warehouse/
│           ├── MainActivity.java  — Androidメインアクティビティ
│           └── sp2/
│               └── SP2Plugin.java — SP2スキャナのネイティブ実装
├── docs/                          — ドキュメント
│   └── guides/                    — 各種ガイド
├── tests/                         — テスト
│   ├── unit/                      — ユニットテスト
│   └── e2e/                       — E2Eテスト（Cypress）
├── public/                        — 静的アセット
├── capacitor.config.ts            — Capacitor設定（appId, appName, webDir）
├── vite.config.ts                 — Viteビルド設定
├── tsconfig.json                  — TypeScript設定
├── tsconfig.node.json             — Node.js用TypeScript設定
├── cypress.config.ts              — Cypress E2Eテスト設定
├── ionic.config.json              — Ionic CLI設定
├── index.html                     — SPAのHTMLエントリーポイント
└── package.json                   — 依存パッケージ・スクリプト定義
```

---

## 各レイヤーの役割

### `src/main.ts` — エントリーポイント

Vueアプリケーションを生成し、IonicVueプラグインとルーターを登録してDOMにマウントする。Ionicの必須CSSやダークモード対応のスタイルもここで読み込む。

### `src/App.vue` — ルートコンポーネント

`<ion-app>` と `<ion-router-outlet>` を配置し、Ionicのページ遷移アニメーションを有効にする。アプリ全体を囲む最上位のコンポーネント。

### `src/router/index.ts` — ルーティング定義

`@ionic/vue-router` を使って全画面のルートを定義する。各画面は遅延読み込み（`import()`）で登録されており、初期ロードの高速化に寄与する。

定義されているルート:

| パス | 画面 |
|---|---|
| `/home` | ホーム画面 |
| `/receiving` | 入荷検品 |
| `/shipping` | 出荷検品 |
| `/stocktaking` | 棚卸し |
| `/inventory` | 在庫照会 |
| `/relocation` | ロケーション移動 |
| `/samples` | サンプル一覧 (カタログ・モック振り分け) |
| `/samples/catalog` | コンポーネントカタログ一覧 |
| `/samples/catalog/{button,input,list,modal,toast}` | 各 Ionic コンポーネントの素のサンプル |
| `/samples/mockups` | 画面モック一覧 |
| `/samples/mockups/components` | コンポーネントデモ |
| `/samples/mockups/scan-demo` | スキャンデモ |
| `/samples/mockups/feedback` | フィードバックデモ |
| `/samples/mockups/dialog-demo` | ダイアログデモ |

### `src/components/` — 共通UIコンポーネント

再利用可能なUIパーツを格納する。画面固有の業務ロジックを持たず、propsとemitで外部とやり取りする。

| コンポーネント | 役割 |
|---|---|
| `PageLayout.vue` | 全画面共通のヘッダー・コンテンツ領域レイアウト |
| `ScanInput.vue` | バーコード/QRコードのスキャン入力フィールド |
| `ScannerStatus.vue` | スキャナの接続状態（connected/disconnected）を表示 |
| `NumberInput.vue` | 数量入力用のフィールド（数値バリデーション付き） |
| `DataList.vue` | 汎用的なデータ一覧表示リスト |
| `ResultCard.vue` | 処理結果をカード形式で表示 |
| `SearchBar.vue` | テキスト検索バー |
| `SelectPopup.vue` | 選択肢をポップアップ表示する |
| `ActionMenu.vue` | コンテキストメニュー（長押し等で表示） |
| `FeedbackToast.vue` | 成功/エラーのトースト通知 |
| `LoadingOverlay.vue` | API通信中等のローディングオーバーレイ |
| `SubmitButton.vue` | 登録・確定用の送信ボタン |

### `src/composables/` — 共通ロジック（Composition API）

画面間で共有するロジックを `use` 接頭辞の関数として提供する。VueのリアクティブシステムL（`ref`, `computed`, `watch`）を活用し、状態管理とビジネスロジックをカプセル化する。

| composable | 役割 |
|---|---|
| `useSP2Scanner.ts` | SP2スキャナの初期化・スキャン実行・イベント受信・破棄をラップ |
| `useScanFeedback.ts` | スキャン成功/失敗時のバイブレーション・トースト表示制御 |
| `useApi.ts` | API通信の共通処理（リクエスト送信、エラーハンドリング、レスポンス型付け） |
| `useLoadingMode.ts` | ローディング状態のon/off管理 |
| `useDarkMode.ts` | ダークモードの切り替え制御 |

### `src/plugins/` — Capacitorプラグイン定義

ネイティブ機能（ハードウェアスキャナ等）へのブリッジ層。Capacitorの `registerPlugin` でプラグインを登録し、TypeScriptのインターフェースでネイティブAPIの型安全性を確保する。

- **`sp2-scanner.ts`** — `SP2ScannerPlugin` インターフェースを定義し、`registerPlugin` でプラグインを登録する。ネイティブ側（Android）とWeb側の切り替えはCapacitorが自動的に行う。
- **`sp2-scanner-web.ts`** — ブラウザ上で動作するモック実装。`WebPlugin` を継承し、サンプルバーコード値を返す。開発時やテスト時にネイティブ端末がなくても動作確認できる。

### `src/views/` — 画面コンポーネント

各業務画面を1ファイル1画面で管理する。画面コンポーネント自体は、共通コンポーネント（`components/`）とcomposable（`composables/`）を組み合わせることで構成する。画面固有のUIレイアウトと業務フローの制御に集中する。

| 画面 | 業務 | 概要 |
|---|---|---|
| `HomePage.vue` | ホーム | 業務メニュー一覧。各業務画面への導線 |
| `ReceivingPage.vue` | 入荷検品 | ロケーション・商品スキャン、数量入力、入荷登録 |
| `ShippingPage.vue` | 出荷検品 | 出荷指示スキャン、商品スキャン、出荷確認 |
| `StocktakingPage.vue` | 棚卸し | ロケーション・商品スキャン、実数量入力、棚卸し登録 |
| `InventoryPage.vue` | 在庫照会 | 商品コードスキャン/入力、在庫情報の表示 |
| `RelocationPage.vue` | ロケーション移動 | 移動元/移動先スキャン、商品・数量指定、移動実行 |

#### `src/views/samples/` — サンプルページ

開発・デモ用のサンプル画面。共通コンポーネントやプラグインの動作確認に使用する。

| 画面 | 用途 |
|---|---|
| `ComponentsPage.vue` | 全共通UIコンポーネントの表示・操作サンプル |
| `ScanDemoPage.vue` | SP2スキャナの初期化・スキャン・停止の動作確認 |
| `FeedbackPage.vue` | スキャンフィードバック（音・振動・トースト）の動作確認 |

### `src/types/index.ts` — 共通型定義

全レイヤーで使用する型定義を一元管理する。プラグイン、composable、コンポーネント、画面のいずれからも参照される。

定義されている型:

| 型 | 用途 |
|---|---|
| `ScanResult` | スキャン結果（value + format） |
| `ScannerStatus` | スキャナ接続状態（`'connected' \| 'disconnected' \| 'unknown'`） |
| `ApiResponse<T>` | API レスポンスの共通型（success + data + error） |
| `MenuAction` | ActionMenu の項目定義 |
| `DataListItem` | DataList の行データ |
| `SelectOption` | SelectPopup の選択肢 |
| `ReceivingItem` | 入荷検品データ |
| `ShippingItem` | 出荷検品データ |
| `StocktakingItem` | 棚卸しデータ |
| `InventoryInfo` | 在庫照会結果 |
| `RelocationItem` | ロケーション移動データ |

### `src/theme/variables.css` — テーマ設定

IonicのCSS変数を上書きしてアプリ全体の配色を定義する。ライトモード・ダークモードの両方に対応。

### `android/` — Capacitor Android プロジェクト

Capacitorが生成・管理するAndroidネイティブプロジェクト。

- **`app/libs/`** — SP2スキャナSDK等のAARファイルを配置する場所。
- **`app/src/main/java/jp/co/example/warehouse/MainActivity.java`** — Androidのメインアクティビティ。Capacitorプラグインの登録を行う。
- **`app/src/main/java/jp/co/example/warehouse/sp2/SP2Plugin.java`** — SP2スキャナのネイティブ実装。Capacitorの `@CapacitorPlugin` アノテーションを使い、TypeScript側の `SP2ScannerPlugin` インターフェースに対応するメソッドを実装する。

### `tests/` — テスト

- **`unit/`** — ユニットテスト。composable やコンポーネントの単体テスト。
- **`e2e/`** — E2Eテスト。Cypressを使った画面遷移・操作の統合テスト。

### ルートの設定ファイル

| ファイル | 役割 |
|---|---|
| `capacitor.config.ts` | Capacitor設定。appId（`jp.co.example.warehouse`）、appName（`倉庫管理`）、ビルド出力先（`dist`）を定義 |
| `vite.config.ts` | Viteのビルド設定。プラグイン・エイリアス・プロキシ等 |
| `tsconfig.json` | TypeScriptコンパイラ設定 |
| `tsconfig.node.json` | Vite設定ファイル等のNode.js環境用TypeScript設定 |
| `cypress.config.ts` | Cypress E2Eテストの設定 |
| `ionic.config.json` | Ionic CLIの設定 |
| `index.html` | SPAのHTMLテンプレート。Viteが `main.ts` を注入する |
| `package.json` | npm依存パッケージの管理とスクリプト定義 |

---

## 命名規則

| 種類 | 規則 | 例 |
|---|---|---|
| コンポーネント | PascalCase | `ScanInput.vue`, `PageLayout.vue` |
| composable | camelCase + `use` 接頭辞 | `useSP2Scanner.ts`, `useApi.ts` |
| 画面 | PascalCase + `Page` 接尾辞 | `ReceivingPage.vue`, `HomePage.vue` |
| 型・インターフェース | PascalCase | `ScanResult`, `ReceivingItem`, `ApiResponse` |
| プラグイン | ケバブケース（ファイル名） | `sp2-scanner.ts`, `sp2-scanner-web.ts` |
| テーマ | ケバブケース | `variables.css` |

---

## ファイル間の依存関係

依存の方向は上位から下位への一方通行とする。

```
views/
  │
  ├──→ components/     UIパーツを配置
  │
  ├──→ composables/    ロジックを呼び出す
  │       │
  │       ├──→ plugins/     ネイティブ機能を利用
  │       │
  │       └──→ types/       型を参照
  │
  └──→ types/          型を参照

components/
  │
  └──→ types/          props/emitの型を参照

plugins/
  │
  └──→ types/          ScanResult, ScannerStatus等を参照
```

### 依存関係の原則

1. **`views/`** は `components/` と `composables/` を利用するが、逆方向の依存は持たない。
2. **`components/`** は再利用可能であるため、特定の画面（`views/`）や業務ロジック（`composables/`）に依存しない。
3. **`composables/`** は `plugins/` と `types/` を利用するが、`components/` や `views/` には依存しない。
4. **`plugins/`** は `types/` のみを参照する。最下層のネイティブブリッジ層である。
5. **`types/`** はどのレイヤーにも依存しない。全レイヤーの基盤として機能する。

この一方向の依存関係を守ることで、各レイヤーを独立してテスト・変更できる構造を維持する。

---

## 新規ファイル追加時のガイドライン

### 業務画面を追加する場合

1. `src/types/index.ts` に業務データの型を追加する
2. 必要であれば `src/composables/` に業務ロジックのcomposableを追加する
3. 必要であれば `src/components/` に汎用UIコンポーネントを追加する
4. `src/views/` に `XxxPage.vue` を作成し、上記を組み合わせる
5. `src/router/index.ts` にルートを追加する

### コンポーネントを追加する場合

- `src/components/` に PascalCase で `.vue` ファイルを作成する
- props と emit の型は `src/types/index.ts` で定義する
- 画面固有のロジックを含めない。汎用的に使えるようにする

### composable を追加する場合

- `src/composables/` に `useXxx.ts` の命名で作成する
- 戻り値には `ref` や `computed` 等のリアクティブな値を含める
- プラグイン呼び出しや型は下位レイヤーから取得する
