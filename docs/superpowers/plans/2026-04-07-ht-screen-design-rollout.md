# HT画面検討フレーム ロールアウト Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `docs/superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md` で定義した3層モデル（HT共通設計ガイドライン / STEP 0 判定 / 画面設計シート）を実運用可能にするため、Layer 1 と Layer 3 のテンプレートファイルをプロジェクト内に整備する。

**Architecture:** ドキュメントのみ。新規Markdownを2本（共通ガイド skeleton + シートテンプレ単独ファイル）と画面設計シート保存ディレクトリの足場を作る。既存の `docs/guides/` 採番規則（00-17）に従い 18, 19 を割り当てる。

**Tech Stack:** Markdown only. Vue/Capacitor/Java側のコード変更は無し。

---

## File Structure

新規作成するファイル：

| パス | 役割 |
|---|---|
| `docs/guides/18-ht-common-design-guideline.md` | Layer 1: 画面横断の共通決定事項を集約する skeleton。★共通マーク付き項目から逆算したセクションを持ち、未決事項は `(未決)` プレースホルダで残す |
| `docs/guides/19-ht-screen-design-sheet-template.md` | Layer 3: 画面1枚あたりのシートテンプレ単独ファイル。spec の section 9 から抽出して、コピペ起点として使えるようにする |
| `docs/guides/ht-screen-design-sheets/README.md` | Layer 3 シートの保存場所（空ディレクトリの代替）。命名規則と運用ルールを書く |

**注意:** spec 本体（`docs/superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md`）は変更しない。本計画はあくまでテンプレ整備のみ。

---

## 設計判断メモ

- **なぜ共通ガイドは "skeleton" か:** 共通決定事項のうち実プロジェクトで未決のものは多い。完成版を一気に書くと根拠薄弱な決定値が混入するため、構造のみ用意して `(未決)` を残す。決定の都度埋める運用とする。
- **なぜシートテンプレは別ファイルか:** spec section 9 にもテンプレはあるが、spec は方法論文書であり画面ごとのコピペ起点としては重い。単独ファイルが必要。
- **なぜ既存guidesディレクトリに置くか:** 採番ルール（00-17）が確立しており、`docs/superpowers/specs/` は方法論専用のため。Layer 1/3 は実運用ドキュメントなので `docs/guides/` の続き番号が自然。

---

## Task 1: Layer 1 共通設計ガイドライン skeleton を作成

**Files:**
- Create: `docs/guides/18-ht-common-design-guideline.md`

このタスクは spec の各STEPで `★共通` マークが付いた項目を逆引きし、それらを集約するセクション構成にする。値は埋めず `(未決)` で残し、決定済みなら既存ガイド（11-sp2-aar-integration.md, 06-android-scan-feedback.md, 14-android-capability-checklist.md 等）への参照リンクで代替してよい。

- [ ] **Step 1: spec から ★共通 マーク付き項目を全件抽出**

参照: `docs/superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md`

★共通付きの項目は以下（spec から手動抽出済み）：

| STEP | 項番 | 項目 |
|---|---|---|
| 3 | 3-8 | 物理ボタンの割当 |
| 4 | 4-3 | フォントサイズの最低基準 |
| 4 | 4-4 | タップターゲットの最低サイズ |
| 4 | 4-5 | 色覚対応・コントラスト |
| 4 | 4-6 | 画面の向き |
| 4 | 4-7 | 即時フィードバック（音/振動/LED） |
| 4 | 4-10 | ローディング状態 |
| 4 | 4-11 | エラー表示の位置 |
| 4 | 4-13 | 片手操作 |
| 5 | 5-3 | タイムアウト値 |
| 5 | 5-4 | 弱電波時のユーザ通知 |
| 5 | 5-6 | 再送ポリシー |
| 6 | 6-2 | リーダSDKの起動／停止タイミング |
| 6 | 6-3 | リーダのclose漏れ防止 |
| 6 | 6-10 | 音／振動／LED の割当 |
| 6 | 6-11 | 物理ボタンの割当（重複） |
| 6 | 6-12 | スリープ・画面ロック |
| 6 | 6-14 | OSバージョン依存・端末固有制約 |
| 6 | 6-15 | ハード機能ごとの権限要求 |
| 7 | 7-1 | サーバエラー時の表示と次アクション |
| 7 | 7-2 | バリデーションエラー表示位置 |
| 7 | 7-3 | 二重押下対策 |
| 8 | 8-3 | ロール設計との整合 |
| 8 | 8-4 | 端末ログイン方式 |
| 8 | 8-6 | 端末の割当管理 |
| 8 | 8-7 | ログアウトタイミング |
| 8 | 8-8 | 操作ログの内容 |
| 8 | 8-9 | ログの保持期間 |
| 8 | 8-13 | 多言語対応 |
| 8 | 8-14 | 端末紛失・盗難対応 |
| 8 | 8-15 | 保守・更新運用 |

これをカテゴリにグルーピング：

- ハード連携共通（3-8, 6-2, 6-3, 6-10, 6-11, 6-12, 6-14, 6-15）
- UI共通（4-3, 4-4, 4-5, 4-6, 4-7, 4-10, 4-11, 4-13）
- 通信共通（5-3, 5-4, 5-6）
- エラー処理共通（7-1, 7-2, 7-3）
- 運用／権限共通（8-3, 8-4, 8-6, 8-7, 8-8, 8-9, 8-13, 8-14, 8-15）

- [ ] **Step 2: ファイルを作成**

Write tool で以下の内容を `docs/guides/18-ht-common-design-guideline.md` に書き出す：

````markdown
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

---

## 1. ハード連携共通

### 1.1 リーダSDKの起動／停止タイミング (spec 6-2)

(未決)

参考: [11. SP2 AAR 統合](11-sp2-aar-integration.md)

### 1.2 リーダのclose漏れ防止 (spec 6-3)

(未決)

### 1.3 バーコード/QRリーダとRFIDリーダの併用方針 (spec 6-2 補足)

(未決)

### 1.4 物理ボタンの割当 (spec 3-8 / 6-11)

| ボタン | 用途 |
|---|---|
| (例) スキャントリガ | (未決) |
| (例) Enterキー | (未決) |
| (例) 戻るキー | (未決) |
| (例) F1〜F4 | (未決) |

### 1.5 音／振動／LED の割当 (spec 6-10)

| イベント | 音 | 振動 | LED |
|---|---|---|---|
| スキャン成功 | (未決) | (未決) | (未決) |
| スキャン失敗 | (未決) | (未決) | (未決) |
| 確定成功 | (未決) | (未決) | (未決) |
| エラー | (未決) | (未決) | (未決) |

参考: [06. Android スキャンフィードバック](06-android-scan-feedback.md)

### 1.6 スリープ・画面ロックとの相性 (spec 6-12)

(未決)

### 1.7 OSバージョン依存・端末固有制約 (spec 6-14)

対象端末: (未決)
対象OS: (未決)
特記事項: (未決)

参考: [14. Android 機能適合チェックリスト](14-android-capability-checklist.md)

### 1.8 ハード機能ごとの権限要求 (spec 6-15)

| 権限 | 必要性 | 取得タイミング |
|---|---|---|
| カメラ | (未決) | (未決) |
| 位置情報 | (未決) | (未決) |
| ストレージ | (未決) | (未決) |

---

## 2. UI共通

### 2.1 フォントサイズの最低基準 (spec 4-3)

(未決)

### 2.2 タップターゲットの最低サイズ (spec 4-4)

(未決)

### 2.3 色覚対応・コントラスト (spec 4-5)

(未決)

### 2.4 画面の向き (spec 4-6)

(未決)

### 2.5 即時フィードバック（音/振動/LED）の方針 (spec 4-7)

(本セクションは「1.5 音／振動／LED の割当」を参照)

### 2.6 ローディング状態の表示 (spec 4-10)

(未決)

### 2.7 エラー表示の位置 (spec 4-11)

(未決)

### 2.8 片手操作の前提 (spec 4-13)

(未決)

---

## 3. 通信共通

### 3.1 タイムアウト値 (spec 5-3)

(未決)

### 3.2 弱電波時のユーザ通知 (spec 5-4)

(未決)

### 3.3 再送ポリシー (spec 5-6)

| 観点 | 規約 |
|---|---|
| 自動再送回数 | (未決) |
| バックオフ方式 | (未決) |
| 手動再送ボタン | (未決) |

参考: [12. API 統合](12-api-integration.md)

---

## 4. エラー処理共通

### 4.1 サーバエラー時の表示と次アクション (spec 7-1)

(未決)

### 4.2 バリデーションエラー表示位置 (spec 7-2)

(本セクションは「2.7 エラー表示の位置」を参照)

### 4.3 二重押下対策 (spec 7-3)

(未決)

---

## 5. 運用／権限共通

### 5.1 ロール設計 (spec 8-3)

| ロール | 説明 |
|---|---|
| (例) 一般作業者 | (未決) |
| (例) リーダ | (未決) |
| (例) 管理者 | (未決) |
| (例) 監査者 | (未決) |

### 5.2 端末ログイン方式 (spec 8-4)

(未決)

### 5.3 端末の割当管理 (spec 8-6)

(未決)

### 5.4 ログアウトタイミング (spec 8-7)

(未決)

### 5.5 操作ログの内容 (spec 8-8)

| 項目 | 記録するか |
|---|---|
| 作業者ID | (未決) |
| タイムスタンプ | (未決) |
| 端末ID | (未決) |
| 画面名 | (未決) |
| 操作種別 | (未決) |
| 成功/失敗 | (未決) |

### 5.6 ログの保持期間・転送先 (spec 8-9)

(未決)

### 5.7 多言語対応 (spec 8-13)

(未決)

### 5.8 端末紛失・盗難対応 (spec 8-14)

(未決)

### 5.9 保守・更新運用 (spec 8-15)

(未決)

---

## 関連ドキュメント

- [Web→HT画面検討チェックリスト設計書](../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md)
- [画面設計シート テンプレート](19-ht-screen-design-sheet-template.md)
- [11. SP2 AAR 統合](11-sp2-aar-integration.md)
- [06. Android スキャンフィードバック](06-android-scan-feedback.md)
- [14. Android 機能適合チェックリスト](14-android-capability-checklist.md)
- [12. API 統合](12-api-integration.md)
````

- [ ] **Step 3: 内容を目視確認**

ファイルを開いて以下を確認：
- 各セクションが ★共通項目から漏れなく作られているか（5カテゴリ × 全項目）
- 「1.5 音/振動/LED」を「2.5」から、「2.7 エラー位置」を「4.2」から参照する相互リンクがあるか
- 「関連ドキュメント」のリンクパスが正しいか（相対パス: `../superpowers/specs/...`）

- [ ] **Step 4: コミット**

```bash
git add docs/guides/18-ht-common-design-guideline.md
git commit -m "$(cat <<'EOF'
docs: HT共通設計ガイドライン skeleton を追加

Web→HT画面検討チェックリスト設計書のLayer 1
(画面横断の共通決定事項) を集約するファイル。
spec の★共通マーク付き項目を逆引きし、5カテゴリ
(ハード/UI/通信/エラー/運用権限) のセクションを
持つ。値は (未決) で残し、決定の都度更新する運用。

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Layer 3 画面設計シート テンプレートを単独ファイルとして作成

**Files:**
- Create: `docs/guides/19-ht-screen-design-sheet-template.md`

spec の section 9 にあるテンプレを、画面ごとにコピペして使える単独ファイルとして抽出する。コードブロックではなく Markdown 表形式に整形して、そのまま編集可能にする。

- [ ] **Step 1: ファイルを作成**

Write tool で以下の内容を `docs/guides/19-ht-screen-design-sheet-template.md` に書き出す：

````markdown
# 19. HT 画面設計シート テンプレート

[Web→HT画面検討チェックリスト設計書](../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md) の **Layer 3** に相当するシート。
画面ごとに本ファイルをコピーして使う。

## 使い方

1. 本ファイルを `ht-screen-design-sheets/<画面名>.md` にコピー
2. STEP 0 判定（A/B/C）をまず決める。判定が D（HT化しない）ならシート不要
3. 各セクションを埋める。**[HT共通設計ガイドライン](18-ht-common-design-guideline.md) と差分が無い項目は「ガイド準拠」と書けばよい**
4. 「画面項目マッピング表」（別表）は必須。Web版の項目を1つずつ取り出して埋める

## ファイル命名規則

- `ht-screen-design-sheets/receiving-inspection.md`
- `ht-screen-design-sheets/shipping-pick.md`
- など、画面のWebルートに合わせた kebab-case を推奨

---

## 画面設計シート

### メタ情報

| 項目 | 値 |
|---|---|
| 画面名 |  |
| HT化区分 | A / B / C |
| 対応Web画面 |  |
| 担当 |  |
| 最終更新日 |  |

### ◆ 業務フロー

| 項目 | 値 |
|---|---|
| 開始トリガ |  |
| 完了条件 |  |
| 再開境目 |  |
| 1人 / 協調 |  |
| 事後入力モード | あり / なし |

### ◆ データ

| 項目 | 値 |
|---|---|
| 主エンティティ |  |
| 識別方式 | 商品=___ / ロケ=___ / 伝票=___ |
| HT追加項目 |  |
| 省略項目 |  |
| API | 共用 / HT専用 |

> 詳細な項目マッピングは下記「画面項目マッピング表」を参照

### ◆ 入力

| 項目 | 値 |
|---|---|
| スキャン項目 |  |
| 手入力項目 |  |
| フォールバック |  |
| 不一致時動線 |  |

### ◆ UI

| 項目 | 値 |
|---|---|
| 特記事項 |  |
| 状態バッジ |  |

### ◆ 通信／オフライン

| 項目 | 値 |
|---|---|
| 送信 | 即時 / バッチ |
| オフライン | 不可 / 許容 |
| ローカル保存 |  |
| 競合解決 |  |

### ◆ ハード連携

| 項目 | 値 |
|---|---|
| リーダ | バーコード / QR / RFID / カメラ |
| 特殊機能 |  |

### ◆ エラー／事後入力

| 項目 | 値 |
|---|---|
| 主要エラーパターン |  |
| 事後入力モード | あり / なし |
| 理由コード |  |
| 自由メモ | あり / なし |
| 監査ログ |  |

### ◆ 権限

| 項目 | 値 |
|---|---|
| 閲覧 |  |
| 編集 |  |
| 事後入力 |  |
| 承認フロー |  |

### ◆ HT共通ガイドからの差分

(差分なしなら「なし」と書く)

---

## 画面項目マッピング表

Web側の項目を1つずつ取り出して埋める。**この表は必須成果物**。

| Web項目名 | HTでの扱い | 入力方式 | 必須/任意 | 桁/制限 | 備考 |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

**入力方式の語彙:**

- `スキャン(バーコード)` / `スキャン(QR)` / `スキャン(RFID)`
- `テンキー` / `+1ボタン` / `ステッパー`
- `選択リスト` / `セグメント`
- `ソフトキー(短文)` / `ソフトキー(長文)`
- `表示のみ`
- `省略` (HT版では使わない)
- `自動` (ログイン情報等から自動入力)

---

## 関連ドキュメント

- [Web→HT画面検討チェックリスト設計書](../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md)
- [HT共通設計ガイドライン](18-ht-common-design-guideline.md)
````

- [ ] **Step 2: 内容を目視確認**

ファイルを開いて以下を確認：
- メタ情報・業務フロー・データ・入力・UI・通信・ハード・エラー・権限・差分 の10セクションが揃っている
- 画面項目マッピング表が独立して存在し、入力方式の語彙が網羅されている
- 関連ドキュメントの相対リンクが正しい

- [ ] **Step 3: コミット**

```bash
git add docs/guides/19-ht-screen-design-sheet-template.md
git commit -m "$(cat <<'EOF'
docs: HT画面設計シート テンプレートを追加

Web→HT画面検討チェックリスト設計書のLayer 3
(画面ごと固有決定事項) のテンプレ。spec section 9
の埋込テンプレを単独ファイルに抽出し、画面ごとに
コピペして使える形に整形。画面項目マッピング表と
入力方式の語彙集を含む。

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: 画面設計シート保存先のディレクトリと README を作成

**Files:**
- Create: `docs/guides/ht-screen-design-sheets/README.md`

画面ごとに作成される設計シートの保存場所を作る。空ディレクトリを git で管理するため `.gitkeep` 相当として README.md を置く。

- [ ] **Step 1: ディレクトリを作成**

Write tool でファイル作成すると親ディレクトリも自動作成されるため、Step 2 で同時に実施。

- [ ] **Step 2: README ファイルを作成**

Write tool で以下の内容を `docs/guides/ht-screen-design-sheets/README.md` に書き出す：

````markdown
# HT 画面設計シート 保存ディレクトリ

このディレクトリには、各HT画面について作成した **画面設計シート** を1ファイル1画面で配置する。

## 関連ドキュメント

- [Web→HT画面検討チェックリスト設計書](../../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md)
- [HT共通設計ガイドライン](../18-ht-common-design-guideline.md)
- [画面設計シート テンプレート](../19-ht-screen-design-sheet-template.md)

## 命名規則

`<画面名(kebab-case)>.md`

例:
- `receiving-inspection.md` (入荷検品)
- `shipping-pick.md` (出荷ピッキング)
- `stocktaking.md` (棚卸し)
- `inventory-lookup.md` (在庫照会)
- `relocation.md` (ロケーション移動)

## 新規追加手順

1. [テンプレート](../19-ht-screen-design-sheet-template.md) をコピー
2. 本ディレクトリ配下に上記命名規則で配置
3. STEP 0 判定（A/B/C）を最初に決める
4. 各セクションを埋める。共通ガイドラインと同じ箇所は「ガイド準拠」と書く
5. 画面項目マッピング表（必須）を埋める
6. レビュー → コミット

## 既存シート一覧

(まだ無し。追加されたらここにリストする)
````

- [ ] **Step 3: 内容を目視確認**

リンクパスが正しいことを確認：
- `../../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md` （2階層上）
- `../18-ht-common-design-guideline.md` （1階層上）
- `../19-ht-screen-design-sheet-template.md` （1階層上）

- [ ] **Step 4: コミット**

```bash
git add docs/guides/ht-screen-design-sheets/README.md
git commit -m "$(cat <<'EOF'
docs: HT画面設計シート保存ディレクトリを作成

各HT画面ごとの画面設計シート(Layer 3 成果物) を
配置するディレクトリを作成。命名規則と新規追加
手順をREADMEに記載。

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review

タスクを書き終えたあとに行うチェック（実施済み）：

**1. Spec coverage:**
- 3層モデル（Layer 1 / Layer 2 / Layer 3）→ Task 1（Layer 1）, Task 2 + Task 3（Layer 3）でカバー。Layer 2 は spec 内の STEP 0 そのもので、別ファイルは不要
- ★共通項目 → Task 1 で全件抽出済み
- 画面設計シート（spec section 9）→ Task 2 で抽出
- HT共通設計ガイドライン（spec で言及）→ Task 1 で skeleton 作成

**2. Placeholder scan:**
- "TBD/TODO/implement later" 等 → 無し
- `(未決)` は **意図的なプレースホルダ**（共通ガイド skeleton として運用するため）。エンジニア向けの「やる事漏れ」ではない

**3. Type/path consistency:**
- 番号: 18 → ガイド本体, 19 → シートテンプレ。Task 3 の README は番号無し（ディレクトリREADMEのため）
- ファイル名・相対パスが各 Task 内で一貫している

**4. 注意点:**
- 本計画はドキュメントのみで、コード変更・テストは無い。よって TDD ステップは含めない
- すべてのTaskは独立して完了可能（依存関係なし）。順序入れ替え可
- ただし Task 1, 2 は Task 3 の README から参照されるため、Task 3 を最後にする方が自然

---

## 次のステップ（本計画のスコープ外）

本計画の完了後、以下が実行可能になる（別計画とすべき）：

1. **既存5画面（HomePage 除く）への STEP 0 判定実施**: ReceivingPage / ShippingPage / StocktakingPage / InventoryPage / RelocationPage の各画面で A/B/C 判定し、シートを作成
2. **HT共通設計ガイドラインの (未決) 項目を埋める**: 既存の 11/06/14/12 ガイドから抽出して項目を確定
3. **各画面のシート埋め**: マッピング表まで含めて完成させる
