# アーキテクチャ解説: なぜ Vue + TypeScript のプロジェクトに Android の AAR があるのか

## 目次

1. [このアプリの正体](#1-このアプリの正体)
2. [技術スタックの全体像](#2-技術スタックの全体像)
3. [なぜこの構成なのか](#3-なぜこの構成なのか)
4. [Capacitor の役割（詳細）](#4-capacitor-の役割詳細)
5. [なぜ AAR がプロジェクト内にあるのか](#5-なぜ-aar-がプロジェクト内にあるのか)
6. [データの流れ（具体例: スキャン）](#6-データの流れ具体例-スキャン)
7. [開発時 vs 実機の違い](#7-開発時-vs-実機の違い)

---

## 1. このアプリの正体

このプロジェクトは **倉庫管理アプリ** である。見た目や使い勝手はネイティブ Android アプリそのものだが、内部構造はまったく異なる。

| 観点 | 実態 |
|------|------|
| **見た目** | ネイティブ Android アプリと同じ（Ionic の UI コンポーネントがネイティブ風の外観を提供） |
| **中身** | Web アプリ（Vue 3 + TypeScript）が Android の WebView 上で動作している |
| **ネイティブ機能** | Capacitor を通じて SP2 スキャナなどのハードウェアにアクセスする |

つまり、**Web 技術で書かれたアプリを Android のガワに入れて、ネイティブアプリとして動かしている**。これが Ionic + Capacitor のアプローチである。

---

## 2. 技術スタックの全体像

以下の図は、このアプリの各レイヤーがどう積み重なっているかを示す。

```
┌─────────────────────────────┐
│  ユーザーが見る画面          │
│  (HTML/CSS/JS = Vue + Ionic) │
├─────────────────────────────┤
│  WebView (Chrome系ブラウザ)  │  ← AndroidのWebViewコンポーネント
├─────────────────────────────┤
│  Capacitor Bridge            │  ← JS ⇔ Java の通信層
├─────────────────────────────┤
│  Native Layer (Java)         │
│  ├─ SP2Plugin.java           │  ← SP2 AAR SDKをラップ
│  ├─ SP2 AAR SDK              │  ← スキャナハードウェア制御
│  └─ Capacitor公式プラグイン  │  ← Haptics, StatusBar等
├─────────────────────────────┤
│  Android OS                  │
│  └─ 業務用HT ハードウェア      │
└─────────────────────────────┘
```

**各レイヤーの説明:**

- **ユーザーが見る画面**: `src/` ディレクトリ以下の Vue コンポーネントと Ionic UI。通常の Web 開発と同じ技術で作られている。
- **WebView**: Android 内蔵のブラウザエンジン。この中で Vue アプリが動く。ユーザーはブラウザだと意識しない。
- **Capacitor Bridge**: JavaScript と Java をつなぐ通信層。ここが最も重要な仕組みであり、後述で詳しく説明する。
- **Native Layer**: Java で書かれたコード。SP2Plugin.java がスキャナ SDK を呼び出す。
- **Android OS / ハードウェア**: 業務用HT端末上の Android OS と SP2 スキャナハードウェア。

---

## 3. なぜこの構成なのか

倉庫管理アプリを作るにあたって、以下の選択肢を検討した。

### 選択肢 1: フルネイティブ（Java / Kotlin）

Java または Kotlin だけでアプリ全体を構築する方法。

| 観点 | 評価 |
|------|------|
| **メリット** | SP2 AAR を直接使える。パフォーマンス最高。Android の全機能にアクセスできる |
| **デメリット** | Java/Kotlin の経験が必要。UI 構築が手間（XML レイアウト）。Web の資産（ライブラリ、CSS フレームワーク等）を使えない |
| **不採用理由** | チームのスキルセット（Vue / TypeScript）を活かせない |

### 選択肢 2: React Native / Flutter

JavaScript (React) や Dart (Flutter) でクロスプラットフォームアプリを作る方法。

| 観点 | 評価 |
|------|------|
| **メリット** | iOS / Android の両方に対応できる（本プロジェクトでは Android のみだが将来性がある） |
| **デメリット** | ネイティブブリッジの仕組みが Capacitor と異なる。React / Dart の学習コストが発生する |
| **不採用理由** | Vue のエコシステムを活かせない。チームが Vue に習熟しているのに React や Dart を新たに学ぶメリットが薄い |

### 選択肢 3: Ionic + Capacitor（採用）

Vue + TypeScript で Web アプリを書き、Capacitor でネイティブ機能にアクセスする方法。

| 観点 | 評価 |
|------|------|
| **メリット** | Vue / TypeScript の既存スキルを最大活用できる。Web 標準技術（HTML/CSS/JS）で開発できる。Capacitor でネイティブ機能にもアクセスできる |
| **デメリット** | WebView ベースなのでフルネイティブより描画が少し遅い（業務アプリでは問題にならないレベル） |
| **採用理由** | **最小の学習コストでネイティブ機能付きアプリを構築できる**。チームの Vue / TypeScript スキルがそのまま使える |

---

## 4. Capacitor の役割（詳細）

### Capacitor とは

Capacitor は **Web アプリからネイティブ機能にアクセスするためのブリッジフレームワーク**。

Web アプリ（JavaScript）からは直接ハードウェアや OS の機能にアクセスできないが、Capacitor がその間を橋渡しする。JavaScript の関数呼び出しを Java のメソッド呼び出しに変換し、結果を JavaScript に返す仕組みである。

### Ionic と Capacitor の関係

Ionic と Capacitor は**別々のプロジェクト**であり、それぞれ独立した役割を持つ。

| プロジェクト | 役割 | 単独で使えるか |
|-------------|------|--------------|
| **Ionic** | UI コンポーネントライブラリ（ボタン、リスト、モーダルなど） | 使える。Web アプリでも使用可能 |
| **Capacitor** | ネイティブアクセスのブリッジ | 使える。Ionic 以外の Vue アプリでも使用可能 |

本プロジェクトではこの2つを併用している。Ionic が画面の見た目を担当し、Capacitor がスキャナなどのネイティブ機能へのアクセスを担当する。

### プラグインの仕組み（SP2Scanner を例に）

Capacitor プラグインがどのように TypeScript と Java をつないでいるかを、実際のコードに沿って説明する。

#### Step 1: TypeScript でプラグインを登録する

```typescript
// src/plugins/sp2-scanner.ts
export const SP2Scanner = registerPlugin<SP2ScannerPlugin>('SP2Scanner', {
  web: () => import('./sp2-scanner-web').then((m) => new m.SP2ScannerWeb()),
});
```

`registerPlugin` に `'SP2Scanner'` という名前を渡す。この名前が Java 側との接続キーになる。

#### Step 2: ブラウザ実行時（`ionic serve`）

`web:` オプションで指定した `SP2ScannerWeb` クラス（`src/plugins/sp2-scanner-web.ts`）が使われる。これは `WebPlugin` を継承したモック実装で、実際のスキャナは動かないが、開発用のダミーデータを返す。

```typescript
// src/plugins/sp2-scanner-web.ts
export class SP2ScannerWeb extends WebPlugin implements SP2ScannerPlugin {
  async startScan(): Promise<void> {
    // モック: 500ms後にダミーのスキャン結果を通知
    setTimeout(() => {
      this.notifyListeners('scanResult', { value, format: 'CODE128' });
    }, 500);
  }
}
```

#### Step 3: Android 実行時

Capacitor が `'SP2Scanner'` という名前で Java 側のプラグインを探す。`MainActivity.java` で登録された `SP2Plugin.class` がマッチする。

```java
// android/.../MainActivity.java
public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(SP2Plugin.class);  // ← ここで登録
        super.onCreate(savedInstanceState);
    }
}
```

```java
// android/.../sp2/SP2Plugin.java
@CapacitorPlugin(name = "SP2Scanner")  // ← 'SP2Scanner' で名前が一致
public class SP2Plugin extends Plugin {
    @PluginMethod()
    public void startScan(PluginCall call) {
        // SP2 AAR SDK を呼び出してスキャンを開始
    }
}
```

#### Step 4: メソッド呼び出しの流れ

TypeScript で `SP2Scanner.startScan()` を呼ぶと、Capacitor Bridge を経由して Java の `SP2Plugin.startScan(PluginCall call)` が実行される。

```
TypeScript: SP2Scanner.startScan()
    ↓ Capacitor Bridge (JS → Java)
Java: SP2Plugin.startScan(PluginCall call)
```

#### Step 5: イベント通知の流れ（Java → TypeScript）

Java 側でスキャン結果を受け取ったら、`notifyListeners` でイベントを発火する。TypeScript 側の `addListener` で登録したコールバックが実行される。

```
Java: notifyListeners("scanResult", data)
    ↓ Capacitor Bridge (Java → JS)
TypeScript: addListener('scanResult', callback) のcallbackが実行される
```

---

## 5. なぜ AAR がプロジェクト内にあるのか

ここが本ドキュメントの核心であり、このプロジェクトを初めて見た人が最も疑問に思う点である。

### AAR とは

AAR（Android Archive）は **Android のライブラリ形式**。Java / Kotlin で書かれたコードとリソースをひとつのファイルにパッケージ化したものである。拡張子は `.aar`。

Web 開発でいえば npm パッケージに相当する概念だが、Android（Java / Kotlin）の世界のライブラリである。

### なぜ必要なのか

SP2 スキャナは **業務用HT端末に搭載されたハードウェア**である。このハードウェアを制御するためには、メーカーが提供する **SP2 AAR SDK** が必要になる。

Web 技術（JavaScript）からはハードウェアを直接制御できない。ハードウェアを制御できるのは Java / Kotlin のネイティブコードだけである。そのため、Java で書かれた AAR SDK が必要になる。

### どこに配置されているのか

```
android/app/libs/
└── sp2-scanner.aar   ← ここに AAR を配置する（現在はREADMEのみ）
```

`build.gradle` で `libs` ディレクトリ内の `.aar` ファイルを自動的に依存関係として読み込む設定になっている:

```groovy
// android/app/build.gradle
dependencies {
    implementation fileTree(include: ['*.jar', '*.aar'], dir: 'libs')
    // ...
}
```

### 全体のつながり

AAR がプロジェクト内にある理由を一文でまとめるとこうなる:

> **Vue（画面）から Capacitor（橋渡し）を通じて Java Plugin（AAR 呼び出し）を経由し、SP2 SDK（ハードウェア制御）にアクセスするため。**

図で表すと:

```
Vue コンポーネント        ... 画面を描画し、ユーザー操作を受け付ける
    ↓ 関数呼び出し
useSP2Scanner.ts          ... Composable（Vue向けのスキャナAPI）
    ↓ 関数呼び出し
sp2-scanner.ts            ... Capacitor プラグイン定義（registerPlugin）
    ↓ Capacitor Bridge
SP2Plugin.java            ... Java プラグイン（AAR SDK をラップ）
    ↓ Java メソッド呼び出し
SP2 AAR SDK               ... メーカー提供のスキャナ制御ライブラリ
    ↓ ハードウェア制御
SP2 スキャナ本体          ... バーコード / QR コードを読み取る
```

つまり、**Vue + TypeScript のプロジェクトの中に AAR が存在するのは、Web 技術では直接アクセスできないハードウェアを、Capacitor のブリッジ機構を介して Java 経由で制御するためである。**

---

## 6. データの流れ（具体例: スキャン）

ユーザーがバーコードをスキャンするとき、データがどのように流れるかを具体的に追う。

```
 1. ユーザーが画面でスキャンボタンを押す
     │
 2. Vue コンポーネント: useSP2Scanner().startScan() が呼ばれる
     │  （src/composables/useSP2Scanner.ts）
     │
 3. TypeScript: SP2Scanner.startScan() → Capacitor Bridge に渡る
     │  （src/plugins/sp2-scanner.ts）
     │
 4. Java: SP2Plugin.startScan(PluginCall call) が実行される
     │  （android/.../sp2/SP2Plugin.java）
     │
 5. Java: SP2 AAR SDK のスキャン API を呼ぶ
     │
 6. ハードウェア: SP2 スキャナがバーコードを読み取る
     │
 7. Java: コールバックで結果を受け取り、notifyListeners("scanResult", data) を呼ぶ
     │
 8. Capacitor Bridge → TypeScript にイベントが渡る
     │
 9. TypeScript: addListener のコールバックが実行される
     │  （useSP2Scanner.ts 内で登録済み）
     │
10. Vue: lastResult.value が更新され、画面にスキャン結果が反映される
```

**ポイント:**

- 1 〜 3 は **TypeScript の世界**（Web）
- 4 〜 7 は **Java の世界**（Native）
- 8 〜 10 は再び **TypeScript の世界**（Web）
- Capacitor Bridge が 3 ⇔ 4 と 7 ⇔ 8 の境界で変換を行っている

---

## 7. 開発時 vs 実機の違い

### ブラウザ開発時（`ionic serve` / `npm run dev`）

```
Vue → useSP2Scanner → SP2Scanner.startScan()
                          ↓
                    SP2ScannerWeb（モック）
                    → 500ms 後にダミーデータを返す
```

- `sp2-scanner-web.ts` の `SP2ScannerWeb` クラスが使われる
- AAR SDK は動かない（ブラウザに Java の実行環境はない）
- モックが `'ITEM-001'`, `'A-01-01'` などのダミーデータを返す
- **スキャナがなくても画面の開発・テストができる**

### Android 実機

```
Vue → useSP2Scanner → SP2Scanner.startScan()
                          ↓
                    Capacitor Bridge
                          ↓
                    SP2Plugin.java → AAR SDK → 実際のスキャナ
```

- `SP2Plugin.java` が呼ばれ、AAR SDK 経由で実際のハードウェアが動作する
- Web モックは使われない
- **実際のバーコードを読み取って結果が返る**

### なぜこの切り替えが可能なのか

`registerPlugin` の仕組みによる:

```typescript
export const SP2Scanner = registerPlugin<SP2ScannerPlugin>('SP2Scanner', {
  web: () => import('./sp2-scanner-web').then((m) => new m.SP2ScannerWeb()),
});
```

- **ブラウザ実行時**: ネイティブプラグインが見つからないので `web:` で指定されたモックが使われる
- **Android 実行時**: `'SP2Scanner'` に一致する Java プラグイン（`@CapacitorPlugin(name = "SP2Scanner")`）が見つかるのでそちらが使われる

この仕組みにより、**同じ TypeScript コード (`SP2Scanner.startScan()`) を変更せずに、開発時はモック、実機では本物のスキャナが動く**。

---

## まとめ

このプロジェクトの構成を一言でまとめると:

> **Web 技術（Vue + TypeScript）でアプリの画面と業務ロジックを作り、Capacitor のブリッジを通じて Java の世界にある SP2 AAR SDK を呼び出すことで、ハードウェアスキャナを制御する倉庫管理アプリ。**

AAR が Vue + TypeScript のプロジェクト内にある理由は、Capacitor というブリッジフレームワークが Web と Native の間をつないでいるからであり、このプロジェクトが「Web アプリでありながらネイティブ機能を持つハイブリッドアプリ」だからである。
