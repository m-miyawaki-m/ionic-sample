<template>
  <PageLayout
    title="ロケーション移動"
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <ScannerStatus :status="status" />

    <!-- A) 縦並びフォーム -->
    <template v-if="layout === 'vertical'">
      <ion-list class="ion-margin-top">
        <ScanInput v-model="form.fromLocation" label="移動元ロケーション" placeholder="スキャンまたは入力"
          @focus="activeField = 'fromLocation'" @scan="scanTo('fromLocation')" />
        <ScanInput v-model="form.toLocation" label="移動先ロケーション" placeholder="スキャンまたは入力"
          @focus="activeField = 'toLocation'" @scan="scanTo('toLocation')" />
        <ScanInput v-model="form.itemCode" label="品目コード" placeholder="スキャンまたは入力"
          @focus="activeField = 'itemCode'" @scan="scanTo('itemCode')" />
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
            <ScanInput v-model="form.fromLocation" label="移動元ロケーション" placeholder="スキャンまたは入力"
              @focus="activeField = 'fromLocation'" @scan="scanTo('fromLocation')" />
            <ScanInput v-model="form.toLocation" label="移動先ロケーション" placeholder="スキャンまたは入力"
              @focus="activeField = 'toLocation'" @scan="scanTo('toLocation')" />
          </ion-list>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>対象品目</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list lines="none">
            <ScanInput v-model="form.itemCode" label="品目コード" placeholder="スキャンまたは入力"
              @focus="activeField = 'itemCode'" @scan="scanTo('itemCode')" />
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
        <ScanInput v-if="steps[currentStep].field === 'fromLocation'"
          v-model="form.fromLocation" label="移動元ロケーション" placeholder="スキャンまたは入力"
          @scan="scanTo('fromLocation')" />
        <ScanInput v-if="steps[currentStep].field === 'toLocation'"
          v-model="form.toLocation" label="移動先ロケーション" placeholder="スキャンまたは入力"
          @scan="scanTo('toLocation')" />
        <ScanInput v-if="steps[currentStep].field === 'itemCode'"
          v-model="form.itemCode" label="品目コード" placeholder="スキャンまたは入力"
          @scan="scanTo('itemCode')" />
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

    <LoadingOverlay :visible="loading" message="登録中..." />
    <FeedbackToast :message="toastMessage" :color="toastColor" @dismiss="toastMessage = ''" />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { IonList, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonButton, IonText, IonProgressBar } from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import ScanInput from '@/components/ScanInput.vue';
import NumberInput from '@/components/NumberInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import { useApi } from '@/composables/useApi';
import type { RelocationItem, MenuAction } from '@/types';

type LayoutType = 'vertical' | 'grouped' | 'stepper';
type ScannableField = 'fromLocation' | 'toLocation' | 'itemCode';

const layout = ref<LayoutType>((localStorage.getItem('relocationLayout') as LayoutType) || 'vertical');
const currentStep = ref(0);

const steps = [
  { field: 'fromLocation', label: '移動元ロケーション' },
  { field: 'toLocation', label: '移動先ロケーション' },
  { field: 'itemCode', label: '品目コード' },
  { field: 'quantity', label: '数量' },
];

const menuItems: MenuAction[] = [
  { label: 'QRコード読み取り', action: 'qr' },
  { label: 'バーコード読み取り', action: 'barcode' },
  { label: 'A) 縦並び表示', action: 'vertical' },
  { label: 'B) グループ表示', action: 'grouped' },
  { label: 'C) ステッパー表示', action: 'stepper' },
];

const onMenuSelect = (action: string) => {
  if (['vertical', 'grouped', 'stepper'].includes(action)) {
    layout.value = action as LayoutType;
    localStorage.setItem('relocationLayout', action);
    currentStep.value = 0;
  }
};

const { status, startScan, onScanResult } = useSP2Scanner();
const { loading, post } = useApi();

const form = reactive<RelocationItem>({ fromLocation: '', toLocation: '', itemCode: '', quantity: 1 });
const activeField = ref<ScannableField>('fromLocation');
const toastMessage = ref('');
const toastColor = ref('success');

const scanTo = async (field: ScannableField) => {
  activeField.value = field;
  await startScan();
};

onScanResult((result) => {
  form[activeField.value] = result.value;
});

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
