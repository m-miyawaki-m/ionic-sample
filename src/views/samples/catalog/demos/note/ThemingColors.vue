<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Note / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったノートの色のカスタマイズ例。</p>
      <ion-note>Default Note</ion-note>
        <ion-note color="primary">Primary Note</ion-note>
        <ion-note color="secondary">Secondary Note</ion-note>
        <ion-note color="tertiary">Tertiary Note</ion-note>
        <ion-note color="success">Success Note</ion-note>
        <ion-note color="warning">Warning Note</ion-note>
        <ion-note color="danger">Danger Note</ion-note>
        <ion-note color="light">Light Note</ion-note>
        <ion-note color="medium">Medium Note</ion-note>
        <ion-note color="dark">Dark Note</ion-note>
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
  IonMenuButton,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-note>Default Note</ion-note>
  <ion-note color="primary">Primary Note</ion-note>
  <ion-note color="secondary">Secondary Note</ion-note>
  <ion-note color="tertiary">Tertiary Note</ion-note>
  <ion-note color="success">Success Note</ion-note>
  <ion-note color="warning">Warning Note</ion-note>
  <ion-note color="danger">Danger Note</ion-note>
  <ion-note color="light">Light Note</ion-note>
  <ion-note color="medium">Medium Note</ion-note>
  <ion-note color="dark">Dark Note</ion-note>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonNote } from '@ionic/vue';
<\/script>`;

</script>
