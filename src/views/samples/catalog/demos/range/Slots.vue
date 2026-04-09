<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Range / Slots</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">start / end スロットを使ってスライダーの両端にアイコンやラベルを配置する例。</p>
      <ion-range aria-label="Temperature">
          <ion-icon slot="start" :icon="snowOutline"></ion-icon>
          <ion-icon slot="end" :icon="sunnyOutline"></ion-icon>
        </ion-range>
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
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRange,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { snowOutline, sunnyOutline } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-range aria-label="Temperature">
    <ion-icon slot="start" :icon="snowOutline"></ion-icon>
    <ion-icon slot="end" :icon="sunnyOutline"></ion-icon>
  </ion-range>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonRange, IonIcon } from '@ionic/vue';
  import { snowOutline, sunnyOutline } from 'ionicons/icons';
<\/script>`;

</script>
