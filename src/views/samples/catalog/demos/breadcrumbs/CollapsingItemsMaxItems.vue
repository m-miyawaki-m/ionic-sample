<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Breadcrumbs / Collapsing Items Max Items</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">maxItems プロパティでパンくずリストに表示する最大アイテム数を制限する例。</p>
      <ion-breadcrumbs :max-items="4">
          <ion-breadcrumb href="#home">Home</ion-breadcrumb>
          <ion-breadcrumb href="#electronics">Electronics</ion-breadcrumb>
          <ion-breadcrumb href="#photography">Photography</ion-breadcrumb>
          <ion-breadcrumb href="#cameras">Cameras</ion-breadcrumb>
          <ion-breadcrumb href="#film">Film</ion-breadcrumb>
          <ion-breadcrumb href="#35mm">35 mm</ion-breadcrumb>
        </ion-breadcrumbs>
      <div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
        <details>
          <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
          <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
        </details>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { 
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-breadcrumbs :max-items="4">
    <ion-breadcrumb href="#home">Home</ion-breadcrumb>
    <ion-breadcrumb href="#electronics">Electronics</ion-breadcrumb>
    <ion-breadcrumb href="#photography">Photography</ion-breadcrumb>
    <ion-breadcrumb href="#cameras">Cameras</ion-breadcrumb>
    <ion-breadcrumb href="#film">Film</ion-breadcrumb>
    <ion-breadcrumb href="#35mm">35 mm</ion-breadcrumb>
  </ion-breadcrumbs>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonBreadcrumb, IonBreadcrumbs } from '@ionic/vue';
<\/script>`;

</script>
