<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>カレンダー パターン集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <!-- 1. Presentation -->
      <div class="section">
        <h2>Presentation</h2>
        <p>表示モードの切替。date が最も一般的。time は時刻のみ。</p>
        <ion-datetime presentation="date" />
        <ion-datetime presentation="time" />
        <ion-datetime presentation="date-time" />
        <ion-datetime presentation="month-year" />
      </div>

      <!-- 2. Wheel 表示 -->
      <div class="section">
        <h2>Wheel 表示</h2>
        <p>ホイール UI。スマホネイティブ風の操作感。</p>
        <ion-datetime presentation="date" prefer-wheel="true" />
      </div>

      <!-- 3. Min/Max 制約 -->
      <div class="section">
        <h2>Min/Max 制約</h2>
        <p>選択可能な範囲を制限。過去日選択不可などに。</p>
        <ion-datetime presentation="date" min="2024-01-01" max="2025-12-31" />
      </div>

      <!-- 4. Locale -->
      <div class="section">
        <h2>Locale</h2>
        <p>日本語ロケール。曜日・月名が日本語になる。</p>
        <ion-datetime presentation="date" locale="ja-JP" />
      </div>

      <!-- 5. Highlighted Dates -->
      <div class="section">
        <h2>Highlighted Dates</h2>
        <p>特定日をハイライト表示。休日や締切日の可視化に。</p>
        <ion-datetime presentation="date" :highlighted-dates="highlightedDates" />
      </div>

      <!-- 6. Multiple Selection -->
      <div class="section">
        <h2>Multiple Selection</h2>
        <p>複数日を選択可能。休日指定や予約日選択に。</p>
        <ion-datetime presentation="date" :multiple="true" />
      </div>

      <!-- 7. Datetime-button -->
      <div class="section">
        <h2>Datetime-button</h2>
        <p>ボタンクリックで popover にカレンダー表示。フォーム内で省スペース。</p>
        <ion-datetime-button datetime="datetime-popover" />
        <ion-modal :keep-contents-mounted="true">
          <ion-datetime id="datetime-popover" presentation="date" />
        </ion-modal>
      </div>

      <!-- 8. カスタムボタン -->
      <div class="section">
        <h2>カスタムボタン</h2>
        <p>確定/クリア/今日ボタンで操作性を向上。</p>
        <ion-datetime
          presentation="date"
          show-default-buttons="true"
          show-clear-button="true"
        />
      </div>

      <!-- 9. 入荷日選択 -->
      <div class="section">
        <h2>入荷日選択</h2>
        <p>過去日選択不可+日本語ロケール。label は stacked で。</p>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">入荷日</ion-label>
            <ion-datetime
              v-model="arrivalDate"
              presentation="date"
              :min="today"
              locale="ja-JP"
            />
          </ion-item>
        </ion-list>
        <p v-if="arrivalDate" class="result-text">入荷日: {{ arrivalDate }}</p>
      </div>

      <!-- 10. 期間指定 -->
      <div class="section">
        <h2>期間指定</h2>
        <p>開始日〜終了日のペア。終了日は開始日以降に制約。</p>
        <ion-list>
          <ion-item>
            <ion-label>開始日</ion-label>
            <ion-datetime-button datetime="range-start" />
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime
                id="range-start"
                ref="startDatetimeRef"
                presentation="date"
                @ion-change="onStartDateChange"
              />
            </ion-modal>
          </ion-item>
          <ion-item>
            <ion-label>終了日</ion-label>
            <ion-datetime-button datetime="range-end" />
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime
                id="range-end"
                ref="endDatetimeRef"
                presentation="date"
                :min="endDateMin"
              />
            </ion-modal>
          </ion-item>
        </ion-list>
        <p v-if="startDate || endDate" class="result-text">
          期間: {{ startDate || '未設定' }} 〜 {{ endDate || '未設定' }}
        </p>
      </div>

      <!-- 11. 納期カレンダー -->
      <div class="section">
        <h2>納期カレンダー</h2>
        <p>休日(赤)と納期日(青)をハイライトで色分け表示。</p>
        <ion-datetime
          presentation="date"
          locale="ja-JP"
          :highlighted-dates="deliveryHighlightedDates"
        />
      </div>

      <!-- 12. 時刻指定 -->
      <div class="section">
        <h2>時刻指定</h2>
        <p>配送時間帯の選択。24時間表記。</p>
        <ion-datetime presentation="time" hour-cycle="h23" />
      </div>

      <!-- 13. 月次選択 -->
      <div class="section">
        <h2>月次選択</h2>
        <p>月単位の集計期間を指定。年月ピッカー。</p>
        <ion-datetime presentation="month-year" />
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/vue';

// 今日の日付（ISO形式 YYYY-MM-DD）
const today = computed(() => new Date().toISOString().split('T')[0]);

// 5. Highlighted Dates
const highlightedDates = [
  { date: '2025-01-01', textColor: '#ffffff', backgroundColor: '#eb445a' },
  { date: '2025-01-13', textColor: '#ffffff', backgroundColor: '#eb445a' },
  { date: '2025-01-20', textColor: '#ffffff', backgroundColor: '#3880ff' },
  { date: '2025-01-27', textColor: '#ffffff', backgroundColor: '#3880ff' },
];

// 9. 入荷日選択
const arrivalDate = ref('');

// 10. 期間指定
const startDatetimeRef = ref(null);
const endDatetimeRef = ref(null);
const startDate = ref('');
const endDate = ref('');
const endDateMin = ref('');

function onStartDateChange(event) {
  const value = event.detail.value;
  if (value) {
    const dateStr = typeof value === 'string' ? value.split('T')[0] : value;
    startDate.value = dateStr;
    endDateMin.value = dateStr;
    // 終了日が開始日より前なら初期化
    if (endDate.value && endDate.value < dateStr) {
      endDate.value = '';
    }
  }
}

// 11. 納期カレンダー（休日: 赤、納期日: 青）
const deliveryHighlightedDates = [
  // 休日（土日サンプル）
  { date: '2025-01-04', textColor: '#ffffff', backgroundColor: '#eb445a' },
  { date: '2025-01-05', textColor: '#ffffff', backgroundColor: '#eb445a' },
  { date: '2025-01-11', textColor: '#ffffff', backgroundColor: '#eb445a' },
  { date: '2025-01-12', textColor: '#ffffff', backgroundColor: '#eb445a' },
  { date: '2025-01-13', textColor: '#ffffff', backgroundColor: '#eb445a' },
  // 納期日（サンプル）
  { date: '2025-01-10', textColor: '#ffffff', backgroundColor: '#3880ff' },
  { date: '2025-01-17', textColor: '#ffffff', backgroundColor: '#3880ff' },
  { date: '2025-01-24', textColor: '#ffffff', backgroundColor: '#3880ff' },
];
</script>

<style scoped>
.section {
  margin-top: 24px;
}

.section h2 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.section > p {
  font-size: 13px;
  color: var(--ion-color-medium);
  margin-top: 0;
  margin-bottom: 12px;
}

.result-text {
  font-size: 13px;
  color: var(--ion-color-primary);
  margin: 8px 0 0;
  padding-left: 4px;
}
</style>
