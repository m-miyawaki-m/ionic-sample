<template>
  <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>インライン編集型</ion-title>
        </ion-toolbar>
        <!-- 条件エリア -->
        <div class="condition-area ion-padding-horizontal">
          <div class="condition-header">
            <span class="condition-title">絞り込み</span>
            <div class="condition-buttons">
              <ion-button size="small" fill="solid" color="success" @click="isOpen = true">+</ion-button>
              <ion-button size="small" fill="solid" color="danger" @click="isOpen = false">−</ion-button>
            </div>
          </div>
          <div v-show="isOpen" class="condition-body">
            <ion-list>
              <ion-item>
                <ion-select label="ステータス" label-placement="stacked" placeholder="選択" v-model="filterStatus">
                  <ion-select-option value="all">すべて</ion-select-option>
                  <ion-select-option value="ok">OK</ion-select-option>
                  <ion-select-option value="ng">NG</ion-select-option>
                  <ion-select-option value="pending">未確認</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-list>
            <ion-button expand="block" color="primary" class="ion-margin-top" @click="showResults = true">検索</ion-button>
          </div>
        </div>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- コンテンツ: インライン編集リスト -->
        <div v-show="showResults" class="content-area">
          <p class="result-count">{{ items.length }}件</p>
          <div class="edit-list">
            <div v-for="item in items" :key="item.id" class="edit-row" :class="{ 'row-ng': item.status === 'NG' }">
              <!-- 行ヘッダー: チェック + 品名 + ステータス -->
              <div class="row-header">
                <ion-checkbox v-model="item.checked" />
                <span class="row-title">{{ item.itemCode }} {{ item.itemName }}</span>
                <ion-badge :color="item.status === 'OK' ? 'success' : item.status === 'NG' ? 'danger' : 'warning'">
                  {{ item.status }}
                </ion-badge>
              </div>
              <!-- 行内フィールド -->
              <div class="row-fields">
                <div class="field-pair">
                  <span class="field-label">予定</span>
                  <span class="field-readonly">{{ item.plannedQty }}</span>
                </div>
                <div class="field-pair">
                  <span class="field-label">実績</span>
                  <ion-input type="number" :value="item.actualQty" class="inline-input" />
                </div>
              </div>
              <div class="row-fields">
                <div class="field-pair field-wide">
                  <span class="field-label">備考</span>
                  <ion-input placeholder="備考を入力" :value="item.remarks" class="inline-input" />
                </div>
              </div>
              <div class="row-fields">
                <div class="field-pair">
                  <span class="field-label">区分</span>
                  <ion-select :value="item.category" placeholder="選択" class="inline-select" interface="popover">
                    <ion-select-option value="normal">通常</ion-select-option>
                    <ion-select-option value="urgent">緊急</ion-select-option>
                    <ion-select-option value="return">返品</ion-select-option>
                  </ion-select>
                </div>
                <div class="field-pair">
                  <ion-button v-if="!item.inputComplete" fill="outline" size="small" color="warning">入力</ion-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ion-content>

      <ion-footer>
        <ion-toolbar class="screen-buttons">
          <ion-buttons slot="start">
            <ion-button fill="outline" color="primary">登録確定</ion-button>
            <ion-button fill="outline" color="medium">全選択</ion-button>
            <ion-button fill="outline" color="danger">選択削除</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button fill="clear" size="small">前へ</ion-button>
            <ion-button fill="clear" size="small">次へ</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-toolbar class="nav-bar">
          <div class="nav-bar-inner">
            <button class="nav-bar-item" @click="$router.push('/home')">
              <ion-icon :icon="homeOutline" />
              <span>ホーム</span>
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
  IonIcon, IonBadge,
} from '@ionic/vue';
import {
  scanOutline, createOutline, homeOutline, printOutline,
} from 'ionicons/icons';
const isOpen = ref(false);
const showResults = ref(false);
const filterStatus = ref('all');

const items = ref([
  { id: 1, itemCode: 'BP-001', itemName: 'ボールペン（黒）', plannedQty: 10, actualQty: 10, remarks: '', category: 'normal', status: 'OK', checked: true, inputComplete: true },
  { id: 2, itemCode: 'PP-A4', itemName: 'コピー用紙 A4', plannedQty: 20, actualQty: 15, remarks: '一部破損', category: 'normal', status: 'NG', checked: false, inputComplete: true },
  { id: 3, itemCode: 'CF-010', itemName: 'クリアファイル', plannedQty: 50, actualQty: 50, remarks: '', category: 'urgent', status: 'OK', checked: false, inputComplete: true },
  { id: 4, itemCode: 'TP-100', itemName: '梱包テープ', plannedQty: 30, actualQty: 0, remarks: '', category: '', status: '未確認', checked: false, inputComplete: false },
  { id: 5, itemCode: 'EN-050', itemName: '封筒（角2）', plannedQty: 100, actualQty: 0, remarks: '', category: '', status: '未確認', checked: false, inputComplete: false },
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
.edit-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.edit-row {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 10px;
}
.row-ng {
  border-left: 3px solid var(--ion-color-danger);
}
.row-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.row-title {
  flex: 1;
  font-weight: 600;
  font-size: 14px;
}
.row-fields {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}
.field-pair {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
}
.field-wide {
  flex: 2;
}
.field-label {
  font-size: 12px;
  color: var(--ion-color-medium);
  min-width: 32px;
}
.field-readonly {
  font-size: 14px;
}
.inline-input {
  --padding-start: 8px;
  --padding-end: 4px;
  --background: var(--ion-color-light-shade);
  border-radius: 4px;
  font-size: 14px;
}
.inline-select {
  --padding-start: 4px;
  font-size: 13px;
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
