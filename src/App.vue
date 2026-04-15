<template>
  <ion-app>
    <ion-menu side="start" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item button :router-link="link.path" v-for="link in menuLinks" :key="link.path" @click="closeMenu">
            <ion-icon :icon="link.icon" slot="start" />
            <ion-label>{{ link.label }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonLabel, IonIcon, menuController,
} from '@ionic/vue';
import {
  scanOutline, layersOutline, searchOutline, constructOutline,
  createOutline, documentTextOutline,
} from 'ionicons/icons';

const menuLinks = [
  { path: '/pattern/scan-input', label: 'スキャン入力型', icon: scanOutline },
  { path: '/pattern/scan-accumulate', label: 'スキャン蓄積型', icon: layersOutline },
  { path: '/pattern/search-view', label: '検索照会型', icon: searchOutline },
  { path: '/pattern/input-helpers', label: '入力補助パターン', icon: constructOutline },
  { path: '/pattern/inline-edit', label: 'インライン編集型', icon: createOutline },
  { path: '/pattern/detail-screen', label: '詳細表示・編集型', icon: documentTextOutline },
];

const closeMenu = () => menuController.close();
</script>
