<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Tabs - Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>設定</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>通知</ion-label>
          <ion-toggle v-model="notifications" slot="end" />
        </ion-item>
        <ion-item>
          <ion-label>ダークモード</ion-label>
          <ion-toggle v-model="darkMode" slot="end" />
        </ion-item>
        <ion-item>
          <ion-label>サウンド</ion-label>
          <ion-toggle v-model="sound" slot="end" />
        </ion-item>
        <ion-item>
          <ion-label>バイブレーション</ion-label>
          <ion-toggle v-model="vibration" slot="end" />
        </ion-item>
      </ion-list>
      <p class="ion-padding">設定タブ。ion-toggle でON/OFF を切り替えられる。タブを移動しても状態が保持される。</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonListHeader, IonItem, IonLabel, IonToggle,
} from '@ionic/vue';

const notifications = ref(true);
const darkMode = ref(false);
const sound = ref(true);
const vibration = ref(false);
</script>
