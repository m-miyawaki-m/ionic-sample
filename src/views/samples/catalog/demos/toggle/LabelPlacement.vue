<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Toggle / Label Placement</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">labelPlacement プロパティでラベルをトグルの前後・上下に配置する例。</p>
      <ion-toggle label-placement="start">Label at the Start</ion-toggle><br /><br />
        <ion-toggle label-placement="end">Label at the End</ion-toggle><br /><br />
        <ion-toggle label-placement="fixed">Fixed Width Label</ion-toggle><br /><br />
        <ion-toggle label-placement="stacked">Stacked Label</ion-toggle>
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
  IonTitle,
  IonToggle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-toggle label-placement="start">Label at the Start</ion-toggle><br /><br />
  <ion-toggle label-placement="end">Label at the End</ion-toggle><br /><br />
  <ion-toggle label-placement="fixed">Fixed Width Label</ion-toggle><br /><br />
  <ion-toggle label-placement="stacked">Stacked Label</ion-toggle>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonToggle } from '@ionic/vue';
<\/script>`;

</script>
