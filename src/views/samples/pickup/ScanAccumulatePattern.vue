<template>
  <ion-page>
    <!-- サイドドロワー -->
    <ion-menu side="start" content-id="scan-accumulate-main">
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item router-link="/pattern/scan-input">
            <ion-icon :icon="scanOutline" slot="start" />
            <ion-label>スキャン入力型</ion-label>
          </ion-item>
          <ion-item router-link="/pattern/scan-accumulate" class="menu-active">
            <ion-icon :icon="layersOutline" slot="start" />
            <ion-label>スキャン蓄積型</ion-label>
          </ion-item>
          <ion-item router-link="/pattern/search-view">
            <ion-icon :icon="searchOutline" slot="start" />
            <ion-label>検索照会型</ion-label>
          </ion-item>
          <ion-item router-link="/pattern/input-helpers">
            <ion-icon :icon="constructOutline" slot="start" />
            <ion-label>入力補助パターン</ion-label>
          </ion-item>
          <ion-item router-link="/pattern/inline-edit">
            <ion-icon :icon="createOutline" slot="start" />
            <ion-label>インライン編集型</ion-label>
          </ion-item>
          <ion-item router-link="/pattern/detail-screen">
            <ion-icon :icon="documentTextOutline" slot="start" />
            <ion-label>詳細表示・編集型</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div id="scan-accumulate-main">
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>スキャン蓄積型</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- 条件エリア -->
        <div class="condition-area">
          <div class="condition-header">
            <span class="condition-title">絞り込み条件</span>
            <div class="condition-buttons">
              <ion-button size="small" fill="solid" color="success" @click="isOpen = true">+</ion-button>
              <ion-button size="small" fill="solid" color="danger" @click="isOpen = false">−</ion-button>
            </div>
          </div>
          <div v-show="isOpen" class="condition-body">
            <ion-list>
              <ion-item>
                <ion-select label="種別" label-placement="stacked" placeholder="選択してください" v-model="filterType">
                  <ion-select-option value="all">すべて</ion-select-option>
                  <ion-select-option value="typeA">種別A</ion-select-option>
                  <ion-select-option value="typeB">種別B</ion-select-option>
                  <ion-select-option value="typeC">種別C</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-input label="日付" label-placement="stacked" type="date" v-model="filterDate" />
              </ion-item>
            </ion-list>
            <ion-button expand="block" color="primary" class="ion-margin-top">検索</ion-button>
          </div>
        </div>

        <!-- リスト/カード切替 -->
        <ion-segment v-model="viewMode">
          <ion-segment-button value="list">
            <ion-label>リスト</ion-label>
          </ion-segment-button>
          <ion-segment-button value="card">
            <ion-label>カード</ion-label>
          </ion-segment-button>
        </ion-segment>

        <!-- コンテンツ -->
        <div class="content-area">
          <p class="result-count">スキャン済み {{ items.length }}件</p>

          <!-- リスト表示 -->
          <ion-list v-if="viewMode === 'list'">
            <ion-item v-for="item in items" :key="item.id">
              <ion-label>
                <h3>No.{{ item.id }} {{ item.itemCode }} {{ item.itemName }}</h3>
                <p>数量: {{ item.quantity }} / 棚: {{ item.location }} / {{ item.scannedAt }}</p>
              </ion-label>
              <ion-badge slot="end" :color="item.status === 'OK' ? 'success' : 'danger'">{{ item.status }}</ion-badge>
            </ion-item>
          </ion-list>

          <!-- カード表示 -->
          <div v-if="viewMode === 'card'">
            <ion-card v-for="item in items" :key="item.id" :class="{ 'card-ng': item.status === 'NG' }">
              <ion-card-header>
                <div class="card-header-row">
                  <ion-card-subtitle>No.{{ item.id }}</ion-card-subtitle>
                  <ion-badge :color="item.status === 'OK' ? 'success' : 'danger'">{{ item.status }}</ion-badge>
                </div>
                <ion-card-title>{{ item.itemCode }} {{ item.itemName }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="card-grid">
                  <div class="card-field"><span class="card-label">数量</span><span>{{ item.quantity }}</span></div>
                  <div class="card-field"><span class="card-label">棚</span><span>{{ item.location }}</span></div>
                  <div class="card-field"><span class="card-label">ロット</span><span>{{ item.lotNumber }}</span></div>
                  <div class="card-field"><span class="card-label">時刻</span><span>{{ item.scannedAt }}</span></div>
                </div>
                <div class="card-actions">
                  <ion-button fill="outline" size="small">詳細</ion-button>
                  <ion-button fill="outline" size="small" color="warning">入力</ion-button>
                  <ion-button fill="outline" size="small" color="danger">削除</ion-button>
                </div>
              </ion-card-content>
            </ion-card>
          </div>
        </div>
      </ion-content>

      <ion-footer>
        <ion-toolbar class="screen-buttons">
          <ion-buttons slot="start">
            <ion-button fill="outline" color="primary">一括登録（{{ items.length }}件）</ion-button>
            <ion-button fill="outline" color="medium">全選択</ion-button>
            <ion-button fill="outline" color="danger">クリア</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button fill="clear" size="small">前へ</ion-button>
            <ion-button fill="clear" size="small">次へ</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-toolbar class="common-buttons">
          <ion-buttons slot="start">
            <ion-button fill="solid" color="medium">
              <ion-icon :icon="menuOutline" slot="start" />
              メニュー
            </ion-button>
            <ion-button fill="solid" color="tertiary">
              <ion-icon :icon="scanOutline" slot="start" />
              スキャン
            </ion-button>
            <ion-button fill="solid" color="dark">
              <ion-icon :icon="printOutline" slot="start" />
              印刷
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonMenu, IonMenuButton, IonButtons, IonButton, IonList, IonItem,
  IonLabel, IonInput, IonSelect, IonSelectOption, IonIcon, IonBadge,
  IonSegment, IonSegmentButton,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
} from '@ionic/vue';
import {
  searchOutline, scanOutline, layersOutline, constructOutline,
  createOutline, documentTextOutline, menuOutline, printOutline,
} from 'ionicons/icons';

const isOpen = ref(true);
const viewMode = ref('list');
const filterType = ref('all');
const filterDate = ref('');

const items = ref([
  { id: 1, itemCode: 'BP-001', itemName: 'ボールペン（黒）', location: 'A-01', quantity: 10, lotNumber: 'L001', scannedAt: '10:30', status: 'OK' },
  { id: 2, itemCode: 'PP-A4', itemName: 'コピー用紙 A4', location: 'B-03', quantity: 5, lotNumber: 'L002', scannedAt: '10:32', status: 'NG' },
  { id: 3, itemCode: 'CF-010', itemName: 'クリアファイル', location: 'C-05', quantity: 20, lotNumber: 'L003', scannedAt: '10:35', status: 'OK' },
  { id: 4, itemCode: 'TP-100', itemName: '梱包テープ', location: 'D-02', quantity: 15, lotNumber: 'L004', scannedAt: '10:38', status: 'OK' },
  { id: 5, itemCode: 'EN-050', itemName: '封筒（角2）', location: 'A-07', quantity: 50, lotNumber: 'L005', scannedAt: '10:40', status: 'NG' },
]);
</script>

<style scoped>
#scan-accumulate-main { display: flex; flex-direction: column; height: 100%; }
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
  margin-top: 12px;
}
.result-count {
  font-size: 13px;
  color: var(--ion-color-medium);
  margin: 8px 0;
}
.card-ng {
  border-left: 3px solid var(--ion-color-danger);
}
.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin-bottom: 8px;
}
.card-field {
  font-size: 13px;
}
.card-label {
  color: var(--ion-color-medium);
  margin-right: 4px;
}
.card-actions {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
}
.screen-buttons {
  --border-width: 1px 0 0 0;
}
.common-buttons {
  --background: var(--ion-color-light);
}
.menu-active {
  --background: var(--ion-color-primary-tint);
  font-weight: 600;
}
</style>
