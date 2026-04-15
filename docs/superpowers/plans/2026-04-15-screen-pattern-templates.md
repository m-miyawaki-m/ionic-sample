# 画面パターンテンプレート Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 倉庫管理アプリの業務画面を6つの画面パターンテンプレートとして再構築する。各ファイルは完全独立でコピペのベースとして使える。

**Architecture:** 各パターンは1 Vueファイル完全独立。ion-menu（サイドドロワー）、開閉式条件エリア（+/-ボタン）、リスト/カード切替コンテンツ、2段固定フッター（画面ボタン+共通ボタン）の統一構造を持つ。ロジックは `ref()` + `v-for` のみ。

**Tech Stack:** Vue 3 (Composition API), Ionic Framework 7, TypeScript (@ts-nocheck)

**Spec:** `docs/superpowers/specs/2026-04-15-screen-pattern-templates-design.md`

---

## File Structure

| # | File | Action | Responsibility |
|---|------|--------|----------------|
| 1 | `src/views/samples/pickup/ScanInputPattern.vue` | Create | スキャン入力型テンプレート |
| 2 | `src/views/samples/pickup/ScanAccumulatePattern.vue` | Create | スキャン蓄積型テンプレート |
| 3 | `src/views/samples/pickup/SearchViewPattern.vue` | Create | 検索照会型テンプレート |
| 4 | `src/views/samples/pickup/InputHelpersPattern.vue` | Create | 入力補助パターン集テンプレート |
| 5 | `src/views/samples/pickup/InlineEditPattern.vue` | Create | インライン編集型テンプレート |
| 6 | `src/views/samples/pickup/DetailScreenPattern.vue` | Create | 詳細表示・編集型テンプレート（モーダル版+一覧） |
| 7 | `src/views/samples/pickup/DetailScreenDetailPage.vue` | Create | 詳細表示・編集型の別ページ版 |
| 8 | `src/router/index.ts` | Modify | 7ルート追加 |
| 9 | `src/views/samples/pickup/PickupIndex.vue` | Modify | 6カード追加 |

---

## Task 1: ScanInputPattern — スキャン入力型

**Files:**
- Create: `src/views/samples/pickup/ScanInputPattern.vue`

- [ ] **Step 1: Create ScanInputPattern.vue**

```vue
<template>
  <ion-page>
    <!-- サイドドロワー -->
    <ion-menu side="start" content-id="scan-input-main">
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item router-link="/samples/pickup/scan-input" class="menu-active">
            <ion-icon :icon="scanOutline" slot="start" />
            <ion-label>スキャン入力型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/scan-accumulate">
            <ion-icon :icon="layersOutline" slot="start" />
            <ion-label>スキャン蓄積型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/search-view">
            <ion-icon :icon="searchOutline" slot="start" />
            <ion-label>検索照会型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/input-helpers">
            <ion-icon :icon="constructOutline" slot="start" />
            <ion-label>入力補助パターン</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/inline-edit">
            <ion-icon :icon="createOutline" slot="start" />
            <ion-label>インライン編集型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/detail-screen">
            <ion-icon :icon="documentTextOutline" slot="start" />
            <ion-label>詳細表示・編集型</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div id="scan-input-main">
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>スキャン入力型</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- 条件エリア -->
        <div class="condition-area">
          <div class="condition-header">
            <span class="condition-title">入力条件</span>
            <div class="condition-buttons">
              <ion-button size="small" fill="solid" color="success" @click="isOpen = true">+</ion-button>
              <ion-button size="small" fill="solid" color="danger" @click="isOpen = false">−</ion-button>
            </div>
          </div>
          <div v-show="isOpen" class="condition-body">
            <ion-list>
              <ion-item>
                <ion-input label="ロケーション" label-placement="stacked" placeholder="棚番を入力" v-model="form.location" />
              </ion-item>
              <ion-item>
                <ion-input label="品目コード" label-placement="stacked" placeholder="品目コードを入力" v-model="form.itemCode">
                  <ion-icon :icon="searchOutline" slot="end" />
                </ion-input>
              </ion-item>
              <ion-item>
                <ion-input label="数量" label-placement="stacked" type="number" placeholder="0" v-model="form.quantity" />
              </ion-item>
              <ion-item>
                <ion-input label="ロット番号" label-placement="stacked" placeholder="ロット番号" v-model="form.lotNumber" />
              </ion-item>
            </ion-list>
            <ion-button expand="block" color="primary" class="ion-margin-top">検索</ion-button>
          </div>
        </div>

        <!-- コンテンツ: 登録済み履歴 -->
        <div class="content-area">
          <p class="result-count">登録済み {{ items.length }}件</p>
          <ion-list>
            <ion-item v-for="item in items" :key="item.id">
              <ion-label>
                <h3>{{ item.itemCode }} {{ item.itemName }}</h3>
                <p>棚: {{ item.location }} / 数量: {{ item.quantity }} / ロット: {{ item.lotNumber }}</p>
              </ion-label>
              <ion-badge slot="end" :color="item.status === 'OK' ? 'success' : 'danger'">{{ item.status }}</ion-badge>
              <ion-button slot="end" fill="clear" size="small">詳細</ion-button>
            </ion-item>
          </ion-list>
        </div>
      </ion-content>

      <ion-footer>
        <ion-toolbar class="screen-buttons">
          <ion-buttons slot="start">
            <ion-button fill="outline" color="primary">登録確定</ion-button>
            <ion-button fill="outline" color="medium">クリア</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button fill="clear" size="small">先頭</ion-button>
            <ion-button fill="clear" size="small">前へ</ion-button>
            <ion-button fill="clear" size="small">次へ</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-toolbar class="common-buttons">
          <ion-buttons slot="start">
            <ion-button fill="solid" color="medium">
              <ion-icon :icon="menuOutline" slot="start" />
              メニュー
            </ion-button>
            <ion-button fill="solid" color="tertiary">
              <ion-icon :icon="scanOutline" slot="start" />
              スキャン
            </ion-button>
            <ion-button fill="solid" color="dark">
              <ion-icon :icon="printOutline" slot="start" />
              印刷
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonMenu, IonMenuButton, IonButtons, IonButton, IonList, IonItem,
  IonLabel, IonInput, IonIcon, IonBadge,
} from '@ionic/vue';
import {
  searchOutline, scanOutline, layersOutline, constructOutline,
  createOutline, documentTextOutline, menuOutline, printOutline,
} from 'ionicons/icons';

const isOpen = ref(true);

const form = ref({
  location: '',
  itemCode: '',
  quantity: '',
  lotNumber: '',
});

const items = ref([
  { id: 1, itemCode: 'BP-001', itemName: 'ボールペン（黒）', location: 'A-01', quantity: 150, lotNumber: 'L2025-001', status: 'OK' },
  { id: 2, itemCode: 'PP-A4', itemName: 'コピー用紙 A4', location: 'B-03', quantity: 8, lotNumber: 'L2025-002', status: 'NG' },
  { id: 3, itemCode: 'CF-010', itemName: 'クリアファイル', location: 'C-05', quantity: 45, lotNumber: 'L2025-003', status: 'OK' },
  { id: 4, itemCode: 'TP-100', itemName: '梱包テープ', location: 'D-02', quantity: 30, lotNumber: 'L2025-004', status: 'OK' },
  { id: 5, itemCode: 'EN-050', itemName: '封筒（角2）', location: 'A-07', quantity: 200, lotNumber: 'L2025-005', status: 'OK' },
]);
</script>

<style scoped>
.condition-area {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 16px;
}
.condition-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
}
.condition-title {
  font-weight: 600;
  font-size: 16px;
}
.condition-buttons {
  display: flex;
  gap: 4px;
}
.condition-body {
  padding-top: 8px;
}
.content-area {
  margin-top: 8px;
}
.result-count {
  font-size: 13px;
  color: var(--ion-color-medium);
  margin: 8px 0;
}
.screen-buttons {
  --border-width: 1px 0 0 0;
}
.common-buttons {
  --background: var(--ion-color-light);
}
.menu-active {
  --background: var(--ion-color-primary-tint);
  font-weight: 600;
}
</style>
```

- [ ] **Step 2: Verify build**

Run: `cd /home/miyaw/dev/learning/ionic-sample && npx vue-tsc --noEmit 2>&1 | head -20`
Expected: No errors related to ScanInputPattern

- [ ] **Step 3: Commit**

```bash
git add src/views/samples/pickup/ScanInputPattern.vue
git commit -m "feat: add ScanInputPattern template"
```

---

## Task 2: ScanAccumulatePattern — スキャン蓄積型

**Files:**
- Create: `src/views/samples/pickup/ScanAccumulatePattern.vue`

- [ ] **Step 1: Create ScanAccumulatePattern.vue**

```vue
<template>
  <ion-page>
    <!-- サイドドロワー -->
    <ion-menu side="start" content-id="scan-accumulate-main">
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item router-link="/samples/pickup/scan-input">
            <ion-icon :icon="scanOutline" slot="start" />
            <ion-label>スキャン入力型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/scan-accumulate" class="menu-active">
            <ion-icon :icon="layersOutline" slot="start" />
            <ion-label>スキャン蓄積型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/search-view">
            <ion-icon :icon="searchOutline" slot="start" />
            <ion-label>検索照会型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/input-helpers">
            <ion-icon :icon="constructOutline" slot="start" />
            <ion-label>入力補助パターン</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/inline-edit">
            <ion-icon :icon="createOutline" slot="start" />
            <ion-label>インライン編集型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/detail-screen">
            <ion-icon :icon="documentTextOutline" slot="start" />
            <ion-label>詳細表示・編集型</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div id="scan-accumulate-main">
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>スキャン蓄積型</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- 条件エリア -->
        <div class="condition-area">
          <div class="condition-header">
            <span class="condition-title">絞り込み条件</span>
            <div class="condition-buttons">
              <ion-button size="small" fill="solid" color="success" @click="isOpen = true">+</ion-button>
              <ion-button size="small" fill="solid" color="danger" @click="isOpen = false">−</ion-button>
            </div>
          </div>
          <div v-show="isOpen" class="condition-body">
            <ion-list>
              <ion-item>
                <ion-select label="種別" label-placement="stacked" placeholder="選択してください" v-model="filterType">
                  <ion-select-option value="all">すべて</ion-select-option>
                  <ion-select-option value="typeA">種別A</ion-select-option>
                  <ion-select-option value="typeB">種別B</ion-select-option>
                  <ion-select-option value="typeC">種別C</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-input label="日付" label-placement="stacked" type="date" v-model="filterDate" />
              </ion-item>
            </ion-list>
            <ion-button expand="block" color="primary" class="ion-margin-top">検索</ion-button>
          </div>
        </div>

        <!-- リスト/カード切替 -->
        <ion-segment v-model="viewMode">
          <ion-segment-button value="list">
            <ion-label>リスト</ion-label>
          </ion-segment-button>
          <ion-segment-button value="card">
            <ion-label>カード</ion-label>
          </ion-segment-button>
        </ion-segment>

        <!-- コンテンツ -->
        <div class="content-area">
          <p class="result-count">スキャン済み {{ items.length }}件</p>

          <!-- リスト表示 -->
          <ion-list v-if="viewMode === 'list'">
            <ion-item v-for="item in items" :key="item.id">
              <ion-label>
                <h3>No.{{ item.id }} {{ item.itemCode }} {{ item.itemName }}</h3>
                <p>数量: {{ item.quantity }} / 棚: {{ item.location }} / {{ item.scannedAt }}</p>
              </ion-label>
              <ion-badge slot="end" :color="item.status === 'OK' ? 'success' : 'danger'">{{ item.status }}</ion-badge>
            </ion-item>
          </ion-list>

          <!-- カード表示 -->
          <div v-if="viewMode === 'card'">
            <ion-card v-for="item in items" :key="item.id" :class="{ 'card-ng': item.status === 'NG' }">
              <ion-card-header>
                <div class="card-header-row">
                  <ion-card-subtitle>No.{{ item.id }}</ion-card-subtitle>
                  <ion-badge :color="item.status === 'OK' ? 'success' : 'danger'">{{ item.status }}</ion-badge>
                </div>
                <ion-card-title>{{ item.itemCode }} {{ item.itemName }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="card-grid">
                  <div class="card-field"><span class="card-label">数量</span><span>{{ item.quantity }}</span></div>
                  <div class="card-field"><span class="card-label">棚</span><span>{{ item.location }}</span></div>
                  <div class="card-field"><span class="card-label">ロット</span><span>{{ item.lotNumber }}</span></div>
                  <div class="card-field"><span class="card-label">時刻</span><span>{{ item.scannedAt }}</span></div>
                </div>
                <div class="card-actions">
                  <ion-button fill="outline" size="small">詳細</ion-button>
                  <ion-button fill="outline" size="small" color="warning">入力</ion-button>
                  <ion-button fill="outline" size="small" color="danger">削除</ion-button>
                </div>
              </ion-card-content>
            </ion-card>
          </div>
        </div>
      </ion-content>

      <ion-footer>
        <ion-toolbar class="screen-buttons">
          <ion-buttons slot="start">
            <ion-button fill="outline" color="primary">一括登録（{{ items.length }}件）</ion-button>
            <ion-button fill="outline" color="medium">全選択</ion-button>
            <ion-button fill="outline" color="danger">クリア</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button fill="clear" size="small">前へ</ion-button>
            <ion-button fill="clear" size="small">次へ</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-toolbar class="common-buttons">
          <ion-buttons slot="start">
            <ion-button fill="solid" color="medium">
              <ion-icon :icon="menuOutline" slot="start" />
              メニュー
            </ion-button>
            <ion-button fill="solid" color="tertiary">
              <ion-icon :icon="scanOutline" slot="start" />
              スキャン
            </ion-button>
            <ion-button fill="solid" color="dark">
              <ion-icon :icon="printOutline" slot="start" />
              印刷
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonMenu, IonMenuButton, IonButtons, IonButton, IonList, IonItem,
  IonLabel, IonInput, IonSelect, IonSelectOption, IonIcon, IonBadge,
  IonSegment, IonSegmentButton,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
} from '@ionic/vue';
import {
  searchOutline, scanOutline, layersOutline, constructOutline,
  createOutline, documentTextOutline, menuOutline, printOutline,
} from 'ionicons/icons';

const isOpen = ref(true);
const viewMode = ref('list');
const filterType = ref('all');
const filterDate = ref('');

const items = ref([
  { id: 1, itemCode: 'BP-001', itemName: 'ボールペン（黒）', location: 'A-01', quantity: 10, lotNumber: 'L001', scannedAt: '10:30', status: 'OK' },
  { id: 2, itemCode: 'PP-A4', itemName: 'コピー用紙 A4', location: 'B-03', quantity: 5, lotNumber: 'L002', scannedAt: '10:32', status: 'NG' },
  { id: 3, itemCode: 'CF-010', itemName: 'クリアファイル', location: 'C-05', quantity: 20, lotNumber: 'L003', scannedAt: '10:35', status: 'OK' },
  { id: 4, itemCode: 'TP-100', itemName: '梱包テープ', location: 'D-02', quantity: 15, lotNumber: 'L004', scannedAt: '10:38', status: 'OK' },
  { id: 5, itemCode: 'EN-050', itemName: '封筒（角2）', location: 'A-07', quantity: 50, lotNumber: 'L005', scannedAt: '10:40', status: 'NG' },
]);
</script>

<style scoped>
.condition-area {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 16px;
}
.condition-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
}
.condition-title {
  font-weight: 600;
  font-size: 16px;
}
.condition-buttons {
  display: flex;
  gap: 4px;
}
.condition-body {
  padding-top: 8px;
}
.content-area {
  margin-top: 12px;
}
.result-count {
  font-size: 13px;
  color: var(--ion-color-medium);
  margin: 8px 0;
}
.card-ng {
  border-left: 3px solid var(--ion-color-danger);
}
.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin-bottom: 8px;
}
.card-field {
  font-size: 13px;
}
.card-label {
  color: var(--ion-color-medium);
  margin-right: 4px;
}
.card-actions {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
}
.screen-buttons {
  --border-width: 1px 0 0 0;
}
.common-buttons {
  --background: var(--ion-color-light);
}
.menu-active {
  --background: var(--ion-color-primary-tint);
  font-weight: 600;
}
</style>
```

- [ ] **Step 2: Verify build**

Run: `cd /home/miyaw/dev/learning/ionic-sample && npx vue-tsc --noEmit 2>&1 | head -20`
Expected: No errors related to ScanAccumulatePattern

- [ ] **Step 3: Commit**

```bash
git add src/views/samples/pickup/ScanAccumulatePattern.vue
git commit -m "feat: add ScanAccumulatePattern template"
```

---

## Task 3: SearchViewPattern — 検索照会型

**Files:**
- Create: `src/views/samples/pickup/SearchViewPattern.vue`

- [ ] **Step 1: Create SearchViewPattern.vue**

```vue
<template>
  <ion-page>
    <!-- サイドドロワー -->
    <ion-menu side="start" content-id="search-view-main">
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item router-link="/samples/pickup/scan-input">
            <ion-icon :icon="scanOutline" slot="start" />
            <ion-label>スキャン入力型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/scan-accumulate">
            <ion-icon :icon="layersOutline" slot="start" />
            <ion-label>スキャン蓄積型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/search-view" class="menu-active">
            <ion-icon :icon="searchOutline" slot="start" />
            <ion-label>検索照会型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/input-helpers">
            <ion-icon :icon="constructOutline" slot="start" />
            <ion-label>入力補助パターン</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/inline-edit">
            <ion-icon :icon="createOutline" slot="start" />
            <ion-label>インライン編集型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/detail-screen">
            <ion-icon :icon="documentTextOutline" slot="start" />
            <ion-label>詳細表示・編集型</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div id="search-view-main">
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>検索照会型</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- 条件エリア -->
        <div class="condition-area">
          <div class="condition-header">
            <span class="condition-title">検索条件</span>
            <div class="condition-buttons">
              <ion-button size="small" fill="solid" color="success" @click="isOpen = true">+</ion-button>
              <ion-button size="small" fill="solid" color="danger" @click="isOpen = false">−</ion-button>
            </div>
          </div>
          <div v-show="isOpen" class="condition-body">
            <ion-searchbar placeholder="品目コード/名称" v-model="searchText" />
            <ion-list>
              <ion-item>
                <ion-select label="倉庫" label-placement="stacked" placeholder="選択" v-model="filterWarehouse">
                  <ion-select-option value="">すべて</ion-select-option>
                  <ion-select-option value="tokyo">東京倉庫</ion-select-option>
                  <ion-select-option value="osaka">大阪倉庫</ion-select-option>
                  <ion-select-option value="fukuoka">福岡倉庫</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-select label="棚" label-placement="stacked" placeholder="選択" v-model="filterShelf">
                  <ion-select-option value="">すべて</ion-select-option>
                  <ion-select-option value="A">棚A</ion-select-option>
                  <ion-select-option value="B">棚B</ion-select-option>
                  <ion-select-option value="C">棚C</ion-select-option>
                  <ion-select-option value="D">棚D</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-checkbox v-model="filterInStock">在庫ありのみ</ion-checkbox>
              </ion-item>
              <ion-item>
                <ion-checkbox v-model="filterLowStock">不足のみ</ion-checkbox>
              </ion-item>
            </ion-list>
            <ion-button expand="block" color="primary" class="ion-margin-top">検索</ion-button>
          </div>
        </div>

        <!-- コンテンツ: 検索結果 -->
        <div class="content-area">
          <p class="result-count">検索結果 {{ items.length }}件</p>
          <ion-list>
            <ion-item v-for="item in items" :key="item.id">
              <ion-label>
                <h3>{{ item.itemCode }} {{ item.itemName }}</h3>
                <p>倉庫: {{ item.warehouse }} / 棚: {{ item.shelf }}</p>
              </ion-label>
              <ion-note slot="end" :color="item.quantity < 10 ? 'danger' : 'success'">
                {{ item.quantity }}
              </ion-note>
              <ion-button slot="end" fill="clear" size="small">詳細</ion-button>
            </ion-item>
          </ion-list>
        </div>
      </ion-content>

      <ion-footer>
        <ion-toolbar class="screen-buttons">
          <ion-buttons slot="start">
            <ion-button fill="outline" color="medium">CSV出力</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button fill="clear" size="small">先頭</ion-button>
            <ion-button fill="clear" size="small">前へ</ion-button>
            <ion-button fill="clear" size="small">次へ</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-toolbar class="common-buttons">
          <ion-buttons slot="start">
            <ion-button fill="solid" color="medium">
              <ion-icon :icon="menuOutline" slot="start" />
              メニュー
            </ion-button>
            <ion-button fill="solid" color="tertiary">
              <ion-icon :icon="scanOutline" slot="start" />
              スキャン
            </ion-button>
            <ion-button fill="solid" color="dark">
              <ion-icon :icon="printOutline" slot="start" />
              印刷
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonMenu, IonMenuButton, IonButtons, IonButton, IonList, IonItem,
  IonLabel, IonInput, IonSelect, IonSelectOption, IonCheckbox,
  IonSearchbar, IonIcon, IonBadge, IonNote,
} from '@ionic/vue';
import {
  searchOutline, scanOutline, layersOutline, constructOutline,
  createOutline, documentTextOutline, menuOutline, printOutline,
} from 'ionicons/icons';

const isOpen = ref(true);
const searchText = ref('');
const filterWarehouse = ref('');
const filterShelf = ref('');
const filterInStock = ref(false);
const filterLowStock = ref(false);

const items = ref([
  { id: 1, itemCode: 'BP-001', itemName: 'ボールペン（黒）', warehouse: '東京倉庫', shelf: 'A-01', quantity: 150 },
  { id: 2, itemCode: 'PP-A4', itemName: 'コピー用紙 A4', warehouse: '東京倉庫', shelf: 'B-03', quantity: 8 },
  { id: 3, itemCode: 'CF-010', itemName: 'クリアファイル', warehouse: '東京倉庫', shelf: 'C-05', quantity: 45 },
  { id: 4, itemCode: 'TP-100', itemName: '梱包テープ', warehouse: '大阪倉庫', shelf: 'D-02', quantity: 30 },
  { id: 5, itemCode: 'EN-050', itemName: '封筒（角2）', warehouse: '大阪倉庫', shelf: 'A-07', quantity: 200 },
  { id: 6, itemCode: 'ST-020', itemName: 'ステープラー', warehouse: '福岡倉庫', shelf: 'B-01', quantity: 5 },
  { id: 7, itemCode: 'HL-005', itemName: '蛍光ペンセット', warehouse: '東京倉庫', shelf: 'A-03', quantity: 0 },
  { id: 8, itemCode: 'NB-A5', itemName: 'ノート A5', warehouse: '福岡倉庫', shelf: 'C-02', quantity: 120 },
]);
</script>

<style scoped>
.condition-area {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 16px;
}
.condition-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
}
.condition-title {
  font-weight: 600;
  font-size: 16px;
}
.condition-buttons {
  display: flex;
  gap: 4px;
}
.condition-body {
  padding-top: 8px;
}
.content-area {
  margin-top: 8px;
}
.result-count {
  font-size: 13px;
  color: var(--ion-color-medium);
  margin: 8px 0;
}
.screen-buttons {
  --border-width: 1px 0 0 0;
}
.common-buttons {
  --background: var(--ion-color-light);
}
.menu-active {
  --background: var(--ion-color-primary-tint);
  font-weight: 600;
}
</style>
```

- [ ] **Step 2: Verify build**

Run: `cd /home/miyaw/dev/learning/ionic-sample && npx vue-tsc --noEmit 2>&1 | head -20`
Expected: No errors related to SearchViewPattern

- [ ] **Step 3: Commit**

```bash
git add src/views/samples/pickup/SearchViewPattern.vue
git commit -m "feat: add SearchViewPattern template"
```

---

## Task 4: InputHelpersPattern — 入力補助パターン集

**Files:**
- Create: `src/views/samples/pickup/InputHelpersPattern.vue`

- [ ] **Step 1: Create InputHelpersPattern.vue**

```vue
<template>
  <ion-page>
    <!-- サイドドロワー -->
    <ion-menu side="start" content-id="input-helpers-main">
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item router-link="/samples/pickup/scan-input">
            <ion-icon :icon="scanOutline" slot="start" />
            <ion-label>スキャン入力型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/scan-accumulate">
            <ion-icon :icon="layersOutline" slot="start" />
            <ion-label>スキャン蓄積型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/search-view">
            <ion-icon :icon="searchOutline" slot="start" />
            <ion-label>検索照会型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/input-helpers" class="menu-active">
            <ion-icon :icon="constructOutline" slot="start" />
            <ion-label>入力補助パターン</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/inline-edit">
            <ion-icon :icon="createOutline" slot="start" />
            <ion-label>インライン編集型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/detail-screen">
            <ion-icon :icon="documentTextOutline" slot="start" />
            <ion-label>詳細表示・編集型</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div id="input-helpers-main">
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>入力補助パターン</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- 条件エリア（入力補助UIフル活用） -->
        <div class="condition-area">
          <div class="condition-header">
            <span class="condition-title">入力条件</span>
            <div class="condition-buttons">
              <ion-button size="small" fill="solid" color="success" @click="isOpen = true">+</ion-button>
              <ion-button size="small" fill="solid" color="danger" @click="isOpen = false">−</ion-button>
            </div>
          </div>
          <div v-show="isOpen" class="condition-body">
            <ion-list>
              <!-- プルダウン -->
              <ion-item>
                <ion-select label="倉庫選択" label-placement="stacked" placeholder="倉庫を選択" v-model="form.warehouse">
                  <ion-select-option value="tokyo">東京倉庫</ion-select-option>
                  <ion-select-option value="osaka">大阪倉庫</ion-select-option>
                  <ion-select-option value="fukuoka">福岡倉庫</ion-select-option>
                </ion-select>
              </ion-item>
              <!-- 検索アイコン付き入力（モーダル起動想定） -->
              <ion-item>
                <ion-input label="品目検索" label-placement="stacked" placeholder="品目コードを入力" v-model="form.itemCode">
                  <ion-icon :icon="searchOutline" slot="end" @click="isItemModalOpen = true" />
                </ion-input>
              </ion-item>
              <!-- 日付 -->
              <ion-item>
                <ion-input label="登録日" label-placement="stacked" type="date" v-model="form.registeredDate" />
              </ion-item>
              <!-- ラジオ -->
              <ion-radio-group v-model="form.category">
                <ion-list-header>
                  <ion-label>区分</ion-label>
                </ion-list-header>
                <ion-item>
                  <ion-radio value="normal">通常</ion-radio>
                </ion-item>
                <ion-item>
                  <ion-radio value="urgent">緊急</ion-radio>
                </ion-item>
                <ion-item>
                  <ion-radio value="return">返品</ion-radio>
                </ion-item>
              </ion-radio-group>
              <!-- チェックボックス -->
              <ion-item>
                <ion-checkbox v-model="form.includeInactive">無効品を含む</ion-checkbox>
              </ion-item>
              <ion-item>
                <ion-checkbox v-model="form.onlyDiff">差異ありのみ</ion-checkbox>
              </ion-item>
            </ion-list>
            <ion-button expand="block" color="primary" class="ion-margin-top">検索</ion-button>
          </div>
        </div>

        <!-- コンテンツ: 入力補助UIカタログ -->
        <div class="content-area">
          <div class="section">
            <h2>プルダウン（ion-select）</h2>
            <p class="section-desc">単一選択・複数選択のプルダウン</p>
            <ion-list>
              <ion-item>
                <ion-select label="単一選択" label-placement="stacked" placeholder="1つ選択" v-model="demo.singleSelect">
                  <ion-select-option value="a">選択肢A</ion-select-option>
                  <ion-select-option value="b">選択肢B</ion-select-option>
                  <ion-select-option value="c">選択肢C</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-select label="複数選択" label-placement="stacked" :multiple="true" placeholder="複数選択可" v-model="demo.multiSelect">
                  <ion-select-option value="x">オプションX</ion-select-option>
                  <ion-select-option value="y">オプションY</ion-select-option>
                  <ion-select-option value="z">オプションZ</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-list>
          </div>

          <div class="section">
            <h2>検索モーダル（ion-modal + ion-searchbar）</h2>
            <p class="section-desc">マスタ一覧から検索して選択</p>
            <ion-button @click="isItemModalOpen = true">品目マスタから選択</ion-button>
            <p v-if="form.itemCode" class="selected-value">選択中: {{ form.itemCode }}</p>
          </div>

          <div class="section">
            <h2>日付選択（ion-datetime）</h2>
            <p class="section-desc">カレンダーから日付を選択</p>
            <ion-datetime presentation="date" v-model="demo.selectedDate" />
          </div>

          <div class="section">
            <h2>確認ダイアログ（ion-alert）</h2>
            <p class="section-desc">OK/Cancel の確認ダイアログ</p>
            <ion-button @click="isAlertOpen = true">確認ダイアログを開く</ion-button>
          </div>
        </div>

        <!-- 品目検索モーダル -->
        <ion-modal :is-open="isItemModalOpen" @did-dismiss="isItemModalOpen = false">
          <ion-header>
            <ion-toolbar>
              <ion-title>品目検索</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="isItemModalOpen = false">閉じる</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-searchbar placeholder="品目コード/名称で検索" />
            <ion-list>
              <ion-item v-for="master in masterItems" :key="master.code" button @click="selectItem(master.code)">
                <ion-label>
                  <h3>{{ master.code }}</h3>
                  <p>{{ master.name }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-modal>

        <!-- 確認ダイアログ -->
        <ion-alert
          :is-open="isAlertOpen"
          header="確認"
          message="この操作を実行しますか？"
          :buttons="['キャンセル', 'OK']"
          @did-dismiss="isAlertOpen = false"
        />
      </ion-content>

      <ion-footer>
        <ion-toolbar class="screen-buttons">
          <ion-buttons slot="start">
            <ion-button fill="outline" color="primary">登録確定</ion-button>
            <ion-button fill="outline" color="medium">リセット</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-toolbar class="common-buttons">
          <ion-buttons slot="start">
            <ion-button fill="solid" color="medium">
              <ion-icon :icon="menuOutline" slot="start" />
              メニュー
            </ion-button>
            <ion-button fill="solid" color="tertiary">
              <ion-icon :icon="scanOutline" slot="start" />
              スキャン
            </ion-button>
            <ion-button fill="solid" color="dark">
              <ion-icon :icon="printOutline" slot="start" />
              印刷
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonMenu, IonMenuButton, IonButtons, IonButton, IonList, IonListHeader,
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonCheckbox, IonRadio, IonRadioGroup, IonSearchbar, IonDatetime,
  IonIcon, IonModal, IonAlert,
} from '@ionic/vue';
import {
  searchOutline, scanOutline, layersOutline, constructOutline,
  createOutline, documentTextOutline, menuOutline, printOutline,
} from 'ionicons/icons';

const isOpen = ref(true);
const isItemModalOpen = ref(false);
const isAlertOpen = ref(false);

const form = ref({
  warehouse: '',
  itemCode: '',
  registeredDate: '',
  category: 'normal',
  includeInactive: false,
  onlyDiff: false,
});

const demo = ref({
  singleSelect: '',
  multiSelect: [],
  selectedDate: '',
});

const masterItems = ref([
  { code: 'BP-001', name: 'ボールペン（黒）' },
  { code: 'PP-A4', name: 'コピー用紙 A4' },
  { code: 'CF-010', name: 'クリアファイル' },
  { code: 'TP-100', name: '梱包テープ' },
  { code: 'EN-050', name: '封筒（角2）' },
  { code: 'ST-020', name: 'ステープラー' },
]);

const selectItem = (code: string) => {
  form.value.itemCode = code;
  isItemModalOpen.value = false;
};
</script>

<style scoped>
.condition-area {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 16px;
}
.condition-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
}
.condition-title {
  font-weight: 600;
  font-size: 16px;
}
.condition-buttons {
  display: flex;
  gap: 4px;
}
.condition-body {
  padding-top: 8px;
}
.content-area {
  margin-top: 8px;
}
.section {
  margin-top: 24px;
}
.section h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}
.section-desc {
  color: var(--ion-color-medium);
  font-size: 14px;
  margin-bottom: 12px;
}
.selected-value {
  font-size: 13px;
  color: var(--ion-color-primary);
  margin-top: 4px;
}
.screen-buttons {
  --border-width: 1px 0 0 0;
}
.common-buttons {
  --background: var(--ion-color-light);
}
.menu-active {
  --background: var(--ion-color-primary-tint);
  font-weight: 600;
}
</style>
```

- [ ] **Step 2: Verify build**

Run: `cd /home/miyaw/dev/learning/ionic-sample && npx vue-tsc --noEmit 2>&1 | head -20`
Expected: No errors related to InputHelpersPattern

- [ ] **Step 3: Commit**

```bash
git add src/views/samples/pickup/InputHelpersPattern.vue
git commit -m "feat: add InputHelpersPattern template"
```

---

## Task 5: InlineEditPattern — インライン編集型

**Files:**
- Create: `src/views/samples/pickup/InlineEditPattern.vue`

- [ ] **Step 1: Create InlineEditPattern.vue**

```vue
<template>
  <ion-page>
    <!-- サイドドロワー -->
    <ion-menu side="start" content-id="inline-edit-main">
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item router-link="/samples/pickup/scan-input">
            <ion-icon :icon="scanOutline" slot="start" />
            <ion-label>スキャン入力型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/scan-accumulate">
            <ion-icon :icon="layersOutline" slot="start" />
            <ion-label>スキャン蓄積型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/search-view">
            <ion-icon :icon="searchOutline" slot="start" />
            <ion-label>検索照会型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/input-helpers">
            <ion-icon :icon="constructOutline" slot="start" />
            <ion-label>入力補助パターン</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/inline-edit" class="menu-active">
            <ion-icon :icon="createOutline" slot="start" />
            <ion-label>インライン編集型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/detail-screen">
            <ion-icon :icon="documentTextOutline" slot="start" />
            <ion-label>詳細表示・編集型</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div id="inline-edit-main">
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>インライン編集型</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- 条件エリア -->
        <div class="condition-area">
          <div class="condition-header">
            <span class="condition-title">絞り込み</span>
            <div class="condition-buttons">
              <ion-button size="small" fill="solid" color="success" @click="isOpen = true">+</ion-button>
              <ion-button size="small" fill="solid" color="danger" @click="isOpen = false">−</ion-button>
            </div>
          </div>
          <div v-show="isOpen" class="condition-body">
            <ion-list>
              <ion-item>
                <ion-select label="ステータス" label-placement="stacked" placeholder="選択" v-model="filterStatus">
                  <ion-select-option value="all">すべて</ion-select-option>
                  <ion-select-option value="ok">OK</ion-select-option>
                  <ion-select-option value="ng">NG</ion-select-option>
                  <ion-select-option value="pending">未確認</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-list>
            <ion-button expand="block" color="primary" class="ion-margin-top">検索</ion-button>
          </div>
        </div>

        <!-- コンテンツ: インライン編集リスト -->
        <div class="content-area">
          <p class="result-count">{{ items.length }}件</p>
          <div class="edit-list">
            <div v-for="item in items" :key="item.id" class="edit-row" :class="{ 'row-ng': item.status === 'NG' }">
              <!-- 行ヘッダー: チェック + 品名 + ステータス -->
              <div class="row-header">
                <ion-checkbox v-model="item.checked" />
                <span class="row-title">{{ item.itemCode }} {{ item.itemName }}</span>
                <ion-badge :color="item.status === 'OK' ? 'success' : item.status === 'NG' ? 'danger' : 'warning'">
                  {{ item.status }}
                </ion-badge>
              </div>
              <!-- 行内フィールド -->
              <div class="row-fields">
                <div class="field-pair">
                  <span class="field-label">予定</span>
                  <span class="field-readonly">{{ item.plannedQty }}</span>
                </div>
                <div class="field-pair">
                  <span class="field-label">実績</span>
                  <ion-input type="number" :value="item.actualQty" class="inline-input" />
                </div>
              </div>
              <div class="row-fields">
                <div class="field-pair field-wide">
                  <span class="field-label">備考</span>
                  <ion-input placeholder="備考を入力" :value="item.remarks" class="inline-input" />
                </div>
              </div>
              <div class="row-fields">
                <div class="field-pair">
                  <span class="field-label">区分</span>
                  <ion-select :value="item.category" placeholder="選択" class="inline-select" interface="popover">
                    <ion-select-option value="normal">通常</ion-select-option>
                    <ion-select-option value="urgent">緊急</ion-select-option>
                    <ion-select-option value="return">返品</ion-select-option>
                  </ion-select>
                </div>
                <div class="field-pair">
                  <ion-button v-if="!item.inputComplete" fill="outline" size="small" color="warning">入力</ion-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ion-content>

      <ion-footer>
        <ion-toolbar class="screen-buttons">
          <ion-buttons slot="start">
            <ion-button fill="outline" color="primary">登録確定</ion-button>
            <ion-button fill="outline" color="medium">全選択</ion-button>
            <ion-button fill="outline" color="danger">選択削除</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button fill="clear" size="small">前へ</ion-button>
            <ion-button fill="clear" size="small">次へ</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-toolbar class="common-buttons">
          <ion-buttons slot="start">
            <ion-button fill="solid" color="medium">
              <ion-icon :icon="menuOutline" slot="start" />
              メニュー
            </ion-button>
            <ion-button fill="solid" color="tertiary">
              <ion-icon :icon="scanOutline" slot="start" />
              スキャン
            </ion-button>
            <ion-button fill="solid" color="dark">
              <ion-icon :icon="printOutline" slot="start" />
              印刷
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonMenu, IonMenuButton, IonButtons, IonButton, IonList, IonItem,
  IonLabel, IonInput, IonSelect, IonSelectOption, IonCheckbox,
  IonIcon, IonBadge,
} from '@ionic/vue';
import {
  searchOutline, scanOutline, layersOutline, constructOutline,
  createOutline, documentTextOutline, menuOutline, printOutline,
} from 'ionicons/icons';

const isOpen = ref(true);
const filterStatus = ref('all');

const items = ref([
  { id: 1, itemCode: 'BP-001', itemName: 'ボールペン（黒）', plannedQty: 10, actualQty: 10, remarks: '', category: 'normal', status: 'OK', checked: true, inputComplete: true },
  { id: 2, itemCode: 'PP-A4', itemName: 'コピー用紙 A4', plannedQty: 20, actualQty: 15, remarks: '一部破損', category: 'normal', status: 'NG', checked: false, inputComplete: true },
  { id: 3, itemCode: 'CF-010', itemName: 'クリアファイル', plannedQty: 50, actualQty: 50, remarks: '', category: 'urgent', status: 'OK', checked: false, inputComplete: true },
  { id: 4, itemCode: 'TP-100', itemName: '梱包テープ', plannedQty: 30, actualQty: 0, remarks: '', category: '', status: '未確認', checked: false, inputComplete: false },
  { id: 5, itemCode: 'EN-050', itemName: '封筒（角2）', plannedQty: 100, actualQty: 0, remarks: '', category: '', status: '未確認', checked: false, inputComplete: false },
]);
</script>

<style scoped>
.condition-area {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 16px;
}
.condition-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
}
.condition-title {
  font-weight: 600;
  font-size: 16px;
}
.condition-buttons {
  display: flex;
  gap: 4px;
}
.condition-body {
  padding-top: 8px;
}
.content-area {
  margin-top: 8px;
}
.result-count {
  font-size: 13px;
  color: var(--ion-color-medium);
  margin: 8px 0;
}
.edit-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.edit-row {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 10px;
}
.row-ng {
  border-left: 3px solid var(--ion-color-danger);
}
.row-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.row-title {
  flex: 1;
  font-weight: 600;
  font-size: 14px;
}
.row-fields {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}
.field-pair {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
}
.field-wide {
  flex: 2;
}
.field-label {
  font-size: 12px;
  color: var(--ion-color-medium);
  min-width: 32px;
}
.field-readonly {
  font-size: 14px;
}
.inline-input {
  --padding-start: 8px;
  --padding-end: 4px;
  --background: var(--ion-color-light-shade);
  border-radius: 4px;
  font-size: 14px;
}
.inline-select {
  --padding-start: 4px;
  font-size: 13px;
}
.screen-buttons {
  --border-width: 1px 0 0 0;
}
.common-buttons {
  --background: var(--ion-color-light);
}
.menu-active {
  --background: var(--ion-color-primary-tint);
  font-weight: 600;
}
</style>
```

- [ ] **Step 2: Verify build**

Run: `cd /home/miyaw/dev/learning/ionic-sample && npx vue-tsc --noEmit 2>&1 | head -20`
Expected: No errors related to InlineEditPattern

- [ ] **Step 3: Commit**

```bash
git add src/views/samples/pickup/InlineEditPattern.vue
git commit -m "feat: add InlineEditPattern template"
```

---

## Task 6: DetailScreenPattern + DetailPage — 詳細表示・編集型

**Files:**
- Create: `src/views/samples/pickup/DetailScreenPattern.vue`
- Create: `src/views/samples/pickup/DetailScreenDetailPage.vue`

- [ ] **Step 1: Create DetailScreenPattern.vue (メイン画面 + モーダル版)**

```vue
<template>
  <ion-page>
    <!-- サイドドロワー -->
    <ion-menu side="start" content-id="detail-screen-main">
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item router-link="/samples/pickup/scan-input">
            <ion-icon :icon="scanOutline" slot="start" />
            <ion-label>スキャン入力型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/scan-accumulate">
            <ion-icon :icon="layersOutline" slot="start" />
            <ion-label>スキャン蓄積型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/search-view">
            <ion-icon :icon="searchOutline" slot="start" />
            <ion-label>検索照会型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/input-helpers">
            <ion-icon :icon="constructOutline" slot="start" />
            <ion-label>入力補助パターン</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/inline-edit">
            <ion-icon :icon="createOutline" slot="start" />
            <ion-label>インライン編集型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/detail-screen" class="menu-active">
            <ion-icon :icon="documentTextOutline" slot="start" />
            <ion-label>詳細表示・編集型</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div id="detail-screen-main">
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>詳細表示・編集型</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- 一覧リスト -->
        <div class="content-area">
          <p class="result-count">{{ items.length }}件</p>

          <ion-list>
            <ion-item v-for="item in items" :key="item.id">
              <ion-label>
                <h3>{{ item.itemCode }} {{ item.itemName }}</h3>
                <p>数量: {{ item.quantity }} / ロット: {{ item.lotNumber }}</p>
              </ion-label>
              <ion-button slot="end" fill="outline" size="small" @click="openModal(item)">詳細</ion-button>
              <ion-button slot="end" fill="outline" size="small" color="tertiary" :router-link="`/samples/pickup/detail-screen/detail/${item.id}`">別ページ</ion-button>
            </ion-item>
          </ion-list>
        </div>

        <!-- 詳細モーダル -->
        <ion-modal :is-open="isModalOpen" @did-dismiss="isModalOpen = false">
          <ion-header>
            <ion-toolbar>
              <ion-title>詳細・編集</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="isModalOpen = false">閉じる</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <div v-if="selectedItem">
              <!-- 読み取り専用 -->
              <ion-list-header>
                <ion-label color="medium">読み取り専用</ion-label>
              </ion-list-header>
              <ion-list>
                <ion-item>
                  <ion-label>
                    <p>品番</p>
                    <h3>{{ selectedItem.itemCode }}</h3>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <p>品名</p>
                    <h3>{{ selectedItem.itemName }}</h3>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <p>数量</p>
                    <h3>{{ selectedItem.quantity }}</h3>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <p>ロット</p>
                    <h3>{{ selectedItem.lotNumber }}</h3>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <p>スキャン時刻</p>
                    <h3>{{ selectedItem.scannedAt }}</h3>
                  </ion-label>
                </ion-item>
              </ion-list>

              <!-- 編集可能 -->
              <ion-list-header>
                <ion-label color="primary">編集可能</ion-label>
              </ion-list-header>
              <ion-list>
                <ion-item>
                  <ion-input label="保管場所" label-placement="stacked" placeholder="保管場所を入力" v-model="selectedItem.storageLoc" />
                </ion-item>
                <ion-item>
                  <ion-select label="区分" label-placement="stacked" placeholder="選択" v-model="selectedItem.category">
                    <ion-select-option value="normal">通常</ion-select-option>
                    <ion-select-option value="urgent">緊急</ion-select-option>
                    <ion-select-option value="return">返品</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-item>
                  <ion-textarea label="備考" label-placement="stacked" placeholder="備考を入力" v-model="selectedItem.remarks" :rows="3" />
                </ion-item>
              </ion-list>

              <div class="modal-actions">
                <ion-button expand="block" color="primary">保存</ion-button>
                <ion-button expand="block" fill="outline" @click="isModalOpen = false">戻る</ion-button>
              </div>
            </div>
          </ion-content>
        </ion-modal>
      </ion-content>

      <ion-footer>
        <ion-toolbar class="screen-buttons">
          <ion-buttons slot="end">
            <ion-button fill="clear" size="small">前へ</ion-button>
            <ion-button fill="clear" size="small">次へ</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-toolbar class="common-buttons">
          <ion-buttons slot="start">
            <ion-button fill="solid" color="medium">
              <ion-icon :icon="menuOutline" slot="start" />
              メニュー
            </ion-button>
            <ion-button fill="solid" color="tertiary">
              <ion-icon :icon="scanOutline" slot="start" />
              スキャン
            </ion-button>
            <ion-button fill="solid" color="dark">
              <ion-icon :icon="printOutline" slot="start" />
              印刷
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonMenu, IonMenuButton, IonButtons, IonButton, IonList, IonListHeader,
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea,
  IonIcon, IonModal,
} from '@ionic/vue';
import {
  searchOutline, scanOutline, layersOutline, constructOutline,
  createOutline, documentTextOutline, menuOutline, printOutline,
} from 'ionicons/icons';

const isModalOpen = ref(false);
const selectedItem = ref(null);

const items = ref([
  { id: 1, itemCode: 'BP-001', itemName: 'ボールペン（黒）', quantity: 150, lotNumber: 'L001', scannedAt: '10:30', storageLoc: '棚A-01', category: 'normal', remarks: '' },
  { id: 2, itemCode: 'PP-A4', itemName: 'コピー用紙 A4', quantity: 8, lotNumber: 'L002', scannedAt: '10:32', storageLoc: '棚B-03', category: '', remarks: '' },
  { id: 3, itemCode: 'CF-010', itemName: 'クリアファイル', quantity: 45, lotNumber: 'L003', scannedAt: '10:35', storageLoc: '', category: '', remarks: '' },
  { id: 4, itemCode: 'TP-100', itemName: '梱包テープ', quantity: 30, lotNumber: 'L004', scannedAt: '10:38', storageLoc: '棚D-02', category: 'urgent', remarks: '至急対応' },
]);

const openModal = (item) => {
  selectedItem.value = item;
  isModalOpen.value = true;
};
</script>

<style scoped>
.content-area {
  margin-top: 8px;
}
.result-count {
  font-size: 13px;
  color: var(--ion-color-medium);
  margin: 8px 0;
}
.modal-actions {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.screen-buttons {
  --border-width: 1px 0 0 0;
}
.common-buttons {
  --background: var(--ion-color-light);
}
.menu-active {
  --background: var(--ion-color-primary-tint);
  font-weight: 600;
}
</style>
```

- [ ] **Step 2: Create DetailScreenDetailPage.vue (別ページ版)**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup/detail-screen" />
        </ion-buttons>
        <ion-title>詳細・編集</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- 読み取り専用 -->
      <ion-list-header>
        <ion-label color="medium">読み取り専用</ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item>
          <ion-label>
            <p>品番</p>
            <h3>{{ item.itemCode }}</h3>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>品名</p>
            <h3>{{ item.itemName }}</h3>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>数量</p>
            <h3>{{ item.quantity }}</h3>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>ロット</p>
            <h3>{{ item.lotNumber }}</h3>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>スキャン時刻</p>
            <h3>{{ item.scannedAt }}</h3>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- 編集可能 -->
      <ion-list-header>
        <ion-label color="primary">編集可能</ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item>
          <ion-input label="保管場所" label-placement="stacked" placeholder="保管場所を入力" v-model="item.storageLoc" />
        </ion-item>
        <ion-item>
          <ion-select label="区分" label-placement="stacked" placeholder="選択" v-model="item.category">
            <ion-select-option value="normal">通常</ion-select-option>
            <ion-select-option value="urgent">緊急</ion-select-option>
            <ion-select-option value="return">返品</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-textarea label="備考" label-placement="stacked" placeholder="備考を入力" v-model="item.remarks" :rows="3" />
        </ion-item>
      </ion-list>

      <div class="page-actions">
        <ion-button expand="block" color="primary">保存</ion-button>
        <ion-button expand="block" fill="outline" router-link="/samples/pickup/detail-screen">戻る</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonList, IonListHeader,
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea,
} from '@ionic/vue';

// モックデータ（別ページなので独立して持つ）
const item = ref({
  itemCode: 'BP-001',
  itemName: 'ボールペン（黒）',
  quantity: 150,
  lotNumber: 'L001',
  scannedAt: '10:30',
  storageLoc: '棚A-01',
  category: 'normal',
  remarks: '',
});
</script>

<style scoped>
.page-actions {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
```

- [ ] **Step 3: Verify build**

Run: `cd /home/miyaw/dev/learning/ionic-sample && npx vue-tsc --noEmit 2>&1 | head -20`
Expected: No errors related to DetailScreenPattern or DetailScreenDetailPage

- [ ] **Step 4: Commit**

```bash
git add src/views/samples/pickup/DetailScreenPattern.vue src/views/samples/pickup/DetailScreenDetailPage.vue
git commit -m "feat: add DetailScreenPattern and DetailPage templates"
```

---

## Task 7: ルート追加 + PickupIndex 更新

**Files:**
- Modify: `src/router/index.ts:120-123` (textlinkルートの後に追加)
- Modify: `src/views/samples/pickup/PickupIndex.vue:53-67` (pickupItems配列に追加)

- [ ] **Step 1: Add routes to router/index.ts**

`src/router/index.ts` の textlink ルート（122行目付近）の後に以下を追加:

```typescript
  {
    path: '/samples/pickup/scan-input',
    component: () => import('@/views/samples/pickup/ScanInputPattern.vue'),
  },
  {
    path: '/samples/pickup/scan-accumulate',
    component: () => import('@/views/samples/pickup/ScanAccumulatePattern.vue'),
  },
  {
    path: '/samples/pickup/search-view',
    component: () => import('@/views/samples/pickup/SearchViewPattern.vue'),
  },
  {
    path: '/samples/pickup/input-helpers',
    component: () => import('@/views/samples/pickup/InputHelpersPattern.vue'),
  },
  {
    path: '/samples/pickup/inline-edit',
    component: () => import('@/views/samples/pickup/InlineEditPattern.vue'),
  },
  {
    path: '/samples/pickup/detail-screen',
    component: () => import('@/views/samples/pickup/DetailScreenPattern.vue'),
  },
  {
    path: '/samples/pickup/detail-screen/detail/:id',
    component: () => import('@/views/samples/pickup/DetailScreenDetailPage.vue'),
  },
```

- [ ] **Step 2: Add cards to PickupIndex.vue**

`src/views/samples/pickup/PickupIndex.vue` の `pickupItems` 配列末尾（`linkOutline` の行の後）に以下を追加。`script` の import に追加アイコンも必要:

import に追加:
```typescript
import {
  // ... existing imports ...
  scanOutline,
  layersOutline,
  searchOutline,
  constructOutline,
  documentTextOutline,
} from 'ionicons/icons';
```

pickupItems 配列に追加:
```typescript
  { slug: 'scan-input',    title: 'スキャン入力型',   description: 'スキャン→入力→登録',           icon: scanOutline },
  { slug: 'scan-accumulate', title: 'スキャン蓄積型', description: '連続スキャン→蓄積→一括登録',    icon: layersOutline },
  { slug: 'search-view',   title: '検索照会型',       description: '条件入力→検索→結果一覧',        icon: searchOutline },
  { slug: 'input-helpers',  title: '入力補助パターン', description: 'プルダウン/モーダル/日付/ラジオ', icon: constructOutline },
  { slug: 'inline-edit',   title: 'インライン編集型', description: 'リスト行内のチェック・入力・選択', icon: createOutline },
  { slug: 'detail-screen', title: '詳細表示・編集型', description: '一覧→モーダル/ページで詳細編集',  icon: documentTextOutline },
```

- [ ] **Step 3: Verify build**

Run: `cd /home/miyaw/dev/learning/ionic-sample && npx vue-tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 4: Verify in browser**

Run: `cd /home/miyaw/dev/learning/ionic-sample && npm run dev`

Check in browser:
1. `/samples/pickup` — 6つの新しいカードが表示される
2. 各パターンページに遷移できる
3. サイドドロワーが開いて6パターン間を移動できる
4. +/- で条件エリアが開閉する
5. フッターの2段構成（画面ボタン + 共通ボタン）が表示される

- [ ] **Step 5: Commit**

```bash
git add src/router/index.ts src/views/samples/pickup/PickupIndex.vue
git commit -m "feat: add routes and index cards for 6 screen pattern templates"
```
