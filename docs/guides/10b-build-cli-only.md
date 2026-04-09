# ビルド手順（Android Studio不要・コマンドラインのみ）

VS Code + ターミナルだけで Android APK をビルドする手順。
Android Studio のインストールは不要。

---

## 前提環境

このプロジェクトで確認済みの環境:

| ツール | バージョン | 確認コマンド |
|--------|-----------|-------------|
| Node.js | 24.11.0 | `node --version` |
| npm | 11.6.1 | `npm --version` |
| Ionic CLI | 7.2.1 | `ionic --version` |
| JDK | OpenJDK 24 | `java -version` |
| OS | WSL2 (Ubuntu) | `uname -a` |

---

## Step 1: Android SDK のインストール（初回のみ）

Android Studio を入れずに、コマンドラインツールだけをインストールする。

### 1-1. コマンドラインツールのダウンロード

```bash
# ホームに Android SDK 用ディレクトリを作成
mkdir -p ~/android-sdk/cmdline-tools

# コマンドラインツールをダウンロード（Linux版）
cd /tmp
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip

# 展開して配置
unzip commandlinetools-linux-11076708_latest.zip
mv cmdline-tools ~/android-sdk/cmdline-tools/latest
```

> **注意**: ダウンロードURLは変更される場合がある。最新のURLは
> https://developer.android.com/studio#command-line-tools-only の「Command line tools only」セクションから確認。

### 1-2. 環境変数の設定

`~/.bashrc` または `~/.zshrc` に以下を追加:

```bash
# Android SDK
export ANDROID_HOME=$HOME/android-sdk
export ANDROID_SDK_ROOT=$HOME/android-sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

設定を反映:

```bash
source ~/.bashrc
```

### 1-3. SDK コンポーネントのインストール

```bash
# ライセンスに同意
sdkmanager --licenses

# 必要なコンポーネントをインストール
sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"
```

| コンポーネント | 用途 | サイズ目安 |
|---|---|---|
| `platform-tools` | adb（端末接続・APKインストール） | ~15 MB |
| `platforms;android-35` | Android 15 API（コンパイル用） | ~70 MB |
| `build-tools;35.0.0` | APKビルドツール（aapt2等） | ~60 MB |

合計 **約150MB**（Android Studioの約3GBと比較して非常に軽量）。

### 1-4. インストール確認

```bash
sdkmanager --list_installed
```

Expected:
```
  Path                 | Version | Description
  platform-tools       | 35.x.x | Android SDK Platform-Tools
  platforms;android-35  | x      | Android SDK Platform 35
  build-tools;35.0.0   | 35.0.0 | Android SDK Build-Tools 35
```

---

## Step 2: プロジェクトのビルド

### 2-1. Web アセットの生成

```bash
cd /home/miyaw/dev/learning/ionic-sample

# TypeScriptのコンパイル + Viteビルド
ionic build
```

Expected: `dist/` ディレクトリが生成される（約1.3MB）。

### 2-2. Android プロジェクトへの同期

```bash
npx cap sync android
```

Expected:
```
✔ Copying web assets from dist to android/app/src/main/assets/public
✔ Creating capacitor.config.json in android/app/src/main/assets
✔ copy android
✔ update android
```

### 2-3. デバッグ APK のビルド

```bash
cd android
./gradlew assembleDebug
```

初回は Gradle のダウンロード（約100MB）と依存解決に数分かかる。
2回目以降は30秒〜1分程度。

Expected:
```
BUILD SUCCESSFUL in Xm Xs
XX actionable tasks: XX executed
```

### 2-4. APK の場所

```bash
ls -lh android/app/build/outputs/apk/debug/app-debug.apk
```

APKは `android/app/build/outputs/apk/debug/app-debug.apk` に生成される。

---

## Step 3: APK のインストール（実機）

### USB接続の場合

```bash
# 端末が認識されているか確認
adb devices

# APKをインストール
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### 再インストール（上書き）

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### adb が認識しない場合

1. 端末の「開発者向けオプション」→「USBデバッグ」を有効化
2. USBケーブルを接続し直す
3. 端末に表示される「USBデバッグを許可しますか？」で「許可」

---

## Step 4: リリース APK のビルド（署名付き）

本番配布用には署名付きAPKが必要。

### 4-1. キーストアの作成（初回のみ）

```bash
keytool -genkey -v \
  -keystore warehouse-release.keystore \
  -alias warehouse \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

パスワードと情報を入力する。**キーストアファイルとパスワードは安全に保管すること。**

> **重要**: `warehouse-release.keystore` を git にコミットしないこと。`.gitignore` に追加する。

### 4-2. 署名設定の追加

`android/app/build.gradle` の `android` ブロック内に追加:

```groovy
android {
    // 既存の設定...

    signingConfigs {
        release {
            storeFile file('../../warehouse-release.keystore')
            storePassword 'YOUR_STORE_PASSWORD'
            keyAlias 'warehouse'
            keyPassword 'YOUR_KEY_PASSWORD'
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

> **注意**: パスワードを直接 build.gradle に書くのはセキュリティ上好ましくない。
> 本番運用では `gradle.properties` や環境変数で管理する（後述）。

### 4-3. パスワードを環境変数で管理（推奨）

`android/gradle.properties` に追加（**gitにコミットしない**）:

```properties
WAREHOUSE_STORE_PASSWORD=your_store_password
WAREHOUSE_KEY_PASSWORD=your_key_password
```

`android/app/build.gradle` を変更:

```groovy
signingConfigs {
    release {
        storeFile file('../../warehouse-release.keystore')
        storePassword project.property('WAREHOUSE_STORE_PASSWORD')
        keyAlias 'warehouse'
        keyPassword project.property('WAREHOUSE_KEY_PASSWORD')
    }
}
```

`.gitignore` に追加:

```
warehouse-release.keystore
android/gradle.properties
```

### 4-4. リリースビルドの実行

```bash
cd android
./gradlew assembleRelease
```

APKは `android/app/build/outputs/apk/release/app-release.apk` に生成される。

---

## 一括コマンド（よく使う操作）

### 開発中のフルビルド → デバッグAPK

```bash
ionic build && npx cap sync android && cd android && ./gradlew assembleDebug && cd ..
```

### ビルド → インストール（実機接続済み）

```bash
ionic build && npx cap sync android && cd android && ./gradlew assembleDebug && cd .. && adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### Web のみ確認（ブラウザ）

```bash
ionic serve
```

### リモートアクセス（Tailscale等でSSH接続時）

```bash
ionic serve --external
# → http://<IP>:8100 でアクセス
```

---

## トラブルシューティング

### `sdkmanager: command not found`

環境変数が設定されていない。`~/.bashrc` を確認して `source ~/.bashrc` を実行。

### `ionic build` でエラー

```bash
# TypeScript のコンパイルエラーの場合
npx vue-tsc --noEmit
# エラー箇所が表示される
```

### `cap sync` で `missing dist directory`

`ionic build` を先に実行する。`dist/` が存在しないと sync できない。

### `gradlew: Permission denied`

```bash
chmod +x android/gradlew
```

### `SDK location not found`

`ANDROID_HOME` が設定されていない。環境変数を確認:

```bash
echo $ANDROID_HOME
# 空なら ~/.bashrc を確認
```

または `android/local.properties` に直接パスを書く:

```properties
sdk.dir=/home/miyaw/android-sdk
```

### `Failed to install the following Android SDK packages`

必要なSDKバージョンが不足。エラーメッセージに表示されるバージョンをインストール:

```bash
sdkmanager "platforms;android-XX" "build-tools;XX.X.X"
```

### Gradle のメモリ不足

`android/gradle.properties` に追加:

```properties
org.gradle.jvmargs=-Xmx2048m
```

### APK インストール時 `INSTALL_FAILED_UPDATE_INCOMPATIBLE`

署名が異なる旧バージョンが残っている。アンインストールしてから再インストール:

```bash
adb uninstall jp.co.example.warehouse
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## ビルドの流れまとめ

```
ソースコード (src/)
    ↓  ionic build (Vite)
Web アセット (dist/)
    ↓  npx cap sync android
Android プロジェクト (android/)
    ↓  ./gradlew assembleDebug
APK (android/app/build/outputs/apk/debug/app-debug.apk)
    ↓  adb install
業務用HT端末
```

各段階で VS Code のターミナルからコマンドを実行するだけ。Android Studio は不要。
