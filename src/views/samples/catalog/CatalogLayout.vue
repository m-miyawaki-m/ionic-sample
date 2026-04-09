<template>
  <ion-page>
    <ion-split-pane content-id="catalog-main" when="lg">
      <ion-menu content-id="catalog-main" type="overlay">
        <ion-header>
          <ion-toolbar>
            <ion-title>Components</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <CatalogSidebar />
        </ion-content>
      </ion-menu>

      <ion-router-outlet id="catalog-main" />
    </ion-split-pane>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import CatalogSidebar from './CatalogSidebar.vue';
</script>
