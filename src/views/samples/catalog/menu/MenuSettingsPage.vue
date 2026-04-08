<template>
  <CatalogMenu content-id="menu-settings-content" />
  <ion-page id="menu-settings-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button menu="catalog-side-menu" />
          <ion-back-button default-href="/samples/catalog/menu" />
        </ion-buttons>
        <ion-title>Menu - Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>設定</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>プッシュ通知</ion-label>
          <ion-toggle v-model="pushNotifications" slot="end" />
        </ion-item>
        <ion-item>
          <ion-label>位置情報</ion-label>
          <ion-toggle v-model="location" slot="end" />
        </ion-item>
      </ion-list>
      <p class="ion-padding">サイドメニューから遷移した Settings ページ。ハンバーガーボタンでメニューを再表示できる。</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonMenuButton, IonList, IonListHeader, IonItem, IonLabel, IonToggle,
} from '@ionic/vue';
import CatalogMenu from './CatalogMenu.vue';

const pushNotifications = ref(true);
const location = ref(false);
</script>
