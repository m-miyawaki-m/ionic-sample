<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Searchbar / Clear Button</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">showClearButton プロパティでクリアボタンの表示タイミングを制御する例。</p>
      <ion-searchbar show-clear-button="focus" value="Show on Focus"></ion-searchbar>
        <ion-searchbar show-clear-button="always" value="Always Show"></ion-searchbar>
        <ion-searchbar show-clear-button="never" value="Never Show"></ion-searchbar>
        <ion-searchbar show-clear-button="always" :clear-icon="trashBin" value="Custom Clear Icon"></ion-searchbar>
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
  import { trashBin } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-searchbar show-clear-button="focus" value="Show on Focus"></ion-searchbar>
  <ion-searchbar show-clear-button="always" value="Always Show"></ion-searchbar>
  <ion-searchbar show-clear-button="never" value="Never Show"></ion-searchbar>
  <ion-searchbar show-clear-button="always" :clear-icon="trashBin" value="Custom Clear Icon"></ion-searchbar>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonSearchbar } from '@ionic/vue';
  import { trashBin } from 'ionicons/icons';
<\/script>`;

</script>
