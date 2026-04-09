<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Button / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったボタンの色のカスタマイズ例。</p>
      <ion-button>Default</ion-button>
        <ion-button color="primary">Primary</ion-button>
        <ion-button color="secondary">Secondary</ion-button>
        <ion-button color="tertiary">Tertiary</ion-button>
        <ion-button color="success">Success</ion-button>
        <ion-button color="warning">Warning</ion-button>
        <ion-button color="danger">Danger</ion-button>
        <ion-button color="light">Light</ion-button>
        <ion-button color="medium">Medium</ion-button>
        <ion-button color="dark">Dark</ion-button>
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
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-button>Default</ion-button>
  <ion-button color="primary">Primary</ion-button>
  <ion-button color="secondary">Secondary</ion-button>
  <ion-button color="tertiary">Tertiary</ion-button>
  <ion-button color="success">Success</ion-button>
  <ion-button color="warning">Warning</ion-button>
  <ion-button color="danger">Danger</ion-button>
  <ion-button color="light">Light</ion-button>
  <ion-button color="medium">Medium</ion-button>
  <ion-button color="dark">Dark</ion-button>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton } from '@ionic/vue';
<\/script>`;

</script>
