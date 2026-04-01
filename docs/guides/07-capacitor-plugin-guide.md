# Capacitor プラグインガイド

このガイドでは、本プロジェクト（倉庫在庫管理アプリ）で採用している **Capacitor Local Plugin** の仕組みを、SP2スキャナ連携の実装を例にして解説する。

---

## 1. Capacitor プラグインとは

### Web(TypeScript) と Native(Java/Kotlin) をつなぐ仕組み

Capacitor プラグインは、TypeScript で定義したインターフェースを通じて、Android（Java/Kotlin）や iOS（Swift）のネイティブ API を呼び出すためのブリッジ機構である。

```
┌────────────────────────────────┐
│  TypeScript (Web / Vue)        │
│  SP2Scanner.startScan()        │
└──────────┬─────────────────────┘
           │  Capacitor Bridge
┌──────────▼─────────────────────┐
│  Java (Android Native)         │
│  SP2Plugin.startScan(call)     │
│  → SP2 AAR SDK 呼び出し        │
└────────────────────────────────┘
```

TypeScript 側からは `await SP2Scanner.startScan()` のように通常の非同期関数として呼び出すだけで、裏側では Capacitor のブリッジがネイティブコードへメッセージを転送し、結果を Promise として返してくれる。

### 公式プラグイン vs カスタムプラグイン vs Local Plugin

| 種類 | 概要 | 例 |
|---|---|---|
| **公式プラグイン** | Capacitor チームが提供する npm パッケージ。`npm install` で導入し、すぐ使える。 | `@capacitor/camera`, `@capacitor/filesystem` |
| **カスタムプラグイン** | 独自に作成し npm パッケージとして公開するプラグイン。複数プロジェクトで再利用する場合に向く。 | 社内共通の認証プラグイン等 |
| **Local Plugin** | プロジェクト内にネイティブコードを直接配置して使うプラグイン。npm パッケージ化不要で最もシンプル。 | **本プロジェクトの SP2Scanner** |

本プロジェクトでは、SP2スキャナ AAR SDK はこのアプリ専用であり、npm パッケージ化するメリットがないため **Local Plugin** を採用している。

---

## 2. Local Plugin の作り方（このプロジェクトの実例）

全体のファイル構成は以下の通り。

```
ionic-sample/
├── src/
│   ├── plugins/
│   │   ├── sp2-scanner.ts          # Step 1: インターフェース定義
│   │   └── sp2-scanner-web.ts      # Step 2: Web用モック
│   └── composables/
│       └── useSP2Scanner.ts        # Vue Composable（利用側）
└── android/
    └── app/
        ├── libs/
        │   └── (sp2-scanner.aar)   # AAR ファイル配置先
        ├── build.gradle            # Step 5: 依存設定
        └── src/main/java/jp/co/example/warehouse/
            ├── MainActivity.java   # Step 4: プラグイン登録
            └── sp2/
                └── SP2Plugin.java  # Step 3: Java側実装
```

---

### Step 1: TypeScript側のインターフェース定義

**ファイル:** `src/plugins/sp2-scanner.ts`

```typescript
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

export const SP2Scanner = registerPlugin<SP2ScannerPlugin>('SP2Scanner', {
  web: () => import('./sp2-scanner-web').then((m) => new m.SP2ScannerWeb()),
});
```

**ポイント:**

- `SP2ScannerPlugin` インターフェースで、プラグインが提供するメソッドをすべて型定義する。これにより TypeScript の型チェックが効く。
- `registerPlugin<SP2ScannerPlugin>('SP2Scanner', ...)` の第1引数 `'SP2Scanner'` は、Java 側の `@CapacitorPlugin(name = "SP2Scanner")` と**一致させる必要がある**。
- 第2引数の `web` オプションで、ブラウザ実行時に使うモック実装を動的インポートで指定する。ネイティブ実行時は無視される。
- `addListener` / `removeAllListeners` はネイティブからの非同期イベント通知を受け取るための定義。Capacitor が `PluginListenerHandle` を通じてリスナーのライフサイクルを管理する。

---

### Step 2: Web用モック

**ファイル:** `src/plugins/sp2-scanner-web.ts`

```typescript
import { WebPlugin } from '@capacitor/core';
import type { SP2ScannerPlugin } from './sp2-scanner';
import type { ScannerStatus } from '@/types';

const mockScanValues = [
  'ITEM-001', 'ITEM-002', 'ITEM-003', 'ITEM-004',
  'ITEM-005', 'ITEM-006', 'ITEM-007', 'ITEM-008',
  'ITEM-009', 'ITEM-010', 'ITEM-011', 'ITEM-012',
  'A-01-01', 'A-01-02', 'A-02-01', 'B-01-01',
  'C-01-01', 'D-01-01', 'LOT-2026-001', 'LOT-2026-002',
  'SHIP-0001', 'SHIP-0002', 'SHIP-0003',
];
let mockIndex = 0;

export class SP2ScannerWeb extends WebPlugin implements SP2ScannerPlugin {
  async initialize(): Promise<{ success: boolean }> {
    console.log('[SP2Scanner Web Mock] initialize');
    return { success: true };
  }

  async startScan(): Promise<void> {
    const value = mockScanValues[mockIndex % mockScanValues.length];
    mockIndex++;
    console.log(`[SP2Scanner Web Mock] startScan - will return: ${value}`);
    setTimeout(() => {
      this.notifyListeners('scanResult', {
        value,
        format: value.startsWith('ITEM') ? 'CODE128' : 'QR_CODE',
      });
    }, 500);
  }

  async stopScan(): Promise<void> {
    console.log('[SP2Scanner Web Mock] stopScan');
  }

  async getStatus(): Promise<{ status: ScannerStatus }> {
    return { status: 'connected' };
  }

  async destroy(): Promise<void> {
    console.log('[SP2Scanner Web Mock] destroy');
  }
}
```

**ポイント:**

- `WebPlugin` を継承し、`SP2ScannerPlugin` インターフェースを implements する。
- ブラウザで `ionic serve` 実行時、ネイティブ SDK は存在しないため、このモッククラスが代わりに動作する。
- `this.notifyListeners('scanResult', data)` は `WebPlugin` が提供するメソッドで、`addListener('scanResult', ...)` で登録されたコールバックにデータを通知する。
- モックデータにはアイテムコード（`ITEM-001`）、ロケーション（`A-01-01`）、ロット番号（`LOT-2026-001`）、出荷番号（`SHIP-0001`）など、業務で実際に使うパターンを含めておくと開発・テストが捗る。
- `setTimeout` で 500ms の遅延を入れることで、実機に近い非同期挙動をシミュレートしている。

---

### Step 3: Java側の実装

**ファイル:** `android/app/src/main/java/jp/co/example/warehouse/sp2/SP2Plugin.java`

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
        // 例:
        // sp2Manager.startScan(new ScanCallback() {
        //     @Override
        //     public void onScanResult(String value, String format) {
        //         JSObject data = new JSObject();
        //         data.put("value", value);
        //         data.put("format", format);
        //         notifyListeners("scanResult", data);
        //     }
        // });

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

**ポイント:**

- `@CapacitorPlugin(name = "SP2Scanner")` -- `name` は TypeScript 側の `registerPlugin` 第1引数と完全一致させる。
- `@PluginMethod()` を付けたメソッドが、TypeScript から呼び出し可能になる。メソッド名も TypeScript 側のインターフェースと一致させる。
- `PluginCall call` -- TypeScript から渡された引数の取得と、結果の返却に使う。
  - `call.resolve(jsObject)` で成功レスポンスを返す（TypeScript 側の Promise が resolve される）。
  - `call.reject("エラーメッセージ")` でエラーを返す（TypeScript 側の Promise が reject される）。
- `notifyListeners("scanResult", data)` -- TypeScript 側の `addListener('scanResult', ...)` で登録されたコールバックにデータを送信する。スキャン結果のようなイベント駆動の通知に使う。
- `Plugin` クラスが提供する `getContext()` や `getActivity()` で Android の Context/Activity にアクセスできる。

---

### Step 4: MainActivity への登録

**ファイル:** `android/app/src/main/java/jp/co/example/warehouse/MainActivity.java`

```java
package jp.co.example.warehouse;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import jp.co.example.warehouse.sp2.SP2Plugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(SP2Plugin.class);
        super.onCreate(savedInstanceState);
    }
}
```

**ポイント:**

- `registerPlugin(SP2Plugin.class)` は **`super.onCreate()` の前に** 呼ぶ。Capacitor の Bridge 初期化時にプラグインが登録されている必要があるため。
- Local Plugin では、この手動登録が必須。npm パッケージ型のプラグインは Capacitor が自動登録するが、Local Plugin はこの1行を書かないと認識されない。
- 複数の Local Plugin がある場合は、`registerPlugin` を複数回呼ぶ。

```java
registerPlugin(SP2Plugin.class);
registerPlugin(AnotherPlugin.class);
super.onCreate(savedInstanceState);
```

---

### Step 5: build.gradle の設定

**ファイル:** `android/app/build.gradle`

AAR/JAR ファイルを依存関係として読み込むための設定が必要。

```groovy
repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
    }
}

dependencies {
    implementation fileTree(include: ['*.jar', '*.aar'], dir: 'libs')
    // ... 他の依存関係
}
```

**ポイント:**

- `flatDir { dirs 'libs' }` で `android/app/libs/` ディレクトリをローカルリポジトリとして認識させる。
- `implementation fileTree(include: ['*.jar', '*.aar'], dir: 'libs')` で `libs/` 内の全 AAR/JAR を依存関係に追加する。
- 本プロジェクトではこの設定が既に入っているため、AAR ファイルを `android/app/libs/` に配置するだけで使える。

---

## 3. データの受け渡し

### JS → Java: PluginCall から引数を取得

TypeScript 側からオブジェクトを渡すと、Java 側で `PluginCall` のメソッドで取得できる。

**TypeScript 側（呼び出し）:**

```typescript
await SP2Scanner.someMethod({ barcode: 'ITEM-001', quantity: 5 });
```

**Java 側（受け取り）:**

```java
@PluginMethod()
public void someMethod(PluginCall call) {
    String barcode = call.getString("barcode");        // "ITEM-001"
    Integer quantity = call.getInt("quantity");          // 5
    Boolean flag = call.getBoolean("flag", false);      // デフォルト値付き
    JSObject obj = call.getObject("nested");             // ネストしたオブジェクト
    JSArray arr = call.getArray("items");                // 配列

    // null チェック
    if (barcode == null) {
        call.reject("barcode is required");
        return;
    }

    JSObject result = new JSObject();
    result.put("processed", true);
    call.resolve(result);
}
```

主要な取得メソッド:

| メソッド | 戻り値 | 用途 |
|---|---|---|
| `call.getString("key")` | `String` | 文字列 |
| `call.getInt("key")` | `Integer` | 整数 |
| `call.getFloat("key")` | `Float` | 浮動小数点 |
| `call.getBoolean("key")` | `Boolean` | 真偽値 |
| `call.getBoolean("key", false)` | `Boolean` | デフォルト値付き |
| `call.getObject("key")` | `JSObject` | オブジェクト |
| `call.getArray("key")` | `JSArray` | 配列 |

### Java → JS: JSObject で resolve

Java 側から TypeScript に値を返すには `JSObject` を使う。

```java
JSObject result = new JSObject();
result.put("status", "connected");
result.put("batteryLevel", 85);
result.put("timestamp", System.currentTimeMillis());
call.resolve(result);
```

TypeScript 側では Promise の戻り値として受け取る。

```typescript
const result = await SP2Scanner.getStatus();
console.log(result.status);       // "connected"
console.log(result.batteryLevel); // 85
```

### イベント通知: notifyListeners (Java) → addListener (TS)

メソッド呼び出しの戻り値ではなく、ネイティブ側から任意のタイミングで TypeScript にデータを送るにはイベント通知を使う。

**Java 側（送信）:**

```java
JSObject data = new JSObject();
data.put("value", scannedBarcode);
data.put("format", "CODE128");
notifyListeners("scanResult", data);
```

**TypeScript 側（受信）:**

```typescript
const listener = await SP2Scanner.addListener('scanResult', (result) => {
  console.log('スキャン結果:', result.value);   // "ITEM-001"
  console.log('フォーマット:', result.format);   // "CODE128"
});

// リスナー解除
await listener.remove();
```

### このプロジェクトのスキャン結果通知パターン

本プロジェクトでは、`useSP2Scanner` composable でイベントリスナーの登録・解除をライフサイクルに合わせて管理している。

**ファイル:** `src/composables/useSP2Scanner.ts`

```
Vue コンポーネント                useSP2Scanner               SP2Scanner Plugin
      │                              │                              │
      │  onMounted                   │                              │
      ├─────────────────────────────►│  initialize()                │
      │                              ├─────────────────────────────►│
      │                              │  addListener('scanResult')   │
      │                              ├─────────────────────────────►│
      │                              │                              │
      │  startScan() ボタン押下       │                              │
      ├─────────────────────────────►│  startScan()                 │
      │                              ├─────────────────────────────►│
      │                              │                              │
      │                              │  ◄── scanResult イベント ──── │
      │                              │  lastResult を更新            │
      │  ◄── リアクティブに反映 ──────│  resultCallback を呼び出し    │
      │                              │                              │
      │  onUnmounted                 │                              │
      ├─────────────────────────────►│  listener.remove()           │
      │                              ├─────────────────────────────►│
      │                              │  destroy()                   │
      │                              ├─────────────────────────────►│
```

具体的なコード:

```typescript
// useSP2Scanner.ts の抜粋

const initialize = async () => {
  const res = await SP2Scanner.initialize();
  if (res.success) {
    const st = await SP2Scanner.getStatus();
    status.value = st.status;
  }
  // イベントリスナー登録
  scanListener = await SP2Scanner.addListener('scanResult', (result) => {
    lastResult.value = result;
    isScanning.value = false;
    if (resultCallback) {
      resultCallback(result);
    }
  });
};

// Vue のライフサイクルに合わせて初期化・解放
onMounted(() => {
  initialize();
});

onUnmounted(async () => {
  if (scanListener) {
    await scanListener.remove();
  }
  await SP2Scanner.destroy();
});
```

Vue コンポーネントでの使い方:

```typescript
// 各業務画面での利用例
const { startScan, lastResult, isScanning, onScanResult } = useSP2Scanner();

onScanResult((result) => {
  // スキャン結果を業務ロジックで処理
  itemCode.value = result.value;
});
```

---

## 4. AAR 統合の手順

SP2 スキャナ SDK は AAR（Android Archive）形式で提供されている。以下の手順で統合する。

### 4.1 AAR ファイルの配置

AAR ファイルを以下のディレクトリに配置する。

```
android/app/libs/
└── sp2-scanner.aar    ← ここに配置
```

本プロジェクトでは `android/app/libs/README.md` に配置先の説明がある。ベンダーから提供された AAR ファイルをこのディレクトリにコピーするだけでよい。

### 4.2 build.gradle の設定

`android/app/build.gradle` に以下の設定が必要（本プロジェクトでは設定済み）。

```groovy
repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
    }
}

dependencies {
    // libs/ 内の全 AAR/JAR を自動で依存関係に追加
    implementation fileTree(include: ['*.jar', '*.aar'], dir: 'libs')
    // ...
}
```

特定の AAR だけを明示的に指定する場合は以下のように書くこともできる。

```groovy
dependencies {
    implementation(name: 'sp2-scanner', ext: 'aar')
}
```

### 4.3 Java コードからのインポートと呼び出し

AAR 内のクラスを `SP2Plugin.java` から使う。

```java
package jp.co.example.warehouse.sp2;

// AAR SDK のクラスをインポート（パッケージ名は SDK のドキュメントを参照）
import com.vendor.sp2.SP2Manager;
import com.vendor.sp2.ScanCallback;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "SP2Scanner")
public class SP2Plugin extends Plugin {

    private SP2Manager sp2Manager;

    @PluginMethod()
    public void initialize(PluginCall call) {
        sp2Manager = SP2Manager.getInstance();
        sp2Manager.init(getContext());

        JSObject result = new JSObject();
        result.put("success", true);
        call.resolve(result);
    }

    @PluginMethod()
    public void startScan(PluginCall call) {
        sp2Manager.startScan(new ScanCallback() {
            @Override
            public void onScanResult(String value, String format) {
                JSObject data = new JSObject();
                data.put("value", value);
                data.put("format", format);
                notifyListeners("scanResult", data);
            }
        });
        call.resolve();
    }

    @PluginMethod()
    public void destroy(PluginCall call) {
        if (sp2Manager != null) {
            sp2Manager.release();
            sp2Manager = null;
        }
        call.resolve();
    }
}
```

> **注意:** 上記の `com.vendor.sp2` パッケージ名やクラス名は AAR SDK のドキュメントに従って読み替えること。現在の `SP2Plugin.java` にはスタブ実装が入っており、AAR SDK が提供され次第 TODO コメントの箇所を実装する。

---

## 5. デバッグのコツ

### 5.1 Web モックでブラウザ開発

実機やスキャナがなくても、ブラウザ上でアプリの動作確認ができる。

```bash
ionic serve
```

`sp2-scanner-web.ts` のモック実装が自動的に使われ、`startScan()` を呼ぶと 500ms 後にモックデータが返る。モックデータには業務で使うパターン（アイテムコード、ロケーション、ロット番号等）を含めてあるため、画面の動作確認が一通りできる。

**モック開発のメリット:**
- 実機ビルドが不要なので開発サイクルが速い
- Vue の Hot Module Replacement（HMR）でコード変更が即座に反映される
- ブラウザの開発者ツールがフルに使える

**モックデータのカスタマイズ:**

`sp2-scanner-web.ts` の `mockScanValues` 配列を編集して、テストしたい値を追加できる。

```typescript
const mockScanValues = [
  'ITEM-001', 'ITEM-002',  // アイテムコード
  'A-01-01', 'B-01-01',    // ロケーション
  'LOT-2026-001',           // ロット番号
  'SHIP-0001',              // 出荷番号
  // 必要に応じて追加
];
```

### 5.2 Android Studio のログ（Logcat）

ネイティブ側のデバッグには Logcat を使う。

**Logcat のフィルタ設定:**

Android Studio で Logcat を開き、以下のタグでフィルタすると Capacitor 関連のログが見やすくなる。

| フィルタ | 内容 |
|---|---|
| `Capacitor` | Capacitor Bridge のログ全般 |
| `Capacitor/SP2Scanner` | SP2Scanner プラグインのログ |
| `Capacitor/Plugin` | プラグインのライフサイクルログ |

**Java コードにログを追加:**

```java
import android.util.Log;

@PluginMethod()
public void startScan(PluginCall call) {
    Log.d("SP2Plugin", "startScan called");
    // ...
}
```

**よくあるエラーと対処:**

| Logcat のメッセージ | 原因 | 対処 |
|---|---|---|
| `Plugin SP2Scanner not found` | MainActivity に `registerPlugin` がない | `registerPlugin(SP2Plugin.class)` を追加 |
| `Method startScan not found` | `@PluginMethod()` が付いていない | アノテーションを確認 |
| `ClassNotFoundException` | AAR が正しく読み込めていない | `build.gradle` と `libs/` を確認 |

### 5.3 Chrome DevTools でのリモートデバッグ

実機上で動作する WebView の JavaScript を Chrome DevTools でデバッグできる。

**手順:**

1. Android 端末を USB で PC に接続し、USB デバッグを有効にする
2. PC の Chrome で `chrome://inspect` を開く
3. 「Remote Target」セクションにアプリの WebView が表示される
4. 「inspect」をクリックすると DevTools が開く

**デバッグできること:**

- Console ログの確認（Web モックの `console.log` 出力を含む）
- Network タブで API 通信の確認
- Elements タブで DOM の確認
- Sources タブでブレークポイント設定
- Vue.js devtools 拡張（対応している場合）

**Capacitor プラグイン呼び出しの確認:**

DevTools の Console で直接プラグインを呼び出してテストできる。

```javascript
// Console から直接テスト
const { SP2Scanner } = await import('/src/plugins/sp2-scanner.ts');
const status = await SP2Scanner.getStatus();
console.log(status);
```

**Web モックとネイティブの切り替え確認:**

`ionic serve`（ブラウザ）では Web モックが、`npx cap run android`（実機）ではネイティブ実装が使われる。この切り替えは `registerPlugin` が自動で行うため、コードの変更は不要。

```typescript
// この1行で Web/Native を自動判定
export const SP2Scanner = registerPlugin<SP2ScannerPlugin>('SP2Scanner', {
  web: () => import('./sp2-scanner-web').then((m) => new m.SP2ScannerWeb()),
});
```

---

## まとめ

Capacitor Local Plugin による SP2 スキャナ連携の全体像を以下にまとめる。

| レイヤー | ファイル | 役割 |
|---|---|---|
| TypeScript インターフェース | `src/plugins/sp2-scanner.ts` | メソッド定義 + `registerPlugin` |
| Web モック | `src/plugins/sp2-scanner-web.ts` | ブラウザ開発用のモック動作 |
| Vue Composable | `src/composables/useSP2Scanner.ts` | リスナー管理 + リアクティブ状態 |
| Java プラグイン | `android/.../sp2/SP2Plugin.java` | ネイティブ SDK 呼び出し |
| プラグイン登録 | `android/.../MainActivity.java` | `registerPlugin(SP2Plugin.class)` |
| AAR 配置 | `android/app/libs/` | SP2 AAR SDK ファイル |
| Gradle 設定 | `android/app/build.gradle` | AAR 依存関係 |

開発時は Web モック (`ionic serve`) で高速に画面を作り、ネイティブ連携の検証は実機 (`npx cap run android`) + Logcat + Chrome DevTools で行うのが効率的なワークフローとなる。
