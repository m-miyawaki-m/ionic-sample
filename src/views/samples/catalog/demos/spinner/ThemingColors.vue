<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Spinner / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったスピナーの色のカスタマイズ例。</p>
      <ion-spinner></ion-spinner>
        <ion-spinner color="primary"></ion-spinner>
        <ion-spinner color="secondary"></ion-spinner>
        <ion-spinner color="tertiary"></ion-spinner>
        <ion-spinner color="success"></ion-spinner>
        <ion-spinner color="warning"></ion-spinner>
        <ion-spinner color="danger"></ion-spinner>
        <ion-spinner color="light"></ion-spinner>
        <ion-spinner color="medium"></ion-spinner>
        <ion-spinner color="dark"></ion-spinner>
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
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-spinner></ion-spinner>
  <ion-spinner color="primary"></ion-spinner>
  <ion-spinner color="secondary"></ion-spinner>
  <ion-spinner color="tertiary"></ion-spinner>
  <ion-spinner color="success"></ion-spinner>
  <ion-spinner color="warning"></ion-spinner>
  <ion-spinner color="danger"></ion-spinner>
  <ion-spinner color="light"></ion-spinner>
  <ion-spinner color="medium"></ion-spinner>
  <ion-spinner color="dark"></ion-spinner>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonSpinner } from '@ionic/vue';
<\/script>`;

</script>
