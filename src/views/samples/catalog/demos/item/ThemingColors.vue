<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったアイテムの色のカスタマイズ例。</p>
      <ion-item>
          <ion-label>Default Item</ion-label>
        </ion-item>
        <ion-item color="primary">
          <ion-label>Primary Item</ion-label>
        </ion-item>
        <ion-item color="secondary">
          <ion-label>Secondary Item</ion-label>
        </ion-item>
        <ion-item color="tertiary">
          <ion-label>Tertiary Item</ion-label>
        </ion-item>
        <ion-item color="success">
          <ion-label>Success Item</ion-label>
        </ion-item>
        <ion-item color="warning">
          <ion-label>Warning Item</ion-label>
        </ion-item>
        <ion-item color="danger">
          <ion-label>Danger Item</ion-label>
        </ion-item>
        <ion-item color="light">
          <ion-label>Light Item</ion-label>
        </ion-item>
        <ion-item color="medium">
          <ion-label>Medium Item</ion-label>
        </ion-item>
        <ion-item color="dark">
          <ion-label>Dark Item</ion-label>
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
  <ion-item>
    <ion-label>Default Item</ion-label>
  </ion-item>
  <ion-item color="primary">
    <ion-label>Primary Item</ion-label>
  </ion-item>
  <ion-item color="secondary">
    <ion-label>Secondary Item</ion-label>
  </ion-item>
  <ion-item color="tertiary">
    <ion-label>Tertiary Item</ion-label>
  </ion-item>
  <ion-item color="success">
    <ion-label>Success Item</ion-label>
  </ion-item>
  <ion-item color="warning">
    <ion-label>Warning Item</ion-label>
  </ion-item>
  <ion-item color="danger">
    <ion-label>Danger Item</ion-label>
  </ion-item>
  <ion-item color="light">
    <ion-label>Light Item</ion-label>
  </ion-item>
  <ion-item color="medium">
    <ion-label>Medium Item</ion-label>
  </ion-item>
  <ion-item color="dark">
    <ion-label>Dark Item</ion-label>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonLabel } from '@ionic/vue';
<\/script>`;

</script>
