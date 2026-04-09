#!/usr/bin/env node
/**
 * generate-catalog-demos.mjs
 *
 * Reads ionic-docs vue.md files from /tmp/ionic-docs/static/usage/v8/
 * and generates:
 *   1. Vue SFC demo files in src/views/samples/catalog/demos/{component}/{DemoName}.vue
 *   2. src/views/samples/catalog/catalog-data.ts
 *
 * Usage: node scripts/generate-catalog-demos.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const IONIC_DOCS_ROOT = '/tmp/ionic-docs/static/usage/v8';
const PROJECT_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DEMOS_OUT_DIR = path.join(PROJECT_ROOT, 'src/views/samples/catalog/demos');
const CATALOG_DATA_OUT = path.join(PROJECT_ROOT, 'src/views/samples/catalog/catalog-data.ts');

// Page-level wrapper imports to inject
const PAGE_IMPORTS = [
  'IonPage',
  'IonHeader',
  'IonToolbar',
  'IonTitle',
  'IonContent',
  'IonButtons',
  'IonMenuButton',
];

// Image URL replacements
const IMAGE_REPLACEMENTS = [
  { pattern: /https?:\/\/i\.pravatar\.cc\/[^\s"']*/g,          replacement: '@/assets/img/demos/avatar.svg' },
  { pattern: /https?:\/\/picsum\.photos\/[^\s"']*/g,           replacement: '@/assets/img/demos/placeholder.svg' },
  { pattern: /https?:\/\/ionicframework\.com\/docs\/img\/demos\/avatar\.svg/g,     replacement: '@/assets/img/demos/avatar.svg' },
  { pattern: /https?:\/\/ionicframework\.com\/docs\/img\/demos\/thumbnail\.svg/g,  replacement: '@/assets/img/demos/thumbnail.svg' },
  { pattern: /https?:\/\/ionicframework\.com\/docs\/img\/demos\/card-media\.png/g, replacement: '@/assets/img/demos/card-media.svg' },
  { pattern: /https?:\/\/ionicframework\.com\/img\/meta\/logo\.png/g,              replacement: '@/assets/img/demos/logo.svg' },
  { pattern: /https?:\/\/images\.unsplash\.com\/[^\s"']*/g,    replacement: '@/assets/img/demos/card-media.svg' },
];

// ---------------------------------------------------------------------------
// Category mapping  (component-slug -> category name)
// ---------------------------------------------------------------------------

const CATEGORY_MAP = {
  'accordion':             'Accordion',
  'action-sheet':          'Action Sheet',
  'alert':                 'Alert',
  'badge':                 'Badge',
  'breadcrumbs':           'Breadcrumbs',
  'button':                'Button',
  'ripple-effect':         'Button',
  'card':                  'Card',
  'checkbox':              'Checkbox',
  'chip':                  'Chip',
  'content':               'Content',
  'datetime':              'Date & Time Pickers',
  'datetime-button':       'Date & Time Pickers',
  'picker':                'Date & Time Pickers',
  'fab':                   'Floating Action Button',
  'grid':                  'Grid',
  'icon':                  'Icons',
  'infinite-scroll':       'Infinite Scroll',
  'input':                 'Inputs',
  'input-password-toggle': 'Inputs',
  'input-otp':             'Inputs',
  'textarea':              'Inputs',
  'item':                  'Item',
  'item-divider':          'Item',
  'item-group':            'Item',
  'item-sliding':          'Item',
  'label':                 'Item',
  'note':                  'Item',
  'list':                  'List',
  'list-header':           'List',
  'avatar':                'Media',
  'img':                   'Media',
  'thumbnail':             'Media',
  'menu':                  'Menu',
  'split-pane':            'Menu',
  'modal':                 'Modal',
  'backdrop':              'Modal',
  'nav':                   'Navigation',
  'popover':               'Popover',
  'loading':               'Progress Indicators',
  'progress-bar':          'Progress Indicators',
  'skeleton-text':         'Progress Indicators',
  'spinner':               'Progress Indicators',
  'radio':                 'Radio',
  'radio-group':           'Radio',
  'range':                 'Range',
  'refresher':             'Refresher',
  'reorder':               'Reorder',
  'searchbar':             'Searchbar',
  'segment':               'Segment',
  'segment-button':        'Segment',
  'select':                'Select',
  'tabs':                  'Tabs',
  'toast':                 'Toast',
  'toggle':                'Toggle',
  'toolbar':               'Toolbar',
  'header':                'Toolbar',
  'footer':                'Toolbar',
  'title':                 'Toolbar',
  'buttons':               'Toolbar',
  'back-button':           'Toolbar',
  'text':                  'Typography',
};

// Canonical display names for component slugs
const COMPONENT_DISPLAY_NAMES = {
  'accordion':             'Accordion',
  'action-sheet':          'Action Sheet',
  'alert':                 'Alert',
  'avatar':                'Avatar',
  'back-button':           'Back Button',
  'backdrop':              'Backdrop',
  'badge':                 'Badge',
  'breadcrumbs':           'Breadcrumbs',
  'button':                'Button',
  'buttons':               'Buttons',
  'card':                  'Card',
  'checkbox':              'Checkbox',
  'chip':                  'Chip',
  'content':               'Content',
  'datetime':              'Datetime',
  'datetime-button':       'Datetime Button',
  'fab':                   'FAB',
  'footer':                'Footer',
  'grid':                  'Grid',
  'header':                'Header',
  'icon':                  'Icon',
  'img':                   'Image',
  'infinite-scroll':       'Infinite Scroll',
  'input':                 'Input',
  'input-otp':             'Input OTP',
  'input-password-toggle': 'Input Password Toggle',
  'item':                  'Item',
  'item-divider':          'Item Divider',
  'item-group':            'Item Group',
  'item-sliding':          'Item Sliding',
  'label':                 'Label',
  'list':                  'List',
  'list-header':           'List Header',
  'loading':               'Loading',
  'menu':                  'Menu',
  'modal':                 'Modal',
  'nav':                   'Nav',
  'note':                  'Note',
  'picker':                'Picker',
  'popover':               'Popover',
  'progress-bar':          'Progress Bar',
  'radio':                 'Radio',
  'radio-group':           'Radio Group',
  'range':                 'Range',
  'refresher':             'Refresher',
  'reorder':               'Reorder',
  'ripple-effect':         'Ripple Effect',
  'searchbar':             'Searchbar',
  'segment':               'Segment',
  'segment-button':        'Segment Button',
  'select':                'Select',
  'skeleton-text':         'Skeleton Text',
  'spinner':               'Spinner',
  'split-pane':            'Split Pane',
  'tabs':                  'Tabs',
  'text':                  'Text',
  'textarea':              'Textarea',
  'thumbnail':             'Thumbnail',
  'title':                 'Title',
  'toast':                 'Toast',
  'toggle':                'Toggle',
  'toolbar':               'Toolbar',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Convert kebab-case parts to PascalCase filename.
 * e.g. ["basic"] -> "Basic"
 *      ["inline", "basic"] -> "InlineBasic"
 */
function toPascalCase(parts) {
  return parts.map(p => p.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')).join('');
}

/**
 * Convert kebab-case to a human-readable display name.
 * e.g. "inline-basic" -> "Inline Basic"
 */
function toDisplayName(kebab) {
  return kebab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

/**
 * Extract raw SFC content from markdown fenced code block.
 * Returns the content between the first ```html ... ``` pair.
 */
function extractSfcFromMarkdown(md) {
  const match = md.match(/^```html\n([\s\S]*?)\n```/m);
  if (!match) return null;
  return match[1];
}

/**
 * Split a Vue SFC string into { template, script, style } sections.
 * Returns { template: string, script: string, style: string }
 * Each value is the full tag including opening/closing tags.
 */
function parseSfc(sfc) {
  // template section
  const templateMatch = sfc.match(/<template>([\s\S]*?)<\/template>/);
  // script section (support lang="ts")
  const scriptMatch = sfc.match(/<script\b[^>]*>([\s\S]*?)<\/script>/);
  const scriptTagMatch = sfc.match(/(<script\b[^>]*>)([\s\S]*?)(<\/script>)/);
  // style section
  const styleMatch = sfc.match(/<style\b[^>]*>[\s\S]*?<\/style>/);

  return {
    templateInner: templateMatch ? templateMatch[1] : '',
    scriptOpenTag: scriptTagMatch ? scriptTagMatch[1] : '<script setup lang="ts">',
    scriptInner: scriptTagMatch ? scriptTagMatch[2] : (scriptMatch ? scriptMatch[1] : ''),
    styleBlock: styleMatch ? styleMatch[0] : '',
  };
}

/**
 * Determine if the template has a top-level page structure.
 * "Has page structure" means the trimmed content starts with <ion-header> or <ion-content>
 * as its very first meaningful tag (these are the templates that are meant to be
 * directly inside an ion-page, not wrapped inside another container).
 */
function hasPageStructure(templateInner) {
  const trimmed = templateInner.trim();
  // Starts with <ion-header or <ion-content at the top level
  return /^<ion-header[\s>]/.test(trimmed) || /^<ion-content[\s>]/.test(trimmed);
}

/**
 * Check if the template already has an <ion-page> wrapper.
 */
function hasIonPage(templateInner) {
  return /<ion-page[\s>]/.test(templateInner.trim());
}

/**
 * Merge additional imports into the existing @ionic/vue import statement.
 * If no @ionic/vue import exists, prepend one.
 */
function mergeIonicImports(scriptInner, extraImports) {
  if (extraImports.length === 0) return scriptInner;

  const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"]@ionic\/vue['"]/;
  const match = scriptInner.match(importRegex);

  if (match) {
    const existing = match[1].split(',').map(s => s.trim()).filter(Boolean);
    const merged = [...new Set([...existing, ...extraImports])].sort();
    const mergedStr = merged.length > 3
      ? '\n  ' + merged.join(',\n  ') + ',\n'
      : merged.join(', ');
    return scriptInner.replace(importRegex, `import { ${mergedStr} } from '@ionic/vue'`);
  } else {
    // No existing @ionic/vue import – prepend one
    const importLine = `import { ${extraImports.sort().join(', ')} } from '@ionic/vue';\n`;
    return importLine + scriptInner;
  }
}

/**
 * Escape content for use inside a template literal (const sourceCode = `...`).
 */
function escapeTemplateLiteral(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
    .replace(/<\/script>/g, '<\\/script>');
}

/**
 * Build the source code display section HTML snippet.
 */
function buildSourceSection() {
  return `\n<div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
  <details>
    <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
    <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
  </details>
</div>`;
}

/**
 * Replace external image URLs with local asset paths.
 */
function replaceImageUrls(str) {
  let result = str;
  for (const { pattern, replacement } of IMAGE_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

/**
 * Inject `<ion-buttons slot="start"><ion-menu-button /></ion-buttons>` into the
 * FIRST `<ion-toolbar>` found in the string, and replace the FIRST `<ion-title>`
 * content with the given title.
 *
 * Returns the modified string.
 */
function injectMenuButtonAndTitle(html, title) {
  let result = html;

  // Inject menu button into the first <ion-toolbar>
  result = result.replace(/<ion-toolbar([^>]*)>/, (match) => {
    return `${match}\n      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>`;
  });

  // Replace the first <ion-title>...</ion-title> content
  let titleReplaced = false;
  result = result.replace(/<ion-title([^>]*)>([\s\S]*?)<\/ion-title>/, (match, attrs) => {
    if (!titleReplaced) {
      titleReplaced = true;
      return `<ion-title${attrs}>${title}</ion-title>`;
    }
    return match;
  });

  return result;
}

/**
 * Add source section before the LAST </ion-content> in the string.
 */
function injectSourceBeforeLastIonContent(html) {
  const lastIdx = html.lastIndexOf('</ion-content>');
  if (lastIdx === -1) return html + buildSourceSection();
  return html.slice(0, lastIdx) + buildSourceSection() + '\n' + html.slice(lastIdx);
}

/**
 * Transform a parsed SFC into a full demo Vue SFC string.
 *
 * @param {object} parsed     - Result of parseSfc()
 * @param {string} originalSfc - The raw SFC text (before parsing) for sourceCode
 * @param {string} componentName - Display name, e.g. "Button"
 * @param {string} demoName  - Display name, e.g. "Basic"
 * @returns {string} Full Vue SFC text
 */
function transformSfc(parsed, originalSfc, componentName, demoName) {
  const { templateInner, scriptOpenTag, scriptInner, styleBlock } = parsed;
  const pageTitle = `${componentName} / ${demoName}`;

  // Escape source for template literal
  const escapedSource = escapeTemplateLiteral(originalSfc.trim());

  // Source code const to inject into script
  const sourceCodeConst = `\nconst sourceCode = \`${escapedSource}\`;\n`;

  let finalTemplate;
  let extraPageImports = [...PAGE_IMPORTS]; // start with all, trim unused below

  if (hasIonPage(templateInner)) {
    // Template already has ion-page: inject menu button + update title + add source section
    let inner = templateInner;
    inner = injectMenuButtonAndTitle(inner, pageTitle);
    inner = injectSourceBeforeLastIonContent(inner);
    inner = replaceImageUrls(inner);
    finalTemplate = `<template>\n${inner}\n</template>`;

    // IonPage already imported; we still inject menu button so keep PAGE_IMPORTS
  } else if (hasPageStructure(templateInner)) {
    // Has <ion-header>/<ion-content> at top level but no <ion-page> wrapper
    let inner = templateInner.trim();
    inner = injectMenuButtonAndTitle(inner, pageTitle);
    inner = injectSourceBeforeLastIonContent(inner);
    inner = replaceImageUrls(inner);
    finalTemplate = `<template>\n  <ion-page>\n    ${inner.split('\n').join('\n    ')}\n  </ion-page>\n</template>`;
  } else {
    // No page structure: wrap entirely
    const sourceSection = buildSourceSection();
    let inner = templateInner.trim();
    inner = replaceImageUrls(inner);

    finalTemplate = `<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>${pageTitle}</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      ${inner.split('\n').join('\n      ')}
      ${sourceSection.trim().split('\n').join('\n      ')}
    </ion-content>
  </ion-page>
</template>`;
  }

  // Determine which page-level imports are actually referenced in the final template
  const neededPageImports = PAGE_IMPORTS.filter(imp => {
    // Convert PascalCase import name to kebab-case tag
    const tag = imp.replace(/([A-Z])/g, (m, c, idx) => (idx === 0 ? '' : '-') + c.toLowerCase()).replace(/^-/, '');
    return finalTemplate.includes(`<${tag}`) || finalTemplate.includes(`<${tag} `) || finalTemplate.includes(`<${tag}/>`);
  });

  // Merge imports
  let finalScript = mergeIonicImports(scriptInner, neededPageImports);

  // Inject sourceCode const after the last import statement.
  // Import statements can span multiple lines, so find the last line containing
  // `from '...'` or `from "..."` which marks the end of an import.
  const lines = finalScript.split('\n');
  let lastImportEndIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/from\s+['"]/.test(lines[i])) lastImportEndIdx = i;
  }
  if (lastImportEndIdx >= 0) {
    lines.splice(lastImportEndIdx + 1, 0, sourceCodeConst);
    finalScript = lines.join('\n');
  } else {
    finalScript = finalScript + sourceCodeConst;
  }

  // Build final SFC
  const parts = [finalTemplate, `${scriptOpenTag}${finalScript}</script>`];
  if (styleBlock) parts.push(styleBlock);

  return parts.join('\n\n') + '\n';
}

// ---------------------------------------------------------------------------
// Discovery: find all vue.md files
// ---------------------------------------------------------------------------

/**
 * Recursively find all vue.md files under a directory.
 * Returns array of absolute file paths.
 */
function findVueMdFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findVueMdFiles(full));
    } else if (entry.name === 'vue.md') {
      results.push(full);
    }
  }
  return results;
}

/**
 * Given an absolute path to a vue.md file, return:
 *   { componentSlug, demoParts, demoName, outPath }
 *
 * Path structure: {IONIC_DOCS_ROOT}/{componentSlug}/[subDirs...]/vue.md
 *
 * - componentSlug: first path segment after IONIC_DOCS_ROOT
 * - demoParts: remaining path segments (between componentSlug and vue.md)
 * - demoName: PascalCase of demoParts
 * - outPath: absolute output path for the generated .vue file
 */
function parseVueMdPath(absPath) {
  const rel = path.relative(IONIC_DOCS_ROOT, absPath); // e.g. "button/basic/vue.md"
  const parts = rel.split('/');
  // parts[-1] is "vue.md", parts[0] is componentSlug
  const componentSlug = parts[0];
  const demoParts = parts.slice(1, -1); // everything between component and vue.md

  if (demoParts.length === 0) {
    // Directly under component: should not normally happen, skip
    return null;
  }

  const demoFileName = toPascalCase(demoParts) + '.vue';
  const outPath = path.join(DEMOS_OUT_DIR, componentSlug, demoFileName);

  // Human-readable demo name (join parts with space, title-cased)
  const demoDisplayName = demoParts.map(p => toDisplayName(p)).join(' ');

  // Slug for catalog-data
  const demoSlug = demoParts.join('-');

  return { componentSlug, demoParts, demoDisplayName, demoSlug, demoFileName, outPath };
}

// ---------------------------------------------------------------------------
// catalog-data.ts generation
// ---------------------------------------------------------------------------

/**
 * Ordered list of categories (preserving sidebar order).
 */
const CATEGORY_ORDER = [
  'Accordion',
  'Action Sheet',
  'Alert',
  'Badge',
  'Breadcrumbs',
  'Button',
  'Card',
  'Checkbox',
  'Chip',
  'Content',
  'Date & Time Pickers',
  'Floating Action Button',
  'Grid',
  'Icons',
  'Infinite Scroll',
  'Inputs',
  'Item',
  'List',
  'Media',
  'Menu',
  'Modal',
  'Navigation',
  'Popover',
  'Progress Indicators',
  'Radio',
  'Range',
  'Refresher',
  'Reorder',
  'Searchbar',
  'Segment',
  'Select',
  'Tabs',
  'Toast',
  'Toggle',
  'Toolbar',
  'Typography',
];

function buildCatalogData(generatedFiles) {
  // generatedFiles: array of { componentSlug, demoDisplayName, demoSlug, demoFileName }

  // Group by componentSlug -> demos
  const componentMap = new Map(); // componentSlug -> { displayName, demos: [{name, slug}] }

  for (const f of generatedFiles) {
    if (!componentMap.has(f.componentSlug)) {
      const displayName = COMPONENT_DISPLAY_NAMES[f.componentSlug]
        || toDisplayName(f.componentSlug);
      componentMap.set(f.componentSlug, { displayName, demos: [] });
    }
    componentMap.get(f.componentSlug).demos.push({
      name: f.demoDisplayName,
      slug: f.demoSlug,
    });
  }

  // Build category -> components structure
  const categoryComponentMap = new Map(); // categoryName -> Map<componentSlug, {...}>

  for (const [slug, data] of componentMap.entries()) {
    const catName = CATEGORY_MAP[slug] || 'Other';
    if (!categoryComponentMap.has(catName)) {
      categoryComponentMap.set(catName, new Map());
    }
    categoryComponentMap.get(catName).set(slug, data);
  }

  // Build ordered array
  const categories = [];
  for (const catName of CATEGORY_ORDER) {
    if (!categoryComponentMap.has(catName)) continue;
    const compMap = categoryComponentMap.get(catName);
    const components = [];
    for (const [slug, data] of compMap.entries()) {
      if (data.demos.length === 0) continue;
      components.push({
        name: data.displayName,
        slug,
        demos: data.demos,
      });
    }
    if (components.length === 0) continue;
    categories.push({ name: catName, components });
  }

  // Also append any "Other" category that wasn't in CATEGORY_ORDER
  if (categoryComponentMap.has('Other')) {
    const compMap = categoryComponentMap.get('Other');
    const components = [];
    for (const [slug, data] of compMap.entries()) {
      if (data.demos.length === 0) continue;
      components.push({ name: data.displayName, slug, demos: data.demos });
    }
    if (components.length > 0) {
      categories.push({ name: 'Other', components });
    }
  }

  return categories;
}

function renderCatalogDataTs(categories) {
  const lines = [];
  lines.push(`export type SubDemo = { name: string; slug: string };`);
  lines.push(`export type CatalogComponent = { name: string; slug: string; demos: SubDemo[] };`);
  lines.push(`export type Category = { name: string; components: CatalogComponent[] };`);
  lines.push(``);
  lines.push(`export const categories: Category[] = [`);

  for (const cat of categories) {
    lines.push(`  {`);
    lines.push(`    name: ${JSON.stringify(cat.name)},`);
    lines.push(`    components: [`);
    for (const comp of cat.components) {
      lines.push(`      {`);
      lines.push(`        name: ${JSON.stringify(comp.name)},`);
      lines.push(`        slug: ${JSON.stringify(comp.slug)},`);
      lines.push(`        demos: [`);
      for (const demo of comp.demos) {
        lines.push(`          { name: ${JSON.stringify(demo.name)}, slug: ${JSON.stringify(demo.slug)} },`);
      }
      lines.push(`        ],`);
      lines.push(`      },`);
    }
    lines.push(`    ],`);
    lines.push(`  },`);
  }

  lines.push(`];`);
  lines.push(``);
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('=== generate-catalog-demos ===');
  console.log(`Source: ${IONIC_DOCS_ROOT}`);
  console.log(`Output: ${DEMOS_OUT_DIR}`);
  console.log('');

  if (!fs.existsSync(IONIC_DOCS_ROOT)) {
    console.error(`ERROR: ionic-docs directory not found at ${IONIC_DOCS_ROOT}`);
    console.error('Run: git clone https://github.com/ionic-team/ionic-docs /tmp/ionic-docs');
    process.exit(1);
  }

  // Ensure output directory exists
  fs.mkdirSync(DEMOS_OUT_DIR, { recursive: true });

  // Find all vue.md files
  const vueMdFiles = findVueMdFiles(IONIC_DOCS_ROOT);
  console.log(`Found ${vueMdFiles.length} vue.md files\n`);

  let generated = 0;
  let skipped = 0;
  const generatedFiles = []; // for catalog-data
  let currentComponent = null;

  for (const absPath of vueMdFiles.sort()) {
    const info = parseVueMdPath(absPath);
    if (!info) {
      console.warn(`  SKIP (no demo parts): ${absPath}`);
      skipped++;
      continue;
    }

    const { componentSlug, demoDisplayName, demoSlug, outPath } = info;

    // Print component header when it changes
    if (componentSlug !== currentComponent) {
      currentComponent = componentSlug;
      console.log(`[${componentSlug}]`);
    }

    try {
      const md = fs.readFileSync(absPath, 'utf8');
      const rawSfc = extractSfcFromMarkdown(md);

      if (!rawSfc) {
        console.warn(`  SKIP (no SFC in markdown): ${path.relative(IONIC_DOCS_ROOT, absPath)}`);
        skipped++;
        continue;
      }

      const parsed = parseSfc(rawSfc);
      if (!parsed.templateInner.trim()) {
        console.warn(`  SKIP (empty template): ${path.relative(IONIC_DOCS_ROOT, absPath)}`);
        skipped++;
        continue;
      }

      // Get component display name
      const componentDisplayName = COMPONENT_DISPLAY_NAMES[componentSlug] || toDisplayName(componentSlug);

      // Transform
      const outputSfc = transformSfc(parsed, rawSfc, componentDisplayName, demoDisplayName);

      // Ensure component subdirectory exists
      const componentOutDir = path.dirname(outPath);
      fs.mkdirSync(componentOutDir, { recursive: true });

      // Write file
      fs.writeFileSync(outPath, outputSfc, 'utf8');
      console.log(`  + ${path.relative(DEMOS_OUT_DIR, outPath)}`);

      generatedFiles.push({ componentSlug, demoDisplayName, demoSlug });
      generated++;
    } catch (err) {
      console.error(`  ERROR processing ${path.relative(IONIC_DOCS_ROOT, absPath)}: ${err.message}`);
      skipped++;
    }
  }

  // Generate catalog-data.ts
  console.log('\nGenerating catalog-data.ts...');
  try {
    const categories = buildCatalogData(generatedFiles);
    const tsContent = renderCatalogDataTs(categories);
    fs.writeFileSync(CATALOG_DATA_OUT, tsContent, 'utf8');
    console.log(`  Written: ${CATALOG_DATA_OUT}`);
  } catch (err) {
    console.error(`  ERROR writing catalog-data.ts: ${err.message}`);
  }

  console.log('\n=== Summary ===');
  console.log(`  Generated: ${generated}`);
  console.log(`  Skipped:   ${skipped}`);
  console.log(`  Total:     ${generated + skipped}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
