<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Picker</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <h2>Basic (単一列)</h2>
      <p>ion-picker 内に ion-picker-column を1列配置。ion-picker-column-option が各選択肢。value で初期値を指定する。</p>
      <ion-picker>
        <ion-picker-column value="javascript">
          <ion-picker-column-option value="" :disabled="true">--</ion-picker-column-option>
          <ion-picker-column-option value="javascript">Javascript</ion-picker-column-option>
          <ion-picker-column-option value="typescript">Typescript</ion-picker-column-option>
          <ion-picker-column-option value="rust">Rust</ion-picker-column-option>
          <ion-picker-column-option value="c#">C#</ion-picker-column-option>
        </ion-picker-column>
      </ion-picker>

      <h2>Prefix / Suffix</h2>
      <p>prefix スロットと suffix スロットで列の前後に単位ラベルを付けられる。金額・単位入力に便利。</p>
      <ion-picker>
        <ion-picker-column :value="1">
          <div slot="prefix">$</div>
          <ion-picker-column-option value="" :disabled="true">--</ion-picker-column-option>
          <ion-picker-column-option :value="1">1</ion-picker-column-option>
          <ion-picker-column-option :value="2">2</ion-picker-column-option>
          <ion-picker-column-option :value="3">3</ion-picker-column-option>
          <ion-picker-column-option :value="4">4</ion-picker-column-option>
          <ion-picker-column-option :value="5">5</ion-picker-column-option>
          <div slot="suffix">USD</div>
        </ion-picker-column>
      </ion-picker>

      <h2>複数列</h2>
      <p>ion-picker-column を複数並べることで、時刻・日付など複数の値を同時に選択できる。</p>
      <ion-picker>
        <ion-picker-column :value="hourValue" @ionChange="(e: CustomEvent) => hourValue = e.detail.value">
          <ion-picker-column-option value="" :disabled="true">--</ion-picker-column-option>
          <ion-picker-column-option v-for="h in hours" :key="h" :value="h">{{ h }}</ion-picker-column-option>
        </ion-picker-column>
        <ion-picker-column :value="minuteValue" @ionChange="(e: CustomEvent) => minuteValue = e.detail.value">
          <ion-picker-column-option value="" :disabled="true">--</ion-picker-column-option>
          <ion-picker-column-option v-for="m in minutes" :key="m" :value="m">{{ m }}</ion-picker-column-option>
        </ion-picker-column>
      </ion-picker>
      <p style="margin-top: 8px;">選択中: {{ hourValue }}:{{ minuteValue }}</p>

      <h2>Modal 内 Picker</h2>
      <p>ion-modal と組み合わせてシート UI として表示するのが実際のアプリでよく使うパターン。Done / Cancel ボタンで確定・キャンセルする。</p>
      <ion-button id="open-picker-modal">Open Picker Modal</ion-button>
      <ion-modal
        ref="pickerModal"
        trigger="open-picker-modal"
        @didDismiss="onModalDismiss"
        style="--height: auto; align-items: flex-end;"
      >
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancelModal">Cancel</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button @click="confirmModal">Done</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-picker>
          <ion-picker-column :value="modalValue" @ionChange="(e: CustomEvent) => modalValue = e.detail.value">
            <ion-picker-column-option value="" :disabled="true">--</ion-picker-column-option>
            <ion-picker-column-option value="javascript">Javascript</ion-picker-column-option>
            <ion-picker-column-option value="typescript">Typescript</ion-picker-column-option>
            <ion-picker-column-option value="rust">Rust</ion-picker-column-option>
            <ion-picker-column-option value="c#">C#</ion-picker-column-option>
          </ion-picker-column>
        </ion-picker>
      </ion-modal>
      <p v-if="confirmedValue" style="margin-top: 8px;">確定値: {{ confirmedValue }}</p>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton,
  IonPicker, IonPickerColumn, IonPickerColumnOption,
  IonModal,
} from '@ionic/vue';
import { ref } from 'vue';

// 複数列 — 時刻
const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const minutes = ['00', '15', '30', '45'];
const hourValue = ref('09');
const minuteValue = ref('00');

// モーダル
const pickerModal = ref();
const modalValue = ref('javascript');
const confirmedValue = ref('');

const cancelModal = () => {
  pickerModal.value.$el.dismiss(null, 'cancel');
};
const confirmModal = () => {
  pickerModal.value.$el.dismiss(modalValue.value, 'confirm');
};
const onModalDismiss = (e: CustomEvent) => {
  if (e.detail.role === 'confirm') {
    confirmedValue.value = e.detail.data;
  }
};
</script>
