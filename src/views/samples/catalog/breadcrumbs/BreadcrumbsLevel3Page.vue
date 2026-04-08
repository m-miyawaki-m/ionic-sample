<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog/breadcrumbs/electronics" />
        </ion-buttons>
        <ion-title>Laptops</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-breadcrumbs>
        <ion-breadcrumb router-link="/samples/catalog/breadcrumbs">Categories</ion-breadcrumb>
        <ion-breadcrumb router-link="/samples/catalog/breadcrumbs/electronics">Electronics</ion-breadcrumb>
        <ion-breadcrumb router-link="/samples/catalog/breadcrumbs/electronics/laptops">Laptops</ion-breadcrumb>
      </ion-breadcrumbs>

      <h2 class="ion-padding">Laptops (リーフ)</h2>
      <p class="ion-padding-horizontal">最下層。パンくず3つで階層が一目でわかる。各パンくずをタップで該当階層へジャンプできる。</p>
      <ion-list>
        <ion-item><ion-label>MacBook Pro</ion-label></ion-item>
        <ion-item><ion-label>ThinkPad X1</ion-label></ion-item>
        <ion-item><ion-label>Dell XPS 13</ion-label></ion-item>
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
