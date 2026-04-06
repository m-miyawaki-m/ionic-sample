<template>
  <PageLayout
    title="ロケーション移動"
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <ScannerStatus :status="status" />

    <ion-button expand="block" class="ion-margin-top ion-margin-horizontal" @click="openScanDialog">
      <ion-icon :icon="scanOutline" slot="start" />
      スキャン
    </ion-button>

    <!-- A) 縦並びフォーム -->
    <template v-if="layout === 'vertical'">
      <ion-list class="ion-margin-top">
        <ion-item>
          <ion-input v-model="form.fromLocation" label="移動元ロケーション" label-placement="stacked" placeholder="スキャンまたは入力" />
        </ion-item>
        <ion-item>
          <ion-input v-model="form.toLocation" label="移動先ロケーション" label-placement="stacked" placeholder="スキャンまたは入力" />
        </ion-item>
        <ion-item>
          <ion-input v-model="form.itemCode" label="品目コード" label-placement="stacked" placeholder="スキャンまたは入力" />
        </ion-item>
        <NumberInput v-model="form.quantity" label="数量" placeholder="数量を入力" :min="0" />
      </ion-list>
      <SubmitButton label="移動登録" :loading="loading" @submit="submit" />
    </template>

    <!-- B) グループ分け型 -->
    <template v-if="layout === 'grouped'">
      <ion-card class="ion-margin-top">
        <ion-card-header>
          <ion-card-subtitle>移動元 → 移動先</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list lines="none">
            <ion-item>
              <ion-input v-model="form.fromLocation" label="移動元ロケーション" label-placement="stacked" placeholder="スキャンまたは入力" />
            </ion-item>
            <ion-item>
              <ion-input v-model="form.toLocation" label="移動先ロケーション" label-placement="stacked" placeholder="スキャンまたは入力" />
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>対象品目</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list lines="none">
            <ion-item>
              <ion-input v-model="form.itemCode" label="品目コード" label-placement="stacked" placeholder="スキャンまたは入力" />
            </ion-item>
            <NumberInput v-model="form.quantity" label="数量" placeholder="数量を入力" :min="0" />
          </ion-list>
        </ion-card-content>
      </ion-card>
      <SubmitButton label="移動登録" :loading="loading" @submit="submit" />
    </template>

    <!-- C) ステッパー型 -->
    <template v-if="layout === 'stepper'">
      <div class="ion-margin-top ion-padding-horizontal">
        <ion-text color="medium">
          <p>ステップ {{ currentStep + 1 }} / {{ steps.length }}: {{ steps[currentStep].label }}</p>
        </ion-text>
        <ion-progress-bar :value="(currentStep + 1) / steps.length" />
      </div>

      <ion-list class="ion-margin-top">
        <ion-item v-if="steps[currentStep].field === 'fromLocation'">
          <ion-input v-model="form.fromLocation" label="移動元ロケーション" label-placement="stacked" placeholder="スキャンまたは入力" />
        </ion-item>
        <ion-item v-if="steps[currentStep].field === 'toLocation'">
          <ion-input v-model="form.toLocation" label="移動先ロケーション" label-placement="stacked" placeholder="スキャンまたは入力" />
        </ion-item>
        <ion-item v-if="steps[currentStep].field === 'itemCode'">
          <ion-input v-model="form.itemCode" label="品目コード" label-placement="stacked" placeholder="スキャンまたは入力" />
        </ion-item>
        <NumberInput v-if="steps[currentStep].field === 'quantity'"
          v-model="form.quantity" label="数量" placeholder="数量を入力" :min="0" />
      </ion-list>

      <div class="ion-padding-horizontal ion-margin-top" style="display:flex;gap:8px;">
        <ion-button expand="block" fill="outline" :disabled="currentStep === 0" @click="currentStep--" style="flex:1;">
          戻る
        </ion-button>
        <ion-button v-if="currentStep < steps.length - 1" expand="block" @click="currentStep++" style="flex:1;">
          次へ
        </ion-button>
        <SubmitButton v-else label="移動登録" :loading="loading" @submit="submit" />
      </div>
    </template>

    <ScanDialog
      :is-open="showScanDialog"
      :scan-value="scanResultValue"
      @close="showScanDialog = false"
      @scan="startScan"
      @confirm="onScanConfirm"
    />

    <LoadingOverlay :visible="loading && loadingMode === 'overlay'" message="登録中..." />
    <FeedbackToast :message="toastMessage" :color="toastColor" @dismiss="toastMessage = ''" />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { IonList, IonItem, IonInput, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonText, IonProgressBar } from '@ionic/vue';
import { scanOutline } from 'ionicons/icons';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import ScanDialog from '@/components/ScanDialog.vue';
import NumberInput from '@/components/NumberInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import { useApi } from '@/composables/useApi';
import { useLoadingMode } from '@/composables/useLoadingMode';
import type { RelocationItem, MenuAction, ParsedScanCode } from '@/types';

type LayoutType = 'vertical' | 'grouped' | 'stepper';

const layout = ref<LayoutType>((localStorage.getItem('relocationLayout') as LayoutType) || 'vertical');
const currentStep = ref(0);

const steps = [
  { field: 'fromLocation', label: '移動元ロケーション' },
  { field: 'toLocation', label: '移動先ロケーション' },
  { field: 'itemCode', label: '品目コード' },
  { field: 'quantity', label: '数量' },
];

const { loadingMode, setMode } = useLoadingMode();

const menuItems: MenuAction[] = [
  { label: 'A) 縦並び表示', action: 'vertical' },
  { label: 'B) グループ表示', action: 'grouped' },
  { label: 'C) ステッパー表示', action: 'stepper' },
  { label: 'ローディング: 全画面', action: 'loading-overlay' },
  { label: 'ローディング: ボタン', action: 'loading-button' },
];

const onMenuSelect = (action: string) => {
  if (['vertical', 'grouped', 'stepper'].includes(action)) {
    layout.value = action as LayoutType;
    localStorage.setItem('relocationLayout', action);
    currentStep.value = 0;
  } else if (action === 'loading-overlay') {
    setMode('overlay');
  } else if (action === 'loading-button') {
    setMode('button');
  }
};

const { status, startScan, onScanResult } = useSP2Scanner();
const { loading, post } = useApi();

const form = reactive<RelocationItem>({ fromLocation: '', toLocation: '', itemCode: '', quantity: 1 });
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

const onScanConfirm = (parsed: ParsedScanCode) => {
  if (parsed.shelfCode) form.fromLocation = parsed.shelfCode;
  if (parsed.itemCode) form.itemCode = parsed.itemCode;
  showScanDialog.value = false;
};

const submit = async () => {
  const res = await post('/relocation', form);
  if (res.success) {
    toastMessage.value = '移動を登録しました';
    toastColor.value = 'success';
    form.fromLocation = ''; form.toLocation = ''; form.itemCode = ''; form.quantity = 1;
    currentStep.value = 0;
  } else {
    toastMessage.value = res.error || '登録に失敗しました';
    toastColor.value = 'danger';
  }
};
</script>
