<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/samples/catalog/tabs/tab1">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/samples/catalog/tabs/tab2">
          <ion-icon :icon="listOutline" />
          <ion-label>List</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/samples/catalog/tabs/tab3">
          <ion-icon :icon="settingsOutline" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton,
  IonIcon, IonLabel,
} from '@ionic/vue';
import { homeOutline, listOutline, settingsOutline } from 'ionicons/icons';
</script>
