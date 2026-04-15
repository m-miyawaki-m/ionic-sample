<template>
  <!-- サイドドロワー -->
  <ion-menu side="start" content-id="scan-input-main">
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item button menu-close router-link="/pattern/scan-input" class="menu-active">
            <ion-icon :icon="scanOutline" slot="start" />
            <ion-label>スキャン入力型</ion-label>
          </ion-item>
          <ion-item button menu-close router-link="/pattern/scan-accumulate">
            <ion-icon :icon="layersOutline" slot="start" />
            <ion-label>スキャン蓄積型</ion-label>
          </ion-item>
          <ion-item button menu-close router-link="/pattern/search-view">
            <ion-icon :icon="searchOutline" slot="start" />
            <ion-label>検索照会型</ion-label>
          </ion-item>
          <ion-item button menu-close router-link="/pattern/input-helpers">
            <ion-icon :icon="constructOutline" slot="start" />
            <ion-label>入力補助パターン</ion-label>
          </ion-item>
          <ion-item button menu-close router-link="/pattern/inline-edit">
            <ion-icon :icon="createOutline" slot="start" />
            <ion-label>インライン編集型</ion-label>
          </ion-item>
          <ion-item button menu-close router-link="/pattern/detail-screen">
            <ion-icon :icon="documentTextOutline" slot="start" />
            <ion-label>詳細表示・編集型</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

  <ion-page id="scan-input-main">
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>スキャン入力型</ion-title>
        </ion-toolbar>
        <!-- 条件エリア (fixed in header) -->
        <div class="condition-area ion-padding-horizontal">
          <div class="condition-header">
            <span class="condition-title">入力条件</span>
            <div class="condition-buttons">
              <ion-button size="small" fill="solid" color="success" @click="isOpen = true">+</ion-button>
              <ion-button size="small" fill="solid" color="danger" @click="isOpen = false">−</ion-button>
            </div>
          </div>
          <div v-show="isOpen" class="condition-body">
            <ion-list>
              <ion-item>
                <ion-input label="ロケーション" label-placement="stacked" placeholder="棚番を入力" v-model="form.location" />
              </ion-item>
              <ion-item>
                <ion-input label="品目コード" label-placement="stacked" placeholder="品目コードを入力" v-model="form.itemCode">
                  <ion-icon :icon="searchOutline" slot="end" />
                </ion-input>
              </ion-item>
              <ion-item>
                <ion-input label="数量" label-placement="stacked" type="number" placeholder="0" v-model="form.quantity" />
              </ion-item>
              <ion-item>
                <ion-input label="ロット番号" label-placement="stacked" placeholder="ロット番号" v-model="form.lotNumber" />
              </ion-item>
            </ion-list>
            <ion-button expand="block" color="primary" class="ion-margin-top">検索</ion-button>
          </div>
        </div>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- コンテンツ: 登録済み履歴 -->
        <div class="content-area">
          <p class="result-count">登録済み {{ items.length }}件</p>
          <ion-list>
            <ion-item v-for="item in items" :key="item.id">
              <ion-label>
                <h3>{{ item.itemCode }} {{ item.itemName }}</h3>
                <p>棚: {{ item.location }} / 数量: {{ item.quantity }} / ロット: {{ item.lotNumber }}</p>
              </ion-label>
              <ion-badge slot="end" :color="item.status === 'OK' ? 'success' : 'danger'">{{ item.status }}</ion-badge>
              <ion-button slot="end" fill="clear" size="small">詳細</ion-button>
            </ion-item>
          </ion-list>
        </div>
      </ion-content>

      <ion-footer>
        <ion-toolbar class="screen-buttons">
          <ion-buttons slot="start">
            <ion-button fill="outline" color="primary">登録確定</ion-button>
            <ion-button fill="outline" color="medium">クリア</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button fill="clear" size="small">先頭</ion-button>
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
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonMenu, IonMenuButton, IonButtons, IonButton, IonList, IonItem,
  IonLabel, IonInput, IonIcon, IonBadge,
} from '@ionic/vue';
import {
  searchOutline, scanOutline, layersOutline, constructOutline,
  createOutline, documentTextOutline, menuOutline, printOutline,
} from 'ionicons/icons';

const isOpen = ref(true);

const form = ref({
  location: '',
  itemCode: '',
  quantity: '',
  lotNumber: '',
});

const items = ref([
  { id: 1, itemCode: 'BP-001', itemName: 'ボールペン（黒）', location: 'A-01', quantity: 150, lotNumber: 'L2025-001', status: 'OK' },
  { id: 2, itemCode: 'PP-A4', itemName: 'コピー用紙 A4', location: 'B-03', quantity: 8, lotNumber: 'L2025-002', status: 'NG' },
  { id: 3, itemCode: 'CF-010', itemName: 'クリアファイル', location: 'C-05', quantity: 45, lotNumber: 'L2025-003', status: 'OK' },
  { id: 4, itemCode: 'TP-100', itemName: '梱包テープ', location: 'D-02', quantity: 30, lotNumber: 'L2025-004', status: 'OK' },
  { id: 5, itemCode: 'EN-050', itemName: '封筒（角2）', location: 'A-07', quantity: 200, lotNumber: 'L2025-005', status: 'OK' },
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
.common-buttons {
  --background: var(--ion-color-light);
}
.menu-active {
  --background: var(--ion-color-primary-tint);
  font-weight: 600;
}
</style>
