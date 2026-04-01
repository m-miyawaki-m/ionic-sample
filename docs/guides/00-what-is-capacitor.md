# Capacitorとは何か

「Webアプリなのに、なぜAndroidのスキャナやバイブレーションが使えるのか？」
その答えがCapacitor。

---

## 一言で言うと

**Capacitor = Webアプリをネイティブアプリに変換し、ネイティブ機能へのアクセスを提供するブリッジ**

```
あなたが書くコード（Vue + TypeScript）
        ↓
    Capacitor（橋渡し）
        ↓
Android / iOS のネイティブ機能（カメラ、バイブ、スキャナ等）
```

---

## なぜ必要なのか

### Webアプリの限界

ブラウザ（Chrome等）で動くWebアプリには、セキュリティ上の理由で以下の制限がある:

| やりたいこと | Webアプリ | Capacitor経由 |
|---|---|---|
| バーコードスキャナ制御 | × 不可 | ◎ 可能 |
| バイブレーション | △ 一部可能 | ◎ 完全制御 |
| ファイルシステム操作 | × 不可 | ◎ 可能 |
| プッシュ通知 | △ 制限あり | ◎ 可能 |
| 生体認証（指紋） | × 不可 | ◎ 可能 |
| アプリアイコン・バッジ | × 不可 | ◎ 可能 |
| オフラインDB（SQLite） | × 不可 | ◎ 可能 |
| ホーム画面にインストール | △ PWA | ◎ 通常のアプリ |

Capacitorがあれば、Webの技術（HTML/CSS/JavaScript）で書いたアプリから、これらのネイティブ機能が使える。

---

## 仕組み

### アプリの構造

```
┌─────────────────────────────────┐
│        Android アプリ (.apk)     │
│                                 │
│  ┌───────────────────────────┐  │
│  │      WebView              │  │
│  │  （Chrome系ブラウザエンジン）│  │
│  │                           │  │
│  │  ┌─────────────────────┐  │  │
│  │  │  あなたのVueアプリ   │  │  │
│  │  │  (HTML/CSS/JS)      │  │  │
│  │  └────────┬────────────┘  │  │
│  └───────────┼───────────────┘  │
│              │ Capacitor Bridge  │
│  ┌───────────▼───────────────┐  │
│  │    ネイティブコード        │  │
│  │  (Java / Kotlin)          │  │
│  │  ・SP2Plugin.java         │  │
│  │  ・Capacitor公式プラグイン │  │
│  └───────────────────────────┘  │
│                                 │
│  Android OS                     │
│  ハードウェア（スキャナ、振動等）│
└─────────────────────────────────┘
```

**ポイント:**
- あなたのVueアプリは **WebView（ブラウザエンジン）** の中で動いている
- WebViewの外側に **Javaのネイティブコード** がある
- Capacitorが WebView ↔ ネイティブコード を **橋渡し（Bridge）** する

### 通信の流れ

例: スキャンボタンを押した時

```
1. [Vue]   ボタンのclickイベント発火
2. [Vue]   SP2Scanner.startScan() を呼ぶ（TypeScript）
3. [Bridge] Capacitorが "SP2Scanner" プラグインの "startScan" を探す
4. [Java]  SP2Plugin.java の startScan() が実行される
5. [Java]  SP2 AAR SDK を呼び出してスキャナを起動
6. [ハード] SP2スキャナがバーコードを読み取る
7. [Java]  結果を受け取り、notifyListeners("scanResult", data)
8. [Bridge] Capacitorがデータを WebView に送る
9. [Vue]   addListener のコールバックが実行される
10.[Vue]   画面に結果が表示される
```

---

## Capacitor vs Cordova

Capacitorの前身に **Cordova（旧PhoneGap）** という同様の技術がある。

| 観点 | Cordova | Capacitor |
|------|---------|-----------|
| 開発元 | Apache | Ionic（Capacitorの開発元） |
| ネイティブプロジェクト | ビルド時に生成（gitに入れない） | **プロジェクト内に保持（gitに入れる）** |
| ネイティブコード編集 | 困難（上書きされる） | **自由に編集可能** |
| プラグイン | Cordovaプラグイン | **Capacitorプラグイン + Cordovaプラグインも使える** |
| Web実行 | 非対応 | **対応（ブラウザで開発可能）** |
| 現在の状態 | メンテナンスモード | **活発に開発中** |

**このプロジェクトでCapacitorを選んだ理由:**
- `android/` ディレクトリを直接編集できる（SP2Plugin.javaの追加が容易）
- ブラウザでの開発（`ionic serve`）に対応している
- Ionic公式が推奨している

---

## Capacitor vs Ionic

よく混同されるが、CapacitorとIonicは **別のもの** 。

| | Ionic | Capacitor |
|---|---|---|
| 役割 | **UIフレームワーク** | **ネイティブブリッジ** |
| 提供するもの | ボタン、リスト、カード等のUIコンポーネント | カメラ、GPS、バイブ等のネイティブAPI |
| 必須か | いいえ（素のHTML/CSSでも可） | いいえ（Web機能だけなら不要） |
| 単独で使えるか | はい（Webアプリとして） | はい（React Native等と組み合わせ可能） |
| このプロジェクトでの役割 | 画面のUI（IonButton, IonList等） | SP2スキャナ連携、Haptics等 |

```
Ionic = 見た目を作る
Capacitor = ネイティブ機能を使う

このプロジェクト = Ionic（見た目）+ Capacitor（ネイティブ）+ Vue（ロジック）
```

---

## プラグインの種類

Capacitorでネイティブ機能を使うには **プラグイン** を通じてアクセスする。

### 公式プラグイン（@capacitor/*）

Capacitorチームが提供。品質・メンテナンスが安定。

| プラグイン | 機能 | このプロジェクト |
|---|---|---|
| `@capacitor/app` | アプリ状態、戻るボタン、ディープリンク | インストール済み |
| `@capacitor/haptics` | バイブレーション（触覚フィードバック） | **使用中**（useScanFeedback） |
| `@capacitor/keyboard` | ソフトキーボード制御 | インストール済み |
| `@capacitor/status-bar` | ステータスバー表示/非表示 | インストール済み |
| `@capacitor/camera` | カメラ撮影 | 未使用 |
| `@capacitor/geolocation` | GPS位置情報 | 未使用 |
| `@capacitor/network` | ネットワーク状態検知 | 未使用 |
| `@capacitor/filesystem` | ファイル読み書き | 未使用 |
| `@capacitor/push-notifications` | プッシュ通知 | 未使用 |
| `@capacitor/share` | 共有（Share Intent） | 未使用 |

### コミュニティプラグイン（@capacitor-community/*）

コミュニティが開発・メンテナンス。公式に比べてメンテナンスが不安定な場合がある。

| プラグイン | 機能 |
|---|---|
| `@capacitor-community/sqlite` | ローカルDB（SQLite） |
| `@capacitor-community/bluetooth-le` | Bluetooth Low Energy |
| `@capacitor-community/keep-awake` | 画面スリープ防止 |
| `@capacitor-community/text-to-speech` | 音声読み上げ |
| `@capacitor-community/barcode-scanner` | カメラでバーコード読取 |

### Local Plugin（このプロジェクトの方式）

npmに公開せず、**プロジェクト内にJavaコードを直接配置**する方式。
メーカー固有のSDK（AAR）を使う場合に適している。

```
このプロジェクトの例:
- android/app/src/main/java/.../sp2/SP2Plugin.java  ← ここに直接書く
- src/plugins/sp2-scanner.ts                          ← TypeScript側の定義
- src/plugins/sp2-scanner-web.ts                      ← ブラウザ用モック
```

**なぜLocal Plugin？**
- SP2 AAR SDKはnpmに公開されていない
- このプロジェクト専用のスキャナ連携
- 独立パッケージにするほどの再利用性がない

---

## 開発の流れ

### ブラウザで開発（ionic serve）

```
Vue アプリ → ブラウザで直接表示
               ├ Ionicコンポーネント → ブラウザで描画
               └ Capacitorプラグイン → Web モック が動く
```

SP2Scanner.startScan() を呼ぶと、`sp2-scanner-web.ts`（Webモック）が動作し、
モックデータが返る。**実際のスキャナは動かないが、UIの開発はできる。**

### Android実機で実行

```
ionic build          → dist/ にWebアセット生成
npx cap sync android → dist/ をAndroidプロジェクトにコピー
Android Studio       → APKビルド → 実機にインストール
```

SP2Scanner.startScan() を呼ぶと、`SP2Plugin.java`（Java実装）が動作し、
**実際のSP2スキャナが起動する。**

```
ブラウザ開発: TypeScript → Webモック（sp2-scanner-web.ts）
Android実機: TypeScript → Capacitor Bridge → Java（SP2Plugin.java）→ SP2 AAR SDK
```

**同じTypeScriptコードが、環境に応じて自動的に切り替わる。** これがCapacitorの核心。

---

## capacitor.config.ts

プロジェクトルートにある設定ファイル。

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'jp.co.example.warehouse',  // Androidのパッケージ名
  appName: '倉庫管理',               // アプリ表示名
  webDir: 'dist',                    // ビルド出力先（ionic buildの出力）
};

export default config;
```

| 項目 | 説明 |
|------|------|
| `appId` | Androidのパッケージ名。Google Playに公開する場合の一意識別子。`jp.co.会社名.アプリ名` の形式 |
| `appName` | 端末のホーム画面に表示されるアプリ名 |
| `webDir` | `ionic build` の出力ディレクトリ。`npx cap sync` でこのディレクトリの内容がAndroidにコピーされる |

---

## よくある疑問

### Q: Capacitorを使うとWebアプリより遅くなる？

WebView（Chrome系エンジン）で動くので、ブラウザと同等の速度。
UIの描画はWebなので、ゲームのようなリアルタイム描画には向かないが、
業務アプリ（フォーム入力、リスト表示、API通信）では全く問題ない。

### Q: Webアプリとして配布して、後からCapacitorを追加できる？

できる。Capacitorは後付け可能。
`npx cap add android` でAndroidプロジェクトを追加するだけ。

### Q: iOSにも対応できる？

`npx cap add ios` でiOSプロジェクトも追加可能。
ただしiOSビルドにはMac + Xcodeが必要。

### Q: PWA（Progressive Web App）との違いは？

| | PWA | Capacitor |
|---|---|---|
| インストール | ブラウザから「ホーム画面に追加」 | APKをインストール |
| ネイティブ機能 | 制限あり | フルアクセス |
| オフライン | Service Worker | SQLite + Filesystem |
| 配布 | URL共有 | APK配布 / Google Play |
| ハードウェア連携 | × ほぼ不可 | ◎ プラグインで対応 |

SP2スキャナのようなハードウェア連携が必要な場合、PWAでは不可能。Capacitorが必要。

### Q: React NativeやFlutterとの違いは？

| | Capacitor | React Native | Flutter |
|---|---|---|---|
| UIの描画 | WebView（HTML/CSS） | ネイティブUI | 独自描画エンジン |
| 言語 | **Web標準（HTML/CSS/JS/TS）** | JSX + React | Dart |
| 既存Webスキル | **そのまま使える** | Reactのみ使える | 使えない |
| パフォーマンス | 良好（業務アプリ十分） | 高い | 最も高い |
| 学習コスト | **最低** | 中 | 高 |

このプロジェクトでCapacitorを選んだ理由:
1. **Vue + TypeScriptの既存スキルをそのまま活用できる**
2. SP2 AARの統合がLocal Pluginで簡単にできる
3. 業務アプリの用途ではパフォーマンス差が問題にならない

---

## まとめ

```
Capacitor = Webアプリ → ネイティブアプリ の変換器 + ネイティブ機能の橋渡し

・あなたが書くのは Vue + TypeScript（Web技術）
・Capacitorが Android の中で動くようにしてくれる
・スキャナやバイブ等のネイティブ機能はプラグインで使える
・ブラウザでの開発（ionic serve）とAndroid実機で同じコードが動く
・SP2のようなメーカー固有SDKは Local Plugin で統合する
```
