<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Toggle</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h2 class="ion-padding">Basic</h2>
      <p class="ion-padding-horizontal">ion-toggle は ON/OFF のスイッチ。v-model で boolean を持つ。設定画面でよく使う。</p>
      <ion-list>
        <ion-item>
          <ion-toggle v-model="enabled">{{ enabled ? 'ON' : 'OFF' }}</ion-toggle>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Colors</h2>
      <p class="ion-padding-horizontal">color 属性で ON 時の色を変える。</p>
      <ion-list>
        <ion-item>
          <ion-toggle color="primary" :checked="true">Primary</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle color="success" :checked="true">Success</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle color="warning" :checked="true">Warning</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle color="danger" :checked="true">Danger</ion-toggle>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Label Placement</h2>
      <p class="ion-padding-horizontal">label-placement でスイッチとラベルの位置関係を変える。</p>
      <ion-list>
        <ion-item>
          <ion-toggle label-placement="end">End (default)</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle label-placement="start">Start</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle label-placement="stacked">Stacked</ion-toggle>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Disabled</h2>
      <p class="ion-padding-horizontal">disabled で操作不可にできる。</p>
      <ion-list>
        <ion-item>
          <ion-toggle :disabled="true">Disabled (off)</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle :disabled="true" :checked="true">Disabled (on)</ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonList, IonItem, IonToggle,
} from '@ionic/vue';

const enabled = ref(false);
</script>
