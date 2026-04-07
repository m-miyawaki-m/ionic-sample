# 18. HT共通設計ガイドライン

倉庫HT（Android）アプリの**画面横断の共通決定事項**を集約する。
画面ごとの検討（[画面設計シート](19-ht-screen-design-sheet-template.md)）で再確認しないものを、ここで1度だけ決める。

> **本ガイドの位置付け:** [Web→HT画面検討チェックリスト設計書](../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md) で定義された3層モデルの **Layer 1** に相当する。
> spec の各STEPで `★共通` マークが付いた項目は本ガイドの規約をそのまま適用し、画面設計シートには差分のある場合のみ記載する。
>
> **書き方の規約:**
> - 決定済みなら値や規約を直接書く
> - 決定済みだが既存ガイドに記述があれば、そのガイドへの参照リンクで代替してよい
> - 未決の項目は `(未決)` を残し、決定した日時点でこのファイルを更新する
> - 既存ガイドから抽出して **暫定確定** したものは「暫定」の注記を付ける

---

## 1. ハード連携共通

### 1.1 リーダSDKの起動／停止タイミング (spec 6-2)

**暫定方針:** Vue コンポーネントのライフサイクルに合わせて、`onMounted` で `initialize()` + `startScan()`、`onBeforeUnmount` で `stopScan()` + `destroy()` を呼び出す。

`SP2ScannerPlugin` インターフェース（[11. SP2 AAR 統合](11-sp2-aar-integration.md) 参照）で以下のメソッドを提供：

| メソッド | タイミング |
|---|---|
| `initialize()` | 画面マウント時、または App 起動時に1回 |
| `startScan()` | スキャナを利用する画面のマウント時 |
| `stopScan()` | 画面アンマウント時 |
| `destroy()` | App 終了時、または明示的にリソース解放したい時 |

> **未決:** `initialize()` を画面ごとに呼ぶか App ルートで1回だけ呼ぶかは要決定。現状はスタブ実装のため挙動差が出ない。

参考: [11. SP2 AAR 統合](11-sp2-aar-integration.md)

### 1.2 リーダのclose漏れ防止 (spec 6-3)

(未決)

> 検討候補: ルートレベルの `useSP2Scanner` composable で `onUnmounted` に必ず `stopScan` を仕込む／グローバル状態で「現在 open 中の画面」を保持し、画面遷移時に強制 close するガード層を入れる。

### 1.3 バーコード/QRリーダとRFIDリーダの併用方針 (spec 6-4)

(未決)

> 補足: 現プロジェクトは SP2 スキャナ（バーコード/QR）のみを想定。RFID 対応は要件外。RFID を導入する場合は本セクションで「同時起動可否」「切替UI」「電力消費プロファイル」を確定すること。

### 1.4 物理ボタンの割当 (spec 3-8 / 6-11)

| ボタン | 用途 | 状態 |
|---|---|---|
| SP2 ハードウェアトリガ | スキャン実行（画面を見ずに発火） | 暫定確定 |
| Enterキー | (未決) | 未決 |
| 戻るキー | (未決) — Capacitor `@capacitor/app` の `backButton` で制御可能 | 未決 |
| F1〜F4 | (未決) | 未決 |

参考: [06. Android スキャンフィードバック §なぜスキャンフィードバックが重要か](06-android-scan-feedback.md)（SP2 ハードウェアトリガの位置付け）

### 1.5 音／振動／LED の割当 (spec 6-10)

**暫定確定**（[06. Android スキャンフィードバック](06-android-scan-feedback.md) ベース）：

| イベント | 音 | 振動 | LED |
|---|---|---|---|
| スキャン成功（読取値受信） | SP2 端末側ビープ（端末設定で制御） | `Haptics.impact(Medium)` | なし |
| スキャン失敗（読取エラー） | SP2 端末側ビープ | `Haptics.notification(Error)` | なし |
| 確定成功（API 登録成功） | なし | `Haptics.notification(Success)` | なし |
| エラー（API 登録失敗） | なし | `Haptics.notification(Error)` | なし |
| 警告（在庫不一致等） | なし | `Haptics.notification(Warning)` | なし |

**追加方針:**
- フィードバックタイプは `'vibrate+toast'`（本番推奨）をデフォルトとする
- マナーモード／サイレントモードでも振動は動作する（Android OS 仕様）
- バッテリー消費は無視できるレベル
- 連続スキャン中は `Heavy` を使わず `Medium` にとどめ、エラー時のみ強調する

参考: [06. Android スキャンフィードバック](06-android-scan-feedback.md)

### 1.6 スリープ・画面ロックとの相性 (spec 6-12)

(未決)

> 検討候補: スキャン待機中は `@capacitor-community/keep-awake` でスリープ抑止する。復帰時のスキャナ再 open は `@capacitor/app` の `appStateChange` イベントで `resume` を検知して再 `startScan()` する。
>
> 参考: [14. Android 機能適合チェックリスト 3-2 / 9-2](14-android-capability-checklist.md)

### 1.7 OSバージョン依存・端末固有制約 (spec 6-14)

| 項目 | 値 |
|---|---|
| 対象端末 | Xnavis（SP2 スキャナ搭載 Android HT） |
| 対象OS | (未決 — Xnavis 採用機種の Android バージョンに依存) |
| バイブモータ | 端末ケース装着時に弱まる場合あり。`ImpactStyle.Medium` で実機確認必須、必要なら `Heavy` へ変更 |
| SP2 ビープ音 | Haptics と二重フィードバックになるため運用前に調整 |
| エミュレータ動作 | 一部の AAR SDK はエミュレータ非対応の場合あり |

参考: [11. SP2 AAR 統合 §トラブルシューティング](11-sp2-aar-integration.md) / [14. Android 機能適合チェックリスト](14-android-capability-checklist.md)

### 1.8 ハード機能ごとの権限要求 (spec 6-15)

| 権限 | 必要性 | 取得タイミング | 備考 |
|---|---|---|---|
| `INTERNET` | 必須 | インストール時自動 | API 通信用、AndroidManifest 設定済 |
| `VIBRATE` | 必須 | インストール時自動 | `@capacitor/haptics` インストール時に自動追加。実行時許可不要 |
| `BLUETOOTH` / `BLUETOOTH_ADMIN` | SP2 接続方式に依存 | (未決) | SP2 が Bluetooth 接続の場合に必要 |
| `BLUETOOTH_SCAN` / `BLUETOOTH_CONNECT` | Android 12+ で SP2 が Bluetooth 接続なら必須 | アプリ起動時に実行時要求 | [11 §Step 4](11-sp2-aar-integration.md) 参照 |
| `ACCESS_FINE_LOCATION` | Android 11 以前で BLE スキャンを使う場合のみ | アプリ起動時に実行時要求 | [11 §Step 4](11-sp2-aar-integration.md) 参照 |
| `CAMERA` | カメラスキャンをフォールバックに使う場合のみ | (未決 — フォールバック方針確定後) | [14 §1-2](14-android-capability-checklist.md) |
| ストレージ | (未決) | (未決) | ログ・写真記録の有無に依存 |

参考: [06 §Android固有の注意点](06-android-scan-feedback.md) / [11 §Step 4](11-sp2-aar-integration.md)

---

## 2. UI共通

### 2.1 フォントサイズの最低基準 (spec 4-3)

(未決)

> 推奨: CSS `rem` 単位を使用し、端末の文字サイズ設定に追従させる。`px` 固定は避ける。
>
> 参考: [14. Android 機能適合チェックリスト 11-4](14-android-capability-checklist.md)

### 2.2 タップターゲットの最低サイズ (spec 4-4)

**暫定確定: 48 × 48 dp 以上**

- Ionic コンポーネントはデフォルトで 48dp 以上を満たす
- カスタム要素は `min-height: 48px` を明示する
- 手袋着用時を想定し、主要操作ボタンは 56dp 以上が望ましい

参考: [14. Android 機能適合チェックリスト 11-1 / 用語集 dp](14-android-capability-checklist.md)

### 2.3 色覚対応・コントラスト (spec 4-5)

(未決)

> 推奨原則:
> - WCAG 基準（コントラスト比 4.5:1）以上を目標
> - Ionic デフォルトテーマは基準を満たす。カスタム色は要確認
> - エラー/警告は **色だけに頼らない**（アイコン + テキスト併用）
>
> 参考: [14. Android 機能適合チェックリスト 11-2 / 11-3](14-android-capability-checklist.md)

### 2.4 画面の向き (spec 4-6)

**暫定確定: 縦持ち固定**

倉庫作業中の意図しない画面回転を防ぐ。`@capacitor/screen-orientation` または `AndroidManifest.xml` で固定。

参考: [14. Android 機能適合チェックリスト 3-1](14-android-capability-checklist.md)

### 2.5 即時フィードバック（音/振動/LED）の方針 (spec 4-7)

(本セクションは「1.5 音／振動／LED の割当」を参照)

### 2.6 ローディング状態の表示 (spec 4-10)

**暫定確定: 2パターン使い分け**

| 用途 | コンポーネント | 備考 |
|---|---|---|
| 全画面ブロック | `IonLoading`（本プロジェクトの `LoadingOverlay`） | 通信中の操作全停止が必要なとき |
| ボタン内インライン | `IonSpinner` | 部分的な処理待ちで、他操作を許可したいとき |

二重押下防止と連動（送信中はボタンを `disabled` にする）。本プロジェクトで `LoadingOverlay` が2パターン切替対応済み。

参考: [14. Android 機能適合チェックリスト 2-5](14-android-capability-checklist.md)

### 2.7 エラー表示の位置 (spec 4-11)

**暫定確定:**

| エラー種別 | 表示方法 | 持続時間 |
|---|---|---|
| 通常エラー | 画面下部 `IonToast`（`color="danger"`） | 3秒 自動消去 |
| 重要エラー（業務停止級） | `IonAlert` ダイアログでブロック | 手動消去 |
| バリデーションエラー | フォーム該当項目近傍 + 振動（`Haptics.notification(Error)`） | 手動修正まで |
| 在庫不一致等の警告 | カード表示（黄系）+ `Haptics.notification(Warning)` | 手動消去 |

参考: [06. Android スキャンフィードバック §業務アプリでのUXベストプラクティス](06-android-scan-feedback.md)

### 2.8 片手操作の前提 (spec 4-13)

(未決)

> 推奨原則: 主要操作ボタンは画面下部・親指届く範囲に配置。`IonFab`（フローティングボタン）も活用。
>
> 参考: [14. Android 機能適合チェックリスト 11-6](14-android-capability-checklist.md)

---

## 3. 通信共通

### 3.1 タイムアウト値 (spec 5-3)

**暫定確定: 30 秒**（[12. API 統合](12-api-integration.md) の推奨例 `TIMEOUT_MS = 30000`）

> **現状:** `useApi` の現実装にはタイムアウト未実装。`AbortController` を使った実装パターンは [12 §4 タイムアウトの実装](12-api-integration.md) 参照。
>
> 超過時の挙動: トースト「通信がタイムアウトしました。再度お試しください。」を表示し、再試行可能にする。

### 3.2 弱電波時のユーザ通知 (spec 5-4)

(未決)

> 検討候補:
> - `@capacitor/network` の `addListener` でオフライン検知 → 状態バッジ表示
> - 通信失敗時はトースト「ネットワークに接続できません。」（[12 §4 ネットワークエラーの強化](12-api-integration.md) 参照）
> - 自動再試行中の表示は別途検討
>
> 参考: [14. Android 機能適合チェックリスト 6-4](14-android-capability-checklist.md)

### 3.3 再送ポリシー (spec 5-6)

| 観点 | 規約 | 状態 |
|---|---|---|
| 自動再送回数 | 0（現状未実装） | 暫定 |
| バックオフ方式 | なし（現状未実装） | 暫定 |
| 手動再送ボタン | なし（現状）— エラートースト表示後にユーザが画面操作で再実行 | 暫定 |
| タイムアウト | 30秒（3.1 参照） | 暫定 |

> **将来検討:** オフラインキュー導入時に自動再送＋指数バックオフを設計する。
>
> 参考: [12. API 統合](12-api-integration.md) / [14. Android 機能適合チェックリスト 6-1 / 6-3](14-android-capability-checklist.md)

---

## 4. エラー処理共通

### 4.1 サーバエラー時の表示と次アクション (spec 7-1)

**暫定確定:**

1. `useApi` の `request` 関数が `{ success: false, error: '...' }` を返す
2. 画面側で `res.success` を確認し、失敗時：
   - `IonToast`（`color="danger"`）でエラーメッセージ表示（3秒）
   - `Haptics.notification(Error)` で長めのエラー振動
   - 業務停止級なら `IonAlert` でブロック
3. ユーザは画面操作で再試行
4. HTTP 401（認証切れ）は自動的にログイン画面へ遷移

参考: [12 §4 エラーハンドリング](12-api-integration.md)

### 4.2 バリデーションエラー表示位置 (spec 7-2)

(本セクションは「2.7 エラー表示の位置」を参照)

### 4.3 二重押下対策 (spec 7-3)

**暫定確定:**

- 送信処理を起動した瞬間に `useApi` の `loading` が `true` になる
- ボタンは `:disabled="loading"` で無効化
- 全画面ブロック型なら `LoadingOverlay`（`IonLoading`）を表示
- 完了後（成功・失敗問わず）自動的に `loading` が `false` に戻る

参考: [12. API 統合](12-api-integration.md)（`useApi` composable 実装）

---

## 5. 運用／権限共通

### 5.1 ロール設計 (spec 8-3)

| ロール | 説明 |
|---|---|
| (例) 一般作業者 | (未決) |
| (例) リーダ | (未決) |
| (例) 管理者 | (未決) |
| (例) 監査者 | (未決) |

> 検討候補: 権限を「画面アクセス」「アクション（確定/取消/事後入力/上書き）」の2軸で設計する。

### 5.2 端末ログイン方式 (spec 8-4)

(未決 — 以下から選択)

| 候補 | 説明 | 実装 |
|---|---|---|
| ユーザーID/PW（トークン認証） | 一般的な Web 認証と同じ | [12 §3 認証の追加](12-api-integration.md) |
| 端末認証（デバイスIDベース） | Xnavis 端末のみ許可、私物ブロック | `@capacitor/device` + サーバ照合（[12 §3](12-api-integration.md) / [14 §7-3](14-android-capability-checklist.md)） |
| 生体認証（指紋/顔） | 簡易ログイン、重要操作の本人確認 | `capacitor-native-biometric`（[14 §7-2](14-android-capability-checklist.md)） |
| NFC社員証 | カードタッチでログイン | `capacitor-nfc`（[14 §1-4](14-android-capability-checklist.md)） |

### 5.3 端末の割当管理 (spec 8-6)

**暫定方針:** `@capacitor/device` の `getId()` で取得した端末識別子をサーバに登録し、ログイン時に照合する。

> 詳細実装: [12 §3 端末認証（デバイスIDベース）の場合](12-api-integration.md)
>
> 配車システム連携・棚卸班との紐付けは (未決)
>
> 参考: [14. Android 機能適合チェックリスト 7-3](14-android-capability-checklist.md)

### 5.4 ログアウトタイミング (spec 8-7)

(未決)

> 検討候補:
> - 自動: 一定時間（例: 15分）操作なしで自動ログアウト（`setTimeout` + 操作イベント監視）
> - 明示: ユーザがログアウトボタンを押す
> - 業務完了時: 伝票確定後にメニュー戻り＋ログアウト
>
> 参考: [14. Android 機能適合チェックリスト 7-4](14-android-capability-checklist.md)

### 5.5 操作ログの内容 (spec 8-8)

| 項目 | 記録するか |
|---|---|
| 作業者ID | (未決) — 推奨: 必須 |
| タイムスタンプ | (未決) — 推奨: 必須（クライアント時刻 + サーバ受信時刻の両方） |
| 端末ID | (未決) — 推奨: 必須（`@capacitor/device`） |
| 画面名 | (未決) — 推奨: 必須 |
| 操作種別 | (未決) — 推奨: 必須（確定/取消/事後入力/上書き等） |
| 成功/失敗 | (未決) — 推奨: 必須 |
| 入力値 | (未決) — 個人情報・在庫値の取扱方針に依存 |

> 実装手段: API 通信時にログ送信、またはローカルにログファイル保存（後でバッチ送信）。
>
> 参考: [14. Android 機能適合チェックリスト 7-11](14-android-capability-checklist.md)

### 5.6 ログの保持期間・転送先 (spec 8-9)

(未決)

> 監査要件・コンプライアンス要件に依存。サーバ側保管 or 監査ツール（Sentry / Firebase Analytics / 自作）連携を要検討。

### 5.7 多言語対応 (spec 8-13)

(未決)

> 実装手段: `vue-i18n` で多言語化。Ionic コンポーネントのラベルも差し替え可能。
> 外国人作業員（英語・ベトナム語等）の比率次第で要否を判断。
>
> 参考: [14. Android 機能適合チェックリスト 12-5](14-android-capability-checklist.md)

### 5.8 端末紛失・盗難対応 (spec 8-14)

(未決)

> 制約: アプリ単独では実装困難。MDM（CLOMO / Intune / Jamf 等）の機能に依存。
>
> 推奨対応:
> - 認証トークンを `capacitor-secure-storage-plugin`（Android Keystore）で暗号化保存
> - サーバ側でトークン無効化機能を持つ
> - MDM 連携でリモートワイプ可能にする
>
> 参考: [14. Android 機能適合チェックリスト 7-6 / 7-10](14-android-capability-checklist.md)

### 5.9 保守・更新運用 (spec 8-15)

(未決 — 以下から選択)

| 配布方式 | 特徴 |
|---|---|
| MDM 配布 | 一括配布・管理が容易。CLOMO/Intune/Jamf 等が必要 |
| 手動 `adb install` | 開発・小規模運用向け |
| 社内配布サイト | 中規模向け、APK ダウンロード方式 |
| Google Play 限定公開 | Play Store の機能を活用、配布対象を絞る |

更新検知: `@capawesome/capacitor-app-update` で強制アップデート/更新通知が可能。
バージョン取得: `@capacitor/app` の `getInfo()`。

> 参考: [10b. ビルド (CLI Only)](10b-build-cli-only.md) / [14. Android 機能適合チェックリスト 12-1 / 12-2 / 9-4](14-android-capability-checklist.md)

---

## 関連ドキュメント

- [Web→HT画面検討チェックリスト設計書](../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md)
- [画面設計シート テンプレート](19-ht-screen-design-sheet-template.md)
- [画面設計シート 保存ディレクトリ](ht-screen-design-sheets/README.md)
- [11. SP2 AAR 統合](11-sp2-aar-integration.md)
- [06. Android スキャンフィードバック](06-android-scan-feedback.md)
- [14. Android 機能適合チェックリスト](14-android-capability-checklist.md)
- [12. API 統合](12-api-integration.md)
