<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Range / Label Slot</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">label スロットを使ってカスタムラベルをスライダーに追加する例。</p>
      <ion-range>
          <div slot="label">Label with <ion-text color="primary">custom HTML</ion-text></div>
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
  IonMenuButton,
  IonPage,
  IonRange,
  IonText,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-range>
    <div slot="label">Label with <ion-text color="primary">custom HTML</ion-text></div>
  </ion-range>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonRange, IonText } from '@ionic/vue';
<\/script>`;

</script>
