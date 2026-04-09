# ビルドとデプロイ

倉庫管理アプリ（Ionic Vue + TypeScript + Capacitor）のビルドからAndroid端末へのデプロイまでの手順。
対象端末: 業務用HT（Android 15）。

---

## 開発環境セットアップ

### 必要なツール

| ツール | バージョン | 用途 |
|--------|-----------|------|
| Node.js | 20 LTS 以上 | ランタイム |
| npm | 10 以上（Node.js に同梱） | パッケージ管理 |
| Ionic CLI | 7 以上 | `ionic serve` / `ionic build` |
| Android Studio | Ladybug 以降 | Androidビルド・デバッグ |
| JDK | 17 | Android Gradleビルドに必要 |

### インストール

```bash
# Ionic CLI（グローバル）
npm install -g @ionic/cli

# プロジェクトの依存パッケージ
npm install
```

Android Studio は公式サイトからダウンロードしてインストールする。
初回起動時に SDK Manager から **Android SDK 35 (Android 15)** をインストールすること。

JDK は Android Studio に同梱されている。別途インストールは不要。
ただし `JAVA_HOME` が正しく設定されていない場合は、Android Studio 同梱の JDK パスを設定する。

```bash
# 例: Linux
export JAVA_HOME="$HOME/android-studio/jbr"
```

### 開発サーバー

```bash
# ブラウザで開発（localhost:8100）
ionic serve

# 外部アクセス可能にする（Tailscale経由で別端末から確認する場合など）
ionic serve --external
```

`--external` を付けると LAN / Tailscale の IP でアクセスできる。
実機のブラウザから `http://<IPアドレス>:8100` で動作確認が可能。

---

## ビルドの流れ

開発からAPK生成までの3ステップ:

```bash
# 1. Webアセットをビルド（dist/ に出力）
ionic build

# 2. dist/ をAndroidプロジェクトにコピー + Capacitorプラグイン同期
npx cap sync android

# 3. Android Studioでプロジェクトを開く
npx cap open android
```

### 各ステップの説明

**`ionic build`**
- 内部的に `vue-tsc && vite build` を実行する（package.json の `build` スクリプト）
- TypeScript の型チェック後、Vite がバンドルして `dist/` に出力する
- `dist/` が生成されていないと次の `cap sync` が失敗する

**`npx cap sync android`**
- `dist/` の内容を `android/app/src/main/assets/public/` にコピーする
- Capacitor プラグイン（`@capacitor/app`, `@capacitor/haptics` 等）のネイティブコードを同期する
- `package.json` の依存関係を変更した後は必ず実行すること

**`npx cap open android`**
- Android Studio でプロジェクトを開く
- 初回は Gradle sync が自動実行される（数分かかる）

---

## Android Studio での操作

### ビルド

**Build > Make Project**（Ctrl+F9）

プロジェクト全体をコンパイルする。エラーがあれば Build ウィンドウに表示される。

### 実機デバッグ

1. 端末を USB で接続する（USBデバッグを有効にしておくこと）
2. ツールバーのデバイス選択ドロップダウンから端末を選択する
3. **Run > Run 'app'**（Shift+F10）

ログは **Logcat** ウィンドウで確認できる。
`Capacitor` や `Capacitor/Console` でフィルタすると、WebView 内の `console.log` も確認できる。

### デバッグAPKの生成

**Build > Build Bundle(s) / APK(s) > Build APK(s)**

生成先: `android/app/build/outputs/apk/debug/app-debug.apk`

デバッグ用の署名が自動で付与される。開発・テスト用途に使う。

### 署名付きAPK（リリース用）

**Build > Generate Signed Bundle / APK...**

1. APK を選択して Next
2. キーストアを指定する（初回は Create new で作成）
3. release を選択して Finish

生成先: `android/app/release/app-release.apk`

キーストアファイル（`.jks`）はリポジトリに含めないこと。安全な場所に保管する。

---

## Capacitor の設定

`capacitor.config.ts`:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'jp.co.example.warehouse',
  appName: '倉庫管理',
  webDir: 'dist'
};

export default config;
```

| 項目 | 説明 |
|------|------|
| `appId` | Android のアプリケーションID。Google Play や端末上でアプリを一意に識別する。変更すると別アプリとして扱われるので注意 |
| `appName` | 端末上に表示されるアプリ名 |
| `webDir` | `cap sync` でコピーするディレクトリ。Vite のデフォルト出力先 `dist` を指定 |

### Android 固有の設定

`android/variables.gradle` で SDK バージョンを管理している:

```gradle
ext {
    minSdkVersion = 24
    compileSdkVersion = 36
    targetSdkVersion = 36
}
```

- `targetSdkVersion = 36`: Android 15（API 36）を対象にしている
- `minSdkVersion = 24`: Android 7.0 以上で動作する

業務用HT端末は Android 15 なので、この設定で問題ない。

---

## vite.config.ts

```typescript
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
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
```

### ポイント

**プラグイン**
- `@vitejs/plugin-vue`: Vue 3 の SFC（`.vue`）をコンパイルする

**パスエイリアス**
- `@/` を `./src/` にマッピングしている
- `import Foo from '@/components/Foo.vue'` のように使える
- TypeScript 側の設定は `tsconfig.json` の `paths` でも合わせること

**`@vitejs/plugin-legacy` は不要**
- Android 15 の WebView は十分にモダンなブラウザエンジン（Chromium ベース）
- ES2020+ のシンタックスやAPIはすべてサポートされている
- legacy プラグインを入れるとバンドルサイズが無駄に増えるので追加しない

---

## よくあるトラブル

### `cap sync` で「Could not find the web assets directory」エラー

```
[error] Could not find the web assets directory: ./dist
```

原因: `ionic build`（または `npm run build`）を実行していない。

```bash
# 先にビルドしてから sync する
ionic build && npx cap sync android
```

### Android Studio でビルドエラー

Gradle sync に失敗する、または依存関係のエラーが出る場合:

1. **File > Sync Project with Gradle Files**
2. それでも解決しない場合: **File > Invalidate Caches / Restart**
3. さらにダメな場合: `android/.gradle/` を削除して再度開く

```bash
rm -rf android/.gradle
npx cap open android
```

### 実機にアプリが表示されない / デバイスが認識されない

1. 端末の **設定 > 開発者向けオプション > USBデバッグ** が有効になっているか確認
2. 開発者向けオプションが表示されていない場合: **設定 > デバイス情報 > ビルド番号** を7回タップ
3. USB接続時に端末側で「USBデバッグを許可しますか？」のダイアログが出たら許可する
4. `adb devices` でデバイスが表示されるか確認する

```bash
adb devices
# List of devices attached
# XXXXXXXX    device   ← これが出ればOK
# XXXXXXXX    unauthorized  ← 端末側で許可していない
```

### `ionic serve` が起動しない

ポート 8100 が既に使われている可能性がある:

```bash
# 別ポートで起動
ionic serve --port 8200
```

### ビルド後にアプリに変更が反映されない

`cap sync` を忘れている。`ionic build` だけでは Android プロジェクトに反映されない。

```bash
ionic build && npx cap sync android
```

---

## 本番デプロイ

このアプリは社内利用のため、Google Play は使わない。APK を直接端末にインストールする。

### MDM（モバイルデバイス管理）経由

MDM を導入している場合は、管理コンソールから APK をアップロードして端末に配信する。
これが最も管理しやすい方法。

### adb install での手動インストール

端末を USB で接続して adb コマンドでインストールする:

```bash
# デバッグAPKの場合
adb install android/app/build/outputs/apk/debug/app-debug.apk

# リリースAPKの場合
adb install android/app/release/app-release.apk

# 既にインストール済みの場合は -r で上書き
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

複数端末が接続されている場合は `-s` でシリアル番号を指定する:

```bash
adb -s <シリアル番号> install -r app-debug.apk
```

### APK を端末に転送して手動インストール

USB やファイル共有で APK ファイルを端末に転送し、ファイルマネージャーから開いてインストールする。
**設定 > 不明なアプリのインストール** を許可する必要がある。

---

## まとめ: 開発からデプロイまでのコマンド

```bash
# 開発
ionic serve

# ビルド + Android 同期
ionic build && npx cap sync android

# Android Studio で開く
npx cap open android

# APK を直接インストール（Android Studio を使わない場合）
# ※ 事前に Android Studio で APK をビルドしておくこと
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```
