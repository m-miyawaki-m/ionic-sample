<template>
  <PageLayout
    title="出荷検品"
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <ScannerStatus :status="status" />

    <ion-button expand="block" class="ion-margin-top ion-margin-horizontal" @click="openScanDialog">
      <ion-icon :icon="scanOutline" slot="start" />
      スキャン
    </ion-button>

    <!-- ヘッダー -->
    <ion-list-header class="ion-margin-top">
      <ion-label>検品リスト（{{ scannedItems.length }}件）</ion-label>
      <ion-button v-if="scannedItems.length > 0" fill="clear" color="danger" @click="clearAll">
        全件クリア
      </ion-button>
    </ion-list-header>

    <ion-text v-if="scannedItems.length === 0" color="medium" class="ion-padding ion-text-center" style="display:block;">
      スキャンボタンからバーコードを読み取ってください
    </ion-text>

    <!-- ========== カード表示 ========== -->
    <template v-if="viewMode === 'card'">
      <ion-card v-for="(item, index) in scannedItems" :key="item.no" class="scanned-item-card">
        <ion-card-header>
          <ion-card-subtitle style="display:flex;justify-content:space-between;align-items:center;">
            <span>No.{{ item.no }}</span>
            <ion-badge :color="statusColor(item.status)">{{ item.status }}</ion-badge>
          </ion-card-subtitle>
          <ion-card-title style="font-size:1rem;">{{ item.itemName }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col size="6">
                <div class="field-label">品目コード</div>
                <div class="field-value">{{ item.itemCode }}</div>
              </ion-col>
              <ion-col size="6">
                <div class="field-label">JANコード</div>
                <div class="field-value">{{ item.janCode }}</div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="6">
                <div class="field-label">倉庫コード</div>
                <div class="field-value">{{ item.warehouseCode }}</div>
              </ion-col>
              <ion-col size="6">
                <div class="field-label">棚番</div>
                <div class="field-value">{{ item.shelfCode }}</div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="4">
                <div class="field-label">予定数</div>
                <div class="field-value">{{ item.plannedQty }}</div>
              </ion-col>
              <ion-col size="4">
                <div class="field-label">実績数</div>
                <div class="field-value">{{ item.actualQty }}</div>
              </ion-col>
              <ion-col size="4">
                <div class="field-label">検品時刻</div>
                <div class="field-value">{{ item.scannedAt }}</div>
              </ion-col>
            </ion-row>
          </ion-grid>
          <!-- エラー表示 -->
          <div v-if="item.errorCode" class="error-block">
            <strong>エラー [{{ item.errorCode }}]</strong><br/>{{ item.errorMessage }}
          </div>
        </ion-card-content>
        <div class="card-actions">
          <button class="card-btn card-btn--primary" @click="submitOne(index)">個別登録</button>
          <button class="card-btn card-btn--danger" @click="removeItem(index)">削除</button>
        </div>
      </ion-card>
    </template>

    <!-- ========== リスト表示 ========== -->
    <template v-if="viewMode === 'list'">
      <ion-list class="ion-margin-horizontal">
        <ion-item-sliding v-for="(item, index) in scannedItems" :key="item.no">
          <ion-item :class="{ 'error-item': !!item.errorCode }" :detail="false" button @click="selectedItem = selectedItem === item.no ? null : item.no">
            <ion-label>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <h2 style="margin:0;">No.{{ item.no }}　{{ item.itemName }}</h2>
                <ion-badge :color="statusColor(item.status)" style="flex-shrink:0;">{{ item.status }}</ion-badge>
              </div>
              <p>{{ item.itemCode }} / {{ item.shelfCode }} / {{ item.scannedAt }}</p>
              <p v-if="item.errorCode" class="error-line">
                エラー [{{ item.errorCode }}]: {{ item.errorMessage }}
              </p>
            </ion-label>
          </ion-item>
          <!-- 展開時の詳細 -->
          <template v-if="selectedItem === item.no">
            <ion-item lines="none" class="detail-row">
              <ion-grid>
                <ion-row>
                  <ion-col size="6"><span class="field-label">品目コード</span><br/>{{ item.itemCode }}</ion-col>
                  <ion-col size="6"><span class="field-label">JANコード</span><br/>{{ item.janCode }}</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="6"><span class="field-label">倉庫コード</span><br/>{{ item.warehouseCode }}</ion-col>
                  <ion-col size="6"><span class="field-label">棚番</span><br/>{{ item.shelfCode }}</ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="4"><span class="field-label">予定数</span><br/>{{ item.plannedQty }}</ion-col>
                  <ion-col size="4"><span class="field-label">実績数</span><br/>{{ item.actualQty }}</ion-col>
                  <ion-col size="4"><span class="field-label">検品時刻</span><br/>{{ item.scannedAt }}</ion-col>
                </ion-row>
                <ion-row v-if="item.errorCode">
                  <ion-col size="12">
                    <div class="error-block">
                      <strong>エラー [{{ item.errorCode }}]</strong><br/>{{ item.errorMessage }}
                    </div>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
          </template>
          <ion-item-options side="end">
            <ion-item-option color="primary" @click="submitOne(index)">登録</ion-item-option>
            <ion-item-option color="danger" @click="removeItem(index)">削除</ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </template>

    <!-- 登録操作エリア -->
    <div class="action-area">
      <div class="datetime-row">
        <label class="datetime-label">登録日時</label>
        <input
          v-model="registerDatetime"
          type="datetime-local"
          class="datetime-input"
        />
      </div>
      <ion-button
        expand="block"
        color="primary"
        class="ion-margin-top"
        :disabled="loading || scannedItems.length === 0"
        @click="submitAll"
      >
        <ion-spinner v-if="loading" name="crescent" slot="start" />
        {{ loading ? '登録中...' : '一括登録（' + scannedItems.length + '件）' }}
      </ion-button>
    </div>

    <ScanDialog
      :is-open="showScanDialog"
      :scan-value="scanResultValue"
      @close="showScanDialog = false"
      @scan="startScan"
      @confirm="onScanConfirm"
    />

    <LoadingOverlay :visible="loading && loadingMode === 'overlay'" message="送信中..." />
    <FeedbackToast :message="toastMessage" :color="toastColor" @dismiss="toastMessage = ''" />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {
  IonButton, IonIcon, IonText, IonListHeader, IonLabel, IonBadge,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonGrid, IonRow, IonCol, IonSpinner,
  IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption,
} from '@ionic/vue';
import { scanOutline, trashOutline } from 'ionicons/icons';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import ScanDialog from '@/components/ScanDialog.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import { useApi } from '@/composables/useApi';
import { useLoadingMode } from '@/composables/useLoadingMode';
import type { MenuAction, ParsedScanCode } from '@/types';

type ViewMode = 'card' | 'list';

interface ScannedShippingItem {
  no: number;
  itemCode: string;
  itemName: string;
  janCode: string;
  warehouseCode: string;
  shelfCode: string;
  plannedQty: number;
  actualQty: number;
  status: 'OK' | 'NG' | '未照合';
  scannedAt: string;
  errorCode: string;
  errorMessage: string;
}


const viewMode = ref<ViewMode>((localStorage.getItem('shippingViewMode') as ViewMode) || 'card');
const selectedItem = ref<number | null>(null);

const { loadingMode, setMode } = useLoadingMode();

const menuItems: MenuAction[] = [
  { label: 'カード表示', action: 'view-card' },
  { label: 'リスト表示', action: 'view-list' },
  { label: 'デモデータ復元', action: 'reset-demo' },
  { label: 'ローディング: 全画面', action: 'loading-overlay' },
  { label: 'ローディング: ボタン', action: 'loading-button' },
];

const onMenuSelect = (action: string) => {
  if (action === 'view-card') {
    viewMode.value = 'card';
    localStorage.setItem('shippingViewMode', 'card');
  } else if (action === 'view-list') {
    viewMode.value = 'list';
    localStorage.setItem('shippingViewMode', 'list');
  } else if (action === 'reset-demo') {
    resetDemo();
  } else if (action === 'loading-overlay') {
    setMode('overlay');
  } else if (action === 'loading-button') {
    setMode('button');
  }
};

const { status, startScan, onScanResult } = useSP2Scanner();
const { loading, post } = useApi();

// スキャン確定時に順番に返すモックデータ（正常 / エラー混在 10件）
const mockScanQueue: Omit<ScannedShippingItem, 'no' | 'scannedAt'>[] = [
  { itemCode: 'ITEM-001', itemName: '防寒手袋',     janCode: '4901234567001', warehouseCode: 'WH01', shelfCode: 'A01-01', plannedQty: 150, actualQty: 1, status: 'OK', errorCode: '',     errorMessage: '' },
  { itemCode: 'ITEM-002', itemName: '作業帽',       janCode: '4901234567002', warehouseCode: 'WH01', shelfCode: 'A01-02', plannedQty: 80,  actualQty: 1, status: 'OK', errorCode: '',     errorMessage: '' },
  { itemCode: 'ITEM-003', itemName: '安全靴 26cm',  janCode: '4901234567003', warehouseCode: 'WH01', shelfCode: 'A02-01', plannedQty: 45,  actualQty: 2, status: 'NG', errorCode: 'E002', errorMessage: '出荷予定数を超過しています' },
  { itemCode: 'ITEM-004', itemName: '安全靴 27cm',  janCode: '4901234567004', warehouseCode: 'WH01', shelfCode: 'A02-02', plannedQty: 32,  actualQty: 1, status: 'OK', errorCode: '',     errorMessage: '' },
  { itemCode: 'ITEM-XXX', itemName: '不明品目',     janCode: '-',             warehouseCode: 'WH02', shelfCode: 'B01-03', plannedQty: 0,   actualQty: 1, status: 'NG', errorCode: 'E001', errorMessage: '出荷指示に該当なし — マスタ未登録の品目です' },
  { itemCode: 'ITEM-005', itemName: '防塵マスク',   janCode: '4901234567005', warehouseCode: 'WH01', shelfCode: 'B01-01', plannedQty: 500, actualQty: 1, status: 'OK', errorCode: '',     errorMessage: '' },
  { itemCode: 'ITEM-006', itemName: '保護メガネ',   janCode: '4901234567006', warehouseCode: 'WH01', shelfCode: '-',      plannedQty: 120, actualQty: 1, status: 'NG', errorCode: 'E004', errorMessage: 'ロケーション不一致 — 指定棚番と異なります' },
  { itemCode: 'ITEM-007', itemName: '作業服 上 M',  janCode: '4901234567007', warehouseCode: 'WH01', shelfCode: 'C01-01', plannedQty: 60,  actualQty: 1, status: 'OK', errorCode: '',     errorMessage: '' },
  { itemCode: 'ITEM-008', itemName: '作業服 上 L',  janCode: '4901234567008', warehouseCode: 'WH01', shelfCode: 'C01-02', plannedQty: 75,  actualQty: 1, status: 'OK', errorCode: '',     errorMessage: '' },
  { itemCode: 'ITEM-009', itemName: '作業服 下 M',  janCode: '4901234567009', warehouseCode: 'WH01', shelfCode: 'C02-01', plannedQty: 55,  actualQty: 3, status: 'NG', errorCode: 'E003', errorMessage: '出荷停止品目です。出荷不可' },
];
let mockIndex = 0;

const scannedItems = reactive<ScannedShippingItem[]>([]);
let seqNo = 0;

// datetime-local 用フォーマット（YYYY-MM-DDTHH:mm）
const toLocalDatetime = (d: Date) => {
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${y}-${mo}-${da}T${h}:${mi}`;
};
const registerDatetime = ref(toLocalDatetime(new Date()));
const toastMessage = ref('');
const toastColor = ref('success');

// スキャンダイアログ制御
const showScanDialog = ref(false);
const scanResultValue = ref('');

const openScanDialog = () => {
  scanResultValue.value = '';
  showScanDialog.value = true;
};

onScanResult((result) => {
  scanResultValue.value = result.value;
});

const statusColor = (s: string) =>
  s === 'OK' ? 'success' : s === 'NG' ? 'danger' : 'warning';

const formatTime = (d: Date) => {
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const onScanConfirm = (_parsed: ParsedScanCode) => {
  // モックキューからデータを取得（10件ループ）
  const mock = mockScanQueue[mockIndex % mockScanQueue.length];
  mockIndex++;

  seqNo++;
  scannedItems.unshift({
    ...mock,
    no: seqNo,
    scannedAt: formatTime(new Date()),
  });

  showScanDialog.value = false;
};

const removeItem = (index: number) => {
  scannedItems.splice(index, 1);
};

const clearAll = () => {
  scannedItems.splice(0, scannedItems.length);
  seqNo = 0;
};

const resetDemo = () => {
  clearAll();
  mockIndex = 0;
};

const submitAll = async () => {
  const res = await post('/shipping/register', {
    datetime: registerDatetime.value,
    items: scannedItems,
  });
  if (res.success) {
    toastMessage.value = `${scannedItems.length}件を登録しました`;
    toastColor.value = 'success';
    clearAll();
  } else {
    toastMessage.value = res.error || '登録に失敗しました';
    toastColor.value = 'danger';
  }
};

const submitOne = async (index: number) => {
  const item = scannedItems[index];
  const res = await post('/shipping/register', {
    datetime: registerDatetime.value,
    items: [item],
  });
  if (res.success) {
    toastMessage.value = `No.${item.no} ${item.itemName} を登録しました`;
    toastColor.value = 'success';
    scannedItems.splice(index, 1);
  } else {
    toastMessage.value = res.error || '登録に失敗しました';
    toastColor.value = 'danger';
  }
};
</script>

<style scoped>
.action-area {
  margin: 16px;
  padding: 16px;
  background: var(--ion-color-light, #f4f5f8);
  border-radius: 8px;
}
.datetime-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.datetime-label {
  font-size: 0.8rem;
  color: var(--ion-color-medium);
  font-weight: 500;
}
.datetime-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--ion-color-medium-shade, #999);
  border-radius: 6px;
  font-size: 1rem;
  background: var(--ion-background-color, #fff);
  color: var(--ion-text-color, #000);
}
.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 16px 12px;
}
.card-btn {
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
}
.card-btn--primary {
  background: var(--ion-color-primary, #3880ff);
  color: #fff;
}
.card-btn--danger {
  background: transparent;
  color: var(--ion-color-danger, #eb445a);
  border: 1px solid var(--ion-color-danger, #eb445a);
}
.scanned-item-card {
  margin: 8px 16px;
}
.field-label {
  font-size: 0.7rem;
  color: var(--ion-color-medium);
}
.field-value {
  font-size: 0.9rem;
  font-weight: 500;
}
.error-block {
  margin-top: 8px;
  padding: 8px 12px;
  background: #fff5f5;
  border-left: 3px solid var(--ion-color-danger, #eb445a);
  border-radius: 4px;
  font-size: 0.85rem;
  color: #b91c1c;
}
.error-item {
  --background: var(--ion-color-danger-tint, #fde8e8);
}
.error-line {
  color: var(--ion-color-danger) !important;
  font-weight: 500;
}
.detail-row {
  --padding-start: 16px;
  --inner-padding-end: 16px;
  --background: var(--ion-color-light, #f4f5f8);
  font-size: 0.85rem;
}
</style>
