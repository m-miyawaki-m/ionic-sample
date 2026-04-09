<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Breadcrumbs / Collapsing Items Items Before After</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">折り畳み時に表示するアイテム数（前後）を itemsBeforeCollapse / itemsAfterCollapse で制御する例。</p>
      <div>Before Collapse = 2</div>
        <ion-breadcrumbs :max-items="4" :items-before-collapse="2">
          <ion-breadcrumb href="#home">Home</ion-breadcrumb>
          <ion-breadcrumb href="#electronics">Electronics</ion-breadcrumb>
          <ion-breadcrumb href="#photography">Photography</ion-breadcrumb>
          <ion-breadcrumb href="#cameras">Cameras</ion-breadcrumb>
          <ion-breadcrumb href="#film">Film</ion-breadcrumb>
          <ion-breadcrumb href="#35mm">35 mm</ion-breadcrumb>
        </ion-breadcrumbs>
      
        <div class="ion-margin-top">Before Collapse = 0</div>
        <ion-breadcrumbs :max-items="4" :items-before-collapse="0">
          <ion-breadcrumb href="#home">Home</ion-breadcrumb>
          <ion-breadcrumb href="#electronics">Electronics</ion-breadcrumb>
          <ion-breadcrumb href="#photography">Photography</ion-breadcrumb>
          <ion-breadcrumb href="#cameras">Cameras</ion-breadcrumb>
          <ion-breadcrumb href="#film">Film</ion-breadcrumb>
          <ion-breadcrumb href="#35mm">35 mm</ion-breadcrumb>
        </ion-breadcrumbs>
      
        <div class="ion-margin-top">After Collapse = 2</div>
        <ion-breadcrumbs :max-items="4" :items-after-collapse="2">
          <ion-breadcrumb href="#home">Home</ion-breadcrumb>
          <ion-breadcrumb href="#electronics">Electronics</ion-breadcrumb>
          <ion-breadcrumb href="#photography">Photography</ion-breadcrumb>
          <ion-breadcrumb href="#cameras">Cameras</ion-breadcrumb>
          <ion-breadcrumb href="#film">Film</ion-breadcrumb>
          <ion-breadcrumb href="#35mm">35 mm</ion-breadcrumb>
        </ion-breadcrumbs>
      
        <div class="ion-margin-top">Before Collapse = 2, After Collapse = 2</div>
        <ion-breadcrumbs :max-items="4" :items-before-collapse="2" :items-after-collapse="2">
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
  <div>Before Collapse = 2</div>
  <ion-breadcrumbs :max-items="4" :items-before-collapse="2">
    <ion-breadcrumb href="#home">Home</ion-breadcrumb>
    <ion-breadcrumb href="#electronics">Electronics</ion-breadcrumb>
    <ion-breadcrumb href="#photography">Photography</ion-breadcrumb>
    <ion-breadcrumb href="#cameras">Cameras</ion-breadcrumb>
    <ion-breadcrumb href="#film">Film</ion-breadcrumb>
    <ion-breadcrumb href="#35mm">35 mm</ion-breadcrumb>
  </ion-breadcrumbs>

  <div class="ion-margin-top">Before Collapse = 0</div>
  <ion-breadcrumbs :max-items="4" :items-before-collapse="0">
    <ion-breadcrumb href="#home">Home</ion-breadcrumb>
    <ion-breadcrumb href="#electronics">Electronics</ion-breadcrumb>
    <ion-breadcrumb href="#photography">Photography</ion-breadcrumb>
    <ion-breadcrumb href="#cameras">Cameras</ion-breadcrumb>
    <ion-breadcrumb href="#film">Film</ion-breadcrumb>
    <ion-breadcrumb href="#35mm">35 mm</ion-breadcrumb>
  </ion-breadcrumbs>

  <div class="ion-margin-top">After Collapse = 2</div>
  <ion-breadcrumbs :max-items="4" :items-after-collapse="2">
    <ion-breadcrumb href="#home">Home</ion-breadcrumb>
    <ion-breadcrumb href="#electronics">Electronics</ion-breadcrumb>
    <ion-breadcrumb href="#photography">Photography</ion-breadcrumb>
    <ion-breadcrumb href="#cameras">Cameras</ion-breadcrumb>
    <ion-breadcrumb href="#film">Film</ion-breadcrumb>
    <ion-breadcrumb href="#35mm">35 mm</ion-breadcrumb>
  </ion-breadcrumbs>

  <div class="ion-margin-top">Before Collapse = 2, After Collapse = 2</div>
  <ion-breadcrumbs :max-items="4" :items-before-collapse="2" :items-after-collapse="2">
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
