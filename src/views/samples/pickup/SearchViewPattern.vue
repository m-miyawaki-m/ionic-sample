<template>
  <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>検索照会型</ion-title>
        </ion-toolbar>
        <!-- 条件エリア (fixed in header) -->
        <div class="condition-area ion-padding-horizontal">
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
      </ion-header>

      <ion-content class="ion-padding">
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
        <ion-toolbar class="nav-bar">
          <div class="nav-bar-inner">
            <button class="nav-bar-item">
              <ion-icon :icon="menuOutline" />
              <span>メニュー</span>
            </button>
            <button class="nav-bar-item">
              <ion-icon :icon="scanOutline" />
              <span>スキャン</span>
            </button>
            <button class="nav-bar-item">
              <ion-icon :icon="printOutline" />
              <span>印刷</span>
            </button>
          </div>
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
  IonLabel, IonInput, IonSelect, IonSelectOption, IonCheckbox,
  IonSearchbar, IonIcon, IonBadge, IonNote,
} from '@ionic/vue';
import {
  searchOutline, scanOutline, createOutline, menuOutline, printOutline,
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
.menu-active {
  --background: var(--ion-color-primary-tint);
  font-weight: 600;
}
.nav-bar {
  --background: var(--ion-color-light);
  --border-width: 1px 0 0 0;
}
.nav-bar-inner {
  display: flex;
  justify-content: space-around;
  padding: 4px 0;
}
.nav-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  color: var(--ion-color-medium);
  font-size: 11px;
  padding: 4px 16px;
  cursor: pointer;
}
.nav-bar-item ion-icon {
  font-size: 22px;
}
.nav-bar-item:active {
  color: var(--ion-color-primary);
}
</style>
