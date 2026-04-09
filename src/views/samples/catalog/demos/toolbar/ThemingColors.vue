<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Toolbar / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったツールバーの色のカスタマイズ例。</p>
      <ion-toolbar>
          <ion-title>Default Toolbar</ion-title>
        </ion-toolbar>
        <ion-toolbar color="primary">
          <ion-title>Primary Toolbar</ion-title>
        </ion-toolbar>
        <ion-toolbar color="secondary">
          <ion-title>Secondary Toolbar</ion-title>
        </ion-toolbar>
        <ion-toolbar color="tertiary">
          <ion-title>Tertiary Toolbar</ion-title>
        </ion-toolbar>
        <ion-toolbar color="success">
          <ion-title>Success Toolbar</ion-title>
        </ion-toolbar>
        <ion-toolbar color="warning">
          <ion-title>Warning Toolbar</ion-title>
        </ion-toolbar>
        <ion-toolbar color="danger">
          <ion-title>Danger Toolbar</ion-title>
        </ion-toolbar>
        <ion-toolbar color="light">
          <ion-title>Light Toolbar</ion-title>
        </ion-toolbar>
        <ion-toolbar color="medium">
          <ion-title>Medium Toolbar</ion-title>
        </ion-toolbar>
        <ion-toolbar color="dark">
          <ion-title>Dark Toolbar</ion-title>
        </ion-toolbar>
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
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-toolbar>
    <ion-title>Default Toolbar</ion-title>
  </ion-toolbar>
  <ion-toolbar color="primary">
    <ion-title>Primary Toolbar</ion-title>
  </ion-toolbar>
  <ion-toolbar color="secondary">
    <ion-title>Secondary Toolbar</ion-title>
  </ion-toolbar>
  <ion-toolbar color="tertiary">
    <ion-title>Tertiary Toolbar</ion-title>
  </ion-toolbar>
  <ion-toolbar color="success">
    <ion-title>Success Toolbar</ion-title>
  </ion-toolbar>
  <ion-toolbar color="warning">
    <ion-title>Warning Toolbar</ion-title>
  </ion-toolbar>
  <ion-toolbar color="danger">
    <ion-title>Danger Toolbar</ion-title>
  </ion-toolbar>
  <ion-toolbar color="light">
    <ion-title>Light Toolbar</ion-title>
  </ion-toolbar>
  <ion-toolbar color="medium">
    <ion-title>Medium Toolbar</ion-title>
  </ion-toolbar>
  <ion-toolbar color="dark">
    <ion-title>Dark Toolbar</ion-title>
  </ion-toolbar>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonTitle, IonToolbar } from '@ionic/vue';
<\/script>`;

</script>
