# HT 画面設計シート 拡張 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** [HT 画面設計シート 拡張 設計書](../specs/2026-04-08-screen-design-sheet-enrichment-design.md) に基づき、`docs/guides/20-ht-screen-decomposition-sheet-template.md` を新規作成し、`docs/guides/19-ht-screen-design-sheet-template.md` の4箇所を拡張する。

**Architecture:** ドキュメントのみ（コード変更・テストは無し）。新規 1 ファイル + 既存 1 ファイルの 4 セクション拡張 + 関連 2 ファイルの参照リンク追加で合計 6 タスク。各タスクは 1 ファイル 1 セクション粒度で独立してコミット可能。

**Tech Stack:** Markdown only.

---

## File Structure

| パス | 変更種別 | 役割 |
|---|---|---|
| `docs/guides/20-ht-screen-decomposition-sheet-template.md` | 新規作成 | 親 Web 画面ごとに 1 枚作る分解シートテンプレ |
| `docs/guides/19-ht-screen-design-sheet-template.md` | 拡張 (4 セクション) | 起点情報 / 概念データマッピング / マッピング表拡張 / 使い方書き換え |
| `docs/guides/18-ht-common-design-guideline.md` | 関連リンク追加 | 「関連ドキュメント」に 20 へのリンク追加 |
| `docs/guides/ht-screen-design-sheets/README.md` | 関連リンク追加 | 「関連ドキュメント」に 20 へのリンク追加 |

**設計判断メモ**:
- 19 の 4 拡張箇所はそれぞれ独立したタスクに分割し、レビューと再現性を高める
- 1 タスク = 1 ファイルの 1 セクション編集 = 1 コミット
- 18 と sheets/README の関連リンク追加は最後にまとめて 1 タスク
- ドキュメント作業のため TDD 不要、各タスクは「Edit/Write → 目視確認 → コミット」の3ステップ

---

## Task 1: 新規ファイル `20-ht-screen-decomposition-sheet-template.md` を作成

**Files:**
- Create: `/home/miyaw/dev/learning/ionic-sample/docs/guides/20-ht-screen-decomposition-sheet-template.md`

設計書 §5.2 に記載の構成をそのまま書き出す。

- [ ] **Step 1: Write tool でファイル作成**

Write tool で以下の内容を `/home/miyaw/dev/learning/ionic-sample/docs/guides/20-ht-screen-decomposition-sheet-template.md` に書き出す。改変しないこと。

````markdown
# 20. HT 画面分解シート テンプレート

[Web→HT画面検討チェックリスト設計書](../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md) における Layer 2.5（分解レベル）に相当するシート。
**親 Web 画面ごとに 1 枚** 作成し、その Web 画面を何枚の HT 画面に分解するかを決める。

## 使い方

1. 本ファイルを `ht-screen-design-sheets/decomposition/<親Web画面名>.md` にコピー
2. 親 Web 画面の概要設計（画面遷移・業務フロー）を読み、本シートを埋める
3. 「HT 画面への分解」表で N 枚の個別 HT シートに分けることを決める
4. その N 枚分の個別シート (テンプレ 19) をコピーして作業を続ける

---

## 親 Web 画面 (転記元)

| 項目 | 値 |
|---|---|
| Web 画面名 |  |
| Web ルート / ID |  |
| 概要設計ドキュメント参照 | (URL or 章番号) |
| 業務上の役割 | (1-2行) |
| 関連ドメインエンティティ | (主要なものをリスト) |

## STEP 0 判定

Web→HT画面検討チェックリスト設計書 §5.2 の判定区分。

| 区分 | 値 |
|---|---|
| HT化区分 | A / B / C / D |
| 判定根拠 |  |

> D（HT化しない）と判定したらここで作業終了。シートは保存して記録に残す。

## 業務フロー（Web画面内の操作シーケンス）

Web 画面内でユーザが行う操作を順序付きで洗い出す。

1.
2.
3.

## HT 画面への分解

上記フローを HT 画面に分解する。1 行 = 1 HT 画面。

| # | HT 画面ファイル名 | 役割 | 主たる入力 | 確定操作 |
|---|---|---|---|---|
| 1 |  |  |  |  |
| 2 |  |  |  |  |
| 3 |  |  |  |  |

## HT 画面間の遷移

(矢印付きの簡易フロー or 文章。ASCII 図でも可)

```
[HT画面1] → [HT画面2] → [HT画面3] → 完了
              ↑         ↓
              └── エラー戻り
```

## 個別シートへのリンク

(分解後、テンプレ 19 をコピーして作成する個別シートへのリンクを置く)

- [shipping-pick-instruction.md](../shipping-pick-instruction.md)
- [shipping-pick-scan.md](../shipping-pick-scan.md)
- [shipping-pick-confirm.md](../shipping-pick-confirm.md)

---

## 関連ドキュメント

- [Web→HT画面検討チェックリスト設計書](../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md)
- [HT共通設計ガイドライン](18-ht-common-design-guideline.md)
- [画面設計シート テンプレート](19-ht-screen-design-sheet-template.md)
- [画面設計シート 保存ディレクトリ](ht-screen-design-sheets/README.md)
````

- [ ] **Step 2: 内容を目視確認**

Read tool で書き出したファイルを開き、以下を確認：
- 見出し階層 `# 20.` → `## 使い方` / `## 親 Web 画面` / `## STEP 0 判定` / `## 業務フロー` / `## HT 画面への分解` / `## HT 画面間の遷移` / `## 個別シートへのリンク` / `## 関連ドキュメント` の8セクションが揃っている
- 相対パス `../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md` が正しい
- 相対パス `18-ht-common-design-guideline.md`, `19-ht-screen-design-sheet-template.md`, `ht-screen-design-sheets/README.md` が正しい

- [ ] **Step 3: コミット**

```bash
cd /home/miyaw/dev/learning/ionic-sample
git add docs/guides/20-ht-screen-decomposition-sheet-template.md
git commit -m "$(cat <<'EOF'
docs: HT画面分解シートテンプレ (20) を新規作成

1 Web画面 → N HT画面の1:N対応関係を表現する分解
シートのテンプレ。親Web画面ごとに1枚作成し、
STEP 0判定 + 業務フロー + HT画面分解 + 遷移 +
個別シートリンクをまとめる構造。

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: 19 の「メタ情報」セクションを「起点情報」に置き換え

**Files:**
- Modify: `/home/miyaw/dev/learning/ionic-sample/docs/guides/19-ht-screen-design-sheet-template.md`

現状の `### メタ情報` セクション（7項目）を、親分解シートへのリンクを含む `### 起点情報` セクション（9項目）に置き換える。

- [ ] **Step 1: Read で現在の状態を確認**

Read tool で `/home/miyaw/dev/learning/ionic-sample/docs/guides/19-ht-screen-design-sheet-template.md` の `### メタ情報` ブロック（現在は L23-L31 周辺）を確認する。

- [ ] **Step 2: Edit で置換**

Edit tool で以下の old_string を new_string に置換する：

old_string:
```
### メタ情報

| 項目 | 値 |
|---|---|
| 画面名 |  |
| HT化区分 | A / B / C |
| 対応Web画面 |  |
| 担当 |  |
| 最終更新日 |  |
```

new_string:
```
### 起点情報

| 項目 | 値 |
|---|---|
| HT 画面名 |  |
| HT 画面ファイル名 | (例: shipping-pick-scan.md) |
| HT化区分 | A / B / C |
| 親分解シート | [(親Web画面名)](decomposition/(親Web画面名).md) |
| 親 Web 画面 |  |
| 親フロー内の位置 | (例: 3 ステップ中の 2 番目) |
| 兄弟 HT 画面 | (同じ親から派生する他のHTシートをリスト) |
| 担当 |  |
| 最終更新日 |  |
```

- [ ] **Step 3: 内容を目視確認**

Read tool で更新後のセクションを確認：
- 見出しが `### 起点情報` になっている
- 9 行（HT 画面名 / HT 画面ファイル名 / HT化区分 / 親分解シート / 親 Web 画面 / 親フロー内の位置 / 兄弟 HT 画面 / 担当 / 最終更新日）が揃っている
- 「親分解シート」のリンクパスは `decomposition/(親Web画面名).md`（実際の運用時にユーザが置き換える）

- [ ] **Step 4: コミット**

```bash
cd /home/miyaw/dev/learning/ionic-sample
git add docs/guides/19-ht-screen-design-sheet-template.md
git commit -m "$(cat <<'EOF'
docs: 19の「メタ情報」を「起点情報」に拡張

親分解シート(20) + 兄弟HTシート + 親Web画面内の
位置情報を含む9項目に置き換え、シートを開いた瞬間に
分解レベルへ戻れるようにする。

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: 19 に「◆ 概念データマッピング」セクションを新規追加

**Files:**
- Modify: `/home/miyaw/dev/learning/ionic-sample/docs/guides/19-ht-screen-design-sheet-template.md`

`### ◆ データ` セクションの **直前** に `### ◆ 概念データマッピング` を新設する。

- [ ] **Step 1: Read で挿入位置を確認**

Read tool で `/home/miyaw/dev/learning/ionic-sample/docs/guides/19-ht-screen-design-sheet-template.md` の `### ◆ データ` セクションの開始位置を確認する（Task 2 適用後の状態）。

- [ ] **Step 2: Edit で挿入**

Edit tool で以下の old_string を new_string に置換する：

old_string:
```
### ◆ データ

| 項目 | 値 |
|---|---|
| 主エンティティ |  |
```

new_string:
```
### ◆ 概念データマッピング

Web の概要設計（ER図 / エンティティ定義書）から、この画面が扱うエンティティを抽出して整理する。

| エンティティ | Web側の役割 | HT側の扱い | 取得タイミング | 識別子 |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

**列の意味:**

- **エンティティ** — ドメインモデル上の名前（伝票・商品・ロケ・コンテナ・作業者 等）
- **Web側の役割** — 業務ルート（画面の主たる対象）／マスタ／コンテキスト／業務オブジェクト 等
- **HT側の扱い** — 主軸／照合対象／補助情報／表示のみ／自動付与／省略
- **取得タイミング** — 起動時／スキャン都度／確定時／オフラインキャッシュ
- **識別子** — このエンティティを HT で識別する手段（バーコード／QR／RFID／コード値 等）

### ◆ データ

| 項目 | 値 |
|---|---|
| 主エンティティ |  |
```

- [ ] **Step 3: 内容を目視確認**

Read tool で更新後のセクションを確認：
- `### ◆ 概念データマッピング` が `### ◆ データ` の直前に挿入されている
- 5 列の表（エンティティ / Web側の役割 / HT側の扱い / 取得タイミング / 識別子）がある
- 列の意味の凡例（5 行）がある
- `### ◆ データ` セクションがそのまま下に残っている

- [ ] **Step 4: コミット**

```bash
cd /home/miyaw/dev/learning/ionic-sample
git add docs/guides/19-ht-screen-design-sheet-template.md
git commit -m "$(cat <<'EOF'
docs: 19に「◆ 概念データマッピング」セクションを新設

Web側のER図/エンティティ定義書から、画面が扱う
ドメインエンティティを5列(エンティティ/Web側役割/
HT側扱い/取得タイミング/識別子)で整理する場所を
追加。画面項目マッピングの前に概念整理を強制する。

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: 19 の「画面項目マッピング表」を 6 列 → 8 列に拡張し「HT 利用種別」凡例を追加

**Files:**
- Modify: `/home/miyaw/dev/learning/ionic-sample/docs/guides/19-ht-screen-design-sheet-template.md`

現状の 6 列マッピング表を 8 列に拡張し、「HT 利用種別」の凡例を新たに追加する。既存の「入力方式」語彙はそのまま残す。

- [ ] **Step 1: Read で現在の状態を確認**

Read tool で `/home/miyaw/dev/learning/ionic-sample/docs/guides/19-ht-screen-design-sheet-template.md` の `## 画面項目マッピング表` セクションを確認する。

- [ ] **Step 2: Edit で置換**

Edit tool で以下の old_string を new_string に置換する：

old_string:
```
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
```

new_string:
```
## 画面項目マッピング表

Web の画面項目定義書を1行ずつ取り出して埋める。**この表は必須成果物**。

| Web項目名 | 出所エンティティ | 型/桁 | HT 利用種別 | HT 入力方式 | 必須/任意 | デフォルト | 備考 |
|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |

### 列の意味

| 列 | 説明 |
|---|---|
| Web項目名 | Web の画面項目定義書 から転記 |
| 出所エンティティ | この項目がどのエンティティ由来か（◆ 概念データマッピングと紐づく） |
| 型/桁 | データ型と桁数（Web の項目定義書から転記） |
| HT 利用種別 | この項目の役割（下記凡例から1つ選ぶ） |
| HT 入力方式 | `利用種別=入力` の場合のみ埋める（既存語彙） |
| 必須/任意 | HT 版での必須性（Web と異なってよい） |
| デフォルト | 初期値・自動付与値（自動/計算 の場合は必須） |
| 備考 | 補足事項 |

### 例示行

| Web項目名 | 出所エンティティ | 型/桁 | HT 利用種別 | HT 入力方式 | 必須/任意 | デフォルト | 備考 |
|---|---|---|---|---|---|---|---|
| 出荷指示番号 | 出荷指示 | string/12 | 入力 | スキャン(バーコード) | 必須 | - | 手入力フォールバック有 |
| 商品コード | 商品 | string/13 | 入力 | スキャン(バーコード) | 必須 | - | JAN対応 |
| 商品名 | 商品 | string/40 | 参照 | - | - | - | スキャン後にマスタから取得して表示 |
| ロケーション | ロケーション | string/8 | 入力 | スキャン(QR) | 必須 | - |  |
| 数量 | - | number/4 | 入力 | テンキー | 必須 | 1 | 0/負数不可 |
| 単価 | 商品 | number/8 | 隠し | - | - | - | API 送信のみ、画面非表示 |
| 検品時刻 | - | datetime | 自動 | - | 必須 | now() | 確定押下時に自動付与 |
| 作業者ID | 作業者 | string/8 | 自動 | - | 必須 | login.userId | ログイン情報から |
| 担当者氏名 | 作業者 | string/40 | 表示 | - | - | - | 自動と紐づき表示 |
| 備考 | - | string/200 | 入力 | ソフトキー(長文) | 任意 | - | 全角制限解除 |
| 添付ファイル | - | binary | 省略 | - | - | - | Web のみ |

### HT 利用種別の語彙

- `入力` — ユーザーが手で入力する。HT 入力方式列も埋める
- `参照` — マスタ等から取得して画面に表示する（読み取り専用）
- `表示` — 別項目に紐づいて表示する（参照との区別: 出所が明示的でない／別経路で来る）
- `自動` — ログイン情報・現在時刻・端末ID・GPS・前画面の値等から自動付与
- `計算` — 他項目から算出（例: 合計 = 数量 × 単価）
- `隠し` — API 送信ペイロードに含むが画面に表示しない
- `省略` — Web には存在するが HT 版では使わない（マッピング表に書くことで「省略を判断した記録」になる）

### HT 入力方式の語彙（既存）

`利用種別=入力` のときに埋める：

- `スキャン(バーコード)` / `スキャン(QR)` / `スキャン(RFID)`
- `テンキー` / `+1ボタン` / `ステッパー`
- `選択リスト` / `セグメント`
- `ソフトキー(短文)` / `ソフトキー(長文)`

`利用種別` が `入力` 以外の場合は `-` を入れる。

### 利用種別 × 入力方式 の関係

| 利用種別 | 入力方式列 |
|---|---|
| 入力 | 必ず埋める（スキャン/テンキー/選択 等） |
| 参照 / 表示 / 自動 / 計算 / 隠し / 省略 | `-` を入れる |
```

- [ ] **Step 3: 内容を目視確認**

Read tool で更新後のセクションを確認：
- 表のヘッダが 8 列（Web項目名 / 出所エンティティ / 型/桁 / HT 利用種別 / HT 入力方式 / 必須/任意 / デフォルト / 備考）になっている
- 「列の意味」「例示行」「HT 利用種別の語彙」「HT 入力方式の語彙（既存）」「利用種別 × 入力方式 の関係」の 5 サブセクションが揃っている
- 例示行 11 件が含まれている

- [ ] **Step 4: コミット**

```bash
cd /home/miyaw/dev/learning/ionic-sample
git add docs/guides/19-ht-screen-design-sheet-template.md
git commit -m "$(cat <<'EOF'
docs: 19の画面項目マッピング表を6列→8列に拡張

出所エンティティ・型/桁・デフォルトの3列を追加し、
「HT利用種別」を新規ボキャブラリとして導入(入力/
参照/表示/自動/計算/隠し/省略)。既存の入力方式列は
「利用種別=入力」のときに埋める方針に変更。例示行
11件と利用種別×入力方式の関係表も追加。

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: 19 の「使い方」セクションをワークフロー型に書き換え

**Files:**
- Modify: `/home/miyaw/dev/learning/ionic-sample/docs/guides/19-ht-screen-design-sheet-template.md`

現状の 4 ステップ抽象的な「使い方」を、起点・順序・取込対応表を含むワークフロー型に書き換える。

- [ ] **Step 1: Read で現在の使い方を確認**

Read tool で `/home/miyaw/dev/learning/ionic-sample/docs/guides/19-ht-screen-design-sheet-template.md` の `## 使い方` 〜 `## ファイル命名規則` セクションを確認する。

- [ ] **Step 2: Edit で置換**

Edit tool で以下の old_string を new_string に置換する：

old_string:
```
## 使い方

1. 本ファイルを `ht-screen-design-sheets/<画面名>.md` にコピー
2. STEP 0 判定（A/B/C）をまず決める。判定が D（HT化しない）ならシート不要
3. 各セクションを埋める。**[HT共通設計ガイドライン](18-ht-common-design-guideline.md) と差分が無い項目は「ガイド準拠」と書けばよい**
4. 「画面項目マッピング表」（別表）は必須。Web版の項目を1つずつ取り出して埋める

## ファイル命名規則

- `ht-screen-design-sheets/receiving-inspection.md`
- `ht-screen-design-sheets/shipping-pick.md`
- など、画面のWebルートに合わせた kebab-case を推奨
```

new_string:
```
## 使い方

### 全体の流れ

```
Web 概要設計 → 分解シート (20) → 個別 HT シート (19) → 実装
```

### 起点: ここから始める

1. **親 Web 画面の [分解シート (20)](20-ht-screen-decomposition-sheet-template.md) を先に作る**
   - 1 Web 画面 → 何枚の HT シートに分けるかを最初に決める
   - 分解シートが無いまま個別シートを書き始めない
2. 分解シートで「N 枚作る」と決まったら、その N 枚分だけ本ファイル (19) をコピー
3. コピー先: `ht-screen-design-sheets/<画面名>.md`
4. 下記「埋める順序」に従って書く

### 埋める順序（推奨）

| # | セクション | 何をするか |
|---|---|---|
| 1 | 起点情報 | 親分解シートへのリンク・兄弟シート・HT化区分（A/B/C）を記入 |
| 2 | ◆ 概念データマッピング | Web の ER 図 / エンティティ定義書 から、この画面が扱うエンティティを5列の表に転記 |
| 3 | 画面項目マッピング表 | Web の画面項目定義書 を1行ずつ取り出して8列の表に転記。**この時点で「利用種別」を決め切る** |
| 4 | ◆ 業務フロー | 親分解シートのフロー欄から、この HT 画面の担当部分だけを切り出す |
| 5 | ◆ データ | ◆ 概念データマッピングの結果を要約 |
| 6 | ◆ 入力 | マッピング表の `利用種別=入力` の項目を集約 |
| 7 | ◆ UI | Web のワイヤーフレーム を見て HT 用に調整 |
| 8 | ◆ 通信 / オフライン, ◆ ハード連携, ◆ エラー / 事後入力, ◆ 権限 | 上記をもとに具体化（[HT共通設計ガイドライン](18-ht-common-design-guideline.md) と同じならスキップ可） |
| 9 | ◆ HT共通ガイドからの差分 | 共通ガイドと違う決定があれば書く。なければ「なし」 |

### Web 概要設計 → 19 セクションの取込対応表

| Web 概要設計の資料 | 主に取り込まれる 19 のセクション |
|---|---|
| 画面項目定義書 | 画面項目マッピング表（必須） |
| ER図 / エンティティ定義書 | ◆ 概念データマッピング |
| 画面遷移図 / 業務フロー | ◆ 業務フロー（分解シート 20 経由） |
| 画面レイアウト / ワイヤーフレーム | ◆ UI |

### 「ガイド準拠」の書き方

[HT共通設計ガイドライン](18-ht-common-design-guideline.md) と同じ決定の項目は値を書かず **「ガイド準拠」** と書く。違いがあれば「◆ HT共通ガイドからの差分」セクションに記載する。

## ファイル命名規則

- `ht-screen-design-sheets/<画面名>.md`
- 親 Web 画面の名前 + サブ画面名を `kebab-case` で
- 例:
  - `shipping-pick-instruction.md`
  - `shipping-pick-scan.md`
  - `shipping-pick-confirm.md`
```

- [ ] **Step 3: 内容を目視確認**

Read tool で更新後のセクションを確認：
- `## 使い方` の下に「全体の流れ」「起点: ここから始める」「埋める順序（推奨）」「Web 概要設計 → 19 セクションの取込対応表」「『ガイド準拠』の書き方」の 5 サブセクションが揃っている
- 「埋める順序（推奨）」の表が 9 行ある
- `## ファイル命名規則` セクションがその下に残っている
- ファイル命名規則の例が `shipping-pick-instruction.md` などサブ画面名込みになっている

- [ ] **Step 4: コミット**

```bash
cd /home/miyaw/dev/learning/ionic-sample
git add docs/guides/19-ht-screen-design-sheet-template.md
git commit -m "$(cat <<'EOF'
docs: 19の「使い方」をワークフロー型に書き換え

抽象的な4ステップを、起点(分解シート20先行) +
埋める順序9ステップ + Web概要設計→19セクション
取込対応表 + 「ガイド準拠」運用ルールを含む構造に
変更。Web概要設計から始める作業者が「最初の一手」
を即座に取れるようにする。

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: 18 と sheets/README に 20 へのリンクを追加

**Files:**
- Modify: `/home/miyaw/dev/learning/ionic-sample/docs/guides/18-ht-common-design-guideline.md`
- Modify: `/home/miyaw/dev/learning/ionic-sample/docs/guides/ht-screen-design-sheets/README.md`

新規追加した 20 番ファイルへのリンクを、関連する 2 ファイルの「関連ドキュメント」セクションに追加する。

- [ ] **Step 1: 18 の関連ドキュメントを確認**

Read tool で `/home/miyaw/dev/learning/ionic-sample/docs/guides/18-ht-common-design-guideline.md` の末尾「## 関連ドキュメント」セクションを確認する。

- [ ] **Step 2: 18 を Edit で更新**

Edit tool で以下の old_string を new_string に置換する：

old_string:
```
- [Web→HT画面検討チェックリスト設計書](../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md)
- [画面設計シート テンプレート](19-ht-screen-design-sheet-template.md)
- [画面設計シート 保存ディレクトリ](ht-screen-design-sheets/README.md)
- [11. SP2 AAR 統合](11-sp2-aar-integration.md)
```

new_string:
```
- [Web→HT画面検討チェックリスト設計書](../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md)
- [画面設計シート テンプレート](19-ht-screen-design-sheet-template.md)
- [画面分解シート テンプレート](20-ht-screen-decomposition-sheet-template.md)
- [画面設計シート 保存ディレクトリ](ht-screen-design-sheets/README.md)
- [11. SP2 AAR 統合](11-sp2-aar-integration.md)
```

- [ ] **Step 3: sheets/README の関連ドキュメントを確認**

Read tool で `/home/miyaw/dev/learning/ionic-sample/docs/guides/ht-screen-design-sheets/README.md` の「## 関連ドキュメント」セクションを確認する。

- [ ] **Step 4: sheets/README を Edit で更新**

Edit tool で以下の old_string を new_string に置換する：

old_string:
```
- [Web→HT画面検討チェックリスト設計書](../../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md)
- [HT共通設計ガイドライン](../18-ht-common-design-guideline.md)
- [画面設計シート テンプレート](../19-ht-screen-design-sheet-template.md)
```

new_string:
```
- [Web→HT画面検討チェックリスト設計書](../../superpowers/specs/2026-04-07-web-ht-screen-checklist-design.md)
- [HT共通設計ガイドライン](../18-ht-common-design-guideline.md)
- [画面設計シート テンプレート](../19-ht-screen-design-sheet-template.md)
- [画面分解シート テンプレート](../20-ht-screen-decomposition-sheet-template.md)
```

- [ ] **Step 5: 内容を目視確認**

両ファイルを Read tool で確認：
- 18: 関連ドキュメントに `[画面分解シート テンプレート](20-ht-screen-decomposition-sheet-template.md)` が追加されている（19 と保存ディレクトリの間）
- sheets/README: 関連ドキュメントに `[画面分解シート テンプレート](../20-ht-screen-decomposition-sheet-template.md)` が追加されている（19 の下）
- 相対パスの階層差（18は `20-...`、README は `../20-...`）が正しい

- [ ] **Step 6: コミット**

```bash
cd /home/miyaw/dev/learning/ionic-sample
git add docs/guides/18-ht-common-design-guideline.md docs/guides/ht-screen-design-sheets/README.md
git commit -m "$(cat <<'EOF'
docs: 18とsheets/READMEに分解シート(20)へのリンク追加

新規追加した画面分解シートテンプレート(20)への
参照リンクを、共通ガイド(18)とシート保存ディレクトリ
のREADMEの「関連ドキュメント」セクションに追加。
相対パスの階層差(../を考慮)も正しく設定。

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review

タスクを書き終えた後の確認（実施済み）：

**1. Spec coverage:**

| Spec section | カバーするタスク |
|---|---|
| §5 新規ファイル `20-...` | Task 1 |
| §6.2 起点情報セクション | Task 2 |
| §6.3 ◆ 概念データマッピング | Task 3 |
| §6.4 画面項目マッピング表拡張 + 利用種別凡例 | Task 4 |
| §6.5 使い方の書き換え | Task 5 |
| §7.2 リンクの追加（18, sheets/README） | Task 6 |
| §7.3 変更しないファイル（18 共通ガイドライン本体, 18 spec, 06/11/12/14 ガイド） | Task 6 は 18 の関連リンクのみ追加で本体は触らない ✓ |

**2. Placeholder scan:**
- "TBD/TODO/implement later" 等 → 無し
- 各 Step に具体的な old_string / new_string と確認手順あり ✓

**3. Type/path consistency:**
- ファイルパスが各 Task 内で一貫している
- Task 6 の相対パス階層差（18は `20-...`、README は `../20-...`）が正しい
- Task 1 → Task 5 で 20 のファイル名 `20-ht-screen-decomposition-sheet-template.md` を一貫して使用

**4. 注意点:**
- 本計画はドキュメントのみで、コード変更・テストは無い。よって TDD ステップは含めない
- Task 2〜5 は同じファイル `19-ht-screen-design-sheet-template.md` を変更する。順序: Task 2 (起点情報) → Task 3 (概念データマッピング) → Task 4 (マッピング表) → Task 5 (使い方)
- ただし各タスクは独立した別セクションを編集するため、順序入れ替えは技術的に可能（推奨は上記順序）
- Task 1 は他から独立、Task 6 は Task 1 完了後（20 ファイル存在前提）

---

## 次のステップ（本計画のスコープ外）

本計画の完了後、以下が実行可能になる（別計画とすべき）：

1. **既存5画面（HomePage 除く）の Web 概要設計から分解シート (20) を作成**: ReceivingPage / ShippingPage / StocktakingPage / InventoryPage / RelocationPage の各親 Web 画面ごとに分解シートを作る
2. **分解結果に従って個別 HT シート (19) を作成**: 1:N で派生する各 HT 画面ごとにシートを埋める
