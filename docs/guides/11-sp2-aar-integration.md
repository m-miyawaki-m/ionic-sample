# SP2 スキャナ AAR SDK 統合ガイド

本ガイドでは、倉庫管理アプリ（Ionic Vue + TypeScript + Capacitor）に SP2 スキャナの AAR SDK を統合する手順を説明する。現在のスタブ実装を実際の SDK に差し替える作業が対象。

---

## 現在の状態

本アプリでは SP2 スキャナとの連携を Capacitor カスタムプラグインとして実装しており、現時点では以下の通りスタブ／モック構成で動作している。

### ファイル構成

| ファイル | 役割 | 現在の状態 |
|---------|------|-----------|
| `android/app/src/main/java/jp/co/example/warehouse/sp2/SP2Plugin.java` | Android側プラグイン（ネイティブ） | スタブ実装（1秒後にモックデータを返す） |
| `src/plugins/sp2-scanner-web.ts` | ブラウザ用Web実装 | モック実装（`mockScanValues`を順番に返す） |
| `src/plugins/sp2-scanner.ts` | プラグイン定義・TypeScriptインターフェース | 定義済み（変更不要） |
| `src/composables/useSP2Scanner.ts` | Vue Composable（UIとの橋渡し） | 実装済み（変更不要） |
| `src/types/index.ts` | `ScanResult`, `ScannerStatus` 型定義 | 定義済み（変更不要） |
| `android/app/src/main/java/jp/co/example/warehouse/MainActivity.java` | プラグイン登録 | `registerPlugin(SP2Plugin.class)` 設定済み |

### TypeScript側のインターフェース（定義済み）

`src/plugins/sp2-scanner.ts` で以下のインターフェースが定義されている:

```typescript
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
```

スキャン結果は `notifyListeners("scanResult", data)` で以下の形式で通知される:

```typescript
interface ScanResult {
  value: string;   // 読み取った値（バーコード値やQR内容）
  format: string;  // フォーマット（CODE128, QR_CODE, etc.）
}
```

ネイティブ側がこのインターフェースに合致する限り、TypeScript側のコード変更は不要。

---

## AAR入手後の手順

### Step 1: AARファイルの配置

1. SP2 スキャナの AAR ファイル（例: `sp2-scanner-sdk-x.x.x.aar`）を以下のディレクトリに配置する:

   ```
   android/app/libs/sp2-scanner-sdk-x.x.x.aar
   ```

2. `android/app/build.gradle` を確認する。以下の設定が既に存在するため、`libs/` に配置した AAR は自動的に依存関係に含まれる:

   ```groovy
   repositories {
       flatDir{
           dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
       }
   }

   dependencies {
       implementation fileTree(include: ['*.jar', '*.aar'], dir: 'libs')
       // ...
   }
   ```

   **注意:** AARが追加の依存関係（例: `com.google.code.gson:gson` 等）を必要とする場合は、`dependencies` ブロックに手動で追加すること。AARのドキュメントで必要な依存関係を確認する。

3. Android Studio で「Sync Project with Gradle Files」を実行し、AARが正しく認識されることを確認する。

---

### Step 2: AARのAPIを確認

AARのドキュメントまたは Javadoc を読み、以下の4つの操作に対応するクラス・メソッドを特定する:

| 操作 | 確認すべきポイント | 例 |
|------|-------------------|-----|
| **初期化** | SDK の初期化メソッド、`Context` が必要か | `SP2Manager.getInstance().init(context)` |
| **スキャン開始/結果取得** | スキャン開始メソッド、コールバックの形式 | `startScan(ScanCallback)` |
| **スキャン停止** | スキャン停止メソッド | `stopScan()` |
| **解放** | リソース解放・切断メソッド | `release()` または `destroy()` |

追加で確認すること:

- SDK のメインクラス名とパッケージ名（import文に必要）
- コールバックで返される値の型（`String` か独自クラスか）
- バーコード種別（format）がどのように返されるか
- 接続状態の取得方法
- スレッドの扱い（コールバックがメインスレッドで呼ばれるか）

---

### Step 3: SP2Plugin.java の実装

現在の `SP2Plugin.java` のスタブ実装を、AAR SDK の実メソッドに差し替える。

#### 現在のスタブコード全文

```java
package jp.co.example.warehouse.sp2;

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
        // 例: SP2Manager.getInstance().init(getContext());
        JSObject result = new JSObject();
        result.put("success", true);
        call.resolve(result);
    }

    @PluginMethod()
    public void startScan(PluginCall call) {
        // TODO: SP2 AAR SDKのスキャン開始処理をここに実装

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

#### 差し替え後のテンプレート

以下のテンプレートで `/* AAR: ... */` の部分を AAR の実際のクラス名・メソッド名に置き換える:

```java
package jp.co.example.warehouse.sp2;

import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

// AAR: ここに AAR SDK の import を追加
// import com.example.sp2sdk.SP2Manager;
// import com.example.sp2sdk.ScanCallback;
// import com.example.sp2sdk.ScanResult;

@CapacitorPlugin(name = "SP2Scanner")
public class SP2Plugin extends Plugin {

    private static final String TAG = "SP2Plugin";

    // AAR: SDK のマネージャインスタンスをフィールドに保持
    // private SP2Manager sp2Manager;

    // ================================================================
    // initialize() -- SDK初期化
    // ================================================================
    // 差し替え箇所: メソッド全体の中身を置き換える
    // 旧: JSObject を即座に返すだけ
    // 新: AAR SDK を初期化してから結果を返す
    // ================================================================
    @PluginMethod()
    public void initialize(PluginCall call) {
        try {
            /* AAR: SDK の初期化処理
            sp2Manager = SP2Manager.getInstance();
            sp2Manager.init(getContext());
            */

            Log.d(TAG, "SP2 SDK initialized");

            JSObject result = new JSObject();
            result.put("success", true);
            call.resolve(result);
        } catch (Exception e) {
            Log.e(TAG, "SP2 SDK initialization failed", e);
            JSObject result = new JSObject();
            result.put("success", false);
            call.reject("SP2 SDK initialization failed: " + e.getMessage());
        }
    }

    // ================================================================
    // startScan() -- スキャン開始
    // ================================================================
    // 差し替え箇所: postDelayed のスタブを削除し、AAR のスキャン開始に置き換え
    // 重要: AAR のコールバックで notifyListeners("scanResult", data) を呼ぶこと
    //   - data には "value"（読み取り値）と "format"（バーコード種別）を入れる
    //   - このイベント名とキー名は TypeScript 側と合わせる必要がある
    // ================================================================
    @PluginMethod()
    public void startScan(PluginCall call) {
        try {
            /* AAR: スキャン開始 + コールバック設定
            sp2Manager.startScan(new ScanCallback() {
                @Override
                public void onScanResult(String value, String format) {
                    JSObject data = new JSObject();
                    data.put("value", value);
                    data.put("format", format);
                    notifyListeners("scanResult", data);
                }

                @Override
                public void onScanError(String error) {
                    Log.e(TAG, "Scan error: " + error);
                }
            });
            */

            Log.d(TAG, "Scan started");
            call.resolve();
        } catch (Exception e) {
            Log.e(TAG, "Failed to start scan", e);
            call.reject("Failed to start scan: " + e.getMessage());
        }
    }

    // ================================================================
    // stopScan() -- スキャン停止
    // ================================================================
    // 差し替え箇所: 空の実装を AAR の停止メソッド呼び出しに置き換え
    // ================================================================
    @PluginMethod()
    public void stopScan(PluginCall call) {
        try {
            /* AAR: スキャン停止
            sp2Manager.stopScan();
            */

            Log.d(TAG, "Scan stopped");
            call.resolve();
        } catch (Exception e) {
            Log.e(TAG, "Failed to stop scan", e);
            call.reject("Failed to stop scan: " + e.getMessage());
        }
    }

    // ================================================================
    // getStatus() -- 接続状態取得
    // ================================================================
    // 差し替え箇所: 固定値 "connected" を AAR の実際の状態に置き換え
    // 返す値は "connected" | "disconnected" | "unknown" のいずれか
    // （TypeScript側の ScannerStatus 型に合わせること）
    // ================================================================
    @PluginMethod()
    public void getStatus(PluginCall call) {
        try {
            /* AAR: 接続状態を取得
            boolean isConnected = sp2Manager.isConnected();
            String status = isConnected ? "connected" : "disconnected";
            */
            String status = "connected"; // AAR 実装時に上記に差し替え

            JSObject result = new JSObject();
            result.put("status", status);
            call.resolve(result);
        } catch (Exception e) {
            Log.e(TAG, "Failed to get status", e);
            JSObject result = new JSObject();
            result.put("status", "unknown");
            call.resolve(result);
        }
    }

    // ================================================================
    // destroy() -- リソース解放
    // ================================================================
    // 差し替え箇所: 空の実装を AAR の解放メソッド呼び出しに置き換え
    // ================================================================
    @PluginMethod()
    public void destroy(PluginCall call) {
        try {
            /* AAR: リソース解放
            if (sp2Manager != null) {
                sp2Manager.release();
                sp2Manager = null;
            }
            */

            Log.d(TAG, "SP2 SDK destroyed");
            call.resolve();
        } catch (Exception e) {
            Log.e(TAG, "Failed to destroy SP2 SDK", e);
            call.reject("Failed to destroy SP2 SDK: " + e.getMessage());
        }
    }
}
```

#### 差し替え作業チェックリスト

- [ ] `/* AAR: ... */` コメント内のコードを実際の SDK API に書き換え、コメントを外す
- [ ] import 文を AAR の実際のパッケージに合わせる
- [ ] `startScan` のコールバック内で `notifyListeners("scanResult", data)` が呼ばれることを確認
- [ ] `data.put("value", ...)` と `data.put("format", ...)` のキー名を変えないこと
- [ ] `getStatus` の返り値が `"connected"` / `"disconnected"` / `"unknown"` のいずれかであること
- [ ] AAR のコールバックが非メインスレッドで呼ばれる場合、`getActivity().runOnUiThread()` でラップする

**スレッドに関する注意:** AAR のコールバックがバックグラウンドスレッドで呼ばれる場合:

```java
// コールバック内で以下のようにメインスレッドに戻す
@Override
public void onScanResult(String value, String format) {
    getActivity().runOnUiThread(() -> {
        JSObject data = new JSObject();
        data.put("value", value);
        data.put("format", format);
        notifyListeners("scanResult", data);
    });
}
```

---

### Step 4: パーミッション追加（必要に応じて）

SP2 スキャナの接続方式（Bluetooth / USB / その他）に応じて、`android/app/src/main/AndroidManifest.xml` にパーミッションを追加する。

#### 現在の AndroidManifest.xml のパーミッション

```xml
<!-- Permissions -->
<uses-permission android:name="android.permission.INTERNET" />
```

#### Bluetooth接続の場合

```xml
<!-- Bluetooth（SP2スキャナ接続用） -->
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<!-- Android 12 (API 31) 以降 -->
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<!-- Bluetooth LE スキャンに位置情報が必要（Android 11 以前） -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

#### USB接続の場合

```xml
<!-- USB（SP2スキャナ接続用） -->
<uses-feature android:name="android.hardware.usb.host" />
```

USB の場合は intent-filter でデバイスを指定する必要がある場合もある。AAR のドキュメントを確認すること。

#### 実行時パーミッション要求

Android 6.0 以降では、危険なパーミッション（位置情報等）は実行時に要求する必要がある。Capacitor には `@capacitor/permissions` を使う方法もあるが、SP2Plugin.java 内で直接処理する場合の例:

```java
// SP2Plugin.java の initialize() 内で必要に応じて
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.content.pm.PackageManager;
import android.Manifest;

// Bluetooth パーミッションチェック（Android 12+）
if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
    if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.BLUETOOTH_CONNECT)
            != PackageManager.PERMISSION_GRANTED) {
        ActivityCompat.requestPermissions(
            getActivity(),
            new String[]{
                Manifest.permission.BLUETOOTH_SCAN,
                Manifest.permission.BLUETOOTH_CONNECT
            },
            1001
        );
    }
}
```

---

### Step 5: 動作確認

#### 1. ビルド

```bash
# プロジェクトルートから
npx cap sync android
```

Android Studio で `android/` フォルダを開き、ビルドエラーがないか確認する。

#### 2. 実機テスト

1. SP2 スキャナを実機に接続する（Bluetooth ペアリングまたは USB 接続）
2. Android Studio から実機にデプロイして起動する
3. アプリのスキャン画面でスキャンボタンを押す
4. スキャナでバーコードを読み取り、結果が画面に表示されることを確認する

#### 3. Logcat でデバッグ

Android Studio の Logcat で `SP2Plugin` タグでフィルタする:

```
tag:SP2Plugin
```

確認すべきログ:
- `SP2 SDK initialized` -- 初期化成功
- `Scan started` -- スキャン開始
- `Scan stopped` -- スキャン停止
- `SP2 SDK destroyed` -- 解放成功
- エラーログが出ている場合はスタックトレースを確認

AAR SDK 自体のログタグも確認すること（AAR のドキュメント参照）。

---

## TypeScript側の変更

### 基本的に変更不要

以下の条件を満たす限り、TypeScript 側のコード変更は一切不要:

- `SP2Plugin.java` の `notifyListeners` で送信するイベント名が `"scanResult"` であること
- 送信するデータに `value`（String）と `format`（String）が含まれること
- `getStatus` が返す `status` の値が `"connected"` / `"disconnected"` / `"unknown"` のいずれかであること

これらは `src/plugins/sp2-scanner.ts` の `SP2ScannerPlugin` インターフェースと `src/types/index.ts` の型定義に対応している。

### AARがバーコード種別を返す場合

AAR が返すバーコード種別の文字列がアプリ側で使っている値と異なる場合は、`startScan` のコールバック内で変換する:

```java
// 例: AAR が数値の定数で種別を返す場合
@Override
public void onScanResult(String value, int barcodeType) {
    JSObject data = new JSObject();
    data.put("value", value);
    // AAR の定数を文字列に変換
    String format;
    switch (barcodeType) {
        case 1: format = "CODE128"; break;
        case 2: format = "QR_CODE"; break;
        case 3: format = "EAN13"; break;
        case 4: format = "CODE39"; break;
        default: format = "UNKNOWN"; break;
    }
    data.put("format", format);
    notifyListeners("scanResult", data);
}
```

現在 `sp2-scanner-web.ts` のモックでは `"CODE128"` と `"QR_CODE"` を使用している。アプリ側で format の値に依存するロジックがある場合は、AAR が返す値と一致させること。

---

## トラブルシューティング

### AAR読み込みエラー（ビルド時に ClassNotFound や依存関係エラー）

**確認箇所:** `android/app/build.gradle`

```groovy
// この設定があるか確認
repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
    }
}

dependencies {
    implementation fileTree(include: ['*.jar', '*.aar'], dir: 'libs')
}
```

- AAR ファイルが `android/app/libs/` に配置されているか確認する
- ファイル名に空白や日本語が含まれていないか確認する
- Android Studio で「Sync Project with Gradle Files」を実行し直す
- AAR が必要とする追加ライブラリ（transitive dependencies）が不足していないか、AAR のドキュメントを確認する

### メソッドが見つからない（NoSuchMethodError / NoClassDefFoundError）

**確認箇所:** `SP2Plugin.java` の import 文

- AAR の実際のパッケージ名・クラス名を確認する（`com.example.sp2sdk.SP2Manager` は仮の名前）
- AAR の Javadoc またはサンプルコードでメソッドシグネチャを確認する
- AAR のバージョンとドキュメントのバージョンが一致しているか確認する
- ProGuard が有効な場合、AAR のクラスが難読化で消えていないか確認する（`proguard-rules.pro` に keep ルールを追加）

### スキャン結果が返らない（スキャンしても画面に反映されない）

**確認箇所:** `notifyListeners` の呼び出し

1. **イベント名の確認** -- `notifyListeners("scanResult", data)` のイベント名 `"scanResult"` が正しいか。TypeScript 側の `addListener('scanResult', ...)` と一致する必要がある
2. **データキーの確認** -- `data.put("value", ...)` と `data.put("format", ...)` のキー名が正しいか
3. **コールバックが実行されているか** -- Logcat で `notifyListeners` の直前にログを追加して確認する:
   ```java
   Log.d(TAG, "Scan result: value=" + value + ", format=" + format);
   notifyListeners("scanResult", data);
   ```
4. **スレッドの問題** -- AAR のコールバックがバックグラウンドスレッドで呼ばれている場合、`getActivity().runOnUiThread()` でラップする（Step 3 参照）

### 初期化に失敗する

- `getContext()` が null でないか確認する（`initialize` が呼ばれるタイミングの問題）
- AAR が `Application` クラスでの初期化を要求していないか確認する
- 必要なパーミッションが付与されているか確認する（Step 4 参照）

### 実機で動かない（エミュレータでは問題なし）

- SP2 スキャナが物理的に接続されているか確認する
- Bluetooth の場合、ペアリング済みか確認する
- USB の場合、USBデバッグとは別のUSBポートが必要かもしれない
- 一部の AAR SDK はエミュレータでは動作しない設計になっている

---

## 関連ファイル一覧

| ファイルパス | 説明 |
|------------|------|
| `android/app/src/main/java/jp/co/example/warehouse/sp2/SP2Plugin.java` | ネイティブプラグイン（主な変更対象） |
| `android/app/src/main/java/jp/co/example/warehouse/MainActivity.java` | プラグイン登録（変更不要） |
| `android/app/build.gradle` | AAR依存関係（変更不要、確認のみ） |
| `android/app/libs/` | AARファイル配置先 |
| `android/app/src/main/AndroidManifest.xml` | パーミッション追加（必要に応じて） |
| `src/plugins/sp2-scanner.ts` | TypeScriptインターフェース定義（変更不要） |
| `src/plugins/sp2-scanner-web.ts` | ブラウザ用モック（変更不要） |
| `src/composables/useSP2Scanner.ts` | Vue Composable（変更不要） |
| `src/types/index.ts` | ScanResult, ScannerStatus 型定義（変更不要） |
