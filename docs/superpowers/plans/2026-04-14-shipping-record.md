# 出荷実績登録画面 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** トップページから遷移できる出荷実績登録画面（メイン + 詳細/編集）を追加する

**Architecture:** PageLayout を使わず IonPage + IonHeader + IonContent + IonFooter で構成し、下部固定タブバー + 登録確定ボタンを実現する。スキャン結果は共有 composable（モジュールレベル singleton）で管理し、メイン画面と詳細/編集画面で状態を共有する。

**Tech Stack:** Ionic 8, Vue 3 Composition API, TypeScript, Ionicons

---

## File Structure

| Action | Path | Responsibility |
|---|---|---|
| Create | `src/composables/useShippingRecordStore.ts` | フォーム・スキャン結果の共有ステート管理 |
| Create | `src/views/ShippingRecordPage.vue` | メイン画面（入力・カード一覧・タブバー） |
| Create | `src/views/ShippingRecordDetailPage.vue` | 詳細/編集画面 |
| Modify | `src/types/index.ts` | ShippingRecordType, ShippingRecordItem, ShippingRecordForm 追加 |
| Modify | `src/router/index.ts` | /shipping-record, /shipping-record/detail/:id ルート追加 |
| Modify | `src/views/HomePage.vue` | menus 配列に出荷実績登録を追加 |

---

### Task 1: 型定義の追加

**Files:**
- Modify: `src/types/index.ts:77` (末尾に追加)

- [ ] **Step 1: 型定義を追加**

`src/types/index.ts` の末尾（`ParsedScanCode` の後）に追加:

```typescript
/** 出荷実績登録 — 種別 */
export type ShippingRecordType = 'typeA' | 'typeB' | 'typeC';

/** 出荷実績登録 — スキャン結果1件 */
export interface ShippingRecordItem {
  id: number;
  type: ShippingRecordType;
  itemCode: string;
  quantity: number;
  lotNumber: string;
  storageLoc: string;
  remarks: string;
  manualInputComplete: boolean;
  scannedAt: string;
}

/** 出荷実績登録 — フォーム */
export interface ShippingRecordForm {
  recordNumber: string;
  recordType: ShippingRecordType;
  registeredAt: string;
  category: string;
  memo1: string;
  memo2: string;
}
```

- [ ] **Step 2: TypeScript 型チェック**

Run: `npx vue-tsc --noEmit 2>&1 | head -20`
Expected: エラーなし（新しい型を追加しただけで既存に影響なし）

- [ ] **Step 3: コミット**

```bash
git add src/types/index.ts
git commit -m "feat: 出荷実績登録の型定義追加"
```

---

### Task 2: 共有ステート composable の作成

**Files:**
- Create: `src/composables/useShippingRecordStore.ts`

- [ ] **Step 1: composable を作成**

`src/composables/useShippingRecordStore.ts` を新規作成:

```typescript
import { reactive, computed } from 'vue';
import type { ShippingRecordItem, ShippingRecordForm, ShippingRecordType } from '@/types';

const toLocalDatetime = (d: Date) => {
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${y}-${mo}-${da}T${h}:${mi}`;
};

// ── モジュールレベル singleton（両画面で共有） ──
const form = reactive<ShippingRecordForm>({
  recordNumber: '',
  recordType: 'typeA',
  registeredAt: toLocalDatetime(new Date()),
  category: '',
  memo1: '',
  memo2: '',
});

const items = reactive<ShippingRecordItem[]>([]);
let nextId = 1;

// ── モック用スキャンデータ ──
const mockDataByType: Record<ShippingRecordType, Omit<ShippingRecordItem, 'id' | 'type' | 'scannedAt' | 'storageLoc' | 'remarks' | 'manualInputComplete'>[]> = {
  typeA: [
    { itemCode: 'A-001', quantity: 10, lotNumber: 'LA-2026-01' },
    { itemCode: 'A-002', quantity: 20, lotNumber: 'LA-2026-02' },
    { itemCode: 'A-003', quantity: 5,  lotNumber: 'LA-2026-03' },
  ],
  typeB: [
    { itemCode: 'B-001', quantity: 15, lotNumber: 'LB-2026-01' },
    { itemCode: 'B-002', quantity: 8,  lotNumber: 'LB-2026-02' },
    { itemCode: 'B-003', quantity: 30, lotNumber: 'LB-2026-03' },
  ],
  typeC: [
    { itemCode: 'C-001', quantity: 12, lotNumber: 'LC-2026-01' },
    { itemCode: 'C-002', quantity: 25, lotNumber: 'LC-2026-02' },
    { itemCode: 'C-003', quantity: 3,  lotNumber: 'LC-2026-03' },
  ],
};
const mockIndex: Record<ShippingRecordType, number> = { typeA: 0, typeB: 0, typeC: 0 };

export function useShippingRecordStore() {
  const filteredItems = computed(() =>
    items.filter((item) => item.type === form.recordType),
  );

  const filteredCount = computed(() => filteredItems.value.length);

  const totalCount = computed(() => items.length);

  const formatTime = (d: Date) => {
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const addScannedItem = () => {
    const type = form.recordType;
    const mockList = mockDataByType[type];
    const idx = mockIndex[type] % mockList.length;
    mockIndex[type]++;
    const mock = mockList[idx];

    // 奇数IDのアイテムは手入力が必要（デモ用）
    const needsManualInput = nextId % 2 === 1;

    items.unshift({
      ...mock,
      id: nextId++,
      type,
      storageLoc: needsManualInput ? '' : 'WH01-A01',
      remarks: needsManualInput ? '' : '自動入力済',
      manualInputComplete: !needsManualInput,
      scannedAt: formatTime(new Date()),
    });
  };

  const getItemById = (id: number) => items.find((item) => item.id === id);

  const updateItem = (id: number, updates: Partial<Pick<ShippingRecordItem, 'storageLoc' | 'remarks'>>) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (updates.storageLoc !== undefined) item.storageLoc = updates.storageLoc;
    if (updates.remarks !== undefined) item.remarks = updates.remarks;
    item.manualInputComplete = item.storageLoc !== '' && item.remarks !== '';
  };

  const removeItem = (id: number) => {
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) items.splice(idx, 1);
  };

  const clearAll = () => {
    items.splice(0, items.length);
    nextId = 1;
    mockIndex.typeA = 0;
    mockIndex.typeB = 0;
    mockIndex.typeC = 0;
  };

  const getUnfilledFields = (item: ShippingRecordItem): string[] => {
    const fields: string[] = [];
    if (!item.storageLoc) fields.push('保管場所');
    if (!item.remarks) fields.push('備考');
    return fields;
  };

  return {
    form,
    items,
    filteredItems,
    filteredCount,
    totalCount,
    addScannedItem,
    getItemById,
    updateItem,
    removeItem,
    clearAll,
    getUnfilledFields,
  };
}
```

- [ ] **Step 2: TypeScript 型チェック**

Run: `npx vue-tsc --noEmit 2>&1 | head -20`
Expected: エラーなし

- [ ] **Step 3: コミット**

```bash
git add src/composables/useShippingRecordStore.ts
git commit -m "feat: 出荷実績登録の共有ステート composable 追加"
```

---

### Task 3: ルーティング追加

**Files:**
- Modify: `src/router/index.ts:57` (Relocation ルートの後に追加)

- [ ] **Step 1: ルート追加**

`src/router/index.ts` の Relocation ルート (`path: '/relocation'`) のブロック（58行目の `},`）の後に追加:

```typescript
  {
    path: '/shipping-record',
    name: 'ShippingRecord',
    component: () => import('@/views/ShippingRecordPage.vue'),
  },
  {
    path: '/shipping-record/detail/:id',
    name: 'ShippingRecordDetail',
    component: () => import('@/views/ShippingRecordDetailPage.vue'),
    props: (route: { params: { id: string } }) => ({ id: Number(route.params.id) }),
  },
```

- [ ] **Step 2: コミット**

```bash
git add src/router/index.ts
git commit -m "feat: 出荷実績登録のルート追加"
```

---

### Task 4: ホーム画面にナビゲーション追加

**Files:**
- Modify: `src/views/HomePage.vue:97-108` (script の import), `src/views/HomePage.vue:129-135` (menus 配列)

- [ ] **Step 1: import にアイコン追加**

`src/views/HomePage.vue` の ionicons import 行（103-108行目）に `createOutline` を追加:

```typescript
import {
  downloadOutline, pushOutline, clipboardOutline,
  searchOutline, swapHorizontalOutline,
  createOutline,
  appsOutline,
  colorPaletteOutline,
  laptopOutline,
} from 'ionicons/icons';
```

- [ ] **Step 2: menus 配列にアイテム追加**

`src/views/HomePage.vue` の menus 配列（129-135行目）のロケーション移動の後に追加:

```typescript
const menus = [
  { title: '入荷検品', description: '商品スキャン → 入荷登録', path: '/receiving', icon: downloadOutline },
  { title: '出荷検品', description: '出荷指示照合 → 結果送信', path: '/shipping', icon: pushOutline },
  { title: '棚卸し', description: 'ロケーション・品目 → 数量確認', path: '/stocktaking', icon: clipboardOutline },
  { title: '在庫照会', description: '品目スキャン → 在庫情報表示', path: '/inventory', icon: searchOutline },
  { title: 'ロケーション移動', description: '移動元・移動先・品目を記録', path: '/relocation', icon: swapHorizontalOutline },
  { title: '出荷実績登録', description: 'バーコードスキャン → 実績登録', path: '/shipping-record', icon: createOutline },
];
```

- [ ] **Step 3: 動作確認**

Run: `npx vue-tsc --noEmit 2>&1 | head -20`
Expected: エラーなし

- [ ] **Step 4: コミット**

```bash
git add src/views/HomePage.vue
git commit -m "feat: ホーム画面に出荷実績登録のナビゲーション追加"
```

---

### Task 5: メイン画面の作成

**Files:**
- Create: `src/views/ShippingRecordPage.vue`

- [ ] **Step 1: ShippingRecordPage.vue を作成**

`src/views/ShippingRecordPage.vue` を新規作成:

```vue
<template>
  <ion-page>
    <!-- ヘッダー -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>出荷実績登録</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- スクロール可能なコンテンツ -->
    <ion-content class="ion-padding" ref="contentRef">
      <ScannerStatus :status="status" />

      <!-- ===== 入力エリア ===== -->
      <div ref="inputAreaRef">
        <ion-list>
          <!-- 番号（必須） -->
          <ion-item>
            <ion-input
              v-model="form.recordNumber"
              label="番号 *"
              label-placement="stacked"
              placeholder="SH-2026-0001"
              required
            />
          </ion-item>

          <!-- 種別ラジオ（必須） -->
          <ion-radio-group v-model="form.recordType">
            <ion-list-header>
              <ion-label>種別 *</ion-label>
            </ion-list-header>
            <ion-row>
              <ion-col v-for="opt in typeOptions" :key="opt.value">
                <ion-item lines="none">
                  <ion-radio :value="opt.value" label-placement="end">{{ opt.label }}</ion-radio>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-radio-group>
        </ion-list>

        <!-- その他条件トグル -->
        <ion-button
          fill="clear"
          size="small"
          expand="block"
          @click="showExtraConditions = !showExtraConditions"
        >
          <ion-icon :icon="showExtraConditions ? chevronUpOutline : chevronDownOutline" slot="start" />
          {{ showExtraConditions ? 'その他条件を閉じる' : 'その他条件' }}
        </ion-button>

        <!-- その他条件（折りたたみ） -->
        <ion-list v-if="showExtraConditions">
          <ion-item>
            <ion-input
              v-model="form.registeredAt"
              label="登録日時"
              label-placement="stacked"
              type="datetime-local"
            />
          </ion-item>
          <ion-item button @click="showCategoryPopup = true">
            <ion-label>
              <p>区分</p>
              <h2>{{ form.category || '未選択' }}</h2>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-input
              v-model="form.memo1"
              label="メモ1"
              label-placement="stacked"
              placeholder="メモを入力"
            />
          </ion-item>
          <ion-item>
            <ion-input
              v-model="form.memo2"
              label="メモ2"
              label-placement="stacked"
              placeholder="メモを入力"
            />
          </ion-item>
        </ion-list>
      </div>

      <!-- ===== スキャン結果カードエリア ===== -->
      <ion-list-header class="ion-margin-top">
        <ion-label>
          スキャン結果 — {{ currentTypeLabel }}（{{ filteredCount }}件）
        </ion-label>
      </ion-list-header>

      <ion-text
        v-if="filteredCount === 0"
        color="medium"
        class="ion-padding ion-text-center"
        style="display:block;"
      >
        下部の「スキャン」ボタンからバーコードを読み取ってください
      </ion-text>

      <ion-card
        v-for="item in filteredItems"
        :key="item.id"
        class="scanned-item-card"
        :class="{ 'card-incomplete': !item.manualInputComplete }"
      >
        <ion-card-header>
          <ion-card-subtitle style="display:flex;justify-content:space-between;align-items:center;">
            <span>No.{{ item.id }}</span>
            <ion-badge :color="item.manualInputComplete ? 'success' : 'warning'">
              {{ item.manualInputComplete ? '入力済' : '未入力あり' }}
            </ion-badge>
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col size="6">
                <div class="field-label">品番</div>
                <div class="field-value">{{ item.itemCode }}</div>
              </ion-col>
              <ion-col size="6">
                <div class="field-label">数量</div>
                <div class="field-value">{{ item.quantity }}</div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="6">
                <div class="field-label">ロット</div>
                <div class="field-value">{{ item.lotNumber }}</div>
              </ion-col>
              <ion-col size="6">
                <div class="field-label">スキャン時刻</div>
                <div class="field-value">{{ item.scannedAt }}</div>
              </ion-col>
            </ion-row>
          </ion-grid>

          <!-- 未入力フィールド表示 -->
          <div v-if="!item.manualInputComplete" class="unfilled-block">
            未入力: {{ getUnfilledFields(item).join('、') }}
          </div>

          <!-- アクションボタン -->
          <div class="card-actions">
            <ion-button
              :color="item.manualInputComplete ? 'medium' : 'warning'"
              size="small"
              @click="goToDetail(item.id)"
            >
              {{ item.manualInputComplete ? '詳細' : '入力する' }}
            </ion-button>
            <ion-button color="danger" fill="outline" size="small" @click="removeItem(item.id)">
              削除
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- コンテンツ下部の余白（フッター分） -->
      <div style="height: 120px;"></div>
    </ion-content>

    <!-- ===== 固定フッター ===== -->
    <ion-footer>
      <!-- 登録確定ボタン -->
      <ion-toolbar>
        <ion-button
          expand="block"
          color="primary"
          class="ion-margin-horizontal"
          :disabled="totalCount === 0 || loading"
          @click="confirmRegister"
        >
          <ion-spinner v-if="loading" name="crescent" slot="start" />
          {{ loading ? '登録中...' : `登録確定（${totalCount}件）` }}
        </ion-button>
      </ion-toolbar>

      <!-- タブバー -->
      <ion-toolbar class="tab-toolbar">
        <div class="tab-bar">
          <button class="tab-button" @click="scrollToInput">
            <ion-icon :icon="createOutline" />
            <span>入力</span>
          </button>
          <button class="tab-button tab-button--scan" @click="openScanDialog">
            <ion-icon :icon="scanOutline" />
            <span>スキャン</span>
          </button>
        </div>
      </ion-toolbar>
    </ion-footer>

    <!-- ダイアログ類 -->
    <ScanDialog
      :is-open="showScanDialog"
      :scan-value="scanResultValue"
      @close="showScanDialog = false"
      @scan="startScan"
      @confirm="onScanConfirm"
    />

    <SelectPopup
      :is-open="showCategoryPopup"
      title="区分を選択"
      :options="categoryOptions"
      :selected-value="form.category"
      @select="(v) => (form.category = v)"
      @close="showCategoryPopup = false"
    />

    <ion-alert
      :is-open="showConfirmAlert"
      header="登録確認"
      :message="`${totalCount}件を登録しますか？`"
      :buttons="alertButtons"
      @did-dismiss="showConfirmAlert = false"
    />

    <LoadingOverlay :visible="loading && loadingMode === 'overlay'" message="送信中..." />
    <FeedbackToast :message="toastMessage" :color="toastColor" @dismiss="toastMessage = ''" />
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonFooter,
  IonList, IonListHeader, IonItem, IonLabel, IonInput, IonIcon, IonButton,
  IonRadioGroup, IonRadio, IonRow, IonCol,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardContent,
  IonGrid, IonBadge, IonText, IonSpinner, IonAlert,
} from '@ionic/vue';
import {
  scanOutline, createOutline,
  chevronDownOutline, chevronUpOutline,
} from 'ionicons/icons';
import { useRouter } from 'vue-router';
import ScannerStatus from '@/components/ScannerStatus.vue';
import ScanDialog from '@/components/ScanDialog.vue';
import SelectPopup from '@/components/SelectPopup.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import { useApi } from '@/composables/useApi';
import { useLoadingMode } from '@/composables/useLoadingMode';
import { useShippingRecordStore } from '@/composables/useShippingRecordStore';
import type { ParsedScanCode, SelectOption, ShippingRecordType } from '@/types';

const router = useRouter();
const { status, startScan, onScanResult } = useSP2Scanner();
const { loading, post } = useApi();
const { loadingMode } = useLoadingMode();
const {
  form, filteredItems, filteredCount, totalCount,
  addScannedItem, removeItem, getUnfilledFields,
} = useShippingRecordStore();

// ── 定数 ──
const typeOptions: { label: string; value: ShippingRecordType }[] = [
  { label: '種別A', value: 'typeA' },
  { label: '種別B', value: 'typeB' },
  { label: '種別C', value: 'typeC' },
];

const categoryOptions: SelectOption[] = [
  { label: '通常出荷', value: 'normal' },
  { label: '返品', value: 'return' },
  { label: '振替', value: 'transfer' },
];

const currentTypeLabel = computed(() =>
  typeOptions.find((o) => o.value === form.recordType)?.label ?? '',
);

// ── UI 状態 ──
const showExtraConditions = ref(false);
const showScanDialog = ref(false);
const showCategoryPopup = ref(false);
const showConfirmAlert = ref(false);
const scanResultValue = ref('');
const toastMessage = ref('');
const toastColor = ref('success');

const contentRef = ref<InstanceType<typeof IonContent> | null>(null);
const inputAreaRef = ref<HTMLDivElement | null>(null);

// ── スキャン ──
const openScanDialog = () => {
  scanResultValue.value = '';
  showScanDialog.value = true;
};

onScanResult((result) => {
  scanResultValue.value = result.value;
});

const onScanConfirm = (_parsed: ParsedScanCode) => {
  addScannedItem();
  showScanDialog.value = false;
};

// ── ナビゲーション ──
const scrollToInput = () => {
  contentRef.value?.$el?.scrollToTop?.(300);
};

const goToDetail = (id: number) => {
  router.push(`/shipping-record/detail/${id}`);
};

// ── 登録 ──
const confirmRegister = () => {
  showConfirmAlert.value = true;
};

const alertButtons = [
  { text: 'キャンセル', role: 'cancel' },
  {
    text: 'OK',
    handler: () => {
      submitAll();
    },
  },
];

const submitAll = async () => {
  const res = await post('/shipping-record/register', {
    form: { ...form },
    items: [...filteredItems.value],
  });
  if (res.success) {
    toastMessage.value = `${totalCount.value}件を登録しました`;
    toastColor.value = 'success';
  } else {
    toastMessage.value = res.error || '登録に失敗しました';
    toastColor.value = 'danger';
  }
};
</script>

<style scoped>
.scanned-item-card {
  margin: 8px 0;
}
.card-incomplete {
  border-left: 3px solid var(--ion-color-warning);
}
.field-label {
  font-size: 0.7rem;
  color: var(--ion-color-medium);
}
.field-value {
  font-size: 0.9rem;
  font-weight: 500;
}
.unfilled-block {
  margin-top: 8px;
  padding: 6px 10px;
  background: rgba(var(--ion-color-warning-rgb), 0.15);
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--ion-color-warning-shade);
}
.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}
.tab-toolbar {
  --background: var(--ion-color-light, #f4f5f8);
  --border-width: 0;
  --padding-top: 0;
  --padding-bottom: 0;
}
.tab-bar {
  display: flex;
  justify-content: space-around;
  padding: 4px 0 8px;
}
.tab-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: transparent;
  border: none;
  color: var(--ion-color-medium);
  font-size: 0.7rem;
  padding: 4px 16px;
  cursor: pointer;
}
.tab-button ion-icon {
  font-size: 1.4rem;
}
.tab-button--scan {
  color: var(--ion-color-primary);
  font-weight: 600;
}
.tab-button--scan ion-icon {
  background: var(--ion-color-primary);
  color: #fff;
  border-radius: 50%;
  padding: 8px;
  font-size: 1.6rem;
  margin-top: -12px;
  box-shadow: 0 2px 8px rgba(var(--ion-color-primary-rgb), 0.4);
}
</style>
```

- [ ] **Step 2: TypeScript 型チェック**

Run: `npx vue-tsc --noEmit 2>&1 | head -20`
Expected: エラーなし

- [ ] **Step 3: コミット**

```bash
git add src/views/ShippingRecordPage.vue
git commit -m "feat: 出荷実績登録メイン画面を作成"
```

---

### Task 6: 詳細/編集画面の作成

**Files:**
- Create: `src/views/ShippingRecordDetailPage.vue`

- [ ] **Step 1: ShippingRecordDetailPage.vue を作成**

`src/views/ShippingRecordDetailPage.vue` を新規作成:

```vue
<template>
  <PageLayout title="詳細・編集" back-href="/shipping-record">
    <template v-if="item">
      <!-- 読み取り専用フィールド -->
      <ion-list-header>
        <ion-label>スキャン情報</ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item>
          <ion-label>
            <p>品番</p>
            <h2>{{ item.itemCode }}</h2>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>数量</p>
            <h2>{{ item.quantity }}</h2>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>ロット</p>
            <h2>{{ item.lotNumber }}</h2>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>スキャン時刻</p>
            <h2>{{ item.scannedAt }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- 編集可能フィールド -->
      <ion-list-header class="ion-margin-top">
        <ion-label>手入力項目</ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item>
          <ion-input
            v-model="editForm.storageLoc"
            label="保管場所"
            label-placement="stacked"
            placeholder="例: WH01-A01"
          />
        </ion-item>
        <ion-item>
          <ion-input
            v-model="editForm.remarks"
            label="備考"
            label-placement="stacked"
            placeholder="備考を入力"
          />
        </ion-item>
      </ion-list>

      <!-- 保存ボタン -->
      <div class="ion-padding">
        <ion-button expand="block" @click="save">保存</ion-button>
      </div>
    </template>

    <template v-else>
      <ion-text color="medium" class="ion-padding ion-text-center" style="display:block;">
        アイテムが見つかりません
      </ion-text>
    </template>

    <FeedbackToast :message="toastMessage" :color="toastColor" @dismiss="toastMessage = ''" />
  </PageLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  IonList, IonListHeader, IonItem, IonLabel, IonInput,
  IonButton, IonText,
} from '@ionic/vue';
import { useRouter, useRoute } from 'vue-router';
import PageLayout from '@/components/PageLayout.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import { useShippingRecordStore } from '@/composables/useShippingRecordStore';

const router = useRouter();
const route = useRoute();
const { getItemById, updateItem } = useShippingRecordStore();

const itemId = Number(route.params.id);
const item = getItemById(itemId);

const editForm = reactive({
  storageLoc: item?.storageLoc ?? '',
  remarks: item?.remarks ?? '',
});

const toastMessage = ref('');
const toastColor = ref('success');

const save = () => {
  updateItem(itemId, {
    storageLoc: editForm.storageLoc,
    remarks: editForm.remarks,
  });
  toastMessage.value = '保存しました';
  toastColor.value = 'success';
  setTimeout(() => {
    router.back();
  }, 500);
};
</script>
```

- [ ] **Step 2: TypeScript 型チェック**

Run: `npx vue-tsc --noEmit 2>&1 | head -20`
Expected: エラーなし

- [ ] **Step 3: コミット**

```bash
git add src/views/ShippingRecordDetailPage.vue
git commit -m "feat: 出荷実績登録の詳細/編集画面を作成"
```

---

### Task 7: ブラウザ動作確認

- [ ] **Step 1: dev サーバー起動**

Run: `ionic serve --external` (別ターミナルで既に起動中なら不要)

- [ ] **Step 2: 画面遷移確認**

ブラウザで確認:
1. ホーム画面に「出荷実績登録」メニューが表示されること
2. タップで `/shipping-record` に遷移すること
3. 戻るボタンでホームに戻れること

- [ ] **Step 3: 入力エリア確認**

1. 番号フィールドに入力できること
2. 種別ラジオ3つが表示され、選択できること
3. 「その他条件」ボタンで折りたたみ展開/収縮すること
4. 展開時に登録日時、区分（プルダウン）、メモ1,2 が表示されること

- [ ] **Step 4: スキャン→カード追加確認**

1. 下部「スキャン」タブでScanDialogが開くこと
2. スキャン確定後にカードが追加されること
3. 種別を切り替えるとカードがフィルタされること
4. 未入力カードに「未入力: 保管場所、備考」が表示されること
5. 入力済カードに「入力済」バッジが表示されること

- [ ] **Step 5: 詳細/編集画面確認**

1. カードの「入力する」/「詳細」ボタンで詳細画面に遷移すること
2. スキャン情報が読み取り専用で表示されること
3. 保管場所・備考が入力できること
4. 「保存」で戻り、カードが更新されていること

- [ ] **Step 6: 登録確定確認**

1. 「登録確定（N件）」ボタンが件数を表示すること
2. ボタン押下で確認ダイアログが表示されること
3. OK で登録（API未接続のため失敗トースト）が出ること

- [ ] **Step 7: 最終コミット**

問題があれば修正後:
```bash
git add -A
git commit -m "fix: 出荷実績登録画面の動作確認修正"
```
