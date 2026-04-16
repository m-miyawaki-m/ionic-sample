<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/pattern/scan-input" />
        </ion-buttons>
        <ion-title>QR読み取り</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-input label="品目コード" label-placement="stacked" v-model="form.itemCode" readonly />
        </ion-item>
        <ion-item>
          <ion-input label="品目名" label-placement="stacked" v-model="form.itemName" readonly />
        </ion-item>
        <ion-item>
          <ion-input label="ロケーション" label-placement="stacked" v-model="form.location" readonly />
        </ion-item>
        <ion-item>
          <ion-input label="数量" label-placement="stacked" v-model="form.quantity" readonly />
        </ion-item>
        <ion-item>
          <ion-input label="ロット番号" label-placement="stacked" v-model="form.lotNumber" readonly />
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="solid" color="tertiary" @click="onScan">追加</ion-button>
          <ion-button fill="outline" color="medium" @click="onClear" :disabled="!scanned">クリア</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button fill="solid" color="primary" @click="onRegister" :disabled="!scanned">登録</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<style scoped>
ion-footer ion-button {
  --padding-start: 0;
  --padding-end: 0;
  min-width: 6em;
  width: 6em;
}
</style>

<script setup lang="ts">
// @ts-nocheck
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton,
  IonContent, IonFooter, IonList, IonItem, IonInput,
  loadingController, toastController,
} from '@ionic/vue';

const router = useRouter();

const mockDb = [
  { code: 'QR-1001', itemCode: 'BP-001', itemName: 'ボールペン（黒）', location: 'A-01', quantity: 50, lotNumber: 'L2026-100' },
  { code: 'QR-1002', itemCode: 'PP-A4', itemName: 'コピー用紙 A4', location: 'B-03', quantity: 20, lotNumber: 'L2026-101' },
  { code: 'QR-1003', itemCode: 'CF-010', itemName: 'クリアファイル', location: 'C-05', quantity: 100, lotNumber: 'L2026-102' },
];

const scanned = ref(false);
const scannedCode = ref('');
const form = reactive({
  itemCode: '',
  itemName: '',
  location: '',
  quantity: '',
  lotNumber: '',
});

const showToast = async (message: string, color: 'success' | 'danger') => {
  const toast = await toastController.create({
    message,
    duration: 1500,
    color,
    position: 'middle',
  });
  await toast.present();
};

const onScan = async () => {
  const loading = await loadingController.create({
    message: '読み取り中...',
    spinner: 'crescent',
  });
  await loading.present();
  await new Promise((r) => setTimeout(r, 800));
  await loading.dismiss();

  const success = Math.random() > 0.2;
  if (!success) {
    await showToast('読み取りに失敗しました', 'danger');
    return;
  }

  const next = mockDb[Math.floor(Math.random() * mockDb.length)];
  scannedCode.value = next.code;
  form.itemCode = next.itemCode;
  form.itemName = next.itemName;
  form.location = next.location;
  form.quantity = String(next.quantity);
  form.lotNumber = next.lotNumber;
  scanned.value = true;

  await showToast(`読み取り成功: ${next.code}`, 'success');
};

const onClear = () => {
  scanned.value = false;
  scannedCode.value = '';
  form.itemCode = '';
  form.itemName = '';
  form.location = '';
  form.quantity = '';
  form.lotNumber = '';
};

const onRegister = () => {
  router.back();
};
</script>
