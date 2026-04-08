# Samples Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `src/views/samples/` 配下を `catalog/` (公式コンポーネントカタログ・新規) と `mockups/` (既存4ページの整理) に再構成し、HomePage からの導線を `/samples` インデックス経由に統一する。

**Architecture:** カタログページは `<ion-page>` 直書きで `PageLayout` 等のプロジェクト固有ラッパに依存しない「素のIonic」スタイル。インデックスページ3層 (Samples / Catalog / Mockups) で階層を明示。既存モックは中身ゼロ変更で物理移動 (例外: `DialogDemoPage.vue` の import パス2行のみ)。

**Tech Stack:** Vue 3 + TypeScript + `@ionic/vue` 8 + `@ionic/vue-router` 8 + Vite 5

**Spec:** `docs/superpowers/specs/2026-04-08-samples-restructure-design.md`

---

## File Structure

| ファイル | 役割 |
|---|---|
| `src/views/samples/SamplesIndexPage.vue` | 【新規】 `/samples` の入口。カタログとモックの2項目を持つ |
| `src/views/samples/catalog/CatalogIndexPage.vue` | 【新規】 `/samples/catalog`。カタログ一覧 (5項目) |
| `src/views/samples/catalog/ButtonPage.vue` | 【新規】 `<ion-button>` の各バリエーション |
| `src/views/samples/catalog/InputPage.vue` | 【新規】 `<ion-input>` の各バリエーション |
| `src/views/samples/catalog/ListPage.vue` | 【新規】 `<ion-list>` の各バリエーション |
| `src/views/samples/catalog/ModalPage.vue` | 【新規】 `<ion-modal>` (基本 + Sheet) |
| `src/views/samples/catalog/ToastPage.vue` | 【新規】 `toastController` の使い方 |
| `src/views/samples/mockups/MockupsIndexPage.vue` | 【新規】 `/samples/mockups`。モック一覧 (4項目) |
| `src/views/samples/mockups/ComponentsPage.vue` | 【移動】 中身そのまま |
| `src/views/samples/mockups/ScanDemoPage.vue` | 【移動】 中身そのまま |
| `src/views/samples/mockups/FeedbackPage.vue` | 【移動】 中身そのまま |
| `src/views/samples/mockups/DialogDemoPage.vue` | 【移動】 import パス2行のみ修正 |
| `src/views/samples/mockups/dialogs/ScanParsePage.vue` | 【移動】 中身そのまま |
| `src/views/samples/mockups/dialogs/ScanParseModal.vue` | 【移動】 中身そのまま |
| `src/views/samples/mockups/dialogs/ScanParseFullscreen.vue` | 【移動】 中身そのまま |
| `src/router/index.ts` | 【編集】 サンプル系ルートの再構成 |
| `src/views/HomePage.vue` | 【編集】 「サンプル」セクションを `/samples` 1リンクに置換 |

---

## Verification Strategy

カタログページはほぼテンプレートのみで状態を持たないため、ユニットテストではなく以下で検証する。

- **各タスク後**: `npm run build` (vue-tsc + vite build) を実行し、型エラーや import 解決エラーがないことを確認
- **全タスク完了後**: `npm run dev` で開発サーバを起動し、`/home → /samples → /samples/catalog → /samples/catalog/button` などの遷移と各ページの表示を手動確認

`npm run build` が通れば、ルート定義と各ページの import が一貫していることが保証される。

---

## Task 1: 3つのインデックスページを作成

3つのインデックスページ (SamplesIndex / CatalogIndex / MockupsIndex) と、その3つのルートを追加する。CatalogIndex と MockupsIndex はこの時点では空配列で表示するだけ (Task 2 / 3-7 で項目を追記する)。

**Files:**
- Create: `src/views/samples/SamplesIndexPage.vue`
- Create: `src/views/samples/catalog/CatalogIndexPage.vue`
- Create: `src/views/samples/mockups/MockupsIndexPage.vue`
- Modify: `src/router/index.ts`

- [ ] **Step 1: Create `SamplesIndexPage.vue`**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>サンプル</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item router-link="/samples/catalog" detail>
          <ion-label>
            <h2>コンポーネントカタログ</h2>
            <p>Ionic公式コンポーネントの動作サンプル</p>
          </ion-label>
        </ion-item>
        <ion-item router-link="/samples/mockups" detail>
          <ion-label>
            <h2>画面モック</h2>
            <p>業務画面のレイアウト・操作感の検討用</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
} from '@ionic/vue';
</script>
```

- [ ] **Step 2: Create `catalog/CatalogIndexPage.vue`**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples" />
        </ion-buttons>
        <ion-title>コンポーネントカタログ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="c in components" :key="c.path" :router-link="c.path" detail>
          <ion-label>{{ c.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
} from '@ionic/vue';

const components: { name: string; path: string }[] = [];
</script>
```

- [ ] **Step 3: Create `mockups/MockupsIndexPage.vue`**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples" />
        </ion-buttons>
        <ion-title>画面モック</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="m in mockups" :key="m.path" :router-link="m.path" detail>
          <ion-label>{{ m.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
} from '@ionic/vue';

const mockups: { name: string; path: string }[] = [];
</script>
```

- [ ] **Step 4: Add 3 index routes to `src/router/index.ts`**

既存の `samples/components` ルートの**直前**(現在の `routes` 配列内、`/relocation` ルートの後ろ) に以下を挿入する。

```ts
{
  path: '/samples',
  name: 'SamplesIndex',
  component: () => import('@/views/samples/SamplesIndexPage.vue'),
},
{
  path: '/samples/catalog',
  name: 'CatalogIndex',
  component: () => import('@/views/samples/catalog/CatalogIndexPage.vue'),
},
{
  path: '/samples/mockups',
  name: 'MockupsIndex',
  component: () => import('@/views/samples/mockups/MockupsIndexPage.vue'),
},
```

- [ ] **Step 5: Run build**

Run: `npm run build`
Expected: `vue-tsc` と `vite build` が成功し、エラー0で終了する

- [ ] **Step 6: Commit**

```bash
git add src/views/samples/SamplesIndexPage.vue \
        src/views/samples/catalog/CatalogIndexPage.vue \
        src/views/samples/mockups/MockupsIndexPage.vue \
        src/router/index.ts
git commit -m "feat: サンプル系インデックスページ3層を追加"
```

---

## Task 2: 既存モックページを移動 + HomePage 更新

既存4ページ + dialogs配下3ページを `samples/mockups/` 配下へ git mv で移動する。`DialogDemoPage.vue` の import パス2行を修正、`MockupsIndexPage` の配列に4項目を追加、ルーターのモック系パスを更新、HomePage のサンプルセクションを1リンクに置換する。

**Files:**
- Move: `src/views/samples/{Components,ScanDemo,Feedback,DialogDemo}Page.vue` → `src/views/samples/mockups/`
- Move: `src/views/samples/dialogs/{ScanParsePage,ScanParseModal,ScanParseFullscreen}.vue` → `src/views/samples/mockups/dialogs/`
- Modify: `src/views/samples/mockups/DialogDemoPage.vue` (移動後の絶対 import パス)
- Modify: `src/views/samples/mockups/MockupsIndexPage.vue` (空配列を埋める)
- Modify: `src/router/index.ts` (旧モックルートを新パスへ)
- Modify: `src/views/HomePage.vue` (samples セクションを1リンクへ)

- [ ] **Step 1: Move 4 mockup files via git mv**

Run:
```bash
git mv src/views/samples/ComponentsPage.vue src/views/samples/mockups/ComponentsPage.vue
git mv src/views/samples/ScanDemoPage.vue src/views/samples/mockups/ScanDemoPage.vue
git mv src/views/samples/FeedbackPage.vue src/views/samples/mockups/FeedbackPage.vue
git mv src/views/samples/DialogDemoPage.vue src/views/samples/mockups/DialogDemoPage.vue
```

- [ ] **Step 2: Move 3 dialogs files via git mv**

`mockups/dialogs/` ディレクトリを作ってから移動する。

Run:
```bash
mkdir -p src/views/samples/mockups/dialogs
git mv src/views/samples/dialogs/ScanParsePage.vue src/views/samples/mockups/dialogs/ScanParsePage.vue
git mv src/views/samples/dialogs/ScanParseModal.vue src/views/samples/mockups/dialogs/ScanParseModal.vue
git mv src/views/samples/dialogs/ScanParseFullscreen.vue src/views/samples/mockups/dialogs/ScanParseFullscreen.vue
rmdir src/views/samples/dialogs
```

- [ ] **Step 3: Fix import paths in `mockups/DialogDemoPage.vue`**

`src/views/samples/mockups/DialogDemoPage.vue` の以下2行を編集する。

変更前:
```ts
import ScanParseModal from '@/views/samples/dialogs/ScanParseModal.vue';
import ScanParseFullscreen from '@/views/samples/dialogs/ScanParseFullscreen.vue';
```

変更後:
```ts
import ScanParseModal from '@/views/samples/mockups/dialogs/ScanParseModal.vue';
import ScanParseFullscreen from '@/views/samples/mockups/dialogs/ScanParseFullscreen.vue';
```

これ以外は触らない。

- [ ] **Step 4: Populate `MockupsIndexPage.vue` list**

`src/views/samples/mockups/MockupsIndexPage.vue` の `<script setup>` 内の空配列を以下に置き換える。

変更前:
```ts
const mockups: { name: string; path: string }[] = [];
```

変更後:
```ts
const mockups = [
  { name: 'コンポーネント一覧',     path: '/samples/mockups/components' },
  { name: 'スキャン入力デモ',       path: '/samples/mockups/scan-demo' },
  { name: 'スキャンフィードバック', path: '/samples/mockups/feedback' },
  { name: 'ダイアログデモ',         path: '/samples/mockups/dialog-demo' },
];
```

- [ ] **Step 5: Update mockup routes in `src/router/index.ts`**

既存のサンプル系ルート (現状 `/samples/components` `/samples/scan-demo` `/samples/feedback` `/samples/dialog-demo` `/samples/dialog-demo/scan` の5つ) を以下に置き換える。

変更前:
```ts
{
  path: '/samples/components',
  name: 'SampleComponents',
  component: () => import('@/views/samples/ComponentsPage.vue'),
},
{
  path: '/samples/scan-demo',
  name: 'ScanDemo',
  component: () => import('@/views/samples/ScanDemoPage.vue'),
},
{
  path: '/samples/feedback',
  name: 'ScanFeedback',
  component: () => import('@/views/samples/FeedbackPage.vue'),
},
{
  path: '/samples/dialog-demo',
  name: 'DialogDemo',
  component: () => import('@/views/samples/DialogDemoPage.vue'),
},
{
  path: '/samples/dialog-demo/scan',
  name: 'DialogDemoScan',
  component: () => import('@/views/samples/dialogs/ScanParsePage.vue'),
},
```

変更後:
```ts
{
  path: '/samples/mockups/components',
  name: 'MockupComponents',
  component: () => import('@/views/samples/mockups/ComponentsPage.vue'),
},
{
  path: '/samples/mockups/scan-demo',
  name: 'MockupScanDemo',
  component: () => import('@/views/samples/mockups/ScanDemoPage.vue'),
},
{
  path: '/samples/mockups/feedback',
  name: 'MockupFeedback',
  component: () => import('@/views/samples/mockups/FeedbackPage.vue'),
},
{
  path: '/samples/mockups/dialog-demo',
  name: 'MockupDialogDemo',
  component: () => import('@/views/samples/mockups/DialogDemoPage.vue'),
},
{
  path: '/samples/mockups/dialog-demo/scan',
  name: 'MockupDialogDemoScan',
  component: () => import('@/views/samples/mockups/dialogs/ScanParsePage.vue'),
},
```

- [ ] **Step 6: Update `HomePage.vue` template**

`src/views/HomePage.vue` の `<ion-list-header>` 「サンプル」とその下の `<ion-list>` (現在の `v-for="sample in samples"` のブロック) を以下に置き換える。

変更前:
```vue
<ion-list-header class="ion-margin-top">
  <ion-label>サンプル</ion-label>
</ion-list-header>
<ion-list>
  <ion-item
    v-for="sample in samples"
    :key="sample.path"
    :router-link="sample.path"
    detail
  >
    <ion-icon :icon="sample.icon" slot="start" />
    <ion-label>{{ sample.title }}</ion-label>
  </ion-item>
</ion-list>
```

変更後:
```vue
<ion-list-header class="ion-margin-top">
  <ion-label>サンプル</ion-label>
</ion-list-header>
<ion-list>
  <ion-item router-link="/samples" detail>
    <ion-icon :icon="appsOutline" slot="start" />
    <ion-label>サンプル一覧</ion-label>
  </ion-item>
</ion-list>
```

- [ ] **Step 7: Update `HomePage.vue` script setup**

`src/views/HomePage.vue` の `<script setup>` から、不要になった項目を削除する。

変更前 (該当箇所):
```ts
import {
  downloadOutline, pushOutline, clipboardOutline,
  searchOutline, swapHorizontalOutline,
  appsOutline, scanOutline, notificationsOutline, chatboxOutline,
} from 'ionicons/icons';
```

変更後:
```ts
import {
  downloadOutline, pushOutline, clipboardOutline,
  searchOutline, swapHorizontalOutline,
  appsOutline,
} from 'ionicons/icons';
```

さらに `samples` 配列定義 (現在の `const samples = [ ... ]` の4要素ブロック全体) を削除する。`menus` 配列、`layout` `menuItems` `onMenuSelect` 等は触らない。

- [ ] **Step 8: Run build**

Run: `npm run build`
Expected: 成功。型エラー・import 解決エラー0。

もし `vue-tsc` が `samples` 変数や削除した icon の参照エラーを出した場合は HomePage.vue の編集漏れなので Step 6/7 を確認する。

- [ ] **Step 9: Commit**

```bash
git add src/views/samples/mockups/ \
        src/router/index.ts \
        src/views/HomePage.vue
git commit -m "refactor: 既存サンプル4ページを mockups/ 配下に移動しHomePage導線を整理"
```

Note: `git mv` 済みのファイルは `git add` で改めてステージしなくても commit に含まれるが、`mockups/` 配下を明示的に add しておくと安全。

---

## Task 3: ButtonPage を追加

`<ion-button>` の各バリエーション (Color / Fill / Sizes / Expand / Disabled) を1ページにまとめる。

**Files:**
- Create: `src/views/samples/catalog/ButtonPage.vue`
- Modify: `src/router/index.ts`
- Modify: `src/views/samples/catalog/CatalogIndexPage.vue`

- [ ] **Step 1: Create `catalog/ButtonPage.vue`**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Button</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic</h2>
      <ion-button>Default</ion-button>

      <h2>Colors</h2>
      <ion-button color="primary">Primary</ion-button>
      <ion-button color="secondary">Secondary</ion-button>
      <ion-button color="tertiary">Tertiary</ion-button>
      <ion-button color="success">Success</ion-button>
      <ion-button color="warning">Warning</ion-button>
      <ion-button color="danger">Danger</ion-button>

      <h2>Fill</h2>
      <ion-button fill="clear">Clear</ion-button>
      <ion-button fill="outline">Outline</ion-button>
      <ion-button fill="solid">Solid</ion-button>

      <h2>Sizes</h2>
      <ion-button size="small">Small</ion-button>
      <ion-button size="default">Default</ion-button>
      <ion-button size="large">Large</ion-button>

      <h2>Expand</h2>
      <ion-button expand="block">Block</ion-button>
      <ion-button expand="full">Full</ion-button>

      <h2>Disabled</h2>
      <ion-button disabled>Disabled</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton,
} from '@ionic/vue';
</script>
```

- [ ] **Step 2: Add route to `src/router/index.ts`**

`/samples/mockups` ルート群の前 (CatalogIndex の直後) に追加する。

```ts
{
  path: '/samples/catalog/button',
  component: () => import('@/views/samples/catalog/ButtonPage.vue'),
},
```

- [ ] **Step 3: Add to `CatalogIndexPage.vue` list**

`src/views/samples/catalog/CatalogIndexPage.vue` の `components` 配列を以下に変更する。

変更前:
```ts
const components: { name: string; path: string }[] = [];
```

変更後:
```ts
const components = [
  { name: 'Button', path: '/samples/catalog/button' },
];
```

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 5: Commit**

```bash
git add src/views/samples/catalog/ButtonPage.vue \
        src/views/samples/catalog/CatalogIndexPage.vue \
        src/router/index.ts
git commit -m "feat: カタログに ButtonPage を追加"
```

---

## Task 4: InputPage を追加

`<ion-input>` の label-placement / helper-text / type / clear-input / counter のサンプルを1ページにまとめる。

**Files:**
- Create: `src/views/samples/catalog/InputPage.vue`
- Modify: `src/router/index.ts`
- Modify: `src/views/samples/catalog/CatalogIndexPage.vue`

- [ ] **Step 1: Create `catalog/InputPage.vue`**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Input</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic</h2>
      <ion-input label="Default" placeholder="Enter text" />

      <h2>Label Placement</h2>
      <ion-input label="Floating" label-placement="floating" placeholder="Enter text" />
      <ion-input label="Stacked" label-placement="stacked" placeholder="Enter text" />
      <ion-input label="Fixed" label-placement="fixed" placeholder="Enter text" />

      <h2>Helper Text</h2>
      <ion-input
        label="Email"
        type="email"
        helper-text="Enter your email"
        error-text="Invalid email"
      />

      <h2>Types</h2>
      <ion-input label="Text" type="text" />
      <ion-input label="Password" type="password" />
      <ion-input label="Number" type="number" />
      <ion-input label="Tel" type="tel" />

      <h2>Clear Button</h2>
      <ion-input label="With clear" :clear-input="true" placeholder="Type to see clear" />

      <h2>Counter</h2>
      <ion-input label="Max 20" :counter="true" :maxlength="20" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonInput,
} from '@ionic/vue';
</script>
```

- [ ] **Step 2: Add route to `src/router/index.ts`**

ButtonPage ルートの直後に追加する。

```ts
{
  path: '/samples/catalog/input',
  component: () => import('@/views/samples/catalog/InputPage.vue'),
},
```

- [ ] **Step 3: Add to `CatalogIndexPage.vue` list**

`src/views/samples/catalog/CatalogIndexPage.vue` の `components` 配列に1要素追加する。

変更後:
```ts
const components = [
  { name: 'Button', path: '/samples/catalog/button' },
  { name: 'Input',  path: '/samples/catalog/input'  },
];
```

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 5: Commit**

```bash
git add src/views/samples/catalog/InputPage.vue \
        src/views/samples/catalog/CatalogIndexPage.vue \
        src/router/index.ts
git commit -m "feat: カタログに InputPage を追加"
```

---

## Task 5: ListPage を追加

`<ion-list>` の lines バリエーション、inset、detail icon、list-header のサンプルを1ページにまとめる。

**Files:**
- Create: `src/views/samples/catalog/ListPage.vue`
- Modify: `src/router/index.ts`
- Modify: `src/views/samples/catalog/CatalogIndexPage.vue`

- [ ] **Step 1: Create `catalog/ListPage.vue`**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>List</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h2 class="ion-padding">Basic</h2>
      <ion-list>
        <ion-item><ion-label>Item 1</ion-label></ion-item>
        <ion-item><ion-label>Item 2</ion-label></ion-item>
        <ion-item><ion-label>Item 3</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">Lines: none</h2>
      <ion-list lines="none">
        <ion-item><ion-label>No bottom line</ion-label></ion-item>
        <ion-item><ion-label>No bottom line</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">Inset list</h2>
      <ion-list :inset="true">
        <ion-item><ion-label>Inset item 1</ion-label></ion-item>
        <ion-item><ion-label>Inset item 2</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">With detail icon</h2>
      <ion-list>
        <ion-item button detail><ion-label>Tap me</ion-label></ion-item>
        <ion-item button detail><ion-label>Or me</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">List header</h2>
      <ion-list>
        <ion-list-header>
          <ion-label>Header</ion-label>
        </ion-list-header>
        <ion-item><ion-label>Item under header</ion-label></ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonList, IonListHeader, IonItem, IonLabel,
} from '@ionic/vue';
</script>
```

- [ ] **Step 2: Add route to `src/router/index.ts`**

InputPage ルートの直後に追加する。

```ts
{
  path: '/samples/catalog/list',
  component: () => import('@/views/samples/catalog/ListPage.vue'),
},
```

- [ ] **Step 3: Add to `CatalogIndexPage.vue` list**

```ts
const components = [
  { name: 'Button', path: '/samples/catalog/button' },
  { name: 'Input',  path: '/samples/catalog/input'  },
  { name: 'List',   path: '/samples/catalog/list'   },
];
```

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 5: Commit**

```bash
git add src/views/samples/catalog/ListPage.vue \
        src/views/samples/catalog/CatalogIndexPage.vue \
        src/router/index.ts
git commit -m "feat: カタログに ListPage を追加"
```

---

## Task 6: ModalPage を追加

`<ion-modal>` を2パターン (基本モーダル + Sheet モーダル) サンプルとして作成する。`ref` を最小限利用する例外パターンの検証を兼ねる。

**Files:**
- Create: `src/views/samples/catalog/ModalPage.vue`
- Modify: `src/router/index.ts`
- Modify: `src/views/samples/catalog/CatalogIndexPage.vue`

- [ ] **Step 1: Create `catalog/ModalPage.vue`**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Modal</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic Modal</h2>
      <ion-button @click="basicOpen = true">Open Basic Modal</ion-button>

      <ion-modal :is-open="basicOpen" @did-dismiss="basicOpen = false">
        <ion-header>
          <ion-toolbar>
            <ion-title>Basic Modal</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="basicOpen = false">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>This is the modal content.</p>
        </ion-content>
      </ion-modal>

      <h2>Sheet Modal (Breakpoints)</h2>
      <ion-button @click="sheetOpen = true">Open Sheet Modal</ion-button>

      <ion-modal
        :is-open="sheetOpen"
        :initial-breakpoint="0.5"
        :breakpoints="[0, 0.25, 0.5, 0.75, 1]"
        @did-dismiss="sheetOpen = false"
      >
        <ion-content class="ion-padding">
          <h3>Drag me up or down</h3>
          <p>Breakpoints: 0, 25%, 50%, 75%, 100%</p>
          <ion-button expand="block" @click="sheetOpen = false">Close</ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonModal,
} from '@ionic/vue';

const basicOpen = ref(false);
const sheetOpen = ref(false);
</script>
```

- [ ] **Step 2: Add route to `src/router/index.ts`**

ListPage ルートの直後に追加する。

```ts
{
  path: '/samples/catalog/modal',
  component: () => import('@/views/samples/catalog/ModalPage.vue'),
},
```

- [ ] **Step 3: Add to `CatalogIndexPage.vue` list**

```ts
const components = [
  { name: 'Button', path: '/samples/catalog/button' },
  { name: 'Input',  path: '/samples/catalog/input'  },
  { name: 'List',   path: '/samples/catalog/list'   },
  { name: 'Modal',  path: '/samples/catalog/modal'  },
];
```

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 5: Commit**

```bash
git add src/views/samples/catalog/ModalPage.vue \
        src/views/samples/catalog/CatalogIndexPage.vue \
        src/router/index.ts
git commit -m "feat: カタログに ModalPage を追加"
```

---

## Task 7: ToastPage を追加

`toastController.create()` を使った Toast の各バリエーション (Basic / Colors / Position / With Button) を作成する。Composable / API 系の呼び出し方の検証を兼ねる。

**Files:**
- Create: `src/views/samples/catalog/ToastPage.vue`
- Modify: `src/router/index.ts`
- Modify: `src/views/samples/catalog/CatalogIndexPage.vue`

- [ ] **Step 1: Create `catalog/ToastPage.vue`**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Toast</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic</h2>
      <ion-button @click="showBasic">Show Basic Toast</ion-button>

      <h2>Colors</h2>
      <ion-button color="success" @click="showColor('success')">Success</ion-button>
      <ion-button color="warning" @click="showColor('warning')">Warning</ion-button>
      <ion-button color="danger" @click="showColor('danger')">Danger</ion-button>

      <h2>Position</h2>
      <ion-button @click="showPosition('top')">Top</ion-button>
      <ion-button @click="showPosition('middle')">Middle</ion-button>
      <ion-button @click="showPosition('bottom')">Bottom</ion-button>

      <h2>With Button</h2>
      <ion-button @click="showWithButton">Show with Close Button</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton,
  toastController,
} from '@ionic/vue';

const showBasic = async () => {
  const toast = await toastController.create({
    message: 'Hello from Toast',
    duration: 2000,
  });
  await toast.present();
};

const showColor = async (color: string) => {
  const toast = await toastController.create({
    message: `${color} toast`,
    duration: 2000,
    color,
  });
  await toast.present();
};

const showPosition = async (position: 'top' | 'middle' | 'bottom') => {
  const toast = await toastController.create({
    message: `Position: ${position}`,
    duration: 2000,
    position,
  });
  await toast.present();
};

const showWithButton = async () => {
  const toast = await toastController.create({
    message: 'Click X to close',
    buttons: [{ text: 'Close', role: 'cancel' }],
  });
  await toast.present();
};
</script>
```

- [ ] **Step 2: Add route to `src/router/index.ts`**

ModalPage ルートの直後に追加する。

```ts
{
  path: '/samples/catalog/toast',
  component: () => import('@/views/samples/catalog/ToastPage.vue'),
},
```

- [ ] **Step 3: Add to `CatalogIndexPage.vue` list**

```ts
const components = [
  { name: 'Button', path: '/samples/catalog/button' },
  { name: 'Input',  path: '/samples/catalog/input'  },
  { name: 'List',   path: '/samples/catalog/list'   },
  { name: 'Modal',  path: '/samples/catalog/modal'  },
  { name: 'Toast',  path: '/samples/catalog/toast'  },
];
```

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 5: Commit**

```bash
git add src/views/samples/catalog/ToastPage.vue \
        src/views/samples/catalog/CatalogIndexPage.vue \
        src/router/index.ts
git commit -m "feat: カタログに ToastPage を追加"
```

---

## Final Verification (全タスク完了後)

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Expected: Vite が `http://localhost:5173/` で起動する。

- [ ] **Step 2: Manual navigation check**

ブラウザで以下を順に確認する。

1. `/home` を開く → 「サンプル」セクションに「サンプル一覧」1リンクが見える
2. 「サンプル一覧」をタップ → `/samples` に遷移し、「コンポーネントカタログ」「画面モック」の2項目
3. 「コンポーネントカタログ」をタップ → `/samples/catalog` に遷移し、Button / Input / List / Modal / Toast の5項目
4. 各カタログページに入って、サンプルが正しく表示・動作することを確認
   - Button: 各色・各サイズ・各 fill が見える
   - Input: 各 label-placement、各 type が動作する
   - List: 各バリエーションが表示される
   - Modal: 「Open Basic Modal」「Open Sheet Modal」の両方が動作する
   - Toast: 各ボタンで Toast が出る
5. 各カタログページの戻るボタンが `/samples/catalog` に戻る
6. `/samples/catalog` の戻るボタンが `/samples` に戻る
7. `/samples/mockups` をタップ → 既存4ページが一覧に出る
8. 各モックページに遷移して以前と同じ表示・動作を確認 (特に DialogDemo は import パスを直したので動作確認が重要)
9. `/home` に戻り、業務メニュー (入荷検品 / 出荷検品 / 棚卸し / 在庫照会 / ロケーション移動) がすべて開けることを確認 (リグレッションチェック)

- [ ] **Step 3: Stop dev server**

Ctrl+C で `npm run dev` を停止。

問題があれば該当タスクに戻って修正・再コミット。
