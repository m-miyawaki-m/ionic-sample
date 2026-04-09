<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったアイテムのスタイルカスタマイズ例。</p>
      <ion-item button detail lines="full">
          <ion-label>Custom Item</ion-label>
        </ion-item>
      
        <ion-item button detail lines="full">
          <ion-label>Custom Item</ion-label>
        </ion-item>
      
        <ion-item button detail lines="full">
          <ion-label>Custom Item</ion-label>
        </ion-item>
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
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item button detail lines="full">
    <ion-label>Custom Item</ion-label>
  </ion-item>

  <ion-item button detail lines="full">
    <ion-label>Custom Item</ion-label>
  </ion-item>

  <ion-item button detail lines="full">
    <ion-label>Custom Item</ion-label>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonLabel } from '@ionic/vue';
<\/script>

<style>
  ion-item {
    --background: #19422d;
    --color: #fff;

    --border-color: #fff;
    --border-style: dashed;
    --border-width: 2px;

    --border-radius: 20px;

    --ripple-color: purple;

    --detail-icon-color: white;
    --detail-icon-opacity: 1;
    --detail-icon-font-size: 20px;
  }
</style>`;

</script>

<style>
  ion-item {
    --background: #19422d;
    --color: #fff;

    --border-color: #fff;
    --border-style: dashed;
    --border-width: 2px;

    --border-radius: 20px;

    --ripple-color: purple;

    --detail-icon-color: white;
    --detail-icon-opacity: 1;
    --detail-icon-font-size: 20px;
  }
</style>
