<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/screen-patterns" />
        </ion-buttons>
        <ion-title>出庫</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="toggle">
            <ion-icon slot="icon-only" :icon="isDark ? sunnyOutline : moonOutline" />
          </ion-button>
          <ion-button fill="solid" color="primary" size="small" @click="bulkRegister">
            一括登録
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- 入力エリア -->
      <div class="input-area">
        <ion-item lines="none" class="search-item">
          <ion-label class="search-label">出庫指示番号</ion-label>
          <ion-input
            v-model="searchNo"
            placeholder="番号を入力"
            class="search-input"
            @keyup.enter="search"
          />
          <ion-button slot="end" fill="solid" size="small" @click="search">
            <ion-icon :icon="searchOutline" slot="start" />
            検索
          </ion-button>
        </ion-item>
      </div>

      <!-- リストエリア -->
      <div class="list-area">
        <!-- スピナー -->
        <div v-if="loading" class="spinner-wrap">
          <ion-spinner name="crescent" />
          <ion-text color="medium"><p>検索中...</p></ion-text>
        </div>

        <!-- テーブル -->
        <div v-else class="table-wrap">
          <div class="table-header">
            <div class="col-no">No</div>
            <div class="col-del">×</div>
            <div class="col-code">品番</div>
            <div class="col-name">品名</div>
            <div class="col-qty">指示数</div>
            <div class="col-qty">出庫数</div>
            <div class="col-date">登録日時</div>
            <div class="col-detail">詳細</div>
            <div class="col-check">☑</div>
          </div>

          <div v-if="rows.length === 0" class="empty-message">
            <ion-text color="medium">出庫指示番号を入力して検索してください</ion-text>
          </div>

          <div
            v-for="row in rows"
            :key="row.no"
            class="table-row"
          >
            <div class="col-no">{{ row.no }}</div>
            <div class="col-del">
              <button class="del-btn" @click="deleteRow(row.no)">
                <ion-icon :icon="trashOutline" />
              </button>
            </div>
            <div class="col-code">{{ row.code }}</div>
            <div class="col-name">{{ row.name }}</div>
            <div class="col-qty">{{ row.orderQty }}</div>
            <div class="col-qty">
              <input
                v-model.number="row.shipQty"
                type="number"
                min="0"
                class="qty-input"
              />
            </div>
            <div class="col-date">{{ row.registeredAt || '—' }}</div>
            <div class="col-detail">
              <button class="detail-btn" @click="showDetail(row)">詳細</button>
            </div>
            <div class="col-check">
              <ion-checkbox v-model="row.checked" />
            </div>
          </div>
        </div>
      </div>
    </ion-content>

    <!-- ボタンエリア -->
    <ion-footer>
      <ion-toolbar>
        <div class="footer-buttons">
          <ion-button fill="solid" color="primary" @click="register">登録</ion-button>
          <ion-button fill="outline" color="medium" @click="printAction">印刷</ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, reactive } from 'vue';
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
  IonCheckbox,
  IonSpinner,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  alertController,
  toastController,
} from '@ionic/vue';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { useDarkMode } from '@/composables/useDarkMode';
const { isDark, toggle } = useDarkMode();
import { searchOutline, trashOutline } from 'ionicons/icons';

/** @typedef {{ no: number; code: string; name: string; orderQty: number; shipQty: number; registeredAt: string; checked: boolean; }} RowItem */

const dummyData = [
  { code: 'A001', name: 'ボルト M8×30', orderQty: 50 },
  { code: 'A003', name: 'ワッシャー M8', orderQty: 100 },
  { code: 'C001', name: 'ブラケット L型', orderQty: 30 },
  { code: 'C002', name: 'パネル 300×200', orderQty: 20 },
  { code: 'D001', name: 'ラベル 大', orderQty: 500 },
];

const searchNo = ref('');
const loading = ref(false);
/** @type {import('vue').Ref<RowItem[]>} */
const rows = ref([]);
let nextNo = 1;

const formatNow = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

/** 検索 */
const search = async () => {
  if (!searchNo.value.trim()) {
    const alert = await alertController.create({
      header: '入力エラー',
      message: '出庫指示番号を入力してください。',
      buttons: ['OK'],
    });
    await alert.present();
    return;
  }

  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));

  dummyData.forEach((item) => {
    rows.value.push({
      no: nextNo++,
      code: item.code,
      name: item.name,
      orderQty: item.orderQty,
      shipQty: 0,
      registeredAt: '',
      checked: false,
    });
  });

  loading.value = false;
};

/** 行削除 */
const deleteRow = async (no) => {
  const alert = await alertController.create({
    header: '削除確認',
    message: `No.${no} の行を削除しますか？`,
    buttons: [
      { text: 'キャンセル', role: 'cancel' },
      {
        text: '削除',
        role: 'destructive',
        handler: () => {
          const idx = rows.value.findIndex((r) => r.no === no);
          if (idx !== -1) rows.value.splice(idx, 1);
        },
      },
    ],
  });
  await alert.present();
};

/** 一括登録 */
const bulkRegister = async () => {
  const targets = rows.value.filter((r) => r.checked);
  if (targets.length === 0) {
    const alert = await alertController.create({
      header: '選択なし',
      message: 'チェックされている行がありません。',
      buttons: ['OK'],
    });
    await alert.present();
    return;
  }

  const now = formatNow();
  targets.forEach((r) => {
    r.registeredAt = now;
  });

  const toast = await toastController.create({
    message: `${targets.length}件を一括登録しました`,
    duration: 2000,
    color: 'success',
    position: 'bottom',
  });
  await toast.present();
};

/** 登録ボタン（全行対象） */
const register = async () => {
  if (rows.value.length === 0) {
    const alert = await alertController.create({
      header: '登録対象なし',
      message: '登録する行がありません。',
      buttons: ['OK'],
    });
    await alert.present();
    return;
  }

  const now = formatNow();
  rows.value.forEach((r) => {
    r.registeredAt = now;
  });

  const toast = await toastController.create({
    message: `${rows.value.length}件を登録しました`,
    duration: 2000,
    color: 'success',
    position: 'bottom',
  });
  await toast.present();
};

/** 詳細表示 */
const showDetail = async (row) => {
  const alert = await alertController.create({
    header: '詳細',
    message: `品番: ${row.code}\n品名: ${row.name}\n指示数: ${row.orderQty}\n出庫数: ${row.shipQty}\n登録日時: ${row.registeredAt || '未登録'}`,
    buttons: ['閉じる'],
  });
  await alert.present();
};

/** 印刷 */
const printAction = async () => {
  const toast = await toastController.create({
    message: '印刷しました',
    duration: 2000,
    color: 'medium',
    position: 'bottom',
  });
  await toast.present();
};
</script>

<style scoped>
/* 入力エリア */
.input-area {
  background: var(--ion-color-light, #f4f5f8);
  border-bottom: 1px solid var(--ion-color-light-shade, #d7d8da);
  padding: 4px 8px;
}

.search-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --background: transparent;
  align-items: center;
  gap: 8px;
}

.search-label {
  font-size: 13px;
  flex: 0 0 auto;
  white-space: nowrap;
}

.search-input {
  font-size: 13px;
  --padding-start: 6px;
  --padding-end: 6px;
  border: 1px solid var(--ion-color-medium-shade, #999);
  border-radius: 4px;
  min-width: 0;
}

/* リストエリア */
.list-area {
  flex: 1;
  overflow-x: auto;
  padding: 8px;
}

.spinner-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  gap: 8px;
}

.empty-message {
  text-align: center;
  padding: 32px 16px;
  font-size: 13px;
}

/* テーブル */
.table-wrap {
  min-width: 640px;
  font-size: 13px;
}

.table-header,
.table-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--ion-color-light-shade, #d7d8da);
}

.table-header {
  background: var(--ion-color-light, #f4f5f8);
  font-weight: 600;
  color: var(--ion-color-medium-shade, #666);
  font-size: 12px;
  padding: 6px 0;
  position: sticky;
  top: 0;
  z-index: 1;
}

.table-row {
  padding: 4px 0;
  background: var(--ion-background-color, #fff);
}

.table-row:hover {
  background: var(--ion-color-light-tint, #f9f9f9);
}

/* カラム幅 */
.col-no     { flex: 0 0 36px;  text-align: center; padding: 0 4px; }
.col-del    { flex: 0 0 32px;  text-align: center; padding: 0 2px; }
.col-code   { flex: 0 0 72px;  padding: 0 4px; }
.col-name   { flex: 1 1 auto;  padding: 0 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.col-qty    { flex: 0 0 64px;  text-align: center; padding: 0 4px; }
.col-date   { flex: 0 0 130px; text-align: center; padding: 0 4px; font-size: 12px; }
.col-detail { flex: 0 0 48px;  text-align: center; padding: 0 2px; }
.col-check  { flex: 0 0 36px;  text-align: center; padding: 0 4px; }

/* 削除ボタン */
.del-btn {
  background: none;
  border: none;
  padding: 2px 4px;
  cursor: pointer;
  color: var(--ion-color-danger, #eb445a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 4px;
}
.del-btn:hover {
  background: var(--ion-color-danger-tint, #fde8e8);
}

/* 出庫数入力 */
.qty-input {
  width: 52px;
  padding: 2px 4px;
  border: 1px solid var(--ion-color-medium-shade, #999);
  border-radius: 4px;
  font-size: 13px;
  text-align: right;
  background: var(--ion-background-color, #fff);
  color: var(--ion-text-color, #000);
}
.qty-input:focus {
  outline: none;
  border-color: var(--ion-color-primary, #3880ff);
}

/* 詳細ボタン */
.detail-btn {
  font-size: 11px;
  padding: 2px 6px;
  border: 1px solid var(--ion-color-primary, #3880ff);
  border-radius: 4px;
  background: none;
  color: var(--ion-color-primary, #3880ff);
  cursor: pointer;
  white-space: nowrap;
}
.detail-btn:hover {
  background: var(--ion-color-primary-tint, #ebf0ff);
}

/* フッターボタン */
.footer-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 4px 16px;
}
</style>
