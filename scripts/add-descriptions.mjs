// add-descriptions.mjs
// Injects Japanese description <p> tags into each Ionic demo Vue file.

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const demosRoot = join(__dirname, '../src/views/samples/catalog/demos');

// ============================================================
// Comprehensive description mapping: component/demo → Japanese description
// ============================================================
const descriptions = {
  // ─── Accordion ───────────────────────────────────────────
  'accordion/accessibility-animations': 'アニメーションのアクセシビリティ対応。prefers-reduced-motion が有効な場合にアコーディオンのアニメーションを無効化する例。',
  'accordion/basic': 'アコーディオンの基本構成。クリックで開閉する折り畳みコンテンツを確認できる。',
  'accordion/customization-advanced-expansion-styles': '高度な展開スタイルのカスタマイズ。CSS を使って開閉時の外観を詳細に制御する例。',
  'accordion/customization-expansion-styles': 'ion-accordion の展開スタイルをカスタマイズする例。CSS カスタムプロパティで見た目を変更できる。',
  'accordion/customization-icons': 'アコーディオンのトグルアイコンをカスタマイズする例。slot を使ってアイコンを差し替える。',
  'accordion/customization-theming': 'CSS カスタムプロパティを使ったアコーディオンのテーマカスタマイズ例。',
  'accordion/disable-group': 'アコーディオングループ全体を disabled にする例。グループ単位での無効化を確認できる。',
  'accordion/disable-individual': '個別のアコーディオン項目を disabled にする例。特定の項目だけ操作不能にする方法。',
  'accordion/listen-changes': 'ionChange イベントを使ってアコーディオンの開閉状態の変化を検知する例。',
  'accordion/multiple': '複数のアコーディオンを同時に開けるグループの設定例。multiple プロパティの動作を確認できる。',
  'accordion/readonly-group': 'アコーディオングループ全体を readonly にする例。開閉操作を受け付けなくなる。',
  'accordion/readonly-individual': '個別のアコーディオン項目を readonly にする例。特定の項目だけ読み取り専用にする方法。',
  'accordion/toggle': 'プログラムからアコーディオンの開閉を切り替える方法。value プロパティを使った制御を確認できる。',

  // ─── Action Sheet ─────────────────────────────────────────
  'action-sheet/controller': 'actionSheetController を使ってプログラム的にアクションシートを表示する例。',
  'action-sheet/inline-isOpen': 'isOpen プロパティを使ってアクションシートの表示/非表示をリアクティブに制御する例。',
  'action-sheet/inline-trigger': 'trigger 属性を使い、ボタンクリックでアクションシートを開くインラインパターン。',
  'action-sheet/role-info-on-dismiss': '各ボタンに role を設定し、dismissal 時にどのボタンが押されたか判定する例。',
  'action-sheet/theming-css-properties': 'CSS カスタムプロパティを使ったアクションシートのスタイルカスタマイズ例。',
  'action-sheet/theming-styling': 'CSS によるアクションシートの詳細なスタイリング例。ボタン色や背景などを変更できる。',

  // ─── Alert ────────────────────────────────────────────────
  'alert/buttons': 'アラートにカスタムボタンを追加する例。ボタンの role やハンドラーの設定方法を確認できる。',
  'alert/customization': 'CSS カスタムプロパティを使ったアラートのスタイルカスタマイズ例。',
  'alert/inputs-radios': 'ラジオボタン付きアラートの実装例。選択肢から一つを選ぶ UI を確認できる。',
  'alert/inputs-text-inputs': 'テキスト入力フィールド付きアラートの実装例。ユーザーにテキスト入力を求める UI を確認できる。',
  'alert/presenting-controller': 'alertController を使ってプログラム的にアラートを表示する例。',
  'alert/presenting-isOpen': 'isOpen プロパティを使ってアラートの表示/非表示をリアクティブに制御する例。',
  'alert/presenting-trigger': 'trigger 属性を使い、ボタンクリックでアラートを開くインラインパターン。',

  // ─── Badge ────────────────────────────────────────────────
  'badge/basic': 'バッジ（ion-badge）の基本的な使い方。テキストやアイコンに数値や状態を重ねて表示する。',
  'badge/inside-tab-bar': 'タブバーのタブボタン内にバッジを表示する例。未読件数などの通知表示に利用できる。',
  'badge/theming-colors': 'color プロパティを使ったバッジの色のカスタマイズ例。',
  'badge/theming-css-properties': 'CSS カスタムプロパティを使ったバッジのスタイルカスタマイズ例。',

  // ─── Breadcrumbs ──────────────────────────────────────────
  'breadcrumbs/basic': 'パンくずリスト（ion-breadcrumbs）の基本的な使い方。階層ナビゲーションの表示例。',
  'breadcrumbs/collapsing-items-expand-on-click': 'パンくずリストのアイテム数が多い場合に折り畳み、クリックで展開する例。',
  'breadcrumbs/collapsing-items-items-before-after': '折り畳み時に表示するアイテム数（前後）を itemsBeforeCollapse / itemsAfterCollapse で制御する例。',
  'breadcrumbs/collapsing-items-max-items': 'maxItems プロパティでパンくずリストに表示する最大アイテム数を制限する例。',
  'breadcrumbs/collapsing-items-popover-on-click': '折り畳まれたパンくずアイテムをクリックするとポップオーバーで一覧を表示する例。',
  'breadcrumbs/icons-custom-separators': '区切り文字（セパレーター）をカスタムアイコンに変更する例。',
  'breadcrumbs/icons-icons-on-items': '各パンくずアイテムにアイコンを付ける例。start/end スロットを活用する。',
  'breadcrumbs/theming-colors': 'color プロパティを使ったパンくずリストの色のカスタマイズ例。',
  'breadcrumbs/theming-css-properties': 'CSS カスタムプロパティを使ったパンくずリストのスタイルカスタマイズ例。',

  // ─── Button ───────────────────────────────────────────────
  'button/basic': 'ボタンの基本的な使い方。デフォルト状態と disabled 状態を確認できる。',
  'button/expand': 'expand プロパティでボタン幅をブロック全体に広げる例。block と full の違いも確認できる。',
  'button/fill': 'fill プロパティで solid / outline / clear のスタイルを切り替える例。',
  'button/icons': 'ボタンにアイコンを組み合わせる例。icon-only / icon-start / icon-end のレイアウトを確認できる。',
  'button/shape': 'shape プロパティで角を丸くした（round）ボタンを作る例。',
  'button/size': 'size プロパティでボタンサイズを small / default / large に変更する例。',
  'button/text-wrapping': '長いテキストラベルがボタン内で折り返す動作を確認する例。',
  'button/theming-colors': 'color プロパティを使ったボタンの色のカスタマイズ例。',
  'button/theming-css-properties': 'CSS カスタムプロパティを使ったボタンのスタイルカスタマイズ例。',

  // ─── Ripple Effect ────────────────────────────────────────
  'ripple-effect/basic': 'ion-ripple-effect の基本的な使い方。タップ時に広がる波紋エフェクトを確認できる。',
  'ripple-effect/customizing': 'CSS を使ってリップルエフェクトの色やサイズをカスタマイズする例。',
  'ripple-effect/type': 'type プロパティで bounded（要素内に収まる）と unbounded（要素外に広がる）の波紋タイプを切り替える例。',

  // ─── Card ─────────────────────────────────────────────────
  'card/basic': 'カード（ion-card）の基本的な使い方。タイトル・サブタイトル・コンテンツの構成を確認できる。',
  'card/buttons': 'カード内にボタンを配置する例。ion-card-content 内でのボタン配置を確認できる。',
  'card/list': 'カード内にリスト（ion-list / ion-item）を配置する例。情報をリスト形式でまとめる。',
  'card/media': 'カード内に画像などのメディアを配置する例。ion-img を使ったビジュアル表示を確認できる。',
  'card/theming-colors': 'color プロパティを使ったカードの色のカスタマイズ例。',
  'card/theming-css-properties': 'CSS カスタムプロパティを使ったカードのスタイルカスタマイズ例。',

  // ─── Checkbox ─────────────────────────────────────────────
  'checkbox/alignment': 'alignment プロパティでチェックボックスとラベルの垂直揃えを変更する例。',
  'checkbox/basic': 'チェックボックス（ion-checkbox）の基本的な使い方。チェック状態の切り替えを確認できる。',
  'checkbox/helper-error': 'ヘルパーテキストとエラーメッセージをチェックボックスに組み合わせる例。',
  'checkbox/indeterminate': 'indeterminate プロパティで「未確定」状態のチェックボックスを表示する例。親子チェックに利用できる。',
  'checkbox/justify': 'justify プロパティでチェックボックスとラベルの水平配置を変更する例。',
  'checkbox/label-link': 'チェックボックスのラベル内にリンクを含める例。利用規約への同意 UI などに利用できる。',
  'checkbox/label-placement': 'labelPlacement プロパティでラベルをチェックボックスの前後・上下に配置する例。',
  'checkbox/theming-css-properties': 'CSS カスタムプロパティを使ったチェックボックスのスタイルカスタマイズ例。',

  // ─── Chip ─────────────────────────────────────────────────
  'chip/basic': 'チップ（ion-chip）の基本的な使い方。タグやフィルターラベルとして利用できる。',
  'chip/slots': 'start / end スロットを使ってチップにアイコンやアバターを追加する例。',
  'chip/theming-colors': 'color プロパティを使ったチップの色のカスタマイズ例。',
  'chip/theming-css-properties': 'CSS カスタムプロパティを使ったチップのスタイルカスタマイズ例。',

  // ─── Content ──────────────────────────────────────────────
  'content/basic': 'ion-content の基本的な使い方。スクロール可能なメインコンテンツ領域を確認できる。',
  'content/fixed': 'fixed スロットを使ってコンテンツ上に固定要素（FAB ボタンなど）を重ねて配置する例。',
  'content/fullscreen': 'fullscreen プロパティでコンテンツをヘッダー・フッターの下まで広げるフルスクリーン表示の例。',
  'content/header-footer': 'ヘッダーとフッターを組み合わせた ion-content の基本レイアウト例。',
  'content/scroll-events': 'ionScroll イベントを使ってスクロール位置の変化をリアルタイムに検知する例。',
  'content/scroll-methods': 'scrollToTop / scrollToBottom などの API を使ってプログラムからスクロール位置を制御する例。',
  'content/theming-colors': 'color プロパティを使ったコンテンツ背景色のカスタマイズ例。',
  'content/theming-css-properties': 'CSS カスタムプロパティを使ったコンテンツのスタイルカスタマイズ例。',
  'content/theming-css-shadow-parts': 'CSS Shadow Parts を使ったコンテンツの詳細なスタイリング例。',
  'content/theming-safe-area': 'セーフエリア（ノッチ等）を考慮したコンテンツのパディング設定例。',

  // ─── Datetime Button ──────────────────────────────────────
  'datetime-button/basic': 'ion-datetime-button の基本的な使い方。ボタンをクリックして日付・時刻ピッカーを開く。',
  'datetime-button/format-options': 'dateTimeOptions プロパティでボタンに表示する日時フォーマットをカスタマイズする例。',

  // ─── Datetime ─────────────────────────────────────────────
  'datetime/basic': 'ion-datetime の基本的な使い方。インラインカレンダーで日付を選択できる。',
  'datetime/buttons-customizing-button-texts': '確認・キャンセルボタンのテキストをカスタマイズする例。',
  'datetime/buttons-customizing-buttons': '確認・キャンセルボタンの外観をカスタマイズする例。スロットを使ったボタンの差し替え。',
  'datetime/buttons-showing-confirmation-buttons': '確認ボタンを表示して日付選択を確定させる例。showDefaultButtons プロパティの利用。',
  'datetime/date-constraints-advanced': 'isDateEnabled コールバックを使って任意の日付を選択不能にする高度な制約設定例。',
  'datetime/date-constraints-max-min': 'min / max プロパティで選択可能な日付範囲を制限する例。',
  'datetime/date-constraints-values': 'values プロパティで選択可能な特定の日付・時刻のみを許可する例。',
  'datetime/format-options': 'Intl.DateTimeFormat オプションを使って日付表示フォーマットをカスタマイズする例。',
  'datetime/highlightedDates-array': '特定の日付を配列で指定してカレンダー上でハイライト表示する例。',
  'datetime/highlightedDates-callback': 'コールバック関数を使って動的に日付をハイライト表示する例。',
  'datetime/localization-custom-locale': 'locale プロパティで日付の表示ロケール（言語・地域）をカスタマイズする例。',
  'datetime/localization-first-day-of-week': 'firstDayOfWeek プロパティでカレンダーの週の開始曜日を変更する例。',
  'datetime/localization-hour-cycle': 'hourCycle プロパティで 12 時間制 / 24 時間制を切り替える例。',
  'datetime/localization-locale-extension-tags': 'ロケール拡張タグを使って数字体系や暦などを細かく指定する例。',
  'datetime/localization-time-label': '時間ラベルの表示をカスタマイズする例。',
  'datetime/multiple': 'multiple プロパティを使って複数の日付を同時に選択する例。',
  'datetime/presentation-date': 'presentation="date" で日付のみを表示するカレンダー表示の例。',
  'datetime/presentation-month-and-year': 'presentation="month-year" で月・年の選択のみを表示する例。',
  'datetime/presentation-time': 'presentation="time" で時刻のみを表示するピッカーの例。',
  'datetime/presentation-wheel': 'presentation="date-time" の wheel スタイルで日時を選択する例。',
  'datetime/show-adjacent-days': 'showAdjacentDays プロパティで前後の月の日付をカレンダーに表示する例。',
  'datetime/styling-calendar-days': 'CSS を使ってカレンダーの日付セルのスタイルをカスタマイズする例。',
  'datetime/styling-calendar-header': 'CSS を使ってカレンダーヘッダーのスタイルをカスタマイズする例。',
  'datetime/styling-datetime-header': 'CSS を使って datetime ヘッダー部分のスタイルをカスタマイズする例。',
  'datetime/styling-wheel-styling': 'ホイール型ピッカーのスタイルをカスタマイズする例。',
  'datetime/title-customizing-title': 'titleSelectedDatesFormatter を使って選択済み日付のタイトル表示をカスタマイズする例。',
  'datetime/title-showing-default-title': 'showDefaultTitle プロパティでデフォルトの日付タイトルを表示する例。',

  // ─── Picker ───────────────────────────────────────────────
  'picker/basic': 'ion-picker の基本的な使い方。ホイール型のカラム選択 UI を確認できる。',
  'picker/modal': 'モーダル内で ion-picker を表示する例。',
  'picker/prefix-suffix': 'カラムに prefix / suffix を追加して単位や記号を表示する例。',
  'picker/theming-css-properties': 'CSS カスタムプロパティを使ったピッカーのスタイルカスタマイズ例。',

  // ─── FAB ──────────────────────────────────────────────────
  'fab/basic': 'フローティングアクションボタン（ion-fab）の基本的な使い方。画面上に固定表示されるボタンを確認できる。',
  'fab/before-content': 'FAB ボタンを ion-content の外（コンテンツの前）に配置する例。',
  'fab/button-sizing': 'FAB ボタンのサイズを small / default で切り替える例。',
  'fab/list-side': 'ion-fab-list の side プロパティで展開方向（上下左右）を変更する例。',
  'fab/positioning': 'horizontal / vertical プロパティで FAB の画面上の配置位置を変更する例。',
  'fab/safe-area': 'セーフエリアを考慮した FAB の配置例。ノッチや丸みのある端末での表示を確認できる。',
  'fab/theming-colors': 'color プロパティを使った FAB の色のカスタマイズ例。',
  'fab/theming-css-custom-properties': 'CSS カスタムプロパティを使った FAB のスタイルカスタマイズ例。',
  'fab/theming-css-shadow-parts': 'CSS Shadow Parts を使った FAB の詳細なスタイリング例。',

  // ─── Grid ─────────────────────────────────────────────────
  'grid/basic': 'ion-grid の基本的な使い方。行（ion-row）とカラム（ion-col）によるグリッドレイアウトを確認できる。',
  'grid/customizing-column-number': 'カラム数をカスタマイズするグリッドレイアウトの例。',
  'grid/customizing-padding': 'グリッドとカラムのパディングをカスタマイズする例。',
  'grid/customizing-width': 'カラム幅をカスタマイズするグリッドレイアウトの例。',
  'grid/fixed': 'fixed プロパティでグリッドの最大幅を固定する例。',
  'grid/horizontal-alignment': '水平方向の整列を変更するグリッドレイアウトの例。',
  'grid/offset-responsive': 'ブレークポイントごとにカラムのオフセットを変えるレスポンシブオフセットの例。',
  'grid/offset': 'offset プロパティでカラムを右にずらすオフセット設定の例。',
  'grid/push-pull-responsive': 'ブレークポイントごとにカラムの push / pull を変えるレスポンシブ設定の例。',
  'grid/push-pull': 'push / pull プロパティでカラムの視覚的な順序を入れ替える例。',
  'grid/size-auto': 'size="auto" でカラム幅をコンテンツの幅に自動調整する例。',
  'grid/size-responsive': 'ブレークポイントごとにカラムサイズを変えるレスポンシブレイアウトの例。',
  'grid/size': 'size プロパティで各カラムの幅（1〜12）を指定する例。',
  'grid/vertical-alignment': '垂直方向の整列を変更するグリッドレイアウトの例。',

  // ─── Icon ─────────────────────────────────────────────────
  'icon/basic': 'ion-icon の基本的な使い方。ionicons のアイコンセットを表示する例。',

  // ─── Infinite Scroll ──────────────────────────────────────
  'infinite-scroll/basic': '無限スクロール（ion-infinite-scroll）の基本実装。一番下までスクロールすると追加データを読み込む。',
  'infinite-scroll/custom-infinite-scroll-content': 'ion-infinite-scroll-content をカスタマイズする例。ローディング表示のテキストやスピナーを変更できる。',
  'infinite-scroll/infinite-scroll-content': 'デフォルトの ion-infinite-scroll-content を使った実装例。',

  // ─── Input OTP ────────────────────────────────────────────
  'input-otp/basic': 'OTP 入力フィールド（ion-input-otp）の基本的な使い方。数字コードの入力 UI を確認できる。',
  'input-otp/fill': 'fill プロパティで OTP フィールドの外観を切り替える例（outline / solid）。',
  'input-otp/pattern': 'pattern プロパティで入力可能な文字種（数字・英字など）を制限する例。',
  'input-otp/separators': 'separators プロパティで OTP 桁の間に区切り記号を表示する例。',
  'input-otp/shape': 'shape プロパティで OTP フィールドの角形状を変更する例。',
  'input-otp/size': 'size プロパティで OTP フィールドのサイズを変更する例。',
  'input-otp/states': '無効（disabled）・読み取り専用（readonly）などの状態を確認する例。',
  'input-otp/theming-colors': 'color プロパティを使った OTP フィールドの色のカスタマイズ例。',
  'input-otp/theming-css-properties': 'CSS カスタムプロパティを使った OTP フィールドのスタイルカスタマイズ例。',
  'input-otp/type': 'type プロパティで入力値の種類（テキスト・数値・パスワードなど）を変更する例。',

  // ─── Input Password Toggle ────────────────────────────────
  'input-password-toggle/basic': 'ion-input-password-toggle を使ってパスワードフィールドの表示/非表示を切り替える例。',

  // ─── Input ────────────────────────────────────────────────
  'input/basic': 'テキスト入力フィールド（ion-input）の基本的な使い方。ラベルとプレースホルダーを確認できる。',
  'input/clear': 'clearInput プロパティで入力値をワンタップでクリアするボタンを表示する例。',
  'input/counter-alignment': 'counter プロパティと counterFormatter を使って文字数カウンターの配置を調整する例。',
  'input/counter': 'counter プロパティと maxlength を組み合わせて文字数カウンターを表示する例。',
  'input/fill': 'fill プロパティで入力フィールドの外観を solid / outline に切り替える例。',
  'input/filtering': 'ionInput イベントと正規表現を使って入力値をリアルタイムにフィルタリングする例。',
  'input/helper-error': 'ヘルパーテキストとエラーメッセージを入力フィールドに組み合わせる例。',
  'input/label-placement': 'labelPlacement プロパティでラベルの配置（fixed / floating / stacked / start / end）を変更する例。',
  'input/label-slot': 'label スロットを使ってカスタムラベル要素を入力フィールドに挿入する例。',
  'input/mask': 'maskito ライブラリを使って入力値にマスク（電話番号フォーマットなど）を適用する例。',
  'input/no-visible-label': 'aria-label を使って視覚的なラベルなしでアクセシビリティに対応した入力フィールドを作る例。',
  'input/set-focus': 'setFocus() メソッドを使ってプログラムから入力フィールドにフォーカスを当てる例。',
  'input/start-end-slots': 'start / end スロットを使って入力フィールドの前後にアイコンやボタンを配置する例。',
  'input/theming-colors': 'color プロパティを使った入力フィールドの色のカスタマイズ例。',
  'input/theming-css-properties': 'CSS カスタムプロパティを使った入力フィールドのスタイルカスタマイズ例。',
  'input/types': 'type プロパティで text / email / number / password など入力タイプを変更する例。',

  // ─── Textarea ─────────────────────────────────────────────
  'textarea/autogrow': 'autoGrow プロパティで入力内容に応じてテキストエリアの高さが自動的に拡張する例。',
  'textarea/basic': '複数行テキスト入力（ion-textarea）の基本的な使い方。',
  'textarea/clear-on-edit': 'clearOnEdit プロパティで編集開始時に入力値をクリアする例。',
  'textarea/counter': 'counter プロパティで文字数カウンターをテキストエリアに表示する例。',
  'textarea/fill': 'fill プロパティでテキストエリアの外観を solid / outline に切り替える例。',
  'textarea/helper-error': 'ヘルパーテキストとエラーメッセージをテキストエリアに組み合わせる例。',
  'textarea/label-placement': 'labelPlacement プロパティでラベルの配置を変更する例。',
  'textarea/label-slot': 'label スロットを使ってカスタムラベル要素をテキストエリアに挿入する例。',
  'textarea/no-visible-label': 'aria-label を使って視覚的なラベルなしでアクセシビリティに対応したテキストエリアを作る例。',
  'textarea/start-end-slots': 'start / end スロットを使ってテキストエリアの前後にアイコンやボタンを配置する例。',
  'textarea/theming': 'CSS カスタムプロパティを使ったテキストエリアのスタイルカスタマイズ例。',

  // ─── Item Divider ─────────────────────────────────────────
  'item-divider/basic': 'リストの区切り見出し（ion-item-divider）の基本的な使い方。',
  'item-divider/theming-colors': 'color プロパティを使ったアイテム区切り線の色のカスタマイズ例。',
  'item-divider/theming-css-properties': 'CSS カスタムプロパティを使ったアイテム区切り線のスタイルカスタマイズ例。',

  // ─── Item Group ───────────────────────────────────────────
  'item-group/basic': 'ion-item-group を使って関連するリスト項目をグループ化する例。',
  'item-group/sliding-items': 'ion-item-group 内でスライドアイテム（ion-item-sliding）を使う例。',

  // ─── Item Sliding ─────────────────────────────────────────
  'item-sliding/basic': 'スライドアイテム（ion-item-sliding）の基本的な使い方。スワイプでアクションボタンを表示する。',
  'item-sliding/expandable': 'expandable プロパティでスライドアイテムを端まで引っ張ると大きく展開するアクションを設定する例。',
  'item-sliding/icons': 'スライドアイテムのアクションボタンにアイコンを追加する例。',

  // ─── Item ─────────────────────────────────────────────────
  'item/basic': 'リスト項目（ion-item）の基本的な使い方。ラベルとコンテンツの組み合わせを確認できる。',
  'item/buttons': 'ion-item 内にボタンを配置する例。アクションボタンを持つリスト項目を作る。',
  'item/clickable': 'href または detail プロパティを使ってクリック可能なリスト項目を作る例。',
  'item/content-types-actions': 'アクション要素（ボタンなど）を含む ion-item のコンテンツタイプの例。',
  'item/content-types-controls': 'フォームコントロール（チェックボックス・トグルなど）を含む ion-item の例。',
  'item/content-types-metadata': 'メタデータ（ノート・バッジなど）を含む ion-item のコンテンツタイプの例。',
  'item/content-types-supporting-visuals': 'サポートビジュアル（アバター・サムネイルなど）を含む ion-item の例。',
  'item/content-types-text': 'テキストコンテンツを含む ion-item のレイアウト例。',
  'item/detail-arrows': 'detail プロパティで項目右端に詳細矢印アイコンを表示する例。',
  'item/inputs': '入力フィールドを ion-item 内に配置する例。フォームレイアウトとして活用できる。',
  'item/lines': 'lines プロパティで区切り線のスタイル（full / inset / none）を変更する例。',
  'item/media': '画像やメディアを含む ion-item のレイアウト例。',
  'item/theming-colors': 'color プロパティを使ったアイテムの色のカスタマイズ例。',
  'item/theming-css-properties': 'CSS カスタムプロパティを使ったアイテムのスタイルカスタマイズ例。',
  'item/theming-css-shadow-parts': 'CSS Shadow Parts を使ったアイテムの詳細なスタイリング例。',
  'item/theming-input-highlight': '入力フィールドにフォーカスしたときのハイライト色をカスタマイズする例。',

  // ─── Label ────────────────────────────────────────────────
  'label/basic': 'ion-label の基本的な使い方。テキストラベルのスタイルバリエーションを確認できる。',
  'label/input': '入力フィールドと組み合わせた ion-label の使い方。',
  'label/item': 'ion-item と組み合わせた ion-label のレイアウト例。',
  'label/theming-colors': 'color プロパティを使ったラベルの色のカスタマイズ例。',

  // ─── Note ─────────────────────────────────────────────────
  'note/basic': 'サブテキスト・補足情報（ion-note）の基本的な使い方。',
  'note/item': 'ion-item 内でノートを使った補足テキスト表示の例。',
  'note/theming-colors': 'color プロパティを使ったノートの色のカスタマイズ例。',
  'note/theming-css-properties': 'CSS カスタムプロパティを使ったノートのスタイルカスタマイズ例。',

  // ─── List Header ──────────────────────────────────────────
  'list-header/basic': 'リストヘッダー（ion-list-header）の基本的な使い方。セクション見出しを確認できる。',
  'list-header/buttons': 'ion-list-header 内にボタンを配置する例。',
  'list-header/lines': 'lines プロパティでリストヘッダーの区切り線スタイルを変更する例。',
  'list-header/theming-colors': 'color プロパティを使ったリストヘッダーの色のカスタマイズ例。',
  'list-header/theming-css-properties': 'CSS カスタムプロパティを使ったリストヘッダーのスタイルカスタマイズ例。',

  // ─── List ─────────────────────────────────────────────────
  'list/basic': 'リスト（ion-list）の基本的な使い方。アイテムをリスト形式で並べる構成を確認できる。',
  'list/inset': 'inset プロパティでリストを画面端から内側に配置する例。',
  'list/lines': 'lines プロパティでリスト全体のアイテム間区切り線スタイルを変更する例。',

  // ─── Avatar ───────────────────────────────────────────────
  'avatar/basic': 'アバター（ion-avatar）の基本的な使い方。円形のプロフィール画像を表示する。',
  'avatar/chip': 'ion-chip 内にアバターを配置する例。',
  'avatar/item': 'ion-item 内にアバターを配置する例。',
  'avatar/theming-css-properties': 'CSS カスタムプロパティを使ったアバターのスタイルカスタマイズ例。',

  // ─── Image ────────────────────────────────────────────────
  'img/basic': 'ion-img の基本的な使い方。画像の遅延ロードと適切な表示を確認できる。',

  // ─── Thumbnail ────────────────────────────────────────────
  'thumbnail/basic': 'サムネイル画像（ion-thumbnail）の基本的な使い方。固定サイズの正方形画像を表示する。',
  'thumbnail/item': 'ion-item 内にサムネイルを配置する例。リスト項目のビジュアルとして活用できる。',
  'thumbnail/theming-css-properties': 'CSS カスタムプロパティを使ったサムネイルのスタイルカスタマイズ例。',

  // ─── Menu ─────────────────────────────────────────────────
  'menu/basic': 'サイドメニュー（ion-menu）の基本的な使い方。ツールバーのボタンでメニューを開閉できる。',
  'menu/multiple': '複数のサイドメニューを同一ページに設定する例。左右両側にメニューを持つ UI を確認できる。',
  'menu/sides': 'side プロパティでメニューを左右どちら側に表示するか設定する例。',
  'menu/theming': 'CSS を使ったサイドメニューのスタイルカスタマイズ例。',
  'menu/toggle': 'ion-menu-toggle を使ってメニューの開閉をトグルする例。',
  'menu/type': 'type プロパティでメニューの表示アニメーション（overlay / reveal / push）を切り替える例。',

  // ─── Split Pane ───────────────────────────────────────────
  'split-pane/basic': 'スプリットペイン（ion-split-pane）の基本的な使い方。画面幅に応じてサイドメニューと本文を並列表示する。',
  'split-pane/theming-css-properties': 'CSS カスタムプロパティを使ったスプリットペインの区切り線スタイルカスタマイズ例。',

  // ─── Backdrop ─────────────────────────────────────────────
  'backdrop/basic': 'バックドロップ（ion-backdrop）の基本的な使い方。オーバーレイ背景の表示を確認できる。',
  'backdrop/styling': 'CSS を使ったバックドロップのスタイルカスタマイズ例。',

  // ─── Modal ────────────────────────────────────────────────
  'modal/can-dismiss-boolean': 'canDismiss プロパティを boolean で設定し、モーダルを閉じられるかどうかを制御する例。',
  'modal/can-dismiss-function': 'canDismiss にコールバック関数を設定し、条件付きでモーダルを閉じる制御を実装する例。',
  'modal/can-dismiss-prevent-swipe-to-close': 'スワイプによるモーダルのクローズを無効化する例。canDismiss と組み合わせた設定を確認できる。',
  'modal/card-basic': 'カードスタイルのモーダル（card プレゼンテーション）を表示する例。',
  'modal/custom-dialogs': 'カスタムスタイルのダイアログモーダルを実装する例。',
  'modal/inline-basic': 'trigger 属性を使い、ボタンクリックでインラインモーダルを開くパターン。',
  'modal/inline-is-open': 'isOpen プロパティを使ってモーダルの表示/非表示をリアクティブに制御する例。',
  'modal/performance-mount': 'keepContentsMounted プロパティでモーダルの内容を事前マウントしてパフォーマンスを改善する例。',
  'modal/sheet-auto-height': 'シートモーダルで高さを自動調整する例。コンテンツの量に応じて変化する。',
  'modal/sheet-background-content': 'シートモーダル背後のコンテンツと連動する例。backdropBreakpoint の活用。',
  'modal/sheet-basic': '画面下部から出てくるシートスタイルのモーダルの基本実装例。',
  'modal/sheet-expand-to-scroll': 'シートモーダルでスクロールに応じてモーダルが展開する例。',
  'modal/sheet-handle-behavior': 'シートモーダルのハンドル部分の動作をカスタマイズする例。',
  'modal/styling-animations': 'カスタムアニメーションを使ったモーダルの表示/非表示を実装する例。',
  'modal/styling-theming': 'CSS カスタムプロパティと Shadow Parts を使ったモーダルのスタイルカスタマイズ例。',

  // ─── Popover ──────────────────────────────────────────────
  'popover/customization-positioning': 'side / alignment / arrow プロパティでポップオーバーの表示位置を詳細にカスタマイズする例。',
  'popover/customization-sizing': 'size プロパティでポップオーバーのサイズ（auto / cover）を変更する例。',
  'popover/customization-styling': 'CSS カスタムプロパティと Shadow Parts を使ったポップオーバーのスタイルカスタマイズ例。',
  'popover/nested': 'ポップオーバー内に別のポップオーバーを入れ子にする例。階層型メニューの実装に利用できる。',
  'popover/performance-mount': 'keepContentsMounted プロパティでポップオーバーの内容を事前マウントしてパフォーマンスを改善する例。',
  'popover/presenting-inline-isopen': 'isOpen プロパティを使ってポップオーバーの表示/非表示をリアクティブに制御する例。',
  'popover/presenting-inline-trigger': 'trigger 属性を使い、ボタンクリックでインラインポップオーバーを開くパターン。',

  // ─── Loading ──────────────────────────────────────────────
  'loading/controller': 'loadingController を使ってプログラム的にローディングオーバーレイを表示する例。',
  'loading/inline': 'ion-loading をインラインコンポーネントとして使う例。isOpen でリアクティブに制御する。',
  'loading/spinners': 'type プロパティで各種スピナーアニメーションを切り替える例。',
  'loading/theming': 'CSS カスタムプロパティを使ったローディング表示のスタイルカスタマイズ例。',

  // ─── Progress Bar ─────────────────────────────────────────
  'progress-bar/buffer': 'buffer プロパティでバッファリング進行状況を視覚化するプログレスバーの例。',
  'progress-bar/determinate': '確定値（value）を持つプログレスバーの例。進捗率を数値で制御する。',
  'progress-bar/indeterminate': 'type="indeterminate" で不確定なローディングを表示するプログレスバーの例。',
  'progress-bar/theming-colors': 'color プロパティを使ったプログレスバーの色のカスタマイズ例。',
  'progress-bar/theming-css-properties': 'CSS カスタムプロパティを使ったプログレスバーのスタイルカスタマイズ例。',
  'progress-bar/theming-css-shadow-parts': 'CSS Shadow Parts を使ったプログレスバーの詳細なスタイリング例。',

  // ─── Skeleton Text ────────────────────────────────────────
  'skeleton-text/basic': 'コンテンツ読み込み中のプレースホルダー（ion-skeleton-text）の基本的な使い方。',
  'skeleton-text/theming-css-properties': 'CSS カスタムプロパティを使ったスケルトンテキストのスタイルカスタマイズ例。',

  // ─── Spinner ──────────────────────────────────────────────
  'spinner/basic': 'スピナー（ion-spinner）の基本的な使い方。各種ローディングアニメーションを確認できる。',
  'spinner/theming-colors': 'color プロパティを使ったスピナーの色のカスタマイズ例。',
  'spinner/theming-css-properties': 'CSS カスタムプロパティを使ったスピナーのスタイルカスタマイズ例。',
  'spinner/theming-resizing': 'CSS を使ってスピナーのサイズを変更する例。',

  // ─── Radio ────────────────────────────────────────────────
  'radio/alignment': 'alignment プロパティでラジオボタンとラベルの垂直揃えを変更する例。',
  'radio/basic': 'ラジオグループ（ion-radio-group）とラジオボタン（ion-radio）の基本的な使い方。',
  'radio/empty-selection': '初期値なし（空の選択状態）のラジオグループを設定する例。',
  'radio/helper-error': 'ヘルパーテキストとエラーメッセージをラジオグループに組み合わせる例。',
  'radio/justify': 'justify プロパティでラジオボタンとラベルの水平配置を変更する例。',
  'radio/label-placement': 'labelPlacement プロパティでラベルをラジオボタンの前後・上下に配置する例。',
  'radio/label-wrap': 'ラジオボタンのラベルが長い場合に折り返す動作を確認する例。',
  'radio/theming-colors': 'color プロパティを使ったラジオボタンの色のカスタマイズ例。',
  'radio/theming-css-properties': 'CSS カスタムプロパティを使ったラジオボタンのスタイルカスタマイズ例。',
  'radio/theming-css-shadow-parts': 'CSS Shadow Parts を使ったラジオボタンの詳細なスタイリング例。',
  'radio/using-comparewith': 'compareWith プロパティでオブジェクト値の比較方法をカスタマイズする例。',

  // ─── Range ────────────────────────────────────────────────
  'range/basic': 'スライダー（ion-range）の基本的な使い方。ドラッグして値を調整できる。',
  'range/dual-knobs': 'dualKnobs プロパティで最小値・最大値を両端から設定できるデュアルスライダーの例。',
  'range/ion-change-event': 'ionChange イベントでスライダー値の確定時の変化を検知する例。',
  'range/ion-knob-move-event': 'ionKnobMoveStart / ionKnobMoveEnd イベントでノブのドラッグ開始・終了を検知する例。',
  'range/label-slot': 'label スロットを使ってカスタムラベルをスライダーに追加する例。',
  'range/labels': 'スライダーのラベルをカスタマイズする例。',
  'range/no-visible-label': 'aria-label を使って視覚的ラベルなしでアクセシビリティに対応したスライダーを作る例。',
  'range/pins': 'pin プロパティでドラッグ中に現在値を吹き出し（ピン）で表示する例。',
  'range/slots': 'start / end スロットを使ってスライダーの両端にアイコンやラベルを配置する例。',
  'range/snapping-ticks': 'snaps と ticks プロパティでステップごとに値をスナップさせ目盛りを表示する例。',
  'range/theming-css-properties': 'CSS カスタムプロパティを使ったスライダーのスタイルカスタマイズ例。',
  'range/theming-css-shadow-parts': 'CSS Shadow Parts を使ったスライダーの詳細なスタイリング例。',

  // ─── Refresher ────────────────────────────────────────────
  'refresher/advanced': 'カスタムアニメーションを使った高度なプルトゥリフレッシュの実装例。',
  'refresher/basic': 'プルトゥリフレッシュ（ion-refresher）の基本実装。上に引っ張ってデータを更新する。',
  'refresher/custom-content': 'ion-refresher-content をカスタマイズしてローディング中の表示を変更する例。',
  'refresher/custom-scroll-target': 'スクロールターゲットを指定して独自スクロールコンテナでリフレッシャーを使う例。',
  'refresher/pull-properties': 'pullMin / pullMax / snapbackDuration などのプロパティでプル動作をカスタマイズする例。',

  // ─── Reorder ──────────────────────────────────────────────
  'reorder/basic': 'リスト項目の並び替え（ion-reorder-group / ion-reorder）の基本的な使い方。',
  'reorder/custom-icon': 'リオーダーハンドルのアイコンをカスタムアイコンに変更する例。',
  'reorder/custom-scroll-target': 'カスタムスクロールコンテナで並び替えを使う例。',
  'reorder/reorder-move-event': 'ionItemReorder イベントを使って並び替え後の順序を取得する例。',
  'reorder/reorder-start-end-events': 'ionReorderStart / ionReorderEnd イベントで並び替えの開始・終了を検知する例。',
  'reorder/toggling-disabled': 'disabled プロパティをトグルして並び替えモードのオン/オフを切り替える例。',
  'reorder/updating-data': '並び替え後に完了（complete）メソッドを呼び出してデータを更新する例。',
  'reorder/wrapper': 'ion-reorder-group を ion-list の外でラッパーとして使う例。',

  // ─── Searchbar ────────────────────────────────────────────
  'searchbar/basic': '検索バー（ion-searchbar）の基本的な使い方。テキスト入力とリアルタイム検索を確認できる。',
  'searchbar/cancel-button': 'showCancelButton プロパティでキャンセルボタンの表示タイミングを制御する例。',
  'searchbar/clear-button': 'showClearButton プロパティでクリアボタンの表示タイミングを制御する例。',
  'searchbar/debounce': 'debounce プロパティで ionChange イベントの発火を遅延させてパフォーマンスを改善する例。',
  'searchbar/search-icon': '検索アイコンをカスタムアイコンに変更する例。',
  'searchbar/theming-colors': 'color プロパティを使った検索バーの色のカスタマイズ例。',
  'searchbar/theming-css-properties': 'CSS カスタムプロパティを使った検索バーのスタイルカスタマイズ例。',

  // ─── Segment Button ───────────────────────────────────────
  'segment-button/basic': 'セグメントボタン（ion-segment-button）の基本的な使い方。タブ切り替え UI を確認できる。',
  'segment-button/layout': 'layout プロパティでアイコンとラベルの配置（icon-top / icon-bottom など）を変更する例。',
  'segment-button/theming-css-properties': 'CSS カスタムプロパティを使ったセグメントボタンのスタイルカスタマイズ例。',
  'segment-button/theming-css-shadow-parts': 'CSS Shadow Parts を使ったセグメントボタンの詳細なスタイリング例。',

  // ─── Segment ──────────────────────────────────────────────
  'segment/basic': 'セグメント（ion-segment）の基本的な使い方。ラジオボタングループ型のタブ切り替えを確認できる。',
  'segment/scrollable': 'scrollable プロパティで多数のセグメントを横スクロールで表示する例。',
  'segment/swipeable': 'セグメントをスワイプ操作で切り替える例。swipeGesture プロパティの利用。',
  'segment/theming-colors': 'color プロパティを使ったセグメントの色のカスタマイズ例。',
  'segment/theming-css-properties': 'CSS カスタムプロパティを使ったセグメントのスタイルカスタマイズ例。',

  // ─── Select ───────────────────────────────────────────────
  'select/basic-multiple-selection': '複数選択可能なセレクトボックスの基本実装例。',
  'select/basic-responding-to-interaction': 'ionChange イベントを使ってセレクトボックスの選択変化に応答する例。',
  'select/basic-single-selection': '単一選択セレクトボックス（ion-select）の基本的な使い方。',
  'select/customization-button-text': 'okText / cancelText プロパティで確認・キャンセルボタンのテキストを変更する例。',
  'select/customization-custom-toggle-icons': 'toggleIcon プロパティでセレクトのトグルアイコンをカスタマイズする例。',
  'select/customization-icon-flip-behavior': 'flipIcon プロパティでセレクトが開いたときのアイコン反転動作を制御する例。',
  'select/customization-interface-options': 'interfaceOptions でポップオーバー・アクションシートなど各インターフェースの見た目をカスタマイズする例。',
  'select/customization-styling-select': 'CSS カスタムプロパティと Shadow Parts を使ったセレクトボックスのスタイルカスタマイズ例。',
  'select/fill': 'fill プロパティでセレクトボックスの外観を solid / outline に切り替える例。',
  'select/helper-error': 'ヘルパーテキストとエラーメッセージをセレクトボックスに組み合わせる例。',
  'select/interfaces-action-sheet': 'interface="action-sheet" でアクションシート形式の選択 UI を使う例。',
  'select/interfaces-modal': 'interface="alert" の代わりにモーダル形式で選択肢を表示する例。',
  'select/interfaces-popover': 'interface="popover" でポップオーバー形式の選択 UI を使う例。',
  'select/justify': 'justify プロパティでセレクトラベルと入力エリアの水平配置を変更する例。',
  'select/label-placement': 'labelPlacement プロパティでラベルの配置を変更する例。',
  'select/label-slot': 'label スロットを使ってカスタムラベルをセレクトに挿入する例。',
  'select/no-visible-label': 'aria-label を使って視覚的ラベルなしでアクセシビリティに対応したセレクトを作る例。',
  'select/objects-as-values-multiple-selection': 'オブジェクトを値として使った複数選択セレクトの例。compareWith と組み合わせる。',
  'select/objects-as-values-using-comparewith': 'compareWith プロパティでオブジェクト値の比較方法を定義する例。',
  'select/start-end-slots': 'start / end スロットを使ってセレクトの前後にアイコンやボタンを配置する例。',

  // ─── Tabs ─────────────────────────────────────────────────
  'tabs/basic': 'タブナビゲーション（ion-tabs / ion-tab-bar）の基本的な使い方。タブの切り替えを確認できる。',
  'tabs/select-method': 'select() メソッドを使ってプログラムから特定のタブに切り替える例。',

  // ─── Toast ────────────────────────────────────────────────
  'toast/buttons': 'トースト（ion-toast）にカスタムボタンを追加する例。',
  'toast/icon': 'icon プロパティでトーストにアイコンを表示する例。',
  'toast/inline-basic': 'trigger 属性を使い、ボタンクリックでインライントーストを表示する例。',
  'toast/inline-is-open': 'isOpen プロパティを使ってトーストの表示/非表示をリアクティブに制御する例。',
  'toast/layout': 'layout プロパティでアイコン・テキスト・ボタンの配置スタイルを変更する例。',
  'toast/position-anchor': 'positionAnchor プロパティでトーストの表示位置を特定要素に相対的に調整する例。',
  'toast/presenting-controller': 'toastController を使ってプログラム的にトーストを表示する例。',
  'toast/swipe-gesture': 'swipeGesture プロパティでスワイプでトーストを閉じる操作を有効化する例。',
  'toast/theming': 'CSS カスタムプロパティを使ったトーストのスタイルカスタマイズ例。',

  // ─── Toggle ───────────────────────────────────────────────
  'toggle/alignment': 'alignment プロパティでトグルとラベルの垂直揃えを変更する例。',
  'toggle/basic': 'トグルスイッチ（ion-toggle）の基本的な使い方。オン/オフの切り替えを確認できる。',
  'toggle/helper-error': 'ヘルパーテキストとエラーメッセージをトグルに組み合わせる例。',
  'toggle/justify': 'justify プロパティでトグルとラベルの水平配置を変更する例。',
  'toggle/label-placement': 'labelPlacement プロパティでラベルをトグルの前後・上下に配置する例。',
  'toggle/list': '複数のトグルをリスト（ion-list）内に配置する例。設定画面のような UI を確認できる。',
  'toggle/on-off': 'enableOnOffLabels プロパティでトグルスイッチ上に ON / OFF テキストを表示する例。',
  'toggle/theming-colors': 'color プロパティを使ったトグルの色のカスタマイズ例。',
  'toggle/theming-css-properties': 'CSS カスタムプロパティを使ったトグルのスタイルカスタマイズ例。',
  'toggle/theming-css-shadow-parts': 'CSS Shadow Parts を使ったトグルの詳細なスタイリング例。',

  // ─── Buttons (Toolbar) ────────────────────────────────────
  'buttons/basic': 'ツールバー内のボタングループ（ion-buttons）の基本的な使い方。',
  'buttons/placement': 'start / end / secondary などのスロットを使って ion-buttons の配置を変える例。',
  'buttons/types': 'ツールバーボタンの各種タイプ（ios / md）の外観を確認する例。',

  // ─── Footer ───────────────────────────────────────────────
  'footer/basic': 'フッター（ion-footer）の基本的な使い方。画面下部に固定されるツールバー領域を確認できる。',
  'footer/custom-scroll-target': 'カスタムスクロールターゲットを使ったフッターの設定例。',
  'footer/fade': 'translucent プロパティでフェードエフェクト付きのフッターを作る例（iOS のみ）。',
  'footer/no-border': 'フッターの上部ボーダーを非表示にする例。',
  'footer/translucent': 'translucent プロパティでフッターを半透明にする例（iOS のみ）。',

  // ─── Header ───────────────────────────────────────────────
  'header/basic': 'ヘッダー（ion-header）の基本的な使い方。画面上部に固定されるツールバー領域を確認できる。',
  'header/condense': 'collapse="condense" でスクロール時にヘッダーが小さくなるコンデンスヘッダーの例（iOS のみ）。',
  'header/custom-scroll-target': 'カスタムスクロールターゲットを使ったヘッダーの設定例。',
  'header/fade': 'collapse="fade" でスクロール時にヘッダーがフェードするエフェクトの例。',
  'header/no-border': 'ヘッダーの下部ボーダーを非表示にする例。',
  'header/translucent': 'translucent プロパティでヘッダーを半透明にする例（iOS のみ）。',

  // ─── Title ────────────────────────────────────────────────
  'title/basic': 'ツールバータイトル（ion-title）の基本的な使い方。',
  'title/collapsible-large-title-basic': 'collapsible-large-title（大きなタイトルをスクロールで縮小）の基本的な実装例。',
  'title/collapsible-large-title-buttons': 'コラプシブル大タイトルにボタンを組み合わせる例。',
  'title/theming-css-properties': 'CSS カスタムプロパティを使ったタイトルのスタイルカスタマイズ例。',

  // ─── Toolbar ──────────────────────────────────────────────
  'toolbar/basic': 'ツールバー（ion-toolbar）の基本的な使い方。タイトルやボタンを含む上部バーを確認できる。',
  'toolbar/buttons': 'ツールバーにさまざまなボタンを配置する例。',
  'toolbar/progress-bars': 'ツールバー内にプログレスバーを配置する例。',
  'toolbar/searchbars': 'ツールバー内に検索バーを配置する例。',
  'toolbar/segments': 'ツールバー内にセグメントコントロールを配置する例。',
  'toolbar/theming-colors': 'color プロパティを使ったツールバーの色のカスタマイズ例。',
  'toolbar/theming-css-properties': 'CSS カスタムプロパティを使ったツールバーのスタイルカスタマイズ例。',

  // ─── Text ─────────────────────────────────────────────────
  'text/basic': 'テキスト表示（ion-text）の基本的な使い方。テキストの色や書体のバリエーションを確認できる。',

  // ─── Animations ───────────────────────────────────────────
  'animations/basic': 'Ionic Animations API の基本的な使い方。createAnimation() で要素にアニメーションを適用する例。',
  'animations/before-and-after-hooks': 'beforeAddClass / afterRemoveClass などのフックを使ってアニメーション前後に副作用を実行する例。',
  'animations/chain': 'アニメーションを連鎖（チェーン）させて順番に実行する例。',
  'animations/gesture': 'Ionic Gesture API と連携してジェスチャー操作にアニメーションを連動させる例。',
  'animations/group': '複数のアニメーションを同時に実行するグループアニメーションの例。',
  'animations/keyframes': 'keyframes を使って複数ステップのアニメーションを定義する例。',
  'animations/modal-override': 'モーダルのデフォルトアニメーションをカスタムアニメーションで上書きする例。',
  'animations/preference-based': 'prefers-reduced-motion メディアクエリを考慮してアニメーションを切り替える例。',

  // ─── App ──────────────────────────────────────────────────
  'app/set-focus': 'Ion App の setFocus() メソッドを使ってプログラムからフォーカスを制御する例。',

  // ─── Config ───────────────────────────────────────────────
  'config/mode': 'IonicConfig の mode を "ios" / "md" に切り替えてプラットフォームスタイルを変更する例。',

  // ─── Gestures ─────────────────────────────────────────────
  'gestures/basic': 'Ionic Gestures API の基本的な使い方。カスタムジェスチャーを要素に設定する例。',
  'gestures/double-click': 'ダブルクリック（ダブルタップ）ジェスチャーを検知する例。',

  // ─── Keyboard ─────────────────────────────────────────────
  'keyboard/enterkeyhint': 'enterkeyhint 属性でソフトキーボードの確定ボタンのラベルを変更する例。',
  'keyboard/inputmode': 'inputmode 属性でソフトキーボードの種類（数字・メール・URL など）を指定する例。',

  // ─── Layout ───────────────────────────────────────────────
  'layout/dynamic-font-scaling': 'ダイナミックフォントスケーリングに対応したレイアウト実装の例。',

  // ─── Picker Legacy ────────────────────────────────────────
  'picker-legacy/controller': '旧 Picker API（pickerController）を使ってプログラム的にピッカーを表示する例。',
  'picker-legacy/inline-isOpen': '旧 Picker をインラインコンポーネントとして isOpen で表示制御する例。',
  'picker-legacy/inline-trigger': '旧 Picker を trigger 属性で開くインラインパターン（レガシー API）。',
  'picker-legacy/multiple-column': '旧 Picker で複数カラムを同時に表示する例。',
};

// ============================================================
// Helper: convert component/demo slug → Vue filename
// ============================================================
function slugToFilename(slug) {
  // Convert kebab-case to PascalCase
  return slug
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

// ============================================================
// Injection logic
// ============================================================
const P_STYLE = 'color:var(--ion-color-medium);font-size:14px;margin:0 0 16px';

function injectDescription(content, description) {
  const descTag = `\n      <p style="${P_STYLE}">${description}</p>`;

  // Pattern: <ion-content class="ion-padding">
  const simplePattern = /<ion-content class="ion-padding">/;

  if (simplePattern.test(content)) {
    return content.replace(
      simplePattern,
      `<ion-content class="ion-padding">${descTag}`
    );
  }

  // Fallback: first <ion-content that appears (for complex templates)
  const fallbackPattern = /(<ion-content[^>]*>)/;
  if (fallbackPattern.test(content)) {
    return content.replace(
      fallbackPattern,
      `$1${descTag}`
    );
  }

  // No ion-content found — return unchanged
  return null;
}

// ============================================================
// Main
// ============================================================
import { readdirSync, statSync } from 'fs';

let processed = 0;
let skipped = 0;
let notFound = 0;
let alreadyDone = 0;

const missingDescriptions = [];

for (const [key, description] of Object.entries(descriptions)) {
  const [component, demo] = key.split('/');
  const componentDir = join(demosRoot, component);
  const filename = slugToFilename(demo) + '.vue';
  const filePath = join(componentDir, filename);

  let content;
  try {
    content = readFileSync(filePath, 'utf8');
  } catch (e) {
    console.warn(`[WARN] File not found: ${filePath}`);
    notFound++;
    continue;
  }

  // Check if description already injected
  if (content.includes(P_STYLE)) {
    alreadyDone++;
    continue;
  }

  const updated = injectDescription(content, description);
  if (updated === null) {
    console.warn(`[SKIP] No ion-content found in: ${filePath}`);
    skipped++;
    continue;
  }

  writeFileSync(filePath, updated, 'utf8');
  console.log(`[OK] ${key}`);
  processed++;
}

// Check for any demo files that were NOT in our descriptions map
const allDemoFiles = [];
const dirs = readdirSync(demosRoot);
for (const componentDir of dirs) {
  const dirPath = join(demosRoot, componentDir);
  if (!statSync(dirPath).isDirectory()) continue;
  const files = readdirSync(dirPath);
  for (const file of files) {
    if (file.endsWith('.vue')) {
      allDemoFiles.push({ component: componentDir, file });
    }
  }
}

console.log('\n=== Summary ===');
console.log(`Total demo files:  ${allDemoFiles.length}`);
console.log(`Descriptions written: ${processed}`);
console.log(`Already had description: ${alreadyDone}`);
console.log(`Files not found: ${notFound}`);
console.log(`Skipped (no ion-content): ${skipped}`);

// Find files without descriptions
const unmapped = [];
for (const { component, file } of allDemoFiles) {
  // Convert filename to slug
  const slug = file.replace('.vue', '')
    .replace(/([A-Z])/g, (m, p1, offset) => (offset > 0 ? '-' : '') + p1.toLowerCase())
    .replace(/^-/, '');
  const key = `${component}/${slug}`;
  // Check if file now has description
  const filePath = join(demosRoot, component, file);
  const content = readFileSync(filePath, 'utf8');
  if (!content.includes(P_STYLE)) {
    unmapped.push(key);
  }
}

if (unmapped.length > 0) {
  console.log(`\n[WARN] Files still without description (${unmapped.length}):`);
  for (const key of unmapped) {
    console.log(`  - ${key}`);
  }
} else {
  console.log('\nAll demo files now have descriptions!');
}
