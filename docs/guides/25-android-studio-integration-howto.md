# Android Studio 組み込み手順（クイックリファレンス）

このプロジェクト（Ionic Vue + Capacitor 5）のコードを Android Studio で開いて実機 / エミュレータに流し込むまでの、**どこで・何を・なぜ** 実行するかを最短で書いたメモ。

より詳しい解説や APK 配布は [`10-build-deploy.md`](./10-build-deploy.md) を参照。Android Studio 不要の CLI だけのビルドは [`10b-build-cli-only.md`](./10b-build-cli-only.md)。

---

## 前提とする環境

| 項目 | 値 |
|---|---|
| OS | WSL2 (Ubuntu) + Windows 11 |
| ビルドマシン（Node/Capacitor） | **WSL 側** |
| Android Studio | **Windows 側** にインストール |
| プロジェクトの場所 | WSL 上（`/home/miyaw/dev/learning/ionic-sample`） |

> Android Studio は Windows 側のものを使う前提で書いている。WSL 内の Linux 版 Android Studio でも動くが、エミュレータや実機 USB デバッグは Windows 側のほうが圧倒的に楽。

---

## 全体像（データの流れ）

```
[ src/ (Vue) ]
      │ npm run build
      ▼
[ dist/ (HTMLとJS) ]
      │ npx cap sync android
      ▼
[ android/app/src/main/assets/public/ ]  ← WebView が読む
      │ Android Studio で Build / Run
      ▼
[ APK → エミュレータ / 実機 ]
```

**重要**: `dist/` → `android/app/src/main/assets/public/` は `cap sync` がコピーする。これをやらないと古い画面のまま焼かれる。

---

## 初回セットアップ（1 回だけ）

### Windows 側

1. **Android Studio** をインストール（最新版で可）
2. 起動 → SDK Manager から以下を入れる
   - **Android SDK Platform 36**（Android 15）
   - **Android SDK Build-Tools**（最新）
   - **Android Emulator**（エミュレータを使うなら）
3. **エミュレータ作成**（任意）: Device Manager → Create Device → API 34 以上推奨

### WSL 側

```bash
# プロジェクトルートで
cd /home/miyaw/dev/learning/ionic-sample

# 依存インストール
npm install

# Ionic CLI（使うなら。なくても良い。npm run build で代替可）
npm install -g @ionic/cli
```

---

## 毎回の実行手順（3 コマンド + Android Studio）

### Step 1: Web 資産をビルド

**場所**: WSL ターミナル・プロジェクトルート

```bash
npm run build
```

- 内部で `vue-tsc && vite build` が走る
- 成果物は `dist/`
- 失敗したら TypeScript エラー → 先にそれを直す

### Step 2: Android プロジェクトに同期

**場所**: WSL ターミナル・プロジェクトルート

```bash
npx cap sync android
```

やっていること:
- `dist/` を `android/app/src/main/assets/public/` にコピー
- `@capacitor/*` プラグインのネイティブ設定を `android/` に反映
- `package.json` の依存を変更した後は必須

> ショートカット: `npm run build && npx cap sync android` を一気に流すのが定型。

### Step 3: Android Studio で `android/` を開く

2 通りある。好きなほうで。

**A. CLI から開く**

```bash
npx cap open android
```

- WSL からだと Windows 側の Android Studio を呼び出せない場合がある（WSLg や設定次第）
- 動かないときは B の手動が確実

**B. 手動で開く（推奨）**

Windows 側の Android Studio を起動 → **File > Open** → 以下のパスを指定:

```
\\wsl.localhost\Ubuntu\home\miyaw\dev\learning\ionic-sample\android
```

（ディストリ名は `wsl -l -v` で確認。Ubuntu-22.04 など別名なら置き換える）

初回は Gradle Sync が走る（依存 DL で数分 ～ 10 分）。

> **注意**: WSL パスを Windows の Android Studio で開くと I/O が遅い。頻繁にビルドするなら、プロジェクトを Windows 側ドライブ（例 `C:\dev\...`）に置いたほうが快適。ただしその場合も `npm` コマンドはパス側で動かすマシンを合わせる。

### Step 4: 実機 / エミュレータに流す

Android Studio 上で:

1. 画面上部のデバイスドロップダウンで実機 or エミュレータを選択
2. 緑の **Run ▶** ボタン（または `Shift + F10`）

ログは下部パネルの **Logcat** で追える。WebView の `console.log` は `Capacitor/Console` でフィルタすると見える。

---

## コード変更後の反映フロー

Vue / TS を編集したら:

```bash
npm run build && npx cap sync android
```

→ Android Studio で **Run ▶** 押し直し。

> Android Studio 側で Gradle Sync は不要（Java/Gradle 設定を変えたときだけ）。

### ライブリロード（開発中に毎回焼きたくないとき）

```bash
# 端末 / エミュレータが adb で見えている状態で
npx cap run android --livereload --external
```

これで WSL の Vite dev server に実機がつなぎに来る構成になる。Android Studio 経由でデバッグしたいだけなら通常フロー（build → sync → Run）で十分。

---

## 実機（USB）を使うとき

Windows 側にドライバが入っていれば、Android Studio のデバイスドロップダウンに出る。

```powershell
# Windows PowerShell で確認
adb devices
```

- `unauthorized` と出たら端末で USB デバッグ許可を押す
- 表示されないなら **開発者向けオプション > USB デバッグ** を有効化
  - 開発者向けオプションが無いとき: **設定 > デバイス情報 > ビルド番号** を 7 回タップ

WSL 側の `adb devices` はデフォルトでは見えない（USB が Windows にアタッチされているため）。WSL で `adb` を使いたい場合は `usbipd` で USB を WSL に bind する必要があり面倒なので、**普段は Windows 側 Android Studio の UI にまかせる**のが楽。

---

## よくあるトラブル

| 症状 | 原因 | 対処 |
|---|---|---|
| `cap sync` で `Could not find the web assets directory: ./dist` | `npm run build` してない | 先にビルドする |
| 変更したはずなのに実機で古い画面 | `cap sync` を忘れた | `npm run build && npx cap sync android` |
| Gradle Sync が失敗し続ける | キャッシュ破損 | `rm -rf android/.gradle android/app/build` → 再 Open |
| Android Studio で `android/` を開いても重い | WSL パスの I/O が遅い | プロジェクトごと Windows 側に置く |
| 実機が Android Studio に出ない | USB デバッグ無効 or ドライバ不足 | 上記「実機」節を確認 |
| `npx cap open android` が何も起こらない | WSL → Windows アプリ起動が通っていない | 手動で Android Studio から開く |
| `vue-tsc` で `Search string not found...` | Node と vue-tsc の組み合わせ不整合 | vue-tsc を最新（^2.x）に揃える（本プロジェクトは対応済み） |

---

## チートシート

```bash
# 初回のみ
npm install

# 毎回の流れ（WSL）
npm run build
npx cap sync android

# Android Studio（Windows）
# File > Open → \\wsl.localhost\Ubuntu\home\miyaw\dev\learning\ionic-sample\android
# Run ▶

# コード変更のたびに
npm run build && npx cap sync android
```

---

## 関連ドキュメント

- [`10-build-deploy.md`](./10-build-deploy.md) — フル版（署名 APK、adb 配布、トラブルシュート詳細）
- [`10b-build-cli-only.md`](./10b-build-cli-only.md) — Android Studio を使わずコマンドラインだけでビルドする手順
- [`00-what-is-capacitor.md`](./00-what-is-capacitor.md) — Capacitor の仕組み（`cap sync` が何をしているかの理解に）
- [`07-capacitor-plugin-guide.md`](./07-capacitor-plugin-guide.md) — ネイティブプラグインを足すときの手順
