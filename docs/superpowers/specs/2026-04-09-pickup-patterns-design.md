# ピックアップ部品パターン集 設計仕様書

## 概要

ピックアップ 11 部品それぞれに 30+ パターンの独自ページを作成。
各ページは上部にプロパティ・バリエーション一覧、下部に業務利用パターンを配置。
全パターンに 1-2 行の日本語補足説明を付与。

## 導線

```
ホーム → ピックアップ部品 → [ボタン] → ButtonPatterns.vue
```

PickupPage.vue のカードリンク先を `/samples/pickup/{component}` に変更。

## URL

`/samples/pickup/:component` (例: `/samples/pickup/button`)

## ページ共通構成

```
┌─ Header ──────────────────────────┐
│ ← {部品名} パターン集             │
├───────────────────────────────────┤
│ p: 部品の概要説明                  │
├─ バリエーション一覧 ──────────────┤
│ h2: {プロパティ名}                 │
│ p: 補足説明（なぜ・いつ使うか）    │
│ [実際のコンポーネント表示]         │
│ ...（プロパティごとに繰り返し）     │
├─ 業務利用パターン ────────────────┤
│ h2: {パターン名}                   │
│ p: 補足説明                        │
│ [実際のコンポーネント表示]         │
│ ...                               │
└───────────────────────────────────┘
```

## ファイル構成

```
src/views/samples/pickup/
├── ButtonPatterns.vue
├── InputPatterns.vue
├── SelectPatterns.vue
├── CheckboxPatterns.vue
├── RadioPatterns.vue
├── ListPatterns.vue
├── TabsPatterns.vue
├── IconPatterns.vue
├── LabelPatterns.vue
├── DatetimePatterns.vue
└── ItemPatterns.vue         ← テキストリンク
```

既存の `PickupPage.vue` は `src/views/samples/` から `src/views/samples/pickup/` 配下に移動し `index` として機能させるか、パスはそのままでリンク先だけ変更する。

## 11 部品のパターン詳細

### 1. ボタン (ButtonPatterns.vue)

**バリエーション:**
- Color: primary / secondary / tertiary / success / warning / danger / light / medium / dark
- Size: small / default / large
- Fill: solid / outline / clear
- Fill × Shape マトリクス: solid-round / outline-round / solid-default / outline-default
- Expand: default / block / full
- Icon 配置: icon-only / icon-start / icon-end / icon-both
- Disabled 状態: 通常 vs disabled（各 fill で）

**業務パターン:**
- 確定/キャンセル並び: outline キャンセル + solid 確定
- スキャン起動ボタン: expand=block + アイコン + 大サイズ
- 一括操作バー: 3つ並びの小ボタン（全選択/解除/削除）
- ステータス切替: success 有効 / danger 無効
- フローティング操作: FAB 風の固定ボタン
- ツールバー内ボタン: ion-buttons 内での slot 配置
- ローディング付き: spinner + disabled で処理中表現

### 2. 入力フィールド (InputPatterns.vue)

**バリエーション:**
- Label Placement: fixed / floating / stacked / start / end
- Fill: solid / outline / default
- Type: text / number / email / password / tel / url / search
- Helper & Error: helper-text / error-text / ion-note
- Counter: counter + maxlength
- Clear: clear-input / clearOnEdit
- Start/End Slots: アイコン、ボタン、テキスト
- Disabled / Readonly 状態

**業務パターン:**
- 品番入力: scan アイコン付き + placeholder + helper
- 数量入力: type=number + min/max + 端末キーボード
- 検索フィールド: search type + clear + debounce 風表現
- バリデーション: エラー表示 + 色変化
- パスワード入力: password toggle 付き
- 複合入力行: ラベル + 入力 + 単位テキスト
- フォーカス制御: autofocus / setFocus デモ

### 3. コンボボックス (SelectPatterns.vue)

**バリエーション:**
- Interface: alert / popover / action-sheet / modal
- Multiple selection: 単一 vs 複数
- Fill: solid / outline / default
- Label Placement: fixed / floating / stacked
- Start/End Slots: アイコン付き
- Disabled 状態
- Placeholder / Default value

**業務パターン:**
- 倉庫選択: 単一選択 + popover
- ステータス絞込: 複数選択 + chip 表示
- カテゴリ選択: グルーピング付き
- 連動セレクト: 親→子の絞り込み
- 検索付き選択: typeahead パターン
- オブジェクト値: compareWith でオブジェクト比較

### 4. チェックボックス (CheckboxPatterns.vue)

**バリエーション:**
- Color: 全色パターン
- Justify: start / end / space-between
- Alignment: start / center
- Label Placement: start / end / fixed / stacked
- Indeterminate 状態
- Helper & Error テキスト
- Disabled 状態

**業務パターン:**
- 検品チェックリスト: リスト内チェックボックス群
- 利用規約同意: 単独チェック + submit 連動
- 一括選択: 全選択/全解除 + indeterminate
- フィルタチェック: 横並びチップ風チェックボックス
- 設定画面: toggle 的な ON/OFF リスト

### 5. ラジオボタン (RadioPatterns.vue)

**バリエーション:**
- Color: 全色パターン
- Justify: start / end / space-between
- Alignment: start / center
- Label Placement: start / end / fixed / stacked
- Label Wrap: 長いテキスト
- Helper & Error テキスト
- Disabled 状態（グループ/個別）

**業務パターン:**
- 出荷方法選択: 3択ラジオ + 説明付き
- 優先度設定: 色分けラジオ（高=danger、中=warning、低=success）
- 並び順切替: 横並びラジオ
- 配送先選択: カード型レイアウト
- Yes/No 二択: シンプル二択

### 6. リストボックス (ListPatterns.vue)

**バリエーション:**
- Lines: full / inset / none
- Inset: true / false
- List Header: テキスト / ボタン付き
- Item Divider: セクション区切り
- Item Sliding: スワイプアクション
- Reorder: 並び替え
- Detail arrows: true / false
- Item media: avatar / thumbnail / icon

**業務パターン:**
- 在庫一覧: サムネ + 品名 + 数量バッジ
- 検品結果リスト: ステータスアイコン + スワイプ削除
- セクション付きリスト: カテゴリ divider + 件数バッジ
- マスタ選択リスト: 検索 + 一覧 + detail arrow
- アクション付きリスト: スライドで編集/削除

### 7. タブ (TabsPatterns.vue)

**バリエーション:**
- アイコン + テキスト / アイコンのみ / テキストのみ
- バッジ付きタブ
- カスタムカラー
- Segment 風タブ（上部配置）
- スクロール可能タブ（多数）

**業務パターン:**
- 業務切替: 入荷/出荷/在庫の3タブ
- ステータスフィルタ: 全件/未処理/完了
- 詳細画面タブ: 基本情報/履歴/関連
- バッジ付き: 未処理件数表示

### 8. アイコン (IconPatterns.vue)

**バリエーション:**
- サイズ: small / default / large / カスタム(px)
- カラー: 全 Ionic カラー
- スロット配置: start / end / icon-only
- Outline vs Filled vs Sharp

**業務パターン:**
- 業務アイコンギャラリー: 倉庫管理で使う代表アイコン 30+
- ステータスアイコン: チェック/警告/エラー/情報
- ナビゲーションアイコン: メニュー/戻る/閉じる/検索
- アクションアイコン: 編集/削除/共有/ダウンロード
- ファイル/メディアアイコン: ドキュメント/画像/バーコード

### 9. ラベル (LabelPatterns.vue)

**バリエーション:**
- Color: 全色パターン
- Position: fixed / floating / stacked / default
- Item 内配置: h1-h3 / p / note スロット
- Wrap / Truncate

**業務パターン:**
- フォームラベル: 各 placement での入力フォーム
- ステータスラベル: 色付きバッジ風ラベル
- 説明テキスト: ion-note と組み合わせ
- メタ情報表示: 日時/ユーザー/ステータスの横並び
- セクションヘッダ: list-header + label

### 10. カレンダー (DatetimePatterns.vue)

**バリエーション:**
- Presentation: date / time / date-time / month-year / wheel
- Min/Max 制約
- Locale: ja-JP
- Highlighted dates: 配列 / コールバック
- Multiple selection
- Datetime-button 連携
- カスタムボタン（確定/クリア/今日）

**業務パターン:**
- 入荷日選択: 過去日不可 + 日本語ロケール
- 期間指定: 開始日〜終了日のペア
- 納期カレンダー: highlighted で休日・納期マーク
- 時刻指定: 配送時間帯選択
- 月次選択: month-year presentation

### 11. テキストリンク (TextLinkPatterns.vue)

テキストをタップするとダイアログ（alert/modal）またはトーストを表示するパターン。
ページ遷移ではなく、その場でフィードバックを返す UI。

**バリエーション:**
- ion-text + click → alert 表示
- ion-text + click → toast 表示
- ion-label 内リンク風テキスト（下線/色付き）→ modal
- ion-button fill="clear" でリンク風 → alert
- ion-item button 属性 → action-sheet
- テキスト色: primary / secondary / danger
- Disabled 状態（グレーアウト、タップ無効）

**業務パターン:**
- 利用規約リンク: テキスト押下 → 規約全文を modal で表示
- エラー詳細: 赤テキスト押下 → エラー詳細 alert
- ヘルプ表示: 「?」アイコン付きテキスト → 説明 toast
- 確認ダイアログ: 「取消」テキストリンク → confirm alert
- ステータス詳細: バッジ風テキスト押下 → 状態説明 popover
- 注記リンク: ※印テキスト → 補足説明 modal
- 複数アクション: テキスト押下 → action-sheet で選択肢表示
