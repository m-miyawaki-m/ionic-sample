<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Icon / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-icon の基本的な使い方。ionicons のアイコンセットを表示する例。</p>
      <ion-icon :icon="logoIonic"></ion-icon>
        <ion-icon :icon="logoIonic" size="large"></ion-icon>
        <ion-icon :icon="logoIonic" color="primary"></ion-icon>
        <ion-icon :icon="logoIonic" size="large" color="primary"></ion-icon>
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
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { logoIonic } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-icon :icon="logoIonic"></ion-icon>
  <ion-icon :icon="logoIonic" size="large"></ion-icon>
  <ion-icon :icon="logoIonic" color="primary"></ion-icon>
  <ion-icon :icon="logoIonic" size="large" color="primary"></ion-icon>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonIcon } from '@ionic/vue';
  import { logoIonic } from 'ionicons/icons';
<\/script>`;

</script>
