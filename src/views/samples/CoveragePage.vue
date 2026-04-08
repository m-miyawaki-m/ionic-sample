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
      <p>公式 Ionic API インデックス (https://ionicframework.com/docs/api) に掲載されている全コンポーネントの実装状況。</p>
      <p>
        <strong>凡例:</strong>
        ✅ 専用カタログページあり ／
        🔶 親ページに含まれる ／
        ❌ 未実装 ／
        📐 構造/ベース要素 (デモ不要)
      </p>

      <div v-for="cat in categories" :key="cat.name" class="ion-margin-top">
        <h2>{{ cat.name }}</h2>
        <div v-for="item in cat.items" :key="item.apiName" class="ion-margin-bottom">
          <h3>
            {{ statusEmoji(item.status) }}
            {{ item.displayName }}
            <span v-if="item.officialUrl">
              <a :href="item.officialUrl" target="_blank" rel="noopener">公式 ↗</a>
            </span>
            <span v-if="item.catalogPath">
              ・<router-link :to="item.catalogPath">カタログ →</router-link>
            </span>
          </h3>
          <p v-if="item.note">{{ item.note }}</p>
          <template v-if="item.implemented && item.implemented.length">
            <p><strong>✓ 実装済み ({{ item.implemented.length }})</strong></p>
            <ul>
              <li v-for="f in item.implemented" :key="f">{{ f }}</li>
            </ul>
          </template>
          <template v-if="item.missingHigh && item.missingHigh.length">
            <p><strong>⚠ 未実装 高優先 ({{ item.missingHigh.length }})</strong></p>
            <ul>
              <li v-for="f in item.missingHigh" :key="f">{{ f }}</li>
            </ul>
          </template>
          <template v-if="item.missingMedium && item.missingMedium.length">
            <p><strong>— 未実装 中優先 ({{ item.missingMedium.length }})</strong></p>
            <ul>
              <li v-for="f in item.missingMedium" :key="f">{{ f }}</li>
            </ul>
          </template>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
} from '@ionic/vue';

type Status = 'implemented' | 'partial' | 'missing' | 'structural';

type Item = {
  apiName: string;
  displayName: string;
  status: Status;
  officialUrl?: string;
  catalogPath?: string;
  note?: string;
  implemented?: string[];
  missingHigh?: string[];
  missingMedium?: string[];
};

type Category = {
  name: string;
  items: Item[];
};

const statusEmoji = (s: Status): string => ({
  implemented: '✅',
  partial: '🔶',
  missing: '❌',
  structural: '📐',
}[s]);

const categories: Category[] = [
  // ─────────────────────────────────────────
  // 1. Layout 基盤
  // ─────────────────────────────────────────
  {
    name: 'Layout 基盤',
    items: [
      {
        apiName: 'app',
        displayName: 'App',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/app',
        note: 'アプリ全体の root。src/App.vue で使用',
      },
      {
        apiName: 'content',
        displayName: 'Content',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/content',
        note: '全カタログページで使用',
      },
      {
        apiName: 'header',
        displayName: 'Header',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/header',
        note: '全カタログページで使用',
      },
      {
        apiName: 'footer',
        displayName: 'Footer',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/footer',
        catalogPath: '/samples/catalog/footer',
        implemented: [
          'Basic footer (画面下部固定ツールバー)',
          'Translucent footer (:translucent="true")',
          'Fade on Scroll (collapse="fade") の説明',
          'キャンセル/確定ボタン配置の実例',
        ],
        missingHigh: [
          'collapse="fade" の実動作デモ (scroll-events 連動)',
        ],
        missingMedium: [
          'カスタムCSS変数でのスタイリング',
        ],
      },
      {
        apiName: 'title',
        displayName: 'Title',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/title',
        note: '全ページのヘッダーで使用',
      },
      {
        apiName: 'toolbar',
        displayName: 'Toolbar',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/toolbar',
        note: '全ページで使用',
      },
      {
        apiName: 'buttons',
        displayName: 'Buttons',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/buttons',
        note: 'header/footer 内で使用',
      },
      {
        apiName: 'back-button',
        displayName: 'Back Button',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/back-button',
        note: '全カタログページの戻るボタンで使用',
      },
    ],
  },

  // ─────────────────────────────────────────
  // 2. Navigation
  // ─────────────────────────────────────────
  {
    name: 'Navigation',
    items: [
      {
        apiName: 'router',
        displayName: 'Router',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/router',
        note: '@ionic/vue-router の Vue Router バインディング。src/router/index.ts で構成',
      },
      {
        apiName: 'router-link',
        displayName: 'Router Link',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/router-link',
        note: 'Vue Router 由来。CatalogIndex 等で使用',
      },
      {
        apiName: 'router-outlet',
        displayName: 'Router Outlet',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/router-outlet',
        note: 'App.vue / TabsLayoutPage で使用',
      },
      {
        apiName: 'route',
        displayName: 'Route',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/route',
        note: 'Vue Router 構成要素',
      },
      {
        apiName: 'route-redirect',
        displayName: 'Route Redirect',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/route-redirect',
        note: 'Vue Router 構成要素',
      },
      {
        apiName: 'nav',
        displayName: 'Nav',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/nav',
        catalogPath: '/samples/catalog/nav',
        implemented: [
          'ion-nav + root コンポーネント指定',
          'nav.push(Component, params) によるスタック遷移',
          'nav.pop() による戻り遷移',
          'ion-nav-link による宣言的遷移',
          'inject で navRef を子コンポーネントに渡すパターン',
        ],
        missingHigh: [
          'nav.setRoot() でルートを差し替えるパターン',
          'animated="false" での遷移無効化',
        ],
        missingMedium: [
          'swipe-back ジェスチャーのデモ',
        ],
      },
      {
        apiName: 'nav-link',
        displayName: 'Nav Link',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/nav-link',
        catalogPath: '/samples/catalog/nav',
        note: 'NavPage (NavRoot) 内で使用',
      },
      {
        apiName: 'tabs',
        displayName: 'Tabs',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/tabs',
        catalogPath: '/samples/catalog/tabs',
        implemented: [
          'ion-tabs + ion-router-outlet (ネスト routing)',
          'ion-tab-bar slot="bottom"',
          'ion-tab-button (icon + label)',
          '3 サブページ間の遷移',
          'デフォルトリダイレクト (/tabs → /tabs/tab1)',
        ],
        missingHigh: [
          '上部タブバー (slot="top")',
          'タブバッジ (ion-tab-button + ion-badge)',
        ],
        missingMedium: [
          'layout 切替 (icon-top/icon-start)',
          'タブごとの履歴管理',
        ],
      },
      {
        apiName: 'tab',
        displayName: 'Tab',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/tab',
        catalogPath: '/samples/catalog/tabs',
        note: 'TabsLayoutPage 内で使用',
      },
      {
        apiName: 'tab-bar',
        displayName: 'Tab Bar',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/tab-bar',
        catalogPath: '/samples/catalog/tabs',
        note: 'TabsLayoutPage 内で使用',
      },
      {
        apiName: 'tab-button',
        displayName: 'Tab Button',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/tab-button',
        catalogPath: '/samples/catalog/tabs',
        note: 'TabsLayoutPage 内で使用',
      },
      {
        apiName: 'menu',
        displayName: 'Menu',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/menu',
        catalogPath: '/samples/catalog/menu',
        implemented: [
          'ion-menu (side drawer)',
          'ion-menu-toggle (タップで自動閉じる)',
          'ion-menu-button (ハンバーガー)',
          '複数サブページ間の遷移',
          '再利用可能なメニューコンポーネント',
        ],
        missingHigh: [
          'ion-split-pane (タブレットでメニュー常時表示)',
          'side="end" (右側ドロワー)',
          'menu type (overlay/reveal/push)',
        ],
        missingMedium: [
          '動的にメニュー項目を生成',
          'menuController によるプログラマティック制御',
        ],
      },
      {
        apiName: 'menu-button',
        displayName: 'Menu Button',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/menu-button',
        catalogPath: '/samples/catalog/menu',
        note: 'MenuHomePage 等で使用',
      },
      {
        apiName: 'menu-toggle',
        displayName: 'Menu Toggle',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/menu-toggle',
        catalogPath: '/samples/catalog/menu',
        note: 'CatalogMenu 内で使用',
      },
      {
        apiName: 'split-pane',
        displayName: 'Split Pane',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/split-pane',
        catalogPath: '/samples/catalog/split-pane',
        implemented: [
          'ion-split-pane + ion-menu の2ペインレイアウト',
          'when="md" ブレークポイント指定',
          'content-id / id のペアリング',
          'メニュー項目の選択状態連動',
          'when プロパティの各ブレークポイント説明',
        ],
        missingHigh: [
          ':when="false"/:when="true" による動的切替デモ',
          'カスタムメディアクエリ指定 (when="(min-width: 1000px)")',
        ],
        missingMedium: [
          'ionSplitPaneVisible イベントでの状態検知',
        ],
      },
      {
        apiName: 'breadcrumbs',
        displayName: 'Breadcrumbs',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/breadcrumbs',
        catalogPath: '/samples/catalog/breadcrumbs',
        implemented: [
          '3階層パンくず (ion-breadcrumbs + ion-breadcrumb)',
          'router-link によるジャンプ',
          '実ルート遷移と連動',
        ],
        missingHigh: [
          'カスタムセパレータ (slot="separator")',
          'maxItems (省略表示)',
        ],
        missingMedium: [
          'アイコン入りパンくず',
          'カラー変更',
        ],
      },
      {
        apiName: 'breadcrumb',
        displayName: 'Breadcrumb',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/breadcrumb',
        catalogPath: '/samples/catalog/breadcrumbs',
        note: 'BreadcrumbsLevel*Page 内で使用',
      },
    ],
  },

  // ─────────────────────────────────────────
  // 3. List & Item
  // ─────────────────────────────────────────
  {
    name: 'List & Item',
    items: [
      {
        apiName: 'list',
        displayName: 'List',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/list',
        catalogPath: '/samples/catalog/list',
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
        apiName: 'list-header',
        displayName: 'List Header',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/list-header',
        catalogPath: '/samples/catalog/list',
        note: 'ListPage 内で使用',
      },
      {
        apiName: 'item',
        displayName: 'Item',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/item',
        note: 'ほぼ全カタログページで使用される基本要素',
      },
      {
        apiName: 'item-divider',
        displayName: 'Item Divider',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/item-divider',
        catalogPath: '/samples/catalog/item-divider',
        implemented: [
          'Basic グループ区切り (ion-item-group + ion-item-divider)',
          'Sticky dividers (:sticky="true")',
          'Color 変化 (primary/warning/success)',
          '倉庫ロケーション例 (ゾーン別グループ)',
        ],
        missingHigh: [
          'slot="start"/"end" によるアイコン・バッジ付きディバイダー',
        ],
        missingMedium: [
          '動的グループ生成 (v-for + グループ化ロジック)',
        ],
      },
      {
        apiName: 'item-group',
        displayName: 'Item Group',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/item-group',
        catalogPath: '/samples/catalog/item-divider',
        note: 'ItemDividerPage 内で使用',
      },
      {
        apiName: 'item-sliding',
        displayName: 'Item Sliding',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/item-sliding',
        catalogPath: '/samples/catalog/item-sliding',
        implemented: [
          'Basic (左スワイプ + 削除アクション)',
          '複数オプション (3ボタン構成)',
          'アイコンのみオプション (slot="icon-only")',
          '両サイドオプション (side="start" + side="end")',
          '削除後の配列更新 (reactiveなリスト管理)',
        ],
        missingHigh: [
          'ion-item-sliding の open() / close() メソッド呼び出し',
          'expandable オプション (全展開スワイプ)',
        ],
        missingMedium: [
          'ionDrag イベント (スワイプ量の取得)',
          'disabled での無効化',
        ],
      },
      {
        apiName: 'item-options',
        displayName: 'Item Options',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/item-options',
        catalogPath: '/samples/catalog/item-sliding',
        note: 'ItemSlidingPage 内で使用',
      },
      {
        apiName: 'item-option',
        displayName: 'Item Option',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/item-option',
        catalogPath: '/samples/catalog/item-sliding',
        note: 'ItemSlidingPage 内で使用',
      },
      {
        apiName: 'label',
        displayName: 'Label',
        status: 'structural',
        officialUrl: 'https://ionicframework.com/docs/api/label',
        note: 'ほぼ全カタログページで使用される基本要素',
      },
      {
        apiName: 'note',
        displayName: 'Note',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/note',
        catalogPath: '/samples/catalog/note',
        implemented: [
          'Basic (スタンドアロン補足テキスト)',
          'In list item (slot="end" カウント表示)',
          'Color 変化 (primary/success/warning/danger/medium)',
          'Inside ion-item helper text (label 内の補助説明)',
        ],
        missingHigh: [
          'フォームエラー表示との組み合わせパターン',
        ],
        missingMedium: [
          'カスタムフォントサイズ指定',
        ],
      },
      {
        apiName: 'reorder',
        displayName: 'Reorder',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/reorder',
        catalogPath: '/samples/catalog/reorder',
        implemented: [
          'Basic (ハンドル右端 slot="end")',
          'ハンドル左端 (slot="start")',
          'disabled による動的有効/無効切替',
          '@ionReorder + event.detail.complete() で配列更新',
        ],
        missingHigh: [
          'カスタムドラッグハンドルアイコン (ion-icon 使用)',
          'ion-item-sliding との組み合わせ',
        ],
        missingMedium: [
          'ionItemReorder イベントの詳細情報活用 (from/to インデックス)',
        ],
      },
      {
        apiName: 'reorder-group',
        displayName: 'Reorder Group',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/reorder-group',
        catalogPath: '/samples/catalog/reorder',
        note: 'ReorderPage 内で使用',
      },
    ],
  },

  // ─────────────────────────────────────────
  // 4. Form Input
  // ─────────────────────────────────────────
  {
    name: 'Form Input',
    items: [
      {
        apiName: 'input',
        displayName: 'Input',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/input',
        catalogPath: '/samples/catalog/input',
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
        apiName: 'input-password-toggle',
        displayName: 'Input Password Toggle',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/input-password-toggle',
        catalogPath: '/samples/catalog/input',
        note: 'InputPage 内で使用',
      },
      {
        apiName: 'input-otp',
        displayName: 'Input OTP',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/input-otp',
        catalogPath: '/samples/catalog/input-otp',
        implemented: [
          'Basic (4桁 OTP + 再送リンクスロット)',
          'length (4桁/6桁)',
          'type (number/text)',
          'size (small/medium/large)',
          'disabled / readonly',
        ],
        missingHigh: [
          'v-model によるバインディングと値取得',
          'ionComplete イベント (入力完了時)',
        ],
        missingMedium: [
          'fill (outline/solid) スタイル',
          'color プロパティ',
        ],
      },
      {
        apiName: 'textarea',
        displayName: 'Textarea',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/textarea',
        catalogPath: '/samples/catalog/textarea',
        implemented: [
          'Basic (regular/readonly/disabled)',
          'Label Placement (floating/stacked/fixed)',
          'Auto Grow (:auto-grow="true")',
          'Helper / Error Text',
          'Counter + Maxlength + counter-formatter',
          'Rows / Cols (初期サイズ指定)',
        ],
        missingHigh: [
          'fill (solid/outline)',
          'required + バリデーション (ion-invalid/ion-touched)',
        ],
        missingMedium: [
          'debounce (ionInput 遅延)',
          'shape="round"',
        ],
      },
      {
        apiName: 'checkbox',
        displayName: 'Checkbox',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/checkbox',
        catalogPath: '/samples/catalog/checkbox',
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
        apiName: 'toggle',
        displayName: 'Toggle',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/toggle',
        catalogPath: '/samples/catalog/toggle',
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
        apiName: 'radio',
        displayName: 'Radio',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/radio',
        catalogPath: '/samples/catalog/radio-group',
        note: 'RadioGroupPage 内で使用',
      },
      {
        apiName: 'radio-group',
        displayName: 'Radio Group',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/radio-group',
        catalogPath: '/samples/catalog/radio-group',
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
        apiName: 'select',
        displayName: 'Select',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/select',
        catalogPath: '/samples/catalog/select',
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
        apiName: 'select-option',
        displayName: 'Select Option',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/select-option',
        catalogPath: '/samples/catalog/select',
        note: 'SelectPage 内で使用',
      },
      {
        apiName: 'range',
        displayName: 'Range',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/range',
        catalogPath: '/samples/catalog/range',
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
      {
        apiName: 'datetime',
        displayName: 'Datetime',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/datetime',
        catalogPath: '/samples/catalog/datetime',
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
        apiName: 'datetime-button',
        displayName: 'Datetime Button',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/datetime-button',
        catalogPath: '/samples/catalog/datetime',
        note: 'DatetimePage 内で使用',
      },
      {
        apiName: 'picker',
        displayName: 'Picker',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/picker',
        catalogPath: '/samples/catalog/picker',
        implemented: [
          'Basic 単一列 (ion-picker-column + ion-picker-column-option)',
          'Prefix / Suffix スロット (単位ラベル)',
          '複数列 (時刻ホイール)',
          'Modal 内 Picker (ion-modal + Done/Cancel ボタン)',
        ],
        missingHigh: [
          'v-model で picker 値をフォームと連携するパターン',
          'disabled (特定 option の無効化以外のグループ無効)',
        ],
        missingMedium: [
          'カスタムスタイリング (CSS変数)',
        ],
      },
      {
        apiName: 'picker-column',
        displayName: 'Picker Column',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/picker-column',
        catalogPath: '/samples/catalog/picker',
        note: 'PickerPage 内で使用',
      },
      {
        apiName: 'picker-column-option',
        displayName: 'Picker Column Option',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/picker-column-option',
        catalogPath: '/samples/catalog/picker',
        note: 'PickerPage 内で使用',
      },
      {
        apiName: 'picker-legacy',
        displayName: 'Picker Legacy',
        status: 'missing',
        officialUrl: 'https://ionicframework.com/docs/api/picker-legacy',
        note: 'Ionic 8 で非推奨。新版の picker を使用',
      },
      {
        apiName: 'searchbar',
        displayName: 'Searchbar',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/searchbar',
        catalogPath: '/samples/catalog/searchbar',
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
        apiName: 'segment',
        displayName: 'Segment',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/segment',
        catalogPath: '/samples/catalog/segment',
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
        apiName: 'segment-button',
        displayName: 'Segment Button',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/segment-button',
        catalogPath: '/samples/catalog/segment',
        note: 'SegmentPage 内で使用',
      },
      {
        apiName: 'segment-content',
        displayName: 'Segment Content',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/segment-content',
        catalogPath: '/samples/catalog/segment',
        note: 'SegmentPage 内で使用',
      },
      {
        apiName: 'segment-view',
        displayName: 'Segment View',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/segment-view',
        catalogPath: '/samples/catalog/segment',
        note: 'SegmentPage 内で使用',
      },
      {
        apiName: 'accordion',
        displayName: 'Accordion',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/accordion',
        catalogPath: '/samples/catalog/accordion',
        implemented: [
          'Basic (シングル展開 + value)',
          'Multiple (複数同時展開 :multiple="true")',
          'Inset (:inset="true" カード型)',
          'Disabled accordion (:disabled="true")',
          'デフォルト展開状態 (value プロパティ)',
        ],
        missingHigh: [
          'ionChange イベントで展開状態を取得',
          'expand="inset" の動的切替',
        ],
        missingMedium: [
          'header slot のカスタムコンテンツ (アイコン付き)',
          'readonly (読み取り専用)',
        ],
      },
      {
        apiName: 'accordion-group',
        displayName: 'Accordion Group',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/accordion-group',
        catalogPath: '/samples/catalog/accordion',
        note: 'AccordionPage 内で使用',
      },
    ],
  },

  // ─────────────────────────────────────────
  // 5. Buttons & FAB
  // ─────────────────────────────────────────
  {
    name: 'Buttons & FAB',
    items: [
      {
        apiName: 'button',
        displayName: 'Button',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/button',
        catalogPath: '/samples/catalog/button',
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
        apiName: 'ripple-effect',
        displayName: 'Ripple Effect',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/ripple-effect',
        catalogPath: '/samples/catalog/ripple-effect',
        implemented: [
          'Basic bounded (ion-activatable + overflow: hidden)',
          'Unbounded (type="unbounded" + ripple-parent)',
          'カスタムカラー (--ripple-color CSS変数)',
          'ion-item 内での自動適用説明',
        ],
        missingHigh: [
          'addRipple() メソッドによるプログラマティック波紋',
        ],
        missingMedium: [
          'カスタムサイズ指定',
        ],
      },
      {
        apiName: 'fab',
        displayName: 'FAB',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/fab',
        catalogPath: '/samples/catalog/fab',
        implemented: [
          'Basic (slot="fixed" による固定表示)',
          'FAB List (サブボタン展開 side="top")',
          'トグル制御 (@click で fabOpen 管理)',
          'Positions (vertical/horizontal バリエーション説明)',
          'Color Variants (7色の小型 FAB)',
          'Edge mode の説明',
        ],
        missingHigh: [
          'Edge mode の実動作デモ (vertical="top" + edge)',
          'FAB List の side="start"/"end"/"bottom" バリエーション',
        ],
        missingMedium: [
          'activated プロパティによる展開状態の外部制御',
          'ion-fab の close() メソッド呼び出し',
        ],
      },
      {
        apiName: 'fab-button',
        displayName: 'FAB Button',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/fab-button',
        catalogPath: '/samples/catalog/fab',
        note: 'FabPage 内で使用',
      },
      {
        apiName: 'fab-list',
        displayName: 'FAB List',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/fab-list',
        catalogPath: '/samples/catalog/fab',
        note: 'FabPage 内で使用',
      },
    ],
  },

  // ─────────────────────────────────────────
  // 6. Display & Media
  // ─────────────────────────────────────────
  {
    name: 'Display & Media',
    items: [
      {
        apiName: 'icon',
        displayName: 'Icon',
        status: 'missing',
        officialUrl: 'https://ionicframework.com/docs/api/icon',
        note: 'ionicons/icons ライブラリ。多くのカタログページで間接的に使用',
      },
      {
        apiName: 'badge',
        displayName: 'Badge',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/badge',
        catalogPath: '/samples/catalog/badge',
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
        apiName: 'chip',
        displayName: 'Chip',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/chip',
        catalogPath: '/samples/catalog/chip',
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
        apiName: 'avatar',
        displayName: 'Avatar',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/avatar',
        catalogPath: '/samples/catalog/avatar',
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
        apiName: 'img',
        displayName: 'Img',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/img',
        catalogPath: '/samples/catalog/img',
        implemented: [
          'Basic (遅延読込 Intersection Observer)',
          'Lazy load デモ (複数枚スクロール)',
          'エラーハンドリング (@ionError)',
          'イベント (@ionImgWillLoad / @ionImgDidLoad)',
          'Alt テキスト',
        ],
        missingHigh: [
          'srcset / sizes によるレスポンシブ画像',
        ],
        missingMedium: [
          'ion-thumbnail 内での使用デモ (単独)',
        ],
      },
      {
        apiName: 'thumbnail',
        displayName: 'Thumbnail',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/thumbnail',
        catalogPath: '/samples/catalog/thumbnail',
        implemented: [
          'Basic (slot="start" リスト項目サムネイル)',
          'With ion-img inside (遅延読込サムネイル)',
          'サイズ変更 (--size CSS変数)',
        ],
        missingHigh: [
          'ion-card 内でのサムネイル表示',
        ],
        missingMedium: [
          '角丸カスタマイズ (--border-radius)',
        ],
      },
      {
        apiName: 'text',
        displayName: 'Text',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/text',
        catalogPath: '/samples/catalog/text',
        implemented: [
          'Color 変化 (全9テーマカラー)',
          '見出し要素 (h1〜h4) への色適用',
          '段落内インライン使用',
          'フォームバリデーションメッセージ実用例',
        ],
        missingHigh: [
          'タイポグラフィクラス (ion-text-wrap 等) との組み合わせ',
        ],
        missingMedium: [
          'カスタム CSS 変数による文字色・フォント指定',
        ],
      },
      {
        apiName: 'card',
        displayName: 'Card',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/card',
        catalogPath: '/samples/catalog/card',
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
        apiName: 'card-header',
        displayName: 'Card Header',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/card-header',
        catalogPath: '/samples/catalog/card',
        note: 'CardPage 内で使用',
      },
      {
        apiName: 'card-title',
        displayName: 'Card Title',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/card-title',
        catalogPath: '/samples/catalog/card',
        note: 'CardPage 内で使用',
      },
      {
        apiName: 'card-subtitle',
        displayName: 'Card Subtitle',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/card-subtitle',
        catalogPath: '/samples/catalog/card',
        note: 'CardPage 内で使用',
      },
      {
        apiName: 'card-content',
        displayName: 'Card Content',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/card-content',
        catalogPath: '/samples/catalog/card',
        note: 'CardPage 内で使用',
      },
    ],
  },

  // ─────────────────────────────────────────
  // 7. Status Indicator
  // ─────────────────────────────────────────
  {
    name: 'Status Indicator',
    items: [
      {
        apiName: 'spinner',
        displayName: 'Spinner',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/spinner',
        catalogPath: '/samples/catalog/spinner',
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
        apiName: 'skeleton-text',
        displayName: 'Skeleton Text',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/skeleton-text',
        catalogPath: '/samples/catalog/skeleton-text',
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
        apiName: 'progress-bar',
        displayName: 'Progress Bar',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/progress-bar',
        catalogPath: '/samples/catalog/progress-bar',
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
    ],
  },

  // ─────────────────────────────────────────
  // 8. Overlay
  // ─────────────────────────────────────────
  {
    name: 'Overlay',
    items: [
      {
        apiName: 'modal',
        displayName: 'Modal',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/modal',
        catalogPath: '/samples/catalog/modal',
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
        apiName: 'popover',
        displayName: 'Popover',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/popover',
        catalogPath: '/samples/catalog/popover',
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
        apiName: 'alert',
        displayName: 'Alert',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/alert',
        catalogPath: '/samples/catalog/alert',
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
        apiName: 'action-sheet',
        displayName: 'Action Sheet',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/action-sheet',
        catalogPath: '/samples/catalog/action-sheet',
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
        apiName: 'loading',
        displayName: 'Loading',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/loading',
        catalogPath: '/samples/catalog/loading',
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
        apiName: 'toast',
        displayName: 'Toast',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/toast',
        catalogPath: '/samples/catalog/toast',
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
        apiName: 'backdrop',
        displayName: 'Backdrop',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/backdrop',
        catalogPath: '/samples/catalog/backdrop',
        implemented: [
          'Basic (:visible + @ionBackdropTap)',
          'Non-tappable (:tappable="false" + 自動消去)',
          'stop-propagation="false" (クリックスルー)',
          'スタイルカスタマイズ (--backdrop-opacity + background)',
          '内部使用コンポーネント一覧の説明',
        ],
        missingHigh: [
          'z-index / 重ね順の制御デモ',
        ],
        missingMedium: [
          'カスタムオーバーレイとの組み合わせ実装例',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 9. Data Loading
  // ─────────────────────────────────────────
  {
    name: 'Data Loading',
    items: [
      {
        apiName: 'refresher',
        displayName: 'Refresher',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/refresher',
        catalogPath: '/samples/catalog/refresher',
        implemented: [
          'Basic pull-to-refresh (ionRefresh + complete())',
          'リスト更新デモ (アイテム差し替え)',
          '更新回数カウンター表示',
          'disabled による有効/無効切替',
          'pullingText / refreshingText の説明',
        ],
        missingHigh: [
          'pullingText / refreshingText の実動作デモ',
          'pullingIcon カスタムアイコンデモ',
          '複数 ion-content 内での refresher 使用',
        ],
        missingMedium: [
          'closeDuration / snapbackDuration の調整',
          'pullFactor (引き下げ倍率)',
        ],
      },
      {
        apiName: 'refresher-content',
        displayName: 'Refresher Content',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/refresher-content',
        catalogPath: '/samples/catalog/refresher',
        note: 'RefresherPage 内で使用',
      },
      {
        apiName: 'infinite-scroll',
        displayName: 'Infinite Scroll',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/infinite-scroll',
        catalogPath: '/samples/catalog/infinite-scroll',
        implemented: [
          'Basic infinite scroll (ionInfinite + complete())',
          'Threshold指定 ("100px")',
          ':disabled による自動無効化 (全件完了後)',
          'loading-text / loading-spinner のカスタマイズ',
          'Position / Disabled の説明',
        ],
        missingHigh: [
          'position="top" の実動作デモ (チャット履歴遡り)',
          'infinite-scroll の complete() 後の再有効化パターン',
        ],
        missingMedium: [
          'ionInfiniteScroll の getScrollElement() 活用',
        ],
      },
      {
        apiName: 'infinite-scroll-content',
        displayName: 'Infinite Scroll Content',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/infinite-scroll-content',
        catalogPath: '/samples/catalog/infinite-scroll',
        note: 'InfiniteScrollPage 内で使用',
      },
    ],
  },

  // ─────────────────────────────────────────
  // 10. Grid
  // ─────────────────────────────────────────
  {
    name: 'Grid',
    items: [
      {
        apiName: 'grid',
        displayName: 'Grid',
        status: 'implemented',
        officialUrl: 'https://ionicframework.com/docs/api/grid',
        catalogPath: '/samples/catalog/grid',
        implemented: [
          'Basic 2・3・4カラムグリッド (size="6/4/3")',
          '異なる幅のカラム (size カスタム組み合わせ)',
          'レスポンシブ (size-md / size-lg ブレークポイント)',
          'Offset (offset="2" などのカラムずらし)',
          'Fixed Grid (fixed 属性)',
          'No Padding (ion-no-padding クラス)',
        ],
        missingHigh: [
          'ion-row の align-items / justify-content (縦・横揃え)',
          'push / pull (カラム順序変更)',
        ],
        missingMedium: [
          'size-xs / size-sm のブレークポイント詳細',
          'ion-grid の --ion-grid-columns でカラム数変更',
        ],
      },
      {
        apiName: 'row',
        displayName: 'Row',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/row',
        catalogPath: '/samples/catalog/grid',
        note: 'GridPage 内で使用',
      },
      {
        apiName: 'col',
        displayName: 'Col',
        status: 'partial',
        officialUrl: 'https://ionicframework.com/docs/api/col',
        catalogPath: '/samples/catalog/grid',
        note: 'GridPage 内で使用',
      },
    ],
  },
];
</script>
