<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/screen-patterns" />
        </ion-buttons>
        <ion-title>在庫照会</ion-title>
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

      <!-- リストエリア -->
      <div class="list-area">
        <!-- ローディング -->
        <div v-if="loading" class="spinner-wrap">
          <ion-spinner name="crescent" />
        </div>

        <template v-else>
          <!-- テーブル（横スクロール） -->
          <div v-if="items.length > 0" class="table-scroll-wrap">
            <table class="inv-table">
              <thead>
                <tr>
                  <th class="col-no">No.</th>
                  <th class="col-code">品番</th>
                  <th class="col-name">品名</th>
                  <th class="col-spec">規格</th>
                  <th class="col-unit">単位</th>
                  <th class="col-category">カテゴリ</th>
                  <th class="col-location">ロケーション</th>
                  <th class="col-shelf">棚番</th>
                  <th class="col-num">在庫数</th>
                  <th class="col-num">引当数</th>
                  <th class="col-num">有効在庫</th>
                  <th class="col-num">入荷予定</th>
                  <th class="col-num">発注残</th>
                  <th class="col-num">安全在庫</th>
                  <th class="col-date">最終入荷日</th>
                  <th class="col-date">最終出庫日</th>
                  <th class="col-price">単価</th>
                  <th class="col-value">在庫金額</th>
                  <th class="col-status">ステータス</th>
                  <th class="col-detail">詳細</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in items"
                  :key="item.no"
                  class="data-row"
                >
                  <td class="col-no td-center">{{ item.no }}</td>
                  <td class="col-code td-center">{{ item.code }}</td>
                  <td class="col-name td-left">{{ item.name }}</td>
                  <td class="col-spec td-left">{{ item.spec }}</td>
                  <td class="col-unit td-center">{{ item.unit }}</td>
                  <td class="col-category td-center">{{ item.category }}</td>
                  <td class="col-location td-center">{{ item.location }}</td>
                  <td class="col-shelf td-center">{{ item.shelf }}</td>
                  <td class="col-num td-right">{{ item.stock.toLocaleString() }}</td>
                  <td class="col-num td-right">{{ item.allocated.toLocaleString() }}</td>
                  <td class="col-num td-right">{{ availableStock(item).toLocaleString() }}</td>
                  <td class="col-num td-right">{{ item.expectedIn.toLocaleString() }}</td>
                  <td class="col-num td-right">{{ item.outstandingPo.toLocaleString() }}</td>
                  <td class="col-num td-right">{{ item.safetyStock.toLocaleString() }}</td>
                  <td class="col-date td-center">{{ item.lastInDate }}</td>
                  <td class="col-date td-center">{{ item.lastOutDate }}</td>
                  <td class="col-price td-right">{{ item.unitPrice.toLocaleString() }}</td>
                  <td class="col-value td-right">{{ stockValue(item) }}</td>
                  <td class="col-status td-center">
                    <span :class="statusClass(item)">{{ statusLabel(item) }}</span>
                  </td>
                  <td class="col-detail td-center">
                    <span class="detail-link" @click="showDetail(item)">詳細</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

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
  IonLabel,
  alertController,
  toastController,
} from '@ionic/vue';
import { searchOutline } from 'ionicons/icons';

const dummyData = [
  { code: 'A001', name: 'ボルト M8×30',    spec: 'SUS304',        unit: '個', category: '部品', location: 'A-01-01', shelf: 'A1-3', stock: 1250, allocated: 200,  expectedIn: 500, outstandingPo: 300,  safetyStock: 100,  lastInDate: '2024/03/15', lastOutDate: '2024/04/01', unitPrice: 12  },
  { code: 'A002', name: 'ナット M8',        spec: 'SUS304',        unit: '個', category: '部品', location: 'A-01-02', shelf: 'A1-4', stock: 3400, allocated: 500,  expectedIn: 0,   outstandingPo: 1000, safetyStock: 500,  lastInDate: '2024/03/20', lastOutDate: '2024/04/05', unitPrice: 5   },
  { code: 'A003', name: 'ワッシャー M8',    spec: 'SUS304',        unit: '個', category: '部品', location: 'A-01-03', shelf: 'A1-5', stock: 890,  allocated: 100,  expectedIn: 200, outstandingPo: 0,    safetyStock: 200,  lastInDate: '2024/02/28', lastOutDate: '2024/03/30', unitPrice: 3   },
  { code: 'B001', name: '配線ケーブル 2m',  spec: 'UL1007 AWG22',  unit: '本', category: '電材', location: 'B-02-01', shelf: 'B2-1', stock: 120,  allocated: 30,   expectedIn: 100, outstandingPo: 50,   safetyStock: 50,   lastInDate: '2024/03/10', lastOutDate: '2024/04/02', unitPrice: 150 },
  { code: 'B002', name: 'コネクタ 4P',      spec: 'JST XH',        unit: '個', category: '電材', location: 'B-02-02', shelf: 'B2-2', stock: 450,  allocated: 0,    expectedIn: 0,   outstandingPo: 200,  safetyStock: 100,  lastInDate: '2024/01/15', lastOutDate: '2024/03/25', unitPrice: 45  },
  { code: 'C001', name: 'ブラケット L型',   spec: 'SPCC t2.0',     unit: '個', category: '板金', location: 'C-03-01', shelf: 'C3-1', stock: 75,   allocated: 20,   expectedIn: 50,  outstandingPo: 0,    safetyStock: 30,   lastInDate: '2024/02/20', lastOutDate: '2024/04/03', unitPrice: 280 },
  { code: 'D001', name: 'ラベル 大',        spec: '100×50mm',      unit: '枚', category: '資材', location: 'D-04-01', shelf: 'D4-1', stock: 5000, allocated: 1000, expectedIn: 0,   outstandingPo: 3000, safetyStock: 1000, lastInDate: '2024/03/01', lastOutDate: '2024/04/08', unitPrice: 2   },
];

const query   = ref('');
const items   = ref([]);
const loading = ref(false);
let nextNo = 1;

// Computed helpers
const availableStock = (item) => item.stock - item.allocated;
const stockValue     = (item) => (item.stock * item.unitPrice).toLocaleString();

const statusLabel = (item) => {
  if (item.stock < item.safetyStock)          return '不足';
  if (item.stock > item.safetyStock * 3)      return '過剰';
  return '通常';
};
const statusClass = (item) => {
  if (item.stock < item.safetyStock)          return 'status-danger';
  if (item.stock > item.safetyStock * 3)      return 'status-warning';
  return 'status-success';
};

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
  const val   = stockValue(item);
  const alert = await alertController.create({
    header: `詳細: ${item.code}`,
    message: [
      `品番: ${item.code}`,
      `品名: ${item.name}`,
      `規格: ${item.spec}`,
      `単位: ${item.unit}`,
      `カテゴリ: ${item.category}`,
      `ロケーション: ${item.location}`,
      `棚番: ${item.shelf}`,
      `在庫数: ${item.stock.toLocaleString()}`,
      `引当数: ${item.allocated.toLocaleString()}`,
      `有効在庫: ${avail.toLocaleString()}`,
      `入荷予定: ${item.expectedIn.toLocaleString()}`,
      `発注残: ${item.outstandingPo.toLocaleString()}`,
      `安全在庫: ${item.safetyStock.toLocaleString()}`,
      `最終入荷日: ${item.lastInDate}`,
      `最終出庫日: ${item.lastOutDate}`,
      `単価: ${item.unitPrice.toLocaleString()}`,
      `在庫金額: ${val}`,
      `ステータス: ${statusLabel(item)}`,
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

/* リストエリア */
.list-area {
  padding: 0;
}

.spinner-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
}

/* 横スクロールラッパー */
.table-scroll-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
}

/* テーブル本体 */
.inv-table {
  min-width: 1600px;
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  color: var(--ion-text-color, #000);
}

.inv-table thead tr {
  background: var(--ion-color-light, #f4f5f8);
  border-bottom: 2px solid var(--ion-color-medium-tint, #b2b3b7);
}

.inv-table thead th {
  padding: 8px 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ion-color-dark, #222428);
  white-space: nowrap;
  text-align: center;
  position: sticky;
  top: 0;
  background: var(--ion-color-light, #f4f5f8);
  z-index: 1;
}

.inv-table tbody tr {
  border-bottom: 1px solid var(--ion-color-light-shade, #d7d8da);
}

.inv-table tbody tr:nth-child(even) {
  background: var(--ion-color-light-tint, #f9fafb);
}

.inv-table tbody td {
  padding: 7px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 列幅 */
.col-no       { width: 40px;  min-width: 40px;  }
.col-code     { width: 80px;  min-width: 80px;  }
.col-name     { width: 120px; min-width: 120px; }
.col-spec     { width: 80px;  min-width: 80px;  }
.col-unit     { width: 40px;  min-width: 40px;  }
.col-category { width: 80px;  min-width: 80px;  }
.col-location { width: 90px;  min-width: 90px;  }
.col-shelf    { width: 60px;  min-width: 60px;  }
.col-num      { width: 60px;  min-width: 60px;  }
.col-date     { width: 90px;  min-width: 90px;  }
.col-price    { width: 70px;  min-width: 70px;  }
.col-value    { width: 80px;  min-width: 80px;  }
.col-status   { width: 70px;  min-width: 70px;  }
.col-detail   { width: 50px;  min-width: 50px;  }

/* セル配置 */
.td-center { text-align: center; }
.td-left   { text-align: left;   }
.td-right  { text-align: right;  }

/* ステータスバッジ */
.status-success {
  color: var(--ion-color-success, #2dd36f);
  font-weight: 600;
}
.status-warning {
  color: var(--ion-color-warning, #ffc409);
  font-weight: 600;
}
.status-danger {
  color: var(--ion-color-danger, #eb445a);
  font-weight: 600;
}

/* 詳細リンク */
.detail-link {
  color: var(--ion-color-primary, #3880ff);
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
