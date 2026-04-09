<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Loading / Spinners</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">type プロパティで各種スピナーアニメーションを切り替える例。</p>
      <ion-button id="open-loading">Show Loading</ion-button>
        <ion-loading trigger="open-loading" message="Loading..." duration="3000" spinner="circles"></ion-loading>
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
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-button id="open-loading">Show Loading</ion-button>
  <ion-loading trigger="open-loading" message="Loading..." duration="3000" spinner="circles"></ion-loading>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonLoading } from '@ionic/vue';
<\/script>`;

</script>
