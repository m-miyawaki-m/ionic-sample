<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>List Header / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったリストヘッダーの色のカスタマイズ例。</p>
      <ion-list-header>
          <ion-label>Default</ion-label>
        </ion-list-header>
        <ion-list-header color="primary">
          <ion-label>Primary</ion-label>
        </ion-list-header>
        <ion-list-header color="secondary">
          <ion-label>Secondary</ion-label>
        </ion-list-header>
        <ion-list-header color="tertiary">
          <ion-label>Tertiary</ion-label>
        </ion-list-header>
        <ion-list-header color="success">
          <ion-label>Success</ion-label>
        </ion-list-header>
        <ion-list-header color="warning">
          <ion-label>Warning</ion-label>
        </ion-list-header>
        <ion-list-header color="danger">
          <ion-label>Danger</ion-label>
        </ion-list-header>
        <ion-list-header color="light">
          <ion-label>Light</ion-label>
        </ion-list-header>
        <ion-list-header color="medium">
          <ion-label>Medium</ion-label>
        </ion-list-header>
        <ion-list-header color="dark">
          <ion-label>Dark</ion-label>
        </ion-list-header>
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
  IonLabel,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list-header>
    <ion-label>Default</ion-label>
  </ion-list-header>
  <ion-list-header color="primary">
    <ion-label>Primary</ion-label>
  </ion-list-header>
  <ion-list-header color="secondary">
    <ion-label>Secondary</ion-label>
  </ion-list-header>
  <ion-list-header color="tertiary">
    <ion-label>Tertiary</ion-label>
  </ion-list-header>
  <ion-list-header color="success">
    <ion-label>Success</ion-label>
  </ion-list-header>
  <ion-list-header color="warning">
    <ion-label>Warning</ion-label>
  </ion-list-header>
  <ion-list-header color="danger">
    <ion-label>Danger</ion-label>
  </ion-list-header>
  <ion-list-header color="light">
    <ion-label>Light</ion-label>
  </ion-list-header>
  <ion-list-header color="medium">
    <ion-label>Medium</ion-label>
  </ion-list-header>
  <ion-list-header color="dark">
    <ion-label>Dark</ion-label>
  </ion-list-header>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonLabel, IonListHeader } from '@ionic/vue';
<\/script>`;

</script>
