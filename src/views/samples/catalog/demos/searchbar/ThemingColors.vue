<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Searchbar / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使った検索バーの色のカスタマイズ例。</p>
      <ion-searchbar placeholder="Default"></ion-searchbar>
        <ion-searchbar color="primary" placeholder="Primary"></ion-searchbar>
        <ion-searchbar color="secondary" placeholder="Secondary"></ion-searchbar>
        <ion-searchbar color="tertiary" placeholder="Tertiary"></ion-searchbar>
        <ion-searchbar color="success" placeholder="Success"></ion-searchbar>
        <ion-searchbar color="warning" placeholder="Warning"></ion-searchbar>
        <ion-searchbar color="danger" placeholder="Danger"></ion-searchbar>
        <ion-searchbar color="light" placeholder="Light"></ion-searchbar>
        <ion-searchbar color="medium" placeholder="Medium"></ion-searchbar>
        <ion-searchbar color="dark" placeholder="Dark"></ion-searchbar>
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
  IonSearchbar,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-searchbar placeholder="Default"></ion-searchbar>
  <ion-searchbar color="primary" placeholder="Primary"></ion-searchbar>
  <ion-searchbar color="secondary" placeholder="Secondary"></ion-searchbar>
  <ion-searchbar color="tertiary" placeholder="Tertiary"></ion-searchbar>
  <ion-searchbar color="success" placeholder="Success"></ion-searchbar>
  <ion-searchbar color="warning" placeholder="Warning"></ion-searchbar>
  <ion-searchbar color="danger" placeholder="Danger"></ion-searchbar>
  <ion-searchbar color="light" placeholder="Light"></ion-searchbar>
  <ion-searchbar color="medium" placeholder="Medium"></ion-searchbar>
  <ion-searchbar color="dark" placeholder="Dark"></ion-searchbar>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonSearchbar } from '@ionic/vue';
<\/script>`;

</script>
