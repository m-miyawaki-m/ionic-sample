<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples" />
        </ion-buttons>
        <ion-title>カバレッジ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p>各コンポーネントの公式ドキュメントと現在のカタログ実装状況の対応表。低優先 (CSS変数・shape等) は省略。</p>

      <div v-for="comp in components" :key="comp.name" class="ion-margin-top">
        <h2>{{ comp.name }}</h2>
        <p>
          <a :href="comp.officialUrl" target="_blank" rel="noopener">公式 ↗</a>
          ・
          <router-link :to="comp.catalogPath">カタログ →</router-link>
        </p>

        <p><strong>✓ 実装済み ({{ comp.implemented.length }})</strong></p>
        <ul>
          <li v-for="f in comp.implemented" :key="f">{{ f }}</li>
        </ul>

        <template v-if="comp.missingHigh.length">
          <p><strong>⚠ 未実装 高優先 ({{ comp.missingHigh.length }})</strong></p>
          <ul>
            <li v-for="f in comp.missingHigh" :key="f">{{ f }}</li>
          </ul>
        </template>

        <template v-if="comp.missingMedium.length">
          <p><strong>— 未実装 中優先 ({{ comp.missingMedium.length }})</strong></p>
          <ul>
            <li v-for="f in comp.missingMedium" :key="f">{{ f }}</li>
          </ul>
        </template>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
} from '@ionic/vue';

type Coverage = {
  name: string;
  catalogPath: string;
  officialUrl: string;
  implemented: string[];
  missingHigh: string[];
  missingMedium: string[];
};

const components: Coverage[] = [
  {
    name: 'Button',
    catalogPath: '/samples/catalog/button',
    officialUrl: 'https://ionicframework.com/docs/api/button',
    implemented: [
      'Color (6色)',
      'Fill (clear/outline/solid)',
      'Sizes (small/default/large)',
      'Expand (block/full)',
      'Disabled',
    ],
    missingHigh: [
      'Icon-only ボタン (slot="icon-only")',
      'アイコン+テキスト (slot="start"/"end")',
      'routerLink によるナビゲーション',
    ],
    missingMedium: [
      'strong (太字)',
      'Color の light/medium/dark',
    ],
  },
  {
    name: 'Input',
    catalogPath: '/samples/catalog/input',
    officialUrl: 'https://ionicframework.com/docs/api/input',
    implemented: [
      'type (text/password/number/tel)',
      'Label Placement (floating/stacked/fixed)',
      'helper-text / error-text',
      'clear-input',
      'counter + maxlength',
    ],
    missingHigh: [
      'fill (solid/outline)',
      'readonly',
      'required + バリデーション (ion-invalid/ion-touched)',
      'type 拡張 (email/url/date/time/datetime-local)',
      'start/end スロット (アイコン・プレフィックス)',
    ],
    missingMedium: [
      'shape="round"',
      'min/max/step (数値バリデーション)',
      'pattern (正規表現)',
      'debounce (ionInput 遅延)',
      'autocomplete / inputmode / enterkeyhint',
    ],
  },
  {
    name: 'List',
    catalogPath: '/samples/catalog/list',
    officialUrl: 'https://ionicframework.com/docs/api/list',
    implemented: [
      'Basic list',
      'lines (full/none)',
      'inset',
      'ion-item + button + detail',
      'ion-list-header',
    ],
    missingHigh: [
      'ion-item-sliding + ion-item-options (スワイプアクション)',
      'ion-reorder-group (ドラッグ並び替え)',
    ],
    missingMedium: [
      'lines="inset" (中間スタイル)',
      'ion-item の start/end スロット活用 (アイコン・バッジ)',
    ],
  },
  {
    name: 'Modal',
    catalogPath: '/samples/catalog/modal',
    officialUrl: 'https://ionicframework.com/docs/api/modal',
    implemented: [
      'Basic Modal (is-open + did-dismiss)',
      'Sheet Modal (breakpoints + initialBreakpoint)',
    ],
    missingHigh: [
      'canDismiss (閉じる前の確認)',
      'modalController による動的生成',
      '別コンポーネントをモーダルに渡すパターン',
    ],
    missingMedium: [
      'Card Modal (presentingElement)',
      'backdropDismiss="false"',
      'backdropBreakpoint (シート背景操作)',
      'keepContentsMounted',
    ],
  },
  {
    name: 'Toast',
    catalogPath: '/samples/catalog/toast',
    officialUrl: 'https://ionicframework.com/docs/api/toast',
    implemented: [
      'Basic (message + duration)',
      'Color (success/warning/danger)',
      'Position (top/middle/bottom)',
      'buttons (Close ボタン付き)',
    ],
    missingHigh: [
      'icon プロパティ',
      'header プロパティ (タイトル+メッセージ)',
      'positionAnchor (要素アンカリング)',
      'インライン <ion-toast :is-open="..."> 記法',
    ],
    missingMedium: [
      'swipeGesture="vertical"',
      'layout="stacked" (ボタンを別行)',
    ],
  },
  {
    name: 'Radio Group',
    catalogPath: '/samples/catalog/radio-group',
    officialUrl: 'https://ionicframework.com/docs/api/radio-group',
    implemented: [
      'Basic (v-model + value)',
      'label-placement (end/start/stacked)',
      'disabled (個別 + グループ全体)',
    ],
    missingHigh: [
      'allow-empty-selection',
      'color (各 ion-radio の色)',
      'helperText / errorText (グループ単位)',
    ],
    missingMedium: [
      'justify (label と radio の配置)',
      'alignment (縦方向の揃え)',
      'compareWith (オブジェクト比較)',
    ],
  },
  {
    name: 'Checkbox',
    catalogPath: '/samples/catalog/checkbox',
    officialUrl: 'https://ionicframework.com/docs/api/checkbox',
    implemented: [
      'Basic (v-model)',
      'Color',
      'label-placement (end/start/stacked)',
      'disabled (unchecked/checked)',
    ],
    missingHigh: [
      'indeterminate 状態',
      'チェックボックスグループ (複数選択リスト)',
      'helperText / errorText',
    ],
    missingMedium: [
      'justify (space-between)',
      'alignment',
      'ラベル内リンク (stopPropagation)',
    ],
  },
  {
    name: 'Toggle',
    catalogPath: '/samples/catalog/toggle',
    officialUrl: 'https://ionicframework.com/docs/api/toggle',
    implemented: [
      'Basic (v-model)',
      'Color',
      'label-placement (end/start/stacked)',
      'disabled (off/on)',
    ],
    missingHigh: [
      'enableOnOffLabels (toggle 内に ON/OFF 文字)',
      'justify="space-between"',
      'helperText / errorText',
    ],
    missingMedium: [
      'alignment',
    ],
  },
  {
    name: 'Select',
    catalogPath: '/samples/catalog/select',
    officialUrl: 'https://ionicframework.com/docs/api/select',
    implemented: [
      'Basic (v-model + ion-select-option)',
      'interface (alert/popover/action-sheet)',
      'multiple (複数選択)',
    ],
    missingHigh: [
      'label-placement (floating/stacked/fixed)',
      'fill (solid/outline)',
      'helperText / errorText',
      'disabled',
      'interface="modal"',
    ],
    missingMedium: [
      'compareWith (オブジェクト比較)',
      'selectedText (表示テキスト上書き)',
      'okText / cancelText (alert ボタンラベル)',
      'start/end スロット',
      'toggleIcon / expandedIcon',
    ],
  },
  {
    name: 'Searchbar',
    catalogPath: '/samples/catalog/searchbar',
    officialUrl: 'https://ionicframework.com/docs/api/searchbar',
    implemented: [
      'Basic (v-model)',
      'placeholder',
      'show-cancel-button (always/focus)',
      'animated',
      'debounce',
    ],
    missingHigh: [
      'ionInput / ionChange イベントハンドリング実演',
      'ionCancel / ionClear イベント',
      'show-clear-button 制御 (always/focus/never)',
    ],
    missingMedium: [
      'enterkeyhint="search"',
      'inputmode="search"',
      'search-icon カスタム',
      'cancel-button-text (日本語化)',
    ],
  },
  {
    name: 'Segment',
    catalogPath: '/samples/catalog/segment',
    officialUrl: 'https://ionicframework.com/docs/api/segment',
    implemented: [
      'Basic (v-model)',
      'color',
      'scrollable',
      'disabled (グループ全体)',
    ],
    missingHigh: [
      'ion-segment-button の layout 変更 (icon-top/icon-start/label-hide)',
      'swipeGesture + ion-segment-content (スワイプ連動)',
      'ツールバー内への配置',
    ],
    missingMedium: [
      'selectOnFocus',
      '個別ボタンの disabled (swipeGesture 無効時)',
    ],
  },
  {
    name: 'Card',
    catalogPath: '/samples/catalog/card',
    officialUrl: 'https://ionicframework.com/docs/api/card',
    implemented: [
      'Basic (ion-card-content のみ)',
      'Header + Title + Subtitle + Content',
      'Card with button (ion-button inside)',
      'Color (primary/secondary/success/danger)',
      'Disabled',
    ],
    missingHigh: [
      'ion-card を button として使う (routerLink / href)',
      'ion-img による画像表示',
    ],
    missingMedium: [
      'ion-item を card 内に配置するパターン',
      'card の ion-ripple-effect',
    ],
  },
  {
    name: 'Badge',
    catalogPath: '/samples/catalog/badge',
    officialUrl: 'https://ionicframework.com/docs/api/badge',
    implemented: [
      'Basic (数値・文字列)',
      'Color (8色)',
      'In list item (slot="end")',
    ],
    missingHigh: [
      'ion-tab-button と組み合わせたタブバッジ',
    ],
    missingMedium: [
      'インライン配置のスタイル調整例',
    ],
  },
  {
    name: 'Chip',
    catalogPath: '/samples/catalog/chip',
    officialUrl: 'https://ionicframework.com/docs/api/chip',
    implemented: [
      'Basic',
      'Color (8色)',
      'Outline',
      'With icon (ion-icon)',
      'With avatar (ion-avatar)',
      'Disabled',
    ],
    missingHigh: [
      'クリックイベントで選択状態を切り替えるフィルターUI',
      'chip 内の閉じるボタン (ionicons close アイコン + クリックで除去)',
    ],
    missingMedium: [
      'chip の動的リスト生成 (v-for)',
    ],
  },
  {
    name: 'Avatar',
    catalogPath: '/samples/catalog/avatar',
    officialUrl: 'https://ionicframework.com/docs/api/avatar',
    implemented: [
      'Basic (img を内包した丸型アバター)',
      'In list item (slot="start")',
      'In chip (ion-chip 内)',
    ],
    missingHigh: [
      '画像読み込み失敗時のフォールバック表示',
      'ion-icon をアバター代わりに使うパターン',
    ],
    missingMedium: [
      'カスタムサイズ (CSS変数 --size)',
    ],
  },
  {
    name: 'Spinner',
    catalogPath: '/samples/catalog/spinner',
    officialUrl: 'https://ionicframework.com/docs/api/spinner',
    implemented: [
      'Basic (デフォルト)',
      'Variants 全8種 (bubbles/circles/crescent/dots/lines/lines-small/lines-sharp/lines-sharp-small)',
      'Color (8色)',
      'Paused',
    ],
    missingHigh: [
      'ion-loading と組み合わせたフルスクリーンローディング',
      'コンテンツ上に重ねる半透明オーバーレイパターン',
    ],
    missingMedium: [
      'カスタムサイズ指定',
    ],
  },
  {
    name: 'Skeleton Text',
    catalogPath: '/samples/catalog/skeleton-text',
    officialUrl: 'https://ionicframework.com/docs/api/skeleton-text',
    implemented: [
      'Basic (幅指定のプレースホルダー)',
      'Animated (ウェーブアニメーション)',
      'In list item (avatar + label スケルトン)',
      'In card (header + content スケルトン)',
    ],
    missingHigh: [
      'v-if で実データとスケルトンを切り替えるパターン',
      'ion-thumbnail を使ったサムネイルスケルトン',
    ],
    missingMedium: [
      'カスタム高さ・角丸指定',
    ],
  },
  {
    name: 'Progress Bar',
    catalogPath: '/samples/catalog/progress-bar',
    officialUrl: 'https://ionicframework.com/docs/api/progress-bar',
    implemented: [
      'Determinate (value 0〜1)',
      'Indeterminate',
      'Buffer (buffer プロパティ)',
      'Color (5色)',
      'Reversed',
    ],
    missingHigh: [
      'v-model で value を動的に変化させるアニメーション例',
      'ツールバー内への配置 (ページ読み込みバー)',
    ],
    missingMedium: [
      'カスタム高さ (CSS変数 --height)',
    ],
  },
  {
    name: 'Alert',
    catalogPath: '/samples/catalog/alert',
    officialUrl: 'https://ionicframework.com/docs/api/alert',
    implemented: [
      'Basic (message + OK ボタン)',
      'With buttons (OK / Cancel)',
      'With inputs (テキスト入力欄)',
      'Multiple buttons (3択以上)',
      'Header + Subheader',
    ],
    missingHigh: [
      'inputs で select / radio / checkbox 型',
      'ボタン handler で入力値を取得するパターン',
      'cssClass でのカスタムスタイリング',
    ],
    missingMedium: [
      'backdropDismiss="false"',
      'animated="false"',
    ],
  },
  {
    name: 'Action Sheet',
    catalogPath: '/samples/catalog/action-sheet',
    officialUrl: 'https://ionicframework.com/docs/api/action-sheet',
    implemented: [
      'Basic',
      'With Header + Subheader',
      'With icons (ionicons 使用)',
      'Destructive button (role: destructive)',
      'Cancel button (role: cancel)',
    ],
    missingHigh: [
      'インライン <ion-action-sheet :is-open="..."> 記法',
      'handler でボタンの選択値を取得するパターン',
    ],
    missingMedium: [
      'cssClass でのカスタムスタイリング',
      'backdropDismiss="false"',
    ],
  },
  {
    name: 'Loading',
    catalogPath: '/samples/catalog/loading',
    officialUrl: 'https://ionicframework.com/docs/api/loading',
    implemented: [
      'Basic (duration で自動閉じ)',
      'With message',
      'Spinner variants (crescent/bubbles/dots)',
      'Custom duration (1秒/3秒)',
      'Translucent',
    ],
    missingHigh: [
      'async 処理完了後に dismiss() で明示的に閉じるパターン',
      'インライン <ion-loading :is-open="..."> 記法',
    ],
    missingMedium: [
      'cssClass でのカスタムスタイリング',
      'showBackdrop="false"',
    ],
  },
  {
    name: 'Popover',
    catalogPath: '/samples/catalog/popover',
    officialUrl: 'https://ionicframework.com/docs/api/popover',
    implemented: [
      'Basic (trigger プロパティ + dismiss-on-select)',
      'Manual control (is-open + event アンカー)',
      'Side (top/bottom 切替)',
      'Translucent',
    ],
    missingHigh: [
      'popoverController による動的生成',
      'ネストされた Popover (サブメニュー)',
    ],
    missingMedium: [
      'alignment (center/start)',
      'keepContentsMounted',
      'reference="trigger" / "event" の違い',
    ],
  },
  {
    name: 'Datetime',
    catalogPath: '/samples/catalog/datetime',
    officialUrl: 'https://ionicframework.com/docs/api/datetime',
    implemented: [
      'Inline datetime (presentation="date-time")',
      'Date only (presentation="date")',
      'Time only (presentation="time")',
      'Min / Max 制約 (min/max プロパティ)',
      'Datetime Button + Modal (ion-datetime-button)',
      'v-model によるバインディング',
    ],
    missingHigh: [
      'prefer-wheel (スクロール式ホイール表示)',
      'highlighted-dates (特定日付のハイライト)',
      'multiple (複数日付選択)',
    ],
    missingMedium: [
      'locale (ロケール指定)',
      'first-day-of-week (週の始まり)',
      'show-default-buttons (確認/キャンセルボタン)',
    ],
  },
  {
    name: 'Range',
    catalogPath: '/samples/catalog/range',
    officialUrl: 'https://ionicframework.com/docs/api/range',
    implemented: [
      'Basic (デフォルト 0〜100)',
      'With label (label プロパティ)',
      'Min / Max / Step (カスタム範囲・刻み)',
      'Snaps + Ticks (スナップ+目盛り)',
      'Pin (ドラッグ中の値バブル)',
      'Dual Knobs (範囲選択)',
      'Color (success/warning/danger)',
    ],
    missingHigh: [
      'ionKnobMoveStart / ionKnobMoveEnd イベント',
      'start/end スロット (アイコン・ラベル装飾)',
    ],
    missingMedium: [
      'activeBarStart (バー開始位置のカスタム)',
      'disabled',
      'color 動的切替デモ',
    ],
  },
];
</script>
