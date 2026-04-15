<template>
  <ion-page>
    <!-- サイドドロワー -->
    <ion-menu side="start" content-id="detail-screen-main">
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item router-link="/samples/pickup/scan-input">
            <ion-icon :icon="scanOutline" slot="start" />
            <ion-label>スキャン入力型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/scan-accumulate">
            <ion-icon :icon="layersOutline" slot="start" />
            <ion-label>スキャン蓄積型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/search-view">
            <ion-icon :icon="searchOutline" slot="start" />
            <ion-label>検索照会型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/input-helpers">
            <ion-icon :icon="constructOutline" slot="start" />
            <ion-label>入力補助パターン</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/inline-edit">
            <ion-icon :icon="createOutline" slot="start" />
            <ion-label>インライン編集型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/detail-screen" class="menu-active">
            <ion-icon :icon="documentTextOutline" slot="start" />
            <ion-label>詳細表示・編集型</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div id="detail-screen-main">
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>詳細表示・編集型</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- 一覧リスト -->
        <div class="content-area">
          <p class="result-count">{{ items.length }}件</p>

          <ion-list>
            <ion-item v-for="item in items" :key="item.id">
              <ion-label>
                <h3>{{ item.itemCode }} {{ item.itemName }}</h3>
                <p>数量: {{ item.quantity }} / ロット: {{ item.lotNumber }}</p>
              </ion-label>
              <ion-button slot="end" fill="outline" size="small" @click="openModal(item)">詳細</ion-button>
              <ion-button slot="end" fill="outline" size="small" color="tertiary" :router-link="`/samples/pickup/detail-screen/detail/${item.id}`">別ページ</ion-button>
            </ion-item>
          </ion-list>
        </div>

        <!-- 詳細モーダル -->
        <ion-modal :is-open="isModalOpen" @did-dismiss="isModalOpen = false">
          <ion-header>
            <ion-toolbar>
              <ion-title>詳細・編集</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="isModalOpen = false">閉じる</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <div v-if="selectedItem">
              <!-- 読み取り専用 -->
              <ion-list-header>
                <ion-label color="medium">読み取り専用</ion-label>
              </ion-list-header>
              <ion-list>
                <ion-item>
                  <ion-label>
                    <p>品番</p>
                    <h3>{{ selectedItem.itemCode }}</h3>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <p>品名</p>
                    <h3>{{ selectedItem.itemName }}</h3>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <p>数量</p>
                    <h3>{{ selectedItem.quantity }}</h3>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <p>ロット</p>
                    <h3>{{ selectedItem.lotNumber }}</h3>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <p>スキャン時刻</p>
                    <h3>{{ selectedItem.scannedAt }}</h3>
                  </ion-label>
                </ion-item>
              </ion-list>

              <!-- 編集可能 -->
              <ion-list-header>
                <ion-label color="primary">編集可能</ion-label>
              </ion-list-header>
              <ion-list>
                <ion-item>
                  <ion-input label="保管場所" label-placement="stacked" placeholder="保管場所を入力" v-model="selectedItem.storageLoc" />
                </ion-item>
                <ion-item>
                  <ion-select label="区分" label-placement="stacked" placeholder="選択" v-model="selectedItem.category">
                    <ion-select-option value="normal">通常</ion-select-option>
                    <ion-select-option value="urgent">緊急</ion-select-option>
                    <ion-select-option value="return">返品</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-item>
                  <ion-textarea label="備考" label-placement="stacked" placeholder="備考を入力" v-model="selectedItem.remarks" :rows="3" />
                </ion-item>
              </ion-list>

              <div class="modal-actions">
                <ion-button expand="block" color="primary">保存</ion-button>
                <ion-button expand="block" fill="outline" @click="isModalOpen = false">戻る</ion-button>
              </div>
            </div>
          </ion-content>
        </ion-modal>
      </ion-content>

      <ion-footer>
        <ion-toolbar class="screen-buttons">
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
  IonMenu, IonMenuButton, IonButtons, IonButton, IonList, IonListHeader,
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea,
  IonIcon, IonModal,
} from '@ionic/vue';
import {
  searchOutline, scanOutline, layersOutline, constructOutline,
  createOutline, documentTextOutline, menuOutline, printOutline,
} from 'ionicons/icons';

const isModalOpen = ref(false);
const selectedItem = ref(null);

const items = ref([
  { id: 1, itemCode: 'BP-001', itemName: 'ボールペン（黒）', quantity: 150, lotNumber: 'L001', scannedAt: '10:30', storageLoc: '棚A-01', category: 'normal', remarks: '' },
  { id: 2, itemCode: 'PP-A4', itemName: 'コピー用紙 A4', quantity: 8, lotNumber: 'L002', scannedAt: '10:32', storageLoc: '棚B-03', category: '', remarks: '' },
  { id: 3, itemCode: 'CF-010', itemName: 'クリアファイル', quantity: 45, lotNumber: 'L003', scannedAt: '10:35', storageLoc: '', category: '', remarks: '' },
  { id: 4, itemCode: 'TP-100', itemName: '梱包テープ', quantity: 30, lotNumber: 'L004', scannedAt: '10:38', storageLoc: '棚D-02', category: 'urgent', remarks: '至急対応' },
]);

const openModal = (item) => {
  selectedItem.value = item;
  isModalOpen.value = true;
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
.modal-actions {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
