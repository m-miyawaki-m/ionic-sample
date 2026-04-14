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

          <!-- 種別セグメント（必須） -->
          <ion-item lines="none">
            <ion-label position="stacked">種別 *</ion-label>
            <ion-segment v-model="form.recordType">
              <ion-segment-button v-for="opt in typeOptions" :key="opt.value" :value="opt.value">
                <ion-label>{{ opt.label }}</ion-label>
              </ion-segment-button>
            </ion-segment>
          </ion-item>
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
  IonSegment, IonSegmentButton, IonRow, IonCol,
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
