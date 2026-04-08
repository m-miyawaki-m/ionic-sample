<template>
  <ion-menu menu-id="catalog-side-menu" :content-id="contentId">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>サイドメニュー</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-menu-toggle :auto-hide="false">
          <ion-item router-link="/samples/catalog/menu" router-direction="root" :detail="false">
            <ion-icon slot="start" :icon="homeOutline" />
            <ion-label>Home</ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle :auto-hide="false">
          <ion-item router-link="/samples/catalog/menu/about" router-direction="root" :detail="false">
            <ion-icon slot="start" :icon="informationCircleOutline" />
            <ion-label>About</ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle :auto-hide="false">
          <ion-item router-link="/samples/catalog/menu/settings" router-direction="root" :detail="false">
            <ion-icon slot="start" :icon="settingsOutline" />
            <ion-label>Settings</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import {
  IonMenu, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonMenuToggle, IonItem, IonIcon, IonLabel,
} from '@ionic/vue';
import { homeOutline, informationCircleOutline, settingsOutline } from 'ionicons/icons';

defineProps<{
  contentId: string;
}>();
</script>
