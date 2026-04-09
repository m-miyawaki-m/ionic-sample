<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Searchbar / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">検索バー（ion-searchbar）の基本的な使い方。テキスト入力とリアルタイム検索を確認できる。</p>
      <ion-searchbar></ion-searchbar>
        <ion-searchbar placeholder="Custom Placeholder"></ion-searchbar>
        <ion-searchbar disabled="true" placeholder="Disabled"></ion-searchbar>
        <ion-searchbar value="Value"></ion-searchbar>
        <ion-searchbar animated="true" placeholder="Animated"></ion-searchbar>
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
  <ion-searchbar></ion-searchbar>
  <ion-searchbar placeholder="Custom Placeholder"></ion-searchbar>
  <ion-searchbar disabled="true" placeholder="Disabled"></ion-searchbar>
  <ion-searchbar value="Value"></ion-searchbar>
  <ion-searchbar animated="true" placeholder="Animated"></ion-searchbar>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonSearchbar } from '@ionic/vue';
<\/script>`;

</script>
