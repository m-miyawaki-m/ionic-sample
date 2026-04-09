# ピックアップ部品パターン集 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ピックアップ 11 部品それぞれに 30+ パターンの独自ページを作成（バリエーション一覧 + 業務利用パターン + 各パターン日本語補足付き）

**Architecture:** 各部品 1 Vue SFC。共通構成: ion-page > header > content > h2 セクション群。PickupPage のカードリンク先をパターンページに変更。

**Tech Stack:** Vue 3, Ionic Vue 8, TypeScript, ionicons

---

### Task 1: Infrastructure — ルート追加 & PickupPage 更新

**Files:**
- Create: `src/views/samples/pickup/` (directory)
- Move: `src/views/samples/PickupPage.vue` → `src/views/samples/pickup/PickupIndex.vue`
- Modify: `src/router/index.ts`

- [ ] **Step 1: Create directory and move PickupPage**

```bash
mkdir -p src/views/samples/pickup
mv src/views/samples/PickupPage.vue src/views/samples/pickup/PickupIndex.vue
```

- [ ] **Step 2: Update PickupIndex.vue**

Change card links from `/samples/catalog/{slug}/{firstDemo}` to `/samples/pickup/{slug}`:

```vue
<ion-card button :router-link="`/samples/pickup/${item.slug}`" class="pickup-card">
```

Change description text:

```vue
<p class="ion-padding" style="color:var(--ion-color-medium);margin:0">
  よく使う UI 部品を厳選。タップでパターン集を開きます。
</p>
```

Remove `demoCount` badge and `findComponent`/`categories` import (no longer needed).

Simplify `pickupItems` to not need catalog-data:

```typescript
const pickupItems = [
  { slug: 'button',   title: 'ボタン',         description: 'タップ操作の起点',       icon: ellipseOutline },
  { slug: 'input',    title: '入力フィールド',  description: 'テキスト入力',          icon: createOutline },
  { slug: 'select',   title: 'コンボボックス',  description: 'ドロップダウン選択',     icon: caretDownCircleOutline },
  { slug: 'checkbox', title: 'チェックボックス', description: '複数選択の ON/OFF',     icon: checkboxOutline },
  { slug: 'radio',    title: 'ラジオボタン',    description: '択一選択',              icon: radioButtonOnOutline },
  { slug: 'list',     title: 'リストボックス',  description: '一覧表示',              icon: listOutline },
  { slug: 'tabs',     title: 'タブ',           description: '画面切替ナビゲーション', icon: tabletLandscapeOutline },
  { slug: 'icon',     title: 'アイコン',        description: 'Ionicons アイコン表示', icon: imageOutline },
  { slug: 'label',    title: 'ラベル',          description: 'テキストラベル要素',     icon: pricetagOutline },
  { slug: 'datetime', title: 'カレンダー',      description: '日付・時刻ピッカー',    icon: calendarOutline },
  { slug: 'textlink', title: 'テキストリンク',  description: 'タップでダイアログ表示', icon: linkOutline },
];
```

- [ ] **Step 3: Update router**

In `src/router/index.ts`, change the existing pickup route and add 11 new routes:

```typescript
{
  path: '/samples/pickup',
  component: () => import('@/views/samples/pickup/PickupIndex.vue'),
},
{
  path: '/samples/pickup/button',
  component: () => import('@/views/samples/pickup/ButtonPatterns.vue'),
},
{
  path: '/samples/pickup/input',
  component: () => import('@/views/samples/pickup/InputPatterns.vue'),
},
{
  path: '/samples/pickup/select',
  component: () => import('@/views/samples/pickup/SelectPatterns.vue'),
},
{
  path: '/samples/pickup/checkbox',
  component: () => import('@/views/samples/pickup/CheckboxPatterns.vue'),
},
{
  path: '/samples/pickup/radio',
  component: () => import('@/views/samples/pickup/RadioPatterns.vue'),
},
{
  path: '/samples/pickup/list',
  component: () => import('@/views/samples/pickup/ListPatterns.vue'),
},
{
  path: '/samples/pickup/tabs',
  component: () => import('@/views/samples/pickup/TabsPatterns.vue'),
},
{
  path: '/samples/pickup/icon',
  component: () => import('@/views/samples/pickup/IconPatterns.vue'),
},
{
  path: '/samples/pickup/label',
  component: () => import('@/views/samples/pickup/LabelPatterns.vue'),
},
{
  path: '/samples/pickup/datetime',
  component: () => import('@/views/samples/pickup/DatetimePatterns.vue'),
},
{
  path: '/samples/pickup/textlink',
  component: () => import('@/views/samples/pickup/TextLinkPatterns.vue'),
},
```

- [ ] **Step 4: Build verify**

```bash
npm run build
```

---

### Task 2: ButtonPatterns.vue — ボタン パターン集

**Files:**
- Create: `src/views/samples/pickup/ButtonPatterns.vue`

全パターンページの **リファレンス実装**。以降のタスクはこの構成に倣う。

**共通構成:**
- `<ion-page>` + header (back-button → `/samples/pickup`) + title
- `<ion-content class="ion-padding">` に概要説明 + セクション群
- 各セクション: `<h2>` + `<p>` 補足説明 + 実際のコンポーネント
- `<style scoped>` で .section-divider (セクション間のマージン)

**バリエーション セクション (上部):**

1. **Color** — 「color プロパティで意味別に色分け。primary=主操作、danger=破壊的操作。」
   primary / secondary / tertiary / success / warning / danger / light / medium / dark (9個)

2. **Size** — 「size で 3 段階。メイン操作は large、補助は small。」
   small / (default) / large

3. **Fill** — 「fill で視覚的な重要度を表現。solid=最重要、outline=次点、clear=補助。」
   solid / outline / clear

4. **Fill × Shape マトリクス** — 「shape="round" と fill の組み合わせ。丸角はフレンドリーな印象。」
   solid+default / solid+round / outline+default / outline+round / clear+default / clear+round

5. **Expand** — 「expand で幅を制御。block はコンテナ幅、full は画面幅いっぱい。」
   (default) / block / full

6. **Icon 配置** — 「slot でアイコン位置を制御。icon-only はツールバー向き。」
   icon-start / icon-end / icon-only / icon-both-sides

7. **Disabled 状態** — 「disabled で操作不可を明示。全 fill で同じ挙動。」
   solid-disabled / outline-disabled / clear-disabled

**業務利用パターン (下部):**

8. **確定/キャンセル並び** — 「キャンセルは outline、確定は solid で主副を区別。右に主操作を置く。」
   `<ion-button fill="outline">キャンセル</ion-button> <ion-button>確定</ion-button>`

9. **スキャン起動ボタン** — 「expand=block + large で画面幅いっぱいの大ボタン。バーコード読取など。」
   expand=block + size=large + barcodeOutline icon

10. **一括操作バー** — 「複数の small ボタンを横並び。リスト上部の一括操作に。」
    全選択 / 全解除 / 削除 (small, outline)

11. **ステータス切替** — 「色で状態を表現。success=有効、danger=無効。」
    有効(success) / 無効(danger)

12. **ツールバー内ボタン** — 「ion-buttons + slot で header 内に配置。」
    ion-toolbar 内に slot=start/end のボタン

13. **ローディング付きボタン** — 「処理中は spinner + disabled で連打防止。」
    ion-spinner + disabled=true

14. **アイコンボタン群** — 「icon-only で揃えたアクションバー。ラベルなしでコンパクト。」
    編集/コピー/削除/共有 のアイコンボタン横並び

15. **カラーグラデーション** — 「同系色で重要度のグラデーションを表現。」
    primary+solid → primary+outline → primary+clear

---

### Task 3: InputPatterns.vue — 入力フィールド パターン集

**Files:**
- Create: `src/views/samples/pickup/InputPatterns.vue`

**バリエーション:**

1. **Label Placement** — 「ラベル配置で見た目が大きく変わる。floating はモダンUI向け。」
   fixed / floating / stacked / start / end (5パターン)

2. **Fill** — 「fill で入力欄の枠線スタイルを切替。solid は背景色あり。」
   solid / outline / (default)

3. **Type** — 「type でキーボードと入力制約を制御。number は数字キーボード。」
   text / number / email / password / tel / url / search (7パターン)

4. **Helper & Error** — 「helper-text で補足、error-text でバリデーション結果を表示。」
   helper-text あり / error-text + class="ion-invalid ion-touched"

5. **Counter** — 「counter + maxlength で残り文字数を表示。」
   maxlength=100 + counter=true

6. **Clear Input** — 「clear-input で×ボタン表示。入力内容のクリアに。」
   clear-input=true

7. **Start/End Slots** — 「スロットでアイコンやテキストを入力欄の左右に配置。」
   start にアイコン / end にボタン / end にテキスト(単位)

8. **Disabled / Readonly** — 「disabled=操作不可、readonly=表示のみ。」
   disabled / readonly

**業務パターン:**

9. **品番入力** — 「バーコードアイコン付き。scan 起動ボタンを end slot に。」
   label="品番" + placeholder="スキャンまたは手入力" + barcodeOutline icon

10. **数量入力** — 「type=number + inputmode=numeric。端末の数字キーボードが出る。」
    label="数量" + type="number" + min="0" + placeholder="0"

11. **検索フィールド** — 「searchOutline アイコン + clear-input。」
    type="search" + start-slot に searchOutline

12. **バリデーション付き** — 「ion-invalid + ion-touched で赤枠+エラーメッセージ。」
    error-text="必須項目です" + class="ion-invalid ion-touched"

13. **パスワード入力** — 「ion-input-password-toggle で表示/非表示切替。」
    type="password" + end-slot に ion-input-password-toggle

14. **複合入力行** — 「ラベル+入力+単位(個/kg等)を1行に。」
    label="重量" + end-slot に "kg"

15. **フォーカス制御** — 「ボタンクリックで setFocus() を呼ぶ。」
    ref + ion-button @click → input.$el.setFocus()

---

### Task 4: SelectPatterns.vue — コンボボックス パターン集

**Files:**
- Create: `src/views/samples/pickup/SelectPatterns.vue`

**バリエーション:**

1. **Interface** — 「表示方法を3種から選択。popover はインラインで省スペース。」
   alert / popover / action-sheet (同じ選択肢で3つ並べる)

2. **Multiple** — 「multiple で複数選択可能に。選択結果はカンマ区切りで表示。」
   multiple=true + 4-5 options

3. **Fill** — 「入力欄と揃える場合は fill を合わせる。」
   solid / outline / (default)

4. **Label Placement** — 「floating ラベルは未選択時にプレースホルダ風に見える。」
   fixed / floating / stacked

5. **Placeholder** — 「placeholder で未選択時のヒントを表示。」
   placeholder="選択してください"

6. **Disabled** — 「disabled で選択不可に。」
   disabled=true

7. **Start/End Slots** — 「アイコン付きでカテゴリを示す。」
   start-slot にアイコン

**業務パターン:**

8. **倉庫選択** — 「popover で省スペース。倉庫マスタから単一選択。」
   interface="popover" + 倉庫A/B/C

9. **ステータス絞込** — 「multiple で複数ステータスを同時フィルタ。」
   multiple + 全件/未処理/処理中/完了/エラー

10. **カテゴリ選択** — 「グループヘッダ付き。ion-select-option をグループ分け。」
    --- 食品 --- / りんご/みかん / --- 日用品 --- / 洗剤/ティッシュ

11. **連動セレクト** — 「親の選択で子の選択肢が変わる。@ionChange で制御。」
    親(都道府県) → 子(市区町村) の2段

12. **検索付き選択（Typeahead風）** — 「ion-searchbar + フィルタリングされた ion-radio-group で擬似実装。」
    modal 内に searchbar + リスト

13. **オブジェクト値** — 「compareWith で id 比較。選択肢がオブジェクトの場合に必須。」
    :compareWith="(o1,o2) => o1?.id === o2?.id"

---

### Task 5: CheckboxPatterns.vue — チェックボックス パターン集

**Files:**
- Create: `src/views/samples/pickup/CheckboxPatterns.vue`

**バリエーション:**

1. **Color** — 「色で重要度やカテゴリを視覚的に区別。」
   primary / secondary / success / warning / danger (5色)

2. **Justify** — 「justify でラベルとチェックの配置を調整。」
   start / end / space-between

3. **Alignment** — 「長いラベル時の垂直揃え。start=上揃え、center=中央。」
   start / center

4. **Label Placement** — 「ラベル位置。end(右)がデフォルト、start(左)はリスト向き。」
   start / end / fixed / stacked

5. **Indeterminate** — 「indeterminate=一部選択状態。全選択/全解除の親チェックに。」
   indeterminate=true + checked=false

6. **Helper & Error** — 「バリデーションメッセージ。必須チェックの未入力時に。」
   helper-text / error-text + ion-invalid ion-touched

7. **Disabled** — 「disabled でグレーアウト。権限なしの項目に。」
   disabled + checked / disabled + unchecked

**業務パターン:**

8. **検品チェックリスト** — 「ion-list 内にチェック項目を並べる。完了数/全数を表示。」
   5項目のチェックリスト + 進捗カウント表示 (ref で reactive)

9. **利用規約同意** — 「単独チェック。未チェックで送信ボタンを disabled に。」
   チェックボックス + :disabled="!agreed" ボタン

10. **一括選択** — 「全選択/全解除の親チェック。indeterminate を連動。」
    親チェック(indeterminate) + 子チェック3個

11. **フィルタチェック** — 「横並びでチップ風。flex で wrap。」
    display:flex + flex-wrap:wrap のチェックボックス群

12. **設定画面** — 「ion-item 内に justify=space-between で配置。toggle 的な見た目。」
    ion-list > ion-item > ion-checkbox justify="space-between"

---

### Task 6: RadioPatterns.vue — ラジオボタン パターン集

**Files:**
- Create: `src/views/samples/pickup/RadioPatterns.vue`

**バリエーション:**

1. **Color** — 「色分けで選択肢の意味を補強。danger=注意が必要な選択肢。」
   primary / success / warning / danger (4色)

2. **Justify** — 「justify でラベルとラジオの配置調整。」
   start / end / space-between

3. **Alignment** — 「長い説明付きラジオの垂直揃え。」
   start / center

4. **Label Placement** — 「配置パターン。」
   start / end / fixed / stacked

5. **Label Wrap** — 「長文ラベルの折返し。」
   長い説明文付きラジオ

6. **Helper & Error** — 「未選択時のエラー。」
   helper-text / error-text

7. **Disabled** — 「個別/グループ全体の無効化。」
   個別 disabled / グループ disabled

**業務パターン:**

8. **出荷方法選択** — 「3択ラジオ。各選択肢に補足説明つき。」
   通常配送(2-3日) / 速達(翌日) / チャーター(当日)

9. **優先度設定** — 「色分けで緊急度を表現。」
   高(danger) / 中(warning) / 低(success)

10. **並び順切替** — 「横並びラジオ。display:flex で。」
    名前順 / 日付順 / 数量順

11. **配送先選択** — 「カード型レイアウト。ion-card 内にラジオ。」
    本社 / 倉庫A / 倉庫B をカード風に

12. **Yes/No 二択** — 「シンプルな二択。justify=space-between で左右に。」
    はい / いいえ

---

### Task 7: ListPatterns.vue — リストボックス パターン集

**Files:**
- Create: `src/views/samples/pickup/ListPatterns.vue`

**バリエーション:**

1. **Lines** — 「区切り線スタイル。none は境界なしでカード風に。」
   full / inset / none

2. **Inset** — 「inset でリスト全体に左右マージン。カード風の見た目。」
   inset=true / false

3. **List Header** — 「セクションタイトル。ボタン付きもOK。」
   テキストのみ / ボタン付き(「すべて見る」)

4. **Item Divider** — 「カテゴリ区切り。sticky=true でスクロール時固定。」
   divider + sticky

5. **Item Sliding** — 「スワイプでアクションボタン表示。」
   end-side(編集/削除) / start-side(アーカイブ) / 両サイド

6. **Reorder** — 「ドラッグで並び替え。」
   reorder-group + reorder handle

7. **Detail Arrows** — 「detail で右矢印。遷移先がある項目に。」
   detail=true / false

8. **Item Media** — 「avatar / thumbnail / icon の3種。」
   avatar-start / thumbnail-start / icon-start

**業務パターン:**

9. **在庫一覧** — 「サムネ+品名+数量バッジ。倉庫管理の基本パターン。」
   thumbnail + h2(品名) + p(品番) + badge(数量)

10. **検品結果リスト** — 「ステータスアイコン+スワイプ削除。」
    icon(checkmark/close) + sliding(削除)

11. **セクション付きリスト** — 「divider でカテゴリ分け。件数バッジ付き。」
    divider(食品[3]) + items + divider(日用品[2]) + items

12. **マスタ選択リスト** — 「detail arrow 付き。タップで詳細へ遷移を示唆。」
    icon + label + detail=true

13. **アクション付きリスト** — 「スライドで編集/削除。expandable で全幅ボタン。」
    sliding + expandable option

---

### Task 8: TabsPatterns.vue — タブ パターン集

**Files:**
- Create: `src/views/samples/pickup/TabsPatterns.vue`

タブは ion-tabs がルーティングと密結合するため、**パターンプレビューは segment ベースで再現し、実際のタブ構成例はコード+説明で示す**。

**バリエーション:**

1. **アイコン + テキスト** — 「標準的なタブバー。アイコンで視認性UP。」
   segment-button with icon + label (3個)

2. **アイコンのみ** — 「省スペース。ラベルなしで横幅節約。」
   segment-button with icon only

3. **テキストのみ** — 「シンプル。アイコン不要な場合に。」
   segment-button with text only

4. **バッジ付き** — 「ion-badge で未読件数を表示。」
   segment-button + badge (ion-badge)

5. **カスタムカラー** — 「CSS 変数でタブバーの色をカスタマイズ。」
   color variant

6. **スクロール可能** — 「scrollable で多数のタブを横スクロール。」
   segment scrollable + 8個のボタン

7. **Segment View 連動** — 「segment-view でスワイプ対応コンテンツ切替。」
   segment + segment-view + segment-content

**業務パターン:**

8. **業務切替タブ** — 「入荷/出荷/在庫の3タブ。メイン画面の切替に。」
   downloadOutline / pushOutline / cubeOutline

9. **ステータスフィルタ** — 「全件/未処理/完了。badge で件数表示。」
   全件(50) / 未処理(12) / 完了(38)

10. **詳細画面タブ** — 「基本情報/履歴/関連。ion-segment 上部配置。」
    informationCircleOutline / timeOutline / linkOutline

11. **バッジ付き業務タブ** — 「未処理件数を赤バッジで強調。」
    ion-badge color="danger" + 数字

---

### Task 9: IconPatterns.vue — アイコン パターン集

**Files:**
- Create: `src/views/samples/pickup/IconPatterns.vue`

**バリエーション:**

1. **サイズ** — 「size で4段階。large はヘッダやカード向き。」
   small / (default) / large / カスタム(48px)

2. **カラー** — 「Ionic カラーを適用。ステータス表現に。」
   primary / secondary / success / warning / danger / medium

3. **スロット配置** — 「ion-item 内の slot で位置を制御。」
   slot="start" / slot="end" / icon-only

4. **Outline vs Filled** — 「outline(線) はデフォルト。filled(塗り) は強調に。」
   addOutline vs add / heartOutline vs heart

**業務パターン:**

5. **業務アイコンギャラリー** — 「倉庫管理で使う代表アイコン。名前付き一覧。」
   barcodeOutline(スキャン) / cubeOutline(在庫) / cartOutline(出荷) / downloadOutline(入荷) / locationOutline(ロケーション) / documentTextOutline(伝票) / searchOutline(検索) / settingsOutline(設定) / personOutline(ユーザー) / notificationsOutline(通知) / pricetagOutline(品番) / layersOutline(棚) / swapHorizontalOutline(移動) / clipboardOutline(棚卸) / checkmarkCircleOutline(完了) 他、計30個以上をグリッド表示

6. **ステータスアイコン** — 「状態を色+アイコンで表現。一覧画面の行頭に。」
   checkmarkCircle(success) / alertCircle(warning) / closeCircle(danger) / informationCircle(primary) / helpCircle(medium)

7. **ナビゲーションアイコン** — 「ヘッダ・フッタに使う操作系アイコン。」
   arrowBack / close / menu / search / ellipsisVertical / add

8. **アクションアイコン** — 「CRUD 操作のアイコン群。」
   createOutline(編集) / trashOutline(削除) / copyOutline(コピー) / shareOutline(共有) / downloadOutline(DL)

---

### Task 10: LabelPatterns.vue — ラベル パターン集

**Files:**
- Create: `src/views/samples/pickup/LabelPatterns.vue`

**バリエーション:**

1. **Color** — 「色でカテゴリやステータスを区別。」
   primary / secondary / success / warning / danger / medium (6色)

2. **Position (input 連携)** — 「ion-input の label-placement と対応。floating はモダン。」
   fixed / floating / stacked / (default)

3. **Item 内 Heading** — 「ion-label 内の h1-h3 / p で階層表現。」
   h2(タイトル) + p(サブテキスト)

4. **Note slot** — 「ion-note で補足情報。slot="end" で右寄せ。」
   ion-item + ion-label + ion-note slot="end"

5. **Truncate / Wrap** — 「長いテキストの処理。」
   text-wrap / 1行省略(CSS)

**業務パターン:**

6. **フォームラベル** — 「各 placement での入力フォーム例。label → input の関連。」
   fixed + input / floating + input / stacked + input

7. **ステータスラベル** — 「ion-badge 風のカラーラベル。インラインで状態表示。」
   ion-text color="success" + 背景付き(CSS)

8. **説明テキスト** — 「ion-note を使った補足情報の表示。」
   ion-item 内 ion-note slot="helper"

9. **メタ情報表示** — 「日時/ユーザー/ステータスを横並び。」
   ion-item > ion-label(品名) + ion-note(2024-01-15) + ion-badge(完了)

10. **セクションヘッダ** — 「ion-list-header でリストのセクション見出し。」
    ion-list-header > ion-label + ion-button(すべて見る)

11. **キーバリュー表示** — 「ラベル:値のペア表示。詳細画面の情報表示に。」
    ion-grid > ion-row > ion-col(ラベル) + ion-col(値)

---

### Task 11: DatetimePatterns.vue — カレンダー パターン集

**Files:**
- Create: `src/views/samples/pickup/DatetimePatterns.vue`

**バリエーション:**

1. **Presentation** — 「表示モードの切替。date が最も一般的。」
   date / time / date-time / month-year

2. **Wheel 表示** — 「ホイール UI。スマホネイティブ風。」
   presentation="date" prefer-wheel="true"

3. **Min/Max 制約** — 「選択可能範囲を制限。過去日不可等。」
   min="2024-01-01" max="2025-12-31"

4. **Locale** — 「日本語ロケール。曜日・月名が日本語に。」
   locale="ja-JP"

5. **Highlighted Dates** — 「特定日をハイライト。配列指定。」
   :highlighted-dates="[{date:'2024-06-15',textColor:'#fff',backgroundColor:'#f00'}]"

6. **Multiple Selection** — 「複数日選択。休日指定等に。」
   multiple=true

7. **Datetime-button** — 「ボタンクリックで popover にカレンダー表示。省スペース。」
   ion-datetime-button + ion-modal > ion-datetime

8. **カスタムボタン** — 「確定/クリア/今日ボタン。」
   show-default-buttons + show-clear-button

**業務パターン:**

9. **入荷日選択** — 「過去日不可。locale=ja-JP。stacked ラベル。」
   min=today + locale="ja-JP" + label="入荷予定日"

10. **期間指定** — 「開始日〜終了日のペア。終了日は開始日以降に制約。」
    2つの datetime-button。@ionChange で連動。

11. **納期カレンダー** — 「休日・納期日をハイライト。色分けで意味付け。」
    highlighted-dates: 赤=休日 / 青=納期

12. **時刻指定** — 「配送時間帯の選択。presentation=time。」
    presentation="time" + hour-cycle="h23"

13. **月次選択** — 「月単位の集計期間指定。」
    presentation="month-year"

---

### Task 12: TextLinkPatterns.vue — テキストリンク パターン集

**Files:**
- Create: `src/views/samples/pickup/TextLinkPatterns.vue`

テキスト押下 → ダイアログ/トースト表示のパターン。alertController / toastController / modalController / actionSheetController / popoverController を使う。

**バリエーション:**

1. **ion-text + click → alert** — 「最もシンプル。テキストタップで alert ダイアログ。」
   `<ion-text color="primary" @click="showAlert" style="cursor:pointer;text-decoration:underline">詳細を見る</ion-text>`

2. **ion-text + click → toast** — 「軽い通知。操作結果のフィードバックに。」
   `<ion-text color="primary" @click="showToast">コピーしました</ion-text>`

3. **ion-label 内リンク風 → modal** — 「下線+色でリンクに見せる。長文表示は modal で。」
   ion-label 内 `<a @click.prevent="showModal">利用規約</a>`

4. **ion-button fill="clear" → alert** — 「ボタンだがリンク風。padding なしでインライン。」
   `<ion-button fill="clear" size="small" @click="showAlert">詳細</ion-button>`

5. **ion-item button → action-sheet** — 「リスト項目タップで選択肢表示。」
   `<ion-item button @click="showActionSheet">`

6. **テキスト色バリエーション** — 「色で意味を変える。danger=注意、primary=標準。」
   primary / secondary / danger / success

7. **Disabled 状態** — 「グレーアウトでタップ無効。pointer-events:none。」
   color="medium" + style="pointer-events:none;opacity:0.5"

**業務パターン:**

8. **利用規約リンク** — 「テキスト押下→規約全文を modal で表示。長文スクロール可。」
   `<ion-text @click="showTermsModal">利用規約</ion-text>` → modal (ion-header + ion-content + 長文)

9. **エラー詳細** — 「赤テキスト押下→エラー詳細を alert で表示。」
   color="danger" → alertController.create({header:'エラー詳細', message:...})

10. **ヘルプ表示** — 「?アイコン付きテキスト→説明を toast で表示。3秒で自動消去。」
    helpCircleOutline + ion-text → toastController.create({duration:3000})

11. **確認ダイアログ** — 「取消テキスト→confirm alert（はい/いいえ）。」
    ion-text "この操作を取り消す" → alert with role="cancel" + role="confirm"

12. **ステータス詳細 (popover)** — 「バッジ風テキスト→popover で詳細表示。」
    ion-badge @click → popoverController.create({component: ...}) または inline popover

13. **注記リンク** — 「※テキスト→補足説明 modal。」
    ※配送は翌営業日以降 → modal で詳細ルール表示

14. **複数アクション** — 「テキスト押下→action-sheet で選択肢。」
    "操作を選択" → actionSheetController.create({buttons:[編集,複製,削除,キャンセル]})

---

### Task 13: Build verification & commit

**Files:**
- Verify all new files compile

- [ ] **Step 1: Build**

```bash
npm run build
```

- [ ] **Step 2: Fix any errors**

Common issues:
- Missing Ionic component imports
- Missing ionicons imports
- TypeScript type errors → add `// @ts-nocheck` if needed

- [ ] **Step 3: Commit**

```bash
git add src/views/samples/pickup/ src/router/index.ts
git commit -m "feat(pickup): 11部品パターン集 - バリエーション+業務パターン各30+

- ButtonPatterns / InputPatterns / SelectPatterns
- CheckboxPatterns / RadioPatterns / ListPatterns
- TabsPatterns / IconPatterns / LabelPatterns
- DatetimePatterns / TextLinkPatterns
- 各パターンに日本語補足説明付き
- PickupPage からの導線"
```
