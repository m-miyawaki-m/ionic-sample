<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/screen-patterns" />
        </ion-buttons>
        <ion-title>在庫照会（カード表示）</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- 入力エリア -->
      <div class="search-area">
        <ion-item lines="none" class="search-item">
          <ion-label position="stacked" class="search-label">品番/品名</ion-label>
          <div class="search-row">
            <ion-input
              v-model="query"
              placeholder="品番または品名を入力"
              class="search-input"
              @keyup.enter="search"
            />
            <ion-button size="default" @click="search" class="search-btn">
              <ion-icon :icon="searchOutline" slot="start" />
              検索
            </ion-button>
          </div>
        </ion-item>
      </div>

      <!-- カードエリア -->
      <div class="card-area">
        <!-- ローディング -->
        <div v-if="loading" class="spinner-wrap">
          <ion-spinner name="crescent" />
        </div>

        <template v-else>
          <!-- カード一覧 -->
          <template v-if="items.length > 0">
            <ion-card v-for="item in items" :key="item.no" class="product-card">
              <!-- カードヘッダー -->
              <ion-card-header class="card-header">
                <ion-card-title class="card-title">{{ item.code }} {{ item.name }}</ion-card-title>
                <ion-card-subtitle class="card-subtitle">{{ item.spec }} / {{ item.category }}</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content class="card-body">
                <!-- Row 1: ロケーション / 棚番 / 単位 -->
                <ion-grid class="info-grid">
                  <ion-row class="info-row">
                    <ion-col size="4">
                      <div class="info-label">ロケ</div>
                      <div class="info-value">{{ item.location }}</div>
                    </ion-col>
                    <ion-col size="4">
                      <div class="info-label">棚番</div>
                      <div class="info-value">{{ item.shelf }}</div>
                    </ion-col>
                    <ion-col size="4">
                      <div class="info-label">単位</div>
                      <div class="info-value">{{ item.unit }}</div>
                    </ion-col>
                  </ion-row>
                </ion-grid>

                <div class="divider" />

                <!-- Row 2: 在庫数 / 引当数 / 有効在庫 (highlighted) -->
                <ion-grid class="stock-grid">
                  <ion-row class="stock-label-row">
                    <ion-col size="4" class="col-center">
                      <div class="stock-label">在庫数</div>
                    </ion-col>
                    <ion-col size="4" class="col-center">
                      <div class="stock-label">引当数</div>
                    </ion-col>
                    <ion-col size="4" class="col-center">
                      <div class="stock-label">有効在庫</div>
                    </ion-col>
                  </ion-row>
                  <ion-row class="stock-value-row">
                    <ion-col size="4" class="col-center">
                      <div class="stock-number">{{ item.stock.toLocaleString() }}</div>
                    </ion-col>
                    <ion-col size="4" class="col-center">
                      <div class="stock-number">{{ item.allocated.toLocaleString() }}</div>
                    </ion-col>
                    <ion-col size="4" class="col-center">
                      <div
                        class="stock-number"
                        :class="availableStock(item) < item.safetyStock ? 'text-danger' : ''"
                      >
                        {{ availableStock(item).toLocaleString() }}
                      </div>
                    </ion-col>
                  </ion-row>
                </ion-grid>

                <div class="divider" />

                <!-- Row 3: 入荷予定 / 発注残 / 安全在庫 -->
                <ion-grid class="info-grid">
                  <ion-row class="info-row">
                    <ion-col size="4">
                      <div class="info-label">入荷予定</div>
                      <div class="info-value small">{{ item.expectedIn.toLocaleString() }}</div>
                    </ion-col>
                    <ion-col size="4">
                      <div class="info-label">発注残</div>
                      <div class="info-value small">{{ item.outstandingPo.toLocaleString() }}</div>
                    </ion-col>
                    <ion-col size="4">
                      <div class="info-label">安全在庫</div>
                      <div class="info-value small">{{ item.safetyStock.toLocaleString() }}</div>
                    </ion-col>
                  </ion-row>
                </ion-grid>

                <div class="divider" />

                <!-- Row 4: 最終入荷日 / 最終出庫日 -->
                <ion-grid class="info-grid">
                  <ion-row class="info-row">
                    <ion-col size="6">
                      <div class="info-label">最終入荷</div>
                      <div class="info-value small">{{ item.lastInDate }}</div>
                    </ion-col>
                    <ion-col size="6">
                      <div class="info-label">最終出庫</div>
                      <div class="info-value small">{{ item.lastOutDate }}</div>
                    </ion-col>
                  </ion-row>
                </ion-grid>

                <div class="divider" />

                <!-- Row 5: 単価 / 在庫金額 -->
                <ion-grid class="info-grid">
                  <ion-row class="info-row">
                    <ion-col size="6">
                      <div class="info-label">単価</div>
                      <div class="info-value">¥{{ item.unitPrice.toLocaleString() }}</div>
                    </ion-col>
                    <ion-col size="6">
                      <div class="info-label">在庫金額</div>
                      <div class="info-value">{{ stockValue(item) }}</div>
                    </ion-col>
                  </ion-row>
                </ion-grid>

                <div class="divider" />

                <!-- Row 6: ステータス + 詳細リンク -->
                <div class="card-footer-row">
                  <div class="status-wrap">
                    <span class="status-label-text">ステータス:</span>
                    <ion-badge :color="statusColor(item)" class="status-badge">
                      {{ statusText(item) }}
                    </ion-badge>
                  </div>
                  <ion-text color="primary" class="detail-link" @click="showDetail(item)">
                    詳細を見る
                  </ion-text>
                </div>
              </ion-card-content>
            </ion-card>
          </template>

          <!-- 空状態 -->
          <div v-else class="empty-state">
            <ion-text color="medium">
              <p>品番/品名を入力して検索してください</p>
            </ion-text>
          </div>
        </template>
      </div>
    </ion-content>

    <!-- ボタンエリア (Footer) -->
    <ion-footer>
      <ion-toolbar class="footer-toolbar">
        <div class="footer-btn-wrap">
          <ion-button
            expand="block"
            fill="outline"
            color="medium"
            class="print-btn"
            :disabled="items.length === 0"
            @click="printAction"
          >
            印刷
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonSpinner,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonLabel,
  alertController,
  toastController,
} from '@ionic/vue';
import { searchOutline } from 'ionicons/icons';

const dummyData = [
  { code: 'A001', name: 'ボルト M8×30',   spec: 'SUS304',       unit: '個', category: '部品', location: 'A-01-01', shelf: 'A1-3', stock: 1250, allocated: 200,  expectedIn: 500,  outstandingPo: 300,  safetyStock: 100,  lastInDate: '2024/03/15', lastOutDate: '2024/04/01', unitPrice: 12  },
  { code: 'A002', name: 'ナット M8',       spec: 'SUS304',       unit: '個', category: '部品', location: 'A-01-02', shelf: 'A1-4', stock: 3400, allocated: 500,  expectedIn: 0,    outstandingPo: 1000, safetyStock: 500,  lastInDate: '2024/03/20', lastOutDate: '2024/04/05', unitPrice: 5   },
  { code: 'A003', name: 'ワッシャー M8',   spec: 'SUS304',       unit: '個', category: '部品', location: 'A-01-03', shelf: 'A1-5', stock: 890,  allocated: 100,  expectedIn: 200,  outstandingPo: 0,    safetyStock: 200,  lastInDate: '2024/02/28', lastOutDate: '2024/03/30', unitPrice: 3   },
  { code: 'B001', name: '配線ケーブル 2m', spec: 'UL1007 AWG22', unit: '本', category: '電材', location: 'B-02-01', shelf: 'B2-1', stock: 120,  allocated: 30,   expectedIn: 100,  outstandingPo: 50,   safetyStock: 50,   lastInDate: '2024/03/10', lastOutDate: '2024/04/02', unitPrice: 150 },
  { code: 'B002', name: 'コネクタ 4P',     spec: 'JST XH',       unit: '個', category: '電材', location: 'B-02-02', shelf: 'B2-2', stock: 450,  allocated: 0,    expectedIn: 0,    outstandingPo: 200,  safetyStock: 100,  lastInDate: '2024/01/15', lastOutDate: '2024/03/25', unitPrice: 45  },
  { code: 'C001', name: 'ブラケット L型',  spec: 'SPCC t2.0',    unit: '個', category: '板金', location: 'C-03-01', shelf: 'C3-1', stock: 75,   allocated: 20,   expectedIn: 50,   outstandingPo: 0,    safetyStock: 30,   lastInDate: '2024/02/20', lastOutDate: '2024/04/03', unitPrice: 280 },
  { code: 'D001', name: 'ラベル 大',       spec: '100×50mm',     unit: '枚', category: '資材', location: 'D-04-01', shelf: 'D4-1', stock: 5000, allocated: 1000, expectedIn: 0,    outstandingPo: 3000, safetyStock: 1000, lastInDate: '2024/03/01', lastOutDate: '2024/04/08', unitPrice: 2   },
];

const query   = ref('');
const items   = ref([]);
const loading = ref(false);
let nextNo = 1;

// --- computed helpers (plain functions since we iterate over items) ---

const availableStock = (item) => item.stock - item.allocated;

const stockValue = (item) => '¥' + (item.stock * item.unitPrice).toLocaleString();

const statusText = (item) => {
  if (item.stock < item.safetyStock)          return '不足';
  if (item.stock > item.safetyStock * 3)      return '過剰';
  return '通常';
};

const statusColor = (item) => {
  if (item.stock < item.safetyStock)          return 'danger';
  if (item.stock > item.safetyStock * 3)      return 'warning';
  return 'success';
};

// --- actions ---

const search = async () => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));

  const q = query.value.trim().toLowerCase();
  const matched = dummyData.filter(
    (d) => !q || d.code.toLowerCase().includes(q) || d.name.toLowerCase().includes(q)
  );

  items.value = matched.map((d) => ({ no: nextNo++, ...d }));
  loading.value = false;
};

const showDetail = async (item) => {
  const avail = availableStock(item);
  const alert = await alertController.create({
    header: `${item.code} ${item.name}`,
    message: [
      `規格: ${item.spec}`,
      `カテゴリ: ${item.category}`,
      `単位: ${item.unit}`,
      `ロケーション: ${item.location}`,
      `棚番: ${item.shelf}`,
      `在庫数: ${item.stock.toLocaleString()}`,
      `引当数: ${item.allocated.toLocaleString()}`,
      `有効在庫: ${avail.toLocaleString()}`,
      `入荷予定: ${item.expectedIn.toLocaleString()}`,
      `発注残: ${item.outstandingPo.toLocaleString()}`,
      `安全在庫: ${item.safetyStock.toLocaleString()}`,
      `最終入荷: ${item.lastInDate}`,
      `最終出庫: ${item.lastOutDate}`,
      `単価: ¥${item.unitPrice.toLocaleString()}`,
      `在庫金額: ${stockValue(item)}`,
      `ステータス: ${statusText(item)}`,
    ].join('\n'),
    buttons: ['閉じる'],
  });
  await alert.present();
};

const printAction = async () => {
  const toast = await toastController.create({
    message: '印刷しました',
    duration: 2000,
    position: 'bottom',
    color: 'success',
  });
  await toast.present();
};
</script>

<style scoped>
/* 入力エリア */
.search-area {
  padding: 8px 12px 4px;
  background: var(--ion-background-color, #fff);
  border-bottom: 1px solid var(--ion-color-light-shade, #d7d8da);
}

.search-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --background: transparent;
}

.search-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--ion-color-medium, #92949c);
  margin-bottom: 4px;
}

.search-row {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
}

.search-input {
  flex: 1;
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 6px;
  --padding-bottom: 6px;
  border: 1px solid var(--ion-color-medium-shade, #989aa2);
  border-radius: 6px;
  font-size: 14px;
}

.search-btn {
  --padding-start: 12px;
  --padding-end: 12px;
  flex-shrink: 0;
  height: 36px;
}

/* カードエリア */
.card-area {
  padding: 8px 12px 16px;
}

.spinner-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
}

/* カード */
.product-card {
  margin: 0 0 16px 0;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.card-header {
  padding-bottom: 4px;
}

.card-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--ion-color-dark, #222428);
}

.card-subtitle {
  font-size: 12px;
  color: var(--ion-color-medium, #92949c);
  margin-top: 2px;
}

.card-body {
  padding-top: 4px;
  padding-bottom: 12px;
}

/* グリッド共通 */
.info-grid,
.stock-grid {
  padding: 0;
  margin: 0;
}

.info-row,
.stock-label-row,
.stock-value-row {
  align-items: center;
}

/* Row 1 / Row 3 / Row 4 / Row 5: ラベル + 値 */
.info-label {
  font-size: 11px;
  color: var(--ion-color-medium, #92949c);
  margin-bottom: 1px;
}

.info-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--ion-text-color, #000);
}

.info-value.small {
  font-size: 13px;
  font-weight: 400;
}

/* Row 2: 在庫数ハイライトエリア */
.stock-label {
  font-size: 11px;
  color: var(--ion-color-medium, #92949c);
  text-align: center;
  margin-bottom: 2px;
}

.stock-number {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: var(--ion-text-color, #000);
  line-height: 1.2;
}

.text-danger {
  color: var(--ion-color-danger, #eb445a);
}

.col-center {
  text-align: center;
}

/* 区切り線 */
.divider {
  height: 1px;
  background: var(--ion-color-light-shade, #d7d8da);
  margin: 8px 0;
}

/* Row 6: ステータス + 詳細リンク */
.card-footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.status-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-label-text {
  font-size: 12px;
  color: var(--ion-color-medium, #92949c);
}

.status-badge {
  font-size: 12px;
  padding: 3px 8px;
}

.detail-link {
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
  user-select: none;
}

/* 空状態 */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px;
}

.empty-state p {
  font-size: 14px;
  text-align: center;
}

/* フッター */
.footer-toolbar {
  --padding-start: 0;
  --padding-end: 0;
  --min-height: 56px;
}

.footer-btn-wrap {
  display: flex;
  justify-content: center;
  padding: 8px 16px;
}

.print-btn {
  width: 140px;
}
</style>
