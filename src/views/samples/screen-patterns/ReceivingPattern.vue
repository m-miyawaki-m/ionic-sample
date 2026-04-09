<template>
  <ion-page>
    <!-- ── Header ─────────────────────────────────────────── -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/screen-patterns" />
        </ion-buttons>
        <ion-title>入荷検品</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="toggle">
            <ion-icon slot="icon-only" :icon="isDark ? sunnyOutline : moonOutline" />
          </ion-button>
          <ion-button @click="bulkRegister">一括登録</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- ── 入力エリア ──────────────────────────────────── -->
      <div class="search-area">
        <ion-item lines="full" class="search-item">
          <ion-input
            label="伝票番号"
            label-placement="stacked"
            placeholder="伝票番号を入力"
            v-model="searchQuery"
            @keyup.enter="search"
          />
        </ion-item>
        <div class="search-btn-wrap">
          <ion-button @click="search" size="default">
            <ion-icon :icon="searchOutline" slot="start" />
            検索
          </ion-button>
        </div>
      </div>

      <!-- ── リストエリア ────────────────────────────────── -->
      <div class="list-area">
        <!-- 検索中スピナー -->
        <div v-if="loading" class="loading-wrap">
          <ion-spinner name="crescent" />
          <span class="loading-text">検索中...</span>
        </div>

        <!-- テーブル -->
        <div v-else-if="items.length > 0" class="table-wrap">
          <!-- ヘッダー行 -->
          <div class="table-row table-header">
            <div class="col-no">No.</div>
            <div class="col-del">削除</div>
            <div class="col-code">品番</div>
            <div class="col-name">品名</div>
            <div class="col-planned">予定数</div>
            <div class="col-actual">実数</div>
            <div class="col-registered">登録日時</div>
            <div class="col-detail">詳細</div>
            <div class="col-check">☑</div>
          </div>

          <!-- データ行 -->
          <div
            v-for="item in items"
            :key="item.no"
            class="table-row table-data"
            :class="{ 'row-checked': item.checked }"
          >
            <div class="col-no">{{ item.no }}</div>
            <div class="col-del">
              <ion-button
                fill="clear"
                size="small"
                color="danger"
                @click="deleteRow(item)"
              >
                <ion-icon :icon="trashOutline" />
              </ion-button>
            </div>
            <div class="col-code">{{ item.code }}</div>
            <div class="col-name">{{ item.name }}</div>
            <div class="col-planned">{{ item.plannedQty }}</div>
            <div class="col-actual">
              <ion-input
                type="number"
                v-model="item.actualQty"
                class="actual-input"
              />
            </div>
            <div class="col-registered">{{ item.registeredAt || '—' }}</div>
            <div class="col-detail">
              <ion-text color="primary">
                <span class="detail-link" @click="showDetail(item)">詳細</span>
              </ion-text>
            </div>
            <div class="col-check">
              <ion-checkbox v-model="item.checked" />
            </div>
          </div>
        </div>

        <!-- 空状態 -->
        <div v-else class="empty-wrap">
          <p class="empty-text">伝票番号を入力して検索してください</p>
        </div>
      </div>
    </ion-content>

    <!-- ── Footer ─────────────────────────────────────────── -->
    <ion-footer>
      <ion-toolbar>
        <div class="footer-btns">
          <ion-button @click="bulkRegister">登録</ion-button>
          <ion-button fill="outline" @click="printAction">印刷</ion-button>
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
  IonCheckbox,
  IonSpinner,
  IonText,
  IonLabel,
  alertController,
  toastController,
} from '@ionic/vue';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { useDarkMode } from '@/composables/useDarkMode';
const { isDark, toggle } = useDarkMode();
import { searchOutline, trashOutline } from 'ionicons/icons';

// ── 型定義 ──────────────────────────────────────────────
/**
 * @typedef {{
 *   no: number,
 *   code: string,
 *   name: string,
 *   plannedQty: number,
 *   actualQty: number,
 *   registeredAt: string,
 *   checked: boolean
 * }} RowItem
 */

// ── State ───────────────────────────────────────────────
const items = ref([]);
const loading = ref(false);
const searchQuery = ref('');
let nextNo = 1;

// ── ダミーデータ ─────────────────────────────────────────
const dummyData = [
  { code: 'A001', name: 'ボルト M8×30',   plannedQty: 100 },
  { code: 'A002', name: 'ナット M8',       plannedQty: 200 },
  { code: 'A003', name: 'ワッシャー M8',   plannedQty: 150 },
  { code: 'B001', name: '配線ケーブル 2m', plannedQty:  50 },
  { code: 'B002', name: 'コネクタ 4P',     plannedQty:  80 },
];

// ── 現在日時を YYYY/MM/DD HH:mm 形式で返す ───────────────
function nowString() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ── search ───────────────────────────────────────────────
async function search() {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));
  const newRows = dummyData.map((d) => ({
    no:           nextNo++,
    code:         d.code,
    name:         d.name,
    plannedQty:   d.plannedQty,
    actualQty:    0,
    registeredAt: '',
    checked:      false,
  }));
  items.value.push(...newRows);
  loading.value = false;
}

// ── deleteRow ────────────────────────────────────────────
async function deleteRow(item) {
  const alert = await alertController.create({
    header:  '削除確認',
    message: `No.${item.no} を削除しますか？`,
    buttons: [
      { text: 'キャンセル', role: 'cancel' },
      {
        text: 'OK',
        role: 'destructive',
        handler: () => {
          const idx = items.value.findIndex((r) => r.no === item.no);
          if (idx !== -1) items.value.splice(idx, 1);
        },
      },
    ],
  });
  await alert.present();
}

// ── bulkRegister ─────────────────────────────────────────
async function bulkRegister() {
  const checked = items.value.filter((r) => r.checked);
  if (checked.length === 0) {
    const toast = await toastController.create({
      message:  'チェックされた行がありません',
      duration: 2000,
      color:    'warning',
    });
    await toast.present();
    return;
  }
  const now = nowString();
  checked.forEach((r) => { r.registeredAt = now; });
  const toast = await toastController.create({
    message:  `${checked.length}件を登録しました`,
    duration: 2000,
    color:    'success',
  });
  await toast.present();
}

// ── showDetail ───────────────────────────────────────────
async function showDetail(item) {
  const alert = await alertController.create({
    header:  `詳細: ${item.code}`,
    message: [
      `品名: ${item.name}`,
      `予定数: ${item.plannedQty}`,
      `実数: ${item.actualQty}`,
      `登録日時: ${item.registeredAt || '未登録'}`,
    ].join('\n'),
    buttons: ['閉じる'],
  });
  await alert.present();
}

// ── printAction ──────────────────────────────────────────
async function printAction() {
  const toast = await toastController.create({
    message:  '印刷しました',
    duration: 2000,
  });
  await toast.present();
}
</script>

<style scoped>
/* ── 入力エリア ───────────────────────────────────────── */
.search-area {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--ion-color-light-shade);
}

.search-item {
  flex: 1;
  --padding-start: 0;
  --inner-padding-end: 0;
}

.search-btn-wrap {
  flex-shrink: 0;
  padding-bottom: 2px;
}

/* ── ローディング ─────────────────────────────────────── */
.loading-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  gap: 12px;
}

.loading-text {
  font-size: 14px;
  color: var(--ion-color-medium);
}

/* ── 空状態 ───────────────────────────────────────────── */
.empty-wrap {
  padding: 40px 16px;
  text-align: center;
}

.empty-text {
  font-size: 14px;
  color: var(--ion-color-medium);
  margin: 0;
}

/* ── テーブル共通 ─────────────────────────────────────── */
.table-wrap {
  overflow-x: auto;
  font-size: 13px;
}

.table-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--ion-color-light-shade);
  min-height: 40px;
}

/* ヘッダー行 */
.table-header {
  background-color: var(--ion-color-light);
  font-weight: bold;
  font-size: 12px;
  color: var(--ion-color-dark);
  position: sticky;
  top: 0;
  z-index: 1;
  min-height: 36px;
}

/* データ行ホバー */
.table-data:hover {
  background-color: var(--ion-color-light-tint);
}

/* チェック済み行 */
.row-checked {
  background-color: rgba(var(--ion-color-primary-rgb), 0.06);
}

/* ── 列幅定義 ─────────────────────────────────────────── */
.col-no         { width: 36px;  min-width: 36px;  text-align: center; padding: 0 4px; }
.col-del        { width: 44px;  min-width: 44px;  text-align: center; }
.col-code       { width: 72px;  min-width: 72px;  padding: 0 4px; }
.col-name       { flex: 1;      min-width: 100px; padding: 0 4px; }
.col-planned    { width: 52px;  min-width: 52px;  text-align: right; padding: 0 6px; }
.col-actual     { width: 68px;  min-width: 68px;  padding: 0 4px; }
.col-registered { width: 110px; min-width: 110px; padding: 0 4px; font-size: 11px; color: var(--ion-color-medium); }
.col-detail     { width: 40px;  min-width: 40px;  text-align: center; }
.col-check      { width: 40px;  min-width: 40px;  text-align: center; display: flex; justify-content: center; align-items: center; }

/* ── 実数入力 ─────────────────────────────────────────── */
.actual-input {
  --padding-start: 4px;
  --padding-end: 4px;
  --padding-top: 2px;
  --padding-bottom: 2px;
  border: 1px solid var(--ion-color-medium-tint);
  border-radius: 4px;
  font-size: 13px;
  height: 30px;
  text-align: right;
}

/* ── 詳細リンク ───────────────────────────────────────── */
.detail-link {
  text-decoration: underline;
  cursor: pointer;
  font-size: 13px;
}

/* ── フッターボタン ───────────────────────────────────── */
.footer-btns {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 4px 0;
}
</style>
