<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Range / Dual Knobs</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">dualKnobs プロパティで最小値・最大値を両端から設定できるデュアルスライダーの例。</p>
      <ion-range aria-label="Dual Knobs Range" :dual-knobs="true" :value="{ lower: 20, upper: 80 }"></ion-range>
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
  IonRange,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-range aria-label="Dual Knobs Range" :dual-knobs="true" :value="{ lower: 20, upper: 80 }"></ion-range>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonContent, IonRange } from '@ionic/vue';
<\/script>`;

</script>
