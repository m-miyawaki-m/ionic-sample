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
