<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog/breadcrumbs" />
        </ion-buttons>
        <ion-title>Electronics</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-breadcrumbs>
        <ion-breadcrumb router-link="/samples/catalog/breadcrumbs">Categories</ion-breadcrumb>
        <ion-breadcrumb router-link="/samples/catalog/breadcrumbs/electronics">Electronics</ion-breadcrumb>
      </ion-breadcrumbs>

      <h2 class="ion-padding">Electronics</h2>
      <p class="ion-padding-horizontal">2階層目。パンくずに2つの項目が表示される。タップで親階層に戻れる。</p>
      <ion-list>
        <ion-item router-link="/samples/catalog/breadcrumbs/electronics/laptops" detail>
          <ion-label>Laptops</ion-label>
        </ion-item>
        <ion-item disabled>
          <ion-label>Phones (デモ用にリンクなし)</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonBreadcrumbs, IonBreadcrumb,
  IonList, IonItem, IonLabel,
} from '@ionic/vue';
</script>
