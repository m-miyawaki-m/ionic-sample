<template>
  <PageLayout
    title="スキャン入力デモ"
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <ScannerStatus :status="status" />

    <p class="ion-margin-top ion-padding-horizontal">
      入荷検品を想定したスキャン入力のデモです。
      スキャンボタンを押すとモックデータが入力されます。
    </p>

    <ion-list class="ion-margin-top">
      <ScanInput
        v-model="form.location"
        label="ロケーション"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'location'"
        @scan="scanTo('location')"
      />
      <ScanInput
        v-model="form.itemCode"
        label="品目コード"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'itemCode'"
        @scan="scanTo('itemCode')"
      />
      <NumberInput
        v-model="form.quantity"
        label="数量"
        placeholder="数量を入力"
        :min="0"
      />
      <ScanInput
        v-model="form.lotNumber"
        label="ロット番号"
        placeholder="スキャンまたは入力"
        @focus="activeField = 'lotNumber'"
        @scan="scanTo('lotNumber')"
      />
    </ion-list>

    <SubmitButton label="登録（ダミー）" :loading="demoLoading" @submit="onDemoSubmit" />

    <ResultCard
      :visible="scanLog.length > 0"
      title="スキャン結果ログ"
      :items="scanLog.map((log) => ({
        label: log.timestamp + ' → ' + log.fieldLabel,
        value: log.value + ' (' + log.format + ')',
      }))"
    />

    <ion-button
      expand="block"
      color="medium"
      fill="outline"
      class="ion-margin-top"
      @click="clearAll"
    >
      全てクリア
    </ion-button>

    <FeedbackToast
      :message="toastMessage"
      :color="toastColor"
      @dismiss="toastMessage = ''"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { IonList, IonButton } from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import ScanInput from '@/components/ScanInput.vue';
import NumberInput from '@/components/NumberInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import ResultCard from '@/components/ResultCard.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import type { MenuAction } from '@/types';

interface ScanLogEntry {
  timestamp: string;
  fieldLabel: string;
  value: string;
  format: string;
}

const fieldLabels: Record<string, string> = {
  location: 'ロケーション',
  itemCode: '品目コード',
  lotNumber: 'ロット番号',
};

const menuItems: MenuAction[] = [
  { label: 'QRコード読み取り', action: 'qr' },
  { label: 'バーコード読み取り', action: 'barcode' },
];

const onMenuSelect = (action: string) => {
  toastMessage.value = `スキャンモード: ${action}`;
  toastColor.value = 'tertiary';
};

const { status, startScan, onScanResult } = useSP2Scanner();

const form = reactive({
  location: '',
  itemCode: '',
  quantity: 1,
  lotNumber: '',
});

const activeField = ref<'location' | 'itemCode' | 'lotNumber'>('location');
const scanLog = ref<ScanLogEntry[]>([]);
const demoLoading = ref(false);
const toastMessage = ref('');
const toastColor = ref('success');

const scanTo = async (field: 'location' | 'itemCode' | 'lotNumber') => {
  activeField.value = field;
  await startScan();
};

onScanResult((result) => {
  form[activeField.value] = result.value;
  scanLog.value.unshift({
    timestamp: new Date().toLocaleTimeString(),
    fieldLabel: fieldLabels[activeField.value],
    value: result.value,
    format: result.format,
  });
});

const onDemoSubmit = () => {
  demoLoading.value = true;
  setTimeout(() => {
    demoLoading.value = false;
    toastMessage.value = '登録しました（ダミー）';
    toastColor.value = 'success';
  }, 1500);
};

const clearAll = () => {
  form.location = '';
  form.itemCode = '';
  form.quantity = 1;
  form.lotNumber = '';
  scanLog.value = [];
};
</script>
