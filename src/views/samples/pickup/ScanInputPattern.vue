<template>
  <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>スキャン入力型</ion-title>
        </ion-toolbar>
        <!-- 条件エリア (accordion in header) -->
        <ion-accordion-group v-model="accordionValue">
          <ion-accordion value="condition">
            <ion-item slot="header" color="light">
              <ion-label>入力条件</ion-label>
            </ion-item>
            <div slot="content">
              <ion-list>
                <ion-item>
                  <ion-input label="ロケーション" label-placement="stacked" placeholder="棚番を入力" v-model="form.location" />
                </ion-item>
                <ion-item>
                  <ion-input label="品目コード" label-placement="stacked" placeholder="品目コードを入力" v-model="form.itemCode">
                    <ion-icon :icon="searchOutline" slot="end" />
                  </ion-input>
                </ion-item>
                <ion-item button @click="promptQuantity">
                  <ion-input label="数量" label-placement="stacked" placeholder="タップして入力" :value="form.quantity" readonly />
                </ion-item>
                <ion-item>
                  <ion-input label="ロット番号" label-placement="stacked" placeholder="ロット番号" v-model="form.lotNumber" />
                </ion-item>
                <ion-item>
                  <ion-input label="年月日" label-placement="stacked" placeholder="日付を選択" :value="form.date" readonly id="cond-date-trigger" />
                </ion-item>
                <ion-popover trigger="cond-date-trigger" :keep-contents-mounted="true" class="datetime-popover">
                  <ion-datetime presentation="date" prefer-wheel="true" v-model="form.date" show-default-buttons />
                </ion-popover>
                <ion-item>
                  <ion-input label="時刻" label-placement="stacked" placeholder="時刻を選択" :value="form.time" readonly id="cond-time-trigger" />
                </ion-item>
                <ion-popover trigger="cond-time-trigger" :keep-contents-mounted="true" class="datetime-popover">
                  <ion-datetime presentation="time" v-model="form.time" show-default-buttons />
                </ion-popover>
              </ion-list>
              <ion-button expand="block" color="primary" class="ion-margin-top" @click="onSearch">検索</ion-button>
            </div>
          </ion-accordion>
        </ion-accordion-group>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- コンテンツ: 登録済み履歴 -->
        <div v-show="showResults" class="content-area">
          <p class="result-count">登録済み {{ items.length }}件</p>
          <ion-list>
            <ion-item v-for="item in items" :key="item.id">
              <ion-checkbox slot="start" v-model="item.selected" />
              <ion-label>
                <h3>{{ item.itemCode }} {{ item.itemName }}</h3>
                <p>棚: {{ item.location }} / 数量: {{ item.quantity }} / ロット: {{ item.lotNumber }}</p>
              </ion-label>
              <ion-badge slot="end" :color="item.status === 'OK' ? 'success' : 'danger'" button @click="showStatus(item)">{{ item.status }}</ion-badge>
              <ion-button slot="end" fill="clear" size="small" @click="$router.push(`/pattern/scan-input/${item.id}`)">詳細</ion-button>
            </ion-item>
          </ion-list>
        </div>
      </ion-content>

      <ion-footer>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button fill="outline" color="primary">登録確定</ion-button>
            <ion-button fill="outline" color="medium">クリア</ion-button>
            <ion-button fill="solid" color="tertiary" @click="$router.push('/pattern/scan-input/read')">読み取り</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button fill="clear" size="small">先頭</ion-button>
            <ion-button fill="clear" size="small">前へ</ion-button>
            <ion-button fill="clear" size="small">次へ</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonMenuButton, IonButtons, IonButton, IonList, IonItem,
  IonLabel, IonInput, IonIcon, IonBadge, IonCheckbox,
  IonAccordion, IonAccordionGroup, IonDatetime, IonPopover,
  alertController, loadingController,
} from '@ionic/vue';
import { searchOutline } from 'ionicons/icons';
import { items } from './scanInputStore';
const showResults = ref(false);
const accordionValue = ref<string | undefined>(undefined);
const onSearch = async () => {
  accordionValue.value = undefined;
  const loading = await loadingController.create({
    message: '読み込み中...',
    spinner: 'crescent',
  });
  await loading.present();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await loading.dismiss();
  showResults.value = true;
};

const form = ref({
  location: '',
  itemCode: '',
  quantity: '',
  lotNumber: '',
  date: '',
  time: '',
});

const promptQuantity = async () => {
  const alert = await alertController.create({
    header: '数量入力',
    inputs: [
      {
        name: 'quantity',
        type: 'number',
        value: form.value.quantity,
        placeholder: '数量を入力',
        min: 0,
      },
    ],
    buttons: [
      { text: 'キャンセル', role: 'cancel' },
      {
        text: 'OK',
        handler: (data) => {
          form.value.quantity = data.quantity;
        },
      },
    ],
  });
  await alert.present();
};

const showStatus = async (item) => {
  const isOk = item.status === 'OK';
  const alert = await alertController.create({
    header: isOk ? '正常' : 'エラー詳細',
    subHeader: isOk ? undefined : `エラーコード: ${item.errorCode}`,
    message: isOk ? 'エラーはありません。' : item.errorMessage,
    buttons: ['閉じる'],
  });
  await alert.present();
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
ion-footer ion-button {
  --padding-start: 0;
  --padding-end: 0;
  min-width: 6em;
  width: 6em;
}
</style>

<style>
.datetime-popover {
  --width: 320px;
}
</style>
