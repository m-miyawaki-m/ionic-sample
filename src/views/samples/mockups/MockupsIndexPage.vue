<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples" />
        </ion-buttons>
        <ion-title>画面モック</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="m in mockups" :key="m.path" :router-link="m.path" detail>
          <ion-label>{{ m.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
} from '@ionic/vue';

const mockups = [
  { name: 'コンポーネント一覧',     path: '/samples/mockups/components' },
  { name: 'スキャン入力デモ',       path: '/samples/mockups/scan-demo' },
  { name: 'スキャンフィードバック', path: '/samples/mockups/feedback' },
  { name: 'ダイアログデモ',         path: '/samples/mockups/dialog-demo' },
];
</script>
