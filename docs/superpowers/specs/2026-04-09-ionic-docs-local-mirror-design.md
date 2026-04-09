# ionic-docs ローカル再現 設計仕様書

## 概要

Ionic Framework 公式ドキュメント (ionic-team/ionic-docs) のコンポーネントサンプル集を、
本プロジェクト内に Vue 3 + Ionic Vue で完全再現する。
オフライン環境で動作し、外部リンク・外部画像への依存をゼロにする。

## スコープ

- ionic-docs `static/usage/v8/` の全 70 コンポーネント、400+ サブデモを移植
- サイドバーナビゲーションを ionic-docs と同じカテゴリ構成で実装
- 各デモはライブプレビュー + Vue ソースコード表示
- 画像はローカル SVG プレースホルダーに置換
- 既存 `/samples/catalog/` を全面刷新（既存ページは削除）

## アーキテクチャ

### ナビゲーション構造

```
/samples/catalog/                    ← ion-split-pane レイアウト
├── サイドバー (ion-menu)             ← 28カテゴリのアコーディオン
│   ├── Accordion
│   │   ├── basic
│   │   ├── customization
│   │   └── ...
│   ├── Action Sheet
│   │   ├── controller
│   │   └── ...
│   └── ... (70 コンポーネント)
└── メインエリア (ion-router-outlet)
    └── デモページ
```

### レイアウトコンポーネント

#### CatalogLayout.vue

`ion-split-pane` + `ion-menu` のシェルコンポーネント。

```
┌────────────────────────────────────────────────┐
│ Header: コンポーネントカタログ        [≡ menu] │
├──────────┬─────────────────────────────────────┤
│ Sidebar  │ Main Content                        │
│          │                                     │
│ ▼ Accordion │  Breadcrumb: Catalog > Button > Basic │
│   basic  │                                     │
│   custom │  ┌─ Live Preview ──────────────────┐│
│   ...    │  │  (実際に動くコンポーネント)       ││
│ ▼ Button │  └─────────────────────────────────┘│
│   basic  │                                     │
│   expand │  ┌─ Source Code ───────────────────┐│
│   fill   │  │  <template>                     ││
│   ...    │  │    <ion-button>Default</...>     ││
│          │  └─────────────────────────────────┘│
└──────────┴─────────────────────────────────────┘
```

- デスクトップ (992px+): サイドバー常時表示
- モバイル: ハンバーガーメニューでドロワー表示

#### CatalogSidebar.vue

`ion-accordion-group` で 28 カテゴリをツリー表示。

- カテゴリ名クリックでアコーディオン展開
- コンポーネント名クリックで `basic` サブデモに遷移
- サブデモ名クリックで該当デモに遷移
- 現在のページをハイライト

### デモページ構成

#### DemoPage.vue (共通テンプレート)

各サブデモページは以下の統一構成:

1. **パンくず**: カタログ > {Component} > {Demo}
2. **ライブプレビュー**: 実際に動くコンポーネント (スロットで差し込み)
3. **ソースコード表示**: `<pre><code>` でそのデモの Vue テンプレート/スクリプトを表示

#### 個別デモコンポーネント

各サブデモは独立した Vue SFC として実装:

```
src/views/samples/catalog/
├── CatalogLayout.vue          ← シェル (split-pane + menu)
├── CatalogSidebar.vue         ← サイドバー
├── CatalogWelcome.vue         ← /samples/catalog/ のランディング
├── demos/
│   ├── accordion/
│   │   ├── AccordionBasic.vue
│   │   ├── AccordionCustomization.vue
│   │   ├── AccordionDisable.vue
│   │   └── ...
│   ├── action-sheet/
│   │   ├── ActionSheetController.vue
│   │   ├── ActionSheetInline.vue
│   │   └── ...
│   ├── button/
│   │   ├── ButtonBasic.vue
│   │   ├── ButtonExpand.vue
│   │   ├── ButtonFill.vue
│   │   └── ...
│   └── ... (70 ディレクトリ)
```

### ルーティング

```typescript
// パターン: /samples/catalog/:component/:demo
{
  path: '/samples/catalog',
  component: CatalogLayout,
  children: [
    { path: '', component: CatalogWelcome },
    { path: 'accordion/basic', component: () => import('./demos/accordion/AccordionBasic.vue') },
    { path: 'accordion/customization', component: () => import('./demos/accordion/AccordionCustomization.vue') },
    // ... 400+ routes (lazy import)
  ]
}
```

全ルートは動的インポートで遅延読み込み。

### サイドバーデータ

カテゴリ・コンポーネント・サブデモの定義を1ファイルに集約:

```typescript
// src/views/samples/catalog/catalog-data.ts
export type SubDemo = { name: string; slug: string };
export type Component = { name: string; slug: string; demos: SubDemo[] };
export type Category = { name: string; components: Component[] };

export const categories: Category[] = [
  {
    name: 'Accordion',
    components: [
      {
        name: 'ion-accordion',
        slug: 'accordion',
        demos: [
          { name: 'Basic', slug: 'basic' },
          { name: 'Customization', slug: 'customization' },
          // ...
        ],
      },
      {
        name: 'ion-accordion-group',
        slug: 'accordion-group',
        demos: [ /* 親コンポーネントに含まれる場合は参照のみ */ ],
      },
    ],
  },
  // ... 28 categories
];
```

## 28 カテゴリ・コンポーネント一覧

ionic-docs sidebars.js 準拠:

| # | カテゴリ | コンポーネント |
|---|---------|-------------|
| 1 | Accordion | accordion, accordion-group |
| 2 | Action Sheet | action-sheet |
| 3 | Alert | alert |
| 4 | Badge | badge |
| 5 | Breadcrumbs | breadcrumb, breadcrumbs |
| 6 | Button | button, ripple-effect |
| 7 | Card | card, card-content, card-header, card-subtitle, card-title |
| 8 | Checkbox | checkbox |
| 9 | Chip | chip |
| 10 | Content | app, content |
| 11 | Date & Time Pickers | datetime, datetime-button, picker, picker-column, picker-column-option |
| 12 | Floating Action Button | fab, fab-button, fab-list |
| 13 | Grid | grid, col, row |
| 14 | Icons | icon |
| 15 | Infinite Scroll | infinite-scroll, infinite-scroll-content |
| 16 | Inputs | input, input-password-toggle, input-otp, textarea |
| 17 | Item | item, item-divider, item-group, item-sliding, item-options, item-option, label, note |
| 18 | List | list, list-header |
| 19 | Media | avatar, img, thumbnail |
| 20 | Menu | menu, menu-button, menu-toggle, split-pane |
| 21 | Modal | modal, backdrop |
| 22 | Navigation | nav, nav-link |
| 23 | Popover | popover |
| 24 | Progress Indicators | loading, progress-bar, skeleton-text, spinner |
| 25 | Radio | radio, radio-group |
| 26 | Range | range |
| 27 | Refresher | refresher, refresher-content |
| 28 | Reorder | reorder, reorder-group |
| 29 | Routing | router, router-link, router-outlet, route, route-redirect |
| 30 | Searchbar | searchbar |
| 31 | Segment | segment, segment-button, segment-content, segment-view |
| 32 | Select | select, select-option |
| 33 | Tabs | tabs, tab, tab-bar, tab-button |
| 34 | Toast | toast |
| 35 | Toggle | toggle |
| 36 | Toolbar | toolbar, header, footer, title, buttons, back-button |
| 37 | Typography | text |

## サブデモ全量 (主要 70 コンポーネント)

ionic-docs `static/usage/v8/` 準拠。各コンポーネントのサブデモ:

- **accordion**: basic, customization, disable, listen-changes, multiple, readonly, toggle, accessibility
- **action-sheet**: controller, inline, role-info-on-dismiss, theming
- **alert**: buttons, customization, inputs, presenting
- **avatar**: basic, chip, item, theming
- **back-button**: basic, custom
- **backdrop**: basic, styling
- **badge**: basic, inside-tab-bar, theming
- **breadcrumbs**: basic, collapsing-items, icons, theming
- **button**: basic, expand, fill, icons, shape, size, text-wrapping, theming
- **buttons**: basic, placement, types
- **card**: basic, buttons, list, media, theming
- **checkbox**: alignment, basic, helper-error, indeterminate, justify, label-link, label-placement, theming
- **chip**: basic, slots, theming
- **content**: basic, fixed, fullscreen, header-footer, scroll-events, scroll-methods, theming
- **datetime**: basic, buttons, date-constraints, format-options, highlightedDates, localization, multiple, presentation, show-adjacent-days, styling, title
- **datetime-button**: basic, format-options
- **fab**: basic, before-content, button-sizing, list-side, positioning, safe-area, theming
- **footer**: basic, custom-scroll-target, fade, no-border, translucent
- **grid**: basic, customizing, fixed, horizontal-alignment, offset, offset-responsive, push-pull, push-pull-responsive, size, size-auto, size-responsive, vertical-alignment
- **header**: basic, condense, custom-scroll-target, fade, no-border, translucent
- **icon**: basic
- **img**: basic
- **infinite-scroll**: basic, custom-infinite-scroll-content, infinite-scroll-content
- **input**: basic, clear, counter, counter-alignment, fill, filtering, helper-error, label-placement, label-slot, mask, no-visible-label, set-focus, start-end-slots, theming, types
- **input-otp**: basic, fill, pattern, separators, shape, size, states, theming, type
- **input-password-toggle**: basic
- **item**: basic, buttons, clickable, content-types, detail-arrows, inputs, lines, media, theming
- **item-divider**: basic, theming
- **item-group**: basic, sliding-items
- **item-sliding**: basic, expandable, icons
- **label**: basic, input, item, theming
- **list**: basic, inset, lines
- **list-header**: basic, buttons, lines, theming
- **loading**: controller, inline, spinners, theming
- **menu**: basic, multiple, sides, theming, toggle, type
- **modal**: can-dismiss, card, controller, custom-dialogs, drag-move-event, drag-start-end-events, inline, performance, sheet, styling
- **nav**: modal-navigation, nav-link
- **note**: basic, item, theming
- **picker**: basic, modal, prefix-suffix, theming
- **picker-legacy**: controller, inline, multiple-column
- **popover**: customization, nested, performance, presenting
- **progress-bar**: buffer, determinate, indeterminate, theming
- **radio**: alignment, basic, empty-selection, helper-error, justify, label-placement, label-wrap, theming, using-comparewith
- **range**: basic, dual-knobs, ion-change-event, ion-knob-move-event, label-slot, labels, no-visible-label, pins, slots, snapping-ticks, theming
- **refresher**: advanced, basic, custom-content, custom-scroll-target, pull-properties, pull-start-end-events
- **reorder**: basic, custom-icon, custom-scroll-target, reorder-move-event, reorder-start-end-events, toggling-disabled, updating-data, wrapper
- **ripple-effect**: basic, customizing, type
- **searchbar**: basic, cancel-button, clear-button, debounce, search-icon, theming
- **segment**: basic, scrollable, swipeable, theming
- **segment-button**: basic, layout, theming
- **select**: basic, customization, fill, helper-error, interfaces, justify, label-placement, label-slot, no-visible-label, objects-as-values, start-end-slots, typeahead
- **skeleton-text**: basic, theming
- **spinner**: basic, theming
- **split-pane**: basic, theming
- **tabs**: basic, router, select-method
- **text**: basic
- **textarea**: autogrow, basic, clear-on-edit, counter, fill, helper-error, label-placement, label-slot, no-visible-label, start-end-slots, theming
- **thumbnail**: basic, item, theming
- **title**: basic, collapsible-large-title, theming
- **toast**: buttons, icon, inline, layout, position-anchor, presenting, swipe-gesture, theming
- **toggle**: alignment, basic, helper-error, justify, label-placement, list, on-off, theming
- **toolbar**: basic, buttons, progress-bars, searchbars, segments, theming

## 画像

### ローカル SVG プレースホルダー

`src/assets/img/demos/` に配置:

| ファイル名 | 用途 | サイズ目安 |
|-----------|------|----------|
| avatar.svg | アバター画像 | 64x64 |
| thumbnail.svg | サムネイル | 80x80 |
| card-media.svg | カード画像 | 300x200 |
| logo.svg | ロゴ画像 | 200x200 |
| placeholder.svg | 汎用プレースホルダー | 300x300 |

各 SVG はシンプルな図形 + ラベルテキストの軽量ファイル。

### 既存の外部画像参照の置換

- `ImgPage.vue`: `ionicframework.com/img/meta/logo.png` → `@/assets/img/demos/logo.svg`
- `ThumbnailPage.vue`: `ionicframework.com/docs/img/demos/thumbnail.svg` → `@/assets/img/demos/thumbnail.svg`
- `AvatarPage.vue`: `ionicframework.com/docs/img/demos/avatar.svg` → `@/assets/img/demos/avatar.svg`

## 共通コンポーネント

### DemoPage.vue

全デモページで使う共通ラッパー:

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ componentName }} / {{ demoName }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- パンくず -->
      <ion-breadcrumbs>
        <ion-breadcrumb router-link="/samples/catalog">Catalog</ion-breadcrumb>
        <ion-breadcrumb :router-link="`/samples/catalog/${componentSlug}/basic`">
          {{ componentName }}
        </ion-breadcrumb>
        <ion-breadcrumb>{{ demoName }}</ion-breadcrumb>
      </ion-breadcrumbs>

      <!-- ライブプレビュー -->
      <div class="demo-preview">
        <slot />
      </div>

      <!-- ソースコード -->
      <div class="demo-source" v-if="sourceCode">
        <h3>Source</h3>
        <pre><code>{{ sourceCode }}</code></pre>
      </div>
    </ion-content>
  </ion-page>
</template>
```

Props: `componentName`, `componentSlug`, `demoName`, `sourceCode`

## ファイル構成 (最終形)

```
src/
├── assets/img/demos/
│   ├── avatar.svg
│   ├── thumbnail.svg
│   ├── card-media.svg
│   ├── logo.svg
│   └── placeholder.svg
├── views/samples/
│   ├── SamplesIndexPage.vue          (変更なし)
│   ├── CoveragePage.vue              (更新: 新パスに合わせる)
│   └── catalog/
│       ├── CatalogLayout.vue         ← NEW: split-pane シェル
│       ├── CatalogSidebar.vue        ← NEW: サイドバー
│       ├── CatalogWelcome.vue        ← NEW: ランディング
│       ├── DemoPage.vue              ← NEW: 共通デモラッパー
│       ├── catalog-data.ts           ← NEW: カテゴリ/コンポーネント/デモ定義
│       ├── demos/                    ← NEW: 全デモ (400+ files)
│       │   ├── accordion/
│       │   │   ├── AccordionBasic.vue
│       │   │   ├── AccordionCustomization.vue
│       │   │   └── ...
│       │   ├── action-sheet/
│       │   │   ├── ActionSheetController.vue
│       │   │   └── ...
│       │   └── ... (70 directories)
│       ├── [旧ファイル削除]
│       │   ├── ButtonPage.vue         ← DELETE
│       │   ├── InputPage.vue          ← DELETE
│       │   └── ... (45 files)
│       └── [旧ディレクトリ削除]
│           ├── breadcrumbs/           ← DELETE
│           ├── menu/                  ← DELETE
│           ├── nav/                   ← DELETE
│           └── tabs/                  ← DELETE
```

## ルーティング変更

`src/router/index.ts` の catalog セクションを全面書き換え:

- 旧: 45 個の個別ルート
- 新: CatalogLayout を親とするネスト構成 + 400+ 子ルート (lazy import)
- `/samples/catalog` → CatalogLayout + CatalogWelcome
- `/samples/catalog/:component/:demo` → 各デモページ

## 実装順序

### Phase 1: 基盤
1. ローカル SVG 画像作成
2. catalog-data.ts (カテゴリ・コンポーネント・デモ定義)
3. CatalogLayout.vue (split-pane シェル)
4. CatalogSidebar.vue (アコーディオンメニュー)
5. DemoPage.vue (共通デモラッパー)
6. CatalogWelcome.vue (ランディング)
7. ルーター基盤変更

### Phase 2: デモ移植 (カテゴリ順)
ionic-docs `static/usage/v8/*/vue.md` の Vue コードを取得・移植。
カテゴリ単位で進行:

1. Button, Ripple Effect (簡単、検証用)
2. Inputs (input, textarea, input-otp, input-password-toggle)
3. Form Controls (checkbox, toggle, radio, select, range, searchbar, segment)
4. Date & Time (datetime, datetime-button, picker)
5. Accordion
6. List, List Header, Item 系
7. Card 系
8. Display & Media (badge, chip, avatar, img, thumbnail, text, icon)
9. Overlay (modal, popover, alert, action-sheet, loading, toast, backdrop)
10. Navigation (nav, tabs, menu, breadcrumbs, split-pane, toolbar, header, footer)
11. Layout (content, grid, fab)
12. Data Loading (refresher, infinite-scroll, reorder)
13. Progress (spinner, skeleton-text, progress-bar)
14. Routing (参照ページのみ)

### Phase 3: クリーンアップ
1. 旧カタログページ削除
2. CoveragePage 更新
3. 未使用コンポーネント・ルート削除

## テスト方針

- 各 Phase 完了時にビルド確認 (`npm run build`)
- サイドバーナビゲーションの動作確認
- モバイル/デスクトップ両方でレイアウト確認
