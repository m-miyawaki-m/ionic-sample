<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item Divider / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったアイテム区切り線の色のカスタマイズ例。</p>
      <ion-item-divider>
          <ion-label>Default</ion-label>
        </ion-item-divider>
        <ion-item-divider color="primary">
          <ion-label>Primary</ion-label>
        </ion-item-divider>
        <ion-item-divider color="secondary">
          <ion-label>Secondary</ion-label>
        </ion-item-divider>
        <ion-item-divider color="tertiary">
          <ion-label>Tertiary</ion-label>
        </ion-item-divider>
        <ion-item-divider color="success">
          <ion-label>Success</ion-label>
        </ion-item-divider>
        <ion-item-divider color="warning">
          <ion-label>Warning</ion-label>
        </ion-item-divider>
        <ion-item-divider color="danger">
          <ion-label>Danger</ion-label>
        </ion-item-divider>
        <ion-item-divider color="light">
          <ion-label>Light</ion-label>
        </ion-item-divider>
        <ion-item-divider color="medium">
          <ion-label>Medium</ion-label>
        </ion-item-divider>
        <ion-item-divider color="dark">
          <ion-label>Dark</ion-label>
        </ion-item-divider>
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
  IonItemDivider,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item-divider>
    <ion-label>Default</ion-label>
  </ion-item-divider>
  <ion-item-divider color="primary">
    <ion-label>Primary</ion-label>
  </ion-item-divider>
  <ion-item-divider color="secondary">
    <ion-label>Secondary</ion-label>
  </ion-item-divider>
  <ion-item-divider color="tertiary">
    <ion-label>Tertiary</ion-label>
  </ion-item-divider>
  <ion-item-divider color="success">
    <ion-label>Success</ion-label>
  </ion-item-divider>
  <ion-item-divider color="warning">
    <ion-label>Warning</ion-label>
  </ion-item-divider>
  <ion-item-divider color="danger">
    <ion-label>Danger</ion-label>
  </ion-item-divider>
  <ion-item-divider color="light">
    <ion-label>Light</ion-label>
  </ion-item-divider>
  <ion-item-divider color="medium">
    <ion-label>Medium</ion-label>
  </ion-item-divider>
  <ion-item-divider color="dark">
    <ion-label>Dark</ion-label>
  </ion-item-divider>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItemDivider, IonLabel } from '@ionic/vue';
<\/script>`;

</script>
