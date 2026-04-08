<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Datetime</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h2 class="ion-padding">Inline Datetime (date-time)</h2>
      <p class="ion-padding-horizontal">ion-datetime をページに直接埋め込んだフルサイズのカレンダー+時刻ピッカー。presentation="date-time" で日付と時刻を一度に選択できる。</p>
      <div class="ion-padding-horizontal">
        <ion-datetime presentation="date-time" v-model="datetimeValue" />
      </div>
      <p class="ion-padding-horizontal">選択値: {{ datetimeValue }}</p>

      <h2 class="ion-padding">Date Only</h2>
      <p class="ion-padding-horizontal">presentation="date" で日付のみ選択するカレンダーピッカー。時刻列は表示されない。</p>
      <div class="ion-padding-horizontal">
        <ion-datetime presentation="date" v-model="dateOnlyValue" />
      </div>
      <p class="ion-padding-horizontal">選択値: {{ dateOnlyValue }}</p>

      <h2 class="ion-padding">Time Only</h2>
      <p class="ion-padding-horizontal">presentation="time" で時刻のみ選択するスクロールピッカー。カレンダーは表示されない。</p>
      <div class="ion-padding-horizontal">
        <ion-datetime presentation="time" v-model="timeOnlyValue" />
      </div>
      <p class="ion-padding-horizontal">選択値: {{ timeOnlyValue }}</p>

      <h2 class="ion-padding">Min / Max 制約</h2>
      <p class="ion-padding-horizontal">min・max プロパティで選択できる範囲を限定する。範囲外の日付はグレーアウトされタップ不可になる。</p>
      <div class="ion-padding-horizontal">
        <ion-datetime
          presentation="date"
          min="2025-01-01"
          max="2025-12-31"
          v-model="constrainedValue"
        />
      </div>
      <p class="ion-padding-horizontal">選択値: {{ constrainedValue }}</p>

      <h2 class="ion-padding">Datetime Button (コンパクト)</h2>
      <p class="ion-padding-horizontal">ion-datetime-button はボタンをタップするとモーダルでピッカーが開くコンパクトな形式。datetime プロパティに対応する ion-datetime の id を指定する。</p>
      <div class="ion-padding-horizontal ion-padding-bottom">
        <ion-datetime-button datetime="modal-datetime" />
        <ion-modal :keep-contents-mounted="true">
          <ion-datetime
            id="modal-datetime"
            presentation="date-time"
            v-model="buttonDatetimeValue"
          />
        </ion-modal>
      </div>
      <p class="ion-padding-horizontal">選択値: {{ buttonDatetimeValue }}</p>

      <div class="ion-padding" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonDatetime, IonDatetimeButton, IonModal,
} from '@ionic/vue';

const datetimeValue = ref('2025-06-15T10:30:00');
const dateOnlyValue = ref('2025-06-15');
const timeOnlyValue = ref('10:30:00');
const constrainedValue = ref('2025-06-15');
const buttonDatetimeValue = ref('2025-06-15T10:30:00');
</script>
