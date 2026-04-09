# ionic-docs ローカル再現 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ionic-docs の 70 コンポーネント・400+ サブデモを Vue 3 + Ionic Vue でローカル完全再現する

**Architecture:** generation script が ionic-docs リポジトリの vue.md を読み取り、ion-page ラッパー付きデモ SFC を自動生成。ion-split-pane サイドバーレイアウトで表示。import.meta.glob によるルート自動生成。

**Tech Stack:** Vue 3, Ionic Vue 8, TypeScript, Node.js (生成スクリプト)

---

### Task 1: Clone ionic-docs & create directories

**Files:**
- Create: `scripts/generate-catalog-demos.mjs` (Task 3 で使用)
- Create: `src/views/samples/catalog/demos/` (output directory)
- Create: `src/assets/img/demos/` (placeholder images)

- [ ] **Step 1: Clone ionic-docs (shallow, sparse)**

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/ionic-team/ionic-docs.git /tmp/ionic-docs
cd /tmp/ionic-docs
git sparse-checkout set static/usage/v8 sidebars.js
```

- [ ] **Step 2: Create output directories**

```bash
cd /home/miyaw/dev/learning/ionic-sample
mkdir -p src/views/samples/catalog/demos
mkdir -p src/assets/img/demos
mkdir -p scripts
```

- [ ] **Step 3: Verify clone contents**

```bash
ls /tmp/ionic-docs/static/usage/v8/ | head -20
```

Expected: directories like `accordion`, `action-sheet`, `alert`, `avatar`, `back-button`, etc.

---

### Task 2: Create SVG placeholder images

**Files:**
- Create: `src/assets/img/demos/avatar.svg`
- Create: `src/assets/img/demos/thumbnail.svg`
- Create: `src/assets/img/demos/card-media.svg`
- Create: `src/assets/img/demos/logo.svg`
- Create: `src/assets/img/demos/placeholder.svg`

- [ ] **Step 1: Create avatar.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect fill="#e0e0e0" width="64" height="64" rx="32"/>
  <circle cx="32" cy="24" r="10" fill="#bdbdbd"/>
  <ellipse cx="32" cy="52" rx="18" ry="14" fill="#bdbdbd"/>
</svg>
```

- [ ] **Step 2: Create thumbnail.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
  <rect fill="#e0e0e0" width="80" height="80" rx="4"/>
  <rect x="20" y="28" width="40" height="4" rx="2" fill="#bdbdbd"/>
  <rect x="28" y="38" width="24" height="4" rx="2" fill="#bdbdbd"/>
  <polygon points="24,56 40,20 56,56" fill="none" stroke="#bdbdbd" stroke-width="2"/>
  <circle cx="52" cy="28" r="6" fill="none" stroke="#bdbdbd" stroke-width="2"/>
</svg>
```

- [ ] **Step 3: Create card-media.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
  <rect fill="#e0e0e0" width="300" height="200"/>
  <polygon points="80,160 150,60 220,160" fill="#bdbdbd"/>
  <polygon points="160,160 200,100 240,160" fill="#c8c8c8"/>
  <circle cx="230" cy="60" r="20" fill="#bdbdbd"/>
  <text x="150" y="190" text-anchor="middle" fill="#999" font-size="12" font-family="sans-serif">Image Placeholder</text>
</svg>
```

- [ ] **Step 4: Create logo.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect fill="#3880ff" width="200" height="200" rx="24"/>
  <text x="100" y="115" text-anchor="middle" fill="white" font-size="64" font-family="sans-serif" font-weight="bold">I</text>
</svg>
```

- [ ] **Step 5: Create placeholder.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <rect fill="#f4f5f8" width="300" height="300"/>
  <line x1="0" y1="0" x2="300" y2="300" stroke="#e0e0e0" stroke-width="1"/>
  <line x1="300" y1="0" x2="0" y2="300" stroke="#e0e0e0" stroke-width="1"/>
  <text x="150" y="155" text-anchor="middle" fill="#999" font-size="14" font-family="sans-serif">Placeholder</text>
</svg>
```

---

### Task 3: Create demo generation script

**Files:**
- Create: `scripts/generate-catalog-demos.mjs`

This is the core script that reads ionic-docs `vue.md` files and generates:
1. 400+ demo Vue SFC files in `src/views/samples/catalog/demos/`
2. `src/views/samples/catalog/catalog-data.ts` (sidebar navigation data)

- [ ] **Step 1: Write the generation script**

Create `scripts/generate-catalog-demos.mjs`:

```javascript
#!/usr/bin/env node
/**
 * ionic-docs vue.md → ローカルデモ SFC 生成スクリプト
 *
 * Usage: node scripts/generate-catalog-demos.mjs [ionic-docs-path]
 * Default ionic-docs-path: /tmp/ionic-docs
 */
import fs from 'fs';
import path from 'path';

// ── config ──────────────────────────────────────────────────────────
const IONIC_DOCS = process.argv[2] || '/tmp/ionic-docs';
const USAGE_DIR  = path.join(IONIC_DOCS, 'static/usage/v8');
const OUT_DEMOS  = path.resolve('src/views/samples/catalog/demos');
const OUT_DATA   = path.resolve('src/views/samples/catalog/catalog-data.ts');
const IMG_BASE   = '@/assets/img/demos';

// ── category → component mapping (from ionic-docs sidebars.js) ─────
const CATEGORIES = [
  { name: 'Accordion',              components: ['accordion'] },
  { name: 'Action Sheet',           components: ['action-sheet'] },
  { name: 'Alert',                  components: ['alert'] },
  { name: 'Badge',                  components: ['badge'] },
  { name: 'Breadcrumbs',            components: ['breadcrumbs'] },
  { name: 'Button',                 components: ['button', 'ripple-effect'] },
  { name: 'Card',                   components: ['card'] },
  { name: 'Checkbox',               components: ['checkbox'] },
  { name: 'Chip',                   components: ['chip'] },
  { name: 'Content',                components: ['content'] },
  { name: 'Date & Time Pickers',    components: ['datetime', 'datetime-button', 'picker'] },
  { name: 'Floating Action Button', components: ['fab'] },
  { name: 'Grid',                   components: ['grid'] },
  { name: 'Icons',                  components: ['icon'] },
  { name: 'Infinite Scroll',        components: ['infinite-scroll'] },
  { name: 'Inputs',                 components: ['input', 'input-password-toggle', 'input-otp', 'textarea'] },
  { name: 'Item',                   components: ['item', 'item-divider', 'item-group', 'item-sliding', 'label', 'note'] },
  { name: 'List',                   components: ['list', 'list-header'] },
  { name: 'Media',                  components: ['avatar', 'img', 'thumbnail'] },
  { name: 'Menu',                   components: ['menu', 'split-pane'] },
  { name: 'Modal',                  components: ['modal', 'backdrop'] },
  { name: 'Navigation',             components: ['nav'] },
  { name: 'Popover',                components: ['popover'] },
  { name: 'Progress Indicators',    components: ['loading', 'progress-bar', 'skeleton-text', 'spinner'] },
  { name: 'Radio',                  components: ['radio', 'radio-group'] },
  { name: 'Range',                  components: ['range'] },
  { name: 'Refresher',              components: ['refresher'] },
  { name: 'Reorder',                components: ['reorder'] },
  { name: 'Searchbar',              components: ['searchbar'] },
  { name: 'Segment',                components: ['segment', 'segment-button'] },
  { name: 'Select',                 components: ['select'] },
  { name: 'Tabs',                   components: ['tabs'] },
  { name: 'Toast',                  components: ['toast'] },
  { name: 'Toggle',                 components: ['toggle'] },
  { name: 'Toolbar',                components: ['toolbar', 'header', 'footer', 'title', 'buttons', 'back-button'] },
  { name: 'Typography',             components: ['text'] },
];

// ── helpers ─────────────────────────────────────────────────────────
const kebabToPascal = (s) =>
  s.replace(/(^|-)(\w)/g, (_, _2, c) => c.toUpperCase());

const pascalToKebab = (s) =>
  s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/** Recursively find all vue.md files under a directory */
function findVueMdFiles(dir, base = dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findVueMdFiles(full, base));
    } else if (entry.name === 'vue.md') {
      const rel = path.relative(base, path.dirname(full));
      results.push({ filePath: full, demoPath: rel });
    }
  }
  return results;
}

/** Strip markdown code fence from vue.md content */
function stripFence(content) {
  return content
    .replace(/^```html\s*\n?/, '')
    .replace(/^```vue\s*\n?/, '')
    .replace(/^```\s*\n?/, '')
    .replace(/\n?```\s*$/, '')
    .trim();
}

/** Extract <template>, <script>, <style> from a Vue SFC string */
function parseSFC(sfc) {
  const templateMatch = sfc.match(/<template>([\s\S]*?)<\/template>/);
  const scriptMatch   = sfc.match(/<script([^>]*)>([\s\S]*?)<\/script>/);
  const styleMatch    = sfc.match(/<style([^>]*)>([\s\S]*?)<\/style>/);
  return {
    template: templateMatch ? templateMatch[1] : '',
    scriptAttrs: scriptMatch ? scriptMatch[1] : ' setup lang="ts"',
    script: scriptMatch ? scriptMatch[2] : '',
    styleAttrs: styleMatch ? styleMatch[1] : '',
    style: styleMatch ? styleMatch[2] : '',
    hasStyle: !!styleMatch,
  };
}

/** Check if template already has page-level structure */
function hasPageStructure(template) {
  const trimmed = template.trim();
  return trimmed.startsWith('<ion-header') || trimmed.startsWith('<ion-content');
}

/** Replace external image URLs with local placeholders */
function replaceImageUrls(content) {
  return content
    .replace(/https:\/\/i\.pravatar\.cc\/[^"'\s]*/g, `${IMG_BASE}/avatar.svg`)
    .replace(/https:\/\/picsum\.photos\/[^"'\s]*/g, `${IMG_BASE}/placeholder.svg`)
    .replace(/https:\/\/ionicframework\.com\/docs\/img\/demos\/avatar\.svg/g, `${IMG_BASE}/avatar.svg`)
    .replace(/https:\/\/ionicframework\.com\/docs\/img\/demos\/thumbnail\.svg/g, `${IMG_BASE}/thumbnail.svg`)
    .replace(/https:\/\/ionicframework\.com\/docs\/img\/demos\/card-media\.png/g, `${IMG_BASE}/card-media.svg`)
    .replace(/https:\/\/ionicframework\.com\/img\/meta\/logo\.png/g, `${IMG_BASE}/logo.svg`)
    .replace(/https:\/\/images\.unsplash\.com\/[^"'\s]*/g, `${IMG_BASE}/card-media.svg`);
}

/** Add page-related imports to the @ionic/vue import statement */
function augmentImports(script, needsContent) {
  const pageImports = ['IonPage', 'IonHeader', 'IonToolbar', 'IonTitle', 'IonButtons', 'IonMenuButton'];
  if (needsContent) pageImports.push('IonContent');

  const ionicImportRe = /import\s*\{([^}]+)\}\s*from\s*['"]@ionic\/vue['"]\s*;?/;
  const match = script.match(ionicImportRe);

  if (match) {
    const existing = match[1].split(',').map(s => s.trim()).filter(Boolean);
    const all = [...new Set([...existing, ...pageImports])].sort();
    const newImport = `import {\n  ${all.join(',\n  ')},\n} from '@ionic/vue';`;
    return script.replace(ionicImportRe, newImport);
  } else {
    const newImport = `import {\n  ${pageImports.join(',\n  ')},\n} from '@ionic/vue';\n`;
    return newImport + script;
  }
}

/** Build the complete demo SFC */
function buildDemoSFC(parsed, componentTitle, demoTitle, originalSource) {
  const isFullPage = hasPageStructure(parsed.template);

  // Escape source for template literal
  const escapedSource = originalSource
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
    .replace(/<\/script>/g, '<\\/script>');

  let template;
  let script;

  if (isFullPage) {
    // Demo has its own header/content - wrap in ion-page, inject menu button
    let t = parsed.template;
    // Inject menu button into first toolbar
    t = t.replace(
      /(<ion-toolbar[^>]*>)/,
      '$1\n        <ion-buttons slot="start"><ion-menu-button /></ion-buttons>'
    );
    // Replace first ion-title content
    t = t.replace(
      /<ion-title>([^<]*)<\/ion-title>/,
      `<ion-title>${componentTitle} / ${demoTitle}</ion-title>`
    );
    // Add source code section before last </ion-content>
    const sourceSection = `
      <div class="ion-padding" style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px">
        <details>
          <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
          <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
        </details>
      </div>`;
    const lastContentIdx = t.lastIndexOf('</ion-content>');
    if (lastContentIdx !== -1) {
      t = t.slice(0, lastContentIdx) + sourceSection + '\n    ' + t.slice(lastContentIdx);
    }
    template = `  <ion-page>${t}\n  </ion-page>`;
    script = augmentImports(parsed.script, false);
  } else {
    // Demo is just component content - wrap in full page structure
    template = `  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
        <ion-title>${componentTitle} / ${demoTitle}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
${parsed.template.split('\n').map(l => '      ' + l).join('\n')}

      <div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
        <details>
          <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
          <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
        </details>
      </div>
    </ion-content>
  </ion-page>`;
    script = augmentImports(parsed.script, true);
  }

  // Add sourceCode constant to script
  script = script.trimEnd() + `\n\nconst sourceCode = \`${escapedSource}\`;\n`;

  // Reassemble SFC
  let sfc = `<template>\n${template}\n</template>\n\n<script${parsed.scriptAttrs}>\n${script}</script>`;
  if (parsed.hasStyle) {
    sfc += `\n\n<style${parsed.styleAttrs}>\n${parsed.style}\n</style>`;
  }
  return sfc + '\n';
}

// ── main ────────────────────────────────────────────────────────────
function main() {
  if (!fs.existsSync(USAGE_DIR)) {
    console.error(`Error: ${USAGE_DIR} not found. Clone ionic-docs first.`);
    process.exit(1);
  }

  // Clean output directory
  if (fs.existsSync(OUT_DEMOS)) {
    fs.rmSync(OUT_DEMOS, { recursive: true });
  }
  fs.mkdirSync(OUT_DEMOS, { recursive: true });

  // Discover all components with demos
  const componentDirs = fs.readdirSync(USAGE_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  console.log(`Found ${componentDirs.length} component directories`);

  // Track all generated demos for catalog-data.ts
  const generatedDemos = {}; // { componentSlug: [{ name, slug, fileName }] }
  let totalGenerated = 0;
  let totalSkipped = 0;

  for (const compSlug of componentDirs) {
    const compDir = path.join(USAGE_DIR, compSlug);
    const vueMdFiles = findVueMdFiles(compDir);

    if (vueMdFiles.length === 0) {
      console.log(`  [skip] ${compSlug}: no vue.md files`);
      totalSkipped++;
      continue;
    }

    const outDir = path.join(OUT_DEMOS, compSlug);
    fs.mkdirSync(outDir, { recursive: true });

    const compTitle = kebabToPascal(compSlug).replace(/([a-z])([A-Z])/g, '$1 $2');
    generatedDemos[compSlug] = [];

    for (const { filePath, demoPath } of vueMdFiles) {
      try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const sfcSource = stripFence(raw);
        if (!sfcSource.includes('<template>')) {
          console.log(`  [skip] ${compSlug}/${demoPath}: no <template>`);
          totalSkipped++;
          continue;
        }
        const parsed = parseSFC(sfcSource);

        // Flatten nested demo path: "inline/basic" → "InlineBasic"
        const demoSlugParts = demoPath.split('/').filter(Boolean);
        const fileName = demoSlugParts.map(p => kebabToPascal(p)).join('');
        const demoDisplayName = demoSlugParts.map(p =>
          kebabToPascal(p).replace(/([a-z])([A-Z])/g, '$1 $2')
        ).join(' - ');
        const demoSlug = demoSlugParts.join('-');

        // Replace external image URLs
        parsed.template = replaceImageUrls(parsed.template);
        parsed.script = replaceImageUrls(parsed.script);

        const sfc = buildDemoSFC(parsed, compTitle, demoDisplayName, sfcSource);
        const outFile = path.join(outDir, `${fileName}.vue`);
        fs.writeFileSync(outFile, sfc, 'utf-8');

        generatedDemos[compSlug].push({
          name: demoDisplayName,
          slug: demoSlug,
          fileName,
        });

        totalGenerated++;
      } catch (err) {
        console.error(`  [error] ${compSlug}/${demoPath}: ${err.message}`);
        totalSkipped++;
      }
    }

    console.log(`  [ok] ${compSlug}: ${generatedDemos[compSlug].length} demos`);
  }

  // ── Generate catalog-data.ts ──────────────────────────────────────
  const categoryEntries = [];

  for (const cat of CATEGORIES) {
    const components = [];
    for (const compSlug of cat.components) {
      const demos = generatedDemos[compSlug] || [];
      if (demos.length === 0) continue;
      components.push({
        name: `ion-${compSlug}`,
        slug: compSlug,
        demos: demos.map(d => ({ name: d.name, slug: d.slug })),
      });
    }
    if (components.length > 0) {
      categoryEntries.push({ name: cat.name, components });
    }
  }

  // Also add components not in CATEGORIES (uncategorized)
  const categorized = new Set(CATEGORIES.flatMap(c => c.components));
  const uncategorized = [];
  for (const [slug, demos] of Object.entries(generatedDemos)) {
    if (!categorized.has(slug) && demos.length > 0) {
      uncategorized.push({
        name: `ion-${slug}`,
        slug,
        demos: demos.map(d => ({ name: d.name, slug: d.slug })),
      });
    }
  }
  if (uncategorized.length > 0) {
    categoryEntries.push({ name: 'Other', components: uncategorized });
  }

  const tsContent = `// Auto-generated by scripts/generate-catalog-demos.mjs
// Do not edit manually.

export type SubDemo = { name: string; slug: string };
export type CatalogComponent = { name: string; slug: string; demos: SubDemo[] };
export type Category = { name: string; components: CatalogComponent[] };

export const categories: Category[] = ${JSON.stringify(categoryEntries, null, 2)};
`;

  fs.writeFileSync(OUT_DATA, tsContent, 'utf-8');

  console.log(`\nDone! Generated: ${totalGenerated}, Skipped: ${totalSkipped}`);
  console.log(`Catalog data: ${OUT_DATA}`);
  console.log(`Demo files: ${OUT_DEMOS}`);
}

main();
```

---

### Task 4: Run generation script

**Files:**
- Output: `src/views/samples/catalog/demos/**/*.vue` (400+ files)
- Output: `src/views/samples/catalog/catalog-data.ts`

- [ ] **Step 1: Run the script**

```bash
cd /home/miyaw/dev/learning/ionic-sample
node scripts/generate-catalog-demos.mjs /tmp/ionic-docs
```

Expected: output showing ~400 generated demos across ~70 components.

- [ ] **Step 2: Verify output**

```bash
find src/views/samples/catalog/demos -name '*.vue' | wc -l
```

Expected: 350-450 files.

```bash
head -30 src/views/samples/catalog/demos/button/Basic.vue
```

Expected: a valid Vue SFC with `<ion-page>`, menu button, and source code section.

- [ ] **Step 3: Verify catalog-data.ts**

```bash
head -30 src/views/samples/catalog/catalog-data.ts
```

Expected: TypeScript file with categories array containing component/demo entries.

- [ ] **Step 4: Fix any issues**

If errors occurred during generation, review the console output and fix the script. Common issues:
- Missing `<template>` tag in some vue.md files
- Unusual nesting that breaks the regex parsing
- Edge cases in import merging

Re-run after fixes until all components generate successfully.

---

### Task 5: Create CatalogLayout.vue

**Files:**
- Create: `src/views/samples/catalog/CatalogLayout.vue`

- [ ] **Step 1: Create the split-pane layout shell**

```vue
<template>
  <ion-page>
    <ion-split-pane content-id="catalog-main" when="lg">
      <ion-menu content-id="catalog-main" type="overlay">
        <ion-header>
          <ion-toolbar>
            <ion-title>Components</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <CatalogSidebar />
        </ion-content>
      </ion-menu>

      <ion-router-outlet id="catalog-main" />
    </ion-split-pane>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import CatalogSidebar from './CatalogSidebar.vue';
</script>
```

---

### Task 6: Create CatalogSidebar.vue

**Files:**
- Create: `src/views/samples/catalog/CatalogSidebar.vue`

- [ ] **Step 1: Create the accordion sidebar**

```vue
<template>
  <ion-accordion-group :multiple="true">
    <ion-accordion v-for="cat in categories" :key="cat.name" :value="cat.name">
      <ion-item slot="header" color="light">
        <ion-label>{{ cat.name }}</ion-label>
      </ion-item>
      <div slot="content">
        <template v-for="comp in cat.components" :key="comp.slug">
          <ion-item-group>
            <ion-item-divider color="light" sticky>
              <ion-label class="ion-text-wrap" style="font-size:13px; font-weight:600">
                {{ comp.name }}
              </ion-label>
            </ion-item-divider>
            <ion-item
              v-for="demo in comp.demos"
              :key="demo.slug"
              :router-link="`/samples/catalog/${comp.slug}/${demo.slug}`"
              router-direction="root"
              lines="none"
              detail="false"
              :color="isActive(comp.slug, demo.slug) ? 'primary' : undefined"
              @click="closeMenu"
              class="demo-link"
            >
              <ion-label style="font-size:13px; padding-left:16px">{{ demo.name }}</ion-label>
            </ion-item>
          </ion-item-group>
        </template>
      </div>
    </ion-accordion>
  </ion-accordion-group>
</template>

<script setup lang="ts">
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  menuController,
} from '@ionic/vue';
import { useRoute } from 'vue-router';
import { categories } from './catalog-data';

const route = useRoute();

const isActive = (compSlug: string, demoSlug: string) => {
  return route.path === `/samples/catalog/${compSlug}/${demoSlug}`;
};

const closeMenu = async () => {
  await menuController.close();
};
</script>

<style scoped>
.demo-link {
  --min-height: 36px;
}
</style>
```

---

### Task 7: Create CatalogWelcome.vue

**Files:**
- Create: `src/views/samples/catalog/CatalogWelcome.vue`

- [ ] **Step 1: Create the landing page**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
        <ion-title>コンポーネントカタログ</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/samples" router-direction="back">
            <ion-icon slot="icon-only" :icon="closeOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Ionic UI Components</h1>
      <p>左のメニューからコンポーネントを選択してください。</p>
      <p>{{ totalComponents }} コンポーネント / {{ totalDemos }} デモ</p>

      <ion-list>
        <ion-list-header>
          <ion-label>カテゴリ一覧</ion-label>
        </ion-list-header>
        <ion-item
          v-for="cat in categories"
          :key="cat.name"
          :router-link="`/samples/catalog/${cat.components[0].slug}/${cat.components[0].demos[0].slug}`"
          detail
        >
          <ion-label>
            <h2>{{ cat.name }}</h2>
            <p>{{ cat.components.map(c => c.name).join(', ') }}</p>
          </ion-label>
          <ion-badge slot="end">{{ cat.components.reduce((n, c) => n + c.demos.length, 0) }}</ion-badge>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import { categories } from './catalog-data';

const totalComponents = categories.reduce((n, c) => n + c.components.length, 0);
const totalDemos = categories.reduce((n, c) => n + c.components.reduce((m, comp) => m + comp.demos.length, 0), 0);
</script>
```

---

### Task 8: Update router/index.ts

**Files:**
- Modify: `src/router/index.ts`

- [ ] **Step 1: Add dynamic route generation**

Add this near the top of the file, after existing imports:

```typescript
// ── Catalog demo routes (auto-discovered from file system) ──
const demoModules = import.meta.glob('./views/samples/catalog/demos/**/*.vue');

function pascalToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const catalogDemoRoutes = Object.keys(demoModules).map((modulePath) => {
  // modulePath: './views/samples/catalog/demos/button/Basic.vue'
  const match = modulePath.match(/\.\/views\/samples\/catalog\/demos\/([^/]+)\/(.+)\.vue$/);
  if (!match) return null;
  const [, componentSlug, fileName] = match;
  const demoSlug = pascalToKebab(fileName);
  return {
    path: `${componentSlug}/${demoSlug}`,
    component: demoModules[modulePath],
  };
}).filter(Boolean);
```

Note: the glob path is relative to the router file location. Adjust if the router file is in `src/router/`.
If the router is at `src/router/index.ts`, the glob should be:

```typescript
const demoModules = import.meta.glob('../views/samples/catalog/demos/**/*.vue');
```

- [ ] **Step 2: Replace old catalog routes with new structure**

Remove ALL existing `/samples/catalog/*` routes (the 45+ individual component routes, tabs/menu/breadcrumbs/nav nested routes).

Replace with:

```typescript
{
  path: '/samples/catalog',
  component: () => import('../views/samples/catalog/CatalogLayout.vue'),
  children: [
    {
      path: '',
      component: () => import('../views/samples/catalog/CatalogWelcome.vue'),
    },
    ...catalogDemoRoutes,
  ],
},
```

Keep the `/samples` and `/samples/coverage` routes unchanged.

- [ ] **Step 3: Verify route count**

Add temporarily at the end of the file:

```typescript
console.log(`Catalog demo routes: ${catalogDemoRoutes.length}`);
```

Expected: 350-450 routes. Remove the console.log after verification.

---

### Task 9: Delete old catalog pages

**Files:**
- Delete: `src/views/samples/catalog/CatalogIndexPage.vue`
- Delete: `src/views/samples/catalog/AccordionPage.vue` ... (all 43 old component pages)
- Delete: `src/views/samples/catalog/breadcrumbs/` (directory)
- Delete: `src/views/samples/catalog/menu/` (directory)
- Delete: `src/views/samples/catalog/nav/` (directory)
- Delete: `src/views/samples/catalog/tabs/` (directory)

- [ ] **Step 1: Delete old single-component pages**

```bash
cd /home/miyaw/dev/learning/ionic-sample/src/views/samples/catalog

# Delete all old *Page.vue files (but NOT the new files we created)
find . -maxdepth 1 -name '*Page.vue' -delete
```

- [ ] **Step 2: Delete old nested directories**

```bash
rm -rf breadcrumbs menu nav tabs
```

- [ ] **Step 3: Verify only new files remain**

```bash
ls -la src/views/samples/catalog/
```

Expected: `CatalogLayout.vue`, `CatalogSidebar.vue`, `CatalogWelcome.vue`, `catalog-data.ts`, `demos/`

---

### Task 10: Replace external image URLs in remaining files

**Files:**
- Modify: `src/views/samples/catalog/demos/**/*.vue` (any with remaining external URLs)

- [ ] **Step 1: Find remaining external image URLs**

```bash
cd /home/miyaw/dev/learning/ionic-sample
grep -r 'https://' src/views/samples/catalog/demos/ --include='*.vue' -l | head -20
```

- [ ] **Step 2: Replace any remaining external URLs**

```bash
find src/views/samples/catalog/demos -name '*.vue' -exec sed -i \
  -e "s|https://i.pravatar.cc/[^\"']*|@/assets/img/demos/avatar.svg|g" \
  -e "s|https://picsum.photos/[^\"']*|@/assets/img/demos/placeholder.svg|g" \
  -e "s|https://images.unsplash.com/[^\"']*|@/assets/img/demos/card-media.svg|g" \
  {} +
```

- [ ] **Step 3: Verify no external image URLs remain**

```bash
grep -r 'https://' src/views/samples/catalog/demos/ --include='*.vue' | grep -E '(src=|url\()' | head -10
```

Expected: no matches (or only non-image URLs that are acceptable).

---

### Task 11: Build verification & fixes

**Files:**
- Potentially modify any generated files with build errors

- [ ] **Step 1: Run build**

```bash
cd /home/miyaw/dev/learning/ionic-sample
npm run build 2>&1 | head -100
```

- [ ] **Step 2: Fix TypeScript/Vue compilation errors**

Common issues to fix:
1. **Missing component imports** — some demos may import components not registered in `@ionic/vue`. Add them or remove the import.
2. **Type errors** — event types like `InfiniteScrollCustomEvent` may need adjustment.
3. **Template compilation errors** — malformed templates from edge-case vue.md parsing.
4. **`@/assets/` path resolution** — verify Vite resolves `@` alias correctly.

For each error, fix the specific file and re-run build.

- [ ] **Step 3: Run dev server and verify navigation**

```bash
npm run dev
```

Verify:
- `/samples/catalog` loads welcome page with category list
- Sidebar shows all categories and components
- Clicking a demo navigates and shows live preview + source code
- Menu button works on mobile viewport
- Back to `/samples` works

- [ ] **Step 4: Fix any runtime issues**

Common runtime issues:
1. **Sidebar not rendering** — check catalog-data.ts was generated correctly
2. **Demo pages blank** — check import.meta.glob path is correct relative to router file
3. **Split-pane not working** — verify `content-id` matches between `ion-menu` and `ion-router-outlet`
4. **Source code not showing** — check sourceCode constant escaping

---

### Task 12: Update SamplesIndexPage link text

**Files:**
- Modify: `src/views/samples/SamplesIndexPage.vue`

- [ ] **Step 1: Update the catalog link description if needed**

The existing link to `/samples/catalog` should still work since the path hasn't changed.
Verify the link text is appropriate for the new catalog structure.

---

### Task 13: Commit

- [ ] **Step 1: Stage and commit all changes**

```bash
cd /home/miyaw/dev/learning/ionic-sample
git add src/views/samples/catalog/ src/assets/img/demos/ src/router/index.ts scripts/
git add src/views/samples/SamplesIndexPage.vue
git commit -m "feat(catalog): ionic-docs 完全再現 - 70コンポーネント400+デモ

- ion-split-pane サイドバーレイアウトで ionic-docs と同じナビゲーション
- 生成スクリプトで vue.md → Vue SFC 自動変換
- import.meta.glob による動的ルート生成
- ローカル SVG プレースホルダー画像
- 外部リンク・外部画像依存ゼロ（オフライン対応）"
```
