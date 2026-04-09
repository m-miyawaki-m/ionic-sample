<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Breadcrumbs / Collapsing Items Expand On Click</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">パンくずリストのアイテム数が多い場合に折り畳み、クリックで展開する例。</p>
      <ion-breadcrumbs :max-items="maxBreadcrumbs" @ionCollapsedClick="expandBreadcrumbs()">
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
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-breadcrumbs :max-items="maxBreadcrumbs" @ionCollapsedClick="expandBreadcrumbs()">
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
  import { ref } from 'vue';

  const maxBreadcrumbs = ref(4);

  const expandBreadcrumbs = () => {
    maxBreadcrumbs.value = undefined;
  };
<\/script>`;


  const maxBreadcrumbs = ref(4);

  const expandBreadcrumbs = () => {
    maxBreadcrumbs.value = undefined;
  };
</script>
