# 06: Android スキャンフィードバック実装ガイド

倉庫業務アプリにおけるバーコード/QRスキャン時のフィードバック（振動・通知）の設計と実装について解説する。

---

## 目次

1. [なぜスキャンフィードバックが重要か](#なぜスキャンフィードバックが重要か)
2. [フィードバックの種類と比較](#フィードバックの種類と比較)
3. [Capacitor Haptics API](#capacitor-haptics-api)
4. [このプロジェクトでの実装](#このプロジェクトでの実装)
5. [業務アプリでのUXベストプラクティス](#業務アプリでのuxベストプラクティス)
6. [Android固有の注意点](#android固有の注意点)

---

## なぜスキャンフィードバックが重要か

### 倉庫環境の特殊性

倉庫でのハンディ端末操作は、オフィスでのスマートフォン操作とは根本的に異なる。

| 状況 | 影響 |
|------|------|
| **手袋を着用** | 画面タッチの精度が低下、画面を注視する余裕がない |
| **周囲の騒音** | フォークリフト・コンベア音で通知音が聞こえない |
| **画面が見にくい** | 直射日光、暗い棚の奥での作業、端末を顔から離した状態 |
| **片手がふさがっている** | 荷物を持ちながらの操作、端末を持ち替えられない |
| **高速な連続作業** | 1商品あたり数秒で処理、毎回画面確認は非効率 |

### ユーザーがスキャン成功を即座に認識できる必要性

スキャンボタンを押して(またはSP2のハードウェアトリガーを引いて)から、結果がアプリに反映されるまでの間、ユーザーは「読み取れたのか？」が分からない。フィードバックがなければ、同じバーコードを何度も読み直したり、逆にスキャンされていないのに次の工程に進んでしまう。

特にXnavis端末のSP2スキャナはハードウェアトリガーで発火するため、画面を見ずにトリガーを引くケースが多い。**画面を見なくてもスキャン成功/失敗が分かる仕組み**が不可欠になる。

---

## フィードバックの種類と比較

このプロジェクトでは4つのフィードバックパターンを用意し、`FeedbackType` として管理している。

```typescript
export type FeedbackType = 'none' | 'vibrate' | 'toast' | 'vibrate+toast';
```

### A) なし (`none`) -- デバッグ用

フィードバックを一切出さない。

- **向いている場面**: デバッグ時にフィードバックが邪魔な場合、スキャン処理ロジックだけを確認したい場合
- **向いていない場面**: 本番運用全般。ユーザーがスキャン成否を判断できない

### B) バイブレーションのみ (`vibrate`) -- 画面を見なくても気づく

端末が短く振動する。画面表示なし。

- **向いている場面**: 画面を見る余裕がない高速ピッキング、手袋着用時の作業、画面が見にくい環境
- **向いていない場面**: ブラウザ開発環境(Hapticsが動作しない)、読み取った値を目視確認したい場面

### C) トーストのみ (`toast`) -- ブラウザ開発時に便利

画面下部に読み取り値を1.5秒表示。振動なし。

- **向いている場面**: `ionic serve` でのブラウザ開発、読み取った値の目視確認が必要な場面
- **向いていない場面**: 画面を見られない環境、高速連続スキャン(トーストが追いつかない)

### D) バイブ + トースト (`vibrate+toast`) -- 本番推奨

振動と画面表示を併用。

- **向いている場面**: **本番運用(推奨)**。触覚+視覚の二重フィードバックで確実性が高い
- **向いていない場面**: 特になし。ブラウザ開発時は振動部分が無視されるだけで問題ない

### 比較表

| パターン | 触覚 | 視覚 | Web対応 | 本番推奨 |
|---------|------|------|---------|---------|
| A) なし | -- | -- | OK | -- |
| B) バイブのみ | OK | -- | 非対応 | △ |
| C) トーストのみ | -- | OK | OK | △ |
| D) バイブ+トースト | OK | OK | 部分対応 | **推奨** |

---

## Capacitor Haptics API

このプロジェクトでは `@capacitor/haptics` (v8.0.2) を使用する。

### インストール

```bash
npm install @capacitor/haptics
npx cap sync
```

### Impact -- 軽い振動(スキャン成功)

物理的な衝撃感をシミュレートする振動。スキャン読み取り成功時のフィードバックに最適。

```typescript
import { Haptics, ImpactStyle } from '@capacitor/haptics';

// 軽い振動 -- タップ感
await Haptics.impact({ style: ImpactStyle.Light });

// 中程度の振動 -- スキャン成功に推奨
await Haptics.impact({ style: ImpactStyle.Medium });

// 強い振動 -- 重要なアクション
await Haptics.impact({ style: ImpactStyle.Heavy });
```

`ImpactStyle` の3段階:

| スタイル | 振動の強さ | 用途 |
|---------|-----------|------|
| `Light` | 弱い | ボタンタップ、軽微な状態変化 |
| `Medium` | 中程度 | **スキャン成功(本プロジェクトで採用)** |
| `Heavy` | 強い | 重要な操作の確認 |

### Notification -- 成功/警告/エラーの振動パターン

OS定義の通知パターンを使う。成功・警告・エラーで振動パターンが異なるため、ユーザーは振動の感触だけで結果を判別できる。

```typescript
import { Haptics, NotificationType } from '@capacitor/haptics';

// 成功 -- 短く1回の振動
await Haptics.notification({ type: NotificationType.Success });

// 警告 -- 2回の短い振動
await Haptics.notification({ type: NotificationType.Warning });

// エラー -- 長めの振動
await Haptics.notification({ type: NotificationType.Error });
```

| タイプ | 振動パターン | 用途 |
|-------|-------------|------|
| `Success` | 短く軽い | API登録成功、データ保存完了 |
| `Warning` | 2回の短い振動 | 在庫数不一致、要確認 |
| `Error` | 長めの強い振動 | API通信エラー、スキャン値不正 |

### Web環境でのフォールバック

Capacitor Haptics APIはWeb環境では **何もしない**(エラーも投げない場合が多い)。ただし、一部の環境やバージョンでは例外が発生する可能性がある。そのため、本プロジェクトでは `try/catch` で囲んで安全にフォールバックしている。

```typescript
try {
  await Haptics.impact({ style: ImpactStyle.Medium });
} catch {
  // Web環境ではHapticsが使えない場合がある
  console.log('[ScanFeedback] Haptics not available');
}
```

`ionic serve` でのブラウザ開発時は振動せずにスルーされるだけなので、フィードバックタイプを `vibrate+toast` にしておけば、トースト部分だけが動作する。

---

## このプロジェクトでの実装

### useScanFeedback composable の構造

`src/composables/useScanFeedback.ts` がフィードバック機能のコアとなる。

```
useScanFeedback composable
├── feedbackType        ... 現在のフィードバック種別 (reactive)
├── setFeedbackType()   ... 種別の変更 + localStorage永続化
├── triggerFeedback()   ... スキャン結果受信時のフィードバック
├── triggerSuccess()    ... 登録成功時のフィードバック
├── triggerError()      ... 登録失敗時のフィードバック
├── toastMessage        ... トースト表示テキスト (reactive)
└── toastVisible        ... トースト表示状態 (reactive)
```

設定値は `localStorage` に永続化されるため、アプリ再起動後も前回の設定が維持される。デフォルトは `'vibrate+toast'`(本番推奨）。

#### 全体コード

```typescript
// src/composables/useScanFeedback.ts
import { ref } from 'vue';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import type { ScanResult } from '@/types';

export type FeedbackType = 'none' | 'vibrate' | 'toast' | 'vibrate+toast';

const feedbackType = ref<FeedbackType>(
  (localStorage.getItem('scanFeedback') as FeedbackType) || 'vibrate+toast'
);

const toastMessage = ref('');
const toastVisible = ref(false);

export function useScanFeedback() {
  const setFeedbackType = (type: FeedbackType) => {
    feedbackType.value = type;
    localStorage.setItem('scanFeedback', type);
  };

  const triggerFeedback = async (result: ScanResult) => {
    const type = feedbackType.value;

    // バイブレーション
    if (type === 'vibrate' || type === 'vibrate+toast') {
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch {
        // Web環境ではHapticsが使えない場合がある
        console.log('[ScanFeedback] Haptics not available');
      }
    }

    // トースト
    if (type === 'toast' || type === 'vibrate+toast') {
      toastMessage.value = `読み取り: ${result.value}`;
      toastVisible.value = true;
      setTimeout(() => {
        toastVisible.value = false;
      }, 1500);
    }
  };

  const triggerSuccess = async () => {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch {
      console.log('[ScanFeedback] Haptics not available');
    }
  };

  const triggerError = async () => {
    try {
      await Haptics.notification({ type: NotificationType.Error });
    } catch {
      console.log('[ScanFeedback] Haptics not available');
    }
  };

  return {
    feedbackType,
    setFeedbackType,
    triggerFeedback,
    triggerSuccess,
    triggerError,
    toastMessage,
    toastVisible,
  };
}
```

### triggerFeedback -- スキャン結果受信時

`triggerFeedback` はスキャナからバーコード/QR値を受信したタイミングで呼ぶ。現在のフィードバック設定に応じて、振動とトーストを出し分ける。

**ポイント:**
- `ScanResult` を引数に取るため、トースト内にスキャン値を表示できる
- `ImpactStyle.Medium` を採用。倉庫環境で手袋越しにも感じ取れる強さ
- トーストは1.5秒で自動消去。連続スキャンの妨げにならない長さ

業務画面での使い方:

```typescript
const { triggerFeedback } = useScanFeedback();
const { onScanResult } = useSP2Scanner();

onScanResult(async (result) => {
  await triggerFeedback(result); // スキャン直後にフィードバック
  itemCode.value = result.value;  // 画面に反映
});
```

### triggerSuccess / triggerError -- 登録成功/失敗時

API通信の結果に応じて、成功パターンまたはエラーパターンの振動を発生させる。

```typescript
const { triggerSuccess, triggerError } = useScanFeedback();

const submitReceiving = async () => {
  const response = await api.post('/receiving', payload);

  if (response.success) {
    await triggerSuccess();  // 短い成功振動
    showMessage('登録完了');
  } else {
    await triggerError();    // 長めのエラー振動
    showMessage('登録失敗: ' + response.error);
  }
};
```

これらはフィードバックタイプ設定に関係なく常に振動する設計になっている。APIの成功/失敗は業務上重要な情報であり、確実に伝える必要があるため。

### FeedbackPage サンプルでの4パターン比較

`src/views/samples/mockups/FeedbackPage.vue` で4つのフィードバックパターンを実機で試せる。

#### 画面構成

```
┌───────────────────────────────┐
│ スキャンフィードバック         │
├───────────────────────────────┤
│ 現在の設定                    │
│ ○ A) なし                     │
│ ● B) バイブレーションのみ      │
│ ○ C) トーストのみ             │
│ ○ D) バイブ + トースト        │
├───────────────────────────────┤
│ テスト                        │
│ [スキャン対象入力欄      ] [📷]│
│ [スキャン実行] [成功バイブ] [エラーバイブ] │
├───────────────────────────────┤
│ 個別パターンテスト             │
│ [A) フィードバックなし    ]    │
│ [B) バイブレーションのみ  ]    │
│ [C) トーストのみ          ]    │
│ [D) バイブ + トースト     ]    │
└───────────────────────────────┘
```

#### 主要なコード

ラジオボタンでフィードバック種別を切り替え:

```typescript
const onFeedbackChange = (event: CustomEvent) => {
  setFeedbackType(event.detail.value as FeedbackType);
};
```

モックスキャンの実行:

```typescript
const doMockScan = async () => {
  const mockResult = {
    value: 'ITEM-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    format: 'CODE128',
  };
  demoValue.value = mockResult.value;
  await triggerFeedback(mockResult);
};
```

個別パターンのテスト(設定を変えずに特定パターンだけ試す):

```typescript
const testPattern = async (type: FeedbackType) => {
  const mockResult = {
    value: 'TEST-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    format: 'QR_CODE',
  };

  // 一時的に指定パターンで実行
  if (type === 'vibrate' || type === 'vibrate+toast') {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch {
      console.log('[FeedbackTest] Haptics not available');
    }
  }

  if (type === 'toast' || type === 'vibrate+toast') {
    testToastMessage.value = `読み取り: ${mockResult.value}`;
    testToastVisible.value = true;
  }

  if (type === 'none') {
    demoValue.value = mockResult.value;
  }
};
```

---

## 業務アプリでのUXベストプラクティス

### 成功時: 短い振動 + 肯定的なフィードバック

```typescript
// スキャン読み取り成功
await Haptics.impact({ style: ImpactStyle.Medium });
// → 短い「コツッ」という振動。作業のリズムを崩さない

// API登録成功
await Haptics.notification({ type: NotificationType.Success });
// → 軽い成功パターンの振動
```

- 振動は短く済ませる。ユーザーの手を止めない
- トーストは肯定的な色(Ionicの `tertiary` や `success`)で表示
- 連続作業の流れを止めないよう、自動消去(1.5秒)

### エラー時: 長い振動 + エラー音 + 赤い表示

```typescript
// API通信エラー、バーコード不正など
await Haptics.notification({ type: NotificationType.Error });
```

- エラーは **必ず** ユーザーに気づかせる。成功時よりも強く長い振動
- 画面表示は赤系の色(`danger`)で目立たせる
- 必要に応じてアラートダイアログで操作をブロックする(見逃し防止)
- 可能であれば端末のビープ音も併用(SP2端末のAPIで制御可能)

### 連続スキャン時: フィードバックは軽くする

棚卸しやピッキングでは、1分間に数十回スキャンすることもある。

- `ImpactStyle.Medium` が適切。`Heavy` だと連続スキャン時にうるさい
- トーストの表示時間は1.5秒。次のスキャンまでに消えるタイミング
- 成功時のフィードバックは控えめにし、**エラー時だけ強調する**のが鉄則
- 連続スキャン中はトーストを省略し、バイブのみにするオプションも検討に値する

### フィードバック設計の指針まとめ

| シーン | 振動 | 画面表示 | 表示時間 |
|-------|------|---------|---------|
| スキャン読み取り | Impact Medium | トースト(読み取り値) | 1.5秒 |
| API登録成功 | Notification Success | トースト(緑系) | 1.5-3秒 |
| API登録失敗 | Notification Error | トースト(赤系) or アラート | 手動消去 or 3秒 |
| 在庫数不一致 | Notification Warning | カード表示(黄系) | 手動消去 |
| 連続スキャン中 | Impact Medium | 最小限 or なし | -- |

---

## Android固有の注意点

### VIBRATE パーミッション

Androidでバイブレーション機能を使うには `android.permission.VIBRATE` パーミッションが必要だが、**Capacitor が `@capacitor/haptics` のインストール時に自動で `AndroidManifest.xml` に追加する**。開発者が手動で追加する必要はない。

```xml
<!-- Capacitorが自動追加するため手動追記は不要 -->
<uses-permission android:name="android.permission.VIBRATE" />
```

このパーミッションは「通常パーミッション」に分類されるため、ユーザーへの実行時許可ダイアログは表示されない。インストール時に自動的に付与される。

### バッテリーへの影響

Haptics APIの振動はバッテリー消費が **極めて軽微**。

- 1回の `Impact` 振動: 数ミリ秒の振動モーター駆動
- 1日1000回スキャンしても: バッテリー影響は無視できるレベル
- 比較: 画面点灯やネットワーク通信のほうが桁違いに消費が大きい

倉庫業務で1日中使っても、Hapticsがバッテリーのボトルネックになることはまずない。バッテリー節約のためにフィードバックを無効化する必要はない。

### サイレントモード時の挙動

Androidのサイレントモード(マナーモード)と Haptics の関係:

| モード | Haptics振動 | 通知音 |
|-------|------------|-------|
| 通常モード | 動作する | 鳴る |
| マナーモード(バイブ) | **動作する** | 鳴らない |
| サイレントモード(ミュート) | **動作する** | 鳴らない |

Haptics APIによる振動は、サイレントモードでも **常に動作する**。これはAndroid OSの仕様で、プログラムから明示的に呼び出した振動はサイレントモードの影響を受けない。

倉庫業務端末では常にバイブレーションが動作するため、音を鳴らせない環境でもスキャンフィードバックが確実に届く。これはバイブレーションを主要フィードバック手段として採用する大きな理由の一つ。

### Xnavis端末(SP2スキャナ)での考慮事項

- SP2スキャナ自体もスキャン成功時にビープ音を鳴らす設定がある。Hapticsと二重でフィードバックされるため、ユーザーに確認して調整する
- Xnavis端末はバイブレーションモーターの性能が一般的なスマートフォンと異なる場合がある。`ImpactStyle` の感触は実機で必ず確認する
- 端末のケース装着時は振動が弱まる場合がある。`ImpactStyle.Medium` でも感じにくい場合は `Heavy` への変更を検討する

---

## 参考リンク

- [Capacitor Haptics API ドキュメント](https://capacitorjs.com/docs/apis/haptics)
- [Android Vibrator API](https://developer.android.com/reference/android/os/Vibrator)
- [Ionic Toast コンポーネント](https://ionicframework.com/docs/api/toast)
