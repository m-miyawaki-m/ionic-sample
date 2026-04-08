<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Breadcrumbs (Level 1)</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-breadcrumbs>
        <ion-breadcrumb router-link="/samples/catalog/breadcrumbs">Categories</ion-breadcrumb>
      </ion-breadcrumbs>

      <h2 class="ion-padding">カテゴリ一覧</h2>
      <p class="ion-padding-horizontal">パンくずリストの最上位。サブカテゴリをタップすると次の階層に進む。</p>
      <ion-list>
        <ion-item router-link="/samples/catalog/breadcrumbs/electronics" detail>
          <ion-label>Electronics</ion-label>
        </ion-item>
        <ion-item disabled>
          <ion-label>Books (デモ用にリンクなし)</ion-label>
        </ion-item>
        <ion-item disabled>
          <ion-label>Clothing (デモ用にリンクなし)</ion-label>
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
