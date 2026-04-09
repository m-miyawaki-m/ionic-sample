<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Chip / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったチップの色のカスタマイズ例。</p>
      <ion-chip>Default</ion-chip>
        <ion-chip color="primary">Primary</ion-chip>
        <ion-chip color="secondary">Secondary</ion-chip>
        <ion-chip color="tertiary">Tertiary</ion-chip>
        <ion-chip color="success">Success</ion-chip>
        <ion-chip color="warning">Warning</ion-chip>
        <ion-chip color="danger">Danger</ion-chip>
        <ion-chip color="light">Light</ion-chip>
        <ion-chip color="medium">Medium</ion-chip>
        <ion-chip color="dark">Dark</ion-chip>
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
  IonChip,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-chip>Default</ion-chip>
  <ion-chip color="primary">Primary</ion-chip>
  <ion-chip color="secondary">Secondary</ion-chip>
  <ion-chip color="tertiary">Tertiary</ion-chip>
  <ion-chip color="success">Success</ion-chip>
  <ion-chip color="warning">Warning</ion-chip>
  <ion-chip color="danger">Danger</ion-chip>
  <ion-chip color="light">Light</ion-chip>
  <ion-chip color="medium">Medium</ion-chip>
  <ion-chip color="dark">Dark</ion-chip>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonChip } from '@ionic/vue';
<\/script>`;

</script>
