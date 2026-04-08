<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Tabs - List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>アイテム一覧</ion-label>
        </ion-list-header>
        <ion-item v-for="item in items" :key="item.id">
          <ion-icon :icon="documentOutline" slot="start" />
          <ion-label>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonListHeader, IonItem, IonLabel, IonIcon,
} from '@ionic/vue';
import { documentOutline } from 'ionicons/icons';

const items = [
  { id: 1, title: 'アイテム A', description: 'これはリストタブのデモ項目です' },
  { id: 2, title: 'アイテム B', description: 'タブ間でデータは独立して管理される' },
  { id: 3, title: 'アイテム C', description: 'ion-list と ion-item でシンプルなリストを表示' },
  { id: 4, title: 'アイテム D', description: '各タブは独自のスクロール位置を記憶する' },
  { id: 5, title: 'アイテム E', description: 'タブを切り替えても状態が保持される' },
];
</script>
