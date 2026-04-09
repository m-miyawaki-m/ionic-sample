<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Toggle / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったトグルの色のカスタマイズ例。</p>
      <ion-toggle aria-label="Primary toggle" color="primary" :checked="true"></ion-toggle>
        <ion-toggle aria-label="Secondary toggle" color="secondary" :checked="true"></ion-toggle>
        <ion-toggle aria-label="Tertiary toggle" color="tertiary" :checked="true"></ion-toggle>
        <ion-toggle aria-label="Success toggle" color="success" :checked="true"></ion-toggle>
        <ion-toggle aria-label="Warning toggle" color="warning" :checked="true"></ion-toggle>
        <ion-toggle aria-label="Danger toggle" color="danger" :checked="true"></ion-toggle>
        <ion-toggle aria-label="Light toggle" color="light" :checked="true"></ion-toggle>
        <ion-toggle aria-label="Medium toggle" color="medium" :checked="true"></ion-toggle>
        <ion-toggle aria-label="Dark toggle" color="dark" :checked="true"></ion-toggle>
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
  <ion-toggle aria-label="Primary toggle" color="primary" :checked="true"></ion-toggle>
  <ion-toggle aria-label="Secondary toggle" color="secondary" :checked="true"></ion-toggle>
  <ion-toggle aria-label="Tertiary toggle" color="tertiary" :checked="true"></ion-toggle>
  <ion-toggle aria-label="Success toggle" color="success" :checked="true"></ion-toggle>
  <ion-toggle aria-label="Warning toggle" color="warning" :checked="true"></ion-toggle>
  <ion-toggle aria-label="Danger toggle" color="danger" :checked="true"></ion-toggle>
  <ion-toggle aria-label="Light toggle" color="light" :checked="true"></ion-toggle>
  <ion-toggle aria-label="Medium toggle" color="medium" :checked="true"></ion-toggle>
  <ion-toggle aria-label="Dark toggle" color="dark" :checked="true"></ion-toggle>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonToggle } from '@ionic/vue';
<\/script>`;

</script>
